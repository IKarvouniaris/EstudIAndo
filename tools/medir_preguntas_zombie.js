/* Mide el banco de Parcial Zombie de Intro a la IA (js/preguntas-zombie-ia.js) contra las pautas de redacción
   que están en la cabecera de ese archivo y las reglas de opciones del repo. Controla lo que se puede contar;
   que la pregunta sea clara y evalúe un solo concepto hay que leerlo.
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
const llano = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

// palabras absolutas que delatan una opción
const DELATA = /\b(siempre|nunca|ningun[oa]?|jamás|todos|todas|únicamente|todas las anteriores|ninguna de las anteriores)\b/i;
// las preguntas van sobre el contenido, sin nombrar al profesor, a la cátedra ni «la clase N»
const NOMBRA = /(cátedra|catedra|profesor|\bprofe\b|docente|didáctica|\bclase \d|en clase|trampa de examen)/i;
// consignas en negativo
const NEGATIVA = /(\bNO\b|\bno es\b|\bexcepto\b|\bsalvo\b|\bincorrect[oa]\b|\bfals[oa]\b)/;
// opciones con dos ideas: «Concepto: su definición», «Sí, porque…», «No: …»
const COMPUESTA = /(: |^(sí|si|no)\b[,:]?)/i;

console.log(`Preguntas: ${P.length}`);
if (P.length !== 30) falla(`se esperaban 30 preguntas y hay ${P.length}`);
const ids = new Set();
const porClase = {};
const temas = {};

for (const p of P) {
  if (ids.has(p.id)) falla(`id repetido: ${p.id}`);
  ids.add(p.id);
  porClase[p.clase] = (porClase[p.clase] || 0) + 1;
  if (!p.q || !p.porque || !p.tema || !Array.isArray(p.ops) || p.ops.length !== 3) { falla(`#${p.id}: faltan campos (tema, q, porque) o no tiene 3 opciones`); continue; }
  temas[p.tema] = (temas[p.tema] || 0) + 1;

  // 1. el tema nombra el área, no la respuesta
  if (llano(p.ops[0]).includes(llano(p.tema)) && !p.ops.slice(1).some((o) => llano(o).includes(llano(p.tema)))) falla(`#${p.id}: el tema «${p.tema}» regala la respuesta`);
  // 2. la consigna es una pregunta directa
  if (!/\?$/.test(p.q.trim())) falla(`#${p.id}: la consigna no termina en una pregunta`);
  if (p.q.length > 150) falla(`#${p.id}: la consigna tiene ${p.q.length} caracteres (máximo 150)`);
  // 3. en positivo
  if (NEGATIVA.test(p.q)) falla(`#${p.id}: la consigna está en negativo: «${p.q}»`);
  // 4. opciones cortas, paralelas y de una sola idea
  const L = p.ops.map((o) => o.length);
  const max = Math.max(...L), min = Math.min(...L);
  if (max > 50) falla(`#${p.id}: una opción pasa de 50 caracteres (${max})`);
  if (max - min > 12) falla(`#${p.id}: largos desparejos (${L.join(" / ")})`);
  p.ops.forEach((o, i) => {
    if (COMPUESTA.test(o)) falla(`#${p.id}: la opción ${i} mete dos ideas («Concepto: definición» o «Sí/No, porque…»): «${o}»`);
    if (DELATA.test(o)) falla(`#${p.id}: la opción ${i} usa una palabra que delata: «${o}»`);
  });
  const cierres = new Set(p.ops.map((o) => (/[.?…]$/.test(o) ? o.slice(-1) : "")));
  if (cierres.size > 1) falla(`#${p.id}: las opciones no cierran igual (unas con punto y otras no)`);
  if (new Set(p.ops.map(llano)).size !== 3) falla(`#${p.id}: opciones repetidas`);
  // 6. la correcta no se delata por el largo
  if (L[0] === max && L.filter((x) => x === max).length === 1) pos.larga++;
  else if (L[0] === min && L.filter((x) => x === min).length === 1) pos.corta++;
  else pos.media++;
  // 8. sin referencias al profesor, la cátedra o la clase
  [p.q, p.porque, p.tema].concat(p.ops).forEach((txt) => { if (NOMBRA.test(txt)) falla(`#${p.id}: nombra al profesor, la cátedra o la clase: «${txt}»`); });
}

console.log("Por clase:", JSON.stringify(porClase));
console.log(`Temas distintos: ${Object.keys(temas).length}`);
console.log(`La correcta es la más larga en ${pos.larga}, la más corta en ${pos.corta} y ni una ni otra en ${pos.media}.`);
if (pos.larga > 12) falla(`la correcta es la más larga en ${pos.larga} de ${P.length} (máximo 12)`);
if (pos.corta > 12) falla(`la correcta es la más corta en ${pos.corta} de ${P.length} (máximo 12)`);

console.log(fallas ? `\n${fallas} problema(s).` : "\nTodo en regla.");
process.exit(fallas ? 1 : 0);
