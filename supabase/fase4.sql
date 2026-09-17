-- Fase 4 (parcial) · estudIAndo
-- Agrega un desarrollo escrito al examen puntuado, corregido por Gemini vía Edge Function.
-- El puntaje final combina 50% opción múltiple + 50% desarrollo (criterios cumplidos).
-- Correr en el SQL Editor de Supabase, después de fase3.sql.

alter table intentos add column if not exists puntaje_final_pct int;

create table desarrollos (
  intento uuid references intentos on delete cascade,
  caso_id int references casos not null,
  texto text check (char_length(texto) <= 6000),
  criterios_ia jsonb,
  devolucion_ia text,
  puntaje_ia int,             -- % de criterios cumplidos (0-100)
  corregido_at timestamptz,
  creado_at timestamptz not null default now(),
  primary key (intento, caso_id)
);

alter table desarrollos enable row level security;
create policy "cada uno ve su desarrollo" on desarrollos for select to authenticated using (
  exists (select 1 from intentos i where i.id = desarrollos.intento and i.usuario = auth.uid())
);
-- Sin policy de insert/update para 'authenticated': el texto se guarda vía guardar_desarrollo()
-- y la corrección la escribe la Edge Function con la service role key (bypassa RLS a propósito).

-- Guarda el texto del desarrollo del intento en curso (antes de finalizar).
create or replace function guardar_desarrollo(p_intento_id uuid, p_caso_id int, p_texto text)
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
  if not (p_caso_id = any(v_intento.casos)) then raise exception 'ese caso no es parte de este intento'; end if;

  insert into desarrollos (intento, caso_id, texto)
  values (p_intento_id, p_caso_id, p_texto)
  on conflict (intento, caso_id) do update set texto = excluded.texto;
end;
$$;

revoke all on function guardar_desarrollo(uuid, int, text) from public;
grant execute on function guardar_desarrollo(uuid, int, text) to authenticated;

-- iniciar_intento: ahora también sortea CUÁL de los 2 casos elegidos lleva desarrollo escrito,
-- y devuelve su consigna + rúbrica (pública, sirve para autoevaluarse) para mostrarla en el examen.
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
  v_caso_desarrollo int;
  v_intento uuid;
  v_preguntas jsonb;
  v_desarrollo jsonb;
begin
  if exists (
    select 1 from intentos
    where usuario = auth.uid() and modo = 'examen' and materia = p_materia
      and inicio_at > now() - interval '5 minutes'
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

  v_caso_desarrollo := v_elegidos[1 + floor(random() * 2)::int];

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

  select jsonb_build_object(
    'caso_id', c.id, 'titulo', c.titulo, 'consigna', c.desarrollo_consigna, 'rubrica', c.desarrollo_rubrica
  ) into v_desarrollo
  from casos c where c.id = v_caso_desarrollo;

  return jsonb_build_object(
    'intento_id', v_intento, 'inicio_at', now(), 'preguntas', v_preguntas, 'desarrollo', v_desarrollo
  );
end;
$$;

revoke all on function iniciar_intento(text) from public;
grant execute on function iniciar_intento(text) to authenticated;

-- finalizar_intento: además del detalle de opción múltiple, avisa si hay un desarrollo
-- pendiente de corregir con IA (para que el cliente dispare la Edge Function).
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
      'puntaje_final_pct', i.puntaje_final_pct,
      'duracion_seg', extract(epoch from (i.fin_at - i.inicio_at))::int,
      'desarrollo_pendiente', exists (
        select 1 from desarrollos d where d.intento = p_intento_id and d.corregido_at is null
      ),
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

-- Leaderboard: usa el puntaje combinado (MC + desarrollo) cuando ya está corregido;
-- si el desarrollo todavía no fue corregido por la IA, usa sólo el % de opción múltiple.
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
    select *, coalesce(puntaje_final_pct, round(puntaje::numeric / nullif(total, 0) * 100)::int) as pct
    from intentos where materia = 'etica' and modo = 'examen' and fin_at is not null
  ),
  ultimos5 as (
    select *, row_number() over (partition by usuario order by fin_at desc) as rn
    from intentos_etica
  ),
  agregado as (
    select usuario,
           avg(pct) filter (where rn <= 5) as promedio_ult5,
           avg(extract(epoch from (fin_at - inicio_at))) filter (where rn <= 5) as duracion_prom_seg
    from ultimos5 group by usuario
  ),
  totales as (
    select usuario, count(*) as intentos_totales, max(pct) as mejor_pct
    from intentos_etica group by usuario
  )
  select pf.nombre, pf.avatar, t.intentos_totales,
         round(a.promedio_ult5)::int, t.mejor_pct, round(a.duracion_prom_seg)::int
  from totales t
  join agregado a using (usuario)
  join perfiles pf on pf.id = t.usuario
  order by a.promedio_ult5 desc nulls last, a.duracion_prom_seg asc nulls last;
$$;

revoke all on function leaderboard_etica() from public;
grant execute on function leaderboard_etica() to authenticated;
