/* Flashcards de Python para Ciencia de Datos. Las usan python.html (sección Flashcards) y poris.html. */
window.MAZOS = window.MAZOS || {};
window.MAZOS["python"] = [
    {c:"2", p:"¿Qué exige PEP8 en indentación y nombres?", r:"4 espacios de indentación, snake_case para variables/funciones, CapWords para clases, imports agrupados al inicio."},
    {c:"2", p:"¿Qué partes tiene un docstring completo según PEP257?", r:"Primera línea descriptiva, luego Args (parámetros), Returns (qué devuelve) y Raises (qué excepciones puede lanzar). Se accede con __doc__ o help()."},
    {c:"2", p:"¿Para qué sirve raise ... from exc?", r:"Para relanzar una excepción nueva (más específica o de dominio) conservando la excepción original como causa, así no se pierde el traceback real."},
    {c:"2", p:"¿Qué diferencia try/except de try/except/else/finally?", r:"else corre sólo si NO hubo excepción; finally corre siempre, haya o no error (típico para cerrar recursos)."},
    {c:"2", p:"¿Por qué está mal except: pass?", r:"Porque oculta cualquier error, incluidos bugs reales, sin dejar rastro. Hay que capturar excepciones específicas y nunca silenciarlas."},

    {c:"2.1", p:"¿Cuáles son los 6 pasos del flujo recomendado para leer un archivo de datos?", r:"Comprobar ruta → abrir seguro → parsear formato → validar estructura → convertir tipos → reportar/elevar."},
    {c:"2.1", p:"Nombrá 3 antipatrones de manejo de errores marcados en la cátedra.", r:"Capturar todo con except Exception sin registrar; ignorar errores (except: pass); no validar columnas del CSV/JSON asumiendo estructura perfecta."},
    {c:"2.1", p:"¿Qué hace logging.exception() que print() no hace?", r:"Registra el traceback completo del error (dónde y por qué ocurrió) sin interrumpir la ejecución del programa."},

    {c:"2.2", p:"¿Cuándo uso NumPy y cuándo Pandas?", r:"NumPy para cálculo vectorizado con arreglos numéricos (ndarray). Pandas para datos tabulares con columnas de distinto tipo (DataFrame), con métodos como groupby y merge."},
    {c:"2.2", p:"¿Qué patrón siguen los modelos de scikit-learn?", r:"fit() entrena el modelo, predict() genera predicciones, score() evalúa qué tan bien predice."},

    {c:"3", p:"¿Qué diferencia loc de iloc?", r:"loc selecciona por etiqueta e incluye ambos extremos del rango (df.loc[0:2] trae 0,1,2). iloc selecciona por posición numérica y excluye el final (df.iloc[0:2] trae sólo 0,1)."},
    {c:"3", p:"¿Por qué usar & y | en vez de and/or en Pandas?", r:"and/or evalúan un solo valor booleano; & y | operan elemento por elemento sobre Series completas, que es lo que hace falta para filtrar filas."},
    {c:"3", p:"Una columna de precios da error al hacer .mean(). ¿Qué pasó probablemente?", r:"La columna quedó como tipo object (texto) por símbolos como $ o comas. Hay que limpiar con .str.replace() y convertir con pd.to_numeric(errors='coerce')."},
    {c:"3", p:"¿Qué hace una máscara booleana como arr[arr >= 18]?", r:"Devuelve sólo los elementos del arreglo que cumplen la condición — es indexación vectorizada, sin loops."},
    {c:"3", p:"np.where() vs np.select(): ¿cuándo uso cada uno?", r:"np.where(cond, si, no) es para UNA regla condicional. np.select([cond1, cond2, ...], [val1, val2, ...], default=...) es para VARIAS reglas evaluadas en orden."},

    {c:"4", p:"¿Cuál es la diferencia conceptual entre concat y merge?", r:"concat apila filas o columnas de tablas con la misma estructura, sin necesitar una clave común. merge relaciona dos tablas por una clave común, como un JOIN de SQL."},
    {c:"4", p:"¿Qué controla el parámetro how= en un merge?", r:"El tipo de unión: inner (sólo coincidencias), left/right (todo de un lado + coincidencias del otro), outer (todo de ambos lados, con NaN donde no hay match)."},
    {c:"4", p:"¿Para qué sirve indicator=True en un merge?", r:"Agrega una columna _merge que dice si cada fila vino de 'left_only', 'right_only' o 'both' — útil para detectar filas sin correspondencia."},
    {c:"4", p:"¿Qué hace pd.to_datetime(col, errors='coerce', dayfirst=True)?", r:"Convierte texto a fecha; dayfirst=True interpreta DD/MM/AAAA (formato argentino); errors='coerce' vuelve NaT lo que no se puede parsear en vez de fallar."},
    {c:"4", p:"¿Por qué hay que pasar index=False al exportar con to_csv?", r:"Si no, pandas escribe el índice numérico del DataFrame como una columna extra en el archivo, que normalmente no se quiere."},
    {c:"4", p:"¿Qué riesgo hay si no controlo la cardinalidad antes de un merge?", r:"Una relación N:M inesperada puede multiplicar filas (explosión de filas) sin que el error sea obvio; por eso se usa validate='many_to_one', etc."},

    {c:"5", p:"¿Qué tipo de gráfico corresponde a cada pregunta: tendencia, comparación, distribución, relación?", r:"Tendencia → líneas. Comparación → barras (empezando en cero). Distribución → histograma. Relación → dispersión (scatter, no prueba causalidad)."},
    {c:"5", p:"¿Qué diferencia hay entre Figure y Axes?", r:"Figure es el lienzo completo (puede tener varios gráficos). Axes es el área de dibujo individual dentro de esa figura, donde realmente se grafica."},
    {c:"5", p:"¿Para qué sirve np.polyfit(x, y, 1)?", r:"Calcula la pendiente y el intercepto de la recta que mejor ajusta los puntos (regresión lineal simple), para dibujar una línea de tendencia sobre un scatter."},
    {c:"5", p:"Nombrá 3 errores frecuentes en gráficos según la cátedra.", r:"Eje de barras que no empieza en cero (exagera diferencias); título genérico sin comunicar el hallazgo; miles de puntos superpuestos sin usar alpha (transparencia)."},

    {c:"6", p:"Si dos variables tienen correlación cercana a 0, ¿qué puedo concluir?", r:"Sólo que hay poca asociación LINEAL entre ellas — no significa que sean independientes, podría haber una relación no lineal."},
    {c:"6", p:"¿Qué muestra un boxplot?", r:"La mediana (línea central), el rango intercuartílico (la caja, Q1 a Q3), los bigotes, y los puntos fuera de los bigotes como posibles atípicos (outliers)."},
    {c:"6", p:"¿Cuándo conviene evitar sns.pairplot()?", r:"Cuando hay muchas columnas numéricas: se vuelve lento y difícil de leer. Conviene preseleccionar las variables relevantes con el parámetro vars=."},
    {c:"6", p:"¿Qué formato de exportación conviene para un informe académico impreso?", r:"PDF o SVG (vectoriales, no pierden calidad al hacer zoom o imprimir). PNG con dpi alto sirve para web/Office, pero no es ideal para impresión de calidad."},
    {c:"6", p:"¿Qué tres canales visuales puedo usar en un solo scatterplot de Seaborn para codificar más variables?", r:"hue (color), size (tamaño) y style (forma) — pero sin sobrecargar más de una variable por canal a la vez."}
  ];
