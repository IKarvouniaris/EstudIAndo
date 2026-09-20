-- Fase 6 (Estadística General) · estudIAndo
-- Nueva materia con un tercer modelo de examen: ejercicios de cálculo donde el estudiante
-- escribe SÓLO el resultado numérico de cada parte. La corrección es automática y vive en
-- Postgres (no hace falta Gemini): mismo patrón de seguridad que preguntas_clave — los
-- valores correctos y la resolución están en una tabla SIN policies de lectura y sólo se
-- leen desde funciones SECURITY DEFINER.
-- Correr en el SQL Editor de Supabase, después de fase5_python.sql. Después correr
-- seed_estadistica.sql.

-- Ejercicios públicos (sin las respuestas).
create table ejercicios_num (
  id text primary key,              -- ej: 'estadistica-B3'
  materia text not null,
  tema text not null,               -- descriptiva | probabilidad | discreta | binomial | hiper
  orden int not null,               -- orden pedagógico dentro del banco
  titulo text not null,
  enunciado text,
  datos text,                       -- tabla o datos en texto monoespaciado (puede ser vacío)
  partes jsonb not null             -- [{id, etiqueta, ayuda}]
);

-- Respuestas y resolución paso a paso. PRIVADA: sin policies de lectura a propósito.
create table ejercicios_num_clave (
  ejercicio_id text primary key references ejercicios_num,
  claves jsonb not null,            -- [{id, valor, tol_abs, tol_rel, alt_pct}]
  resolucion text not null
);

alter table ejercicios_num enable row level security;
alter table ejercicios_num_clave enable row level security;
create policy "lectura ejercicios num" on ejercicios_num for select to authenticated using (true);

-- Respuestas de un intento: una fila por parte de cada ejercicio del examen.
create table num_respuestas (
  intento uuid references intentos on delete cascade,
  ejercicio_id text references ejercicios_num not null,
  parte text not null,
  valor numeric,                    -- null = sin responder
  correcta boolean,                 -- se calcula al finalizar
  actualizado_at timestamptz not null default now(),
  primary key (intento, ejercicio_id, parte)
);

alter table num_respuestas enable row level security;
create policy "cada uno ve sus respuestas num" on num_respuestas for select to authenticated using (
  exists (select 1 from intentos i where i.id = num_respuestas.intento and i.usuario = auth.uid())
);
-- Sin policy de insert/update: se escribe sólo vía guardar_respuesta_num() y finalizar_intento_num().

-- ¿La respuesta x coincide con la clave k? Tolerancia: max(tol_abs, tol_rel·|valor|).
-- Si alt_pct, también se acepta la misma cantidad escrita en la otra escala (0,49 ↔ 49).
create or replace function num_ok(x numeric, k jsonb)
returns boolean
language sql
immutable
as $$
  select x is not null and (
    abs(x - (k->>'valor')::numeric)
      <= greatest((k->>'tol_abs')::numeric, (k->>'tol_rel')::numeric * abs((k->>'valor')::numeric))
    or (
      coalesce((k->>'alt_pct')::boolean, false) and (
        abs(x - (k->>'valor')::numeric * 100)
          <= greatest((k->>'tol_abs')::numeric * 100, (k->>'tol_rel')::numeric * abs((k->>'valor')::numeric * 100))
        or abs(x - (k->>'valor')::numeric / 100)
          <= greatest((k->>'tol_abs')::numeric / 100, (k->>'tol_rel')::numeric * abs((k->>'valor')::numeric / 100))
      )
    )
  );
$$;

revoke all on function num_ok(numeric, jsonb) from public;
grant execute on function num_ok(numeric, jsonb) to authenticated;

-- Arranca un examen: sortea 1 ejercicio por tema (evitando los del último intento si alcanza) y
-- completa hasta p_cantidad. El examen reutiliza intentos.ejercicios (text[]) como el de Python.
create or replace function iniciar_intento_num(p_materia text, p_cantidad int default 5)
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

  select count(distinct tema) into v_temas from ejercicios_num where materia = p_materia;
  v_resto := greatest(0, p_cantidad - v_temas);

  with cand as (
    select id, tema, (id = any(v_excluidos)) as visto from ejercicios_num where materia = p_materia
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

revoke all on function iniciar_intento_num(text, int) from public;
grant execute on function iniciar_intento_num(text, int) to authenticated;

-- Guarda (o borra, si p_valor es null) la respuesta de una parte del intento en curso.
create or replace function guardar_respuesta_num(p_intento_id uuid, p_ejercicio_id text, p_parte text, p_valor numeric)
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
  if now() - v_intento.inicio_at > interval '65 minutes' then raise exception 'tiempo agotado'; end if;
  if not (p_ejercicio_id = any(v_intento.ejercicios)) then raise exception 'ese ejercicio no es parte de este intento'; end if;
  if not exists (
    select 1 from ejercicios_num en, jsonb_array_elements(en.partes) p
    where en.id = p_ejercicio_id and p->>'id' = p_parte
  ) then raise exception 'esa parte no existe'; end if;

  if p_valor is null then
    delete from num_respuestas where intento = p_intento_id and ejercicio_id = p_ejercicio_id and parte = p_parte;
  else
    insert into num_respuestas (intento, ejercicio_id, parte, valor)
    values (p_intento_id, p_ejercicio_id, p_parte, p_valor)
    on conflict (intento, ejercicio_id, parte) do update set valor = excluded.valor, actualizado_at = now();
  end if;
end;
$$;

revoke all on function guardar_respuesta_num(uuid, text, text, numeric) from public;
grant execute on function guardar_respuesta_num(uuid, text, text, numeric) to authenticated;

-- Corrige y cierra el intento. Devuelve, por ejercicio, cada parte con lo que puso el estudiante,
-- si estuvo bien, el valor esperado y la resolución (ya terminó: no hay nada que proteger).
create or replace function finalizar_intento_num(p_intento_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_intento record;
  v_puntaje int;
  v_total int;
  v_pct int;
  v_detalle jsonb;
begin
  select * into v_intento from intentos where id = p_intento_id and usuario = auth.uid();
  if not found then raise exception 'intento no encontrado'; end if;

  if v_intento.fin_at is null then
    -- Toda parte del examen tiene una fila: las que no se respondieron quedan en null / incorrecta.
    insert into num_respuestas (intento, ejercicio_id, parte, valor)
    select p_intento_id, ek.ejercicio_id, c->>'id', null
    from ejercicios_num_clave ek, jsonb_array_elements(ek.claves) c
    where ek.ejercicio_id = any(v_intento.ejercicios)
    on conflict (intento, ejercicio_id, parte) do nothing;

    update num_respuestas nr
    set correcta = coalesce(num_ok(nr.valor, c), false)
    from ejercicios_num_clave ek, jsonb_array_elements(ek.claves) c
    where nr.intento = p_intento_id and nr.ejercicio_id = ek.ejercicio_id and c->>'id' = nr.parte;

    select count(*) filter (where correcta), count(*) into v_puntaje, v_total
    from num_respuestas where intento = p_intento_id;
    v_pct := case when v_total > 0 then round(100.0 * v_puntaje / v_total)::int else 0 end;

    update intentos
    set fin_at = now(), puntaje = v_puntaje, total = v_total, puntaje_final_pct = v_pct
    where id = p_intento_id;
  end if;

  select puntaje, total, puntaje_final_pct into v_puntaje, v_total, v_pct from intentos where id = p_intento_id;

  select jsonb_agg(jsonb_build_object(
    'ejercicio_id', en.id, 'titulo', en.titulo, 'tema', en.tema, 'resolucion', ek.resolucion,
    'partes', (
      select jsonb_agg(jsonb_build_object(
        'id', p->>'id', 'etiqueta', p->>'etiqueta',
        'valor_usuario', nr.valor, 'correcta', coalesce(nr.correcta, false),
        'esperado', (select (c->>'valor')::numeric from jsonb_array_elements(ek.claves) c where c->>'id' = p->>'id')
      ) order by p->>'id')
      from jsonb_array_elements(en.partes) p
      left join num_respuestas nr on nr.intento = p_intento_id and nr.ejercicio_id = en.id and nr.parte = p->>'id'
    )
  ) order by en.orden)
  into v_detalle
  from ejercicios_num en
  join ejercicios_num_clave ek on ek.ejercicio_id = en.id
  where en.id = any(v_intento.ejercicios);

  return jsonb_build_object(
    'puntaje', v_puntaje, 'total', v_total, 'puntaje_final_pct', v_pct,
    'duracion_seg', (select extract(epoch from (fin_at - inicio_at))::int from intentos where id = p_intento_id),
    'detalle', v_detalle
  );
end;
$$;

revoke all on function finalizar_intento_num(uuid) from public;
grant execute on function finalizar_intento_num(uuid) to authenticated;

-- Práctica libre: ¿está bien esta respuesta? (sin revelar el valor).
create or replace function verificar_num(p_ejercicio_id text, p_parte text, p_valor numeric)
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce(bool_or(num_ok(p_valor, c)), false)
  from ejercicios_num_clave ek, jsonb_array_elements(ek.claves) c
  where ek.ejercicio_id = p_ejercicio_id and c->>'id' = p_parte;
$$;

revoke all on function verificar_num(text, text, numeric) from public;
grant execute on function verificar_num(text, text, numeric) to authenticated;

-- Práctica libre: la resolución paso a paso.
create or replace function revelar_resolucion_num(p_ejercicio_id text)
returns text
language sql
security definer
set search_path = public
as $$
  select resolucion from ejercicios_num_clave where ejercicio_id = p_ejercicio_id;
$$;

revoke all on function revelar_resolucion_num(text) from public;
grant execute on function revelar_resolucion_num(text) to authenticated;

-- Leaderboard de Estadística: promedio de los últimos 5 intentos (% de respuestas correctas),
-- desempate por menor duración.
create or replace function leaderboard_estadistica()
returns table (
  nombre text, avatar text, intentos_totales bigint,
  promedio_ult5_pct int, mejor_pct int, duracion_prom_seg int
)
language sql
security definer
set search_path = public
as $$
  with intentos_est as (
    select *, coalesce(puntaje_final_pct, 0) as pct
    from intentos where materia = 'estadistica' and modo = 'examen' and fin_at is not null
  ),
  ultimos5 as (
    select *, row_number() over (partition by usuario order by fin_at desc) as rn
    from intentos_est
  ),
  agregado as (
    select usuario,
           avg(pct) filter (where rn <= 5) as promedio_ult5,
           avg(extract(epoch from (fin_at - inicio_at))) filter (where rn <= 5) as duracion_prom_seg
    from ultimos5 group by usuario
  ),
  totales as (
    select usuario, count(*) as intentos_totales, max(pct) as mejor_pct
    from intentos_est group by usuario
  )
  select pf.nombre, pf.avatar, t.intentos_totales,
         round(a.promedio_ult5)::int, t.mejor_pct, round(a.duracion_prom_seg)::int
  from totales t
  join agregado a using (usuario)
  join perfiles pf on pf.id = t.usuario
  order by a.promedio_ult5 desc nulls last, a.duracion_prom_seg asc nulls last;
$$;

revoke all on function leaderboard_estadistica() from public;
grant execute on function leaderboard_estadistica() to authenticated;

-- Dominio por tema (mismo contrato que dominio_etica / dominio_python): % de partes correctas en los
-- exámenes puntuados ya rendidos. Las partes sin responder cuentan como incorrectas.
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
