"""Tests de src/limpieza.py: cada regla de limpieza se prueba por separado (Arrange, Act, Assert)."""
import pandas as pd
import pytest

from src.limpieza import convertir_precio, filtrar_extremos_precio, filtrar_registros_validos, preparar_datos


@pytest.mark.parametrize(  # Varios escenarios con un solo test
    "texto, esperado",
    [
        ("$106,393.00", 106393.0),  # Formato real de Inside Airbnb
        ("$1,234,567.89", 1234567.89),  # Separadores de miles múltiples
        ("$0.00", 0.0),
    ],
)
def test_convertir_precio_formatos_validos(texto, esperado):
    resultado = convertir_precio(pd.Series([texto]))
    assert resultado.iloc[0] == pytest.approx(esperado)  # approx: compara decimales sin error de redondeo


def test_convertir_precio_texto_invalido_da_nan():
    resultado = convertir_precio(pd.Series(["sin precio", None]))
    assert resultado.isna().all()  # errors="coerce": no rompe, deja NaN


def test_filtrar_registros_validos_saca_imposibles():
    datos = pd.DataFrame({
        "price_num": [100.0, 0.0, 200.0, 300.0],  # el segundo tiene precio 0
        "accommodates": [2, 2, 0, 3],  # el tercero tiene 0 huéspedes
        "minimum_nights": [1, 1, 1, 500],  # el cuarto pide 500 noches
    })
    resultado = filtrar_registros_validos(datos)
    assert resultado["price_num"].tolist() == [100.0]  # Solo sobrevive la primera fila
    assert len(datos) == 4  # La entrada no se modificó


def test_filtrar_extremos_precio_respeta_cuantiles():
    datos = pd.DataFrame({"price_num": list(range(1, 101))})  # Precios 1, 2, …, 100
    filtrados, inferior, superior = filtrar_extremos_precio(datos, 0.10, 0.90)
    assert inferior == pytest.approx(10.9)  # Cuantil 0.10 interpolado por pandas
    assert superior == pytest.approx(90.1)
    assert filtrados["price_num"].between(inferior, superior).all()
    assert len(filtrados) == 80  # Del 11 al 90


def test_preparar_datos_cuenta_cada_paso(listings_ejemplo):
    datos, resumen = preparar_datos(listings_ejemplo, ["accommodates", "minimum_nights"])
    assert resumen["filas_iniciales"] == 8
    assert resumen["filas_sin_faltantes"] == 7  # Se va el anuncio 4 (sin precio)
    assert resumen["filas_validas"] == 4  # Se van el 5 (precio 0), el 6 (400 noches) y el 8 (0 huéspedes)
    assert list(datos.columns) == ["accommodates", "minimum_nights", "price_num"]
    assert (datos["price_num"] > 0).all()


def test_preparar_datos_no_modifica_la_entrada(listings_ejemplo):
    copia = listings_ejemplo.copy()
    preparar_datos(listings_ejemplo, ["accommodates"])
    pd.testing.assert_frame_equal(listings_ejemplo, copia)  # Igual celda por celda


def test_preparar_datos_solo_viviendas_completas(listings_ejemplo):
    _, resumen = preparar_datos(listings_ejemplo, ["accommodates"], solo_viviendas_completas=True)
    assert resumen["filas_tipo"] == 7  # El anuncio 8 es "Private room"
