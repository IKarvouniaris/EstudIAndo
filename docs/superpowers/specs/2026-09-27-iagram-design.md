# IAgram — feed de estudio estilo Instagram (diseño)

Fecha: 2026-09-27
Estado: aprobado por el usuario en brainstorming, listo para plan de implementación.

## Motivación

El sitio (`estudIAndo`) tiene apuntes completos por materia (`etica.html`,
`ia-conceptual.html`, `python.html`, `estadistica.html`), pero repasar exige
leer secciones largas. La idea es una superficie complementaria — no un
reemplazo — para repaso rápido y memorización de lo más importante de cada
clase (lo que "nos podrían tomar en un parcial"), con el formato familiar de
un feed de Instagram en celular: cada materia es un "perfil", cada concepto
clave es un "post".

No reemplaza el apunte: cada post enlaza de vuelta a la sección completa
para quien quiere profundidad.

## Alcance de esta iteración

- Un archivo nuevo y autocontenido: `iagram.html`.
- Piloto de contenido real: perfil de **Ética** con posts de sus 7 clases.
- Perfiles de IA Conceptual, Python y Estadística existen en la grilla pero
  en estado "Próximamente" (sin posts) — se completan en iteraciones futuras,
  fuera de este alcance.
- Sin backend nuevo: sin likes/guardados persistentes, sin Supabase. Feed
  puramente visual (decisión explícita del usuario: "solo visual, sin
  interacciones").
- Entrada desde `index.html` (link "IAgram" en el header) y, opcionalmente,
  un ícono en cada materia existente que ancla directo al perfil
  correspondiente (`iagram.html#perfil=etica`).

## Arquitectura y navegación

`iagram.html` sigue el mismo patrón que las páginas de materia: HTML
autocontenido, mismos tokens de color/tipografía (`--papel`, `--tinta`,
`--u1..u4`, `--display`, `--body`, `--mono`) y el mismo toggle de tema
persistido en `localStorage` (`ia-tema`), sin CSS ni JS compartido en
archivos externos nuevos.

Es una mini-SPA con JS plano (sin frameworks, consistente con el resto del
proyecto):

- **Vista "Explorar"** (pantalla inicial): grilla de perfiles, uno por
  materia. Cada perfil = avatar circular con el color de unidad de esa
  materia, `@usuario` corto (ej. `@etica.ia`), contador de posts.
- **Vista "Perfil"**: header (avatar grande, bio corta, "7 clases · N
  posts") + feed vertical scrolleable de posts de esa materia, en orden
  cronológico (clase 1 → clase 7).
- Cambiar de vista es mostrar/ocultar con JS (`display`), usando
  `history.pushState`/`popstate` con el hash (`#perfil=etica`) para que
  "atrás" del navegador funcione sin recargar la página.
- Barra superior fija: logo "IAgram" + ícono de vuelta a `index.html`.
- Barra inferior fija: 2 íconos — Inicio (volver a la grilla) y salida a
  `index.html`.

Perfiles sin contenido (IA Conceptual, Python, Estadística): mismo
tratamiento visual que "Cálculo I" en `index.html` — avatar atenuado, badge
"Próximamente", no clickeable.

## Modelo de post

Cuatro tipos de post, cada uno mapeado a un componente que ya existe en los
apuntes (curación de contenido ya validado, no invención nueva):

| Tipo | Origen en el apunte | Badge / acento |
|---|---|---|
| Concepto | `.ficha` / `.def` | Sin badge de alerta; color de unidad |
| Trampa | `.trampa` / `.par-trampa` | "⚠ Error típico" |
| Caso real | `.clave` | "📌 Caso real" |
| Para el parcial | `.regla` / síntesis docente | Acento fuerte, destacado |

Estructura de cada post (igual en los 4 tipos):

1. **Header de post**: avatar chico del perfil + `@usuario` + "Clase N".
2. **Tarjeta-imagen**: bloque grande, 100% CSS (sin imágenes externas),
   tipografía `--display` grande, badge de tipo, fondo con el color de la
   unidad correspondiente — es la "foto" del post.
3. **Caption**: 2-4 líneas de prosa propia (más corta que el apunte,
   redactada de nuevo, no copiada) + hashtags (`#AIAct #Bloque2 #Parcial1`).
4. **Footer**: link "Ver en el apunte →" que ancla a la sección real
   (`etica.html#c3`).

## Datos

Un array de JS por materia embebido en el propio `iagram.html`
(`POSTS.etica = [...]`), sin archivos de datos separados — mismo criterio
de "página autocontenida" que el resto del sitio. Sumar Python/Estadística
en el futuro es agregar arrays nuevos al mismo objeto `POSTS`.

Cada post: `{ tipo, clase, avatarLetra, titulo, caption, hashtags, href }`.

## Criterio de selección de contenido (piloto Ética)

- 3-4 posts por clase × 7 clases ≈ 24-28 posts.
- Por clase: 1 concepto-eje, 1 trampa/confusión típica (ya hay
  `.par-trampa` listo para esto en el apunte), y 1 caso real o regla
  docente cuando la clase lo tenga.
- Redacción propia, más corta que la fuente — el post es gancho/resumen,
  el link al apunte cubre la profundidad. Nunca se pega el texto original
  tal cual (regla ya vigente del proyecto para transcripciones/PPT,
  extendida acá a los propios apuntes).
- Orden cronológico por clase (`c1` → `c7`).
- Las secciones transversales del apunte de Ética (`casoteca`,
  `confusiones`) quedan fuera de este piloto — no se tocan sin pedido
  explícito.

## Integración visual

- Columna centrada `max-width: 470px` (ancho real del feed de Instagram en
  desktop web); el resto de la pantalla usa `--papel`/`--papel-2` para no
  dejar un hueco visual en pantallas grandes.
- Cero paleta nueva: todos los colores/tipografías son los tokens
  existentes; modo oscuro vía `data-tema` igual que el resto del sitio.
- Respeta `prefers-reduced-motion` y `:focus-visible` como el resto del
  sitio.
- Intencionalmente no responsive a ancho completo en desktop: la columna
  se mantiene angosta para reforzar la sensación de app de celular.

## Fuera de alcance (explícito)

- Likes/guardados persistentes o compartidos (Supabase).
- Contenido real de IA Conceptual, Python, Estadística (queda para
  iteraciones futuras, mismo formato).
- Tocar glosario, flashcards, "confusiones típicas" o simulacro de
  `etica.html`.
- Filtro por hashtag/tag (los hashtags son decorativos por ahora).

## Verificación

Levantar `iagram.html` en navegador: grilla de perfiles → entrar a Ética →
scrollear el feed completo (24-28 posts) → click en "Ver en el apunte →"
(ancla a la clase correcta en `etica.html`) → toggle modo oscuro → viewport
mobile (375px) y desktop.
