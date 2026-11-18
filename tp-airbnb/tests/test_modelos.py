"""Tests de los modelos y las métricas con datos donde el resultado correcto se conoce de antemano."""
import numpy as np
import pandas as pd
import pytest
from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import StandardScaler

from src.evaluacion import calcular_metricas, tabla_real_vs_predicho
from src.proyecto1_capacidad import entrenar_regresion_lineal
from src.proyecto4_similares import (buscar_vecinos, contar_gemelos, crear_pipeline_knn,
                                     resumir_gemelos_del_caso)


def test_regresion_recupera_la_recta_conocida(datos_lineales):
    modelo = entrenar_regresion_lineal(datos_lineales[["accommodates"]], datos_lineales["price_num"])
    assert modelo.intercept_ == pytest.approx(20_000)  # β0
    assert modelo.coef_[0] == pytest.approx(30_000)  # β1: cada huésped suma 30.000
    prediccion = modelo.predict(pd.DataFrame({"accommodates": [4]}))[0]
    assert prediccion == pytest.approx(140_000)  # 20.000 + 30.000 × 4


def test_metricas_de_prediccion_perfecta():
    m = calcular_metricas([100, 200, 300], [100, 200, 300])
    assert m["MAE"] == 0 and m["RMSE"] == 0 and m["R2"] == 1


def test_metricas_con_errores_conocidos():
    m = calcular_metricas([100, 200], [110, 170])  # Errores: -10 y +30
    assert m["MAE"] == pytest.approx(20)  # (10 + 30) / 2
    assert m["RMSE"] == pytest.approx(np.sqrt((10**2 + 30**2) / 2))  # √500 ≈ 22,36


def test_pipeline_knn_tiene_escalador_y_regresor():
    modelo = crear_pipeline_knn(k=3)
    assert isinstance(modelo.named_steps["escalador"], StandardScaler)
    assert isinstance(modelo.named_steps["knn"], KNeighborsRegressor)  # Regressor: el precio es numérico
    assert modelo.named_steps["knn"].n_neighbors == 3


def test_knn_promedia_los_vecinos_mas_cercanos():
    X = pd.DataFrame({"accommodates": [1, 2, 3, 10], "bedrooms": [0, 1, 1, 5]})
    y = pd.Series([100.0, 200.0, 300.0, 5000.0])
    modelo = crear_pipeline_knn(k=2, pesos="uniform").fit(X, y)
    caso = pd.DataFrame({"accommodates": [2], "bedrooms": [1]})
    vecinos = buscar_vecinos(modelo, X, y, caso)
    assert modelo.predict(caso)[0] == pytest.approx(vecinos["precio"].mean())  # Promedio de los 2 vecinos
    assert 5000.0 not in vecinos["precio"].tolist()  # El anuncio grande queda lejos


def test_buscar_vecinos_funciona_sin_escalador():
    X = pd.DataFrame({"accommodates": [1, 2, 3, 10], "bedrooms": [0, 1, 1, 5]})
    y = pd.Series([100.0, 200.0, 300.0, 5000.0])
    modelo = crear_pipeline_knn(k=1, escalar=False).fit(X, y)
    vecinos = buscar_vecinos(modelo, X, y, pd.DataFrame({"accommodates": [3], "bedrooms": [1]}))
    assert vecinos["precio"].tolist() == [300.0]  # El idéntico, a distancia 0
    assert vecinos["distancia"].tolist() == [0.0]


def test_resumir_gemelos_del_caso():
    X_train = pd.DataFrame({"a": [1, 1, 2], "b": [0, 0, 1]})
    y_train = pd.Series([100.0, 300.0, 50.0])
    resultado = resumir_gemelos_del_caso(X_train, y_train, pd.DataFrame({"a": [1], "b": [0]}))
    assert resultado == {"cantidad": 2, "precio_medio": 200.0, "precio_mediano": 200.0}


def test_contar_gemelos():
    X_train = pd.DataFrame({"a": [1, 1, 2], "b": [0, 0, 1]})  # 2 combinaciones distintas
    X_test = pd.DataFrame({"a": [1, 5], "b": [0, 5]})  # La primera tiene gemelo; la segunda no
    resultado = contar_gemelos(X_train, X_test)
    assert resultado == {"combinaciones_train": 2, "proporcion_test_con_gemelo": 0.5}


def test_tabla_real_vs_predicho_calcula_el_error():
    X_test = pd.DataFrame({"accommodates": [2, 4]})
    tabla = tabla_real_vs_predicho(X_test, [100.0, 300.0], [90.0, 320.0])
    assert tabla["Error"].tolist() == [10.0, -20.0]  # Real - predicho
