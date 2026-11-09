"""Publica el simulacro escrito del 2.º parcial de Intro a la IA.

Lee tools/situaciones_ia_p2.json y las clases de ia-conceptual.html, y escribe:
  - supabase/seed_ia_parcial2.sql  -> situaciones con su grilla + texto de las clases (contexto para la IA)
  - js/situaciones-ia-p2.js        -> consignas para la página (sin criterios: esos sólo los ve la función)

Uso:  python tools/seed_ia_parcial2.py
Volver a correrlo (y el SQL en Supabase) cada vez que cambian las situaciones o el texto de las clases.
"""
import json
import re
from html.parser import HTMLParser
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
JSON_SITUACIONES = RAIZ / "tools" / "situaciones_ia_p2.json"
APUNTE = RAIZ / "ia-conceptual.html"
SALIDA_SQL = RAIZ / "supabase" / "seed_ia_parcial2.sql"
SALIDA_JS = RAIZ / "js" / "situaciones-ia-p2.js"

BLOQUES = {"p", "div", "li", "tr", "dt", "dd", "h2", "h3", "h4", "figcaption", "caption", "article", "table", "ol", "ul", "section"}


class TextoDeSeccion(HTMLParser):
    """Pasa el HTML de una sección a texto plano, con un salto de línea por bloque y los h3 marcados."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.partes = []
        self.ignorar = 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "svg"):
            self.ignorar += 1
        elif tag in BLOQUES:
            self.partes.append("\n")
            if tag == "h3":
                self.partes.append("## ")
            elif tag == "h2":
                self.partes.append("# ")
        elif tag in ("td", "th"):
            self.partes.append(" | ")

    def handle_endtag(self, tag):
        if tag in ("script", "style", "svg"):
            self.ignorar -= 1
        elif tag in BLOQUES:
            self.partes.append("\n")

    def handle_data(self, data):
        if not self.ignorar:
            self.partes.append(data)

    def texto(self):
        crudo = "".join(self.partes)
        lineas = [re.sub(r"[ \t\r\f\v]+", " ", l).strip(" |") for l in crudo.split("\n")]
        return "\n".join(l for l in lineas if l)


def secciones(html):
    """{número de clase: (título, texto)} de cada <section id="cN">."""
    salida = {}
    for m in re.finditer(r'<section id="c(\d+)"[^>]*>(.*?)</section>', html, flags=re.S):
        n = int(m.group(1))
        cuerpo = m.group(2)
        titulo = re.search(r"<h2>(.*?)</h2>", cuerpo, flags=re.S)
        titulo = re.sub(r"<[^>]+>", "", titulo.group(1)).strip() if titulo else f"Clase {n}"
        p = TextoDeSeccion()
        p.feed(cuerpo)
        salida[n] = (titulo, p.texto())
    return salida


def sql_texto(s):
    return "'" + s.replace("'", "''") + "'"


def main():
    import sys
    sys.stdout.reconfigure(encoding="utf-8")
    datos = json.loads(JSON_SITUACIONES.read_text(encoding="utf-8"))["situaciones"]
    clases = secciones(APUNTE.read_text(encoding="utf-8"))
    usadas = sorted({c for s in datos for c in s["clases"]})
    faltan = [c for c in usadas if c not in clases]
    if faltan:
        raise SystemExit(f"Faltan en el apunte las clases {faltan}")

    for s in datos:
        assert [p["letra"] for p in s["partes"]] == ["a", "b", "c", "d"], s["id"]
        assert all(p["criterios"] for p in s["partes"]), s["id"]

    filas = []
    for s in datos:
        partes = json.dumps(s["partes"], ensure_ascii=False)
        filas.append(
            f"  ({s['id']}, {sql_texto(s['nivel'])}, {sql_texto(s['titulo'])}, {sql_texto(s['rol'])}, "
            f"{sql_texto(partes)}::jsonb, '{{{','.join(str(c) for c in s['clases'])}}}')"
        )
    contexto = []
    for c in usadas:
        titulo, texto = clases[c]
        contexto.append(f"  ({c}, {sql_texto(titulo)}, {sql_texto(texto)})")

    sql = (
        "-- Generado por tools/seed_ia_parcial2.py — no editar a mano, volver a correr el script.\n"
        f"-- {len(datos)} situaciones; contexto de las clases {', '.join(map(str, usadas))} del apunte.\n"
        "-- Requiere fase10_ia_parcial2.sql. Se puede correr más de una vez.\n\n"
        "insert into ia_situaciones (id, nivel, titulo, rol, partes, clases) values\n"
        + ",\n".join(filas)
        + "\non conflict (id) do update set nivel = excluded.nivel, titulo = excluded.titulo, rol = excluded.rol, "
        "partes = excluded.partes, clases = excluded.clases;\n\n"
        "insert into ia_contexto (clase, titulo, texto) values\n"
        + ",\n".join(contexto)
        + "\non conflict (clase) do update set titulo = excluded.titulo, texto = excluded.texto;\n"
    )
    SALIDA_SQL.write_text(sql, encoding="utf-8", newline="\n")

    publicas = [
        {
            "id": s["id"], "nivel": s["nivel"], "titulo": s["titulo"], "rol": s["rol"], "clases": s["clases"],
            "partes": [{"letra": p["letra"], "tipo": p["tipo"], "consigna": p["consigna"]} for p in s["partes"]],
        }
        for s in datos
    ]
    titulos = {c: clases[c][0] for c in usadas}
    js = (
        "/* Generado por tools/seed_ia_parcial2.py — no editar a mano. Consignas del simulacro escrito del\n"
        "   2.º parcial de Intro a la IA; los criterios de corrección viven sólo en la base (ia_situaciones). */\n"
        "window.SITUACIONES_IA_P2 = " + json.dumps(publicas, ensure_ascii=False, indent=1) + ";\n"
        "window.CLASES_IA_P2 = " + json.dumps({str(k): v for k, v in titulos.items()}, ensure_ascii=False) + ";\n"
    )
    SALIDA_JS.write_text(js, encoding="utf-8", newline="\n")

    total = sum(len(clases[c][1]) for c in usadas)
    print(f"OK: {len(datos)} situaciones -> {SALIDA_SQL.name} y {SALIDA_JS.name}")
    for c in usadas:
        print(f"  clase {c}: {len(clases[c][1]):>6} caracteres de contexto · {clases[c][0]}")
    print(f"  total de contexto: {total} caracteres")


if __name__ == "__main__":
    main()
