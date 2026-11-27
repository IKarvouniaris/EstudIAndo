/* Laboratorio de Pensamiento Computacional — práctica libre.
   Escribís la solución en un editor, se ejecuta con Pyodide en el navegador y una batería de
   verificaciones (con las «reglas de oro» del examen: sin in, .index(), .sort() ni sorted()) la corrige.

   El progreso vive en localStorage: no habla con Supabase ni toca ningún ranking.
   Depende de js/entrenador-pensamiento-harness.js (HARNESS_PY) y js/entrenador-pensamiento-datos.js
   (GRUPOS, EJERCICIOS). Se verifica con tools/verificar_pensamiento.py. */
(function(){
"use strict";

/* ---------- Tema (compartido con el resto del sitio) ---------- */
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

var envoltorio = document.getElementById("envoltorio");
document.getElementById("btn-cerrar").addEventListener("click", function(){ envoltorio.classList.add("riel-oculto"); });
document.getElementById("btn-abrir").addEventListener("click", function(){ envoltorio.classList.remove("riel-oculto"); });

/* ---------- Progreso ---------- */
var K_LAB = "pc-lab-v1";
var K_COD = "pc-codigo-v1";
function leerJSON(k){ try{ return JSON.parse(localStorage.getItem(k)) || {}; }catch(e){ return {}; } }
function escribirJSON(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

var CM_BASE = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/";
var PYODIDE_BASE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
var py = null, pyCargando = null, cmIntentado = false, cmInstancia = null;
var labActual = null, grupoActual = "todos";

function ejercicio(id){ return EJERCICIOS.filter(function(e){ return e.id === id; })[0]; }
function grupoDe(e){ return GRUPOS.filter(function(g){ return g.id === e.grupo; })[0]; }

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
  el.className = "estado-py " + (clase || "");
  document.getElementById("estado-py-txt").innerHTML = txt;
}
function mensajeFalloPython(err){
  var base = "No se pudo iniciar Python: " + esc(err && err.message ? err.message : String(err)) + ".";
  if(location.protocol === "file:"){
    return base + " Estás abriendo el archivo con doble clic (<code>file://</code>). Serví la carpeta por HTTP: " +
      "<code>python -m http.server 8000</code>. Publicado en Vercel no hace falta nada de esto.";
  }
  return base + " La primera vez necesita conexión para descargar Python; después queda en la caché.";
}

function arrancarPython(){
  if(py) return Promise.resolve(py);
  if(pyCargando) return pyCargando;
  pyCargando = (function(){
    estado("Descargando el motor de Python (~10 MB). La primera vez tarda; después queda en la caché del navegador.", "cargando");
    return cargarScript(PYODIDE_BASE + "pyodide.js").then(function(){
      return loadPyodide({ indexURL: PYODIDE_BASE });
    }).then(function(inst){
      inst.runPython(HARNESS_PY);
      py = inst;
      estado("Python listo · el corrector controla también las reglas de oro (sin in, .index(), .sort(), sorted()).", "listo");
      return py;
    });
  })();
  pyCargando.catch(function(err){ pyCargando = null; estado(mensajeFalloPython(err), "error"); });
  return pyCargando;
}

function marcarResuelto(id){
  var h = leerJSON(K_LAB); h[id] = true; escribirJSON(K_LAB, h);
  pintarFichas();
}
function guardarCodigo(id, txt){ if(!id) return; var c = leerJSON(K_COD); c[id] = txt; escribirJSON(K_COD, c); }
function codigoGuardado(id){ return leerJSON(K_COD)[id]; }

/* ---------- Editor ---------- */
function montarEditor(valor){
  var host = document.getElementById("ed-host");
  host.innerHTML = '<textarea class="editor" id="ed-area" spellcheck="false"></textarea>';
  var ta = document.getElementById("ed-area");
  ta.value = valor;
  if(window.CodeMirror){
    cmInstancia = CodeMirror.fromTextArea(ta, {
      mode:"python", lineNumbers:true, indentUnit:4, tabSize:4, indentWithTabs:false, viewportMargin:Infinity
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

/* ---------- Selector de grupo y fichas ---------- */
function pintarGrupos(){
  var hechos = leerJSON(K_LAB);
  function cuenta(lista){
    return lista.filter(function(e){ return hechos[e.id]; }).length + "/" + lista.length;
  }
  var html = '<button class="grupo' + (grupoActual === "todos" ? " on" : "") + '" type="button" data-grupo="todos">Todos <i>' + cuenta(EJERCICIOS) + '</i></button>';
  GRUPOS.forEach(function(g){
    var lista = EJERCICIOS.filter(function(e){ return e.grupo === g.id; });
    html += '<button class="grupo' + (grupoActual === g.id ? " on" : "") + '" type="button" data-grupo="' + g.id + '" title="' + esc(g.desc) + '">' +
      esc(g.nombre) + ' <i>' + cuenta(lista) + '</i></button>';
  });
  document.getElementById("lab-grupos").innerHTML = html;
  var bs = document.querySelectorAll("[data-grupo]"), i;
  for(i = 0; i < bs.length; i++){
    bs[i].addEventListener("click", function(){
      grupoActual = this.getAttribute("data-grupo");
      pintarGrupos(); pintarFichas();
      var g = GRUPOS.filter(function(x){ return x.id === grupoActual; })[0];
      document.getElementById("lab-grupo-desc").textContent = g ? g.desc : "Los " + EJERCICIOS.length + " ejercicios, en el orden de la guía.";
    });
  }
}

function pintarFichas(){
  var hechos = leerJSON(K_LAB);
  var lista = EJERCICIOS.filter(function(e){ return grupoActual === "todos" || e.grupo === grupoActual; });
  document.getElementById("lab-fichas").innerHTML = lista.map(function(e){
    return '<button class="ficha-ej' + (e.id === labActual ? " on" : "") + (hechos[e.id] ? " hecho" : "") +
      '" type="button" data-ej="' + e.id + '" title="' + esc(e.titulo) + '">' +
      '<span class="mk">' + (hechos[e.id] ? "✓" : "○") + '</span>' + e.ej + ' · ' + esc(e.titulo) + '</button>';
  }).join("");
  var bs = document.querySelectorAll("[data-ej]"), i;
  for(i = 0; i < bs.length; i++){
    bs[i].addEventListener("click", function(){ elegirEj(this.getAttribute("data-ej")); });
  }
  var total = EJERCICIOS.length;
  var hechosN = EJERCICIOS.filter(function(e){ return hechos[e.id]; }).length;
  document.getElementById("progreso-txt").textContent = hechosN + " de " + total + " resueltos";
  document.getElementById("progreso-barra").style.width = Math.round(hechosN / total * 100) + "%";
}

/* ---------- Un ejercicio ---------- */
function renderLab(){
  pintarFichas();
  var ej = ejercicio(labActual);

  document.getElementById("lab-enunciado").innerHTML =
    '<div class="sub">' + esc(grupoDe(ej).nombre) + ' · ' + ej.ej + '</div>' +
    '<h3>' + ej.titulo + '</h3>' +
    '<p class="desc">' + ej.enunciado + '</p>' +
    '<h4>Ejemplos</h4><pre><code>' + esc(ej.datos) + '</code></pre>' +
    '<h4>Tareas</h4><ol class="tareas">' + ej.tareas.map(function(t){ return "<li>" + t + "</li>"; }).join("") + '</ol>' +
    '<h4>Qué se evalúa</h4><div class="evalua">' + ej.variables.map(function(v){
      return '<div><code>' + esc(v[0]) + '</code><span>' + v[1] + '</span></div>';
    }).join("") + '</div>' +
    (ej.regla ? '<p class="aviso-ej regla"><b>Reglas de oro:</b> sin el operador <code>in</code>, <code>.index()</code>, <code>.sort()</code> ni <code>sorted()</code>' +
      (ej.prohibido && ej.prohibido.length ? ' (acá tampoco: ' + ej.prohibido.map(function(p){ return "<code>" + (p === "slice" ? "[a:b]" : p + "()") + "</code>"; }).join(", ") + ')' : "") +
      '. El corrector lo revisa.</p>' : "") +
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
  try{ history.replaceState(null, "", "#" + ej.id); }catch(e){}
}

function elegirEj(id){
  if(labActual) guardarCodigo(labActual, valorEditor());
  labActual = id;
  renderLab();
  window.scrollTo({ top:0, behavior:"smooth" });
}

function ejecutarLab(){
  var ej = ejercicio(labActual);
  var btn = document.getElementById("btn-correr");
  var codigo = valorEditor();
  guardarCodigo(ej.id, codigo);
  btn.disabled = true; btn.textContent = "Ejecutando…";
  arrancarPython().then(function(){
    var res;
    try{
      py.globals.set("_cod", codigo);
      py.globals.set("_tj", JSON.stringify(ej.tests));
      py.globals.set("_en", JSON.stringify(ej.entradas || []));
      py.globals.set("_ex", JSON.stringify(ej.prohibido || []));
      py.globals.set("_rg", !!ej.regla);
      res = JSON.parse(py.runPython("_correr(_cod, _tj, _en, _ex, _rg)"));
    }catch(e){
      res = { salida:"", error:"El intérprete cortó de forma inesperada:\n" + String(e), tests:[] };
    }
    pintarResultado(ej, res);
    btn.disabled = false; btn.textContent = "Ejecutar y corregir";
  }).catch(function(){
    btn.disabled = false; btn.textContent = "Ejecutar y corregir";
  });
}

function pintarResultado(ej, res){
  var html = "";
  if(res.salida && res.salida.trim()){
    html += '<div class="salida-bloque"><h4>Salida</h4><pre class="salida">' + esc(res.salida) + '</pre></div>';
  }
  if(res.error){
    html += '<div class="salida-bloque"><h4>Tu código cortó con un error</h4><pre class="traza">' + esc(res.error) + '</pre></div>';
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
        : "Faltan " + (res.tests.length - ok) + " verificación(es). Mirá el detalle de las que fallaron.") + '</div></div>';
    if(todas) marcarResuelto(ej.id);
  } else if(res.error){
    html += '<div class="fallo">No se corrigió nada porque el programa cortó antes de terminar. Arreglá el error y volvé a ejecutar.</div>';
  }
  document.getElementById("lab-salida").innerHTML = html;
}

/* ---------- Arranque ---------- */
function iniciar(){
  var h = (location.hash || "").replace("#", "");
  var ej = h ? ejercicio(h) : null;
  if(!ej){
    var hechos = leerJSON(K_LAB);
    ej = EJERCICIOS.filter(function(e){ return !hechos[e.id]; })[0] || EJERCICIOS[0];
  }
  labActual = ej.id;
  pintarGrupos();
  renderLab();
  document.getElementById("lab-grupo-desc").textContent = "Los " + EJERCICIOS.length + " ejercicios, en el orden de la guía.";
  cargarCSS(CM_BASE + "codemirror.min.css")
    .then(function(){ return cargarScript(CM_BASE + "codemirror.min.js"); })
    .then(function(){ return cargarScript(CM_BASE + "mode/python/python.min.js"); })
    .then(function(){ guardarCodigo(labActual, valorEditor()); renderLab(); })
    .catch(function(){ /* sin CodeMirror se usa el textarea */ });
  /* Se empieza a bajar Python en cuanto se abre la página, para que «Ejecutar» responda rápido. */
  arrancarPython().catch(function(){});
}
iniciar();

})();
