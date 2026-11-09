/* Parcial Zombie (parcial-zombie.html): las 30 puertas del 2.º parcial de Introducción a la IA.
   Preguntas escritas para el juego a partir de las clases 7 a 12 del apunte (ia-conceptual.html) y de las
   18 situaciones del simulacro escrito (tools/situaciones_ia_p2.json); no son preguntas de la cátedra.

   Cada pregunta: clase (para enlazar al apunte), tema (se muestra arriba de la consigna), q (la consigna),
   ops (tres opciones) y porque (se lee en el resumen final).
   OJO: la correcta es SIEMPRE ops[0]; el juego mezcla las opciones entre las puertas en cada partida.

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
window.PREGUNTAS_ZOMBIE_IA = [
  /* ---------- Clase 7 · inteligencia biológica y automatización ---------- */
  {
    id: 1, clase: 7, tema: "Percepción",
    q: "En un sistema de visión por computadora, ¿qué hace la etapa de percepción?",
    ops: [
      "Capta e interpreta la señal del entorno.",
      "Clasifica lo captado en categorías.",
      "Guarda los casos para consultarlos después."
    ],
    porque: "Percibir es captar e interpretar la señal. Clasificar lo percibido es reconocimiento de patrones, y guardar casos es memoria."
  },
  {
    id: 2, clase: 7, tema: "Automatización de procesos",
    q: "Un trámite manual está desordenado y se lo quiere automatizar con IA. ¿Qué hay que hacer primero?",
    ops: [
      "Rediseñar el proceso y sacar pasos de más.",
      "Entrenar un modelo con los datos actuales.",
      "Digitalizar los formularios tal como están."
    ],
    porque: "Si el proceso está desordenado, la IA automatiza el desorden. Primero se rediseña el proceso y después se suma la tecnología."
  },
  {
    id: 3, clase: 7, tema: "Reglas e IA",
    q: "Una decisión se resuelve con una condición explícita y conocida. ¿Qué herramienta conviene?",
    ops: [
      "Una regla programada.",
      "Un modelo de lenguaje.",
      "Un modelo predictivo."
    ],
    porque: "Para condiciones explícitas, una regla es más rápida, barata y confiable. La IA se reserva para clasificar texto, detectar anomalías o interpretar documentos."
  },
  {
    id: 4, clase: 7, tema: "Diseño de trámites",
    q: "A un trámite llega un caso previsto que no sigue la regla general, como una empresa extranjera. ¿Cómo se lo trata?",
    ops: [
      "Con una excepción escrita aparte.",
      "Con un rechazo automático del caso.",
      "Con la regla general, sin cambios."
    ],
    porque: "Los casos previstos que no siguen la regla general se codifican como excepciones aparte: no se rechazan ni se fuerzan dentro de la regla."
  },
  {
    id: 5, clase: 7, tema: "Automatización en salud",
    q: "A una clínica llega un paciente grave y todavía faltan sus datos administrativos. ¿Qué va primero?",
    ops: [
      "Atenderlo y estabilizarlo.",
      "Completar sus datos mínimos.",
      "Esperar el puntaje de riesgo."
    ],
    porque: "En salud las reglas admiten concesiones: la atención urgente no se bloquea por falta de datos. Un modelo de riesgo recomienda prioridades, no frena la atención."
  },
  {
    id: 6, clase: 7, tema: "Lenguaje natural",
    q: "Un modelo de lenguaje responde con un texto fluido y bien escrito. ¿Qué se puede afirmar de esa respuesta?",
    ops: [
      "Que suena plausible.",
      "Que es verdadera.",
      "Que el modelo la entiende."
    ],
    porque: "Un modelo de lenguaje predice secuencias plausibles de palabras. La fluidez no garantiza verdad ni comprensión."
  },

  /* ---------- Clase 8 · cognición distribuida y metáforas cerebro-máquina ---------- */
  {
    id: 7, clase: 8, tema: "Cognición distribuida",
    q: "¿Qué plantea la idea de cognición distribuida sobre dónde ocurre el razonamiento?",
    ops: [
      "Se reparte entre personas, artefactos y datos.",
      "Ocurre dentro de la mente de cada persona.",
      "Se concentra en el algoritmo del sistema."
    ],
    porque: "La unidad de análisis deja de ser la mente individual: el razonamiento también ocurre en documentos, bases de datos, roles y memoria de la organización."
  },
  {
    id: 8, clase: 8, tema: "Cognición distribuida",
    q: "Tableros, sensores y bases de datos conservan y transforman información. ¿Qué tipo de distribución de la cognición es?",
    ops: [
      "Material.",
      "Social.",
      "Temporal."
    ],
    porque: "Es material: los artefactos participan de la tarea. La social es el reparto entre personas con roles distintos; la temporal, el peso de los registros acumulados."
  },
  {
    id: 9, clase: 8, tema: "Metáforas cerebro-máquina",
    q: "La metáfora «el cerebro es una computadora» describe entradas, proceso y salidas. ¿Qué deja afuera?",
    ops: [
      "El cuerpo, el contexto y la plasticidad.",
      "La memoria y el procesamiento de datos.",
      "Las redes neuronales y su entrenamiento."
    ],
    porque: "La metáfora da vocabulario funcional (entradas, proceso, memoria, salidas) pero oculta el cuerpo, el contexto y la plasticidad del cerebro."
  },
  {
    id: 10, clase: 8, tema: "Riesgos de la metáfora cerebral",
    q: "¿Cómo se llama el error de tratar la predicción de un modelo como un veredicto sobre una persona?",
    ops: [
      "Determinismo.",
      "Antropomorfismo.",
      "Reduccionismo."
    ],
    porque: "Es determinismo: creer que la predicción define a la persona. Antropomorfismo es atribuirle intención al sistema; reduccionismo, ver la inteligencia como cálculo aislado."
  },
  {
    id: 11, clase: 8, tema: "Sesgo en los datos",
    q: "Un modelo no usa una variable sensible, pero sí otra que la reemplaza de forma indirecta, como el código postal. ¿Cómo se llama esa otra?",
    ops: [
      "Variable proxy.",
      "Variable objetivo.",
      "Variable de control."
    ],
    porque: "Un proxy reemplaza de forma indirecta a una variable sensible y puede discriminar igual: no alcanza con sacar las variables sensibles."
  },
  {
    id: 12, clase: 8, tema: "Equidad en servicios públicos",
    q: "Un sistema reparte el mantenimiento según los reclamos, y un barrio reclama poco. ¿Qué riesgo hay que controlar?",
    ops: [
      "Que quede relegado aunque necesite lo mismo.",
      "Que reciba más recursos de los que necesita.",
      "Que sus reclamos se cuenten dos veces."
    ],
    porque: "Menos reportes no significa menos necesidad: puede haber menos acceso o capacidad de reportar. Por eso se audita que el sistema no relegue zonas."
  },

  /* ---------- Clase 9 · patrones, símbolos y experiencia ---------- */
  {
    id: 13, clase: 9, tema: "Los tres pilares de la IA",
    q: "¿Qué pilar de la IA representa el conocimiento con reglas del tipo «si… entonces…»?",
    ops: [
      "Razonamiento simbólico.",
      "Reconocimiento de patrones.",
      "Aprendizaje por experiencia."
    ],
    porque: "El razonamiento simbólico usa reglas explícitas y auditables. El reconocimiento de patrones estima regularidades a partir de ejemplos, sin reglas escritas a mano."
  },
  {
    id: 14, clase: 9, tema: "Memoria y aprendizaje",
    q: "¿Qué tiene que pasar para decir que un sistema aprendió, y no solo que guardó datos?",
    ops: [
      "Que su desempeño mejore con los casos.",
      "Que almacene cada caso que recibe.",
      "Que recupere rápido un caso anterior."
    ],
    porque: "Aprender es mejorar el desempeño a partir de la experiencia. Guardar y recuperar casos es memoria: conserva, pero no modifica el modelo."
  },
  {
    id: 15, clase: 9, tema: "Los tres pilares de la IA",
    q: "Una red neuronal identifica gatos en videos sin que nadie le haya dicho qué es un gato. ¿Qué pilar de la IA muestra?",
    ops: [
      "Reconocimiento de patrones.",
      "Razonamiento simbólico.",
      "Planificación de acciones."
    ],
    porque: "Encontrar regularidades en datos no estructurados es reconocimiento de patrones (Google Brain, 2012). No hay reglas escritas a mano, que serían razonamiento simbólico."
  },
  {
    id: 16, clase: 9, tema: "Los tres pilares de la IA",
    q: "Un sistema antifraude se ajusta con los casos que los analistas confirman. ¿Qué pilar de la IA es ese ajuste?",
    ops: [
      "Aprendizaje por experiencia.",
      "Reconocimiento de patrones.",
      "Razonamiento simbólico."
    ],
    porque: "Ajustarse con casos confirmados es aprendizaje por experiencia. Detectar el consumo anómalo es reconocimiento de patrones; aplicar un umbral legal, razonamiento simbólico."
  },
  {
    id: 17, clase: 9, tema: "Costos en la nube",
    q: "Para comparar de forma justa el costo de dos nubes, ¿qué se compara?",
    ops: [
      "El costo total del mismo caso de carga.",
      "El precio unitario de cada servicio.",
      "La cantidad de servicios de cada catálogo."
    ],
    porque: "Cada proveedor factura unidades distintas, así que los precios unitarios no son comparables. Se modela el mismo caso y se mira el costo total (TCO)."
  },
  {
    id: 18, clase: 9, tema: "Reconocer y comprender",
    q: "Un sistema clasifica bien una grieta en la foto de un puente. ¿Qué hizo con esa grieta?",
    ops: [
      "Reconoció un patrón.",
      "Comprendió su causa.",
      "Dedujo con una regla."
    ],
    porque: "Clasificar es reconocer un patrón. Comprender por qué apareció la grieta es otro nivel, y deducir con reglas sería razonamiento simbólico."
  },

  /* ---------- Clase 10 · planificación y toma de decisiones ---------- */
  {
    id: 19, clase: 10, tema: "Planificación",
    q: "En un problema de planificación, ¿para qué sirve el criterio?",
    ops: [
      "Para elegir entre los planes que llegan a la meta.",
      "Para definir a dónde tiene que llegar el plan.",
      "Para limitar las acciones que están permitidas."
    ],
    porque: "La meta dice a dónde llegar; el criterio (más corto, más barato, más seguro) elige entre los planes que la cumplen. Lo que limita las acciones son las restricciones."
  },
  {
    id: 20, clase: 10, tema: "Predicción y decisión",
    q: "Un modelo predice que un pedido va a llegar tarde. ¿Qué falta para que haya una decisión?",
    ops: [
      "Un objetivo y una política.",
      "Una predicción con mayor precisión.",
      "Un historial más largo de pedidos."
    ],
    porque: "Una predicción todavía no es una decisión: decidir es comparar consecuencias contra un objetivo y actuar según una política."
  },
  {
    id: 21, clase: 10, tema: "Cronograma del proyecto",
    q: "En el cronograma de un proyecto, ¿qué es la ruta crítica?",
    ops: [
      "La cadena de tareas que define la duración total.",
      "La lista de tareas que más pesan en el costo.",
      "El grupo de tareas que se hacen en paralelo."
    ],
    porque: "La ruta crítica es la cadena de actividades que fija la duración total: un atraso en cualquiera de ellas retrasa todo el proyecto."
  },

  /* ---------- Clase 11 · de la IA estrecha a la superinteligencia ---------- */
  {
    id: 22, clase: 11, tema: "Tipos de IA",
    q: "Un traductor automático funciona en cien idiomas, pero solo traduce. ¿Qué tipo de IA es?",
    ops: [
      "IA estrecha.",
      "IA general.",
      "Superinteligencia."
    ],
    porque: "Es IA estrecha (Narrow AI): hace una sola tarea. Muchos idiomas no son muchos dominios; una IA general llevaría lo aprendido a tareas distintas."
  },
  {
    id: 23, clase: 11, tema: "Tipos de IA",
    q: "¿Qué capacidad distingue a una IA general de una IA estrecha?",
    ops: [
      "Transferir lo aprendido a otros dominios.",
      "Procesar muchos más datos en menos tiempo.",
      "Rendir mejor en su tarea específica."
    ],
    porque: "Una IA general aplicaría lo aprendido en un dominio a otro sin reentrenarla. Más velocidad o mejor rendimiento en una tarea siguen siendo IA estrecha."
  },
  {
    id: 24, clase: 11, tema: "Tipos de IA",
    q: "Un sistema coordina diez IA estrechas, una por tarea. ¿Qué es el conjunto?",
    ops: [
      "Un conjunto de IA estrechas.",
      "Una IA general en formación.",
      "Una superinteligencia parcial."
    ],
    porque: "Coordinar modelos no es transferir conocimiento: cada uno sigue atado a su tarea, así que el conjunto sigue siendo IA estrecha."
  },
  {
    id: 25, clase: 11, tema: "Superinteligencia",
    q: "¿Qué es hoy la superinteligencia?",
    ops: [
      "Una hipótesis sobre el futuro.",
      "Un producto que ya está disponible.",
      "Una etapa de la IA estrecha."
    ],
    porque: "La superinteligencia (superar ampliamente a las personas en casi todo) es una hipótesis: no existe como producto y no se afirma sin evidencia."
  },
  {
    id: 26, clase: 11, tema: "Superinteligencia",
    q: "¿Qué tendría una superinteligencia que no tendría una IA general?",
    ops: [
      "Una ventaja muy amplia sobre las personas.",
      "Una flexibilidad parecida a la humana.",
      "Un gran rendimiento en una sola tarea."
    ],
    porque: "La IA general alude a una flexibilidad comparable a la humana; la superinteligencia, a una ventaja muy superior y sostenida. Rendir en una sola tarea es IA estrecha."
  },
  {
    id: 27, clase: 11, tema: "Riesgos de una IA avanzada",
    q: "Un sistema cumple al pie de la letra la métrica que le dieron y aun así daña el propósito buscado. ¿Qué riesgo es?",
    ops: [
      "Alineación.",
      "Concentración.",
      "Seguridad."
    ],
    porque: "Es alineación: un objetivo mal especificado optimiza la métrica y daña la finalidad. Concentración es el poder en pocos actores; seguridad, el uso malicioso y las fallas."
  },

  /* ---------- Clase 12 · escenarios, impacto y gobernanza ---------- */
  {
    id: 28, clase: 12, tema: "Reglas e IA",
    q: "Al automatizar un proceso, ¿para qué parte se reserva la IA?",
    ops: [
      "Para la ambigüedad, donde la regla no alcanza.",
      "Para los pasos estables, que no cambian.",
      "Para las decisiones finales más sensibles."
    ],
    porque: "Los pasos estables se automatizan con reglas y la IA se aplica a la ambigüedad. Las decisiones sensibles conservan revisión humana."
  },
  {
    id: 29, clase: 12, tema: "Ética antes de desplegar",
    q: "¿Qué pregunta el principio ético de autonomía antes de desplegar un sistema de IA?",
    ops: [
      "¿La persona sabe que interactúa con una IA?",
      "¿El error afecta distinto a distintos grupos?",
      "¿Quién corrige y compensa el error?"
    ],
    porque: "Autonomía es saber que se interactúa con una IA. La pregunta por los grupos es de justicia, y la de quién corrige, de responsabilidad."
  },
  {
    id: 30, clase: 12, tema: "Gobernanza",
    q: "¿Qué tiene que poder hacerse con un sistema de IA al final de su ciclo de vida?",
    ops: [
      "Retirarlo de operación.",
      "Reentrenarlo sin límite.",
      "Extenderlo a más áreas."
    ],
    porque: "El ciclo de gobernanza (caso de uso, datos, modelo, despliegue, operación) termina con la retirada: hay que poder apagar el sistema."
  }
];
