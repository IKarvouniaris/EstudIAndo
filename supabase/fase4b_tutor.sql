-- Fase 4b · estudIAndo
-- Tutor con Gemini: botón flotante en el apunte para preguntar sobre el contenido.
-- Correr en el SQL Editor de Supabase, después de fase4.sql.

create table preguntas_ia (
  id uuid primary key default gen_random_uuid(),
  usuario uuid references perfiles not null,
  materia text not null,
  pregunta text not null,
  respuesta text,
  creado_at timestamptz not null default now()
);

alter table preguntas_ia enable row level security;
create policy "cada uno ve sus preguntas" on preguntas_ia for select to authenticated using (usuario = auth.uid());
-- Sin policy de insert: sólo escribe la Edge Function con la service role key,
-- así el límite diario no se puede evadir insertando filas directo.
