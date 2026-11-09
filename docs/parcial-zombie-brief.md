# Game Brief: Parcial Zombie

Brief de una página del juego `parcial-zombie.html`, con el formato de
[Claude Code Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) (`/prototype`).
Aprobado el 2026-11-09. Lo marcado *(guessed)* lo decidió Claude y no lo pidió nadie: es lo primero a revisar después de jugarlo.

## In your words

> un juego donde estamos en un pasillo y nos persigue un zombie desde la espalda y aparecen 3 puertas con preguntas de parcial y multiple choice. Si nos equivocamos de puerta rebotamos y nos muerde el zombie una vez (tenemos 3 vidas) y nuestro jugador abre la puerta que tenia la respuesta correcta y sigue corriendo y aparece la siguiente puerta y asi. Si nos equivocamos y ya no tenemos mas vidas entonces perdemos y tenemos que empezar de nuevo (las puertas son randoms, es decir cada vez que jugamos las preguntas son las mismas 30 por ejemplo pero en diferente orden)

> Quiero que el juego sea sobre el segundo parcial de introduccion a la ia en base a las preguntas del simulacro del sgundo parcial y su contenido

1. Vista: habitual (desde atrás del jugador, zombie asomando por abajo)
2. Reloj: habitual (el zombie se acerca mientras leés y te muerde si no elegís a tiempo)
3. Después de cada puerta: sigo de largo sin frenar
4. Final: habitual (30 puertas y escapás)
5. Vidas: recuperas con una racha de aciertos de 5 puertas seguidas (siempre y cuando hayas perdido vidas ya, no podes tener mas de 3)
6. Controles: click o toque sobre la puerta para que ande en celular (la idea es que ande en celular)
7. Estética: habitual (pasillo de facultad de noche, oscuro, todo dibujado)
8. Dónde vive: habitual (página del sitio, enlazada, mejor marca en el navegador)

> Tambien agregaria que al final si ganas o perdes, te muestre un resumen de las preguntas que te hicieron y la respuesta que elegiste (en verde si fue la correcta y porque, en rojo si estuvo equivocada y que te cuente cual es la correcta)

After play: es dificil leer arriba de todo en la pantalla la pregunta y abajo de todo las opciones, deberian estar inmediatamente abajo de las preguntas.

After play: remover las preguntas que dice "segun el profe en la clase X" y eso, solo preguntas en base a las diapositivas y a los ejemplos practicos como casos en hospitales y eso esta bien, sacar las referencias del profesor nomas

After play: agregar en el menu principal que puedas elegir que materia queres jugar, si la de etica de la ia o la de introduccion a la ia (de etica ya tenemos las preguntas multiple choice asi que seria reutilizarlas) Es decir, que este modo de juego sea como una "plantilla" y que cambien las preguntas en base a la materia

**Pitch:** Corré por el pasillo de la facultad con un zombie en la nuca: cada tanda de tres puertas es una pregunta del 2.º parcial de Intro a la IA, y solo una te deja seguir.

**Genre:** quiz de opción múltiple + corredor. El quiz manda en preguntas, respuestas y revelación; el corredor, en el ritmo y la presión.

**Controls:** tocar o hacer clic en una puerta. También sirve tocar la tarjeta con el texto de esa opción, y en teclado 1/2/3 o A/B/C *(guessed)*.

**Question:** ¿repasar con un zombie atrás hace que quieras jugar otra partida, o el apuro no deja leer?

**Hooks:** el reloj es el zombie (no hay barra de tiempo: lo ves acercarse) y al final repasás todo lo que contestaste.

**Intent:** —

## Look and references

- Look: pasillo de facultad de noche, visto desde atrás del jugador. Paredes verde hospital apagado, piso en damero que corre hacia vos, casilleros y carteleras a los costados, tubos fluorescentes que parpadean. El jugador de espaldas con mochila; el zombie entra por el borde de abajo, primero las manos y después la cabeza. Puertas de madera con una chapa con la letra A, B o C. Verde frío para el ambiente, rojo solo para el peligro y las mordidas, amarillo cálido para la luz de la puerta correcta. Todo dibujado en canvas, sin emojis ni imágenes *(guessed)*.
- Detalle propio: los tubos se apagan uno por uno, desde atrás, a medida que el zombie se acerca *(guessed)*.
- Pantalla: la pregunta arriba, las opciones pegadas debajo y el pasillo abajo. (La primera versión tenía el pasillo en el medio y las opciones al pie; se cambió después de jugarlo.) El texto no va sobre las puertas porque en un celular quedaría ilegible *(guessed)*.
- Marca: tipografías y logo del sitio, los tres `<link rel="icon">` y un «¡D'oh!» cuando te muerden *(guessed)*.
- References: ninguna que haya nombrado el usuario.
- View: 2D con perspectiva de un punto de fuga · Camera: fija, detrás del jugador.

## First minute

Portada con el título, las tres reglas, tu mejor marca y un botón «Correr». Arrancás corriendo; al fondo aparecen tres puertas y arriba la primera pregunta. Se oyen los pasos y, atrás, el zombie. Tocás una puerta: el jugador se cruza a ese carril, la abre y pasa; el pasillo sigue y aparece la siguiente tanda sin pausa. A la segunda o tercera dudás, las manos del zombie ya asoman por abajo y elegís con el corazón en la boca.

## Challenge

Cada pregunta da 30 segundos al principio y 18 en la puerta 30 *(guessed: `tInicio` y `tFinal` en `CFG`)*. Si errás, rebotás contra la puerta, el zombie te muerde y perdés una vida; el jugador abre la correcta, que queda iluminada, y sigue. Si se acaba el tiempo pasa lo mismo *(guessed)*. Cinco aciertos seguidos devuelven una vida, hasta un máximo de tres. Sin vidas, perdés y empezás de cero.

## Core loop

- Aparecen tres puertas y una pregunta; el zombie se acerca.
- Elegís: si acertás pasás de largo y sumás a la racha; si errás, mordida y se ve cuál era.
- Siguiente tanda, con un poco menos de tiempo.
- Al terminar, resumen; «Correr de nuevo» mezcla todo otra vez.

## Goal & fail state

- Ganar: pasar las 30 puertas y salir por la puerta de emergencia.
- Perder: quedarte sin vidas.
- En los dos casos, el resumen: cada pregunta en el orden en que salió, lo que elegiste, en verde con el porqué si acertaste y en rojo con la correcta y su porqué si erraste.

## Features

- [x] 30 preguntas nuevas de tres opciones sobre las clases 7 a 12 y las 18 situaciones del simulacro, cada una con su porqué
- [x] Orden de las preguntas al azar en cada partida, y las opciones cambian de puerta *(guessed)*
- [x] Zombie que se acerca como reloj; mordida al errar o al quedarte sin tiempo
- [x] Tres vidas, y una de vuelta cada cinco aciertos seguidos
- [x] Rebote, mordida y apertura de la puerta correcta, sin frenar a explicar
- [x] Resumen final en verde y rojo
- [x] Sonidos sintetizados (pasos, puerta, golpe, mordida, gruñido, latido) con botón para silenciar *(guessed)*
- [x] Mejor marca guardada en el navegador, una por materia
- [x] Elegir la materia en la portada: el juego es una plantilla y cada materia es un mazo (`js/mazos-zombie.js`)
- [x] Mazo de Ética: los 8 casos por roles de `simulacro-etica-2.html`, con cuatro puertas y el caso a la vista antes de correr *(guessed: cuál banco de Ética, las cuatro puertas y la pantalla del caso)*

## Keep

-

## Avoid

- Frenar después de cada puerta para explicar.
- Preguntas que nombren al profesor, a la cátedra o «la clase N».
- La consigna y las opciones separadas por el pasillo.
- Más de tres vidas.
- Dibujos de Homero o de cualquier personaje ajeno (regla del repo).

## Out of scope

- Python, Estadística, Cálculo y los primeros parciales: se agregan después como otros mazos.
- El banco del examen puntuado de Ética (`tools/casos_etica.json`): sus respuestas no viajan al navegador.
- Ranking con cuenta y puntaje en Supabase: se agrega después.
- Glosario, flashcards y el simulacro escrito no se tocan.

## Build order

1. Las 30 preguntas, medidas con `node tools/medir_preguntas_zombie.js`.
2. El pasillo jugable de punta a punta: puertas, zombie, vidas, racha, ganar y perder.
3. Resumen final, sonidos y mejor marca.
4. Enlaces desde la portada y el apunte, y prueba en celular y escritorio.

---

**Kill condition:** si después de dos rondas de ajuste de tiempos el apuro sigue sin dejar leer las opciones, se saca el reloj y el zombie muerde solo al errar.

**Who it's for / what they feel:** el grupo de la cursada, la semana del parcial: cinco minutos de repaso con algo de adrenalina.

**Nearest game:** Trivia Crack (preguntas de opción múltiple contra reloj); este se diferencia en que el reloj es un perseguidor que se ve en la escena, las respuestas son puertas que se cruzan corriendo y el final es un repaso de estudio y no un puntaje.

## Estado al entregar (2026-11-09)

- Probado por Claude en el navegador: abre sin errores, se puede ganar y perder, la racha devuelve la vida, el resumen sale completo, se elige tocando la puerta y entra en 360×600, 375×812 y escritorio.
- No evaluado en la primera entrega: cómo suena (los sonidos no se escucharon) y si los tiempos son justos.

## Cambios después de jugarlo (2026-11-09)

- Opciones debajo de la consigna, preguntas de Intro a la IA sin referencias al profesor ni a la cátedra, y selector de materia con el mazo de Ética.
- Probado por script: una corrida completa de Ética (32 puertas, cuatro por tanda, caso antes de correr) y el arranque de Intro a la IA.
- No evaluado: cómo se ve Ética en celular, la pantalla del caso, «Ver el caso», «Cambiar de materia» y el selector de la portada no se miraron en pantalla; los sonidos siguen sin escucharse.
