"""Genera supabase/seed_etica.sql a partir de tools/casos_etica.json.

Separa lo público (casos, preguntas: sin decir cuál opción es correcta)
de lo privado (preguntas_clave: ok, explicacion, porque, respuesta modelo).

Uso: python tools/seed.py
"""
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "tools" / "casos_etica.json"
SALIDA = RAIZ / "supabase" / "seed_etica.sql"
MATERIA = "etica"


def sql_str(valor):
    if valor is None:
        return "null"
    return "'" + str(valor).replace("'", "''") + "'"


def sql_json(valor):
    return "'" + json.dumps(valor, ensure_ascii=False).replace("'", "''") + "'::jsonb"


def id_pregunta(caso_n, sub):
    return f"{MATERIA}-{caso_n}-{sub}"


def main():
    casos = json.loads(ENTRADA.read_text(encoding="utf-8"))

    lineas = [
        "-- Generado por tools/seed.py — no editar a mano, volver a correr el script.",
        f"-- {len(casos)} casos, {sum(len(c['preguntas']) for c in casos)} preguntas.",
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
    lineas.append(",\n".join(filas_casos) + ";")
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
    lineas.append(",\n".join(filas_preguntas) + ";")
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
    lineas.append(",\n".join(filas_clave) + ";")
    lineas.append("")

    SALIDA.write_text("\n".join(lineas), encoding="utf-8")
    print(f"Escrito {SALIDA} ({len(casos)} casos, {len(filas_preguntas)} preguntas)")


if __name__ == "__main__":
    main()
