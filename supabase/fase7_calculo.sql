-- Fase 7 · Cálculo I · estudIAndo
-- Guarda el progreso de calculo.html (ejercicios guiados, plan, casillas, entrenador de decisiones y las
-- hojas de práctica con lápiz) por usuario, y limita las correcciones con IA de la práctica con lápiz.
-- Correr en el SQL Editor de Supabase. Es idempotente: se puede volver a correr sin romper nada.

-- 1) Un documento JSON por usuario y por clave ("progreso", "plan", "duo", "pz-<ejercicio>" y, si la cuenta
--    tiene plan de estudio propio, "plan-datos": el contenido del plan, que solo ve su dueño).
create table if not exists calculo_docs (
  usuario uuid not null references auth.users on delete cascade,
  doc text not null check (char_length(doc) between 1 and 120),
  cuerpo jsonb not null default '{}'::jsonb,
  actualizado_at timestamptz not null default now(),
  primary key (usuario, doc),
  -- Una hoja de lápiz muy dibujada pesa unos 40 KB; 300 KB deja margen sin permitir abusos.
  constraint calculo_docs_tamano check (pg_column_size(cuerpo) <= 300 * 1024)
);

alter table calculo_docs enable row level security;

drop policy if exists "calculo: cada uno lee lo suyo" on calculo_docs;
create policy "calculo: cada uno lee lo suyo" on calculo_docs
  for select to authenticated using (usuario = auth.uid());
drop policy if exists "calculo: cada uno crea lo suyo" on calculo_docs;
create policy "calculo: cada uno crea lo suyo" on calculo_docs
  for insert to authenticated with check (usuario = auth.uid());
drop policy if exists "calculo: cada uno actualiza lo suyo" on calculo_docs;
create policy "calculo: cada uno actualiza lo suyo" on calculo_docs
  for update to authenticated using (usuario = auth.uid()) with check (usuario = auth.uid());
drop policy if exists "calculo: cada uno borra lo suyo" on calculo_docs;
create policy "calculo: cada uno borra lo suyo" on calculo_docs
  for delete to authenticated using (usuario = auth.uid());

-- 2) Fusión profunda de JSON: los objetos se combinan clave por clave; cualquier otro valor reemplaza.
create or replace function calculo_jsonb_merge(a jsonb, b jsonb)
returns jsonb language sql immutable as $$
  select case
    when jsonb_typeof(a) = 'object' and jsonb_typeof(b) = 'object' then (
      select coalesce(jsonb_object_agg(k,
        case
          when a ? k and b ? k then calculo_jsonb_merge(a -> k, b -> k)
          when b ? k then b -> k
          else a -> k
        end), '{}'::jsonb)
      from (select jsonb_object_keys(a) as k union select jsonb_object_keys(b)) as claves
    )
    else b
  end
$$;

-- 3) Escritura parcial: la página manda solo lo que cambió y se fusiona en el servidor, en una sola
--    sentencia. Así dos dispositivos (o dos pestañas) que guardan a la vez no se pisan.
create or replace function calculo_merge(p_doc text, p_patch jsonb)
returns void language plpgsql security invoker as $$
begin
  if auth.uid() is null then raise exception 'no autenticado'; end if;
  insert into calculo_docs as d (usuario, doc, cuerpo, actualizado_at)
  values (auth.uid(), p_doc, calculo_jsonb_merge('{}'::jsonb, p_patch), now())
  on conflict (usuario, doc) do update
    set cuerpo = calculo_jsonb_merge(d.cuerpo, excluded.cuerpo), actualizado_at = now();
end;
$$;
grant execute on function calculo_merge(text, jsonb) to authenticated;

-- 4) Sincronización en vivo entre dispositivos (Realtime respeta las policies de arriba).
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'calculo_docs'
  ) then
    alter publication supabase_realtime add table calculo_docs;
  end if;
end $$;

-- 5) Uso diario de la corrección con lápiz (cuida la cuota de Gemini). Igual que correcciones_practica:
--    sin policy de insert, sólo escribe la Edge Function con la service role key.
create table if not exists calculo_correcciones (
  id uuid primary key default gen_random_uuid(),
  usuario uuid not null references auth.users on delete cascade,
  creado_at timestamptz not null default now()
);
alter table calculo_correcciones enable row level security;
drop policy if exists "calculo: cada uno ve sus correcciones" on calculo_correcciones;
create policy "calculo: cada uno ve sus correcciones" on calculo_correcciones
  for select to authenticated using (usuario = auth.uid());
create index if not exists calculo_correcciones_usuario_fecha on calculo_correcciones (usuario, creado_at);
