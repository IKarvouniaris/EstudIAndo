-- Fase 6 (dominio por tema) · estudIAndo
-- "Tu dominio por tema": barras de progreso en el propio apunte, calculadas a
-- partir de los exámenes puntuados ya rendidos (la práctica libre no cuenta).
-- Correr en el SQL Editor de Supabase, después de fase5_python.sql.

-- Ética: % de aciertos por unidad (u=1..4), a partir de las respuestas de
-- opción múltiple de los exámenes finalizados del usuario que llama.
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

-- Python: promedio del % de tareas cumplidas (según Gemini) por tema, a partir
-- de los ejercicios de código ya corregidos de los exámenes del usuario que llama.
create or replace function dominio_python()
returns table (tema text, dominio_pct int, respondidas bigint)
language sql
security definer
set search_path = public
as $$
  select
    initcap(ec.tema) as tema,
    round(avg(ce.puntaje_ia))::int as dominio_pct,
    count(*) as respondidas
  from codigo_entregas ce
  join intentos i on i.id = ce.intento
  join ejercicios_codigo ec on ec.id = ce.ejercicio_id
  where i.usuario = auth.uid() and i.materia = 'python' and ce.corregido_at is not null
  group by ec.tema
  order by ec.tema;
$$;

revoke all on function dominio_python() from public;
grant execute on function dominio_python() to authenticated;
