"""Limpieza de los anuncios antes de modelar.

Pasos, en este orden (cada uno queda contado en un resumen para poder justificarlo):
1. Convertir el precio de texto ("$106,393.00") a número.
2. Quedarse solo con las columnas del caso y convertirlas a número.
3. Eliminar filas con datos faltantes en ESAS columnas (no en todo el archivo).
4. Eliminar registros imposibles (precio no positivo, 0 huéspedes, estadía mínima de más de un año…).
5. Recortar los precios extremos: fuera del percentil 1 y 99 (regla de la guía de la cátedra).

Ninguna función modifica el DataFrame que recibe: siempre trabajan sobre una copia.
"""
import pandas as pd  # Manipulación tabular

from src import config  # Nombres de columnas y cuantiles de recorte

# Valor mínimo y máximo admitido para cada variable (registro imposible si cae afuera).
# None = sin límite de ese lado. Se documentan en la biblia del proyecto.
RANGOS_VALIDOS = {
    "accommodates": (1, None),  # Un alojamiento recibe al menos a 1 huésped
    "bedrooms": (0, None),  # 0 dormitorios es válido: monoambiente
    "beds": (1, None),  # Sin camas no se puede alojar a nadie
    "minimum_nights": (1, config.NOCHES_MINIMAS_MAX),  # Entre 1 noche y 1 año
}


def convertir_precio(serie: pd.Series) -> pd.Series:
    """Convierte textos monetarios en números, conservando dígitos, punto decimal y signo.

    Parameters
    ----------
    serie : pd.Series
        Precios como texto, por ejemplo "$106,393.00".

    Returns
    -------
    pd.Series
        Precios como float (106393.0). Lo que no se puede convertir queda NaN.
    """
    limpio = serie.astype(str).str.replace(r"[^0-9.-]", "", regex=True)  # Borra "$" y las comas de miles
    return pd.to_numeric(limpio, errors="coerce")  # "coerce": un texto inválido pasa a NaN en vez de romper


def filtrar_registros_validos(datos: pd.DataFrame) -> pd.DataFrame:
    """Elimina anuncios con precio no positivo o con valores fuera de RANGOS_VALIDOS.

    Parameters
    ----------
    datos : pd.DataFrame
        Debe tener price_num; las columnas de RANGOS_VALIDOS se controlan solo si están.

    Returns
    -------
    pd.DataFrame
        Copia con las filas válidas.
    """
    mascara = datos[config.COLUMNA_PRECIO_NUM] > 0  # Máscara booleana: True = fila que se queda
    for columna, (minimo, maximo) in RANGOS_VALIDOS.items():  # Revisa cada regla de dominio
        if columna not in datos.columns:  # Solo se controlan las columnas que usa el caso
            continue
        if minimo is not None:
            mascara &= datos[columna] >= minimo  # &= combina condiciones con «y» (nunca «and» con Series)
        if maximo is not None:
            mascara &= datos[columna] <= maximo
    return datos[mascara].copy()  # Copia: lo que se haga después no afecta a «datos»


def filtrar_extremos_precio(
    datos: pd.DataFrame,
    cuantil_inferior: float = config.CUANTIL_INFERIOR,
    cuantil_superior: float = config.CUANTIL_SUPERIOR,
) -> tuple[pd.DataFrame, float, float]:
    """Conserva los precios entre dos cuantiles (por defecto, del percentil 1 al 99).

    Los precios de Buenos Aires tienen una cola larguísima (hay anuncios de más de 100 millones
    por noche, casi seguro errores de carga). Esos valores dominarían el ajuste lineal.

    Parameters
    ----------
    datos : pd.DataFrame
        Debe tener la columna price_num.
    cuantil_inferior, cuantil_superior : float
        Proporciones entre 0 y 1 (no porcentajes: quantile(0.01), no quantile(1)).

    Returns
    -------
    tuple[pd.DataFrame, float, float]
        Datos filtrados, límite inferior y límite superior en pesos.
    """
    precios = datos[config.COLUMNA_PRECIO_NUM]  # Serie de precios numéricos
    limite_inferior, limite_superior = precios.quantile([cuantil_inferior, cuantil_superior])  # Dos cuantiles a la vez
    filtrados = datos[precios.between(limite_inferior, limite_superior)].copy()  # between incluye ambos extremos
    return filtrados, float(limite_inferior), float(limite_superior)


def preparar_datos(
    df: pd.DataFrame,
    predictores: list[str],
    solo_viviendas_completas: bool = False,
) -> tuple[pd.DataFrame, dict]:
    """Aplica toda la limpieza para un caso y cuenta cuántas filas se pierden en cada paso.

    Parameters
    ----------
    df : pd.DataFrame
        Datos crudos tal como salen de cargar_listings().
    predictores : list[str]
        Columnas de entrada del caso.
    solo_viviendas_completas : bool, optional
        Si es True, se queda con room_type == "Entire home/apt".

    Returns
    -------
    tuple[pd.DataFrame, dict]
        Datos listos para modelar (predictores + price_num) y un resumen con los conteos y
        los límites de precio usados.
    """
    resumen = {"filas_iniciales": len(df)}  # Diccionario que documenta cada decisión
    base = df  # No se copia todavía: el filtro siguiente ya devuelve una tabla nueva
    if solo_viviendas_completas and "room_type" in df.columns:
        base = df[df["room_type"] == "Entire home/apt"]  # Filtro opcional por tipo de alojamiento
        resumen["filas_tipo"] = len(base)

    datos = base[predictores].copy()  # Solo las columnas del caso, sobre una copia
    datos[config.COLUMNA_PRECIO_NUM] = convertir_precio(base[config.COLUMNA_PRECIO])  # Precio como número
    for columna in predictores:
        datos[columna] = pd.to_numeric(datos[columna], errors="coerce")  # Asegura tipo numérico

    datos = datos.dropna()  # Faltantes solo en las columnas del caso
    resumen["filas_sin_faltantes"] = len(datos)

    datos = filtrar_registros_validos(datos)  # Reglas de dominio
    resumen["filas_validas"] = len(datos)

    datos, limite_inferior, limite_superior = filtrar_extremos_precio(datos)  # Recorte 1 %–99 %
    resumen["filas_finales"] = len(datos)
    resumen["precio_min_admitido"] = round(limite_inferior, 2)
    resumen["precio_max_admitido"] = round(limite_superior, 2)
    return datos.reset_index(drop=True), resumen  # Índice 0..n-1 para que las tablas se lean fácil
