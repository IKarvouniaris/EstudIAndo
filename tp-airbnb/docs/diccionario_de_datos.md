# Diccionario de datos (columnas usadas)

| Columna | Tipo en el archivo | Significado | Uso | Regla de validez |
|---|---|---|---|---|
| `price` | texto (`"$106,393.00"`) | Precio por noche publicado, en pesos argentinos | Objetivo (se convierte a `price_num`) | > 0 y entre el percentil 1 y 99 |
| `accommodates` | entero | Cantidad máxima de huéspedes | P1 (único predictor) y P4 | ≥ 1 |
| `bedrooms` | decimal | Dormitorios (0 = monoambiente) | P4 | ≥ 0 |
| `beds` | decimal | Camas | P4 | ≥ 1 |
| `minimum_nights` | decimal | Estadía mínima en noches | P4 | entre 1 y 365 |
| `room_type` | texto | Vivienda completa, habitación privada, compartida u hotel | Solo descriptivo | — |
| `last_scraped` | texto (fecha) | Día en que Inside Airbnb relevó el anuncio | Evidencia del origen | — |
| `listing_url` | texto | Enlace al anuncio | Evidencia del origen | — |

Faltantes en el archivo completo (29.753 anuncios): `price` 2.119 · `bedrooms` 13 · `beds` 522 ·
`minimum_nights` 1 · `accommodates` 0. Los faltantes se eliminan **solo en las columnas de cada caso**.
