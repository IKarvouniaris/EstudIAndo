-- Fase 10 (simulacro escrito del 2.º parcial de Intro a la IA) · estudIAndo
-- Las 18 situaciones de la cátedra se responden por escrito (partes a–d) y las corrige la Edge Function
-- corregir-situacion con Gemini, usando la grilla de cada parte y el texto de las clases del apunte como contexto.
--   1) ia_situaciones: consignas + criterios de corrección (PRIVADA: sin policies, la lee sólo la función).
--   2) ia_contexto: texto de las clases de ia-conceptual.html que la IA recibe como contexto (PRIVADA).
--   3) ia_correcciones: registro de usos para el límite diario (PRIVADA).
-- Correr en el SQL Editor de Supabase, una vez. Después correr seed_ia_parcial2.sql (generado por
-- tools/seed_ia_parcial2.py), que se puede volver a correr cada vez que cambian las situaciones o el apunte.

create table if not exists ia_situaciones (
  id int primary key,
  nivel text not null,
  titulo text not null,
  rol text not null,
  partes jsonb not null,      -- [{letra, tipo, consigna, criterios: [text]}]
  clases int[] not null       -- clases del apunte que se mandan como contexto
);
alter table ia_situaciones enable row level security;

create table if not exists ia_contexto (
  clase int primary key,
  titulo text not null,
  texto text not null
);
alter table ia_contexto enable row level security;

create table if not exists ia_correcciones (
  id bigint generated always as identity primary key,
  usuario uuid not null references auth.users on delete cascade,
  situacion_id int not null,
  creado_at timestamptz not null default now()
);
create index if not exists ia_correcciones_usuario_fecha on ia_correcciones (usuario, creado_at);
alter table ia_correcciones enable row level security;
