"""Fixtures compartidas por todos los tests (pytest las descubre solo por el nombre del archivo).

Los tests NO usan el archivo real de Inside Airbnb: usan un DataFrame chico armado a mano,
con casos conocidos (precio con símbolo, faltantes, imposibles, extremos). Así corren en un
segundo, sin descargar nada, y cada resultado esperado se puede calcular de cabeza.
"""
import pandas as pd
import pytest


@pytest.fixture
def listings_ejemplo() -> pd.DataFrame:
    """Ocho anuncios con el mismo formato que listings.csv.gz (columnas y precio como texto)."""
    return pd.DataFrame({
        "id": [1, 2, 3, 4, 5, 6, 7, 8],
        "price": ["$50,000.00", "$80,000.00", "$110,000.00", None,  # el 4 no tiene precio
                  "$0.00", "$140,000.00", "$170,000.00", "$90,000.00"],  # el 5 tiene precio 0
        "accommodates": [1, 2, 3, 2, 2, 4, 5, 0],  # el 8 tiene 0 huéspedes: imposible
        "bedrooms": [0, 1, 1, 1, 1, 2, 2, 1],
        "beds": [1, 1, 2, 1, 1, 3, 3, 1],
        "minimum_nights": [2, 3, 1, 2, 2, 400, 2, 1],  # el 6 pide 400 noches: imposible
        "room_type": ["Entire home/apt"] * 7 + ["Private room"],
    })


@pytest.fixture
def datos_lineales() -> pd.DataFrame:
    """Datos donde el precio es EXACTAMENTE 20.000 + 30.000 × huéspedes (recta conocida)."""
    huespedes = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]
    return pd.DataFrame({
        "accommodates": huespedes,
        "price_num": [20_000 + 30_000 * h for h in huespedes],
    })
