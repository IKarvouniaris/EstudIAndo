/* Nivel 5 de Parcial Zombie · Introducción a la IA · clase 11. Formato y pautas: js/preguntas-zombie-ia.js */
(window.NIVELES_ZOMBIE_IA = window.NIVELES_ZOMBIE_IA || []).push({
  clase: 11,
  titulo: "De la IA estrecha a la superinteligencia",
  preguntas: [
    /* 11.1 · un mapa de tres niveles */
    { ref: "11.1", tema: "Tres tipos de IA", q: "¿Qué tipo de IA optimiza tareas delimitadas, con objetivos y datos definidos?",
      ops: ["IA estrecha.", "IA general.", "Superinteligencia."],
      porque: "La IA estrecha (Narrow AI, IA débil) no hace de todo, pero hace muy bien lo que fue diseñada para hacer. Surgió masivamente en la década de 2010." },
    { ref: "11.1", tema: "Tres tipos de IA", q: "¿Qué tipo de IA aprendería y transferiría conocimiento entre dominios sin reentrenarse?",
      ops: ["IA general (AGI).", "IA estrecha.", "Superinteligencia."],
      porque: "La IA general aprendería, comprendería y transferiría conocimiento con una flexibilidad comparable a la humana. Todavía no existe." },
    { ref: "11.1", tema: "Tres tipos de IA", q: "¿Qué tipo de IA superaría ampliamente a las personas en casi todos los ámbitos?",
      ops: ["Superinteligencia.", "IA general.", "IA estrecha."],
      porque: "La superinteligencia superaría ampliamente las capacidades humanas en ciencia, creatividad, estrategia y habilidades sociales. Es una hipótesis, no un producto." },
    { ref: "11.1", tema: "Origen de los términos", q: "¿Quién habló de «IA débil» en 1980, frente a la «IA fuerte»?",
      ops: ["John Searle.", "Alan Turing.", "I. J. Good."],
      porque: "John Searle, con la IA fuerte del cuarto chino. La superinteligencia la planteó I. J. Good en 1965." },
    { ref: "11.1", tema: "Tres tipos de IA", q: "¿Cómo se lee la clasificación en tres tipos de IA?",
      ops: ["Mide amplitud y autonomía.", "Es una escalera de productos.", "Marca el orden de lanzamiento."],
      porque: "Mide amplitud y autonomía, no es una escalera que se completa nivel por nivel. Las fechas de la IA general y la superinteligencia son estimaciones de expertos, no pronósticos." },

    /* 11.2 · Narrow AI: inteligencia especializada */
    { ref: "11.2", tema: "IA estrecha", q: "¿Qué límite tiene la IA estrecha?",
      ops: ["Falla ante datos fuera de distribución.", "Rinde peor que el trabajo manual hoy.", "Decide sin necesidad de datos de entrada."],
      porque: "Falla ante datos fuera de distribución, instrucciones ambiguas o contextos no contemplados. Dentro de su tarea puede superar al trabajo manual en velocidad, uniformidad y escala." },
    { ref: "11.2", tema: "IA estrecha", q: "¿En qué ámbito la IA estrecha detecta transacciones fraudulentas en tiempo real?",
      ops: ["Banca.", "Retail.", "Manufactura."],
      porque: "En la banca. En el retail hace recomendaciones según el historial de compra y en manufactura detecta defectos con visión por computadora." },

    /* 11.3 · tres aplicaciones actuales */
    { ref: "11.3", tema: "Aplicaciones actuales", q: "¿Qué aplicación transforma texto o voz entre idiomas?",
      ops: ["La traducción automática.", "La visión por computadora.", "El asistente de voz."],
      porque: "La traducción automática estima secuencias probables. La visión extrae objetos y anomalías de imágenes, y el asistente de voz combina reconocimiento, intención, diálogo y síntesis." },
    { ref: "11.3", tema: "Aplicaciones actuales", q: "Un traductor automático maneja cien idiomas. ¿Qué tipo de IA es?",
      ops: ["IA estrecha.", "IA general.", "Superinteligencia."],
      porque: "Sigue siendo IA estrecha: hace una sola tarea, traducir, en muchos idiomas. Lo mismo vale para un asistente de voz con muchas intenciones." },
    { ref: "11.3", tema: "Métricas de las aplicaciones", q: "¿Qué métrica acompaña a la visión por computadora?",
      ops: ["Precisión, recall y falsos positivos.", "Calidad semántica y terminología.", "Intención correcta y escalamiento."],
      porque: "Precisión, exhaustividad (recall) y falsos positivos. La calidad semántica mide la traducción, y la intención correcta, la resolución y el escalamiento miden al asistente de voz." },
    { ref: "11.3", tema: "Métricas de las aplicaciones", q: "¿Cómo se mide un asistente de voz?",
      ops: ["Intención correcta y escalamiento.", "Calidad semántica y terminología.", "Precisión, recall y falsos positivos."],
      porque: "Por intención correcta, resolución y escalamiento. En un examen conviene nombrar la métrica concreta y no decir solo que se mide el desempeño." },
    { ref: "11.3", tema: "Riesgos del reconocimiento facial", q: "¿Por qué se desaconseja dejar fotografiar el DNI o mostrar la tarjeta?",
      ops: ["Una cámara puede captar el número.", "El DNI vence más rápido.", "La foto pierde validez legal."],
      porque: "Si validar identidad con una foto es fácil, abusar de ella también: una cámara puede captar el número. Conviene pagar sin contacto." },

    /* 11.4 · caso práctico 1: logística documental */
    { ref: "11.4", tema: "Logística documental", q: "¿Qué hace el clasificador en el flujo de logística documental?",
      ops: ["Identifica el tipo de documento.", "Extrae los campos del texto.", "Valida montos y proveedor."],
      porque: "El clasificador identifica el tipo de documento. El OCR extrae los campos y las reglas validan montos y proveedor." },
    { ref: "11.4", tema: "Logística documental", q: "¿Qué principio guía el flujo de logística documental?",
      ops: ["Diseñar el tratamiento de las excepciones.", "Automatizar solo el caso excepcional.", "Evitar toda intervención humana."],
      porque: "Automatizar el camino frecuente y diseñar explícitamente el tratamiento de las excepciones, que van a una persona, con cada decisión trazada." },

    /* 11.5 · General AI: una inteligencia transferible */
    { ref: "11.5", tema: "IA general", q: "¿Qué es la abstracción en una IA general?",
      ops: ["Separar lo esencial de los detalles.", "Aplicar habilidades a otro dominio.", "Proponer soluciones nuevas."],
      porque: "Es representar principios generales y separar lo esencial de los detalles de un caso. Aplicar habilidades a otro dominio es la transferencia." },
    { ref: "11.5", tema: "IA general", q: "¿Qué es la transferencia en una IA general?",
      ops: ["Aplicar habilidades a otro dominio.", "Separar lo esencial de los detalles.", "Probar y corregir soluciones."],
      porque: "Es aplicar habilidades aprendidas en un dominio a otro sin reentrenamiento exhaustivo, como pasar de la planificación en logística a organizar recursos en un hospital." },
    { ref: "11.5", tema: "IA general", q: "Una IA diseña puentes originales y no sabe hacer nada más. ¿Qué muestra?",
      ops: ["Creatividad especializada.", "Inteligencia general.", "Superinteligencia."],
      porque: "Generar algo novedoso en un solo dominio no prueba inteligencia general: es creatividad especializada." },

    /* 11.6 · por qué la AGI sigue siendo un desafío */
    { ref: "11.6", tema: "Desafíos de la IA general", q: "¿Qué exige el sentido común en una IA general?",
      ops: ["Integrar hechos, causalidad y normas.", "Aprender sin olvidar lo anterior.", "Reconocer la propia incertidumbre."],
      porque: "Integrar hechos, causalidad, contexto físico y normas sociales, y evitar respuestas plausibles pero falsas. Aprender sin olvidar es el aprendizaje continuo." },
    { ref: "11.6", tema: "Desafíos de la IA general", q: "¿Cómo se llama reconocer la propia incertidumbre y pedir ayuda?",
      ops: ["Metacognición.", "Aprendizaje continuo.", "Abstracción."],
      porque: "Es la metacognición y control: reconocer la incertidumbre, explicar límites, planificar y verificar resultados." },
    { ref: "11.6", tema: "Desafíos de la IA general", q: "¿Por qué integrar varias IA estrechas en un producto no alcanza?",
      ops: ["La orquestación no es transferencia.", "Cada una es demasiado lenta.", "Faltan datos de entrenamiento."],
      porque: "Coordinar varias IA estrechas no es transferir conocimiento entre dominios: el rendimiento lingüístico tampoco demuestra comprensión robusta." },

    /* 11.7 · qué falta para avanzar: recursos */
    { ref: "11.7", tema: "Recursos para avanzar", q: "¿Qué falta, sobre todo, para que la IA avance?",
      ops: ["Energía y capacidad de cómputo.", "Ideas nuevas de algoritmos.", "Datos de entrenamiento."],
      porque: "Los recursos: energía y capacidad de cómputo, cuya demanda crece con la IA. El desafío no es producir más sino optimizar el uso." },
    { ref: "11.7", tema: "Recursos para avanzar", q: "¿Qué ventaja tendría un superconductor?",
      ops: ["Casi no perdería energía ni calentaría.", "Sería muy barato de fabricar.", "Funcionaría solo a baja carga."],
      porque: "Tiene una resistencia casi nula, así que casi no perdería energía ni calentaría. El problema es que depende de materiales escasos y condiciones difíciles de lograr." },
    { ref: "11.7", tema: "Recursos para avanzar", q: "¿Cómo se organiza el aire en un centro de datos?",
      ops: ["Con pasillos fríos y calientes alternados.", "Con ventanas abiertas al exterior.", "Con un solo pasillo de aire caliente."],
      porque: "Con pasillos fríos y calientes alternados, para que los equipos tomen aire frío de un lado y expulsen el caliente por el otro." },

    /* 11.8 · caso práctico 2: automatización hospitalaria */
    { ref: "11.8", tema: "Automatización hospitalaria", q: "En la automatización hospitalaria, ¿quién valida las decisiones clínicas?",
      ops: ["El profesional de la salud.", "El modelo de IA.", "El área administrativa."],
      porque: "El profesional valida las decisiones clínicas, con auditoría de accesos, de calidad de datos y de sesgos. La meta realista es coordinar varias IA estrechas, no una AGI clínica." },

    /* 11.9 · superinteligencia: hipótesis, no producto */
    { ref: "11.9", tema: "Superinteligencia", q: "¿Qué diferencia a la superinteligencia de la IA general?",
      ops: ["Una ventaja muy superior y sostenida.", "Una flexibilidad comparable a la humana.", "Un gran rendimiento en una sola tarea."],
      porque: "La IA general alude a una generalidad comparable a la humana; la superinteligencia, a una ventaja muy superior y sostenida. Rendir en una sola tarea es IA estrecha." },
    { ref: "11.9", tema: "Superinteligencia", q: "¿Qué hay que declarar al debatir escenarios de superinteligencia?",
      ops: ["Supuestos y probabilidades.", "Fechas exactas de llegada.", "Productos hoy disponibles."],
      porque: "Debatir escenarios futuros exige declarar supuestos, probabilidades e incertidumbres, sin confundir hipótesis con hechos." },

    /* 11.10 · riesgos y debates de una IA muy avanzada */
    { ref: "11.10", tema: "Riesgos de una IA avanzada", q: "Un sistema optimiza la métrica y daña la finalidad. ¿Qué riesgo es?",
      ops: ["Alineación.", "Concentración.", "Seguridad."],
      porque: "Es alineación: un objetivo mal especificado necesita restricciones, verificación y supervisión." },
    { ref: "11.10", tema: "Riesgos de una IA avanzada", q: "¿Qué riesgo es que pocos actores controlen capacidad, datos e infraestructura?",
      ops: ["Concentración.", "Alineación.", "Seguridad."],
      porque: "Es concentración de poder: el debate es sobre acceso, competencia y control democrático. Seguridad es el uso malicioso y los fallos sistémicos." },
    { ref: "11.10", tema: "Debates de una IA avanzada", q: "Si un agente de IA vende algo, ¿de quién es hoy la ganancia?",
      ops: ["De su dueño.", "Del agente de IA.", "Del cliente final."],
      porque: "Hoy es de su dueño. La pregunta abierta es de qué viven las personas cuyo trabajo se sustituye y qué pasa con lo que consumían." },
    { ref: "11.10", tema: "Debates de una IA avanzada", q: "Si un servicio de internet es gratis, ¿qué suele ser el producto?",
      ops: ["Los datos de los usuarios.", "El software libre.", "La publicidad impresa."],
      porque: "Desarrollar y mantener una red social cuesta millones: hay interés en captar información de los usuarios, con fines comerciales, de seguridad o de inteligencia." },

    /* 11.11 · qué dicen los líderes de la industria */
    { ref: "11.11", tema: "Voces de la industria", q: "¿Quién destaca el desplazamiento masivo de empleos entre los riesgos?",
      ops: ["Dario Amodei.", "Satya Nadella.", "Sam Altman."],
      porque: "Dario Amodei (Anthropic) señala desplazamiento masivo de empleos, concentración de poder y riesgo existencial. Son opiniones de actores interesados, no evidencia." },
    { ref: "11.11", tema: "Voces de la industria", q: "¿Qué riesgos destaca Satya Nadella?",
      ops: ["Desinformación y ciberataques.", "Carrera entre países y empresas.", "Pérdida de control de la IA."],
      porque: "Desinformación, ciberataques más sofisticados y erosión de la confianza en las instituciones, con una IA responsable y regulada. La carrera descontrolada la destaca Musk." },

    /* 11.12 · VUCA */
    { ref: "11.12", tema: "Entorno VUCA", q: "¿Qué significa la V de VUCA?",
      ops: ["Volatilidad.", "Variabilidad.", "Velocidad."],
      porque: "Volatilidad: velocidad y magnitud de los cambios. VUCA es volatilidad, incertidumbre, complejidad y ambigüedad." },
    { ref: "11.12", tema: "Entorno VUCA", q: "¿Cómo se responde a la incertidumbre?",
      ops: ["Con escenarios y monitoreo.", "Con agilidad y rapidez.", "Con pensamiento crítico y ética."],
      porque: "Con escenarios, monitoreo continuo y planificación flexible. A la volatilidad se responde con agilidad, y a la ambigüedad, con pensamiento crítico y criterio ético." },
    { ref: "11.12", tema: "Entorno VUCA", q: "¿Cómo se responde a la complejidad?",
      ops: ["Visión sistémica y gestión de dependencias.", "Pensamiento crítico y criterio ético.", "Escenarios y planificación flexible."],
      porque: "Con visión sistémica y gestión de dependencias, porque hay muchos factores interconectados con efectos no lineales." },
    { ref: "11.12", tema: "Entorno VUCA", q: "¿Qué conclusión se saca de un entorno de tecnología VUCA?",
      ops: ["Prepararse y actualizarse sin pausa.", "Dominar una tecnología y listo.", "Esperar a que el entorno se calme."],
      porque: "No se enfrenta aprendiendo algo y creyendo que ya está dominado, sino con la certeza de que va a cambiar: prepararse y no dejar de actualizarse." },

    /* 11.13 · habilidades más demandadas */
    { ref: "11.13", tema: "Habilidades demandadas", q: "¿Cuál de estas es una habilidad blanda?",
      ops: ["Pensamiento crítico.", "Ciberseguridad.", "Computación en la nube."],
      porque: "El pensamiento crítico es blando, como la comunicación, la colaboración y la inteligencia emocional. Ciberseguridad y computación en la nube son habilidades técnicas." },
    { ref: "11.13", tema: "Habilidades demandadas", q: "¿Por qué las empresas seguirían contratando personas?",
      ops: ["Alguien debe supervisar y responder.", "La IA no puede procesar datos.", "Las personas son más rápidas."],
      porque: "Alguien tiene que supervisar, auditar y responder por lo que hace el sistema: con la ley actual, la IA no responde. También quedan la empatía, la conversación y el diseño de procesos." },
    { ref: "11.13", tema: "Habilidades demandadas", q: "¿Qué parte de las interacciones de un centro de contacto necesita una persona?",
      ops: ["Al menos un 5 por ciento.", "Al menos un 50 por ciento.", "Al menos un 25 por ciento."],
      porque: "Se estima que al menos un 5 % de las interacciones con chatbots y voz necesita a una persona: es el humano en el circuito." },

    /* 11.14 · ruta práctica: de lo manual a la automatización responsable */
    { ref: "11.14", tema: "Ruta práctica", q: "¿Qué paso de la ruta práctica elimina las variaciones innecesarias?",
      ops: ["Estandarizar.", "Mapear.", "Digitalizar."],
      porque: "Estandarizar. La ruta es mapear, estandarizar, digitalizar, automatizar y supervisar: no hace falta una AGI, alcanza con IA estrecha bien gobernada." },
    { ref: "11.14", tema: "Ruta práctica", q: "¿Qué criterio de éxito tiene la automatización responsable?",
      ops: ["Mejora medible sin degradar seguridad.", "Menos personas en el proceso.", "Más funciones automatizadas."],
      porque: "Una mejora medible sin degradar seguridad, equidad, privacidad ni experiencia humana." },

    /* 11.15 · síntesis */
    { ref: "11.15", tema: "Síntesis de la clase", q: "Según la síntesis, ¿qué exigiría una IA general?",
      ops: ["Transferencia, abstracción y creatividad.", "Más cómputo y más datos de entrenamiento.", "Más velocidad y precisión en una tarea."],
      porque: "La IA general requeriría transferencia, abstracción, creatividad, aprendizaje continuo y conocer sus propios límites. La estrecha ya automatiza percepción, lenguaje y predicción dentro de un ámbito definido." }
  ]
});
