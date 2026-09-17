"""Genera supabase/seed_python.sql a partir de tools/ejercicios_python.json.

Separa lo público (ejercicios_codigo: enunciado, datos, tareas) de lo
privado (ejercicios_codigo_clave: solución de referencia).

Uso: python tools/seed_python.py
"""
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "tools" / "ejercicios_python.json"
SALIDA = RAIZ / "supabase" / "seed_python.sql"
MATERIA = "python"


def sql_str(valor):
    if valor is None:
        return "null"
    return "'" + str(valor).replace("'", "''") + "'"


def sql_json(valor):
    return "'" + json.dumps(valor, ensure_ascii=False).replace("'", "''") + "'::jsonb"


def main():
    ejercicios = json.loads(ENTRADA.read_text(encoding="utf-8"))

    lineas = [
        "-- Generado por tools/seed_python.py — no editar a mano, volver a correr el script.",
        f"-- {len(ejercicios)} ejercicios de código.",
        "",
        "insert into ejercicios_codigo (id, materia, tema, titulo, enunciado, datos_trabajo, tareas) values",
    ]
    filas = []
    for e in ejercicios:
        filas.append(
            "  (" + ", ".join([
                sql_str(e["id"]), sql_str(MATERIA), sql_str(e["tema"]), sql_str(e["titulo"]),
                sql_str(e["enunciado"]), sql_str(e["datos_trabajo"]), sql_json(e["tareas"]),
            ]) + ")"
        )
    lineas.append(",\n".join(filas) + ";")
    lineas.append("")

    lineas.append("insert into ejercicios_codigo_clave (ejercicio_id, solucion) values")
    filas_clave = [
        "  (" + sql_str(e["id"]) + ", " + sql_str(e["solucion"]) + ")" for e in ejercicios
    ]
    lineas.append(",\n".join(filas_clave) + ";")
    lineas.append("")

    SALIDA.write_text("\n".join(lineas), encoding="utf-8")
    print(f"Escrito {SALIDA} ({len(ejercicios)} ejercicios)")


if __name__ == "__main__":
    main()
