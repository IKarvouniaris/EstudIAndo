/* Nivel 1 de Parcial Zombie · Introducción a la IA · clase 7. Formato y pautas: js/preguntas-zombie-ia.js */
(window.NIVELES_ZOMBIE_IA = window.NIVELES_ZOMBIE_IA || []).push({
  clase: 7,
  titulo: "De la inteligencia biológica a la automatización",
  preguntas: [
    /* 7.1 · capacidades biológicas y artificiales, persona y sistema, principio */
    { ref: "7.1", tema: "Capacidades biológicas y artificiales", q: "¿Cuál es el correlato artificial de la percepción?",
      ops: ["Visión por computadora y sensores.", "Bases de datos y memorias vectoriales.", "Aprendizaje supervisado y por refuerzo."],
      porque: "La percepción artificial son la visión por computadora, el reconocimiento de voz y los sensores. La memoria se corresponde con bases de datos y memorias vectoriales; el aprendizaje, con el supervisado, el no supervisado y el de refuerzo." },
    { ref: "7.1", tema: "Capacidades biológicas y artificiales", q: "¿Qué correlato artificial tiene la memoria?",
      ops: ["Bases de datos y memorias vectoriales.", "Visión por computadora y sensores.", "Procesamiento de lenguaje natural (PLN)."],
      porque: "Las bases de datos conservan registros exactos y las memorias vectoriales recuperan contenido similar. El modelo no recuerda como una persona: calcula patrones." },
    { ref: "7.1", tema: "Capacidades biológicas y artificiales", q: "¿Qué tipos de aprendizaje son el correlato artificial del aprendizaje biológico?",
      ops: ["Supervisado, no supervisado y por refuerzo.", "Percibido, memorizado y generalizado.", "Simbólico, lógico y probabilístico."],
      porque: "Supervisado (ejemplos con etiqueta), no supervisado (agrupaciones o estructuras) y por refuerzo (recompensas). Percibir y recordar son capacidades, no tipos de aprendizaje." },
    { ref: "7.1", tema: "Capacidades biológicas y artificiales", q: "¿Qué hace la IA con las funciones del cerebro?",
      ops: ["Imita algunas funciones observables.", "Copia el funcionamiento del cerebro.", "Reproduce la experiencia de tenerlas."],
      porque: "La IA no copia al cerebro: construye sistemas especializados que imitan algunas funciones observables, no la experiencia completa de tenerlas." },
    { ref: "7.1", tema: "Persona y sistema de IA", q: "¿En qué rinde mejor una persona que un sistema de IA?",
      ops: ["Generalizar con pocos ejemplos.", "Procesar grandes volúmenes rápido.", "Almacenar registros con precisión."],
      porque: "La persona generaliza con pocos ejemplos y contexto. El sistema es excelente en tareas definidas, procesa grandes volúmenes y guarda registros precisos, pero sin vivencia." },
    { ref: "7.1", tema: "Persona y sistema de IA", q: "¿Qué ventaja tiene un sistema de IA sobre una persona?",
      ops: ["Consistencia en tareas repetitivas.", "Sentido común del contexto real.", "Asumir la responsabilidad del error."],
      porque: "Las fortalezas de la IA son escala, velocidad, consistencia y disponibilidad continua. El sentido común y la responsabilidad siguen siendo humanos: el sistema requiere supervisión." },
    { ref: "7.1", tema: "Limitaciones de la IA", q: "¿Cómo se llaman los errores plausibles pero falsos de un modelo?",
      ops: ["Alucinaciones.", "Sesgos heredados.", "Dependencia de datos."],
      porque: "Son las alucinaciones. Los sesgos heredados vienen de los datos y del diseño, y la dependencia de datos y objetivos es otra limitación distinta." },
    { ref: "7.1", tema: "Automatización responsable", q: "¿Qué se automatiza según el principio de la automatización responsable?",
      ops: ["Las tareas, no las responsabilidades.", "Las responsabilidades junto con las tareas.", "Solo las tareas de menor riesgo."],
      porque: "Se automatizan tareas, no responsabilidades: humano en el circuito para decisiones críticas, medir calidad antes y después, y documentar límites y rutas de apelación." },

    /* 7.2 · automatizar no es copiar el proceso manual */
    { ref: "7.2", tema: "Rediseñar antes de automatizar", q: "¿Qué rediseño permitió corregir exámenes de forma rápida y escalable?",
      ops: ["Volverlos de opción múltiple.", "Corregirlos entre más personas.", "Digitalizar las hojas escritas."],
      porque: "Al pasarlos a opción múltiple se comparan automáticamente contra una base de respuestas. No se copió el proceso manual: se rediseñó." },
    { ref: "7.2", tema: "Rediseñar antes de automatizar", q: "Un procedimiento de 20 pasos se va a pasar a una plataforma. ¿Qué conviene antes?",
      ops: ["Revisar si cada paso es necesario.", "Programar los 20 pasos tal como están.", "Elegir la plataforma más barata."],
      porque: "Trasladar mecánicamente un procedimiento no es diseñar una automatización. Un proceso de 20 pasos puede reducirse a 10 antes de pasarlo, mirando el resultado esperado." },

    /* 7.3 · el camino: de observar a supervisar */
    { ref: "7.3", tema: "Camino de la automatización", q: "¿Cuál es el primer paso del camino hacia la automatización?",
      ops: ["Observar el proceso actual.", "Digitalizar los datos existentes.", "Automatizar los pasos."],
      porque: "Se empieza observando: mapear tareas, excepciones y problemas del proceso actual. Después vienen digitalizar, automatizar, aumentar con IA y supervisar." },
    { ref: "7.3", tema: "Camino de la automatización", q: "¿Qué paso pasa el papel y los datos dispersos a formato digital?",
      ops: ["Digitalizar.", "Automatizar.", "Supervisar."],
      porque: "Digitalizar es convertir papel y datos dispersos a formato digital. Observar es mapear el proceso; supervisar es medir y revisar." },
    { ref: "7.3", tema: "Camino de la automatización", q: "¿Qué paso aplica reglas a los pasos repetitivos y deterministas?",
      ops: ["Automatizar.", "Aumentar con IA.", "Digitalizar."],
      porque: "Automatizar es aplicar reglas a lo repetitivo y determinista. Aumentar con IA viene después y sirve donde una regla no alcanza." },
    { ref: "7.3", tema: "Camino de la automatización", q: "¿Qué paso suma percepción, predicción o lenguaje donde una regla no alcanza?",
      ops: ["Aumentar con IA.", "Automatizar con reglas.", "Observar el proceso."],
      porque: "Aumentar con IA agrega percepción, predicción o lenguaje. Automatizar con reglas ya se hizo antes, y observar es el primer paso." },
    { ref: "7.3", tema: "Camino de la automatización", q: "¿Qué paso agrega métricas, revisión humana y mejora continua?",
      ops: ["Supervisar.", "Aumentar con IA.", "Digitalizar."],
      porque: "Supervisar cierra el camino: métricas, revisión humana y mejora continua. Si el proceso está desordenado, la IA automatiza el desorden: primero se rediseña." },

    /* 7.4 · casos de uso */
    { ref: "7.4", tema: "Casos de uso", q: "En un trámite público, ¿qué hace el OCR?",
      ops: ["Extrae el texto de las solicitudes.", "Propone categoría y prioridad al caso.", "Redacta la respuesta al ciudadano."],
      porque: "El OCR extrae el texto de las solicitudes en papel. Proponer categoría y prioridad es del clasificador, y redactar respuestas, del asistente." },
    { ref: "7.4", tema: "Casos de uso", q: "En salud, ¿qué rol tiene la priorización de colas con IA?",
      ops: ["Orientar, sin diagnosticar sola.", "Diagnosticar a cada consultante.", "Reemplazar al personal médico."],
      porque: "La priorización es orientativa: apoya al personal, que conserva el diagnóstico. El acceso a los datos se controla y los casos complejos se derivan." },
    { ref: "7.4", tema: "Casos de uso", q: "En logística, ¿qué verifican las cámaras?",
      ops: ["Etiquetas y daños.", "Demanda y riesgo de atraso.", "Estado de pedidos en texto."],
      porque: "Las cámaras verifican etiquetas y daños. Los modelos predicen demanda y riesgo de atraso, y los operadores consultan el estado en lenguaje natural." },

    /* 7.5 · gobernanza, riesgos y supervisión */
    { ref: "7.5", tema: "Gobernanza y supervisión", q: "¿Qué tiene que poder hacer una persona con una decisión automática?",
      ops: ["Aprobarla, corregirla o detenerla.", "Leer el resultado cuando termina.", "Conocerla cuando se audita al año."],
      porque: "Hay que definir si una persona puede aprobar, corregir, anular o detener una decisión automática, y cuáles se resuelven con reglas y cuáles requieren IA." },
    { ref: "7.5", tema: "Pruebas y confiabilidad", q: "¿Dónde se prueba un sistema de IA antes de pasarlo a producción?",
      ops: ["En un entorno controlado, con piloto.", "Directamente con los usuarios reales.", "En el entorno final de la empresa."],
      porque: "Se prueba en un entorno controlado antes del piloto y la producción, con métricas de éxito, riesgo, tiempo y calidad, y un plan de recuperación ante fallas." },

    /* 7.6 · costos: cuándo conviene un modelo y cuándo una regla */
    { ref: "7.6", tema: "Costos de la IA", q: "¿En qué unidad se cobra el consumo de un modelo de lenguaje?",
      ops: ["En interacciones o tokens.", "En horas de ingeniería de software.", "En licencias por persona."],
      porque: "Los modelos se consumen por interacciones o tokens. Una interacción parece barata, pero con volumen alto el costo se acumula." },
    { ref: "7.6", tema: "Costos de la IA", q: "Un sistema tendrá mucho volumen de consultas. ¿Qué conviene proyectar antes de implementarlo?",
      ops: ["El costo total del volumen esperado.", "El costo de una sola interacción.", "El costo de contratar más personas nuevas."],
      porque: "Hay que proyectar el volumen y el costo total. Si una regla puede resolver el caso, suele ser más rápida y más económica que invocar un modelo de lenguaje." },

    /* 7.7 · implementación y evolución continua */
    { ref: "7.7", tema: "Implementación continua", q: "¿Qué herramienta ordena el plan de cambio y el cronograma?",
      ops: ["El diagrama de Gantt.", "El diagrama de flujo.", "La matriz de riesgos."],
      porque: "El plan de cambio se organiza con un cronograma en un diagrama de Gantt. No es un proyecto que termina: las herramientas cambian constantemente." },
    { ref: "7.7", tema: "Implementación continua", q: "¿Qué le pasa a una organización que no se adapta a los cambios tecnológicos?",
      ops: ["Queda obsoleta y pierde relevancia.", "Gana estabilidad con lo ya probado.", "Reduce sus costos de mantenimiento."],
      porque: "La falta de adaptación produce obsolescencia: empresas y productos perdieron relevancia por no responder a tiempo. La automatización responsable se revisa y se actualiza." },

    /* 7.8 · actividad: diagnosticar una oportunidad */
    { ref: "7.8", tema: "Diagnóstico de una oportunidad", q: "En el diagnóstico de reclamos municipales, ¿qué pregunta corresponde al lenguaje?",
      ops: ["¿Qué interacción puede simplificarse?", "¿Qué señales deben capturarse?", "¿Qué patrón puede inferirse de los datos?"],
      porque: "Lenguaje: qué interacción se simplifica. Percepción: qué señales se capturan. Memoria: qué antecedentes se recuperan. Aprendizaje: qué patrón se infiere." },

    /* 7.9 · flujo del trámite: captura, validación y derivación */
    { ref: "7.9", tema: "Flujo del trámite digital", q: "¿Por qué conviene consultar un servicio confiable para el domicilio?",
      ops: ["El domicilio del DNI puede estar viejo.", "El DNI no trae domicilio impreso.", "La planilla no admite domicilios nuevos."],
      porque: "El domicilio del DNI puede estar desactualizado: conviene una fuente más confiable, como un servicio de consulta, y evitar verificaciones visuales innecesarias." },
    { ref: "7.9", tema: "Flujo del trámite digital", q: "¿Cómo se deriva un expediente en un portal de trámites?",
      ops: ["Con aviso por correo a cada área.", "Con copias impresas para cada área.", "Con un responsable que lo reenvía."],
      porque: "El portal notifica a cada área por correo, con acceso al caso, y los responsables registran checks y comentarios en un espacio común: hay trazabilidad de quién hizo qué." },

    /* 7.10 · desacoplamiento y operación en clúster */
    { ref: "7.10", tema: "Desacoplamiento", q: "¿Qué permite el desacoplamiento entre las etapas de un trámite?",
      ops: ["Revisar casos en paralelo.", "Revisar casos en cadena.", "Revisar casos en una sola cadena."],
      porque: "Reduce las dependencias: en vez de una cadena estricta, cualquier operador disponible toma un caso de la cola y el servicio sigue aunque falten personas." },
    { ref: "7.10", tema: "Desacoplamiento", q: "El tiempo de atención sube de 2 a 3 minutos. ¿Qué indica ese KPI?",
      ops: ["Que la fila empieza a crecer.", "Que el sistema mejoró su precisión.", "Que bajó la cantidad de operadores."],
      porque: "Es una señal de que la fila empieza a crecer. Entonces el supervisor redistribuye la capacidad, y algunas decisiones finales igual requieren una persona." },

    /* 7.11 · reglas, excepciones y dónde aporta la IA */
    { ref: "7.11", tema: "Reglas, excepciones e IA", q: "¿Cuándo se elige IA y no una regla?",
      ops: ["Cuando la regla no alcanza.", "Cuando el volumen es bajo.", "Cuando la condición es conocida."],
      porque: "Las reglas son la primera opción: más rápidas y económicas para condiciones explícitas. La IA se usa para clasificar texto, detectar anomalías o interpretar documentos cuando la regla no alcanza." },
    { ref: "7.11", tema: "Reglas, excepciones e IA", q: "¿Qué conviene usar para obtener de una base un dato con resultado binario?",
      ops: ["Una consulta estructurada.", "Un modelo de lenguaje.", "Un clasificador entrenado."],
      porque: "Una consulta estructurada es más barata y confiable. Usar un modelo de lenguaje es un error típico: la IA no reemplaza un mejor diseño de datos." },
    { ref: "7.11", tema: "Reglas, excepciones e IA", q: "¿Cómo se trata un caso previsto que no sigue la regla general?",
      ops: ["Con una excepción codificada aparte.", "Con un rechazo automático del caso.", "Con la regla general, tal como está."],
      porque: "Las excepciones son situaciones previstas, como empresas del Mercosur: se codifican aparte, no se fuerzan dentro de la regla principal ni se rechazan." },

    /* 7.12 · confianza, datos y almacenamiento */
    { ref: "7.12", tema: "Confianza y datos", q: "¿En qué se puede basar el nivel de confianza de una empresa solicitante?",
      ops: ["En su historial de solicitudes.", "En el tamaño de su edificio central.", "En el nombre de su rubro."],
      porque: "Se puede basar en el historial: cantidad de solicitudes previas, consistencia entre actividades declaradas y cambios inusuales de rubro, que son una posible señal de anomalía." },
    { ref: "7.12", tema: "Confianza y datos", q: "¿Qué pasa con los casos ambiguos en una automatización escalonada?",
      ops: ["Se derivan a revisión humana.", "Se aprueban de forma automática.", "Se rechazan sin revisar."],
      porque: "Los casos simples se resuelven solos; los incompletos, ambiguos o excepcionales van a revisión humana, y se revisa solo una fracción del total. La información sensible va a un repositorio cifrado." },

    /* 7.13 · piloto, continuidad y arquitectura */
    { ref: "7.13", tema: "Piloto y continuidad", q: "¿Qué se hace antes de escalar un trámite digital?",
      ops: ["Una beta con pocas empresas.", "Un lanzamiento a gran escala.", "Una auditoría anual."],
      porque: "Una beta con dos o tres empresas detecta fricciones y puntos donde el proceso se traba. Ante una falla de la IA o de una integración hace falta un plan de continuidad del negocio y recuperación." },

    /* 7.14 · cuando el trámite es una urgencia clínica */
    { ref: "7.14", tema: "Urgencia clínica", q: "Ante una urgencia clínica, ¿qué admiten las reglas administrativas?",
      ops: ["Concesiones, para atender primero.", "Completar los datos antes de atender.", "Rechazar si falta información."],
      porque: "En una clínica el tiempo puede determinar la supervivencia: una persona grave debe ser atendida y estabilizada antes de completar los datos administrativos." },
    { ref: "7.14", tema: "Urgencia clínica", q: "¿Qué puede hacer un modelo de riesgo en una clínica?",
      ops: ["Recomendar prioridades.", "Bloquear la atención urgente.", "Decidir el alta del paciente."],
      porque: "Un modelo de riesgo puede recomendar prioridades, pero las reglas no deben bloquear la atención urgente por falta de información." }
  ]
});
