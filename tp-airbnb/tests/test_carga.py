"""Tests de src/carga.py: errores claros cuando el archivo falta, está roto o le faltan columnas."""
import gzip

import pandas as pd
import pytest

from src.carga import DataFileError, calcular_sha256, cargar_listings, validar_columnas


def test_cargar_listings_sin_archivo_falla_con_mensaje(tmp_path):  # tmp_path: carpeta temporal de pytest
    with pytest.raises(DataFileError, match="No se encontró"):
        cargar_listings(tmp_path / "no_existe.csv.gz")


def test_cargar_listings_lee_csv_comprimido(tmp_path):
    ruta = tmp_path / "listings.csv.gz"
    with gzip.open(ruta, "wt", encoding="utf-8") as archivo:  # Crea un CSV comprimido mínimo
        archivo.write("id,price,accommodates\n1,$100.00,2\n2,$200.00,4\n")
    df = cargar_listings(ruta)
    assert df.shape == (2, 3)


def test_cargar_listings_archivo_cortado_da_error_de_dominio(tmp_path):
    completo = tmp_path / "completo.csv.gz"
    with gzip.open(completo, "wt", encoding="utf-8") as archivo:
        archivo.write("id,price\n" + "".join(f"{i},${i}.00\n" for i in range(5000)))
    cortado = tmp_path / "cortado.csv.gz"
    cortado.write_bytes(completo.read_bytes()[:200])  # Simula una descarga interrumpida
    with pytest.raises(DataFileError, match="descarga incompleta"):
        cargar_listings(cortado)


def test_validar_columnas_informa_las_faltantes():
    df = pd.DataFrame({"price": [1], "accommodates": [2]})
    with pytest.raises(DataFileError, match="bedrooms"):
        validar_columnas(df, ["price", "accommodates", "bedrooms"])


def test_validar_columnas_no_falla_si_estan_todas():
    df = pd.DataFrame({"price": [1], "accommodates": [2]})
    validar_columnas(df, ["price", "accommodates"])  # Si no lanza excepción, el test pasa


def test_calcular_sha256_de_texto_conocido(tmp_path):
    ruta = tmp_path / "hola.txt"
    ruta.write_bytes(b"hola")
    # Huella SHA-256 conocida de la palabra «hola»
    assert calcular_sha256(ruta) == "b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79"
