/* Mide los simulacros del 2.º parcial de Ética (js/simulacros-etica-p2-*.js).
   Uso: node tools/medir_simulacros_etica_p2.js
   Comprueba la forma de los datos y cuenta lo que un lector no ve: en qué letra cae la correcta, cuántas veces es la opción más larga
   y si los distractores se delatan con palabras absolutas. Cuenta, pero no juzga si las preguntas se entienden: releelas. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const base = path.join(__dirname, "..", "js");
const ctx = { window: {}, module: undefined };
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
["simulacros-etica-p2-orden.js", "simulacros-etica-p2-a.js", "simulacros-etica-p2-b.js", "simulacros-etica-p2-c.js"].forEach(f => {
  vm.runInContext(fs.readFileSync(path.join(base, f), "utf8"), ctx, { filename: f });
});
const SIMS = ctx.SIMULACROS_ETICA_P2, orden = ctx.ordenOpcionesEticaP2;
const ABS = /\b(siempre|nunca|ninguno|ninguna|jam[aá]s|todas las anteriores)\b/i;
const errores = [];
const err = m => errores.push(m);

let nMc = 0, nDev = 0, ptsDev = 0;
const letras = [0, 0, 0, 0, 0], letrasProp = [0, 0, 0, 0, 0];
let empateLarga = 0, largaOk = 0, cortaOk = 0, nProp = 0, absOk = 0, absDis = 0, disTot = 0;

SIMS.forEach(sim => {
  const ids = new Set();
  if(!sim.casos || sim.casos.length !== 2) err(`Simulacro ${sim.id}: debe tener 2 casos`);
  sim.casos.forEach(c => {
    if(ids.has(c.id)) err(`Caso repetido ${c.id}`); ids.add(c.id);
    if(!c.hechos || !c.hechos.length) err(`Caso ${c.id}: sin hechos`);
    if(!c.clases || !c.clases.length) err(`Caso ${c.id}: sin clases a repasar`);
    c.mc.forEach((p, i) => {
      nMc++;
      const q = `Caso ${c.id} MC${i + 1}`;
      if(p.o.length !== 5) err(`${q}: debe tener 5 opciones`);
      if(!p.p || p.p.length < 40) err(`${q}: falta el «por qué»`);
      if(new Set(p.o).size !== p.o.length) err(`${q}: opciones repetidas`);
      let pos, ok;
      if(sim.fijo){ ok = p.ok; if(!(ok >= 0 && ok < 5)) err(`${q}: falta ok`); pos = ok; }
      else { const perm = orden(`${sim.id}:${c.id}:${i}`, p.o.length); pos = perm.indexOf(0); ok = 0; }
      letras[pos]++;
      if(!sim.fijo) letrasProp[pos]++;
      const lens = p.o.map(t => t.length), okLen = lens[ok];
      if(!sim.fijo){
        nProp++;
        const otras = lens.filter((_, k) => k !== ok); if(okLen >= 1.12 * Math.max(...otras)) largaOk++; if(okLen === Math.max(...lens)) empateLarga++;
        if(okLen === Math.min(...lens)) cortaOk++;
      }
      p.o.forEach((t, k) => {
        if(!sim.fijo){
          if(k === ok){ if(ABS.test(t)) absOk++; }
          else { disTot++; if(ABS.test(t)) absDis++; }
        }
      });
    });
    c.dev.forEach((d, i) => {
      nDev++; ptsDev += d.pts;
      const q = `Caso ${c.id} D${i + 1}`;
      if(!d.modelo || !d.modelo.length) err(`${q}: sin respuesta modelo`);
      if(!d.clave || d.clave.length < 3) err(`${q}: pocos puntos clave`);
      if(!d.pts) err(`${q}: sin puntos`);
    });
  });
});

const L = "ABCDE";
console.log(`Simulacros: ${SIMS.length} · casos: ${SIMS.reduce((n, s) => n + s.casos.length, 0)} · opción múltiple: ${nMc} · a desarrollar: ${nDev} (${ptsDev} pts)`);
console.log("Letra de la correcta (todos):   " + letras.map((n, i) => `${L[i]}=${n}`).join("  "));
console.log("Letra de la correcta (propios): " + letrasProp.map((n, i) => `${L[i]}=${n}`).join("  ") + `  (de ${nProp})`);
console.log(`Propios: la correcta supera por más de 12 % a la segunda más larga en ${largaOk} de ${nProp} (${Math.round(largaOk / nProp * 100)} %); es la más larga (aun por poco) en ${empateLarga} y la más corta en ${cortaOk}.`);
console.log(`Propios: palabras absolutas en ${absOk} correctas y en ${absDis} de ${disTot} distractores.`);

if(nProp && largaOk / nProp > 0.15) err(`La correcta sobresale por largo en ${Math.round(largaOk / nProp * 100)} % de las preguntas propias (máximo 15 %)`);
if(nProp && empateLarga / nProp > 0.55) err(`La correcta es la más larga en ${Math.round(empateLarga / nProp * 100)} % de las preguntas propias (máximo 55 %)`);
const maxL = Math.max(...letrasProp), minL = Math.min(...letrasProp);
if(nProp && (maxL > nProp * 0.32 || minL < nProp * 0.1)) err(`Letras desparejas en las preguntas propias: ${letrasProp.join("/")}`);
if(nProp && absDis / disTot > 0.12) err(`Demasiadas palabras absolutas en los distractores (${Math.round(absDis / disTot * 100)} %)`);

if(errores.length){ console.log("\nPROBLEMAS:\n - " + errores.join("\n - ")); process.exit(1); }
console.log("\nOK");
