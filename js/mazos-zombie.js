/* Mazos de Parcial Zombie. El juego (js/parcial-zombie.js) es una plantilla que no sabe de materias:
   lee window.MAZOS_ZOMBIE y arma el menú con lo que encuentra. Para sumar una materia alcanza con cargar
   su archivo de preguntas en parcial-zombie.html y agregar acá una entrada con esta forma:

   {
     id: "ia",                      // va en el enlace (#mazo=ia) y en la clave de la mejor marca
     materia: "Introducción a la IA",
     detalle: "2.º parcial · clases 7 a 12",
     apunte: "ia-conceptual.html",  // «clase N» enlaza a apunte + "#cN"
     volver: "ia-conceptual.html#c13",
     grupos: [                      // cada grupo es un caso (con sus preguntas en orden) o un montón suelto
       { caso: null | { titulo, ambito, hechos: [párrafos] },
         preguntas: [ { q, ops: [3 o 4 textos], ok: índice de la correcta, porque, clase, rol? } ] }
     ]
   }

   - Grupo sin caso: sus preguntas se mezclan entre sí en cada partida.
   - Grupo con caso: los casos se mezclan, pero las preguntas de cada caso salen juntas y en su orden;
     antes de la primera se muestra el caso (el zombie espera) y se puede volver a leer con «Ver el caso».
   - La cantidad de puertas sale de ops.length (3 o 4). Las opciones cambian de puerta en cada partida.
   - El tiempo de cada pregunta se calcula con el largo del texto (CFG.tBase y CFG.tPorLetra en el juego). */
(function () {
  "use strict";
  var MAZOS = [];

  /* Introducción a la IA, 2.º parcial: 30 preguntas sueltas de tres opciones (js/preguntas-zombie-ia.js). */
  var ia = window.PREGUNTAS_ZOMBIE_IA || [];
  if (ia.length) {
    MAZOS.push({
      id: "ia",
      materia: "Introducción a la IA",
      detalle: "2.º parcial · clases 7 a 12",
      apunte: "ia-conceptual.html",
      volver: "ia-conceptual.html#c13",
      grupos: [{
        caso: null,
        preguntas: ia.map(function (p) { return { q: p.q, ops: p.ops.slice(), ok: 0, porque: p.porque, clase: p.clase }; })
      }]
    });
  }

  /* Ética en la IA, 2.º parcial: los casos por roles de simulacro-etica-2.html (js/casos-etica-roles.js), tal cual.
     Se reutiliza ese banco y no el del examen puntuado (tools/casos_etica.json) porque las respuestas de aquel
     viven en una tabla privada de Supabase y no deben viajar al navegador (ver «Reglas de seguridad» en ROADMAP.md). */
  var etica = window.CASOS_ETICA_ROLES || [];
  if (etica.length) {
    MAZOS.push({
      id: "etica",
      materia: "Ética en la IA",
      detalle: "2.º parcial · casos por roles",
      apunte: "etica.html",
      volver: "etica.html",
      grupos: etica.map(function (c) {
        return {
          caso: { titulo: c.titulo, ambito: c.ambito, hechos: c.hechos.slice() },
          preguntas: c.preguntas.map(function (p) {
            var letras = Object.keys(p.opciones).sort();
            return {
              q: p.texto,
              ops: letras.map(function (l) { return p.opciones[l]; }),
              ok: letras.indexOf(p.ok),
              porque: p.porque,
              clase: c.clase,
              rol: p.rol
            };
          })
        };
      })
    });
  }

  window.MAZOS_ZOMBIE = MAZOS;
})();
