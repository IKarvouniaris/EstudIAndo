"""Genera supabase/seed_estadistica.sql a partir de tools/ejercicios_estadistica.json.

Separa lo público (ejercicios_num: enunciado, datos, etiquetas de las partes) de lo
privado (ejercicios_num_clave: valores correctos, tolerancias y resolución paso a paso).

Uso: python tools/generar_estadistica.py && python tools/seed_estadistica.py
"""
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "tools" / "ejercicios_estadistica.json"
SALIDA = RAIZ / "supabase" / "seed_estadistica.sql"
MATERIA = "estadistica"


def sql_str(valor):
    if valor is None:
        return "null"
    return "'" + str(valor).replace("'", "''") + "'"


def sql_json(valor):
    return "'" + json.dumps(valor, ensure_ascii=False).replace("'", "''") + "'::jsonb"


def main():
    ejercicios = json.loads(ENTRADA.read_text(encoding="utf-8"))

    lineas = [
        "-- Generado por tools/seed_estadistica.py — no editar a mano, volver a correr el script.",
        f"-- {len(ejercicios)} ejercicios, {sum(len(e['partes']) for e in ejercicios)} respuestas numéricas.",
        "-- Se puede volver a correr: actualiza los ejercicios existentes en lugar de duplicarlos.",
        "",
        "insert into ejercicios_num (id, materia, tema, orden, titulo, enunciado, datos, partes) values",
    ]
    filas = []
    for orden, e in enumerate(ejercicios, start=1):
        publicas = [{"id": p["id"], "etiqueta": p["etiqueta"], "ayuda": p.get("ayuda", "")} for p in e["partes"]]
        filas.append(
            "  (" + ", ".join([
                sql_str(e["id"]), sql_str(MATERIA), sql_str(e["tema"]), str(orden), sql_str(e["titulo"]),
                sql_str(e["enunciado"]), sql_str(e["datos"] or None), sql_json(publicas),
            ]) + ")"
        )
    lineas.append(",\n".join(filas))
    lineas.append("on conflict (id) do update set tema = excluded.tema, orden = excluded.orden, titulo = excluded.titulo,")
    lineas.append("  enunciado = excluded.enunciado, datos = excluded.datos, partes = excluded.partes;")
    lineas.append("")

    lineas.append("insert into ejercicios_num_clave (ejercicio_id, claves, resolucion) values")
    filas_clave = []
    for e in ejercicios:
        claves = [
            {"id": p["id"], "valor": p["valor"], "tol_abs": p["tol_abs"], "tol_rel": p["tol_rel"], "alt_pct": p["alt_pct"]}
            for p in e["partes"]
        ]
        filas_clave.append("  (" + sql_str(e["id"]) + ", " + sql_json(claves) + ", " + sql_str(e["resolucion"]) + ")")
    lineas.append(",\n".join(filas_clave))
    lineas.append("on conflict (ejercicio_id) do update set claves = excluded.claves, resolucion = excluded.resolucion;")
    lineas.append("")

    SALIDA.write_text("\n".join(lineas), encoding="utf-8")
    print(f"Escrito {SALIDA} ({len(ejercicios)} ejercicios)")


if __name__ == "__main__":
    main()
