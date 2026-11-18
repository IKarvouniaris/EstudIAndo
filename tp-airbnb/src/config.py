"""Configuración central del proyecto: rutas, semilla y parámetros de los dos modelos.

Todo valor que el análisis usa en más de un lugar vive acá (principio DRY). Si cambia la
proporción de prueba o el k del vecino más cercano, se cambia una sola vez.
"""
from pathlib import Path  # Rutas multiplataforma (Windows, macOS, Linux) sin concatenar textos

# --- Rutas -------------------------------------------------------------------------------
RAIZ_PROYECTO = Path(__file__).resolve().parent.parent  # Carpeta tp-airbnb/, sin importar desde dónde se ejecute
CARPETA_RAW = RAIZ_PROYECTO / "data" / "raw"  # Datos originales: nunca se modifican
CARPETA_PROCESSED = RAIZ_PROYECTO / "data" / "processed"  # Datos limpios que genera el pipeline
CARPETA_REPORTES = RAIZ_PROYECTO / "reports"  # Métricas y tablas de resultados
CARPETA_FIGURAS = CARPETA_REPORTES / "figures"  # Gráficos exportados en PNG

RUTA_LISTINGS = CARPETA_RAW / "listings.csv.gz"  # Archivo que pide la consigna, sin descomprimir

# --- Fuente de datos ---------------------------------------------------------------------
# Inside Airbnb · Get the Data → Buenos Aires → listings.csv.gz (Detailed Listings data).
# Licencia de los datos: Creative Commons Attribution 4.0.
FECHA_EXTRACCION = "2026-09-23"  # Fecha de la extracción descargada (cambia en cada publicación)
URL_LISTINGS = (
    "https://data.insideairbnb.com/argentina/ciudad-aut%C3%B3noma-de-buenos-aires/"
    f"buenos-aires/{FECHA_EXTRACCION}/data/listings.csv.gz"
)
# Huella SHA-256 del archivo usado en el informe: permite probar que se trabaja con el mismo dato.
SHA256_LISTINGS = "c8db6461c06c0de3efbdda6821d6d28c9aef7dff3c6fde64ac4fd3661e15b78a"

# --- Parámetros comunes del experimento -------------------------------------------------
TEST_SIZE = 0.25  # 25 % de los anuncios queda reservado para prueba (lo pide la consigna)
RANDOM_STATE = 42  # Semilla: la misma división train/test en cada corrida
CUANTIL_INFERIOR = 0.01  # Se descarta el 1 % de precios más bajos...
CUANTIL_SUPERIOR = 0.99  # ...y el 1 % más alto (regla de la guía de la cátedra)
NOCHES_MINIMAS_MAX = 365  # Más de un año de estadía mínima no es alquiler temporario: registro imposible

# --- Proyecto 1: regresión lineal simple -------------------------------------------------
PREDICTOR_P1 = "accommodates"  # Única variable de entrada autorizada por el caso
CASO_NUEVO_P1 = {"accommodates": [4]}  # Alojamiento para 4 huéspedes que hay que estimar

# --- Proyecto 4: k-NN para regresión -----------------------------------------------------
PREDICTORES_P4 = ["accommodates", "bedrooms", "beds", "minimum_nights"]  # Las cuatro de la consigna
K_VECINOS = 5  # Cantidad de vecinos que pide el caso
PESOS_KNN = "distance"  # Los vecinos más cercanos pesan más (como en la solución de la cátedra)
CASO_NUEVO_P4 = {  # 4 huéspedes, 2 dormitorios, 3 camas, 2 noches mínimas
    "accommodates": [4],
    "bedrooms": [2],
    "beds": [3],
    "minimum_nights": [2],
}

COLUMNA_PRECIO = "price"  # Columna original: texto con símbolo y separadores ("$106,393.00")
COLUMNA_PRECIO_NUM = "price_num"  # Columna numérica que crea la limpieza
