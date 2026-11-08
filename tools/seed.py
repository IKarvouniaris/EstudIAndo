"""Genera supabase/seed_etica.sql y supabase/seed_etica_parcial2.sql a partir de tools/casos_etica.json.

Separa lo público (casos, preguntas: sin decir cuál opción es correcta)
de lo privado (preguntas_clave: ok, explicacion, porque, respuesta modelo).

- seed_etica.sql: casos 1 a 12 (simulacro del 1.er parcial). Ya se corrió; no se toca.
- seed_etica_parcial2.sql: casos 13 en adelante (simulacro del 2.º parcial). Se puede volver a correr sin duplicar
  (usa «on conflict … do update»), así que sirve también para corregir un texto.

Uso: python tools/seed.py
"""
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "tools" / "casos_etica.json"
SALIDA = RAIZ / "supabase" / "seed_etica.sql"
SALIDA_P2 = RAIZ / "supabase" / "seed_etica_parcial2.sql"
ULTIMO_CASO_PARCIAL1 = 12
MATERIA = "etica"


def sql_str(valor):
    if valor is None:
        return "null"
    return "'" + str(valor).replace("'", "''") + "'"


def sql_json(valor):
    return "'" + json.dumps(valor, ensure_ascii=False).replace("'", "''") + "'::jsonb"


def id_pregunta(caso_n, sub):
    return f"{MATERIA}-{caso_n}-{sub}"


def generar(casos, idempotente):
    """Devuelve el texto SQL para estos casos. Con idempotente=True agrega «on conflict … do update»."""
    lineas = [
        "-- Generado por tools/seed.py — no editar a mano, volver a correr el script.",
        f"-- {len(casos)} casos, {sum(len(c['preguntas']) for c in casos)} preguntas.",
    ]
    if idempotente:
        lineas.append("-- Se puede correr más de una vez: si el caso ya existe, lo actualiza.")
    lineas += [
        "",
        "insert into casos (id, materia, bloque, u, nivel, ambito, titulo, escenario, conceptos, desarrollo_consigna, desarrollo_rubrica) values",
    ]

    filas_casos = []
    for c in casos:
        filas_casos.append(
            "  (" + ", ".join([
                str(c["n"]),
                sql_str(MATERIA),
                str(c["bloque"]),
                str(c["u"]),
                sql_str(c["nivel"]),
                sql_str(c["ambito"]),
                sql_str(c["titulo"]),
                sql_str(c["escenario"]),
                sql_str(c["conceptos"]),
                sql_str(c["desarrollo"]["consigna"]),
                sql_json(c["desarrollo"]["rubrica"]),
            ]) + ")"
        )
    cierre_casos = (
        "\non conflict (id) do update set materia = excluded.materia, bloque = excluded.bloque, u = excluded.u, "
        "nivel = excluded.nivel, ambito = excluded.ambito, titulo = excluded.titulo, escenario = excluded.escenario, "
        "conceptos = excluded.conceptos, desarrollo_consigna = excluded.desarrollo_consigna, "
        "desarrollo_rubrica = excluded.desarrollo_rubrica;"
        if idempotente else ";"
    )
    lineas.append(",\n".join(filas_casos) + cierre_casos)
    lineas.append("")

    lineas.append("insert into preguntas (id, caso_id, sub, texto, opciones) values")
    filas_preguntas = []
    for c in casos:
        for p in c["preguntas"]:
            filas_preguntas.append(
                "  (" + ", ".join([
                    sql_str(id_pregunta(c["n"], p["sub"])),
                    str(c["n"]),
                    sql_str(p["sub"]),
                    sql_str(p["texto"]),
                    sql_json(p["opciones"]),
                ]) + ")"
            )
    cierre_preguntas = (
        "\non conflict (id) do update set caso_id = excluded.caso_id, sub = excluded.sub, texto = excluded.texto, "
        "opciones = excluded.opciones;"
        if idempotente else ";"
    )
    lineas.append(",\n".join(filas_preguntas) + cierre_preguntas)
    lineas.append("")

    lineas.append("insert into preguntas_clave (pregunta_id, ok, explicacion, porque, desarrollo_modelo) values")
    filas_clave = []
    for c in casos:
        for p in c["preguntas"]:
            modelo = c["desarrollo"]["modelo"] if p["sub"] == "a" else None
            filas_clave.append(
                "  (" + ", ".join([
                    sql_str(id_pregunta(c["n"], p["sub"])),
                    sql_str(p["ok"]),
                    sql_str(p["exp"]),
                    sql_json(p["porque"]),
                    sql_str(modelo),
                ]) + ")"
            )
    cierre_clave = (
        "\non conflict (pregunta_id) do update set ok = excluded.ok, explicacion = excluded.explicacion, "
        "porque = excluded.porque, desarrollo_modelo = excluded.desarrollo_modelo;"
        if idempotente else ";"
    )
    lineas.append(",\n".join(filas_clave) + cierre_clave)
    lineas.append("")
    return "\n".join(lineas), len(filas_preguntas)


def main():
    casos = json.loads(ENTRADA.read_text(encoding="utf-8"))
    parcial1 = [c for c in casos if c["n"] <= ULTIMO_CASO_PARCIAL1]
    parcial2 = [c for c in casos if c["n"] > ULTIMO_CASO_PARCIAL1]

    texto, n = generar(parcial1, idempotente=False)
    SALIDA.write_text(texto, encoding="utf-8")
    print(f"Escrito {SALIDA} ({len(parcial1)} casos, {n} preguntas)")

    if parcial2:
        texto, n = generar(parcial2, idempotente=True)
        SALIDA_P2.write_text(texto, encoding="utf-8")
        print(f"Escrito {SALIDA_P2} ({len(parcial2)} casos, {n} preguntas)")


if __name__ == "__main__":
    main()
