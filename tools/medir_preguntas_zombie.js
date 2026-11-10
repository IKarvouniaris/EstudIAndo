/* Mide el banco de Parcial Zombie de Intro a la IA (js/preguntas-zombie-ia.js y js/zombie-ia/cNN.js) contra las
   pautas de redacción que están en la cabecera de js/preguntas-zombie-ia.js y las reglas de opciones del repo, y
   comprueba que NINGÚN apartado de las clases 7 a 12 de ia-conceptual.html quede sin preguntas.
   Controla lo que se puede contar; que la pregunta sea clara y evalúe un solo concepto hay que leerlo.
   Uso: node tools/medir_preguntas_zombie.js   (sale con código 1 si algo no cumple) */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const RAIZ = path.join(__dirname, "..");
const caja = { window: {} };
const archivos = [path.join(RAIZ, "js", "preguntas-zombie-ia.js")]
  .concat(fs.readdirSync(path.join(RAIZ, "js", "zombie-ia")).filter((f) => /^c\d+\.js$/.test(f)).sort().map((f) => path.join(RAIZ, "js", "zombie-ia", f)));
archivos.forEach((f) => vm.runInNewContext(fs.readFileSync(f, "utf8"), caja));
const NIVELES = caja.window.NIVELES_ZOMBIE_IA.slice().sort((a, b) => a.clase - b.clase);
const P = [];
NIVELES.forEach((n) => n.preguntas.forEach((p) => P.push(Object.assign({ clase: n.clase }, p))));

let fallas = 0;
const falla = (m) => { fallas++; console.log("  ✗ " + m); };
const pos = { larga: 0, media: 0, corta: 0 };
const llano = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

// palabras absolutas que delatan una opción
const DELATA = /\b(siempre|nunca|ningun[oa]?|jamás|todos|todas|únicamente|todas las anteriores|ninguna de las anteriores)\b/i;
// las preguntas van sobre el contenido, sin nombrar al profesor, a la cátedra ni «la clase N»
const NOMBRA = /(cátedra|catedra|profesor|\bprofe\b|docente|didáctica|\bclase \d|en clase|trampa de examen)/i;
// consignas en negativo
const NEGATIVA = /(\bNO\b|\bno es\b|\bexcepto\b|\bsalvo\b|\bincorrect[oa]\b|\bfals[oa]\b)/;
// opciones con dos ideas: «Concepto: su definición», «Sí, porque…», «No: …»
const COMPUESTA = /(: |^(sí|si|no)\b[,:]?)/i;

console.log(`Preguntas: ${P.length} en ${NIVELES.length} niveles`);
const ids = new Set();
const temas = {};
const porRef = {};

NIVELES.forEach((n) => {
  if (!n.titulo) falla(`el nivel de la clase ${n.clase} no tiene título`);
  console.log(`  clase ${n.clase}: ${n.preguntas.length} preguntas · ${n.titulo}`);
});

P.forEach((p, k) => {
  const id = `c${p.clase} #${k + 1}`;
  if (!p.q || !p.porque || !p.tema || !p.ref || !Array.isArray(p.ops) || p.ops.length !== 3) { falla(`${id}: faltan campos (ref, tema, q, porque) o no tiene 3 opciones`); return; }
  if (ids.has(p.q)) falla(`${id}: consigna repetida`);
  ids.add(p.q);
  temas[p.tema] = (temas[p.tema] || 0) + 1;
  porRef[p.ref] = (porRef[p.ref] || 0) + 1;
  if (!new RegExp("^" + p.clase + "\\.\\d+$").test(p.ref)) falla(`${id}: ref «${p.ref}» no es un apartado de la clase ${p.clase}`);

  // 1. el tema nombra el área, no la respuesta
  if (llano(p.ops[0]).includes(llano(p.tema)) && !p.ops.slice(1).some((o) => llano(o).includes(llano(p.tema)))) falla(`${id}: el tema «${p.tema}» regala la respuesta`);
  // 2. la consigna es una pregunta directa
  if (!/\?$/.test(p.q.trim())) falla(`${id}: la consigna no termina en una pregunta`);
  if (p.q.length > 150) falla(`${id}: la consigna tiene ${p.q.length} caracteres (máximo 150)`);
  // 3. en positivo
  if (NEGATIVA.test(p.q)) falla(`${id}: la consigna está en negativo: «${p.q}»`);
  // 4. opciones cortas, paralelas y de una sola idea
  const L = p.ops.map((o) => o.length);
  const max = Math.max(...L), min = Math.min(...L);
  if (max > 50) falla(`${id}: una opción pasa de 50 caracteres (${max}): «${p.ops[L.indexOf(max)]}»`);
  if (max - min > 12) falla(`${id}: largos desparejos (${L.join(" / ")}): «${p.q}»`);
  p.ops.forEach((o, i) => {
    if (COMPUESTA.test(o)) falla(`${id}: la opción ${i} mete dos ideas («Concepto: definición» o «Sí/No, porque…»): «${o}»`);
    if (DELATA.test(o)) falla(`${id}: la opción ${i} usa una palabra que delata: «${o}»`);
  });
  const cierres = new Set(p.ops.map((o) => (/[.?…]$/.test(o) ? o.slice(-1) : "")));
  if (cierres.size > 1) falla(`${id}: las opciones no cierran igual (unas con punto y otras no): «${p.q}»`);
  if (new Set(p.ops.map(llano)).size !== 3) falla(`${id}: opciones repetidas`);
  // 6. la correcta no se delata por el largo
  if (L[0] === max && L.filter((x) => x === max).length === 1) pos.larga++;
  else if (L[0] === min && L.filter((x) => x === min).length === 1) pos.corta++;
  else pos.media++;
  // 8. sin referencias al profesor, la cátedra o la clase
  [p.q, p.porque, p.tema].concat(p.ops).forEach((txt) => { if (NOMBRA.test(txt)) falla(`${id}: nombra al profesor, la cátedra o la clase: «${txt}»`); });
});

// cobertura: todos los apartados (h3 «N.M · …») de las clases 7 a 12 del apunte tienen al menos una pregunta
const html = fs.readFileSync(path.join(RAIZ, "ia-conceptual.html"), "utf8");
let apartados = 0, sin = [];
for (let c = 7; c <= 12; c++) {
  const sec = html.match(new RegExp('<section id="c' + c + '"[\\s\\S]*?</section>'));
  if (!sec) { falla(`no encontré la clase ${c} en ia-conceptual.html`); continue; }
  const refs = [...sec[0].matchAll(/<h3[^>]*>\s*(\d+\.\d+)\s*·/g)].map((m) => m[1]);
  apartados += refs.length;
  refs.forEach((r) => { if (!porRef[r]) sin.push(r); });
}
console.log(`Apartados del apunte (clases 7 a 12): ${apartados}, con pregunta: ${apartados - sin.length}`);
if (sin.length) falla(`apartados sin ninguna pregunta: ${sin.join(", ")}`);
Object.keys(porRef).forEach((r) => { const c = r.split(".")[0]; if (!html.match(new RegExp('<h3[^>]*>\\s*' + r.replace(".", "\\.") + '\\s*·'))) falla(`la ref «${r}» no es un apartado de ia-conceptual.html`); });

console.log(`Temas distintos: ${Object.keys(temas).length}`);
console.log(`La correcta es la más larga en ${pos.larga}, la más corta en ${pos.corta} y ni una ni otra en ${pos.media}.`);
const tope = Math.ceil(P.length * 0.4);
if (pos.larga > tope) falla(`la correcta es la más larga en ${pos.larga} de ${P.length} (máximo ${tope})`);
if (pos.corta > tope) falla(`la correcta es la más corta en ${pos.corta} de ${P.length} (máximo ${tope})`);

console.log(fallas ? `\n${fallas} problema(s).` : "\nTodo en regla.");
process.exit(fallas ? 1 : 0);
