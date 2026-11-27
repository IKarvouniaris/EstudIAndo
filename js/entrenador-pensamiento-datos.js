/* Laboratorio de Pensamiento Computacional (final).
   Ejercicios de código que corren en el navegador (Pyodide) y se corrigen con verificaciones.
   Fuente: la «Guía Express» del final (reglas de oro, estructuras, búsqueda, ordenamiento, trampas, menú).

   Formato de cada ejercicio:
     id, grupo, ej, titulo, enunciado, datos (ejemplos), tareas[], variables[[nombre, qué se evalúa]],
     nota (opcional), regla (true = además se controla que no uses lo prohibido), prohibido (extras para
     el control de «reglas de oro»), entradas (lo que «tipea» el usuario si el programa usa input()),
     inicial, tests[{nombre, codigo}], solucion.
   En los tests están disponibles las funciones/variables del código del alumno, _fuente, _salida y los
   ayudantes _casos(f, [(args, esperado), ...]), _ordena(f, desc) y _igual(a, b).
   Se prueban con tools/verificar_pensamiento.py: la solución pasa todo y el código inicial falla. */

var GRUPOS = [
  { id:"basicos",  nombre:"Operadores y bucles", desc:"Tipos, operadores, condicionales, range, while y diccionarios." },
  { id:"vectores", nombre:"Vectores (listas)",   desc:"Recorrer con índices: sumas, máximos, conteos y listas nuevas, sin las funciones prohibidas." },
  { id:"matrices", nombre:"Matrices",            desc:"Listas de listas: doble for, filas, columnas, diagonal, traspuesta y pisos." },
  { id:"busqueda", nombre:"Búsqueda",            desc:"Secuencial y binaria, sin in ni .index()." },
  { id:"orden",    nombre:"Ordenamiento",        desc:"Burbuja, inserción y selección escritos a mano." },
  { id:"errores",  nombre:"Encontrá el error",   desc:"Código con una trampa típica del examen: detectala y corregila." },
  { id:"programa", nombre:"Programa completo",   desc:"Menú con bandera, funciones con y sin retorno y entry point." }
];

var EJERCICIOS = [

/* =============================== OPERADORES Y BUCLES =============================== */
{
 id:"pc-b1", grupo:"basicos", ej:"B1", titulo:"Condicionales: la nota en palabras",
 enunciado:"Escribí <code>clasificar_nota(nota)</code>: devuelve <code>\"Sobresaliente\"</code> si la nota es 9 o más, <code>\"Aprobado\"</code> si es 7 o más (y menos de 9) y <code>\"Desaprobado\"</code> en el resto de los casos.",
 datos:`clasificar_nota(10)  -> "Sobresaliente"
clasificar_nota(7)   -> "Aprobado"
clasificar_nota(3.5) -> "Desaprobado"`,
 tareas:["Usar <code>if</code> / <code>elif</code> / <code>else</code> (sin repetir condiciones de más).","Devolver el texto con <code>return</code>, no imprimirlo."],
 variables:[["clasificar_nota(nota)","función con retorno: respeta los bordes 9 y 7"]],
 nota:"El orden importa: se evalúa de arriba hacia abajo y el primer <code>if</code> verdadero gana. Preguntá primero por el caso más exigente.",
 inicial:`def clasificar_nota(nota):
    # completá con if / elif / else
    pass
`,
 tests:[
  {nombre:"los tres rangos", codigo:`_casos(clasificar_nota, [((10,), "Sobresaliente"), ((9,), "Sobresaliente"), ((8,), "Aprobado"), ((7,), "Aprobado"), ((6.9,), "Desaprobado"), ((0,), "Desaprobado")])`},
  {nombre:"devuelve (no imprime)", codigo:`assert clasificar_nota(9) is not None, "la función no devuelve nada: usá return"`}
 ],
 solucion:`def clasificar_nota(nota):
    if nota >= 9:
        return "Sobresaliente"
    elif nota >= 7:
        return "Aprobado"
    else:
        return "Desaprobado"
`
},
{
 id:"pc-b2", grupo:"basicos", ej:"B2", titulo:"Operadores: /, //, % y while",
 enunciado:"Tres funciones chicas para practicar los operadores. <code>es_par(n)</code> devuelve <code>True</code>/<code>False</code>. <code>cociente_y_resto(a, b)</code> devuelve una <b>tupla</b> <code>(cociente entero, resto)</code>. <code>cantidad_digitos(n)</code> cuenta los dígitos de un entero positivo <b>con un while</b>, dividiendo por 10 (no uses <code>len(str(n))</code>).",
 datos:`es_par(7)              -> False
cociente_y_resto(10, 3) -> (3, 1)
cantidad_digitos(4087)  -> 4`,
 tareas:["<code>es_par</code> con <code>% 2 == 0</code>.","<code>cociente_y_resto</code> con <code>//</code> y <code>%</code>, devolviendo la tupla.","<code>cantidad_digitos</code>: while que haga <code>n = n // 10</code> y cuente cuántas veces."],
 variables:[["es_par(n)","True si n es par"],["cociente_y_resto(a, b)","tupla (a // b, a % b)"],["cantidad_digitos(n)","la cantidad de dígitos, con while y sin str()"]],
 nota:"Si en el while te olvidás de actualizar <code>n</code>, el bucle no termina nunca: el laboratorio corta el programa y te avisa.",
 prohibido:["str"],
 regla:true,
 inicial:`def es_par(n):
    pass


def cociente_y_resto(a, b):
    pass


def cantidad_digitos(n):
    # while: mientras queden dígitos, dividí por 10 y contá
    pass
`,
 tests:[
  {nombre:"es_par", codigo:`_casos(es_par, [((4,), True), ((7,), False), ((0,), True), ((-3,), False)])`},
  {nombre:"cociente_y_resto devuelve una tupla", codigo:`r = cociente_y_resto(10, 3)
assert isinstance(r, tuple), "tenés que devolver una tupla (cociente, resto)"
_casos(cociente_y_resto, [((10, 3), (3, 1)), ((20, 5), (4, 0)), ((7, 10), (0, 7))])`},
  {nombre:"cantidad_digitos", codigo:`_casos(cantidad_digitos, [((4087,), 4), ((5,), 1), ((100,), 3), ((99999,), 5)])`}
 ],
 solucion:`def es_par(n):
    return n % 2 == 0


def cociente_y_resto(a, b):
    return (a // b, a % b)


def cantidad_digitos(n):
    cuenta = 0
    while n > 0:
        n = n // 10
        cuenta += 1
    return cuenta
`
},
{
 id:"pc-b3", grupo:"basicos", ej:"B3", titulo:"range: extremos y paso",
 enunciado:"Dos funciones que devuelven listas armadas con <code>range</code>. <code>cuenta_regresiva(n)</code> devuelve <code>[n, n-1, …, 1]</code>. <code>multiplos(n, tope)</code> devuelve los múltiplos de <code>n</code> desde <code>n</code> hasta <code>tope</code> <b>inclusive</b>.",
 datos:`cuenta_regresiva(4) -> [4, 3, 2, 1]
multiplos(3, 10)    -> [3, 6, 9]
multiplos(5, 25)    -> [5, 10, 15, 20, 25]`,
 tareas:["Usá <code>range(inicio, fin, paso)</code>: el <code>fin</code> <b>no</b> se incluye.","Armá la lista con <code>append</code> dentro de un <code>for</code>."],
 variables:[["cuenta_regresiva(n)","lista descendente hasta 1"],["multiplos(n, tope)","múltiplos de n, el tope incluido si lo es"]],
 nota:"<code>range(5)</code> da 0..4, <code>range(2, 6)</code> da 2..5. Para llegar hasta <code>tope</code> inclusive hay que pedir <code>tope + 1</code>.",
 inicial:`def cuenta_regresiva(n):
    resultado = []
    # for con range hacia atrás (paso negativo)
    return resultado


def multiplos(n, tope):
    resultado = []
    # for con range(n, tope + 1, n)
    return resultado
`,
 tests:[
  {nombre:"cuenta_regresiva", codigo:`_casos(cuenta_regresiva, [((4,), [4, 3, 2, 1]), ((1,), [1]), ((0,), [])])`},
  {nombre:"multiplos (con el tope incluido)", codigo:`_casos(multiplos, [((3, 10), [3, 6, 9]), ((5, 25), [5, 10, 15, 20, 25]), ((4, 3), [])])`}
 ],
 solucion:`def cuenta_regresiva(n):
    resultado = []
    for i in range(n, 0, -1):
        resultado.append(i)
    return resultado


def multiplos(n, tope):
    resultado = []
    for i in range(n, tope + 1, n):
        resultado.append(i)
    return resultado
`
},
{
 id:"pc-b4", grupo:"basicos", ej:"B4", titulo:"Diccionario: promedio por alumno",
 enunciado:"<code>promedios(alumnos)</code> recibe un diccionario <code>{nombre: [notas]}</code> y devuelve otro diccionario <code>{nombre: promedio}</code>. Si un alumno no tiene notas, su promedio es <code>0</code>.",
 datos:`promedios({"Ana": [8, 10], "Luis": [4, 6, 5], "Eva": []})
-> {"Ana": 9.0, "Luis": 5.0, "Eva": 0}`,
 tareas:["Recorré el diccionario con <code>for nombre in alumnos:</code> (este <code>in</code> del <code>for</code> es válido: lo prohibido es el operador <code>in</code> dentro de una condición).","Sumá las notas con un <code>for</code> con índice y dividí por <code>len</code>.","Asigná con <code>resultado[nombre] = valor</code>."],
 variables:[["promedios(alumnos)","diccionario nombre -> promedio (0 si no hay notas)"]],
 regla:true, prohibido:["sum"],
 inicial:`def promedios(alumnos):
    resultado = {}
    # recorré cada alumno, sumá sus notas con índices y calculá el promedio
    return resultado
`,
 tests:[
  {nombre:"promedios correctos", codigo:`_casos(promedios, [(({"Ana": [8, 10], "Luis": [4, 6, 5], "Eva": []},), {"Ana": 9.0, "Luis": 5.0, "Eva": 0}), (({},), {}), (({"Zoe": [7]},), {"Zoe": 7})])`}
 ],
 solucion:`def promedios(alumnos):
    resultado = {}
    for nombre in alumnos:
        notas = alumnos[nombre]
        suma = 0
        for i in range(len(notas)):
            suma += notas[i]
        if len(notas) > 0:
            resultado[nombre] = suma / len(notas)
        else:
            resultado[nombre] = 0
    return resultado
`
},
{
 id:"pc-b5", grupo:"basicos", ej:"B5", titulo:"Diccionario: contar frecuencias",
 enunciado:"<code>frecuencias(lista)</code> devuelve un diccionario que dice cuántas veces aparece cada valor. Como <b>no se puede usar <code>in</code></b> para preguntar si la clave ya existe, usá <code>.get(clave, 0)</code>.",
 datos:`frecuencias([3, 1, 3, 2, 1, 3]) -> {3: 3, 1: 2, 2: 1}
frecuencias([])                  -> {}`,
 tareas:["Recorrer la lista con índices.","Sumar 1 a <code>cuentas.get(valor, 0)</code> y guardarlo."],
 variables:[["frecuencias(lista)","diccionario valor -> cantidad de apariciones"]],
 nota:"<code>d.get(k, 0)</code> devuelve el valor de <code>k</code> o <code>0</code> si no existe, sin romper y sin usar <code>in</code>.",
 regla:true,
 inicial:`def frecuencias(lista):
    cuentas = {}
    # for con índice; cuentas[valor] = cuentas.get(valor, 0) + 1
    return cuentas
`,
 tests:[
  {nombre:"cuenta las apariciones", codigo:`_casos(frecuencias, [(([3, 1, 3, 2, 1, 3],), {3: 3, 1: 2, 2: 1}), (([],), {}), ((["a", "b", "a"],), {"a": 2, "b": 1})])`}
 ],
 solucion:`def frecuencias(lista):
    cuentas = {}
    for i in range(len(lista)):
        valor = lista[i]
        cuentas[valor] = cuentas.get(valor, 0) + 1
    return cuentas
`
},

/* =============================== VECTORES =============================== */
{
 id:"pc-v1", grupo:"vectores", ej:"V1", titulo:"Suma y promedio de un vector",
 enunciado:"<code>suma_y_promedio(numeros)</code> devuelve una tupla <code>(suma, promedio)</code>. Si la lista está vacía devuelve <code>(0, 0)</code>. Recorré con índices: <b>no se puede usar <code>sum()</code></b>.",
 datos:`suma_y_promedio([4, 8, 6]) -> (18, 6.0)
suma_y_promedio([])        -> (0, 0)`,
 tareas:["Acumulador en 0 antes del <code>for</code>.","<code>for i in range(len(numeros))</code> y <code>suma += numeros[i]</code>.","Cuidado con dividir por cero si la lista está vacía."],
 variables:[["suma_y_promedio(numeros)","tupla (suma, promedio); (0, 0) si no hay elementos"]],
 regla:true, prohibido:["sum"],
 inicial:`def suma_y_promedio(numeros):
    suma = 0
    # recorré con índices
    return (suma, 0)
`,
 tests:[
  {nombre:"suma y promedio", codigo:`_casos(suma_y_promedio, [(([4, 8, 6],), (18, 6.0)), (([10],), (10, 10.0)), (([-2, 2, 5, 7],), (12, 3.0))])`},
  {nombre:"lista vacía sin romper", codigo:`_casos(suma_y_promedio, [(([],), (0, 0))])`}
 ],
 solucion:`def suma_y_promedio(numeros):
    suma = 0
    for i in range(len(numeros)):
        suma += numeros[i]
    if len(numeros) == 0:
        return (0, 0)
    return (suma, suma / len(numeros))
`
},
{
 id:"pc-v2", grupo:"vectores", ej:"V2", titulo:"El mayor y dónde está",
 enunciado:"<code>mayor_y_posicion(numeros)</code> devuelve <code>(mayor, indice)</code> del primer máximo de la lista (la lista no está vacía). <b>No se puede usar <code>max()</code> ni <code>.index()</code></b>.",
 datos:`mayor_y_posicion([3, 9, 2, 9]) -> (9, 1)
mayor_y_posicion([-5, -2, -8]) -> (-2, 1)`,
 tareas:["Arrancá con <code>mayor = numeros[0]</code> y <code>pos = 0</code> (no con 0: ¿qué pasa si todos son negativos?).","Recorré con índices y actualizá los dos cuando aparezca uno <b>estrictamente</b> mayor."],
 variables:[["mayor_y_posicion(numeros)","tupla (valor máximo, índice de su primera aparición)"]],
 regla:true, prohibido:["max","min"],
 inicial:`def mayor_y_posicion(numeros):
    mayor = 0
    pos = 0
    # recorré con índices
    return (mayor, pos)
`,
 tests:[
  {nombre:"con positivos y repetidos", codigo:`_casos(mayor_y_posicion, [(([3, 9, 2, 9],), (9, 1)), (([7],), (7, 0)), (([1, 2, 3, 4],), (4, 3))])`},
  {nombre:"con todos negativos", codigo:`_casos(mayor_y_posicion, [(([-5, -2, -8],), (-2, 1)), (([-1, -1],), (-1, 0))])`}
 ],
 solucion:`def mayor_y_posicion(numeros):
    mayor = numeros[0]
    pos = 0
    for i in range(len(numeros)):
        if numeros[i] > mayor:
            mayor = numeros[i]
            pos = i
    return (mayor, pos)
`
},
{
 id:"pc-v3", grupo:"vectores", ej:"V3", titulo:"Contadores: pares, impares y umbral",
 enunciado:"Dos funciones con contador. <code>contar_pares_impares(numeros)</code> devuelve <code>(pares, impares)</code>. <code>cuantos_mayores(numeros, umbral)</code> devuelve cuántos elementos son estrictamente mayores que el umbral.",
 datos:`contar_pares_impares([1, 2, 3, 4, 6]) -> (3, 2)
cuantos_mayores([5, 1, 8, 8], 5)       -> 2`,
 tareas:["Un contador por cada categoría, inicializado fuera del bucle.","<code>% 2 == 0</code> para los pares."],
 variables:[["contar_pares_impares(numeros)","tupla (pares, impares)"],["cuantos_mayores(numeros, umbral)","cantidad de elementos > umbral"]],
 regla:true,
 inicial:`def contar_pares_impares(numeros):
    pares = 0
    impares = 0
    return (pares, impares)


def cuantos_mayores(numeros, umbral):
    cuenta = 0
    return cuenta
`,
 tests:[
  {nombre:"contar_pares_impares", codigo:`_casos(contar_pares_impares, [(([1, 2, 3, 4, 6],), (3, 2)), (([],), (0, 0)), (([0, -2, -3],), (2, 1))])`},
  {nombre:"cuantos_mayores", codigo:`_casos(cuantos_mayores, [(([5, 1, 8, 8], 5), 2), (([], 3), 0), (([1, 2], 9), 0)])`}
 ],
 solucion:`def contar_pares_impares(numeros):
    pares = 0
    impares = 0
    for i in range(len(numeros)):
        if numeros[i] % 2 == 0:
            pares += 1
        else:
            impares += 1
    return (pares, impares)


def cuantos_mayores(numeros, umbral):
    cuenta = 0
    for i in range(len(numeros)):
        if numeros[i] > umbral:
            cuenta += 1
    return cuenta
`
},
{
 id:"pc-v4", grupo:"vectores", ej:"V4", titulo:"Invertir un vector a mano",
 enunciado:"<code>invertir(lista)</code> devuelve una lista <b>nueva</b> con los mismos elementos en orden inverso, sin modificar la original. <b>Prohibido <code>reverse()</code>, <code>reversed()</code> y <code>[::-1]</code></b>.",
 datos:`invertir([1, 2, 3, 4]) -> [4, 3, 2, 1]`,
 tareas:["Recorré con índices de atrás hacia adelante: <code>range(len(lista) - 1, -1, -1)</code>.","Armá la lista nueva con <code>append</code>."],
 variables:[["invertir(lista)","lista nueva invertida; la original queda igual"]],
 regla:true, prohibido:["reverse","reversed","slice"],
 inicial:`def invertir(lista):
    resultado = []
    return resultado
`,
 tests:[
  {nombre:"invierte", codigo:`_casos(invertir, [(([1, 2, 3, 4],), [4, 3, 2, 1]), (([],), []), (([7],), [7]), ((["a", "b", "c"],), ["c", "b", "a"])])`},
  {nombre:"no toca la lista original", codigo:`orig = [1, 2, 3]
copia = list(orig)
invertir(orig)
assert orig == copia, "modificaste la lista original: " + str(orig) + " (tenía que quedar " + str(copia) + ")"`}
 ],
 solucion:`def invertir(lista):
    resultado = []
    for i in range(len(lista) - 1, -1, -1):
        resultado.append(lista[i])
    return resultado
`
},
{
 id:"pc-v5", grupo:"vectores", ej:"V5", titulo:"Modularizar: sin repetidos",
 enunciado:"Sin <code>in</code> no hay forma directa de preguntar «¿ya está?». Modularizá: escribí <code>esta(lista, valor)</code> que devuelve <code>True</code>/<code>False</code> recorriendo con índices, y usala en <code>sin_repetidos(lista)</code>, que devuelve una lista nueva con cada valor una sola vez, en el orden de la primera aparición.",
 datos:`esta([4, 5, 6], 5)           -> True
sin_repetidos([3, 1, 3, 2, 1]) -> [3, 1, 2]`,
 tareas:["<code>esta</code>: <code>for i in range(len(lista))</code> y <code>return True</code> apenas lo encuentres; <code>False</code> al terminar el for.","<code>sin_repetidos</code> llama a <code>esta(resultado, lista[i])</code> antes de agregar."],
 variables:[["esta(lista, valor)","booleano, sin usar in"],["sin_repetidos(lista)","lista nueva sin duplicados, orden de aparición"]],
 nota:"Se valora modularizar: una función chica que hace una sola cosa y otra que la reutiliza.",
 regla:true,
 inicial:`def esta(lista, valor):
    # recorré con índices
    pass


def sin_repetidos(lista):
    resultado = []
    # agregá lista[i] solo si todavía no está en resultado
    return resultado
`,
 tests:[
  {nombre:"esta", codigo:`_casos(esta, [(([4, 5, 6], 5), True), (([4, 5, 6], 9), False), (([], 1), False)])`},
  {nombre:"sin_repetidos", codigo:`_casos(sin_repetidos, [(([3, 1, 3, 2, 1],), [3, 1, 2]), (([],), []), (([5, 5, 5],), [5]), (([1, 2, 3],), [1, 2, 3])])`}
 ],
 solucion:`def esta(lista, valor):
    for i in range(len(lista)):
        if lista[i] == valor:
            return True
    return False


def sin_repetidos(lista):
    resultado = []
    for i in range(len(lista)):
        if not esta(resultado, lista[i]):
            resultado.append(lista[i])
    return resultado
`
},

/* =============================== MATRICES =============================== */
{
 id:"pc-m1", grupo:"matrices", ej:"M1", titulo:"Crear una matriz con doble for",
 enunciado:"<code>crear_matriz(filas, columnas, valor)</code> devuelve una matriz (lista de listas) de <code>filas × columnas</code> con todas las celdas en <code>valor</code>. Armala con <b>doble for</b> y <code>fila.append(...)</code>.",
 datos:`crear_matriz(2, 3, 0) -> [[0, 0, 0],
                            [0, 0, 0]]`,
 tareas:["Un <code>for</code> por fila: dentro, una lista <code>fila</code> nueva.","Otro <code>for</code> por columna que agregue <code>valor</code> a esa fila.","Agregá la fila a la matriz."],
 variables:[["crear_matriz(filas, columnas, valor)","matriz con filas independientes (cambiar una celda no cambia otras filas)"]],
 nota:"Ojo con <code>[[0] * c] * f</code>: repite la <b>misma</b> fila f veces y al modificar una celda cambian todas. Por eso se crea una fila nueva en cada vuelta.",
 inicial:`def crear_matriz(filas, columnas, valor):
    matriz = []
    return matriz
`,
 tests:[
  {nombre:"tamaño y contenido", codigo:`_casos(crear_matriz, [((2, 3, 0), [[0, 0, 0], [0, 0, 0]]), ((1, 1, 7), [[7]]), ((3, 2, 5), [[5, 5], [5, 5], [5, 5]]), ((0, 4, 1), [])])`},
  {nombre:"filas independientes", codigo:`m = crear_matriz(3, 3, 0)
m[0][0] = 99
assert m[1][0] == 0 and m[2][0] == 0, "al cambiar m[0][0] se modificaron otras filas: son la misma lista repetida"`}
 ],
 solucion:`def crear_matriz(filas, columnas, valor):
    matriz = []
    for i in range(filas):
        fila = []
        for j in range(columnas):
            fila.append(valor)
        matriz.append(fila)
    return matriz
`
},
{
 id:"pc-m2", grupo:"matrices", ej:"M2", titulo:"Suma por fila",
 enunciado:"<code>suma_filas(matriz)</code> devuelve una lista con la suma de cada fila. Tiene que servir para <b>cualquier tamaño</b>, no solo 3×3: usá <code>len(matriz)</code> y <code>len(matriz[i])</code>.",
 datos:`suma_filas([[1, 2, 3],
             [4, 5, 6]]) -> [6, 15]`,
 tareas:["Doble for con <code>range(len(matriz))</code> y <code>range(len(matriz[i]))</code>.","El acumulador de la fila se reinicia <b>en cada fila</b>."],
 variables:[["suma_filas(matriz)","lista con una suma por fila"]],
 regla:true, prohibido:["sum"],
 inicial:`def suma_filas(matriz):
    resultado = []
    return resultado
`,
 tests:[
  {nombre:"matriz de 2×3", codigo:`_casos(suma_filas, [(([[1, 2, 3], [4, 5, 6]],), [6, 15])])`},
  {nombre:"otros tamaños (no solo 3×3)", codigo:`_casos(suma_filas, [(([[5]],), [5]), (([[1, 1], [2, 2], [3, 3], [4, 4]],), [2, 4, 6, 8]), (([[1, 2, 3, 4, 5]],), [15])])`}
 ],
 solucion:`def suma_filas(matriz):
    resultado = []
    for i in range(len(matriz)):
        suma = 0
        for j in range(len(matriz[i])):
            suma += matriz[i][j]
        resultado.append(suma)
    return resultado
`
},
{
 id:"pc-m3", grupo:"matrices", ej:"M3", titulo:"Suma por columna",
 enunciado:"<code>suma_columnas(matriz)</code> devuelve una lista con la suma de cada columna. La matriz es rectangular (todas las filas miden lo mismo) y no está vacía.",
 datos:`suma_columnas([[1, 2, 3],
               [4, 5, 6]]) -> [5, 7, 9]`,
 tareas:["Ahora el <code>for</code> externo recorre las <b>columnas</b> (<code>len(matriz[0])</code>) y el interno las filas.","El elemento es <code>matriz[i][j]</code> con <code>j</code> fijo en el externo."],
 variables:[["suma_columnas(matriz)","lista con una suma por columna"]],
 regla:true, prohibido:["sum"],
 inicial:`def suma_columnas(matriz):
    resultado = []
    return resultado
`,
 tests:[
  {nombre:"matriz de 2×3", codigo:`_casos(suma_columnas, [(([[1, 2, 3], [4, 5, 6]],), [5, 7, 9])])`},
  {nombre:"otros tamaños", codigo:`_casos(suma_columnas, [(([[5]],), [5]), (([[1, 2], [3, 4], [5, 6], [7, 8]],), [16, 20]), (([[1, 2, 3, 4]],), [1, 2, 3, 4])])`}
 ],
 solucion:`def suma_columnas(matriz):
    resultado = []
    for j in range(len(matriz[0])):
        suma = 0
        for i in range(len(matriz)):
            suma += matriz[i][j]
        resultado.append(suma)
    return resultado
`
},
{
 id:"pc-m4", grupo:"matrices", ej:"M4", titulo:"Diagonal principal y secundaria",
 enunciado:"Para una matriz <b>cuadrada</b>: <code>suma_diagonal(matriz)</code> suma la diagonal principal (<code>matriz[i][i]</code>) y <code>suma_diagonal_secundaria(matriz)</code> la secundaria (<code>matriz[i][n-1-i]</code>). Con <b>un solo for</b>.",
 datos:`[[1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]]  -> principal: 15, secundaria: 15`,
 tareas:["No necesitás doble for: solo importa el elemento cuyo índice de fila y de columna coinciden (o se complementan).","Usá <code>len(matriz)</code>, no un 3 fijo."],
 variables:[["suma_diagonal(matriz)","suma de matriz[i][i]"],["suma_diagonal_secundaria(matriz)","suma de matriz[i][n-1-i]"]],
 regla:true, prohibido:["sum"],
 inicial:`def suma_diagonal(matriz):
    suma = 0
    return suma


def suma_diagonal_secundaria(matriz):
    suma = 0
    return suma
`,
 tests:[
  {nombre:"diagonal principal", codigo:`_casos(suma_diagonal, [(([[1, 2, 3], [4, 5, 6], [7, 8, 9]],), 15), (([[4]],), 4), (([[1, 0], [0, 7]],), 8)])`},
  {nombre:"diagonal secundaria", codigo:`_casos(suma_diagonal_secundaria, [(([[1, 2, 3], [4, 5, 6], [7, 8, 9]],), 15), (([[4]],), 4), (([[1, 3], [5, 7]],), 8), (([[1, 2, 3, 4], [0, 1, 0, 0], [0, 0, 2, 0], [9, 0, 0, 1]],), 13)])`}
 ],
 solucion:`def suma_diagonal(matriz):
    suma = 0
    for i in range(len(matriz)):
        suma += matriz[i][i]
    return suma


def suma_diagonal_secundaria(matriz):
    suma = 0
    n = len(matriz)
    for i in range(n):
        suma += matriz[i][n - 1 - i]
    return suma
`
},
{
 id:"pc-m5", grupo:"matrices", ej:"M5", titulo:"Traspuesta",
 enunciado:"<code>traspuesta(matriz)</code> devuelve una matriz nueva donde las filas pasan a ser columnas: el elemento <code>[i][j]</code> pasa a <code>[j][i]</code>. Sirve para matrices rectangulares (una de 2×3 da una de 3×2).",
 datos:`traspuesta([[1, 2, 3],
            [4, 5, 6]]) -> [[1, 4],
                            [2, 5],
                            [3, 6]]`,
 tareas:["El resultado tiene <code>len(matriz[0])</code> filas y <code>len(matriz)</code> columnas.","El externo recorre las columnas de la original; para cada una armá una fila nueva."],
 variables:[["traspuesta(matriz)","matriz nueva; la original no se modifica"]],
 inicial:`def traspuesta(matriz):
    resultado = []
    return resultado
`,
 tests:[
  {nombre:"rectangular 2×3", codigo:`_casos(traspuesta, [(([[1, 2, 3], [4, 5, 6]],), [[1, 4], [2, 5], [3, 6]])])`},
  {nombre:"cuadrada, columna y fila", codigo:`_casos(traspuesta, [(([[1, 2], [3, 4]],), [[1, 3], [2, 4]]), (([[1], [2], [3]],), [[1, 2, 3]]), (([[7, 8]],), [[7], [8]])])`}
 ],
 solucion:`def traspuesta(matriz):
    resultado = []
    for j in range(len(matriz[0])):
        fila = []
        for i in range(len(matriz)):
            fila.append(matriz[i][j])
        resultado.append(fila)
    return resultado
`
},
{
 id:"pc-m6", grupo:"matrices", ej:"M6", titulo:"El mayor de la matriz y su posición",
 enunciado:"<code>mayor_de_matriz(matriz)</code> devuelve una tupla <code>(valor, fila, columna)</code> del primer mayor elemento encontrado (recorriendo fila por fila).",
 datos:`mayor_de_matriz([[3, 9, 1],
                 [4, 9, 2]]) -> (9, 0, 1)`,
 tareas:["Inicializá con el primer elemento (<code>matriz[0][0]</code>), no con 0.","Actualizá valor, fila y columna cuando aparezca uno <b>estrictamente</b> mayor."],
 variables:[["mayor_de_matriz(matriz)","tupla (valor, fila, columna)"]],
 regla:true, prohibido:["max","min"],
 inicial:`def mayor_de_matriz(matriz):
    return (0, 0, 0)
`,
 tests:[
  {nombre:"con empates se queda con el primero", codigo:`_casos(mayor_de_matriz, [(([[3, 9, 1], [4, 9, 2]],), (9, 0, 1)), (([[1, 2], [3, 4]],), (4, 1, 1))])`},
  {nombre:"con negativos", codigo:`_casos(mayor_de_matriz, [(([[-5, -2], [-9, -3]],), (-2, 0, 1)), (([[-1]],), (-1, 0, 0))])`}
 ],
 solucion:`def mayor_de_matriz(matriz):
    mayor = matriz[0][0]
    fila = 0
    columna = 0
    for i in range(len(matriz)):
        for j in range(len(matriz[i])):
            if matriz[i][j] > mayor:
                mayor = matriz[i][j]
                fila = i
                columna = j
    return (mayor, fila, columna)
`
},
{
 id:"pc-m7", grupo:"matrices", ej:"M7", titulo:"Buscar un valor en la matriz",
 enunciado:"<code>buscar_en_matriz(matriz, valor)</code> devuelve la tupla <code>(fila, columna)</code> de la primera aparición del valor, o <code>(-1, -1)</code> si no está. Sin <code>in</code> ni <code>.index()</code>.",
 datos:`buscar_en_matriz([[1, 2], [3, 4]], 3) -> (1, 0)
buscar_en_matriz([[1, 2], [3, 4]], 9) -> (-1, -1)`,
 tareas:["Doble for y <code>return (i, j)</code> apenas lo encontrás.","El <code>return (-1, -1)</code> va <b>después</b> de los dos for."],
 variables:[["buscar_en_matriz(matriz, valor)","(fila, columna) o (-1, -1)"]],
 regla:true,
 inicial:`def buscar_en_matriz(matriz, valor):
    return (-1, -1)
`,
 tests:[
  {nombre:"lo encuentra", codigo:`_casos(buscar_en_matriz, [(([[1, 2], [3, 4]], 3), (1, 0)), (([[1, 2], [3, 4]], 1), (0, 0)), (([[1, 2, 3], [4, 5, 6]], 6), (1, 2)), (([[5, 5], [5, 5]], 5), (0, 0))])`},
  {nombre:"si no está, (-1, -1)", codigo:`_casos(buscar_en_matriz, [(([[1, 2], [3, 4]], 9), (-1, -1))])`}
 ],
 solucion:`def buscar_en_matriz(matriz, valor):
    for i in range(len(matriz)):
        for j in range(len(matriz[i])):
            if matriz[i][j] == valor:
                return (i, j)
    return (-1, -1)
`
},
{
 id:"pc-m8", grupo:"matrices", ej:"M8", titulo:"Edificio: pisos desde 1 y validación",
 enunciado:"Un edificio se guarda en una matriz: una fila por piso, una columna por departamento (consumo de cada uno). La persona piensa en «piso 1, 2, 3…» pero la matriz arranca en 0. <code>consumo_piso(matriz, piso)</code> devuelve la <b>suma del consumo del piso</b> (numerado desde 1). Si el piso no existe devuelve <code>-1</code> (no debe reventar con <code>IndexError</code>).",
 datos:`consumo = [[10, 20],   # piso 1
           [5, 5],     # piso 2
           [7, 3]]     # piso 3
consumo_piso(consumo, 2) -> 10
consumo_piso(consumo, 4) -> -1
consumo_piso(consumo, 0) -> -1`,
 tareas:["Validá el rango <b>antes</b> de acceder: <code>piso &gt;= 1 and piso &lt;= len(matriz)</code>.","Accedé con <code>matriz[piso - 1]</code>."],
 variables:[["consumo_piso(matriz, piso)","suma del piso (1-based) o -1 si no existe"]],
 nota:"Un <code>piso = 0</code> no da error con <code>matriz[piso - 1]</code> (da la última fila por índice negativo): por eso la validación tiene que descartar el 0 explícitamente.",
 regla:true, prohibido:["sum"],
 inicial:`def consumo_piso(matriz, piso):
    return 0
`,
 tests:[
  {nombre:"suma el piso correcto", codigo:`c = [[10, 20], [5, 5], [7, 3]]
_casos(consumo_piso, [((c, 1), 30), ((c, 2), 10), ((c, 3), 10)])`},
  {nombre:"pisos que no existen dan -1", codigo:`c = [[10, 20], [5, 5], [7, 3]]
_casos(consumo_piso, [((c, 4), -1), ((c, 0), -1), ((c, -1), -1)])`},
  {nombre:"consumos decimales", codigo:`_casos(consumo_piso, [(([[1.5, 2.5], [0.25, 0.25]], 2), 0.5)])`}
 ],
 solucion:`def consumo_piso(matriz, piso):
    if piso >= 1 and piso <= len(matriz):
        suma = 0
        fila = matriz[piso - 1]
        for j in range(len(fila)):
            suma += fila[j]
        return suma
    return -1
`
},

/* =============================== BÚSQUEDA =============================== */
{
 id:"pc-s1", grupo:"busqueda", ej:"S1", titulo:"Búsqueda secuencial",
 enunciado:"<code>busqueda_secuencial(lista, valor)</code> devuelve el índice de la <b>primera</b> aparición de <code>valor</code>, o <code>-1</code> si no está. No necesita lista ordenada. Recorré con <code>for i in range(len(lista))</code>: <b>nada de <code>in</code> ni <code>.index()</code></b>.",
 datos:`busqueda_secuencial([7, 3, 9, 3], 3) -> 1
busqueda_secuencial([7, 3, 9], 5)    -> -1`,
 tareas:["Compará <code>lista[i] == valor</code> y devolvé <code>i</code>.","El <code>return -1</code> va <b>fuera</b> del for (si lo ponés dentro, cortás en la primera vuelta)."],
 variables:[["busqueda_secuencial(lista, valor)","índice de la primera aparición o -1"]],
 regla:true,
 inicial:`def busqueda_secuencial(lista, valor):
    # recorré con índices
    return -1
`,
 tests:[
  {nombre:"lo encuentra (primera aparición)", codigo:`_casos(busqueda_secuencial, [(([7, 3, 9, 3], 3), 1), (([4], 4), 0), (([1, 2, 3, 4], 4), 3), (([5, 5, 5], 5), 0)])`},
  {nombre:"si no está devuelve -1", codigo:`_casos(busqueda_secuencial, [(([7, 3, 9], 5), -1), (([], 1), -1)])`}
 ],
 solucion:`def busqueda_secuencial(lista, valor):
    for i in range(len(lista)):
        if lista[i] == valor:
            return i
    return -1
`
},
{
 id:"pc-s2", grupo:"busqueda", ej:"S2", titulo:"Todas las posiciones",
 enunciado:"<code>buscar_todas(lista, valor)</code> devuelve una lista con <b>todos</b> los índices donde aparece el valor (vacía si no está). Es la secuencial sin cortar en el primero.",
 datos:`buscar_todas([2, 5, 2, 7, 2], 2) -> [0, 2, 4]
buscar_todas([2, 5], 9)           -> []`,
 tareas:["Lista <code>posiciones = []</code> y <code>append(i)</code> cada vez que coincide.","Sin <code>return</code> dentro del for: tiene que recorrer todo."],
 variables:[["buscar_todas(lista, valor)","lista de índices"]],
 regla:true,
 inicial:`def buscar_todas(lista, valor):
    posiciones = []
    return posiciones
`,
 tests:[
  {nombre:"todas las posiciones", codigo:`_casos(buscar_todas, [(([2, 5, 2, 7, 2], 2), [0, 2, 4]), (([2, 5], 9), []), (([], 1), []), (([8], 8), [0])])`}
 ],
 solucion:`def buscar_todas(lista, valor):
    posiciones = []
    for i in range(len(lista)):
        if lista[i] == valor:
            posiciones.append(i)
    return posiciones
`
},
{
 id:"pc-s3", grupo:"busqueda", ej:"S3", titulo:"Búsqueda binaria",
 enunciado:"<code>busqueda_binaria(lista, valor)</code> trabaja sobre una lista <b>ya ordenada</b> de menor a mayor y devuelve el índice del valor o <code>-1</code>. Con <code>izquierda</code>, <code>derecha</code>, <code>medio</code> y un <code>while izquierda &lt;= derecha</code>. El corrector cuenta cuántas veces mirás la lista: si hacés una secuencial disfrazada, falla.",
 datos:`busqueda_binaria([1, 3, 5, 7, 9], 7) -> 3
busqueda_binaria([1, 3, 5, 7, 9], 4) -> -1`,
 tareas:["<code>derecha = len(lista) - 1</code> (acá sí va el <code>-1</code>: es un índice directo).","<code>medio = (izquierda + derecha) // 2</code>.","Si <code>lista[medio] &lt; valor</code>, el valor está a la derecha: <code>izquierda = medio + 1</code>. Si no, <code>derecha = medio - 1</code>."],
 variables:[["busqueda_binaria(lista, valor)","índice o -1, en O(log n) accesos"]],
 nota:"Las ramas invertidas son la trampa clásica: valor mayor que el del medio → seguís por la derecha, no por la izquierda.",
 regla:true,
 inicial:`def busqueda_binaria(lista, valor):
    izquierda = 0
    derecha = 0
    # while izquierda <= derecha: ...
    return -1
`,
 tests:[
  {nombre:"encuentra valores en distintas posiciones", codigo:`l = [1, 3, 5, 7, 9, 11, 13]
_casos(busqueda_binaria, [((l, 1), 0), ((l, 7), 3), ((l, 13), 6), ((l, 9), 4), (([5], 5), 0)])`},
  {nombre:"si no está devuelve -1", codigo:`l = [1, 3, 5, 7, 9]
_casos(busqueda_binaria, [((l, 4), -1), ((l, 0), -1), ((l, 100), -1), (([], 3), -1)])`},
  {nombre:"es realmente binaria (pocos accesos)", codigo:`class Contador(list):
    accesos = 0
    def __getitem__(self, k):
        Contador.accesos += 1
        return list.__getitem__(self, k)
grande = Contador(range(0, 2000, 2))
r = busqueda_binaria(grande, 1998)
assert r == 999, "debía devolver 999 y devolvió " + str(r)
assert Contador.accesos < 80, "miraste la lista " + str(Contador.accesos) + " veces: una binaria sobre 1000 elementos necesita unas 10-30. ¿La estás recorriendo de a uno?"`}
 ],
 solucion:`def busqueda_binaria(lista, valor):
    izquierda = 0
    derecha = len(lista) - 1
    while izquierda <= derecha:
        medio = (izquierda + derecha) // 2
        if lista[medio] == valor:
            return medio
        elif lista[medio] < valor:
            izquierda = medio + 1
        else:
            derecha = medio - 1
    return -1
`
},

/* =============================== ORDENAMIENTO =============================== */
{
 id:"pc-o1", grupo:"orden", ej:"O1", titulo:"Burbuja (menor a mayor)",
 enunciado:"<code>burbuja(lista)</code> ordena <b>en el lugar</b> (modifica la lista recibida) de menor a mayor, comparando vecinos <code>j</code> y <code>j+1</code> e intercambiándolos. <b>Prohibido <code>sort()</code> y <code>sorted()</code></b>.",
 datos:`l = [5, 3, 8, 1]
burbuja(l)
l -> [1, 3, 5, 8]`,
 tareas:["<code>for i in range(n)</code> por fuera y <code>for j in range(0, n - i - 1)</code> por dentro.","Si <code>lista[j] &gt; lista[j + 1]</code>, intercambiá con una variable auxiliar."],
 variables:[["burbuja(lista)","deja la lista recibida ordenada ascendente"]],
 regla:true,
 inicial:`def burbuja(lista):
    n = len(lista)
    # for i ... for j ... comparar vecinos e intercambiar
`,
 tests:[
  {nombre:"ordena casos variados (vacía, repetidos, ya ordenada…)", codigo:`_ordena(burbuja, False)`}
 ],
 solucion:`def burbuja(lista):
    n = len(lista)
    for i in range(n):
        for j in range(0, n - i - 1):
            if lista[j] > lista[j + 1]:
                aux = lista[j]
                lista[j] = lista[j + 1]
                lista[j + 1] = aux
`
},
{
 id:"pc-o2", grupo:"orden", ej:"O2", titulo:"Burbuja (mayor a menor)",
 enunciado:"Igual que antes pero de <b>mayor a menor</b>: <code>burbuja_desc(lista)</code>. Releé qué piden: cambia un solo símbolo, pero es el que decide el orden.",
 datos:`l = [5, 3, 8, 1]
burbuja_desc(l)
l -> [8, 5, 3, 1]`,
 tareas:["Mismo esqueleto de burbuja.","El intercambio se hace cuando <code>lista[j] &lt; lista[j + 1]</code>."],
 variables:[["burbuja_desc(lista)","deja la lista recibida ordenada descendente"]],
 regla:true,
 inicial:`def burbuja_desc(lista):
    n = len(lista)
`,
 tests:[
  {nombre:"ordena de mayor a menor", codigo:`_ordena(burbuja_desc, True)`}
 ],
 solucion:`def burbuja_desc(lista):
    n = len(lista)
    for i in range(n):
        for j in range(0, n - i - 1):
            if lista[j] < lista[j + 1]:
                aux = lista[j]
                lista[j] = lista[j + 1]
                lista[j + 1] = aux
`
},
{
 id:"pc-o3", grupo:"orden", ej:"O3", titulo:"Inserción",
 enunciado:"<code>insercion(lista)</code> ordena en el lugar de menor a mayor: para cada elemento desde la posición 1, guardalo en <code>actual</code> y desplazá a la derecha los mayores con un <code>while</code> hasta encontrarle su lugar.",
 datos:`l = [5, 3, 8, 1]
insercion(l)
l -> [1, 3, 5, 8]`,
 tareas:["<code>for i in range(1, len(lista))</code>: arranca en 1, no en 0.","<code>actual = lista[i]</code>; <code>j = i - 1</code>.","<code>while j &gt;= 0 and lista[j] &gt; actual:</code> copiá <code>lista[j + 1] = lista[j]</code> y <code>j -= 1</code>.","Al salir, <code>lista[j + 1] = actual</code>."],
 variables:[["insercion(lista)","deja la lista recibida ordenada ascendente"]],
 regla:true,
 inicial:`def insercion(lista):
    # for + while
    pass
`,
 tests:[
  {nombre:"ordena casos variados", codigo:`_ordena(insercion, False)`},
  {nombre:"usa un while (desplaza) y no un sort disfrazado", codigo:`import ast
arbol = ast.parse(_fuente)
assert any(isinstance(n, ast.While) for n in ast.walk(arbol)), "la inserción lleva un while que desplaza los elementos mayores"`}
 ],
 solucion:`def insercion(lista):
    for i in range(1, len(lista)):
        actual = lista[i]
        j = i - 1
        while j >= 0 and lista[j] > actual:
            lista[j + 1] = lista[j]
            j -= 1
        lista[j + 1] = actual
`
},
{
 id:"pc-o4", grupo:"orden", ej:"O4", titulo:"Selección",
 enunciado:"<code>seleccion(lista)</code> ordena en el lugar de menor a mayor: en cada vuelta busca la posición del menor de lo que queda (<code>menor = i</code> y un <code>for</code> interno) y hace <b>un</b> intercambio.",
 datos:`l = [5, 3, 8, 1]
seleccion(l)
l -> [1, 3, 5, 8]`,
 tareas:["<code>for i in range(n)</code>: suponé que el menor es <code>lista[i]</code> (<code>menor = i</code>).","<code>for j in range(i + 1, n)</code>: si <code>lista[j] &lt; lista[menor]</code>, <code>menor = j</code>.","Intercambiá <code>lista[i]</code> con <code>lista[menor]</code> afuera del for interno."],
 variables:[["seleccion(lista)","deja la lista recibida ordenada ascendente"]],
 regla:true,
 inicial:`def seleccion(lista):
    n = len(lista)
`,
 tests:[
  {nombre:"ordena casos variados", codigo:`_ordena(seleccion, False)`},
  {nombre:"hace a lo sumo n intercambios (selección y no burbuja)", codigo:`class Anotada(list):
    escrituras = 0
    def __setitem__(self, k, v):
        Anotada.escrituras += 1
        list.__setitem__(self, k, v)
l = Anotada([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
seleccion(l)
assert l == [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "no quedó ordenada: " + str(list(l))
assert Anotada.escrituras <= 2 * len(l), "escribiste " + str(Anotada.escrituras) + " veces en la lista: la selección hace UN intercambio por vuelta (2 escrituras), no uno por cada comparación"`}
 ],
 solucion:`def seleccion(lista):
    n = len(lista)
    for i in range(n):
        menor = i
        for j in range(i + 1, n):
            if lista[j] < lista[menor]:
                menor = j
        aux = lista[i]
        lista[i] = lista[menor]
        lista[menor] = aux
`
},
{
 id:"pc-o5", grupo:"orden", ej:"O5", titulo:"Ranking de notas (tuplas)",
 enunciado:"<code>ranking(alumnos)</code> recibe una lista de tuplas <code>(nombre, nota)</code> y la ordena <b>en el lugar</b> de mayor a menor nota con el algoritmo que prefieras (a mano). Las notas no se repiten.",
 datos:`a = [("Ana", 7), ("Bruno", 10), ("Cami", 4)]
ranking(a)
a -> [("Bruno", 10), ("Ana", 7), ("Cami", 4)]`,
 tareas:["Comparás <code>lista[j][1]</code> (la nota), pero intercambiás la tupla completa.","Es el mismo algoritmo: cambia lo que se compara."],
 variables:[["ranking(alumnos)","lista de tuplas ordenada por nota descendente"]],
 regla:true,
 inicial:`def ranking(alumnos):
    pass
`,
 tests:[
  {nombre:"ordena por nota de mayor a menor", codigo:`a = [("Ana", 7), ("Bruno", 10), ("Cami", 4)]
ranking(a)
assert a == [("Bruno", 10), ("Ana", 7), ("Cami", 4)], "quedó " + str(a)
b = [("A", 1), ("B", 2), ("C", 3), ("D", 4), ("E", 5)]
ranking(b)
assert b == [("E", 5), ("D", 4), ("C", 3), ("B", 2), ("A", 1)], "quedó " + str(b)
c = []
ranking(c)
assert c == [], "la lista vacía debe seguir vacía"`}
 ],
 solucion:`def ranking(alumnos):
    n = len(alumnos)
    for i in range(n):
        for j in range(0, n - i - 1):
            if alumnos[j][1] < alumnos[j + 1][1]:
                aux = alumnos[j]
                alumnos[j] = alumnos[j + 1]
                alumnos[j + 1] = aux
`
},
{
 id:"pc-o6", grupo:"orden", ej:"O6", titulo:"Mediana sin sorted()",
 enunciado:"<code>mediana(numeros)</code> devuelve la mediana de una lista no vacía: el elemento del medio si la cantidad es impar, o el promedio de los dos del medio si es par. Necesitás ordenar: hacelo <b>a mano</b> sobre una <b>copia</b> (<code>copia = []</code> con <code>append</code>) para no desordenar la lista original.",
 datos:`mediana([7, 1, 5])      -> 5
mediana([4, 1, 3, 2])   -> 2.5`,
 tareas:["Copiá la lista con un <code>for</code> y <code>append</code>.","Ordená la copia con el algoritmo que prefieras.","Elegí el medio según la paridad de <code>len(copia)</code>."],
 variables:[["mediana(numeros)","la mediana; la lista original queda como estaba"]],
 regla:true,
 inicial:`def mediana(numeros):
    copia = []
    return 0
`,
 tests:[
  {nombre:"cantidad impar", codigo:`_casos(mediana, [(([7, 1, 5],), 5), (([9],), 9), (([3, 3, 1, 9, 7],), 3)])`},
  {nombre:"cantidad par", codigo:`_casos(mediana, [(([4, 1, 3, 2],), 2.5), (([10, 2],), 6.0)])`},
  {nombre:"no desordena la lista original", codigo:`orig = [9, 1, 5, 3]
mediana(orig)
assert orig == [9, 1, 5, 3], "modificaste la lista original: quedó " + str(orig)`}
 ],
 solucion:`def mediana(numeros):
    copia = []
    for i in range(len(numeros)):
        copia.append(numeros[i])
    n = len(copia)
    for i in range(n):
        for j in range(0, n - i - 1):
            if copia[j] > copia[j + 1]:
                aux = copia[j]
                copia[j] = copia[j + 1]
                copia[j + 1] = aux
    if n % 2 == 1:
        return copia[n // 2]
    return (copia[n // 2 - 1] + copia[n // 2]) / 2
`
},

/* =============================== ENCONTRÁ EL ERROR =============================== */
{
 id:"pc-e1", grupo:"errores", ej:"E1", titulo:"Inserción que se salta el último",
 enunciado:"Este ordenamiento por inserción parece correcto pero deja algunas listas sin ordenar. Encontrá el error y corregilo.",
 datos:`l = [3, 5, 8, 1]
insercion(l)   # debería dar [1, 3, 5, 8]`,
 tareas:["Probalo con una lista donde el <b>último</b> elemento sea el menor.","Corregí el rango del <code>for</code> externo."],
 variables:[["insercion(lista)","ordena de menor a mayor, último elemento incluido"]],
 nota:"El for de la inserción va <code>range(1, len(lista))</code>. Con <code>range(1, len(lista) - 1)</code> nunca se procesa el último (bug clásico del simulacro).",
 regla:true,
 inicial:`def insercion(lista):
    for i in range(1, len(lista) - 1):
        actual = lista[i]
        j = i - 1
        while j >= 0 and lista[j] > actual:
            lista[j + 1] = lista[j]
            j -= 1
        lista[j + 1] = actual
`,
 tests:[
  {nombre:"ordena también cuando el menor está al final", codigo:`_ordena(insercion, False)`}
 ],
 solucion:`def insercion(lista):
    for i in range(1, len(lista)):
        actual = lista[i]
        j = i - 1
        while j >= 0 and lista[j] > actual:
            lista[j + 1] = lista[j]
            j -= 1
        lista[j + 1] = actual
`
},
{
 id:"pc-e2", grupo:"errores", ej:"E2", titulo:"Binaria con las ramas invertidas",
 enunciado:"La búsqueda binaria no encuentra valores que están en la lista (a veces sí, a veces no). Hay un error de lógica en cómo se descarta cada mitad.",
 datos:`busqueda_binaria([1, 3, 5, 7, 9], 9)  # debería devolver 4`,
 tareas:["Pensá: si <code>lista[medio] &lt; valor</code>, ¿el valor puede estar a la izquierda o a la derecha del medio?","Corregí las dos asignaciones."],
 variables:[["busqueda_binaria(lista, valor)","índice o -1"]],
 regla:true,
 inicial:`def busqueda_binaria(lista, valor):
    izquierda = 0
    derecha = len(lista) - 1
    while izquierda <= derecha:
        medio = (izquierda + derecha) // 2
        if lista[medio] == valor:
            return medio
        elif lista[medio] < valor:
            derecha = medio - 1
        else:
            izquierda = medio + 1
    return -1
`,
 tests:[
  {nombre:"encuentra cada elemento", codigo:`l = [1, 3, 5, 7, 9, 11]
_casos(busqueda_binaria, [((l, 1), 0), ((l, 3), 1), ((l, 5), 2), ((l, 7), 3), ((l, 9), 4), ((l, 11), 5)])`},
  {nombre:"y -1 si no está", codigo:`_casos(busqueda_binaria, [(([1, 3, 5], 4), -1), (([1, 3, 5], 8), -1)])`}
 ],
 solucion:`def busqueda_binaria(lista, valor):
    izquierda = 0
    derecha = len(lista) - 1
    while izquierda <= derecha:
        medio = (izquierda + derecha) // 2
        if lista[medio] == valor:
            return medio
        elif lista[medio] < valor:
            izquierda = medio + 1
        else:
            derecha = medio - 1
    return -1
`
},
{
 id:"pc-e3", grupo:"errores", ej:"E3", titulo:"Burbuja que se pasa del final",
 enunciado:"Al ejecutar esta burbuja el programa corta con un <code>IndexError</code>. Leé el mensaje, ubicá la línea y corregí el rango del for interno.",
 datos:`burbuja([4, 2, 9, 1])  # debería dejar [1, 2, 4, 9]`,
 tareas:["En cada vuelta se compara <code>lista[j]</code> con <code>lista[j + 1]</code>: ¿hasta dónde puede llegar <code>j</code>?","Corregí el <code>range</code> del for interno."],
 variables:[["burbuja(lista)","ordena ascendente sin IndexError"]],
 nota:"El tope del for interno es <code>n - i - 1</code>: el <code>- 1</code> existe porque adentro se mira el vecino <code>j + 1</code>.",
 regla:true,
 inicial:`def burbuja(lista):
    n = len(lista)
    for i in range(n):
        for j in range(0, n - i):
            if lista[j] > lista[j + 1]:
                aux = lista[j]
                lista[j] = lista[j + 1]
                lista[j + 1] = aux
`,
 tests:[
  {nombre:"ordena sin romperse", codigo:`_ordena(burbuja, False)`}
 ],
 solucion:`def burbuja(lista):
    n = len(lista)
    for i in range(n):
        for j in range(0, n - i - 1):
            if lista[j] > lista[j + 1]:
                aux = lista[j]
                lista[j] = lista[j + 1]
                lista[j + 1] = aux
`
},
{
 id:"pc-e4", grupo:"errores", ej:"E4", titulo:"Pedían de mayor a menor",
 enunciado:"La consigna dice «ordenar las ventas <b>de mayor a menor</b>». Este código ordena sin errores… pero al revés de lo pedido. Detectá el símbolo que decide el orden.",
 datos:`ventas = [120, 450, 80, 300]
ordenar_ventas(ventas)  # debería dejar [450, 300, 120, 80]`,
 tareas:["No hay error de sintaxis: el problema es de lógica.","Corregí la comparación."],
 variables:[["ordenar_ventas(ventas)","deja la lista de mayor a menor"]],
 regla:true,
 inicial:`def ordenar_ventas(ventas):
    n = len(ventas)
    for i in range(n):
        for j in range(0, n - i - 1):
            if ventas[j] > ventas[j + 1]:
                aux = ventas[j]
                ventas[j] = ventas[j + 1]
                ventas[j + 1] = aux
`,
 tests:[
  {nombre:"queda de mayor a menor", codigo:`_ordena(ordenar_ventas, True)`}
 ],
 solucion:`def ordenar_ventas(ventas):
    n = len(ventas)
    for i in range(n):
        for j in range(0, n - i - 1):
            if ventas[j] < ventas[j + 1]:
                aux = ventas[j]
                ventas[j] = ventas[j + 1]
                ventas[j + 1] = aux
`
},
{
 id:"pc-e5", grupo:"errores", ej:"E5", titulo:"Máximo que arranca en 0",
 enunciado:"<code>el_mayor</code> devuelve resultados incorrectos con algunas listas y no avisa con ningún error (el peor tipo de bug). Encontrá con qué datos falla y arreglalo.",
 datos:`el_mayor([3, 8, 1])    # 8  (bien)
el_mayor([-4, -9, -2]) # debería dar -2`,
 tareas:["Probá con una lista de solo negativos.","Corregí el valor inicial del máximo."],
 variables:[["el_mayor(numeros)","el máximo de la lista (no vacía)"]],
 regla:true, prohibido:["max"],
 inicial:`def el_mayor(numeros):
    mayor = 0
    for i in range(len(numeros)):
        if numeros[i] > mayor:
            mayor = numeros[i]
    return mayor
`,
 tests:[
  {nombre:"listas con positivos", codigo:`_casos(el_mayor, [(([3, 8, 1],), 8), (([5],), 5)])`},
  {nombre:"listas con todos negativos", codigo:`_casos(el_mayor, [(([-4, -9, -2],), -2), (([-1],), -1)])`}
 ],
 solucion:`def el_mayor(numeros):
    mayor = numeros[0]
    for i in range(len(numeros)):
        if numeros[i] > mayor:
            mayor = numeros[i]
    return mayor
`
},
{
 id:"pc-e6", grupo:"errores", ej:"E6", titulo:"Acumulador reiniciado en cada vuelta",
 enunciado:"<code>total_ventas</code> debería sumar todas las ventas pero devuelve siempre el último valor. Un acumulador está en el lugar equivocado.",
 datos:`total_ventas([10, 20, 30])  # debería dar 60`,
 tareas:["Mirá dónde se inicializa <code>suma</code>.","Movela a donde corresponde."],
 variables:[["total_ventas(ventas)","la suma de todos los elementos"]],
 regla:true, prohibido:["sum"],
 inicial:`def total_ventas(ventas):
    for i in range(len(ventas)):
        suma = 0
        suma += ventas[i]
    return suma
`,
 tests:[
  {nombre:"suma todo", codigo:`_casos(total_ventas, [(([10, 20, 30],), 60), (([5],), 5), (([1, 1, 1, 1],), 4)])`},
  {nombre:"lista vacía da 0", codigo:`_casos(total_ventas, [(([],), 0)])`}
 ],
 solucion:`def total_ventas(ventas):
    suma = 0
    for i in range(len(ventas)):
        suma += ventas[i]
    return suma
`
},
{
 id:"pc-e7", grupo:"errores", ej:"E7", titulo:"Números fijos en la matriz",
 enunciado:"<code>suma_matriz</code> anda con la matriz de 3×3 del ejemplo pero falla con otras. Es el error que la guía marca como «clave del examen».",
 datos:`suma_matriz([[1, 2, 3], [4, 5, 6], [7, 8, 9]])  # 45
suma_matriz([[1, 2], [3, 4], [5, 6], [7, 8]])  # debería dar 36`,
 tareas:["Reemplazá los números fijos por <code>len(matriz)</code> y <code>len(matriz[i])</code>."],
 variables:[["suma_matriz(matriz)","suma de todas las celdas, para cualquier tamaño"]],
 regla:true, prohibido:["sum"],
 inicial:`def suma_matriz(matriz):
    suma = 0
    for i in range(3):
        for j in range(3):
            suma += matriz[i][j]
    return suma
`,
 tests:[
  {nombre:"3×3", codigo:`_casos(suma_matriz, [(([[1, 2, 3], [4, 5, 6], [7, 8, 9]],), 45)])`},
  {nombre:"cualquier otro tamaño", codigo:`_casos(suma_matriz, [(([[1, 2], [3, 4], [5, 6], [7, 8]],), 36), (([[5]],), 5), (([[1, 2, 3, 4, 5]],), 15)])`}
 ],
 solucion:`def suma_matriz(matriz):
    suma = 0
    for i in range(len(matriz)):
        for j in range(len(matriz[i])):
            suma += matriz[i][j]
    return suma
`
},
{
 id:"pc-e8", grupo:"errores", ej:"E8", titulo:"La misma fila repetida",
 enunciado:"Se arma una matriz de ceros y después se carga un valor en una celda, pero aparece en <b>todas</b> las filas. Es un error de referencias, no de sintaxis.",
 datos:`m = matriz_ceros(3, 2)
m[0][1] = 5
m -> debería ser [[0, 5], [0, 0], [0, 0]]`,
 tareas:["Entendé por qué <code>[[0] * c] * f</code> repite la misma lista.","Armá una fila nueva por cada vuelta con doble for."],
 variables:[["matriz_ceros(filas, columnas)","matriz con filas independientes"]],
 inicial:`def matriz_ceros(filas, columnas):
    return [[0] * columnas] * filas
`,
 tests:[
  {nombre:"tamaño y contenido", codigo:`_casos(matriz_ceros, [((2, 3), [[0, 0, 0], [0, 0, 0]]), ((1, 1), [[0]])])`},
  {nombre:"modificar una celda no afecta otras filas", codigo:`m = matriz_ceros(3, 2)
m[0][1] = 5
assert m == [[0, 5], [0, 0], [0, 0]], "quedó " + str(m) + ": las filas son la misma lista"`}
 ],
 solucion:`def matriz_ceros(filas, columnas):
    matriz = []
    for i in range(filas):
        fila = []
        for j in range(columnas):
            fila.append(0)
        matriz.append(fila)
    return matriz
`
},
{
 id:"pc-e9", grupo:"errores", ej:"E9", titulo:"Piso 1 no es la fila 1",
 enunciado:"El usuario escribe «piso 1» y el programa le muestra el consumo del piso 2; con «piso 3» revienta con <code>IndexError</code>. Dos errores: el índice y la falta de validación.",
 datos:`edificio = [[10, 20], [5, 5], [7, 3]]   # pisos 1, 2 y 3
consumo_del_piso(edificio, 1)  # debería dar 30
consumo_del_piso(edificio, 5)  # debería dar -1`,
 tareas:["Convertí el piso (desde 1) en índice (desde 0).","Validá el rango antes de acceder."],
 variables:[["consumo_del_piso(edificio, piso)","suma del piso (1-based) o -1 si no existe"]],
 regla:true, prohibido:["sum"],
 inicial:`def consumo_del_piso(edificio, piso):
    suma = 0
    for j in range(len(edificio[piso])):
        suma += edificio[piso][j]
    return suma
`,
 tests:[
  {nombre:"pisos válidos", codigo:`e = [[10, 20], [5, 5], [7, 3]]
_casos(consumo_del_piso, [((e, 1), 30), ((e, 2), 10), ((e, 3), 10)])`},
  {nombre:"pisos inválidos dan -1 (sin romper)", codigo:`e = [[10, 20], [5, 5], [7, 3]]
_casos(consumo_del_piso, [((e, 5), -1), ((e, 0), -1)])`}
 ],
 solucion:`def consumo_del_piso(edificio, piso):
    if piso < 1 or piso > len(edificio):
        return -1
    suma = 0
    for j in range(len(edificio[piso - 1])):
        suma += edificio[piso - 1][j]
    return suma
`
},
{
 id:"pc-e10", grupo:"errores", ej:"E10", titulo:"int() para consumos decimales",
 enunciado:"Los consumos llegan como texto (lo que devuelve <code>input()</code>), por ejemplo <code>\"12.5\"</code>. <code>total_consumo</code> corta con <code>ValueError</code>. La consigna dice que los consumos son <b>float</b>.",
 datos:`total_consumo(["12.5", "7.25", "3"])  # debería dar 22.75`,
 tareas:["Leé el tipo de error: ¿qué función de conversión no admite decimales?","Corregí la conversión."],
 variables:[["total_consumo(textos)","suma de los consumos convertidos a número decimal"]],
 regla:true, prohibido:["sum"],
 inicial:`def total_consumo(textos):
    total = 0
    for i in range(len(textos)):
        total += int(textos[i])
    return total
`,
 tests:[
  {nombre:"suma decimales", codigo:`_casos(total_consumo, [((["12.5", "7.25", "3"],), 22.75), ((["0.5"],), 0.5)])`},
  {nombre:"también enteros y lista vacía", codigo:`_casos(total_consumo, [((["4", "6"],), 10), (([],), 0)])`}
 ],
 solucion:`def total_consumo(textos):
    total = 0
    for i in range(len(textos)):
        total += float(textos[i])
    return total
`
},
{
 id:"pc-e11", grupo:"errores", ej:"E11", titulo:"Función que imprime pero no devuelve",
 enunciado:"<code>area</code> se usa así: <code>x = area(4, 5)</code> y después se hacen cuentas con <code>x</code>. Pero <code>x</code> queda en <code>None</code>. Con retorno vs sin retorno: ¿cuál hace falta acá?",
 datos:`x = area(4, 5)
x + 1   # debería dar 21`,
 tareas:["Decidí si la función hace una acción (sin retorno) o calcula un resultado que se necesita después (con retorno).","Corregila."],
 variables:[["area(base, altura)","devuelve base * altura"]],
 inicial:`def area(base, altura):
    print(base * altura)
`,
 tests:[
  {nombre:"area devuelve el resultado", codigo:`_casos(area, [((4, 5), 20), ((3, 3), 9), ((0, 7), 0)])`}
 ],
 solucion:`def area(base, altura):
    return base * altura
`
},
{
 id:"pc-e12", grupo:"errores", ej:"E12", titulo:"Condiciones en el orden equivocado",
 enunciado:"<code>clasificar_nota</code> dice «Aprobado» para casi todo, incluso para un 10. Las condiciones están bien, pero el <b>orden</b> no.",
 datos:`clasificar_nota(10)  # debería ser "Sobresaliente"
clasificar_nota(8)   # "Aprobado"
clasificar_nota(5)   # "Desaprobado"`,
 tareas:["Recordá: <code>if / elif</code> se evalúan de arriba hacia abajo y gana el primero verdadero.","Reordená de la condición más exigente a la menos exigente."],
 variables:[["clasificar_nota(nota)","Sobresaliente (≥ 9), Aprobado (≥ 7), Desaprobado"]],
 inicial:`def clasificar_nota(nota):
    if nota >= 7:
        return "Aprobado"
    elif nota >= 9:
        return "Sobresaliente"
    else:
        return "Desaprobado"
`,
 tests:[
  {nombre:"los tres rangos", codigo:`_casos(clasificar_nota, [((10,), "Sobresaliente"), ((9,), "Sobresaliente"), ((8,), "Aprobado"), ((7,), "Aprobado"), ((6,), "Desaprobado")])`}
 ],
 solucion:`def clasificar_nota(nota):
    if nota >= 9:
        return "Sobresaliente"
    elif nota >= 7:
        return "Aprobado"
    else:
        return "Desaprobado"
`
},

/* =============================== PROGRAMA COMPLETO =============================== */
{
 id:"pc-p1", grupo:"programa", ej:"P1", titulo:"Menú con bandera y entry point",
 enunciado:"Armá el patrón del examen: un programa con menú controlado por una <b>bandera</b>. Datos de prueba: <code>[5, 3, 8]</code>. <b>Opción 1</b>: <code>mostrar(datos)</code> imprime la lista (función <b>sin</b> retorno). <b>Opción 2</b>: imprime el resultado de <code>suma(datos)</code> (función <b>con</b> retorno). <b>Opción 0</b>: imprime <code>Saliendo...</code> y termina. Otra opción: <code>Opción inválida</code>. Todo cierra con el <code>if __name__ == \"__main__\":</code>.",
 datos:`Opciones tipeadas en la prueba: 1, 7, 2, 0

Salida esperada (en algún orden razonable):
[5, 3, 8]
Opción inválida
16
Saliendo...`,
 tareas:["<code>opcion = -1</code> antes del <code>while opcion != 0</code>.","<code>int(input(\"Opción: \"))</code> dentro del bucle.","<code>if / elif / else</code> para las cuatro ramas.","<code>suma</code> con <code>for</code> y sin <code>sum()</code>; <code>main()</code> llamado desde el entry point."],
 variables:[["suma(lista)","función con retorno: la suma de los elementos"],["mostrar(lista)","función sin retorno: imprime la lista"],["main()","menú con bandera; se ejecuta solo si el archivo se corre directo"]],
 entradas:["1", "7", "2", "0"],
 regla:true, prohibido:["sum"],
 nota:"Acá <code>input()</code> está simulado: la prueba «tipea» 1, 7, 2 y 0. Si tu bucle pide más entradas de las que hay, el corrector te avisa.",
 inicial:`def mostrar(lista):
    # sin retorno: solo imprime
    pass


def suma(lista):
    # con retorno: devuelve la suma
    pass


def main():
    datos = [5, 3, 8]
    opcion = -1
    # while opcion != 0: menú con if / elif / else


# entry point
`,
 tests:[
  {nombre:"suma devuelve la suma", codigo:`_casos(suma, [(([5, 3, 8],), 16), (([],), 0), (([-1, 1],), 0)])`},
  {nombre:"mostrar imprime la lista y no devuelve nada", codigo:`import io, contextlib
b = io.StringIO()
with contextlib.redirect_stdout(b):
    r = mostrar([1, 2])
assert "[1, 2]" in b.getvalue(), "mostrar([1, 2]) no imprimió la lista"
assert r is None, "mostrar es una función SIN retorno: no debería devolver nada"`},
  {nombre:"el menú funciona (opciones 1, 7, 2, 0)", codigo:`assert "[5, 3, 8]" in _salida, "la opción 1 no mostró la lista [5, 3, 8]"
assert "Opción inválida" in _salida, "la opción 7 debía imprimir 'Opción inválida'"
assert "16" in _salida, "la opción 2 debía mostrar la suma (16)"
assert "Saliendo..." in _salida, "la opción 0 debía imprimir 'Saliendo...'"`},
  {nombre:"el programa termina al elegir 0 y tiene entry point", codigo:`assert 'if __name__ == "__main__"' in _fuente or "if __name__ == '__main__'" in _fuente, "falta el entry point: if __name__ == \\"__main__\\": main()"`}
 ],
 solucion:`def mostrar(lista):
    print(lista)


def suma(lista):
    total = 0
    for i in range(len(lista)):
        total += lista[i]
    return total


def main():
    datos = [5, 3, 8]
    opcion = -1
    while opcion != 0:
        print("1. Mostrar   2. Sumar   0. Salir")
        opcion = int(input("Opción: "))
        if opcion == 1:
            mostrar(datos)
        elif opcion == 2:
            print(suma(datos))
        elif opcion == 0:
            print("Saliendo...")
        else:
            print("Opción inválida")


if __name__ == "__main__":
    main()
`
}

];
