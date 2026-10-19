-- Fase 7 · Cálculo I · endurecimiento (se corre DESPUÉS de fase7_calculo.sql; también es idempotente)

-- 1) Sólo los nombres de documento que usa la página: "progreso", "plan", "duo" y "pz-<id del ejercicio>".
--    NOT VALID: no revisa filas que ya existan, sólo las nuevas.
alter table calculo_docs drop constraint if exists calculo_docs_nombre;
alter table calculo_docs add constraint calculo_docs_nombre
  check (doc ~ '^(progreso|plan|duo|pz-[A-Za-z0-9-]{1,60})$') not valid;

-- 2) Tope de documentos por usuario (hoy hay ~100 ejercicios; 300 deja margen).
create or replace function calculo_docs_tope() returns trigger language plpgsql as $$
begin
  if (select count(*) from calculo_docs where usuario = new.usuario) >= 300 then
    raise exception 'calculo_docs: límite de documentos alcanzado';
  end if;
  return new;
end;
$$;
drop trigger if exists calculo_docs_tope on calculo_docs;
create trigger calculo_docs_tope before insert on calculo_docs
  for each row execute function calculo_docs_tope();

-- 3) calculo_merge sólo acepta un objeto como parche (un arreglo o un número dejaría el cuerpo con otra forma).
create or replace function calculo_merge(p_doc text, p_patch jsonb)
returns void language plpgsql security invoker as $$
begin
  if auth.uid() is null then raise exception 'no autenticado'; end if;
  if jsonb_typeof(p_patch) is distinct from 'object' then raise exception 'el parche debe ser un objeto'; end if;
  insert into calculo_docs as d (usuario, doc, cuerpo, actualizado_at)
  values (auth.uid(), p_doc, calculo_jsonb_merge('{}'::jsonb, p_patch), now())
  on conflict (usuario, doc) do update
    set cuerpo = calculo_jsonb_merge(d.cuerpo, excluded.cuerpo), actualizado_at = now();
end;
$$;

-- 4) Permisos como el resto del proyecto (revoke from public + grant al rol que corresponde).
--    calculo_jsonb_merge sigue ejecutable por "authenticated" porque calculo_merge la llama como invoker.
revoke all on function calculo_jsonb_merge(jsonb, jsonb) from public, anon;
revoke all on function calculo_merge(text, jsonb) from public, anon;
grant execute on function calculo_merge(text, jsonb) to authenticated;
