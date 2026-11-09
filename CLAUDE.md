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
El apunte de Intro a la IA numera las clases seguidas (1–13), sin el salto de la cátedra (1–6, 9–15).

**Parcial Zombie** (`parcial-zombie.html`): juego de repaso (pasillo, zombie, una puerta por opción). Es una plantilla: `js/parcial-zombie.js` no sabe de
materias y lee los mazos de `js/mazos-zombie.js`; para sumar una materia se carga su archivo de preguntas en el HTML y se agrega una entrada ahí (el formato está
en la cabecera de ese archivo), sin tocar el juego. Mazos de hoy: **Intro a la IA** (`js/preguntas-zombie-ia.js`, 30 preguntas de tres opciones; la correcta es
siempre `ops[0]` y el juego las mezcla) y **Ética** (reutiliza tal cual `js/casos-etica-roles.js`, los casos por roles: si cambiás ese archivo, cambia el juego).
Las preguntas de Intro a la IA siguen las reglas de opciones de los simulacros y **no nombran al profesor, a la cátedra ni «la clase N»** (van sobre las
diapositivas y los casos prácticos): después de tocarlas, corré `node tools/medir_preguntas_zombie.js`. No usar en el juego bancos cuyas respuestas viven en
tablas privadas de Supabase (por ejemplo `tools/casos_etica.json`, el examen puntuado de Ética): el mazo viaja entero al navegador. El juego se dibuja en un
`<canvas>` (sin imágenes ni emojis), los valores para ajustar están en `CFG`, arriba de `js/parcial-zombie.js`, y en pantalla las opciones van pegadas debajo
de la consigna, con el pasillo abajo. El brief está en `docs/parcial-zombie-brief.md`. Si cambia el texto de las clases 7 a 12, revisá que los «porqué» sigan
diciendo lo mismo que el apunte.

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
