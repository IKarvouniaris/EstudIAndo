"""Genera tools/ejercicios_estadistica.json: banco de ejercicios de Estadística General (1er parcial).

Cada respuesta numérica se CALCULA acá (no se copia a mano) y, cuando el ejercicio sale de la
guía de la cátedra, se verifica contra la respuesta impresa en la guía (assert). Si un número
no coincide, el script falla en vez de publicar un dato mal.

Uso: python tools/generar_estadistica.py   (después: python tools/seed_estadistica.py)
"""
import json
from math import comb, sqrt
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "tools" / "ejercicios_estadistica.json"


# ---------- Distribuciones (notación de la cátedra: F = P(X<=x), G = P(X>=x)) ----------
def b_pmf(r, n, p):
    return comb(n, r) * p**r * (1 - p) ** (n - r)


def Fb(r, n, p):  # P(X <= r)
    return sum(b_pmf(k, n, p) for k in range(0, r + 1))


def Gb(r, n, p):  # P(X >= r)
    return sum(b_pmf(k, n, p) for k in range(r, n + 1))


def pa_pmf(n, r, p):  # n ensayos hasta el r-ésimo éxito
    return comb(n - 1, r - 1) * p**r * (1 - p) ** (n - r) if n >= r else 0.0


def Fpa(n, r, p):  # P(N <= n)
    return sum(pa_pmf(k, r, p) for k in range(r, n + 1))


def h_pmf(r, n, N, R):
    if r < 0 or r > min(n, R) or n - r > N - R:
        return 0.0
    return comb(R, r) * comb(N - R, n - r) / comb(N, n)


def Fh(r, n, N, R):  # P(X <= r)
    return sum(h_pmf(k, n, N, R) for k in range(0, r + 1))


def hp_pmf(n, r, N, R):  # n extracciones hasta el r-ésimo éxito (hiperPascal)
    if n < r or n > N - R + r:
        return 0.0
    return comb(R, r - 1) * comb(N - R, n - r) / comb(N, n - 1) * (R - r + 1) / (N - n + 1)


# ---------- Datos agrupados ----------
class Agrupado:
    def __init__(self, clases):
        self.c = clases  # [(li, ls, f)]
        self.n = sum(f for _, _, f in clases)
        self.A = clases[0][1] - clases[0][0]
        self.marcas = [(li + ls) / 2 for li, ls, _ in clases]
        self.acum = []
        s = 0
        for _, _, f in clases:
            s += f
            self.acum.append(s)

    def media(self):
        return sum(x * f for x, (_, _, f) in zip(self.marcas, self.c)) / self.n

    def var(self):  # muestral (n-1), como en el repaso de la cátedra
        m = self.media()
        return sum(f * (x - m) ** 2 for x, (_, _, f) in zip(self.marcas, self.c)) / (self.n - 1)

    def desvio(self):
        return sqrt(self.var())

    def cv(self):
        return self.desvio() / self.media() * 100

    def percentil(self, p):  # p en [0,1]
        pos = p * self.n
        for i, (li, _, f) in enumerate(self.c):
            if self.acum[i] >= pos:
                previa = self.acum[i - 1] if i else 0
                return li + (pos - previa) / f * self.A
        raise ValueError

    def mediana(self):
        return self.percentil(0.5)

    def moda(self):
        i = max(range(len(self.c)), key=lambda k: self.c[k][2])
        f = self.c[i][2]
        d1 = f - (self.c[i - 1][2] if i else 0)
        d2 = f - (self.c[i + 1][2] if i + 1 < len(self.c) else 0)
        return self.c[i][0] + d1 / (d1 + d2) * self.A

    def prob_menor(self, x):  # P(X < x) interpolando en la ojiva
        for i, (li, ls, f) in enumerate(self.c):
            if x <= ls:
                previa = self.acum[i - 1] if i else 0
                return (previa + (x - li) / self.A * f) / self.n
        return 1.0


def cerca(valor, esperado, tol):
    assert abs(valor - esperado) <= tol, f"{valor} != {esperado} (tol {tol})"


def num(x, dec=4):
    """Para mostrar en la resolución con coma decimal, como se escribe en la cátedra."""
    return f"{x:.{dec}f}".replace(".", ",")


# ---------- Definición de partes ----------
def parte(pid, etiqueta, valor, tipo="prob", ayuda=""):
    """tipo: 'prob' (decimal 0-1, acepta también en %), 'pct' (porcentaje, acepta también en decimal),
    'num' (número con unidades), 'ent' (entero exacto)."""
    d = {"id": pid, "etiqueta": etiqueta, "valor": valor, "ayuda": ayuda}
    if tipo == "prob":
        d.update(tol_abs=0.0006, tol_rel=0.01, alt_pct=True)
    elif tipo == "pct":
        d.update(tol_abs=0.06, tol_rel=0.01, alt_pct=True)
    elif tipo == "num":
        d.update(tol_abs=0.005, tol_rel=0.01, alt_pct=False)
    elif tipo == "ent":
        d.update(tol_abs=0.01, tol_rel=0.0, alt_pct=False)
    return d


def tabla(filas, cab):
    ancho = [max(len(str(x)) for x in col) for col in zip(cab, *filas)]
    lin = lambda fila: "  ".join(str(x).ljust(w) for x, w in zip(fila, ancho))
    return "\n".join([lin(cab), lin(["-" * w for w in ancho])] + [lin(f) for f in filas])


EJ = []


def ej(id_, tema, titulo, enunciado, partes, resolucion, datos="", fuente=""):
    EJ.append({
        "id": "estadistica-" + id_, "tema": tema, "titulo": titulo, "enunciado": enunciado,
        "datos": datos, "partes": partes, "resolucion": resolucion.strip(), "fuente": fuente,
    })


# =====================================================================================
# DESCRIPTIVA
# =====================================================================================
g = Agrupado([(45, 50, 6), (50, 55, 14), (55, 60, 22), (60, 65, 18), (65, 70, 10), (70, 75, 5)])
cerca(g.media(), 59.3, 0.01); cerca(g.mediana(), 58.98, 0.01); cerca(g.moda(), 58.33, 0.01)
cerca(g.desvio(), 6.66, 0.01); cerca(g.percentil(0.25), 54.55, 0.01); cerca(g.percentil(0.75), 63.96, 0.01)
cerca(g.cv(), 11.23, 0.01)
ej("D1", "descriptiva", "Tiempos de fractura del acero",
   "En un laboratorio se registraron los minutos que tardan muestras de acero en fracturarse bajo una prueba de "
   "resistencia. Los tiempos se agruparon en intervalos (datos de la muestra, usar varianza muestral con n-1).",
   [parte("a", "Media (min)", round(g.media(), 4), "num"),
    parte("b", "Mediana (min)", round(g.mediana(), 4), "num"),
    parte("c", "Moda (min)", round(g.moda(), 4), "num"),
    parte("d", "Desvío estándar (min)", round(g.desvio(), 4), "num"),
    parte("e", "Tiempo máximo del 25 % de las muestras más rápidas: Q1 (min)", round(g.percentil(0.25), 4), "num"),
    parte("f", "Coeficiente de variación (%)", round(g.cv(), 4), "num", "Sin el símbolo %")],
   f"""Tabla auxiliar (marca de clase xi, F acumulada): n = 75, ancho A = 5.
Media = Σ xi·fi / n = 4447,5 / 75 = {num(g.media(),2)} min.
Mediana: n/2 = 37,5 cae en la clase 55-60 (F anterior = 20, f = 22): Me = 55 + (37,5 − 20)/22 · 5 = {num(g.mediana(),2)}.
Moda: clase modal 55-60 (f = 22): Mo = 55 + (22−14)/((22−14)+(22−18)) · 5 = {num(g.moda(),2)}.
Varianza = Σ fi(xi − x̄)² / (n−1) = 3282 / 74 = {num(g.var(),2)}; desvío = √ = {num(g.desvio(),2)} min.
Q1: n/4 = 18,75 cae en 50-55 (F ant. = 6, f = 14): Q1 = 50 + (18,75 − 6)/14 · 5 = {num(g.percentil(.25),2)}.
CV = s / x̄ · 100 = {num(g.desvio(),2)} / {num(g.media(),1)} · 100 = {num(g.cv(),2)} % → menor a 20 %: datos homogéneos, la media es representativa.""",
   datos=tabla([["45-50", 6], ["50-55", 14], ["55-60", 22], ["60-65", 18], ["65-70", 10], ["70-75", 5]], ["Tiempo (min)", "fi"]),
   fuente="Repaso 1er parcial, ej. 1")

g = Agrupado([(0, 2, 4), (2, 4, 26), (4, 6, 50), (6, 8, 35), (8, 10, 25), (10, 12, 14), (12, 14, 6)])
cerca(g.media(), 6.46, 0.005); cerca(g.desvio(), 2.81, 0.005)
p_gt2 = 1 - g.prob_menor(2); p_lt10 = g.prob_menor(10)
cerca(p_gt2 * 100, 97.5, 0.01); cerca(p_lt10 * 100, 87.5, 0.01)
cond = (g.prob_menor(10) - g.prob_menor(4)) / (1 - g.prob_menor(4))
cerca(cond * 100, 84.62, 0.01); cerca(g.cv(), 43.45, 0.01)
ej("D2", "descriptiva", "Porcentaje diario de piezas defectuosas",
   "En un proceso productivo el porcentaje diario de piezas defectuosas es una variable aleatoria de la que se "
   "registraron 160 observaciones (días) agrupadas en el cuadro. Usar varianza muestral (n-1).",
   [parte("a", "Media (%)", round(g.media(), 4), "num"),
    parte("b", "Desvío estándar (%)", round(g.desvio(), 4), "num"),
    parte("c", "Porcentaje de días con x > 2 (%)", round(p_gt2 * 100, 4), "pct"),
    parte("d", "De los días con x > 4, porcentaje con x < 10 (%)", round(cond * 100, 4), "pct"),
    parte("e", "Coeficiente de variación (%)", round(g.cv(), 4), "num")],
   f"""n = 160. Media = Σ xi·fi / n = {num(g.media(),2)} %; desvío muestral = {num(g.desvio(),2)} %.
P(x > 2): en la ojiva, hasta 2 hay 4 días → 1 − 4/160 = {num(p_gt2*100,1)} %.
Condicional: P(x<10 | x>4) = P(4 < x < 10) / P(x > 4). Hasta 4 hay 30 días, hasta 10 hay 140:
  (140 − 30) / (160 − 30) = 110 / 130 = {num(cond*100,2)} %  ← se restringe el espacio muestral a los días con x > 4.
CV = {num(g.desvio(),2)} / {num(g.media(),2)} · 100 = {num(g.cv(),2)} % > 20 % → datos heterogéneos.""",
   datos=tabla([["0-2", 4], ["2-4", 26], ["4-6", 50], ["6-8", 35], ["8-10", 25], ["10-12", 14], ["12-14", 6]], ["x (%)", "días"]),
   fuente="Guía Tema I, ej. 1")

g = Agrupado([(20, 30, 1), (30, 40, 15), (40, 50, 39), (50, 60, 32), (60, 70, 11), (70, 80, 2)])
cerca(g.media(), 49.3, 0.001); cerca(g.mediana() * 1000, 48717.95, 0.01)
cerca(g.cv(), 19.82, 0.01)
ej("D3", "descriptiva", "Consumo diario de agua en una curtiembre",
   "El consumo diario de agua (en miles de litros) de una curtiembre responde a la distribución de frecuencias "
   "del cuadro (100 días). Usar varianza muestral (n-1).",
   [parte("a", "Consumo medio (miles de litros)", round(g.media(), 4), "num"),
    parte("b", "Mediana (miles de litros)", round(g.mediana(), 4), "num"),
    parte("c", "Porcentaje de días con consumo menor a 50 (%)", round(g.prob_menor(50) * 100, 4), "pct"),
    parte("d", "Coeficiente de variación (%)", round(g.cv(), 4), "num")],
   f"""n = 100, A = 10. Media = Σ xi·fi / n = 4930 / 100 = {num(g.media(),1)} (49.300 litros).
Mediana: n/2 = 50 cae en 40-50 (F ant. = 16, f = 39): Me = 40 + (50 − 16)/39 · 10 = {num(g.mediana(),3)}.
P(x < 50) = F(50)/n = (1 + 15 + 39)/100 = 55 %.
CV = {num(g.desvio(),3)} / {num(g.media(),1)} · 100 = {num(g.cv(),2)} % → está en el rango 5-20 %: la media es representativa.""",
   datos=tabla([["20-30", 1], ["30-40", 15], ["40-50", 39], ["50-60", 32], ["60-70", 11], ["70-80", 2]], ["Consumo", "días"]),
   fuente="Guía Tema I, ej. 2")

g = Agrupado([(1400, 1500, 2), (1500, 1600, 7), (1600, 1700, 26), (1700, 1800, 64), (1800, 1900, 57),
              (1900, 2000, 33), (2000, 2100, 10), (2100, 2200, 1)])
cerca(g.media(), 1805.5, 0.01); cerca(g.desvio(), 123.88, 0.01)
cerca((1 - g.prob_menor(2000)) * 100, 5.5, 0.01); cerca(g.percentil(0.045), 1600, 0.01); cerca(g.cv(), 6.86, 0.01)
ej("D4", "descriptiva", "Rendimiento de girasol",
   "Se relevaron 200 establecimientos agropecuarios y se registró el rendimiento de girasol (kg/ha) de la última "
   "campaña. Usar varianza muestral (n-1).",
   [parte("a", "Rendimiento promedio (kg/ha)", round(g.media(), 4), "num"),
    parte("b", "Desvío estándar (kg/ha)", round(g.desvio(), 4), "num"),
    parte("c", "Porcentaje de establecimientos que superó 2000 kg/ha (%)", round((1 - g.prob_menor(2000)) * 100, 4), "pct"),
    parte("d", "Rendimiento garantizado para el 95,5 % de los establecimientos (kg/ha)", round(g.percentil(0.045), 4), "num",
          "Es el percentil que deja el 4,5 % por debajo"),
    parte("e", "Coeficiente de variación (%)", round(g.cv(), 4), "num")],
   f"""n = 200. Media = {num(g.media(),1)} kg/ha; desvío muestral = {num(g.desvio(),2)}.
P(x > 2000) = 1 − F(2000)/n = 1 − 189/200 = 5,5 %  (hasta 2000 se acumulan 2+7+26+64+57+33 = 189).
'Garantizado para el 95,5 %' = el valor que el 95,5 % supera = percentil 4,5 %: posición 0,045·200 = 9 → cae en 1600-1700
(F ant. = 9, f = 26): X = 1600 + (9 − 9)/26 · 100 = 1600 kg/ha.
CV = {num(g.desvio(),2)} / {num(g.media(),1)} · 100 = {num(g.cv(),2)} % → homogéneo.""",
   datos=tabla([["1400-1500", 2], ["1500-1600", 7], ["1600-1700", 26], ["1700-1800", 64], ["1800-1900", 57],
                ["1900-2000", 33], ["2000-2100", 10], ["2100-2200", 1]], ["Rendimiento", "establecimientos"]),
   fuente="Guía Tema I, ej. 3")

sueldos = [90, 92, 95, 97, 100, 102, 105, 108, 110, 800]
media_s = sum(sueldos) / 10
sin = sum(sueldos[:-1]) / 9
mediana_s = (sueldos[4] + sueldos[5]) / 2
cerca(media_s, 169.9, 0.001); cerca(mediana_s, 101, 0.001)
ej("D5", "descriptiva", "Sueldos y valores extremos (outlier)",
   "Los sueldos (en miles de pesos) de 10 empleados de una empresa son: 90, 92, 95, 97, 100, 102, 105, 108, 110 y 800 "
   "(el gerente). Se quiere elegir una medida de posición para describir el sueldo típico.",
   [parte("a", "Media (miles de $)", round(media_s, 4), "num"),
    parte("b", "Mediana (miles de $)", round(mediana_s, 4), "num"),
    parte("c", "Media sin contar al gerente (miles de $)", round(sin, 4), "num")],
   f"""Media = 1699 / 10 = {num(media_s,1)}: 9 de 10 cobran entre 90 y 110, así que la media NO es representativa.
Mediana (n par): promedio de los dos valores centrales (100 y 102) = {num(mediana_s,0)}.
Sin el gerente: 899 / 9 = {num(sin,2)}.
Regla: con valores extremos usá la mediana (es robusta); la media se 'tira' hacia el outlier.
Moda < mediana < media → asimetría positiva (cola a la derecha).""",
   fuente="Clase 2, ejemplo de sueldos")

bebes = [12, 14, 9, 16, 15, 11, 14, 13, 15, 14, 12, 17, 14, 15, 14, 12, 10, 12, 16, 15, 14, 13, 14, 15, 14]
n_b = len(bebes)
media_b = sum(bebes) / n_b
orden = sorted(bebes)
mediana_b = orden[n_b // 2]
moda_b = max(set(bebes), key=bebes.count)
var_b = sum((x - media_b) ** 2 for x in bebes) / (n_b - 1)
ej("D6", "descriptiva", "Bebés que empiezan a caminar (datos sin agrupar)",
   "La serie informa la cantidad de meses que tenían 25 bebés de una guardería cuando empezaron a andar solos: "
   "12, 14, 9, 16, 15, 11, 14, 13, 15, 14, 12, 17, 14, 15, 14, 12, 10, 12, 16, 15, 14, 13, 14, 15, 14. "
   "Usar varianza muestral (n-1).",
   [parte("a", "Media (meses)", round(media_b, 4), "num"),
    parte("b", "Mediana (meses)", mediana_b, "num"),
    parte("c", "Moda (meses)", moda_b, "num"),
    parte("d", "Desvío estándar (meses)", round(sqrt(var_b), 4), "num")],
   f"""n = 25. Media = Σx / n = {sum(bebes)} / 25 = {num(media_b,2)}.
Mediana: se ordenan los datos; con n impar es el valor central (posición 13) = {mediana_b}.
Moda: el valor más repetido (14 aparece {bebes.count(14)} veces) = {moda_b}.
Varianza muestral = Σ(x − x̄)² / (n−1) = {num(var_b,3)}; desvío = {num(sqrt(var_b),3)} meses.
Con datos SIN agrupar no hace falta tabla ni interpolación: se trabaja directamente con los valores.""",
   fuente="Clase 1, actividad de la guardería")

# =====================================================================================
# PROBABILIDAD
# =====================================================================================
bb_rep = 7 / 10 * 7 / 10
mismo_rep = 7 / 10 * 7 / 10 + 3 / 10 * 3 / 10
roja_sin = 1 - 7 / 10 * 6 / 9
bb_sin = 7 / 10 * 6 / 9
cerca(bb_rep, 0.49, 1e-9); cerca(mismo_rep, 0.58, 1e-9); cerca(roja_sin, 8 / 15, 1e-9); cerca(bb_sin, 7 / 15, 1e-9)
ej("P1", "probabilidad", "Bolillas con y sin reposición",
   "Una caja contiene 7 bolillas blancas y 3 rojas. Se extraen dos bolillas.",
   [parte("a", "CON reposición: probabilidad de que ambas sean blancas", bb_rep),
    parte("b", "CON reposición: probabilidad de que ambas sean del mismo color", mismo_rep),
    parte("c", "SIN reposición: probabilidad de que al menos una sea roja", roja_sin),
    parte("d", "SIN reposición: probabilidad de que ambas sean blancas", bb_sin)],
   f"""Con reposición los sucesos son independientes: la caja queda igual.
a) P(BB) = 7/10 · 7/10 = 0,49.
b) P(BB) + P(RR) = 0,49 + 3/10 · 3/10 = 0,58.
Sin reposición la segunda extracción depende de la primera (queda una bolilla menos):
d) P(BB) = 7/10 · 6/9 = 7/15 = {num(bb_sin)}.
c) 'Al menos una roja' = 1 − P(ninguna roja) = 1 − P(BB) = 1 − 7/15 = 8/15 = {num(roja_sin)}.
Truco: 'al menos uno' casi siempre se resuelve por el complemento.""",
   fuente="Guía Tema II, ej. 1")

a_, b_, ab_ = 0.42, 0.25, 0.05
ej("P2", "probabilidad", "Lectores de dos diarios",
   "En una ciudad se publican dos diarios A y B. El 42 % de los habitantes lee A, el 25 % lee B y el 5 % lee ambos.",
   [parte("a", "Porcentaje de personas que lee algún diario (%)", (a_ + b_ - ab_) * 100, "pct"),
    parte("b", "De los que leen diarios, porcentaje que lee B (%)", b_ / (a_ + b_ - ab_) * 100, "pct"),
    parte("c", "Si se eligen 3 personas al azar, probabilidad de que las 3 lean diarios", (a_ + b_ - ab_) ** 3),
    parte("d", "Porcentaje de personas que lee SÓLO A (%)", (a_ - ab_) * 100, "pct")],
   f"""a) Suma de eventos compatibles: P(A∪B) = P(A) + P(B) − P(A∩B) = 0,42 + 0,25 − 0,05 = 0,62 → 62 %.
b) Condicional: P(B | A∪B) = P(B) / P(A∪B) = 0,25 / 0,62 = {num(b_/(a_+b_-ab_)*100,2)} %  (B está contenido en A∪B).
c) Independencia entre personas: 0,62³ = {num((a_+b_-ab_)**3)}.
d) Sólo A = P(A) − P(A∩B) = 0,42 − 0,05 = 37 %.""",
   fuente="Guía Tema II, ej. 7")

ej("P3", "probabilidad", "Cuentas en dos bancos",
   "En una localidad hay dos bancos A y B. El 22 % de los habitantes tiene cuenta en A, el 37 % en B y el 47 % no "
   "tiene cuenta en ninguno.",
   [parte("a", "Porcentaje que tiene cuenta en ambos bancos (%)", 6.0, "pct"),
    parte("b", "De los que tienen cuenta en A, porcentaje que también tiene en B (%)", 6 / 22 * 100, "pct"),
    parte("c", "De los que tienen alguna cuenta, porcentaje que tiene cuenta en B (%)", 37 / 53 * 100, "pct")],
   f"""'No tiene cuenta' = 47 % → tiene al menos una = 53 % = P(A∪B).
a) P(A∩B) = P(A) + P(B) − P(A∪B) = 22 + 37 − 53 = 6 %.
b) P(B | A) = P(A∩B) / P(A) = 6 / 22 = {num(6/22*100,2)} %.
c) P(B | A∪B) = P(B) / P(A∪B) = 37 / 53 = {num(37/53*100,2)} %.
Consejo: armá la tabla de doble entrada (A/no A × B/no B) y completala con los totales.""",
   fuente="Guía Tema II, ej. 6 (Clase 4)")

pa = 0.5 * 7 / 10 + 0.5 * 8 / 20
pb = 0.5 * 7 / 10 / pa
cerca(pa, 0.55, 1e-9); cerca(pb, 7 / 11, 1e-9)
ej("P4", "probabilidad", "Dos cajas: probabilidad total y Bayes",
   "La caja C1 contiene 7 bolillas blancas y 3 rojas; la caja C2 tiene 8 blancas y 12 rojas. Se elige una caja al "
   "azar y se extrae una bolilla.",
   [parte("a", "Probabilidad de que la bolilla sea blanca", pa),
    parte("b", "Si la bolilla es blanca, probabilidad de haber elegido C1", pb)],
   f"""a) Probabilidad total: P(B) = P(C1)·P(B|C1) + P(C2)·P(B|C2) = 0,5·0,7 + 0,5·0,4 = {num(pa,2)}.
b) Bayes (te dan el resultado y preguntan por el origen):
   P(C1 | B) = P(C1)·P(B|C1) / P(B) = 0,35 / 0,55 = 7/11 = {num(pb)}.
Patrón: 'elige al azar entre A y B y después...' → total para el resultado, Bayes para 'si salió X, ¿de dónde vino?'.""",
   fuente="Guía Tema II, ej. 4")

# II-11: dos cajas, se extrae una y se deja aparte, luego otra
def caja(b, r):
    return b, r
c1 = (3, 7); c2 = (12, 8)
def p_seg_blanca(c):
    b, r = c; n = b + r
    return b / n * (b - 1) / (n - 1) + r / n * b / (n - 1)
tot = 0.5 * p_seg_blanca(c1) + 0.5 * p_seg_blanca(c2)
bay = 0.5 * p_seg_blanca(c1) / tot
c_blanca_c1 = 0.5 * (3 / 10 * 2 / 9) / tot
cerca(tot, 0.45, 1e-9); cerca(bay, 1 / 3, 1e-9); cerca(c_blanca_c1, 2 / 27, 1e-9)
ej("P5", "probabilidad", "Dos cajas y una bolilla apartada",
   "Una caja tiene 3 bolillas blancas y 7 rojas; otra tiene 12 blancas y 8 rojas. Se elige una caja al azar, se "
   "extrae una bolilla y, sin mirarla, se la deja aparte. Luego se extrae otra bolilla de la misma caja.",
   [parte("a", "Probabilidad de que esta última bolilla sea blanca", tot),
    parte("b", "Si es blanca, probabilidad de haber elegido la primera caja", bay),
    parte("c", "Si es blanca, probabilidad de haber elegido la primera caja Y haber dejado aparte una blanca", c_blanca_c1)],
   f"""Trampa clásica: la bolilla apartada sin mirar NO cambia la probabilidad de la siguiente (por simetría es como
si la segunda fuera la primera). Con la caja 1: P(2ª blanca) = 3/10 = 0,3; con la caja 2: 12/20 = 0,6.
a) P(blanca) = 0,5·0,3 + 0,5·0,6 = {num(tot,2)}.
b) Bayes: P(C1 | blanca) = 0,5·0,3 / 0,45 = 1/3 = {num(bay)}.
c) Caso particular 'apartó blanca y sacó blanca' en la caja 1: 3/10 · 2/9 = 1/15. Se divide por P(blanca):
   0,5 · (1/15) / 0,45 = 2/27 = {num(c_blanca_c1)}.""",
   fuente="Guía Tema II, ej. 11 (Clase 4)")

p_pos = 0.04 * 0.95 + 0.96 * 0.01
p_enf = 0.04 * 0.95 / p_pos
p_sano_neg = 0.96 * 0.99 / (1 - p_pos)
cerca(p_enf, 0.7983, 0.0001)
ej("P6", "probabilidad", "Test para una enfermedad de caballos",
   "Un análisis para detectar una enfermedad equina da positivo en el 95 % de los enfermos y negativo en el 99 % de "
   "los sanos. Se sabe que el 4 % de la población caballar padece la enfermedad. Se analiza un caballo al azar.",
   [parte("a", "Probabilidad de que el análisis dé positivo", p_pos),
    parte("b", "Si dio positivo, probabilidad de que esté realmente enfermo", p_enf),
    parte("c", "Si dio negativo, probabilidad de que esté realmente sano", p_sano_neg)],
   f"""Definí: E = enfermo (0,04), S = sano (0,96). P(+|E) = 0,95 y P(−|S) = 0,99 → P(+|S) = 0,01.
a) P(+) = 0,04·0,95 + 0,96·0,01 = 0,038 + 0,0096 = {num(p_pos)}.
b) Bayes: P(E|+) = 0,038 / 0,0476 = {num(p_enf)}. Aunque el test es 'muy bueno', sólo ~80 % de los positivos están enfermos
   porque la enfermedad es rara.
c) P(S|−) = 0,96·0,99 / (1 − 0,0476) = 0,9504 / 0,9524 = {num(p_sano_neg)}.""",
   fuente="Guía Tema II, ej. 25")

# Repaso 5: tres urnas encadenadas
pR = 7 / 10 * 4 / 10 + 3 / 10 * 2 / 10
pmismo = 7 / 10 * 6 / 10 + 3 / 10 * 2 / 10
pBB_mismo = (7 / 10 * 6 / 10) / pmismo
cerca(pR, 0.34, 1e-9); cerca(pBB_mismo, 0.875, 1e-9)
ej("P7", "probabilidad", "Tres urnas encadenadas (árbol)",
   "La urna 1 tiene 3 bolillas rojas y 7 blancas; la urna 2 tiene 4 rojas y 6 blancas; la urna 3 tiene 2 rojas y 8 "
   "blancas. Se extrae una bolilla de la urna 1. Si es blanca, la segunda extracción se hace de la urna 2; si es "
   "roja, se hace de la urna 3.",
   [parte("a", "Probabilidad de que la SEGUNDA bolilla sea roja", pR),
    parte("b", "Sabiendo que las dos bolillas fueron del mismo color, probabilidad de que ambas sean blancas", pBB_mismo)],
   f"""Armá el árbol: 1ª blanca (7/10) → urna 2; 1ª roja (3/10) → urna 3.
a) P(2ª roja) = 7/10 · 4/10 + 3/10 · 2/10 = 0,28 + 0,06 = {num(pR,2)}.
b) Condicional: P(BB | mismo color) = P(BB) / P(BB ó RR).
   P(BB) = 7/10 · 6/10 = 0,42; P(RR) = 3/10 · 2/10 = 0,06 → 0,42 / 0,48 = 7/8 = {num(pBB_mismo,3)}.""",
   fuente="Repaso 1er parcial, ej. 5")

pA, pB, pAB = 1 / 2, 1 / 3, 1 / 4
ej("P8", "probabilidad", "Probabilidades a partir de P(A), P(B) y P(A∩B)",
   "Dados dos sucesos con P(A) = 1/2, P(B) = 1/3 y P(A∩B) = 1/4, calcular:",
   [parte("a", "P(A | B)", pAB / pB),
    parte("b", "P(B | A)", pAB / pA),
    parte("c", "P(A ∪ B)", pA + pB - pAB),
    parte("d", "P(no A | no B)", (1 - (pA + pB - pAB)) / (1 - pB)),
    parte("e", "P(no B | no A)", (1 - (pA + pB - pAB)) / (1 - pA))],
   f"""Armá la tabla: P(A∩B) = 1/4; P(A∩B') = 1/2 − 1/4 = 1/4; P(A'∩B) = 1/3 − 1/4 = 1/12;
P(A'∩B') = 1 − 7/12 = 5/12.
a) P(A|B) = P(A∩B)/P(B) = (1/4)/(1/3) = 3/4.   b) P(B|A) = (1/4)/(1/2) = 1/2.
c) P(A∪B) = 1/2 + 1/3 − 1/4 = 7/12 = {num(7/12)}.
d) P(A'|B') = P(A'∩B')/P(B') = (5/12)/(2/3) = 5/8 = 0,625.   e) P(B'|A') = (5/12)/(1/2) = 5/6 = {num(5/6)}.
¿Independientes? P(A)·P(B) = 1/6 ≠ 1/4 → NO son independientes.""",
   fuente="Repaso 1er parcial, ej. 6")

# II-24
pcc, pmenos3 = 0.30, 0.60
pcc_y_m3 = 0.6 * 0.2
ej("P9", "probabilidad", "Clientes, cuenta corriente y antigüedad",
   "De los clientes de una empresa, el 70 % no tiene cuenta corriente, el 60 % tiene menos de 3 años de antigüedad y "
   "de éstos, el 20 % tiene cuenta corriente.",
   [parte("a", "Porcentaje que tiene cuenta corriente o menos de 3 años (%)", (pcc + pmenos3 - pcc_y_m3) * 100, "pct"),
    parte("b", "De los que tienen cuenta corriente, porcentaje con menos de 3 años (%)", pcc_y_m3 / pcc * 100, "pct"),
    parte("c", "De los que tienen 3 años o más, porcentaje con cuenta corriente (%)", (pcc - pcc_y_m3) / (1 - pmenos3) * 100, "pct")],
   """Datos: P(sin CC) = 0,70 → P(CC) = 0,30. P(<3) = 0,60. P(CC | <3) = 0,20 → P(CC ∩ <3) = 0,60 · 0,20 = 0,12.
a) P(CC ∪ <3) = 0,30 + 0,60 − 0,12 = 0,78 → 78 %.
b) P(<3 | CC) = 0,12 / 0,30 = 40 %.
c) P(CC | ≥3) = (0,30 − 0,12) / 0,40 = 45 %.
Ojo: el 20 % es condicional (CC dentro de los de menos de 3 años); no es la probabilidad de la intersección.""",
   fuente="Guía Tema II, ej. 24")

# II-8 cajas negras/blancas con pase
pn = 3 / 8 * 2 / 11 + 5 / 8 * 1 / 11
pb_bay = (5 / 8 * 1 / 11) / pn
cerca(pn, 0.125, 1e-9); cerca(pb_bay, 5 / 11, 1e-9)
ej("P10", "probabilidad", "Bolilla que pasa de una caja a otra",
   "La caja C1 contiene 3 bolillas negras y 5 blancas; la caja C2 tiene 1 negra y 9 blancas. Se toma C1, se extrae "
   "una bolilla y, sin mirarla, se la introduce en C2. Luego se extrae una bolilla al azar de C2.",
   [parte("a", "Probabilidad de que la bolilla extraída de C2 sea negra", pn),
    parte("b", "Si es negra, probabilidad de que la bolilla pasada de C1 a C2 haya sido blanca", pb_bay)],
   f"""Dos casos según lo que pasó a C2 (que ahora tiene 11 bolillas):
 · pasó negra (3/8): C2 queda con 2 negras → P(negra) = 2/11.
 · pasó blanca (5/8): C2 queda con 1 negra → P(negra) = 1/11.
a) P(negra) = 3/8 · 2/11 + 5/8 · 1/11 = 11/88 = 1/8 = {num(pn,3)}.
b) Bayes: P(pasó blanca | negra) = (5/8 · 1/11) / (1/8) = 5/11 = {num(pb_bay)}.""",
   fuente="Guía Tema II, ej. 8")

# =====================================================================================
# VARIABLES ALEATORIAS DISCRETAS
# =====================================================================================
xs, ps = [1, 2, 3, 4], [0.2, 0.4, 0.3, 0.1]
E = sum(x * p for x, p in zip(xs, ps)); V = sum(x * x * p for x, p in zip(xs, ps)) - E * E
cerca(E, 2.3, 1e-9); cerca(V, 0.81, 1e-9)
ej("V1", "discreta", "Media y varianza de una variable discreta",
   "Una variable aleatoria discreta X toma los valores 1, 2, 3 y 4 con probabilidades 0,2; 0,4; 0,3 y 0,1 "
   "respectivamente (por ejemplo, clientes que llegan a una estación de servicio en un lapso).",
   [parte("a", "Esperanza E(X)", E, "num"),
    parte("b", "Varianza V(X)", V, "num"),
    parte("c", "Desvío estándar", sqrt(V), "num"),
    parte("d", "P(X ≥ 3)", 0.4),
    parte("e", "F(2) = P(X ≤ 2)", 0.6)],
   f"""Validez: p(x) ≥ 0 y Σ p(x) = 0,2 + 0,4 + 0,3 + 0,1 = 1 ✓.
E(X) = Σ x·p(x) = 1·0,2 + 2·0,4 + 3·0,3 + 4·0,1 = {num(E,2)}.
V(X) = E(X²) − [E(X)]² = (1·0,2 + 4·0,4 + 9·0,3 + 16·0,1) − 2,3² = 6,1 − 5,29 = {num(V,2)}.
σ = √0,81 = 0,9.
P(X ≥ 3) = 0,3 + 0,1 = 0,4.   F(2) = P(X ≤ 2) = 0,2 + 0,4 = 0,6.""",
   datos=tabla([[1, 0.2], [2, 0.4], [3, 0.3], [4, 0.1]], ["x", "p(x)"]),
   fuente="Repaso 1er parcial, ej. 7 y 8")

a = 1 / sum(1 / 2**r for r in range(4))
mu = sum(r * a / 2**r for r in range(4)); ex2 = sum(r * r * a / 2**r for r in range(4))
sig = sqrt(ex2 - mu * mu)
cerca(a, 8 / 15, 1e-9); cerca(mu, 11 / 15, 1e-9); cerca(sig, 0.9286, 0.0001)
ej("V2", "discreta", "Hallar la constante de una función de probabilidad",
   "Una variable discreta r toma los valores 0, 1, 2 y 3 con probabilidades P(r) = a / 2^r.",
   [parte("a", "Constante a", a),
    parte("b", "Media", mu),
    parte("c", "Desvío estándar", sig),
    parte("d", "P(r ≤ 1)", a * (1 + 0.5))],
   f"""a) La suma tiene que dar 1: a·(1 + 1/2 + 1/4 + 1/8) = a·15/8 = 1 → a = 8/15 = {num(a)}.
b) Media = Σ r·P(r) = a·(0 + 1/2 + 2/4 + 3/8) = a·11/8 = 11/15 = {num(mu)}.
c) E(r²) = a·(0 + 1/2 + 4/4 + 9/8) = a·21/8 = 1,4; V = 1,4 − 0,7333² = 0,8622; σ = {num(sig)}.
d) P(r ≤ 1) = P(0) + P(1) = a·(1 + 0,5) = 0,8.""",
   fuente="Guía Tema III, ej. 1")

k = 1 / 10
E3 = sum(x * k * x for x in range(1, 5)); V3 = sum(x * x * k * x for x in range(1, 5)) - E3**2
ej("V3", "discreta", "Constante k y distribución acumulada",
   "La probabilidad de que una variable X tome el valor x (x = 1, 2, 3, 4) es proporcional a x: P(X = x) = k·x.",
   [parte("a", "Constante k", k),
    parte("b", "Esperanza E(X)", E3, "num"),
    parte("c", "Varianza V(X)", V3, "num"),
    parte("d", "P(X ≥ 3)", 0.7)],
   f"""a) Σ k·x = k·(1+2+3+4) = 10k = 1 → k = 0,1.
b) E(X) = Σ x·(0,1·x) = 0,1·(1 + 4 + 9 + 16) = {num(E3,1)}.
c) E(X²) = 0,1·(1 + 8 + 27 + 64) = 10 → V = 10 − 3² = {num(V3,1)}.
d) P(X ≥ 3) = 0,3 + 0,4 = 0,7.""",
   fuente="Adaptado de Repaso 1er parcial, ej. 7")

# =====================================================================================
# BINOMIAL Y PASCAL
# =====================================================================================
a_ = 1 - 0.99**10
n_min = next(n for n in range(1, 200) if 1 - 0.9**n >= 0.95)
b_ = 1 - 0.99**n_min
cerca(a_, 0.0956, 0.0001); assert n_min == 29; cerca(b_, 0.2528, 0.0001)
ej("B1", "binomial", "Control de latas de gaseosa",
   "Un proceso no debe producir más del 1 % de latas defectuosas. Se lo controla examinando una muestra de 10 latas "
   "y si alguna resulta fallada se detiene el proceso para revisarlo.",
   [parte("a", "Si el proceso trabaja realmente al 1 %, probabilidad de revisarlo innecesariamente", a_),
    parte("b", "Cantidad mínima de latas a probar (en vez de 10) para que la probabilidad de detectar un proceso que trabaja al 10 % sea 0,95", n_min, "ent"),
    parte("c", "Con ese nuevo tamaño de muestra, probabilidad de revisar innecesariamente (proceso al 1 %)", b_)],
   f"""Binomial: X = defectuosas en la muestra, n = 10, p = 0,01. 'Revisar' = encontrar al menos una: X ≥ 1.
a) P(X ≥ 1) = 1 − P(0) = 1 − 0,99¹⁰ = {num(a_)}.
b) Proceso al 10 %: P(revisar) = 1 − 0,9ⁿ ≥ 0,95 → 0,9ⁿ ≤ 0,05 → n ≥ ln 0,05 / ln 0,9 = 28,4 → n = 29.
c) Con n = 29 y p = 1 %: 1 − 0,99²⁹ = {num(b_)}.
Idea: 'al menos uno' = 1 − P(cero). Cuando piden 'cuántas pruebas', se despeja n.""",
   fuente="Guía Tema III, ej. 6 (Clase 6)")

d = 0.10
a_ = Fb(2, 15, d); b_ = b_pmf(2, 15, d); c_ = Gb(4, 15, d)
cerca(a_, 0.8159, 0.0001); cerca(b_, 0.2669, 0.0001); cerca(c_, 0.0556, 0.0001)
ej("B2", "binomial", "Muestra de 15 piezas con 10 % de defectuosas",
   "Un proceso tecnológico produce piezas con un 10 % de defectuosas. Se toma una muestra de 15 piezas.",
   [parte("a", "Probabilidad de encontrar 2 o menos defectuosas", a_),
    parte("b", "Probabilidad de encontrar exactamente 2 defectuosas", b_),
    parte("c", "Probabilidad de encontrar menos de 12 piezas buenas", c_)],
   f"""X = defectuosas ~ Binomial(n = 15, p = 0,10).
a) P(X ≤ 2) = F_b(2/15; 0,10) = {num(a_)}.
b) P(X = 2) = C(15,2)·0,1²·0,9¹³ = 105 · 0,01 · 0,2542 = {num(b_)}.
c) 'Menos de 12 buenas' = 11 buenas o menos = 4 o MÁS defectuosas: P(X ≥ 4) = 1 − P(X ≤ 3) = {num(c_)}.
Traducción: 'menos de 12 buenas' ⇔ 'más de 3 defectuosas'. Siempre convertí a la variable que estás modelando.""",
   fuente="Guía Tema III, ej. 8 (Clase 6)")

p_sep = 0.15 * 0.9
a1 = Gb(3, 10, p_sep); a2 = Gb(3, 10, 0.15)
mu_m = 22 * 10 * p_sep; sig_m = sqrt(22 * 10 * p_sep * (1 - p_sep))
cerca(a1, 0.1425, 0.0001); cerca(a2, 0.1798, 0.0001); cerca(mu_m, 29.7, 0.001); cerca(sig_m, 5.0686, 0.0002)
ej("B3", "binomial", "Inspección imperfecta",
   "Un proceso trabaja con un 15 % de defectuosas y produce 10 unidades diarias. Al final del día se separan las "
   "defectuosas, pero la inspección es imperfecta: hay una probabilidad constante 0,1 de considerar buena a una "
   "unidad defectuosa.",
   [parte("a", "Probabilidad de separar 3 o más unidades defectuosas en un día", a1),
    parte("b", "Esa misma probabilidad si la inspección fuera perfecta", a2),
    parte("c", "Media del número de defectuosas separadas en un mes (22 días hábiles)", mu_m, "num"),
    parte("d", "Desvío estándar de las defectuosas separadas en un mes", sig_m, "num")],
   f"""Una unidad se SEPARA sólo si es defectuosa (0,15) Y el inspector la detecta (0,90): p = 0,15·0,9 = {num(p_sep,3)}.
a) X ~ Binomial(10; 0,135): P(X ≥ 3) = {num(a1)}.
b) Inspección perfecta (p = 0,15): P(X ≥ 3) = {num(a2)}.
c) En un mes son n = 22·10 = 220 ensayos: E = n·p = 220·0,135 = {num(mu_m,1)}.
d) σ = √(n·p·(1−p)) = √(220·0,135·0,865) = {num(sig_m,4)}.""",
   fuente="Guía Tema III, ej. 11 (Clase 6)")

a_ = Fpa(8, 2, 0.2); b_ = 1 - Fpa(11, 2, 0.2); c_ = pa_pmf(12, 2, 0.2)
cerca(a_, 0.4967, 0.0001); cerca(b_, 0.3221, 0.0001); cerca(c_, 0.0473, 0.0001)
ej("B4", "binomial", "Piezas hasta encontrar la segunda defectuosa (Pascal)",
   "En un control de calidad se examinan piezas hasta encontrar la segunda defectuosa. El proceso trabaja con un "
   "20 % de defectuosas. ¿Cuál es la probabilidad de tener que revisar…",
   [parte("a", "…8 piezas o menos?", a_),
    parte("b", "…12 piezas o más?", b_),
    parte("c", "…exactamente 12 piezas?", c_)],
   f"""N = piezas hasta la 2ª defectuosa ~ Pascal(r = 2; p = 0,20). Dominio: N ≥ 2.
c) P(N = 12) = C(11,1)·0,2²·0,8¹⁰ = 11 · 0,04 · 0,1074 = {num(c_)}.
a) P(N ≤ 8) = F_pa(8/2; 0,2) = {num(a_)}.
b) P(N ≥ 12) = 1 − P(N ≤ 11) = {num(b_)}.
Relación con la binomial: N ≤ 8 ⇔ 'en 8 pruebas hay 2 o más defectuosas' = P(Bin(8; 0,2) ≥ 2) = {num(Gb(2,8,0.2))} (mismo número).""",
   fuente="Guía Tema III, ej. 12 (Clase 6)")

ej("B5", "binomial", "Pedido de 10 piezas buenas",
   "Para fabricar un pedido de 10 piezas buenas se usa una máquina con 30 % de defectuosas. Se fabrican piezas "
   "hasta completar las 10 buenas. ¿Cuál es la probabilidad de que sea necesario fabricar más de 14 piezas?",
   [parte("a", "P(fabricar más de 14 piezas para conseguir 10 buenas)", 1 - Fpa(14, 10, 0.7)),
    parte("b", "Cantidad promedio de piezas a fabricar (esperanza de Pascal r/p)", 10 / 0.7, "num"),
    parte("c", "P(fabricar exactamente 12 piezas)", pa_pmf(12, 10, 0.7))],
   f"""N = piezas fabricadas hasta la 10ª buena ~ Pascal(r = 10; p = 0,70) ('éxito' = pieza buena).
a) P(N > 14) = 1 − F_pa(14/10; 0,7) = {num(1-Fpa(14,10,0.7))}.
   Equivale a: en 14 piezas hay a lo sumo 9 buenas = P(Bin(14; 0,7) ≤ 9).
b) E(N) = r/p = 10/0,7 = {num(10/0.7,2)}.
c) P(N = 12) = C(11,9)·0,7¹⁰·0,3² = 55 · 0,02825 · 0,09 = {num(pa_pmf(12,10,0.7))}.""",
   fuente="Adaptado de Guía Tema III, ej. 14")

pcd = 0.4 * 0.05 + 0.35 * 0.03 + 0.25 * 0.07
a_ = pcd; b_ = Fb(6, 100, pcd)
cerca(a_, 0.048, 1e-9)
ej("B6", "binomial", "Envíos con retraso (probabilidad total + binomial)",
   "Una empresa de mensajería reparte con tres tipos de vehículos: 40 % de los envíos con motos (5 % de retraso), "
   "35 % con autos (3 % de retraso) y el resto con camiones (7 % de retraso).",
   [parte("a", "Probabilidad de que un envío cualquiera tenga retraso", a_),
    parte("b", "En una muestra de 100 envíos, probabilidad de que haya como máximo 6 retrasos", b_),
    parte("c", "En esos 100 envíos, cantidad esperada de retrasos", 100 * a_, "num")],
   f"""Problema en DOS pasos (muy típico de parcial):
1) Probabilidad total: p = 0,40·0,05 + 0,35·0,03 + 0,25·0,07 = 0,02 + 0,0105 + 0,0175 = {num(a_,3)}.
2) Con ese p, contar retrasos en 100 envíos independientes → Binomial(n = 100; p = 0,048).
b) P(X ≤ 6) = F_b(6/100; 0,048) = {num(b_)}.
c) E(X) = n·p = 100·0,048 = {num(100*a_,1)}.
Por qué binomial: son 100 ensayos independientes, cada uno con la misma probabilidad p de 'éxito' (retraso).""",
   fuente="Repaso 1er parcial, ej. 9")

ej("B7", "binomial", "Lectura de F y G (Binomial y Pascal)",
   "Calcular con calculadora o GeoGebra. Notación de la cátedra: F = P(X ≤ x) y G = P(X ≥ x). Binomial b(r/n; p) "
   "cuenta éxitos en n pruebas; Pascal pa(n/r; p) cuenta pruebas hasta el r-ésimo éxito.",
   [parte("a", "G_b(3/10; 0,25) = P(X ≥ 3), con X ~ Binomial(n=10; p=0,25)", Gb(3, 10, 0.25)),
    parte("b", "F_b(4/12; 0,45) = P(X ≤ 4), con X ~ Binomial(n=12; p=0,45)", Fb(4, 12, 0.45)),
    parte("c", "F_pa(12/5; 0,42) = P(N ≤ 12), con N ~ Pascal(r=5; p=0,42)", Fpa(12, 5, 0.42)),
    parte("d", "P_pa(7/5; 0,80) = P(N = 7), con N ~ Pascal(r=5; p=0,80)", pa_pmf(7, 5, 0.8))],
   f"""a) P(X ≥ 3) = 1 − P(X ≤ 2) = {num(Gb(3,10,0.25))}.   b) Suma de P(0..4) = {num(Fb(4,12,0.45))}.
c) P(N ≤ 12) con r = 5: {num(Fpa(12,5,0.42))}.   d) C(6,4)·0,8⁵·0,2² = 15 · 0,32768 · 0,04 = {num(pa_pmf(7,5,0.8))}.
Memorizá las traducciones: F = 'hasta', G = 'desde'. G(r) = 1 − F(r−1).""",
   fuente="Guía Tema III, ej. 5 y 9")

cerca(Gb(3, 10, 0.25), 0.4744, 0.0001); cerca(Fb(4, 12, 0.45), 0.3044, 0.0001)
cerca(Fpa(12, 5, 0.42), 0.6175, 0.0001); cerca(pa_pmf(7, 5, 0.8), 0.1966, 0.0001)

# =====================================================================================
# HIPERGEOMÉTRICO Y COMBINADOS
# =====================================================================================
acepta = Fh(1, 5, 40, 5); rechaza = 1 - Fh(1, 5, 40, 10)
ej("H1", "hiper", "Cargamento de 40 elementos",
   "Un cargamento contiene 40 elementos. Se seleccionan al azar y se prueban 5. Si dos o más están defectuosos, "
   "se devuelve el cargamento.",
   [parte("a", "Si el cargamento tiene 5 defectuosos, probabilidad de que sea aceptado", acepta),
    parte("b", "Si el cargamento tiene 10 defectuosos, probabilidad de que NO sea aceptado", rechaza),
    parte("c", "Con 10 defectuosos, cantidad esperada de defectuosos en la muestra", 5 * 10 / 40, "num")],
   f"""Se extrae SIN reposición de una población finita (N = 40) con R defectuosos → Hipergeométrica, n = 5.
P(X = r) = C(R,r)·C(N−R, n−r) / C(N,n).
a) R = 5, se acepta con menos de 2 defectuosos: P(X ≤ 1) = P(0) + P(1) = {num(h_pmf(0,5,40,5))} + {num(h_pmf(1,5,40,5))} = {num(acepta)}.
b) R = 10, no se acepta con X ≥ 2: 1 − P(X ≤ 1) = 1 − {num(Fh(1,5,40,10))} = {num(rechaza)}.
c) E(X) = n·R/N = 5·10/40 = 1,25.""",
   fuente="Clase 7, ejemplo del cargamento")

acep = Fh(1, 5, 50, 8)
lotes = Gb(18, 20, acep)
ej("H2", "hiper", "Tornillos: hipergeométrica y después binomial",
   "Un lote contiene 50 tornillos, de los cuales 8 son defectuosos. Un inspector selecciona 5 tornillos al azar y "
   "el lote se acepta si en la muestra aparece como máximo 1 tornillo defectuoso.",
   [parte("a", "Probabilidad de aceptar el lote", acep),
    parte("b", "Si se revisan 20 lotes con el mismo criterio, probabilidad de que se acepten al menos 18", lotes)],
   f"""Paso 1 (dentro de un lote, sin reposición, N = 50, R = 8, n = 5 → Hipergeométrica):
a) P(X ≤ 1) = [C(8,0)·C(42,5) + C(8,1)·C(42,4)] / C(50,5) = {num(acep)}.
Paso 2 (ahora los LOTES son los ensayos: 20 lotes independientes, cada uno se acepta con p = {num(acep)} → Binomial):
b) Y = lotes aceptados ~ Binomial(n = 20; p = {num(acep)}): P(Y ≥ 18) = G_b(18/20; p) = {num(lotes)}.
Patrón: la probabilidad calculada en el paso 1 se convierte en el 'p' del paso 2.""",
   fuente="Repaso 1er parcial, ej. 10")

p_rech_caja = 1 - h_pmf(0, 2, 10, 1)
cajas = Fb(2, 15, p_rech_caja)
cerca(cajas, 0.398, 0.0006)
ej("H3", "hiper", "Rechazo de cajas con una pieza defectuosa",
   "El control de recepción toma una muestra de 2 unidades de cada caja de 10 y rechaza la caja si encuentra alguna "
   "defectuosa. El proveedor entregó 15 cajas con una pieza defectuosa en cada una.",
   [parte("a", "Probabilidad de que se rechace UNA caja", p_rech_caja),
    parte("b", "Probabilidad de que le rechacen menos de 3 cajas (de las 15)", cajas)],
   f"""a) Hipergeométrica (N = 10, R = 1, n = 2): se rechaza si X ≥ 1 → 1 − P(0) = 1 − C(9,2)/C(10,2) = 1 − 36/45 = {num(p_rech_caja,2)}.
b) 15 cajas independientes, cada una rechazada con p = 0,2 → Binomial(n = 15; p = 0,2).
   P(menos de 3) = P(Y ≤ 2) = {num(cajas)}.""",
   fuente="Guía Tema III, ej. 13")

cajaA = h_pmf(1, 5, 65, 8); cajaB = h_pmf(1, 5, 65, 5)
post = cajaB / (cajaA + cajaB)
cerca(post, 0.4355, 0.0002)
ej("H4", "hiper", "Dos cajas sin identificar (hipergeométrica + Bayes)",
   "Se compraron piezas de repuesto y se colocaron en dos cajas iguales de 65 unidades: una tiene 8 piezas de segunda "
   "calidad y la otra 5. Por una confusión las cajas no quedaron identificadas. Al tomar una muestra de 5 piezas de "
   "una de las cajas se encontró 1 pieza de segunda calidad.",
   [parte("a", "Probabilidad de observar exactamente 1 pieza de segunda en la muestra si la caja es la de 8", cajaA),
    parte("b", "Probabilidad de observar exactamente 1 pieza de segunda en la muestra si la caja es la de 5", cajaB),
    parte("c", "Probabilidad de que la muestra provenga de la caja con 5 piezas de segunda", post)],
   f"""Cada caja es una población finita → Hipergeométrica (N = 65, n = 5, r = 1).
a) Caja con R = 8: P(X = 1) = C(8,1)·C(57,4) / C(65,5) = {num(cajaA)}.
b) Caja con R = 5: P(X = 1) = C(5,1)·C(60,4) / C(65,5) = {num(cajaB)}.
c) Bayes con a priori 1/2 y 1/2 (las cajas son iguales):
   P(caja de 5 | X=1) = 0,5·{num(cajaB)} / (0,5·{num(cajaA)} + 0,5·{num(cajaB)}) = {num(post)}.""",
   fuente="Guía Tema III, ej. 19")

rechA = 1 - h_pmf(0, 5, 65, 5)
rechB = sum(hp_pmf(n, 2, 65, 5) for n in range(2, 6))
cerca(rechA, 0.3388, 0.0001); cerca(rechB, 0.0436, 0.0001)
bay_b = 0.5 * rechB / (0.5 * rechA + 0.5 * rechB)
cerca(bay_b, 0.114, 0.0005)
ej("H5", "hiper", "Dos inspectores: hipergeométrica vs. hiperPascal",
   "Las cajas de 65 unidades contienen 5 piezas de segunda calidad. El inspector A toma una muestra de 5 unidades y "
   "rechaza la caja si encuentra alguna de segunda. El inspector B va sacando piezas hasta encontrar la SEGUNDA de "
   "segunda calidad y acepta la caja si necesita sacar más de 5 piezas (rechaza si necesita 5 o menos).",
   [parte("a", "Porcentaje de cajas rechazadas por A (%)", rechA * 100, "pct"),
    parte("b", "Porcentaje de cajas rechazadas por B (%)", rechB * 100, "pct"),
    parte("c", "Si una caja fue rechazada y cada inspector revisa la mitad de las cajas, probabilidad de que haya sido inspeccionada por B", bay_b)],
   f"""A: cuenta éxitos en n = 5 fijo → Hipergeométrica (N = 65, R = 5, n = 5). Rechaza si X ≥ 1:
   1 − C(60,5)/C(65,5) = {num(rechA*100,2)} %.
B: cuenta cuántas extracciones hasta el 2º éxito → HiperPascal (N = 65, R = 5, r = 2). Rechaza si n ≤ 5:
   P(n=2)+P(n=3)+P(n=4)+P(n=5) = {num(rechB*100,2)} %   (equivale a 'en 5 piezas hay 2 o más': hipergeométrica X ≥ 2).
c) Bayes: 0,5·{num(rechB)} / (0,5·{num(rechA)} + 0,5·{num(rechB)}) = {num(bay_b,3)}.
Diferencia clave: fijo el tamaño de la muestra → hipergeométrica; fijo la cantidad de éxitos → hiperPascal.""",
   fuente="Guía Tema III, ej. 21")

N_, R_ = 12, 5
p4 = hp_pmf(4, 2, N_, R_)
p_le5 = sum(hp_pmf(n, 2, N_, R_) for n in range(2, 6))
ej("H6", "hiper", "Urna con reposición nula: hasta la 2.ª roja",
   "Una urna tiene 12 bolillas, 5 rojas y 7 blancas. Se extraen bolillas SIN reposición hasta obtener la segunda roja.",
   [parte("a", "Probabilidad de que la segunda roja aparezca justo en la 4.ª extracción", p4),
    parte("b", "Probabilidad de necesitar 5 extracciones o menos", p_le5),
    parte("c", "Menor cantidad de extracciones posible", 2, "ent")],
   f"""'Extraer hasta obtener r éxitos, sin reposición' → HiperPascal (N = 12, R = 5, r = 2). Dominio: 2 ≤ n ≤ N − R + r = 9.
a) P(n = 4): en las primeras 3 hay exactamente 1 roja y la 4.ª es roja:
   [C(5,1)·C(7,2)/C(12,3)] · (5−1)/(12−3) = (105/220)·(4/9) = {num(p4)}.
b) P(n ≤ 5) = P(2)+P(3)+P(4)+P(5) = {num(p_le5)}  (equivale a P(hipergeométrica con 5 extracciones ≥ 2 rojas)).
c) Como mínimo se necesitan r = 2 extracciones.""",
   fuente="Adaptado de Clase 7 (modelo hiperPascal)")


# ---------- Comprobaciones finales de consistencia ----------
for e in EJ:
    ids = [p["id"] for p in e["partes"]]
    assert ids == sorted(set(ids)), e["id"]
    for p in e["partes"]:
        assert isinstance(p["valor"], (int, float)), (e["id"], p["id"])
        p["valor"] = round(float(p["valor"]), 6)

SALIDA.write_text(json.dumps(EJ, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Escrito {SALIDA}: {len(EJ)} ejercicios, {sum(len(e['partes']) for e in EJ)} respuestas.")
por_tema = {}
for e in EJ:
    por_tema[e["tema"]] = por_tema.get(e["tema"], 0) + 1
print(por_tema)
