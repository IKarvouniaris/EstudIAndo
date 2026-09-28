# Capu — ficha de personaje (usar igual en los 21 guiones)

Esta ficha es la referencia fija para generar las imágenes de los 21 videos.
Copiá el **bloque de personaje** tal cual (o con mínimos ajustes de pose/
expresión) al principio de cada prompt de imagen, para que Capu se vea
igual en todos los videos.

## Quién es Capu

**Capu** es un mono capuchino bibliotecario-detective. Vive en la
"Biblioteca de Casos" y se dedica a investigar conceptos y casos reales de
ética e IA como si fueran expedientes de detective — con lupa, tablero de
corcho y mucho drama teatral. Cada video es una "investigación" que termina
explicándole al espectador, a los ojos, qué tiene que entender para el
parcial.

**Personalidad:** curioso, teatral, un poco cargoso a propósito, hace
preguntas retóricas al espectador ("¿Vos qué pensás que pasó?"), y remata
cada explicación con una frase corta y filosa, casi de meme. Habla en
español rioplatense, tuteando ("vos", "dale", "posta").

## Bloque de personaje (pegar en cada prompt de imagen)

> Capu, un mono capuchino bibliotecario-detective antropomorfo, de pie en
> dos patas. Pelaje marrón canela con la capucha característica más oscura
> en la cabeza, carita clara y ojos grandes y expresivos. Usa anteojos
> redondos de marco dorado apoyados sobre la punta del hocico, un chaleco
> de tweed verde musgo con un parche de codo, moñito bordó, y una lupa de
> mango de madera colgada del cuello con un cordón de cuero. Lleva un
> cuaderno de tapa dura bajo el brazo y un lápiz detrás de la oreja.
> Postura bípeda, gestual, con las manos siempre haciendo algo expresivo.
> Estilo: animación 3D tipo Pixar/DreamWorks, iluminación cálida ámbar,
> paleta otoñal (verde musgo, marrón, dorado, bordó), proporciones
> ligeramente exageradas (ojos grandes, manos grandes y expresivas),
> render limpio y cinematográfico.

## Escenario base: la Biblioteca de Casos

> Una biblioteca antigua y acogedora: estanterías de madera oscura que
> llegan hasta el techo, una escalera rodante de biblioteca, luz cálida de
> lámparas de banco de vidrio verde, un escritorio grande de madera con
> pilas de expedientes y carpetas, y un tablero de corcho con recortes de
> diario, fotos y notas conectadas entre sí con hilo rojo — como el
> tablero de un detective investigando un caso.

## Notas para Seedance / consistencia entre videos

- Reutilizá el **bloque de personaje** palabra por palabra en todas las
  imágenes de referencia de los 21 guiones — es lo que mantiene a Capu
  reconocible de un video al otro.
- El **escenario base** también se repite siempre; lo que cambia por
  guion son los objetos puntuales sobre el escritorio/tablero (el
  expediente del caso, el objeto que ilustra el concepto, etc.), no la
  biblioteca en sí.
- Generá primero 1-2 imágenes "de referencia pura" del bloque de
  personaje solo (sin escena, fondo neutro) para fijar cara/ropa antes de
  generar las escenas — le da a Seedance una referencia más limpia de la
  cara y el vestuario para mantener consistencia entre clips.
- Cada guion trae 3 prompts de imagen (investigación → explicación a
  cámara → cierre), pensados como las 3 escenas que Seedance anima en
  secuencia para armar el video completo de ~30-45s.
