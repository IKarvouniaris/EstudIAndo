"""Punto de entrada del TP: corre la validación de los datos y los proyectos 1 y 4.

Uso (desde la carpeta tp-airbnb/, con el entorno virtual activado):
    python main.py                 # valida los datos y corre los dos proyectos
    python main.py --proyecto 1    # solo regresión lineal (capacidad → precio)
    python main.py --proyecto 4    # solo k-NN (alojamientos similares → precio)
    python main.py --rapido        # sin el análisis complementario de k (lo más lento)

Salidas: data/processed/*.csv (datos limpios), reports/*.csv y *.txt (tablas y métricas),
reports/figures/*.png (gráficos). Todo se regenera en cada corrida.
"""
import argparse  # Lee las opciones de la línea de comandos
import json  # Guarda las métricas en un formato legible

import matplotlib

matplotlib.use("Agg")  # Gráficos directo a archivo, sin ventanas: funciona en cualquier terminal

from src import config  # noqa: E402  Rutas
from src.carga import DataFileError, cargar_listings, resumir_origen  # noqa: E402  Carga y origen
from src.proyecto1_capacidad import ejecutar_proyecto1  # noqa: E402  Caso 1
from src.proyecto4_similares import ejecutar_proyecto4  # noqa: E402  Caso 4

# Tablas extra de cada proyecto que se guardan como CSV en reports/ (si existen)
TABLAS_EXTRA = ("medianas", "vecinos", "comparacion_k")


def mostrar_origen(origen: dict) -> None:
    """Imprime la evidencia de que los datos son los de Inside Airbnb Buenos Aires."""
    print("=" * 70)
    print("DATOS · Inside Airbnb · Buenos Aires · listings.csv.gz (Detailed Listings)")
    print("=" * 70)
    print(f"Archivo: {origen['archivo']} ({origen['mb']} MB)")
    print(f"Anuncios: {origen['filas']:,} · Columnas: {origen['columnas']}")
    print(f"Relevado por Inside Airbnb entre {origen['fechas_scrape'][0]} y {origen['fechas_scrape'][1]}"
          f" (extracción publicada el {config.FECHA_EXTRACCION})")
    print(f"Dominio de los anuncios: airbnb.{origen['dominio']}")
    print(f"SHA-256: {origen['sha256']}")
    print("Coincide con el archivo del informe:", "SÍ" if origen["coincide_sha256"] else "NO (otra extracción)")


def guardar_resultados(nombre: str, resultados: dict) -> None:
    """Guarda datos limpios, tablas y el resumen de métricas de un proyecto.

    Parameters
    ----------
    nombre : str
        Prefijo de los archivos ("p1" o "p4").
    resultados : dict
        Lo que devuelve ejecutar_proyecto1() o ejecutar_proyecto4().
    """
    config.CARPETA_PROCESSED.mkdir(parents=True, exist_ok=True)
    config.CARPETA_REPORTES.mkdir(parents=True, exist_ok=True)
    resultados["datos"].to_csv(config.CARPETA_PROCESSED / f"{nombre}_datos_limpios.csv", index=False)
    resultados["tabla"].to_csv(config.CARPETA_REPORTES / f"{nombre}_real_vs_predicho.csv", index=False)
    for clave in TABLAS_EXTRA:
        if resultados.get(clave) is not None:  # .get: no todos los proyectos tienen todas las tablas
            resultados[clave].to_csv(config.CARPETA_REPORTES / f"{nombre}_{clave}.csv", index=False)
    texto = json.dumps(resultados["resumen"], indent=2, ensure_ascii=False)  # Solo valores simples
    (config.CARPETA_REPORTES / f"{nombre}_metricas.txt").write_text(texto, encoding="utf-8")


def main() -> None:
    """Lee las opciones, valida el archivo y ejecuta los proyectos pedidos."""
    parser = argparse.ArgumentParser(description="TP Scikit-learn · Inside Airbnb Buenos Aires")
    parser.add_argument("--proyecto", choices=["1", "4", "todos"], default="todos",
                        help="Qué proyecto correr (por defecto, los dos)")
    parser.add_argument("--rapido", action="store_true",
                        help="Saltear el análisis complementario de k del proyecto 4")
    args = parser.parse_args()

    try:
        df = cargar_listings()  # Se carga UNA vez y se comparte entre los proyectos
    except DataFileError as error:  # Error de dominio con mensaje claro
        print(f"ERROR: {error}")
        raise SystemExit(1)  # Código de salida distinto de 0: la corrida falló

    mostrar_origen(resumir_origen(df))

    if args.proyecto in ("1", "todos"):
        guardar_resultados("p1", ejecutar_proyecto1(df))
    if args.proyecto in ("4", "todos"):
        guardar_resultados("p4", ejecutar_proyecto4(df, analizar_k=not args.rapido))
    print("\nListo. Resultados en reports/ y datos limpios en data/processed/.")


if __name__ == "__main__":
    main()
