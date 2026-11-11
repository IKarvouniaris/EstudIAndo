# Armá el flujo — diseño

Juego de `flujo-ia.html`. Aprobado el 2026-11-10 en la conversación, después de tres maquetas.

## In your words

> me gustaria agregar un juego para armar el flujo para automatizar un proceso, usando de ejemplo los problemas de la catedra a lo largo del estudio pra el sgundo parcial, se me ocurre que sean cajas que tenemos que enlazar para demostrar como automatizariamos, tienen que estar todos los pasos que vimos y las metricas y todo, completo. Primero usariamos un ejemplo antes de comenzar el juego y luego tendriamos el "pizarron" vacio y tendriamos que asociar las cajas nosotros, se entiende? dame ejemplos de lo que harias (visualmente) y luego implementamos el diseño final

Elegido entre dos diseños: **cables sobre carriles** (los carriles son solo una guía y el jugador traza los cables), en lugar de ranuras fijas por tipo de caja.

## Qué es

Un pizarrón con cuatro carriles (Entrada, Proceso, Decisión, Control) donde se arma, con cajas y cables, el flujo con el que se automatizaría el proceso de una situación del simulacro. Primero se mira un ejemplo resuelto caja por caja; después el pizarrón arranca vacío.

## Decisiones tomadas por Claude (no pedidas)

- Se hicieron las **18 situaciones** (primero 6 y después las 12 restantes), agrupadas por nivel en la portada; la 1 se usa además como ejemplo. *(guessed)*
- Nivel bajo: huecos punteados donde faltan cajas de la solución modelo; en todos los niveles, un panel «Mi respuesta» que redacta el texto del parcial con las cajas y cables puestos. *(pedido por el usuario; el formato es de Claude)*
- Se puede jugar en celular: tocar una caja la suma sola en su carril, y los cables se tiran arrastrando o tocando el círculo de salida y después la caja de destino. *(guessed)*
- Hay **cajas trampa** (errores típicos del apunte) mezcladas sin marca. *(guessed)*
- Hay varias soluciones válidas: los criterios piden condiciones sobre el grafo (cajas, caminos, cadenas) y no un trazado exacto. *(guessed)*
- La revisión muestra el porqué de los criterios fallidos solo si se lo pide (así se puede reintentar sin ver la respuesta), y se puede ver una solución modelo. *(guessed)*
- Estrellas: 3 con todo bien y a lo sumo una pista; 2 con todo bien y más pistas, o con 80 % o más; 1 con 60 % o más. *(guessed)*
- Sin cuenta ni Supabase: las estrellas quedan en el navegador. *(guessed)*

## Out of scope

- Ranking o cuenta.
- Rotar el pizarrón o hacerlo más ancho que la pantalla (en celular vertical los carriles son angostos).

## Estado al entregar

Probado en el navegador con mouse emulado en pantalla de celular y en escritorio. No se probó con un dedo real ni girando el celular. Las soluciones y los criterios los escribió Claude: conviene revisarlos.
