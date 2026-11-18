# Registro de cambios

## v1.0 — versión para la defensa (26/11/2026)

- Proyecto 1: regresión lineal simple `accommodates → price`, con gráfico de dispersión y recta,
  métricas contra un modelo base y tabla «recta vs. medianas».
- Proyecto 4: k-NN para regresión (k=5) en un Pipeline con StandardScaler, vecinos del caso nuevo,
  experimento de control sin escalar, conteo de gemelos y análisis complementario de k con validación
  cruzada (`--rapido` para saltearlo).
- Limpieza común con resumen de filas por paso; carga con `DataFileError` (también para descargas
  incompletas); descarga a archivo temporal con verificación de huella (`--forzar`).
- 27 tests con pytest, incluidos dos de punta a punta con datos sintéticos.
- Notebook delgado ejecutado de principio a fin.
