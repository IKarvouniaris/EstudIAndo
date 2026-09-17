-- Fase 2 · estudIAndo
-- Casos y preguntas públicas + tabla privada con las respuestas correctas.
-- Correr una sola vez en el SQL Editor de Supabase, antes de seed_etica.sql.

create table casos (
  id int primary key,
  materia text not null,
  bloque int,
  u int,
  nivel text,
  ambito text,
  titulo text,
  escenario text,
  conceptos text,
  desarrollo_consigna text,
  desarrollo_rubrica jsonb
);

create table preguntas (
  id text primary key,
  caso_id int references casos not null,
  sub text not null,
  texto text not null,
  opciones jsonb not null
);

-- PRIVADA: sin ninguna policy de lectura. Sólo la leen las funciones security definer.
create table preguntas_clave (
  pregunta_id text primary key references preguntas,
  ok text not null,
  explicacion text,
  porque jsonb,
  desarrollo_modelo text
);

alter table casos enable row level security;
alter table preguntas enable row level security;
alter table preguntas_clave enable row level security;

create policy "lectura casos" on casos for select to authenticated using (true);
create policy "lectura preguntas" on preguntas for select to authenticated using (true);
-- preguntas_clave: a propósito sin policies (ni siquiera de lectura para el dueño).

-- Corrige una respuesta de práctica. Sólo revela la clave de ESA pregunta.
create or replace function responder_practica(p_pregunta_id text, p_opcion text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v jsonb;
begin
  select jsonb_build_object(
    'correcta', (pc.ok = p_opcion),
    'ok', pc.ok,
    'explicacion', pc.explicacion,
    'porque', pc.porque
  ) into v
  from preguntas_clave pc
  where pc.pregunta_id = p_pregunta_id;

  if v is null then
    raise exception 'pregunta no encontrada: %', p_pregunta_id;
  end if;

  return v;
end;
$$;

revoke all on function responder_practica(text, text) from public;
grant execute on function responder_practica(text, text) to authenticated;

-- Respuesta modelo del desarrollo de un caso (vive en la fila de la sub 'a').
create or replace function modelo_desarrollo(p_caso_id int)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_modelo text;
begin
  select pc.desarrollo_modelo into v_modelo
  from preguntas_clave pc
  join preguntas p on p.id = pc.pregunta_id
  where p.caso_id = p_caso_id and p.sub = 'a'
  limit 1;

  return v_modelo;
end;
$$;

revoke all on function modelo_desarrollo(int) from public;
grant execute on function modelo_desarrollo(int) to authenticated;
