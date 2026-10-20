// Genera js/mazos/calculo.js (las flashcards de Cálculo para Poris) a partir del array MODULES de calculo.html.
// Cada tema aporta hasta tres tarjetas: su definición ("¿Qué es?"), a dónde hay que llegar ("goal")
// y cada señal "Si ves X → hacé Y" que tenga flecha.
//
// Uso (desde la raíz del repo):  node tools/generar_mazo_calculo.js
// Si cambia un texto de calculo.html, se vuelve a correr y se commitea el resultado.
const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(RAIZ, "calculo.html"), "utf8");

const ini = html.indexOf("const MODULES = [");
if (ini < 0) throw new Error("no encuentro MODULES en calculo.html");
const j = html.indexOf("[", ini);
const cierre = /\r?\n\];/.exec(html.slice(j));
if (!cierre) throw new Error("no encuentro el cierre de MODULES");
const MODULES = eval(html.slice(j, j + cierre.index + cierre[0].length - 1)); // hasta el "]", sin el ";"

const mayus = s => (/^[a-záéíóúñ]/.test(s) ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const tarjetas = [];
const avisos = [];

// El primer módulo es el plan de estudio (no tiene teoría): se saltea.
MODULES.slice(1).forEach((modulo, mi) => {
  const c = String(mi); // "0" = Módulo 0, "1" = Unidad I, ...
  modulo.topics.forEach(t => {
    if (!t.what) return;
    tarjetas.push({ c, tipo: "Definición", sub: "¿Qué es?", p: t.title, r: t.what.trim() });

    if (Array.isArray(t.goal) && t.goal.length) {
      tarjetas.push({
        c, tipo: "A dónde llegar", sub: "¿A dónde tengo que llegar?",
        p: t.title,
        r: t.goal.map(g => "<p>" + g.trim() + "</p>").join(""),
      });
    }

    (t.signals || []).forEach(sig => {
      const k = sig.indexOf("→");
      if (k < 0) return;
      const antes = sig.slice(0, k).trim(), despues = sig.slice(k + 1).trim();
      if (!antes || !despues) { avisos.push("señal incompleta en «" + t.title + "»"); return; }
      tarjetas.push({ c, tipo: "Señal", s: t.title, sub: "Si te aparece esto, ¿qué hacés?", p: antes, r: mayus(despues) });
    });
  });
});

// Controles: signos $ pares y claves repetidas.
const vistos = new Set();
tarjetas.forEach(t => {
  ["p", "r"].forEach(campo => {
    const n = (t[campo].match(/(?<!\\)\$/g) || []).length;
    if (n % 2) avisos.push("$ impares en " + campo + " de «" + (t.s || t.p) + "»");
  });
  const clave = t.tipo + "|" + t.p;
  if (vistos.has(clave)) avisos.push("tarjeta repetida: " + clave);
  vistos.add(clave);
});

const cuerpo =
  "/* Flashcards de Cálculo I para poris.html. GENERADO por tools/generar_mazo_calculo.js a partir de calculo.html: no editar a mano. */\n" +
  "window.MAZOS = window.MAZOS || {};\n" +
  'window.MAZOS["calculo"] = [\n' +
  tarjetas.map(t => "  " + JSON.stringify(t)).join(",\n") +
  "\n];\n";
fs.writeFileSync(path.join(RAIZ, "js", "mazos", "calculo.js"), cuerpo, "utf8");

const porTipo = {};
tarjetas.forEach(t => { porTipo[t.tipo] = (porTipo[t.tipo] || 0) + 1; });
console.log(tarjetas.length + " tarjetas", porTipo);
if (avisos.length) { console.log("AVISOS:"); avisos.forEach(a => console.log(" - " + a)); }
