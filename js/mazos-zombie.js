/* Mazos de Parcial Zombie. El juego (js/parcial-zombie.js) es una plantilla que no sabe de materias:
   lee window.MAZOS_ZOMBIE y arma el menú con lo que encuentra. Para sumar una materia alcanza con cargar
   su archivo de preguntas en parcial-zombie.html y agregar acá una entrada con esta forma:

   {
     id: "ia",                      // va en el enlace (#mazo=ia) y en la clave de la mejor marca
     materia: "Introducción a la IA",
     detalle: "2.º parcial · clases 7 a 12",
     apunte: "ia-conceptual.html",  // «clase N» enlaza a apunte + "#cN"
     volver: "ia-conceptual.html#c13",
     niveles: [                     // uno por clase: se juegan en orden y entre uno y otro se baja una escalera
       { titulo: "…", clase: 7,
         grupos: [                  // cada grupo es un caso (con sus preguntas en orden) o un montón suelto
           { caso: null | { titulo, ambito, hechos: [párrafos] },
             preguntas: [ { q, ops: [3 o 4 textos], ok: índice de la correcta, porque, clase, tema?, ref?, rol? } ] }
         ] }
     ]
   }

   - Un mazo sin «niveles» (solo «grupos») es un único nivel y no tiene escalera.
   - Grupo sin caso: sus preguntas se mezclan entre sí en cada partida, dentro de su nivel.
   - Grupo con caso: los casos se mezclan, pero las preguntas de cada caso salen juntas y en su orden;
     antes de la primera se muestra el caso (el zombie espera) y se puede volver a leer con «Ver el caso».
   - tema: el área que evalúa la pregunta (no la respuesta). Si está, se muestra arriba de la consigna.
   - ref: el apartado del apunte de donde sale (por ejemplo «7.3»). Aparece en el resumen final.
   - La cantidad de puertas sale de ops.length (3 o 4). Las opciones cambian de puerta en cada partida.
   - El tiempo de cada pregunta se calcula con el largo del texto (CFG.tBase y CFG.tPorLetra en el juego). */
(function () {
  "use strict";
  var MAZOS = [];

  /* Introducción a la IA, 2.º parcial: un nivel por clase (7 a 12), con preguntas sueltas de tres opciones.
     Cada archivo js/zombie-ia/cNN.js agrega su clase a window.NIVELES_ZOMBIE_IA. */
  var ia = (window.NIVELES_ZOMBIE_IA || []).slice().sort(function (a, b) { return a.clase - b.clase; });
  if (ia.length) {
    MAZOS.push({
      id: "ia",
      materia: "Introducción a la IA",
      detalle: "2.º parcial · clases 7 a 12",
      apunte: "ia-conceptual.html",
      volver: "ia-conceptual.html#c13",
      niveles: ia.map(function (n) {
        return {
          titulo: n.titulo,
          clase: n.clase,
          grupos: [{
            caso: null,
            preguntas: n.preguntas.map(function (p) {
              return { q: p.q, ops: p.ops.slice(), ok: 0, porque: p.porque, clase: n.clase, tema: p.tema, ref: p.ref };
            })
          }]
        };
      })
    });
  }

  /* Ética en la IA, 2.º parcial: las preguntas de opción múltiple de los simulacros de casos breves
     (js/simulacros-etica-p2-*.js, simulacro-etica-2-desarrollo.html), un nivel por simulacro y cada caso con su texto.
     Las de desarrollo quedan afuera (no se pueden jugar con puertas). Los simulacros tienen cinco opciones y el juego
     dibuja hasta cuatro puertas: QUITAR dice qué distractor sale de cada pregunta («caso:número»), elegido a mano entre
     los menos parecidos a la correcta. Si se cambian las opciones de un simulacro, hay que revisar esta tabla.
     Se reutilizan estos simulacros y no el banco del examen puntuado (tools/casos_etica.json): las respuestas de aquel
     viven en una tabla privada de Supabase y no deben viajar al navegador (ver «Reglas de seguridad» en ROADMAP.md). */
  var sims = window.SIMULACROS_ETICA_P2 || [];
  if (sims.length) {
    var QUITAR = {"0A:0":3,"0A:1":4,"0A:2":1,"0A:3":3,"0A:4":3,"0A:5":1,"0A:6":4,"0A:7":1,"0A:8":4,"0A:9":3,"0B:0":3,"0B:1":0,"0B:2":0,"0B:3":4,"0B:4":2,"0B:5":2,"0B:6":1,"0B:7":3,"0B:8":3,"0B:9":1,"1A:0":2,"1A:1":2,"1A:2":4,"1A:3":3,"1B:0":4,"1B:1":2,"1B:2":2,"1B:3":1,"2A:0":4,"2A:1":2,"2A:2":4,"2A:3":3,"2B:0":3,"2B:1":4,"2B:2":4,"2B:3":4,"3A:0":1,"3A:1":2,"3A:2":3,"3A:3":2,"3B:0":3,"3B:1":2,"3B:2":1,"3B:3":2,"4A:0":4,"4A:1":2,"4A:2":4,"4A:3":1,"4B:0":4,"4B:1":2,"4B:2":1,"4B:3":3,"5A:0":3,"5A:1":2,"5A:2":4,"5A:3":4,"5B:0":3,"5B:1":4,"5B:2":3,"5B:3":2,"6A:0":4,"6A:1":3,"6A:2":3,"6A:3":4,"6B:0":3,"6B:1":1,"6B:2":3,"6B:3":1};
    var PRINCIPAL = { "0A": 8, "0B": 8, "1A": 7, "1B": 8, "2A": 4, "2B": 9, "3A": 9, "3B": 10, "4A": 10, "4B": 7, "5A": 8, "5B": 4, "6A": 9, "6B": 9 };
    MAZOS.push({
      id: "etica",
      materia: "Ética en la IA",
      detalle: "2.º parcial · casos breves",
      apunte: "etica.html",
      volver: "etica.html",
      niveles: sims.map(function (sim) {
        return {
          titulo: sim.id === 0 ? "SONORA y MAREA" : sim.sub,
          clase: null,
          grupos: sim.casos.map(function (c) {
            return {
              caso: { titulo: c.titulo, ambito: c.ambito, hechos: c.hechos.slice() },
              preguntas: c.mc.map(function (p, i) {
                var correcta = sim.fijo ? p.ok : 0, sale = QUITAR[c.id + ":" + i], ops = [], ok = 0;
                p.o.forEach(function (t, k) {
                  if (k === sale) return;
                  if (k === correcta) ok = ops.length;
                  ops.push(t);
                });
                return {
                  q: p.t.replace(/^\d+\.\s*/, ""),
                  ops: ops,
                  ok: ok,
                  porque: p.p,
                  clase: PRINCIPAL[c.id]
                };
              })
            };
          })
        };
      })
    });
  }

  window.MAZOS_ZOMBIE = MAZOS;
})();
