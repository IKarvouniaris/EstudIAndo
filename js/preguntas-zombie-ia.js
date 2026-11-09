/* Parcial Zombie (parcial-zombie.html): las preguntas de Introducción a la IA, 2.º parcial.
   Hay un nivel por clase (7 a 12) y cada nivel vive en su archivo: js/zombie-ia/c07.js … c12.js. Cada archivo
   agrega su clase a window.NIVELES_ZOMBIE_IA con esta forma:

     { clase: 7, titulo: "…", preguntas: [ { ref: "7.3", tema: "…", q: "…", ops: ["…", "…", "…"], porque: "…" } ] }

   - ref: el apartado del apunte (ia-conceptual.html) del que sale la pregunta. El medidor comprueba que NINGÚN
     apartado de las clases 7 a 12 quede sin preguntas; los apartados con varios conceptos o elementos tienen una
     pregunta por cada uno (por ejemplo, una por cada paso de «observar → … → supervisar»).
   - tema: el área que evalúa (se muestra arriba de la consigna). Nombra el área, no la respuesta.
   - q: la consigna. ops: tres opciones; LA CORRECTA ES SIEMPRE ops[0] y el juego las mezcla entre las puertas.
   - porque: lo que se lee en el resumen final. Explica el concepto y dice qué son los distractores.

   Preguntas escritas para el juego a partir del apunte y de las 18 situaciones del simulacro escrito
   (tools/situaciones_ia_p2.json); no son preguntas de la cátedra.

   CÓMO SE ESCRIBEN (pautas de redacción de ítems de opción múltiple: Haladyna, Downing y Rodriguez, 2002;
   Little y Bjork, 2012). Para medirlo: node tools/medir_preguntas_zombie.js
   1. Un solo concepto por pregunta, y el tema a la vista. El tema nombra el área, no la respuesta.
   2. La consigna es una pregunta directa y completa: se tiene que poder contestar tapando las opciones.
      Sin relleno: el caso práctico entra solo si es lo que se evalúa, y en una oración.
   3. En positivo: nada de «cuál NO es».
   4. Opciones cortas y paralelas: las tres son del mismo tipo (tres conceptos, tres acciones…) y dicen
      una sola cosa. Nada de «Sí, porque…» ni «Concepto: su definición», que meten dos ideas en una opción.
   5. Los distractores son conceptos vecinos, los que de verdad se confunden. Ninguno es absurdo.
   6. Largo parejo, sin «siempre / nunca / ninguno / todas las anteriores».
   7. El «porque» explica el concepto y dice qué son los distractores, así el error también enseña.
   8. No se nombra al profesor, a la cátedra ni «la clase N»: se pregunta por el contenido. */
window.NIVELES_ZOMBIE_IA = window.NIVELES_ZOMBIE_IA || [];
