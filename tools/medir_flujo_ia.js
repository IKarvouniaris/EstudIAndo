/* Mide los datos de «Armá el flujo» (js/flujo-ia-datos.js): que cada solución modelo apruebe todos los criterios
   (los generales y los de la situación), que las cajas, los carriles y las filas sean válidos, que los criterios
   nombren cajas que existen y que cada caja apunte a un apartado real de ia-conceptual.html.
   Uso: node tools/medir_flujo_ia.js   (sale con código 1 si algo no cumple) */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const RAIZ = path.join(__dirname, "..");
const caja = { window: {} };
caja.window.window = caja.window;
["js/flujo-ia-datos.js", "js/flujo-ia-eval.js"].forEach((f) => vm.runInNewContext(fs.readFileSync(path.join(RAIZ, f), "utf8"), caja.window.window ? Object.assign(caja, { window: caja.window }) : caja));
const F = caja.window.FLUJO_IA, M = caja.window.FlujoIA;
if (!F || !M) { console.log("  ✗ no se pudieron cargar los datos"); process.exit(1); }

let fallas = 0;
const falla = (m) => { fallas++; console.log("  ✗ " + m); };
const ids = Object.keys(M.CAJA);

// ---- catálogo
const porFam = {};
F.cajas.forEach((c) => { porFam[c[1]] = (porFam[c[1]] || 0) + 1; });
const fams = F.familias.map((f) => f.id);
console.log(`Cajas: ${F.cajas.length} (${F.cajas.filter((c) => c[5]).length} trampas) · ${Object.keys(porFam).map((f) => f + " " + porFam[f]).join(", ")}`);
if (new Set(F.cajas.map((c) => c[0])).size !== F.cajas.length) falla("hay ids de caja repetidos");
F.cajas.forEach((c) => {
  if (fams.indexOf(c[1]) < 0) falla(`${c[0]}: familia desconocida «${c[1]}»`);
  if (c[2].length > 28) falla(`${c[0]}: el título pasa de 28 caracteres (${c[2].length})`);
  if (c[3].length > 34) falla(`${c[0]}: el subtítulo pasa de 34 caracteres (${c[3].length})`);
});

(F.entradas || []).forEach((i) => { if (!M.CAJA[i]) falla(`entradas: la caja «${i}» no existe`); });
console.log(`Cajas solo de entrada: ${(F.entradas || []).join(", ")}`);

// ---- frases de la respuesta del parcial: cada caja que no es trampa tiene la suya, y no sobran
ids.filter((i) => !M.CAJA[i].trampa).forEach((i) => { if (!F.frases || !F.frases[i]) falla(`la caja «${i}» no tiene frase para la respuesta del parcial`); });
Object.keys(F.frases || {}).forEach((i) => { if (!M.CAJA[i]) falla(`hay una frase para «${i}», que no es una caja`); else if (M.CAJA[i].trampa) falla(`la trampa «${i}» no debería tener frase (se explica con su porqué)`); });
Object.keys(F.seccion || {}).forEach((i) => { if (!M.CAJA[i]) falla(`seccion: la caja «${i}» no existe`); });

// ---- refs reales del apunte
const html = fs.readFileSync(path.join(RAIZ, "ia-conceptual.html"), "utf8");
const hay = (r) => new RegExp("<h3[^>]*>\\s*" + r.replace(".", "\\.") + "\\s*·").test(html);
const refs = new Set();
F.cajas.forEach((c) => refs.add(c[4]));
F.situaciones.forEach((s) => s.crit.forEach((c) => refs.add(c.r)));
refs.forEach((r) => { if (!hay(r)) falla(`la ref «${r}» no es un apartado de ia-conceptual.html`); });

// ---- una solución: válida y aprobada
function revisar(nombre, n, e, sit) {
  const usados = new Set();
  n.forEach((x) => {
    if (!M.CAJA[x[0]]) falla(`${nombre}: la caja «${x[0]}» no existe`);
    if (x[1] < 0 || x[1] > 3) falla(`${nombre}: carril fuera de rango en ${x[0]}`);
    if (x[2] < 0 || x[2] > 4) falla(`${nombre}: fila fuera de rango en ${x[0]}`);
    const k = x[1] + "," + x[2];
    if (usados.has(k)) falla(`${nombre}: dos cajas en el mismo lugar (carril ${x[1]}, fila ${x[2]})`);
    usados.add(k);
  });
  const puestas = n.map((x) => x[0]);
  if (new Set(puestas).size !== puestas.length) falla(`${nombre}: una caja está repetida`);
  e.forEach((x) => {
    if (puestas.indexOf(x[0]) < 0 || puestas.indexOf(x[1]) < 0) falla(`${nombre}: el cable ${x.join(" → ")} une una caja que no está`);
    if (M.CAJA[x[1]] && M.CAJA[x[1]].entrada) falla(`${nombre}: el cable ${x.join(" → ")} entra a una caja que es solo de entrada`);
  });
  if (sit) {
    const r = M.evaluar(puestas, e, sit);
    r.criterios.filter((c) => !c.ok).forEach((c) => falla(`${nombre}: la solución modelo NO cumple «${c.t}»`));
    console.log(`  ${nombre}: ${n.length} cajas, ${e.length} cables, ${r.oks} de ${r.total} criterios`);
  } else console.log(`  ${nombre}: ${n.length} cajas, ${e.length} cables`);
}
console.log("Soluciones modelo:");
revisar("ejemplo (situación " + F.demo.id + ")", F.demo.n, F.demo.e, null);
F.situaciones.forEach((s) => {
  revisar(`situación ${s.id} · ${s.titulo}`, s.modelo.n, s.modelo.e, s);
  s.crit.forEach((c) => {
    ["todas", "alguna"].forEach((k) => (c[k] || []).forEach((i) => { if (!M.CAJA[i] && i.charAt(0) !== "@") falla(`situación ${s.id}: el criterio «${c.t}» nombra «${i}», que no existe`); }));
    ["antes", "cadena"].forEach((k) => (c[k] || []).forEach((g) => g.forEach((i) => { if (!M.CAJA[i] && i.charAt(0) !== "@") falla(`situación ${s.id}: el criterio «${c.t}» nombra «${i}», que no existe`); })));
    if (!c.p || !c.r) falla(`situación ${s.id}: el criterio «${c.t}» no tiene porqué o ref`);
  });
  if (s.crit.length < 5) falla(`situación ${s.id}: tiene menos de 5 criterios`);
  // las cajas del modelo tiradas sin ningún cable no deben aprobar: a lo sumo los criterios que piden solo una caja
  const vacio = M.evaluar(s.modelo.n.map((x) => x[0]), [], s);
  if (vacio.oks / vacio.total > 0.7) falla(`situación ${s.id}: sin cables igual aprueba ${vacio.oks} de ${vacio.total} criterios`);
});

// ---- cuántas cajas del catálogo usa algún modelo
const usadas = new Set(F.demo.n.map((x) => x[0]));
F.situaciones.forEach((s) => s.modelo.n.forEach((x) => usadas.add(x[0])));
const sinUso = ids.filter((i) => !usadas.has(i) && !M.CAJA[i].trampa);
console.log(`Cajas (sin contar trampas) usadas en alguna solución: ${ids.filter((i) => !M.CAJA[i].trampa).length - sinUso.length} de ${ids.filter((i) => !M.CAJA[i].trampa).length}`);
console.log(`  las que todavía no usa ninguna situación: ${sinUso.join(", ")}`);

console.log(fallas ? `\n${fallas} problema(s).` : "\nTodo en regla.");
process.exit(fallas ? 1 : 0);
