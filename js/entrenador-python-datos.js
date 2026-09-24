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
  "<code>df = pd.DataFrame(ventas)</code>",
  "<code>df = pd.DataFrame(ventas.values())</code>",
  "<code>df = pd.Series(ventas).to_frame()</code>",
  "<code>df = pd.read_json(ventas)</code>"
 ],
 aprendido:"Una lista de diccionarios es exactamente el formato que <code>pd.DataFrame()</code> espera: cada diccionario es una fila y cada clave se convierte en columna. Es el primer paso de casi todos los prácticos: las consignas dan colecciones de Python y vos tenés que armar los DataFrames.",
 porque:{
  "<code>df = pd.DataFrame(ventas.values())</code>":"Una lista no tiene <code>.values()</code> (es método de diccionarios): tira <code>AttributeError</code>.",
  "<code>df = pd.Series(ventas).to_frame()</code>":"Corre, pero arma <b>una sola columna</b> donde cada celda es un diccionario entero: no separa <code>venta_id</code>, <code>mes</code> ni <code>importe</code>.",
  "<code>df = pd.read_json(ventas)</code>":"<code>read_json</code> espera una ruta o un texto JSON, no una lista que ya está cargada en memoria."
 }
},
{
 id:"c1-02", clase:1, tema:"Colecciones", nivel:"baja",
 caso:"La consigna pide un diccionario de parámetros que controle el programa: ID a buscar, DNI a consultar, importe mínimo y color del gráfico. Después hay que recorrerlo mostrando clave y valor.",
 pide:"¿Cómo recorrés el diccionario?",
 ops:[
  "<code>for clave, valor in parametros.items():</code>",
  "<code>for clave, valor in sorted(parametros):</code>",
  "<code>for clave, valor in enumerate(parametros):</code>",
  "<code>for clave, valor in parametros.values():</code>"
 ],
 aprendido:"<code>.items()</code> devuelve pares (clave, valor), que es justo lo que pide la consigna de “recorrerlo, consultar sus claves y usar sus valores”. <code>.keys()</code> da solo las claves y <code>.values()</code> solo los valores.",
 porque:{
  "<code>for clave, valor in sorted(parametros):</code>":"Iterar un diccionario (aunque sea ordenado) da <b>sólo las claves</b>; desempaquetar cada clave en dos variables falla con <code>ValueError</code>.",
  "<code>for clave, valor in enumerate(parametros):</code>":"<code>enumerate</code> numera: <code>clave</code> valdría 0, 1, 2… y <code>valor</code> sería el nombre del parámetro. Ninguna de las dos cosas es lo que pide la consigna.",
  "<code>for clave, valor in parametros.values():</code>":"<code>.values()</code> devuelve sólo los valores; intentar separar cada uno en <code>clave, valor</code> falla, y aunque no fallara perdés el nombre del parámetro."
 }
},
{
 id:"c1-03", clase:1, tema:"Colecciones", nivel:"baja",
 caso:"De una lista de sedes repetidas querés quedarte con la lista de sedes distintas, sin repetir.",
 codigo:"sedes = ['Palermo', 'Belgrano', 'Palermo', 'Centro', 'Belgrano']",
 pide:"¿Qué estructura usás?",
 ops:[
  "<code>unicas = list(set(sedes))</code>",
  "<code>len(set(sedes)) == len(sedes)</code>",
  "<code>sedes.drop_duplicates()</code>",
  "<code>[s for s in sedes if sedes.count(s) < 2]</code>"
 ],
 aprendido:"Un <code>set</code> es una colección sin elementos repetidos: convertir una lista a set es la forma más corta de sacar duplicados. En Pandas el equivalente sobre una columna es <code>df['sede'].unique()</code> o <code>nunique()</code>.",
 porque:{
  "<code>len(set(sedes)) == len(sedes)</code>":"Responde <b>si había repetidas</b> (True/False); no devuelve la lista de sedes distintas.",
  "<code>sedes.drop_duplicates()</code>":"<code>drop_duplicates()</code> es de Pandas: una lista de Python no tiene ese método y tira <code>AttributeError</code>.",
  "<code>[s for s in sedes if sedes.count(s) < 2]</code>":"Se queda sólo con las sedes que aparecen <b>una única vez</b> (acá, solamente 'Centro'): descarta las repetidas en vez de deduplicarlas."
 }
},
{
 id:"c1-04", clase:1, tema:"Fundamentos", nivel:"baja",
 caso:"Tenés que mostrar las actividades del diario numeradas: “1. estudiar Python”, “2. practicar CSV”…",
 pide:"¿Qué función te da índice y valor al mismo tiempo?",
 ops:[
  "<code>for i, act in enumerate(actividades, start=1):</code>",
  "<code>for i, act in enumerate(actividades):</code>",
  "<code>for i, act in zip(range(1, len(actividades)), actividades):</code>",
  "<code>for i, act in enumerate(actividades, stop=1):</code>"
 ],
 aprendido:"<code>enumerate()</code> recorre y numera a la vez, y <code>start=1</code> hace que la numeración empiece en 1 en lugar de 0. Evita el clásico contador manual y es más legible (criterio PEP 8).",
 porque:{
  "<code>for i, act in enumerate(actividades):</code>":"Numera desde 0: la primera actividad quedaría como “0. estudiar Python”.",
  "<code>for i, act in zip(range(1, len(actividades)), actividades):</code>":"<code>range(1, len(actividades))</code> genera <b>un número menos</b> que actividades: <code>zip</code> corta y la última actividad nunca se muestra.",
  "<code>for i, act in enumerate(actividades, stop=1):</code>":"<code>enumerate</code> no tiene parámetro <code>stop</code> (sólo <code>start</code>): tira <code>TypeError</code>."
 }
},
{
 id:"c1-05", clase:1, tema:"Fundamentos", nivel:"media",
 caso:"El programa pide una cantidad por teclado con <code>input()</code> y tiene que seguir funcionando si la persona escribe “dos” en vez de “2”.",
 codigo:"cantidad = int(input('¿Cuántos contactos? '))",
 pide:"¿Qué excepción tenés que capturar?",
 ops:[
  "<code>ValueError</code>: el texto es un <code>str</code> válido, pero su contenido no representa un número",
  "<code>TypeError</code>: <code>int()</code> recibió un objeto de un tipo que no sabe convertir a entero",
  "<code>EOFError</code>: <code>input()</code> no pudo leer lo que la persona escribió por el teclado",
  "<code>OverflowError</code>: el número escrito es demasiado grande para convertirlo a entero"
 ],
 aprendido:"<code>int()</code> sobre un texto que no representa un número lanza <code>ValueError</code>. Es el error típico de toda entrada por teclado; por eso los ejercicios piden envolver la conversión en <code>try/except ValueError</code> con un mensaje claro para la persona usuaria.",
 porque:{
  "<code>TypeError</code>: <code>int()</code> recibió un objeto de un tipo que no sabe convertir a entero":"Ese es el caso de <code>int(None)</code> o <code>int([1, 2])</code>. Acá el tipo (<code>str</code>) es aceptable; lo que está mal es el <b>contenido</b>.",
  "<code>EOFError</code>: <code>input()</code> no pudo leer lo que la persona escribió por el teclado":"<code>EOFError</code> aparece cuando <code>input()</code> se queda sin datos (Ctrl+D, entrada redirigida). Escribir “dos” es una lectura exitosa.",
  "<code>OverflowError</code>: el número escrito es demasiado grande para convertirlo a entero":"Los enteros de Python no tienen tope, y “dos” ni siquiera es un número: el error es de formato, no de tamaño."
 }
},

/* ---------- CLASE 2 · PEP 8, docstrings, comentarios ---------- */
{
 id:"c2-01", clase:2, tema:"PEP 8", nivel:"baja",
 caso:"Tenés que nombrar una función que calcula el promedio de una lista de notas y una clase que representa un error propio del dominio.",
 pide:"¿Qué convención de PEP 8 corresponde?",
 ops:[
  "Función en <code>snake_case</code> (<code>calcular_promedio</code>) y clase en <code>CapWords</code> (<code>DatosInvalidosError</code>)",
  "Función en <code>snake_case</code> (<code>calcular_promedio</code>) y clase en <code>snake_case</code> (<code>datos_invalidos_error</code>)",
  "Función en <code>camelCase</code> (<code>calcularPromedio</code>) y clase en <code>CapWords</code> (<code>DatosInvalidosError</code>)",
  "Función en <code>CapWords</code> (<code>CalcularPromedio</code>) y clase en <code>camelCase</code> (<code>datosInvalidosError</code>)"
 ],
 aprendido:"PEP 8 fija: <b>funciones y variables en <code>snake_case</code></b>, <b>clases en <code>CapWords</code></b> y <b>constantes en MAYÚSCULAS</b>. Indentación de 4 espacios, imports agrupados al inicio del archivo y líneas cortas. No es decoración: es el idioma común para que otra persona lea el código sin adivinar.",
 porque:{
  "Función en <code>snake_case</code> (<code>calcular_promedio</code>) y clase en <code>snake_case</code> (<code>datos_invalidos_error</code>)":"La mitad es correcta, pero las clases van en <code>CapWords</code>, no en <code>snake_case</code>.",
  "Función en <code>camelCase</code> (<code>calcularPromedio</code>) y clase en <code>CapWords</code> (<code>DatosInvalidosError</code>)":"La clase está bien, pero <code>camelCase</code> es de Java/JavaScript: en Python las funciones van en <code>snake_case</code>.",
  "Función en <code>CapWords</code> (<code>CalcularPromedio</code>) y clase en <code>camelCase</code> (<code>datosInvalidosError</code>)":"Está prácticamente al revés de PEP 8: <code>CapWords</code> es para clases, y <code>camelCase</code> no se usa para nada."
 }
},
{
 id:"c2-02", clase:2, tema:"Docstrings", nivel:"baja",
 caso:"Tenés que documentar <code>cargar_datos(ruta)</code>: qué hace, qué parámetros espera, qué devuelve y qué excepción puede lanzar.",
 pide:"¿Dónde y cómo se escribe?",
 ops:[
  "Como primera sentencia de la función, entre triple comilla doble <code>\"\"\"…\"\"\"</code>",
  "Como primera línea del archivo, entre triple comilla doble, antes del <code>def cargar_datos</code>",
  "Inmediatamente arriba del <code>def</code>, como bloque de comentarios <code>#</code> de varias líneas",
  "Al final de la función, después del <code>return</code>, entre triple comilla doble"
 ],
 aprendido:"PEP 257: el docstring es un literal de texto que aparece <b>como primera sentencia</b> del módulo, clase, función o método, y se escribe con triple comilla doble. Python lo expone en <code>__doc__</code> y en <code>help()</code>. Documenta el contrato público: qué hace, qué espera (<code>Args</code>), qué devuelve (<code>Returns</code>) y qué puede fallar (<code>Raises</code>).",
 porque:{
  "Como primera línea del archivo, entre triple comilla doble, antes del <code>def cargar_datos</code>":"Eso documenta el <b>módulo</b>, no la función: <code>cargar_datos.__doc__</code> quedaría vacío.",
  "Inmediatamente arriba del <code>def</code>, como bloque de comentarios <code>#</code> de varias líneas":"Los comentarios <code>#</code> los ignora el intérprete: no quedan en <code>__doc__</code> ni aparecen con <code>help()</code>.",
  "Al final de la función, después del <code>return</code>, entre triple comilla doble":"El docstring tiene que ser la <b>primera</b> sentencia; un texto después del <code>return</code> es sólo una cadena suelta que nunca se ejecuta."
 }
},
{
 id:"c2-03", clase:2, tema:"Comentarios", nivel:"media",
 caso:"En un filtro de importes te piden agregar un comentario efectivo.",
 codigo:"importes_validos = [i for i in importes if i >= 0]",
 pide:"¿Cuál es el comentario correcto según el criterio de la cursada?",
 ops:[
  "<code># Se descartan importes negativos porque representan anulaciones ya procesadas.</code>",
  "<code># Se descartan los importes negativos para quedarnos únicamente con los válidos.</code>",
  "<code># Comprensión de lista: recorre importes y conserva los que cumplen i >= 0.</code>",
  "<code># Atención: este filtro se aplica antes de calcular los totales del mes.</code>"
 ],
 aprendido:"Un comentario útil explica el <b>por qué</b>, no repite el <b>qué</b>. Registra decisiones no obvias y reglas de negocio. Si necesitás comentar cada línea, probablemente el código necesita mejores nombres o funciones más chicas.",
 porque:{
  "<code># Se descartan los importes negativos para quedarnos únicamente con los válidos.</code>":"Repite <b>qué</b> hace la línea (el código ya lo dice) pero no explica <b>por qué</b> esos importes se descartan.",
  "<code># Comprensión de lista: recorre importes y conserva los que cumplen i >= 0.</code>":"Describe la sintaxis, no la decisión de negocio; alguien que sepa Python ya lo lee en el código.",
  "<code># Atención: este filtro se aplica antes de calcular los totales del mes.</code>":"Da contexto de orden, pero no justifica la regla ni explica qué representa un importe negativo."
 }
},

/* ---------- CLASE 2.1 / 2.2 · Excepciones y archivos ---------- */
{
 id:"c2-04", clase:2, tema:"Excepciones", nivel:"media",
 caso:"Leés un archivo de configuración JSON. Puede pasar que el archivo no exista, o que exista pero su contenido no sea JSON válido.",
 pide:"¿Qué excepciones capturás, en ese orden?",
 ops:[
  "<code>FileNotFoundError</code> y <code>json.JSONDecodeError</code>, cada una en su propio <code>except</code>",
  "<code>OSError</code> y <code>ValueError</code> juntas, en un solo <code>except (OSError, ValueError):</code>",
  "<code>PermissionError</code> y <code>json.JSONDecodeError</code>, cada una en su propio <code>except</code>",
  "<code>FileNotFoundError</code> y <code>KeyError</code>, cada una en su propio <code>except</code>"
 ],
 aprendido:"Capturar excepciones <b>específicas</b> es la regla central de la clase: cada error dice algo distinto y merece un mensaje distinto. <code>FileNotFoundError</code> = revisá la ruta. <code>json.JSONDecodeError</code> = el archivo existe pero está mal formado. Capturar todo junto oculta bugs reales.",
 codigo:"try:\n    texto = Path(ruta).read_text(encoding=\"utf-8\")\n    return json.loads(texto)\nexcept FileNotFoundError as exc:\n    raise FileNotFoundError(f\"No existe: {ruta}\") from exc\nexcept json.JSONDecodeError as exc:\n    raise ValueError(\"El archivo no contiene JSON válido\") from exc",
 porque:{
  "<code>OSError</code> y <code>ValueError</code> juntas, en un solo <code>except (OSError, ValueError):</code>":"Las atrapa a las dos (son sus clases padre), pero con un único mensaje: no se distingue “no está el archivo” de “está corrupto”.",
  "<code>PermissionError</code> y <code>json.JSONDecodeError</code>, cada una en su propio <code>except</code>":"Un archivo inexistente lanza <code>FileNotFoundError</code>, no <code>PermissionError</code> (que es cuando existe pero no podés leerlo).",
  "<code>FileNotFoundError</code> y <code>KeyError</code>, cada una en su propio <code>except</code>":"<code>json.loads</code> con un texto mal formado lanza <code>JSONDecodeError</code>; <code>KeyError</code> recién aparece si después accedés a una clave inexistente."
 }
},
{
 id:"c2-05", clase:2, tema:"Excepciones", nivel:"media",
 caso:"Capturás un <code>FileNotFoundError</code> técnico y querés relanzarlo con un mensaje claro, sin perder la causa original para poder depurar.",
 pide:"¿Qué sintaxis usás?",
 ops:[
  "<code>raise DataFileError(f'No existe el archivo: {ruta}') from exc</code>",
  "<code>raise DataFileError(f'No existe el archivo: {ruta}') from None</code>",
  "<code>raise DataFileError(f'No existe el archivo: {ruta}', exc)</code>",
  "<code>raise exc(f'No existe el archivo: {ruta}')</code>"
 ],
 aprendido:"<code>raise ... from exc</code> es el <b>encadenamiento de excepciones</b>: lanzás un error nuevo con un mensaje entendible, pero Python conserva el traceback del error original. Es la forma profesional de envolver un error técnico en una excepción de dominio sin perder información.",
 porque:{
  "<code>raise DataFileError(f'No existe el archivo: {ruta}') from None</code>":"<code>from None</code> <b>borra</b> a propósito la causa original del traceback: justo lo contrario de lo que se quiere.",
  "<code>raise DataFileError(f'No existe el archivo: {ruta}', exc)</code>":"<code>exc</code> viaja como un argumento más del mensaje; no queda encadenado como causa del error.",
  "<code>raise exc(f'No existe el archivo: {ruta}')</code>":"<code>exc</code> es una <b>instancia</b> del error, no una clase: llamarla como función tira <code>TypeError</code>."
 }
},
{
 id:"c2-06", clase:2, tema:"Excepciones", nivel:"media",
 caso:"Querés que un archivo abierto se cierre sí o sí, haya o no error durante la lectura.",
 pide:"¿Cuál es la forma recomendada?",
 ops:[
  "<code>with open(ruta, encoding='utf-8') as f:</code> y leer dentro del bloque",
  "<code>f = open(ruta)</code>, leer y llamar a <code>f.close()</code> al final",
  "<code>try:</code> con <code>f = open(ruta)</code> adentro y <code>finally: f.close()</code>",
  "<code>with open(ruta):</code> sin <code>as f</code>, porque el <code>with</code> cierra solo"
 ],
 aprendido:"El <b>context manager</b> <code>with</code> cierra el archivo automáticamente aunque se lance una excepción dentro del bloque. Es la alternativa limpia a <code>finally: f.close()</code>. Siempre acompañado de <code>encoding=\"utf-8\"</code> para no depender del encoding por defecto del sistema.",
 porque:{
  "<code>f = open(ruta)</code>, leer y llamar a <code>f.close()</code> al final":"Si se lanza una excepción antes de <code>f.close()</code>, esa línea no se ejecuta y el archivo queda abierto.",
  "<code>try:</code> con <code>f = open(ruta)</code> adentro y <code>finally: f.close()</code>":"Si el <code>open</code> falla, <code>f</code> nunca llegó a existir y el <code>finally</code> tira <code>NameError</code>, tapando el error real.",
  "<code>with open(ruta):</code> sin <code>as f</code>, porque el <code>with</code> cierra solo":"El archivo se cierra, pero sin <code>as f</code> no tenés ninguna variable para leerlo."
 }
},
{
 id:"c2-07", clase:2, tema:"Archivos · CSV", nivel:"media",
 caso:"Tenés que leer <code>clientes.csv</code> accediendo a las columnas <b>por su nombre</b> (<code>fila[\"email\"]</code>), usando solo la librería estándar.",
 pide:"¿Qué usás?",
 ops:[
  "<code>csv.DictReader(f)</code>, con el archivo abierto usando <code>newline=''</code>",
  "<code>csv.reader(f)</code> y acceder con <code>fila[3]</code>, que es la posición de la columna <code>email</code>",
  "<code>csv.DictReader(f)</code>, con el archivo abierto en modo binario <code>'rb'</code>",
  "<code>csv.DictWriter(f)</code>, con el archivo abierto usando <code>newline=''</code>"
 ],
 codigo:"import csv\n\nwith open(\"clientes.csv\", newline=\"\", encoding=\"utf-8\") as f:\n    for fila in csv.DictReader(f):\n        print(fila[\"email\"])",
 aprendido:"<code>csv.DictReader</code> devuelve cada fila como diccionario usando la primera línea como encabezado, así accedés por nombre de columna en vez de por índice. La documentación pide abrir el archivo con <code>newline=\"\"</code> para que el módulo maneje correctamente los saltos de línea dentro de campos entrecomillados.",
 porque:{
  "<code>csv.reader(f)</code> y acceder con <code>fila[3]</code>, que es la posición de la columna <code>email</code>":"Funciona hoy, pero se rompe en silencio si alguien cambia el orden de las columnas; no accede “por su nombre”.",
  "<code>csv.DictReader(f)</code>, con el archivo abierto en modo binario <code>'rb'</code>":"El módulo <code>csv</code> trabaja con texto: en modo binario recibe <code>bytes</code> y falla.",
  "<code>csv.DictWriter(f)</code>, con el archivo abierto usando <code>newline=''</code>":"<code>DictWriter</code> sirve para <b>escribir</b> filas, no para leerlas; además exige <code>fieldnames</code>."
 }
},
{
 id:"c2-08", clase:2, tema:"Archivos · JSON", nivel:"media",
 caso:"Tenés un archivo <code>config.json</code> ya abierto y querés convertir su contenido en un diccionario de Python.",
 pide:"¿Cuál de las cuatro funciones de <code>json</code> corresponde?",
 ops:[
  "<code>json.load(f)</code>, que lee desde un objeto archivo ya abierto",
  "<code>json.loads(f)</code>, que lee desde un objeto archivo ya abierto",
  "<code>json.dump(f)</code>, que lee desde un objeto archivo ya abierto",
  "<code>json.loads(f.readline())</code>, que lee sólo la primera línea del archivo"
 ],
 aprendido:"La <b>s</b> final significa <i>string</i>: <code>load</code>/<code>dump</code> trabajan con un <b>archivo</b>, <code>loads</code>/<code>dumps</code> con una <b>cadena</b>. Y <code>load*</code> lee (JSON → Python), <code>dump*</code> escribe (Python → JSON). Si ya hiciste <code>Path(ruta).read_text()</code> tenés un string, entonces te toca <code>json.loads()</code>.",
 porque:{
  "<code>json.loads(f)</code>, que lee desde un objeto archivo ya abierto":"<code>loads</code> (con <b>s</b>) lee desde una cadena de texto; si le pasás el archivo tira <code>TypeError</code>.",
  "<code>json.dump(f)</code>, que lee desde un objeto archivo ya abierto":"<code>dump</code> <b>escribe</b> (de Python a JSON) y además necesita dos argumentos: los datos y el archivo.",
  "<code>json.loads(f.readline())</code>, que lee sólo la primera línea del archivo":"Un JSON formateado ocupa muchas líneas: con la primera sola queda incompleto y falla con <code>JSONDecodeError</code>."
 }
},
{
 id:"c2-09", clase:2, tema:"Archivos · JSON", nivel:"media",
 caso:"Tenés que guardar un diccionario en <code>salida.json</code> de forma legible y sin que los acentos se escapen como <code>\\u00e1</code>.",
 pide:"¿Cómo lo escribís?",
 ops:[
  "<code>json.dump(config, f, indent=2, ensure_ascii=False)</code>",
  "<code>json.dump(config, f, indent=2, ensure_ascii=True)</code>",
  "<code>json.dump(config, f, indent=2, encoding='utf-8')</code>",
  "<code>json.dumps(config, indent=2, ensure_ascii=False)</code>"
 ],
 aprendido:"<code>indent=2</code> genera JSON indentado y legible; <code>ensure_ascii=False</code> conserva los caracteres acentuados tal cual (siempre que abras el archivo con <code>encoding=\"utf-8\"</code>). Sin esas opciones el JSON sale en una sola línea y con los acentos escapados.",
 porque:{
  "<code>json.dump(config, f, indent=2, ensure_ascii=True)</code>":"<code>ensure_ascii=True</code> es el valor por defecto: los acentos salen escapados como <code>\\u00e1</code>.",
  "<code>json.dump(config, f, indent=2, encoding='utf-8')</code>":"En Python 3 <code>dump</code> ya no acepta <code>encoding</code>: tira <code>TypeError</code>. El encoding se declara al abrir el archivo.",
  "<code>json.dumps(config, indent=2, ensure_ascii=False)</code>":"<code>dumps</code> <b>devuelve un texto</b>; no escribe nada en el archivo."
 }
},
{
 id:"c2-10", clase:2, tema:"Archivos · TXT", nivel:"baja",
 caso:"Querés leer un <code>.txt</code> completo a una variable de texto, con la forma moderna que muestra la cursada en vez de trabajar con rutas como cadenas.",
 pide:"¿Qué usás?",
 ops:[
  "<code>Path('notas.txt').read_text(encoding='utf-8')</code>",
  "<code>Path('notas.txt').open(encoding='utf-8')</code>",
  "<code>Path('notas.txt').read_text(encoding='utf-8').split()</code>",
  "<code>Path('notas.txt').readlines(encoding='utf-8')</code>"
 ],
 aprendido:"<code>pathlib.Path</code> es la forma moderna y legible de manejar rutas. Ofrece <code>read_text()</code>, <code>write_text()</code>, <code>exists()</code>, <code>is_file()</code>, <code>mkdir()</code> y <code>stat()</code>, y maneja bien las diferencias entre sistemas operativos.",
 porque:{
  "<code>Path('notas.txt').open(encoding='utf-8')</code>":"Devuelve un <b>objeto archivo</b> abierto (que además queda sin cerrar), no el texto completo.",
  "<code>Path('notas.txt').read_text(encoding='utf-8').split()</code>":"Devuelve una <b>lista de palabras</b>, no el texto completo en una sola variable.",
  "<code>Path('notas.txt').readlines(encoding='utf-8')</code>":"<code>Path</code> no tiene <code>readlines</code>: ese método es de los objetos archivo. Tira <code>AttributeError</code>."
 }
},
{
 id:"c2-11", clase:2, tema:"Excepciones", nivel:"alta",
 caso:"Antes de procesar un CSV querés verificar que el archivo traiga todas las columnas obligatorias y, si falta alguna, cortar el proceso con un mensaje que diga cuáles.",
 codigo:"columnas = {\"fecha\", \"producto\", \"region_ventas\", \"cantidad_ventas\"}\nlector = csv.DictReader(archivo)\nif not lector.fieldnames or not columnas.issubset(lector.fieldnames):\n    faltantes = columnas - set(lector.fieldnames or [])\n    raise ???(f\"Columnas faltantes: {faltantes}\")",
 pide:"¿Qué excepción levantás?",
 ops:[
  "<code>ValueError</code>: el archivo se leyó bien, pero su contenido no cumple lo esperado",
  "<code>KeyError</code>: falta una clave, y las columnas son las claves de cada fila",
  "<code>csv.Error</code>: el CSV tiene un problema de estructura",
  "<code>FileNotFoundError</code>: falta algo que el programa esperaba encontrar"
 ],
 aprendido:"La clase separa los errores en capas: <b>lectura</b> (<code>FileNotFoundError</code>, <code>PermissionError</code>, <code>OSError</code>), <b>parseo</b> (<code>JSONDecodeError</code>, <code>csv.Error</code>, <code>UnicodeDecodeError</code>) y <b>validación</b> (<code>ValueError</code>, <code>KeyError</code>, <code>TypeError</code>). Una columna faltante es un problema de validación de estructura: <code>ValueError</code>.",
 porque:{
  "<code>KeyError</code>: falta una clave, y las columnas son las claves de cada fila":"<code>KeyError</code> lo lanza Python cuando <b>accedés</b> a una clave inexistente. Acá se valida antes justamente para no llegar a eso.",
  "<code>csv.Error</code>: el CSV tiene un problema de estructura":"<code>csv.Error</code> es del parser (comillas mal cerradas, por ejemplo). Este CSV se leyó bien; lo que falla es el contrato de columnas.",
  "<code>FileNotFoundError</code>: falta algo que el programa esperaba encontrar":"Esa excepción es sólo para rutas inexistentes. El archivo se abrió sin problema."
 }
},
{
 id:"c2-12", clase:2, tema:"Excepciones", nivel:"alta",
 caso:"Querés diferenciar una falla técnica de una falla de negocio: “la edad no puede ser negativa” no es lo mismo que “el disco está lleno”.",
 pide:"¿Cómo lo resolvés?",
 ops:[
  "Definir <code>class DatosInvalidosError(ValueError): ...</code> y levantarla con <code>raise</code>",
  "Definir <code>class DatosInvalidosError(BaseException): ...</code> para que ningún <code>except</code> la atrape por error",
  "Levantar <code>raise Exception('edad negativa')</code> con un mensaje distinto en cada caso",
  "Validar con <code>assert edad >= 0, 'edad negativa'</code> para que el programa corte"
 ],
 aprendido:"Se crean excepciones propias cuando el error pertenece al dominio del problema, cuando querés distinguir fallas técnicas de fallas de negocio, o cuando distintas capas deben reaccionar distinto. La documentación de Python recomienda derivar de <code>Exception</code> o de una subclase como <code>ValueError</code>, <b>nunca</b> de <code>BaseException</code>.",
 porque:{
  "Definir <code>class DatosInvalidosError(BaseException): ...</code> para que ningún <code>except</code> la atrape por error":"<code>BaseException</code> incluye <code>KeyboardInterrupt</code> y <code>SystemExit</code>: heredar de ahí rompe la interrupción normal del programa.",
  "Levantar <code>raise Exception('edad negativa')</code> con un mensaje distinto en cada caso":"Con <code>Exception</code> genérica no se puede distinguir una falla de negocio de una técnica: habría que comparar textos.",
  "Validar con <code>assert edad >= 0, 'edad negativa'</code> para que el programa corte":"Los <code>assert</code> se desactivan al ejecutar con <code>python -O</code>: no sirven como validación de datos de entrada."
 }
},
{
 id:"c2-13", clase:2, tema:"Excepciones", nivel:"media",
 caso:"El archivo existe y tiene permisos, pero tiene caracteres raros y al leerlo revienta porque el encoding no coincide.",
 pide:"¿Qué excepción esperás y cómo lo prevenís?",
 ops:[
  "<code>UnicodeDecodeError</code>; se previene declarando <code>encoding='utf-8'</code> al abrir",
  "<code>UnicodeEncodeError</code>; se previene declarando <code>encoding='utf-8'</code> al abrir",
  "<code>UnicodeDecodeError</code>; se previene abriendo el archivo en modo <code>'rb'</code>",
  "<code>ValueError</code>; se previene con <code>errors='strict'</code> al abrir"
 ],
 aprendido:"No declarar el encoding es uno de los antipatrones de la clase: el programa queda atado al encoding por defecto del sistema y funciona en tu máquina pero falla en otra. Declarar siempre <code>encoding=\"utf-8\"</code> al abrir y capturar <code>UnicodeDecodeError</code> como error de <b>parseo</b>.",
 porque:{
  "<code>UnicodeEncodeError</code>; se previene declarando <code>encoding='utf-8'</code> al abrir":"<code>Encode</code> es el error al <b>escribir</b> (texto → bytes). Al leer bytes que no coinciden con el encoding es <code>Decode</code>.",
  "<code>UnicodeDecodeError</code>; se previene abriendo el archivo en modo <code>'rb'</code>":"En <code>'rb'</code> no hay decodificación, pero recibís <code>bytes</code> en lugar de texto: no resuelve el problema, lo esquiva.",
  "<code>ValueError</code>; se previene con <code>errors='strict'</code> al abrir":"<code>'strict'</code> es justamente el comportamiento por defecto (el que falla): no previene nada."
 }
},
{
 id:"c2-14", clase:2, tema:"Excepciones", nivel:"media",
 caso:"En el bloque <code>try</code> querés que quede <b>solo</b> lo que puede fallar, y separar el camino exitoso.",
 pide:"¿Qué cláusula usás para el camino sin error?",
 ops:[
  "<code>else:</code> después de los <code>except</code>; corre sólo si el <code>try</code> no lanzó ninguna excepción",
  "<code>finally:</code> después de los <code>except</code>; corre sólo si el <code>try</code> no lanzó ninguna excepción",
  "<code>except None:</code> después del <code>try</code>; corre cuando no hubo nada que capturar",
  "<code>elif:</code> después de los <code>except</code>; se evalúa si el <code>try</code> no lanzó ninguna excepción"
 ],
 aprendido:"El modelo completo es <code>try / except / else / finally</code>. <b><code>else</code></b> corre solo si no hubo excepción (el camino feliz), <b><code>finally</code></b> corre siempre (limpieza de recursos). Mantener el <code>try</code> chico y mover el resto al <code>else</code> evita capturar errores de cálculo que nada tienen que ver con la lectura.",
 porque:{
  "<code>finally:</code> después de los <code>except</code>; corre sólo si el <code>try</code> no lanzó ninguna excepción":"<code>finally</code> corre <b>siempre</b>, haya error o no: sirve para limpiar recursos, no para el camino sin error.",
  "<code>except None:</code> después del <code>try</code>; corre cuando no hubo nada que capturar":"Un <code>except</code> sólo corre cuando <b>hubo</b> una excepción: nunca es el camino sin error (y <code>except None</code> no captura nada).",
  "<code>elif:</code> después de los <code>except</code>; se evalúa si el <code>try</code> no lanzó ninguna excepción":"<code>elif</code> necesita una condición y sólo existe dentro de un <code>if</code>: en un <code>try</code> es un error de sintaxis."
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
  "<code>precios = np.array(precios); precios + 1.21</code>",
  "<code>precios = np.array(precios); precios.apply(lambda p: p * 1.21)</code>",
  "<code>precios = np.array(precios); (precios * 1.21).sum()</code>"
 ],
 aprendido:"<b>Vectorizar</b> es aplicar una operación a todos los elementos de una sola vez. Con un <code>ndarray</code> de NumPy, <code>precios * 1.21</code> se aplica elemento por elemento y el código se lee como una fórmula matemática. En datos hay que pensar en columnas y vectores completos, no elemento por elemento.",
 porque:{
  "<code>precios = np.array(precios); precios + 1.21</code>":"Suma 1,21 <b>pesos</b> a cada precio; un IVA del 21 % se aplica multiplicando por 1,21.",
  "<code>precios = np.array(precios); precios.apply(lambda p: p * 1.21)</code>":"<code>apply</code> es de Pandas: un <code>ndarray</code> no lo tiene y tira <code>AttributeError</code> (y además volvería a ser un ciclo).",
  "<code>precios = np.array(precios); (precios * 1.21).sum()</code>":"Devuelve <b>un único número</b> (el total): la consigna pide el precio de cada producto."
 }
},
{
 id:"c3-02", clase:3, tema:"NumPy", nivel:"baja",
 caso:"Antes de operar querés saber si tu arreglo es un vector o una matriz, cuántos elementos tiene por eje y de qué tipo son.",
 pide:"¿Qué propiedades consultás?",
 ops:[
  "<code>.ndim</code>, <code>.shape</code>, <code>.size</code> y <code>.dtype</code>",
  "<code>.ndim</code>, <code>.shape</code>, <code>.size</code> y <code>.type</code>",
  "<code>.dims</code>, <code>.shape</code>, <code>.count</code> y <code>.dtype</code>",
  "<code>.rank</code>, <code>.shape</code>, <code>.size</code> y <code>.dtypes</code>"
 ],
 aprendido:"Las cuatro preguntas básicas de un <code>ndarray</code>: <b><code>ndim</code></b> (cantidad de ejes), <b><code>shape</code></b> (elementos por eje, ej. <code>(2, 3)</code>), <b><code>size</code></b> (total de elementos) y <b><code>dtype</code></b> (tipo: <code>int64</code>, <code>float64</code>, <code>bool</code>). Si entendés estas cuatro, entendés por qué un cálculo funciona o por qué salta un error de forma.",
 porque:{
  "<code>.ndim</code>, <code>.shape</code>, <code>.size</code> y <code>.type</code>":"Casi: el tipo de los elementos se consulta con <code>.dtype</code>; un <code>ndarray</code> no tiene <code>.type</code>.",
  "<code>.dims</code>, <code>.shape</code>, <code>.count</code> y <code>.dtype</code>":"Ni <code>.dims</code> ni <code>.count</code> existen en NumPy: los nombres correctos son <code>.ndim</code> y <code>.size</code>.",
  "<code>.rank</code>, <code>.shape</code>, <code>.size</code> y <code>.dtypes</code>":"<code>.rank</code> no es un atributo del arreglo (la cantidad de ejes es <code>.ndim</code>) y <code>.dtypes</code> (plural) es de los DataFrames."
 }
},
{
 id:"c3-03", clase:3, tema:"NumPy", nivel:"media",
 caso:"De un arreglo de edades querés quedarte solo con las personas mayores de edad.",
 codigo:"edades = np.array([17, 22, 19, 15])",
 pide:"¿Qué técnica aplicás?",
 ops:[
  "<code>edades[edades >= 18]</code>",
  "<code>edades[edades > 18]</code>",
  "<code>edades.where(edades >= 18)</code>",
  "<code>edades[edades >= 18] = 0</code>"
 ],
 aprendido:"Una comparación sobre un arreglo devuelve otro arreglo de <code>True/False</code> (<code>[False, True, True, False]</code>). Ese arreglo booleano se usa como filtro entre corchetes. Es el mismo mecanismo que en Pandas con <code>df[df['nota'] >= 6]</code>.",
 porque:{
  "<code>edades[edades > 18]</code>":"Deja afuera a quien tiene exactamente 18, que ya es mayor de edad: el umbral es <code>>=</code>.",
  "<code>edades.where(edades >= 18)</code>":"<code>where</code> es un método de Pandas: un <code>ndarray</code> no lo tiene y tira <code>AttributeError</code>.",
  "<code>edades[edades >= 18] = 0</code>":"Es una <b>asignación</b>: pisa con 0 a los mayores y no devuelve ningún arreglo filtrado."
 }
},
{
 id:"c3-04", clase:3, tema:"NumPy", nivel:"media",
 caso:"Consigna del práctico: “Usar NumPy para aplicar 10% de descuento cuando la cantidad sea 5 o más, y 0% en el resto”.",
 pide:"¿Qué función usás?",
 ops:[
  "<code>np.where(df['cantidad'] >= 5, 0.10, 0.00)</code>",
  "<code>np.where(df['cantidad'] > 5, 0.10, 0.00)</code>",
  "<code>np.where(df['cantidad'] >= 5, 0.00, 0.10)</code>",
  "<code>np.where(df['cantidad'] >= 5) * 0.10</code>"
 ],
 aprendido:"<b><code>np.where(condición, valor_si_true, valor_si_false)</code></b> es el <code>if/else</code> vectorizado: una sola condición y dos salidas. Aparece en casi todos los ejercicios del bloque 2: descuentos, “Aprobado/Desaprobado”, “Alto/Moderado”, “Sí/No”.",
 porque:{
  "<code>np.where(df['cantidad'] > 5, 0.10, 0.00)</code>":"Deja sin descuento a quien compra exactamente 5, y la consigna dice “5 <b>o más</b>”.",
  "<code>np.where(df['cantidad'] >= 5, 0.00, 0.10)</code>":"Los valores están invertidos: daría 0 % a quien compra 5 o más y 10 % a los demás.",
  "<code>np.where(df['cantidad'] >= 5) * 0.10</code>":"Con un solo argumento <code>np.where</code> devuelve los <b>índices</b> donde se cumple la condición (una tupla); multiplicarla por 0,10 tira <code>TypeError</code>."
 }
},
{
 id:"c3-05", clase:3, tema:"NumPy", nivel:"media",
 caso:"Consigna: clasificar cada entrega como <b>Rápida</b> (≤25 min), <b>Normal</b> (≤40 min) o <b>Demorada</b> (el resto).",
 pide:"¿Qué función de NumPy corresponde?",
 ops:[
  "<code>np.select([m <= 25, m <= 40], ['Rápida', 'Normal'], default='Demorada')</code>",
  "<code>np.select([m <= 40, m <= 25], ['Normal', 'Rápida'], default='Demorada')</code>",
  "<code>np.select([m <= 25, m <= 40], ['Rápida', 'Normal', 'Demorada'])</code>",
  "<code>np.select([m <= 25, 25 < m <= 40], ['Rápida', 'Normal'], default='Demorada')</code>"
 ],
 aprendido:"Cuando hay <b>más de dos</b> categorías, <code>np.where</code> se queda corto y va <b><code>np.select</code></b>: recibe una lista de condiciones, una lista de resultados en el mismo orden, y un <code>default</code> para lo que no entra en ninguna. Las condiciones se evalúan <b>en orden</b>, así que la primera que se cumple gana.",
 porque:{
  "<code>np.select([m <= 40, m <= 25], ['Normal', 'Rápida'], default='Demorada')</code>":"Las condiciones se evalúan <b>en orden</b> y gana la primera que se cumple: todo lo que es ≤ 25 ya es ≤ 40, así que 'Rápida' nunca aparece.",
  "<code>np.select([m <= 25, m <= 40], ['Rápida', 'Normal', 'Demorada'])</code>":"Hay 2 condiciones y 3 resultados: las listas tienen que tener el mismo largo (el resto va en <code>default</code>). Tira <code>ValueError</code>.",
  "<code>np.select([m <= 25, 25 < m <= 40], ['Rápida', 'Normal'], default='Demorada')</code>":"La comparación encadenada <code>25 < m <= 40</code> no funciona con arreglos: tira el error de “valor de verdad ambiguo”."
 }
},
{
 id:"c3-06", clase:3, tema:"NumPy", nivel:"media",
 caso:"Consigna: “Calcular el percentil 75 de los tiempos de entrega”.",
 pide:"¿Qué usás?",
 ops:[
  "<code>np.percentile(reporte['minutos'], 75)</code>",
  "<code>np.percentile(reporte['minutos'], 0.75)</code>",
  "<code>np.quantile(reporte['minutos'], 75)</code>",
  "<code>np.percentile(reporte['minutos'], [25, 75])</code>"
 ],
 aprendido:"Para estadística descriptiva con NumPy: <b>tendencia central</b> con <code>np.mean()</code> y <code>np.median()</code>; <b>dispersión</b> con <code>np.std()</code>, <code>np.var()</code> y <code>np.percentile()</code>. El percentil 75 es el valor por debajo del cual queda el 75% de las observaciones.",
 porque:{
  "<code>np.percentile(reporte['minutos'], 0.75)</code>":"<code>percentile</code> espera un valor de 0 a 100: con 0,75 calcula el percentil 0,75 (casi el mínimo).",
  "<code>np.quantile(reporte['minutos'], 75)</code>":"<code>quantile</code> espera un valor entre 0 y 1: con 75 tira <code>ValueError</code>.",
  "<code>np.percentile(reporte['minutos'], [25, 75])</code>":"Devuelve <b>dos</b> valores (el percentil 25 y el 75); la consigna pide sólo el 75."
 }
},
{
 id:"c3-07", clase:3, tema:"NumPy", nivel:"alta",
 caso:"Consigna de reposición: calcular cuántas unidades faltan para cubrir 4 semanas, sin que dé negativo, y redondeando siempre hacia arriba.",
 pide:"¿Qué combinación usás?",
 ops:[
  "<code>np.ceil(np.maximum(4 * venta_semanal - stock, 0))</code>",
  "<code>np.ceil(np.minimum(4 * venta_semanal - stock, 0))</code>",
  "<code>np.maximum(np.floor(4 * venta_semanal - stock), 0)</code>",
  "<code>np.ceil(np.abs(4 * venta_semanal - stock))</code>"
 ],
 aprendido:"<b><code>np.maximum(x, 0)</code></b> pisa los negativos con cero (si sobra stock, no hay que reponer nada). <b><code>np.ceil()</code></b> redondea hacia arriba, porque no se pueden pedir 3,2 unidades: hay que pedir 4. Son dos operaciones vectorizadas encadenadas.",
 porque:{
  "<code>np.ceil(np.minimum(4 * venta_semanal - stock, 0))</code>":"<code>minimum</code> se queda con los <b>negativos</b> (el sobrante) y pisa con 0 lo que falta: al revés de lo pedido.",
  "<code>np.maximum(np.floor(4 * venta_semanal - stock), 0)</code>":"<code>floor</code> redondea hacia abajo y la consigna pide siempre hacia arriba: te queda corto.",
  "<code>np.ceil(np.abs(4 * venta_semanal - stock))</code>":"<code>abs</code> convierte el sobrante en un pedido positivo: pedirías mercadería que ya te sobra."
 }
},
{
 id:"c3-08", clase:3, tema:"NumPy", nivel:"media",
 caso:"Un arreglo de temperaturas tiene un <code>np.nan</code> y querés calcular el promedio solo con los valores válidos.",
 codigo:"temperaturas = np.array([30, 31, 29, np.nan, 80])",
 pide:"¿Cómo los filtrás?",
 ops:[
  "<code>limpias = temperaturas[~np.isnan(temperaturas)]</code>",
  "<code>limpias = temperaturas[np.isnan(temperaturas)]</code>",
  "<code>limpias = temperaturas[temperaturas != np.nan]</code>",
  "<code>limpias = np.nan_to_num(temperaturas)</code>"
 ],
 aprendido:"<code>np.nan</code> <b>no es igual a sí mismo</b>: hay que detectarlo con <code>np.isnan()</code>, nunca con <code>==</code>. El <code>~</code> es la negación de la máscara booleana, así que <code>~np.isnan(x)</code> significa “los que <b>no</b> son nulos”.",
 porque:{
  "<code>limpias = temperaturas[np.isnan(temperaturas)]</code>":"Sin el <code>~</code> se queda <b>sólo con los nulos</b>: es la máscara opuesta.",
  "<code>limpias = temperaturas[temperaturas != np.nan]</code>":"<code>nan != nan</code> es siempre <code>True</code>: la máscara deja pasar todo, nulos incluidos.",
  "<code>limpias = np.nan_to_num(temperaturas)</code>":"No filtra: reemplaza cada nulo por 0 y conserva la longitud, con lo que el promedio queda distorsionado."
 }
},

/* ---------- CLASE 3 · Pandas base ---------- */
{
 id:"c3-09", clase:3, tema:"Pandas", nivel:"baja",
 caso:"Acabás de cargar un DataFrame y todavía no calculaste nada. Querés ver las primeras filas, saber qué tipo tiene cada columna, cuántos nulos hay y un resumen estadístico.",
 pide:"¿Qué tres métodos usás, en ese orden?",
 ops:[
  "<code>df.head()</code>, <code>df.info()</code> y <code>df.describe()</code>, en ese orden",
  "<code>df.head()</code>, <code>df.describe()</code> y <code>df.count()</code>, en ese orden",
  "<code>df.tail()</code>, <code>df.dtypes</code> y <code>df.shape</code>, en ese orden",
  "<code>df.info()</code>, <code>df.head()</code> y <code>df.mean()</code>, en ese orden"
 ],
 aprendido:"Regla de oro de la clase: <b>inspeccionar antes de calcular</b>. <code>head()</code> muestra un vistazo, <code>info()</code> resume columnas, tipos y no-nulos, y <code>describe()</code> da el resumen estadístico de las columnas numéricas. Si una columna numérica aparece como <code>object</code>, casi seguro tiene símbolos, comas o texto mal escrito.",
 porque:{
  "<code>df.head()</code>, <code>df.describe()</code> y <code>df.count()</code>, en ese orden":"Falta <code>info()</code>: <code>count()</code> da los no-nulos pero no muestra los <b>tipos</b> de cada columna.",
  "<code>df.tail()</code>, <code>df.dtypes</code> y <code>df.shape</code>, en ese orden":"Ves tipos y tamaño, pero ningún resumen estadístico ni la cantidad de nulos.",
  "<code>df.info()</code>, <code>df.head()</code> y <code>df.mean()</code>, en ese orden":"<code>mean()</code> ya es un cálculo (y sólo de una métrica): no reemplaza al resumen que da <code>describe()</code>."
 }
},
{
 id:"c3-10", clase:3, tema:"Pandas", nivel:"baja",
 caso:"Querés seleccionar de un DataFrame las columnas <code>nombre</code> y <code>promedio</code>, y que el resultado siga siendo un DataFrame (no una Series).",
 pide:"¿Cómo lo escribís?",
 ops:[
  "<code>df[['nombre', 'promedio']]</code>, con una lista dentro de los corchetes",
  "<code>df.loc['nombre', 'promedio']</code>, con las dos etiquetas separadas por coma",
  "<code>df.iloc[:, ['nombre', 'promedio']]</code>, seleccionando todas las filas",
  "<code>df['nombre':'promedio']</code>, con un rango entre las dos etiquetas"
 ],
 aprendido:"La regla de los corchetes: <b>un corchete con un nombre → Series</b> (<code>df['edad']</code>), <b>corchete con una lista de nombres → DataFrame</b> (<code>df[['nombre','edad']]</code>). Es la confusión más frecuente al armar reportes con varias columnas.",
 porque:{
  "<code>df.loc['nombre', 'promedio']</code>, con las dos etiquetas separadas por coma":"<code>loc[fila, columna]</code> interpreta <code>'nombre'</code> como una <b>fila</b>: tira <code>KeyError</code>.",
  "<code>df.iloc[:, ['nombre', 'promedio']]</code>, seleccionando todas las filas":"<code>iloc</code> trabaja con <b>posiciones numéricas</b>, no con nombres de columnas: falla con un error de indexación.",
  "<code>df['nombre':'promedio']</code>, con un rango entre las dos etiquetas":"Un rango entre corchetes <b>corta filas</b>, no columnas."
 }
},
{
 id:"c3-11", clase:3, tema:"Pandas", nivel:"media",
 caso:"Consigna: “Calcular la facturación total por sede”. Ya tenés la columna <code>importe</code> calculada.",
 pide:"¿Qué operación usás?",
 ops:[
  "<code>df.groupby('sede', as_index=False)['importe'].sum()</code>",
  "<code>df.groupby('importe', as_index=False)['sede'].sum()</code>",
  "<code>df.groupby('sede', as_index=False)['importe'].count()</code>",
  "<code>df.groupby(['sede', 'importe'])['importe'].sum()</code>"
 ],
 aprendido:"<b><code>groupby</code> resume</b>: agrupa filas por categoría y aplica una métrica (<code>sum()</code>, <code>mean()</code>, <code>size()</code>, <code>count()</code>). <code>as_index=False</code> deja la clave de agrupación como columna normal en vez de convertirla en índice, cosa que facilita después graficar o cruzar.",
 porque:{
  "<code>df.groupby('importe', as_index=False)['sede'].sum()</code>":"Los roles están cruzados: agrupa por importe y suma texto (los nombres de sede).",
  "<code>df.groupby('sede', as_index=False)['importe'].count()</code>":"<code>count()</code> cuenta cuántas filas hay por sede; no suma la facturación.",
  "<code>df.groupby(['sede', 'importe'])['importe'].sum()</code>":"Agrupar también por <code>importe</code> da una fila por cada combinación: nunca llegás a un total por sede."
 }
},
{
 id:"c3-12", clase:3, tema:"Pandas", nivel:"media",
 caso:"Querés una tabla que muestre la facturación con las <b>regiones en las filas</b> y los <b>productos en las columnas</b> para comparar de un vistazo.",
 pide:"¿Qué usás?",
 ops:[
  "<code>pd.pivot_table(df, values='total', index='region', columns='producto', aggfunc='sum')</code>",
  "<code>pd.pivot_table(df, values='total', index='producto', columns='region', aggfunc='sum')</code>",
  "<code>pd.pivot_table(df, values='total', index='region', columns='producto', aggfunc='count')</code>",
  "<code>pd.pivot_table(df, values='region', index='total', columns='producto', aggfunc='sum')</code>"
 ],
 aprendido:"La tríada de la clase: <b><code>groupby</code> resume</b>, <b><code>pivot_table</code> compara</b> (reorganiza categorías en filas y columnas) y <b><code>merge</code> integra</b> (une fuentes por clave). Cuando la pregunta es “comparar A contra B en una grilla”, es <code>pivot_table</code>.",
 porque:{
  "<code>pd.pivot_table(df, values='total', index='producto', columns='region', aggfunc='sum')</code>":"Está traspuesta: dejaría los productos en las filas y las regiones en las columnas, al revés de lo pedido.",
  "<code>pd.pivot_table(df, values='total', index='region', columns='producto', aggfunc='count')</code>":"Con <code>count</code> la grilla muestra <b>cuántas ventas</b> hubo, no cuánto se facturó.",
  "<code>pd.pivot_table(df, values='region', index='total', columns='producto', aggfunc='sum')</code>":"Los roles están cruzados: intenta sumar una columna de texto (<code>region</code>) y usa <code>total</code> como filas."
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
  "<code>.loc[101]</code> para la etiqueta y <code>.loc[0]</code> para la posición",
  "<code>.iloc[101]</code> para la etiqueta y <code>.iloc[0]</code> para la posición"
 ],
 aprendido:"<b><code>loc</code> responde “¿qué etiqueta?”</b> y <b><code>iloc</code> responde “¿qué posición?”</b>. Otra diferencia clave: con etiquetas, <code>loc[0:2]</code> <b>incluye</b> ambos extremos; con posiciones, <code>iloc[0:2]</code> <b>excluye</b> el 2, como el slicing de Python.",
 porque:{
  "<code>.iloc[101]</code> para la etiqueta y <code>.loc[0]</code> para la posición":"Está invertido: <code>iloc[101]</code> busca la fila número 101 y tira <code>IndexError</code>.",
  "<code>.loc[101]</code> para la etiqueta y <code>.loc[0]</code> para la posición":"<code>loc[0]</code> busca la <b>etiqueta</b> 0, que no existe si el índice es <code>id_venta</code>: tira <code>KeyError</code>.",
  "<code>.iloc[101]</code> para la etiqueta y <code>.iloc[0]</code> para la posición":"<code>iloc[101]</code> es la posición 101, no el <code>id_venta</code> 101; sólo <code>iloc[0]</code> está bien."
 }
},
{
 id:"c4-02", clase:4, tema:"Filtrado", nivel:"media",
 caso:"Querés las ventas con importe ≥ 800 <b>y</b> producto A o B.",
 pide:"¿Cuál es la sintaxis correcta en Pandas?",
 ops:[
  "<code>df[(df['importe'] >= 800) & df['producto'].isin(['A','B'])]</code>",
  "<code>df[(df['importe'] >= 800) | df['producto'].isin(['A','B'])]</code>",
  "<code>df[df['importe'] >= 800 & df['producto'].isin(['A','B'])]</code>",
  "<code>df[(df['importe'] >= 800) & (df['producto'] == ['A','B'])]</code>"
 ],
 aprendido:"Dos reglas que se toman siempre: <b>en Pandas se usa <code>&amp;</code> para “y”, <code>|</code> para “o” y <code>~</code> para negar</b> (no <code>and</code>/<code>or</code>/<code>not</code>), y <b>cada condición va entre paréntesis</b> porque <code>&amp;</code> tiene más precedencia que <code>&gt;=</code>. Para pertenencia a una lista, <code>isin()</code>; para rangos, <code>between()</code>; para texto, <code>str.contains()</code>.",
 porque:{
  "<code>df[(df['importe'] >= 800) | df['producto'].isin(['A','B'])]</code>":"<code>|</code> es “o”: trae también lo que cumple sólo una condición; se pidió importe alto <b>y</b> producto A o B.",
  "<code>df[df['importe'] >= 800 & df['producto'].isin(['A','B'])]</code>":"Sin paréntesis, <code>&</code> se evalúa antes que <code>>=</code>: Python intenta <code>800 & df[...]</code> y falla o da un resultado incorrecto.",
  "<code>df[(df['importe'] >= 800) & (df['producto'] == ['A','B'])]</code>":"Comparar una columna con <code>==</code> contra una lista no equivale a “es A o B”: para pertenencia se usa <code>isin()</code>."
 }
},
{
 id:"c4-03", clase:4, tema:"Filtrado", nivel:"media",
 caso:"Querés las filas donde el producto contenga la letra “B”, sabiendo que algunas filas tienen el producto en nulo.",
 pide:"¿Cómo lo escribís sin que explote?",
 ops:[
  "<code>df[df['producto'].str.contains('B', na=False)]</code>",
  "<code>df[df['producto'].str.contains('B', na=True)]</code>",
  "<code>df[df['producto'].str.contains('B', case=False)]</code>",
  "<code>df[df['producto'].str.match('B', na=False)]</code>"
 ],
 aprendido:"<code>str.contains()</code> busca subcadenas dentro de una columna de texto. Con nulos devuelve <code>NaN</code>, que rompe el filtro booleano: por eso <b><code>na=False</code></b> los trata como “no cumple”. También existe <code>case=False</code> para ignorar mayúsculas.",
 porque:{
  "<code>df[df['producto'].str.contains('B', na=True)]</code>":"<code>na=True</code> trata los nulos como <b>coincidencias</b>: los devuelve dentro del resultado.",
  "<code>df[df['producto'].str.contains('B', case=False)]</code>":"Ignora mayúsculas, pero no dice qué hacer con los nulos: siguen rompiendo el filtro booleano.",
  "<code>df[df['producto'].str.match('B', na=False)]</code>":"<code>match</code> sólo detecta el texto que <b>empieza</b> con “B”: se pierden los que la contienen sin empezar con ella, como “Sombrero B-12” o “AB”."
 }
},
{
 id:"c4-04", clase:4, tema:"Integración", nivel:"media",
 caso:"Tenés las ventas de enero en un DataFrame y las de febrero en otro, con <b>las mismas columnas</b>. Querés una sola tabla con todos los registros.",
 pide:"¿<code>concat</code> o <code>merge</code>?",
 ops:[
  "<code>pd.concat([enero, febrero], axis=0, ignore_index=True)</code>",
  "<code>pd.concat([enero, febrero], axis=1, ignore_index=True)</code>",
  "<code>pd.concat(enero, febrero, ignore_index=True)</code>",
  "<code>enero.combine_first(febrero).reset_index(drop=True)</code>"
 ],
 aprendido:"<b>Misma estructura → <code>concat</code>. Entidades relacionadas → <code>merge</code>.</b> <code>concat</code> apila sin interpretar claves de negocio: <code>axis=0</code> agrega filas (como <code>UNION ALL</code>) y <code>ignore_index=True</code> reconstruye un índice continuo 0,1,2… <code>axis=1</code> pega al costado alineando por índice.",
 porque:{
  "<code>pd.concat([enero, febrero], axis=1, ignore_index=True)</code>":"<code>axis=1</code> pega las tablas <b>una al lado de la otra</b>: duplicaría las columnas en vez de apilar los registros.",
  "<code>pd.concat(enero, febrero, ignore_index=True)</code>":"<code>concat</code> recibe <b>una lista</b> de DataFrames como primer argumento; pasarlos sueltos tira <code>TypeError</code>.",
  "<code>enero.combine_first(febrero).reset_index(drop=True)</code>":"<code>combine_first</code> alinea por índice y completa los <b>huecos</b> de una tabla con la otra: con índices 0, 1, 2… repetidos mezcla filas en vez de apilarlas."
 }
},
{
 id:"c4-05", clase:4, tema:"Integración", nivel:"media",
 caso:"Querés enriquecer la tabla de ventas con la ciudad de cada cliente, <b>conservando todas las ventas</b> aunque algún cliente no esté en el padrón.",
 pide:"¿Qué tipo de unión usás?",
 ops:[
  "<code>ventas.merge(clientes, on='cliente_id', how='left')</code>",
  "<code>clientes.merge(ventas, on='cliente_id', how='left')</code>",
  "<code>ventas.merge(clientes, on='cliente_id', how='inner')</code>",
  "<code>ventas.merge(clientes, on='cliente_id', how='right')</code>"
 ],
 aprendido:"Los cuatro <code>how</code>: <b><code>inner</code></b> conserva solo las coincidencias, <b><code>left</code></b> mantiene todas las filas de la izquierda, <b><code>right</code></b> hace lo inverso y <b><code>outer</code></b> conserva todas las claves de ambos lados. “Conservar todas las ventas” = <code>left</code>, con la tabla de ventas a la izquierda.",
 porque:{
  "<code>clientes.merge(ventas, on='cliente_id', how='left')</code>":"Con <code>clientes</code> a la izquierda se conservan <b>todos los clientes</b> y se pierden las ventas de quien no está en el padrón.",
  "<code>ventas.merge(clientes, on='cliente_id', how='inner')</code>":"Descarta las ventas de clientes que no están en el padrón: perdés facturación sin darte cuenta.",
  "<code>ventas.merge(clientes, on='cliente_id', how='right')</code>":"Conserva todos los clientes (hayan comprado o no) y pierde las ventas huérfanas: al revés de lo pedido."
 }
},
{
 id:"c4-06", clase:4, tema:"Integración", nivel:"alta",
 caso:"Consigna del práctico: “Usar left merge con indicador para identificar los <code>producto_id</code> de movimientos que no existen en el catálogo”.",
 pide:"¿Qué parámetro agregás y cómo lo leés?",
 ops:[
  "<code>indicator=True</code>, y después filtrar por <code>df['_merge'] == 'left_only'</code>",
  "<code>indicator=True</code>, y después filtrar por <code>df['_merge'] == 'right_only'</code>",
  "<code>indicator=True</code>, y después filtrar por <code>df['_merge'] == 'both'</code>",
  "<code>validate='one_to_one'</code>, y después filtrar por <code>df['_merge'] == 'left_only'</code>"
 ],
 aprendido:"<code>indicator=True</code> agrega una columna <code>_merge</code> con tres valores posibles: <code>both</code> (cruzó), <code>left_only</code> (está solo en la izquierda) y <code>right_only</code>. Es la forma de <b>auditar</b> un merge: <code>df['_merge'].value_counts()</code> te dice cuántas claves quedaron huérfanas antes de propagar el error al reporte.",
 porque:{
  "<code>indicator=True</code>, y después filtrar por <code>df['_merge'] == 'right_only'</code>":"<code>right_only</code> son las claves que están <b>sólo en el catálogo</b>; lo que se busca son los movimientos (izquierda) que no cruzaron.",
  "<code>indicator=True</code>, y después filtrar por <code>df['_merge'] == 'both'</code>":"<code>both</code> son justamente las filas que <b>sí</b> cruzaron: es el conjunto opuesto al pedido.",
  "<code>validate='one_to_one'</code>, y después filtrar por <code>df['_merge'] == 'left_only'</code>":"Sin <code>indicator=True</code> la columna <code>_merge</code> no existe: tira <code>KeyError</code>. Además <code>validate</code> controla cardinalidad, no cruces."
 }
},
{
 id:"c4-07", clase:4, tema:"Integración", nivel:"alta",
 caso:"Antes de unir ventas con clientes querés asegurarte de que la relación sea “muchas ventas para un cliente” y que el proceso corte si aparece un cliente duplicado.",
 pide:"¿Qué parámetro usás?",
 ops:[
  "<code>validate='many_to_one'</code>, que corta con <code>MergeError</code> si el cliente aparece repetido",
  "<code>validate='one_to_many'</code>, que corta con <code>MergeError</code> si el cliente aparece repetido",
  "<code>validate='one_to_one'</code>, que corta con <code>MergeError</code> si el cliente aparece repetido",
  "<code>indicator=True</code>, que corta con <code>MergeError</code> si el cliente aparece repetido"
 ],
 aprendido:"El cardinal importa: 1:1, 1:N o N:M. <b><code>validate</code></b> declara la relación esperada y hace fallar el merge si no se cumple, antes de que un N:M inesperado te multiplique las filas (“explosión de filas”). Frase de la clase: <i>si no conocés la cardinalidad, todavía no estás listo para unir</i>.",
 porque:{
  "<code>validate='one_to_many'</code>, que corta con <code>MergeError</code> si el cliente aparece repetido":"Es la relación inversa: exigiría que sea único el lado de <b>ventas</b> y aceptaría clientes duplicados.",
  "<code>validate='one_to_one'</code>, que corta con <code>MergeError</code> si el cliente aparece repetido":"Es demasiado estricto: también corta si un mismo cliente tiene varias ventas, que es justo lo esperado.",
  "<code>indicator=True</code>, que corta con <code>MergeError</code> si el cliente aparece repetido":"<code>indicator</code> sólo agrega la columna <code>_merge</code>; nunca corta ni valida la cardinalidad."
 }
},

/* ---------- CLASE 4 · Limpieza ---------- */
{
 id:"c4-08", clase:4, tema:"Limpieza", nivel:"media",
 caso:"La columna <code>precio</code> viene como texto con valores como <code>'250000'</code>, <code>'error'</code> y <code>None</code>. Querés convertirla a número sin que el programa explote.",
 pide:"¿Cómo la convertís?",
 ops:[
  "<code>pd.to_numeric(df['precio'], errors='coerce')</code>",
  "<code>pd.to_numeric(df['precio'], errors='ignore')</code>",
  "<code>pd.to_numeric(df['precio'], errors='raise')</code>",
  "<code>df['precio'].astype('float', errors='coerce')</code>"
 ],
 aprendido:"<b><code>errors='coerce'</code></b> convierte lo que no se puede parsear en <code>NaN</code> en lugar de lanzar una excepción. Eso te deja el problema <b>visible y localizable</b>: después de convertir, siempre inspeccionar los nulos nuevos, porque suelen revelar errores de formato. Lo mismo aplica a <code>pd.to_datetime(..., errors='coerce')</code>.",
 porque:{
  "<code>pd.to_numeric(df['precio'], errors='ignore')</code>":"Si hay un valor inválido devuelve la columna <b>sin convertir</b>, dejando todo como texto (y esa opción está en desuso).",
  "<code>pd.to_numeric(df['precio'], errors='raise')</code>":"<code>'raise'</code> es el comportamiento por defecto: corta con <code>ValueError</code> en el primer 'error'.",
  "<code>df['precio'].astype('float', errors='coerce')</code>":"<code>astype</code> sólo acepta <code>'raise'</code> o <code>'ignore'</code>; <code>'coerce'</code> es de <code>to_numeric</code> y <code>to_datetime</code>."
 }
},
{
 id:"c4-09", clase:4, tema:"Limpieza", nivel:"media",
 caso:"Después de convertir a numérico te quedaron nulos en <code>importe</code>. La consigna pide completarlos con un valor robusto frente a valores extremos.",
 pide:"¿Con qué los imputás?",
 ops:[
  "<code>df['importe'].fillna(df['importe'].median())</code>",
  "<code>df['importe'].fillna(df['importe'].mode())</code>",
  "<code>df['importe'].fillna(df['importe'].mean())</code>",
  "<code>df['importe'].ffill()</code>"
 ],
 aprendido:"<b>Mediana</b>: robusta ante valores extremos, la elección por defecto para numéricos. <b>Moda</b>: útil en categorías. <b><code>ffill</code></b>: útil en series ordenadas cuando el último valor sigue vigente. Para categóricas, crear una categoría explícita (<code>fillna('Sin informar')</code>). Y si la ausencia aporta información, agregar una bandera: <code>df['importe_faltante'] = df['importe'].isna()</code>.",
 porque:{
  "<code>df['importe'].fillna(df['importe'].mode())</code>":"<code>mode()</code> devuelve una <b>Series</b>, no un valor: <code>fillna</code> la alinea por índice y completa sólo unas pocas filas.",
  "<code>df['importe'].fillna(df['importe'].mean())</code>":"El promedio se corre con un solo valor extremo; por eso la consigna pide algo robusto como la mediana.",
  "<code>df['importe'].ffill()</code>":"Repite el valor de la fila anterior: sólo tiene sentido en series ordenadas, y el resultado depende del orden de las filas."
 }
},
{
 id:"c4-10", clase:4, tema:"Limpieza", nivel:"media",
 caso:"El padrón de estudiantes tiene el mismo <code>estudiante_id</code> repetido. Querés quedarte con una sola fila por ID, conservando la primera aparición.",
 pide:"¿Cómo lo hacés?",
 ops:[
  "<code>df.drop_duplicates(subset='estudiante_id', keep='first')</code>",
  "<code>df.drop_duplicates(subset='estudiante_id', keep='last')</code>",
  "<code>df.drop_duplicates(subset='estudiante_id', keep=False)</code>",
  "<code>df.drop_duplicates(keep='first')</code>"
 ],
 aprendido:"<b><code>subset</code></b> define qué significa “la misma fila”: sin él, <code>drop_duplicates()</code> exige que <b>todas</b> las columnas coincidan (duplicado completo), y un duplicado <i>semántico</i> comparte la clave aunque cambien otros campos. <b><code>keep</code></b> elige cuál conservar: <code>'first'</code>, <code>'last'</code> (útil si el registro más reciente corrige al anterior, ordenando antes por fecha) o <code>False</code> para marcarlos todos e inspeccionarlos.",
 porque:{
  "<code>df.drop_duplicates(subset='estudiante_id', keep='last')</code>":"Conserva la <b>última</b> aparición de cada ID, no la primera.",
  "<code>df.drop_duplicates(subset='estudiante_id', keep=False)</code>":"<code>keep=False</code> borra <b>todas</b> las filas repetidas, incluida la primera: el estudiante desaparece.",
  "<code>df.drop_duplicates(keep='first')</code>":"Sin <code>subset</code> sólo elimina filas idénticas en <b>todas</b> las columnas: si cambia la carrera, el ID duplicado sobrevive."
 }
},
{
 id:"c4-11", clase:4, tema:"Limpieza", nivel:"media",
 caso:"La columna <code>zona</code> viene como <code>' centro '</code>, <code>'NORTE'</code> y <code>'sur'</code> y querés unificarla a <code>'Centro'</code>, <code>'Norte'</code>, <code>'Sur'</code>.",
 pide:"¿Qué encadenás?",
 ops:[
  "<code>df['zona'].str.strip().str.title()</code>",
  "<code>df['zona'].str.strip().str.upper()</code>",
  "<code>df['zona'].strip().title()</code>",
  "<code>df['zona'].str.lstrip().str.title()</code>"
 ],
 aprendido:"El accesor <code>.str</code> aplica métodos de texto a toda la columna. <b><code>strip()</code></b> saca espacios al principio y al final, <b><code>title()</code></b> pone la primera letra de cada palabra en mayúscula. Regla de la clase: <b>primero normalizar texto, después convertir</b>. Sin normalizar, <code>groupby('zona')</code> te genera tres grupos distintos para la misma zona.",
 porque:{
  "<code>df['zona'].str.strip().str.upper()</code>":"Saca los espacios, pero deja todo en mayúsculas: 'CENTRO', 'NORTE', 'SUR', no 'Centro', 'Norte', 'Sur'.",
  "<code>df['zona'].strip().title()</code>":"Falta el accesor <code>.str</code>: una Series no tiene <code>strip()</code> ni <code>title()</code> y tira <code>AttributeError</code>.",
  "<code>df['zona'].str.lstrip().str.title()</code>":"<code>lstrip</code> sólo saca los espacios del <b>principio</b>: ' centro ' quedaría como 'Centro ' (con un espacio al final)."
 }
},
{
 id:"c4-12", clase:4, tema:"Limpieza", nivel:"alta",
 caso:"Las notas vienen como texto y algunas están fuera del rango válido 0–10 (por ejemplo <code>'12'</code>). Querés invalidarlas para después imputarlas.",
 pide:"¿Cómo marcás las notas fuera de rango?",
 ops:[
  "<code>notas.loc[~notas['nota'].between(0, 10), 'nota'] = pd.NA</code>",
  "<code>notas.loc[notas['nota'].between(0, 10), 'nota'] = pd.NA</code>",
  "<code>notas.loc[~notas['nota'].between(0, 10)] = pd.NA</code>",
  "<code>notas['nota'][~notas['nota'].between(0, 10)] = pd.NA</code>"
 ],
 aprendido:"<b><code>between(a, b)</code></b> devuelve <code>True</code> para el rango (inclusive), y <code>~</code> lo niega: “las que <b>no</b> están entre 0 y 10”. Se combina con <code>.loc[máscara, 'columna'] = valor</code>, que es la forma correcta de asignar sobre un subconjunto sin caer en el <i>chained assignment</i> que Pandas advierte.",
 porque:{
  "<code>notas.loc[notas['nota'].between(0, 10), 'nota'] = pd.NA</code>":"Sin el <code>~</code> invalida las notas <b>correctas</b> (las que sí están entre 0 y 10).",
  "<code>notas.loc[~notas['nota'].between(0, 10)] = pd.NA</code>":"Sin nombrar la columna, vacía <b>todas</b> las columnas de esas filas, no sólo la nota.",
  "<code>notas['nota'][~notas['nota'].between(0, 10)] = pd.NA</code>":"Es asignación encadenada: puede escribir sobre una copia y no modificar el DataFrame original."
 }
},

/* ---------- CLASE 4 · Formatos ---------- */
{
 id:"c4-13", clase:4, tema:"Formatos", nivel:"media",
 caso:"Tenés que leer un CSV europeo: separador <code>;</code>, coma decimal, una columna de fechas y los IDs que deben quedar enteros aunque haya nulos.",
 pide:"¿Cómo lo cargás de forma explícita?",
 ops:[
  "<code>pd.read_csv(f, sep=';', decimal=',', parse_dates=['fecha'], dtype={'cliente_id': 'Int64'})</code>",
  "<code>pd.read_csv(f, sep=';', decimal='.', parse_dates=['fecha'], dtype={'cliente_id': 'Int64'})</code>",
  "<code>pd.read_csv(f, sep=',', decimal=',', parse_dates=['fecha'], dtype={'cliente_id': 'Int64'})</code>",
  "<code>pd.read_csv(f, sep=';', decimal=',', parse_dates=['fecha'], dtype={'cliente_id': 'int64'})</code>"
 ],
 aprendido:"<b>CSV no almacena tipos</b>: Pandas los infiere, y suele equivocarse. Por eso la regla es <i>leer de forma explícita</i>: <code>sep</code>, <code>decimal</code>, <code>encoding</code>, <code>parse_dates</code> y <code>dtype</code> cuando conocés el origen. <code>'Int64'</code> con I mayúscula es el entero <i>nullable</i> de Pandas, que admite nulos sin pasarse a <code>float</code>.",
 porque:{
  "<code>pd.read_csv(f, sep=';', decimal='.', parse_dates=['fecha'], dtype={'cliente_id': 'Int64'})</code>":"Con <code>decimal='.'</code> los valores como <code>12,5</code> quedan como texto: hay que declarar la coma.",
  "<code>pd.read_csv(f, sep=',', decimal=',', parse_dates=['fecha'], dtype={'cliente_id': 'Int64'})</code>":"Con <code>sep=','</code> el archivo (separado por <code>;</code>) queda en una sola columna.",
  "<code>pd.read_csv(f, sep=';', decimal=',', parse_dates=['fecha'], dtype={'cliente_id': 'int64'})</code>":"<code>int64</code> en minúscula no admite nulos: falla al leer si hay algún ID vacío. Para nulos hace falta <code>Int64</code> (con I mayúscula)."
 }
},
{
 id:"c4-14", clase:4, tema:"Formatos", nivel:"baja",
 caso:"Exportás el reporte final a CSV y no querés que aparezca una primera columna sin nombre con 0, 1, 2, 3…",
 pide:"¿Qué parámetro agregás?",
 ops:[
  "<code>df.to_csv('salida.csv', index=False)</code>",
  "<code>df.to_csv('salida.csv', index_label=False)</code>",
  "<code>df.reset_index(drop=True).to_csv('salida.csv')</code>",
  "<code>df.to_csv('salida.csv', header=False)</code>"
 ],
 aprendido:"Por defecto Pandas escribe el índice como primera columna. <b><code>index=False</code></b> lo evita y es la costumbre al exportar reportes (vale igual para <code>to_excel()</code> y <code>to_sql()</code>). Si no, cada vez que releés el archivo te vas sumando una columna basura.",
 porque:{
  "<code>df.to_csv('salida.csv', index_label=False)</code>":"<code>index_label=False</code> sólo quita el <b>nombre</b> de esa columna; el índice 0, 1, 2… se sigue escribiendo.",
  "<code>df.reset_index(drop=True).to_csv('salida.csv')</code>":"Reinicia el índice pero, sin <code>index=False</code>, igual lo escribe como primera columna.",
  "<code>df.to_csv('salida.csv', header=False)</code>":"Saca los <b>nombres de columna</b>, no el índice: es lo contrario de lo que se quiere."
 }
},
{
 id:"c4-15", clase:4, tema:"Formatos", nivel:"alta",
 caso:"Tenés que traer de SQLite las ventas con importe mayor o igual a un valor que ingresa la persona usuaria.",
 pide:"¿Cómo lo escribís de forma segura?",
 ops:[
  "<code>pd.read_sql_query('SELECT * FROM ventas WHERE importe >= ?', con, params=(minimo,))</code>",
  "<code>pd.read_sql_query(f'SELECT * FROM ventas WHERE importe >= {minimo}', con)</code>",
  "<code>pd.read_sql_query('SELECT * FROM ventas WHERE importe >= ?', con, minimo)</code>",
  "<code>pd.read_sql_query('SELECT * FROM ventas WHERE importe >= ?', con, params={'minimo': minimo})</code>"
 ],
 aprendido:"<b>Nunca concatenar parámetros de la persona usuaria dentro de una consulta SQL.</b> Se usan <b>consultas parametrizadas</b>: <code>?</code> en el texto y los valores en <code>params</code>. El motor los escapa y evita la inyección SQL. Del otro lado, <code>to_sql(tabla, con, if_exists='replace', index=False)</code> escribe el DataFrame.",
 porque:{
  "<code>pd.read_sql_query(f'SELECT * FROM ventas WHERE importe >= {minimo}', con)</code>":"Es la concatenación que la clase marca como riesgo de <b>inyección SQL</b>: el valor del usuario se pega dentro de la consulta.",
  "<code>pd.read_sql_query('SELECT * FROM ventas WHERE importe >= ?', con, minimo)</code>":"El tercer argumento posicional es <code>index_col</code>, no los parámetros: hay que pasarlos con <code>params=</code>.",
  "<code>pd.read_sql_query('SELECT * FROM ventas WHERE importe >= ?', con, params={'minimo': minimo})</code>":"Con el marcador <code>?</code> los parámetros van en una <b>tupla o lista</b>; un diccionario sólo sirve con marcadores con nombre (<code>:minimo</code>)."
 }
},
{
 id:"c4-16", clase:4, tema:"Formatos", nivel:"media",
 caso:"Recibís de una API un JSON con objetos anidados dentro de cada registro y necesitás una tabla plana.",
 pide:"¿Qué usás?",
 ops:[
  "<code>pd.json_normalize(datos)</code>",
  "<code>pd.DataFrame(datos)</code>",
  "<code>pd.json_normalize(datos, max_level=0)</code>",
  "<code>pd.read_json(datos)</code>"
 ],
 aprendido:"<b><code>read_json</code></b> maneja orientaciones comunes cuando los registros son <b>planos</b>; cuando hay <b>estructuras anidadas</b>, <b><code>json_normalize</code></b> las aplana generando columnas como <code>cliente.ciudad</code>. La clase lo resume así: <i>en SQL parametrizá; en JSON definí la orientación</i>.",
 porque:{
  "<code>pd.DataFrame(datos)</code>":"Con objetos anidados crea columnas cuyo contenido son diccionarios completos, no columnas planas.",
  "<code>pd.json_normalize(datos, max_level=0)</code>":"<code>max_level=0</code> le pide <b>no aplanar</b> ningún nivel: deja los diccionarios anidados dentro de las celdas.",
  "<code>pd.read_json(datos)</code>":"<code>read_json</code> espera una ruta o un texto JSON; una lista de diccionarios ya cargada tira error."
 }
},
{
 id:"c4-17", clase:4, tema:"Pipeline", nivel:"alta",
 caso:"Terminaste el pipeline de limpieza y querés que el proceso <b>corte</b> si el <code>id_venta</code> dejó de ser único o si quedó algún <code>cliente_id</code> nulo.",
 pide:"¿Cómo lo expresás?",
 ops:[
  "<code>assert final['id_venta'].is_unique</code> y <code>assert final['cliente_id'].notna().all()</code>",
  "<code>assert final['id_venta'].is_unique</code> y <code>assert final['cliente_id'].notna().any()</code>",
  "<code>assert final['id_venta'].nunique()</code> y <code>assert final['cliente_id'].notna().all()</code>",
  "<code>assert final['id_venta'].is_unique or final['cliente_id'].notna().all()</code>"
 ],
 aprendido:"Un pipeline confiable <b>falla temprano y explica por qué</b>. Las aserciones de calidad frenan el proceso antes de exportar datos malos. El orden del pipeline es: normalizar nombres → convertir tipos → tratar nulos → deduplicar → <b>validar</b> → exportar. <code>.copy()</code> al inicio evita modificar la entrada.",
 porque:{
  "<code>assert final['id_venta'].is_unique</code> y <code>assert final['cliente_id'].notna().any()</code>":"<code>any()</code> sólo exige que <b>haya al menos un</b> cliente no nulo: con la mayoría vacíos, el <code>assert</code> igual pasa.",
  "<code>assert final['id_venta'].nunique()</code> y <code>assert final['cliente_id'].notna().all()</code>":"<code>nunique()</code> devuelve una cantidad, que es verdadera siempre que haya datos: no chequea unicidad.",
  "<code>assert final['id_venta'].is_unique or final['cliente_id'].notna().all()</code>":"Con <code>or</code> alcanza con que <b>una</b> de las dos cosas se cumpla: una condición rota queda tapada por la otra."
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
  "Torta — <code>ax.pie(ventas, labels=meses)</code>",
  "Dispersión — <code>ax.scatter(meses, ventas)</code>"
 ],
 aprendido:"La tabla de decisión de la clase: <b>tendencia → líneas</b>, <b>comparación entre categorías → barras</b>, <b>distribución → histograma</b>, <b>relación entre dos cuantitativas → dispersión</b>. La línea solo se usa cuando el orden es continuo y significativo: unir categorías sin orden natural sugiere valores intermedios que no existen.",
 porque:{
  "Barras — <code>ax.bar(meses, ventas)</code>":"Sirve para comparar meses entre sí, pero no muestra la <b>trayectoria</b>; la pregunta es cómo evolucionaron.",
  "Torta — <code>ax.pie(ventas, labels=meses)</code>":"La torta representa <b>partes de un total en un momento</b>: no dice nada de cómo cambia algo en el tiempo.",
  "Dispersión — <code>ax.scatter(meses, ventas)</code>":"Muestra los puntos sin la línea que guía la lectura de la evolución."
 }
},
{
 id:"c5-02", clase:5, tema:"Elección de gráfico", nivel:"baja",
 caso:"Pregunta analítica: “¿Dónde se concentran los tiempos de entrega y qué forma tiene esa distribución?”",
 pide:"¿Qué gráfico usás y qué parámetro es clave?",
 ops:[
  "Histograma — <code>ax.hist(tiempos, bins=10)</code>",
  "Histograma — <code>ax.hist(tiempos, bins=len(tiempos))</code>",
  "Barras — <code>ax.bar(tiempos.index, tiempos)</code>",
  "Líneas — <code>ax.plot(tiempos, marker='o')</code>"
 ],
 aprendido:"El histograma agrupa una variable cuantitativa <b>continua</b> en intervalos y cuenta observaciones. El parámetro clave es <b><code>bins</code></b>: pocos bins ocultan estructura, demasiados muestran ruido. Hay que probar varias cantidades y documentar la elección. No confundir con barras: en barras las categorías están separadas; en el histograma los intervalos son contiguos.",
 porque:{
  "Histograma — <code>ax.hist(tiempos, bins=len(tiempos))</code>":"Con un intervalo por observación ya no se <b>resume</b> nada: cada barra vale 1 y se pierde la forma de la distribución.",
  "Barras — <code>ax.bar(tiempos.index, tiempos)</code>":"Dibuja una barra por observación (el tiempo de cada pedido): muestra los datos crudos, no cómo se distribuyen.",
  "Líneas — <code>ax.plot(tiempos, marker='o')</code>":"Sugiere una secuencia temporal que acá no existe: los pedidos no tienen un orden que importe."
 }
},
{
 id:"c5-03", clase:5, tema:"Elección de gráfico", nivel:"media",
 caso:"Querés ver si la inversión en publicidad y las ventas varían juntas, y dibujar encima la recta de tendencia.",
 pide:"¿Qué combinación usás?",
 ops:[
  "<code>ax.scatter(x, y, alpha=.65)</code> y la recta con <code>np.polyfit(x, y, 1)</code> + <code>ax.plot()</code>",
  "<code>ax.scatter(x, y, alpha=.65)</code> y la recta con <code>np.polyfit(x, y, 2)</code> + <code>ax.plot()</code>",
  "<code>ax.scatter(x, y, alpha=.65)</code> y la recta con <code>np.corrcoef(x, y)</code> + <code>ax.plot()</code>",
  "<code>ax.plot(x, y, alpha=.65)</code> y la recta con <code>np.polyfit(x, y, 1)</code> + <code>ax.plot()</code>"
 ],
 aprendido:"La dispersión revela dirección, intensidad aparente, curvatura, grupos, huecos y atípicos. <code>np.polyfit(x, y, 1)</code> ajusta una recta de primer grado y devuelve pendiente e intercepto; se dibuja con <code>ax.plot()</code> sobre los puntos. <code>alpha</code> da transparencia para que miles de puntos no oculten la densidad. <b>Aviso obligatorio: una recta ajustada resume asociación, no prueba causalidad.</b>",
 porque:{
  "<code>ax.scatter(x, y, alpha=.65)</code> y la recta con <code>np.polyfit(x, y, 2)</code> + <code>ax.plot()</code>":"El tercer argumento es el <b>grado</b>: con 2 ajusta una parábola, no una recta.",
  "<code>ax.scatter(x, y, alpha=.65)</code> y la recta con <code>np.corrcoef(x, y)</code> + <code>ax.plot()</code>":"<code>corrcoef</code> devuelve la matriz de correlaciones, no la pendiente ni el intercepto que hacen falta para dibujar la recta.",
  "<code>ax.plot(x, y, alpha=.65)</code> y la recta con <code>np.polyfit(x, y, 1)</code> + <code>ax.plot()</code>":"Trazar los datos con <code>plot</code> los une con líneas, sugiriendo una continuidad que no existe entre observaciones independientes."
 }
},
{
 id:"c5-04", clase:5, tema:"Matplotlib", nivel:"media",
 caso:"Querés una figura con dos gráficos lado a lado: barras de ingresos por región a la izquierda, histograma de tiempos a la derecha.",
 pide:"¿Cómo la creás?",
 ops:[
  "<code>fig, axes = plt.subplots(1, 2, figsize=(11, 4))</code> y usar <code>axes[0]</code> y <code>axes[1]</code>",
  "<code>fig, axes = plt.subplots(2, 1, figsize=(11, 4))</code> y usar <code>axes[0]</code> y <code>axes[1]</code>",
  "<code>fig, ax = plt.subplots(1, 2, figsize=(11, 4))</code> y usar <code>ax.bar()</code> y <code>ax.hist()</code>",
  "<code>fig, axes = plt.subplots(1, 2, figsize=(11, 4))</code> y usar <code>axes[1]</code> y <code>axes[2]</code>"
 ],
 aprendido:"La interfaz <b>orientada a objetos</b> es la que pide la cursada: <code>plt.subplots(filas, columnas)</code> devuelve la <b>Figure</b> (el lienzo) y los <b>Axes</b> (cada área de dibujo). Con una grilla 2×2 se indexa <code>axes[0, 1]</code>. Cada eje conserva su propia pregunta, escala y lectura: no se comparan alturas entre gráficos con unidades distintas.",
 porque:{
  "<code>fig, axes = plt.subplots(2, 1, figsize=(11, 4))</code> y usar <code>axes[0]</code> y <code>axes[1]</code>":"<code>(2, 1)</code> son 2 filas y 1 columna: los gráficos quedan <b>uno arriba del otro</b>, no lado a lado.",
  "<code>fig, ax = plt.subplots(1, 2, figsize=(11, 4))</code> y usar <code>ax.bar()</code> y <code>ax.hist()</code>":"Con dos paneles, <code>ax</code> es un <b>arreglo</b> de ejes: <code>ax.bar()</code> tira <code>AttributeError</code>; hay que indexar <code>ax[0]</code>, <code>ax[1]</code>.",
  "<code>fig, axes = plt.subplots(1, 2, figsize=(11, 4))</code> y usar <code>axes[1]</code> y <code>axes[2]</code>":"Los índices van desde 0: <code>axes[2]</code> no existe y tira <code>IndexError</code>. Los paneles son <code>axes[0]</code> y <code>axes[1]</code>."
 }
},
{
 id:"c5-05", clase:5, tema:"Matplotlib", nivel:"baja",
 caso:"Ya dibujaste la serie y tenés que rotular la figura: título, nombre del eje horizontal y del vertical, usando la interfaz orientada a objetos.",
 pide:"¿Qué métodos usás?",
 ops:[
  "<code>ax.set_title()</code>, <code>ax.set_xlabel()</code>, <code>ax.set_ylabel()</code>",
  "<code>ax.title()</code>, <code>ax.xlabel()</code>, <code>ax.ylabel()</code>",
  "<code>ax.set_title()</code>, <code>ax.set_xlabel()</code>, <code>ax.set_label()</code>",
  "<code>fig.suptitle()</code>, <code>fig.xlabel()</code>, <code>fig.ylabel()</code>"
 ],
 aprendido:"Sobre un <b>Axes</b> los rótulos llevan el prefijo <code>set_</code>. También existe la forma compacta <code>ax.set(title='…', xlabel='…', ylabel='…')</code>. Para el título general de una figura con varios paneles es <code>fig.suptitle()</code>. Criterio de la clase: el título puede enunciar la conclusión (“Las ventas crecen 18% desde marzo”), no solo el tema (“Ventas”).",
 porque:{
  "<code>ax.title()</code>, <code>ax.xlabel()</code>, <code>ax.ylabel()</code>":"Esos nombres sin <code>set_</code> son de la interfaz <code>plt.*</code>; sobre un <code>Axes</code> no se pueden llamar así.",
  "<code>ax.set_title()</code>, <code>ax.set_xlabel()</code>, <code>ax.set_label()</code>":"<code>set_label</code> no rotula el eje vertical: sirve para darle nombre a una serie en la leyenda. El eje es <code>set_ylabel()</code>.",
  "<code>fig.suptitle()</code>, <code>fig.xlabel()</code>, <code>fig.ylabel()</code>":"<code>suptitle</code> es el título general de la figura, pero <code>Figure</code> no tiene <code>xlabel()</code> ni <code>ylabel()</code>: cada eje se rotula por separado."
 }
},
{
 id:"c5-06", clase:5, tema:"Matplotlib", nivel:"media",
 caso:"Sobre el histograma de ventas querés marcar dónde cae el promedio con una línea vertical punteada e identificarla en la leyenda.",
 pide:"¿Qué usás?",
 ops:[
  "<code>ax.axvline(media, linestyle='--', label='Media')</code> y luego <code>ax.legend()</code>",
  "<code>ax.axhline(media, linestyle='--', label='Media')</code> y luego <code>ax.legend()</code>",
  "<code>ax.axvline(media, linestyle='--', label='Media')</code> sin llamar a <code>ax.legend()</code>",
  "<code>ax.vlines(media, linestyle='--', label='Media')</code> y luego <code>ax.legend()</code>"
 ],
 aprendido:"<b><code>axvline</code></b> dibuja una línea <b>vertical</b> en un valor del eje x (ideal sobre un histograma, donde x es la variable). <b><code>axhline</code></b> dibuja una <b>horizontal</b>, que es lo que se usa para marcar el umbral de aprobación sobre un gráfico de barras de promedios. El <code>label=</code> es lo que después muestra <code>ax.legend()</code>.",
 porque:{
  "<code>ax.axhline(media, linestyle='--', label='Media')</code> y luego <code>ax.legend()</code>":"Dibuja una línea <b>horizontal</b>: sobre un histograma cortaría el eje de frecuencias, no marcaría la media.",
  "<code>ax.axvline(media, linestyle='--', label='Media')</code> sin llamar a <code>ax.legend()</code>":"El <code>label=</code> sólo se muestra cuando se llama a <code>ax.legend()</code>: la línea quedaría sin identificar.",
  "<code>ax.vlines(media, linestyle='--', label='Media')</code> y luego <code>ax.legend()</code>":"<code>vlines</code> necesita también <code>ymin</code> e <code>ymax</code>; sin ellos tira <code>TypeError</code>. <code>axvline</code> ocupa todo el alto automáticamente."
 }
},
{
 id:"c5-07", clase:5, tema:"Matplotlib", nivel:"baja",
 caso:"Terminaste el panel y las etiquetas de los ejes se superponen entre sí. Después querés guardar la figura en buena resolución para el informe.",
 pide:"¿Qué dos llamadas cierran el gráfico?",
 ops:[
  "<code>fig.tight_layout()</code> y <code>fig.savefig('panel.png', dpi=180)</code>",
  "<code>fig.savefig('panel.png', dpi=180)</code> y luego <code>fig.tight_layout()</code>",
  "<code>fig.tight_layout()</code> y <code>fig.savefig('panel.png', resolution=180)</code>",
  "<code>plt.show()</code> y luego <code>fig.savefig('panel.png', dpi=180)</code>"
 ],
 aprendido:"Cierre recomendado: <b><code>tight_layout()</code></b> ajusta los espacios para que no se recorten textos, <b><code>savefig()</code></b> exporta (con <code>dpi=300</code> para impresión y <code>bbox_inches='tight'</code> para recortar márgenes) y <b><code>show()</code></b> muestra en pantalla. <code>savefig</code> siempre <b>antes</b> de <code>show()</code>, porque en algunos backends <code>show()</code> vacía la figura.",
 porque:{
  "<code>fig.savefig('panel.png', dpi=180)</code> y luego <code>fig.tight_layout()</code>":"El orden importa: <code>tight_layout</code> se aplica <b>después</b> de guardar, así que el archivo sale con las etiquetas superpuestas.",
  "<code>fig.tight_layout()</code> y <code>fig.savefig('panel.png', resolution=180)</code>":"El parámetro de resolución se llama <code>dpi</code>; <code>resolution</code> no existe y falla al guardar.",
  "<code>plt.show()</code> y luego <code>fig.savefig('panel.png', dpi=180)</code>":"En algunos entornos <code>show()</code> cierra la figura: guardarías una imagen vacía. Además nada corrige la superposición."
 }
},
{
 id:"c5-08", clase:5, tema:"Interpretación", nivel:"media",
 caso:"Te muestran un gráfico de barras donde el eje vertical empieza en 400 en lugar de en 0, y las diferencias entre regiones parecen enormes.",
 pide:"¿Cuál es el error y cómo se corrige?",
 ops:[
  "Eje truncado: las barras deben tener base común en cero, salvo justificación explícita",
  "Eje sesgado: el eje debería arrancar en el promedio de las barras para comparar mejor los desvíos",
  "Falta de bins: hay que elegir mejor la cantidad de intervalos del eje vertical",
  "Tipo equivocado: conviene reemplazar las barras por una torta para comparar las regiones"
 ],
 aprendido:"Las barras codifican magnitud por <b>longitud</b>, y la longitud solo se lee bien con base común en cero. Truncar el eje exagera diferencias. Los otros errores frecuentes de la clase: color sin función, título genérico, cantidad de bins arbitraria, sobreposición de puntos y confundir correlación con causalidad.",
 porque:{
  "Eje sesgado: el eje debería arrancar en el promedio de las barras para comparar mejor los desvíos":"Sería aún más engañoso: cambiar la base exagera las diferencias. Las barras codifican magnitud por longitud desde el cero.",
  "Falta de bins: hay que elegir mejor la cantidad de intervalos del eje vertical":"Los bins pertenecen al histograma; un gráfico de barras compara categorías y no tiene intervalos.",
  "Tipo equivocado: conviene reemplazar las barras por una torta para comparar las regiones":"La torta codifica por ángulo (menos precisa) y sirve para partes de un total; no arregla una comparación de magnitudes."
 }
},

/* ---------- CLASE 6 · Seaborn ---------- */
{
 id:"c6-01", clase:6, tema:"Seaborn", nivel:"media",
 caso:"La dirección comercial quiere explorar las asociaciones lineales entre visitas, publicidad, ventas y devoluciones, con los coeficientes escritos en cada celda.",
 pide:"¿Qué combinación usás?",
 ops:[
  "<code>corr = df.select_dtypes('number').corr()</code> y <code>sns.heatmap(corr, annot=True, cmap='vlag', vmin=-1, vmax=1)</code>",
  "<code>cov = df.select_dtypes('number').cov()</code> y <code>sns.heatmap(cov, annot=True, cmap='vlag', vmin=-1, vmax=1)</code>",
  "<code>corr = df.select_dtypes('number').corr()</code> y <code>sns.heatmap(corr, annot=True, cmap='vlag', vmin=0, vmax=1)</code>",
  "<code>corr = df.select_dtypes('number').corr()</code> y <code>sns.heatmap(corr, annot=False, cmap='vlag', vmin=-1, vmax=1)</code>"
 ],
 aprendido:"El mapa de calor de correlaciones se arma en dos pasos: primero <b><code>.corr()</code></b> sobre las columnas numéricas (<code>select_dtypes('number')</code> las filtra), después <b><code>sns.heatmap()</code></b>. <code>annot=True</code> escribe el coeficiente, y <code>vmin=-1, vmax=1</code> fija la escala para que el color sea comparable entre gráficos. Lectura: cerca de +1 asociación lineal positiva fuerte, cerca de −1 negativa fuerte, cerca de 0 poca asociación lineal (que <b>no</b> es lo mismo que independencia). Y correlación no implica causalidad.",
 porque:{
  "<code>cov = df.select_dtypes('number').cov()</code> y <code>sns.heatmap(cov, annot=True, cmap='vlag', vmin=-1, vmax=1)</code>":"<code>cov()</code> es la <b>covarianza</b>, que depende de las unidades y no está entre −1 y 1: no son coeficientes de correlación.",
  "<code>corr = df.select_dtypes('number').corr()</code> y <code>sns.heatmap(corr, annot=True, cmap='vlag', vmin=0, vmax=1)</code>":"Con escala de 0 a 1 las correlaciones <b>negativas</b> quedan recortadas: se pierde la mitad de la información.",
  "<code>corr = df.select_dtypes('number').corr()</code> y <code>sns.heatmap(corr, annot=False, cmap='vlag', vmin=-1, vmax=1)</code>":"Con <code>annot=False</code> los coeficientes <b>no se escriben</b> en las celdas, que es justo lo que pide la dirección."
 }
},
{
 id:"c6-02", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Recursos Humanos quiere comparar el nivel, la dispersión y los posibles valores atípicos de los salarios de tres áreas.",
 pide:"¿Qué gráfico usás?",
 ops:[
  "<code>sns.boxplot(data=df, x='Area', y='Salario')</code>",
  "<code>sns.barplot(data=df, x='Area', y='Salario')</code>",
  "<code>sns.pointplot(data=df, x='Area', y='Salario')</code>",
  "<code>sns.countplot(data=df, x='Area')</code>"
 ],
 aprendido:"El boxplot muestra en una sola caja: <b>línea central = mediana</b>, <b>caja = 50% central entre Q1 y Q3</b>, <b>alto de la caja = rango intercuartílico</b>, <b>bigotes y puntos externos = extensión y posibles atípicos</b>. Es el gráfico para “nivel + dispersión + atípicos” por categoría. Se le puede superponer <code>sns.stripplot(..., color='black', alpha=.4)</code> para ver las observaciones individuales.",
 porque:{
  "<code>sns.barplot(data=df, x='Area', y='Salario')</code>":"Muestra sólo el promedio (con su intervalo): oculta la dispersión y los valores atípicos.",
  "<code>sns.pointplot(data=df, x='Area', y='Salario')</code>":"Marca el promedio de cada área con su intervalo de confianza: no muestra la distribución ni señala atípicos.",
  "<code>sns.countplot(data=df, x='Area')</code>":"Cuenta cuántas personas hay en cada área; no dice nada sobre los salarios."
 }
},
{
 id:"c6-03", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Querés explorar rápidamente cómo se relacionan entre sí <code>Horas</code>, <code>Nota</code> y <code>Proyectos</code>, y ver además la distribución de cada una, coloreando por curso.",
 pide:"¿Qué usás?",
 ops:[
  "<code>sns.pairplot(df, vars=['Horas','Nota','Proyectos'], hue='Curso', corner=True, diag_kind='hist')</code>",
  "<code>sns.pairplot(df, vars=['Horas','Nota','Proyectos'], color='Curso', corner=True, diag_kind='hist')</code>",
  "<code>sns.pairplot(df, vars=['Horas','Nota','Proyectos'], hue='Curso', corner=True, diag_kind='scatter')</code>",
  "<code>sns.jointplot(data=df, x='Horas', y='Nota', hue='Curso')</code>"
 ],
 aprendido:"El <b>pairplot</b> arma una matriz: fuera de la diagonal, las relaciones bivariadas; en la diagonal, la distribución de cada variable. <code>vars=</code> limita las columnas (con muchas se vuelve lento e ilegible: primero seleccionar las relevantes), <code>corner=True</code> dibuja solo el triángulo inferior y <code>hue=</code> colorea por categoría.",
 porque:{
  "<code>sns.pairplot(df, vars=['Horas','Nota','Proyectos'], color='Curso', corner=True, diag_kind='hist')</code>":"<code>color=</code> fija <b>un</b> color para todo el gráfico (y 'Curso' no es un color): para colorear por categoría hace falta <code>hue=</code>.",
  "<code>sns.pairplot(df, vars=['Horas','Nota','Proyectos'], hue='Curso', corner=True, diag_kind='scatter')</code>":"<code>diag_kind</code> sólo acepta <code>'hist'</code>, <code>'kde'</code> o <code>None</code>: con <code>'scatter'</code> tira <code>ValueError</code>.",
  "<code>sns.jointplot(data=df, x='Horas', y='Nota', hue='Curso')</code>":"<code>jointplot</code> muestra <b>un solo par</b> de variables; no arma la matriz con Horas, Nota y Proyectos."
 }
},
{
 id:"c6-04", clase:6, tema:"Seaborn", nivel:"alta",
 caso:"Querés codificar cuatro variables en un solo gráfico: horas en x, nota en y, curso por color y forma, y cantidad de proyectos por tamaño del punto.",
 pide:"¿Qué función y qué parámetros?",
 ops:[
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota', hue='Curso', size='Proyectos', style='Curso', sizes=(40,220), alpha=.78)</code>",
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota', hue='Curso', size='Curso', style='Proyectos', sizes=(40,220), alpha=.78)</code>",
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota', hue='Curso', size='Proyectos', marker='Curso', sizes=(40,220))</code>",
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota', hue='Curso', size='Proyectos', style='Curso', sizes=(40,220), alpha=78)</code>"
 ],
 aprendido:"Los canales visuales de Seaborn: <b><code>hue</code></b> → color, <b><code>size</code></b> → tamaño, <b><code>style</code></b> → forma del marcador. Regla: <b>una variable por canal visual</b>. Posición para las cuantitativas principales, color o forma para una categoría importante, tamaño solo para magnitudes positivas y comparables, y transparencia (<code>alpha</code>) para reducir superposición.",
 porque:{
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota', hue='Curso', size='Curso', style='Proyectos', sizes=(40,220), alpha=.78)</code>":"Cruza los canales: el tamaño codifica el curso y la forma los proyectos; la consigna pide proyectos por <b>tamaño</b>.",
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota', hue='Curso', size='Proyectos', marker='Curso', sizes=(40,220))</code>":"<code>marker=</code> es <b>un</b> marcador para todos los puntos ('Curso' no es un marcador válido); para variarlo por categoría se usa <code>style=</code>.",
  "<code>sns.scatterplot(data=df, x='Horas', y='Nota', hue='Curso', size='Proyectos', style='Curso', sizes=(40,220), alpha=78)</code>":"<code>alpha</code> es una transparencia entre 0 y 1: con 78 tira <code>ValueError</code>. Es el detalle de un <code>.78</code> mal escrito."
 }
},
{
 id:"c6-05", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Un centro de soporte clasificó los tickets como Rápido, Medio o Lento y quiere ver <b>cuántos</b> hay de cada tipo.",
 pide:"¿Qué función usás?",
 ops:[
  "<code>sns.countplot(data=df, x='clasificacion')</code>",
  "<code>sns.countplot(data=df, x='clasificacion', y='minutos')</code>",
  "<code>sns.barplot(data=df, x='clasificacion', y='minutos')</code>",
  "<code>sns.value_counts(df['clasificacion'])</code>"
 ],
 aprendido:"<b><code>countplot</code></b> cuenta las ocurrencias de cada categoría: es un <code>barplot</code> cuya altura es la frecuencia, así que no necesita variable <code>y</code>. <b><code>barplot</code></b>, en cambio, muestra un <b>agregado</b> (por defecto la media) de una variable numérica por categoría.",
 porque:{
  "<code>sns.countplot(data=df, x='clasificacion', y='minutos')</code>":"<code>countplot</code> cuenta filas y no acepta a la vez <code>x</code> e <code>y</code>: tira <code>ValueError</code>.",
  "<code>sns.barplot(data=df, x='clasificacion', y='minutos')</code>":"Muestra el <b>promedio</b> de minutos por clase, no cuántos tickets hay.",
  "<code>sns.value_counts(df['clasificacion'])</code>":"<code>value_counts</code> es un método de Pandas, no una función de Seaborn: tira <code>AttributeError</code>."
 }
},
{
 id:"c6-06", clase:6, tema:"Seaborn", nivel:"alta",
 caso:"Marketing quiere ver si la inversión publicitaria se asocia con las conversiones, con la recta de ajuste y su banda de confianza, en una sola llamada.",
 pide:"¿Qué usás?",
 ops:[
  "<code>sns.regplot(data=df, x='inversion', y='conversiones')</code>",
  "<code>sns.regplot(data=df, x='inversion', y='conversiones', fit_reg=False)</code>",
  "<code>sns.regplot(data=df, x='inversion', y='conversiones', ci=None)</code>",
  "<code>sns.residplot(data=df, x='inversion', y='conversiones')</code>"
 ],
 aprendido:"<b><code>regplot</code></b> dibuja la dispersión <b>más</b> la recta de regresión con su intervalo de confianza en una sola llamada (el equivalente manual en Matplotlib es <code>scatter</code> + <code>np.polyfit</code>). Como siempre: la recta resume una asociación, no demuestra causalidad.",
 porque:{
  "<code>sns.regplot(data=df, x='inversion', y='conversiones', fit_reg=False)</code>":"<code>fit_reg=False</code> apaga la recta: queda una dispersión común, sin ajuste ni banda.",
  "<code>sns.regplot(data=df, x='inversion', y='conversiones', ci=None)</code>":"<code>ci=None</code> saca la <b>banda de confianza</b> y la consigna la pide expresamente.",
  "<code>sns.residplot(data=df, x='inversion', y='conversiones')</code>":"Grafica los residuos del ajuste: sirve para diagnosticar el modelo, no para mostrar la relación."
 }
},
{
 id:"c6-07", clase:6, tema:"Seaborn", nivel:"alta",
 caso:"Querés comparar la tendencia mensual de ventas <b>repitiendo el mismo gráfico</b> en un panel por región (pequeños múltiplos).",
 pide:"¿Qué función y qué parámetro?",
 ops:[
  "<code>sns.relplot(data=df, x='mes', y='ventas', col='region', hue='canal', kind='line')</code>",
  "<code>sns.relplot(data=df, x='mes', y='ventas', hue='region', col='canal', kind='line')</code>",
  "<code>sns.relplot(data=df, x='mes', y='ventas', col='region', hue='canal', kind='bar')</code>",
  "<code>sns.lineplot(data=df, x='mes', y='ventas', col='region', hue='canal')</code>"
 ],
 aprendido:"<b><code>relplot</code></b> (y <code>catplot</code>, <code>displot</code>) son funciones a <b>nivel de figura</b>: aceptan <code>col=</code> y <code>row=</code> para generar automáticamente una grilla de paneles con ejes compartidos. Es la forma directa de hacer pequeños múltiplos. <code>kind=</code> elige el tipo de gráfico dentro de cada panel.",
 porque:{
  "<code>sns.relplot(data=df, x='mes', y='ventas', hue='region', col='canal', kind='line')</code>":"Cruza los roles: hace un panel por canal y colorea por región, en vez de un panel por región.",
  "<code>sns.relplot(data=df, x='mes', y='ventas', col='region', hue='canal', kind='bar')</code>":"<code>relplot</code> sólo acepta <code>kind='scatter'</code> o <code>'line'</code>: con <code>'bar'</code> tira <code>ValueError</code>.",
  "<code>sns.lineplot(data=df, x='mes', y='ventas', col='region', hue='canal')</code>":"<code>lineplot</code> no tiene <code>col=</code>: es una función de <b>eje</b>, no de figura. Los paneles los genera <code>relplot</code>."
 }
},
{
 id:"c6-08", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Querés exportar el gráfico final para un informe académico impreso y además tener una versión editable para la web.",
 pide:"¿Qué formatos elegís?",
 ops:[
  "PNG con <code>dpi=300</code> para impresión y PDF o SVG vectorial para publicación/edición",
  "PNG con <code>dpi=72</code> para impresión y SVG vectorial para la versión web editable",
  "JPG con <code>dpi=300</code> para impresión y PNG para la versión editable",
  "GIF con <code>dpi=300</code> para impresión y PDF vectorial para publicación"
 ],
 aprendido:"<b>PNG</b>: ideal para Word, PowerPoint y web, con <code>dpi=300</code> para impresión. <b>PDF</b>: vectorial, recomendado para informes académicos. <b>SVG</b>: vectorial y editable, excelente para web y diseño. La llamada típica: <code>plt.savefig('informe.png', dpi=300, bbox_inches='tight', facecolor='white')</code>.",
 porque:{
  "PNG con <code>dpi=72</code> para impresión y SVG vectorial para la versión web editable":"72 dpi es resolución de pantalla: impreso se ve pixelado.",
  "JPG con <code>dpi=300</code> para impresión y PNG para la versión editable":"JPG comprime con pérdida (ensucia texto y líneas finas) y PNG es de píxeles: no se edita como un vector.",
  "GIF con <code>dpi=300</code> para impresión y PDF vectorial para publicación":"GIF limita a 256 colores: degrada un gráfico con paleta continua o degradados."
 }
},
{
 id:"c6-09", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Querés aplicar un estilo con cuadrícula suave a todos los gráficos y fijar colores propios para cada curso, consistentes entre todas las figuras del informe.",
 pide:"¿Qué usás?",
 ops:[
  "<code>sns.set_theme(style='whitegrid')</code> y un diccionario en <code>palette={'Datos':'#00A6A6', ...}</code>",
  "<code>sns.set_theme(style='whitegrid')</code> y un diccionario en <code>color={'Datos':'#00A6A6', ...}</code>",
  "<code>plt.style.use('whitegrid')</code> y un diccionario en <code>palette={'Datos':'#00A6A6', ...}</code>",
  "<code>sns.set_theme(style='grid')</code> y un diccionario en <code>palette={'Datos':'#00A6A6', ...}</code>"
 ],
 aprendido:"<code>sns.set_theme(style=…)</code> aplica el estilo a toda la sesión (<code>whitegrid</code>, <code>darkgrid</code>, <code>ticks</code>…). Pasar un <b>diccionario</b> a <code>palette=</code> fija qué color le toca a cada categoría, y eso mantiene la coherencia entre gráficos. Criterio: paletas consistentes, colores intensos reservados para lo importante, y nada de estilos que bajen el contraste.",
 porque:{
  "<code>sns.set_theme(style='whitegrid')</code> y un diccionario en <code>color={'Datos':'#00A6A6', ...}</code>":"<code>color=</code> admite <b>un</b> color para todo el gráfico; el mapeo categoría → color va en <code>palette=</code>.",
  "<code>plt.style.use('whitegrid')</code> y un diccionario en <code>palette={'Datos':'#00A6A6', ...}</code>":"<code>whitegrid</code> es un estilo de <b>Seaborn</b>, no de Matplotlib: <code>plt.style.use</code> tira un error de estilo desconocido.",
  "<code>sns.set_theme(style='grid')</code> y un diccionario en <code>palette={'Datos':'#00A6A6', ...}</code>":"Los estilos válidos son <code>darkgrid</code>, <code>whitegrid</code>, <code>dark</code>, <code>white</code> y <code>ticks</code>: <code>'grid'</code> no existe y tira <code>ValueError</code>."
 }
},
{
 id:"c6-10", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Querés señalar en el gráfico al estudiante con la nota más alta, con un texto y una flecha que lo apunte.",
 codigo:"mejor = df.loc[df['Nota'].idxmax()]",
 pide:"¿Qué usás para la anotación?",
 ops:[
  "<code>ax.annotate('Mayor nota', xy=(mejor['Horas'], mejor['Nota']), xytext=(...), arrowprops={'arrowstyle':'->'})</code>",
  "<code>ax.annotate('Mayor nota', xy=(mejor['Horas'], mejor['Nota']), xytext=(...), arrowstyle='->')</code>",
  "<code>ax.text('Mayor nota', mejor['Horas'], mejor['Nota'], arrowprops={'arrowstyle':'->'})</code>",
  "<code>ax.annotate(xy=(mejor['Horas'], mejor['Nota']), xytext=(...), arrowprops={'arrowstyle':'->'})</code>"
 ],
 aprendido:"<b><code>idxmax()</code></b> devuelve la <b>etiqueta de índice</b> de la fila con el valor máximo (a diferencia de <code>max()</code>, que devuelve el valor), y se combina con <code>.loc[]</code> para traer la fila completa. <b><code>ax.annotate()</code></b> pone el texto: <code>xy</code> es el punto señalado, <code>xytext</code> dónde va el texto y <code>arrowprops</code> dibuja la flecha. Criterio: anotar solo hallazgos relevantes.",
 porque:{
  "<code>ax.annotate('Mayor nota', xy=(mejor['Horas'], mejor['Nota']), xytext=(...), arrowstyle='->')</code>":"El estilo de la flecha va <b>dentro</b> de <code>arrowprops={...}</code>; como argumento suelto no se reconoce y tira error.",
  "<code>ax.text('Mayor nota', mejor['Horas'], mejor['Nota'], arrowprops={'arrowstyle':'->'})</code>":"<code>text</code> recibe primero las coordenadas (<code>x, y, texto</code>) y no admite <code>arrowprops</code>: la flecha es propia de <code>annotate</code>.",
  "<code>ax.annotate(xy=(mejor['Horas'], mejor['Nota']), xytext=(...), arrowprops={'arrowstyle':'->'})</code>":"Falta el primer argumento, el <b>texto</b> de la anotación: <code>annotate</code> lo exige y tira <code>TypeError</code>."
 }
},
{
 id:"c6-11", clase:6, tema:"Ecosistema", nivel:"baja",
 caso:"Te preguntan en el parcial qué rol cumple cada librería del stack en un mismo gráfico de Seaborn.",
 pide:"¿Cuál es la división de tareas?",
 ops:[
  "Pandas organiza los datos en DataFrames · Seaborn da la interfaz estadística de alto nivel · Matplotlib controla figura, ejes, títulos y exportación",
  "Pandas organiza los datos en DataFrames · Matplotlib da la interfaz estadística de alto nivel · Seaborn controla figura, ejes, títulos y exportación",
  "NumPy organiza los datos en DataFrames · Seaborn da la interfaz estadística de alto nivel · Matplotlib controla figura, ejes, títulos y exportación",
  "Pandas organiza los datos en DataFrames · Seaborn reemplaza por completo a Matplotlib, que ya no hace falta importar para títulos ni exportación"
 ],
 aprendido:"Seaborn está <b>construido sobre</b> Matplotlib: le pasás un DataFrame de Pandas y resuelve el gráfico estadístico en una línea, pero el título, la figura, el <code>tight_layout()</code> y el <code>savefig()</code> los seguís manejando con Matplotlib (<code>plt.*</code> o el <code>ax</code> que Seaborn devuelve). Por eso en todos los ejemplos se importan las tres.",
 porque:{
  "Pandas organiza los datos en DataFrames · Matplotlib da la interfaz estadística de alto nivel · Seaborn controla figura, ejes, títulos y exportación":"Cruza los roles de las dos librerías de gráficos: la interfaz estadística es de Seaborn, y el control fino de figura y ejes es de Matplotlib.",
  "NumPy organiza los datos en DataFrames · Seaborn da la interfaz estadística de alto nivel · Matplotlib controla figura, ejes, títulos y exportación":"Los DataFrames son de Pandas; NumPy trabaja con arreglos numéricos.",
  "Pandas organiza los datos en DataFrames · Seaborn reemplaza por completo a Matplotlib, que ya no hace falta importar para títulos ni exportación":"Seaborn está construido sobre Matplotlib: todos los ejemplos de la clase siguen importando <code>matplotlib.pyplot</code> para título, layout y <code>savefig</code>."
 }
},
{
 id:"c6-12", clase:6, tema:"Seaborn", nivel:"media",
 caso:"Querés comparar la distribución de satisfacción entre modalidad presencial y virtual, viendo la <b>forma</b> completa de cada distribución y no solo los cuartiles.",
 pide:"¿Qué gráfico elegís?",
 ops:[
  "<code>sns.violinplot(data=df, x='modalidad', y='satisfaccion')</code>",
  "<code>sns.boxplot(data=df, x='modalidad', y='satisfaccion')</code>",
  "<code>sns.barplot(data=df, x='modalidad', y='satisfaccion')</code>",
  "<code>sns.regplot(data=df, x='modalidad', y='satisfaccion')</code>"
 ],
 aprendido:"El <b>violinplot</b> combina el resumen del boxplot con una estimación de densidad: muestra la <b>forma</b> de la distribución (si es simétrica, si tiene dos picos). El boxplot es más sobrio y mejor para detectar atípicos; el violín es mejor cuando la pregunta es por la forma.",
 porque:{
  "<code>sns.boxplot(data=df, x='modalidad', y='satisfaccion')</code>":"Resume en cuartiles: una distribución con dos picos se ve igual que una simétrica. Sirve para nivel y atípicos, no para la forma.",
  "<code>sns.barplot(data=df, x='modalidad', y='satisfaccion')</code>":"Muestra sólo el <b>promedio</b> de cada modalidad: no deja ver ninguna forma de la distribución.",
  "<code>sns.regplot(data=df, x='modalidad', y='satisfaccion')</code>":"La regresión necesita que <code>x</code> sea cuantitativa; <code>modalidad</code> es una categoría."
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
  "<code>unidades = np.array([12,15,11,18,20,17,22])</code> y lo mismo con <code>precios</code>",
  "<code>unidades = np.arange([12,15,11,18,20,17,22])</code> y lo mismo con <code>precios</code>",
  "<code>unidades = np.array(12,15,11,18,20,17,22)</code> y lo mismo con <code>precios</code>",
  "<code>unidades = np.array([12,15,11,18,20,17,22], dtype=str)</code> y lo mismo con <code>precios</code>"
 ],
 aprendido:"<code>np.array(lista)</code> es la forma de crear un <code>ndarray</code> desde una lista de Python. Ese paso es el que habilita todo lo que viene después: multiplicar los dos arreglos elemento a elemento sin escribir ningún <code>for</code>.",
 porque:{
  "<code>unidades = np.arange([12,15,11,18,20,17,22])</code> y lo mismo con <code>precios</code>":"<code>arange</code> genera una secuencia a partir de números (inicio, fin, paso): con una lista adentro tira <code>TypeError</code>.",
  "<code>unidades = np.array(12,15,11,18,20,17,22)</code> y lo mismo con <code>precios</code>":"<code>np.array</code> recibe <b>un</b> objeto (la lista); pasar los números sueltos hace que el segundo se lea como <code>dtype</code> y tira <code>TypeError</code>.",
  "<code>unidades = np.array([12,15,11,18,20,17,22], dtype=str)</code> y lo mismo con <code>precios</code>":"Los guarda como <b>texto</b>: multiplicar dos arreglos de cadenas tira <code>TypeError</code>."
 }
},
{
 id:"pA-02", clase:3, ej:"A · Ej 1", tema:"NumPy", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 2: calcular el ingreso de cada día mediante multiplicación vectorizada.",
 pide:"¿Cómo lo escribís?",
 ops:[
  "<code>ingresos = unidades * precios</code>",
  "<code>ingresos = np.dot(unidades, precios)</code>",
  "<code>ingresos = np.outer(unidades, precios)</code>",
  "<code>ingresos = unidades.sum() * precios.mean()</code>"
 ],
 aprendido:"Con dos arreglos NumPy de la misma forma, el operador <code>*</code> multiplica <b>elemento a elemento</b>: el día 1 con el día 1, el 2 con el 2, etc. Eso es la multiplicación vectorizada que pide la consigna, y devuelve un arreglo de 7 ingresos.",
 porque:{
  "<code>ingresos = np.dot(unidades, precios)</code>":"El producto punto devuelve <b>un solo número</b> (la suma de los productos): perdés el detalle de cada día.",
  "<code>ingresos = np.outer(unidades, precios)</code>":"Arma una <b>matriz de 7×7</b> con todas las combinaciones (cada día contra cada precio), no un ingreso por día.",
  "<code>ingresos = unidades.sum() * precios.mean()</code>":"Mezcla dos totales distintos en un único número: matemáticamente no es el ingreso de cada día."
 }
},
{
 id:"pA-03", clase:3, ej:"A · Ej 1", tema:"NumPy", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 3, primera parte: calcular el ingreso total de la semana y el promedio diario.",
 pide:"¿Qué usás?",
 ops:[
  "<code>ingresos.sum()</code> y <code>ingresos.mean()</code>",
  "<code>ingresos.sum()</code> y <code>ingresos.median()</code>",
  "<code>ingresos.cumsum()</code> y <code>ingresos.mean()</code>",
  "<code>ingresos.sum()</code> y <code>ingresos.std()</code>"
 ],
 aprendido:"Sobre un arreglo NumPy funcionan tanto los métodos (<code>ingresos.sum()</code>, <code>ingresos.mean()</code>) como las funciones (<code>np.sum(ingresos)</code>, <code>np.mean(ingresos)</code>): son equivalentes. “Total” es suma y “promedio diario” es media.",
 porque:{
  "<code>ingresos.sum()</code> y <code>ingresos.median()</code>":"La mediana es el valor central, no el promedio: “promedio diario” es la media.",
  "<code>ingresos.cumsum()</code> y <code>ingresos.mean()</code>":"<code>cumsum()</code> devuelve el <b>acumulado día a día</b> (un arreglo), no el total de la semana en un número.",
  "<code>ingresos.sum()</code> y <code>ingresos.std()</code>":"<code>std()</code> es el desvío estándar (dispersión), no el promedio diario."
 }
},
{
 id:"pA-04", clase:3, ej:"A · Ej 1", tema:"NumPy", nivel:"media",
 caso:"<b>Ejercicio 1.</b> Tarea 3, segunda parte: identificar <b>qué día</b> tuvo el mayor ingreso (no cuánto fue, sino cuál día).",
 pide:"¿Qué función usás?",
 ops:[
  "<code>dia = ingresos.argmax()</code>, que devuelve la posición del máximo",
  "<code>dia = ingresos.max()</code>, que devuelve el valor más alto del arreglo",
  "<code>dia = ingresos.argmin()</code>, que devuelve la posición del mínimo",
  "<code>dia = ingresos.idxmax()</code>, que devuelve la etiqueta del máximo"
 ],
 aprendido:"<b><code>max()</code> devuelve el valor; <code>argmax()</code> devuelve la posición</b> donde está ese valor. Como el arreglo está ordenado por día, esa posición <i>es</i> el día. El equivalente en Pandas se llama <code>idxmax()</code> y devuelve la etiqueta del índice.",
 porque:{
  "<code>dia = ingresos.max()</code>, que devuelve el valor más alto del arreglo":"Te dice <b>cuánto</b> se facturó ese día, no cuál fue el día.",
  "<code>dia = ingresos.argmin()</code>, que devuelve la posición del mínimo":"Es el caso opuesto: encuentra el día de <b>menor</b> ingreso.",
  "<code>dia = ingresos.idxmax()</code>, que devuelve la etiqueta del máximo":"<code>idxmax()</code> es de Pandas: un <code>ndarray</code> no lo tiene y tira <code>AttributeError</code>."
 }
},
{
 id:"pA-05", clase:3, ej:"A · Ej 1", tema:"NumPy", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 4: aplicar un aumento vectorizado del 8 % a los precios y mostrar los nuevos precios.",
 pide:"¿Cómo lo hacés?",
 ops:[
  "<code>precios_nuevos = precios * 1.08</code>",
  "<code>precios_nuevos = precios + precios * 0.8</code>",
  "<code>precios_nuevos = precios * 1.8</code>",
  "<code>precios_nuevos = precios + 8</code>"
 ],
 aprendido:"Multiplicar un arreglo por un escalar es <b>broadcasting</b>: NumPy aplica el 1.08 a todos los elementos de una sola vez. Un aumento del 8 % es multiplicar por <code>1.08</code> (el 100 % original más el 8 %), no por <code>0.08</code>, que daría solo el monto del aumento.",
 porque:{
  "<code>precios_nuevos = precios + precios * 0.8</code>":"Un 0,8 es un aumento del <b>80 %</b>, no del 8 %: el decimal está mal ubicado.",
  "<code>precios_nuevos = precios * 1.8</code>":"Multiplicar por 1,8 equivale a un aumento del 80 %; el 8 % es 1,08.",
  "<code>precios_nuevos = precios + 8</code>":"Suma <b>8 pesos</b> a cada precio; un aumento porcentual es proporcional al precio de cada producto."
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
  "<code>df = pd.read_csv('productos.csv', header=None)</code>",
  "<code>df = pd.read_csv('productos.csv', sep=';')</code>",
  "<code>df = pd.read_csv('productos.csv', header=1)</code>"
 ],
 aprendido:"<code>pd.read_csv()</code> lee el archivo y usa la primera línea como encabezado, así que las columnas quedan <code>producto</code>, <code>categoria</code>, <code>precio</code> y <code>stock</code>. Conviene seguir con <code>df.head()</code> y <code>df.dtypes</code> para confirmar que precio y stock quedaron numéricos.",
 porque:{
  "<code>df = pd.read_csv('productos.csv', header=None)</code>":"Con <code>header=None</code> la fila de nombres se lee como un dato más y las columnas se llaman 0, 1, 2, 3.",
  "<code>df = pd.read_csv('productos.csv', sep=';')</code>":"El archivo está separado por <b>comas</b>: con <code>sep=';'</code> quedaría todo en una única columna.",
  "<code>df = pd.read_csv('productos.csv', header=1)</code>":"<code>header=1</code> toma la <b>segunda</b> fila como encabezado y descarta la primera: se pierde 'producto, categoria, precio, stock'."
 }
},
{
 id:"pA-07", clase:4, ej:"A · Ej 2", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 2.</b> Tarea 6: seleccionar las columnas <code>producto</code>, <code>precio</code> y <code>stock</code>, dejando afuera <code>categoria</code>.",
 pide:"¿Cómo lo escribís?",
 ops:[
  "<code>df[['producto', 'precio', 'stock']]</code>",
  "<code>df.drop('categoria', inplace=True)</code>",
  "<code>df.loc[:, 'producto':'stock']</code>",
  "<code>df.iloc[:, [0, 1, 3]].copy()</code>"
 ],
 aprendido:"Para varias columnas va la <b>lista de nombres dentro de los corchetes</b>, y el resultado sigue siendo un DataFrame. Con un solo corchete y un solo nombre obtendrías una Series.",
 porque:{
  "<code>df.drop('categoria', inplace=True)</code>":"Por defecto <code>drop</code> borra <b>filas</b> (<code>axis=0</code>): busca una fila llamada 'categoria' y tira <code>KeyError</code>.",
  "<code>df.loc[:, 'producto':'stock']</code>":"Con <code>loc</code> el rango incluye ambos extremos y todo lo que hay en medio: <code>categoria</code> queda adentro.",
  "<code>df.iloc[:, [0, 1, 3]].copy()</code>":"Las posiciones 0, 1 y 3 son producto, <b>categoria</b> y stock: saltea precio y deja la columna que había que sacar."
 }
},
{
 id:"pA-08", clase:4, ej:"A · Ej 2", tema:"Pandas", nivel:"media",
 caso:"<b>Ejercicio 2.</b> Tarea 7: filtrar los productos con precio mayor a 40000 <b>y</b> stock mayor a 0.",
 pide:"¿Cuál es la sintaxis correcta?",
 ops:[
  "<code>df[(df['precio'] > 40000) & (df['stock'] > 0)]</code>",
  "<code>df[(df['precio'] > 40000) | (df['stock'] > 0)]</code>",
  "<code>df[(df['precio'] > 40000) and (df['stock'] > 0)]</code>",
  "<code>df[(df['precio'] > 40000) & (df['stock'] == 0)]</code>"
 ],
 aprendido:"Las dos reglas de oro del filtrado en Pandas: <b>se usa <code>&amp;</code>, no <code>and</code></b>, y <b>cada condición va entre paréntesis</b> porque <code>&amp;</code> tiene mayor precedencia que los comparadores. Con estos datos el resultado son Monitor, Webcam y Notebook: el Mouse sale por precio y por stock 0.",
 porque:{
  "<code>df[(df['precio'] > 40000) | (df['stock'] > 0)]</code>":"<code>|</code> es “o”: deja pasar al Teclado, que cumple sólo una de las dos condiciones.",
  "<code>df[(df['precio'] > 40000) and (df['stock'] > 0)]</code>":"<code>and</code> espera un único valor de verdad; con Series lanza “The truth value of a Series is ambiguous”.",
  "<code>df[(df['precio'] > 40000) & (df['stock'] == 0)]</code>":"Con <code>stock == 0</code> filtra los productos <b>sin</b> stock, justo lo contrario de los disponibles."
 }
},
{
 id:"pA-09", clase:4, ej:"A · Ej 2", tema:"Pandas · E/S", nivel:"baja",
 caso:"<b>Ejercicio 2.</b> Tarea 8: exportar el resultado como <code>productos_disponibles.csv</code> <b>sin guardar el índice</b>.",
 pide:"¿Cómo lo exportás?",
 ops:[
  "<code>disponibles.to_csv('productos_disponibles.csv', index=False)</code>",
  "<code>disponibles.to_csv('productos_disponibles.csv', index_label='')</code>",
  "<code>disponibles.to_excel('productos_disponibles.csv', index=False)</code>",
  "<code>disponibles.to_csv('productos_disponibles', index=False)</code>"
 ],
 aprendido:"Por defecto Pandas escribe el índice como una primera columna sin nombre. <b><code>index=False</code></b> es exactamente lo que pide la consigna “sin guardar el índice”. Aparece en los tres modelos de parcial: memorizalo.",
 porque:{
  "<code>disponibles.to_csv('productos_disponibles.csv', index_label='')</code>":"<code>index_label</code> sólo cambia el <b>nombre</b> de la columna del índice; el índice se sigue escribiendo.",
  "<code>disponibles.to_excel('productos_disponibles.csv', index=False)</code>":"Escribe un libro de Excel con extensión <code>.csv</code>: no se puede abrir como CSV.",
  "<code>disponibles.to_csv('productos_disponibles', index=False)</code>":"Falta la extensión: el archivo se llamaría <code>productos_disponibles</code>, no <code>productos_disponibles.csv</code> como pide la consigna."
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
  "<code>plt.plot(dias, visitas, markers='o')</code>",
  "<code>plt.plot(dias, visitas, 'o')</code>",
  "<code>plt.scatter(dias, visitas, marker='o')</code>"
 ],
 aprendido:"<code>plt.plot()</code> dibuja la línea y <b><code>marker='o'</code></b> agrega un círculo en cada observación, que es lo que pide “con marcadores”. Los días son una secuencia ordenada, así que la línea es el gráfico correcto para mostrar la evolución.",
 porque:{
  "<code>plt.plot(dias, visitas, markers='o')</code>":"El parámetro se llama <code>marker</code> (singular); <code>markers</code> no existe y tira <code>AttributeError</code>.",
  "<code>plt.plot(dias, visitas, 'o')</code>":"El formato <code>'o'</code> dibuja <b>sólo los círculos</b>, sin línea que los una: la consigna pide líneas con marcadores.",
  "<code>plt.scatter(dias, visitas, marker='o')</code>":"Pone los círculos pero no los une con una línea: es una dispersión, no un gráfico de líneas."
 }
},
{
 id:"pA-11", clase:5, ej:"A · Ej 3", tema:"Matplotlib", nivel:"baja",
 caso:"<b>Ejercicio 3.</b> Tarea 10: agregar título, etiquetas de ejes y cuadrícula.",
 pide:"¿Qué llamadas usás?",
 ops:[
  "<code>plt.title(...)</code>, <code>plt.xlabel(...)</code>, <code>plt.ylabel(...)</code> y <code>plt.grid(True)</code>",
  "<code>plt.title(...)</code>, <code>plt.xlabel(...)</code>, <code>plt.ylabel(...)</code> y <code>plt.gridlines(True)</code>",
  "<code>plt.set_title(...)</code>, <code>plt.set_xlabel(...)</code>, <code>plt.set_ylabel(...)</code> y <code>plt.grid(True)</code>",
  "<code>plt.title(...)</code>, <code>plt.xlabel(...)</code>, <code>plt.ylabel(...)</code> y <code>plt.grid(False)</code>"
 ],
 aprendido:"Con la interfaz <code>plt.*</code> los rótulos van <b>sin</b> el prefijo <code>set_</code>: <code>plt.title()</code>, <code>plt.xlabel()</code>, <code>plt.ylabel()</code>, <code>plt.grid()</code>. Si en cambio usás la interfaz orientada a objetos (<code>fig, ax = plt.subplots()</code>) son <code>ax.set_title()</code>, <code>ax.set_xlabel()</code>… Conviene que la cuadrícula sea discreta: <code>plt.grid(True, alpha=.3)</code>.",
 porque:{
  "<code>plt.title(...)</code>, <code>plt.xlabel(...)</code>, <code>plt.ylabel(...)</code> y <code>plt.gridlines(True)</code>":"<code>plt.gridlines</code> no existe: la cuadrícula se activa con <code>plt.grid(True)</code>.",
  "<code>plt.set_title(...)</code>, <code>plt.set_xlabel(...)</code>, <code>plt.set_ylabel(...)</code> y <code>plt.grid(True)</code>":"Los métodos con <code>set_</code> son del <code>Axes</code> (<code>ax.set_title()</code>); en <code>plt.*</code> se llaman <code>title</code>, <code>xlabel</code>, <code>ylabel</code>.",
  "<code>plt.title(...)</code>, <code>plt.xlabel(...)</code>, <code>plt.ylabel(...)</code> y <code>plt.grid(False)</code>":"<code>grid(False)</code> <b>apaga</b> la cuadrícula: los rótulos están bien pero falta justamente la cuadrícula que se pide."
 }
},
{
 id:"pA-12", clase:5, ej:"A · Ej 3", tema:"Matplotlib", nivel:"baja",
 caso:"<b>Ejercicio 3.</b> Tarea 11: destacar la evolución semanal con color azul.",
 pide:"¿Dónde va el color?",
 ops:[
  "Como parámetro del trazado: <code>plt.plot(dias, visitas, marker='o', color='blue')</code>",
  "Como parámetro del trazado: <code>plt.plot(dias, visitas, marker='o', colour='blue')</code>",
  "Como parámetro de la cuadrícula: <code>plt.plot(dias, visitas, marker='o')</code> y <code>plt.grid(color='blue')</code>",
  "Como parámetro de un rótulo: <code>plt.plot(dias, visitas, marker='o')</code> y <code>plt.xlabel('Día', color='blue')</code>"
 ],
 aprendido:"El color es un parámetro de la función que dibuja: <code>color='blue'</code> (también valen <code>'b'</code> o un hexadecimal como <code>'#1f77b4'</code>). Se puede combinar con <code>linewidth=</code> y <code>linestyle=</code>. En barras es exactamente igual: <code>plt.bar(..., color=…)</code>.",
 porque:{
  "Como parámetro del trazado: <code>plt.plot(dias, visitas, marker='o', colour='blue')</code>":"<code>colour</code> (a la inglesa) no existe en Matplotlib: el parámetro es <code>color</code> y con <code>colour</code> tira error.",
  "Como parámetro de la cuadrícula: <code>plt.plot(dias, visitas, marker='o')</code> y <code>plt.grid(color='blue')</code>":"Pinta las <b>líneas de la cuadrícula</b> de azul; la línea de datos sigue con el color por defecto.",
  "Como parámetro de un rótulo: <code>plt.plot(dias, visitas, marker='o')</code> y <code>plt.xlabel('Día', color='blue')</code>":"Cambia el color del <b>texto</b> del rótulo del eje, no el de la línea que muestra la evolución."
 }
},
{
 id:"pA-13", clase:5, ej:"A · Ej 3", tema:"Matplotlib", nivel:"baja",
 caso:"<b>Ejercicio 3.</b> Tarea 12: mostrar el gráfico, cuidando que las etiquetas no queden recortadas.",
 pide:"¿Cómo cerrás el bloque?",
 ops:[
  "<code>plt.tight_layout()</code> y después <code>plt.show()</code>",
  "<code>plt.show()</code> y después <code>plt.tight_layout()</code>",
  "<code>plt.tight_layout()</code> y después <code>plt.close()</code>",
  "<code>plt.autoscale()</code> y después <code>plt.show()</code>"
 ],
 aprendido:"<code>plt.show()</code> presenta la figura. <code>plt.tight_layout()</code> justo antes ajusta los márgenes para que no se corten títulos ni etiquetas: aparece en todos los ejemplos de la cursada. Y si además hay que guardar, <code>plt.savefig()</code> va <b>antes</b> de <code>show()</code>.",
 porque:{
  "<code>plt.show()</code> y después <code>plt.tight_layout()</code>":"<code>show()</code> presenta la figura ya armada: el ajuste llega tarde y no afecta lo que se mostró.",
  "<code>plt.tight_layout()</code> y después <code>plt.close()</code>":"<code>close()</code> cierra la figura <b>sin mostrarla</b>: el ajuste queda hecho pero nadie lo ve.",
  "<code>plt.autoscale()</code> y después <code>plt.show()</code>":"<code>autoscale</code> reajusta los <b>límites</b> de los ejes a los datos; no acomoda los márgenes para que las etiquetas no se recorten."
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
  "<code>df = pd.DataFrame({'Legajo':1001, 'Nombre':'Ana', 'Parcial1':8, ...})</code>",
  "<code>df = pd.DataFrame({'Legajo':[1001,1002,1003], 'Nombre':['Ana','Bruno'], ...})</code>",
  "<code>df = pd.DataFrame([['Legajo','Nombre',...], [1001,'Ana',...], [1002,'Bruno',...]])</code>"
 ],
 aprendido:"El patrón más usado: un <b>diccionario donde cada clave es una columna y cada valor es la lista de sus datos</b>. Todas las listas tienen que tener el mismo largo. La alternativa equivalente es una lista de diccionarios (una fila por diccionario), que también acepta <code>pd.DataFrame()</code>.",
 porque:{
  "<code>df = pd.DataFrame({'Legajo':1001, 'Nombre':'Ana', 'Parcial1':8, ...})</code>":"Con valores sueltos (escalares) y sin índice, Pandas tira <code>ValueError</code>: necesita listas, una por columna.",
  "<code>df = pd.DataFrame({'Legajo':[1001,1002,1003], 'Nombre':['Ana','Bruno'], ...})</code>":"Todas las listas tienen que tener el <b>mismo largo</b>: con una de 3 y otra de 2 tira <code>ValueError</code>.",
  "<code>df = pd.DataFrame([['Legajo','Nombre',...], [1001,'Ana',...], [1002,'Bruno',...]])</code>":"Los nombres de las columnas entran como <b>una fila más de datos</b>: las columnas quedarían llamadas 0, 1, 2…"
 }
},
{
 id:"pB-02", clase:3, ej:"B · Ej 1", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 2: crear la columna <code>Promedio</code> a partir de <code>Parcial1</code> y <code>Parcial2</code>.",
 pide:"¿Cómo la calculás?",
 ops:[
  "<code>df['Promedio'] = (df['Parcial1'] + df['Parcial2']) / 2</code>",
  "<code>df['Promedio'] = df['Parcial1'] + df['Parcial2'] / 2</code>",
  "<code>df['Promedio'] = (df['Parcial1'] + df['Parcial2']) // 2</code>",
  "<code>df['Promedio'] = df[['Parcial1', 'Parcial2']].mean()</code>"
 ],
 aprendido:"Las operaciones entre columnas son <b>vectorizadas</b>: se aplican fila por fila automáticamente. La forma equivalente con varias notas es <code>df[['Parcial1','Parcial2']].mean(axis=1)</code>, donde <b><code>axis=1</code></b> significa “promediar a lo ancho de cada fila”.",
 porque:{
  "<code>df['Promedio'] = df['Parcial1'] + df['Parcial2'] / 2</code>":"Sin paréntesis, la división se hace primero: calcula <code>Parcial1 + (Parcial2 / 2)</code>, que no es el promedio.",
  "<code>df['Promedio'] = (df['Parcial1'] + df['Parcial2']) // 2</code>":"<code>//</code> es división <b>entera</b>: descarta los decimales, y 7,5 quedaría como 7.",
  "<code>df['Promedio'] = df[['Parcial1', 'Parcial2']].mean()</code>":"Sin <code>axis=1</code> promedia cada <b>columna</b> (dos números) y al asignarlos alinea por índice: casi todas las filas quedan en NaN."
 }
},
{
 id:"pB-03", clase:3, ej:"B · Ej 1", tema:"NumPy + Pandas", nivel:"media",
 caso:"<b>Ejercicio 1.</b> Tarea 3: crear la columna <code>Estado</code> con “Aprueba” si <code>Promedio &gt;= 6</code> <b>y</b> <code>Asistencia &gt;= 75</code>; en otro caso, “Revisa”.",
 pide:"¿Cómo la generás?",
 ops:[
  "<code>df['Estado'] = np.where((df['Promedio'] >= 6) & (df['Asistencia'] >= 75), 'Aprueba', 'Revisa')</code>",
  "<code>df['Estado'] = np.where((df['Promedio'] >= 6) | (df['Asistencia'] >= 75), 'Aprueba', 'Revisa')</code>",
  "<code>df['Estado'] = np.where((df['Promedio'] >= 6) & (df['Asistencia'] >= 75), 'Revisa', 'Aprueba')</code>",
  "<code>df['Estado'] = np.where(df['Promedio'] >= 6 & df['Asistencia'] >= 75, 'Aprueba', 'Revisa')</code>"
 ],
 aprendido:"Dos resultados posibles → <b><code>np.where(condición, si_true, si_false)</code></b>. Como hay <b>dos condiciones que deben cumplirse a la vez</b>, se combinan con <code>&amp;</code> y cada una va entre paréntesis. Si hubiera tres o más categorías, iría <code>np.select</code> con listas de condiciones y opciones.",
 porque:{
  "<code>df['Estado'] = np.where((df['Promedio'] >= 6) | (df['Asistencia'] >= 75), 'Aprueba', 'Revisa')</code>":"<code>|</code> es “o”: aprobaría a quien cumple sólo una de las dos condiciones; la consigna pide las <b>dos a la vez</b>.",
  "<code>df['Estado'] = np.where((df['Promedio'] >= 6) & (df['Asistencia'] >= 75), 'Revisa', 'Aprueba')</code>":"Los resultados están invertidos: marcaría “Revisa” justo a quien cumple ambas condiciones.",
  "<code>df['Estado'] = np.where(df['Promedio'] >= 6 & df['Asistencia'] >= 75, 'Aprueba', 'Revisa')</code>":"Sin paréntesis, <code>&</code> se evalúa antes que <code>>=</code>: Python intenta <code>6 & df['Asistencia']</code> y falla o da un resultado incorrecto."
 }
},
{
 id:"pB-04", clase:3, ej:"B · Ej 1", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 4: mostrar solamente <code>Nombre</code>, <code>Promedio</code> y <code>Estado</code>.",
 pide:"¿Cómo lo mostrás?",
 ops:[
  "<code>print(df[['Nombre', 'Promedio', 'Estado']])</code>",
  "<code>print(df.loc[['Nombre', 'Promedio', 'Estado']])</code>",
  "<code>print(df[['Nombre', 'Promedio', 'Estado']].head(1))</code>",
  "<code>print(df.drop(['Legajo', 'Parcial1', 'Parcial2', 'Asistencia']))</code>"
 ],
 aprendido:"De nuevo la lista de columnas entre dobles corchetes: devuelve un DataFrame con esas tres columnas y se imprime como una tabla prolija. Es el cierre típico de todo ejercicio: quedarse con las columnas pertinentes antes de mostrar.",
 porque:{
  "<code>print(df.loc[['Nombre', 'Promedio', 'Estado']])</code>":"<code>loc</code> con una lista busca <b>filas</b> con esas etiquetas: tira <code>KeyError</code>.",
  "<code>print(df[['Nombre', 'Promedio', 'Estado']].head(1))</code>":"Muestra las tres columnas correctas, pero sólo la <b>primera fila</b> (<code>head(1)</code>).",
  "<code>print(df.drop(['Legajo', 'Parcial1', 'Parcial2', 'Asistencia']))</code>":"<code>drop</code> sin <code>axis=1</code> busca <b>filas</b> con esos nombres y tira <code>KeyError</code>."
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
  "<code>df = pd.read_json('pedidos.json', lines=True)</code>",
  "<code>df = pd.json_normalize('pedidos.json')</code>",
  "<code>df = json.load('pedidos.json')</code>"
 ],
 aprendido:"<code>pd.read_json()</code> con una <b>lista de objetos planos</b> arma directamente el DataFrame: cada objeto es una fila y cada clave una columna. La alternativa manual es <code>json.load(f)</code> (que devuelve una lista de diccionarios) y después <code>pd.DataFrame(datos)</code>. <code>json_normalize</code> se reserva para JSON <b>anidado</b>.",
 porque:{
  "<code>df = pd.read_json('pedidos.json', lines=True)</code>":"<code>lines=True</code> espera un objeto JSON por línea (formato JSON Lines); este archivo es una lista y falla con <code>ValueError</code>.",
  "<code>df = pd.json_normalize('pedidos.json')</code>":"Recibe los datos ya cargados en memoria, no un nombre de archivo; además acá no hay anidamiento.",
  "<code>df = json.load('pedidos.json')</code>":"<code>json.load</code> espera un objeto archivo abierto, no una ruta en texto; y devolvería una lista, no un DataFrame."
 }
},
{
 id:"pB-06", clase:4, ej:"B · Ej 2", tema:"Limpieza", nivel:"media",
 caso:"<b>Ejercicio 2.</b> Tarea 6: los importes vienen como texto (<code>\"12500.50\"</code>). Convertirlos a número decimal.",
 pide:"¿Cómo los convertís?",
 ops:[
  "<code>df['importe'] = pd.to_numeric(df['importe'], errors='coerce')</code>",
  "<code>df['importe'] = df['importe'].astype(int, errors='raise')</code>",
  "<code>df['importe'] = df['importe'].apply(lambda x: int(x))</code>",
  "<code>df['importe'] = df['importe'].str.replace('.', '', regex=False)</code>"
 ],
 aprendido:"<code>pd.to_numeric()</code> con <b><code>errors='coerce'</code></b> convierte y deja en <code>NaN</code> lo que no se pueda parsear, en vez de cortar el programa. <code>df['importe'].astype(float)</code> también funcionaría con estos datos limpios, pero explota ante el primer valor raro: por eso <code>to_numeric</code> es la opción defensiva que enseña la cursada.",
 porque:{
  "<code>df['importe'] = df['importe'].astype(int, errors='raise')</code>":"<code>'12500.50'</code> no se puede pasar a entero directamente, y aunque se pudiera perderías los centavos.",
  "<code>df['importe'] = df['importe'].apply(lambda x: int(x))</code>":"<code>int('12500.50')</code> tira <code>ValueError</code>: <code>int</code> no acepta un texto con decimales.",
  "<code>df['importe'] = df['importe'].str.replace('.', '', regex=False)</code>":"Borra el punto decimal (12500.50 pasa a 1250050) y el resultado sigue siendo <b>texto</b>."
 }
},
{
 id:"pB-07", clase:4, ej:"B · Ej 2", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 2.</b> Tarea 7: filtrar los pedidos entregados.",
 pide:"¿Cómo los filtrás?",
 ops:[
  "<code>entregados = df[df['estado'] == 'entregado']</code>",
  "<code>entregados = df[df['estado'] is 'entregado']</code>",
  "<code>entregados = df[df['estado'].isin('entregado')]</code>",
  "<code>entregados = df[df['estado'] != 'entregado']</code>"
 ],
 aprendido:"El filtrado tiene dos pasos que conviene ver por separado: <code>df['estado'] == 'entregado'</code> genera la <b>máscara booleana</b>, y recién al ponerla entre corchetes (<code>df[máscara]</code>) obtenés las filas. Es el mismo mecanismo que las máscaras de NumPy.",
 porque:{
  "<code>entregados = df[df['estado'] is 'entregado']</code>":"<code>is</code> compara identidad de objetos y devuelve un único <code>False</code>, no una máscara: <code>df[False]</code> tira <code>KeyError</code>.",
  "<code>entregados = df[df['estado'].isin('entregado')]</code>":"<code>isin</code> exige una <b>lista</b> de valores; con un texto suelto tira <code>TypeError</code>.",
  "<code>entregados = df[df['estado'] != 'entregado']</code>":"Es la condición opuesta: trae los pedidos que <b>no</b> se entregaron."
 }
},
{
 id:"pB-08", clase:4, ej:"B · Ej 2", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 2.</b> Tarea 8: calcular el total entregado.",
 pide:"¿Cómo lo calculás?",
 ops:[
  "<code>total = entregados['importe'].sum()</code>",
  "<code>total = entregados['importe'].count()</code>",
  "<code>total = entregados['importe'].cumsum()</code>",
  "<code>total = entregados['importe'].mean() * len(df)</code>"
 ],
 aprendido:"<code>.sum()</code> aplicado a <b>una columna</b> devuelve el total de esa columna. Si lo aplicás al DataFrame entero, Pandas suma todas las columnas numéricas (incluido el número de pedido, que no tiene sentido sumar) y hasta concatena los textos.",
 porque:{
  "<code>total = entregados['importe'].count()</code>":"<code>count()</code> cuenta cuántos valores no nulos hay; no los suma.",
  "<code>total = entregados['importe'].cumsum()</code>":"Devuelve el <b>acumulado</b> fila por fila (una Series), no un total.",
  "<code>total = entregados['importe'].mean() * len(df)</code>":"Multiplica por la cantidad de filas de <b>todos</b> los pedidos (<code>df</code>), no sólo de los entregados: el total sale inflado."
 }
},
{
 id:"pB-09", clase:4, ej:"B · Ej 2", tema:"Pandas · E/S", nivel:"media",
 caso:"<b>Ejercicio 2.</b> Tarea 9: exportar los pedidos entregados como <code>entregados.csv</code>.",
 pide:"¿Cómo lo exportás?",
 ops:[
  "<code>entregados.to_csv('entregados.csv', index=False)</code>",
  "<code>entregados.to_excel('entregados.xlsx', index=False)</code>",
  "<code>entregados.to_csv('entregados.csv', index=False, header=False)</code>",
  "<code>entregados.to_csv('entregados.csv', columns=['importe'], index=False)</code>"
 ],
 aprendido:"Ojo con el enunciado: dice “exportar a Excel como <code>entregados.csv</code>”, pero el <b>nombre del archivo manda</b>. La extensión <code>.csv</code> pide <code>to_csv()</code>; si de verdad quisieran un libro de Excel, el archivo tendría que llamarse <code>entregados.xlsx</code> y ahí sí iría <code>to_excel(..., index=False, engine='openpyxl')</code>. En ambos casos, <code>index=False</code>.",
 porque:{
  "<code>entregados.to_excel('entregados.xlsx', index=False)</code>":"Cambia tanto el formato como el nombre del archivo: la consigna pide <code>entregados.csv</code>, y el nombre manda.",
  "<code>entregados.to_csv('entregados.csv', index=False, header=False)</code>":"Deja afuera los <b>nombres de las columnas</b>: el archivo quedaría sin encabezado.",
  "<code>entregados.to_csv('entregados.csv', columns=['importe'], index=False)</code>":"Exporta <b>sólo la columna</b> <code>importe</code>: se pierden el pedido, el cliente y el estado."
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
  "<code>plt.bar(ventas, categorias)</code>",
  "<code>plt.stem(categorias, ventas)</code>"
 ],
 aprendido:"<b><code>bar</code> = barras verticales</b> (la categoría va en x y el valor en y); <b><code>barh</code> = horizontales</b>, útiles cuando las etiquetas son largas. Las barras comparan magnitudes entre categorías y el eje cuantitativo debe arrancar en cero.",
 porque:{
  "<code>plt.barh(categorias, ventas)</code>":"Dibuja barras <b>horizontales</b>: la consigna pide verticales.",
  "<code>plt.bar(ventas, categorias)</code>":"Los argumentos están al revés: intenta usar los nombres de categoría como alturas y falla.",
  "<code>plt.stem(categorias, ventas)</code>":"Dibuja palitos con un círculo en la punta (gráfico de tallos), no barras."
 }
},
{
 id:"pB-11", clase:5, ej:"B · Ej 3", tema:"Matplotlib", nivel:"media",
 caso:"<b>Ejercicio 3.</b> Tarea 12: mostrar el valor numérico encima de cada barra.",
 pide:"¿Cuál es la forma directa en Matplotlib?",
 ops:[
  "<code>barras = plt.bar(categorias, ventas)</code> y después <code>plt.bar_label(barras)</code>",
  "<code>barras = plt.bar(categorias, ventas)</code> y después <code>plt.bar_label(ventas)</code>",
  "<code>barras = plt.bar(categorias, ventas)</code> y después <code>plt.text(barras)</code>",
  "<code>barras = plt.bar(categorias, ventas, label=True)</code> y después <code>plt.legend()</code>"
 ],
 aprendido:"<code>plt.bar()</code> <b>devuelve</b> el contenedor de las barras; pasándoselo a <b><code>plt.bar_label(barras)</code></b> Matplotlib escribe el valor de cada una automáticamente. Se puede formatear con <code>fmt='%.0f'</code> y separar del borde con <code>padding=3</code>. Es lo que la cursada llama “valores visibles”.",
 porque:{
  "<code>barras = plt.bar(categorias, ventas)</code> y después <code>plt.bar_label(ventas)</code>":"<code>bar_label</code> necesita el <b>contenedor de barras</b> que devuelve <code>plt.bar</code>, no la lista de valores.",
  "<code>barras = plt.bar(categorias, ventas)</code> y después <code>plt.text(barras)</code>":"<code>text</code> escribe un texto en una coordenada (<code>x, y, texto</code>): no acepta un contenedor de barras.",
  "<code>barras = plt.bar(categorias, ventas, label=True)</code> y después <code>plt.legend()</code>":"<code>label</code> y la leyenda identifican la serie en un recuadro aparte; no escriben el valor encima de cada barra."
 }
},
{
 id:"pB-12", clase:5, ej:"B · Ej 3", tema:"Matplotlib", nivel:"alta",
 caso:"<b>Ejercicio 3.</b> Tarea 13: usar un color diferente para la barra de mayor venta (Tecnología, con 140).",
 pide:"¿Cómo lo resolvés?",
 ops:[
  "Armar una lista de colores condicional y pasarla a <code>color=</code>: <code>colores = ['crimson' if v == max(ventas) else 'steelblue' for v in ventas]</code>",
  "Pasar dos colores a <code>color=</code> y confiar en que Matplotlib elija: <code>plt.bar(categorias, ventas, color=['crimson', 'steelblue'])</code>",
  "Marcar el máximo con un parámetro propio: <code>plt.bar(categorias, ventas, color='steelblue', highlight=max(ventas))</code>",
  "Usar un mapa de colores por valor: <code>plt.bar(categorias, ventas, cmap='Reds')</code>"
 ],
 aprendido:"<b><code>color=</code> acepta una lista con un color por barra</b>. La lista se arma comparando cada valor con el máximo: en Matplotlib puro con una comprensión de lista, y si venís de un DataFrame, con <code>np.where(ventas == ventas.max(), 'crimson', 'steelblue')</code>. Es el mismo criterio de la cursada: reservar el color de acento para el hallazgo.",
 porque:{
  "Pasar dos colores a <code>color=</code> y confiar en que Matplotlib elija: <code>plt.bar(categorias, ventas, color=['crimson', 'steelblue'])</code>":"Los reparte <b>por posición</b> (alternando), sin mirar los valores: no destaca la barra de mayor venta.",
  "Marcar el máximo con un parámetro propio: <code>plt.bar(categorias, ventas, color='steelblue', highlight=max(ventas))</code>":"<code>highlight</code> no existe en <code>plt.bar</code>: tira un error de argumento desconocido.",
  "Usar un mapa de colores por valor: <code>plt.bar(categorias, ventas, cmap='Reds')</code>":"<code>plt.bar</code> no tiene <code>cmap</code> (eso es de <code>scatter</code> o <code>imshow</code>), y un degradado no destacaría sólo a la de mayor venta."
 }
},
{
 id:"pB-13", clase:5, ej:"B · Ej 3", tema:"Matplotlib", nivel:"baja",
 caso:"<b>Ejercicio 3.</b> Tarea 11: “agregar título y etiquetas sugeridos por usted”. Te toca redactarlos.",
 pide:"¿Qué título elegirías, según el criterio de la cursada?",
 ops:[
  "<code>plt.title('Tecnología lidera las ventas del período')</code>, que enuncia la conclusión",
  "<code>plt.title('Ventas por categoría en el período analizado')</code>, que describe el contenido",
  "<code>plt.title('Gráfico de barras de ventas de cada categoría')</code>, que nombra el tipo",
  "<code>plt.title('Tecnología, Libros, Hogar, Deportes y Moda')</code>, que lista las categorías"
 ],
 aprendido:"Criterio explícito de la clase de Matplotlib: <b>“Ventas” informa poco; el título puede enunciar la conclusión, no solo el tema</b>. Y las etiquetas de eje deben nombrar la variable <b>con su unidad</b>: <code>plt.xlabel('Categoría')</code>, <code>plt.ylabel('Ventas (unidades)')</code>. Criterio de éxito: que otra persona entienda el mensaje sin leer el código.",
 porque:{
  "<code>plt.title('Ventas por categoría en el período analizado')</code>, que describe el contenido":"Nombra el tema, pero no comunica ningún hallazgo: es el tipo de título genérico que la clase marca como error.",
  "<code>plt.title('Gráfico de barras de ventas de cada categoría')</code>, que nombra el tipo":"Describe la técnica, no el hallazgo: que son barras ya se ve mirando la figura.",
  "<code>plt.title('Tecnología, Libros, Hogar, Deportes y Moda')</code>, que lista las categorías":"Repite las etiquetas del eje horizontal: no agrega información ni dice qué mostrar."
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
  "<code>df['Fecha'] = pd.to_datetime(df['Fecha'], format='%d/%m/%Y')</code>",
  "<code>df['Fecha'] = pd.to_datetime(df['Fecha']).dt.month</code>",
  "<code>df['Fecha'] = pd.to_datetime(df['Fecha'], unit='s')</code>"
 ],
 aprendido:"<code>pd.to_datetime()</code> pasa texto a fecha real, y recién ahí podés extraer año, mes o día (<code>df['Fecha'].dt.month</code>), ordenar cronológicamente o calcular duraciones. Parámetros útiles: <code>errors='coerce'</code> para que lo inválido quede <code>NaT</code>, y <code>dayfirst=True</code> cuando el formato es dd/mm/aaaa.",
 porque:{
  "<code>df['Fecha'] = pd.to_datetime(df['Fecha'], format='%d/%m/%Y')</code>":"El formato declarado (día/mes/año) no coincide con '2026-03-01': tira <code>ValueError</code>.",
  "<code>df['Fecha'] = pd.to_datetime(df['Fecha']).dt.month</code>":"Convierte bien pero se queda <b>sólo con el mes</b>: la columna pierde el año y el día.",
  "<code>df['Fecha'] = pd.to_datetime(df['Fecha'], unit='s')</code>":"<code>unit</code> es para números que representan segundos desde 1970; con texto de fechas tira error."
 }
},
{
 id:"pC-02", clase:3, ej:"C · Ej 1", tema:"Pandas", nivel:"baja",
 caso:"<b>Ejercicio 1.</b> Tarea 2: crear la columna <code>Importe = Unidades × Precio</code>.",
 pide:"¿Cómo la creás?",
 ops:[
  "<code>df['Importe'] = df['Unidades'] * df['Precio']</code>",
  "<code>df['Importe'] = df['Unidades'].sum() * df['Precio']</code>",
  "<code>df['Importe'] = df['Unidades'] @ df['Precio']</code>",
  "<code>df['Importe'] = df[['Unidades', 'Precio']].prod()</code>"
 ],
 aprendido:"Multiplicar dos columnas es una operación vectorizada: Pandas alinea por índice y calcula fila por fila sin ciclos. Es el paso que se repite en casi todos los prácticos (<code>cantidad * precio</code>, <code>margen * cantidad</code>) y siempre se resuelve igual.",
 porque:{
  "<code>df['Importe'] = df['Unidades'].sum() * df['Precio']</code>":"Multiplica el <b>total de unidades</b> de todas las ventas por el precio de cada fila: el resultado sale inflado.",
  "<code>df['Importe'] = df['Unidades'] @ df['Precio']</code>":"<code>@</code> es el producto punto: devuelve <b>un solo número</b> que se repite en todas las filas.",
  "<code>df['Importe'] = df[['Unidades', 'Precio']].prod()</code>":"Sin <code>axis=1</code>, <code>prod()</code> multiplica dentro de cada <b>columna</b> (dos números) y la asignación queda casi toda en NaN."
 }
},
{
 id:"pC-03", clase:3, ej:"C · Ej 1", tema:"Pandas", nivel:"media",
 caso:"<b>Ejercicio 1.</b> Tarea 3: obtener el importe total por vendedor <b>con groupby</b>.",
 pide:"¿Cómo lo escribís?",
 ops:[
  "<code>df.groupby('Vendedor', as_index=False)['Importe'].sum()</code>",
  "<code>df.groupby('Importe', as_index=False)['Vendedor'].sum()</code>",
  "<code>df.groupby('Vendedor', as_index=False)['Importe'].mean()</code>",
  "<code>df.groupby(['Vendedor', 'Región'], as_index=False)['Importe'].sum()</code>"
 ],
 aprendido:"El patrón completo de <code>groupby</code>: <b>agrupar por → elegir la columna → aplicar la métrica</b>. <code>as_index=False</code> deja <code>Vendedor</code> como columna normal en vez de convertirla en índice, cosa que facilita graficar o exportar después.",
 porque:{
  "<code>df.groupby('Importe', as_index=False)['Vendedor'].sum()</code>":"Los roles están cruzados: agrupa por importe y trata de sumar nombres de vendedores.",
  "<code>df.groupby('Vendedor', as_index=False)['Importe'].mean()</code>":"<code>mean()</code> da el importe <b>promedio</b> por venta, no el total del vendedor.",
  "<code>df.groupby(['Vendedor', 'Región'], as_index=False)['Importe'].sum()</code>":"Agrupar también por región da una fila por cada combinación vendedor-región, no el total de cada vendedor."
 }
},
{
 id:"pC-04", clase:3, ej:"C · Ej 1", tema:"Pandas", nivel:"media",
 caso:"<b>Ejercicio 1.</b> Tarea 4: obtener las unidades totales por producto y ordenarlas <b>de mayor a menor</b>.",
 pide:"¿Cómo encadenás las operaciones?",
 ops:[
  "<code>df.groupby('Producto')['Unidades'].sum().sort_values(ascending=False)</code>",
  "<code>df.groupby('Producto')['Unidades'].sum().sort_index(ascending=False)</code>",
  "<code>df.groupby('Producto')['Unidades'].sort_values(ascending=False).sum()</code>",
  "<code>df.groupby('Producto')['Unidades'].mean().sort_values(ascending=False)</code>"
 ],
 aprendido:"Los métodos de Pandas se <b>encadenan</b>: cada uno devuelve un objeto nuevo sobre el que seguís operando. <code>sort_values()</code> ordena por <b>valor</b> y por defecto es ascendente, así que “de mayor a menor” exige <b><code>ascending=False</code></b>. <code>sort_index()</code>, en cambio, ordena por la etiqueta (acá, alfabéticamente por producto).",
 porque:{
  "<code>df.groupby('Producto')['Unidades'].sum().sort_index(ascending=False)</code>":"<code>sort_index</code> ordena por el <b>nombre del producto</b> (de la Z a la A), no por cantidad de unidades.",
  "<code>df.groupby('Producto')['Unidades'].sort_values(ascending=False).sum()</code>":"El objeto agrupado no tiene <code>sort_values</code>: primero hay que sumar y recién después ordenar. Tira <code>AttributeError</code>.",
  "<code>df.groupby('Producto')['Unidades'].mean().sort_values(ascending=False)</code>":"Ordena bien pero con el <b>promedio</b> por venta: el pedido era el total de unidades."
 }
},
{
 id:"pC-05", clase:3, ej:"C · Ej 1", tema:"Pandas", nivel:"media",
 caso:"<b>Ejercicio 1.</b> Tarea 5: identificar <b>la venta individual</b> de mayor importe, con todos sus datos (fecha, vendedor, región, producto).",
 pide:"¿Cómo la obtenés?",
 ops:[
  "<code>df.loc[df['Importe'].idxmax()]</code>",
  "<code>df['Importe'].idxmax()</code>",
  "<code>df.loc[df['Importe'].max()]</code>",
  "<code>df.loc[df['Importe'].idxmin()]</code>"
 ],
 aprendido:"<b><code>idxmax()</code> devuelve la etiqueta de índice de la fila con el valor máximo</b>, y <code>.loc[]</code> trae esa fila entera. Es el patrón para “identificar el registro de mayor X”, que se repite en los prácticos como “el pedido de mayor importe” o “el estudiante con mejor nota”.",
 porque:{
  "<code>df['Importe'].idxmax()</code>":"Devuelve sólo la <b>etiqueta</b> de esa fila (un número), no los datos de la venta.",
  "<code>df.loc[df['Importe'].max()]</code>":"Usa el <b>valor</b> del importe como si fuera una etiqueta de fila: tira <code>KeyError</code>.",
  "<code>df.loc[df['Importe'].idxmin()]</code>":"<code>idxmin</code> apunta a la venta de <b>menor</b> importe, no a la mayor."
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
  "<code>enero = pd.read_csv('ventas_enero.csv'); enero['mes'] = ['Enero']</code> (ídem febrero)",
  "<code>enero = pd.read_csv('ventas_enero.csv'); enero.mes = 'Enero'</code> (ídem febrero)",
  "<code>enero = pd.read_csv('ventas_enero.csv'); enero['mes'] == 'Enero'</code> (ídem febrero)"
 ],
 aprendido:"Asignar un <b>valor escalar</b> a una columna nueva lo replica en todas las filas: <code>df['mes'] = 'Enero'</code>. Es exactamente el mismo paso que en los prácticos de la cursada aparece como <code>ventas_centro['sede'] = 'Centro'</code>. Sirve para no perder el origen cuando después se concatenan las tablas.",
 porque:{
  "<code>enero = pd.read_csv('ventas_enero.csv'); enero['mes'] = ['Enero']</code> (ídem febrero)":"Una lista de un solo elemento no coincide con la cantidad de filas: tira <code>ValueError</code>. Para repetir un valor se asigna el texto solo.",
  "<code>enero = pd.read_csv('ventas_enero.csv'); enero.mes = 'Enero'</code> (ídem febrero)":"La asignación por atributo <b>no crea una columna nueva</b>: sólo agrega un atributo al objeto (Pandas avisa con una advertencia).",
  "<code>enero = pd.read_csv('ventas_enero.csv'); enero['mes'] == 'Enero'</code> (ídem febrero)":"El doble <code>==</code> <b>compara</b>, no asigna, y como la columna no existe tira <code>KeyError</code>."
 }
},
{
 id:"pC-07", clase:4, ej:"C · Ej 10", tema:"Integración", nivel:"media",
 caso:"<b>Ejercicio 10.</b> Tarea 7: concatenar verticalmente ambos DataFrames en uno solo, con un índice continuo.",
 pide:"¿<code>concat</code> o <code>merge</code>?",
 ops:[
  "<code>ventas = pd.concat([enero, febrero], ignore_index=True)</code>",
  "<code>ventas = pd.concat([enero, febrero], ignore_index=False)</code>",
  "<code>ventas = pd.concat([enero, febrero], axis=1, ignore_index=True)</code>",
  "<code>ventas = pd.merge(enero, febrero, ignore_index=True)</code>"
 ],
 aprendido:"Regla de la clase: <b>misma estructura → <code>concat</code>; entidades relacionadas → <code>merge</code></b>. Enero y febrero tienen exactamente las mismas columnas, así que se apilan. <code>axis=0</code> (el valor por defecto) agrega filas, e <b><code>ignore_index=True</code></b> reconstruye el índice 0,1,2… en lugar de repetir 0,1,2 / 0,1,2.",
 porque:{
  "<code>ventas = pd.concat([enero, febrero], ignore_index=False)</code>":"Es el valor por defecto: conserva los índices originales y quedan repetidos (0, 1, 2… dos veces) en lugar de un índice continuo.",
  "<code>ventas = pd.concat([enero, febrero], axis=1, ignore_index=True)</code>":"<code>axis=1</code> pega las tablas al costado y duplica las columnas; además renumera las <b>columnas</b>, no las filas.",
  "<code>ventas = pd.merge(enero, febrero, ignore_index=True)</code>":"<code>merge</code> no tiene <code>ignore_index</code> (tira <code>TypeError</code>) y además cruzaría por columnas en común en vez de apilar filas."
 }
},
{
 id:"pC-08", clase:4, ej:"C · Ej 10", tema:"Pandas", nivel:"media",
 caso:"<b>Ejercicio 10.</b> Tarea 9: calcular las unidades por <b>sucursal y producto</b> mediante groupby.",
 pide:"¿Cómo agrupás por dos columnas?",
 ops:[
  "<code>ventas.groupby(['sucursal', 'producto'], as_index=False)['unidades'].sum()</code>",
  "<code>ventas.groupby('sucursal', 'producto', as_index=False)['unidades'].sum()</code>",
  "<code>ventas.groupby(['sucursal', 'producto'], as_index=False)['unidades'].count()</code>",
  "<code>ventas.groupby('sucursal', as_index=False)['unidades'].sum()</code>"
 ],
 aprendido:"Para agrupar por más de una columna se pasa una <b>lista</b>: <code>groupby(['sucursal','producto'])</code>. El resultado tiene una fila por combinación existente. Si además quisieras la grilla sucursales × productos para comparar de un vistazo, ahí va <code>pd.pivot_table(ventas, values='unidades', index='sucursal', columns='producto', aggfunc='sum')</code>.",
 porque:{
  "<code>ventas.groupby('sucursal', 'producto', as_index=False)['unidades'].sum()</code>":"El segundo argumento posicional de <code>groupby</code> es <code>axis</code>, no otra clave: hay que pasar una <b>lista</b> de columnas.",
  "<code>ventas.groupby(['sucursal', 'producto'], as_index=False)['unidades'].count()</code>":"<code>count()</code> cuenta cuántos registros hay por combinación; no suma las unidades.",
  "<code>ventas.groupby('sucursal', as_index=False)['unidades'].sum()</code>":"Agrupa sólo por sucursal: se pierde el detalle por producto que pide la consigna."
 }
},
{
 id:"pC-09", clase:4, ej:"C · Ej 10", tema:"Pandas · E/S", nivel:"media",
 caso:"<b>Ejercicio 10.</b> Tarea 10: exportar el consolidado a <code>consolidado_ventas.csv</code> y también a <code>ventas.json</code>.",
 pide:"¿Qué dos llamadas usás?",
 ops:[
  "<code>ventas.to_csv('consolidado_ventas.csv', index=False)</code> y <code>ventas.to_json('ventas.json', orient='records', indent=2)</code>",
  "<code>ventas.to_csv('consolidado_ventas.csv')</code> y <code>ventas.to_json('ventas.json', orient='records', indent=2)</code>",
  "<code>ventas.to_csv('consolidado_ventas.json', index=False)</code> y <code>ventas.to_json('ventas.csv', orient='records', indent=2)</code>",
  "<code>ventas.to_csv('consolidado_ventas.csv', index=False)</code> y <code>ventas.to_json('ventas.json', index=False, indent=2)</code>"
 ],
 aprendido:"El mismo DataFrame se publica a varios destinos: <code>to_csv</code>, <code>to_excel</code>, <code>to_sql</code> y <code>to_json</code>, siempre con parámetros explícitos. En JSON, <b><code>orient='records'</code></b> genera un objeto por fila (el formato que espera cualquier API) e <code>indent=2</code> lo deja legible.",
 porque:{
  "<code>ventas.to_csv('consolidado_ventas.csv')</code> y <code>ventas.to_json('ventas.json', orient='records', indent=2)</code>":"El CSV se escribe <b>con la columna de índice</b> (0, 1, 2…): falta <code>index=False</code>.",
  "<code>ventas.to_csv('consolidado_ventas.json', index=False)</code> y <code>ventas.to_json('ventas.csv', orient='records', indent=2)</code>":"Los nombres de archivo están cruzados: quedaría un CSV llamado <code>.json</code> y un JSON llamado <code>.csv</code>.",
  "<code>ventas.to_csv('consolidado_ventas.csv', index=False)</code> y <code>ventas.to_json('ventas.json', index=False, indent=2)</code>":"<code>index=False</code> en <code>to_json</code> sólo se permite con ciertas orientaciones (<code>'split'</code>, <code>'table'</code>): con la de por defecto tira <code>ValueError</code>."
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
  "<code>plt.plot(meses, ventas, marker='o', color='blue')</code> + <code>plt.title/xlabel/ylabel</code> + <code>plt.grid(True, alpha=.3)</code> + <code>plt.show()</code> + <code>plt.tight_layout()</code>",
  "<code>plt.plot(meses, ventas, marker='o', color='blue')</code> + <code>plt.title/xlabel/ylabel</code> + <code>plt.legend()</code> + <code>plt.tight_layout()</code> + <code>plt.show()</code>",
  "<code>plt.plot(meses, ventas, marker='o')</code> + <code>plt.title/xlabel/ylabel</code> + <code>plt.grid(True, alpha=.3)</code> + <code>plt.tight_layout()</code> + <code>plt.show()</code>"
 ],
 aprendido:"Las cuatro tareas se resuelven en un bloque: <code>plot</code> con <code>marker</code> y <code>color</code>, los tres rótulos, la cuadrícula y el <code>show()</code> al final. Es exactamente el mismo ejercicio que el modelo A pero con datos mensuales: si lo tenés automatizado, ganás tiempo para los otros dos.",
 porque:{
  "<code>plt.plot(meses, ventas, marker='o', color='blue')</code> + <code>plt.title/xlabel/ylabel</code> + <code>plt.grid(True, alpha=.3)</code> + <code>plt.show()</code> + <code>plt.tight_layout()</code>":"El <code>tight_layout()</code> llega <b>después</b> de mostrar la figura: el ajuste ya no se ve reflejado.",
  "<code>plt.plot(meses, ventas, marker='o', color='blue')</code> + <code>plt.title/xlabel/ylabel</code> + <code>plt.legend()</code> + <code>plt.tight_layout()</code> + <code>plt.show()</code>":"Falta la <b>cuadrícula</b>: la leyenda no la reemplaza (además, con una sola serie sin <code>label</code> no muestra nada).",
  "<code>plt.plot(meses, ventas, marker='o')</code> + <code>plt.title/xlabel/ylabel</code> + <code>plt.grid(True, alpha=.3)</code> + <code>plt.tight_layout()</code> + <code>plt.show()</code>":"Falta el <code>color='blue'</code>: una de las cuatro tareas queda sin hacer."
 }
},
{
 id:"pC-11", clase:5, ej:"C · Ej 13", tema:"Interpretación", nivel:"media",
 caso:"<b>Ejercicio 13.</b> Ya graficaste las ventas de enero a junio: 130, 142, 148, 165, 185 y 205. Te piden interpretar el resultado.",
 pide:"¿Cuál es la lectura correcta del gráfico?",
 ops:[
  "Crecimiento sostenido de 130 a 205, con la aceleración más marcada a partir de abril",
  "Crecimiento sostenido de 130 a 205, con la aceleración más marcada entre enero y marzo",
  "Crecimiento sostenido de 130 a 205, lo que confirma que las ventas seguirán subiendo en julio",
  "Crecimiento sostenido de 130 a 205, explicado por la mejora de la campaña de marketing"
 ],
 aprendido:"Interpretar es describir <b>lo que el gráfico muestra</b>: patrón general, anomalías puntuales y la siguiente pregunta que abre. Dos límites que la cursada repite: no extrapolar más allá de los datos, y no confundir correlación con causalidad. Un gráfico de línea muestra tendencia, no causa ni distribución.",
 porque:{
  "Crecimiento sostenido de 130 a 205, con la aceleración más marcada entre enero y marzo":"Los aumentos de enero a marzo son de apenas +12 y +6; la aceleración recién se ve desde abril (+17, +20, +20).",
  "Crecimiento sostenido de 130 a 205, lo que confirma que las ventas seguirán subiendo en julio":"Es una <b>predicción</b>: con seis meses de datos no se puede extrapolar más allá de lo observado.",
  "Crecimiento sostenido de 130 a 205, explicado por la mejora de la campaña de marketing":"Atribuye una <b>causa</b> que el gráfico no muestra: correlación en el tiempo no es causalidad."
 }
},
{
 id:"pC-12", clase:4, ej:"C · Ej 10", tema:"Limpieza", nivel:"media",
 caso:"<b>Ejercicio 10.</b> Tarea 8: después de concatenar enero y febrero, convertir <code>fecha</code> a <code>datetime</code>. ¿Por qué conviene hacerlo <b>después</b> del <code>concat</code> y no antes?",
 pide:"¿Cuál es el motivo?",
 ops:[
  "Porque así se convierte una sola vez sobre la tabla completa y se garantiza que las dos fuentes queden con el mismo tipo",
  "Porque <code>pd.concat</code> no acepta columnas de tipo fecha, así que hay que convertir después de unir las tablas",
  "Porque <code>to_datetime</code> sólo funciona sobre columnas de más de cinco filas, y cada archivo tiene menos",
  "Porque si se convierte antes, <code>concat</code> ya no puede reiniciar el índice con <code>ignore_index=True</code>"
 ],
 aprendido:"El orden del pipeline importa: <b>cargar → concatenar → convertir tipos → agrupar → exportar</b>. Convertir después del <code>concat</code> evita duplicar código y, sobre todo, evita que una fuente quede como <code>datetime</code> y la otra como texto, lo que rompería el ordenamiento y cualquier <code>.dt</code> posterior.",
 porque:{
  "Porque <code>pd.concat</code> no acepta columnas de tipo fecha, así que hay que convertir después de unir las tablas":"<code>concat</code> funciona perfectamente con columnas de fecha: no hay ninguna restricción de ese tipo.",
  "Porque <code>to_datetime</code> sólo funciona sobre columnas de más de cinco filas, y cada archivo tiene menos":"No existe tal restricción: <code>to_datetime</code> convierte una columna de cualquier tamaño.",
  "Porque si se convierte antes, <code>concat</code> ya no puede reiniciar el índice con <code>ignore_index=True</code>":"<code>ignore_index</code> reinicia el índice sin importar los tipos de las columnas: no tiene relación con las fechas."
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

/* ==============================================================
   LABORATORIO · métodos que se usan en cada ejercicio
   --------------------------------------------------------------
   n:  nombre del método (igual en todos los ejercicios donde aparece,
       así el laboratorio avisa en qué otros ejercicios se repite)
   q:  qué hace, en criollo
   ej: la línea tal cual va en el código
   ojo: el error típico (opcional)
   ============================================================== */
const METODOS = {

"lab-a1":[
 {n:"np.array()", q:"Convierte una lista de Python en un arreglo de NumPy. La diferencia importante: el arreglo permite operar todos los elementos juntos, sin bucle.",
  ej:"unidades = np.array([12, 15, 11])", ojo:"Una lista común no se puede multiplicar elemento a elemento: <code>[1,2] * [3,4]</code> da error."},
 {n:"Operaciones vectorizadas", q:"Con dos arreglos del mismo largo, <code>*</code>, <code>+</code>, <code>-</code> y <code>/</code> operan posición por posición. Con un número suelto, lo aplica a todos.",
  ej:"ingresos = unidades * precios", ojo:"Un aumento del 8 % es multiplicar por <code>1.08</code>, no por <code>0.08</code>."},
 {n:".sum()", q:"Suma todos los elementos del arreglo o de la columna.", ej:"ingreso_total = ingresos.sum()"},
 {n:".mean()", q:"Promedio: la suma dividida por la cantidad de elementos.", ej:"promedio_diario = ingresos.mean()"},
 {n:".argmax()", q:"Devuelve la <b>posición</b> (el índice) del valor más grande, no el valor.", ej:"dia_mayor = ingresos.argmax()",
  ojo:"<code>max()</code> te da el valor; <code>argmax()</code> te da dónde está. El enunciado pide el día, o sea la posición."}
],

"lab-a2":[
 {n:"pd.read_csv()", q:"Lee un archivo CSV y lo devuelve como DataFrame (una tabla con filas y columnas con nombre).",
  ej:'df = pd.read_csv("productos.csv")', ojo:"El nombre del archivo va entre comillas y tiene que coincidir exacto, con la extensión."},
 {n:"df[[…]] (varias columnas)", q:"Con <b>doble corchete</b> y una lista de nombres te quedás solo con esas columnas y obtenés otro DataFrame.",
  ej:'seleccion = df[["producto", "precio", "stock"]]', ojo:"Con un solo corchete, <code>df[\"precio\"]</code>, sale una Series (una columna suelta), no un DataFrame."},
 {n:"Filtro booleano", q:"Una condición sobre una columna da verdadero/falso por fila; pasada entre corchetes, deja solo las filas verdaderas. Para combinar condiciones se usa <code>&amp;</code> (y) y <code>|</code> (o).",
  ej:'seleccion[(seleccion["precio"] > 40000) & (seleccion["stock"] > 0)]', ojo:"Cada condición va entre <b>paréntesis</b>, y se usa <code>&amp;</code>, no <code>and</code>."},
 {n:".to_csv(index=False)", q:"Guarda el DataFrame en un archivo CSV. Con <code>index=False</code> no escribe la columna del índice (0, 1, 2…).",
  ej:'disponibles.to_csv("productos_disponibles.csv", index=False)', ojo:"Si te olvidás de <code>index=False</code>, el archivo sale con una columna extra sin nombre."}
],

"lab-a3":[
 {n:"plt.figure(figsize=…)", q:"Crea la figura y fija su tamaño (ancho, alto) en pulgadas. Va antes de dibujar.", ej:"plt.figure(figsize=(8, 4))"},
 {n:"plt.plot()", q:"Dibuja un gráfico de líneas: primero los valores del eje X y después los del eje Y. <code>marker</code> pone un punto en cada dato y <code>color</code> pinta la línea.",
  ej:'plt.plot(dias, visitas, marker="o", color="blue")', ojo:"El orden es <code>plot(x, y)</code>; si los invertís, el gráfico sale al revés."},
 {n:"plt.title / xlabel / ylabel", q:"Ponen el título del gráfico y el nombre de cada eje. Un gráfico sin ejes rotulados no se entiende.",
  ej:'plt.title("Visitas por día"); plt.xlabel("Día"); plt.ylabel("Visitas")'},
 {n:"plt.grid()", q:"Dibuja la cuadrícula de fondo para leer mejor los valores. <code>alpha</code> la hace más tenue.", ej:"plt.grid(True, alpha=0.3)"},
 {n:"plt.tight_layout() y plt.show()", q:"<code>tight_layout()</code> acomoda los márgenes para que no se corten los rótulos, y <code>show()</code> muestra el gráfico. Van al final.",
  ej:"plt.tight_layout()\nplt.show()", ojo:"Acá <code>show()</code> no abre ventana: el gráfico aparece debajo del editor."}
],

"lab-b1":[
 {n:"pd.DataFrame({…})", q:"Arma una tabla a mano a partir de un diccionario: cada clave es el nombre de una columna y cada valor es la lista de sus datos.",
  ej:'df = pd.DataFrame({"Nombre": ["Ana", "Bruno"], "Parcial1": [8, 6]})', ojo:"Todas las listas tienen que tener el mismo largo."},
 {n:"Columna nueva", q:"Asignar a un nombre de columna que no existe la crea. Con operaciones entre columnas se calcula fila por fila.",
  ej:'df["Promedio"] = (df["Parcial1"] + df["Parcial2"]) / 2', ojo:"La suma va entre paréntesis antes de dividir: sin ellos solo se divide el segundo parcial."},
 {n:"np.where()", q:"Es un «si … entonces … si no» para toda una columna: <code>np.where(condición, valor_si_cumple, valor_si_no)</code>.",
  ej:'np.where((df["Promedio"] >= 6) & (df["Asistencia"] >= 75), "Aprueba", "Revisa")', ojo:"Para combinar condiciones, <code>&amp;</code> con cada una entre paréntesis (igual que en un filtro)."},
 {n:"df[[…]] (varias columnas)", q:"Doble corchete con una lista de nombres: muestra solo esas columnas.", ej:'print(df[["Nombre", "Promedio", "Estado"]])'}
],

"lab-b2":[
 {n:"pd.read_json()", q:"Lee un archivo JSON (lista de objetos) y lo convierte en un DataFrame: cada objeto es una fila.", ej:'df = pd.read_json("pedidos.json")'},
 {n:"pd.to_numeric()", q:"Convierte una columna de texto a número. Con <code>errors=\"coerce\"</code>, lo que no se puede convertir queda como <code>NaN</code> en vez de cortar el programa.",
  ej:'df["importe"] = pd.to_numeric(df["importe"], errors="coerce")', ojo:"Hay que reasignar el resultado a la columna; sola no la modifica."},
 {n:"Filtro booleano", q:"Comparar una columna con un valor (<code>==</code>) da verdadero/falso por fila; entre corchetes deja las filas verdaderas.",
  ej:'entregados = df[df["estado"] == "entregado"]', ojo:"Comparar es <code>==</code> (dos signos); <code>=</code> asigna."},
 {n:".sum()", q:"Suma los valores de la columna (ignora los NaN).", ej:'total = entregados["importe"].sum()'},
 {n:".to_csv(index=False)", q:"Guarda el DataFrame como CSV; sin <code>index=False</code> agrega una columna con el índice.",
  ej:'entregados.to_csv("entregados.csv", index=False)', ojo:"Si el enunciado dice «Excel» pero el archivo termina en <code>.csv</code>, el método es <code>to_csv</code>."}
],

"lab-b3":[
 {n:"plt.bar()", q:"Gráfico de barras verticales: categorías en X, valores en Y. Devuelve las barras, que se pueden guardar para rotularlas después. <code>color</code> acepta una lista, una por barra.",
  ej:"barras = plt.bar(categorias, ventas, color=colores)", ojo:"Para barras horizontales sería <code>plt.barh</code>."},
 {n:"Lista de colores con comprensión", q:"Una lista armada con un <code>for</code> en una línea, que elige un color por barra según una condición.",
  ej:'colores = ["crimson" if v == max(ventas) else "steelblue" for v in ventas]', ojo:"Tiene que haber un color por cada barra: mismo largo que <code>ventas</code>."},
 {n:"plt.bar_label()", q:"Escribe el valor encima de cada barra. Recibe las barras que devolvió <code>plt.bar</code>.", ej:"plt.bar_label(barras, padding=3)"},
 {n:"plt.title / xlabel / ylabel", q:"Ponen el título del gráfico y el nombre de cada eje.", ej:'plt.title("Ventas por categoría")'},
 {n:"plt.tight_layout() y plt.show()", q:"Acomodan los márgenes y muestran el gráfico. Van al final.", ej:"plt.tight_layout()\nplt.show()"}
],

"lab-c1":[
 {n:"pd.DataFrame({…})", q:"Arma una tabla a partir de un diccionario: clave = nombre de columna, valor = lista de datos.", ej:'df = pd.DataFrame({"Vendedor": ["Lucía", "Mateo"], "Unidades": [3, 5]})', ojo:"Todas las listas tienen el mismo largo."},
 {n:"pd.to_datetime()", q:"Convierte una columna de texto con fechas al tipo fecha, para poder ordenar y calcular con ellas.", ej:'df["Fecha"] = pd.to_datetime(df["Fecha"])'},
 {n:"Columna nueva", q:"Asignar a una columna que no existe la crea; con operaciones entre columnas calcula fila por fila.", ej:'df["Importe"] = df["Unidades"] * df["Precio"]'},
 {n:".groupby()", q:"Agrupa las filas por los valores de una columna y después resumís cada grupo (<code>.sum()</code>, <code>.mean()</code>, <code>.count()</code>). Pensalo como «por cada vendedor, sumá…».",
  ej:'df.groupby("Vendedor", as_index=False)["Importe"].sum()', ojo:"Con <code>as_index=False</code> el resultado es un DataFrame; sin eso, una Series con el vendedor como índice."},
 {n:".sort_values()", q:"Ordena por valor. Por defecto es de menor a mayor; para al revés, <code>ascending=False</code>.",
  ej:'df.groupby("Producto")["Unidades"].sum().sort_values(ascending=False)', ojo:"«De mayor a menor» es <code>ascending=False</code>."},
 {n:".idxmax() y .loc", q:"<code>idxmax()</code> da la etiqueta de fila del valor máximo y <code>.loc[…]</code> trae esa fila completa. Juntos dan «la fila de la venta más grande».",
  ej:'venta_mayor = df.loc[df["Importe"].idxmax()]', ojo:"<code>max()</code> solo te da el número, no la venta entera."}
],

"lab-c10":[
 {n:"pd.read_csv()", q:"Lee un archivo CSV y lo devuelve como DataFrame.", ej:'enero = pd.read_csv("ventas_enero.csv")'},
 {n:"Columna nueva", q:"Asignar un valor fijo a una columna nueva lo repite en todas las filas: sirve para marcar de qué archivo viene cada dato.", ej:'enero["mes"] = "Enero"'},
 {n:"pd.concat()", q:"Apila varios DataFrame uno debajo del otro en uno solo. Con <code>ignore_index=True</code> vuelve a numerar las filas de 0 en adelante.",
  ej:"ventas = pd.concat([enero, febrero], ignore_index=True)", ojo:"Sin <code>ignore_index=True</code> el índice queda repetido (0,1,2,0,1,2)."},
 {n:"pd.to_datetime()", q:"Convierte la columna de texto con fechas al tipo fecha.", ej:'ventas["fecha"] = pd.to_datetime(ventas["fecha"])'},
 {n:".groupby()", q:"Agrupa por una o varias columnas (en una lista) y resume cada grupo.", ej:'ventas.groupby(["sucursal", "producto"], as_index=False)["unidades"].sum()'},
 {n:".to_csv(index=False)", q:"Guarda el DataFrame como CSV sin la columna del índice.", ej:'ventas.to_csv("consolidado_ventas.csv", index=False)'},
 {n:".to_json()", q:"Guarda el DataFrame como JSON. Con <code>orient=\"records\"</code> sale una lista de objetos, uno por fila; <code>indent</code> lo deja legible.",
  ej:'ventas.to_json("ventas.json", orient="records", indent=2)', ojo:"Sin <code>orient=\"records\"</code> el formato sale como columnas anidadas, raro de leer."}
],

"lab-c13":[
 {n:"plt.figure(figsize=…)", q:"Crea la figura y fija su tamaño (ancho, alto). Va antes de dibujar.", ej:"plt.figure(figsize=(8, 4))"},
 {n:"plt.plot()", q:"Gráfico de líneas: X primero, Y después. <code>marker</code> marca cada dato y <code>color</code> pinta la línea.", ej:'plt.plot(meses, ventas, marker="o", color="blue")'},
 {n:"plt.title / xlabel / ylabel", q:"Ponen el título del gráfico y el nombre de cada eje.", ej:'plt.title("Ventas 2026"); plt.xlabel("Mes"); plt.ylabel("Ventas")'},
 {n:"plt.grid()", q:"Dibuja la cuadrícula de fondo para leer mejor los valores.", ej:"plt.grid(True, alpha=0.3)"},
 {n:"plt.tight_layout() y plt.show()", q:"Acomodan los márgenes y muestran el gráfico. Van al final.", ej:"plt.tight_layout()\nplt.show()"}
]

};
