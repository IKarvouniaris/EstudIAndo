/* Corrector del laboratorio de Pensamiento Computacional (código Python que corre en Pyodide).
   Lo usan la página (js/entrenador-pensamiento.js) y tools/verificar_pensamiento.py, así que lo que
   se prueba en el verificador es exactamente lo que corre en el navegador.

   - Ejecuta el código del alumno con input() simulado (las «entradas» del ejercicio).
   - Corta los bucles infinitos (tope de líneas ejecutadas) en vez de colgar la pestaña.
   - Controla las «reglas de oro» de la guía con el árbol sintáctico: sin el operador in, .index(),
     .sort(), sorted() ni lo que cada ejercicio agregue (sum, max, reverse, rebanadas, str…). */
var HARNESS_PY = String.raw`
import io, sys, json, ast, copy, contextlib, traceback

TOPE_LINEAS = 400000

def _con_limite(f):
    n = [0]
    def tr(frame, ev, arg):
        if ev == 'line':
            n[0] += 1
            if n[0] > TOPE_LINEAS:
                raise TimeoutError('el programa ejecuto mas de ' + str(TOPE_LINEAS) + ' lineas: seguramente un bucle infinito (¿te falta actualizar la variable de control del while?)')
        return tr
    sys.settrace(tr)
    try:
        return f()
    finally:
        sys.settrace(None)

def _igual(a, b):
    return a == b

def _casos(f, casos):
    for args, esperado in casos:
        copia = copy.deepcopy(args)
        r = f(*copia)
        assert r == esperado, f.__name__ + str(tuple(args)) + ' devolvio ' + repr(r) + ' y deberia devolver ' + repr(esperado)

def _ordena(f, desc=False):
    casos = [[], [1], [2, 1], [5, 3, 8, 1, 9, 2], [4, 4, 1, 1], [1, 2, 3, 4], [9, 8, 7], [-3, 5, 0, -1], [7, 7, 7], [3, 5, 8, 1], [4, 2, 9, 1]]
    for c in casos:
        l = list(c)
        f(l)
        esperado = sorted(c, reverse=desc)
        assert l == esperado, 'con ' + str(c) + ' la lista quedo ' + str(l) + ' y deberia quedar ' + str(esperado) + ' (la funcion tiene que modificar la lista que recibe)'

def _prohibidos(fuente, extra):
    arbol = ast.parse(fuente)
    usados = []
    siempre = ('sorted', 'sort', 'index')
    for n in ast.walk(arbol):
        if isinstance(n, ast.Compare):
            for op in n.ops:
                if isinstance(op, (ast.In, ast.NotIn)):
                    usados.append('el operador in')
        if isinstance(n, ast.Call):
            f = n.func
            nombre = f.id if isinstance(f, ast.Name) else (f.attr if isinstance(f, ast.Attribute) else None)
            if nombre in siempre or nombre in extra:
                usados.append(nombre + '()')
        if isinstance(n, ast.Slice) and 'slice' in extra:
            usados.append('rebanadas [a:b]')
    vistos = []
    for u in usados:
        if u not in vistos:
            vistos.append(u)
    return vistos

def _correr(codigo, tests_json, entradas_json, extra_json, regla):
    tests = json.loads(tests_json)
    entradas = list(json.loads(entradas_json))
    extra = json.loads(extra_json)
    if regla:
        tests = tests + [{'nombre': 'Reglas de oro: sin in, .index(), .sort() ni sorted()' + (' (ni ' + ', '.join(extra) + ')' if extra else ''),
                          'codigo': "_u = _prohibidos(_fuente, _extra)\nassert not _u, 'usaste algo que el examen prohibe: ' + ', '.join(_u)"}]
    buf = io.StringIO()
    def _input(prompt=''):
        if not entradas:
            raise EOFError('el programa pidio mas entradas de las que hay (el ejercicio simula las que tipea el usuario): ¿falta salir del bucle?')
        v = entradas.pop(0)
        print(str(prompt) + v)
        return v
    ns = {'__name__': '__main__', 'input': _input}
    error = None
    try:
        with contextlib.redirect_stdout(buf):
            with contextlib.redirect_stderr(buf):
                _con_limite(lambda: exec(compile(codigo, 'tu_codigo.py', 'exec'), ns))
    except BaseException:
        error = traceback.format_exc(limit=3)
    salida = buf.getvalue()
    resultados = []
    if error is None:
        for t in tests:
            entorno = dict(ns)
            entorno['_fuente'] = codigo
            entorno['_salida'] = salida
            entorno['_extra'] = extra
            for nombre in ('_casos', '_ordena', '_igual', '_prohibidos'):
                entorno[nombre] = globals()[nombre]
            try:
                _con_limite(lambda: exec(t['codigo'], entorno))
                resultados.append({'nombre': t['nombre'], 'ok': True, 'detalle': ''})
            except AssertionError as e:
                resultados.append({'nombre': t['nombre'], 'ok': False, 'detalle': str(e) or 'la condicion no se cumple'})
            except NameError as e:
                resultados.append({'nombre': t['nombre'], 'ok': False, 'detalle': str(e) + ' -- revisa que la funcion se llame exactamente asi'})
            except TypeError as e:
                resultados.append({'nombre': t['nombre'], 'ok': False, 'detalle': 'TypeError: ' + str(e) + ' (¿devolvés algo con return? ¿recibe los parámetros que pide la consigna?)'})
            except BaseException as e:
                resultados.append({'nombre': t['nombre'], 'ok': False, 'detalle': type(e).__name__ + ': ' + str(e)})
    return json.dumps({'salida': salida, 'error': error, 'tests': resultados})
`;
