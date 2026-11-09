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

  /* Ética en la IA, 2.º parcial: los casos por roles de simulacro-etica-2.html (js/casos-etica-roles.js), tal cual,
     agrupados por clase (un nivel por clase, de la 7 a la 10).
     Se reutiliza ese banco y no el del examen puntuado (tools/casos_etica.json) porque las respuestas de aquel
     viven en una tabla privada de Supabase y no deben viajar al navegador (ver «Reglas de seguridad» en ROADMAP.md). */
  var etica = window.CASOS_ETICA_ROLES || [];
  if (etica.length) {
    var TITULOS = {
      7: "Responsabilidad civil y penal",
      8: "Propiedad intelectual y autoría",
      9: "IA y derecho penal",
      10: "Discriminación y ética de la investigación"
    };
    var porClase = {};
    etica.forEach(function (c) { (porClase[c.clase] = porClase[c.clase] || []).push(c); });
    MAZOS.push({
      id: "etica",
      materia: "Ética en la IA",
      detalle: "2.º parcial · casos por roles",
      apunte: "etica.html",
      volver: "etica.html",
      niveles: Object.keys(porClase).map(Number).sort(function (a, b) { return a - b; }).map(function (cl) {
        return {
          titulo: TITULOS[cl] || "Clase " + cl,
          clase: cl,
          grupos: porClase[cl].map(function (c) {
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
        };
      })
    });
  }

  window.MAZOS_ZOMBIE = MAZOS;
})();
