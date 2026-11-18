"""Tests de integración: los dos proyectos y el guardado de salidas, de punta a punta.

Usan un listings sintético de 200 anuncios (no el archivo real) y carpetas temporales, así no
tocan data/ ni reports/ del proyecto. Comprueban que todo lo que main.py necesita existe.
"""
import json

import matplotlib
import numpy as np
import pandas as pd
import pytest

matplotlib.use("Agg")  # Sin ventanas durante los tests

import main  # noqa: E402
from src import config  # noqa: E402
from src.descargar_datos import descargar_listings  # noqa: E402
from src.proyecto1_capacidad import ejecutar_proyecto1  # noqa: E402
from src.proyecto4_similares import ejecutar_proyecto4  # noqa: E402


@pytest.fixture
def listings_sintetico() -> pd.DataFrame:
    """200 anuncios con precio ≈ 30.000 + 25.000 × huéspedes + ruido, en el formato de Inside Airbnb."""
    rng = np.random.default_rng(0)  # Semilla: siempre los mismos datos
    huespedes = rng.integers(1, 7, size=200)
    precio = 30_000 + 25_000 * huespedes + rng.normal(0, 5_000, size=200)
    return pd.DataFrame({
        "price": [f"${p:,.2f}" for p in precio],  # Texto con símbolo y separador de miles
        "accommodates": huespedes,
        "bedrooms": np.maximum(huespedes // 2, 0),
        "beds": np.maximum(huespedes - 1, 1),
        "minimum_nights": rng.integers(1, 6, size=200),
    })


@pytest.fixture
def carpetas_temporales(tmp_path, monkeypatch):
    """Redirige las carpetas de salida de config a una carpeta temporal de pytest."""
    monkeypatch.setattr(config, "CARPETA_PROCESSED", tmp_path / "processed")
    monkeypatch.setattr(config, "CARPETA_REPORTES", tmp_path / "reports")
    monkeypatch.setattr(config, "CARPETA_FIGURAS", tmp_path / "reports" / "figures")
    return tmp_path


def test_proyecto1_de_punta_a_punta(listings_sintetico, carpetas_temporales):
    r = ejecutar_proyecto1(listings_sintetico, mostrar=False)
    s = r["resumen"]
    assert s["pendiente"] == pytest.approx(25_000, rel=0.1)  # Recupera la pendiente con ruido
    assert s["metricas_test"]["R2"] > 0.8
    assert s["metricas_test"]["RMSE"] < s["metricas_base"]["RMSE"]  # Mejor que el promedio
    assert all(f.exists() for f in r["figuras"])  # Se guardaron los PNG

    main.guardar_resultados("p1", r)
    reportes = carpetas_temporales / "reports"
    assert (reportes / "p1_real_vs_predicho.csv").exists()
    assert (reportes / "p1_medianas.csv").exists()
    resumen = json.loads((reportes / "p1_metricas.txt").read_text(encoding="utf-8"))
    assert "pendiente" in resumen and "modelo_elegido" in resumen


def test_proyecto4_de_punta_a_punta(listings_sintetico, carpetas_temporales):
    r = ejecutar_proyecto4(listings_sintetico, mostrar=False, analizar_k=False)
    assert len(r["vecinos"]) == config.K_VECINOS
    assert r["comparacion_k"] is None  # Se salteó el análisis de k
    assert r["resumen"]["estimacion_caso_nuevo"] > 0
    main.guardar_resultados("p4", r)
    assert (carpetas_temporales / "processed" / "p4_datos_limpios.csv").exists()
    assert (carpetas_temporales / "reports" / "p4_vecinos.csv").exists()


def test_descarga_reemplaza_solo_con_forzar(tmp_path):
    origen = tmp_path / "origen.csv.gz"
    origen.write_bytes(b"nuevo")
    destino = tmp_path / "raw" / "listings.csv.gz"
    destino.parent.mkdir()
    destino.write_bytes(b"viejo")
    url = origen.as_uri()  # file:///…: se prueba la descarga sin internet

    descargar_listings(destino, url)  # Sin --forzar: no toca el archivo existente
    assert destino.read_bytes() == b"viejo"
    descargar_listings(destino, url, forzar=True)  # Con --forzar: lo reemplaza
    assert destino.read_bytes() == b"nuevo"
    assert not destino.with_name("listings.csv.gz.part").exists()  # No queda el temporal
