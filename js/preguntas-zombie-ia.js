/* Parcial Zombie (parcial-zombie.html): las 30 puertas del 2.º parcial de Introducción a la IA.
   Preguntas escritas para el juego a partir de las clases 7 a 12 del apunte (ia-conceptual.html) y de las
   18 situaciones del simulacro escrito (tools/situaciones_ia_p2.json); no son preguntas de la cátedra.
   Las consignas y los «porque» preguntan por el contenido (diapositivas y casos prácticos) y no nombran
   al profesor, a la cátedra ni «la clase N»: el número de clase va aparte, en el campo clase.
   Cada pregunta: clase (para enlazar al apunte), q (la consigna), ops (tres opciones) y porque (una línea).
   OJO: la correcta es SIEMPRE ops[0]; el juego mezcla las opciones entre las tres puertas en cada partida.
   Reglas del banco (CLAUDE.md): las tres opciones tienen largo parejo, la correcta no es sistemáticamente
   la más larga ni la más corta, y los distractores no se delatan con «siempre / nunca / ninguno».
   Para medirlo: node tools/medir_preguntas_zombie.js */
window.PREGUNTAS_ZOMBIE_IA = [
  /* ---------- Clase 7 · inteligencia biológica y automatización ---------- */
  {
    id: 1, clase: 7,
    q: "Una cámara revisa etiquetas torcidas en una línea de envases. ¿Qué separa a la percepción del reconocimiento de patrones?",
    ops: [
      "La percepción capta la señal y el reconocimiento la clasifica.",
      "La percepción clasifica la señal y el reconocimiento la capta.",
      "Son dos nombres para la misma etapa del sistema de visión."
    ],
    porque: "Percibir es captar e interpretar la señal del entorno; reconocer patrones es identificar regularidades o clases en lo ya percibido."
  },
  {
    id: 2, clase: 7,
    q: "¿Qué pasa si se le suma IA a un proceso que está desordenado?",
    ops: [
      "La IA automatiza el desorden.",
      "La IA ordena el proceso con el uso.",
      "El modelo compensa el desorden solo."
    ],
    porque: "Si el proceso está desordenado, la IA automatiza el desorden: primero se rediseña el proceso y después se incorpora la tecnología."
  },
  {
    id: 3, clase: 7,
    q: "Hay que comprobar si un DNI coincide con un nombre en una base ordenada. ¿Qué conviene usar?",
    ops: [
      "Una regla o consulta estructurada: es más rápida y más barata.",
      "Un modelo de lenguaje, que interpreta mejor los datos del padrón.",
      "Un clasificador entrenado con los trámites de años anteriores."
    ],
    porque: "Si una regla explícita alcanza para decidir, usar IA ahí es más caro, más lento y no aporta nada."
  },
  {
    id: 4, clase: 7,
    q: "Una empresa del Mercosur no encaja en la regla general del trámite. ¿Qué corresponde hacer?",
    ops: [
      "Codificar una excepción explícita, aparte de la regla principal.",
      "Rechazar el trámite de forma automática por no cumplir la regla.",
      "Forzar el caso dentro de la regla general para no demorarlo."
    ],
    porque: "Las excepciones son situaciones previstas que no siguen la regla general: se codifican aparte, no se fuerzan ni se rechazan."
  },
  {
    id: 5, clase: 7,
    q: "A una clínica llega un paciente inconsciente y faltan sus datos administrativos. ¿Qué debe hacer el sistema?",
    ops: [
      "Permitir la atención urgente y completar los datos después.",
      "Frenar el ingreso hasta que alguien cargue los datos mínimos.",
      "Dejar que el modelo de riesgo decida si se lo atiende o no."
    ],
    porque: "En salud las reglas deben admitir concesiones: no se bloquea la atención urgente por falta de información."
  },
  {
    id: 6, clase: 7,
    q: "Un asistente de voz municipal contesta con mucha fluidez. ¿Qué garantiza esa fluidez?",
    ops: [
      "Nada por sí sola: fluidez no es comprensión ni verdad.",
      "Que entendió el pedido, porque la respuesta es coherente.",
      "Que el dato es correcto, porque sale del entrenamiento."
    ],
    porque: "El PLN genera texto prediciendo secuencias plausibles: la fluidez no garantiza comprensión ni verdad."
  },

  /* ---------- Clase 8 · cognición distribuida y metáforas cerebro-máquina ---------- */
  {
    id: 7, clase: 8,
    q: "En la cognición distribuida, ¿cuál es la unidad de análisis?",
    ops: [
      "El sistema sociotécnico: personas, artefactos, datos y tiempo.",
      "La mente individual de quien toma la decisión final del caso.",
      "El algoritmo, que concentra todo el razonamiento del sistema."
    ],
    porque: "La unidad deja de ser la mente individual: el razonamiento también ocurre en documentos, bases de datos, roles y memoria de la organización."
  },
  {
    id: 8, clase: 8,
    q: "En un equipo de mantenimiento, los tableros, sensores y bases que conservan y transforman información son distribución…",
    ops: [
      "Material: los artefactos participan de la tarea cognitiva.",
      "Social: el razonamiento se reparte entre roles distintos.",
      "Temporal: la decisión depende de registros acumulados."
    ],
    porque: "La distribución material es la de documentos, tableros, sensores, modelos y bases; la social es entre personas y la temporal, entre momentos."
  },
  {
    id: 9, clase: 8,
    q: "¿Qué deja afuera la metáfora «el cerebro es una computadora»?",
    ops: [
      "El cuerpo, el contexto y la plasticidad.",
      "Las entradas, el proceso y las salidas.",
      "Las redes neuronales y su aprendizaje."
    ],
    porque: "Esa metáfora aporta vocabulario funcional (entradas, procesamiento, memoria, salidas) pero oculta el cuerpo, el contexto y la plasticidad."
  },
  {
    id: 10, clase: 8,
    q: "«El modelo dice riesgo alto, entonces se rechaza». ¿Qué riesgo de la metáfora cerebral aparece?",
    ops: [
      "Determinismo: tomar la predicción como un veredicto.",
      "Antropomorfismo: atribuirle intención al sistema.",
      "Reduccionismo: ignorar el cuerpo y la cultura."
    ],
    porque: "Determinismo es suponer que una predicción define a una persona. La predicción es una señal para revisar, no un veredicto."
  },
  {
    id: 11, clase: 8,
    q: "Un modelo de riesgo comercial no usa el origen de la persona, pero sí su código postal. ¿Cuál es el problema?",
    ops: [
      "El código postal actúa como proxy y puede discriminar igual.",
      "No hay problema: alcanza con excluir las variables sensibles.",
      "El código postal es un dato sensible y no se puede guardar."
    ],
    porque: "No alcanza con sacar las variables sensibles: hay que evitar los proxies, que las reemplazan de forma indirecta."
  },
  {
    id: 12, clase: 8,
    q: "En la priorización de mantenimiento público, una zona reporta menos fallas que las demás. ¿Cómo hay que leerlo?",
    ops: [
      "Menos reportes no significa menos necesidad.",
      "Es una zona en buen estado, que puede esperar.",
      "Es un dato confiable: lo cargan los vecinos."
    ],
    porque: "El riesgo específico del caso es discriminar zonas que reportan menos por tener menor acceso o capacidad de reporte."
  },

  /* ---------- Clase 9 · patrones, símbolos y experiencia ---------- */
  {
    id: 13, clase: 9,
    q: "«SI el paciente tiene fiebre y tos, ENTONCES puede tener una infección respiratoria» es un ejemplo de…",
    ops: [
      "Razonamiento simbólico: una regla explícita y auditable.",
      "Reconocimiento de patrones: una regularidad aprendida.",
      "Aprendizaje por experiencia: mejora con cada caso nuevo."
    ],
    porque: "El razonamiento simbólico representa el conocimiento con reglas si–entonces, y cada conclusión se explica con la regla que la produjo."
  },
  {
    id: 14, clase: 9,
    q: "Un sistema guarda todo el historial de incidencias técnicas de la empresa. ¿Eso es aprender?",
    ops: [
      "No: aprender exige que el desempeño cambie con los casos.",
      "Sí: cuanto más historial guarda, más aprende el sistema.",
      "Sí, si ese historial queda guardado en una base vectorial."
    ],
    porque: "La memoria conserva y recupera; el aprendizaje modifica el modelo a partir de resultados confirmados."
  },
  {
    id: 15, clase: 9,
    q: "En 2012, Google Brain agrupó gatos en videos de YouTube sin que nadie le dijera qué era un gato. ¿Qué demuestra?",
    ops: [
      "Que se aprenden patrones de datos no estructurados.",
      "Que una red neuronal comprende lo que clasifica.",
      "Que las reglas si–entonces escalan a millones de videos."
    ],
    porque: "El hito muestra que la IA puede aprender patrones a partir de datos no estructurados; reconocer no es comprender."
  },
  {
    id: 16, clase: 9,
    q: "Un sistema de fraude detecta un consumo anómalo, aplica un umbral legal y se ajusta con los casos confirmados. ¿Qué pilares combina?",
    ops: [
      "Los tres: patrones, reglas y aprendizaje.",
      "Solo patrones, en tres etapas seguidas.",
      "Patrones y reglas; el ajuste es memoria."
    ],
    porque: "Reconoce un patrón anómalo, aplica reglas antes de alertar y aprende de los casos que los analistas confirman."
  },
  {
    id: 17, clase: 9,
    q: "Hay que comparar el costo de dos nubes para procesar eventos en tiempo real. ¿Cómo se hace una comparación justa?",
    ops: [
      "Modelar el mismo caso de carga y comparar el costo total.",
      "Comparar el precio unitario que publica cada proveedor.",
      "Elegir la que tenga el catálogo de servicios más amplio."
    ],
    porque: "Cada proveedor factura unidades distintas: lo que importa es el costo total (TCO) del caso completo, no el precio unitario."
  },
  {
    id: 18, clase: 9,
    q: "Un sistema clasifica bien una grieta en la foto de un puente. ¿Qué error típico hay que evitar?",
    ops: [
      "Confundir reconocer la grieta con comprender su causa.",
      "Confundir la foto del puente con un dato estructurado.",
      "Confundir la detección visual con un motor de reglas."
    ],
    porque: "Detectar, reconocer el patrón y comprender la causa son tres niveles distintos: el sistema clasifica la grieta sin saber por qué apareció."
  },

  /* ---------- Clase 10 · planificación y toma de decisiones ---------- */
  {
    id: 19, clase: 10,
    q: "«Ubicar todas las clases» y «con la menor cantidad de cambios de aula» son, en ese orden…",
    ops: [
      "La meta y el criterio para elegir entre planes.",
      "El criterio y la meta que el plan debe cumplir.",
      "Dos restricciones del mismo problema de aulas."
    ],
    porque: "La meta es a dónde hay que llegar; el criterio permite elegir entre los planes que la cumplen."
  },
  {
    id: 20, clase: 10,
    q: "El modelo avisa: «este pedido llegará tarde». ¿Por qué eso todavía no es una decisión?",
    ops: [
      "Falta un objetivo y una política de actuación.",
      "Falta que el modelo tenga más datos históricos.",
      "Falta que apruebe quien paga el proyecto."
    ],
    porque: "Una predicción no es una decisión: decidir es comparar consecuencias contra un objetivo y actuar según una política."
  },
  {
    id: 21, clase: 10,
    q: "En un diagrama de Gantt, ¿qué es la ruta crítica?",
    ops: [
      "La cadena de actividades que define la duración total.",
      "La lista de tareas que más pesan en el presupuesto.",
      "El grupo de tareas que pueden hacerse en paralelo."
    ],
    porque: "Un atraso en una actividad de la ruta crítica retrasa todo el proyecto: por eso esas actividades reciben atención especial."
  },

  /* ---------- Clase 11 · de la IA estrecha a la superinteligencia ---------- */
  {
    id: 22, clase: 11,
    q: "Un traductor automático de atención sanitaria maneja cien idiomas. ¿Qué tipo de IA es?",
    ops: [
      "Estrecha: hace una sola tarea, traducir, en muchos idiomas.",
      "General: transfiere lo que aprendió entre cien dominios.",
      "Casi general: cada idioma nuevo amplía su generalidad."
    ],
    porque: "Muchos idiomas no son muchos dominios: sigue siendo IA estrecha (Narrow AI) porque no generaliza fuera de su tarea."
  },
  {
    id: 23, clase: 11,
    q: "¿Qué exigiría una IA general (AGI) que la IA estrecha no tiene?",
    ops: [
      "Transferir lo aprendido a otro dominio sin reentrenar.",
      "Procesar más datos y más rápido que una persona.",
      "Integrar varios modelos estrechos en un producto."
    ],
    porque: "Una AGI no sería solo «más grande»: exigiría abstracción, transferencia entre dominios y adaptación a situaciones nuevas."
  },
  {
    id: 24, clase: 11,
    q: "Un organismo del Estado coordina diez IA estrechas dentro de un mismo agente. ¿Eso es una AGI?",
    ops: [
      "No: orquestar modelos no es transferir conocimiento.",
      "Sí: al sumar dominios, el sistema se vuelve general.",
      "Sí, porque resuelve tareas de áreas distintas."
    ],
    porque: "Integrar varias Narrow AI en un mismo producto no alcanza: la orquestación no es transferencia."
  },
  {
    id: 25, clase: 11,
    q: "Una empresa afirma que su sistema ya es una superinteligencia. ¿Cómo hay que tomar esa afirmación?",
    ops: [
      "Como una hipótesis: no se afirma sin evidencia.",
      "Como un producto que ya usan las grandes empresas.",
      "Como la etapa que sigue al completar la IA estrecha."
    ],
    porque: "La superinteligencia es una hipótesis, no un producto existente; debatirla exige declarar supuestos, probabilidades e incertidumbres."
  },
  {
    id: 26, clase: 11,
    q: "Una IA diseña puentes originales para una constructora y no sabe hacer otra cosa. ¿Qué prueba eso?",
    ops: [
      "Creatividad especializada, no inteligencia general.",
      "Inteligencia general, porque produjo algo novedoso.",
      "Superinteligencia dentro del dominio de la ingeniería."
    ],
    porque: "Generar algo novedoso en un solo dominio no prueba inteligencia general: es creatividad especializada."
  },
  {
    id: 27, clase: 11,
    q: "Un sistema de red eléctrica optimiza la métrica que le dieron y termina dañando la finalidad. ¿Qué riesgo es?",
    ops: [
      "Alineación: el objetivo quedó mal especificado.",
      "Concentración: pocos actores controlan el sistema.",
      "Seguridad: alguien lo usó de forma maliciosa."
    ],
    porque: "Alineación: un objetivo mal especificado puede optimizar la métrica y dañar la finalidad. Se necesitan restricciones, verificación y supervisión."
  },

  /* ---------- Clase 12 · escenarios, impacto y gobernanza ---------- */
  {
    id: 28, clase: 12,
    q: "Un mismo problema se puede encarar con IA o sin ella. ¿Cuándo no hace falta IA?",
    ops: [
      "Cuando una regla simple resuelve el problema.",
      "Cuando el volumen de casos es demasiado alto.",
      "Cuando una persona ya revisa cada resultado."
    ],
    porque: "Si una regla simple resuelve el problema, no hace falta IA: la IA se reserva para la ambigüedad, donde la regla no alcanza."
  },
  {
    id: 29, clase: 12,
    q: "De las cinco preguntas éticas antes de desplegar, ¿cuál corresponde a la autonomía?",
    ops: [
      "¿La persona sabe que interactúa con una IA?",
      "¿El error afecta distinto a distintos grupos?",
      "¿Quién corrige, compensa y aprende del error?"
    ],
    porque: "Autonomía: si una persona no sabe que habla con una IA, decide distinto. Las otras dos son justicia y responsabilidad."
  },
  {
    id: 30, clase: 12,
    q: "¿Con qué etapa termina el ciclo de vida de la gobernanza de un sistema de IA?",
    ops: [
      "Operación, que incluye poder retirar el sistema.",
      "Despliegue, cuando el modelo pasa a producción.",
      "Modelo, cuando supera las pruebas de sesgo."
    ],
    porque: "El ciclo es caso de uso, datos, modelo, despliegue y operación, y termina con «retirada»: hay que poder apagar el sistema."
  }
];
