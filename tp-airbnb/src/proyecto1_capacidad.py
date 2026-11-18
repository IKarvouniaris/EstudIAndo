"""Proyecto 1 · Capacidad del alojamiento y precio nocturno.

Caso: la administradora quiere una regla «sencilla y explicable» para saber cuánto cambia el
precio por noche cuando aumenta la cantidad máxima de huéspedes, usando una sola variable
de entrada: accommodates.

Modelo elegido: REGRESIÓN LINEAL SIMPLE (LinearRegression).
- El objetivo (precio) es un número continuo → es un problema de regresión, no de clasificación.
- Hay un único predictor y se pide una regla explicable → una recta  precio = β0 + β1 · huéspedes,
  donde la pendiente β1 responde directo la pregunta: «cada huésped más suma β1 pesos por noche».

Se ejecuta con:  python main.py --proyecto 1   (o  python -m src.proyecto1_capacidad)
"""
import pandas as pd  # Tablas
from sklearn.linear_model import LinearRegression  # Recta de mínimos cuadrados
from sklearn.model_selection import train_test_split  # División entrenamiento / prueba

from src import config  # Parámetros del experimento
from src.carga import cargar_listings, validar_columnas  # Lectura y control del archivo
from src.evaluacion import (calcular_metricas, evaluar_modelo_base, imprimir_metricas,  # Métricas
                            tabla_real_vs_predicho)
from src.graficos import graficar_dispersion_recta, graficar_real_vs_predicho  # Figuras
from src.limpieza import preparar_datos  # Limpieza del caso

MODELO_ELEGIDO = ("Regresión lineal simple: el precio es un número continuo (regresión), hay un solo "
                  "predictor y se pide una regla explicable; la pendiente dice cuánto suma cada huésped.")


def entrenar_regresion_lineal(X_train: pd.DataFrame, y_train: pd.Series) -> LinearRegression:
    """Crea y entrena una regresión lineal con los datos de entrenamiento.

    Parameters
    ----------
    X_train : pd.DataFrame
        Matriz de UNA columna (accommodates). Doble corchete: df[["accommodates"]].
    y_train : pd.Series
        Precio por noche en pesos.

    Returns
    -------
    LinearRegression
        Modelo ajustado: intercept_ (β0) y coef_[0] (β1, la pendiente).
    """
    modelo = LinearRegression()  # Instancia del estimador
    modelo.fit(X_train, y_train)  # fit: calcula β0 y β1 que minimizan el error cuadrático en train
    return modelo


def comparar_recta_con_medianas(datos: pd.DataFrame, modelo: LinearRegression,
                                predictor: str = config.PREDICTOR_P1) -> pd.DataFrame:
    """Tabla de control: para cada capacidad, cuántos anuncios hay, su precio mediano y el de la recta.

    Sirve para mostrar dónde la recta se aleja de los datos (por ejemplo, con 1 huésped).

    Returns
    -------
    pd.DataFrame
        Columnas: predictor, anuncios, mediana_real, recta.
    """
    tabla = (datos.groupby(predictor)[config.COLUMNA_PRECIO_NUM]
             .agg(anuncios="count", mediana_real="median")  # Agregaciones con nombre (clase 10)
             .reset_index())
    tabla["recta"] = modelo.predict(tabla[[predictor]])  # Valor de la recta para esa capacidad
    return tabla.round(0)


def ejecutar_proyecto1(df: pd.DataFrame | None = None, mostrar: bool = True) -> dict:
    """Corre el caso completo: limpieza, división, entrenamiento, evaluación, gráficos y caso nuevo.

    Parameters
    ----------
    df : pd.DataFrame, optional
        Datos crudos ya cargados (main.py los carga una sola vez). Si es None, se leen del disco.
    mostrar : bool, optional
        Si es True, imprime cada etapa en la terminal.

    Returns
    -------
    dict
        "resumen" (valores simples para el informe en texto), "datos" (limpios), "tabla"
        (real vs. predicho), "medianas" (recta vs. medianas) y "figuras" (rutas PNG).
    """
    if df is None:
        df = cargar_listings()  # 1. Carga
    predictor = config.PREDICTOR_P1
    validar_columnas(df, [predictor, config.COLUMNA_PRECIO])  # 2. ¿Están las columnas del caso?

    datos, limpieza = preparar_datos(df, [predictor])  # 3. Limpieza (faltantes, imposibles, extremos)
    X = datos[[predictor]]  # Matriz de entrada (2 dimensiones)
    y = datos[config.COLUMNA_PRECIO_NUM]  # Vector objetivo

    X_train, X_test, y_train, y_test = train_test_split(  # 4. Separación 75 % / 25 %
        X, y, test_size=config.TEST_SIZE, random_state=config.RANDOM_STATE
    )

    modelo = entrenar_regresion_lineal(X_train, y_train)  # 5. Entrenamiento (solo con train)
    y_pred = modelo.predict(X_test)  # 6. Predicción sobre datos no vistos

    caso_nuevo = pd.DataFrame(config.CASO_NUEVO_P1)  # 8. Alojamiento para 4 huéspedes
    resumen = {
        "modelo_elegido": MODELO_ELEGIDO,
        "limpieza": limpieza,
        "n_train": len(X_train),
        "n_test": len(X_test),
        "intercepto": float(modelo.intercept_),
        "pendiente": float(modelo.coef_[0]),
        "metricas_test": calcular_metricas(y_test, y_pred),  # 7. Evaluación en prueba
        "metricas_train": calcular_metricas(y_train, modelo.predict(X_train)),  # Para ver sobreajuste
        "metricas_base": evaluar_modelo_base(X_train, y_train, X_test, y_test),  # Vara: el promedio
        "estimacion_caso_nuevo": float(modelo.predict(caso_nuevo)[0]),
    }

    figuras = [  # 9. Gráfico que pide la consigna + diagnóstico
        graficar_dispersion_recta(datos, predictor, modelo, config.CARPETA_FIGURAS / "p1_dispersion_recta.png"),
        graficar_real_vs_predicho(y_test.to_numpy(), y_pred, "P1 · Real vs. estimado (prueba)",
                                  config.CARPETA_FIGURAS / "p1_real_vs_predicho.png"),
    ]
    resultados = {
        "resumen": resumen,
        "datos": datos,  # main.py los guarda en data/processed/
        "tabla": tabla_real_vs_predicho(X_test, y_test, y_pred),  # 10. Tabla real vs. predicho
        "medianas": comparar_recta_con_medianas(datos, modelo),
        "figuras": figuras,
    }
    if mostrar:
        imprimir_resultados_p1(resultados)
    return resultados


def imprimir_resultados_p1(r: dict) -> None:
    """Muestra en la terminal lo que se presenta en la defensa del proyecto 1."""
    s = r["resumen"]
    print("\n" + "=" * 70)
    print("PROYECTO 1 · Capacidad (accommodates) → precio · Regresión lineal simple")
    print("=" * 70)
    print("Modelo elegido:", s["modelo_elegido"])
    print("Limpieza:", s["limpieza"])
    print(f"Entrenamiento: {s['n_train']} anuncios · Prueba: {s['n_test']} anuncios")
    print(f"Intercepto (β0): {s['intercepto']:,.2f} ARS")
    print(f"Pendiente  (β1): {s['pendiente']:,.2f} ARS por cada huésped adicional")
    imprimir_metricas([("Modelo (test)", s["metricas_test"]), ("Modelo (train)", s["metricas_train"]),
                       ("Base: promedio (test)", s["metricas_base"])])
    print(f"Estimación para 4 huéspedes: {s['estimacion_caso_nuevo']:,.0f} ARS por noche")
    print("\nRecta vs. precio mediano observado por capacidad:")
    print(r["medianas"].to_string(index=False))
    print("\nReal vs. predicho (primeras 10 filas de prueba):")
    print(r["tabla"].to_string(index=False))
    print("\nFiguras:", ", ".join(str(f.name) for f in r["figuras"]))


if __name__ == "__main__":  # Solo corre si se ejecuta este archivo, no al importarlo
    ejecutar_proyecto1()
