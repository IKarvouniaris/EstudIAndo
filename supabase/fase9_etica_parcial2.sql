-- Fase 9 · estudIAndo — Ética: simulacro del 2.º parcial
-- Corre DESPUÉS de seed_etica_parcial2.sql (necesita que los casos 13 a 20 ya existan).
-- Es idempotente: se puede volver a correr.
--
-- 1) iniciar_intento(p_materia, p_parcial): el examen puntuado sortea 2 casos del parcial elegido.
--    p_parcial = 1 → casos de las unidades 1 a 4 (clases 1 a 6); p_parcial = 2 → unidades 5 a 8 (clases 7 a 10).
--    Con un solo argumento sigue funcionando (por defecto es el 1.er parcial), así que una página vieja no se rompe.
-- 2) dominio_etica(): suma las unidades 5 a 8 al «dominio por tema».
-- El cooldown de 5 minutos, el leaderboard y la corrección no cambian: valen para los dos parciales.

-- La versión de un solo argumento se reemplaza por la que tiene p_parcial (si no, PostgREST vería dos funciones iguales).
drop function if exists iniciar_intento(text);

create or replace function iniciar_intento(p_materia text, p_parcial int default 1)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_umin int;
  v_umax int;
  v_excluidos int[];
  v_candidatos int[];
  v_elegidos int[];
  v_caso_desarrollo int;
  v_intento uuid;
  v_preguntas jsonb;
  v_desarrollo jsonb;
begin
  if p_parcial = 1 then v_umin := 1; v_umax := 4;
  elsif p_parcial = 2 then v_umin := 5; v_umax := 8;
  else raise exception 'parcial inválido';
  end if;

  if exists (
    select 1 from intentos
    where usuario = auth.uid() and modo = 'examen' and materia = p_materia
      and inicio_at > now() - interval '5 minutes'
  ) then
    raise exception 'cooldown';
  end if;

  -- Casos de los dos últimos intentos de ESTE parcial: se evitan para no repetir.
  select coalesce(array_agg(distinct elem), '{}') into v_excluidos
  from (
    select unnest(casos) as elem from (
      select casos from intentos
      where usuario = auth.uid() and modo = 'examen' and materia = p_materia
        and casos[1] in (select id from casos where materia = p_materia and u between v_umin and v_umax)
      order by inicio_at desc limit 2
    ) recientes
  ) flat;

  select coalesce(array_agg(id), '{}') into v_candidatos
  from casos
  where materia = p_materia and u between v_umin and v_umax and not (id = any(v_excluidos));

  if v_candidatos is null or array_length(v_candidatos, 1) < 2 then
    select coalesce(array_agg(id), '{}') into v_candidatos
    from casos where materia = p_materia and u between v_umin and v_umax;
  end if;

  if array_length(v_candidatos, 1) is null or array_length(v_candidatos, 1) < 2 then
    raise exception 'no hay casos cargados para ese parcial';
  end if;

  select array_agg(id) into v_elegidos from (
    select id from unnest(v_candidatos) as id order by random() limit 2
  ) sub;

  -- Cuál de los 2 casos lleva desarrollo escrito.
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
    'intento_id', v_intento, 'inicio_at', now(), 'preguntas', v_preguntas, 'desarrollo', v_desarrollo,
    'parcial', p_parcial
  );
end;
$$;

revoke all on function iniciar_intento(text, int) from public;
grant execute on function iniciar_intento(text, int) to authenticated;

-- Dominio por tema: ahora también las unidades del 2.º parcial.
create or replace function dominio_etica()
returns table (tema text, dominio_pct int, respondidas bigint)
language sql
security definer
set search_path = public
as $$
  select
    case c.u
      when 1 then 'Teorías y límites'
      when 2 then 'Principios y regulación'
      when 3 then 'Transparencia e impacto'
      when 4 then 'Datos personales'
      when 5 then 'Responsabilidad civil y penal'
      when 6 then 'Propiedad intelectual'
      when 7 then 'Dilemas: justicia y prueba digital'
      when 8 then 'Futuro e investigación'
      else 'Otro'
    end as tema,
    round(100.0 * count(*) filter (where r.correcta) / count(*))::int as dominio_pct,
    count(*) as respondidas
  from respuestas r
  join intentos i on i.id = r.intento
  join preguntas p on p.id = r.pregunta_id
  join casos c on c.id = p.caso_id
  where i.usuario = auth.uid() and i.materia = 'etica' and r.correcta is not null
  group by c.u
  order by c.u;
$$;

revoke all on function dominio_etica() from public;
grant execute on function dominio_etica() to authenticated;
