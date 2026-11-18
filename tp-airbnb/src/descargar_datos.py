"""Descarga listings.csv.gz de Inside Airbnb (Buenos Aires) a data/raw/ y verifica su huella.

Los datos no se suben al repositorio (pesan ~18 MB y cada extracción es distinta): se versiona
este script, que deja documentado de dónde salen exactamente.

Uso:
    python -m src.descargar_datos            # baja el archivo si no está
    python -m src.descargar_datos --forzar   # lo vuelve a bajar aunque exista (p. ej. si quedó cortado)
"""
import argparse  # Opción --forzar
import urllib.request  # Descarga por HTTP con la biblioteca estándar (sin dependencias extra)
from pathlib import Path  # Tipo de la ruta destino

from src import config  # URL, ruta destino y huella esperada
from src.carga import calcular_sha256  # Verificación de integridad


def descargar_listings(destino: Path = config.RUTA_LISTINGS, url: str = config.URL_LISTINGS,
                       forzar: bool = False) -> bool:
    """Descarga el archivo oficial y comprueba que sea el mismo del informe.

    La descarga se escribe primero en un archivo temporal «.part» y recién al terminar se
    renombra: si se corta la conexión, nunca queda un listings.csv.gz a medias.

    Parameters
    ----------
    destino : Path, optional
        Dónde guardarlo (data/raw/listings.csv.gz).
    url : str, optional
        Enlace oficial de la extracción usada en el TP.
    forzar : bool, optional
        Si es True, vuelve a descargar aunque el archivo ya exista.

    Returns
    -------
    bool
        True si la huella SHA-256 coincide con la del informe.
    """
    if destino.exists() and not forzar:  # No se vuelve a bajar si ya está
        print(f"Ya existe {destino}; no se descarga de nuevo (usar --forzar para reemplazarlo).")
    else:
        destino.parent.mkdir(parents=True, exist_ok=True)  # Crea data/raw si falta
        temporal = destino.with_name(destino.name + ".part")  # listings.csv.gz.part
        print(f"Descargando {url} …")
        urllib.request.urlretrieve(url, temporal)  # Si falla acá, el destino no se toca
        temporal.replace(destino)  # Renombre atómico: el archivo final aparece completo o no aparece
        print(f"Guardado en {destino}")
    coincide = calcular_sha256(destino) == config.SHA256_LISTINGS
    if coincide:
        print("Huella SHA-256 correcta: es el mismo archivo con el que se hizo el informe.")
    else:
        print("ATENCIÓN: la huella no coincide. Puede ser otra extracción o una descarga dañada:"
              " probar con --forzar; si persiste, los números del informe van a cambiar.")
    return coincide


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Descarga listings.csv.gz de Inside Airbnb")
    parser.add_argument("--forzar", action="store_true", help="Volver a descargar aunque exista")
    descargar_listings(forzar=parser.parse_args().forzar)
