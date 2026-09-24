/* Entrenador de Python para Ciencia de Datos — práctica libre.
   Dos modos: multiple choice sobre "qué librería/comando usar", y un laboratorio
   que ejecuta el código de los exámenes simulados con Pyodide y lo corrige
   con verificaciones sobre el resultado real.

   Todo el progreso vive en localStorage del navegador: este modo no habla con
   Supabase ni toca el leaderboard. El puntaje real sigue estando en
   simulacro-python.html, con las respuestas del lado del servidor.

   Depende de js/entrenador-python-datos.js (BANCO, PARCIALES, ARCHIVOS, EJERCICIOS).
*/
(function(){
"use strict";

/* ============================================================
   TEMA (compartido con el resto del sitio via localStorage)
   ============================================================ */
var raiz = document.documentElement;
var btnTema = document.getElementById("btn-tema");
function aplicarTema(t){
  raiz.setAttribute("data-tema", t);
  btnTema.textContent = t === "oscuro" ? "MODO CLARO" : "MODO OSCURO";
  try{ localStorage.setItem("ia-tema", t); }catch(e){}
}
var temaGuardado = null;
try{ temaGuardado = localStorage.getItem("ia-tema"); }catch(e){}
if(!temaGuardado){
  temaGuardado = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "oscuro" : "claro";
}
aplicarTema(temaGuardado);
btnTema.addEventListener("click", function(){
  aplicarTema(raiz.getAttribute("data-tema") === "oscuro" ? "claro" : "oscuro");
});

/* Riel plegable, igual que en el apunte */
var envoltorio = document.getElementById("envoltorio");
document.getElementById("btn-cerrar").addEventListener("click", function(){ envoltorio.classList.add("riel-oculto"); });
document.getElementById("btn-abrir").addEventListener("click", function(){ envoltorio.classList.remove("riel-oculto"); });

/* ============================================================
   PROGRESO
   ============================================================ */
var K_PROG = "py-entrenador-progreso-v1";
var K_LAB  = "py-entrenador-lab-v1";
var K_COD  = "py-entrenador-codigo-v1";

function leerJSON(k){ try{ return JSON.parse(localStorage.getItem(k)) || {}; }catch(e){ return {}; } }
function escribirJSON(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function registrar(id, acerto){
  var p = leerJSON(K_PROG);
  if(!p[id]) p[id] = { ok:0, no:0 };
  if(acerto) p[id].ok++; else p[id].no++;
  escribirJSON(K_PROG, p);
}

function esc(s){
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function mezclar(a){
  var r = a.slice(), i, j, t;
  for(i = r.length - 1; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    t = r[i]; r[i] = r[j]; r[j] = t;
  }
  return r;
}

var PREG_PARCIALES = PARCIALES.reduce(function(a, m){ return a.concat(m.preguntas); }, []);
var TODAS = BANCO.concat(PREG_PARCIALES);

var CLASES = [
  { n:1, titulo:"Fundamentos y colecciones", desc:"Listas, diccionarios, sets, enumerate y entrada por teclado." },
  { n:2, titulo:"PEP 8, excepciones y archivos", desc:"Estilo, docstrings, try/except, pathlib, TXT, CSV y JSON." },
  { n:3, titulo:"NumPy y Pandas", desc:"Vectorización, máscaras, where/select y primeros DataFrames." },
  { n:4, titulo:"Selección, unión y limpieza", desc:"loc/iloc, filtros, concat vs merge, nulos, duplicados y formatos." },
  { n:5, titulo:"Matplotlib", desc:"Figure/Axes, líneas, barras, histogramas y dispersión." },
  { n:6, titulo:"Seaborn", desc:"Heatmap, boxplot, pairplot, multivariados y exportación." }
];

function preguntasDeClase(n){
  return BANCO.filter(function(q){ return q.clase === n; });
}

/* ============================================================
   NAVEGACIÓN ENTRE VISTAS
   ============================================================ */
function mostrar(id){
  var vistas = document.querySelectorAll(".vista"), i;
  for(i = 0; i < vistas.length; i++) vistas[i].classList.toggle("on", vistas[i].id === id);
  document.getElementById("nav-inicio").classList.toggle("activo", id === "v-inicio");
  document.getElementById("nav-lab").classList.toggle("activo", id === "v-lab");
  document.querySelector(".lienzo").classList.toggle("ancho", id === "v-lab");
  window.scrollTo({ top:0 });
}
function irInicio(){ renderInicio(); mostrar("v-inicio"); }

document.getElementById("nav-inicio").addEventListener("click", irInicio);
document.getElementById("nav-lab").addEventListener("click", verLab);
document.getElementById("quiz-volver").addEventListener("click", irInicio);
document.getElementById("res-volver").addEventListener("click", irInicio);
document.getElementById("btn-inicio").addEventListener("click", irInicio);

/* ============================================================
   INICIO
   ============================================================ */
function porcentajeMazo(qs){
  var p = leerJSON(K_PROG);
  var vistas = qs.filter(function(q){ return p[q.id]; });
  if(!vistas.length) return null;
  var buenas = qs.filter(function(q){ return p[q.id] && p[q.id].ok > 0; }).length;
  return Math.round(buenas / qs.length * 100);
}

function tarjeta(clave, etiqueta, titulo, desc, pill, pct, ancho, inhabilitada){
  return '<button class="mazo' + (ancho ? " ancho" : "") + '" data-mazo="' + clave + '"' +
    (inhabilitada ? " disabled" : "") + ' type="button">' +
    '<div class="m-n">' + etiqueta + '</div>' +
    '<div class="m-h">' + titulo + '</div>' +
    '<div class="m-d">' + desc + '</div>' +
    '<div class="m-f"><span>' + pill + '</span>' +
    '<span class="barra"><i style="width:' + (pct || 0) + '%"></i></span>' +
    '<span>' + (pct === null || pct === undefined ? "sin empezar" : pct + "%") + '</span></div>' +
    '</button>';
}

function renderInicio(){
  var p = leerJSON(K_PROG);
  var ids = Object.keys(p), ok = 0, no = 0, i;
  for(i = 0; i < ids.length; i++){ ok += p[ids[i]].ok; no += p[ids[i]].no; }
  var total = ok + no;
  var acierto = total ? Math.round(ok / total * 100) : 0;
  document.getElementById("cifras").innerHTML =
    '<div class="cifra"><b>' + TODAS.length + '</b><span>Preguntas</span></div>' +
    '<div class="cifra"><b>' + EJERCICIOS.length + '</b><span>Ejercicios</span></div>' +
    '<div class="cifra"><b>' + ids.length + '</b><span>Vistas</span></div>' +
    '<div class="cifra"><b>' + acierto + '%</b><span>Acierto</span></div>';

  document.getElementById("mazos-clases").innerHTML = CLASES.map(function(c){
    var qs = preguntasDeClase(c.n);
    return tarjeta("clase-" + c.n, "Clase " + c.n, c.titulo, c.desc, qs.length + " preg.", porcentajeMazo(qs));
  }).join("");

  var falladas = TODAS.filter(function(q){ return p[q.id] && p[q.id].no > 0; }).length;
  document.getElementById("mazos-sim").innerHTML =
    tarjeta("mix-20", "Mixto", "Simulacro rápido", "20 preguntas al azar de todas las clases, en orden aleatorio.", "20 preg.", null) +
    tarjeta("todo", "Completo", "Todo el banco", "Las " + TODAS.length + " preguntas seguidas, clases y parciales.", TODAS.length + " preg.", null) +
    tarjeta("falladas", "Refuerzo", "Las que fallé",
      falladas ? "Solo las preguntas en las que te equivocaste alguna vez." : "Todavía no hay errores registrados.",
      falladas + " preg.", null, false, !falladas);

  document.getElementById("mazos-parciales").innerHTML = PARCIALES.map(function(m){
    return tarjeta("parcial-" + m.n, "Modelo " + m.letra, "Examen simulado — " + m.letra,
      "Una pregunta por cada tarea del examen, en el mismo orden.",
      m.preguntas.length + " preg.", porcentajeMazo(m.preguntas));
  }).join("") +
    tarjeta("parciales-mix", "A + B + C", "Los tres modelos mezclados",
      "Las " + PREG_PARCIALES.length + " preguntas de los tres exámenes en orden aleatorio.",
      PREG_PARCIALES.length + " preg.", null);

  var hechos = leerJSON(K_LAB);
  var resueltos = EJERCICIOS.filter(function(e){ return hechos[e.id]; }).length;
  document.getElementById("mazos-lab").innerHTML =
    tarjeta("__lab__", "Python en vivo", "Resolver los ejercicios en el navegador",
      "Los " + EJERCICIOS.length + " ejercicios de los modelos A, B y C, con editor y corrección automática. " +
      "Los archivos <code>productos.csv</code>, <code>pedidos.json</code> y los dos CSV mensuales ya están cargados.",
      resueltos + " de " + EJERCICIOS.length + " resueltos",
      Math.round(resueltos / EJERCICIOS.length * 100), true);

  var botones = document.querySelectorAll("[data-mazo]"), j;
  for(j = 0; j < botones.length; j++){
    botones[j].addEventListener("click", function(){
      var clave = this.getAttribute("data-mazo");
      if(clave === "__lab__") verLab(); else empezar(clave);
    });
  }
}

/* ============================================================
   MOTOR DEL MULTIPLE CHOICE
   ============================================================ */
var sesion = null;

function armarMazo(clave){
  var n, m;
  if(clave.indexOf("clase-") === 0){
    n = +clave.split("-")[1];
    m = CLASES.filter(function(c){ return c.n === n; })[0];
    return { titulo:"Clase " + n + " · " + m.titulo, qs:preguntasDeClase(n) };
  }
  if(clave === "mix-20") return { titulo:"Simulacro rápido", qs:mezclar(TODAS).slice(0, 20) };
  if(clave === "todo")   return { titulo:"Banco completo", qs:TODAS.slice() };
  if(clave === "falladas"){
    var p = leerJSON(K_PROG);
    return { titulo:"Refuerzo · las que fallé",
             qs:mezclar(TODAS.filter(function(q){ return p[q.id] && p[q.id].no > 0; })) };
  }
  if(clave === "parciales-mix") return { titulo:"Parciales A + B + C mezclados", qs:mezclar(PREG_PARCIALES) };
  if(clave.indexOf("parcial-") === 0){
    n = +clave.split("-")[1];
    m = PARCIALES.filter(function(x){ return x.n === n; })[0];
    return { titulo:m.titulo, qs:m.preguntas.slice() };
  }
  if(clave === "__errores__") return { titulo:"Repaso de errores", qs:sesion.errores.slice() };
  return { titulo:"", qs:[] };
}

function empezar(clave){
  var mazo = armarMazo(clave);
  if(!mazo.qs.length) return;
  sesion = { clave:clave, titulo:mazo.titulo, qs:mazo.qs, i:0, aciertos:0, errores:[], detalle:[] };
  document.getElementById("quiz-titulo").textContent = mazo.titulo;
  mostrar("v-quiz");
  pintarPregunta();
}

function pintarPregunta(){
  var q = sesion.qs[sesion.i];
  document.getElementById("quiz-cont").textContent = (sesion.i + 1) + " / " + sesion.qs.length;
  document.getElementById("quiz-barra").style.width = (sesion.i / sesion.qs.length * 100) + "%";

  var correcta = q.ops[0];
  var barajadas = mezclar(q.ops);
  var letras = ["A", "B", "C", "D", "E"];

  document.getElementById("quiz-ficha").innerHTML =
    '<div class="etqs">' +
      '<span class="etq acento">' + (q.ej ? q.ej : "Clase " + q.clase) + '</span>' +
      '<span class="etq">' + q.tema + '</span>' +
      '<span class="etq">' + q.nivel + '</span>' +
    '</div>' +
    '<p class="q-caso">' + q.caso + '</p>' +
    (q.codigo ? '<pre><code>' + esc(q.codigo) + '</code></pre>' : "") +
    '<p class="q-pide">' + q.pide + '</p>' +
    '<div class="opciones" id="opciones">' +
      barajadas.map(function(o, i){
        return '<button class="opcion" type="button" data-op="' + encodeURIComponent(o) + '">' +
          '<span class="k">' + letras[i] + '</span><span>' + o + '</span></button>';
      }).join("") +
    '</div><div id="explica"></div>';

  var bs = document.querySelectorAll("#opciones .opcion"), i;
  for(i = 0; i < bs.length; i++){
    bs[i].addEventListener("click", function(){
      responder(decodeURIComponent(this.getAttribute("data-op")), correcta, q);
    });
  }
}

function responder(elegida, correcta, q){
  var acerto = elegida === correcta;
  if(acerto) sesion.aciertos++; else sesion.errores.push(q);
  sesion.detalle.push({ q:q, elegida:elegida, correcta:correcta, acerto:acerto });
  registrar(q.id, acerto);

  var bs = document.querySelectorAll("#opciones .opcion"), i, o;
  for(i = 0; i < bs.length; i++){
    o = decodeURIComponent(bs[i].getAttribute("data-op"));
    bs[i].disabled = true;
    if(o === correcta) bs[i].classList.add("bien");
    else if(o === elegida) bs[i].classList.add("mal");
    else bs[i].classList.add("apagada");
  }

  var otras = q.porque || {};
  var lista = Object.keys(otras).map(function(k){
    return "<li><b>" + k + "</b> — " + otras[k] + "</li>";
  }).join("");

  var ultima = sesion.i === sesion.qs.length - 1;
  document.getElementById("explica").innerHTML =
    '<div class="explica">' +
      '<p class="veredicto ' + (acerto ? "bien" : "mal") + '">' + (acerto ? "✓ Correcto" : "✕ No era esa") + '</p>' +
      (acerto ? "" : '<p class="correcta">La respuesta correcta era <b>' + correcta + '</b>.</p>') +
      '<div class="aprendido"><h4>Qué se aprende acá</h4><p>' + q.aprendido + '</p></div>' +
      (lista ? '<p class="porque-h">Por qué las otras no</p><ul class="porque">' + lista + '</ul>' : "") +
      '<div class="acciones"><button class="btn principal" id="btn-sig" type="button">' +
        (ultima ? "Ver resultado" : "Siguiente pregunta") + '</button></div>' +
    '</div>';

  var sig = document.getElementById("btn-sig");
  sig.addEventListener("click", avanzar);
  sig.focus();
}

function avanzar(){
  sesion.i++;
  if(sesion.i >= sesion.qs.length) terminar();
  else { pintarPregunta(); window.scrollTo({ top:0, behavior:"smooth" }); }
}

function terminar(){
  var n = sesion.qs.length, ok = sesion.aciertos;
  var pct = Math.round(ok / n * 100);
  var elN = document.getElementById("res-n");
  elN.textContent = pct + "%";
  elN.style.color = pct >= 70 ? "var(--bien)" : (pct >= 40 ? "var(--aviso)" : "var(--alerta)");
  document.getElementById("res-l").textContent = ok + " de " + n + " correctas · " + sesion.titulo;

  var msg;
  if(pct === 100) msg = "Perfecto. Probá el banco completo o los tres parciales mezclados.";
  else if(pct >= 70) msg = "Buen dominio. Repasá abajo las que fallaste: casi siempre es distinguir dos comandos parecidos.";
  else if(pct >= 40) msg = "Vas encaminado. Conviene volver a la chuleta del apunte antes de repetir el mazo.";
  else msg = "Conviene leer el apunte de esta clase antes de repetir. Las explicaciones de cada pregunta también sirven de resumen.";
  document.getElementById("res-msg").textContent = msg;

  var fallos = sesion.detalle.filter(function(d){ return !d.acerto; });
  document.getElementById("res-cab").textContent = fallos.length ? "Para repasar (" + fallos.length + ")" : "Sin errores";
  document.getElementById("res-lista").innerHTML = fallos.length
    ? fallos.map(function(d){
        return '<div class="repaso-item"><div class="rq">' + d.q.caso + '</div>' +
               '<div class="ra">Correcta: ' + esc(d.correcta.replace(/<[^>]+>/g, "")) + '</div></div>';
      }).join("")
    : '<div class="repaso-item bien"><div class="rq">Respondiste todo bien.</div></div>';

  document.getElementById("btn-errores").style.display = fallos.length ? "" : "none";
  mostrar("v-res");
}

document.getElementById("btn-repetir").addEventListener("click", function(){ empezar(sesion.clave); });
document.getElementById("btn-errores").addEventListener("click", function(){ empezar("__errores__"); });

/* ============================================================
   LABORATORIO · Pyodide
   ============================================================ */
var PYODIDE_BASE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
var CM_BASE = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/";

var py = null, pyCargando = null, cmIntentado = false, cmInstancia = null;
var labActual = null;
var paquetesOk = {};

var SETUP_PY = [
"import io, os, json, contextlib, traceback",
"",
"def _reset_archivos(files):",
"    for nombre, contenido in files.items():",
"        with open(nombre, 'w', encoding='utf-8') as f:",
"            f.write(contenido)",
"",
"def _borrar(nombres):",
"    for n in nombres:",
"        if os.path.exists(n):",
"            os.remove(n)",
"",
"def _a_dict(obj, clave=None, valor=None):",
"    import pandas as pd",
"    if isinstance(obj, pd.Series):",
"        return {str(k): float(v) for k, v in obj.items()}",
"    if isinstance(obj, pd.DataFrame):",
"        cols = list(obj.columns)",
"        c = clave if clave in cols else cols[0]",
"        v = valor if valor in cols else cols[-1]",
"        return {str(f[c]): float(f[v]) for _, f in obj.iterrows()}",
"    raise AssertionError('se esperaba una Series o un DataFrame, llego ' + type(obj).__name__)",
"",
"def _correr(codigo, tests_json, figura=False):",
"    tests = json.loads(tests_json)",
"    ns = {'__name__': '__main__'}",
"    buf = io.StringIO()",
"    error = None",
"    if figura:",
"        import matplotlib.pyplot as plt",
"        plt.close('all')",
"    try:",
"        with contextlib.redirect_stdout(buf):",
"            with contextlib.redirect_stderr(buf):",
"                exec(compile(codigo, 'tu_codigo.py', 'exec'), ns)",
"    except Exception:",
"        error = traceback.format_exc(limit=3)",
"    salida = buf.getvalue()",
"    img = None",
"    if figura and error is None:",
"        try:",
"            import base64",
"            import matplotlib.pyplot as plt",
"            fig = plt.gcf()",
"            if fig.get_axes():",
"                b = io.BytesIO()",
"                fig.savefig(b, format='png', dpi=110, bbox_inches='tight', facecolor='white')",
"                img = base64.b64encode(b.getvalue()).decode()",
"        except Exception:",
"            img = None",
"    resultados = []",
"    if error is None:",
"        import numpy, pandas",
"        for t in tests:",
"            entorno = dict(ns)",
"            entorno.setdefault('np', numpy)",
"            entorno.setdefault('pd', pandas)",
"            entorno['os'] = os",
"            entorno['_a_dict'] = _a_dict",
"            entorno['_fuente'] = codigo",
"            if figura:",
"                import matplotlib",
"                import matplotlib.pyplot",
"                entorno['matplotlib'] = matplotlib",
"                entorno.setdefault('plt', matplotlib.pyplot)",
"            try:",
"                exec(t['codigo'], entorno)",
"                resultados.append({'nombre': t['nombre'], 'ok': True, 'detalle': ''})",
"            except AssertionError as e:",
"                resultados.append({'nombre': t['nombre'], 'ok': False,",
"                                   'detalle': str(e) or 'la condicion no se cumple'})",
"            except NameError as e:",
"                resultados.append({'nombre': t['nombre'], 'ok': False,",
"                                   'detalle': str(e) + ' -- revisa que la variable se llame exactamente asi'})",
"            except Exception as e:",
"                resultados.append({'nombre': t['nombre'], 'ok': False,",
"                                   'detalle': type(e).__name__ + ': ' + str(e)})",
"    return json.dumps({'salida': salida, 'error': error, 'tests': resultados, 'img': img})"
].join("\n");

var SETUP_MPL = [
"import os, warnings",
"os.environ['MPLBACKEND'] = 'AGG'",
"import matplotlib",
"matplotlib.use('AGG')",
"import matplotlib.pyplot as plt",
"warnings.filterwarnings('ignore', message='.*non-GUI backend.*')",
"warnings.filterwarnings('ignore', message='.*FigureCanvasAgg is non-interactive.*')"
].join("\n");

function cargarScript(src){
  return new Promise(function(res, rej){
    var s = document.createElement("script");
    s.src = src;
    s.onload = function(){ res(); };
    s.onerror = function(){ rej(new Error("no se pudo descargar " + src)); };
    document.head.appendChild(s);
  });
}
function cargarCSS(href){
  return new Promise(function(res){
    var l = document.createElement("link");
    l.rel = "stylesheet"; l.href = href;
    l.onload = function(){ res(); }; l.onerror = function(){ res(); };
    document.head.appendChild(l);
  });
}
function estado(txt, clase){
  var el = document.getElementById("estado-py");
  if(!el) return;
  el.className = "estado-py " + (clase || "");
  document.getElementById("estado-py-txt").innerHTML = txt;
}

function mensajeFalloPython(err){
  var base = "No se pudo iniciar Python: " + esc(err && err.message ? err.message : String(err)) + ".";
  if(location.protocol === "file:"){
    return base + " Estás abriendo el archivo con doble clic (<code>file://</code>), el escenario más " +
      "restringido. Serví la carpeta por HTTP: <code>python -m http.server 8000</code>. " +
      "Publicado en Vercel no hace falta nada de esto.";
  }
  return base + " La primera vez necesita conexión para descargar Python; después queda en caché. " +
    "El multiple choice funciona igual.";
}

function arrancarPython(){
  if(py) return Promise.resolve(py);
  if(pyCargando) return pyCargando;
  pyCargando = (function(){
    estado("Descargando el motor de Python (~10 MB). La primera vez tarda; después queda en la caché del navegador.", "cargando");
    return cargarScript(PYODIDE_BASE + "pyodide.js").then(function(){
      return loadPyodide({ indexURL: PYODIDE_BASE });
    }).then(function(inst){
      estado("Instalando NumPy y Pandas (~17 MB)…", "cargando");
      return inst.loadPackage(["numpy", "pandas"]).then(function(){
        paquetesOk.numpy = true; paquetesOk.pandas = true;
        inst.runPython(SETUP_PY);
        inst.globals.set("_files", JSON.stringify(ARCHIVOS));
        inst.runPython("_reset_archivos(json.loads(_files))");
        py = inst;
        estado("Python listo · NumPy y Pandas cargados · los archivos del parcial ya están en el disco.", "listo");
        return py;
      });
    });
  })();
  return pyCargando;
}

function asegurarPaquetes(lista){
  return arrancarPython().then(function(){
    var faltan = lista.filter(function(p){ return !paquetesOk[p]; });
    if(!faltan.length){
      estado("Python listo · " + Object.keys(paquetesOk).join(", "), "listo");
      return;
    }
    estado("Instalando " + faltan.join(", ") + " (~10 MB)… solo se descarga la primera vez.", "cargando");
    return py.loadPackage(faltan).then(function(){
      faltan.forEach(function(p){ paquetesOk[p] = true; });
      if(faltan.indexOf("matplotlib") >= 0) py.runPython(SETUP_MPL);
      estado("Python listo · " + Object.keys(paquetesOk).join(", "), "listo");
    });
  });
}

function marcarResuelto(id){
  var h = leerJSON(K_LAB); h[id] = true; escribirJSON(K_LAB, h);
  pintarFichas();
}
function guardarCodigo(id, txt){
  if(!id) return;
  var c = leerJSON(K_COD); c[id] = txt; escribirJSON(K_COD, c);
}
function codigoGuardado(id){ return leerJSON(K_COD)[id]; }

function montarEditor(valor){
  var host = document.getElementById("ed-host");
  host.innerHTML = '<textarea class="editor" id="ed-area" spellcheck="false"></textarea>';
  var ta = document.getElementById("ed-area");
  ta.value = valor;
  if(window.CodeMirror){
    cmInstancia = CodeMirror.fromTextArea(ta, {
      mode:"python", lineNumbers:true, indentUnit:4, tabSize:4,
      indentWithTabs:false, viewportMargin:Infinity
    });
    cmInstancia.setSize(null, "auto");
    cmInstancia.addKeyMap({ "Ctrl-Enter":ejecutarLab, "Cmd-Enter":ejecutarLab });
  } else {
    cmInstancia = null;
    ta.addEventListener("keydown", function(e){
      if(e.key === "Tab"){
        e.preventDefault();
        var s = ta.selectionStart;
        ta.value = ta.value.slice(0, s) + "    " + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = s + 4;
      }
      if(e.key === "Enter" && (e.ctrlKey || e.metaKey)){ e.preventDefault(); ejecutarLab(); }
    });
  }
}
function valorEditor(){
  if(cmInstancia) return cmInstancia.getValue();
  var ta = document.getElementById("ed-area");
  return ta ? ta.value : "";
}
function setEditor(v){
  if(cmInstancia) cmInstancia.setValue(v);
  else { var ta = document.getElementById("ed-area"); if(ta) ta.value = v; }
}

function pintarFichas(){
  var hechos = leerJSON(K_LAB);
  document.getElementById("lab-fichas").innerHTML = EJERCICIOS.map(function(e){
    return '<button class="ficha-ej' + (e.id === labActual ? " on" : "") +
      (hechos[e.id] ? " hecho" : "") + '" type="button" data-ej="' + e.id + '">' +
      '<span class="mk">' + (hechos[e.id] ? "✓" : "○") + '</span>' + e.modelo + " · " + e.ej + '</button>';
  }).join("");
  var bs = document.querySelectorAll("[data-ej]"), i;
  for(i = 0; i < bs.length; i++){
    bs[i].addEventListener("click", function(){ elegirEj(this.getAttribute("data-ej")); });
  }
}

function renderLab(){
  pintarFichas();
  var ej = EJERCICIOS.filter(function(e){ return e.id === labActual; })[0];

  document.getElementById("lab-enunciado").innerHTML =
    '<div class="sub">Modelo ' + ej.modelo + ' · ' + ej.ej + '</div>' +
    '<h3>' + ej.titulo + '</h3>' +
    '<p class="desc">' + ej.enunciado + '</p>' +
    '<h4>Datos de trabajo</h4>' +
    '<pre><code>' + esc(ej.datos) + '</code></pre>' +
    '<h4>Tareas</h4>' +
    '<ol class="tareas">' + ej.tareas.map(function(t){ return "<li>" + t + "</li>"; }).join("") + '</ol>' +
    '<h4>Qué se evalúa</h4>' +
    '<div class="evalua">' + ej.variables.map(function(v){
      return '<div><code>' + esc(v[0]) + '</code><span>' + v[1] + '</span></div>';
    }).join("") + '</div>' +
    (ej.nota ? '<p class="aviso-ej">' + ej.nota + '</p>' : "");

  document.getElementById("lab-editor").innerHTML =
    '<div class="enc-editor"><div class="sub">Editor</div>' +
      '<button class="btn-foco" id="btn-foco" type="button" aria-pressed="false">⤢ Ancho completo</button></div>' +
    '<div id="ed-host"></div>' +
    '<div class="acciones">' +
      '<button class="btn principal" id="btn-correr" type="button">Ejecutar y corregir</button>' +
      '<button class="btn chico" id="btn-reset" type="button">Reiniciar código</button>' +
      '<span class="pista">Ctrl+Enter</span>' +
    '</div>' +
    '<div id="lab-salida"></div>' +
    '<details class="solucion"><summary>Ver una solución posible</summary><div class="cuerpo">' +
      '<pre><code>' + esc(ej.solucion) + '</code></pre>' +
      '<button class="btn chico" id="btn-sol" type="button">Cargar en el editor</button>' +
    '</div></details>';

  montarEditor(codigoGuardado(ej.id) || ej.inicial);
  pintarMetodos(ej);
  var bf = document.getElementById("btn-foco");
  function pintarFoco(){
    var foco = document.querySelector(".lab").classList.contains("foco");
    bf.setAttribute("aria-pressed", foco ? "true" : "false");
    bf.textContent = foco ? "⤡ Volver a dos columnas" : "⤢ Ancho completo";
  }
  pintarFoco();
  bf.addEventListener("click", function(){
    document.querySelector(".lab").classList.toggle("foco");
    pintarFoco();
    if(cmInstancia) cmInstancia.refresh();
  });
  document.getElementById("btn-correr").addEventListener("click", ejecutarLab);
  document.getElementById("btn-reset").addEventListener("click", function(){
    setEditor(ej.inicial); guardarCodigo(ej.id, ej.inicial);
    document.getElementById("lab-salida").innerHTML = "";
  });
  document.getElementById("btn-sol").addEventListener("click", function(){
    setEditor(ej.solucion); guardarCodigo(ej.id, ej.solucion);
  });
}

/* Panel «Métodos que vas a usar»: sale de METODOS[id]. Si un método aparece en
   otros ejercicios, lo avisa (se agrupan por nombre exacto). */
function pintarMetodos(ej){
  var caja = document.getElementById("lab-metodos");
  var lista = (typeof METODOS !== "undefined" && METODOS[ej.id]) || [];
  if(!lista.length){ caja.style.display = "none"; return; }
  caja.style.display = "";
  caja.innerHTML =
    '<div class="sub">Modelo ' + ej.modelo + ' · ' + ej.ej + '</div>' +
    '<h3>Métodos que vas a usar (' + lista.length + ')</h3>' +
    '<p class="desc">Los que aparecen en la solución de este ejercicio, en el orden en que se usan. ' +
    'Si uno se repite en otro ejercicio, abajo te lo marca.</p>' +
    '<div class="metodos">' + lista.map(function(m){
      var otros = EJERCICIOS.filter(function(e){
        return e.id !== ej.id && (METODOS[e.id] || []).some(function(x){ return x.n === m.n; });
      }).map(function(e){ return e.modelo + " · " + e.ej; });
      return '<div class="metodo"><h5>' + esc(m.n) + '</h5>' +
        '<p>' + m.q + '</p>' +
        '<pre><code>' + esc(m.ej) + '</code></pre>' +
        (m.ojo ? '<p class="ojo"><b>Ojo</b>' + m.ojo + '</p>' : '') +
        (otros.length ? '<p class="tambien">También en: ' + esc(otros.join(" · ")) + '</p>' : '') +
        '</div>';
    }).join("") + '</div>';
}

function elegirEj(id){
  if(labActual) guardarCodigo(labActual, valorEditor());
  labActual = id;
  renderLab();
  window.scrollTo({ top:0, behavior:"smooth" });
}

function ejecutarLab(){
  var ej = EJERCICIOS.filter(function(e){ return e.id === labActual; })[0];
  var btn = document.getElementById("btn-correr");
  var codigo = valorEditor();
  guardarCodigo(ej.id, codigo);
  btn.disabled = true; btn.textContent = "Ejecutando…";

  asegurarPaquetes(ej.paquetes).then(function(){
    var res;
    try{
      py.globals.set("_files", JSON.stringify(ARCHIVOS));
      py.globals.set("_borrables", JSON.stringify(ej.limpiar || []));
      py.runPython("_reset_archivos(json.loads(_files))");
      py.runPython("_borrar(json.loads(_borrables))");
      py.globals.set("_cod", codigo);
      py.globals.set("_tj", JSON.stringify(ej.tests));
      var usaFig = ej.paquetes.indexOf("matplotlib") >= 0 ? "True" : "False";
      res = JSON.parse(py.runPython("_correr(_cod, _tj, " + usaFig + ")"));
    }catch(e){
      res = { salida:"", error:"El intérprete cortó de forma inesperada:\n" + String(e), tests:[], img:null };
    }
    pintarResultadoLab(ej, res);
    btn.disabled = false; btn.textContent = "Ejecutar y corregir";
  }).catch(function(err){
    estado(mensajeFalloPython(err), "error");
    btn.disabled = false; btn.textContent = "Ejecutar y corregir";
  });
}

function pintarResultadoLab(ej, res){
  var html = "";
  if(res.salida && res.salida.trim()){
    html += '<div class="salida-bloque"><h4>Salida</h4><pre class="salida">' + esc(res.salida) + '</pre></div>';
  }
  if(res.error){
    html += '<div class="salida-bloque"><h4>Tu código cortó con un error</h4><pre class="traza">' + esc(res.error) + '</pre></div>';
  }
  if(res.img){
    html += '<div class="salida-bloque"><h4>Figura generada</h4><div class="figura">' +
            '<img alt="gráfico generado por tu código" src="data:image/png;base64,' + res.img + '"></div></div>';
  }
  if(res.tests.length){
    var ok = res.tests.filter(function(t){ return t.ok; }).length;
    var todas = ok === res.tests.length;
    html += '<div class="salida-bloque"><h4>Corrección automática · ' + ok + ' de ' + res.tests.length + '</h4>' +
      '<div class="tests">' + res.tests.map(function(t){
        return '<div class="test' + (t.ok ? " ok" : "") + '"><span class="ic">' + (t.ok ? "✓" : "✕") + '</span>' +
          '<div>' + esc(t.nombre) + (t.ok ? "" : '<span class="det">' + esc(t.detalle) + '</span>') + '</div></div>';
      }).join("") + '</div>' +
      '<div class="' + (todas ? "exito" : "fallo") + '">' + (todas
        ? "Ejercicio resuelto: pasaste las " + res.tests.length + " verificaciones."
        : "Faltan " + (res.tests.length - ok) + " verificación(es). Mirá el detalle de las que fallaron.") +
      '</div></div>';
    if(todas) marcarResuelto(ej.id);
  } else if(res.error){
    html += '<div class="fallo">No se corrigió nada porque el programa cortó antes de terminar. ' +
            'Arreglá el error y volvé a ejecutar.</div>';
  }
  document.getElementById("lab-salida").innerHTML = html;
}

function verLab(){
  mostrar("v-lab");
  try{ localStorage.setItem("py-entrenador-lab-usado", "1"); }catch(e){}
  if(!labActual) labActual = EJERCICIOS[0].id;
  renderLab();

  if(!cmIntentado){
    cmIntentado = true;
    cargarCSS(CM_BASE + "codemirror.min.css")
      .then(function(){ return cargarScript(CM_BASE + "codemirror.min.js"); })
      .then(function(){ return cargarScript(CM_BASE + "mode/python/python.min.js"); })
      .then(function(){
        if(document.getElementById("v-lab").classList.contains("on")){
          guardarCodigo(labActual, valorEditor());
          renderLab();
        }
      })
      .catch(function(){ /* sin CodeMirror, el textarea alcanza */ });
  }

  if(!py && !pyCargando){
    arrancarPython().catch(function(err){ estado(mensajeFalloPython(err), "error"); });
  }
}

/* Arranque en caliente: si ya usaste el laboratorio antes, Python se baja en
   segundo plano. Ya está en la caché del navegador, así que casi no cuesta. */
try{
  if(localStorage.getItem("py-entrenador-lab-usado") === "1"){
    var precargar = function(){ if(!py && !pyCargando) arrancarPython().catch(function(){}); };
    if("requestIdleCallback" in window) requestIdleCallback(precargar, { timeout:4000 });
    else setTimeout(precargar, 2500);
  }
}catch(e){}

renderInicio();
})();
