-- Fase 3 · estudIAndo
-- Modo examen server-side: cooldown de 1h, corrección al finalizar, leaderboard.
-- Correr una sola vez en el SQL Editor de Supabase, después de schema.sql + seed_etica.sql.

create table intentos (
  id uuid primary key default gen_random_uuid(),
  usuario uuid references perfiles not null,
  materia text not null,
  modo text not null check (modo in ('examen','parcial','duelo')),
  casos int[] not null,
  inicio_at timestamptz not null default now(),
  fin_at timestamptz,
  puntaje int,
  total int
);

create table respuestas (
  intento uuid references intentos on delete cascade,
  pregunta_id text references preguntas not null,
  opcion text not null,
  correcta boolean,
  respondida_at timestamptz not null default now(),
  primary key (intento, pregunta_id)
);

alter table intentos enable row level security;
alter table respuestas enable row level security;

create policy "cada uno ve sus intentos" on intentos for select to authenticated using (usuario = auth.uid());
create policy "cada uno ve sus respuestas" on respuestas for select to authenticated using (
  exists (select 1 from intentos i where i.id = respuestas.intento and i.usuario = auth.uid())
);
-- Sin policies de insert/update: sólo se escribe a través de las funciones de abajo.

-- Arranca un intento de examen: chequea cooldown, sortea 2 casos evitando los últimos vistos.
create or replace function iniciar_intento(p_materia text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_excluidos int[];
  v_candidatos int[];
  v_elegidos int[];
  v_intento uuid;
  v_preguntas jsonb;
begin
  if exists (
    select 1 from intentos
    where usuario = auth.uid() and modo = 'examen' and materia = p_materia
      and inicio_at > now() - interval '1 hour'
  ) then
    raise exception 'cooldown';
  end if;

  select coalesce(array_agg(distinct elem), '{}') into v_excluidos
  from (
    select unnest(casos) as elem from (
      select casos from intentos
      where usuario = auth.uid() and modo = 'examen' and materia = p_materia
      order by inicio_at desc limit 2
    ) recientes
  ) flat;

  select coalesce(array_agg(id), '{}') into v_candidatos
  from casos where materia = p_materia and not (id = any(v_excluidos));

  if v_candidatos is null or array_length(v_candidatos, 1) < 2 then
    select coalesce(array_agg(id), '{}') into v_candidatos from casos where materia = p_materia;
  end if;

  select array_agg(id) into v_elegidos from (
    select id from unnest(v_candidatos) as id order by random() limit 2
  ) sub;

  insert into intentos (usuario, materia, modo, casos, inicio_at)
  values (auth.uid(), p_materia, 'examen', v_elegidos, now())
  returning id into v_intento;

  select jsonb_agg(jsonb_build_object(
    'id', p.id, 'caso_id', p.caso_id, 'sub', p.sub, 'texto', p.texto, 'opciones', p.opciones,
    'caso_titulo', c.titulo, 'caso_escenario', c.escenario, 'caso_ambito', c.ambito,
    'caso_nivel', c.nivel, 'caso_bloque', c.bloque, 'caso_conceptos', c.conceptos
  ) order by p.caso_id, p.sub)
  into v_preguntas
  from preguntas p join casos c on c.id = p.caso_id
  where p.caso_id = any(v_elegidos);

  return jsonb_build_object('intento_id', v_intento, 'inicio_at', now(), 'preguntas', v_preguntas);
end;
$$;

revoke all on function iniciar_intento(text) from public;
grant execute on function iniciar_intento(text) to authenticated;

-- Guarda una respuesta del examen en curso, sin decir si está bien.
create or replace function responder_examen(p_intento_id uuid, p_pregunta_id text, p_opcion text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_intento record;
begin
  select * into v_intento from intentos where id = p_intento_id and usuario = auth.uid();
  if not found then raise exception 'intento no encontrado'; end if;
  if v_intento.fin_at is not null then raise exception 'intento ya finalizado'; end if;
  if now() - v_intento.inicio_at > interval '20 minutes' then raise exception 'tiempo agotado'; end if;

  insert into respuestas (intento, pregunta_id, opcion)
  values (p_intento_id, p_pregunta_id, p_opcion)
  on conflict (intento, pregunta_id) do update set opcion = excluded.opcion, respondida_at = now();
end;
$$;

revoke all on function responder_examen(uuid, text, text) from public;
grant execute on function responder_examen(uuid, text, text) to authenticated;

-- Corrige y cierra el intento. Llamarla de nuevo con el mismo id devuelve el mismo resultado.
create or replace function finalizar_intento(p_intento_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_intento record;
  v_puntaje int;
  v_total int;
begin
  select * into v_intento from intentos where id = p_intento_id and usuario = auth.uid();
  if not found then raise exception 'intento no encontrado'; end if;

  if v_intento.fin_at is null then
    update respuestas r set correcta = (r.opcion = pc.ok)
    from preguntas_clave pc
    where pc.pregunta_id = r.pregunta_id and r.intento = p_intento_id;

    select count(*) into v_total from preguntas where caso_id = any(v_intento.casos);
    select count(*) filter (where correcta) into v_puntaje from respuestas where intento = p_intento_id;

    update intentos set fin_at = now(), puntaje = v_puntaje, total = v_total where id = p_intento_id;
  end if;

  return (
    select jsonb_build_object(
      'puntaje', i.puntaje, 'total', i.total,
      'duracion_seg', extract(epoch from (i.fin_at - i.inicio_at))::int,
      'detalle', (
        select jsonb_agg(jsonb_build_object(
          'pregunta_id', r.pregunta_id, 'opcion', r.opcion, 'correcta', r.correcta,
          'ok', pc.ok, 'explicacion', pc.explicacion, 'porque', pc.porque
        ))
        from respuestas r join preguntas_clave pc on pc.pregunta_id = r.pregunta_id
        where r.intento = p_intento_id
      )
    )
    from intentos i where i.id = p_intento_id
  );
end;
$$;

revoke all on function finalizar_intento(uuid) from public;
grant execute on function finalizar_intento(uuid) to authenticated;

-- Segundos que faltan para poder rendir de nuevo (0 si ya se puede).
create or replace function cooldown_restante(p_materia text)
returns int
language sql
security definer
set search_path = public
as $$
  select greatest(0, coalesce(ceil(extract(epoch from (
    (select max(inicio_at) from intentos where usuario = auth.uid() and modo = 'examen' and materia = p_materia)
    + interval '1 hour' - now()
  )))::int, 0));
$$;

revoke all on function cooldown_restante(text) from public;
grant execute on function cooldown_restante(text) to authenticated;

-- Leaderboard: promedio de los últimos 5 intentos (premia constancia), desempate por menor duración.
create or replace function leaderboard_etica()
returns table (
  nombre text, avatar text, intentos_totales bigint,
  promedio_ult5_pct int, mejor_pct int, duracion_prom_seg int
)
language sql
security definer
set search_path = public
as $$
  with intentos_etica as (
    select * from intentos where materia = 'etica' and modo = 'examen' and fin_at is not null
  ),
  ultimos5 as (
    select *, row_number() over (partition by usuario order by fin_at desc) as rn
    from intentos_etica
  ),
  agregado as (
    select usuario,
           avg(puntaje::numeric / nullif(total, 0)) filter (where rn <= 5) as promedio_ult5,
           avg(extract(epoch from (fin_at - inicio_at))) filter (where rn <= 5) as duracion_prom_seg
    from ultimos5 group by usuario
  ),
  totales as (
    select usuario, count(*) as intentos_totales, max(puntaje::numeric / nullif(total, 0)) as mejor_pct
    from intentos_etica group by usuario
  )
  select pf.nombre, pf.avatar, t.intentos_totales,
         round(a.promedio_ult5 * 100)::int, round(t.mejor_pct * 100)::int, round(a.duracion_prom_seg)::int
  from totales t
  join agregado a using (usuario)
  join perfiles pf on pf.id = t.usuario
  order by a.promedio_ult5 desc nulls last, a.duracion_prom_seg asc nulls last;
$$;

revoke all on function leaderboard_etica() from public;
grant execute on function leaderboard_etica() to authenticated;
