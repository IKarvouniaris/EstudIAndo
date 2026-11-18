# data/raw

Datos originales: **nunca se modifican**. Todo lo demás se regenera desde acá.

| Archivo | Origen | Fecha | Tamaño | SHA-256 |
|---|---|---|---|---|
| `listings.csv.gz` | Inside Airbnb · Buenos Aires · Detailed Listings data | extracción 2026-09-23 (relevada 25–27/09/2026) | 18,1 MB | `c8db6461c06c0de3efbdda6821d6d28c9aef7dff3c6fde64ac4fd3661e15b78a` |

El archivo no está en el repositorio (ver `.gitignore`). Para obtenerlo:

```bash
python -m src.descargar_datos
```

o a mano desde <https://insideairbnb.com/get-the-data/> → Buenos Aires → `listings.csv.gz`, guardado
**sin descomprimir** en esta carpeta. Licencia: Creative Commons Attribution 4.0.
