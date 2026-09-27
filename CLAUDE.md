# estudIAndo — guía para el agente

Sitio estático de apuntes de estudio (UADE, Lic. en IA y Ciencia de Datos). Cada
materia es una página HTML autocontenida (`etica.html`, `ia-conceptual.html`,
`python.html`, `estadistica.html`) con: riel de navegación lateral (`<nav id="nav">`),
una sección `<section id="cN">` por clase, buscador, glosario, flashcards y un
simulacro aparte. `index.html` linkea a cada apunte desde la portada.

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
