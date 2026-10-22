-- Fase 9 (videos en Poris) · estudIAndo
-- Videos de repaso que se ven en Poris (vista «Videos», aparte de las tarjetas), ordenados en carpetas y clases
-- que se crean al subir (texto libre, por ejemplo «Ética» / «Clase 3»):
--   1) bucket público poris-videos en Storage (máx. 50 MB por archivo, solo video);
--   2) tabla poris_videos con la carpeta, la clase y la ruta del archivo;
--   3) tabla poris_editores: quiénes pueden subir y borrar. Todos los demás solo miran.
-- Correr en el SQL Editor de Supabase. Se puede volver a correr sin problema.
--
-- Después, sumate como editor (con el email de tu cuenta del sitio; no lo dejes en el repo, que es público):
--   insert into poris_editores (usuario) select id from auth.users where email = 'TU_EMAIL' on conflict do nothing;

-- ===== EDITORES =====
create table if not exists poris_editores (
  usuario uuid primary key references auth.users on delete cascade
);
alter table poris_editores enable row level security;

-- Cada uno solo puede ver si él mismo es editor (así Poris sabe si mostrar el «+»).
drop policy if exists "editor se ve a si mismo" on poris_editores;
create policy "editor se ve a si mismo" on poris_editores
  for select to authenticated using (usuario = auth.uid());

create or replace function es_editor_poris()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from poris_editores where usuario = auth.uid());
$$;

-- ===== VIDEOS =====
create table if not exists poris_videos (
  id uuid primary key default gen_random_uuid(),
  carpeta text not null check (length(btrim(carpeta)) between 1 and 60),
  clase text not null check (length(btrim(clase)) between 1 and 60),
  titulo text not null default '',
  ruta text not null unique,          -- nombre del archivo en el bucket: <uuid>.<ext>
  subido_por uuid default auth.uid() references auth.users on delete set null,
  creado_at timestamptz not null default now()
);
create index if not exists poris_videos_carpeta_clase on poris_videos (carpeta, clase);
alter table poris_videos enable row level security;

drop policy if exists "videos publicos" on poris_videos;
create policy "videos publicos" on poris_videos
  for select to anon, authenticated using (true);

drop policy if exists "editores suben videos" on poris_videos;
create policy "editores suben videos" on poris_videos
  for insert to authenticated with check (es_editor_poris());

drop policy if exists "editores borran videos" on poris_videos;
create policy "editores borran videos" on poris_videos
  for delete to authenticated using (es_editor_poris());

-- ===== STORAGE =====
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('poris-videos', 'poris-videos', true, 52428800, array['video/mp4', 'video/webm', 'video/quicktime'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- El bucket es público: los archivos se leen por URL sin policy. Subir y borrar, solo editores.
drop policy if exists "poris-videos: editores suben" on storage.objects;
create policy "poris-videos: editores suben" on storage.objects
  for insert to authenticated with check (bucket_id = 'poris-videos' and public.es_editor_poris());

-- Storage pide permiso de lectura sobre la fila para poder borrarla.
drop policy if exists "poris-videos: editores leen" on storage.objects;
create policy "poris-videos: editores leen" on storage.objects
  for select to authenticated using (bucket_id = 'poris-videos' and public.es_editor_poris());

drop policy if exists "poris-videos: editores borran" on storage.objects;
create policy "poris-videos: editores borran" on storage.objects
  for delete to authenticated using (bucket_id = 'poris-videos' and public.es_editor_poris());
