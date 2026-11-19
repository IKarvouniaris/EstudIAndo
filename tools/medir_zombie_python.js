/* Mide el mazo de Python de Parcial Zombie (js/zombie-python.js) contra las reglas de opciones del repo:
   cuatro opciones distintas, consigna en pregunta y en positivo, opciones de largo parecido y sin palabras que delaten,
   y que la correcta (ops[0]) no sea sistemáticamente la más larga ni la más corta.
   Las opciones son todas frases con punto final o todas código/nombres sin punto (no se mezclan en una pregunta).
   Cuenta lo que se puede contar; que la respuesta sea la única defendible hay que leerlo.
   Uso: node tools/medir_zombie_python.js   (sale con código 1 si algo no cumple) */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const caja = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "js", "zombie-python.js"), "utf8"), caja);
const NIVELES = caja.window.NIVELES_ZOMBIE_PYTHON;
const html = fs.readFileSync(path.join(__dirname, "..", "python.html"), "utf8");

let fallas = 0;
const falla = (m) => { fallas++; console.log("  ✗ " + m); };
const DELATA = /\b(siempre|nunca|ningun[oa]?|jamás|todos|todas|únicamente)\b/i;
const NEGATIVA = /(\bNO\b|\bno es\b|\bexcepto\b|\bsalvo\b|\bincorrect[oa]\b|\bfals[oa]\b)/;
const NOMBRA = /(cátedra|catedra|profesor|\bprofe\b|docente|\bclase \d|en clase)/i;
const pos = { larga: 0, media: 0, corta: 0 };
const letras = [0, 0, 0, 0];
const vistas = new Set();
let total = 0;

NIVELES.forEach((n) => {
  console.log(`  nivel ${n.orden} (clase ${n.clase}): ${n.preguntas.length} preguntas · ${n.titulo}`);
  if (!new RegExp(`id="c${n.clase}"`).test(html)) falla(`nivel ${n.orden}: python.html no tiene la sección #c${n.clase}`);
  n.preguntas.forEach((p, k) => {
    total++;
    const id = `n${n.orden} #${k + 1}`;
    if (!p.q || !p.porque || !p.tema || !Array.isArray(p.ops) || p.ops.length !== 4) { falla(`${id}: faltan campos o no tiene 4 opciones`); return; }
    if (vistas.has(p.q)) falla(`${id}: consigna repetida`);
    vistas.add(p.q);
    if (!/\?$/.test(p.q.trim())) falla(`${id}: la consigna no termina en una pregunta`);
    if (p.q.length > 190) falla(`${id}: la consigna tiene ${p.q.length} caracteres (máximo 190)`);
    if (NEGATIVA.test(p.q)) falla(`${id}: la consigna está en negativo`);
    if (new Set(p.ops).size !== 4) falla(`${id}: opciones repetidas`);
    const L = p.ops.map((o) => o.length), max = Math.max(...L), min = Math.min(...L);
    if (max > 46) falla(`${id}: una opción pasa de 46 caracteres: «${p.ops[L.indexOf(max)]}»`);
    if (max - min > 16) falla(`${id}: largos desparejos (${L.join(" / ")}): «${p.q}»`);
    const conPunto = p.ops.filter((o) => /\.$/.test(o)).length;
    if (conPunto !== 0 && conPunto !== 4) falla(`${id}: unas opciones cierran con punto y otras no`);
    p.ops.forEach((o) => { if (DELATA.test(o)) falla(`${id}: opción con palabra que delata: «${o}»`); });
    if (p.ops.slice(1).some((o) => o.toLowerCase().includes(p.tema.toLowerCase())) === false && p.ops[0].toLowerCase().includes(p.tema.toLowerCase())) falla(`${id}: el tema regala la respuesta`);
    [p.q, p.porque, p.tema].concat(p.ops).forEach((t) => { if (NOMBRA.test(t)) falla(`${id}: nombra al profesor, la cátedra o la clase: «${t}»`); });
    if (L[0] === max && L.filter((x) => x === max).length === 1) pos.larga++;
    else if (L[0] === min && L.filter((x) => x === min).length === 1) pos.corta++;
    else pos.media++;
  });
});

console.log(`Preguntas: ${total} en ${NIVELES.length} niveles`);
console.log(`La correcta es la más larga en ${pos.larga}, la más corta en ${pos.corta} y ni una ni otra en ${pos.media}.`);
const tope = Math.ceil(total * 0.3);
if (pos.larga > tope) falla(`la correcta es la más larga en ${pos.larga} de ${total} (máximo ${tope})`);
if (pos.corta > tope) falla(`la correcta es la más corta en ${pos.corta} de ${total} (máximo ${tope})`);
console.log(fallas ? `\n${fallas} problema(s).` : "\nTodo en regla.");
process.exit(fallas ? 1 : 0);
