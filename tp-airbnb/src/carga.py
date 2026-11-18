"""Carga del archivo de Inside Airbnb y validación de que es el dato correcto.

Patrón de la clase 2.1 de la cátedra: los errores técnicos de lectura (archivo inexistente,
gzip roto, CSV mal formado) se envuelven en una excepción propia, DataFileError, con un
mensaje que explica el problema en términos del proyecto. Así se «falla pronto» y claro.
"""
import hashlib  # Calcula la huella SHA-256 del archivo
import zlib  # Errores de descompresión de un .gz dañado
from pathlib import Path  # Tipo de las rutas que recibe cada función

import pandas as pd  # Manipulación tabular

from src import config  # Rutas, URL y huella esperada


class DataFileError(Exception):
    """Error de dominio: el archivo de datos falta, está dañado o no tiene lo que se espera."""


def calcular_sha256(ruta: Path) -> str:
    """Calcula la huella SHA-256 de un archivo leyéndolo por bloques.

    Parameters
    ----------
    ruta : Path
        Archivo a verificar.

    Returns
    -------
    str
        Huella en hexadecimal (64 caracteres). Si un solo byte cambia, la huella cambia.
    """
    huella = hashlib.sha256()  # Objeto que acumula la huella
    with open(ruta, "rb") as archivo:  # «with» cierra el archivo aunque algo falle
        for bloque in iter(lambda: archivo.read(1024 * 1024), b""):  # Lee de a 1 MB, sin cargar todo en memoria
            huella.update(bloque)  # Suma cada bloque a la huella
    return huella.hexdigest()  # Devuelve la huella como texto


def cargar_listings(ruta: Path = config.RUTA_LISTINGS) -> pd.DataFrame:
    """Lee listings.csv.gz comprimido y lo devuelve como DataFrame.

    Parameters
    ----------
    ruta : Path, optional
        Ubicación del archivo. Por defecto, data/raw/listings.csv.gz.

    Returns
    -------
    pd.DataFrame
        Una fila por anuncio y una columna por variable (90 en la extracción usada).

    Raises
    ------
    DataFileError
        Si el archivo no existe o no se puede leer como CSV comprimido.
    """
    if not ruta.exists():  # Fallar pronto: sin archivo no hay análisis posible
        raise DataFileError(
            f"No se encontró {ruta}. Descargalo con: python -m src.descargar_datos"
        )
    try:
        # low_memory=False: pandas lee el archivo entero antes de decidir el tipo de cada columna
        return pd.read_csv(ruta, compression="gzip", low_memory=False)
    # Errores técnicos esperables: gzip inválido (OSError), archivo cortado a mitad de la
    # descarga (EOFError), datos comprimidos corruptos (zlib.error) o CSV mal formado.
    except (OSError, EOFError, zlib.error, pd.errors.ParserError, UnicodeDecodeError) as exc:
        raise DataFileError(
            f"No se pudo leer {ruta.name} (¿descarga incompleta?): {exc}. "
            "Volvé a bajarlo con: python -m src.descargar_datos --forzar"
        ) from exc  # Se conserva la causa original


def validar_columnas(df: pd.DataFrame, requeridas: list[str]) -> None:
    """Comprueba que el DataFrame tenga todas las columnas que el caso necesita.

    Inside Airbnb puede cambiar columnas entre extracciones, por eso se verifica antes de modelar.

    Parameters
    ----------
    df : pd.DataFrame
        Datos cargados.
    requeridas : list[str]
        Nombres de columnas obligatorias.

    Raises
    ------
    DataFileError
        Si falta al menos una columna; el mensaje dice cuáles.
    """
    faltantes = set(requeridas) - set(df.columns)  # Diferencia de conjuntos: lo pedido que no está
    if faltantes:  # Un conjunto vacío equivale a False
        raise DataFileError(f"Faltan columnas en el archivo: {sorted(faltantes)}")


def resumir_origen(df: pd.DataFrame, ruta: Path = config.RUTA_LISTINGS) -> dict:
    """Arma la evidencia de que se trabaja con los datos de Inside Airbnb indicados.

    Es lo que se muestra al comienzo de la corrida en la defensa: archivo, huella, fechas de
    extracción, tamaño y si la huella coincide con la del informe.

    Parameters
    ----------
    df : pd.DataFrame
        Datos cargados de ese archivo.
    ruta : Path, optional
        Archivo del que salieron los datos.

    Returns
    -------
    dict
        Claves: archivo, mb, sha256, coincide_sha256, filas, columnas, fechas_scrape, dominio.
    """
    huella = calcular_sha256(ruta)  # Huella del archivo que está en disco
    fechas = sorted(df["last_scraped"].dropna().unique()) if "last_scraped" in df.columns else []
    # Dominio más frecuente de los enlaces de los anuncios (en Buenos Aires: airbnb.com.ar)
    dominios = df["listing_url"].str.extract(r"airbnb\.([a-z.]+)/")[0].mode() if "listing_url" in df.columns else []
    return {
        "archivo": ruta.name,  # Nombre del archivo leído
        "mb": round(ruta.stat().st_size / 1_000_000, 1),  # Tamaño en megabytes
        "sha256": huella,  # Huella calculada
        "coincide_sha256": huella == config.SHA256_LISTINGS,  # ¿Es exactamente el archivo del informe?
        "filas": len(df),  # Cantidad de anuncios
        "columnas": df.shape[1],  # Cantidad de variables
        "fechas_scrape": (fechas[0], fechas[-1]) if fechas else ("?", "?"),  # Días en que Inside Airbnb relevó
        "dominio": dominios.iloc[0] if len(dominios) else "?",  # Dominio de los anuncios
    }
