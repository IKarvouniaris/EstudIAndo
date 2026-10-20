-- Fase 8 (Estadística General, 2.º parcial) · estudIAndo
-- Suma los temas del 2.º parcial (continuas, fenómenos de vida, normal y Poisson) al simulacro de Estadística:
--   1) iniciar_intento_num recibe, opcional, la lista de temas entre los que sortear (el 1.er parcial y el 2.º
--      parcial se rinden por separado; sin lista sortea entre todos, como antes).
--   2) dominio_estadistica pone nombre a los temas nuevos.
-- Correr en el SQL Editor de Supabase DESPUÉS de fase6_estadistica.sql, y ANTES de correr el nuevo
-- seed_estadistica.sql (que carga los ejercicios nuevos). Se puede volver a correr sin problema.

-- La firma cambia (parámetro nuevo): hay que borrar la anterior para no dejar dos sobrecargas.
drop function if exists iniciar_intento_num(text, int);

create or replace function iniciar_intento_num(p_materia text, p_cantidad int default 5, p_temas text[] default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_excluidos text[];
  v_temas int;
  v_resto int;
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

  select coalesce(ejercicios, '{}') into v_excluidos from intentos
  where usuario = auth.uid() and modo = 'examen' and materia = p_materia
  order by inicio_at desc limit 1;
  v_excluidos := coalesce(v_excluidos, '{}');

  select count(distinct tema) into v_temas from ejercicios_num
  where materia = p_materia and (p_temas is null or tema = any(p_temas));
  v_resto := greatest(0, p_cantidad - v_temas);

  with cand as (
    select id, tema, (id = any(v_excluidos)) as visto from ejercicios_num
    where materia = p_materia and (p_temas is null or tema = any(p_temas))
  ),
  un_por_tema as (
    select distinct on (tema) id from cand order by tema, visto asc, random()
  ),
  resto as (
    select id from cand where id not in (select id from un_por_tema) order by visto asc, random() limit v_resto
  )
  select array_agg(id) into v_elegidos from (
    select id from (
      select id, 0 as prio from un_por_tema
      union all
      select id, 1 as prio from resto
    ) u order by prio, random() limit p_cantidad
  ) f;

  if v_elegidos is null then raise exception 'no hay ejercicios cargados'; end if;

  insert into intentos (usuario, materia, modo, casos, ejercicios, inicio_at)
  values (auth.uid(), p_materia, 'examen', '{}', v_elegidos, now())
  returning id into v_intento;

  select jsonb_agg(jsonb_build_object(
    'id', en.id, 'tema', en.tema, 'titulo', en.titulo, 'enunciado', en.enunciado,
    'datos', en.datos, 'partes', en.partes
  ) order by en.orden)
  into v_ejercicios
  from ejercicios_num en where en.id = any(v_elegidos);

  return jsonb_build_object('intento_id', v_intento, 'inicio_at', now(), 'ejercicios', v_ejercicios);
end;
$$;

revoke all on function iniciar_intento_num(text, int, text[]) from public;
grant execute on function iniciar_intento_num(text, int, text[]) to authenticated;

-- Dominio por tema: mismos nombres de siempre + los cuatro temas nuevos.
create or replace function dominio_estadistica()
returns table (tema text, dominio_pct int, respondidas bigint)
language sql
security definer
set search_path = public
as $$
  select
    case en.tema
      when 'descriptiva' then 'Estadística descriptiva'
      when 'probabilidad' then 'Probabilidad y Bayes'
      when 'discreta' then 'Variables discretas'
      when 'binomial' then 'Binomial y Pascal'
      when 'hiper' then 'Hipergeométrico y combinados'
      when 'continua' then 'Variables continuas'
      when 'vida' then 'Fenómenos de vida'
      when 'normal' then 'Normal y log-normal'
      when 'poisson' then 'Proceso de Poisson'
      else initcap(en.tema)
    end as tema,
    round(100.0 * count(*) filter (where nr.correcta) / count(*))::int as dominio_pct,
    count(*) as respondidas
  from num_respuestas nr
  join intentos i on i.id = nr.intento
  join ejercicios_num en on en.id = nr.ejercicio_id
  where i.usuario = auth.uid() and i.materia = 'estadistica' and i.fin_at is not null and nr.correcta is not null
  group by en.tema
  order by min(en.orden);
$$;

grant execute on function dominio_estadistica() to authenticated;
