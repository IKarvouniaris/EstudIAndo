# estudIAndo — guía para el agente

Sitio estático de apuntes de estudio (UADE, Lic. en IA y Ciencia de Datos). Cada
materia es una página HTML autocontenida (`etica.html`, `ia-conceptual.html`,
`python.html`, `estadistica.html`) con: riel de navegación lateral (`<nav id="nav">`),
una sección `<section id="cN">` por clase, buscador, glosario, flashcards y un
simulacro aparte. `index.html` linkea a cada apunte desde la portada.

**Excepción: `calculo.html` (Cálculo I).** No usa esta plantilla: es una app con
menú lateral propio, contenido en el array `MODULES` dentro del HTML y lógica en
`calculo/` (ejercicios guiados, práctica con lápiz corregida por IA, entrenador de
decisiones). Guarda en `calculo_docs` vía `calculo/supabase-claude.js`. El flujo
"clase + resumen de transcripción" de abajo no aplica tal cual a esta página:
si llega material de Cálculo, preguntá cómo integrarlo antes de tocar `MODULES`.
Lo que sí comparte con el resto del sitio es la **estética**: `calculo.html` usa los mismos
tokens (`--papel`, `--tinta`, `--acento` violeta = `--u5`, `--display`/`--body`/`--mono`), el
riel lateral y el tema `data-tema` + `ia-tema`. Los nombres viejos de su CSS (`--bg`, `--panel`,
`--accent`, `--good`…) son alias de esos tokens: no volver a un tema propio. En el entrenador
(`calculo/entrenador/*.js`) las tres opciones de cada paso deben tener largo parejo: que la
correcta no sea sistemáticamente la más larga (ni la más corta).
Las flashcards de Cálculo para Poris (`js/mazos/calculo.js`) están **generadas** desde `MODULES`:
si cambiás un texto de `calculo.html`, corré `node tools/generar_mazo_calculo.js` y commiteá el resultado.

**Marca.** El logo vive en `img/` y `favicon.svg`; se dibuja en las páginas con `<i data-marca></i>` y `js/marca.js`.
Toda página nueva lleva los tres `<link rel="icon">` (copiarlos de `index.html`). Los guiños a Homero son solo muletillas
(«¡D'oh!», «Mmm… dona») y una dona propia: no dibujar ni subir imágenes del personaje (es de terceros y el repo es público).

**Simulacro de Ética.** Los casos viven en `tools/casos_etica.json` (1 a 12: 1.er parcial; 13 en adelante: 2.º parcial, unidades `u` 5 a 8) y se publican con
`python tools/seed.py` (genera `seed_etica.sql` y `seed_etica_parcial2.sql`). En cada pregunta la opción correcta no puede ser sistemáticamente la más larga ni caer
siempre en la misma letra, y los distractores no deben delatarse con «siempre / nunca / ninguno»: medilo antes de dar un banco por terminado.
El simulacro del 2.º parcial con el formato del examen (`simulacro-etica-2.html`: casos por roles víctima/fiscalía/defensa/juzgado con justificación)
tiene sus casos en `js/casos-etica-roles.js` y sigue las mismas reglas de opciones. El apunte de Ética numera las clases seguidas (1–10).

**Simulacro escrito del 2.º parcial de Intro a la IA** (`simulacro-ia-2.html`). Las 18 situaciones y sus criterios viven en `tools/situaciones_ia_p2.json`;
`python tools/seed_ia_parcial2.py` genera `supabase/seed_ia_parcial2.sql` (que incluye **el texto de las clases 7 a 12 de `ia-conceptual.html` como contexto
para la corrección**) y `js/situaciones-ia-p2.js`. Si cambiás el texto de esas clases o las situaciones, volvé a correr el script y commiteá el resultado.
**Simulacros del 2.º parcial con el formato que anticipó el profe** (`simulacro-etica-2-desarrollo.html`): 2 casos breves por simulacro, con opción múltiple de cinco opciones (A–E) y preguntas a desarrollar, y la respuesta modelo al lado de cada pregunta (el alumno se autoevalúa con una checklist y se calcula la nota con la escala de la UADE). Los datos viven en `js/simulacros-etica-p2-a|b|c.js` (la cabecera de la A explica el formato); el simulacro 0 resume los casos de la cátedra (SONORA y MAREA) con palabras propias y conserva su clave: no pegar el texto original (repo público). En los simulacros propios la correcta va primera en los datos y `js/simulacros-etica-p2-orden.js` mezcla las opciones con un orden fijo. Después de tocar opciones, corré `node tools/medir_simulacros_etica_p2.js` (letras, largo de la correcta, palabras delatoras) y releé que las consignas sigan claras.
La pestaña **Respuestas** del simulacro muestra, desplegables, las respuestas modelo de las 18 situaciones: viven en `tools/respuestas_ia_p2.json` (una por parte, redactadas por Claude a partir del apunte y de los criterios; no son la guía textual de la cátedra) y el mismo script las publica con los criterios en `js/respuestas-ia-p2.js`. Si agregás una situación, el script falla hasta que le cargues sus cuatro respuestas. Se puede abrir en cualquier momento, también con un examen en curso.
El apunte de Intro a la IA numera las clases seguidas (1–13), sin el salto de la cátedra (1–6, 9–15).

**Parcial Zombie** (`parcial-zombie.html`): juego de repaso (pasillo, zombie, una puerta por opción). Es una plantilla: `js/parcial-zombie.js` no sabe de
materias y lee los mazos de `js/mazos-zombie.js`; para sumar una materia se carga su archivo de preguntas en el HTML y se agrega una entrada ahí (el formato está
en la cabecera de ese archivo), sin tocar el juego. Cada mazo tiene niveles (uno por clase) y entre nivel y nivel se baja una escalera. Mazos de hoy: **Intro a la IA** (238 preguntas de tres opciones, un archivo por clase en
`js/zombie-ia/c07.js … c12.js`; el formato y las pautas están en `js/preguntas-zombie-ia.js`; la correcta es siempre `ops[0]` y el juego las mezcla; cada pregunta trae el `ref` del apartado
del apunte y hay una pregunta por cada concepto de cada apartado: el medidor falla si un apartado de las clases 7 a 12 queda sin preguntas) y **Ética** (las 68 preguntas de opción múltiple de los simulacros de casos breves, `js/simulacros-etica-p2-*.js`: un nivel por simulacro, cada caso con su texto; esos simulacros tienen 5 opciones y el juego dibuja hasta 4 puertas, así que la tabla `QUITAR` de `js/mazos-zombie.js` dice qué distractor sale de cada pregunta: si cambiás opciones de un simulacro, revisá esa tabla; las de desarrollo no entran).
Las preguntas de Intro a la IA siguen las reglas de opciones de los simulacros y **no nombran al profesor, a la cátedra ni «la clase N»** (van sobre las
diapositivas y los casos prácticos). Además siguen las pautas de redacción que están en la cabecera de `js/preguntas-zombie-ia.js`, porque una primera tanda
salió confusa: un solo concepto por pregunta con su `tema` a la vista (el área, no la respuesta), consigna directa que se pueda contestar tapando las opciones,
en positivo, opciones cortas, paralelas y de una sola idea (nada de «Concepto: definición» ni «Sí, porque…»), y distractores que sean conceptos vecinos.
Después de tocarlas, corré `node tools/medir_preguntas_zombie.js` y releelas: el script cuenta, pero no juzga si se entienden. Si agregás un apartado nuevo al apunte (clases 7 a 12), agregá su pregunta o el medidor va a fallar. No usar en el juego bancos cuyas respuestas viven en
tablas privadas de Supabase (por ejemplo `tools/casos_etica.json`, el examen puntuado de Ética): el mazo viaja entero al navegador. El juego se dibuja en un
`<canvas>` (sin imágenes ni emojis), los valores para ajustar están en `CFG`, arriba de `js/parcial-zombie.js`, y en pantalla las opciones van pegadas debajo
de la consigna, con el pasillo abajo. El cartel «UADE» del pasillo son letras dibujadas en código, no el logo oficial: no subir el archivo del logo de la universidad (marca de terceros, repo público).
El brief está en `docs/parcial-zombie-brief.md`. **Modo sala** (hasta 4 jugadores en vivo, botón «Jugar con amigos»): `js/zombie-sala.js` usa Supabase Realtime (broadcast + presence, sin tablas) y la API `window.ParcialZombie` de `js/parcial-zombie.js` (semilla común para que todos reciban las mismas preguntas y puertas, multiplicador de tiempo que elige el anfitrión, avisos de progreso). Reglas: carrera (gana el primero en escapar), supervivencia (pierde el primero que cae) o último en pie (se sigue hasta que quede uno; el que cae ve su repaso y cómo van los demás en vivo); decide un «juez» (el de menor id conectado). Se entra con Google o de invitado con un nombre; las partidas de sala no cuentan para la mejor marca. Todo corre en el navegador: alcanza para estudiar, pero se puede hacer trampa. La URL de la página tiene que estar en las «Redirect URLs» de Supabase para que vuelva del login con Google. Plan de un juego de juicio con voz y evaluación con IA: `docs/juego-juicio-ia-plan.md`. Si cambia el texto de las clases 7 a 12, revisá que los «porqué» sigan
diciendo lo mismo que el apunte.

**Armá el flujo** (`flujo-ia.html`): pizarrón en el que se enlazan cajas con cables para diseñar cómo se automatiza un proceso (situaciones del simulacro escrito del 2.º parcial de Intro a la IA).
Los datos viven en `js/flujo-ia-datos.js` (100 cajas, sus `frases` para el panel «Mi respuesta», el ejemplo guiado y las 18 situaciones, cada una con su solución modelo y sus criterios), la revisión en `js/flujo-ia-eval.js` (la usan el juego y el medidor) y el
motor en `js/flujo-ia.js`. Para sumar una situación se agrega una entrada en `situaciones` con `mision`, `modelo` y `crit` (el formato está en la cabecera del archivo de datos) y se corre
`node tools/medir_flujo_ia.js`: tiene que aprobar la solución modelo. Las cajas trampa son errores típicos del apunte y no se marcan en la bandeja. Cada caja y cada criterio llevan el `ref` de un apartado real de
`ia-conceptual.html` (el medidor lo comprueba), así que si cambia la numeración del apunte hay que actualizarlos. En nivel bajo (situaciones 1 a 6) el pizarrón dibuja huecos punteados donde faltan cajas de la solución modelo, y a un costado el panel «Mi respuesta» redacta la respuesta del parcial con las `frases` de las cajas puestas (cada caja que no es trampa necesita la suya: el medidor lo comprueba). No usar el texto de las diapositivas tal cual: las misiones y los porqués son síntesis propia.

## Regla: "clase + resumen de transcripción"

Cuando el usuario menciona una **clase nueva** junto con material de una
grabación (resumen de transcripción, mapa conceptual, transcripción cruda,
y/o el PPT/PDF oficial de esa clase), seguí este flujo sin volver a
preguntar el procedimiento general — sí preguntá los datos puntuales que
falten:

1. **Reunir fuentes.** Para cada clase puede haber hasta cuatro archivos:
   - Transcripción cruda (`.txt`, con marcas de orador y timestamp — HiNoter).
   - Mapa conceptual (`.md`, outline anidado con guiones).
   - Resumen en prosa (a veces al final/inicio del propio `.txt`, o en un
     archivo aparte).
   - Material oficial de la cátedra (`.pptx`/`.pdf`/`.docx`): diapositivas,
     casos prácticos asignados.
   Si falta el resumen en prosa o el material oficial, **pedíselo al
   usuario en vez de inventarlo o generarlo vos mismo** — la calidad de la
   fuente importa más que completar el apartado rápido.

2. **Confirmar con el usuario, no asumir:**
   - **A qué materia pertenece cada grabación.** No lo deduzcas del nombre
     de la carpeta que la contiene ni de la fecha: dos grabaciones del
     mismo día pueden ser de materias distintas, y una carpeta puede
     agrupar archivos de más de una materia. Confirmá explícitamente
     "esto es de [materia]" antes de escribir nada — ya pasó que una
     transcripción etiquetada como "Ética" en su carpeta era en realidad
     de "Introducción a la IA".
   - Número de clase y a qué Bloque/Unidad pertenece dentro de esa materia.
     El nombre de archivo del PPT a veces trae un número (ej. "clase 9"),
     pero ese es el conteo real de la cátedra, que puede no coincidir con
     el último número documentado en el apunte (si hay clases sin notas
     en el medio, dejaría un salto tipo 6 → 9). Preguntá explícitamente
     si preferís mantener el número real de la cátedra (con el salto) o
     numerarla como la siguiente clase del apunte sin salto — no asumas.
   - Si dos grabaciones del mismo día son **partes de una misma clase**
     (ej. dos audios separados de una sesión larga) o clases distintas
     numeradas por separado. Si son partes de una misma clase, van en la
     misma `<section id="cN">`, con subtítulos tipo "Segunda parte de la
     clase" y numeración de `<h3>` continua (9.1…9.8, luego 9.9…), no en
     secciones ni números de clase separados.

3. **Nivel de detalle: apunte completo, no un resumen aparte.** El
   resultado NO es una sección separada de "transcripción" pegada al
   final. Es una sección `<section id="cN">` con el mismo nivel de
   desarrollo que las clases existentes (ver cualquier `#c1`–`#c6` de
   `etica.html` o `ia-conceptual.html` como plantilla), que **fusiona**
   el contenido oficial (PPT/caso) con lo aportado por la clase grabada
   (ejemplos reales, matices, correcciones que el PPT solo no deja claras).
   Componentes a reutilizar (clases CSS ya definidas, no inventar nuevas):
   `.eyebrow` + `<h2>` + `.intro`, `.regla` (regla docente / idea síntesis),
   `.clave` (ejemplo destacado), `.fichas` > `.ficha` (con `.def`, `.trampa`
   para errores típicos, `<dl><dt>/<dd>`), `.pasos` (secuencias numeradas),
   `.cadena` (flujos), `.tabla-caja` (tablas), `.panel.peligro` (alertas),
   diagramas inline `<svg>` cuando un diagrama ayuda más que texto (ver
   el Hype Cycle en `#c6` de `ia-conceptual.html` como ejemplo de estilo).
   No usar Markdown ni bloques de código para el contenido: es HTML igual
   que el resto de la página.

4. **Actualizar el riel de navegación** (`<nav id="nav">`): agregar la
   entrada `<a href="#cN" data-u="U">` dentro del grupo de Bloque/Unidad
   correspondiente (crear un grupo nuevo `.riel-grupo` si la clase abre
   un bloque temático nuevo). Mantené la numeración `data-u` consistente
   con el color de unidad usado en esa página.

5. **No tocar sin que se pida explícitamente:** glosario, flashcards,
   "confusiones típicas" ni el simulacro. Si conviene sumar términos
   nuevos ahí, ofrecelo como paso siguiente, no lo hagas de oficio.

6. **Transcripción y PPT originales no se publican tal cual** — son
   fuente, no contenido final. No pegues el `.txt` crudo ni el texto
   íntegro de las diapositivas en la página; la síntesis en prosa/fichas
   reemplaza a la fuente.
