-- Fase 6 · corrección con IA del desarrollo en práctica libre · estudIAndo
-- Registra cada corrección de práctica sólo para poder limitar el uso diario (cuida la cuota de Gemini).
-- No guarda el texto del estudiante ni el resultado: la práctica libre no puntúa ni entra al leaderboard.
-- Correr en el SQL Editor de Supabase.

create table if not exists correcciones_practica (
  id uuid primary key default gen_random_uuid(),
  usuario uuid references perfiles not null,
  caso_id int references casos not null,
  creado_at timestamptz not null default now()
);

alter table correcciones_practica enable row level security;
create policy "cada uno ve sus correcciones de práctica" on correcciones_practica
  for select to authenticated using (usuario = auth.uid());
-- Sin policy de insert: sólo escribe la Edge Function con la service role key,
-- así el límite diario no se puede evadir insertando filas directo.
