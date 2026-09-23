/* Datos del entrenador de Python para Ciencia de Datos.
   Banco de preguntas, modelos de parcial, chuleta y ejercicios de laboratorio.
   Se arman a partir de los PPT/DOCX de la catedra y de los 3 examenes simulados
   reales del profesor (variantes A, B y C).

   Todo esto alimenta la PRACTICA LIBRE: corrige en el navegador y no suma al
   leaderboard, igual que el modo practica del resto del sitio. Las respuestas
   del modo examen puntuado siguen viviendo en Supabase, fuera del HTML.
*/
const BANCO = [

/* ---------- CLASE 1 · Fundamentos y colecciones ---------- */
{
 id:"c1-01", clase:1, tema:"Colecciones", nivel:"baja",
 caso:"Tenés los datos de la cursada como una lista de diccionarios y necesitás pasarlos a una tabla para poder filtrar, agrupar y graficar.",
 codigo:"ventas = [\n    {'venta_id': 1, 'cliente_id': 101, 'mes': 'Marzo', 'importe': 85000},\n    {'venta_id': 2, 'cliente_id': 102, 'mes': 'Marzo', 'importe': 120000},\n]",
 pide:"¿Qué usás para construir la tabla?",
 ops:[
  "<code>pd.DataFrame(ventas)</code>",
  "<code>np.array(ventas)</code>",
  "<code>pd.Series(ventas)</code>",
  "<code>list(ventas)</code>"
 ],
 aprendido:"Una lista de diccionarios es exactamente el formato que <code>pd.DataFrame()</code> espera: cada diccionario es una fila y cada clave se convierte en columna. Es el primer paso de casi todos los prácticos: las consignas dan colecciones de Python y vos tenés que armar los DataFrames.",
 porque:{
  "<code>np.array(ventas)</code>":"NumPy trabaja con arreglos homogéneos de números. Con diccionarios te devuelve un array de objetos inútil para filtrar por columna.",
  "<code>pd.Series(ventas)</code>":"Una Series es <b>unidimensional</b>: te quedaría una sola columna donde cada celda es un diccionario entero.",
  "<code>list(ventas)</code>":"Ya es una lista; no la transforma en nada útil."
 }
},
{
 id:"c1-02", clase:1, tema:"Colecciones", nivel:"baja",
 caso:"La consigna pide un diccionario de parámetros que controle el programa: ID a buscar, DNI a consultar, importe mínimo y color del gráfico. Después hay que recorrerlo mostrando clave y valor.",
 pide:"¿Cómo recorrés el diccionario?",
 ops:[
  "<code>for clave, valor in parametros.items():</code>",
  "<code>for clave in parametros.keys(): print(clave)</code>",
  "<code>for i, v in enumerate(parametros):</code>",
  "<code>for valor in parametros.values():</code>"
 ],
 aprendido:"<code>.items()</code> devuelve pares (clave, valor), que es justo lo que pide la consigna de “recorrerlo, consultar sus claves y usar sus valores”. <code>.keys()</code> da solo las claves y <code>.values()</code> solo los valores.",
 porque:{
  "<code>for clave in parametros.keys(): print(clave)</code>":"Te da las claves pero perdés el valor, que es lo que después usás para controlar el filtro.",
  "<code>for i, v in enumerate(parametros):</code>":"Sobre un diccionario, <code>enumerate</code> numera las <b>claves</b>; el índice numérico no aporta nada acá.",
  "<code>for valor in parametros.values():</code>":"Tenés el valor pero no sabés a qué parámetro corresponde."
 }
},
{
 id:"c1-03", clase:1, tema:"Colecciones", nivel:"baja",
 caso:"De una lista de sedes repetidas querés quedarte con la lista de sedes distintas, sin repetir.",
 codigo:"sedes = ['Palermo', 'Belgrano', 'Palermo', 'Centro', 'Belgrano']",
 pide:"¿Qué estructura usás?",
 ops:[
  "<code>set(sedes)</code>",
  "<code>tuple(sedes)</code>",
  "<code>sorted(sedes)</code>",
  "<code>len(sedes)</code>"
 ],
 aprendido:"Un <code>set</code> es una colección sin elementos repetidos: convertir una lista a set es la forma más corta de sacar duplicados. En Pandas el equivalente sobre una columna es <code>df['sede'].unique()</code> o <code>nunique()</code>.",
 porque:{
  "<code>tuple(sedes)</code>":"Una tupla es inmutable pero conserva los repetidos.",
  "<code>sorted(sedes)</code>":"Ordena, no deduplica.",
  "<code>len(sedes)</code>":"Cuenta elementos, incluidos los repetidos."
 }
},
{
 id:"c1-04", clase:1, tema:"Fundamentos", nivel:"baja",
 caso:"Tenés que mostrar las actividades del diario numeradas: “1. estudiar Python”, “2. practicar CSV”…",
 pide:"¿Qué función te da índice y valor al mismo tiempo?",
 ops:[
  "<code>for i, act in enumerate(actividades, start=1):</code>",
  "<code>for act in actividades:</code>",
  "<code>for i in range(actividades):</code>",
  "<code>for i, act in zip(actividades):</code>"
 ],
 aprendido:"<code>enumerate()</code> recorre y numera a la vez, y <code>start=1</code> hace que la numeración empiece en 1 en lugar de 0. Evita el clásico contador manual y es más legible (criterio PEP 8).",
 porque:{
  "<code>for act in actividades:</code>":"Recorre pero no te da el número de orden.",
  "<code>for i in range(actividades):</code>":"<code>range()</code> necesita un entero, no una lista: tira <code>TypeError</code>.",
  "<code>for i, act in zip(actividades):</code>":"<code>zip()</code> combina <b>dos o más</b> secuencias; con una sola no genera pares."
 }
},
{
 id:"c1-05", clase:1, tema:"Fundamentos", nivel:"media",
 caso:"El programa pide una cantidad por teclado con <code>input()</code> y tiene que seguir funcionando si la persona escribe “dos” en vez de “2”.",
 codigo:"cantidad = int(input('¿Cuántos contactos? '))",
 pide:"¿Qué excepción tenés que capturar?",
 ops:[
  "<code>ValueError</code>",
  "<code>TypeError</code>",
  "<code>KeyError</code>",
  "<code>OSError</code>"
 ],
 aprendido:"<code>int()</code> sobre un texto que no representa un número lanza <code>ValueError</code>. Es el error típico de toda entrada por teclado; por eso los ejercicios piden envolver la conversión en <code>try/except ValueError</code> con un mensaje claro para la persona usuaria.",
 porque:{
  "<code>TypeError</code>":"Aparece cuando el <b>tipo</b> es incompatible (por ejemplo <code>int(None)</code>), no cuando el texto tiene mal contenido.",
  "<code>KeyError</code>":"Es de diccionarios: clave inexistente.",
  "<code>OSError</code>":"Es de sistema de archivos: rutas, permisos, disco."
 }
},

/* ---------- CLASE 2 · PEP 8, docstrings, comentarios ---------- */
{
 id:"c2-01", clase:2, tema:"PEP 8", nivel:"baja",
 caso:"Tenés que nombrar una función que calcula el promedio de una lista de notas y una clase que representa un error propio del dominio.",
 pide:"¿Qué convención de PEP 8 corresponde?",
 ops:[
  "Función en <code>snake_case</code> (<code>calcular_promedio</code>) y clase en <code>CapWords</code> (<code>DatosInvalidosError</code>)",
  "Ambas en <code>camelCase</code>: <code>calcularPromedio</code> y <code>datosInvalidosError</code>",
  "Función en <code>CapWords</code> y clase en <code>snake_case</code>",
  "Todo en MAYÚSCULAS porque son elementos públicos"
 ],
 aprendido:"PEP 8 fija: <b>funciones y variables en <code>snake_case</code></b>, <b>clases en <code>CapWords</code></b> y <b>constantes en MAYÚSCULAS</b>. Indentación de 4 espacios, imports agrupados al inicio del archivo y líneas cortas. No es decoración: es el idioma común para que otra persona lea el código sin adivinar.",
 porque:{
  "Ambas en <code>camelCase</code>: <code>calcularPromedio</code> y <code>datosInvalidosError</code>":"<code>camelCase</code> es convención de Java/JavaScript, no de Python.",
  "Función en <code>CapWords</code> y clase en <code>snake_case</code>":"Está exactamente al revés.",
  "Todo en MAYÚSCULAS porque son elementos públicos":"Las MAYÚSCULAS se reservan para constantes, como <code>STOCK_MINIMO = 3</code>."
 }
},
{
 id:"c2-02", clase:2, tema:"Docstrings", nivel:"baja",
 caso:"Tenés que documentar <code>cargar_datos(ruta)</code>: qué hace, qué parámetros espera, qué devuelve y qué excepción puede lanzar.",
 pide:"¿Dónde y cómo se escribe?",
 ops:[
  "Como <b>primera sentencia</b> de la función, con triple comilla doble <code>\"\"\"…\"\"\"</code>",
  "Con <code>#</code> arriba del <code>def</code>, como comentario de bloque",
  "En un archivo <code>README.md</code> aparte del código",
  "Como <code>print()</code> al inicio de la función"
 ],
 aprendido:"PEP 257: el docstring es un literal de texto que aparece <b>como primera sentencia</b> del módulo, clase, función o método, y se escribe con triple comilla doble. Python lo expone en <code>__doc__</code> y en <code>help()</code>. Documenta el contrato público: qué hace, qué espera (<code>Args</code>), qué devuelve (<code>Returns</code>) y qué puede fallar (<code>Raises</code>).",
 porque:{
  "Con <code>#</code> arriba del <code>def</code>, como comentario de bloque":"Es un comentario: no queda accesible desde <code>help()</code> ni <code>__doc__</code>.",
  "En un archivo <code>README.md</code> aparte del código":"Se desactualiza enseguida; el docstring vive <b>dentro</b> del código.",
  "Como <code>print()</code> al inicio de la función":"Ensucia la salida del programa cada vez que se llama."
 }
},
{
 id:"c2-03", clase:2, tema:"Comentarios", nivel:"media",
 caso:"En un filtro de importes te piden agregar un comentario efectivo.",
 codigo:"importes_validos = [i for i in importes if i >= 0]",
 pide:"¿Cuál es el comentario correcto según el criterio de la cursada?",
 ops:[
  "<code># Se descartan importes negativos porque representan anulaciones ya procesadas.</code>",
  "<code># Filtra la lista importes y guarda en importes_validos.</code>",
  "<code># comprensión de lista</code>",
  "<code># i >= 0</code>"
 ],
 aprendido:"Un comentario útil explica el <b>por qué</b>, no repite el <b>qué</b>. Registra decisiones no obvias y reglas de negocio. Si necesitás comentar cada línea, probablemente el código necesita mejores nombres o funciones más chicas.",
 porque:{
  "<code># Filtra la lista importes y guarda en importes_validos.</code>":"Repite literalmente lo que ya dice el código: es ruido que además se desactualiza.",
  "<code># comprensión de lista</code>":"Describe la sintaxis, no la decisión de negocio.",
  "<code># i >= 0</code>":"Copia la condición sin explicar qué significa un importe negativo."
 }
},

/* ---------- CLASE 2.1 / 2.2 · Excepciones y archivos ---------- */
{
 id:"c2-04", clase:2, tema:"Excepciones", nivel:"media",
 caso:"Leés un archivo de configuración JSON. Puede pasar que el archivo no exista, o que exista pero su contenido no sea JSON válido.",
 pide:"¿Qué excepciones capturás, en ese orden?",
 ops:[
  "<code>FileNotFoundError</code> y <code>json.JSONDecodeError</code>, cada una en su <code>except</code>",
  "Un solo <code>except Exception:</code> que atrape las dos",
  "<code>except:</code> vacío, porque cubre cualquier caso",
  "<code>ValueError</code> y <code>TypeError</code>"
 ],
 aprendido:"Capturar excepciones <b>específicas</b> es la regla central de la clase: cada error dice algo distinto y merece un mensaje distinto. <code>FileNotFoundError</code> = revisá la ruta. <code>json.JSONDecodeError</code> = el archivo existe pero está mal formado. Capturar todo junto oculta bugs reales.",
 codigo:"try:\n    texto = Path(ruta).read_text(encoding=\"utf-8\")\n    return json.loads(texto)\nexcept FileNotFoundError as exc:\n    raise FileNotFoundError(f\"No existe: {ruta}\") from exc\nexcept json.JSONDecodeError as exc:\n    raise ValueError(\"El archivo no contiene JSON válido\") from exc",
 porque:{
  "Un solo <code>except Exception:</code> que atrape las dos":"Funciona, pero perdés la distinción entre “no está el archivo” y “el archivo está corrupto”: el mensaje al usuario queda ambiguo.",
  "<code>except:</code> vacío, porque cubre cualquier caso":"Es el antipatrón número uno de la clase: atrapa hasta <code>KeyboardInterrupt</code> y esconde la causa.",
  "<code>ValueError</code> y <code>TypeError</code>":"<code>JSONDecodeError</code> <i>hereda</i> de <code>ValueError</code>, pero <code>FileNotFoundError</code> no tiene nada que ver con <code>TypeError</code>."
 }
},
{
 id:"c2-05", clase:2, tema:"Excepciones", nivel:"media",
 caso:"Capturás un <code>FileNotFoundError</code> técnico y querés relanzarlo con un mensaje claro, sin perder la causa original para poder depurar.",
 pide:"¿Qué sintaxis usás?",
 ops:[
  "<code>raise DataFileError(f\"No existe el archivo: {ruta}\") from exc</code>",
  "<code>raise DataFileError(f\"No existe el archivo: {ruta}\")</code>",
  "<code>print(f\"No existe el archivo: {ruta}\")</code>",
  "<code>pass</code>"
 ],
 aprendido:"<code>raise ... from exc</code> es el <b>encadenamiento de excepciones</b>: lanzás un error nuevo con un mensaje entendible, pero Python conserva el traceback del error original. Es la forma profesional de envolver un error técnico en una excepción de dominio sin perder información.",
 porque:{
  "<code>raise DataFileError(f\"No existe el archivo: {ruta}\")</code>":"Levanta el error nuevo pero <b>sin</b> <code>from exc</code> se pierde el encadenamiento explícito con la causa original.",
  "<code>print(f\"No existe el archivo: {ruta}\")</code>":"Imprime y sigue como si nada: el flujo continúa con datos incompletos.",
  "<code>pass</code>":"Silencia el error por completo. Antipatrón."
 }
},
{
 id:"c2-06", clase:2, tema:"Excepciones", nivel:"media",
 caso:"Querés que un archivo abierto se cierre sí o sí, haya o no error durante la lectura.",
 pide:"¿Cuál es la forma recomendada?",
 ops:[
  "<code>with open(ruta, encoding=\"utf-8\") as f:</code>",
  "<code>f = open(ruta)</code> y confiar en el recolector de basura",
  "<code>try: f = open(ruta)</code> … <code>except: pass</code>",
  "<code>f = open(ruta)</code> y <code>f.close()</code> solo al final del <code>try</code>"
 ],
 aprendido:"El <b>context manager</b> <code>with</code> cierra el archivo automáticamente aunque se lance una excepción dentro del bloque. Es la alternativa limpia a <code>finally: f.close()</code>. Siempre acompañado de <code>encoding=\"utf-8\"</code> para no depender del encoding por defecto del sistema.",
 porque:{
  "<code>f = open(ruta)</code> y confiar en el recolector de basura":"No es determinista: el archivo puede quedar bloqueado un tiempo indefinido.",
  "<code>try: f = open(ruta)</code> … <code>except: pass</code>":"No cierra nada y además silencia el error.",
  "<code>f = open(ruta)</code> y <code>f.close()</code> solo al final del <code>try</code>":"Si salta una excepción antes, el <code>close()</code> nunca se ejecuta. Habría que usar <code>finally</code>."
 }
},
{
 id:"c2-07", clase:2, tema:"Archivos · CSV", nivel:"media",
 caso:"Tenés que leer <code>clientes.csv</code> accediendo a las columnas <b>por su nombre</b> (<code>fila[\"email\"]</code>), usando solo la librería estándar.",
 pide:"¿Qué usás?",
 ops:[
  "<code>csv.DictReader(f)</code>, abriendo con <code>newline=\"\"</code>",
  "<code>csv.reader(f)</code> y acceder por posición",
  "<code>json.load(f)</code>",
  "<code>f.read().split(',')</code>"
 ],
 codigo:"import csv\n\nwith open(\"clientes.csv\", newline=\"\", encoding=\"utf-8\") as f:\n    for fila in csv.DictReader(f):\n        print(fila[\"email\"])",
 aprendido:"<code>csv.DictReader</code> devuelve cada fila como diccionario usando la primera línea como encabezado, así accedés por nombre de columna en vez de por índice. La documentación pide abrir el archivo con <code>newline=\"\"</code> para que el módulo maneje correctamente los saltos de línea dentro de campos entrecomillados.",
 porque:{
  "<code>csv.reader(f)</code> y acceder por posición":"Funciona, pero <code>fila[3]</code> se rompe silenciosamente si cambia el orden de las columnas.",
  "<code>json.load(f)</code>":"Es para JSON, no para texto tabular separado por comas.",
  "<code>f.read().split(',')</code>":"Se rompe con comas dentro de comillas, con saltos de línea y con encabezados."
 }
},
{
 id:"c2-08", clase:2, tema:"Archivos · JSON", nivel:"media",
 caso:"Tenés un archivo <code>config.json</code> ya abierto y querés convertir su contenido en un diccionario de Python.",
 pide:"¿Cuál de las cuatro funciones de <code>json</code> corresponde?",
 ops:[
  "<code>json.load(f)</code> — desde un objeto archivo",
  "<code>json.loads(f)</code> — desde una cadena de texto",
  "<code>json.dump(datos, f)</code> — escribe a un archivo",
  "<code>json.dumps(datos)</code> — devuelve una cadena"
 ],
 aprendido:"La <b>s</b> final significa <i>string</i>: <code>load</code>/<code>dump</code> trabajan con un <b>archivo</b>, <code>loads</code>/<code>dumps</code> con una <b>cadena</b>. Y <code>load*</code> lee (JSON → Python), <code>dump*</code> escribe (Python → JSON). Si ya hiciste <code>Path(ruta).read_text()</code> tenés un string, entonces te toca <code>json.loads()</code>.",
 porque:{
  "<code>json.loads(f)</code> — desde una cadena de texto":"Espera un <code>str</code>; si le pasás el objeto archivo tira <code>TypeError</code>.",
  "<code>json.dump(datos, f)</code> — escribe a un archivo":"Es la operación inversa: serializa Python a JSON.",
  "<code>json.dumps(datos)</code> — devuelve una cadena":"También escribe, no lee."
 }
},
{
 id:"c2-09", clase:2, tema:"Archivos · JSON", nivel:"media",
 caso:"Tenés que guardar un diccionario en <code>salida.json</code> de forma legible y sin que los acentos se escapen como <code>\\u00e1</code>.",
 pide:"¿Cómo lo escribís?",
 ops:[
  "<code>json.dump(config, f, indent=2, ensure_ascii=False)</code>",
  "<code>json.dump(config, f)</code>",
  "<code>f.write(str(config))</code>",
  "<code>json.dumps(config, f, indent=2)</code>"
 ],
 aprendido:"<code>indent=2</code> genera JSON indentado y legible; <code>ensure_ascii=False</code> conserva los caracteres acentuados tal cual (siempre que abras el archivo con <code>encoding=\"utf-8\"</code>). Sin esas opciones el JSON sale en una sola línea y con los acentos escapados.",
 porque:{
  "<code>json.dump(config, f)</code>":"Válido pero sale todo en una línea y con acentos escapados.",
  "<code>f.write(str(config))</code>":"Escribe la repr de Python (comillas simples, <code>True</code>, <code>None</code>): <b>no es JSON válido</b> y no se puede releer.",
  "<code>json.dumps(config, f, indent=2)</code>":"<code>dumps</code> devuelve una cadena y no recibe el archivo como segundo argumento."
 }
},
{
 id:"c2-10", clase:2, tema:"Archivos · TXT", nivel:"baja",
 caso:"Querés leer un <code>.txt</code> completo a una variable de texto, con la forma moderna que muestra la cursada en vez de trabajar con rutas como cadenas.",
 pide:"¿Qué usás?",
 ops:[
  "<code>Path(\"notas.txt\").read_text(encoding=\"utf-8\")</code>",
  "<code>open(\"notas.txt\").readlines()</code>",
  "<code>csv.reader(open(\"notas.txt\"))</code>",
  "<code>pd.read_csv(\"notas.txt\")</code>"
 ],
 aprendido:"<code>pathlib.Path</code> es la forma moderna y legible de manejar rutas. Ofrece <code>read_text()</code>, <code>write_text()</code>, <code>exists()</code>, <code>is_file()</code>, <code>mkdir()</code> y <code>stat()</code>, y maneja bien las diferencias entre sistemas operativos.",
 porque:{
  "<code>open(\"notas.txt\").readlines()</code>":"Devuelve una lista de líneas y además deja el archivo abierto (falta <code>with</code>).",
  "<code>csv.reader(open(\"notas.txt\"))</code>":"Un TXT es texto libre, no una tabla con delimitador.",
  "<code>pd.read_csv(\"notas.txt\")</code>":"Intenta imponerle una estructura tabular a texto libre."
 }
},
{
 id:"c2-11", clase:2, tema:"Excepciones", nivel:"alta",
 caso:"Antes de procesar un CSV querés verificar que el archivo traiga todas las columnas obligatorias y, si falta alguna, cortar el proceso con un mensaje que diga cuáles.",
 codigo:"columnas = {\"fecha\", \"producto\", \"region_ventas\", \"cantidad_ventas\"}\nlector = csv.DictReader(archivo)\nif not lector.fieldnames or not columnas.issubset(lector.fieldnames):\n    faltantes = columnas - set(lector.fieldnames or [])\n    raise ???(f\"Columnas faltantes: {faltantes}\")",
 pide:"¿Qué excepción levantás?",
 ops:[
  "<code>ValueError</code> — el contenido no cumple lo esperado",
  "<code>FileNotFoundError</code> — problema de ruta",
  "<code>KeyError</code> — se accedió a una clave inexistente",
  "<code>csv.Error</code> — error del parser"
 ],
 aprendido:"La clase separa los errores en capas: <b>lectura</b> (<code>FileNotFoundError</code>, <code>PermissionError</code>, <code>OSError</code>), <b>parseo</b> (<code>JSONDecodeError</code>, <code>csv.Error</code>, <code>UnicodeDecodeError</code>) y <b>validación</b> (<code>ValueError</code>, <code>KeyError</code>, <code>TypeError</code>). Una columna faltante es un problema de validación de estructura: <code>ValueError</code>.",
 porque:{
  "<code>FileNotFoundError</code> — problema de ruta":"El archivo se abrió sin problemas; el error es de contenido.",
  "<code>KeyError</code> — se accedió a una clave inexistente":"Se usa cuando realmente intentás acceder a la clave. Acá validás <b>antes</b>, justamente para no llegar a un <code>KeyError</code>.",
  "<code>csv.Error</code> — error del parser":"El CSV se parseó bien; lo que falla es el contrato de columnas."
 }
},
{
 id:"c2-12", clase:2, tema:"Excepciones", nivel:"alta",
 caso:"Querés diferenciar una falla técnica de una falla de negocio: “la edad no puede ser negativa” no es lo mismo que “el disco está lleno”.",
 pide:"¿Cómo lo resolvés?",
 ops:[
  "Definir una excepción propia: <code>class DatosInvalidosError(ValueError): ...</code>",
  "Usar <code>assert edad >= 0</code> y listo",
  "Devolver <code>None</code> y que el que llama se dé cuenta",
  "Heredar de <code>BaseException</code> para que sea prioritaria"
 ],
 aprendido:"Se crean excepciones propias cuando el error pertenece al dominio del problema, cuando querés distinguir fallas técnicas de fallas de negocio, o cuando distintas capas deben reaccionar distinto. La documentación de Python recomienda derivar de <code>Exception</code> o de una subclase como <code>ValueError</code>, <b>nunca</b> de <code>BaseException</code>.",
 porque:{
  "Usar <code>assert edad >= 0</code> y listo":"Los <code>assert</code> se desactivan al ejecutar con <code>-O</code>: no sirven como validación de datos de entrada.",
  "Devolver <code>None</code> y que el que llama se dé cuenta":"Deja pasar el error silenciosamente; el análisis sigue con datos parciales.",
  "Heredar de <code>BaseException</code> para que sea prioritaria":"<code>BaseException</code> incluye <code>KeyboardInterrupt</code> y <code>SystemExit</code>: heredar de ahí rompe el mecanismo de interrupción."
 }
},
{
 id:"c2-13", clase:2, tema:"Excepciones", nivel:"media",
 caso:"El archivo existe y tiene permisos, pero tiene caracteres raros y al leerlo revienta porque el encoding no coincide.",
 pide:"¿Qué excepción esperás y cómo lo prevenís?",
 ops:[
  "<code>UnicodeDecodeError</code>; se previene declarando <code>encoding=\"utf-8\"</code> al abrir",
  "<code>PermissionError</code>; se previene con <code>chmod</code>",
  "<code>csv.Error</code>; se previene con <code>newline=\"\"</code>",
  "<code>MemoryError</code>; se previene leyendo por chunks"
 ],
 aprendido:"No declarar el encoding es uno de los antipatrones de la clase: el programa queda atado al encoding por defecto del sistema y funciona en tu máquina pero falla en otra. Declarar siempre <code>encoding=\"utf-8\"</code> al abrir y capturar <code>UnicodeDecodeError</code> como error de <b>parseo</b>.",
 porque:{
  "<code>PermissionError</code>; se previene con <code>chmod</code>":"Es cuando no tenés permiso de lectura; acá el archivo se abre bien.",
  "<code>csv.Error</code>; se previene con <code>newline=\"\"</code>":"Es un error del parser CSV, no de decodificación de bytes.",
  "<code>MemoryError</code>; se previene leyendo por chunks":"Es por tamaño, no por caracteres."
 }
},
{
 id:"c2-14", clase:2, tema:"Excepciones", nivel:"media",
 caso:"En el bloque <code>try</code> querés que quede <b>solo</b> lo que puede fallar, y separar el camino exitoso.",
 pide:"¿Qué cláusula usás para el camino sin error?",
 ops:[
  "<code>else:</code> — se ejecuta solo si no hubo excepción",
  "<code>finally:</code> — se ejecuta siempre",
  "<code>except:</code> — se ejecuta si hubo error",
  "No existe tal cláusula: hay que poner todo dentro del <code>try</code>"
 ],
 aprendido:"El modelo completo es <code>try / except / else / finally</code>. <b><code>else</code></b> corre solo si no hubo excepción (el camino feliz), <b><code>finally</code></b> corre siempre (limpieza de recursos). Mantener el <code>try</code> chico y mover el resto al <code>else</code> evita capturar errores de cálculo que nada tienen que ver con la lectura.",
 porque:{
  "<code>finally:</code> — se ejecuta siempre":"Sirve para limpieza, pero corre igual si hubo error: no es el “camino exitoso”.",
  "<code>except:</code> — se ejecuta si hubo error":"Es justo el caso contrario.",
  "No existe tal cláusula: hay que poner todo dentro del <code>try</code>":"Sí existe, y además “mezclar lectura y análisis dentro del try” figura como antipatrón."
 }
},

/* ---------- CLASE 3 · NumPy ---------- */
{
 id:"c3-01", clase:3, tema:"NumPy", nivel:"baja",
 caso:"Tenés una lista de precios y querés aplicarles el IVA a todos de una sola vez, sin escribir un <code>for</code>.",
 codigo:"precios = [100, 200, 300]",
 pide:"¿Cómo lo hacés vectorizado?",
 ops:[
  "<code>precios = np.array(precios); precios * 1.21</code>",
  "<code>[p * 1.21 for p in precios]</code>",
  "<code>precios * 1.21</code> sobre la lista de Python",
  "<code>sum(precios) * 1.21</code>"
 ],
 aprendido:"<b>Vectorizar</b> es aplicar una operación a todos los elementos de una sola vez. Con un <code>ndarray</code> de NumPy, <code>precios * 1.21</code> se aplica elemento por elemento y el código se lee como una fórmula matemática. En datos hay que pensar en columnas y vectores completos, no elemento por elemento.",
 porque:{
  "<code>[p * 1.21 for p in precios]</code>":"Da el resultado correcto, pero sigue siendo un ciclo: más lento para volúmenes grandes y menos expresivo.",
  "<code>precios * 1.21</code> sobre la lista de Python":"Multiplicar una <b>lista</b> por un número la <i>repite</i>, y con un decimal directamente tira <code>TypeError</code>.",
  "<code>sum(precios) * 1.21</code>":"Devuelve un único número, no el precio de cada producto."
 }
},
{
 id:"c3-02", clase:3, tema:"NumPy", nivel:"baja",
 caso:"Antes de operar querés saber si tu arreglo es un vector o una matriz, cuántos elementos tiene por eje y de qué tipo son.",
 pide:"¿Qué propiedades consultás?",
 ops:[
  "<code>.ndim</code>, <code>.shape</code>, <code>.size</code> y <code>.dtype</code>",
  "<code>.head()</code>, <code>.info()</code> y <code>.describe()</code>",
  "<code>len()</code> y <code>type()</code>",
  "<code>.columns</code> y <code>.index</code>"
 ],
 aprendido:"Las cuatro preguntas básicas de un <code>ndarray</code>: <b><code>ndim</code></b> (cantidad de ejes), <b><code>shape</code></b> (elementos por eje, ej. <code>(2, 3)</code>), <b><code>size</code></b> (total de elementos) y <b><code>dtype</code></b> (tipo: <code>int64</code>, <code>float64</code>, <code>bool</code>). Si entendés estas cuatro, entendés por qué un cálculo funciona o por qué salta un error de forma.",
 porque:{
  "<code>.head()</code>, <code>.info()</code> y <code>.describe()</code>":"Son métodos de <b>Pandas</b> (DataFrame/Series), no de arreglos NumPy.",
  "<code>len()</code> y <code>type()</code>":"<code>len()</code> te da solo la primera dimensión y <code>type()</code> te dice <code>ndarray</code>, sin detalle.",
  "<code>.columns</code> y <code>.index</code>":"Son atributos de DataFrame; un arreglo NumPy no tiene etiquetas."
 }
},
{
 id:"c3-03", clase:3, tema:"NumPy", nivel:"media",
 caso:"De un arreglo de edades querés quedarte solo con las personas mayores de edad.",
 codigo:"edades = np.array([17, 22, 19, 15])",
 pide:"¿Qué técnica aplicás?",
 ops:[
  "Máscara booleana: <code>edades[edades >= 18]</code>",
  "Slicing: <code>edades[1:3]</code>",
  "Indexación: <code>edades[0]</code>",
  "<code>edades.sort()</code> y tomar la mitad de arriba"
 ],
 aprendido:"Una comparación sobre un arreglo devuelve otro arreglo de <code>True/False</code> (<code>[False, True, True, False]</code>). Ese arreglo booleano se usa como filtro entre corchetes. Es el mismo mecanismo que en Pandas con <code>df[df['nota'] >= 6]</code>.",
 porque:{
  "Slicing: <code>edades[1:3]</code>":"Toma un rango de <b>posiciones</b>, no filtra por condición: si cambia el orden de los datos, filtra otra cosa.",
  "Indexación: <code>edades[0]</code>":"Devuelve un único elemento.",
  "<code>edades.sort()</code> y tomar la mitad de arriba":"Ordena pero no aplica el umbral de 18; además altera el arreglo original."
 }
},
{
 id:"c3-04", clase:3, tema:"NumPy", nivel:"media",
 caso:"Consigna del práctico: “Usar NumPy para aplicar 10% de descuento cuando la cantidad sea 5 o más, y 0% en el resto”.",
 pide:"¿Qué función usás?",
 ops:[
  "<code>np.where(df['cantidad'] >= 5, 0.10, 0.00)</code>",
  "<code>np.select(df['cantidad'] >= 5, 0.10)</code>",
  "<code>df['cantidad'].apply(lambda x: 0.10 if x >= 5 else 0)</code>",
  "<code>np.maximum(df['cantidad'], 5)</code>"
 ],
 aprendido:"<b><code>np.where(condición, valor_si_true, valor_si_false)</code></b> es el <code>if/else</code> vectorizado: una sola condición y dos salidas. Aparece en casi todos los ejercicios del bloque 2: descuentos, “Aprobado/Desaprobado”, “Alto/Moderado”, “Sí/No”.",
 porque:{
  "<code>np.select(df['cantidad'] >= 5, 0.10)</code>":"<code>np.select</code> existe, pero recibe <b>listas</b> de condiciones y de opciones: <code>np.select([cond1, cond2], [op1, op2], default=…)</code>. Se usa cuando hay <b>tres o más</b> categorías.",
  "<code>df['cantidad'].apply(lambda x: 0.10 if x >= 5 else 0)</code>":"Da el resultado correcto pero recorre fila por fila: es lo opuesto a vectorizar, y la consigna pide NumPy.",
  "<code>np.maximum(df['cantidad'], 5)</code>":"Devuelve el mayor entre cada valor y 5: no clasifica ni asigna tasas."
 }
},
{
 id:"c3-05", clase:3, tema:"NumPy", nivel:"media",
 caso:"Consigna: clasificar cada entrega como <b>Rápida</b> (≤25 min), <b>Normal</b> (≤40 min) o <b>Demorada</b> (el resto).",
 pide:"¿Qué función de NumPy corresponde?",
 ops:[
  "<code>np.select([m <= 25, m <= 40], ['Rápida', 'Normal'], default='Demorada')</code>",
  "<code>np.where(m <= 25, 'Rápida', 'Normal')</code>",
  "<code>np.clip(m, 25, 40)</code>",
  "<code>np.percentile(m, [25, 40])</code>"
 ],
 aprendido:"Cuando hay <b>más de dos</b> categorías, <code>np.where</code> se queda corto y va <b><code>np.select</code></b>: recibe una lista de condiciones, una lista de resultados en el mismo orden, y un <code>default</code> para lo que no entra en ninguna. Las condiciones se evalúan <b>en orden</b>, así que la primera que se cumple gana.",
 porque:{
  "<code>np.where(m <= 25, 'Rápida', 'Normal')</code>":"Solo maneja dos salidas: perdés la categoría “Demorada”.",
  "<code>np.clip(m, 25, 40)</code>":"Recorta valores a un rango numérico; no etiqueta categorías.",
  "<code>np.percentile(m, [25, 40])</code>":"Calcula percentiles de la distribución, que es otra pregunta."
 }
},
{
 id:"c3-06", clase:3, tema:"NumPy", nivel:"media",
 caso:"Consigna: “Calcular el percentil 75 de los tiempos de entrega”.",
 pide:"¿Qué usás?",
 ops:[
  "<code>np.percentile(reporte['minutos'], 75)</code>",
  "<code>np.median(reporte['minutos'])</code>",
  "<code>np.std(reporte['minutos'])</code>",
  "<code>reporte['minutos'].quantile()</code> sin argumentos"
 ],
 aprendido:"Para estadística descriptiva con NumPy: <b>tendencia central</b> con <code>np.mean()</code> y <code>np.median()</code>; <b>dispersión</b> con <code>np.std()</code>, <code>np.var()</code> y <code>np.percentile()</code>. El percentil 75 es el valor por debajo del cual queda el 75% de las observaciones.",
 porque:{
  "<code>np.median(reporte['minutos'])</code>":"La mediana es el percentil 50, no el 75.",
  "<code>np.std(reporte['minutos'])</code>":"Mide dispersión, no un corte de la distribución.",
  "<code>reporte['minutos'].quantile()</code> sin argumentos":"En Pandas existe <code>.quantile(0.75)</code>, pero sin argumento devuelve la mediana por defecto."
 }
},
{
 id:"c3-07", clase:3, tema:"NumPy", nivel:"alta",
 caso:"Consigna de reposición: calcular cuántas unidades faltan para cubrir 4 semanas, sin que dé negativo, y redondeando siempre hacia arriba.",
 pide:"¿Qué combinación usás?",
 ops:[
  "<code>np.ceil(np.maximum(4 * venta_semanal - stock, 0))</code>",
  "<code>round(4 * venta_semanal - stock)</code>",
  "<code>np.floor(4 * venta_semanal - stock)</code>",
  "<code>abs(4 * venta_semanal - stock)</code>"
 ],
 aprendido:"<b><code>np.maximum(x, 0)</code></b> pisa los negativos con cero (si sobra stock, no hay que reponer nada). <b><code>np.ceil()</code></b> redondea hacia arriba, porque no se pueden pedir 3,2 unidades: hay que pedir 4. Son dos operaciones vectorizadas encadenadas.",
 porque:{
  "<code>round(4 * venta_semanal - stock)</code>":"Redondea al más cercano: 3,2 quedaría en 3 y te faltaría stock. Además no corrige negativos.",
  "<code>np.floor(4 * venta_semanal - stock)</code>":"Redondea hacia <b>abajo</b>: siempre te queda corto.",
  "<code>abs(4 * venta_semanal - stock)</code>":"Convierte el sobrante en un pedido positivo: pedirías mercadería que te sobra."
 }
},
{
 id:"c3-08", clase:3, tema:"NumPy", nivel:"media",
 caso:"Un arreglo de temperaturas tiene un <code>np.nan</code> y querés calcular el promedio solo con los valores válidos.",
 codigo:"temperaturas = np.array([30, 31, 29, np.nan, 80])",
 pide:"¿Cómo los filtrás?",
 ops:[
  "<code>limpias = temperaturas[~np.isnan(temperaturas)]</code>",
  "<code>limpias = temperaturas[temperaturas != np.nan]</code>",
  "<code>limpias = temperaturas.dropna()</code>",
  "<code>limpias = temperaturas.fillna(0)</code>"
 ],
 aprendido:"<code>np.nan</code> <b>no es igual a sí mismo</b>: hay que detectarlo con <code>np.isnan()</code>, nunca con <code>==</code>. El <code>~</code> es la negación de la máscara booleana, así que <code>~np.isnan(x)</code> significa “los que <b>no</b> son nulos”.",
 porque:{
  "<code>limpias = temperaturas[temperaturas != np.nan]</code>":"<code>nan != nan</code> da <code>True</code> siempre: no filtra nada. Es el error clásico.",
  "<code>limpias = temperaturas.dropna()</code>":"<code>dropna()</code> es de Pandas, no de arreglos NumPy.",
  "<code>limpias = temperaturas.fillna(0)</code>":"También es de Pandas, y además imputar con 0 distorsiona el promedio."
 }
},

/* ---------- CLASE 3 · Pandas base ---------- */
{
 id:"c3-09", clase:3, tema:"Pandas", nivel:"baja",
 caso:"Acabás de cargar un DataFrame y todavía no calculaste nada. Querés ver las primeras filas, saber qué tipo tiene cada columna, cuántos nulos hay y un resumen estadístico.",
 pide:"¿Qué tres métodos usás, en ese orden?",
 ops:[
  "<code>df.head()</code>, <code>df.info()</code> y <code>df.describe()</code>",
  "<code>df.sum()</code>, <code>df.mean()</code> y <code>df.count()</code>",
  "<code>df.merge()</code>, <code>df.groupby()</code> y <code>df.plot()</code>",
  "<code>print(df)</code> tres veces"
 ],
 aprendido:"Regla de oro de la clase: <b>inspeccionar antes de calcular</b>. <code>head()</code> muestra un vistazo, <code>info()</code> resume columnas, tipos y no-nulos, y <code>describe()</code> da el resumen estadístico de las columnas numéricas. Si una columna numérica aparece como <code>object</code>, casi seguro tiene símbolos, comas o texto mal escrito.",
 porque:{
  "<code>df.sum()</code>, <code>df.mean()</code> y <code>df.count()</code>":"Ya son cálculos: si el tipo está mal, el resultado sale mal y no te enterás.",
  "<code>df.merge()</code>, <code>df.groupby()</code> y <code>df.plot()</code>":"Son transformaciones y visualización, que van después del diagnóstico.",
  "<code>print(df)</code> tres veces":"No te informa tipos, nulos ni estadísticos."
 }
},
{
 id:"c3-10", clase:3, tema:"Pandas", nivel:"baja",
 caso:"Querés seleccionar de un DataFrame las columnas <code>nombre</code> y <code>promedio</code>, y que el resultado siga siendo un DataFrame (no una Series).",
 pide:"¿Cómo lo escribís?",
 ops:[
  "<code>df[['nombre', 'promedio']]</code> — lista de nombres",
  "<code>df['nombre', 'promedio']</code>",
  "<code>df['nombre']['promedio']</code>",
  "<code>df.nombre.promedio</code>"
 ],
 aprendido:"La regla de los corchetes: <b>un corchete con un nombre → Series</b> (<code>df['edad']</code>), <b>corchete con una lista de nombres → DataFrame</b> (<code>df[['nombre','edad']]</code>). Es la confusión más frecuente al armar reportes con varias columnas.",
 porque:{
  "<code>df['nombre', 'promedio']</code>":"Pandas interpreta la tupla como una sola clave: <code>KeyError</code>.",
  "<code>df['nombre']['promedio']</code>":"Selecciona la Series <code>nombre</code> y después busca la etiqueta <code>'promedio'</code> <b>dentro</b> de ella.",
  "<code>df.nombre.promedio</code>":"El acceso por punto sirve para una columna sola y se rompe si el nombre tiene espacios."
 }
},
{
 id:"c3-11", clase:3, tema:"Pandas", nivel:"media",
 caso:"Consigna: “Calcular la facturación total por sede”. Ya tenés la columna <code>importe</code> calculada.",
 pide:"¿Qué operación usás?",
 ops:[
  "<code>df.groupby('sede', as_index=False)['importe'].sum()</code>",
  "<code>df['importe'].sum()</code>",
  "<code>df.sort_values('sede')['importe'].sum()</code>",
  "<code>pd.pivot_table(df, values='importe')</code>"
 ],
 aprendido:"<b><code>groupby</code> resume</b>: agrupa filas por categoría y aplica una métrica (<code>sum()</code>, <code>mean()</code>, <code>size()</code>, <code>count()</code>). <code>as_index=False</code> deja la clave de agrupación como columna normal en vez de convertirla en índice, cosa que facilita después graficar o cruzar.",
 porque:{
  "<code>df['importe'].sum()</code>":"Te da el total general, no el total <b>por sede</b>.",
  "<code>df.sort_values('sede')['importe'].sum()</code>":"Ordenar no agrupa: sigue sumando todo junto.",
  "<code>pd.pivot_table(df, values='importe')</code>":"Sin <code>index</code> no agrupa por sede; <code>pivot_table</code> sirve para <b>comparar</b> cruzando dos dimensiones."
 }
},
{
 id:"c3-12", clase:3, tema:"Pandas", nivel:"media",
 caso:"Querés una tabla que muestre la facturación con las <b>regiones en las filas</b> y los <b>productos en las columnas</b> para comparar de un vistazo.",
 pide:"¿Qué usás?",
 ops:[
  "<code>pd.pivot_table(df, values='total', index='region', columns='producto', aggfunc='sum')</code>",
  "<code>df.groupby(['region', 'producto'])['total'].sum()</code>",
  "<code>pd.concat([regiones, productos], axis=1)</code>",
  "<code>df.merge(productos, on='producto')</code>"
 ],
 aprendido:"La tríada de la clase: <b><code>groupby</code> resume</b>, <b><code>pivot_table</code> compara</b> (reorganiza categorías en filas y columnas) y <b><code>merge</code> integra</b> (une fuentes por clave). Cuando la pregunta es “comparar A contra B en una grilla”, es <code>pivot_table</code>.",
 porque:{
  "<code>df.groupby(['region', 'producto'])['total'].sum()</code>":"Da los mismos números pero en formato largo (una fila por combinación), no en grilla.",
  "<code>pd.concat([regiones, productos], axis=1)</code>":"Apila datasets; no calcula agregados.",
  "<code>df.merge(productos, on='producto')</code>":"Agrega columnas por clave; no reorganiza en filas × columnas."
 }
},

/* ---------- CLASE 4 · Indexación, selección, filtrado ---------- */
{
 id:"c4-01", clase:4, tema:"Indexación", nivel:"baja",
 caso:"Usaste <code>id_venta</code> como índice del DataFrame. Ahora querés la fila cuyo <code>id_venta</code> es 101 y, por otro lado, la primera fila de la tabla sea cual sea su etiqueta.",
 pide:"¿Qué accesores usás?",
 ops:[
  "<code>.loc[101]</code> para la etiqueta y <code>.iloc[0]</code> para la posición",
  "<code>.iloc[101]</code> para la etiqueta y <code>.loc[0]</code> para la posición",
  "<code>.loc</code> para las dos cosas",
  "<code>df[101]</code> y <code>df[0]</code>"
 ],
 aprendido:"<b><code>loc</code> responde “¿qué etiqueta?”</b> y <b><code>iloc</code> responde “¿qué posición?”</b>. Otra diferencia clave: con etiquetas, <code>loc[0:2]</code> <b>incluye</b> ambos extremos; con posiciones, <code>iloc[0:2]</code> <b>excluye</b> el 2, como el slicing de Python.",
 porque:{
  "<code>.iloc[101]</code> para la etiqueta y <code>.loc[0]</code> para la posición":"Está invertido: <code>iloc[101]</code> buscaría la fila número 101 y saltaría <code>IndexError</code>.",
  "<code>.loc</code> para las dos cosas":"Si el índice es <code>id_venta</code>, <code>loc[0]</code> busca la <i>etiqueta</i> 0, que puede no existir.",
  "<code>df[101]</code> y <code>df[0]</code>":"Los corchetes directos sobre un DataFrame buscan <b>columnas</b>, no filas."
 }
},
{
 id:"c4-02", clase:4, tema:"Filtrado", nivel:"media",
 caso:"Querés las ventas con importe ≥ 800 <b>y</b> producto A o B.",
 pide:"¿Cuál es la sintaxis correcta en Pandas?",
 ops:[
  "<code>df[(df['importe'] >= 800) &amp; df['producto'].isin(['A','B'])]</code>",
  "<code>df[df['importe'] >= 800 and df['producto'] in ['A','B']]</code>",
  "<code>df[df['importe'] >= 800 &amp; df['producto'].isin(['A','B'])]</code>",
  "<code>df[(df['importe'] >= 800) or (df['producto'] == 'A')]</code>"
 ],
 aprendido:"Dos reglas que se toman siempre: <b>en Pandas se usa <code>&amp;</code> para “y”, <code>|</code> para “o” y <code>~</code> para negar</b> (no <code>and</code>/<code>or</code>/<code>not</code>), y <b>cada condición va entre paréntesis</b> porque <code>&amp;</code> tiene más precedencia que <code>&gt;=</code>. Para pertenencia a una lista, <code>isin()</code>; para rangos, <code>between()</code>; para texto, <code>str.contains()</code>.",
 porque:{
  "<code>df[df['importe'] >= 800 and df['producto'] in ['A','B']]</code>":"<code>and</code> e <code>in</code> esperan un único <code>True/False</code>: con una Series tiran <i>“The truth value of a Series is ambiguous”</i>.",
  "<code>df[df['importe'] >= 800 &amp; df['producto'].isin(['A','B'])]</code>":"Sin paréntesis, Python evalúa primero <code>800 &amp; df[...]</code> y el resultado es incorrecto o directamente error.",
  "<code>df[(df['importe'] >= 800) or (df['producto'] == 'A')]</code>":"Además de usar <code>or</code>, cambia la lógica: pide una cosa <b>o</b> la otra."
 }
},
{
 id:"c4-03", clase:4, tema:"Filtrado", nivel:"media",
 caso:"Querés las filas donde el producto contenga la letra “B”, sabiendo que algunas filas tienen el producto en nulo.",
 pide:"¿Cómo lo escribís sin que explote?",
 ops:[
  "<code>df[df['producto'].str.contains('B', na=False)]</code>",
  "<code>df[df['producto'].str.contains('B')]</code>",
  "<code>df[df['producto'] == 'B']</code>",
  "<code>df[df['producto'].isin(['B'])]</code>"
 ],
 aprendido:"<code>str.contains()</code> busca subcadenas dentro de una columna de texto. Con nulos devuelve <code>NaN</code>, que rompe el filtro booleano: por eso <b><code>na=False</code></b> los trata como “no cumple”. También existe <code>case=False</code> para ignorar mayúsculas.",
 porque:{
  "<code>df[df['producto'].str.contains('B')]</code>":"Con nulos en la columna lanza <i>“Cannot mask with non-boolean array containing NA”</i>.",
  "<code>df[df['producto'] == 'B']</code>":"Busca coincidencia <b>exacta</b>: no encuentra “Bota” ni “B-12”.",
  "<code>df[df['producto'].isin(['B'])]</code>":"También es coincidencia exacta, solo que contra una lista."
 }
},
{
 id:"c4-04", clase:4, tema:"Integración", nivel:"media",
 caso:"Tenés las ventas de enero en un DataFrame y las de febrero en otro, con <b>las mismas columnas</b>. Querés una sola tabla con todos los registros.",
 pide:"¿<code>concat</code> o <code>merge</code>?",
 ops:[
  "<code>pd.concat([enero, febrero], axis=0, ignore_index=True)</code>",
  "<code>enero.merge(febrero, on='venta', how='outer')</code>",
  "<code>pd.concat([enero, febrero], axis=1)</code>",
  "<code>enero.join(febrero)</code>"
 ],
 aprendido:"<b>Misma estructura → <code>concat</code>. Entidades relacionadas → <code>merge</code>.</b> <code>concat</code> apila sin interpretar claves de negocio: <code>axis=0</code> agrega filas (como <code>UNION ALL</code>) y <code>ignore_index=True</code> reconstruye un índice continuo 0,1,2… <code>axis=1</code> pega al costado alineando por índice.",
 porque:{
  "<code>enero.merge(febrero, on='venta', how='outer')</code>":"<code>merge</code> busca coincidencias por clave: acá no querés relacionar registros, querés apilarlos.",
  "<code>pd.concat([enero, febrero], axis=1)</code>":"<code>axis=1</code> los pone lado a lado alineando por índice: si los índices no representan la misma entidad, genera asociaciones incorrectas.",
  "<code>enero.join(febrero)</code>":"<code>join</code> une por índice, no apila filas."
 }
},
{
 id:"c4-05", clase:4, tema:"Integración", nivel:"media",
 caso:"Querés enriquecer la tabla de ventas con la ciudad de cada cliente, <b>conservando todas las ventas</b> aunque algún cliente no esté en el padrón.",
 pide:"¿Qué tipo de unión usás?",
 ops:[
  "<code>ventas.merge(clientes, on='cliente_id', how='left')</code>",
  "<code>ventas.merge(clientes, on='cliente_id', how='inner')</code>",
  "<code>ventas.merge(clientes, on='cliente_id', how='right')</code>",
  "<code>pd.concat([ventas, clientes], axis=1)</code>"
 ],
 aprendido:"Los cuatro <code>how</code>: <b><code>inner</code></b> conserva solo las coincidencias, <b><code>left</code></b> mantiene todas las filas de la izquierda, <b><code>right</code></b> hace lo inverso y <b><code>outer</code></b> conserva todas las claves de ambos lados. “Conservar todas las ventas” = <code>left</code>, con la tabla de ventas a la izquierda.",
 porque:{
  "<code>ventas.merge(clientes, on='cliente_id', how='inner')</code>":"Descarta las ventas de clientes que no estén en el padrón: perdés facturación sin darte cuenta.",
  "<code>ventas.merge(clientes, on='cliente_id', how='right')</code>":"Conserva todos los <b>clientes</b>, incluso los que no compraron, y pierde ventas huérfanas.",
  "<code>pd.concat([ventas, clientes], axis=1)</code>":"Alinea por índice, no por <code>cliente_id</code>: cruza filas que no tienen nada que ver."
 }
},
{
 id:"c4-06", clase:4, tema:"Integración", nivel:"alta",
 caso:"Consigna del práctico: “Usar left merge con indicador para identificar los <code>producto_id</code> de movimientos que no existen en el catálogo”.",
 pide:"¿Qué parámetro agregás y cómo lo leés?",
 ops:[
  "<code>indicator=True</code>, y después filtrar por <code>df['_merge'] == 'left_only'</code>",
  "<code>validate='one_to_one'</code>, y revisar si lanza error",
  "<code>how='inner'</code>, que ya descarta lo que no cruza",
  "<code>on=None</code>, para que una por todas las columnas"
 ],
 aprendido:"<code>indicator=True</code> agrega una columna <code>_merge</code> con tres valores posibles: <code>both</code> (cruzó), <code>left_only</code> (está solo en la izquierda) y <code>right_only</code>. Es la forma de <b>auditar</b> un merge: <code>df['_merge'].value_counts()</code> te dice cuántas claves quedaron huérfanas antes de propagar el error al reporte.",
 porque:{
  "<code>validate='one_to_one'</code>, y revisar si lanza error":"<code>validate</code> verifica la <b>cardinalidad</b> (1:1, 1:N, N:M) y aborta si no se cumple, pero no te lista qué IDs no cruzaron.",
  "<code>how='inner'</code>, que ya descarta lo que no cruza":"Los descarta en silencio: es exactamente lo que la consigna quiere evitar.",
  "<code>on=None</code>, para que una por todas las columnas":"Une por todas las columnas comunes, lo que normalmente rompe el cruce."
 }
},
{
 id:"c4-07", clase:4, tema:"Integración", nivel:"alta",
 caso:"Antes de unir ventas con clientes querés asegurarte de que la relación sea “muchas ventas para un cliente” y que el proceso corte si aparece un cliente duplicado.",
 pide:"¿Qué parámetro usás?",
 ops:[
  "<code>validate=\"many_to_one\"</code>",
  "<code>indicator=True</code>",
  "<code>how=\"many_to_one\"</code>",
  "<code>df.drop_duplicates()</code> antes del merge y nada más"
 ],
 aprendido:"El cardinal importa: 1:1, 1:N o N:M. <b><code>validate</code></b> declara la relación esperada y hace fallar el merge si no se cumple, antes de que un N:M inesperado te multiplique las filas (“explosión de filas”). Frase de la clase: <i>si no conocés la cardinalidad, todavía no estás listo para unir</i>.",
 porque:{
  "<code>indicator=True</code>":"Te dice qué filas cruzaron y cuáles no, pero no valida la cardinalidad.",
  "<code>how=\"many_to_one\"</code>":"<code>how</code> solo acepta <code>inner</code>, <code>left</code>, <code>right</code>, <code>outer</code> y <code>cross</code>.",
  "<code>df.drop_duplicates()</code> antes del merge y nada más":"Borra evidencia sin avisar: puede que esos duplicados sean un problema real de la fuente."
 }
},

/* ---------- CLASE 4 · Limpieza ---------- */
{
 id:"c4-08", clase:4, tema:"Limpieza", nivel:"media",
 caso:"La columna <code>precio</code> viene como texto con valores como <code>'250000'</code>, <code>'error'</code> y <code>None</code>. Querés convertirla a número sin que el programa explote.",
 pide:"¿Cómo la convertís?",
 ops:[
  "<code>pd.to_numeric(df['precio'], errors='coerce')</code>",
  "<code>df['precio'].astype(float)</code>",
  "<code>int(df['precio'])</code>",
  "<code>df['precio'].apply(float)</code>"
 ],
 aprendido:"<b><code>errors='coerce'</code></b> convierte lo que no se puede parsear en <code>NaN</code> en lugar de lanzar una excepción. Eso te deja el problema <b>visible y localizable</b>: después de convertir, siempre inspeccionar los nulos nuevos, porque suelen revelar errores de formato. Lo mismo aplica a <code>pd.to_datetime(..., errors='coerce')</code>.",
 porque:{
  "<code>df['precio'].astype(float)</code>":"Con <code>'error'</code> en la columna lanza <code>ValueError</code> y corta el proceso.",
  "<code>int(df['precio'])</code>":"<code>int()</code> no funciona sobre una Series completa.",
  "<code>df['precio'].apply(float)</code>":"Recorre fila por fila y explota igual en el primer valor inválido."
 }
},
{
 id:"c4-09", clase:4, tema:"Limpieza", nivel:"media",
 caso:"Después de convertir a numérico te quedaron nulos en <code>importe</code>. La consigna pide completarlos con un valor robusto frente a valores extremos.",
 pide:"¿Con qué los imputás?",
 ops:[
  "<code>df['importe'].fillna(df['importe'].median())</code>",
  "<code>df['importe'].fillna(df['importe'].mean())</code>",
  "<code>df['importe'].fillna(0)</code>",
  "<code>df['importe'].dropna()</code>"
 ],
 aprendido:"<b>Mediana</b>: robusta ante valores extremos, la elección por defecto para numéricos. <b>Moda</b>: útil en categorías. <b><code>ffill</code></b>: útil en series ordenadas cuando el último valor sigue vigente. Para categóricas, crear una categoría explícita (<code>fillna('Sin informar')</code>). Y si la ausencia aporta información, agregar una bandera: <code>df['importe_faltante'] = df['importe'].isna()</code>.",
 porque:{
  "<code>df['importe'].fillna(df['importe'].mean())</code>":"El promedio se corre con un solo outlier; por eso la consigna pide mediana.",
  "<code>df['importe'].fillna(0)</code>":"Un cero es un importe real: te baja artificialmente todos los totales y promedios.",
  "<code>df['importe'].dropna()</code>":"Elimina filas en lugar de completarlas. Es válido si la ausencia es chica y no sistemática, pero no es lo que pide la consigna."
 }
},
{
 id:"c4-10", clase:4, tema:"Limpieza", nivel:"media",
 caso:"El padrón de estudiantes tiene el mismo <code>estudiante_id</code> repetido. Querés quedarte con una sola fila por ID, conservando la primera aparición.",
 pide:"¿Cómo lo hacés?",
 ops:[
  "<code>df.drop_duplicates(subset='estudiante_id', keep='first')</code>",
  "<code>df.drop_duplicates()</code>",
  "<code>df.dropna(subset=['estudiante_id'])</code>",
  "<code>df.groupby('estudiante_id').first()</code> sin más"
 ],
 aprendido:"<b><code>subset</code></b> define qué significa “la misma fila”: sin él, <code>drop_duplicates()</code> exige que <b>todas</b> las columnas coincidan (duplicado completo), y un duplicado <i>semántico</i> comparte la clave aunque cambien otros campos. <b><code>keep</code></b> elige cuál conservar: <code>'first'</code>, <code>'last'</code> (útil si el registro más reciente corrige al anterior, ordenando antes por fecha) o <code>False</code> para marcarlos todos e inspeccionarlos.",
 porque:{
  "<code>df.drop_duplicates()</code>":"Solo borra filas idénticas en todas las columnas: si cambia la carrera, el ID duplicado sobrevive.",
  "<code>df.dropna(subset=['estudiante_id'])</code>":"Elimina nulos, no duplicados.",
  "<code>df.groupby('estudiante_id').first()</code> sin más":"Funciona pero convierte el ID en índice y descarta el resto en silencio; <code>drop_duplicates</code> expresa mejor la intención."
 }
},
{
 id:"c4-11", clase:4, tema:"Limpieza", nivel:"media",
 caso:"La columna <code>zona</code> viene como <code>' centro '</code>, <code>'NORTE'</code> y <code>'sur'</code> y querés unificarla a <code>'Centro'</code>, <code>'Norte'</code>, <code>'Sur'</code>.",
 pide:"¿Qué encadenás?",
 ops:[
  "<code>df['zona'].str.strip().str.title()</code>",
  "<code>df['zona'].str.replace(' ', '')</code>",
  "<code>df['zona'].astype('category')</code>",
  "<code>df['zona'].str.upper()</code>"
 ],
 aprendido:"El accesor <code>.str</code> aplica métodos de texto a toda la columna. <b><code>strip()</code></b> saca espacios al principio y al final, <b><code>title()</code></b> pone la primera letra de cada palabra en mayúscula. Regla de la clase: <b>primero normalizar texto, después convertir</b>. Sin normalizar, <code>groupby('zona')</code> te genera tres grupos distintos para la misma zona.",
 porque:{
  "<code>df['zona'].str.replace(' ', '')</code>":"Saca <b>todos</b> los espacios, incluso los internos: “Nueva Cordoba” quedaría “NuevaCordoba”.",
  "<code>df['zona'].astype('category')</code>":"Cambia el tipo para ahorrar memoria, pero congela las variantes mal escritas como categorías distintas.",
  "<code>df['zona'].str.upper()</code>":"Unifica mayúsculas pero deja los espacios y queda “ CENTRO ”."
 }
},
{
 id:"c4-12", clase:4, tema:"Limpieza", nivel:"alta",
 caso:"Las notas vienen como texto y algunas están fuera del rango válido 0–10 (por ejemplo <code>'12'</code>). Querés invalidarlas para después imputarlas.",
 pide:"¿Cómo marcás las notas fuera de rango?",
 ops:[
  "<code>notas.loc[~notas['nota'].between(0, 10), 'nota'] = pd.NA</code>",
  "<code>notas[notas['nota'] > 10] = 10</code>",
  "<code>notas['nota'].replace(12, None)</code>",
  "<code>notas.drop(notas['nota'] > 10)</code>"
 ],
 aprendido:"<b><code>between(a, b)</code></b> devuelve <code>True</code> para el rango (inclusive), y <code>~</code> lo niega: “las que <b>no</b> están entre 0 y 10”. Se combina con <code>.loc[máscara, 'columna'] = valor</code>, que es la forma correcta de asignar sobre un subconjunto sin caer en el <i>chained assignment</i> que Pandas advierte.",
 porque:{
  "<code>notas[notas['nota'] > 10] = 10</code>":"Pisa el valor con 10 (inventa un dato) y además asigna sobre <b>todas</b> las columnas de esas filas.",
  "<code>notas['nota'].replace(12, None)</code>":"Solo atrapa el 12 literal; si mañana aparece un 15 se te escapa.",
  "<code>notas.drop(notas['nota'] > 10)</code>":"<code>drop()</code> espera etiquetas de índice, no una máscara booleana."
 }
},

/* ---------- CLASE 4 · Formatos ---------- */
{
 id:"c4-13", clase:4, tema:"Formatos", nivel:"media",
 caso:"Tenés que leer un CSV europeo: separador <code>;</code>, coma decimal, una columna de fechas y los IDs que deben quedar enteros aunque haya nulos.",
 pide:"¿Cómo lo cargás de forma explícita?",
 ops:[
  "<code>pd.read_csv(f, sep=';', decimal=',', parse_dates=['fecha'], dtype={'cliente_id':'Int64'})</code>",
  "<code>pd.read_csv(f)</code> y corregir después",
  "<code>pd.read_excel(f, sheet_name='Enero')</code>",
  "<code>pd.read_table(f)</code>"
 ],
 aprendido:"<b>CSV no almacena tipos</b>: Pandas los infiere, y suele equivocarse. Por eso la regla es <i>leer de forma explícita</i>: <code>sep</code>, <code>decimal</code>, <code>encoding</code>, <code>parse_dates</code> y <code>dtype</code> cuando conocés el origen. <code>'Int64'</code> con I mayúscula es el entero <i>nullable</i> de Pandas, que admite nulos sin pasarse a <code>float</code>.",
 porque:{
  "<code>pd.read_csv(f)</code> y corregir después":"Con <code>sep=','</code> por defecto te carga todo en una sola columna, y los decimales con coma quedan como texto.",
  "<code>pd.read_excel(f, sheet_name='Enero')</code>":"Es para <code>.xlsx</code>, no para CSV.",
  "<code>pd.read_table(f)</code>":"Asume tabulador como separador."
 }
},
{
 id:"c4-14", clase:4, tema:"Formatos", nivel:"baja",
 caso:"Exportás el reporte final a CSV y no querés que aparezca una primera columna sin nombre con 0, 1, 2, 3…",
 pide:"¿Qué parámetro agregás?",
 ops:[
  "<code>df.to_csv('salida.csv', index=False)</code>",
  "<code>df.to_csv('salida.csv', header=False)</code>",
  "<code>df.reset_index().to_csv('salida.csv')</code>",
  "<code>df.to_csv('salida.csv', index=True)</code>"
 ],
 aprendido:"Por defecto Pandas escribe el índice como primera columna. <b><code>index=False</code></b> lo evita y es la costumbre al exportar reportes (vale igual para <code>to_excel()</code> y <code>to_sql()</code>). Si no, cada vez que releés el archivo te vas sumando una columna basura.",
 porque:{
  "<code>df.to_csv('salida.csv', header=False)</code>":"Saca los <b>nombres de columna</b>, que es lo contrario de lo que querés.",
  "<code>df.reset_index().to_csv('salida.csv')</code>":"Convierte el índice en una columna explícita y además igual escribe el índice nuevo.",
  "<code>df.to_csv('salida.csv', index=True)</code>":"Es el comportamiento por defecto: justamente el problema."
 }
},
{
 id:"c4-15", clase:4, tema:"Formatos", nivel:"alta",
 caso:"Tenés que traer de SQLite las ventas con importe mayor o igual a un valor que ingresa la persona usuaria.",
 pide:"¿Cómo lo escribís de forma segura?",
 ops:[
  "<code>pd.read_sql_query(\"SELECT * FROM ventas WHERE importe >= ?\", con, params=(800,))</code>",
  "<code>pd.read_sql_query(f\"SELECT * FROM ventas WHERE importe >= {minimo}\", con)</code>",
  "<code>pd.read_csv(\"ventas.db\")</code>",
  "<code>pd.read_sql_table(\"ventas\", con)</code> y filtrar todo en Python"
 ],
 aprendido:"<b>Nunca concatenar parámetros de la persona usuaria dentro de una consulta SQL.</b> Se usan <b>consultas parametrizadas</b>: <code>?</code> en el texto y los valores en <code>params</code>. El motor los escapa y evita la inyección SQL. Del otro lado, <code>to_sql(tabla, con, if_exists='replace', index=False)</code> escribe el DataFrame.",
 porque:{
  "<code>pd.read_sql_query(f\"SELECT * FROM ventas WHERE importe >= {minimo}\", con)</code>":"Es exactamente la concatenación que la clase marca como riesgo de inyección SQL.",
  "<code>pd.read_csv(\"ventas.db\")</code>":"Una base SQLite no es un archivo de texto tabular.",
  "<code>pd.read_sql_table(\"ventas\", con)</code> y filtrar todo en Python":"Trae toda la tabla a memoria; además requiere SQLAlchemy y desaprovecha el motor."
 }
},
{
 id:"c4-16", clase:4, tema:"Formatos", nivel:"media",
 caso:"Recibís de una API un JSON con objetos anidados dentro de cada registro y necesitás una tabla plana.",
 pide:"¿Qué usás?",
 ops:[
  "<code>pd.json_normalize(datos)</code>",
  "<code>pd.read_json(ruta, orient='records')</code>",
  "<code>json.load(f)</code> y listo",
  "<code>pd.DataFrame(datos)</code>"
 ],
 aprendido:"<b><code>read_json</code></b> maneja orientaciones comunes cuando los registros son <b>planos</b>; cuando hay <b>estructuras anidadas</b>, <b><code>json_normalize</code></b> las aplana generando columnas como <code>cliente.ciudad</code>. La clase lo resume así: <i>en SQL parametrizá; en JSON definí la orientación</i>.",
 porque:{
  "<code>pd.read_json(ruta, orient='records')</code>":"Es lo correcto para una lista de objetos <b>planos</b>, pero deja los anidados como diccionarios dentro de la celda.",
  "<code>json.load(f)</code> y listo":"Te da diccionarios de Python, no un DataFrame.",
  "<code>pd.DataFrame(datos)</code>":"Con anidados te crea columnas cuyo contenido son diccionarios."
 }
},
{
 id:"c4-17", clase:4, tema:"Pipeline", nivel:"alta",
 caso:"Terminaste el pipeline de limpieza y querés que el proceso <b>corte</b> si el <code>id_venta</code> dejó de ser único o si quedó algún <code>cliente_id</code> nulo.",
 pide:"¿Cómo lo expresás?",
 ops:[
  "<code>assert final['id_venta'].is_unique</code> y <code>assert final['cliente_id'].notna().all()</code>",
  "<code>print(final['id_venta'].is_unique)</code>",
  "<code>final = final.drop_duplicates()</code>",
  "<code>try: final.to_csv(...) except: pass</code>"
 ],
 aprendido:"Un pipeline confiable <b>falla temprano y explica por qué</b>. Las aserciones de calidad frenan el proceso antes de exportar datos malos. El orden del pipeline es: normalizar nombres → convertir tipos → tratar nulos → deduplicar → <b>validar</b> → exportar. <code>.copy()</code> al inicio evita modificar la entrada.",
 porque:{
  "<code>print(final['id_venta'].is_unique)</code>":"Informa pero no corta: el archivo con datos rotos se exporta igual.",
  "<code>final = final.drop_duplicates()</code>":"Corrige sin avisar: ocultás que la fuente tiene un problema.",
  "<code>try: final.to_csv(...) except: pass</code>":"Silencia el error de escritura y no valida nada del contenido."
 }
},

/* ---------- CLASE 5 · Matplotlib ---------- */
{
 id:"c5-01", clase:5, tema:"Elección de gráfico", nivel:"baja",
 caso:"Pregunta analítica: “¿Cómo evolucionaron las ventas mes a mes durante el semestre?”",
 pide:"¿Qué gráfico elegís?",
 ops:[
  "Líneas — <code>ax.plot(meses, ventas, marker='o')</code>",
  "Barras — <code>ax.bar(meses, ventas)</code>",
  "Histograma — <code>ax.hist(ventas)</code>",
  "Dispersión — <code>ax.scatter(meses, ventas)</code>"
 ],
 aprendido:"La tabla de decisión de la clase: <b>tendencia → líneas</b>, <b>comparación entre categorías → barras</b>, <b>distribución → histograma</b>, <b>relación entre dos cuantitativas → dispersión</b>. La línea solo se usa cuando el orden es continuo y significativo: unir categorías sin orden natural sugiere valores intermedios que no existen.",
 porque:{
  "Barras — <code>ax.bar(meses, ventas)</code>":"Sirve, pero enfatiza la comparación entre meses en vez de la trayectoria.",
  "Histograma — <code>ax.hist(ventas)</code>":"Muestra cómo se distribuyen los valores, perdiendo por completo el eje temporal.",
  "Dispersión — <code>ax.scatter(meses, ventas)</code>":"Muestra los puntos sin la línea que guía la lectura de la evolución."
 }
},
{
 id:"c5-02", clase:5, tema:"Elección de gráfico", nivel:"baja",
 caso:"Pregunta analítica: “¿Dónde se concentran los tiempos de entrega y qué forma tiene esa distribución?”",
 pide:"¿Qué gráfico usás y qué parámetro es clave?",
 ops:[
  "Histograma: <code>ax.hist(tiempos, bins=10, edgecolor='black')</code>",
  "Barras: <code>ax.bar(range(len(tiempos)), tiempos)</code>",
  "Líneas: <code>ax.plot(tiempos)</code>",
  "Torta: <code>ax.pie(tiempos)</code>"
 ],
 aprendido:"El histograma agrupa una variable cuantitativa <b>continua</b> en intervalos y cuenta observaciones. El parámetro clave es <b><code>bins</code></b>: pocos bins ocultan estructura, demasiados muestran ruido. Hay que probar varias cantidades y documentar la elección. No confundir con barras: en barras las categorías están separadas; en el histograma los intervalos son contiguos.",
 porque:{
  "Barras: <code>ax.bar(range(len(tiempos)), tiempos)</code>":"Dibuja una barra por observación: no resume la distribución.",
  "Líneas: <code>ax.plot(tiempos)</code>":"Sugiere una secuencia temporal que acá no existe.",
  "Torta: <code>ax.pie(tiempos)</code>":"Codifica por ángulo/área (precisión media) y sirve para partes de un total, no para distribuciones."
 }
},
{
 id:"c5-03", clase:5, tema:"Elección de gráfico", nivel:"media",
 caso:"Querés ver si la inversión en publicidad y las ventas varían juntas, y dibujar encima la recta de tendencia.",
 pide:"¿Qué combinación usás?",
 ops:[
  "<code>ax.scatter(x, y, alpha=.65)</code> + <code>np.polyfit(x, y, 1)</code> y <code>ax.plot()</code>",
  "<code>ax.bar(x, y)</code> + <code>ax.axhline()</code>",
  "<code>ax.hist2d(x, y)</code>",
  "<code>ax.plot(x, y)</code> ordenando por x"
 ],
 aprendido:"La dispersión revela dirección, intensidad aparente, curvatura, grupos, huecos y atípicos. <code>np.polyfit(x, y, 1)</code> ajusta una recta de primer grado y devuelve pendiente e intercepto; se dibuja con <code>ax.plot()</code> sobre los puntos. <code>alpha</code> da transparencia para que miles de puntos no oculten la densidad. <b>Aviso obligatorio: una recta ajustada resume asociación, no prueba causalidad.</b>",
 porque:{
  "<code>ax.bar(x, y)</code> + <code>ax.axhline()</code>":"Las barras comparan categorías; acá las dos variables son cuantitativas.",
  "<code>ax.hist2d(x, y)</code>":"Sirve para densidad con muchísimos puntos, pero no es lo que pide la consigna.",
  "<code>ax.plot(x, y)</code> ordenando por x":"Une observaciones independientes con una línea, sugiriendo una continuidad falsa."
 }
},
{
 id:"c5-04", clase:5, tema:"Matplotlib", nivel:"media",
 caso:"Querés una figura con dos gráficos lado a lado: barras de ingresos por región a la izquierda, histograma de tiempos a la derecha.",
 pide:"¿Cómo la creás?",
 ops:[
  "<code>fig, axes = plt.subplots(1, 2, figsize=(11, 4))</code> y usar <code>axes[0]</code> y <code>axes[1]</code>",
  "<code>plt.bar(...)</code> y después <code>plt.hist(...)</code>",
  "<code>plt.figure()</code> dos veces",
  "<code>fig, ax = plt.subplots()</code> y llamar <code>ax.bar()</code> y <code>ax.hist()</code>"
 ],
 aprendido:"La interfaz <b>orientada a objetos</b> es la que pide la cursada: <code>plt.subplots(filas, columnas)</code> devuelve la <b>Figure</b> (el lienzo) y los <b>Axes</b> (cada área de dibujo). Con una grilla 2×2 se indexa <code>axes[0, 1]</code>. Cada eje conserva su propia pregunta, escala y lectura: no se comparan alturas entre gráficos con unidades distintas.",
 porque:{
  "<code>plt.bar(...)</code> y después <code>plt.hist(...)</code>":"La interfaz <code>plt.*</code> dibuja siempre sobre el eje activo: los dos gráficos se superponen en el mismo.",
  "<code>plt.figure()</code> dos veces":"Genera dos figuras separadas, no dos paneles de la misma.",
  "<code>fig, ax = plt.subplots()</code> y llamar <code>ax.bar()</code> y <code>ax.hist()</code>":"Crea un solo eje: las barras y el histograma quedan encimados."
 }
},
{
 id:"c5-05", clase:5, tema:"Matplotlib", nivel:"baja",
 caso:"Ya dibujaste la serie y tenés que rotular la figura: título, nombre del eje horizontal y del vertical, usando la interfaz orientada a objetos.",
 pide:"¿Qué métodos usás?",
 ops:[
  "<code>ax.set_title()</code>, <code>ax.set_xlabel()</code>, <code>ax.set_ylabel()</code>",
  "<code>ax.title()</code>, <code>ax.xlabel()</code>, <code>ax.ylabel()</code>",
  "<code>fig.set_title()</code>, <code>fig.set_xlabel()</code>, <code>fig.set_ylabel()</code>",
  "<code>ax.legend()</code> con los tres textos"
 ],
 aprendido:"Sobre un <b>Axes</b> los rótulos llevan el prefijo <code>set_</code>. También existe la forma compacta <code>ax.set(title='…', xlabel='…', ylabel='…')</code>. Para el título general de una figura con varios paneles es <code>fig.suptitle()</code>. Criterio de la clase: el título puede enunciar la conclusión (“Las ventas crecen 18% desde marzo”), no solo el tema (“Ventas”).",
 porque:{
  "<code>ax.title()</code>, <code>ax.xlabel()</code>, <code>ax.ylabel()</code>":"Esos nombres sin <code>set_</code> son de la interfaz <code>plt.*</code>; sobre un <code>Axes</code> no son llamables así.",
  "<code>fig.set_title()</code>, <code>fig.set_xlabel()</code>, <code>fig.set_ylabel()</code>":"La Figure es el lienzo y no tiene ejes propios; el título general de la figura es <code>fig.suptitle()</code>.",
  "<code>ax.legend()</code> con los tres textos":"La leyenda identifica <b>series</b>, no rotula ejes."
 }
},
{
 id:"c5-06", clase:5, tema:"Matplotlib", nivel:"media",
 caso:"Sobre el histograma de ventas querés marcar dónde cae el promedio con una línea vertical punteada e identificarla en la leyenda.",
 pide:"¿Qué usás?",
 ops:[
  "<code>ax.axvline(media, linestyle='--', label='Media')</code> y luego <code>ax.legend()</code>",
  "<code>ax.axhline(media, label='Media')</code>",
  "<code>ax.plot([media], [0], 'o')</code>",
  "<code>ax.vlines(media)</code> sin más"
 ],
 aprendido:"<b><code>axvline</code></b> dibuja una línea <b>vertical</b> en un valor del eje x (ideal sobre un histograma, donde x es la variable). <b><code>axhline</code></b> dibuja una <b>horizontal</b>, que es lo que se usa para marcar el umbral de aprobación sobre un gráfico de barras de promedios. El <code>label=</code> es lo que después muestra <code>ax.legend()</code>.",
 porque:{
  "<code>ax.axhline(media, label='Media')</code>":"Dibuja horizontal: sobre un histograma cortaría el eje de frecuencias, que no es lo que querés marcar.",
  "<code>ax.plot([media], [0], 'o')</code>":"Pone un punto en el piso: casi invisible y no atraviesa la distribución.",
  "<code>ax.vlines(media)</code> sin más":"<code>vlines</code> necesita también <code>ymin</code> e <code>ymax</code>; <code>axvline</code> ocupa todo el alto automáticamente."
 }
},
{
 id:"c5-07", clase:5, tema:"Matplotlib", nivel:"baja",
 caso:"Terminaste el panel y las etiquetas de los ejes se superponen entre sí. Después querés guardar la figura en buena resolución para el informe.",
 pide:"¿Qué dos llamadas cierran el gráfico?",
 ops:[
  "<code>fig.tight_layout()</code> y <code>fig.savefig('panel.png', dpi=180)</code>",
  "<code>plt.show()</code> y <code>plt.close()</code>",
  "<code>fig.set_size_inches()</code> y <code>plt.show()</code>",
  "<code>fig.clear()</code> y <code>fig.savefig()</code>"
 ],
 aprendido:"Cierre recomendado: <b><code>tight_layout()</code></b> ajusta los espacios para que no se recorten textos, <b><code>savefig()</code></b> exporta (con <code>dpi=300</code> para impresión y <code>bbox_inches='tight'</code> para recortar márgenes) y <b><code>show()</code></b> muestra en pantalla. <code>savefig</code> siempre <b>antes</b> de <code>show()</code>, porque en algunos backends <code>show()</code> vacía la figura.",
 porque:{
  "<code>plt.show()</code> y <code>plt.close()</code>":"Muestra y cierra, pero no arregla la superposición ni guarda el archivo.",
  "<code>fig.set_size_inches()</code> y <code>plt.show()</code>":"Agrandar la figura puede disimular el problema, pero <code>tight_layout()</code> es la solución directa.",
  "<code>fig.clear()</code> y <code>fig.savefig()</code>":"<code>clear()</code> borra el contenido: guardarías una figura vacía."
 }
},
{
 id:"c5-08", clase:5, tema:"Interpretación", nivel:"media",
 caso:"Te muestran un gráfico de barras donde el eje vertical empieza en 400 en lugar de en 0, y las diferencias entre regiones parecen enormes.",
 pide:"¿Cuál es el error y cómo se corrige?",
 ops:[
  "Eje truncado: las barras deben tener base común en cero salvo justificación explícita",
  "Faltan colores: hay que usar una paleta más variada",
  "Faltan bins: hay que elegir mejor la cantidad de intervalos",
  "Está bien: acercar el eje permite ver mejor el detalle"
 ],
 aprendido:"Las barras codifican magnitud por <b>longitud</b>, y la longitud solo se lee bien con base común en cero. Truncar el eje exagera diferencias. Los otros errores frecuentes de la clase: color sin función, título genérico, cantidad de bins arbitraria, sobreposición de puntos y confundir correlación con causalidad.",
 porque:{
  "Faltan colores: hay que usar una paleta más variada":"Al revés: demasiados colores compiten. Se usa una paleta corta y el acento se reserva para el hallazgo.",
  "Faltan bins: hay que elegir mejor la cantidad de intervalos":"Los bins son del histograma, no de las barras.",
  "Está bien: acercar el eje permite ver mejor el detalle":"En un gráfico de <b>líneas</b> puede justificarse; en barras distorsiona la comparación."
 }
},

/* ---------- CLASE 6 · Seaborn ---------- */
{
 id:"c6-01", clase:6, tema:"Seaborn", nivel:"media",
 caso:"La dirección comercial quiere explorar las asociaciones lineales entre visitas, publicidad, ventas y devoluciones, con los coeficientes escritos en cada celda.",
 pide:"¿Qué combinación usás?",
 ops:[
  "<code>corr = df.select_dtypes('number').corr()</code> y <code>sns.heatmap(corr, annot=True, cmap='vlag', vmin=-1, vmax=1)</code>",
  "<code>sns.heatmap(df, annot=True)</code>",
  "<code>sns.pairplot(df)</code>",
  "<code>sns.barplot(data=df)</code>"
 ],
 aprendido:"El mapa de calor de correlaciones se arma en dos pasos: primero <b><code>.corr()</code></b> sobre las columnas numéricas (<code>select_dtypes('number')</code> las filtra), después <b><code>sns.heatmap()</code></b>. <code>annot=True</code> escribe el coeficiente, y <code>vmin=-1, vmax=1</code> fija la escala para que el color sea comparable entre gráficos. Lectura: cerca de +1 asociación lineal positiva fuerte, cerca de −1 negativa fuerte, cerca de 0 poca asociación lineal (que <b>no</b> es lo mismo que independencia). Y correlación no implica causalidad.",
 porque:{
  "<code>sns.heatmap(df, annot=True)</code>":"Colorea los valores crudos de la tabla, no las correlaciones entre variables.",
  "<code>sns.pairplot(df)</code>":"Muestra las relaciones por pares como dispersiones, pero no da los coeficientes.",
  "<code>sns.barplot(data=df)</code>":"Compara magnitudes por categoría; no mide asociación."
 }
},
{
 id:"c6-02", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Recursos Humanos quiere comparar el nivel, la dispersión y los posibles valores atípicos de los salarios de tres áreas.",
 pide:"¿Qué gráfico usás?",
 ops:[
  "<code>sns.boxplot(data=df, x='Area', y='Salario')</code>",
  "<code>sns.barplot(data=df, x='Area', y='Salario')</code>",
  "<code>sns.lineplot(data=df, x='Area', y='Salario')</code>",
  "<code>sns.heatmap(df.corr())</code>"
 ],
 aprendido:"El boxplot muestra en una sola caja: <b>línea central = mediana</b>, <b>caja = 50% central entre Q1 y Q3</b>, <b>alto de la caja = rango intercuartílico</b>, <b>bigotes y puntos externos = extensión y posibles atípicos</b>. Es el gráfico para “nivel + dispersión + atípicos” por categoría. Se le puede superponer <code>sns.stripplot(..., color='black', alpha=.4)</code> para ver las observaciones individuales.",
 porque:{
  "<code>sns.barplot(data=df, x='Area', y='Salario')</code>":"Muestra solo el promedio (con su intervalo): oculta la dispersión y los atípicos.",
  "<code>sns.lineplot(data=df, x='Area', y='Salario')</code>":"Une categorías sin orden natural con una línea.",
  "<code>sns.heatmap(df.corr())</code>":"Es para correlaciones entre variables numéricas."
 }
},
{
 id:"c6-03", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Querés explorar rápidamente cómo se relacionan entre sí <code>Horas</code>, <code>Nota</code> y <code>Proyectos</code>, y ver además la distribución de cada una, coloreando por curso.",
 pide:"¿Qué usás?",
 ops:[
  "<code>sns.pairplot(df, vars=['Horas','Nota','Proyectos'], hue='Curso', corner=True, diag_kind='hist')</code>",
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota')</code>",
  "<code>sns.heatmap(df.corr(), annot=True)</code>",
  "<code>sns.histplot(df, x='Horas', hue='Curso')</code>"
 ],
 aprendido:"El <b>pairplot</b> arma una matriz: fuera de la diagonal, las relaciones bivariadas; en la diagonal, la distribución de cada variable. <code>vars=</code> limita las columnas (con muchas se vuelve lento e ilegible: primero seleccionar las relevantes), <code>corner=True</code> dibuja solo el triángulo inferior y <code>hue=</code> colorea por categoría.",
 porque:{
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota')</code>":"Muestra un solo par de variables.",
  "<code>sns.heatmap(df.corr(), annot=True)</code>":"Resume la asociación en un número, pero no deja ver la forma (curvatura, grupos, atípicos).",
  "<code>sns.histplot(df, x='Horas', hue='Curso')</code>":"Muestra la distribución de una variable, no las relaciones por pares."
 }
},
{
 id:"c6-04", clase:6, tema:"Seaborn", nivel:"alta",
 caso:"Querés codificar cuatro variables en un solo gráfico: horas en x, nota en y, curso por color y forma, y cantidad de proyectos por tamaño del punto.",
 pide:"¿Qué función y qué parámetros?",
 ops:[
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota', hue='Curso', size='Proyectos', style='Curso', sizes=(40,220), alpha=.78)</code>",
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota', color='Curso')</code>",
  "<code>sns.pairplot(df, hue='Curso')</code>",
  "<code>sns.barplot(data=df, x='Curso', y='Nota', hue='Proyectos')</code>"
 ],
 aprendido:"Los canales visuales de Seaborn: <b><code>hue</code></b> → color, <b><code>size</code></b> → tamaño, <b><code>style</code></b> → forma del marcador. Regla: <b>una variable por canal visual</b>. Posición para las cuantitativas principales, color o forma para una categoría importante, tamaño solo para magnitudes positivas y comparables, y transparencia (<code>alpha</code>) para reducir superposición.",
 porque:{
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota', color='Curso')</code>":"<code>color=</code> fija <b>un</b> color para todos los puntos; el mapeo por categoría es <code>hue=</code>.",
  "<code>sns.pairplot(df, hue='Curso')</code>":"Genera una matriz de gráficos, no un único gráfico con cuatro canales.",
  "<code>sns.barplot(data=df, x='Curso', y='Nota', hue='Proyectos')</code>":"Las barras comparan categorías; se pierden horas y nota como variables continuas."
 }
},
{
 id:"c6-05", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Un centro de soporte clasificó los tickets como Rápido, Medio o Lento y quiere ver <b>cuántos</b> hay de cada tipo.",
 pide:"¿Qué función usás?",
 ops:[
  "<code>sns.countplot(data=df, x='clasificacion')</code>",
  "<code>sns.barplot(data=df, x='clasificacion', y='minutos')</code>",
  "<code>sns.histplot(data=df, x='clasificacion')</code>",
  "<code>sns.boxplot(data=df, x='clasificacion', y='minutos')</code>"
 ],
 aprendido:"<b><code>countplot</code></b> cuenta las ocurrencias de cada categoría: es un <code>barplot</code> cuya altura es la frecuencia, así que no necesita variable <code>y</code>. <b><code>barplot</code></b>, en cambio, muestra un <b>agregado</b> (por defecto la media) de una variable numérica por categoría.",
 porque:{
  "<code>sns.barplot(data=df, x='clasificacion', y='minutos')</code>":"Muestra el promedio de minutos por clase, no cuántos tickets hay.",
  "<code>sns.histplot(data=df, x='clasificacion')</code>":"Está pensado para variables continuas agrupadas en intervalos.",
  "<code>sns.boxplot(data=df, x='clasificacion', y='minutos')</code>":"Muestra la distribución de minutos, no el conteo."
 }
},
{
 id:"c6-06", clase:6, tema:"Seaborn", nivel:"alta",
 caso:"Marketing quiere ver si la inversión publicitaria se asocia con las conversiones, con la recta de ajuste y su banda de confianza, en una sola llamada.",
 pide:"¿Qué usás?",
 ops:[
  "<code>sns.regplot(data=df, x='inversion', y='conversiones')</code>",
  "<code>sns.scatterplot(data=df, x='inversion', y='conversiones')</code>",
  "<code>sns.lineplot(data=df, x='inversion', y='conversiones')</code>",
  "<code>sns.residplot(data=df, x='inversion', y='conversiones')</code>"
 ],
 aprendido:"<b><code>regplot</code></b> dibuja la dispersión <b>más</b> la recta de regresión con su intervalo de confianza en una sola llamada (el equivalente manual en Matplotlib es <code>scatter</code> + <code>np.polyfit</code>). Como siempre: la recta resume una asociación, no demuestra causalidad.",
 porque:{
  "<code>sns.scatterplot(data=df, x='inversion', y='conversiones')</code>":"Dibuja los puntos pero sin la recta de ajuste.",
  "<code>sns.lineplot(data=df, x='inversion', y='conversiones')</code>":"Une los puntos en secuencia; no es un ajuste.",
  "<code>sns.residplot(data=df, x='inversion', y='conversiones')</code>":"Grafica los <b>residuos</b> del ajuste, útil para diagnosticar, no para mostrar la relación."
 }
},
{
 id:"c6-07", clase:6, tema:"Seaborn", nivel:"alta",
 caso:"Querés comparar la tendencia mensual de ventas <b>repitiendo el mismo gráfico</b> en un panel por región (pequeños múltiplos).",
 pide:"¿Qué función y qué parámetro?",
 ops:[
  "<code>sns.relplot(data=df, x='mes', y='ventas', col='region', hue='canal', kind='line')</code>",
  "<code>sns.lineplot(data=df, x='mes', y='ventas', hue='region')</code>",
  "<code>plt.subplots(1, 4)</code> y un <code>lineplot</code> por eje a mano",
  "<code>sns.pairplot(df, hue='region')</code>"
 ],
 aprendido:"<b><code>relplot</code></b> (y <code>catplot</code>, <code>displot</code>) son funciones a <b>nivel de figura</b>: aceptan <code>col=</code> y <code>row=</code> para generar automáticamente una grilla de paneles con ejes compartidos. Es la forma directa de hacer pequeños múltiplos. <code>kind=</code> elige el tipo de gráfico dentro de cada panel.",
 porque:{
  "<code>sns.lineplot(data=df, x='mes', y='ventas', hue='region')</code>":"Superpone todas las regiones en un mismo eje: con varias líneas se vuelve ilegible.",
  "<code>plt.subplots(1, 4)</code> y un <code>lineplot</code> por eje a mano":"Funciona, pero es justo lo que <code>relplot</code> automatiza, incluida la escala compartida.",
  "<code>sns.pairplot(df, hue='region')</code>":"Cruza variables entre sí, no repite un mismo gráfico por categoría."
 }
},
{
 id:"c6-08", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Querés exportar el gráfico final para un informe académico impreso y además tener una versión editable para la web.",
 pide:"¿Qué formatos elegís?",
 ops:[
  "PNG con <code>dpi=300</code> para impresión y PDF o SVG vectorial para publicación/edición",
  "Solo PNG con <code>dpi=72</code>",
  "Solo JPG, que ocupa menos",
  "Captura de pantalla del notebook"
 ],
 aprendido:"<b>PNG</b>: ideal para Word, PowerPoint y web, con <code>dpi=300</code> para impresión. <b>PDF</b>: vectorial, recomendado para informes académicos. <b>SVG</b>: vectorial y editable, excelente para web y diseño. La llamada típica: <code>plt.savefig('informe.png', dpi=300, bbox_inches='tight', facecolor='white')</code>.",
 porque:{
  "Solo PNG con <code>dpi=72</code>":"72 dpi es resolución de pantalla: impreso se ve pixelado.",
  "Solo JPG, que ocupa menos":"JPG comprime con pérdida y ensucia los bordes de texto y líneas finas.",
  "Captura de pantalla del notebook":"Baja resolución y no reproducible."
 }
},
{
 id:"c6-09", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Querés aplicar un estilo con cuadrícula suave a todos los gráficos y fijar colores propios para cada curso, consistentes entre todas las figuras del informe.",
 pide:"¿Qué usás?",
 ops:[
  "<code>sns.set_theme(style='whitegrid')</code> y un dict en <code>palette={'Datos':'#00A6A6', ...}</code>",
  "<code>plt.style.use('dark_background')</code> y colores al azar por gráfico",
  "<code>sns.color_palette()</code> y nada más",
  "<code>ax.set_facecolor('white')</code> en cada gráfico"
 ],
 aprendido:"<code>sns.set_theme(style=…)</code> aplica el estilo a toda la sesión (<code>whitegrid</code>, <code>darkgrid</code>, <code>ticks</code>…). Pasar un <b>diccionario</b> a <code>palette=</code> fija qué color le toca a cada categoría, y eso mantiene la coherencia entre gráficos. Criterio: paletas consistentes, colores intensos reservados para lo importante, y nada de estilos que bajen el contraste.",
 porque:{
  "<code>plt.style.use('dark_background')</code> y colores al azar por gráfico":"Si el color de cada curso cambia entre figuras, quien lee tiene que reaprender la leyenda cada vez.",
  "<code>sns.color_palette()</code> y nada más":"Devuelve una paleta, pero no la asocia a categorías concretas.",
  "<code>ax.set_facecolor('white')</code> en cada gráfico":"Cambia solo el fondo de un eje; no es un tema ni una paleta."
 }
},
{
 id:"c6-10", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Querés señalar en el gráfico al estudiante con la nota más alta, con un texto y una flecha que lo apunte.",
 codigo:"mejor = df.loc[df['Nota'].idxmax()]",
 pide:"¿Qué usás para la anotación?",
 ops:[
  "<code>ax.annotate('Mayor nota', xy=(mejor['Horas'], mejor['Nota']), xytext=(...), arrowprops={'arrowstyle':'->'})</code>",
  "<code>ax.set_title('Mayor nota')</code>",
  "<code>ax.legend(['Mayor nota'])</code>",
  "<code>print(mejor)</code>"
 ],
 aprendido:"<b><code>idxmax()</code></b> devuelve la <b>etiqueta de índice</b> de la fila con el valor máximo (a diferencia de <code>max()</code>, que devuelve el valor), y se combina con <code>.loc[]</code> para traer la fila completa. <b><code>ax.annotate()</code></b> pone el texto: <code>xy</code> es el punto señalado, <code>xytext</code> dónde va el texto y <code>arrowprops</code> dibuja la flecha. Criterio: anotar solo hallazgos relevantes.",
 porque:{
  "<code>ax.set_title('Mayor nota')</code>":"Pone un título general; no señala ningún punto concreto.",
  "<code>ax.legend(['Mayor nota'])</code>":"La leyenda identifica series, no observaciones individuales.",
  "<code>print(mejor)</code>":"Lo muestra en consola, fuera del gráfico."
 }
},
{
 id:"c6-11", clase:6, tema:"Ecosistema", nivel:"baja",
 caso:"Te preguntan en el parcial qué rol cumple cada librería del stack en un mismo gráfico de Seaborn.",
 pide:"¿Cuál es la división de tareas?",
 ops:[
  "Pandas organiza los datos en DataFrames · Seaborn da la interfaz estadística de alto nivel · Matplotlib controla figura, ejes, títulos y exportación",
  "Seaborn reemplaza a Matplotlib por completo",
  "NumPy dibuja los gráficos y Pandas los exporta",
  "Matplotlib organiza los datos y Seaborn los limpia"
 ],
 aprendido:"Seaborn está <b>construido sobre</b> Matplotlib: le pasás un DataFrame de Pandas y resuelve el gráfico estadístico en una línea, pero el título, la figura, el <code>tight_layout()</code> y el <code>savefig()</code> los seguís manejando con Matplotlib (<code>plt.*</code> o el <code>ax</code> que Seaborn devuelve). Por eso en todos los ejemplos se importan las tres.",
 porque:{
  "Seaborn reemplaza a Matplotlib por completo":"Todos los ejemplos de la clase importan igual <code>matplotlib.pyplot</code> para título, layout y exportación.",
  "NumPy dibuja los gráficos y Pandas los exporta":"NumPy hace cálculo numérico; no dibuja.",
  "Matplotlib organiza los datos y Seaborn los limpia":"Ninguna de las dos organiza ni limpia datos: eso es Pandas."
 }
},
{
 id:"c6-12", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Querés comparar la distribución de satisfacción entre modalidad presencial y virtual, viendo la <b>forma</b> completa de cada distribución y no solo los cuartiles.",
 pide:"¿Qué gráfico elegís?",
 ops:[
  "<code>sns.violinplot(data=df, x='modalidad', y='satisfaccion')</code>",
  "<code>sns.boxplot(data=df, x='modalidad', y='satisfaccion')</code>",
  "<code>sns.countplot(data=df, x='modalidad')</code>",
  "<code>sns.regplot(data=df, x='modalidad', y='satisfaccion')</code>"
 ],
 aprendido:"El <b>violinplot</b> combina el resumen del boxplot con una estimación de densidad: muestra la <b>forma</b> de la distribución (si es simétrica, si tiene dos picos). El boxplot es más sobrio y mejor para detectar atípicos; el violín es mejor cuando la pregunta es por la forma.",
 porque:{
  "<code>sns.boxplot(data=df, x='modalidad', y='satisfaccion')</code>":"Correcto para nivel, dispersión y atípicos, pero resume en cuartiles: una distribución con dos picos se ve igual que una simétrica.",
  "<code>sns.countplot(data=df, x='modalidad')</code>":"Cuenta cuántas respuestas hay por modalidad, no cómo se distribuye la satisfacción.",
  "<code>sns.regplot(data=df, x='modalidad', y='satisfaccion')</code>":"La regresión necesita que x sea cuantitativa."
 }
}

];

/* ==============================================================
   MODELOS DE PARCIAL
   --------------------------------------------------------------
   Para cargar un modelo: pegá las preguntas dentro de "preguntas"
   usando exactamente la misma estructura que las de BANCO,
   y poné disponible: true.
   ============================================================== */
const PARCIALES = [
{ n:1, letra:"A", titulo:"Examen simulado · 1er parcial — A", disponible:true, preguntas:[

/* === A · Ejercicio 1. Ventas semanales vectorizadas === */
{
 id:"pA-01", clase:3, ej:"A · Ej 1", tema:"NumPy", nivel:"baja",
 caso:"<b>Ejercicio 1 — Ventas semanales vectorizadas.</b> Tarea 1: crear ambos arreglos con NumPy.",
 codigo:"Unidades vendidas: [12, 15, 11, 18, 20, 17, 22]\nPrecios unitarios: [1500, 1500, 1550, 1550, 1600, 1600, 1650]",
 pide:"¿Cómo los creás?",
 ops:[
  "<code>unidades = np.array([12,15,11,18,20,17,22])</code> y lo mismo con precios",
  "<code>unidades = np.list([12,15,11,18,20,17,22])</code>",
  "<code>unidades = pd.Series([12,15,11,18,20,17,22])</code>",
  "<code>unidades = [12,15,11,18,20,17,22]</code> tal cual"
 ],
 aprendido:"<code>np.array(lista)</code> es la forma de crear un <code>ndarray</code> desde una lista de Python. Ese paso es el que habilita todo lo que viene después: multiplicar los dos arreglos elemento a elemento sin escribir ningún <code>for</code>.",
 porque:{
  "<code>unidades = np.list([12,15,11,18,20,17,22])</code>":"<code>np.list</code> no existe en NumPy.",
  "<code>unidades = pd.Series([12,15,11,18,20,17,22])</code>":"Funcionaría para multiplicar, pero la consigna pide explícitamente NumPy.",
  "<code>unidades = [12,15,11,18,20,17,22]</code> tal cual":"Sigue siendo una lista: <code>lista * lista</code> tira <code>TypeError</code>."
 }
},
{
 id:"pA-02", clase:3, ej:"A · Ej 1", tema:"NumPy", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 2: calcular el ingreso de cada día mediante multiplicación vectorizada.",
 pide:"¿Cómo lo escribís?",
 ops:[
  "<code>ingresos = unidades * precios</code>",
  "<code>ingresos = [u * p for u, p in zip(unidades, precios)]</code>",
  "<code>ingresos = np.dot(unidades, precios)</code>",
  "<code>ingresos = unidades.sum() * precios.sum()</code>"
 ],
 aprendido:"Con dos arreglos NumPy de la misma forma, el operador <code>*</code> multiplica <b>elemento a elemento</b>: el día 1 con el día 1, el 2 con el 2, etc. Eso es la multiplicación vectorizada que pide la consigna, y devuelve un arreglo de 7 ingresos.",
 porque:{
  "<code>ingresos = [u * p for u, p in zip(unidades, precios)]</code>":"Da los mismos números, pero es un ciclo: la consigna pide operación vectorizada.",
  "<code>ingresos = np.dot(unidades, precios)</code>":"El producto punto devuelve <b>un solo número</b> (la suma de los productos): te saltearías el detalle diario.",
  "<code>ingresos = unidades.sum() * precios.sum()</code>":"Multiplica totales entre sí: matemáticamente no es el ingreso."
 }
},
{
 id:"pA-03", clase:3, ej:"A · Ej 1", tema:"NumPy", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 3, primera parte: calcular el ingreso total de la semana y el promedio diario.",
 pide:"¿Qué usás?",
 ops:[
  "<code>ingresos.sum()</code> y <code>ingresos.mean()</code>",
  "<code>len(ingresos)</code> y <code>ingresos.median()</code>",
  "<code>ingresos.max()</code> y <code>ingresos.std()</code>",
  "<code>np.cumsum(ingresos)</code> y <code>np.percentile(ingresos, 50)</code>"
 ],
 aprendido:"Sobre un arreglo NumPy funcionan tanto los métodos (<code>ingresos.sum()</code>, <code>ingresos.mean()</code>) como las funciones (<code>np.sum(ingresos)</code>, <code>np.mean(ingresos)</code>): son equivalentes. “Total” es suma y “promedio diario” es media.",
 porque:{
  "<code>len(ingresos)</code> y <code>ingresos.median()</code>":"<code>len</code> cuenta los días y la mediana no es lo que pide la consigna.",
  "<code>ingresos.max()</code> y <code>ingresos.std()</code>":"Máximo y desvío responden otras preguntas.",
  "<code>np.cumsum(ingresos)</code> y <code>np.percentile(ingresos, 50)</code>":"<code>cumsum</code> da el acumulado día a día, no el total en un número."
 }
},
{
 id:"pA-04", clase:3, ej:"A · Ej 1", tema:"NumPy", nivel:"media",
 caso:"<b>Ejercicio 1.</b> Tarea 3, segunda parte: identificar <b>qué día</b> tuvo el mayor ingreso (no cuánto fue, sino cuál día).",
 pide:"¿Qué función usás?",
 ops:[
  "<code>dia = ingresos.argmax()</code> — devuelve la <b>posición</b> del máximo",
  "<code>dia = ingresos.max()</code> — devuelve el valor máximo",
  "<code>dia = np.sort(ingresos)[-1]</code>",
  "<code>dia = ingresos.idxmax()</code>"
 ],
 aprendido:"<b><code>max()</code> devuelve el valor; <code>argmax()</code> devuelve la posición</b> donde está ese valor. Como el arreglo está ordenado por día, esa posición <i>es</i> el día. El equivalente en Pandas se llama <code>idxmax()</code> y devuelve la etiqueta del índice.",
 porque:{
  "<code>dia = ingresos.max()</code> — devuelve el valor máximo":"Te dice cuánto se facturó, no qué día.",
  "<code>dia = np.sort(ingresos)[-1]</code>":"También te da el valor más alto, y además pierde la referencia al día original.",
  "<code>dia = ingresos.idxmax()</code>":"<code>idxmax()</code> es de Pandas (Series/DataFrame); sobre un <code>ndarray</code> no existe."
 }
},
{
 id:"pA-05", clase:3, ej:"A · Ej 1", tema:"NumPy", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 4: aplicar un aumento vectorizado del 8 % a los precios y mostrar los nuevos precios.",
 pide:"¿Cómo lo hacés?",
 ops:[
  "<code>precios_nuevos = precios * 1.08</code>",
  "<code>precios_nuevos = precios + 0.08</code>",
  "<code>precios_nuevos = precios * 0.08</code>",
  "<code>for p in precios: p = p * 1.08</code>"
 ],
 aprendido:"Multiplicar un arreglo por un escalar es <b>broadcasting</b>: NumPy aplica el 1.08 a todos los elementos de una sola vez. Un aumento del 8 % es multiplicar por <code>1.08</code> (el 100 % original más el 8 %), no por <code>0.08</code>, que daría solo el monto del aumento.",
 porque:{
  "<code>precios_nuevos = precios + 0.08</code>":"Suma 8 centavos a cada precio; no es un aumento porcentual.",
  "<code>precios_nuevos = precios * 0.08</code>":"Devuelve solo el <b>valor del aumento</b>, no el precio final.",
  "<code>for p in precios: p = p * 1.08</code>":"Además de no ser vectorizado, reasigna una variable temporal: el arreglo queda intacto."
 }
},

/* === A · Ejercicio 2. Filtrado de productos desde CSV === */
{
 id:"pA-06", clase:4, ej:"A · Ej 2", tema:"Pandas · E/S", nivel:"baja",
 caso:"<b>Ejercicio 2 — Filtrado de productos desde CSV.</b> Tarea 5: cargar <code>productos.csv</code> con Pandas.",
 codigo:"producto,categoria,precio,stock\nTeclado,Perifericos,25000,12\nMouse,Perifericos,18000,0\nMonitor,Monitores,210000,5\nWebcam,Perifericos,48000,8\nNotebook,Computacion,950000,3",
 pide:"¿Qué función usás?",
 ops:[
  "<code>df = pd.read_csv('productos.csv')</code>",
  "<code>df = pd.read_excel('productos.csv')</code>",
  "<code>df = csv.DictReader(open('productos.csv'))</code>",
  "<code>df = pd.DataFrame('productos.csv')</code>"
 ],
 aprendido:"<code>pd.read_csv()</code> lee el archivo y usa la primera línea como encabezado, así que las columnas quedan <code>producto</code>, <code>categoria</code>, <code>precio</code> y <code>stock</code>. Conviene seguir con <code>df.head()</code> y <code>df.dtypes</code> para confirmar que precio y stock quedaron numéricos.",
 porque:{
  "<code>df = pd.read_excel('productos.csv')</code>":"<code>read_excel</code> es para <code>.xlsx</code>/<code>.xls</code>, no para texto separado por comas.",
  "<code>df = csv.DictReader(open('productos.csv'))</code>":"Es la vía de la librería estándar y te devuelve diccionarios, no un DataFrame: la consigna pide Pandas.",
  "<code>df = pd.DataFrame('productos.csv')</code>":"<code>pd.DataFrame()</code> construye desde datos en memoria, no lee archivos."
 }
},
{
 id:"pA-07", clase:4, ej:"A · Ej 2", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 2.</b> Tarea 6: seleccionar las columnas <code>producto</code>, <code>precio</code> y <code>stock</code>, dejando afuera <code>categoria</code>.",
 pide:"¿Cómo lo escribís?",
 ops:[
  "<code>df[['producto', 'precio', 'stock']]</code>",
  "<code>df['producto', 'precio', 'stock']</code>",
  "<code>df.loc['producto':'stock']</code>",
  "<code>df.iloc[0:3]</code>"
 ],
 aprendido:"Para varias columnas va la <b>lista de nombres dentro de los corchetes</b>, y el resultado sigue siendo un DataFrame. Con un solo corchete y un solo nombre obtendrías una Series.",
 porque:{
  "<code>df['producto', 'precio', 'stock']</code>":"Pandas lee la tupla como una única clave y lanza <code>KeyError</code>.",
  "<code>df.loc['producto':'stock']</code>":"Sin la coma, <code>loc</code> corta <b>filas</b> por etiqueta, no columnas.",
  "<code>df.iloc[0:3]</code>":"Selecciona las tres primeras <b>filas</b>."
 }
},
{
 id:"pA-08", clase:4, ej:"A · Ej 2", tema:"Pandas", nivel:"media",
 caso:"<b>Ejercicio 2.</b> Tarea 7: filtrar los productos con precio mayor a 40000 <b>y</b> stock mayor a 0.",
 pide:"¿Cuál es la sintaxis correcta?",
 ops:[
  "<code>df[(df['precio'] &gt; 40000) &amp; (df['stock'] &gt; 0)]</code>",
  "<code>df[df['precio'] &gt; 40000 and df['stock'] &gt; 0]</code>",
  "<code>df[df['precio'] &gt; 40000 &amp; df['stock'] &gt; 0]</code>",
  "<code>df[(df['precio'] &gt; 40000) | (df['stock'] &gt; 0)]</code>"
 ],
 aprendido:"Las dos reglas de oro del filtrado en Pandas: <b>se usa <code>&amp;</code>, no <code>and</code></b>, y <b>cada condición va entre paréntesis</b> porque <code>&amp;</code> tiene mayor precedencia que los comparadores. Con estos datos el resultado son Monitor, Webcam y Notebook: el Mouse sale por precio y por stock 0.",
 porque:{
  "<code>df[df['precio'] &gt; 40000 and df['stock'] &gt; 0]</code>":"<code>and</code> espera un único valor de verdad; con Series lanza <i>“The truth value of a Series is ambiguous”</i>.",
  "<code>df[df['precio'] &gt; 40000 &amp; df['stock'] &gt; 0]</code>":"Sin paréntesis, Python evalúa primero <code>40000 &amp; df['stock']</code>: error o resultado incorrecto.",
  "<code>df[(df['precio'] &gt; 40000) | (df['stock'] &gt; 0)]</code>":"<code>|</code> es “o”: dejaría pasar el Teclado, que cumple solo una de las dos condiciones."
 }
},
{
 id:"pA-09", clase:4, ej:"A · Ej 2", tema:"Pandas · E/S", nivel:"baja",
 caso:"<b>Ejercicio 2.</b> Tarea 8: exportar el resultado como <code>productos_disponibles.csv</code> <b>sin guardar el índice</b>.",
 pide:"¿Cómo lo exportás?",
 ops:[
  "<code>disponibles.to_csv('productos_disponibles.csv', index=False)</code>",
  "<code>disponibles.to_csv('productos_disponibles.csv')</code>",
  "<code>disponibles.to_csv('productos_disponibles.csv', header=False)</code>",
  "<code>disponibles.to_excel('productos_disponibles.csv', index=False)</code>"
 ],
 aprendido:"Por defecto Pandas escribe el índice como una primera columna sin nombre. <b><code>index=False</code></b> es exactamente lo que pide la consigna “sin guardar el índice”. Aparece en los tres modelos de parcial: memorizalo.",
 porque:{
  "<code>disponibles.to_csv('productos_disponibles.csv')</code>":"Es el comportamiento por defecto: escribe el índice, que es justo lo que la consigna prohíbe.",
  "<code>disponibles.to_csv('productos_disponibles.csv', header=False)</code>":"Saca los nombres de columna, no el índice.",
  "<code>disponibles.to_excel('productos_disponibles.csv', index=False)</code>":"Genera un archivo Excel con extensión <code>.csv</code>: no se puede abrir como CSV."
 }
},

/* === A · Ejercicio 3. Gráfico de líneas de visitas === */
{
 id:"pA-10", clase:5, ej:"A · Ej 3", tema:"Matplotlib", nivel:"baja",
 caso:"<b>Ejercicio 3 — Gráfico de líneas de visitas.</b> Tarea 9: crear un gráfico de líneas <b>con marcadores</b>.",
 codigo:"dias = [\"Lun\", \"Mar\", \"Mié\", \"Jue\", \"Vie\", \"Sáb\", \"Dom\"]\nvisitas = [120, 150, 135, 180, 210, 260, 230]",
 pide:"¿Cómo lo dibujás?",
 ops:[
  "<code>plt.plot(dias, visitas, marker='o')</code>",
  "<code>plt.plot(dias, visitas)</code>",
  "<code>plt.scatter(dias, visitas)</code>",
  "<code>plt.bar(dias, visitas)</code>"
 ],
 aprendido:"<code>plt.plot()</code> dibuja la línea y <b><code>marker='o'</code></b> agrega un círculo en cada observación, que es lo que pide “con marcadores”. Los días son una secuencia ordenada, así que la línea es el gráfico correcto para mostrar la evolución.",
 porque:{
  "<code>plt.plot(dias, visitas)</code>":"Dibuja la línea pero sin marcar cada punto: falta el <code>marker</code> que pide la consigna.",
  "<code>plt.scatter(dias, visitas)</code>":"Pone los puntos pero no los une con la línea.",
  "<code>plt.bar(dias, visitas)</code>":"Es un gráfico de barras: la consigna pide líneas."
 }
},
{
 id:"pA-11", clase:5, ej:"A · Ej 3", tema:"Matplotlib", nivel:"baja",
 caso:"<b>Ejercicio 3.</b> Tarea 10: agregar título, etiquetas de ejes y cuadrícula.",
 pide:"¿Qué llamadas usás?",
 ops:[
  "<code>plt.title(...)</code>, <code>plt.xlabel(...)</code>, <code>plt.ylabel(...)</code> y <code>plt.grid(True)</code>",
  "<code>plt.title(...)</code>, <code>plt.label(...)</code> y <code>plt.lines(True)</code>",
  "<code>plt.legend(...)</code> y <code>plt.grid(True)</code>",
  "<code>plt.suptitle(...)</code>, <code>plt.set_xlabel(...)</code> y <code>plt.axis('on')</code>"
 ],
 aprendido:"Con la interfaz <code>plt.*</code> los rótulos van <b>sin</b> el prefijo <code>set_</code>: <code>plt.title()</code>, <code>plt.xlabel()</code>, <code>plt.ylabel()</code>, <code>plt.grid()</code>. Si en cambio usás la interfaz orientada a objetos (<code>fig, ax = plt.subplots()</code>) son <code>ax.set_title()</code>, <code>ax.set_xlabel()</code>… Conviene que la cuadrícula sea discreta: <code>plt.grid(True, alpha=.3)</code>.",
 porque:{
  "<code>plt.title(...)</code>, <code>plt.label(...)</code> y <code>plt.lines(True)</code>":"<code>plt.label</code> y <code>plt.lines</code> no existen.",
  "<code>plt.legend(...)</code> y <code>plt.grid(True)</code>":"La leyenda identifica series; no reemplaza el título ni las etiquetas de ejes.",
  "<code>plt.suptitle(...)</code>, <code>plt.set_xlabel(...)</code> y <code>plt.axis('on')</code>":"<code>set_xlabel</code> es del <code>Axes</code>, no de <code>plt</code>, y <code>axis('on')</code> no dibuja cuadrícula."
 }
},
{
 id:"pA-12", clase:5, ej:"A · Ej 3", tema:"Matplotlib", nivel:"baja",
 caso:"<b>Ejercicio 3.</b> Tarea 11: destacar la evolución semanal con color azul.",
 pide:"¿Dónde va el color?",
 ops:[
  "Como parámetro del trazado: <code>plt.plot(dias, visitas, marker='o', color='blue')</code>",
  "<code>plt.color('blue')</code> después del <code>plot</code>",
  "<code>plt.grid(color='blue')</code>",
  "<code>plt.style.use('blue')</code>"
 ],
 aprendido:"El color es un parámetro de la función que dibuja: <code>color='blue'</code> (también valen <code>'b'</code> o un hexadecimal como <code>'#1f77b4'</code>). Se puede combinar con <code>linewidth=</code> y <code>linestyle=</code>. En barras es exactamente igual: <code>plt.bar(..., color=…)</code>.",
 porque:{
  "<code>plt.color('blue')</code> después del <code>plot</code>":"<code>plt.color()</code> no existe.",
  "<code>plt.grid(color='blue')</code>":"Pinta la cuadrícula de azul, no la línea de datos.",
  "<code>plt.style.use('blue')</code>":"<code>style.use</code> aplica temas completos (<code>'ggplot'</code>, <code>'seaborn-v0_8'</code>), no colores sueltos."
 }
},
{
 id:"pA-13", clase:5, ej:"A · Ej 3", tema:"Matplotlib", nivel:"baja",
 caso:"<b>Ejercicio 3.</b> Tarea 12: mostrar el gráfico, cuidando que las etiquetas no queden recortadas.",
 pide:"¿Cómo cerrás el bloque?",
 ops:[
  "<code>plt.tight_layout()</code> y después <code>plt.show()</code>",
  "Solo <code>plt.show()</code>",
  "<code>plt.close()</code>",
  "<code>plt.draw()</code>"
 ],
 aprendido:"<code>plt.show()</code> presenta la figura. <code>plt.tight_layout()</code> justo antes ajusta los márgenes para que no se corten títulos ni etiquetas: aparece en todos los ejemplos de la cursada. Y si además hay que guardar, <code>plt.savefig()</code> va <b>antes</b> de <code>show()</code>.",
 porque:{
  "Solo <code>plt.show()</code>":"Muestra el gráfico, pero si las etiquetas se superponen el <code>tight_layout()</code> lo resuelve.",
  "<code>plt.close()</code>":"Cierra la figura sin mostrarla.",
  "<code>plt.draw()</code>":"Redibuja en modo interactivo; no abre la ventana como <code>show()</code>."
 }
}

]},

{ n:2, letra:"B", titulo:"Examen simulado · 1er parcial — B", disponible:true, preguntas:[

/* === B · Ejercicio 1. DataFrame de estudiantes === */
{
 id:"pB-01", clase:3, ej:"B · Ej 1", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 1 — DataFrame de estudiantes.</b> Tarea 1: crear el DataFrame con Pandas a partir de la tabla requerida.",
 codigo:"| Legajo | Nombre | Parcial1 | Parcial2 | Asistencia |\n|  1001  | Ana    |    8     |    7     |     90     |\n|  1002  | Bruno  |    6     |    5     |     75     |\n|  1003  | Carla  |    9     |   10     |     95     |",
 pide:"¿Cómo lo construís?",
 ops:[
  "<code>df = pd.DataFrame({'Legajo':[1001,1002,...], 'Nombre':['Ana','Bruno',...], ...})</code>",
  "<code>df = pd.DataFrame([1001, 'Ana', 8, 7, 90])</code>",
  "<code>df = pd.Series({'Legajo':1001, 'Nombre':'Ana'})</code>",
  "<code>df = pd.read_csv(tabla)</code>"
 ],
 aprendido:"El patrón más usado: un <b>diccionario donde cada clave es una columna y cada valor es la lista de sus datos</b>. Todas las listas tienen que tener el mismo largo. La alternativa equivalente es una lista de diccionarios (una fila por diccionario), que también acepta <code>pd.DataFrame()</code>.",
 porque:{
  "<code>df = pd.DataFrame([1001, 'Ana', 8, 7, 90])</code>":"Crea una sola columna de 5 filas con valores mezclados.",
  "<code>df = pd.Series({'Legajo':1001, 'Nombre':'Ana'})</code>":"Una Series es unidimensional: no arma una tabla.",
  "<code>df = pd.read_csv(tabla)</code>":"No hay ningún archivo: los datos están dados en el enunciado."
 }
},
{
 id:"pB-02", clase:3, ej:"B · Ej 1", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 2: crear la columna <code>Promedio</code> a partir de <code>Parcial1</code> y <code>Parcial2</code>.",
 pide:"¿Cómo la calculás?",
 ops:[
  "<code>df['Promedio'] = (df['Parcial1'] + df['Parcial2']) / 2</code>",
  "<code>df['Promedio'] = df.mean()</code>",
  "<code>df['Promedio'] = np.mean(df['Parcial1'], df['Parcial2'])</code>",
  "<code>df['Promedio'] = df['Parcial1'].mean()</code>"
 ],
 aprendido:"Las operaciones entre columnas son <b>vectorizadas</b>: se aplican fila por fila automáticamente. La forma equivalente con varias notas es <code>df[['Parcial1','Parcial2']].mean(axis=1)</code>, donde <b><code>axis=1</code></b> significa “promediar a lo ancho de cada fila”.",
 porque:{
  "<code>df['Promedio'] = df.mean()</code>":"Sin <code>axis=1</code> promedia <b>cada columna</b> a lo largo de todas las filas, y encima incluiría Legajo y Asistencia.",
  "<code>df['Promedio'] = np.mean(df['Parcial1'], df['Parcial2'])</code>":"El segundo argumento de <code>np.mean</code> es el eje, no una segunda serie.",
  "<code>df['Promedio'] = df['Parcial1'].mean()</code>":"Calcula el promedio general del primer parcial y lo repite en todas las filas."
 }
},
{
 id:"pB-03", clase:3, ej:"B · Ej 1", tema:"NumPy + Pandas", nivel:"media",
 caso:"<b>Ejercicio 1.</b> Tarea 3: crear la columna <code>Estado</code> con “Aprueba” si <code>Promedio &gt;= 6</code> <b>y</b> <code>Asistencia &gt;= 75</code>; en otro caso, “Revisa”.",
 pide:"¿Cómo la generás?",
 ops:[
  "<code>df['Estado'] = np.where((df['Promedio'] &gt;= 6) &amp; (df['Asistencia'] &gt;= 75), 'Aprueba', 'Revisa')</code>",
  "<code>df['Estado'] = np.where(df['Promedio'] &gt;= 6 and df['Asistencia'] &gt;= 75, 'Aprueba', 'Revisa')</code>",
  "<code>df['Estado'] = np.select((df['Promedio'] &gt;= 6), 'Aprueba')</code>",
  "<code>if df['Promedio'] &gt;= 6: df['Estado'] = 'Aprueba'</code>"
 ],
 aprendido:"Dos resultados posibles → <b><code>np.where(condición, si_true, si_false)</code></b>. Como hay <b>dos condiciones que deben cumplirse a la vez</b>, se combinan con <code>&amp;</code> y cada una va entre paréntesis. Si hubiera tres o más categorías, iría <code>np.select</code> con listas de condiciones y opciones.",
 porque:{
  "<code>df['Estado'] = np.where(df['Promedio'] &gt;= 6 and df['Asistencia'] &gt;= 75, 'Aprueba', 'Revisa')</code>":"<code>and</code> no funciona sobre Series: lanza el error de valor de verdad ambiguo.",
  "<code>df['Estado'] = np.select((df['Promedio'] &gt;= 6), 'Aprueba')</code>":"<code>np.select</code> necesita <b>listas</b> de condiciones y de opciones, y además falta la condición de asistencia y el valor por defecto.",
  "<code>if df['Promedio'] &gt;= 6: df['Estado'] = 'Aprueba'</code>":"Un <code>if</code> de Python no puede evaluar una Series entera."
 }
},
{
 id:"pB-04", clase:3, ej:"B · Ej 1", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 4: mostrar solamente <code>Nombre</code>, <code>Promedio</code> y <code>Estado</code>.",
 pide:"¿Cómo lo mostrás?",
 ops:[
  "<code>print(df[['Nombre', 'Promedio', 'Estado']])</code>",
  "<code>print(df['Nombre', 'Promedio', 'Estado'])</code>",
  "<code>print(df.Nombre, df.Promedio, df.Estado)</code>",
  "<code>print(df.head(3))</code>"
 ],
 aprendido:"De nuevo la lista de columnas entre dobles corchetes: devuelve un DataFrame con esas tres columnas y se imprime como una tabla prolija. Es el cierre típico de todo ejercicio: quedarse con las columnas pertinentes antes de mostrar.",
 porque:{
  "<code>print(df['Nombre', 'Promedio', 'Estado'])</code>":"Faltan los corchetes de la lista: <code>KeyError</code>.",
  "<code>print(df.Nombre, df.Promedio, df.Estado)</code>":"Imprime tres Series sueltas, una debajo de otra, no una tabla.",
  "<code>print(df.head(3))</code>":"Muestra las 3 primeras <b>filas</b> con todas las columnas."
 }
},

/* === B · Ejercicio 2. Lectura y transformación de pedidos JSON === */
{
 id:"pB-05", clase:4, ej:"B · Ej 2", tema:"Pandas · E/S", nivel:"media",
 caso:"<b>Ejercicio 2 — Pedidos JSON.</b> Tarea 5: cargar <code>pedidos.json</code>, que es una lista de objetos planos.",
 codigo:"[\n  {\"pedido\": 501, \"cliente\": \"Ana\",   \"estado\": \"entregado\", \"importe\": \"12500.50\"},\n  {\"pedido\": 502, \"cliente\": \"Bruno\", \"estado\": \"pendiente\", \"importe\": \"8300.00\"}\n]",
 pide:"¿Cómo lo cargás a un DataFrame?",
 ops:[
  "<code>df = pd.read_json('pedidos.json')</code>",
  "<code>df = pd.read_csv('pedidos.json')</code>",
  "<code>df = json.load('pedidos.json')</code>",
  "<code>df = pd.json_normalize('pedidos.json')</code>"
 ],
 aprendido:"<code>pd.read_json()</code> con una <b>lista de objetos planos</b> arma directamente el DataFrame: cada objeto es una fila y cada clave una columna. La alternativa manual es <code>json.load(f)</code> (que devuelve una lista de diccionarios) y después <code>pd.DataFrame(datos)</code>. <code>json_normalize</code> se reserva para JSON <b>anidado</b>.",
 porque:{
  "<code>df = pd.read_csv('pedidos.json')</code>":"JSON no es texto separado por comas.",
  "<code>df = json.load('pedidos.json')</code>":"<code>json.load</code> recibe un <b>objeto archivo</b> abierto, no una ruta en texto; y devuelve una lista, no un DataFrame.",
  "<code>df = pd.json_normalize('pedidos.json')</code>":"Recibe los datos ya cargados en memoria, no un nombre de archivo; además acá no hay anidamiento."
 }
},
{
 id:"pB-06", clase:4, ej:"B · Ej 2", tema:"Limpieza", nivel:"media",
 caso:"<b>Ejercicio 2.</b> Tarea 6: los importes vienen como texto (<code>\"12500.50\"</code>). Convertirlos a número decimal.",
 pide:"¿Cómo los convertís?",
 ops:[
  "<code>df['importe'] = pd.to_numeric(df['importe'], errors='coerce')</code>",
  "<code>df['importe'] = int(df['importe'])</code>",
  "<code>df['importe'] = df['importe'].astype(int)</code>",
  "<code>df['importe'] = float(df['importe'])</code>"
 ],
 aprendido:"<code>pd.to_numeric()</code> con <b><code>errors='coerce'</code></b> convierte y deja en <code>NaN</code> lo que no se pueda parsear, en vez de cortar el programa. <code>df['importe'].astype(float)</code> también funcionaría con estos datos limpios, pero explota ante el primer valor raro: por eso <code>to_numeric</code> es la opción defensiva que enseña la cursada.",
 porque:{
  "<code>df['importe'] = int(df['importe'])</code>":"<code>int()</code> no opera sobre una Series completa.",
  "<code>df['importe'] = df['importe'].astype(int)</code>":"Además de fallar con el texto, <code>int</code> trunca los decimales: perderías los centavos.",
  "<code>df['importe'] = float(df['importe'])</code>":"Igual que <code>int()</code>: no funciona sobre una Series."
 }
},
{
 id:"pB-07", clase:4, ej:"B · Ej 2", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 2.</b> Tarea 7: filtrar los pedidos entregados.",
 pide:"¿Cómo los filtrás?",
 ops:[
  "<code>entregados = df[df['estado'] == 'entregado']</code>",
  "<code>entregados = df['estado'] == 'entregado'</code>",
  "<code>entregados = df.loc['entregado']</code>",
  "<code>entregados = df[df['estado'] = 'entregado']</code>"
 ],
 aprendido:"El filtrado tiene dos pasos que conviene ver por separado: <code>df['estado'] == 'entregado'</code> genera la <b>máscara booleana</b>, y recién al ponerla entre corchetes (<code>df[máscara]</code>) obtenés las filas. Es el mismo mecanismo que las máscaras de NumPy.",
 porque:{
  "<code>entregados = df['estado'] == 'entregado'</code>":"Te queda solo la máscara de True/False, no las filas.",
  "<code>entregados = df.loc['entregado']</code>":"<code>loc</code> busca una <b>etiqueta de índice</b>, no un valor dentro de una columna.",
  "<code>entregados = df[df['estado'] = 'entregado']</code>":"Un solo <code>=</code> es asignación: error de sintaxis. La comparación es <code>==</code>."
 }
},
{
 id:"pB-08", clase:4, ej:"B · Ej 2", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 2.</b> Tarea 8: calcular el total entregado.",
 pide:"¿Cómo lo calculás?",
 ops:[
  "<code>total = entregados['importe'].sum()</code>",
  "<code>total = entregados.sum()</code>",
  "<code>total = entregados['importe'].count()</code>",
  "<code>total = len(entregados)</code>"
 ],
 aprendido:"<code>.sum()</code> aplicado a <b>una columna</b> devuelve el total de esa columna. Si lo aplicás al DataFrame entero, Pandas suma todas las columnas numéricas (incluido el número de pedido, que no tiene sentido sumar) y hasta concatena los textos.",
 porque:{
  "<code>total = entregados.sum()</code>":"Suma todas las columnas: te devuelve una Series, no el total de importes.",
  "<code>total = entregados['importe'].count()</code>":"<code>count()</code> cuenta valores no nulos, no los suma.",
  "<code>total = len(entregados)</code>":"Cuenta cuántos pedidos hay entregados."
 }
},
{
 id:"pB-09", clase:4, ej:"B · Ej 2", tema:"Pandas · E/S", nivel:"media",
 caso:"<b>Ejercicio 2.</b> Tarea 9: exportar los pedidos entregados como <code>entregados.csv</code>.",
 pide:"¿Cómo lo exportás?",
 ops:[
  "<code>entregados.to_csv('entregados.csv', index=False)</code>",
  "<code>entregados.to_excel('entregados.csv', index=False)</code>",
  "<code>entregados.to_json('entregados.csv')</code>",
  "<code>entregados.to_csv('entregados.csv', index=True)</code>"
 ],
 aprendido:"Ojo con el enunciado: dice “exportar a Excel como <code>entregados.csv</code>”, pero el <b>nombre del archivo manda</b>. La extensión <code>.csv</code> pide <code>to_csv()</code>; si de verdad quisieran un libro de Excel, el archivo tendría que llamarse <code>entregados.xlsx</code> y ahí sí iría <code>to_excel(..., index=False, engine='openpyxl')</code>. En ambos casos, <code>index=False</code>.",
 porque:{
  "<code>entregados.to_excel('entregados.csv', index=False)</code>":"Escribe un binario de Excel con extensión <code>.csv</code>: ningún programa lo abre bien.",
  "<code>entregados.to_json('entregados.csv')</code>":"Formato equivocado para la extensión pedida.",
  "<code>entregados.to_csv('entregados.csv', index=True)</code>":"Agrega la columna de índice, que nadie pidió."
 }
},

/* === B · Ejercicio 3. Barras de ventas por categoría === */
{
 id:"pB-10", clase:5, ej:"B · Ej 3", tema:"Matplotlib", nivel:"baja",
 caso:"<b>Ejercicio 3 — Barras de ventas por categoría.</b> Tarea 10: crear un gráfico de barras <b>verticales</b>.",
 codigo:"categorias = [\"Libros\", \"Tecnología\", \"Hogar\", \"Deportes\", \"Moda\"]\nventas = [85, 140, 110, 95, 125]",
 pide:"¿Qué función usás?",
 ops:[
  "<code>plt.bar(categorias, ventas)</code>",
  "<code>plt.barh(categorias, ventas)</code>",
  "<code>plt.hist(ventas)</code>",
  "<code>plt.plot(categorias, ventas)</code>"
 ],
 aprendido:"<b><code>bar</code> = barras verticales</b> (la categoría va en x y el valor en y); <b><code>barh</code> = horizontales</b>, útiles cuando las etiquetas son largas. Las barras comparan magnitudes entre categorías y el eje cuantitativo debe arrancar en cero.",
 porque:{
  "<code>plt.barh(categorias, ventas)</code>":"Dibuja barras <b>horizontales</b>: la consigna pide verticales.",
  "<code>plt.hist(ventas)</code>":"El histograma agrupa una variable continua en intervalos; acá las categorías ya están dadas.",
  "<code>plt.plot(categorias, ventas)</code>":"Une con una línea categorías sin orden natural, sugiriendo valores intermedios inexistentes."
 }
},
{
 id:"pB-11", clase:5, ej:"B · Ej 3", tema:"Matplotlib", nivel:"media",
 caso:"<b>Ejercicio 3.</b> Tarea 12: mostrar el valor numérico encima de cada barra.",
 pide:"¿Cuál es la forma directa en Matplotlib?",
 ops:[
  "<code>barras = plt.bar(categorias, ventas)</code> y después <code>plt.bar_label(barras)</code>",
  "<code>plt.legend(ventas)</code>",
  "<code>plt.annotate(ventas)</code>",
  "<code>plt.bar(categorias, ventas, label=ventas)</code>"
 ],
 aprendido:"<code>plt.bar()</code> <b>devuelve</b> el contenedor de las barras; pasándoselo a <b><code>plt.bar_label(barras)</code></b> Matplotlib escribe el valor de cada una automáticamente. Se puede formatear con <code>fmt='%.0f'</code> y separar del borde con <code>padding=3</code>. Es lo que la cursada llama “valores visibles”.",
 porque:{
  "<code>plt.legend(ventas)</code>":"La leyenda va en un recuadro aparte e identifica series enteras.",
  "<code>plt.annotate(ventas)</code>":"<code>annotate</code> escribe <b>un</b> texto en <b>una</b> coordenada; para hacerlo así habría que recorrer las barras a mano.",
  "<code>plt.bar(categorias, ventas, label=ventas)</code>":"<code>label</code> nombra la serie para la leyenda; no dibuja nada sobre las barras."
 }
},
{
 id:"pB-12", clase:5, ej:"B · Ej 3", tema:"Matplotlib", nivel:"alta",
 caso:"<b>Ejercicio 3.</b> Tarea 13: usar un color diferente para la barra de mayor venta (Tecnología, con 140).",
 pide:"¿Cómo lo resolvés?",
 ops:[
  "Armar una lista de colores condicional y pasarla a <code>color=</code>: <code>colores = ['crimson' if v == max(ventas) else 'steelblue' for v in ventas]</code>",
  "<code>plt.bar(categorias, ventas, color='crimson')</code>",
  "<code>plt.bar(max(ventas), color='crimson')</code>",
  "<code>plt.highlight(ventas.index(max(ventas)))</code>"
 ],
 aprendido:"<b><code>color=</code> acepta una lista con un color por barra</b>. La lista se arma comparando cada valor con el máximo: en Matplotlib puro con una comprensión de lista, y si venís de un DataFrame, con <code>np.where(ventas == ventas.max(), 'crimson', 'steelblue')</code>. Es el mismo criterio de la cursada: reservar el color de acento para el hallazgo.",
 porque:{
  "<code>plt.bar(categorias, ventas, color='crimson')</code>":"Pinta <b>todas</b> las barras del mismo color: no destaca ninguna.",
  "<code>plt.bar(max(ventas), color='crimson')</code>":"Dibujaría una sola barra en la posición x=140, encimada al resto del gráfico.",
  "<code>plt.highlight(ventas.index(max(ventas)))</code>":"<code>plt.highlight()</code> no existe en Matplotlib."
 }
},
{
 id:"pB-13", clase:5, ej:"B · Ej 3", tema:"Matplotlib", nivel:"baja",
 caso:"<b>Ejercicio 3.</b> Tarea 11: “agregar título y etiquetas sugeridos por usted”. Te toca redactarlos.",
 pide:"¿Qué título elegirías, según el criterio de la cursada?",
 ops:[
  "<code>plt.title('Tecnología lidera las ventas del período')</code> — el título enuncia la conclusión",
  "<code>plt.title('Ventas')</code>",
  "<code>plt.title('Gráfico de barras')</code>",
  "Dejar la figura sin título y explicarlo de palabra"
 ],
 aprendido:"Criterio explícito de la clase de Matplotlib: <b>“Ventas” informa poco; el título puede enunciar la conclusión, no solo el tema</b>. Y las etiquetas de eje deben nombrar la variable <b>con su unidad</b>: <code>plt.xlabel('Categoría')</code>, <code>plt.ylabel('Ventas (unidades)')</code>. Criterio de éxito: que otra persona entienda el mensaje sin leer el código.",
 porque:{
  "<code>plt.title('Ventas')</code>":"Es el ejemplo literal de “título genérico” que la clase marca como error frecuente.",
  "<code>plt.title('Gráfico de barras')</code>":"Describe la técnica, no el hallazgo: eso ya se ve mirando la figura.",
  "Dejar la figura sin título y explicarlo de palabra":"El gráfico tiene que sostenerse solo; además la consigna pide el título."
 }
}

]},

{ n:3, letra:"C", titulo:"Examen simulado · 1er parcial — C", disponible:true, preguntas:[

/* === C · Ejercicio 1. Análisis de ventas por vendedor === */
{
 id:"pC-01", clase:4, ej:"C · Ej 1", tema:"Limpieza", nivel:"media",
 caso:"<b>Ejercicio 1 — Ventas por vendedor.</b> Tarea 1: creado el DataFrame, hay que convertir <code>Fecha</code> a <code>datetime</code>.",
 codigo:"| Fecha      | Vendedor | Región | Producto | Unidades | Precio |\n| 2026-03-01 | Lucía    | Norte  | Router   |    3     |  85000 |\n| 2026-03-02 | Mateo    | Centro | Switch   |    4     |  62000 |",
 pide:"¿Cómo la convertís?",
 ops:[
  "<code>df['Fecha'] = pd.to_datetime(df['Fecha'])</code>",
  "<code>df['Fecha'] = df['Fecha'].astype('datetime')</code>",
  "<code>df['Fecha'] = datetime(df['Fecha'])</code>",
  "<code>df['Fecha'] = pd.to_numeric(df['Fecha'])</code>"
 ],
 aprendido:"<code>pd.to_datetime()</code> pasa texto a fecha real, y recién ahí podés extraer año, mes o día (<code>df['Fecha'].dt.month</code>), ordenar cronológicamente o calcular duraciones. Parámetros útiles: <code>errors='coerce'</code> para que lo inválido quede <code>NaT</code>, y <code>dayfirst=True</code> cuando el formato es dd/mm/aaaa.",
 porque:{
  "<code>df['Fecha'] = df['Fecha'].astype('datetime')</code>":"No es un tipo válido; sería <code>'datetime64[ns]'</code>, y aun así <code>to_datetime</code> es lo idiomático porque parsea formatos.",
  "<code>df['Fecha'] = datetime(df['Fecha'])</code>":"<code>datetime()</code> del módulo estándar construye una fecha desde año, mes y día, no desde una Series.",
  "<code>df['Fecha'] = pd.to_numeric(df['Fecha'])</code>":"Convertiría a número: con <code>errors='coerce'</code> te dejaría toda la columna en <code>NaN</code>."
 }
},
{
 id:"pC-02", clase:3, ej:"C · Ej 1", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 2: crear la columna <code>Importe = Unidades × Precio</code>.",
 pide:"¿Cómo la creás?",
 ops:[
  "<code>df['Importe'] = df['Unidades'] * df['Precio']</code>",
  "<code>df['Importe'] = df['Unidades'].sum() * df['Precio'].sum()</code>",
  "<code>df['Importe'] = df.apply(lambda f: f['Unidades'] * f['Precio'])</code>",
  "<code>df['Importe'] = np.dot(df['Unidades'], df['Precio'])</code>"
 ],
 aprendido:"Multiplicar dos columnas es una operación vectorizada: Pandas alinea por índice y calcula fila por fila sin ciclos. Es el paso que se repite en casi todos los prácticos (<code>cantidad * precio</code>, <code>margen * cantidad</code>) y siempre se resuelve igual.",
 porque:{
  "<code>df['Importe'] = df['Unidades'].sum() * df['Precio'].sum()</code>":"Multiplica dos totales y repite ese número en todas las filas.",
  "<code>df['Importe'] = df.apply(lambda f: f['Unidades'] * f['Precio'])</code>":"Sin <code>axis=1</code> no recorre filas, y aun corregido sería mucho más lento que la multiplicación directa.",
  "<code>df['Importe'] = np.dot(df['Unidades'], df['Precio'])</code>":"El producto punto devuelve un único escalar."
 }
},
{
 id:"pC-03", clase:3, ej:"C · Ej 1", tema:"Pandas", nivel:"media",
 caso:"<b>Ejercicio 1.</b> Tarea 3: obtener el importe total por vendedor <b>con groupby</b>.",
 pide:"¿Cómo lo escribís?",
 ops:[
  "<code>df.groupby('Vendedor', as_index=False)['Importe'].sum()</code>",
  "<code>df.groupby('Vendedor').sum()</code>",
  "<code>df['Importe'].sum()</code>",
  "<code>df.sort_values('Vendedor')['Importe'].sum()</code>"
 ],
 aprendido:"El patrón completo de <code>groupby</code>: <b>agrupar por → elegir la columna → aplicar la métrica</b>. <code>as_index=False</code> deja <code>Vendedor</code> como columna normal en vez de convertirla en índice, cosa que facilita graficar o exportar después.",
 porque:{
  "<code>df.groupby('Vendedor').sum()</code>":"Suma <b>todas</b> las columnas numéricas: te mezcla Unidades y Precio con Importe.",
  "<code>df['Importe'].sum()</code>":"Da el total general de la empresa, no el de cada vendedor.",
  "<code>df.sort_values('Vendedor')['Importe'].sum()</code>":"Ordenar no agrupa: sigue sumando todo junto."
 }
},
{
 id:"pC-04", clase:3, ej:"C · Ej 1", tema:"Pandas", nivel:"media",
 caso:"<b>Ejercicio 1.</b> Tarea 4: obtener las unidades totales por producto y ordenarlas <b>de mayor a menor</b>.",
 pide:"¿Cómo encadenás las operaciones?",
 ops:[
  "<code>df.groupby('Producto')['Unidades'].sum().sort_values(ascending=False)</code>",
  "<code>df.groupby('Producto')['Unidades'].sum().sort_index()</code>",
  "<code>df.sort_values('Unidades', ascending=False).groupby('Producto').sum()</code>",
  "<code>df.groupby('Producto')['Unidades'].sum().sort_values()</code>"
 ],
 aprendido:"Los métodos de Pandas se <b>encadenan</b>: cada uno devuelve un objeto nuevo sobre el que seguís operando. <code>sort_values()</code> ordena por <b>valor</b> y por defecto es ascendente, así que “de mayor a menor” exige <b><code>ascending=False</code></b>. <code>sort_index()</code>, en cambio, ordena por la etiqueta (acá, alfabéticamente por producto).",
 porque:{
  "<code>df.groupby('Producto')['Unidades'].sum().sort_index()</code>":"Ordena alfabéticamente por nombre de producto, no por cantidad.",
  "<code>df.sort_values('Unidades', ascending=False).groupby('Producto').sum()</code>":"Ordenar antes de agrupar no sirve: <code>groupby</code> reordena el resultado por la clave.",
  "<code>df.groupby('Producto')['Unidades'].sum().sort_values()</code>":"Sin <code>ascending=False</code> ordena de menor a mayor."
 }
},
{
 id:"pC-05", clase:3, ej:"C · Ej 1", tema:"Pandas", nivel:"media",
 caso:"<b>Ejercicio 1.</b> Tarea 5: identificar <b>la venta individual</b> de mayor importe, con todos sus datos (fecha, vendedor, región, producto).",
 pide:"¿Cómo la obtenés?",
 ops:[
  "<code>df.loc[df['Importe'].idxmax()]</code>",
  "<code>df['Importe'].max()</code>",
  "<code>df.groupby('Vendedor')['Importe'].max()</code>",
  "<code>df.sort_values('Importe').head(1)</code>"
 ],
 aprendido:"<b><code>idxmax()</code> devuelve la etiqueta de índice de la fila con el valor máximo</b>, y <code>.loc[]</code> trae esa fila entera. Es el patrón para “identificar el registro de mayor X”, que se repite en los prácticos como “el pedido de mayor importe” o “el estudiante con mejor nota”.",
 porque:{
  "<code>df['Importe'].max()</code>":"Devuelve el número más alto, pero no te dice de qué venta se trata.",
  "<code>df.groupby('Vendedor')['Importe'].max()</code>":"Da el máximo de cada vendedor: es otra pregunta.",
  "<code>df.sort_values('Importe').head(1)</code>":"Sin <code>ascending=False</code> te devuelve la venta <b>más chica</b>."
 }
},

/* === C · Ejercicio 10. Concatenación de ventas mensuales === */
{
 id:"pC-06", clase:4, ej:"C · Ej 10", tema:"Pandas · E/S", nivel:"media",
 caso:"<b>Ejercicio 10 — Concatenación de ventas mensuales.</b> Tarea 6: cargar ambos CSV y agregar a cada uno una columna <code>mes</code>.",
 codigo:"ventas_enero.csv    →  fecha,sucursal,producto,unidades\nventas_febrero.csv  →  fecha,sucursal,producto,unidades",
 pide:"¿Cómo lo hacés?",
 ops:[
  "<code>enero = pd.read_csv('ventas_enero.csv'); enero['mes'] = 'Enero'</code> (ídem febrero)",
  "<code>enero = pd.read_csv('ventas_enero.csv', mes='Enero')</code>",
  "<code>enero['mes'].append('Enero')</code>",
  "<code>enero = pd.read_csv('ventas_enero.csv').insert('mes')</code>"
 ],
 aprendido:"Asignar un <b>valor escalar</b> a una columna nueva lo replica en todas las filas: <code>df['mes'] = 'Enero'</code>. Es exactamente el mismo paso que en los prácticos de la cursada aparece como <code>ventas_centro['sede'] = 'Centro'</code>. Sirve para no perder el origen cuando después se concatenan las tablas.",
 porque:{
  "<code>enero = pd.read_csv('ventas_enero.csv', mes='Enero')</code>":"<code>read_csv</code> no tiene un parámetro <code>mes</code>.",
  "<code>enero['mes'].append('Enero')</code>":"La columna todavía no existe: <code>KeyError</code>. Y <code>append</code> sobre Series está eliminado en Pandas 2.",
  "<code>enero = pd.read_csv('ventas_enero.csv').insert('mes')</code>":"<code>insert()</code> necesita posición, nombre y valor, y además devuelve <code>None</code>."
 }
},
{
 id:"pC-07", clase:4, ej:"C · Ej 10", tema:"Integración", nivel:"media",
 caso:"<b>Ejercicio 10.</b> Tarea 7: concatenar verticalmente ambos DataFrames en uno solo, con un índice continuo.",
 pide:"¿<code>concat</code> o <code>merge</code>?",
 ops:[
  "<code>ventas = pd.concat([enero, febrero], ignore_index=True)</code>",
  "<code>ventas = enero.merge(febrero, on='producto', how='outer')</code>",
  "<code>ventas = pd.concat([enero, febrero], axis=1)</code>",
  "<code>ventas = enero.join(febrero)</code>"
 ],
 aprendido:"Regla de la clase: <b>misma estructura → <code>concat</code>; entidades relacionadas → <code>merge</code></b>. Enero y febrero tienen exactamente las mismas columnas, así que se apilan. <code>axis=0</code> (el valor por defecto) agrega filas, e <b><code>ignore_index=True</code></b> reconstruye el índice 0,1,2… en lugar de repetir 0,1,2 / 0,1,2.",
 porque:{
  "<code>ventas = enero.merge(febrero, on='producto', how='outer')</code>":"<code>merge</code> cruza por clave: acá multiplicaría filas y armaría combinaciones que no existen.",
  "<code>ventas = pd.concat([enero, febrero], axis=1)</code>":"<code>axis=1</code> pega las tablas <b>al costado</b>, duplicando los nombres de columna.",
  "<code>ventas = enero.join(febrero)</code>":"<code>join</code> une por índice y agrega columnas, no filas."
 }
},
{
 id:"pC-08", clase:4, ej:"C · Ej 10", tema:"Pandas", nivel:"media",
 caso:"<b>Ejercicio 10.</b> Tarea 9: calcular las unidades por <b>sucursal y producto</b> mediante groupby.",
 pide:"¿Cómo agrupás por dos columnas?",
 ops:[
  "<code>ventas.groupby(['sucursal', 'producto'], as_index=False)['unidades'].sum()</code>",
  "<code>ventas.groupby('sucursal', 'producto')['unidades'].sum()</code>",
  "<code>ventas.groupby('sucursal')['unidades'].sum().groupby('producto').sum()</code>",
  "<code>ventas.groupby('sucursal + producto')['unidades'].sum()</code>"
 ],
 aprendido:"Para agrupar por más de una columna se pasa una <b>lista</b>: <code>groupby(['sucursal','producto'])</code>. El resultado tiene una fila por combinación existente. Si además quisieras la grilla sucursales × productos para comparar de un vistazo, ahí va <code>pd.pivot_table(ventas, values='unidades', index='sucursal', columns='producto', aggfunc='sum')</code>.",
 porque:{
  "<code>ventas.groupby('sucursal', 'producto')['unidades'].sum()</code>":"El segundo argumento posicional de <code>groupby</code> es <code>axis</code>, no otra clave: hay que pasar la lista.",
  "<code>ventas.groupby('sucursal')['unidades'].sum().groupby('producto').sum()</code>":"Tras el primer <code>groupby</code> ya perdiste la columna <code>producto</code>.",
  "<code>ventas.groupby('sucursal + producto')['unidades'].sum()</code>":"Busca una columna literalmente llamada así: <code>KeyError</code>."
 }
},
{
 id:"pC-09", clase:4, ej:"C · Ej 10", tema:"Pandas · E/S", nivel:"media",
 caso:"<b>Ejercicio 10.</b> Tarea 10: exportar el consolidado a <code>consolidado_ventas.csv</code> y también a <code>ventas.json</code>.",
 pide:"¿Qué dos llamadas usás?",
 ops:[
  "<code>ventas.to_csv('consolidado_ventas.csv', index=False)</code> y <code>ventas.to_json('ventas.json', orient='records', indent=2)</code>",
  "<code>ventas.to_csv(...)</code> y <code>json.dump(ventas, open('ventas.json','w'))</code>",
  "<code>ventas.to_csv(...)</code> y <code>ventas.to_sql('ventas.json')</code>",
  "<code>ventas.write_csv(...)</code> y <code>ventas.write_json(...)</code>"
 ],
 aprendido:"El mismo DataFrame se publica a varios destinos: <code>to_csv</code>, <code>to_excel</code>, <code>to_sql</code> y <code>to_json</code>, siempre con parámetros explícitos. En JSON, <b><code>orient='records'</code></b> genera un objeto por fila (el formato que espera cualquier API) e <code>indent=2</code> lo deja legible.",
 porque:{
  "<code>ventas.to_csv(...)</code> y <code>json.dump(ventas, open('ventas.json','w'))</code>":"<code>json.dump</code> no sabe serializar un DataFrame: lanza <code>TypeError</code>.",
  "<code>ventas.to_csv(...)</code> y <code>ventas.to_sql('ventas.json')</code>":"<code>to_sql</code> escribe en una base de datos y necesita una conexión.",
  "<code>ventas.write_csv(...)</code> y <code>ventas.write_json(...)</code>":"Esos métodos no existen en Pandas (son de Polars)."
 }
},

/* === C · Ejercicio 13. Gráfico de líneas === */
{
 id:"pC-10", clase:5, ej:"C · Ej 13", tema:"Matplotlib", nivel:"baja",
 caso:"<b>Ejercicio 13 — Gráfico de líneas.</b> Tareas 11 a 14: línea con marcadores, título, etiquetas, cuadrícula, color azul y mostrar.",
 codigo:"meses = [\"Ene\", \"Feb\", \"Mar\", \"Abr\", \"May\", \"Jun\"]\nventas = [130, 142, 148, 165, 185, 205]",
 pide:"¿Cuál es el bloque completo y correcto?",
 ops:[
  "<code>plt.plot(meses, ventas, marker='o', color='blue')</code> + <code>plt.title/xlabel/ylabel</code> + <code>plt.grid(True, alpha=.3)</code> + <code>plt.tight_layout()</code> + <code>plt.show()</code>",
  "<code>plt.plot(meses, ventas)</code> + <code>plt.show()</code>",
  "<code>plt.bar(meses, ventas, color='blue')</code> + <code>plt.grid(True)</code> + <code>plt.show()</code>",
  "<code>plt.scatter(meses, ventas, color='blue')</code> + <code>plt.legend()</code> + <code>plt.show()</code>"
 ],
 aprendido:"Las cuatro tareas se resuelven en un bloque: <code>plot</code> con <code>marker</code> y <code>color</code>, los tres rótulos, la cuadrícula y el <code>show()</code> al final. Es exactamente el mismo ejercicio que el modelo A pero con datos mensuales: si lo tenés automatizado, ganás tiempo para los otros dos.",
 porque:{
  "<code>plt.plot(meses, ventas)</code> + <code>plt.show()</code>":"Faltan marcadores, color, título, etiquetas y cuadrícula: cuatro tareas sin hacer.",
  "<code>plt.bar(meses, ventas, color='blue')</code> + <code>plt.grid(True)</code> + <code>plt.show()</code>":"Son barras, y la consigna pide líneas.",
  "<code>plt.scatter(meses, ventas, color='blue')</code> + <code>plt.legend()</code> + <code>plt.show()</code>":"La dispersión no traza la línea de evolución, y la leyenda no reemplaza título ni etiquetas."
 }
},
{
 id:"pC-11", clase:5, ej:"C · Ej 13", tema:"Interpretación", nivel:"media",
 caso:"<b>Ejercicio 13.</b> Ya graficaste las ventas de enero a junio: 130, 142, 148, 165, 185 y 205. Te piden interpretar el resultado.",
 pide:"¿Cuál es la lectura correcta del gráfico?",
 ops:[
  "Crecimiento sostenido de 130 a 205, con la aceleración más marcada a partir de abril",
  "Las ventas son estacionales y volverán a bajar en julio",
  "Hay correlación entre el mes y las ventas, por lo tanto el paso del tiempo causa el aumento",
  "La distribución de las ventas es simétrica alrededor de la media"
 ],
 aprendido:"Interpretar es describir <b>lo que el gráfico muestra</b>: patrón general, anomalías puntuales y la siguiente pregunta que abre. Dos límites que la cursada repite: no extrapolar más allá de los datos, y no confundir correlación con causalidad. Un gráfico de línea muestra tendencia, no causa ni distribución.",
 porque:{
  "Las ventas son estacionales y volverán a bajar en julio":"Es una predicción: con seis meses de datos no hay evidencia de estacionalidad.",
  "Hay correlación entre el mes y las ventas, por lo tanto el paso del tiempo causa el aumento":"Correlación no implica causalidad: el aumento puede deberse a publicidad, precios o contexto.",
  "La distribución de las ventas es simétrica alrededor de la media":"La distribución se lee en un histograma o un boxplot, no en un gráfico de líneas."
 }
},
{
 id:"pC-12", clase:4, ej:"C · Ej 10", tema:"Limpieza", nivel:"media",
 caso:"<b>Ejercicio 10.</b> Tarea 8: después de concatenar enero y febrero, convertir <code>fecha</code> a <code>datetime</code>. ¿Por qué conviene hacerlo <b>después</b> del <code>concat</code> y no antes?",
 pide:"¿Cuál es el motivo?",
 ops:[
  "Porque así se convierte una sola vez sobre la tabla completa y se garantiza que las dos fuentes queden con el mismo tipo",
  "Porque <code>pd.concat</code> no funciona si las columnas son de tipo fecha",
  "Porque <code>to_datetime</code> solo acepta DataFrames de más de 5 filas",
  "Da exactamente lo mismo: el orden no afecta en nada"
 ],
 aprendido:"El orden del pipeline importa: <b>cargar → concatenar → convertir tipos → agrupar → exportar</b>. Convertir después del <code>concat</code> evita duplicar código y, sobre todo, evita que una fuente quede como <code>datetime</code> y la otra como texto, lo que rompería el ordenamiento y cualquier <code>.dt</code> posterior.",
 porque:{
  "Porque <code>pd.concat</code> no funciona si las columnas son de tipo fecha":"Funciona perfectamente con columnas de fecha.",
  "Porque <code>to_datetime</code> solo acepta DataFrames de más de 5 filas":"No existe tal restricción.",
  "Da exactamente lo mismo: el orden no afecta en nada":"Técnicamente ambos caminos funcionan, pero convertir antes duplica el paso y abre la puerta a que las dos fuentes queden con tipos distintos."
 }
}

]}
];

/* ==============================================================
   LABORATORIO · archivos que se precargan en el disco virtual
   de Python, para que los read_csv / read_json de los parciales
   funcionen tal cual están escritos en el examen.
   ============================================================== */
const ARCHIVOS = {
"productos.csv":
`producto,categoria,precio,stock
Teclado,Perifericos,25000,12
Mouse,Perifericos,18000,0
Monitor,Monitores,210000,5
Webcam,Perifericos,48000,8
Notebook,Computacion,950000,3
`,
"pedidos.json":
`[
  {"pedido": 501, "cliente": "Ana", "estado": "entregado", "importe": "12500.50"},
  {"pedido": 502, "cliente": "Bruno", "estado": "pendiente", "importe": "8300.00"},
  {"pedido": 503, "cliente": "Carla", "estado": "entregado", "importe": "15600.75"},
  {"pedido": 504, "cliente": "Diego", "estado": "cancelado", "importe": "7200.00"}
]
`,
"ventas_enero.csv":
`fecha,sucursal,producto,unidades
2026-01-05,Norte,Router,3
2026-01-12,Centro,Switch,5
2026-01-20,Sur,Router,2
`,
"ventas_febrero.csv":
`fecha,sucursal,producto,unidades
2026-02-03,Norte,Switch,4
2026-02-14,Centro,Firewall,1
2026-02-22,Sur,Switch,6
`
};

/* ==============================================================
   LABORATORIO · los 9 ejercicios reales de los 3 modelos
   --------------------------------------------------------------
   paquetes: qué se descarga de Pyodide para este ejercicio
   limpiar:  archivos de salida que se borran antes de cada corrida
   tests:    cada uno se ejecuta con acceso a las variables que
             definió el alumno; si lanza AssertionError, falla.
   ============================================================== */
const EJERCICIOS = [

/* ---------------- MODELO A ---------------- */
{
 id:"lab-a1", modelo:"A", ej:"Ej 1", titulo:"Ventas semanales vectorizadas",
 paquetes:["numpy"], limpiar:[],
 enunciado:"Una sucursal registró las unidades vendidas y el precio unitario de cada día de la semana. Hay que resolverlo todo con operaciones vectorizadas de NumPy, sin bucles.",
 datos:`Arreglo de unidades vendidas: [12, 15, 11, 18, 20, 17, 22]
Arreglo de precios unitarios: [1500, 1500, 1550, 1550, 1600, 1600, 1650]`,
 tareas:[
  "Crear ambos arreglos con NumPy.",
  "Calcular el ingreso de cada día mediante multiplicación vectorizada.",
  "Calcular ingreso total, promedio diario y día de mayor ingreso.",
  "Aplicar un aumento vectorizado de 8 % a los precios y mostrar los nuevos precios."
 ],
 variables:[
  ["unidades","arreglo NumPy con las unidades vendidas"],
  ["precios","arreglo NumPy con los precios unitarios"],
  ["ingresos","ingreso de cada uno de los 7 días"],
  ["ingreso_total","suma de la semana"],
  ["promedio_diario","promedio de los 7 días"],
  ["dia_mayor","índice (0 a 6) del día de mayor ingreso"],
  ["precios_nuevos","precios con el 8 % de aumento aplicado"]
 ],
 inicial:`import numpy as np

# Tarea 1: crear los arreglos
unidades = ...
precios = ...

# Tarea 2: ingreso de cada día (multiplicación vectorizada)
ingresos = ...

# Tarea 3: total, promedio diario y día de mayor ingreso
ingreso_total = ...
promedio_diario = ...
dia_mayor = ...

# Tarea 4: aumento vectorizado del 8 %
precios_nuevos = ...

print("Ingresos diarios:", ingresos)
print("Total:", ingreso_total, "| Promedio:", promedio_diario)
print("Día de mayor ingreso (índice):", dia_mayor)
print("Precios con aumento:", precios_nuevos)
`,
 tests:[
  {nombre:"unidades y precios son arreglos de NumPy de 7 elementos",
   codigo:`assert isinstance(unidades, np.ndarray), "unidades todavía no es un arreglo de NumPy"
assert isinstance(precios, np.ndarray), "precios todavía no es un arreglo de NumPy"
assert unidades.shape == (7,) and precios.shape == (7,), "cada arreglo debe tener los 7 valores del enunciado"`},
  {nombre:"ingresos es la multiplicación día a día",
   codigo:`esperado = np.array([12,15,11,18,20,17,22]) * np.array([1500,1500,1550,1550,1600,1600,1650])
assert np.shape(ingresos) == (7,), "ingresos debe tener 7 valores, uno por día"
assert np.allclose(ingresos, esperado), "los ingresos diarios no coinciden; debería ser unidades * precios"`},
  {nombre:"ingreso_total da 180950",
   codigo:`assert abs(float(ingreso_total) - 180950) < 0.01, f"da {ingreso_total} y debería dar 180950"`},
  {nombre:"promedio_diario da 25850",
   codigo:`assert abs(float(promedio_diario) - 25850) < 0.01, f"da {promedio_diario} y debería dar 25850"`},
  {nombre:"dia_mayor apunta al domingo (índice 6)",
   codigo:`assert int(dia_mayor) == 6, f"da {dia_mayor}; el mayor ingreso es 36300 y cae en el índice 6. Acordate: max() da el valor, argmax() da la posición"`},
  {nombre:"precios_nuevos tiene el 8 % de aumento",
   codigo:`esperado = np.array([1500,1500,1550,1550,1600,1600,1650]) * 1.08
assert np.allclose(precios_nuevos, esperado), "un aumento del 8 % es multiplicar por 1.08, no por 0.08"`}
 ],
 solucion:`import numpy as np

unidades = np.array([12, 15, 11, 18, 20, 17, 22])
precios = np.array([1500, 1500, 1550, 1550, 1600, 1600, 1650])

ingresos = unidades * precios

ingreso_total = ingresos.sum()
promedio_diario = ingresos.mean()
dia_mayor = ingresos.argmax()

precios_nuevos = precios * 1.08

print("Ingresos diarios:", ingresos)
print(f"Total: {ingreso_total} | Promedio diario: {promedio_diario:.2f}")
print(f"Día de mayor ingreso: índice {dia_mayor} con {ingresos[dia_mayor]}")
print("Precios con 8% de aumento:", precios_nuevos)`
},

{
 id:"lab-a2", modelo:"A", ej:"Ej 2", titulo:"Filtrado de productos desde CSV",
 paquetes:["numpy","pandas"], limpiar:["productos_disponibles.csv"],
 enunciado:"El archivo productos.csv ya está guardado en el disco del laboratorio, así que podés leerlo directamente con Pandas.",
 datos:`productos.csv
producto,categoria,precio,stock
Teclado,Perifericos,25000,12
Mouse,Perifericos,18000,0
Monitor,Monitores,210000,5
Webcam,Perifericos,48000,8
Notebook,Computacion,950000,3`,
 tareas:[
  "Cargar productos.csv con Pandas.",
  "Seleccionar producto, precio y stock.",
  "Filtrar productos con precio mayor a 40000 y stock mayor a 0.",
  "Exportar el resultado como productos_disponibles.csv sin guardar el índice."
 ],
 variables:[
  ["df","el DataFrame leído del CSV"],
  ["seleccion","solo las columnas producto, precio y stock"],
  ["disponibles","las filas que pasan el filtro"],
  ["productos_disponibles.csv","archivo exportado, sin índice"]
 ],
 inicial:`import pandas as pd

# Tarea 5: cargar productos.csv
df = ...

# Tarea 6: seleccionar producto, precio y stock
seleccion = ...

# Tarea 7: filtrar precio > 40000 y stock > 0
disponibles = ...

# Tarea 8: exportar a productos_disponibles.csv sin el índice


print(df)
print("\\nDisponibles:")
print(disponibles)
`,
 tests:[
  {nombre:"df se cargó con las 5 filas y 4 columnas del CSV",
   codigo:`assert isinstance(df, pd.DataFrame), "df debe ser un DataFrame: usá pd.read_csv"
assert df.shape == (5, 4), f"df tiene forma {df.shape} y debería ser (5, 4)"
assert list(df.columns) == ["producto","categoria","precio","stock"], f"las columnas son {list(df.columns)}"`},
  {nombre:"seleccion tiene exactamente producto, precio y stock",
   codigo:`assert isinstance(seleccion, pd.DataFrame), "seleccion debe seguir siendo un DataFrame: usá doble corchete"
assert list(seleccion.columns) == ["producto","precio","stock"], f"seleccion tiene {list(seleccion.columns)}"`},
  {nombre:"disponibles deja Monitor, Webcam y Notebook",
   codigo:`nombres = sorted(str(x) for x in disponibles["producto"])
assert nombres == ["Monitor","Notebook","Webcam"], f"quedaron {nombres}; el Mouse sale por stock 0 y el Teclado por precio"`},
  {nombre:"se exportó productos_disponibles.csv sin la columna de índice",
   codigo:`assert os.path.exists("productos_disponibles.csv"), "todavía no se generó el archivo"
vuelto = pd.read_csv("productos_disponibles.csv")
assert "Unnamed: 0" not in vuelto.columns, "el archivo quedó con la columna de índice: falta index=False"
assert len(vuelto) == 3, f"el archivo tiene {len(vuelto)} filas y debería tener 3"`}
 ],
 solucion:`import pandas as pd

df = pd.read_csv("productos.csv")

seleccion = df[["producto", "precio", "stock"]]

disponibles = seleccion[(seleccion["precio"] > 40000) & (seleccion["stock"] > 0)]

disponibles.to_csv("productos_disponibles.csv", index=False)

print(df)
print("\\nProductos disponibles:")
print(disponibles)`
},

{
 id:"lab-a3", modelo:"A", ej:"Ej 3", titulo:"Gráfico de líneas de visitas",
 paquetes:["numpy","pandas","matplotlib"], limpiar:[],
 enunciado:"Un sitio registró las visitas de cada día de la semana. Hay que graficarlas y dejar la figura lista para presentar.",
 datos:`Días: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
Visitas: [120, 150, 135, 180, 210, 260, 230]`,
 tareas:[
  "Crear un gráfico de líneas con marcadores.",
  "Agregar título, etiquetas de ejes y cuadrícula.",
  "Destacar la evolución semanal con color azul.",
  "Mostrar el gráfico."
 ],
 variables:[
  ["plt.plot(...)","la línea, con marcador y color azul"],
  ["título y ejes","plt.title, plt.xlabel, plt.ylabel"],
  ["cuadrícula","plt.grid(True)"]
 ],
 nota:"La figura se dibuja abajo del editor. Con el backend del navegador, plt.show() no abre ninguna ventana: la corrección lee directamente los ejes que dibujaste.",
 inicial:`import matplotlib.pyplot as plt

dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
visitas = [120, 150, 135, 180, 210, 260, 230]

# Tarea 9: gráfico de líneas con marcadores
# Tarea 11: destacar con color azul


# Tarea 10: título, etiquetas de ejes y cuadrícula


# Tarea 12: mostrar el gráfico
plt.tight_layout()
plt.show()
`,
 tests:[
  {nombre:"hay una línea con los 7 valores de visitas",
   codigo:`ax = plt.gca()
assert len(ax.lines) >= 1, "no se dibujó ninguna línea: usá plt.plot(dias, visitas)"
y = list(ax.lines[0].get_ydata())
assert len(y) == 7, f"la línea tiene {len(y)} puntos y debería tener 7"
assert [float(v) for v in y] == [120.0,150.0,135.0,180.0,210.0,260.0,230.0], "los valores no son los de visitas"`},
  {nombre:"la línea tiene marcadores",
   codigo:`m = plt.gca().lines[0].get_marker()
assert m not in (None, "None", "", " "), 'falta el marcador: agregá marker="o" dentro de plt.plot'`},
  {nombre:"la línea es azul",
   codigo:`import matplotlib.colors as mcolors
r, g, b, _ = mcolors.to_rgba(plt.gca().lines[0].get_color())
assert b > r and b > g, 'la línea no es azul: agregá color="blue" dentro de plt.plot'`},
  {nombre:"tiene título y etiquetas en los dos ejes",
   codigo:`ax = plt.gca()
assert ax.get_title().strip(), "falta el título: plt.title(...)"
assert ax.get_xlabel().strip(), "falta la etiqueta del eje X: plt.xlabel(...)"
assert ax.get_ylabel().strip(), "falta la etiqueta del eje Y: plt.ylabel(...)"`},
  {nombre:"tiene cuadrícula",
   codigo:`ax = plt.gca()
lineas = list(ax.xaxis.get_gridlines()) + list(ax.yaxis.get_gridlines())
assert any(l.get_visible() for l in lineas), "falta la cuadrícula: plt.grid(True)"`}
 ],
 solucion:`import matplotlib.pyplot as plt

dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
visitas = [120, 150, 135, 180, 210, 260, 230]

plt.figure(figsize=(8, 4))
plt.plot(dias, visitas, marker="o", color="blue", linewidth=2)

plt.title("Las visitas crecen durante la semana y pican el sábado")
plt.xlabel("Día")
plt.ylabel("Visitas")
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()`
},

/* ---------------- MODELO B ---------------- */
{
 id:"lab-b1", modelo:"B", ej:"Ej 1", titulo:"DataFrame de estudiantes",
 paquetes:["numpy","pandas"], limpiar:[],
 enunciado:"Hay que armar el DataFrame desde cero con los datos de la tabla y agregarle dos columnas calculadas.",
 datos:`| Legajo | Nombre | Parcial1 | Parcial2 | Asistencia |
| 1001   | Ana    |    8     |    7     |     90     |
| 1002   | Bruno  |    6     |    5     |     75     |
| 1003   | Carla  |    9     |   10     |     95     |
| 1004   | Diego  |    4     |    6     |     80     |
| 1005   | Elena  |    7     |    8     |     85     |`,
 tareas:[
  "Crear el DataFrame con Pandas.",
  "Crear la columna Promedio.",
  'Crear la columna Estado con "Aprueba" si Promedio >= 6 y Asistencia >= 75; en otro caso, "Revisa".',
  "Mostrar Nombre, Promedio y Estado."
 ],
 variables:[
  ["df","el DataFrame con Legajo, Nombre, Parcial1, Parcial2, Asistencia"],
  ["df['Promedio']","promedio de los dos parciales"],
  ["df['Estado']","\"Aprueba\" o \"Revisa\""]
 ],
 inicial:`import pandas as pd
import numpy as np

# Tarea 1: crear el DataFrame
df = ...

# Tarea 2: columna Promedio


# Tarea 3: columna Estado


# Tarea 4: mostrar Nombre, Promedio y Estado
print(df)
`,
 tests:[
  {nombre:"df tiene las 5 filas y las columnas del enunciado",
   codigo:`assert isinstance(df, pd.DataFrame), "df debe ser un DataFrame"
assert len(df) == 5, f"df tiene {len(df)} filas y debería tener 5"
faltan = [c for c in ["Legajo","Nombre","Parcial1","Parcial2","Asistencia"] if c not in df.columns]
assert not faltan, f"faltan columnas: {faltan} (respetá las mayúsculas del enunciado)"
assert sorted(str(n) for n in df["Nombre"]) == ["Ana","Bruno","Carla","Diego","Elena"], "los nombres no coinciden"`},
  {nombre:"la columna Promedio está bien calculada",
   codigo:`assert "Promedio" in df.columns, "falta la columna Promedio"
esperado = {"Ana":7.5, "Bruno":5.5, "Carla":9.5, "Diego":5.0, "Elena":7.5}
real = {str(n): float(p) for n, p in zip(df["Nombre"], df["Promedio"])}
for n, v in esperado.items():
    assert abs(real[n] - v) < 0.01, f"{n}: da {real[n]} y debería dar {v}"`},
  {nombre:"la columna Estado aplica las dos condiciones",
   codigo:`assert "Estado" in df.columns, "falta la columna Estado"
esperado = {"Ana":"Aprueba", "Bruno":"Revisa", "Carla":"Aprueba", "Diego":"Revisa", "Elena":"Aprueba"}
real = {str(n): str(e) for n, e in zip(df["Nombre"], df["Estado"])}
for n, v in esperado.items():
    assert real[n] == v, f'{n}: quedó "{real[n]}" y debería ser "{v}". Bruno y Diego no llegan a 6 de promedio'`}
 ],
 solucion:`import pandas as pd
import numpy as np

df = pd.DataFrame({
    "Legajo": [1001, 1002, 1003, 1004, 1005],
    "Nombre": ["Ana", "Bruno", "Carla", "Diego", "Elena"],
    "Parcial1": [8, 6, 9, 4, 7],
    "Parcial2": [7, 5, 10, 6, 8],
    "Asistencia": [90, 75, 95, 80, 85],
})

df["Promedio"] = (df["Parcial1"] + df["Parcial2"]) / 2

df["Estado"] = np.where(
    (df["Promedio"] >= 6) & (df["Asistencia"] >= 75),
    "Aprueba",
    "Revisa",
)

print(df[["Nombre", "Promedio", "Estado"]])`
},

{
 id:"lab-b2", modelo:"B", ej:"Ej 2", titulo:"Lectura y transformación de pedidos JSON",
 paquetes:["numpy","pandas"], limpiar:["entregados.csv"],
 enunciado:"El archivo pedidos.json ya está en el disco del laboratorio. Ojo con los importes: vienen como texto.",
 datos:`pedidos.json
[
  {"pedido": 501, "cliente": "Ana",   "estado": "entregado", "importe": "12500.50"},
  {"pedido": 502, "cliente": "Bruno", "estado": "pendiente", "importe": "8300.00"},
  {"pedido": 503, "cliente": "Carla", "estado": "entregado", "importe": "15600.75"},
  {"pedido": 504, "cliente": "Diego", "estado": "cancelado", "importe": "7200.00"}
]`,
 tareas:[
  "Cargar pedidos.json.",
  "Convertir importe de texto a número decimal.",
  "Filtrar pedidos entregados.",
  "Calcular el total entregado.",
  "Exportar los pedidos entregados como entregados.csv."
 ],
 variables:[
  ["df","el DataFrame con los 4 pedidos, con importe numérico"],
  ["entregados","solo los pedidos con estado entregado"],
  ["total","suma de los importes entregados"],
  ["entregados.csv","archivo exportado, sin índice"]
 ],
 nota:"Dos avisos. El enunciado dice “exportar a Excel como entregados.csv”: manda la extensión, así que va <code>to_csv</code>. Y ojo con la tarea 6: <code>pd.read_json</code> ya adivina que el importe es un número, así que la conversión parece innecesaria — dejala escrita igual, porque con un CSV o con un importe sucio no la tenés gratis.",
 inicial:`import pandas as pd

# Tarea 5: cargar pedidos.json
df = ...

# Tarea 6: convertir importe a número decimal


# Tarea 7: filtrar los entregados
entregados = ...

# Tarea 8: total entregado
total = ...

# Tarea 9: exportar entregados.csv


print(df)
print("Total entregado:", total)
`,
 tests:[
  {nombre:"df se cargó con los 4 pedidos",
   codigo:`assert isinstance(df, pd.DataFrame), "df debe ser un DataFrame: usá pd.read_json"
assert len(df) == 4, f"df tiene {len(df)} filas y debería tener 4"
faltan = [c for c in ["pedido","cliente","estado","importe"] if c not in df.columns]
assert not faltan, f"faltan columnas: {faltan}"`},
  {nombre:"la columna importe quedó numérica",
   codigo:`assert pd.api.types.is_numeric_dtype(df["importe"]), "importe sigue siendo texto: convertilo con pd.to_numeric(df['importe'], errors='coerce')"
assert abs(float(df["importe"].sum()) - 43601.25) < 0.01, f"la suma de todos los importes da {df['importe'].sum()} y debería dar 43601.25"`},
  {nombre:"la conversión de importe está escrita de forma explícita",
   codigo:`assert ("to_numeric" in _fuente) or ("astype" in _fuente), "pd.read_json ya adivina que el importe es un número, así que el test anterior pasa solo. Pero la tarea 6 pide la conversión explícita: dejala escrita con pd.to_numeric(..., errors='coerce'), porque con un CSV o con un importe sucio no la vas a tener gratis"`},
  {nombre:"entregados tiene solo los pedidos de Ana y Carla",
   codigo:`assert len(entregados) == 2, f"quedaron {len(entregados)} pedidos y deberían ser 2"
assert sorted(str(c) for c in entregados["cliente"]) == ["Ana","Carla"], "los clientes filtrados no son los correctos"`},
  {nombre:"total da 28101.25",
   codigo:`assert abs(float(total) - 28101.25) < 0.01, f"da {total} y debería dar 28101.25 (12500.50 + 15600.75)"`},
  {nombre:"se exportó entregados.csv sin la columna de índice",
   codigo:`assert os.path.exists("entregados.csv"), "todavía no se generó el archivo"
vuelto = pd.read_csv("entregados.csv")
assert "Unnamed: 0" not in vuelto.columns, "quedó la columna de índice: falta index=False"
assert len(vuelto) == 2, f"el archivo tiene {len(vuelto)} filas y debería tener 2"`}
 ],
 solucion:`import pandas as pd

df = pd.read_json("pedidos.json")

df["importe"] = pd.to_numeric(df["importe"], errors="coerce")

entregados = df[df["estado"] == "entregado"]

total = entregados["importe"].sum()

entregados.to_csv("entregados.csv", index=False)

print(df)
print("\\nPedidos entregados:")
print(entregados)
print(f"\\nTotal entregado: $ {total:,.2f}")`
},

{
 id:"lab-b3", modelo:"B", ej:"Ej 3", titulo:"Barras de ventas por categoría",
 paquetes:["numpy","pandas","matplotlib"], limpiar:[],
 enunciado:"Comparación de ventas entre cinco categorías. Además del gráfico, hay que mostrar los valores y destacar la categoría que más vendió.",
 datos:`Categorías: ["Libros", "Tecnología", "Hogar", "Deportes", "Moda"]
Ventas: [85, 140, 110, 95, 125]`,
 tareas:[
  "Crear un gráfico de barras verticales.",
  "Agregar título y etiquetas sugeridos por usted.",
  "Mostrar el valor sobre cada barra.",
  "Utilizar un color diferente para la barra de mayor venta."
 ],
 variables:[
  ["plt.bar(...)","las 5 barras verticales"],
  ["colores","una lista con un color por barra, distinto en la mayor"],
  ["plt.bar_label(...)","los valores encima de cada barra"]
 ],
 inicial:`import matplotlib.pyplot as plt

categorias = ["Libros", "Tecnología", "Hogar", "Deportes", "Moda"]
ventas = [85, 140, 110, 95, 125]

# Tarea 13: un color distinto para la barra de mayor venta
colores = ...

# Tarea 10: gráfico de barras verticales
barras = ...

# Tarea 11: título y etiquetas


# Tarea 12: valor sobre cada barra


plt.tight_layout()
plt.show()
`,
 tests:[
  {nombre:"hay 5 barras con las alturas correctas",
   codigo:`ax = plt.gca()
alturas = [round(float(p.get_height()), 2) for p in ax.patches]
assert len(alturas) == 5, f"hay {len(alturas)} barras y deberían ser 5"
assert sorted(alturas) == [85.0, 95.0, 110.0, 125.0, 140.0], f"las alturas son {alturas}"`},
  {nombre:"las barras son verticales (bar, no barh)",
   codigo:`p = plt.gca().patches[0]
assert p.get_height() > p.get_width(), "las barras están horizontales: usá plt.bar(), no plt.barh()"`},
  {nombre:"tiene título y etiquetas en los dos ejes",
   codigo:`ax = plt.gca()
assert ax.get_title().strip(), "falta el título"
assert ax.get_xlabel().strip(), "falta la etiqueta del eje X"
assert ax.get_ylabel().strip(), "falta la etiqueta del eje Y"`},
  {nombre:"se ven los valores sobre las barras",
   codigo:`ax = plt.gca()
assert len(ax.texts) >= 5, "no se ven los valores encima de las barras: guardá el resultado de plt.bar() y pasáselo a plt.bar_label()"`},
  {nombre:"la barra de mayor venta tiene otro color",
   codigo:`ax = plt.gca()
colores_barras = [tuple(round(float(c), 3) for c in p.get_facecolor()) for p in ax.patches]
assert len(set(colores_barras)) >= 2, "todas las barras tienen el mismo color: pasá una lista a color="
mayor = max(range(len(ax.patches)), key=lambda i: float(ax.patches[i].get_height()))
otros = [c for i, c in enumerate(colores_barras) if i != mayor]
assert colores_barras[mayor] not in otros, "el color distinto no quedó en la barra más alta (Tecnología, 140)"`}
 ],
 solucion:`import matplotlib.pyplot as plt

categorias = ["Libros", "Tecnología", "Hogar", "Deportes", "Moda"]
ventas = [85, 140, 110, 95, 125]

# Un color de acento solo para el máximo
colores = ["crimson" if v == max(ventas) else "steelblue" for v in ventas]

plt.figure(figsize=(8, 4.5))
barras = plt.bar(categorias, ventas, color=colores)

plt.title("Tecnología lidera las ventas del período")
plt.xlabel("Categoría")
plt.ylabel("Ventas (unidades)")

plt.bar_label(barras, padding=3)

plt.tight_layout()
plt.show()`
},

/* ---------------- MODELO C ---------------- */
{
 id:"lab-c1", modelo:"C", ej:"Ej 1", titulo:"Análisis de ventas por vendedor",
 paquetes:["numpy","pandas"], limpiar:[],
 enunciado:"Seis ventas de tres vendedores en tres regiones. Hay que armar el DataFrame, calcular importes y sacar tres resúmenes distintos.",
 datos:`| Fecha      | Vendedor | Región | Producto | Unidades | Precio |
| 2026-03-01 | Lucía    | Norte  | Router   |    3     |  85000 |
| 2026-03-01 | Mateo    | Centro | Switch   |    5     |  62000 |
| 2026-03-02 | Lucía    | Norte  | Switch   |    4     |  62000 |
| 2026-03-02 | Sofía    | Sur    | Router   |    2     |  85000 |
| 2026-03-03 | Mateo    | Centro | Firewall |    1     | 210000 |
| 2026-03-03 | Sofía    | Sur    | Switch   |    6     |  62000 |`,
 tareas:[
  "Crear el DataFrame y convertir Fecha a datetime.",
  "Crear Importe = Unidades × Precio.",
  "Obtener el importe total por vendedor con groupby.",
  "Obtener unidades totales por producto y ordenar de mayor a menor.",
  "Identificar la venta individual de mayor importe."
 ],
 variables:[
  ["df","el DataFrame, con Fecha en datetime y la columna Importe"],
  ["total_vendedor","importe total de cada vendedor"],
  ["unidades_producto","unidades por producto, de mayor a menor"],
  ["venta_mayor","la fila completa de la venta más grande"]
 ],
 nota:"total_vendedor y unidades_producto se aceptan como Series o como DataFrame (con o sin as_index=False).",
 inicial:`import pandas as pd

# Tarea 1: crear el DataFrame
df = ...

# Tarea 1 (bis): convertir Fecha a datetime


# Tarea 2: Importe = Unidades * Precio


# Tarea 3: importe total por vendedor
total_vendedor = ...

# Tarea 4: unidades por producto, de mayor a menor
unidades_producto = ...

# Tarea 5: la venta individual de mayor importe
venta_mayor = ...

print(df)
print(total_vendedor)
print(unidades_producto)
print(venta_mayor)
`,
 tests:[
  {nombre:"df tiene las 6 ventas y Fecha es datetime",
   codigo:`assert isinstance(df, pd.DataFrame), "df debe ser un DataFrame"
assert len(df) == 6, f"df tiene {len(df)} filas y debería tener 6"
assert pd.api.types.is_datetime64_any_dtype(df["Fecha"]), "Fecha sigue siendo texto: convertila con pd.to_datetime"`},
  {nombre:"la columna Importe está bien calculada",
   codigo:`assert "Importe" in df.columns, "falta la columna Importe"
assert sorted(float(x) for x in df["Importe"]) == [170000.0, 210000.0, 248000.0, 255000.0, 310000.0, 372000.0], f"los importes son {sorted(df['Importe'].tolist())}"`},
  {nombre:"total_vendedor da 503000 / 520000 / 542000",
   codigo:`d = _a_dict(total_vendedor, "Vendedor", "Importe")
esperado = {"Lucía": 503000, "Mateo": 520000, "Sofía": 542000}
for k, v in esperado.items():
    assert k in d, f"falta {k} en el resumen; están {list(d)}"
    assert abs(d[k] - v) < 1, f"{k}: da {d[k]} y debería dar {v}"`},
  {nombre:"unidades_producto está ordenado de mayor a menor",
   codigo:`d = _a_dict(unidades_producto, "Producto", "Unidades")
assert abs(d.get("Switch", 0) - 15) < 0.01, f"Switch debería sumar 15 unidades, da {d.get('Switch')}"
assert abs(d.get("Router", 0) - 5) < 0.01, f"Router debería sumar 5 unidades, da {d.get('Router')}"
assert abs(d.get("Firewall", 0) - 1) < 0.01, f"Firewall debería sumar 1 unidad, da {d.get('Firewall')}"
assert list(d) == ["Switch","Router","Firewall"], f"el orden quedó {list(d)}; falta sort_values(ascending=False)"`},
  {nombre:"venta_mayor es la venta de Sofía por 372000",
   codigo:`v = venta_mayor
if isinstance(v, pd.DataFrame):
    assert len(v) == 1, "venta_mayor debería ser una sola venta"
    v = v.iloc[0]
assert abs(float(v["Importe"]) - 372000) < 1, f"da {v['Importe']} y la venta más grande es de 372000"
assert str(v["Vendedor"]) == "Sofía", f"quedó {v['Vendedor']}; la venta más grande es de Sofía"`}
 ],
 solucion:`import pandas as pd

df = pd.DataFrame({
    "Fecha": ["2026-03-01","2026-03-01","2026-03-02","2026-03-02","2026-03-03","2026-03-03"],
    "Vendedor": ["Lucía","Mateo","Lucía","Sofía","Mateo","Sofía"],
    "Región": ["Norte","Centro","Norte","Sur","Centro","Sur"],
    "Producto": ["Router","Switch","Switch","Router","Firewall","Switch"],
    "Unidades": [3, 5, 4, 2, 1, 6],
    "Precio": [85000, 62000, 62000, 85000, 210000, 62000],
})

df["Fecha"] = pd.to_datetime(df["Fecha"])

df["Importe"] = df["Unidades"] * df["Precio"]

total_vendedor = df.groupby("Vendedor", as_index=False)["Importe"].sum()

unidades_producto = (df.groupby("Producto")["Unidades"]
                       .sum()
                       .sort_values(ascending=False))

venta_mayor = df.loc[df["Importe"].idxmax()]

print(df)
print("\\nImporte total por vendedor:")
print(total_vendedor)
print("\\nUnidades por producto:")
print(unidades_producto)
print("\\nVenta individual de mayor importe:")
print(venta_mayor)`
},

{
 id:"lab-c10", modelo:"C", ej:"Ej 10", titulo:"Concatenación de ventas mensuales",
 paquetes:["numpy","pandas"], limpiar:["consolidado_ventas.csv","ventas.json"],
 enunciado:"Los dos CSV mensuales ya están en el disco del laboratorio. Hay que consolidarlos en una sola tabla y publicarla en dos formatos.",
 datos:`ventas_enero.csv
fecha,sucursal,producto,unidades
2026-01-05,Norte,Router,3
2026-01-12,Centro,Switch,5
2026-01-20,Sur,Router,2

ventas_febrero.csv
fecha,sucursal,producto,unidades
2026-02-03,Norte,Switch,4
2026-02-14,Centro,Firewall,1
2026-02-22,Sur,Switch,6`,
 tareas:[
  "Cargar ambos CSV y agregar una columna mes a cada uno.",
  "Concatenarlos verticalmente en un único DataFrame.",
  "Convertir fecha a datetime.",
  "Calcular unidades por sucursal y producto mediante groupby.",
  "Exportar el consolidado a consolidado_ventas.csv y a ventas.json."
 ],
 variables:[
  ["enero","ventas_enero.csv con la columna mes"],
  ["febrero","ventas_febrero.csv con la columna mes"],
  ["ventas","las 6 filas concatenadas, con índice continuo y fecha en datetime"],
  ["resumen","unidades por sucursal y producto"],
  ["consolidado_ventas.csv y ventas.json","los dos archivos exportados"]
 ],
 inicial:`import pandas as pd

# Tarea 6: cargar ambos CSV y agregar la columna mes
enero = ...
febrero = ...


# Tarea 7: concatenar verticalmente
ventas = ...

# Tarea 8: convertir fecha a datetime


# Tarea 9: unidades por sucursal y producto
resumen = ...

# Tarea 10: exportar a CSV y a JSON


print(ventas)
print(resumen)
`,
 tests:[
  {nombre:"enero y febrero se cargaron con la columna mes",
   codigo:`for nombre, tabla in [("enero", enero), ("febrero", febrero)]:
    assert isinstance(tabla, pd.DataFrame), f"{nombre} debe ser un DataFrame"
    assert len(tabla) == 3, f"{nombre} tiene {len(tabla)} filas y debería tener 3"
    assert "mes" in tabla.columns, f"falta la columna mes en {nombre}"`},
  {nombre:"ventas tiene las 6 filas con índice continuo",
   codigo:`assert len(ventas) == 6, f"ventas tiene {len(ventas)} filas y debería tener 6"
assert list(ventas.index) == [0,1,2,3,4,5], "el índice quedó repetido (0,1,2,0,1,2): usá ignore_index=True en el concat"`},
  {nombre:"la columna fecha quedó en datetime",
   codigo:`assert pd.api.types.is_datetime64_any_dtype(ventas["fecha"]), "fecha sigue siendo texto: convertila con pd.to_datetime"`},
  {nombre:"resumen agrupa por sucursal y producto",
   codigo:`r = resumen
if isinstance(r, pd.Series):
    d = {tuple(str(x) for x in k): float(v) for k, v in r.items()}
else:
    d = {(str(f["sucursal"]), str(f["producto"])): float(f["unidades"]) for _, f in r.iterrows()}
esperado = {("Norte","Router"):3, ("Norte","Switch"):4, ("Centro","Switch"):5,
            ("Centro","Firewall"):1, ("Sur","Router"):2, ("Sur","Switch"):6}
assert len(d) == 6, f"el resumen tiene {len(d)} combinaciones y deberían ser 6; agrupá por las dos columnas a la vez"
for k, v in esperado.items():
    assert k in d, f"falta la combinación {k}"
    assert abs(d[k] - v) < 0.01, f"{k}: da {d[k]} y debería dar {v}"`},
  {nombre:"se exportaron consolidado_ventas.csv y ventas.json",
   codigo:`assert os.path.exists("consolidado_ventas.csv"), "falta consolidado_ventas.csv"
assert os.path.exists("ventas.json"), "falta ventas.json"
vuelto = pd.read_csv("consolidado_ventas.csv")
assert "Unnamed: 0" not in vuelto.columns, "el CSV quedó con la columna de índice: falta index=False"
assert len(vuelto) == 6, f"el CSV tiene {len(vuelto)} filas y debería tener 6"`}
 ],
 solucion:`import pandas as pd

enero = pd.read_csv("ventas_enero.csv")
enero["mes"] = "Enero"

febrero = pd.read_csv("ventas_febrero.csv")
febrero["mes"] = "Febrero"

ventas = pd.concat([enero, febrero], ignore_index=True)

ventas["fecha"] = pd.to_datetime(ventas["fecha"])

resumen = ventas.groupby(["sucursal", "producto"], as_index=False)["unidades"].sum()

ventas.to_csv("consolidado_ventas.csv", index=False)
ventas.to_json("ventas.json", orient="records", indent=2)

print(ventas)
print("\\nUnidades por sucursal y producto:")
print(resumen)`
},

{
 id:"lab-c13", modelo:"C", ej:"Ej 13", titulo:"Gráfico de líneas de ventas mensuales",
 paquetes:["numpy","pandas","matplotlib"], limpiar:[],
 enunciado:"Seis meses de ventas para graficar. Es el mismo ejercicio que el del modelo A pero con datos mensuales: si tenés el bloque memorizado, sale en un minuto.",
 datos:`Meses: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
Ventas 2026: [130, 142, 148, 165, 185, 205]`,
 tareas:[
  "Crear un gráfico de líneas con marcadores.",
  "Agregar título, etiquetas de ejes y cuadrícula.",
  "Destacar la evolución con color azul.",
  "Mostrar el gráfico."
 ],
 variables:[
  ["plt.plot(...)","la línea con marcador y color azul"],
  ["título y ejes","plt.title, plt.xlabel, plt.ylabel"],
  ["cuadrícula","plt.grid(True)"]
 ],
 inicial:`import matplotlib.pyplot as plt

meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
ventas = [130, 142, 148, 165, 185, 205]

# Tareas 11 y 13: línea con marcadores, en azul


# Tarea 12: título, etiquetas y cuadrícula


# Tarea 14: mostrar
plt.tight_layout()
plt.show()
`,
 tests:[
  {nombre:"hay una línea con los 6 valores de ventas",
   codigo:`ax = plt.gca()
assert len(ax.lines) >= 1, "no se dibujó ninguna línea: usá plt.plot(meses, ventas)"
y = [float(v) for v in ax.lines[0].get_ydata()]
assert y == [130.0, 142.0, 148.0, 165.0, 185.0, 205.0], f"los valores de la línea son {y}"`},
  {nombre:"la línea tiene marcadores",
   codigo:`m = plt.gca().lines[0].get_marker()
assert m not in (None, "None", "", " "), 'falta el marcador: agregá marker="o"'`},
  {nombre:"la línea es azul",
   codigo:`import matplotlib.colors as mcolors
r, g, b, _ = mcolors.to_rgba(plt.gca().lines[0].get_color())
assert b > r and b > g, 'la línea no es azul: agregá color="blue"'`},
  {nombre:"tiene título y etiquetas en los dos ejes",
   codigo:`ax = plt.gca()
assert ax.get_title().strip(), "falta el título"
assert ax.get_xlabel().strip(), "falta la etiqueta del eje X"
assert ax.get_ylabel().strip(), "falta la etiqueta del eje Y"`},
  {nombre:"tiene cuadrícula",
   codigo:`ax = plt.gca()
lineas = list(ax.xaxis.get_gridlines()) + list(ax.yaxis.get_gridlines())
assert any(l.get_visible() for l in lineas), "falta la cuadrícula: plt.grid(True)"`}
 ],
 solucion:`import matplotlib.pyplot as plt

meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
ventas = [130, 142, 148, 165, 185, 205]

plt.figure(figsize=(8, 4))
plt.plot(meses, ventas, marker="o", color="blue", linewidth=2)

plt.title("Las ventas crecen 58 % entre enero y junio de 2026")
plt.xlabel("Mes")
plt.ylabel("Ventas")
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()`
}

];
