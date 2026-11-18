"""Proyecto 4 · Precio según alojamientos similares.

Caso: valorar un anuncio nuevo buscando anuncios PARECIDOS (por capacidad, dormitorios, camas
y noches mínimas) y promediando el precio de los más cercanos.

Modelo elegido: k VECINOS MÁS CERCANOS PARA REGRESIÓN (KNeighborsRegressor), dentro de un Pipeline
con StandardScaler.
- «Buscar parecidos y promediar sus precios» es exactamente cómo funciona k-NN.
- El objetivo (precio) es numérico continuo → KNeighborsRegressor, NO KNeighborsClassifier
  (ese se usaría si el objetivo fuera una categoría como «barato / medio / caro»).
- k-NN mide distancias: sin escalar, minimum_nights (de 1 a 365) dominaría a bedrooms (de 0 a 10).
  StandardScaler lleva cada variable a media 0 y desvío 1, y el Pipeline garantiza que el escalador
  se ajuste SOLO con entrenamiento (sin fuga de información hacia la prueba).

Se ejecuta con:  python main.py --proyecto 4   (o  python -m src.proyecto4_similares)
"""
import pandas as pd  # Tablas
from sklearn.model_selection import cross_val_score, train_test_split  # Validación cruzada y división
from sklearn.neighbors import KNeighborsRegressor  # k-NN para objetivos numéricos
from sklearn.pipeline import Pipeline  # Encadena escalado + modelo
from sklearn.preprocessing import StandardScaler  # Estandarización Z: (x - media) / desvío

from src import config  # Parámetros del experimento
from src.carga import cargar_listings, validar_columnas  # Lectura y control del archivo
from src.evaluacion import (calcular_metricas, evaluar_modelo_base, imprimir_metricas,  # Métricas
                            tabla_real_vs_predicho)
from src.graficos import graficar_real_vs_predicho  # Figura de diagnóstico
from src.limpieza import preparar_datos  # Limpieza del caso


MODELO_ELEGIDO = ("k vecinos más cercanos para regresión (KNeighborsRegressor) en un Pipeline con "
                  "StandardScaler: se valora el anuncio promediando el precio de los más parecidos; el "
                  "precio es numérico (Regressor) y k-NN mide distancias, por eso se escala sin fuga.")


def crear_pipeline_knn(k: int = config.K_VECINOS, pesos: str = config.PESOS_KNN,
                       escalar: bool = True) -> Pipeline:
    """Arma el flujo «escalar → k-NN» como un único estimador.

    Parameters
    ----------
    k : int, optional
        Cantidad de vecinos (5 según la consigna).
    pesos : str, optional
        "distance": el vecino más cercano pesa más; "uniform": promedio simple.
    escalar : bool, optional
        False solo para el experimento de comparación «sin escalar».

    Returns
    -------
    Pipeline
        Pasos con nombre: "escalador" (si escalar=True) y "knn".
    """
    pasos = []
    if escalar:
        pasos.append(("escalador", StandardScaler()))  # Aprende media y desvío en fit (solo train)
    pasos.append(("knn", KNeighborsRegressor(n_neighbors=k, weights=pesos)))  # Promedia vecinos
    return Pipeline(steps=pasos)


def buscar_vecinos(modelo: Pipeline, X_train: pd.DataFrame, y_train: pd.Series,
                   caso: pd.DataFrame) -> pd.DataFrame:
    """Devuelve los k anuncios de entrenamiento más parecidos al caso, con su precio y distancia.

    Permite explicar la estimación: «el modelo dijo X porque estos anuncios se parecen y cobran Y».

    Parameters
    ----------
    modelo : Pipeline
        Pipeline ya entrenado cuyo último paso es "knn" (con o sin escalador antes).
    X_train, y_train :
        Los mismos datos con los que se entrenó.
    caso : pd.DataFrame
        Una fila con los predictores del anuncio a valorar.

    Returns
    -------
    pd.DataFrame
        Una fila por vecino: predictores, precio y distancia (en desvíos estándar si hay escalador).
    """
    # modelo[:-1] = todos los pasos menos el último: aplica el mismo preprocesamiento que en predict
    caso_transformado = modelo[:-1].transform(caso) if len(modelo.steps) > 1 else caso
    distancias, indices = modelo[-1].kneighbors(caso_transformado)  # Posiciones de los vecinos en train
    vecinos = X_train.iloc[indices[0]].copy()  # iloc: por posición dentro de X_train
    vecinos["precio"] = y_train.iloc[indices[0]].to_numpy()
    vecinos["distancia"] = distancias[0].round(3)  # No son kilómetros: son desvíos estándar
    return vecinos


def contar_gemelos(X_train: pd.DataFrame, X_test: pd.DataFrame) -> dict:
    """Mide cuántas combinaciones distintas hay y qué parte de la prueba tiene un «gemelo» en train.

    Un gemelo es un anuncio de entrenamiento con exactamente los mismos 4 valores. Con variables
    discretas (huéspedes, dormitorios, camas, noches) pasa muchísimo, y explica el comportamiento
    de k-NN: el vecino está a distancia 0, escalado o no.

    Returns
    -------
    dict
        combinaciones_train (int) y proporcion_test_con_gemelo (float entre 0 y 1).
    """
    combinaciones = X_train.drop_duplicates()  # Una fila por combinación distinta de valores
    cruce = X_test.merge(combinaciones, how="left", indicator=True)  # indicator: ¿la fila está en ambos?
    return {
        "combinaciones_train": len(combinaciones),
        "proporcion_test_con_gemelo": float((cruce["_merge"] == "both").mean()),
    }


def comparar_k_con_validacion_cruzada(X_train: pd.DataFrame, y_train: pd.Series,
                                      valores_k: tuple[int, ...] = (5, 15, 50, 100)) -> pd.DataFrame:
    """Análisis complementario: RMSE de validación cruzada (5 particiones) para varios k.

    Se hace SOLO con entrenamiento: la prueba se sigue usando una única vez, al final.
    No cambia el modelo del caso (k=5 lo fija la consigna); sirve para justificar qué pasaría
    con otro k y para responder «¿por qué k=5?» en la defensa.

    Parameters
    ----------
    X_train, y_train :
        Datos de entrenamiento.
    valores_k : tuple[int, ...], optional
        Valores de k a comparar.

    Returns
    -------
    pd.DataFrame
        Una fila por k, con el RMSE medio de validación para pesos "distance" y "uniform".
    """
    filas = []
    for k in valores_k:
        fila = {"k": k}
        for pesos in ("distance", "uniform"):
            puntajes = cross_val_score(  # Entrena y evalúa 5 veces, cada vez con otra partición
                crear_pipeline_knn(k, pesos), X_train, y_train,
                cv=5, scoring="neg_root_mean_squared_error",  # Scikit-learn lo devuelve con signo negativo
            )
            fila[f"RMSE_cv_{pesos}"] = round(float(-puntajes.mean()), 0)  # Se le saca el signo
        filas.append(fila)
    return pd.DataFrame(filas)


def resumir_gemelos_del_caso(X_train: pd.DataFrame, y_train: pd.Series, caso: pd.DataFrame) -> dict:
    """Cuántos anuncios de entrenamiento son idénticos al caso nuevo y qué precio tienen.

    Con k=5, k-NN promedia solo 5 de esos gemelos (los que elige su desempate interno); este
    resumen muestra qué daría promediarlos a todos.

    Returns
    -------
    dict
        cantidad (int), precio_medio (float) y precio_mediano (float) de los gemelos.
    """
    iguales = (X_train == caso.iloc[0]).all(axis=1)  # True si las 4 columnas coinciden
    precios = y_train[iguales]
    return {
        "cantidad": int(iguales.sum()),
        "precio_medio": round(float(precios.mean()), 0) if len(precios) else None,
        "precio_mediano": round(float(precios.median()), 0) if len(precios) else None,
    }


def ejecutar_proyecto4(df: pd.DataFrame | None = None, mostrar: bool = True,
                       analizar_k: bool = True) -> dict:
    """Corre el caso completo de k-NN y devuelve todos los resultados para el informe.

    Parameters
    ----------
    df : pd.DataFrame, optional
        Datos crudos ya cargados. Si es None, se leen del disco.
    mostrar : bool, optional
        Si es True, imprime cada etapa.
    analizar_k : bool, optional
        Si es True, corre el análisis complementario de k con validación cruzada (lo más lento).

    Returns
    -------
    dict
        "resumen" (valores simples para el informe en texto), "datos", "tabla", "vecinos",
        "parametros_escala", "comparacion_k" (o None) y "figuras".
    """
    if df is None:
        df = cargar_listings()  # 1. Carga
    predictores = config.PREDICTORES_P4
    validar_columnas(df, predictores + [config.COLUMNA_PRECIO])  # 2. Control de columnas

    datos, limpieza = preparar_datos(df, predictores)  # 3. Limpieza
    X = datos[predictores]  # Matriz de entrada (4 columnas)
    y = datos[config.COLUMNA_PRECIO_NUM]  # Objetivo numérico

    X_train, X_test, y_train, y_test = train_test_split(  # 4. Separación ANTES de escalar
        X, y, test_size=config.TEST_SIZE, random_state=config.RANDOM_STATE
    )

    modelo = crear_pipeline_knn()  # 5. Escalador + k-NN (k=5, pesos por distancia)
    modelo.fit(X_train, y_train)  # El escalador aprende con train; k-NN guarda los ejemplos de train
    y_pred = modelo.predict(X_test)  # 6. El Pipeline escala X_test con los parámetros de train y predice

    sin_escalar = crear_pipeline_knn(escalar=False).fit(X_train, y_train)  # Experimento de control
    caso_nuevo = pd.DataFrame(config.CASO_NUEVO_P4)  # 8. [4 huéspedes, 2 dormitorios, 3 camas, 2 noches]

    resumen = {
        "modelo_elegido": MODELO_ELEGIDO,
        "limpieza": limpieza,
        "n_train": len(X_train),
        "n_test": len(X_test),
        "metricas_test": calcular_metricas(y_test, y_pred),  # 7. Evaluación en prueba
        "metricas_train": calcular_metricas(y_train, modelo.predict(X_train)),  # Sobreajuste
        "metricas_base": evaluar_modelo_base(X_train, y_train, X_test, y_test),  # Vara: el promedio
        "metricas_sin_escalar": calcular_metricas(y_test, sin_escalar.predict(X_test)),
        "gemelos": contar_gemelos(X_train, X_test),  # Explica por qué escalar cambia poco acá
        "gemelos_del_caso": resumir_gemelos_del_caso(X_train, y_train, caso_nuevo),
        "estimacion_caso_nuevo": float(modelo.predict(caso_nuevo)[0]),
    }

    escalador = modelo.named_steps["escalador"]  # Lo que aprendió el escalador (solo con train)
    resultados = {
        "resumen": resumen,
        "datos": datos,  # main.py los guarda en data/processed/
        "tabla": tabla_real_vs_predicho(X_test, y_test, y_pred),  # 10. Tabla real vs. predicho
        "vecinos": buscar_vecinos(modelo, X_train, y_train, caso_nuevo),
        "parametros_escala": pd.DataFrame({"media": escalador.mean_, "desvio": escalador.scale_},
                                          index=predictores).round(2),
        "comparacion_k": comparar_k_con_validacion_cruzada(X_train, y_train) if analizar_k else None,
        "figuras": [graficar_real_vs_predicho(  # 9. Gráfico de diagnóstico
            y_test.to_numpy(), y_pred, "P4 · Real vs. estimado con k-NN (prueba)",
            config.CARPETA_FIGURAS / "p4_real_vs_predicho.png",
        )],
    }
    if mostrar:
        imprimir_resultados_p4(resultados)
    return resultados


def imprimir_resultados_p4(r: dict) -> None:
    """Muestra en la terminal lo que se presenta en la defensa del proyecto 4."""
    s = r["resumen"]
    print("\n" + "=" * 70)
    print("PROYECTO 4 · Alojamientos similares → precio · k-NN para regresión (k=5)")
    print("=" * 70)
    print("Modelo elegido:", s["modelo_elegido"])
    print("Limpieza:", s["limpieza"])
    print(f"Entrenamiento: {s['n_train']} anuncios · Prueba: {s['n_test']} anuncios")
    print("Parámetros que aprendió StandardScaler (solo con train):")
    print(r["parametros_escala"].to_string())
    imprimir_metricas([("k-NN escalado (test)", s["metricas_test"]),
                       ("k-NN escalado (train)", s["metricas_train"]),
                       ("k-NN SIN escalar (test)", s["metricas_sin_escalar"]),
                       ("Base: promedio (test)", s["metricas_base"])])
    g = s["gemelos"]
    print(f"Combinaciones distintas en train: {g['combinaciones_train']} · "
          f"anuncios de prueba con gemelo exacto en train: {g['proporcion_test_con_gemelo']:.1%}")
    if r["comparacion_k"] is not None:
        print("Análisis complementario · RMSE de validación cruzada (5 particiones, solo train):")
        print(r["comparacion_k"].to_string(index=False))
    print(f"Estimación para [4 huéspedes, 2 dormitorios, 3 camas, 2 noches]: "
          f"{s['estimacion_caso_nuevo']:,.0f} ARS por noche")
    gc = s["gemelos_del_caso"]
    print(f"Ese caso tiene {gc['cantidad']} gemelos exactos en train "
          f"(precio medio {gc['precio_medio']:,.0f} · mediano {gc['precio_mediano']:,.0f}); k=5 usa 5 de ellos:")
    print(r["vecinos"].to_string(index=False))
    print("\nReal vs. predicho (primeras 10 filas de prueba):")
    print(r["tabla"].to_string(index=False))
    print("\nFiguras:", ", ".join(str(f.name) for f in r["figuras"]))


if __name__ == "__main__":
    ejecutar_proyecto4()
