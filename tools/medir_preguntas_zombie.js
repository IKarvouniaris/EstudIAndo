/* Mide el banco de Parcial Zombie (js/preguntas-zombie-ia.js) contra las reglas de opciones del repo:
   que la correcta no sea sistemáticamente la más larga ni la más corta, que los largos sean parejos y
   que ninguna opción se delate con «siempre / nunca / ninguno / todos / jamás».
   Uso: node tools/medir_preguntas_zombie.js   (sale con código 1 si algo no cumple) */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const src = fs.readFileSync(path.join(__dirname, "..", "js", "preguntas-zombie-ia.js"), "utf8");
const caja = { window: {} };
vm.runInNewContext(src, caja);
const P = caja.window.PREGUNTAS_ZOMBIE_IA;

let fallas = 0;
const falla = (m) => { fallas++; console.log("  ✗ " + m); };
const pos = { larga: 0, media: 0, corta: 0 };
const DELATA = /\b(siempre|nunca|ningun[oa]?|jamás|todos|todas|únicamente)\b/i;
// las preguntas van sobre el contenido, sin nombrar al profesor, a la cátedra ni «la clase N»
const NOMBRA = /(cátedra|catedra|profesor|\bprofe\b|docente|didáctica|\bclase \d|en clase|trampa de examen)/i;

console.log(`Preguntas: ${P.length}`);
if (P.length !== 30) falla(`se esperaban 30 preguntas y hay ${P.length}`);
const ids = new Set();
const porClase = {};

for (const p of P) {
  if (ids.has(p.id)) falla(`id repetido: ${p.id}`);
  ids.add(p.id);
  porClase[p.clase] = (porClase[p.clase] || 0) + 1;
  if (!p.q || !p.porque || !Array.isArray(p.ops) || p.ops.length !== 3) { falla(`#${p.id}: faltan campos o no tiene 3 opciones`); continue; }
  const L = p.ops.map((o) => o.length);
  const max = Math.max(...L), min = Math.min(...L);
  if (L[0] === max && L[0] !== min && L.filter((x) => x === max).length === 1) pos.larga++;
  else if (L[0] === min && L[0] !== max && L.filter((x) => x === min).length === 1) pos.corta++;
  else pos.media++;
  if (max - min > 12) falla(`#${p.id}: largos desparejos (${L.join(" / ")})`);
  if (max > 68) falla(`#${p.id}: una opción pasa de 68 caracteres (${max}) y no entra bien en un celular`);
  if (p.q.length > 150) falla(`#${p.id}: la consigna tiene ${p.q.length} caracteres (máximo 150)`);
  p.ops.forEach((o, i) => { if (DELATA.test(o)) falla(`#${p.id}: la opción ${i} usa una palabra que delata: «${o}»`); });
  if (new Set(p.ops).size !== 3) falla(`#${p.id}: opciones repetidas`);
  [p.q, p.porque].concat(p.ops).forEach((txt) => { if (NOMBRA.test(txt)) falla(`#${p.id}: nombra al profesor, la cátedra o la clase: «${txt}»`); });
}

console.log("Por clase:", JSON.stringify(porClase));
console.log(`La correcta es la más larga en ${pos.larga}, la más corta en ${pos.corta} y ni una ni otra en ${pos.media}.`);
if (pos.larga > 12) falla(`la correcta es la más larga en ${pos.larga} de ${P.length} (máximo 12)`);
if (pos.corta > 12) falla(`la correcta es la más corta en ${pos.corta} de ${P.length} (máximo 12)`);

console.log(fallas ? `\n${fallas} problema(s).` : "\nTodo en regla.");
process.exit(fallas ? 1 : 0);
