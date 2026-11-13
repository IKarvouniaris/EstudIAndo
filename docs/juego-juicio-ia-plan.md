# Plan: «El Juicio», juego de abogacía de IA para 4 (borrador)

Estado: **idea, nada construido**. Este documento ordena cómo se podría hacer con lo que ya existe, qué falta y qué hay que decidir antes.

## La idea
Cuatro jugadores reciben un caso. Un sorteo les asigna un rol a cada uno. Hablan por micrófono, por turnos, y todo queda transcripto. Al final una IA compara cada transcripción con lo que se espera de ese rol (según el apunte) y da un porcentaje. Gana quien cumplió más de lo que su rol exigía.

**Roles.** Los de la cátedra son **víctima, fiscalía, defensa y juzgado** (así están en `etica.html`, 7.10 y 8.13, y en el simulacro por roles). Pediste «jurado»: con 4 jugadores conviene dejar los 4 de la cátedra y sumar el jurado como variante con 5 jugadores, o cambiarlo por la fiscalía si preferís ese juego. **Decidir.**

## Qué ya está hecho y se reutiliza
| Pieza | Dónde | Para qué sirve |
|---|---|---|
| Sala en vivo para 4 con código, presencia, mensajes y cuenta regresiva | `js/zombie-sala.js` (Supabase Realtime) | Mismo esqueleto para el lobby y para pasar los turnos |
| Login con Google | `js/auth.js` | Identidad de cada jugador |
| Casos con hechos y derechos en juego | `js/casos-etica-roles.js`, `js/simulacros-etica-p2-*.js` | Material de los casos |
| «Qué debe argumentar cada rol» | `etica.html` 7.10 y 8.13 | Base de las rúbricas |
| Funciones en el servidor que llaman a Claude sin exponer la clave | `supabase/functions/corregir-*` | Modelo para la función que evalúe transcripciones |
| Texto de las clases como contexto de corrección | `tools/seed_ia_parcial2.py` | Mismo método: pasarle a la IA el apunte relevante |

## Cómo sería una partida
1. **Sala y sorteo.** Lobby como el del zombie. El anfitrión elige caso y tiempo; al empezar, el sistema sortea los roles y cada uno ve solo su rol y lo que debe lograr.
2. **Fases con turnos**, dirigidas por el anfitrión y cronometradas (todos las ven):
   1. Lectura del caso.
   2. Apertura: fiscalía, defensa, víctima.
   3. Preguntas cruzadas.
   4. Alegatos finales.
   5. Sentencia del juzgado, fundada.
3. **Micrófono por turnos.** Solo se graba quien tiene la palabra (botón o automático). Así cada transcripción ya sale atribuida a su jugador y no hace falta separar voces.
4. **Revisión.** Cada jugador puede corregir su transcripción antes de mandarla (la voz a texto se equivoca).
5. **Evaluación.** Una función del servidor recibe las 4 transcripciones, el caso y la rúbrica, y devuelve un puntaje por criterio con citas textuales.
6. **Resultado.** Porcentaje por jugador, ranking, y por cada criterio qué dijo y qué faltó, con enlace al apartado del apunte.

## Piezas técnicas y decisiones
**Voz a texto.** Opción simple: el reconocimiento de voz del navegador (Web Speech API), gratis y sin servidor, transcribe en el dispositivo de cada jugador. Limitación: anda bien en Chrome y Edge, mal en Firefox y a veces en iPhone, y la calidad depende del micrófono. Alternativa más robusta pero con costo: mandar el audio a un servicio de transcripción. Recomiendo empezar por el navegador.

**Audio entre jugadores.** No lo resuelve la app en la primera versión: se juega en la misma sala o en una llamada aparte (Meet, Discord). La app solo transcribe a cada uno. Meter audio entre jugadores (WebRTC) sería otra etapa.

**Evaluación con IA.** Función en Supabase (como `corregir-situacion`) que llama a Claude. La clave queda en el servidor. Pasos:
- Se le da la rúbrica del rol, el caso y el texto del apunte que corresponde (el mismo método de contexto que ya usamos).
- Debe devolver JSON fijo: por criterio, puntaje, cita textual que lo justifica y devolución.
- Temperatura baja y criterios cerrados, para que dos corridas no den resultados muy distintos.
- Se evalúa **una sola vez al final** y con tope de longitud: así se controla el gasto de tokens, que te preocupaba.

**Rúbricas por rol.** Salen de lo que el apunte dice que debe hacer cada uno (por ejemplo: la víctima plantea el daño y el nexo; la fiscalía identifica conducta, tipo y dolo; la defensa propone una versión alternativa y cuestiona la prueba; el juzgado pondera y funda). Cada criterio vale un peso y lleva el `ref` del apartado, como las cajas del juego «Armá el flujo».

**Justicia del puntaje.** Los roles no son igual de difíciles. Se mide cada uno contra **su propia rúbrica** (porcentaje de lo que su rol exigía), no contra los demás. Los errores de la transcripción no deben castigar: el evaluador tiene que tolerar palabras mal reconocidas.

**Privacidad.** Hay que avisar y pedir consentimiento antes de grabar. No se guarda el audio, solo el texto, y se borra a los pocos días. Va en línea con la Ley 25.326 que vemos en la materia.

## Etapas sugeridas
| Etapa | Qué se entrega | Se puede probar |
|---|---|---|
| 0 | Sala y sorteo de roles; el caso se muestra con cada rol privado | Ya casi está (reusa la sala) |
| 1 | Turnos y cronómetros, **respondiendo por escrito** en vez de voz | Con 4 personas |
| 2 | Rúbricas por rol y casos listos para jugar | A mano, comparando con tu criterio |
| 3 | Voz a texto y revisión de la transcripción | En Chrome |
| 4 | Función de evaluación con IA y resultado con citas | Calibrando con partidas de prueba |
| 5 | Ranking, historial y variantes (jurado, casos nuevos) | |

Empezar por escrito (etapa 1) permite validar el juego y las rúbricas **antes** de gastar tiempo en voz y tokens en IA.

## Riesgos
- **La IA evaluadora es una opinión**, no una verdad: puede ser inconsistente. Mitigación: rúbrica cerrada, citas obligatorias, y poder ver por qué puntuó así.
- **Voz a texto en español rioplatense** puede fallar con jerga o nombres propios. Mitigación: revisión previa y lista de términos.
- **Costo de tokens.** Una partida son unas pocas miles de palabras; una evaluación por partida es controlable, pero conviene un límite por usuario al día.
- **Trampas:** como todo corre en el navegador, alguien puede pegar un texto armado. Para estudiar entre amigos es aceptable.
- **Contenido del caso:** los casos reales de la cátedra no se copian; se usan los propios del repo (repo público).

## Decisiones que necesito de vos
1. ¿Roles de la cátedra (víctima, fiscalía, defensa, juzgado) o con jurado?
2. ¿Primera versión por escrito (etapa 1) o directo con voz?
3. ¿Quién paga la IA? Si es tu cuenta, ¿límite de partidas por día?
4. ¿Casos: los del repo o armamos algunos nuevos pensados para actuar (más cortos, con tensión entre roles)?
