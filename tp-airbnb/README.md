# TP Scikit-learn · Precio nocturno con datos de Inside Airbnb (Buenos Aires)

Trabajo práctico de **Python para Ciencia de Datos** (UADE). Grupo 1 · proyectos **1** y **4** de la
guía «Estimación de precios con datos de Inside Airbnb».

| Proyecto | Pregunta | Modelo | Por qué |
|---|---|---|---|
| 1 · Capacidad y precio | ¿Cuánto cambia el precio por noche con cada huésped más? | Regresión lineal simple (`LinearRegression`) | Objetivo numérico, un solo predictor, se pide una regla explicable (la pendiente). |
| 4 · Alojamientos similares | ¿Cuánto cobrar por un anuncio nuevo según anuncios parecidos? | k vecinos más cercanos para regresión (`KNeighborsRegressor`, k=5) en un `Pipeline` con `StandardScaler` | «Buscar parecidos y promediar su precio» es k-NN; el precio es numérico (Regressor, no Classifier); k-NN mide distancias, por eso se escala. |

## Integrantes

- _completar_

## Datos

- Fuente: [Inside Airbnb · Get the Data](https://insideairbnb.com/get-the-data/) → Buenos Aires →
  `listings.csv.gz` (*Detailed Listings data*), extracción del **23/09/2026** (relevada del 25 al 27/09/2026).
- Licencia de los datos: Creative Commons Attribution 4.0.
- 29.753 anuncios, 90 columnas, 18,1 MB comprimido. Precios en **pesos argentinos (ARS)** por noche.
- El archivo **no se versiona** (está en `.gitignore`): se descarga con el script y se verifica con su huella
  SHA-256 `c8db6461c06c0de3efbdda6821d6d28c9aef7dff3c6fde64ac4fd3661e15b78a`.

## Estructura

```
tp-airbnb/
├── README.md                  ← este archivo
├── main.py                    ← punto de entrada: valida los datos y corre los proyectos
├── requirements.txt           ← dependencias con versión fija
├── pyproject.toml             ← metadatos y configuración de pytest
├── .gitignore                 ← excluye .venv, cachés, .env, datos y salidas regenerables
├── data/
│   ├── raw/                   ← listings.csv.gz (NO versionado; ver data/raw/README.md)
│   └── processed/             ← datos limpios que genera el pipeline (regenerables)
├── notebooks/
│   └── 01_corrida_y_validacion.ipynb  ← notebook delgado: importa src, verifica y muestra
├── src/
│   ├── config.py              ← rutas, URL, semilla, k y casos nuevos (un solo lugar)
│   ├── descargar_datos.py     ← baja el archivo oficial y verifica la huella
│   ├── carga.py               ← lectura, DataFileError, control de columnas, evidencia del origen
│   ├── limpieza.py            ← precio a número, faltantes, registros imposibles, extremos 1 %–99 %
│   ├── evaluacion.py          ← MAE, RMSE, R², modelo base y tabla real vs. predicho
│   ├── graficos.py            ← dispersión con recta y real vs. predicho (PNG)
│   ├── proyecto1_capacidad.py ← caso 1: regresión lineal simple
│   └── proyecto4_similares.py ← caso 4: k-NN para regresión + análisis complementario de k
├── tests/                     ← 27 tests con pytest (datos chicos armados a mano + 2 de punta a punta)
├── reports/                   ← métricas (.txt), tablas (.csv) y figures/ (.png), regenerables
└── docs/
    ├── informe.md             ← resultados, modelo elegido y conclusiones de cada proyecto
    ├── diccionario_de_datos.md
    └── cambios.md             ← registro de versiones
```

## Cómo reproducirlo

```bash
# 1. Entorno virtual (una vez)
python -m venv .venv
# Windows:  .venv\Scripts\activate      macOS/Linux:  source .venv/bin/activate
python -m pip install -r requirements.txt

# 2. Datos (una vez): baja listings.csv.gz a data/raw/ y verifica la huella
python -m src.descargar_datos            # --forzar para volver a bajarlo si quedó cortado

# 3. Pruebas
python -m pytest -v

# 4. Corrida completa (o --proyecto 1 / --proyecto 4; --rapido saltea el análisis de k)
python main.py
```

La corrida imprime primero la **evidencia del origen** (archivo, tamaño, fechas de relevamiento,
huella SHA-256 y si coincide con la del informe) y después cada proyecto: limpieza, tamaños de
train/test, coeficientes o parámetros, métricas contra un modelo base, estimación del caso nuevo y
la tabla real vs. predicho. Guarda todo en `reports/` y `data/processed/`.

## Resultados (extracción del 23/09/2026, conjunto de prueba)

| | MAE (ARS) | RMSE (ARS) | R² |
|---|---:|---:|---:|
| P1 · Regresión lineal | 48.485 | 79.839 | 0,261 |
| P1 · Base (promedio) | 57.818 | 92.855 | 0,000 |
| P4 · k-NN escalado, k=5 | 55.569 | 85.465 | 0,095 |
| P4 · Base (promedio) | 56.736 | 89.883 | −0,001 |

- **P1:** precio ≈ 40.231 + 30.454 × huéspedes. Para 4 huéspedes: **≈ 162.046 ARS por noche**.
- **P4:** para [4 huéspedes, 2 dormitorios, 3 camas, 2 noches mínimas]: **≈ 115.463 ARS por noche**.

Las variables de capacidad explican poco del precio (R² bajo): falta la ubicación, el tipo de
alojamiento, la calidad y la temporada. La interpretación completa, el hallazgo de los anuncios
«gemelos» del proyecto 4 y el análisis de k están en [docs/informe.md](docs/informe.md).

## Licencia

- Datos: Inside Airbnb, Creative Commons Attribution 4.0 (se cita la fuente arriba).
- Código: a definir por el grupo (por ejemplo, MIT) antes de publicar el repositorio.

## Limitaciones

- El precio es el publicado por noche (alquiler temporario), no el de compraventa.
- Asociación no es causalidad: más huéspedes no «causa» un precio mayor; ambos dependen del tamaño de la propiedad.
- Las conclusiones valen dentro del rango observado (1 a 16 huéspedes).
- Otra extracción de Inside Airbnb dará números distintos (por eso se fija la huella del archivo).
