"""Gráficos de los dos proyectos, exportados a reports/figures/ en PNG.

Interfaz orientada a objetos de Matplotlib (fig, ax = plt.subplots()), como en la clase 05.
Siempre se guarda con savefig ANTES de cerrar la figura. Este módulo no elige el «backend» de
Matplotlib: eso lo decide quien ejecuta (main.py usa Agg; un notebook usa el suyo).
"""
from pathlib import Path  # Ruta de salida de cada figura

import matplotlib.pyplot as plt  # Gráficos
import pandas as pd  # Tablas


def graficar_dispersion_recta(datos: pd.DataFrame, predictor: str, modelo, ruta: Path,
                              muestra: int = 1500, semilla: int = 42) -> Path:
    """Diagrama de dispersión del predictor contra el precio, con la recta del modelo.

    Con decenas de miles de puntos el gráfico se vuelve una mancha: se dibuja una muestra
    aleatoria (reproducible por la semilla) y con transparencia.

    Parameters
    ----------
    datos : pd.DataFrame
        Datos limpios con el predictor y price_num.
    predictor : str
        Nombre de la columna del eje x.
    modelo : estimador entrenado
        Debe tener predict().
    ruta : Path
        Archivo PNG de salida.

    Returns
    -------
    Path
        La ruta donde se guardó la figura.
    """
    puntos = datos.sample(min(muestra, len(datos)), random_state=semilla)  # Muestra reproducible
    x_recta = pd.DataFrame({predictor: sorted(datos[predictor].unique())})  # Un punto por valor de x
    fig, ax = plt.subplots(figsize=(8, 5))  # Figura (lienzo) y Axes (área de dibujo)
    ax.scatter(puntos[predictor], puntos["price_num"], alpha=0.2, s=14, label="Anuncios (muestra)")
    ax.plot(x_recta[predictor], modelo.predict(x_recta), color="crimson", linewidth=2.5,
            label="Recta estimada")  # La recta: predicción para cada valor del predictor
    ax.set_title("Capacidad del alojamiento y precio nocturno")
    ax.set_xlabel("Huéspedes máximos (accommodates)")
    ax.set_ylabel("Precio por noche (ARS)")
    ax.ticklabel_format(axis="y", style="plain")  # Pesos completos, sin notación 1e5
    ax.grid(True, alpha=0.3)  # Cuadrícula discreta
    ax.legend()
    fig.tight_layout()  # Que no se recorten las etiquetas
    ruta.parent.mkdir(parents=True, exist_ok=True)  # Crea reports/figures si no existe
    fig.savefig(ruta, dpi=150)  # Exporta antes de cerrar
    plt.close(fig)  # Libera memoria
    return ruta


def graficar_real_vs_predicho(y_real, y_predicho, titulo: str, ruta: Path) -> Path:
    """Gráfico de diagnóstico: precio real (x) contra precio estimado (y).

    Si el modelo fuera perfecto, todos los puntos caerían sobre la diagonal punteada.

    Returns
    -------
    Path
        La ruta donde se guardó la figura.
    """
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.scatter(y_real, y_predicho, alpha=0.25, s=12)  # Un punto por anuncio de prueba
    limite = max(max(y_real), max(y_predicho))  # Hasta dónde llega la diagonal
    ax.plot([0, limite], [0, limite], linestyle="--", color="gray", label="Predicción perfecta")
    ax.set_title(titulo)
    ax.set_xlabel("Precio real (ARS)")
    ax.set_ylabel("Precio estimado (ARS)")
    ax.ticklabel_format(style="plain")
    ax.grid(True, alpha=0.3)
    ax.legend()
    fig.tight_layout()
    ruta.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(ruta, dpi=150)
    plt.close(fig)
    return ruta
