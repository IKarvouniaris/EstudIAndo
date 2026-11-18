"""Métricas de regresión y tablas de comparación real vs. predicho.

Las tres métricas que pide la consigna:
- MAE: error absoluto medio, en pesos. «En promedio me equivoco por X pesos.»
- RMSE: raíz del error cuadrático medio, en pesos. Castiga más los errores grandes.
- R²: proporción de la variación del precio que explica el modelo (1 = perfecto, 0 = igual
  que predecir siempre el promedio; puede ser negativo si es peor que eso).
"""
import numpy as np  # Raíz cuadrada
import pandas as pd  # Tablas de resultados
from sklearn.dummy import DummyRegressor  # Modelo base: predice siempre el promedio
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score  # Métricas de regresión


def calcular_metricas(y_real, y_predicho) -> dict:
    """Calcula MAE, RMSE y R² sobre un conjunto de datos.

    Parameters
    ----------
    y_real : array-like
        Precios observados.
    y_predicho : array-like
        Precios que estimó el modelo, en el mismo orden.

    Returns
    -------
    dict
        {"MAE": float, "RMSE": float, "R2": float}
    """
    mae = mean_absolute_error(y_real, y_predicho)  # Promedio de |real - predicho|
    rmse = np.sqrt(mean_squared_error(y_real, y_predicho))  # Raíz del promedio de (real - predicho)²
    r2 = r2_score(y_real, y_predicho)  # 1 - (error del modelo / error de predecir el promedio)
    return {"MAE": float(mae), "RMSE": float(rmse), "R2": float(r2)}


def evaluar_modelo_base(X_train, y_train, X_test, y_test) -> dict:
    """Mide un modelo base que siempre predice el precio promedio de entrenamiento.

    Sirve de vara: un modelo útil tiene que equivocarse menos que esto.

    Returns
    -------
    dict
        Las mismas métricas de calcular_metricas() para el modelo base.
    """
    base = DummyRegressor(strategy="mean")  # «Modelo» sin variables: el promedio
    base.fit(X_train, y_train)  # Aprende el promedio solo con entrenamiento
    return calcular_metricas(y_test, base.predict(X_test))  # Se evalúa en prueba, como el modelo real


def imprimir_metricas(filas: list[tuple[str, dict]]) -> None:
    """Imprime una línea alineada por modelo: MAE, RMSE (en pesos) y R².

    Parameters
    ----------
    filas : list[tuple[str, dict]]
        Pares (nombre, métricas) en el orden en que se quieren mostrar.
    """
    ancho = max(len(nombre) for nombre, _ in filas)  # Alinea todas las columnas
    for nombre, m in filas:
        print(f"{nombre:<{ancho}}  MAE {m['MAE']:>10,.0f} · RMSE {m['RMSE']:>10,.0f} · R² {m['R2']:.3f}")


def tabla_real_vs_predicho(X_test: pd.DataFrame, y_test, y_predicho, filas: int = 10) -> pd.DataFrame:
    """Arma la tabla que pide la consigna: predictores, precio real, predicho y error.

    Parameters
    ----------
    X_test : pd.DataFrame
        Predictores del conjunto de prueba.
    y_test : array-like
        Precios reales de prueba.
    y_predicho : array-like
        Precios estimados.
    filas : int, optional
        Cuántas filas mostrar (10 por defecto).

    Returns
    -------
    pd.DataFrame
        Una fila por anuncio de prueba con las columnas Real, Predicho y Error (= real - predicho).
    """
    tabla = X_test.copy()  # Copia para no agregar columnas a X_test
    tabla["Real"] = np.asarray(y_test)  # asarray: alinea por posición, no por índice
    tabla["Predicho"] = np.round(np.asarray(y_predicho), 0)  # Pesos sin centavos
    tabla["Error"] = tabla["Real"] - tabla["Predicho"]  # Residuo: positivo = el modelo se quedó corto
    return tabla.head(filas)
