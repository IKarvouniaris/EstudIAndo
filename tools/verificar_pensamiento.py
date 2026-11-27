"""Verifica el laboratorio de Pensamiento Computacional (js/entrenador-pensamiento-datos.js).

Para cada ejercicio comprueba, con el MISMO corrector que corre en el navegador
(js/entrenador-pensamiento-harness.js):
  1. la solución pasa todas las verificaciones;
  2. el código inicial NO las pasa todas (si no, el ejercicio se «resuelve» sin hacer nada);
  3. ids únicos y grupos conocidos; cada ejercicio con tests, solución y variables.

Uso:  python tools/verificar_pensamiento.py [id ...]
Requiere node (para leer los .js) y python 3.
"""
import json
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
JS = RAIZ / "js"

NODO = """
const fs = require('fs'), vm = require('vm');
const ctx = {}; vm.createContext(ctx);
for (const f of ['entrenador-pensamiento-harness.js', 'entrenador-pensamiento-datos.js']) {
  vm.runInContext(fs.readFileSync(process.argv[1] + '/' + f, 'utf8') + '\\n;this.__x = typeof EJERCICIOS !== "undefined" ? EJERCICIOS : this.__x', ctx);
}
const salida = { harness: vm.runInContext('HARNESS_PY', ctx), ejercicios: vm.runInContext('EJERCICIOS', ctx), grupos: vm.runInContext('GRUPOS', ctx) };
process.stdout.write(JSON.stringify(salida));
"""


def cargar():
    r = subprocess.run(["node", "-e", NODO, str(JS)], capture_output=True, text=True, encoding="utf-8")
    if r.returncode != 0:
        sys.exit("No se pudo leer los .js:\n" + r.stderr)
    return json.loads(r.stdout)


def correr(ns_h, ej, codigo):
    res = ns_h["_correr"](
        codigo,
        json.dumps(ej["tests"]),
        json.dumps(ej.get("entradas", [])),
        json.dumps(ej.get("prohibido", [])),
        bool(ej.get("regla")),
    )
    return json.loads(res)


def main():
    datos = cargar()
    ns_h = {"__name__": "harness"}
    exec(compile(datos["harness"], "harness.py", "exec"), ns_h)
    solo = set(sys.argv[1:])
    grupos = {g["id"] for g in datos["grupos"]}
    ids = set()
    errores = []
    for ej in datos["ejercicios"]:
        if solo and ej["id"] not in solo:
            continue
        eid = ej["id"]
        if eid in ids:
            errores.append(f"{eid}: id repetido")
        ids.add(eid)
        if ej["grupo"] not in grupos:
            errores.append(f"{eid}: grupo desconocido {ej['grupo']!r}")
        for campo in ("titulo", "enunciado", "tareas", "variables", "inicial", "tests", "solucion"):
            if not ej.get(campo):
                errores.append(f"{eid}: falta {campo}")
        if errores and errores[-1].startswith(eid + ": falta"):
            continue
        r = correr(ns_h, ej, ej["solucion"])
        malos = [t for t in r["tests"] if not t["ok"]]
        if r["error"] or malos or not r["tests"]:
            detalle = r["error"] or "; ".join(f"{t['nombre']} -> {t['detalle']}" for t in malos) or "sin tests"
            errores.append(f"{eid}: la SOLUCIÓN no pasa: {detalle}")
            continue
        r0 = correr(ns_h, ej, ej["inicial"])
        if not r0["error"] and all(t["ok"] for t in r0["tests"]):
            errores.append(f"{eid}: el código INICIAL ya pasa todos los tests")
            continue
        queda = "error de ejecución" if r0["error"] else f"{sum(1 for t in r0['tests'] if t['ok'])}/{len(r0['tests'])} tests"
        print(f"ok  {eid:8} {ej['titulo'][:46]:46} (inicial: {queda})")
    if errores:
        print("\nFALLAS:")
        for e in errores:
            print(" -", e)
        sys.exit(1)
    print(f"\n{len(ids)} ejercicios verificados.")


if __name__ == "__main__":
    main()
