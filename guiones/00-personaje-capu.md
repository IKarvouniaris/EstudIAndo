# Capu — ficha de personaje (usar igual en los 21 guiones)

Esta ficha es la referencia fija para generar las imágenes de los 21
videos. Copiá el **bloque de personaje** tal cual (o con mínimos ajustes
de pose/expresión) al principio de cada prompt de imagen, para que Capu
se vea igual en todos los videos.

**Importante:** la descripción es intencionalmente simple — pocos
elementos, bien definidos. Cuantos más accesorios y detalles chicos tenga
el prompt, más le cuesta a la IA mantenerlos iguales toma tras toma.
Menos es más acá.

## Quién es Capu

**Capu** es un mono capuchino bibliotecario. Vive en la "Biblioteca de
Casos" y se dedica a investigar conceptos y casos reales de ética e IA
como si fueran expedientes. Cada video es una "investigación" que
termina explicándole al espectador, a los ojos, qué tiene que entender
para el parcial.

**Personalidad:** curioso, teatral, un poco cargoso a propósito, hace
preguntas retóricas al espectador ("¿Vos qué pensás que pasó?"), y remata
cada explicación con una frase corta y filosa, casi de meme. Habla en
español rioplatense, tuteando ("vos", "dale", "posta").

## Bloque de personaje (pegar en cada prompt de imagen)

> Capu, un mono capuchino real, de pie en dos patas. Estilo **realista /
> fotográfico** (no caricatura, no animación 3D estilo Pixar): pelaje
> marrón canela con textura natural, proporciones y anatomía de un mono
> capuchino real, cara y ojos expresivos pero anatómicamente creíbles.
> Único accesorio fijo: un chaleco simple de tela marrón/verde oscuro,
> sin estampados. Postura bípeda, gestual. Iluminación cálida, natural,
> tipo fotografía o render fotorrealista.

## Escenario base: la Biblioteca de Casos

> Una biblioteca antigua y acogedora: estanterías de madera oscura,
> escritorio de madera con algunos papeles, y un tablero de corcho con
> recortes de diario y notas conectadas con hilo rojo. Luz cálida.

## Notas para Seedance / consistencia entre videos

- Reutilizá el **bloque de personaje** palabra por palabra en todas las
  imágenes de referencia de los 21 guiones — es lo que mantiene a Capu
  reconocible de un video al otro.
- No agregues accesorios nuevos por guion (anteojos, lupas, corbatas,
  cuadernos, etc.). Un solo elemento fijo (el chaleco) alcanza para que
  se reconozca como "el mismo personaje" sin saturar el prompt.
- El **escenario base** también se repite siempre; lo que cambia por
  guion es un solo objeto puntual sobre el escritorio/tablero (el
  expediente del caso, el objeto que ilustra el concepto), no la
  biblioteca en sí ni la cantidad de objetos en escena.
- Generá primero 1-2 imágenes "de referencia pura" del bloque de
  personaje solo (sin escena, fondo neutro) para fijar cara/pelaje antes
  de generar las escenas.
- Cada guion trae 3 prompts de imagen (investigación → explicación →
  cierre), pensados como las 3 escenas que Seedance anima en secuencia
  para armar el video completo de ~30-45s.
