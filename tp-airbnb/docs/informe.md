# Informe · Proyectos 1 y 4

Datos: Inside Airbnb · Buenos Aires · `listings.csv.gz`, extracción del 23/09/2026 (SHA-256
`c8db6461…5b78a`). Precios en pesos argentinos por noche. Todas las cifras salen de `python main.py`
(salidas en `reports/`). Semilla `random_state=42`, 75 % entrenamiento / 25 % prueba.

## Limpieza común

| Paso | Proyecto 1 | Proyecto 4 |
|---|---:|---:|
| Archivo completo | 29.753 | 29.753 |
| Sin faltantes en las columnas del caso | 27.634 | 27.143 |
| Sin registros imposibles | 27.634 | 27.143 |
| Precio entre percentil 1 y 99 | 27.086 | 26.599 |
| Entrenamiento / prueba | 20.314 / 6.772 | 19.949 / 6.650 |

Reglas de registro imposible: precio ≤ 0, `accommodates` < 1, `bedrooms` < 0, `beds` < 1,
`minimum_nights` fuera de 1–365. El recorte del 1 % de cada punta sigue la guía de la cátedra: en el
archivo hay precios de hasta 160 millones por noche, casi seguro errores de carga, que torcerían el
ajuste. Los límites se calculan sobre los datos del caso antes de dividir (como en la solución de la
cátedra); calcularlos solo con entrenamiento sería la variante más estricta.

## Proyecto 1 · Capacidad y precio

**Modelo elegido: regresión lineal simple.** El objetivo es un número continuo (regresión), hay un solo
predictor (`accommodates`) y el caso pide una regla explicable: la pendiente dice cuánto cambia el precio
por cada huésped.

- Recta: **precio ≈ 40.231 + 30.454 × huéspedes**.
- Estimación para 4 huéspedes: **≈ 162.046 ARS por noche**.

| Prueba | MAE | RMSE | R² |
|---|---:|---:|---:|
| Regresión lineal | 48.485 | 79.839 | 0,261 |
| Base (promedio de train) | 57.818 | 92.855 | 0,000 |

En entrenamiento el R² es 0,254: no hay sobreajuste.

**Conclusión.** Cada huésped adicional se asocia con unos 30.500 pesos más por noche. El modelo mejora al
promedio (MAE 16 % menor), pero explica solo el 26 % de la variación del precio: la capacidad sola no
alcanza (faltan ubicación, tipo y calidad del alojamiento, temporada). La recta sobreestima los
alojamientos chicos (1 huésped: mediana real 46.836 vs. recta 70.685) y subestima los de 10 a 13
huéspedes. Es una asociación, no una causa, y vale dentro del rango observado (1 a 16 huéspedes).

## Proyecto 4 · Alojamientos similares

**Modelo elegido: k vecinos más cercanos para regresión (`KNeighborsRegressor`, k=5,
`weights="distance"`) dentro de un `Pipeline` con `StandardScaler`.** El caso pide valorar un anuncio
promediando el precio de los más parecidos (eso es k-NN); el precio es numérico (Regressor, no
Classifier); k-NN usa distancias, así que se escalan las variables, y el Pipeline ajusta el escalador
solo con entrenamiento.

- Estimación para [4 huéspedes, 2 dormitorios, 3 camas, 2 noches]: **≈ 115.463 ARS por noche**.

| Prueba | MAE | RMSE | R² |
|---|---:|---:|---:|
| k-NN escalado, k=5 | 55.569 | 85.465 | 0,095 |
| k-NN sin escalar, k=5 (control) | 54.088 | 83.871 | 0,129 |
| Base (promedio de train) | 56.736 | 89.883 | −0,001 |

En entrenamiento el R² es 0,297: hay sobreajuste.

**Hallazgo: los gemelos.** Con estas cuatro variables hay solo 1.171 combinaciones distintas en
entrenamiento, y el 97 % de los anuncios de prueba tiene un gemelo exacto (mismos cuatro valores). Los
vecinos quedan a distancia 0 con o sin escalar, por eso escalar casi no cambia el resultado. El caso nuevo
tiene 278 gemelos (precio medio ≈ 168.500, mediano ≈ 147.900); k=5 promedia 5 de ellos y da 115.463.

**Análisis complementario (validación cruzada de 5 particiones, solo entrenamiento).** RMSE de validación:

| k | `distance` | `uniform` |
|---:|---:|---:|
| 5 | 86.005 | 84.435 |
| 15 | 80.504 | 78.514 |
| 50 | 79.186 | 77.032 |
| 100 | 79.173 | 77.222 |

**Conclusión.** k-NN es el enfoque que pide el caso, pero con k=5 apenas mejora al promedio y sobreajusta,
porque promedia muy pocos de muchos anuncios idénticos. Un k mayor (≈ 50), elegido con validación cruzada,
reduce el error; y para estimar bien el precio harían falta variables de ubicación y de calidad.

## Limitaciones

- El precio es el publicado por noche para alquiler temporario, no el de compraventa.
- Asociación no es causalidad.
- Otra extracción de Inside Airbnb dará otros números: por eso se fija la huella del archivo.
