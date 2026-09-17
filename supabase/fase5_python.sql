-- Fase 5 (Python) · estudIAndo
-- Nueva materia con un modelo de examen distinto: ejercicios de código en vez de
-- opción múltiple, corregidos por Gemini contra las tareas pedidas + una solución
-- de referencia (mismo patrón de seguridad que preguntas_clave/desarrollos: nada
-- de la clave viaja al cliente, la corrección la escribe la Edge Function).
-- Correr en el SQL Editor de Supabase, después de fase4.sql. Después correr
-- seed_python.sql.

-- Ejercicios públicos (sin la solución).
create table ejercicios_codigo (
  id text primary key,              -- ej: 'python-A1'
  materia text not null,
  tema text not null,               -- 'numpy' | 'pandas' | 'matplotlib' | ...
  titulo text not null,
  enunciado text,
  datos_trabajo text,
  tareas jsonb not null
);

-- Solución de referencia. PRIVADA: sin policies de lectura a propósito.
create table ejercicios_codigo_clave (
  ejercicio_id text primary key references ejercicios_codigo,
  solucion text not null
);

alter table ejercicios_codigo enable row level security;
alter table ejercicios_codigo_clave enable row level security;
create policy "lectura ejercicios" on ejercicios_codigo for select to authenticated using (true);

-- El examen de código reutiliza la tabla intentos (Fase 3), pero sus "casos" son
-- ids de texto, no ints de Ética: agregamos una columna aparte para no romper nada.
alter table intentos add column if not exists ejercicios text[];

-- Entregas de código de un intento: una fila por ejercicio del examen.
create table codigo_entregas (
  intento uuid references intentos on delete cascade,
  ejercicio_id text references ejercicios_codigo not null,
  codigo text check (char_length(codigo) <= 8000),
  criterios_ia jsonb,                -- [{criterio, cumple, justificacion}]
  devolucion_ia text,
  puntaje_ia int,                    -- % de tareas cumplidas (0-100)
  corregido_at timestamptz,
  creado_at timestamptz not null default now(),
  primary key (intento, ejercicio_id)
);

alter table codigo_entregas enable row level security;
create policy "cada uno ve sus entregas" on codigo_entregas for select to authenticated using (
  exists (select 1 from intentos i where i.id = codigo_entregas.intento and i.usuario = auth.uid())
);
-- Sin policy de insert/update: el código se guarda vía guardar_codigo() y la
-- corrección la escribe la Edge Function corregir-codigo con la service role key.

-- Arranca un examen de código: 3 ejercicios al azar (evitando los últimos vistos).
create or replace function iniciar_intento_codigo(p_materia text, p_cantidad int default 3)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_excluidos text[];
  v_candidatos text[];
  v_elegidos text[];
  v_intento uuid;
  v_ejercicios jsonb;
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
    select unnest(ejercicios) as elem from (
      select ejercicios from intentos
      where usuario = auth.uid() and modo = 'examen' and materia = p_materia
      order by inicio_at desc limit 1
    ) recientes
  ) flat;

  select coalesce(array_agg(id), '{}') into v_candidatos
  from ejercicios_codigo where materia = p_materia and not (id = any(v_excluidos));

  if v_candidatos is null or array_length(v_candidatos, 1) < p_cantidad then
    select coalesce(array_agg(id), '{}') into v_candidatos from ejercicios_codigo where materia = p_materia;
  end if;

  select array_agg(id) into v_elegidos from (
    select id from unnest(v_candidatos) as id order by random() limit p_cantidad
  ) sub;

  insert into intentos (usuario, materia, modo, casos, ejercicios, inicio_at)
  values (auth.uid(), p_materia, 'examen', '{}', v_elegidos, now())
  returning id into v_intento;

  select jsonb_agg(jsonb_build_object(
    'id', ec.id, 'tema', ec.tema, 'titulo', ec.titulo, 'enunciado', ec.enunciado,
    'datos_trabajo', ec.datos_trabajo, 'tareas', ec.tareas
  ))
  into v_ejercicios
  from ejercicios_codigo ec where ec.id = any(v_elegidos);

  return jsonb_build_object('intento_id', v_intento, 'inicio_at', now(), 'ejercicios', v_ejercicios);
end;
$$;

revoke all on function iniciar_intento_codigo(text, int) from public;
grant execute on function iniciar_intento_codigo(text, int) to authenticated;

-- Guarda/actualiza el código de un ejercicio del intento en curso.
create or replace function guardar_codigo(p_intento_id uuid, p_ejercicio_id text, p_codigo text)
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
  if now() - v_intento.inicio_at > interval '45 minutes' then raise exception 'tiempo agotado'; end if;
  if not (p_ejercicio_id = any(v_intento.ejercicios)) then raise exception 'ese ejercicio no es parte de este intento'; end if;

  insert into codigo_entregas (intento, ejercicio_id, codigo)
  values (p_intento_id, p_ejercicio_id, p_codigo)
  on conflict (intento, ejercicio_id) do update set codigo = excluded.codigo;
end;
$$;

revoke all on function guardar_codigo(uuid, text, text) from public;
grant execute on function guardar_codigo(uuid, text, text) to authenticated;

-- Cierra el intento (no hay corrección automática: todo lo corrige la IA después).
create or replace function finalizar_intento_codigo(p_intento_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_intento record;
begin
  select * into v_intento from intentos where id = p_intento_id and usuario = auth.uid();
  if not found then raise exception 'intento no encontrado'; end if;

  if v_intento.fin_at is null then
    update intentos set fin_at = now() where id = p_intento_id;
  end if;

  return jsonb_build_object(
    'duracion_seg', (select extract(epoch from (fin_at - inicio_at))::int from intentos where id = p_intento_id),
    'ejercicios_pendientes', (
      select coalesce(array_agg(e), '{}') from unnest(v_intento.ejercicios) e
      where e not in (select ejercicio_id from codigo_entregas where intento = p_intento_id and corregido_at is not null)
    )
  );
end;
$$;

revoke all on function finalizar_intento_codigo(uuid) from public;
grant execute on function finalizar_intento_codigo(uuid) to authenticated;

-- Revela la solución de referencia de un ejercicio (modo práctica, sin IA de por medio).
create or replace function revelar_solucion_codigo(p_ejercicio_id text)
returns text
language sql
security definer
set search_path = public
as $$
  select solucion from ejercicios_codigo_clave where ejercicio_id = p_ejercicio_id;
$$;

revoke all on function revelar_solucion_codigo(text) from public;
grant execute on function revelar_solucion_codigo(text) to authenticated;

-- Leaderboard de Python: promedio de los últimos 5 intentos (% de tareas cumplidas
-- promediado entre los ejercicios del examen), desempate por menor duración.
create or replace function leaderboard_python()
returns table (
  nombre text, avatar text, intentos_totales bigint,
  promedio_ult5_pct int, mejor_pct int, duracion_prom_seg int
)
language sql
security definer
set search_path = public
as $$
  with intentos_python as (
    select *, coalesce(puntaje_final_pct, 0) as pct
    from intentos where materia = 'python' and modo = 'examen' and fin_at is not null
  ),
  ultimos5 as (
    select *, row_number() over (partition by usuario order by fin_at desc) as rn
    from intentos_python
  ),
  agregado as (
    select usuario,
           avg(pct) filter (where rn <= 5) as promedio_ult5,
           avg(extract(epoch from (fin_at - inicio_at))) filter (where rn <= 5) as duracion_prom_seg
    from ultimos5 group by usuario
  ),
  totales as (
    select usuario, count(*) as intentos_totales, max(pct) as mejor_pct
    from intentos_python group by usuario
  )
  select pf.nombre, pf.avatar, t.intentos_totales,
         round(a.promedio_ult5)::int, t.mejor_pct, round(a.duracion_prom_seg)::int
  from totales t
  join agregado a using (usuario)
  join perfiles pf on pf.id = t.usuario
  order by a.promedio_ult5 desc nulls last, a.duracion_prom_seg asc nulls last;
$$;

revoke all on function leaderboard_python() from public;
grant execute on function leaderboard_python() to authenticated;
