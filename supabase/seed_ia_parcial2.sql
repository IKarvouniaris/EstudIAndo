-- Generado por tools/seed_ia_parcial2.py — no editar a mano, volver a correr el script.
-- 18 situaciones; contexto de las clases 7, 8, 9, 11, 12 del apunte.
-- Requiere fase10_ia_parcial2.sql. Se puede correr más de una vez.

insert into ia_situaciones (id, nivel, titulo, rol, partes, clases) values
  (1, 'Baja', 'Control visual de envases', 'Usted es ingeniero/a de procesos en una empresa alimentaria. La inspección manual no detecta de forma uniforme etiquetas torcidas y tapas ausentes.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Defina percepción y reconocimiento de patrones, y diferencie sus funciones.", "criterios": ["Define la percepción como captar e interpretar estímulos o señales del entorno.", "Define el reconocimiento de patrones como identificar regularidades o clases en lo percibido.", "Marca la diferencia: la percepción adquiere la señal y el reconocimiento la clasifica (no son lo mismo)."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Explique por qué la visión por computadora del caso es Narrow AI y no General AI.", "criterios": ["Señala que el sistema hace una tarea específica y acotada (detectar defectos definidos en envases).", "Explica que no transfiere lo aprendido a otros dominios ni generaliza fuera de su tarea, que es lo que pediría una AGI."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Proponga un flujo desde la captura de imágenes hasta la clasificación de envases.", "criterios": ["Incluye una captura controlada (cámara, iluminación, posición en la línea).", "Incluye preprocesamiento y un modelo o reglas que clasifiquen el envase.", "Define una salida con umbral: aprobar, rechazar o derivar a revisión."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Indique dos controles humanos o métricas para decidir si el sistema puede intervenir en la línea.", "criterios": ["Propone métricas de desempeño por tipo de defecto (precisión, recall, tasa de falsos rechazos o similares).", "Propone control humano: muestreo, revisión de dudosos o una parada segura antes de dejarlo actuar solo."]}]'::jsonb, '{7,9,11}'),
  (2, 'Baja', 'Asistente de voz municipal', 'Usted integra el equipo de ingeniería de un municipio que desea automatizar consultas sobre turnos, tasas y horarios mediante un asistente de voz.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Explique la función del lenguaje en la inteligencia biológica y su relación con la comunicación.", "criterios": ["Explica que el lenguaje permite representar y comunicar significados.", "Relaciona el lenguaje con el uso de símbolos y del contexto para entender y hacerse entender."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Defina un asistente de voz como aplicación de Narrow AI y delimite su dominio.", "criterios": ["Define el asistente como combinación de reconocimiento de voz, intención, diálogo y respuesta.", "Delimita su dominio: un catálogo acotado de consultas (turnos, tasas, horarios), sin comprensión general."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Diseñe el proceso básico: recibir la consulta, identificar intención y entregar respuesta.", "criterios": ["Describe la secuencia audio → reconocimiento de voz → identificación de la intención.", "Consulta una base de información autorizada y entrega la respuesta.", "Registra la interacción para seguimiento o mejora."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Indique cómo derivaría a una persona las consultas ambiguas, nuevas o sensibles.", "criterios": ["Define disparadores de escalamiento: baja confianza, intentos repetidos, consulta fuera de catálogo o dato sensible.", "Describe la derivación a una persona conservando el contexto de la consulta."]}]'::jsonb, '{7,11}'),
  (3, 'Baja', 'Memoria de incidencias técnicas', 'Usted es ingeniero/a de soporte en una compañía eléctrica. Se quiere reutilizar el historial de fallos resueltos para asistir al personal de campo.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Diferencie memoria y aprendizaje en la inteligencia biológica.", "criterios": ["Define la memoria como conservar y recuperar información.", "Define el aprendizaje como un cambio en el comportamiento o desempeño producido por la experiencia, y los diferencia."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Defina aprendizaje por experiencia sin confundirlo con almacenar registros.", "criterios": ["Define el aprendizaje por experiencia como mejorar el desempeño en una tarea a partir de casos o datos.", "Aclara explícitamente que guardar registros no es aprender: tiene que cambiar el modelo o el desempeño."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Proponga cómo usar incidencias históricas para recomendar una solución probable.", "criterios": ["Estructura los casos (síntomas, causa, solución).", "Recupera casos similares al problema nuevo y recomienda una solución con un nivel de confianza."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Indique qué datos mínimos guardaría y cómo verificaría la recomendación antes de actuar.", "criterios": ["Lista datos mínimos pertinentes (equipo, fecha, síntomas, causa confirmada, acción y resultado).", "Exige que un técnico valide la recomendación antes de ejecutarla."]}]'::jsonb, '{7,9}'),
  (4, 'Baja', 'Traducción de atención sanitaria', 'Usted diseña un apoyo de traducción automática para orientar a pacientes extranjeros en un hospital público, sin sustituir decisiones clínicas.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Explique qué capacidad cognitiva se relaciona con comprender y producir lenguaje.", "criterios": ["Identifica al lenguaje como la capacidad cognitiva en juego.", "Explica que implica comprender y producir mensajes con significado y en contexto."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Justifique por qué la traducción automática es Narrow AI aunque procese varios idiomas.", "criterios": ["Explica que sigue siendo una sola tarea especializada (traducir).", "Aclara que manejar muchos idiomas no implica competencia cognitiva general ni transferencia a otros dominios."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Describa qué mensajes administrativos automatizaría y cuáles excluiría del alcance.", "criterios": ["Incluye mensajes de orientación de bajo riesgo (turnos, señalización, trámites).", "Excluye explícitamente diagnóstico, consentimiento informado, prescripción u otras decisiones clínicas."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Proponga una revisión humana para nombres, medicación y mensajes de alto impacto.", "criterios": ["Propone confirmación por un profesional o intérprete en nombres, dosis, alergias o decisiones clínicas.", "Vincula el nivel de control con el impacto del mensaje."]}]'::jsonb, '{7,11}'),
  (5, 'Baja', 'Reglas para priorizar solicitudes', 'Usted es ingeniero/a en una aseguradora. Debe automatizar la clasificación inicial de solicitudes según documentación, vencimiento y tipo de trámite.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Defina razonamiento simbólico básico mediante símbolos, hechos y reglas.", "criterios": ["Explica que se representan hechos con símbolos.", "Explica que se aplican reglas explícitas (si–entonces) para derivar conclusiones."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Distinga una regla explícita de un patrón aprendido a partir de ejemplos.", "criterios": ["Define la regla como un criterio programado por una persona.", "Define el patrón aprendido como una regularidad estimada a partir de datos o ejemplos."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Escriba tres reglas tipo SI-ENTONCES para asignar prioridad sin aprobar automáticamente.", "criterios": ["Escribe tres reglas con forma SI condición ENTONCES acción, coherentes con documentación, vencimiento o tipo de trámite.", "Las reglas asignan prioridad o piden subsanación, pero no aprueban la solicitud automáticamente."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Indique cómo registrar regla aplicada, datos de entrada y decisión humana final.", "criterios": ["Propone un registro (log) con los datos de entrada, la regla aplicada y su versión.", "Registra la decisión final y quién la tomó."]}]'::jsonb, '{9}'),
  (6, 'Baja', 'Equipo de mantenimiento distribuido', 'Usted coordina mantenimiento en una universidad pública. Técnicos, sensores, manuales y una mesa de ayuda participan en la resolución de averías.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Defina cognición distribuida e identifique sus componentes en la situación.", "criterios": ["Define la cognición distribuida como repartida entre personas, artefactos, información y entorno (y el tiempo).", "Identifica los componentes del caso: técnicos, sensores, manuales, mesa de ayuda."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Explique por qué la metáfora cerebro-máquina no implica que ambos sean idénticos.", "criterios": ["Explica que la metáfora es un modelo útil para pensar o diseñar.", "Aclara que cerebro y computadora no son equivalentes ni literal ni funcionalmente (cuerpo, contexto, plasticidad)."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Diseñe un circuito de colaboración entre sensores, sistema de tickets y técnicos.", "criterios": ["Describe un circuito: el sensor genera la alerta, la mesa abre el ticket, el manual aporta el procedimiento.", "El técnico diagnostica, actúa y cierra el caso."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Proponga un mecanismo para mantener una memoria organizacional de soluciones.", "criterios": ["Propone un repositorio de casos resueltos y validados, con una clasificación y búsqueda.", "Prevé revisión o actualización periódica del repositorio."]}]'::jsonb, '{8}'),
  (7, 'Media', 'Fraude en compras públicas', 'Usted es ingeniero/a de datos en una agencia estatal. Debe detectar compras atípicas sin acusar automáticamente a proveedores ni funcionarios.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Relacione percepción de datos y reconocimiento de patrones en este contexto.", "criterios": ["Explica percibir datos como adquirir y representar señales (montos, fechas, proveedores).", "Explica reconocer patrones como detectar regularidades o anomalías en esas señales, y los relaciona en el caso."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Compare patrones aprendidos con reglas simbólicas de contratación y explique su complementariedad.", "criterios": ["Distingue el modelo que descubre anomalías de las reglas que expresan la normativa.", "Explica que combinados mejoran la cobertura y la trazabilidad."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Diseñe un flujo híbrido que puntúe anomalías y aplique reglas antes de enviar alertas.", "criterios": ["Incluye ingesta y control de calidad de datos.", "Puntúa anomalías y aplica reglas antes de generar una alerta priorizada.", "Deriva a un analista que cierra el caso de forma documentada."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Defina trazabilidad, revisión humana y tratamiento de falsos positivos.", "criterios": ["Exige explicar las variables y reglas que dispararon la alerta.", "Prohíbe sancionar o acusar automáticamente: revisión humana obligatoria.", "Prevé el tratamiento de falsos positivos y la posibilidad de rectificación."]}]'::jsonb, '{7,9}'),
  (8, 'Media', 'Aprendizaje en mantenimiento ferroviario', 'Usted trabaja en una empresa ferroviaria. Sensores registran vibración y temperatura, mientras los técnicos documentan causas y reparaciones.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Explique cómo memoria y aprendizaje por experiencia se conectan sin ser equivalentes.", "criterios": ["Explica que la memoria aporta los casos registrados.", "Explica que el aprendizaje ajusta el modelo a partir de resultados confirmados, y que por eso no son lo mismo."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Identifique un aporte de la neurociencia que pueda inspirar procesamiento distribuido, sin afirmar copia literal.", "criterios": ["Nombra un aporte pertinente (conectividad, procesamiento distribuido o en paralelo, plasticidad).", "Aclara que es inspiración y no una copia del cerebro."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Proponga un ciclo para aprender de fallos confirmados y actualizar alertas predictivas.", "criterios": ["Describe un ciclo: capturar datos de sensores y diagnósticos, etiquetar la causa confirmada.", "Entrenar, validar, desplegar y retroalimentar las alertas."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Defina separación de datos, validación temporal y criterio de reentrenamiento.", "criterios": ["Separa datos de entrenamiento y prueba por períodos o equipos, probando hacia el futuro.", "Define cuándo reentrenar (deriva o umbral de desempeño aprobado)."]}]'::jsonb, '{7,8,9}'),
  (9, 'Media', 'Atención bancaria multicanal', 'Usted diseña automatización para un banco que recibe voz, chat y formularios. El sistema debe resolver consultas simples y escalar otras.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Analice percepción, lenguaje y memoria como funciones distintas dentro del servicio.", "criterios": ["Asigna la percepción a recibir voz o texto.", "Asigna el lenguaje a interpretar la consulta.", "Asigna la memoria a conservar el contexto y el conocimiento autorizado."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Explique por qué integrar varias Narrow AI no demuestra por sí mismo General AI.", "criterios": ["Explica que integrar u orquestar módulos no garantiza abstracción ni transferencia flexible a dominios nuevos."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Diseñe la orquestación entre voz, clasificación de intención, base de conocimiento y agente.", "criterios": ["Describe el recorrido: canal, transcripción, intención, contexto y búsqueda en la base.", "Termina en una respuesta o en la transferencia a un agente con el historial."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Proponga criterios de escalamiento por baja confianza, ambigüedad y riesgo financiero.", "criterios": ["Escala por baja confianza o ambigüedad.", "Escala por riesgo financiero: operaciones monetarias, sospecha de fraude o pedidos fuera de alcance."]}]'::jsonb, '{7,11}'),
  (10, 'Media', 'Diagnóstico visual de infraestructura', 'Usted es ingeniero/a en una empresa vial. Drones capturan imágenes de puentes para localizar grietas y priorizar inspecciones presenciales.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Diferencie detectar una grieta, reconocer un patrón de daño y comprender su causa.", "criterios": ["Detectar es localizar la grieta.", "Reconocer es clasificar el tipo de daño.", "Comprender la causa requiere contexto y análisis adicional que el modelo no aporta solo."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Explique el alcance de una Narrow AI visual y los límites de su inferencia.", "criterios": ["Explica que identifica patrones para los que fue entrenada.", "Señala que no determina por sí sola la causa ni la seguridad estructural."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Diseñe el proceso desde la captura hasta la orden de inspección, incluyendo geolocalización.", "criterios": ["Incluye plan de vuelo, captura y control de calidad de imágenes.", "Incluye detección, geolocalización o mapa y priorización.", "Termina en una orden de visita de un inspector."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Defina un muestreo de revisión y qué evidencia impediría automatizar el cierre del caso.", "criterios": ["Propone revisar una muestra (por ejemplo estratificada) y todos los casos críticos.", "Establece que el caso no se cierra sin inspección profesional."]}]'::jsonb, '{9,11}'),
  (11, 'Media', 'Gestión de expedientes con reglas', 'Usted automatiza expedientes en un organismo tributario. Hay normativa explícita, documentos heterogéneos y excepciones que requieren criterio experto.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Explique cómo el razonamiento simbólico representa hechos, reglas y conclusiones.", "criterios": ["Los hechos describen el expediente.", "Las reglas codifican la normativa y un motor deriva el estado o la acción."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Relacione reconocimiento de patrones con extracción de datos, sin equipararlo a razonamiento jurídico.", "criterios": ["Ubica el reconocimiento de patrones en la extracción de datos de documentos (OCR, campos).", "Aclara que la conclusión jurídica requiere reglas y revisión, no sólo patrones."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Diseñe una arquitectura que extraiga campos, valide reglas y derive excepciones.", "criterios": ["Incluye extracción (OCR) y validación de campos.", "Incluye un motor de reglas y una cola de excepciones resuelta por personas."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Proponga versionado de reglas y auditoría para conocer qué normativa produjo cada resultado.", "criterios": ["Propone un repositorio versionado de reglas con vigencia, pruebas y aprobación.", "Registra qué regla y versión produjo cada resultado."]}]'::jsonb, '{9}'),
  (12, 'Media', 'Diseño inspirado en neurociencia', 'Usted lidera I+D en una fábrica. Se evalúa un sistema que combine detección visual, memoria de casos y reglas de seguridad para detener maquinaria.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Explique dos aportes generales de la neurociencia al diseño de IA y sus límites como analogía.", "criterios": ["Nombra dos aportes pertinentes (redes conectadas, aprendizaje adaptativo, memoria asociativa, atención).", "Señala que la analogía tiene límites: no equivalen al cerebro real."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Compare procesamiento distribuido y razonamiento simbólico en el sistema propuesto.", "criterios": ["El procesamiento distribuido procesa señales en paralelo (por ejemplo, la detección visual).", "El razonamiento simbólico impone reglas explícitas y auditables (por ejemplo, las de seguridad)."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Diseñe capas separadas para percepción, memoria de casos, reglas y actuación.", "criterios": ["Separa percepción, memoria de casos, reglas y actuación en capas.", "Las reglas de seguridad tienen prioridad sobre lo que estime la percepción, y el actuador lleva a un estado seguro."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Indique qué funciones deben ser deterministas y cómo probaría una parada segura.", "criterios": ["Establece que la parada de seguridad debe ser determinista y a prueba de fallas.", "Propone pruebas de latencia, falla de sensor y recuperación."]}]'::jsonb, '{8,9}'),
  (13, 'Alta', 'Agente transversal del Estado', 'Usted asesora a un gobierno que propone un único agente para salud, impuestos, educación y justicia, con capacidad de transferir conocimiento entre dominios.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Establezca criterios que diferencien General AI de una colección de sistemas Narrow AI.", "criterios": ["La AGI exige desempeño amplio, abstracción y transferencia a tareas nuevas.", "Orquestar varios sistemas estrechos no cumple esos criterios."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Analice por qué abstracción, transferencia y creatividad son desafíos teóricos centrales.", "criterios": ["Explica que habría que formar conceptos reutilizables (abstracción) y aplicarlos en dominios nuevos (transferencia).", "Explica que habría que producir soluciones nuevas y pertinentes en contextos nuevos (creatividad), y por qué eso sigue sin resolverse."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Diseñe una estrategia por etapas que empiece con dominios acotados, interfaces y supervisión.", "criterios": ["Empieza con pilotos en dominios acotados y permisos mínimos.", "Usa interfaces estables y supervisión, y se expande sólo con evidencia."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Defina pruebas para detectar transferencia espuria, errores fuera de dominio y exceso de autonomía.", "criterios": ["Propone pruebas con casos inéditos o adversariales.", "Detecta confianza indebida o errores fuera de dominio y bloquea acciones fuera de su alcance."]}]'::jsonb, '{11}'),
  (14, 'Alta', 'Control de red eléctrica autónoma', 'Usted diseña una plataforma para una red eléctrica nacional que aprende de incidentes, aplica reglas de seguridad y coordina operadores y sistemas regionales.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Integre percepción, memoria, aprendizaje y razonamiento simbólico en un único modelo funcional.", "criterios": ["Asigna cada función: los sensores perciben, el historial recuerda, los modelos aprenden, las reglas limitan.", "Deja la decisión final en los operadores."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Explique la cognición distribuida entre personas, software, sensores y procedimientos.", "criterios": ["Explica que la decisión emerge de la coordinación entre centros, sistemas, procedimientos y experiencia humana, no de un único componente."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Proponga una arquitectura híbrida con límites de acción y modos degradados.", "criterios": ["Propone capas (regionales) con un motor de reglas prioritario.", "Separa recomendar de autorizar y prevé un modo degradado o control local."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Diseñe pruebas ante datos adversos, fallos simultáneos y recomendaciones conflictivas.", "criterios": ["Propone simulación, pruebas de ataque (red team) o inyección de fallas.", "Define cómo se reconcilian recomendaciones en conflicto y cómo se vuelve al control manual."]}]'::jsonb, '{7,8,9}'),
  (15, 'Alta', 'IA creativa para ingeniería', 'Usted evalúa un sistema que propone diseños de puentes novedosos, reutiliza experiencias y argumenta que posee creatividad general.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Defina qué combinación de abstracción, transferencia y creatividad apoyaría una afirmación de General AI.", "criterios": ["Pide evidencia conjunta: abstracciones reutilizables, transferencia eficiente y creatividad útil.", "Exige que se vea en varios dominios, no sólo en el diseño de puentes."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Explique por qué generar novedades válidas en un dominio no prueba inteligencia general.", "criterios": ["Explica que la novedad especializada puede surgir de búsqueda o de modelos de un solo dominio, sin competencia general."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Diseñe un proceso de generación, simulación, verificación normativa y aprobación profesional.", "criterios": ["Incluye requisitos, generación de alternativas y simulación.", "Incluye chequeo normativo, revisión independiente y firma de un profesional."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Proponga pruebas fuera de distribución y criterios para rechazar diseños plausibles pero inseguros.", "criterios": ["Propone casos inéditos: cargas extremas, materiales nuevos.", "Rechaza el diseño si viola restricciones o si la incertidumbre es alta, aunque parezca plausible."]}]'::jsonb, '{11}'),
  (16, 'Alta', 'Hipótesis de superinteligencia corporativa', 'Usted integra un comité de riesgo de una multinacional que estudia un sistema hipotético capaz de superar ampliamente a expertos en múltiples dominios.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Diferencie General AI y superinteligencia, indicando qué afirmaciones son hipotéticas.", "criterios": ["La AGI igualaría capacidades generales humanas; la superinteligencia las superaría ampliamente.", "Marca que ambas son hipotéticas y no deben afirmarse sin evidencia."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Analice desalineación de objetivos, concentración de poder y pérdida de control como debates de riesgo.", "criterios": ["Explica la desalineación: un objetivo mal especificado puede escalar el daño.", "Incluye la concentración de poder y la pérdida de control (quién accede y quién controla)."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Proponga una gobernanza preventiva con autorización escalonada, aislamiento y reversibilidad.", "criterios": ["Propone aislamiento (sandbox), permisos mínimos y aprobación múltiple.", "Incluye límites de recursos, registros, reversión y un apagado independiente."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Diseñe indicadores de capacidad, intentos de eludir controles y criterios de apagado.", "criterios": ["Vigila saltos súbitos de capacidad y búsqueda de privilegios.", "Vigila ocultamiento o resistencia a ser detenido, y define cuándo apagar."]}]'::jsonb, '{11,12}'),
  (17, 'Alta', 'Ecosistema sanitario cognitivo', 'Usted diseña un sistema para hospitales que integra imágenes, historias clínicas, lenguaje, guías médicas y experiencia de equipos multidisciplinares.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Modele la diferencia entre percepción, memoria, aprendizaje, lenguaje y razonamiento.", "criterios": ["Distingue las cinco funciones: captar señales, almacenar, adaptarse, comunicar y derivar conclusiones.", "Las ubica en el sistema del caso (imágenes, historias clínicas, guías, equipos)."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Explique cómo la cognición distribuida evita atribuir toda la decisión a un único algoritmo.", "criterios": ["Explica que la decisión pertenece al sistema sociotécnico: profesionales, guías, datos y herramientas."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Diseñe el flujo de apoyo clínico sin permitir diagnósticos o tratamientos plenamente autónomos.", "criterios": ["Diseña un flujo de apoyo: análisis por módulo, evidencia visible, recomendación.", "La decisión pasa por profesionales (por ejemplo, una junta clínica) y queda registrada."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Defina validación por subgrupos, explicación de evidencia, privacidad y responsabilidad final.", "criterios": ["Evalúa el desempeño por subgrupos de pacientes.", "Explica las fuentes de la recomendación y minimiza datos (privacidad).", "Asigna la responsabilidad final a profesionales."]}]'::jsonb, '{7,8,9}'),
  (18, 'Alta', 'Arquitectura cerebro-máquina crítica', 'Usted revisa una propuesta de seguridad pública que afirma copiar el cerebro para predecir conductas y automatizar intervenciones preventivas.', '[{"letra": "a", "tipo": "Concepto 1", "consigna": "Critique la metáfora cerebro-máquina y distinga inspiración neurocientífica de equivalencia funcional.", "criterios": ["Explica que la neurociencia inspira principios de diseño.", "Rechaza la afirmación de «copiar el cerebro» o de equivalencia cerebro-computadora."]}, {"letra": "b", "tipo": "Concepto 2", "consigna": "Analice las diferencias entre reconocer correlaciones, razonar con símbolos y comprender contexto.", "criterios": ["Reconocer correlaciones es clasificar; razonar con símbolos es aplicar reglas.", "Comprender el contexto no se deduce automáticamente de ninguna de las dos."]}, {"letra": "c", "tipo": "Aplicación al proceso", "consigna": "Rediseñe el proyecto hacia usos acotados y no punitivos, con decisión humana y derecho a revisión.", "criterios": ["Limita el sistema a usos acotados (análisis agregado o apoyo) y no punitivos.", "Prohíbe intervenciones automáticas y habilita decisión humana y apelación."]}, {"letra": "d", "tipo": "Diseño y control", "consigna": "Proponga pruebas de sesgo, robustez, explicabilidad y proporcionalidad antes de cualquier despliegue.", "criterios": ["Propone auditoría independiente de sesgo por grupos y pruebas de robustez.", "Pide explicaciones utilizables y una evaluación de necesidad y proporcionalidad."]}]'::jsonb, '{8,9}')
on conflict (id) do update set nivel = excluded.nivel, titulo = excluded.titulo, rol = excluded.rol, partes = excluded.partes, clases = excluded.clases;

insert into ia_contexto (clase, titulo, texto) values
  (7, 'De la inteligencia biológica a la automatización con IA', 'Clase 07 · 2.º parcial · 23 de septiembre
# De la inteligencia biológica a la automatización con IA
Clase grabada en dos partes la misma tarde. Dos preguntas la atraviesan: ¿qué tiene de
parecido y de distinto una IA respecto de una persona?, y ¿cómo se diseña, paso a
paso, una automatización que no sea sólo copiar un trámite manual a una pantalla? La idea
central: la IA no «copia» al cerebro, construye modelos computacionales especializados que imitan
algunas funciones observables — y automatizar bien significa rediseñar el proceso antes de sumarle
tecnología. La primera parte (7.1–7.8) da el marco conceptual; la segunda (7.9–7.14) lo aplica al
diseño concreto de un trámite digital.
Mapa mental de lo trabajado en clase (a partir de la grabación del 23 de septiembre). Cada rama se desarrolla en las secciones siguientes.
## 7.1 · De las capacidades biológicas a sus correlatos artificiales
La IA no «copia» al cerebro: construye sistemas especializados que imitan algunas funciones observables, no la experiencia completa de tenerlas.
Percepción
Biológica: integra estímulos con atención, contexto y experiencia — no es una foto pasiva, selecciona e interpreta (cruzar una avenida combina luz, sonido, velocidad y experiencia).
Correlato artificial
Visión por computadora (detecta objetos), reconocimiento de voz (audio → texto), sensores (variables físicas → datos).
Memoria
Biológica: codifica, conserva y recupera; memoria de trabajo (momentánea) y de largo plazo (organiza experiencia).
Correlato artificial
Bases de datos preservan registros exactos; memorias vectoriales recuperan contenido similar. El modelo no «recuerda» como una persona: calcula patrones.
Aprendizaje
Biológico: cambios relativamente estables por práctica, observación, explicación y retroalimentación, transferibles a situaciones nuevas.
Correlato artificial
Supervisado (ejemplos con etiqueta), no supervisado (agrupaciones o estructuras), por refuerzo (recompensas).
Lenguaje
Biológico: sistema simbólico para comunicar, razonar y coordinar; depende de contexto y conocimiento social («está frío» puede pedir cerrar una ventana).
Correlato artificial
El PLN clasifica, resume, traduce y genera texto prediciendo secuencias plausibles. La fluidez no garantiza comprensión ni verdad.
Persona vs. sistema de IA, dimensión por dimensión
Dimensión | Persona | Sistema de IA
Adaptación | Generaliza con pocos ejemplos y contexto | Excelente en tareas definidas y datos similares a los de entrenamiento
Velocidad | Limitada para cálculo masivo | Procesa grandes volúmenes rápidamente
Sentido común | Integra experiencia corporal y social | Puede fallar fuera de los patrones aprendidos
Memoria | Selectiva, reconstructiva y asociativa | Almacenamiento preciso, pero sin vivencia
Responsabilidad | Puede explicar intenciones y asumir deberes | Requiere supervisión y gobernanza humana
Fortalezas
Escala y velocidad.
Consistencia en tareas repetitivas.
Detección de patrones complejos.
Disponibilidad continua.
Limitaciones
Dependencia de datos y objetivos.
Errores plausibles («alucinaciones»).
Sesgos heredados de datos y diseño.
Baja comprensión del contexto real.
Principio de la cátedra
Automatizar tareas, no responsabilidades. Humano en el circuito para decisiones críticas. Medir calidad antes y después. Documentar límites y rutas de apelación.
## 7.2 · Automatizar no es copiar el proceso manual
Automatizar sirve cuando una tarea repetitiva puede ejecutarse más rápido y con consistencia — pero
trasladar mecánicamente un procedimiento existente a software no es diseñar una automatización.
Ejemplo de la cátedra: el examen de opción múltiple
Corregir exámenes uno por uno es lento. La solución fue volverlos multiple choice y comparar automáticamente contra una base de respuestas: rápido y escalable — millones de personas rinden certificaciones así todos los días. Pero el límite es real: que una respuesta coincida con el patrón esperado no demuestra que la persona comprenda el contenido. La IA no razona como una persona: la automatización acelera, no sustituye el juicio ni la supervisión humana.
Antes de automatizar: revisar si los pasos actuales son necesarios. Un procedimiento de 20 pasos puede reducirse a 10 antes de trasladarlo a una plataforma. El criterio debe ser el resultado esperado (por ejemplo, reducir el tiempo de entrega), no conservar por defecto todo lo heredado.
## 7.3 · El camino: de observar a supervisar
1 · ObservarMapear tareas, excepciones y problemas del proceso actual.
2 · DigitalizarConvertir papel y datos dispersos a formato digital.
3 · AutomatizarReglas para los pasos repetitivos y deterministas.
4 · Aumentar con IASumar percepción, predicción o lenguaje donde una regla no alcanza.
5 · SupervisarMétricas, revisión humana y mejora continua.
Regla didáctica
Si el proceso está desordenado, la IA automatiza el desorden. Primero se rediseña el proceso; después se incorpora la tecnología.
## 7.4 · Casos de uso
Sector público — expedientes y atención ciudadana
De formularios en papel y carga duplicada a: OCR que extrae texto de solicitudes, un repositorio único con trazabilidad, un clasificador que propone categoría y prioridad según casos históricos, y un asistente que redacta respuestas preliminares. Una persona valida las decisiones que afectan derechos — menor tiempo administrativo, sin delegar la responsabilidad pública al algoritmo.
Sector privado — logística y operaciones
Cámaras verifican etiquetas y daños; el historial integra pedidos, rutas e inventario; modelos predicen demanda y riesgo de atraso; operadores consultan el estado en lenguaje natural. El objetivo no es reemplazar personas, sino reasignar esfuerzo desde la captura repetitiva hacia la supervisión y la mejora.
Salud — un caso público sensible
Digitalización de recetas y formularios, historia administrativa unificada con acceso controlado, priorización orientativa de colas (nunca diagnóstico autónomo), chatbot que informa requisitos y deriva casos complejos. Un agente puede convertir voz a texto y priorizar pacientes críticos, pero la supervisión humana sigue siendo necesaria: la rapidez puede afectar la supervivencia de pacientes graves. A mayor impacto, mayor evidencia, transparencia y supervisión exigidas.
Comunicaciones y trabajo operativo
Plataformas de reuniones que generan minutas, identifican tareas y envían recordatorios; respuestas de correo con plantillas y consultas a sistemas internos (los asuntos legales o sensibles exigen redacción formal y controles adicionales); actualización de un ticket que dispara avisos automáticos a todos los clientes afectados por una incidencia.
## 7.5 · Gobernanza, riesgos y supervisión
Calidad y gobernanza de datos
Detectar datos no confiables o «basura»: limpiar, completar o descartar según criterios definidos. Identificar los datos estrictamente necesarios, las fuentes, la calidad mínima, los sensibles y la información que no debería recopilarse. Los datos que identifican a una persona (nombre, DNI) exigen protección y una ubicación de almacenamiento compatible con la normativa aplicable.
Supervisión humana
Definir si una persona puede aprobar, corregir, anular o detener una decisión automática, y qué decisiones se resuelven con reglas y cuáles requieren clasificación, predicción, detección de anomalías u optimización.
Pruebas y confiabilidad
Evitar que el sistema perpetúe errores históricos. Probar en un entorno controlado antes del piloto y la producción; definir métricas de éxito, riesgo, tiempo y calidad; preparar un plan de recuperación ante fallas de la IA o de sus integraciones.
## 7.6 · Costos: cuándo conviene un modelo y cuándo una regla
Los modelos de IA se consumen mediante interacciones o tokens: una interacción individual
parece barata, pero un sistema con volumen alto acumula costos significativos. Antes de implementar
conviene proyectar volumen y costo total — y, si un sistema de reglas puede resolver el mismo caso,
suele ser más rápido y más económico que invocar un modelo de lenguaje para una decisión determinista.
Referencia citada en clase
Concepto | Dato
Configuración profesional (Power Automate, Oracle, IBM) | Estimación de referencia: ≈500 horas de ingeniería por USD 10.500
Cronograma típico | Beta en 3 meses; automatización más completa en ≈1 año, con retroalimentación y ajustes
Algunas organizaciones deben desarrollar internamente por razones de confidencialidad, en vez de tercerizar en plataformas comerciales.
## 7.7 · Implementación y evolución continua
La implementación se organiza con un plan de cambio y un cronograma (diagrama de Gantt). No es un
proyecto que termina: las herramientas y mejores prácticas cambian constantemente, y la falta de
adaptación puede producir obsolescencia — empresas y productos perdieron relevancia por no responder
a tiempo a cambios tecnológicos y de mercado. Esta idea conecta directamente con la Clase 06:
el hype promete una automatización total; la automatización responsable la trata como un proceso
que se revisa y se actualiza.
## 7.8 · Actividad de aula
Diagnosticar una oportunidad
Una municipalidad recibe reclamos por correo, papel y teléfono; tres personas leen, copian datos y derivan cada caso a mano.
Percepción — ¿qué señales deben capturarse?
Memoria — ¿qué antecedentes deben recuperarse?
Aprendizaje — ¿qué patrón puede inferirse?
Lenguaje — ¿qué interacción puede simplificarse?
Entrega en equipos: propuesta de 5 pasos + un riesgo + una métrica de éxito + un punto de revisión humana.
Cinco ideas para llevar (parte 1)
1) La inteligencia surge de varias capacidades conectadas. 2) Los sistemas artificiales son especializados, no equivalentes a una persona. 3) La IA amplifica procesos, buenos o malos. 4) La automatización responsable conserva supervisión humana. 5) Empezar pequeño, medir y aprender reduce riesgos. Pregunta final de la cátedra: ¿qué tarea automatizarías y cuál nunca delegarías por completo?
## Segunda parte de la clase: diseñar un trámite digital
Sesión práctica, grabada más tarde el mismo 23 de septiembre: cómo diseñar un sistema para
recibir, validar y derivar expedientes administrativos. Aplica el paso 3 del camino
anterior (automatizar con reglas) con un ejemplo concreto: automatizar con reglas
todo lo que se pueda —son más rápidas y baratas— y reservar la IA para donde realmente agregue algo
que una regla no puede dar.
si una regla explícita alcanza para decidir…
…usar IA ahí es más caro, más lento y no aporta nada
Mapa mental de la segunda parte de la clase (misma grabación del 23 de septiembre).
## 7.9 · El flujo: captura, validación y derivación
Captura de datos
DNI, nombre, domicilio y planilla, evitando verificaciones visuales innecesarias. El domicilio del DNI puede estar desactualizado: conviene una fuente más confiable (ej. consultar un servicio como Mi Argentina) en vez de confiar en el dato tal cual.
Validación
Comprobar que el DNI sea válido y coincida con el nombre. Para empresas: actividad declarada, cumplimiento tributario, pagos a organismos (ANSES, ARCA) y existencia de multas o deudas, siempre que la fuente esté disponible.
No hay un único supuesto estándarPersonas extranjeras, empresas del Mercosur y otros casos que no encajan en el molde necesitan excepciones explícitas, no un rechazo automático.
Derivación
En vez de repartir papeles, el portal notifica a cada área por correo con acceso al caso, y los responsables registran checks y comentarios en un espacio común — trazabilidad de quién hizo qué.
## 7.10 · Desacoplamiento y operación en clúster
El desacoplamiento reduce dependencias entre etapas: en vez de una cadena estrictamente secuencial, un conjunto de operadores disponibles puede revisar casos en paralelo.
Cualquier operador disponibletoma un caso de la cola — el servicio sigue funcionando aunque falten personas.
KPI: tiempo de atenciónse citó como ejemplo pasar de 2 a 3 minutos como señal de que la fila empieza a crecer.
Supervisiónsi la fila crece, el supervisor redistribuye capacidad; algunas decisiones finales igual requieren una persona.
## 7.11 · Reglas, excepciones, y dónde aporta la IA
Cuándo usar cada herramienta
Herramienta | Cuándo
Reglas | Primera opción: más rápidas y económicas para validar condiciones explícitas y requisitos conocidos.
Excepciones | Situaciones previstas que no siguen la regla general (empresas brasileñas o del Mercosur, por ejemplo) — se codifican aparte, no se fuerzan dentro de la regla principal.
IA | Clasificar solicitudes textuales, detectar anomalías o posible fraude, interpretar documentos o imágenes, optimizar y recomendar — cuando la regla no alcanza.
Error típicoUsar un modelo de lenguaje para extraer un dato de una base desordenada cuando una consulta estructurada con resultado binario sería más barata y más confiable. La IA no reemplaza un mejor diseño de datos.
## 7.12 · Confianza, datos y almacenamiento
Nivel de confianza
Se puede basar en el historial: cantidad de solicitudes previas, consistencia entre actividades declaradas y cambios inusuales de rubro (posible señal de anomalía).
Automatización escalonada
Resolver automáticamente los casos simples; derivar a revisión humana los incompletos, ambiguos o excepcionales — y revisar solo una fracción del total, no todo.
Gobernanza de datos
Identificar los datos estrictamente necesarios, los sensibles, las fuentes, la calidad mínima y los posibles sesgos — y qué datos no deberían recopilarse. La información sensible va a un repositorio cifrado sujeto a la normativa correspondiente, con histórico y auditoría; para datos históricos de baja frecuencia de acceso, un almacenamiento de bajo costo (ej. AWS Glacier) es preferible, aunque extraerlos cueste más.
## 7.13 · Piloto, continuidad y arquitectura
Antes de escalar: una beta con 2 o 3 empresas para detectar fricciones y puntos donde el proceso se traba. Ante una falla de la IA o de una integración, el sistema necesita un plan de continuidad del negocio y recuperación ante desastres — infraestructura redundante entre proveedores de nube y regiones, aunque eso suba el costo. La arquitectura conceptual: módulos conectados, una base de datos de solicitudes e histórico, y componentes separados para reglas, guías y excepciones (el histórico retroalimenta la mejora del sistema).
## 7.14 · Cuando el trámite es una urgencia clínica
Las reglas administrativas no sirven en salud
Las solicitudes pueden llegar por formulario, correo, llamada o servicios web, y generar avisos
automáticos a los responsables — igual que en un trámite comercial. Pero en una clínica el tiempo
puede determinar la supervivencia del paciente: una persona inconsciente, o con un nivel de
gravedad alto, debe ser atendida y estabilizada antes de completar todos los datos
administrativos. Un modelo de riesgo puede recomendar prioridades, pero las reglas deben admitir
concesiones — nunca bloquear la atención urgente por falta de información.'),
  (8, 'Cognición distribuida y metáforas cerebro-máquina', 'Clase 08 · 2.º parcial · 2 de octubre
# Cognición distribuida y metáforas cerebro-máquina
La clase gira sobre dos palabras clave: cognición y neurociencia.
La primera mitad cambia la unidad de análisis: la inteligencia no vive sólo dentro de una cabeza,
se reparte entre personas, artefactos, datos y tiempo. La segunda mitad pregunta qué
tomó la IA del estudio del cerebro —y qué no debería tomar literalmente—, y lo baja a casos
públicos y privados. La idea de cierre: diseñar IA es diseñar una relación entre capacidades
humanas, procesos institucionales, datos y modelos.
personas + artefactos + datos + entorno
+ registros acumulados en el tiempo
la inteligencia aplicada surge de relaciones, no de un componente aislado
Objetivos de la clase, según la cátedra
Explicar por qué la cognición puede distribuirse entre personas, artefactos, datos y entorno.
Analizar alcances y límites de las metáforas que comparan cerebro y computadora.
Relacionar hallazgos de la neurociencia con arquitecturas y prácticas de diseño de IA.
Diseñar casos de uso públicos y privados con supervisión humana.
Identificar riesgos de reduccionismo, opacidad, sesgo y automatización indebida.
## 8.1 · Qué es la cognición
El profesor la presentó como un concepto «bien abstracto»: en el habla cotidiana, «cognitivo» suena a
algo difícil de definir. La definición de trabajo de la clase:
Definición
La cognición es el conjunto de procesos mentales que permiten adquirir,
procesar, almacenar, recuperar y utilizar información para interactuar con el mundo.
Dicho de otro modo: la capacidad de conocer, comprender y dar sentido a lo que nos rodea.
Origen de la palabra
Del latín cognitio («acto de conocer»), del verbo cognoscere («conocer, reconocer»). Se arma con com- (junto, con) + gnoscere (conocer), de la raíz indoeuropea *gno- (saber).
Evolución del sentido
Edad Media: capacidad de comprender. Siglo XVII: se amplía a la percepción y la sensación. Hoy: proceso mental de adquisición, procesamiento, almacenamiento y uso de información.
Detalle para retener
Etimológicamente es «conocer en conjunto»: la idea de cognición distribuida (8.4) ya está en la palabra.
Procesos cognitivos principales
Percepción: interpretar estímulos del entorno.
Atención: seleccionar la información relevante.
Memoria: recordar experiencias.
Pensamiento: analizar, razonar, crear ideas.
Lenguaje: comunicar y representar ideas.
Toma de decisiones y resolución de problemas.
Cognición y cultura
No hay una única forma de cognición: la cultura moldea cómo percibimos, pensamos y decidimos.
Ejemplos de la lámina
Tradiciones occidentales: pensamiento más analítico, lineal e individual. Orientales: más holístico, contextual y relacional. Pueblos indígenas: integran naturaleza, experiencia y espiritualidad. Culturas colectivistas: priorizan el bienestar del grupo al decidir.
OjoSon tendencias generales que propone la lámina, no reglas sobre personas concretas. Leerlas como destino sería caer en el «determinismo» de 8.13.
## 8.2 · Consciente y subconsciente
Para el profesor, lo más importante de la cognición es la diferencia entre lo consciente y lo
subconsciente: la mayor parte de la actividad cognitiva ocurre de forma subconsciente
e influye en lo que pensamos, sentimos y hacemos sin que lo notemos.
Basado en la infografía de la cátedra (diapositiva 2) y en los ejemplos de la clase grabada. Los dos niveles interactúan todo el tiempo.
La analogía del profesor con los chatbots
En ChatGPT o Copilot, el modo normal devuelve rápido lo primero que encuentra («el menor esfuerzo
necesario»); el modo de razonamiento profundo consulta muchas más fuentes y puede tardar
bastante más. El profesor lo comparó con dos preguntas: «contame ya mismo qué te pareció la
secundaria» (respuesta inmediata, lo primero que sale) contra «traeme un ensayo la semana que viene»
(respuesta pensada y repensada). Su conclusión: en la IA no hay una parte consciente y
otra subconsciente, aunque se intentó imitar algo parecido.
Cómo leer bien la analogía
Según la infografía, lo deliberado y lento corresponde a lo consciente, y lo automático y rápido a lo subconsciente. En la grabación la correspondencia aparece al revés en un momento —la transcripción es confusa—: quedate con la de la lámina.
Error típicoDecir que el «modo razonamiento» de un chatbot es su conciencia. Es una diferencia de cómputo y de búsqueda, no de experiencia: atribuirle conciencia es justamente el antropomorfismo de 8.13.
## 8.3 · La IA, inspirada en la cognición
La IA se inspira en los procesos cognitivos humanos para diseñar sistemas que perciben, aprenden,
razonan y deciden. No posee conciencia: simula algunas funciones de la cognición.
Áreas de inspiración
Área de IA | Proceso cognitivo que la inspira
Redes neuronales | La estructura del cerebro humano
Aprendizaje automático | Aprender a partir de la experiencia (datos)
Visión por computadora | La percepción
Procesamiento de lenguaje natural | El lenguaje humano
Robots inteligentes | Percepción, planificación y acción integradas
Imitar el comportamiento humano
Ejemplos de la clase: asistentes virtuales con voces y acentos cada vez más parametrizables; llamadas automáticas en las que parece que habla una persona; taxis autónomos diseñados para manejar «como una persona».
Conecta con
La prueba a ciegas que propuso el profesor —subir con los ojos vendados a un taxi autónomo y después a uno manejado por una persona, sin poder distinguirlos— es un juego de imitación aplicado al manejo. Ver clase 3.
Lo que sigue siendo humano
La IA amplifica capacidades cognitivas, pero la creatividad, la empatía y el juicio ético siguen siendo esencialmente humanos. La tecnología no reemplaza la cognición humana: la potencia cuando se usa de forma ética, crítica y responsable.
## 8.4 · Cognición distribuida
La unidad de análisis deja de ser la mente individual y pasa a ser el sistema
sociotécnico: el razonamiento también ocurre en los documentos, las bases de datos, los
roles y la memoria de una organización.
Distribución social
El razonamiento se reparte entre personas con conocimientos, roles y responsabilidades diferentes.
Ejemplo de la lámina
Un comité que combina especialistas técnicos, jurídicos y operativos.
Aporte de la clase
Se vincula con el conocimiento colectivo: lo que una comunidad da por establecido y casi nadie discute (por ejemplo, que robar está mal), más allá de las ideas de cada uno.
Distribución material
Documentos, tableros, sensores, modelos y bases de datos conservan y transforman información. Los artefactos participan en la tarea cognitiva.
Aporte de la clase
Los repositorios que conservan datos e información de la organización: data lakes, bases, archivos.
Distribución temporal
Las decisiones actuales dependen de registros, aprendizajes y retroalimentación acumulados en el tiempo. La memoria organizacional es parte del sistema.
Aporte de la clase
El profesor la ilustró con la jerarquía de memorias de una computadora (abajo): no todo lo que «se sabe» está disponible de inmediato.
La analogía de la memoria: de lo inmediato a lo archivado
Nivel | Cómo es | Ejemplo citado en clase
Memoria del CPU | La más volátil y rápida: lo que el procesador usa en el momento | El «ahora mismo» del cálculo
RAM | Volátil, fuera del CPU: lo que necesita el programa en ejecución | —
Almacenamiento persistente | No volátil: queda escrito y se mantiene | Disco de la computadora
Almacenamiento frío | Muy barato de guardar, lento y caro de recuperar | AWS Glacier: recuperar algo puede tardar horas
Cintas | Archivo físico de muy largo plazo | Bancos y aseguradoras que deben conservar transacciones por ley
Por qué un banco guarda en «frío»
La ley obliga a conservar las transacciones por años, pero casi nunca se consultan. Si un juzgado
pide una operación puntual, alcanza con entregarla al día siguiente: conviene pagar poco por guardar
y caro por recuperar unas pocas veces al año. Es la misma decisión de costo que apareció en la
clase 7 para los datos históricos de baja consulta.
## 8.5 · De la mente aislada al sistema sociotécnico
Una decisión emerge de interacciones entre actores, representaciones y tecnología.
Modelo de la diapositiva 5. El algoritmo vive dentro de «artefactos»: es una pieza de la red, no la red.
La calidad de la decisión no depende únicamente del algoritmo. También depende de:
Cómo circula la informaciónPor dónde entra, quién la ve y en qué momento.
Quién interpreta la recomendaciónEn clase: lo que la IA «entiende» depende también de las instrucciones (el prompt) que se le dan.
Qué evidencia queda registradaSi el sistema guarda o no el historial de lo que pasó.
Quién puede corregir el procesoLa persona o el área que tiene ese rol asignado.
Es el mismo «sistema sociotécnico» de la clase 4 (modelo + datos + proceso + personas + gobierno), ahora como herramienta de análisis cognitivo.
## 8.6 · Metáforas cerebro-máquina
Una metáfora es una comparación: «esto se parece a aquello». Las metáforas cerebro-máquina son modelos útiles para pensar, no equivalencias literales.
Cerebro como computadora
Describe entradas, procesamiento, memoria y salidas.
Aporta
Vocabulario funcional para describir la mente.
Oculta
El cuerpo, el contexto y la plasticidad.
Computadora como cerebro
La metáfora inversa: inspira redes neuronales y aprendizaje adaptativo.
Aporta
Arquitecturas que aprenden de los datos.
Oculta
Puede generar expectativas exageradas de comprensión o conciencia.
Sistema híbrido
Considera la inteligencia humana, la organización y el modelo como partes complementarias.
Por qué es la preferida
Es la más útil para la gobernanza y el diseño responsable: obliga a preguntar quién hace qué.
«El cerebro es la mejor computadora que existe»
Así lo planteó el profesor, por su resiliencia: si a una computadora le cae agua en
el teclado, hay que cambiar el teclado; si una persona sufre un ACV, otra zona del cerebro puede
asumir parte de la función dañada. El cerebro funciona como una unidad integrada, no como un
conjunto de piezas intercambiables.
Hacia dónde va el hardware
Comentó un anuncio reciente de NVIDIA: un chip que integra CPU, GPU y suficiente memoria para correr
un modelo de IA de forma local, sin depender de la infraestructura de la nube, y con mucho menor
consumo y calor. Lo presentó como un paso hacia sistemas integrados, «como el
cerebro».
Leer estas frases con la lámina al lado
«El cerebro es una computadora perfecta» es en sí una metáfora del primer tipo, y la lámina
advierte qué deja afuera. Usala como imagen didáctica, no como afirmación técnica: el cerebro no
tiene una RAM ni un disco, y un chip integrado no es «un cerebro».
## 8.7 · Neurociencia: qué es y de dónde viene
Origen y definición
Neuro- (del griego neuron, nervio) + -ciencia (del latín scientia, conocimiento): literalmente, la ciencia del sistema nervioso.
En clase
La ciencia que estudia el cerebro desde el punto de vista funcional, para trasladar ese conocimiento a algo que el ser humano pueda construir y manipular.
¿Quién la inventó?
Nadie en particular: es el resultado del trabajo de muchos científicos de la medicina, la biología, la psicología y la tecnología. Se considera disciplina formal desde el siglo XX, cuando se unificaron las distintas áreas que estudiaban el cerebro y el sistema nervioso.
Máximos exponentes (casi todos médicos, como remarcó el profesor)
Científico | Aporte | Nobel
Santiago Ramón y Cajal | Padre de la neurociencia moderna: describió la estructura de las neuronas. | 1906
Charles Sherrington | Introdujo el concepto de sinapsis y de integración neuronal. | 1932
Eric Kandel | Estudió la base molecular de la memoria. | 2000
May-Britt Moser | Descubrió, junto con Edvard Moser, las células de red del «sistema de posicionamiento» del cerebro. | 2014
Corrección sobre la lámina
Dato a corregirLa infografía atribuye a May-Britt Moser las «células de lugar». Las células de lugar las descubrió John O''Keefe; los Moser descubrieron las células de red (grid cells). Los tres compartieron el Nobel de 2014. Si te lo preguntan en el formato de la lámina, conviene conocer las dos versiones.
AntigüedadHipócrates y GalenoPrimeras ideas sobre el cerebro y la mente.
Edad MediaCreencias filosóficas y religiosasPersisten como marco para explicar la mente.
Renacimiento (siglo XVI)Andrés VesalioEstudios anatómicos.
Siglo XIXLocalización de funcionesBroca y Wernicke identifican áreas del lenguaje.
Siglo XXConsolidación como disciplinaMétodos experimentales y neuroimagen.
Siglo XXIConectómica y neurotecnologíaNeurociencia cognitiva, neurotecnología e inteligencia artificial.
Descubrimientos clave y relación de ida y vuelta con la IA
Descubrimientos clave: la neurona y la sinapsis; la plasticidad cerebral; la localización de funciones (lenguaje, memoria, visión); las técnicas de neuroimagen (fMRI, PET, EEG), que permiten ver el cerebro en acción; las bases neuronales de la memoria y el aprendizaje; la relación cerebro-comportamiento (emociones, decisiones, conducta); y las interfaces cerebro-máquina.
La neurociencia inspira a la IA
Las redes neuronales artificiales se inspiran en el cerebro.
Estudiar aprendizaje, percepción y decisión ayuda a crear algoritmos más eficientes.
Aporta ideas sobre cómo procesar información, reconocer patrones y adaptarse.
La IA impulsa a la neurociencia
Analiza grandes volúmenes de datos de neuroimagen.
Detecta patrones imposibles de ver manualmente.
Facilita nuevas neurotecnologías y tratamientos.
Ejemplos de uso: diagnóstico temprano de Alzheimer con IA y neuroimagen; neuroprótesis (brazos robóticos controlados con la mente); plataformas educativas adaptativas; apps de salud mental; interfaces cerebro-computadora para personas con discapacidad; asistentes que reconocen emociones y contexto.
## 8.8 · Qué toma la IA de la neurociencia
Inspiración funcional, no copia completa del cerebro. En clase: la IA intenta imitar al ser humano en estructura, pero sobre todo en comportamiento y funcionalidad.
Cinco aportes
Principio del cerebro | Cómo aparece en la IA
Ajuste de conexiones | Aprender modificando conexiones: la inspiración de las redes neuronales.
Procesamiento jerárquico | Extracción progresiva de rasgos en la percepción (de bordes a formas a objetos).
Atención selectiva | Priorizar de forma dinámica la información relevante.
Memorias diferenciadas | Separar estados transitorios de conocimiento persistente.
Predicción y retroalimentación | Reducir el error mediante ciclos de ajuste: el cerebro aprende de la experiencia, y el modelo también.
## 8.9 · Plasticidad, aprendizaje y adaptación
Los sistemas útiles deben aprender sin perder control ni estabilidad.
Principio neurocientífico
La plasticidad permite modificar las conexiones con la experiencia. El aprendizaje depende de la exposición, la práctica y la retroalimentación.
Ejemplo de clase
Alguien que llega a un país sin hablar el idioma (o un chico que entra a una escuela sin saber español) aprende a comunicarse en semanas o meses por pura inmersión, sin un curso especial: el mismo mecanismo adaptativo. Por eso la mejor forma de aprender inglés es vivirlo.
Traducción a IA
Entrenamiento, ajuste fino (fine-tuning), aprendizaje continuo, actualización de representaciones y evaluación frente a datos nuevos.
En clase
«Entrenar es tener experiencias»: aprender por ensayo y error, como una persona. Los proveedores suelen expresar el entrenamiento en tiempo o en interacciones (por ejemplo, «hacen falta 10.000 interacciones» antes de que el comportamiento se parezca a lo que se busca); la cantidad depende del objetivo.
Cautela de diseño
Un modelo que se adapta sin límites puede degradarse, olvidar capacidades o incorporar sesgos.
Error típicoSuponer que «más aprendizaje continuo» siempre mejora el sistema. Sin versiones, pruebas y supervisión, la adaptación puede empeorarlo.
## 8.10 · Atención, memoria y control ejecutivo
Tres funciones cognitivas que inspiran componentes concretos de un sistema inteligente:
AtenciónSeleccionar señales relevantes entre muchas entradas. Ej.: priorizar expedientes urgentes sin ocultar los demás.
MemoriaConservar contexto operativo, reglas y antecedentes, distinguiendo información autorizada, temporal y sensible.
Control ejecutivoPlanificar, inhibir respuestas inadecuadas, comparar alternativas y escalar excepciones a una persona responsable.
## 8.11 · Casos de uso: sector público y privado
Como en cada clase, la cátedra baja los conceptos a ejemplos de organismos públicos y de empresas: «se van a graduar y van a trabajar en uno de los dos».
Público — priorización de mantenimiento
La IA apoya la asignación de recursos; no reemplaza la responsabilidad administrativa. El objetivo es la mayor disponibilidad posible de los activos (en clase: una línea de colectivos).
Sistema distribuido
Reportes ciudadanos + sensores + historial de obras + cuadrillas + criterios presupuestarios + modelo predictivo.
Aporte neuroinspirado
Atención para detectar señales críticas; memoria de fallas recurrentes; predicción del riesgo de deterioro.
Salvaguardas
Criterios públicos, auditoría de datos, revisión técnica, canal de reclamo.
Riesgo específicoDiscriminar zonas que reportan menos (por menor acceso o capacidad de reporte): menos reportes no significa menos necesidad. La lámina lo prohíbe explícitamente.
Público — gestión de trámites
Asistencia cognitiva para reducir tiempos sin automatizar derechos.
Reparto de tareas
El sistema clasifica documentos, detecta faltantes y propone una ruta. El personal interpreta excepciones, verifica evidencia y toma la decisión formal. El expediente conserva la trazabilidad de datos, reglas, recomendaciones y modificaciones.
Indicadores
Tiempo de resolución, tasa de corrección, diferencias entre grupos y cantidad de revisiones humanas.
Matiz de la clase
El profesor lo describió como una «industria» de entrada y salida, lo más automatizada posible, medida con KPIs y con pocas excepciones. Las dos ideas conviven: se reduce la intervención manual en el flujo rutinario, pero la decisión que afecta derechos sigue siendo humana.
LímiteNo delegar decisiones que afecten derechos en una salida automática que no se pueda explicar.
Privado — mantenimiento predictivo
La cognición se distribuye entre sensores, modelo y conocimiento operativo.
Datos y percepción
Sensores registran vibración, temperatura y consumo; el modelo detecta patrones anómalos antes de una avería.
Experiencia humana
El personal técnico combina la alerta con el ruido, el contexto de producción, el historial del equipo y las condiciones ambientales.
Decisión empresarial
Se prioriza la intervención según seguridad, costo, repuestos disponibles y riesgo de parada.
Ejemplo de clase: el auto
Hay reglas fijas del fabricante (cambiar el aceite a los 15.000 km, revisar la distribución a los 80.000) y señales que anticipan una falla (temperatura, consumo eléctrico, un volante que empieza a vibrar). El mantenimiento cubre los dos frentes.
Privado — atención y riesgo comercial
Personalización con memoria contextual y límites éticos.
Cómo funciona
Un asistente recupera antecedentes autorizados y resume interacciones para el equipo. Un modelo de riesgo propone señales; la aprobación considera la calidad de los datos y la posibilidad de revisión. La interfaz muestra factores relevantes, incertidumbre y alternativas.
Qué se mide
Satisfacción, precisión, falsos rechazos, tiempos y concentración de errores.
Condición previa (clase)
Los antecedentes tienen que estar digitalizados y disponibles en una base en línea.
Error típicoPensar que alcanza con no usar variables sensibles. También hay que evitar proxies: variables que las reemplazan indirectamente (por ejemplo, el código postal en lugar del origen) y producen discriminación injustificada.
## 8.12 · El mismo principio, distintas obligaciones
Organismo público vs. empresa privada
Organismo público | Empresa privada
Prioridad | Legalidad, igualdad, debido proceso, transparencia, accesibilidad y rendición de cuentas | Valor, eficiencia, experiencia, seguridad, cumplimiento y reputación
Finalidad (clase) | Sin fines de lucro: dar el mejor servicio posible a la gente | Con fines de lucro: bajar costos y aumentar la productividad
Relación | El ciudadano no siempre puede elegir otro proveedor | Debe gestionar consentimiento, competencia y relación contractual
Productividad, según la definición dada en clase: la medida en que se aprovechan los recursos disponibles. Bajar costos y aumentar ingresos es aumentar la productividad.
Finalidad explícitaPara qué se usa.
Datos pertinentesSólo los necesarios.
Supervisión humanaQuién decide.
TrazabilidadQué queda registrado.
Evaluación continuaCómo se corrige.
Esos cinco elementos se exigen en ambos casos, sea público o privado.
## 8.13 · Riesgos de la metáfora cerebral
Riesgos que aparecen cuando la IA toma características del cerebro humano: confundir inspiración con equivalencia lleva a errores técnicos y sociales.
Antropomorfismo
Atribuir intención, comprensión o conciencia a un sistema que produce correlaciones y respuestas.
Ejemplo«El chatbot pensó más en el modo profundo, entonces entendió». Conecta con el Cuarto Chino de la clase 4: producir la salida correcta no prueba comprensión.
Reduccionismo
Tratar la inteligencia como cálculo aislado e ignorar cuerpo, cultura, cooperación, normas y contexto.
EjemploPensar que alcanza con un algoritmo mejor e ignorar la red sociotécnica de 8.5. Es lo contrario de la cognición situada de la clase 4.
Determinismo
Suponer que una predicción define a una persona, o que el resultado algorítmico es inevitable y neutral.
Ejemplo«El modelo dice riesgo alto, entonces se rechaza». La predicción es una señal para revisar, no un veredicto.
## 8.14 · Principios de diseño responsable
Pasar del modelo aislado a una arquitectura de decisión:
FinalidadDefinirla y justificar por qué se necesita IA.
Mapa de la redActores, artefactos, datos, decisiones y mecanismos de corrección.
Interfaces honestasQue comuniquen evidencia, límites e incertidumbre.
Decisiones reservadasLas decisiones críticas y las excepciones quedan en manos de responsables identificables.
Pruebas ampliasDesempeño técnico, impacto distributivo, seguridad y accesibilidad.
Registro y revisiónMonitoreo, revisión periódica y posibilidad real de impugnación.
## 8.15 · Actividad de aula y síntesis
Diseñar un sistema híbrido
Elegir un procesoTurnos hospitalarios, inspección urbana, logística, fraude o atención al cliente.
Dibujar la red cognitivaPersonas, datos, documentos, sensores, modelo y canales de retroalimentación.
Identificar la inspiraciónQué función se inspira en percepción, atención, memoria, predicción o control ejecutivo.
Repartir decisionesQué decide la IA, qué recomienda y qué debe decidir una persona.
Cuatro indicadoresRendimiento, equidad, explicabilidad y capacidad de corrección.
Un riesgo y una salvaguardaUn riesgo de metáfora (8.13) y una salvaguarda concreta para él.
cognición distribuida
+ neurociencia
+ gobernanza
diseñar IA es diseñar una relación entre personas, procesos, datos y modelos
Cuatro ideas para llevar
1) Diseñar IA es diseñar una relación entre capacidades humanas, procesos institucionales, datos y modelos. 2) Las metáforas orientan, pero también pueden ocultar diferencias. 3) La neurociencia aporta principios de aprendizaje, atención, memoria y adaptación. 4) El valor aparece cuando la tecnología fortalece decisiones responsables y corregibles.
Notas sobre las fuentes de esta clase
La grabación empieza con la clase ya comenzada: lo dicho antes del primer minuto no quedó registrado.
El nombre del chip de NVIDIA que comentó el profesor (8.6) no se entiende en la grabación; el contenido de ese panel es su relato, no un dato técnico verificado.
La comparación de costos del almacenamiento frío se dejó sin cifras: el precio por gigabyte que se escucha en la grabación parece mal transcripto.
La fecha (2 de octubre) sale de los datos de la grabación.'),
  (9, 'Patrones, símbolos y experiencia: de los fundamentos a la nube en tiempo real', 'Clase 09 · 2.º parcial
# Patrones, símbolos y experiencia: de los fundamentos a la nube en tiempo real
La clase tiene dos partes. La primera presenta los tres pilares conceptuales sobre los
que se apoya casi cualquier sistema de IA: reconocer patrones, razonar con símbolos y aprender de la
experiencia, cada uno con procesos que pasaron de manuales a automáticos. La segunda baja el primer
pilar a la práctica: cómo se reconocen patrones en datos que llegan en tiempo real con
las herramientas de las cuatro grandes nubes públicas, qué cuestan y cómo elegir entre ellas.
ver regularidades en los datos
+ razonar con reglas explícitas + mejorar con la experiencia
tres capacidades distintas que los sistemas reales combinan
Bibliografía base de la cátedra
Pérez Rodríguez, M. D. (coord.), Inteligencia artificial: fundamentos, aplicaciones y futuro. Los dos PPT de la clase se apoyan en ese libro; las citas entre comillas de esta sección son de esa bibliografía, tal como las trae la cátedra.
## 9.1 · Tres pilares conceptuales
Toda tarea de IA se apoya, en mayor o menor medida, en tres capacidades. La clase las recorre con la misma estructura: qué es, cómo funciona técnicamente y qué proceso manual reemplazó.
01 · Reconocimiento de patrones
Cómo una máquina identifica regularidades en imágenes, sonido o datos.
La máquina…
«ve» y clasifica regularidades en los datos.
02 · Razonamiento simbólico básico
Representar el conocimiento con símbolos y reglas lógicas del tipo «si–entonces».
La máquina…
razona con reglas explícitas sobre el conocimiento.
03 · Aprendizaje por experiencia
Mejorar el desempeño a partir de la exposición repetida a datos.
La máquina…
aprende y mejora con cada nueva experiencia.
Los tres pilares retoman la tensión de toda la materia: el paradigma simbólico y el conexionista de la clase 2, y la evolución «desde los primeros enfoques basados en reglas y lógica hasta los modernos sistemas de aprendizaje automático y aprendizaje profundo».
## 9.2 · Reconocimiento de patrones
Definición
Es la capacidad de un sistema de IA de identificar regularidades, similitudes o estructuras
recurrentes en datos como imágenes, sonido, texto o transacciones, sin que cada regla se
programe a mano.
Base técnica: el enfoque conexionista
Se apoya en redes neuronales artificiales, inspiradas en el cerebro, organizadas en capas que procesan la información de forma jerárquica.
Donde rinde más
Reconocimiento de imágenes y procesamiento del lenguaje natural.
Conecta con
La metáfora «computadora como cerebro» de la clase 8: es inspiración, no copia.
Hito ilustrativo: Google Brain (2012)
Una red neuronal aprendió a identificar y agrupar gatos en videos de YouTube sin supervisión previa: nadie le dijo qué era un gato.
Qué demuestra
Que la IA puede aprender patrones a partir de datos no estructurados.
Tareas que «normalmente requieren inteligencia humana»
Reconocer patrones visuales.
Interpretar el lenguaje natural.
Tomar decisiones basadas en datos.
Error típicoConfundir reconocer con comprender. Un sistema puede clasificar una grieta en un puente sin «saber» por qué apareció: detectar, reconocer el patrón y comprender la causa son tres niveles distintos.
## 9.3 · Patrones en acción: de lo manual a lo automático
Tres procesos que se automatizaron con reconocimiento de patrones
Proceso | Antes (manual) | Hoy (automatizado)
Inspección de calidad en manufactura | Operarios revisaban a ojo cada pieza de la línea buscando defectos. | La visión artificial compara patrones de imagen en milisegundos y detecta anomalías microscópicas.
Diagnóstico por imágenes médicas | Radiólogos examinaban cada placa, tomografía o resonancia. | Los modelos asisten marcando signos tempranos de enfermedad; el diagnóstico sigue siendo profesional.
Detección de fraude bancario | Analistas revisaban reportes de movimientos buscando conductas sospechosas. | Algoritmos detectan consumos anómalos en tiempo real sobre millones de transacciones.
## 9.4 · Razonamiento simbólico básico
Definición
Es el enfoque que representa el conocimiento mediante símbolos y reglas lógicas explícitas
del tipo «si–entonces», y que permite deducir información nueva a partir de hechos conocidos.
HechosLo que se sabe del caso: «el paciente tiene fiebre y tos».
ReglasConocimiento experto escrito como SI–ENTONCES.
Motor de inferenciaAplica las reglas que se cumplen.
Conclusión«Puede tener una infección respiratoria».
TrazaQué regla produjo el resultado: es auditable.
Origen histórico
Ya en la Conferencia de Dartmouth (1956), el nacimiento oficial de la IA (clase 1), se discutió la representación del conocimiento y los algoritmos de razonamiento como base para simular el pensamiento.
Ejemplo: sistema experto de diagnóstico
Regla 1
SI el paciente tiene fiebre y tos, ENTONCES puede tener una infección respiratoria.
Regla 2
SI el paciente tiene dolor en el pecho, ENTONCES puede tener un problema cardíaco.
OjoLas reglas dicen «puede tener»: el sistema propone, el profesional decide. Es el mismo criterio de supervisión de toda la materia.
Ventajas y límites
Ventajas
Fáciles de entender e implementar; cada conclusión se explica con la regla que la produjo.
Límites
Requieren que el conocimiento sea explícito; se vuelven difíciles de mantener cuando crecen las reglas y no manejan bien la incertidumbre.
Error típicoConfundir una regla explícita con un patrón aprendido. La regla es un criterio programado por alguien; el patrón es una regularidad que el sistema estimó a partir de ejemplos.
## 9.5 · Razonamiento simbólico en acción
Tres procesos que se automatizaron con reglas
Proceso | Antes (manual) | Hoy (automatizado)
Elegibilidad crediticia | Un analista revisaba una lista de requisitos: ingresos mínimos, historial y garantías. | Un motor de reglas aplica la lógica si–entonces para aprobar o rechazar cada solicitud.
Triage y verificación de síntomas | El personal administrativo seguía protocolos escritos, paso a paso, para derivar a cada paciente. | Sistemas expertos replican ese árbol de decisión clínico de forma instantánea y consistente.
Cumplimiento normativo | Un auditor contrastaba cada documento o contrato contra una checklist de normas. | Un motor de reglas valida cada cláusula contra la normativa aplicable.
Cuando la regla cambia
Si las reglas codifican normativa, hay que versionarlas: saber qué versión de la regla produjo cada resultado y desde cuándo rige. Sin eso, el sistema deja de ser auditable justo en lo que mejor sabía hacer.
## 9.6 · Aprendizaje por experiencia
Definición
Es la capacidad de un sistema de IA de mejorar su rendimiento en una tarea a partir de
la exposición repetida a datos o situaciones, sin que una persona reprograme sus reglas.
Cómo ocurre técnicamente
En las redes neuronales, aprender es ajustar iterativamente los pesos internos a partir de grandes volúmenes de datos: así el sistema aprende patrones, hace predicciones y mejora con el tiempo.
Un cambio de paradigma
Es el fundamento del aprendizaje automático y profundo, que fueron reemplazando a los primeros sistemas basados sólo en reglas y lógica fija.
El combustible
Según la bibliografía, el big data aportó el «combustible» para entrenar modelos que aprenden patrones, predicen y mejoran «a través de la experiencia».
Memoria no es aprendizaje
Guardar registros no alcanza: aprender exige que el desempeño cambie gracias a los casos.
Error típicoDecir que un sistema «aprende» porque almacena el historial de incidencias. La memoria conserva y recupera; el aprendizaje modifica el modelo a partir de resultados confirmados. Es la misma distinción entre memoria y aprendizaje de la clase 7.
## 9.7 · Aprendizaje por experiencia en acción
Tres procesos que mejoran con la experiencia
Proceso | Antes (manual) | Hoy (automatizado)
Recomendación de productos | Un vendedor sugería productos según su intuición y lo que conocía del cliente. | Los recomendadores aprenden de millones de historiales de compra y mejoran con cada interacción.
Mantenimiento de maquinaria | Inspecciones periódicas fijas, siguiendo un calendario. | El mantenimiento predictivo aprende de datos históricos de sensores y anticipa fallas.
Filtrado de correo no deseado | Se bloqueaban remitentes o palabras clave a mano, regla por regla. | Los filtros aprenden de los correos que los usuarios marcan como spam y ganan precisión.
El caso del spam muestra el pasaje entre pilares: empezó como razonamiento simbólico (reglas escritas a mano) y terminó como aprendizaje por experiencia (el filtro ajusta lo que considera spam con cada marca).
## 9.8 · Los tres enfoques, lado a lado
Síntesis de la primera parte
Dimensión | Reconocimiento de patrones | Razonamiento simbólico | Aprendizaje por experiencia
Base conceptual | Conexionista: redes neuronales inspiradas en el cerebro. | Simbólica: símbolos y reglas lógicas explícitas. | Ajuste iterativo a partir de datos y repetición.
Tipo de conocimiento | Implícito, aprendido de ejemplos. | Explícito, escrito en reglas si–entonces. | Progresivo, construido con la experiencia acumulada.
Ejemplo típico | Identificar gatos en imágenes (Google Brain, 2012). | «Si fiebre y tos → posible infección respiratoria». | Redes que ajustan sus pesos con más datos.
Proceso automatizado | Inspección visual y diagnóstico por imágenes. | Evaluación crediticia y cumplimiento normativo. | Recomendaciones y mantenimiento predictivo.
Qué se puede auditar | El desempeño medido (precisión, falsos positivos). | La regla exacta que se aplicó. | Con qué datos y en qué versión se entrenó.
Por qué casi nunca van solos
En la práctica se combinan: un sistema de fraude reconoce un patrón anómalo, aplica reglas antes de alertar (por ejemplo, umbrales legales) y aprende de los casos que los analistas confirman. La última fila de la tabla es la que más pesa en un examen: cada pilar se controla de una forma distinta.
Segunda parte de la clase
## 9.9 · Qué significa reconocer patrones en tiempo real
Es detectar regularidades, secuencias, anomalías o relaciones mientras los eventos todavía están «en movimiento», no al día siguiente en un reporte.
Basado en el marco conceptual del PPT 11.1. La línea punteada (la retroalimentación) es un agregado del apunte para conectar con el aprendizaje por experiencia de 9.6.
No existe «la» herramienta de reconocimiento
La solución casi siempre combina piezas: algo que transporta los eventos, un motor que los procesa en movimiento, reglas o modelos que reconocen el patrón y un destino que actúa. Preguntar «qué herramienta reconoce patrones» es preguntar mal: hay que diseñar la cadena.
## 9.10 · Mapa comparativo de las cuatro nubes
Principales stacks por plataforma (PPT 11.1)
Nube | Ingesta | Procesamiento | Patrones / ML | Año de ref. | Modelo de costo
AWS | Kinesis Data Streams | Managed Service for Apache Flink | SageMaker / OpenSearch | 2013 | KPU + stream + almacenamiento
Google Cloud (GCP) | Pub/Sub | Dataflow / Apache Beam | Vertex AI / BigQuery | 2014 | CPU, memoria, Streaming Engine + bytes
Microsoft Azure | Event Hubs | Stream Analytics | Azure ML / Fabric / Power BI | 2014 | Unidades de throughput + unidades de streaming
Oracle (OCI) | OCI Streaming | Oracle Stream Analytics | OCI Data Science / GoldenGate | 2016–2018* | Throughput + almacenamiento, o licencia
* La fecha de Oracle Stream Analytics depende de la edición: existía en la familia 12.2.1.3 y tiene documentación cloud en 18.1. La infografía de la cátedra le pone 2019.
## 9.11 · Las cuatro nubes en detalle
AWS · Kinesis + Apache Flink
Los productores publican eventos en Kinesis; Flink aplica ventanas, joins, estado, reglas y algoritmos de anomalías; los resultados van a S3, OpenSearch, Lambda o alertas.
Proyecto de ejemplo
Fraude de pagos: cada transacción entra por Kinesis; Flink calcula velocidad, geografía y desvío histórico; una regla dispara bloqueo o revisión.
Costo
Flink cobra por KPU-segundo (1 KPU = 1 vCPU + 4 GB de RAM, más 1 KPU de orquestación); Kinesis, por GB o por capacidad.
Idea clave
Muy flexible para procesamiento con estado y anomalías, pero hay que controlar los KPU y los servicios asociados. El SQL de Kinesis Analytics se discontinuó: hoy se usa Flink.
GCP · Pub/Sub + Dataflow + Vertex AI
Pub/Sub desacopla productores y consumidores; Dataflow ejecuta pipelines de Apache Beam con ventanas, triggers y estado; Vertex AI puede puntuar los eventos.
Proyecto de ejemplo
Mantenimiento predictivo: sensores publican vibración y temperatura; Dataflow arma ventanas y variables; el modelo estima anomalías y escribe alertas en BigQuery.
Costo
Pub/Sub: los primeros 10 GiB por mes sin costo y después por TiB de throughput. Dataflow, por vCPU, memoria y Streaming Engine por segundo; aparte BigQuery, almacenamiento y logs.
Idea clave
Un mismo modelo para batch y streaming (Apache Beam), con autoescalado y portabilidad.
Azure · Event Hubs + Stream Analytics + Azure ML
Event Hubs ingiere la telemetría; Stream Analytics usa SQL con ventanas y lógica temporal; puede invocar ML y enviar a Power BI, Fabric, Functions, SQL o Data Lake.
Proyecto de ejemplo
Monitoreo de flota: los vehículos envían GPS y datos del motor; consultas geoespaciales detectan desvíos, exceso de temperatura o permanencia fuera de una geocerca.
Costo
Event Hubs, por unidad de throughput por hora y por millón de eventos; Stream Analytics, por unidad de streaming por hora.
Idea clave
Barrera de entrada baja para equipos que ya saben SQL, con integración IoT, funciones de ventana, geoespacial y alertas.
Ojo con la láminaEn el PPT, la «idea clave» de Azure repite textual la de Oracle. La de arriba sale de los «aspectos importantes» de la propia lámina de Azure.
Oracle · OCI Streaming + Stream Analytics + GoldenGate
OCI Streaming recibe eventos con una API compatible con Kafka; Oracle Stream Analytics arma pipelines visuales para filtrar, correlacionar, enriquecer y aplicar patrones temporales, espaciales o ML.
Proyecto de ejemplo
Comercio minorista: eventos de cajas, inventario y ubicación se correlacionan para detectar abandono, ajustar precios u ofrecer descuentos en el momento.
Costo
OCI Streaming cobra por throughput y almacenamiento, sin costo inicial; Stream Analytics puede requerir tarifa de servicio o licencia.
Idea clave
Fuerte en correlación visual, patrones espaciales y temporales, y en empresas que ya usan Oracle Database y GoldenGate.
## 9.12 · Herramientas de la nube para cada pilar
Las tres infografías de la cátedra repiten el análisis para cada pilar de la primera parte. Los años son los que traen las láminas.
Qué servicio usa cada nube para cada pilar
Pilar | AWS | GCP | Azure | Oracle (OCI)
Patrones en tiempo real | Kinesis Data Streams (2013), Managed Service for Apache Flink (2018), SageMaker para inferencia (2017) | Pub/Sub (2011), Dataflow (2014), Vertex AI (2021) | Event Hubs (2014), Stream Analytics (2014), Azure Machine Learning (2010, renovado en 2021) | OCI Streaming (2018), Oracle Stream Analytics (2019), GoldenGate (2015)
Razonamiento simbólico y datos | Lo anterior + Amazon Bedrock (2023): modelos fundacionales para clasificar, extraer conocimiento o razonar | Lo anterior + BigQuery (2010): SQL sobre grandes volúmenes, con ML y reglas | Lo anterior + Azure AI Services (2016): modelos de lenguaje y razonamiento preentrenados | Lo anterior + Autonomous Database (2018): SQL, ML y reglas de negocio
Aprendizaje por experiencia | SageMaker, Kinesis + SageMaker, Lookout for Metrics (2020), Personalize (2018) | Vertex AI, Dataflow, BigQuery ML (2016), Recommendations AI (2017) | Azure ML, Stream Analytics, Databricks (2018), Cognitive Services (2016) | Oracle Machine Learning (2015), OCI Streaming, Analytics Cloud (2016), Autonomous Database
Lo que comparten las tres láminas
AWS: el catálogo más amplio, madurez y comunidad. GCP: líder en analítica de datos e IA. Azure: integración empresarial, entornos híbridos y ecosistema Microsoft. Oracle: cargas críticas, bases de datos y alto rendimiento.
Cómo leer los precios
Son valores de referencia aproximados (región de EE. UU., 2024–2025) que cambian según región, volumen y servicios. Sirven para entender qué se cobra (por GB, por hora de cómputo, por evento), no para presupuestar.
## 9.13 · Patrón de implementación en cinco pasos
Sea cual sea la nube, el proyecto se arma igual:
Definir el eventoEsquema, clave, marca de tiempo, calidad y retención.
IngestarPublicar en Kinesis, Pub/Sub, Event Hubs u OCI Streaming.
Extraer señalesVentanas, agregados, secuencias, geocercas y variables (features).
Evaluar el patrónReglas, procesamiento de eventos complejos (CEP), anomalías estadísticas o inferencia ML.
ResponderAlerta, bloqueo, ticket, dashboard o actualización de una base.
El paso 4 es donde se cruzan los pilares de la primera parte: las reglas son razonamiento simbólico; las anomalías y la inferencia ML, reconocimiento de patrones aprendidos.
## 9.14 · Dónde aparece el valor en segundos, no en horas
Ejemplos prácticos por sector
Caso | Qué señales se miran | Sector
Fraude transaccional | Secuencias, velocidad, dispositivo, ubicación y desvío histórico. | Banco / fintech
Mantenimiento predictivo | Deriva de temperatura, vibración y consumo frente a una línea de base. | Manufactura / energía
Ciberseguridad | Patrones de login, IP, privilegios y volumen de eventos. | SOC / SIEM
Experiencia digital | Clics, abandono, intención y recomendaciones inmediatas. | Retail / medios
Operación de red | Telemetría, jitter, errores, saturación y anomalías por sitio. | Telecomunicaciones
Geocercas y movilidad | Trayectoria, permanencia, desvíos y eventos espaciales. | Logística / ciudades
## 9.15 · Costos: cómo estimar sin comparaciones engañosas
Cada proveedor factura unidades distintas (KPU, vCPU, unidades de throughput, GB): comparar precios unitarios no dice nada. Hay que comparar el mismo caso de carga.
Las cuatro variables
Volumen
Eventos por segundo, tamaño medio, GB o TB por mes, picos.
Cómputo
Ventanas, estado, joins, complejidad del ML, paralelismo.
Persistencia
Retención del stream, checkpoints, backups, data lake.
Egreso
Cruce de región, salida a internet y servicios de destino.
Recomendación para una comparación justa
Modelar el mismo escenario durante 730 h/mes (un mes entero encendido), sumar ingesta + motor + almacenamiento + observabilidad, y agregar un 20–30 % de margen por picos y reprocesamientos.
Error típicoElegir la nube por el precio unitario más bajo. Lo que importa es el costo total (TCO) del caso completo, y el egreso suele ser el costo que nadie miró.
## 9.16 · ¿Cuál elegir según el contexto?
Matriz de selección del PPT 11.1
Criterio | AWS | GCP | Azure | Oracle
Procesamiento con estado | Muy fuerte (Flink) | Fuerte con Beam | Posible, menos nativo | Fuerte con Spark/OSA
Desarrollo SQL low-code | Medio | Medio | Muy fuerte | Muy fuerte, visual
IoT y telemetría | Muy fuerte | Fuerte | Muy fuerte | Fuerte
Patrones espaciales | Con servicios asociados | Con Beam/BigQuery | Nativo en Stream Analytics | Muy fuerte en OSA
Portabilidad open source | Flink | Apache Beam | Kafka/SQL | Kafka/Spark
Mejor encaje | Ecosistema AWS | Datos y ML en GCP | Empresa Microsoft / IoT | Oracle DB / GoldenGate
menos movimiento de datos + competencias del equipo
+ latencia, gobierno y costo total que se cumplen
la herramienta «más poderosa» es la que mejor encaja, no la de más funciones
## 9.17 · Cierre: de evento a decisión
Arquitectura
Separar ingesta, procesamiento, reconocimiento y acción.
Elección
Priorizar integración, habilidades del equipo, latencia, estado y costo total, no sólo el precio unitario.
Gobierno
Definir esquema, observabilidad, posibilidad de reprocesar (replay), privacidad, sesgo y respuesta humana.
Siguiente paso que recomienda la cátedra
Construir una prueba de concepto (PoC) con una carga real y medir latencia, precisión, costo por millón de eventos y cómo se comporta el sistema durante una falla. Y la idea que cierra la primera parte: reconocer patrones, razonar con símbolos y aprender de la experiencia no son capacidades aisladas, sino etapas de una misma evolución de la IA.
Notas sobre las fuentes de esta clase
Armada con los dos PPT de la cátedra (11.0, fundamentos; 11.1, nubes públicas) y sus tres infografías. Todavía no incluye la grabación: lo que se haya dicho en clase se suma cuando esté.
Los precios y años de las nubes son los de las láminas (referencias públicas 2024–2026, no cotizaciones) y pueden quedar desactualizados.
Hay diferencias entre láminas: Oracle Stream Analytics figura como 2016–2018 en el PPT y como 2019 en la infografía; y la «idea clave» de Azure está duplicada de la de Oracle (ver 9.11).
La retroalimentación del diagrama de 9.9 y la fila «qué se puede auditar» de 9.8 son agregados del apunte.'),
  (11, 'De la IA estrecha a la superinteligencia', 'Clase 11 · 2.º parcial · 30 de octubre
# De la IA estrecha a la superinteligencia
La clase ordena tres palabras que en los medios se usan como si fueran sinónimos:
IA estrecha (lo que existe hoy), IA general (un desafío teórico) y
superinteligencia (una hipótesis). El hilo es separar capacidades reales, hipótesis y
decisiones de diseño, y bajarlo a casos de automatización en organizaciones. La segunda mitad abre el
debate: qué recursos faltan para avanzar, riesgos, qué dicen los líderes de la industria, el entorno
incierto en el que se decide y por qué las organizaciones van a seguir necesitando personas.
IA estrecha (presente) · IA general (desafío)
· superinteligencia (hipótesis)
la clasificación mide amplitud y autonomía, no una escalera de productos
Objetivos de la clase, según la cátedra
Diferenciar: qué hace una IA estrecha, por qué una AGI exigiría transferencia, abstracción y adaptación, y qué separa a la superinteligencia de la automatización y de la ciencia ficción.
Aplicar: traducir procesos manuales en flujos automatizables, identificando datos, reglas, modelos y supervisión humana, con métricas de calidad y riesgos.
Evaluar: beneficios, límites y fallos; controles de seguridad y gobernanza; debatir escenarios sin confundir hipótesis con hechos.
Pregunta guía: ¿cómo aumenta la autonomía de un sistema sin perder control, trazabilidad y responsabilidad?
## 11.1 · Un mapa de tres niveles
Basado en la infografía «Los tres tipos de IA» de la cátedra. Las fechas de IA general y superinteligencia son estimaciones de expertos, no pronósticos: el borde punteado marca lo que todavía no existe.
IA estrecha (Narrow AI, IA débil)
Optimiza tareas delimitadas, con objetivos, datos y condiciones de uso definidos. Surgió masivamente en la década de 2010.
Origen del término
John Searle habló de «IA débil» en 1980, frente a la «IA fuerte», la del cuarto chino. Sus raíces van hasta Dartmouth (1956), cuando los primeros programas ya resolvían tareas específicas.
Lema de la lámina
«No hace de todo, pero hace muy bien lo que fue diseñada para hacer».
IA general (AGI)
Aprendería, comprendería y transferiría conocimiento entre dominios con una flexibilidad comparable a la humana, sin reentrenamiento específico.
Según la lámina
Término popularizado en 1997. No existe; algunos expertos la estiman entre 2030 y 2060.
Superinteligencia
Superaría ampliamente las capacidades humanas en casi todos los ámbitos: ciencia, creatividad, estrategia, habilidades sociales.
Según la lámina
Planteada en 1965 por I. J. Good. Es una hipótesis, no un producto existente.
Idea clave de la cátedraUna herramienta puede parecer «inteligente» y seguir siendo estrecha si no generaliza fuera de su tarea.
Cómo la leyó el profesor en clase
No es una escalera en la que se «completa» un nivel y se pasa al siguiente: algunas cosas de la IA general
ya asoman (estimó, a ojo, un 10–15 %), pero falta la mayor parte. También aclaró que esta clasificación cuenta
como IA recién desde que existe infraestructura computacional para aplicarla: por eso ubica a la IA estrecha
en la década de 2010, aunque las ideas vengan de Turing. Y sobre la superinteligencia fue más escéptico que la
lámina: con «2.ª mitad del siglo XXI» la ve, en todo caso, para el siglo que viene.
Una contradicción para tener presente
La definición de IA general dice que «razona y aplica conocimientos». En clases anteriores se discutió si los sistemas actuales razonan de verdad (el cuarto chino de la clase 4): la IA general sería justamente la que lo haría sin discusión.
## 11.2 · Narrow AI: inteligencia especializada
Es la forma dominante de IA aplicada: alto rendimiento dentro de un perímetro concreto.
EntradaTexto, imagen, audio o datos.
Modelo o reglasEntrenado o programado para esa tarea.
SalidaTraducción, clasificación, predicción o respuesta.
Fortaleza
Puede superar el trabajo manual en velocidad, uniformidad y escala cuando la tarea está bien definida.
Ejemplo
Un detector de defectos visuales inspecciona miles de piezas, pero no decide la política de calidad.
Límite
No «entiende todo»: falla ante datos fuera de distribución, instrucciones ambiguas o contextos que no se contemplaron.
Dato clave de la lámina
Opera con datos, patrones y reglas; su desempeño depende de la calidad de los datos y del diseño de la tarea.
Campos de aplicación
Lenguaje natural (traducción, chatbots), visión por computadora, análisis y predicción (fraude, pronósticos), automatización de procesos (RPA), recomendaciones, reconocimiento de voz, sistemas autónomos en entornos controlados y ciberseguridad.
Narrow AI en organizaciones (infografía de la cátedra)
Ámbito | Uso | Ejemplo
Gobierno digital | Chatbots que responden sobre trámites, impuestos o servicios. | Asistentes virtuales en portales del Estado.
Salud pública | Análisis de imágenes médicas para apoyar el diagnóstico. | Detección temprana de tuberculosis en hospitales públicos.
Seguridad ciudadana | Visión por computadora sobre vehículos o personas. | Cámaras inteligentes en ciudades.
Retail | Recomendaciones según el historial de compra. | «También te puede interesar…» en tiendas en línea.
Banca | Detección de transacciones fraudulentas en tiempo real. | Bloqueo de operaciones sospechosas con tarjeta.
Manufactura | Visión para detectar defectos en la línea. | Inspección automática de piezas automotrices.
## 11.3 · Tres aplicaciones actuales
Cada una resuelve una familia concreta de problemas, con datos y métricas diferentes.
Aplicación | Concepto | Ejemplo | Cómo se mide
Traducción automática | Transforma texto o voz entre idiomas con modelos que estiman secuencias probables. | Un centro de atención regional traduce tickets para que el agente responda sin copiar cada mensaje. | Calidad semántica, terminología y revisión humana.
Visión por computadora | Extrae objetos, patrones o anomalías de imágenes y video. | Una fábrica detecta piezas dañadas en la cinta y deriva los casos dudosos a inspección. | Precisión, exhaustividad (recall) y falsos positivos.
Asistentes de voz | Combinan reconocimiento de voz, comprensión de intención, diálogo y síntesis. | Una mesa de ayuda capta la solicitud, consulta una base y crea un ticket. | Intención correcta, resolución y escalamiento.
Trampa de examen
Un traductor que maneja cien idiomas sigue siendo Narrow AI: hace una sola tarea (traducir) en muchos idiomas. Lo mismo un asistente de voz con muchas intenciones: su dominio está acotado por el catálogo que se le diseñó.
Lo que el profesor remarcó de los tres ejemplos: los tres funcionan en tiempo real. Antes, para subtitular una película alguien transcribía y agregaba el texto a mano; hoy se puede escuchar a alguien en inglés y oírlo en español al instante. El asistente de voz responde mientras hablás, y el reconocimiento de imágenes valida tu identidad en el home banking con una selfie.
Siempre hay una métrica
Cada aplicación se acompaña de una métrica porque es la forma de decir «esto funciona mejor que antes»: un valor que pasa de 3 a 5, o un consumo que baja de 10 a 8 y después a 6.
Para el examen
En las partes de diseño y control, nombrar la métrica concreta (precisión, falsos positivos, intención correcta) vale más que decir «se mide el desempeño».
La otra cara del reconocimiento facial
Si validar identidad con una foto es tan fácil, también lo es abusar de ella: el profesor desaconsejó dejar fotografiar el DNI o mostrar la tarjeta, porque una cámara puede captar el número. Recomendó pagar sin contacto (NFC).
## 11.4 · Caso práctico 1: logística documental
De planillas y clasificación a mano a un flujo con OCR, reglas e IA supervisada.
EntradaFacturas, remitos, correos y fotos. Problema manual: reescribir, demoras, errores.
OCRExtrae los campos.
ClasificadorIdentifica el tipo de documento.
ReglasValidan montos y proveedor.
SalidaRegistro automático; las excepciones van a una persona; cada decisión queda trazada.
Principio docente
Automatizar el camino frecuente y diseñar explícitamente el tratamiento de las excepciones. Fijate que el caso mezcla los tres pilares de la clase 9: el OCR y el clasificador reconocen patrones; la validación es razonamiento simbólico.
El ejemplo de la clase: pedir un reintegro a una prepaga. Antes había que cargar a mano número de factura, CUIT y fecha; hoy alcanza con una foto o un PDF —aunque la foto esté torcida— y el sistema extrae los datos, los valida contra el emisor y procesa el reintegro. Lo que antes era caro hoy es barato.
## 11.5 · General AI: la idea de una inteligencia transferible
Una AGI no sería sólo «más grande»: tendría que usar lo aprendido en situaciones nuevas.
Abstracción
Representar principios generales y separar lo esencial de los detalles de un caso.
Transferencia
Aplicar habilidades aprendidas en un dominio a otro sin reentrenamiento exhaustivo.
Ejemplo de la cátedra
Aprender planificación en logística y reutilizar esos principios para organizar recursos en un hospital.
Creatividad y adaptación
Proponer soluciones nuevas, probarlas, corregirse y actuar ante objetivos abiertos.
Error típicoPensar que generar algo novedoso en un dominio prueba inteligencia general. Un sistema puede diseñar puentes originales y no saber hacer nada más: es creatividad especializada.
## 11.6 · ¿Por qué la AGI sigue siendo un desafío?
El rendimiento lingüístico no demuestra por sí solo comprensión robusta ni autonomía general. Es la discusión de Searle (clase 4) en versión actual.
Conocimiento y sentido común
Integrar hechos, causalidad, contexto físico y normas sociales. Evitar respuestas plausibles pero falsas.
Aprendizaje continuo
Incorporar experiencia nueva sin olvidar lo anterior, y distinguir cambios reales del ruido.
Metacognición y control
Reconocer la propia incertidumbre, explicar límites, planificar, verificar resultados y pedir ayuda.
Desafío transversal: cómo se evalúa
Probar capacidades generales exige muchas tareas, contextos y pruebas adversariales, no una única demostración vistosa. Integrar varias Narrow AI en un mismo producto tampoco alcanza: la orquestación no es transferencia.
## 11.7 · Qué falta para avanzar: recursos
El diagnóstico del profesor fue directo: lo que falta, sobre todo, son recursos —energía y capacidad de cómputo—, y la demanda crece a medida que la IA crece. Pero el desafío no es producir más, sino optimizar el uso: chips más rápidos, sí, pero también aprovechar mejor los que ya existen y gastar menos energía.
Superconductores
En un circuito, parte de la energía se pierde por la resistencia de los materiales (y se transforma en calor). Un superconductor tiene una resistencia casi nula: casi no perdería energía ni calentaría.
El problema
Dependen de materiales escasos (el profesor habló de «tierras raras») y de condiciones que todavía son difíciles de lograr. Sigue en desarrollo.
En clase
Se mencionó que Huawei anunció un chip de resistencia casi cero, medida por el poco calor que genera. Es un dato del relato del profesor, «hay que verlo», no verificado para el apunte.
Centros de datos: el calor
La IA más potente vive en grandes centros de datos, que generan mucho calor y gastan muchísima energía en enfriarse. La solución habitual: pasillos fríos y calientes alternados, para que los equipos tomen aire frío de un lado y lo expulsen caliente del otro, donde se extrae y se vuelve a enfriar.
Ubicarlos donde hace frío
Instalarlos en regiones naturalmente frías (se habló del Polo Norte y de la Patagonia) o bajo el mar reduce la energía de refrigeración…
Pero…aparecen otros problemas: de dónde sale la energía en ese lugar y cómo llega la conectividad (fibra óptica). Cada solución de infraestructura trae su propio desafío.
También se mencionaron fuentes nuevas de energía, como la de las olas (un flotador que mueve un pistón todo el día). Conecta con la actividad en clase: «qué hace falta para llegar a la superinteligencia a nivel de infraestructura, recursos y energía».
## 11.8 · Caso práctico 2: automatización hospitalaria
La meta realista no es una AGI clínica, sino coordinar varias IA estrechas con control profesional.
Antes | Llamadas, formularios, agendas aisladas y datos duplicados.
Automatización propuesta | Clasificar solicitudes, extraer datos, priorizar según reglas, proponer turnos y enviar recordatorios.
Control necesario | El profesional valida las decisiones clínicas; auditoría de accesos, de calidad de datos y de sesgos.
Resultado esperado | Menos carga administrativa y mejor continuidad, sin delegar la responsabilidad clínica al modelo.
## 11.9 · Superinteligencia: hipótesis, no producto
El concepto explora sistemas que superarían ampliamente a las personas en casi todas las tareas cognitivas relevantes.
Hipótesis de escalamiento
Más cómputo, mejores algoritmos, herramientas y capacidad de mejorarse a sí mismo podrían ampliar la competencia.
Diferencia con la AGI
La AGI alude a una generalidad comparable a la humana; la superinteligencia, a una ventaja muy superior y sostenida.
Disciplina intelectual
Debatir escenarios futuros exige declarar supuestos, probabilidades e incertidumbres.
No confundir
Automatizar muchas tareas con varias IA estrechas no equivale a construir una superinteligencia. Y ni la AGI ni la superinteligencia deben afirmarse sin evidencia.
## 11.10 · Riesgos y debates de una IA muy avanzada
El problema central no es sólo «qué tan capaz», sino quién define objetivos, límites y responsabilidad.
Alineación
Un objetivo mal especificado puede optimizar la métrica y dañar la finalidad. Se necesitan restricciones, verificación y supervisión.
Concentración
Capacidad, datos e infraestructura pueden concentrar poder. Debate: acceso, competencia y control democrático.
Seguridad
Uso malicioso, fallos sistémicos, dependencia y vulnerabilidades exigen pruebas, defensa por capas y respuesta a incidentes.
Gobernanza
Responsabilidad, auditoría, trazabilidad y límites de despliegue deben definirse antes de los usos críticos.
En clase estos riesgos se discutieron con tres debates concretos:
¿De quién es la ganancia de una IA?
Si un agente de IA vende algo, la ganancia hoy es de su dueño. El profesor lo comparó con el debate histórico sobre la riqueza que producía una persona esclavizada —no porque la IA sea una persona, sino por la pregunta de fondo—: en varios países se discute cómo regular empresas operadas casi por completo por IA y a dónde va lo que generan.
Pregunta abierta
¿De qué viven las personas cuyo trabajo se sustituye, y qué pasa con lo que consumían?
IA y seguridad nacional
Para el profesor, la IA es un tema de seguridad nacional: los gobiernos mantienen vínculos estrechos con sus empresas tecnológicas estratégicas y quieren acceso a sus desarrollos. Lo ilustró con su experiencia instalando routers de distintas marcas que no siempre interoperaban.
Conecta con
La concentración de poder: «lo que Estados Unidos no quiere que pase con China».
Privacidad: si es gratis…
Una red social gratuita cuesta millones desarrollarla y mantenerla: hay un interés en captar información de los usuarios, que puede usarse con fines comerciales, de seguridad o de inteligencia. Se mencionaron también los televisores con micrófono para control por voz.
## 11.11 · Qué dicen los líderes de la industria
Dos infografías de la cátedra reúnen declaraciones públicas de directivos de empresas de IA. Sirven para ver el debate, no como evidencia: son opiniones de actores interesados, y las citas y sus fuentes son las que trae la lámina.
Riesgos que señala cada uno, según la lámina «Voces que marcan el futuro»
Quién | Riesgos que destaca
Sam Altman (OpenAI) | Pérdida de control sobre sistemas más inteligentes que los humanos, uso malicioso, concentración de poder e impacto en el empleo. Pide una gobernanza global.
Dario Amodei (Anthropic) | Desplazamiento masivo de empleos, concentración de poder económico y político, riesgo existencial y necesidad de evaluaciones de seguridad más estrictas.
Satya Nadella (Microsoft) | Desinformación, ciberataques más sofisticados, erosión de la confianza en las instituciones; aboga por una IA responsable y regulada.
Elon Musk (xAI) | Riesgo existencial, carrera descontrolada entre países y empresas, usos militares y pérdida de control.
Riesgos comunes que identifica la lámina
Riesgo existencial · impacto en el empleo y la desigualdad · uso malicioso y ciberseguridad · desinformación y manipulación social · concentración de poder y falta de regulación. El llamado común: la IA puede traer enormes beneficios si su desarrollo es seguro, ético y con marcos de gobernanza claros.
Once CEOs sobre el empleo
La segunda lámina junta posturas de directivos de OpenAI, Google, Anthropic, NVIDIA, xAI, IBM, Amazon, Klarna, Meta, JPMorgan y Salesforce. Van de «la IA no te quitará el trabajo; la persona que use IA, sí» a la desaparición de puestos administrativos de nivel inicial. El denominador común: se transforman tareas y hay que prepararse antes de que la disrupción se generalice.
Cómo se verificaron las citas
El profesor contó que armó la lámina pidiéndole a una IA que verificara cada declaración que había leído: por eso algunas figuran como «parcialmente ciertas» (pueden haber cambiado al traducirse). Es un buen hábito: lo que circula en internet no siempre es confiable.
«La persona que use IA te quitará el trabajo»
Para el profesor, la frase de NVIDIA es «muy cierta»: muchas empresas ya pagan licencias de asistentes de IA para sus empleados y a los tres meses preguntan cómo los están usando; en las entrevistas se pregunta cómo optimizás tu trabajo con IA.
¿Se cae la inversión?
Ante la idea de que los líderes advierten riesgos para recuperar confianza, el profesor respondió que la inversión no se frenó: hay anuncios que suben y bajan las acciones, pero año contra año la tendencia crece. Es el ciclo de expectativas de la clase 6.
Ejemplos del profesor de cómo la IA «nos va arropando»: un supermercado que conoce tu patrón de compra y te arma un paquete con descuentos que te envía con un sí; o una consulta médica simple resuelta con IA, donde el médico pasa a revisar lo que el sistema propone.
## 11.12 · VUCA: el entorno en el que se decide
Las organizaciones de IT operan en un contexto VUCA. Nombrarlo ayuda a decidir mejor y a ser más resilientes.
V · Volatilidad
Velocidad y magnitud de los cambios: lo que hoy es tendencia mañana puede ser obsoleto.
En IA
Nuevos modelos que cambian el mercado de golpe; precios de infraestructura que suben por la demanda.
Respuesta
Agilidad.
U · Incertidumbre
Falta de predictibilidad, aunque haya datos.
En IA
Regulaciones futuras, impacto real en el empleo, qué tecnologías dominarán en 2–3 años.
Respuesta
Escenarios, monitoreo continuo y planificación flexible.
C · Complejidad
Muchos factores interconectados; causas y efectos no lineales.
En IA
Integrar datos, infraestructura, seguridad, talento y normativa; áreas con objetivos distintos.
Respuesta
Visión sistémica y gestión de dependencias.
A · Ambigüedad
La misma información admite varias interpretaciones.
En IA
Resultados de cajas negras difíciles de interpretar; desacuerdos sobre qué uso es ético.
Respuesta
Pensamiento crítico, criterio ético y aprender de la experiencia.
VUCA conecta con la clase 10: decidir bajo incertidumbre y gestionar riesgos de proyecto son la respuesta práctica a este entorno.
La conclusión del profesor
Los entornos de tecnología son VUCA por naturaleza. No se enfrentan aprendiendo algo y creyendo que ya está dominado, sino con la certeza de que va a cambiar: prepararse lo mejor posible y no dejar de actualizarse nunca. En sus palabras, si pasás uno o dos meses sin actualizarte, ya quedaste atrás.
## 11.13 · Habilidades más demandadas
Según la infografía de la cátedra, el valor está en las personas que combinan habilidades técnicas con humanas: «la IA aprende datos; las personas dan sentido, confianza y dirección».
Técnicas (hard skills)
IA y aprendizaje automático.
Análisis y visualización de datos.
Computación en la nube.
Ciberseguridad.
Desarrollo de software y automatización.
Gestión de productos y proyectos digitales.
Gobierno de datos y ética de la IA.
Humanas (soft skills)
Pensamiento crítico: validar un modelo antes de usarlo en una política pública.
Creatividad e innovación.
Comunicación efectiva: explicar los límites de la IA a quien no es técnico.
Colaboración con negocio, legal, datos y TI.
Inteligencia emocional, adaptabilidad y liderazgo con propósito.
La pregunta que el profesor dejó a la clase: si la IA absorbe cada vez más tareas, ¿por qué las empresas seguirían contratando personas? Lo que salió del debate:
Responsabilidad
Alguien tiene que supervisar, auditar y responder por lo que hace el sistema; con la ley actual, la IA no responde. Un estudiante lo resumió: de diez personas pueden quedar dos, para supervisar y para tener a quién pedirle cuentas.
Emociones y conversación
La empatía, el humor y una conversación natural siguen siendo humanos. Si le preguntás a una IA qué te pareció el partido de ayer, te contesta con porcentajes de posesión. Mucha gente va a querer hablar con una persona que opine, aunque se equivoque.
Human in the loop
En un centro de contacto con chatbots y voz, se estima que al menos un 5 % de las interacciones necesita a una persona.
Diseñar y opinar
Alguien tiene que programar, definir procesos y opinar sobre ellos: hasta ahora la IA no decide sola que «hacen falta tres puestos más» o un proceso nuevo.
Por qué importan las blandasLas habilidades técnicas se aprenden cada vez más rápido con ayuda de la IA; las blandas no: no podés pedirle a una IA que te haga más empático. Por eso las entrevistas preguntan por trabajo en equipo, conflictos y proyectos difíciles.
## 11.14 · Ruta práctica: de lo manual a la automatización responsable
Una organización no necesita AGI para capturar valor: necesita procesos claros, datos confiables y control.
MapearTareas, tiempos, errores y excepciones.
EstandarizarEliminar variaciones innecesarias.
DigitalizarDatos estructurados y APIs.
AutomatizarReglas, RPA e IA estrecha.
SupervisarMétricas, auditoría y humano en el circuito.
Criterio de éxito
Una mejora medible sin degradar seguridad, equidad, privacidad ni experiencia humana. Es la misma ruta que aparece, con variantes, en las clases 7, 10 y 12: la tabla de 12.9 las compara.
## 11.15 · Síntesis y actividades
Presente
La IA estrecha ya automatiza percepción, lenguaje y predicción, pero depende de un ámbito definido y de datos adecuados.
Frontera
La AGI requeriría transferencia, abstracción, creatividad, aprendizaje continuo y conocer sus propios límites.
Futuro debatido
La superinteligencia es hipotética. Analizarla exige combinar capacidades, seguridad, gobernanza y distribución del poder.
Actividad final
Elegir un proceso manual de una universidad, empresa o institución pública y señalar: qué parte se automatizaría con IA estrecha, qué datos se usarían, qué excepción quedaría en manos de una persona y cómo se mediría el resultado.
Actividad en clase (30 minutos, en grupos)
La lámina dice grupos de 5; en la clase se armaron tres grupos de 8 con las mismas preguntas, para debatir después.
Tres riesgos concretos de la IA para la humanidad.
Políticas para mitigar esos tres riesgos.
Qué haría falta para llegar a la superinteligencia: infraestructura, recursos, energía.
Cómo funcionarían las organizaciones públicas y privadas con AGI y superinteligencia: cuántas personas y con qué funciones, costos, leyes.
Cómo imaginan a la humanidad en 2100 si se cumplen esas predicciones.
Los videos de esta clase están en IAnox: Introducción a la IA · SuperInteligencia ↗.
Notas sobre las fuentes de esta clase
Armada con el PPT de la cátedra (clase 13 en su numeración), sus infografías y la grabación del 30 de octubre (transcripción y resumen). En la grabación el profesor la llama «clase 14».
La transcripción tiene muchos pasajes confusos (nombres y cifras mal transcriptos). Se dejaron afuera las anécdotas que no se entienden con certeza y las afirmaciones de actualidad que no se pudieron verificar; lo que se cuenta del relato del profesor se marca como tal.
Las fechas de la AGI y de la superinteligencia, y el año 1997 para el término «IA general», son los de la infografía; los años de la IA general son estimaciones de expertos y varían mucho entre fuentes.
Las declaraciones de 11.10 se resumen como las presenta la lámina, que indica sus fuentes y marca algunas como «parcialmente ciertas»; no se volvieron a verificar para el apunte.'),
  (12, 'Escenarios de la IA: organizaciones, impacto y tendencias futuras', 'Clase 12 · 2.º parcial
# Escenarios de la IA: organizaciones, impacto y tendencias futuras
La clase mira la IA desde las organizaciones públicas y privadas. Primero, qué impacto tiene
—social, económico y ético— y cómo se gobierna. Después, la ruta práctica para pasar de un proceso
manual a uno asistido, con un caso público y otro privado. Y al final, el salto en el tiempo:
escenarios a 2, 3, 5, 10, 20 y 50 años, que no son profecías sino una herramienta para decidir hoy.
El profesor lo abrió con una advertencia: la evolución tecnológica no es lineal. Antes del
iPhone, nadie imaginaba el iPhone; se esperaba un «súper» teléfono de los que ya existían. Por eso hay que
trabajar con escenarios cambiantes y no con una sola predicción.
un problema claro + un proceso comprendido
+ datos gobernados
la IA se aplica donde aporta una ventaja real, no al revés
Objetivos de la clase, según la cátedra
Comprender: distinguir IA, automatización, analítica y toma de decisiones. La IA es un sistema sociotécnico: datos, modelos, procesos, personas y reglas.
Evaluar: beneficios y riesgos sociales, económicos y éticos. Quién gana, quién asume el error y qué mecanismos de apelación existen.
Diseñar: transformar un proceso manual con datos, controles, supervisión humana, indicadores y mejora continua. Empezar por el problema, no por la herramienta.
Pregunta guía: ¿qué decisión mejora, para quién y bajo qué controles?
## 12.1 · IA no significa «automatizar todo»
Hay cinco escalones, y cada uno pide más madurez que el anterior. Muchos problemas se resuelven en los primeros.
Basado en la lámina «IA no significa automatizar todo». La frase de abajo es un agregado del apunte que conecta con la matriz de 12.13.
## 12.2 · Tres dimensiones del impacto
Social
Acceso, inclusión, calidad del servicio, autonomía, confianza y brecha digital.
Económico
Productividad, costos, innovación, empleo, competencia y concentración de capacidades.
Ético
Justicia, privacidad, explicabilidad, seguridad, responsabilidad y sostenibilidad.
## 12.3 · Impacto social: servicios, inclusión y confianza
Beneficios posibles
Atención disponible más horas.
Priorización de casos urgentes.
Asistencia personalizada.
Accesibilidad con voz, traducción y lectura fácil.
Ejemplo: un asistente orienta un trámite y deriva las excepciones a una persona.
Riesgos a gestionar
Exclusión de quienes no tienen conectividad.
Datos poco representativos.
Vigilancia o reutilización indebida de datos.
Pérdida de confianza por decisiones opacas.
Ejemplo: mantener la atención presencial y un canal de apelación.
Trámites con la voz
El profesor contó que trabaja en un proyecto para un gobierno provincial donde cualquier trámite se hace hablando. Lo considera muy inclusivo: sirve a quien no tiene computadora ni internet propio, a quien no sabe o no puede escribir, y suma el chat para quien no puede hablar. «Hablar es lo más básico».
Priorizar urgencias
Ya pasa en las clínicas: el triaje usa una grilla para dar lugar en la fila según la gravedad, no según el orden de llegada.
El riesgo que más le preocupa: la resistencia al cambio
Para el profesor, la exclusión por falta de conectividad pesa menos (con un teléfono alcanza). Lo crítico es el rechazo cultural: muchas personas mayores quieren hacer el trámite como siempre, en una oficina. Eso obliga a mantener la atención humana y presencial durante la transición, además del problema de quienes pierden el trabajo.
## 12.4 · Impacto económico: productividad con distribución del valor
Palanca | Valor potencial | Contrapartida
Productividad | Menos tiempo por tarea. | Automatizar errores a escala.
Innovación | Nuevos productos y simulación. | Dependencia de proveedores.
Competencia | Capacidades avanzadas al alcance de las pymes. | Concentración de datos y talento.
Gasto público | Mejor focalización y detección. | Falsos positivos y litigios.
El valor no se mide sólo en ahorro: también en calidad, resiliencia y capacidad de aprendizaje.
¿Una nueva revolución industrial?
Así la presentó el profesor: si una ensambladora pasa de 3000 a 100 empleados, el costo de la mano de obra cae y los productos se abaratan. En una fábrica de chips casi no se ven personas: máquinas que trabajan las 24 horas, sin enfermarse ni cobrar horas extra. La productividad es la eficiencia en el uso de los recursos: la IA baja los costos y acelera la producción.
Las contrapartidas que se discutieron
Menos empleo, menos consumo: si la gente no tiene trabajo tiene menos plata, y el supermercado que vendía 100 pasa a vender 80.
Escasez de talento y rotación: perfiles que cambian de empresa cada pocos meses.
Fuga de talento: empresas de países desarrollados contratan desde afuera con sueldos más altos y dejan a las locales sin gente.
Dependencia de proveedores: AWS, Azure y Google Cloud están en otros países; un impuesto o una guerra comercial (como la de EE. UU. y China) encarece todo.
## 12.5 · Trabajo: se automatizan tareas y se rediseñan puestos
DescomponerSeparar tareas repetitivas, cognitivas, sociales y de responsabilidad.
AsignarDefinir qué hace la IA, qué hace una persona y cuándo escalar.
CapacitarFormar en datos, verificación, comunicación y uso seguro.
MedirCalidad, carga de trabajo, aprendizaje y movilidad interna.
Ejemplo de la cátedra
El analista deja de copiar datos y pasa a revisar excepciones, explicar decisiones y mejorar las reglas. No desaparece el puesto: cambian sus tareas.
El profesor lo bajó a las entrevistas de trabajo. Hace unos años preguntaban si sabías usar Word, Excel o un atajo de teclado; hoy preguntan qué es un prompt, qué es la IA generativa, en qué se diferencian los distintos modelos y, sobre todo, para qué no conviene usar IA. El viejo puesto de «procesador de datos», alguien que pasaba el día copiando con el teclado, ya no existe.
## 12.6 · Ética: cinco preguntas antes de desplegar
Principio | La pregunta
1 · Propósito | ¿El problema merece IA o alcanza con una regla?
2 · Justicia | ¿El error afecta de forma desigual a distintos grupos?
3 · Autonomía | ¿La persona sabe que está interactuando con una IA?
4 · Explicabilidad | ¿Podemos comunicar los factores relevantes de la decisión?
5 · Responsabilidad | ¿Quién corrige, compensa y aprende del error?
Son las mismas preguntas que se trabajan a fondo en la materia Ética en la IA (principios, explicabilidad y responsabilidad).
Para el profesor, la más delicada: la autonomía
Si una persona no sabe que habla con una IA, decide distinto. Lo peor ocurre en momentos de crisis —se mencionó un caso reciente, con un desenlace trágico, de alguien que conversaba con un chatbot creyendo que era una persona— y en temas de salud: un «médico virtual» que indica una pastilla puede estar alucinando. Las voces sintéticas de personas reales agravan la confusión. Avisar «estás hablando con una IA, puede equivocarse» no es un detalle.
## 12.7 · Gobernanza: controles durante todo el ciclo de vida
Caso de usoObjetivo, afectados, riesgo y alternativa.
DatosOrigen, permiso, calidad y conservación.
ModeloPruebas, límites, sesgos y seguridad.
DespliegueSupervisión, registros y respuesta.
OperaciónDeriva, auditoría, reclamos y retirada.
Regla de la cátedra
Ninguna métrica técnica sustituye la evaluación del impacto real sobre las personas y la organización. Y el ciclo termina con «retirada»: hay que poder apagar el sistema.
Gobernanza es control
Así la definió el profesor: un proceso controlado al 100 % en todas sus fases. Si hay un tramo del que decís «creo que lo estoy controlando», ahí está el problema.
El uso malicioso no se frena sólo con filtros
Los grandes modelos rechazan pedidos peligrosos, pero quien quiere hacer daño usa otras herramientas sin esos filtros. Por eso la gobernanza tiene que mirar también los usos maliciosos y lo que pueden hacer actores externos, no sólo el sistema propio.
¿Quién autorizó usar esos datos?
Muchas empresas recolectan datos de uso sin un permiso claro. En Europa, el RGPD permite reclamar si se usan sin autorización, pero no hay un marco global equivalente.
Conecta con
La materia Ética en la IA (RGPD y Ley 25.326 de protección de datos).
## 12.8 · Organizaciones públicas y privadas
Públicas: valor público antes que eficiencia
Mejorar derechos, acceso, transparencia y calidad. La velocidad no sustituye la legalidad ni la equidad.
Ejemplo
Un municipio clasifica reclamos por tema y urgencia, pero conserva revisión humana en los casos sensibles.
Indicadores
Tiempo de resolución, reaperturas, derivación humana, accesibilidad, errores por zona y satisfacción.
Privadas: productividad con responsabilidad
La IA crea valor cuando reduce fricción, mejora decisiones o habilita productos, sin degradar los derechos del cliente.
Ejemplo
Una distribuidora combina pronóstico, rutas y mantenimiento predictivo; el personal valida faltantes y eventos locales.
Indicadores
Nivel de servicio, inventario, costo por pedido, fallas evitadas, reclamos y precisión por segmento.
Error típicoUsar los mismos indicadores en los dos ámbitos. En lo público, «errores por zona» y «derivación humana» miden equidad y acceso; en lo privado, «precisión por segmento» cumple un papel parecido.
Lo que se dijo de cada ámbito
Público
Trámites más rápidos, urgencias tratadas como urgencias e indicadores casi en tiempo real de todos los procesos, algo que antes no se podía hacer. Siempre se conservan personas en el circuito.
Privado
El beneficio principal es la productividad: chats de WhatsApp con respuestas preparadas, gestión de ventas e inventario, mesa de ayuda, analítica y tableros (KPI) armados automáticamente.
OjoEn clase se dijo que el mantenimiento predictivo es IA «generativa». En rigor es aprendizaje automático predictivo: aprende patrones de fallas pasadas para anticipar las próximas (ver clase 9). No genera contenido nuevo.
Ejemplo de inclusión: funcionar sin conexión
El profesor citó una herramienta hecha por estudiantes de la universidad que descarga el mapa y la ruta antes de salir y después funciona sin datos, con el GPS del teléfono. Sirve en zonas sin cobertura o cuando la red se satura con muchísima gente en el mismo lugar.
## 12.9 · Del proceso manual a la automatización con IA
Observar el proceso y sus excepcionesCómo funciona hoy, de verdad.
Eliminar pasos sin valorNo automatizar lo que sobra.
Estandarizar entradas y responsablesUna sola forma de hacerlo y alguien a cargo.
Digitalizar y asegurar los datosDatos estructurados y protegidos.
Automatizar las reglas establesLo que no cambia, con reglas.
Aplicar IA a la ambigüedadDonde una regla no alcanza.
Pilotar con humano en el circuitoProbar acotado y con supervisión.
Escalar, monitorear y poder retirarCrecer con evidencia y con un plan de salida.
Regla docente
Si una regla simple resuelve el problema, no hace falta IA.
La misma ruta en cuatro clases (comparación del apunte)
Clase | Pasos | Qué agrega
7 | Observar → digitalizar → automatizar → aumentar con IA → supervisar | La base: primero entender, después tecnología.
10 | Documentar → digitalizar → estandarizar → asistir con IA → automatizar → supervisar | Estandarizar, y que la IA sugiera antes de ejecutar.
11 | Mapear → estandarizar → digitalizar → automatizar → supervisar | No hace falta AGI: alcanza con IA estrecha bien gobernada.
12 | Los ocho pasos de arriba | Eliminar pasos sin valor, separar reglas de ambigüedad, pilotar y poder retirar.
## 12.10 · Dos casos prácticos
Público: de expedientes en papel a gestión asistida
Situación inicial
Formularios en papel, duplicados, búsqueda manual y poca trazabilidad.
Diseño objetivo
OCR, validación, clasificación, detección de faltantes y una cola priorizada.
Control humano
Revisión obligatoria en decisiones sensibles, con baja confianza o con datos incompletos.
Éxito
Menos tiempo sin aumentar los rechazos erróneos ni cerrar los canales presenciales.
Ya pasa
Pedir una partida ya no es «venga la semana que viene»: llega por correo, con un código QR de firma electrónica que prueba que es auténtica. El OCR funciona como un «ojo electrónico» que no sólo escanea sino que extrae los datos, y su costo bajó mucho.
Privado: de planillas y llamadas a operaciones predictivas
Flujo
Pedidos, inventario, vehículos y mantenimiento → la IA pronostica, detecta anomalías, arma rutas y estima fallas → una persona valida huelgas, clima, eventos y clientes críticos → compra, despacho, mantenimiento y comunicación.
Riesgo típico
Optimizar sólo el costo y deteriorar la puntualidad o las condiciones laborales.
Control clave
Objetivos múltiples, límites operativos, revisión de excepciones y métricas de servicio.
En clase
En vez de esperar los pedidos, la empresa estudia los últimos seis meses, estima cuánto le van a pedir y se adelanta: si piden un poco más, cubre el 90 % y sólo dice «no hay» al resto.
## 12.11 · Escenarios futuros: de 2 a 50 años
Cuanto más lejos, menos certeza: la cátedra rotula los escenarios como probables (2–5 años), plausibles (10) y especulativos (20–50).
Horizontes de las láminas 15 a 20 del PPT. El rótulo de cada tramo es el que usa la cátedra.
Horizonte | Qué se espera | Ejemplo de la cátedra
2 años · copilotos bajo control | Asistentes para redactar, resumir, buscar y programar; atención interna y clasificación documental automatizadas; primeros inventarios de modelos y políticas de uso; más verificación y protección de datos. | Una universidad responde preguntas administrativas con IA, pero toda respuesta sobre becas o sanciones cita la norma y permite escalar a una persona.
3 años · equipos aumentados | IA integrada en CRM, ERP, mesa de ayuda y analítica; agentes que ejecutan secuencias simples con permisos limitados; evaluación continua; nuevos roles: dueño de proceso, evaluador y auditor de IA. | Una aseguradora recibe un siniestro, extrae datos, revisa la documentación y propone prioridad; una persona decide si hay fraude o alto impacto.
5 años · procesos adaptativos | Modelos multimodales (texto, imagen, audio, sensores); gemelos digitales que simulan operaciones; supervisión centrada en excepciones y resultados; regulación y auditoría incorporadas al diseño. | Un hospital simula camas y turnos, recomienda reasignaciones y explica las restricciones; el equipo clínico mantiene la autoridad.
10 años · organizaciones híbridas | Decisiones rutinarias muy automatizadas; las personas concentran criterio, negociación, creatividad y responsabilidad; identidad, procedencia y trazabilidad digital como infraestructura básica; riesgo de concentración en proveedores. | Una ciudad coordina movilidad, energía y mantenimiento con modelos compartidos, pero publica criterios, registra decisiones y permite revisión independiente.
20 años · instituciones rediseñadas | Servicios más preventivos que reactivos; aprendizaje permanente como parte del empleo; debate sobre propiedad de los datos, renta, impuestos y distribución de la productividad; resiliencia ante fallas sistémicas. | Un sistema regional anticipa la demanda sanitaria y social; la asignación combina modelos, deliberación pública y controles legales.
## 12.12 · A 50 años: tres futuros posibles
Inclusivo
IA como infraestructura pública y privada auditada; la productividad se convierte en bienestar y oportunidades.
Concentrado
Pocos actores controlan modelos, datos y cómputo; crecen la dependencia y la asimetría de poder.
Fragmentado
Ecosistemas incompatibles, soberanía tecnológica y fuertes diferencias entre regiones.
La variable decisiva
No será sólo la capacidad técnica, sino las instituciones, los incentivos y los valores que se construyan durante décadas. Por eso los escenarios sirven para decidir hoy qué competencias, infraestructura y regulación hacen falta.
La IA como commodity
La lectura del profesor para los 50 años: la IA se volverá un commodity, como internet hoy, que nadie discute y a cualquier proveedor se lo usa igual. Cuando algo se masifica, su costo baja hasta ser irrisorio.
Entonces, ¿dónde estará la diferencia?
En las aplicaciones que se construyan arriba de esa infraestructura.
Más predictivo que reactivo
Cuanto más avanza la tecnología, más predictiva se vuelve. Ejemplos de clase: la pizzería que conoce tu patrón de consumo y te ofrece «tu» pizza (decisiones rutinarias), o semáforos y autos con sensores que coordinan el tránsito según el flujo de cada avenida (ciudades inteligentes).
## 12.13 · Matriz para decidir: automatizar, asistir o mantener humano
Según el impacto del error y la incertidumbre del caso
Impacto bajo | Impacto medio | Impacto alto
Incertidumbre baja | Automatizar con reglas | Asistir + muestreo | Asistir + aprobación
Incertidumbre alta | La IA recomienda | Humano en el circuito | Humano decide
Ejemplo de la cátedra: aprobar una licencia social es de alto impacto; la IA puede ordenar las evidencias, pero la decisión requiere autoridad y derecho a apelar.
El contraste que usó el profesor: preguntarle el clima a una IA es de bajo impacto (si se equivoca, no pasa nada); preguntarle a un asistente de una clínica qué pastilla tomar es de alto impacto. Ahí la IA propone, pero una persona revisa y aprueba.
## 12.14 · El caso al revés: cuando la IA contrata personas
RentAHuman, según la lámina de la cátedra
Una plataforma lanzada en 2026 que permite que agentes de IA encuentren, contraten y paguen a personas para tareas que requieren presencia física: retirar paquetes, sacar fotos, inspeccionar locales, firmar documentos o asistir a reuniones. Las personas actúan como «ojos, manos y pies» de la IA.
Cómo funciona
La IA publica la tarea → se elige a alguien cercano → la persona envía evidencia → se libera el pago desde un depósito en garantía.
Cómo lo explicó el profesor
La plataforma expone un endpoint —un punto de conexión que recibe una entrada, la procesa y devuelve una salida— al que cualquier modelo de lenguaje puede conectarse. Funciona como un mercado: la IA carga la tarea con un precio («una foto del Puente de la Mujer, tomada hoy») y una persona la toma, la hace, sube la evidencia y cobra. Es parecido a Uber, pero acá elegís vos qué tarea tomar.
En clase
Los estudiantes encontraron tareas como grabar un video cortando verduras por unos 5 dólares, probablemente para entrenar modelos o para marketing que no quiere verse «hecho con IA». Hoy es gratuita; como Gmail o Instagram en su momento, se espera que la monetice cuando crezca.
Para pensar
Invierte la relación habitual: la persona termina trabajando para la IA. Sirve para discutir con las herramientas de esta clase quién decide, quién responde ante un error y qué controles protegen a quien hace el trabajo. El profesor lo puso como ejemplo de «pensar fuera de la caja»: alguien vio antes que nadie una necesidad nueva.
OjoLos datos de la plataforma (fundador, fecha, alcance en más de 100 países) son los que trae la lámina; no se verificaron para el apunte.
## 12.15 · Conclusiones: tecnología con propósito y control
1 · No empezar por la herramienta
El buen proyecto empieza con un problema claro, un proceso comprendido y datos gobernados.
2 · Diseñar para las personas
Acceso, comprensión, revisión y reparación no son extras: son parte de la calidad del sistema.
3 · Pensar en escenarios
Los horizontes de 2 a 50 años ayudan a decidir hoy competencias, infraestructura, regulación, resiliencia y distribución del valor.
Pregunta final de la cátedra
¿Qué futuro organizacional estamos creando con cada automatización? El cierre del profesor: diseñar pensando en las personas y no sólo en los costos, y armar proyectos flexibles, que no queden atados a una estructura fija, porque lo único 100 % seguro del escenario actual es que va a cambiar. La adopción va a ser gradual: las empresas grandes avanzan más lento por sus procesos internos y los equipos chicos pueden experimentar antes.
Notas sobre las fuentes de esta clase
Armada con el PPT de la cátedra (clase 14 en su numeración, «Escenarios de la IA – Tendencias futuras»), su infografía final y la grabación de la clase (transcripción y resumen, cargados el 8 de noviembre). Según el profesor, el tema se corrió una semana por una actividad de la universidad.
La transcripción tiene muchos cortes; se dejaron afuera las anécdotas que no se entienden y los datos de actualidad que no se pudieron verificar. El nombre de la herramienta de mapas sin conexión no se entiende en la grabación.
La comparación de rutas de 12.9 y la frase final del diagrama de 12.1 son agregados del apunte.')
on conflict (clase) do update set titulo = excluded.titulo, texto = excluded.texto;
