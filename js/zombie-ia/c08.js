/* Nivel 2 de Parcial Zombie · Introducción a la IA · clase 8. Formato y pautas: js/preguntas-zombie-ia.js */
(window.NIVELES_ZOMBIE_IA = window.NIVELES_ZOMBIE_IA || []).push({
  clase: 8,
  titulo: "Cognición distribuida y neurociencia",
  preguntas: [
    /* 8.1 · qué es la cognición */
    { ref: "8.1", tema: "Qué es la cognición", q: "¿Cómo se define la cognición?",
      ops: ["Procesos para adquirir y usar información.", "Capacidad de sentir emociones y reaccionar.", "Conjunto de reflejos del sistema nervioso."],
      porque: "La cognición es el conjunto de procesos mentales que permiten adquirir, procesar, almacenar, recuperar y utilizar información para interactuar con el mundo. Viene de «cognitio», acto de conocer." },
    { ref: "8.1", tema: "Qué es la cognición", q: "¿Qué proceso cognitivo selecciona la información relevante?",
      ops: ["La atención.", "La memoria.", "El lenguaje."],
      porque: "La atención selecciona lo relevante. La percepción interpreta estímulos, la memoria recuerda experiencias, el pensamiento analiza y el lenguaje comunica y representa ideas." },
    { ref: "8.1", tema: "Cognición y cultura", q: "¿Qué efecto tiene la cultura sobre la cognición?",
      ops: ["Moldea cómo percibimos y decidimos.", "Es indiferente para el pensamiento.", "Impone una única forma de pensar."],
      porque: "No hay una única forma de cognición: la cultura moldea cómo percibimos, pensamos y decidimos. Son tendencias generales, no reglas sobre personas concretas." },

    /* 8.2 · consciente y subconsciente */
    { ref: "8.2", tema: "Consciente y subconsciente", q: "¿Dónde ocurre la mayor parte de la actividad cognitiva?",
      ops: ["En el nivel subconsciente.", "En el nivel plenamente consciente.", "En la memoria de trabajo."],
      porque: "La mayor parte ocurre de forma subconsciente e influye en lo que pensamos, sentimos y hacemos sin que lo notemos. Lo consciente es la parte visible del iceberg." },
    { ref: "8.2", tema: "Consciente y subconsciente", q: "¿Qué distingue al modo de razonamiento profundo de un chatbot?",
      ops: ["Consulta más fuentes y tarda más.", "Tiene conciencia de lo que responde.", "Usa una parte subconsciente distinta."],
      porque: "Es una diferencia de cómputo y de búsqueda, no de experiencia. Decir que ese modo es su conciencia es caer en el antropomorfismo." },

    /* 8.3 · la IA inspirada en la cognición */
    { ref: "8.3", tema: "IA inspirada en la cognición", q: "¿Qué inspira a las redes neuronales artificiales?",
      ops: ["La estructura del cerebro.", "El lenguaje de las personas.", "La percepción del entorno."],
      porque: "Las redes neuronales se inspiran en la estructura del cerebro. El aprendizaje automático, en aprender de la experiencia; la visión, en la percepción; y el procesamiento de lenguaje natural, en el lenguaje humano." },
    { ref: "8.3", tema: "Lo que sigue siendo humano", q: "¿Qué sigue siendo esencialmente humano frente a la IA?",
      ops: ["Creatividad, empatía y juicio ético.", "Clasificación de grandes volúmenes.", "Cálculo rápido de probabilidades altas."],
      porque: "La IA amplifica capacidades cognitivas, pero la creatividad, la empatía y el juicio ético siguen siendo esencialmente humanos. No posee conciencia: simula algunas funciones." },

    /* 8.4 · cognición distribuida */
    { ref: "8.4", tema: "Cognición distribuida", q: "¿Cuál es la unidad de análisis de la cognición distribuida?",
      ops: ["El sistema sociotécnico.", "La mente individual.", "El algoritmo del modelo."],
      porque: "Pasa a ser el sistema sociotécnico: el razonamiento también ocurre en documentos, bases de datos, roles y en la memoria de una organización." },
    { ref: "8.4", tema: "Cognición distribuida", q: "Un comité reúne especialistas técnicos, jurídicos y operativos. ¿Qué distribución es?",
      ops: ["Social.", "Material.", "Temporal."],
      porque: "Es distribución social: el razonamiento se reparte entre personas con conocimientos, roles y responsabilidades diferentes." },
    { ref: "8.4", tema: "Cognición distribuida", q: "Documentos, tableros y bases de datos conservan información. ¿Qué distribución es?",
      ops: ["Material.", "Social.", "Temporal."],
      porque: "Es distribución material: los artefactos participan de la tarea cognitiva, como los repositorios, los data lakes o los archivos." },
    { ref: "8.4", tema: "Cognición distribuida", q: "Las decisiones de hoy dependen de registros y aprendizajes acumulados. ¿Qué distribución es?",
      ops: ["Temporal.", "Social.", "Material."],
      porque: "Es distribución temporal: la memoria organizacional es parte del sistema, y no todo lo que se sabe está disponible de inmediato." },
    { ref: "8.4", tema: "Memoria de una computadora", q: "¿Por qué un banco guarda sus transacciones antiguas en almacenamiento frío?",
      ops: ["Guardar sale barato y se consulta poco.", "Recuperar es rápido y poco costoso.", "Necesita acceso inmediato a cada registro."],
      porque: "La ley obliga a conservarlas por años pero casi no se consultan: conviene pagar poco por guardar y caro por recuperar unas pocas veces al año." },

    /* 8.5 · de la mente aislada al sistema sociotécnico */
    { ref: "8.5", tema: "Sistema sociotécnico", q: "¿De qué depende la calidad de una decisión, además del algoritmo?",
      ops: ["De cómo circula la información.", "De la velocidad del procesador.", "De la cantidad de usuarios."],
      porque: "Depende de cómo circula la información, de quién interpreta la recomendación, de qué evidencia queda registrada y de quién puede corregir el proceso." },

    /* 8.6 · metáforas cerebro-máquina */
    { ref: "8.6", tema: "Metáforas cerebro-máquina", q: "¿Qué aporta la metáfora «el cerebro es una computadora»?",
      ops: ["Vocabulario funcional sobre la mente.", "Arquitecturas que aprenden de los datos.", "Una visión de organización y modelo juntos."],
      porque: "Aporta vocabulario funcional: entradas, procesamiento, memoria y salidas. Oculta el cuerpo, el contexto y la plasticidad." },
    { ref: "8.6", tema: "Metáforas cerebro-máquina", q: "¿Qué riesgo trae la metáfora «la computadora es un cerebro»?",
      ops: ["Expectativas exageradas de comprensión.", "Ocultar el cuerpo y el contexto.", "Ocultar la plasticidad del cerebro humano."],
      porque: "Inspira redes neuronales y aprendizaje adaptativo, pero puede generar expectativas exageradas de comprensión o conciencia. Lo que oculta el cuerpo y la plasticidad es la otra metáfora." },
    { ref: "8.6", tema: "Metáforas cerebro-máquina", q: "¿Qué metáfora es la más útil para la gobernanza?",
      ops: ["El sistema híbrido.", "El cerebro como computadora.", "La computadora como cerebro."],
      porque: "El sistema híbrido considera la inteligencia humana, la organización y el modelo como partes complementarias, y obliga a preguntar quién hace qué." },

    /* 8.7 · neurociencia */
    { ref: "8.7", tema: "Neurociencia", q: "¿Quién es considerado el padre de la neurociencia moderna?",
      ops: ["Santiago Ramón y Cajal.", "Charles Scott Sherrington.", "Eric Richard Kandel."],
      porque: "Ramón y Cajal describió la estructura de las neuronas (Nobel 1906). Sherrington introdujo la sinapsis y Kandel estudió la base molecular de la memoria." },
    { ref: "8.7", tema: "Neurociencia", q: "¿Qué concepto introdujo Charles Sherrington?",
      ops: ["La sinapsis.", "Las células de red.", "La base de la memoria."],
      porque: "Sherrington introdujo el concepto de sinapsis y de integración neuronal (Nobel 1932). Las células de red son de los Moser y la base molecular de la memoria, de Kandel." },
    { ref: "8.7", tema: "Neurociencia", q: "¿Qué estudió Eric Kandel?",
      ops: ["La base molecular de la memoria.", "La estructura de las neuronas cerebrales.", "El sistema de posicionamiento."],
      porque: "Kandel estudió la base molecular de la memoria (Nobel 2000). La estructura de las neuronas la describió Cajal, y el sistema de posicionamiento, los Moser." },
    { ref: "8.7", tema: "Neurociencia", q: "¿Qué descubrieron May-Britt y Edvard Moser?",
      ops: ["Las células de red.", "Las células de lugar.", "Las áreas del lenguaje."],
      porque: "Descubrieron las células de red (grid cells). Las células de lugar las descubrió John O'Keefe, y las áreas del lenguaje las identificaron Broca y Wernicke." },
    { ref: "8.7", tema: "Neurociencia e IA", q: "¿Cómo se relacionan la IA y la neurociencia?",
      ops: ["Se influyen en ambos sentidos.", "Solo la neurociencia inspira a la IA.", "Son disciplinas sin vínculo."],
      porque: "La neurociencia inspira a la IA (redes neuronales), y la IA impulsa a la neurociencia al analizar neuroimagen, detectar patrones y facilitar neurotecnologías." },

    /* 8.8 · qué toma la IA de la neurociencia */
    { ref: "8.8", tema: "Principios del cerebro en la IA", q: "¿Qué principio del cerebro inspira el aprendizaje de las redes neuronales?",
      ops: ["Ajustar las conexiones.", "Extraer rasgos de a poco.", "Priorizar la información relevante."],
      porque: "El ajuste de conexiones. El procesamiento jerárquico extrae rasgos de a poco, y la atención selectiva prioriza lo relevante. Es inspiración funcional, no copia del cerebro." },
    { ref: "8.8", tema: "Principios del cerebro en la IA", q: "¿Qué principio separa estados transitorios de conocimiento persistente?",
      ops: ["Memorias diferenciadas.", "Atención selectiva.", "Procesamiento jerárquico."],
      porque: "Son las memorias diferenciadas. La predicción y retroalimentación completan los cinco aportes: reducir el error mediante ciclos de ajuste." },

    /* 8.9 · plasticidad, aprendizaje y adaptación */
    { ref: "8.9", tema: "Plasticidad y adaptación", q: "¿Qué permite la plasticidad cerebral?",
      ops: ["Modificar las conexiones con la experiencia.", "Mantener las conexiones fijas tras la infancia.", "Reemplazar neuronas viejas por nuevas."],
      porque: "La plasticidad permite modificar las conexiones con la experiencia: el aprendizaje depende de la exposición, la práctica y la retroalimentación." },
    { ref: "8.9", tema: "Plasticidad y adaptación", q: "¿Qué riesgo tiene un modelo que se adapta sin límites?",
      ops: ["Degradarse y olvidar capacidades.", "Dejar de aprender cosas nuevas.", "Consumir menos energía y cómputo."],
      porque: "Puede degradarse, olvidar capacidades o incorporar sesgos. Sin versiones, pruebas y supervisión, más aprendizaje continuo no siempre mejora el sistema." },

    /* 8.10 · atención, memoria y control ejecutivo */
    { ref: "8.10", tema: "Atención, memoria y control", q: "¿Qué hace el control ejecutivo en un sistema inteligente?",
      ops: ["Planifica, compara y escala excepciones.", "Conserva el contexto y los antecedentes.", "Selecciona las señales más relevantes."],
      porque: "El control ejecutivo planifica, inhibe respuestas inadecuadas, compara alternativas y escala excepciones a una persona. La memoria conserva contexto y la atención selecciona señales." },

    /* 8.11 · casos de uso públicos y privados */
    { ref: "8.11", tema: "Casos de uso", q: "En el mantenimiento público, ¿qué riesgo hay con las zonas que reportan poco?",
      ops: ["Relegarlas, aunque tengan necesidad.", "Atenderlas antes que a las demás.", "Contar dos veces cada uno de sus reportes."],
      porque: "Menos reportes no significa menos necesidad: puede haber menos acceso o capacidad de reportar. Los criterios públicos y la auditoría de datos lo previenen." },
    { ref: "8.11", tema: "Casos de uso", q: "En la gestión de trámites públicos, ¿quién toma la decisión formal?",
      ops: ["El personal, no el sistema.", "El sistema, con aprobación del jefe.", "El ciudadano, desde el portal."],
      porque: "El sistema clasifica documentos, detecta faltantes y propone una ruta; el personal interpreta excepciones, verifica evidencia y decide. No se delegan en una salida inexplicable decisiones que afecten derechos." },
    { ref: "8.11", tema: "Casos de uso", q: "¿Qué es una variable proxy en un modelo de riesgo comercial?",
      ops: ["Una variable que reemplaza a otra sensible.", "Una variable con muchos datos faltantes.", "Una variable medida en tiempo real, en línea."],
      porque: "Un proxy reemplaza de forma indirecta a una variable sensible, como el código postal por el origen, y produce discriminación injusta aunque no se use la sensible." },

    /* 8.12 · el mismo principio, distintas obligaciones */
    { ref: "8.12", tema: "Público y privado", q: "¿Qué prioriza un organismo público frente a una empresa privada?",
      ops: ["Legalidad, igualdad y transparencia.", "Valor, eficiencia y buena reputación.", "Productividad y reducción de costos."],
      porque: "Lo público prioriza legalidad, igualdad, debido proceso, transparencia y rendición de cuentas. La empresa privada, valor, eficiencia, experiencia, seguridad y reputación." },
    { ref: "8.12", tema: "Público y privado", q: "¿Qué se exige tanto a organismos públicos como a empresas?",
      ops: ["Finalidad explícita y supervisión.", "Decisiones tomadas sin revisión humana.", "Datos de cada cliente sin límite."],
      porque: "Cinco elementos: finalidad explícita, datos pertinentes (solo los necesarios), supervisión humana, trazabilidad y evaluación continua." },

    /* 8.13 · riesgos de la metáfora cerebral */
    { ref: "8.13", tema: "Riesgos de la metáfora", q: "¿Cómo se llama atribuirle intención o conciencia a un sistema?",
      ops: ["Antropomorfismo.", "Reduccionismo biológico.", "Determinismo algorítmico."],
      porque: "Es antropomorfismo. Producir la salida correcta no prueba comprensión: es el cuarto chino de Searle." },
    { ref: "8.13", tema: "Riesgos de la metáfora", q: "¿Cómo se llama tratar la inteligencia como un cálculo aislado?",
      ops: ["Reduccionismo.", "Antropomorfismo.", "Determinismo."],
      porque: "Es reduccionismo: ignora el cuerpo, la cultura, la cooperación y el contexto, y cree que alcanza con un mejor algoritmo sin mirar la red sociotécnica." },
    { ref: "8.13", tema: "Riesgos de la metáfora", q: "¿Cómo se llama creer que una predicción es inevitable y neutral?",
      ops: ["Determinismo.", "Reduccionismo.", "Antropomorfismo."],
      porque: "Es determinismo: «el modelo dice riesgo alto, entonces se rechaza». La predicción es una señal para revisar, no un veredicto." },

    /* 8.14 · principios de diseño responsable */
    { ref: "8.14", tema: "Diseño responsable", q: "¿Qué comunica una interfaz honesta?",
      ops: ["Evidencia, límites e incertezas.", "Solo el resultado y su precisión.", "El nombre y la versión del modelo."],
      porque: "Una interfaz honesta comunica evidencia, límites e incertidumbre, no solo el resultado." },
    { ref: "8.14", tema: "Diseño responsable", q: "¿Quién conserva las decisiones críticas y las excepciones?",
      ops: ["Responsables identificables.", "El modelo con más confianza.", "El área de sistemas."],
      porque: "Las decisiones críticas y las excepciones quedan en manos de responsables identificables, con registro, revisión periódica y posibilidad real de impugnación." },

    /* 8.15 · actividad y síntesis */
    { ref: "8.15", tema: "Síntesis de la clase", q: "Según la idea central, ¿qué es diseñar IA?",
      ops: ["Una relación entre personas, datos y modelos.", "Un algoritmo cada vez más potente y grande.", "Un sistema que reemplace las decisiones humanas."],
      porque: "Diseñar IA es diseñar una relación entre capacidades humanas, procesos institucionales, datos y modelos: cognición distribuida más neurociencia más gobernanza." }
  ]
});
