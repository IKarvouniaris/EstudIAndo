/* Generado por tools/seed_ia_parcial2.py — no editar a mano. Respuestas modelo (redactadas a partir del apunte, no la guía
   textual de la cátedra) y criterios de cada parte, para la pestaña «Respuestas» del simulacro. */
window.RESPUESTAS_IA_P2 = {
 "1": {
  "a": {
   "modelo": "La percepción es captar e interpretar señales o estímulos del entorno; en el caso, la cámara adquiere la imagen del envase en la línea. El reconocimiento de patrones es identificar regularidades o clases dentro de lo percibido: reconocer que una etiqueta está torcida o que falta la tapa. La diferencia es que la percepción adquiere la señal y el reconocimiento la clasifica; no son lo mismo, porque se puede captar una imagen sin reconocer qué muestra.",
   "criterios": [
    "Define la percepción como captar e interpretar estímulos o señales del entorno.",
    "Define el reconocimiento de patrones como identificar regularidades o clases en lo percibido.",
    "Marca la diferencia: la percepción adquiere la señal y el reconocimiento la clasifica (no son lo mismo)."
   ]
  },
  "b": {
   "modelo": "La visión por computadora del caso es Narrow AI porque hace una única tarea específica y acotada: detectar defectos definidos (etiquetas torcidas, tapas ausentes) en envases. No transfiere lo aprendido a otros dominios ni generaliza fuera de esa tarea, que es justamente lo que exigiría una Inteligencia Artificial General (AGI).",
   "criterios": [
    "Señala que el sistema hace una tarea específica y acotada (detectar defectos definidos en envases).",
    "Explica que no transfiere lo aprendido a otros dominios ni generaliza fuera de su tarea, que es lo que pediría una AGI."
   ]
  },
  "c": {
   "modelo": "Primero, una captura controlada: cámara fija, iluminación estable y posición del envase en la línea. Luego, un preprocesamiento de la imagen (recorte, normalización) y un modelo de visión o reglas que clasifican el envase. Finalmente, la salida se decide con un umbral: aprobar si la confianza es alta, rechazar si hay defecto claro y derivar a revisión humana los casos dudosos.",
   "criterios": [
    "Incluye una captura controlada (cámara, iluminación, posición en la línea).",
    "Incluye preprocesamiento y un modelo o reglas que clasifiquen el envase.",
    "Define una salida con umbral: aprobar, rechazar o derivar a revisión."
   ]
  },
  "d": {
   "modelo": "Métrica: precisión y recall por tipo de defecto, junto con la tasa de falsos rechazos, para saber cuántos defectos se pierden y cuántos envases buenos se descartan. Control humano: muestreo periódico de lo aprobado y revisión de los casos dudosos, con una parada segura que frene la línea antes de dejar que el sistema actúe solo.",
   "criterios": [
    "Propone métricas de desempeño por tipo de defecto (precisión, recall, tasa de falsos rechazos o similares).",
    "Propone control humano: muestreo, revisión de dudosos o una parada segura antes de dejarlo actuar solo."
   ]
  }
 },
 "2": {
  "a": {
   "modelo": "En la inteligencia biológica el lenguaje es un sistema simbólico que permite representar ideas y significados y comunicarlos a otros para razonar y coordinar acciones. Se relaciona con la comunicación porque, para entender y hacerse entender, usa símbolos y también el contexto y el conocimiento compartido: la misma frase puede significar cosas distintas según la situación.",
   "criterios": [
    "Explica que el lenguaje permite representar y comunicar significados.",
    "Relaciona el lenguaje con el uso de símbolos y del contexto para entender y hacerse entender."
   ]
  },
  "b": {
   "modelo": "Un asistente de voz es una aplicación de Narrow AI que combina reconocimiento de voz, identificación de la intención, diálogo y síntesis de la respuesta. Su dominio es un catálogo acotado de consultas (turnos, tasas y horarios del municipio): no comprende en general ni resuelve tareas fuera de ese catálogo, lo que sería propio de una IA general.",
   "criterios": [
    "Define el asistente como combinación de reconocimiento de voz, intención, diálogo y respuesta.",
    "Delimita su dominio: un catálogo acotado de consultas (turnos, tasas, horarios), sin comprensión general."
   ]
  },
  "c": {
   "modelo": "Primero, el audio de la consulta entra por el canal de voz. Luego, un reconocimiento de voz lo transcribe a texto y un modelo identifica la intención (por ejemplo, consultar un turno). A continuación se consulta una base de información autorizada del municipio y se entrega la respuesta al ciudadano, en voz. Finalmente, la interacción queda registrada para su seguimiento y mejora.",
   "criterios": [
    "Describe la secuencia audio → reconocimiento de voz → identificación de la intención.",
    "Consulta una base de información autorizada y entrega la respuesta.",
    "Registra la interacción para seguimiento o mejora."
   ]
  },
  "d": {
   "modelo": "Se escala a una persona cuando hay baja confianza en la intención, intentos repetidos sin resolver, una consulta fuera del catálogo o un dato sensible. La derivación conserva el contexto: la persona recibe la transcripción, la intención detectada y lo ya respondido, para que el ciudadano no tenga que repetir su consulta.",
   "criterios": [
    "Define disparadores de escalamiento: baja confianza, intentos repetidos, consulta fuera de catálogo o dato sensible.",
    "Describe la derivación a una persona conservando el contexto de la consulta."
   ]
  }
 },
 "3": {
  "a": {
   "modelo": "La memoria es conservar y recuperar información (por ejemplo, recordar un fallo anterior). El aprendizaje es un cambio en el comportamiento o desempeño producido por la experiencia. Se diferencian porque guardar un recuerdo no implica mejorar: hay aprendizaje solo si lo vivido cambia lo que se hace después.",
   "criterios": [
    "Define la memoria como conservar y recuperar información.",
    "Define el aprendizaje como un cambio en el comportamiento o desempeño producido por la experiencia, y los diferencia."
   ]
  },
  "b": {
   "modelo": "El aprendizaje por experiencia es mejorar el desempeño en una tarea a partir de casos o datos. No hay que confundirlo con almacenar registros: guardar el historial de fallos es solo memoria; para que haya aprendizaje tiene que cambiar el modelo o el desempeño del sistema gracias a esos datos.",
   "criterios": [
    "Define el aprendizaje por experiencia como mejorar el desempeño en una tarea a partir de casos o datos.",
    "Aclara explícitamente que guardar registros no es aprender: tiene que cambiar el modelo o el desempeño."
   ]
  },
  "c": {
   "modelo": "Primero se estructuran los casos históricos con síntomas, causa y solución. Cuando llega un problema nuevo, se recuperan los casos similares y se recomienda la solución más probable junto con un nivel de confianza, para que el personal de campo vea cuánto puede apoyarse en ella.",
   "criterios": [
    "Estructura los casos (síntomas, causa, solución).",
    "Recupera casos similares al problema nuevo y recomienda una solución con un nivel de confianza."
   ]
  },
  "d": {
   "modelo": "Datos mínimos: equipo, fecha, síntomas, causa confirmada, acción realizada y resultado; nada más de lo necesario. Antes de actuar, un técnico valida la recomendación: el sistema sugiere y la persona decide y ejecuta.",
   "criterios": [
    "Lista datos mínimos pertinentes (equipo, fecha, síntomas, causa confirmada, acción y resultado).",
    "Exige que un técnico valide la recomendación antes de ejecutarla."
   ]
  }
 },
 "4": {
  "a": {
   "modelo": "La capacidad cognitiva en juego es el lenguaje. Implica comprender y producir mensajes con significado y en contexto: no alcanza con cambiar palabras, hay que entender qué se quiere decir en esa situación y expresarlo de forma adecuada.",
   "criterios": [
    "Identifica al lenguaje como la capacidad cognitiva en juego.",
    "Explica que implica comprender y producir mensajes con significado y en contexto."
   ]
  },
  "b": {
   "modelo": "Sigue siendo Narrow AI porque realiza una sola tarea especializada: traducir. Manejar muchos idiomas no implica competencia cognitiva general ni transferencia a otros dominios: es la misma tarea repetida en más idiomas, no una inteligencia general.",
   "criterios": [
    "Explica que sigue siendo una sola tarea especializada (traducir).",
    "Aclara que manejar muchos idiomas no implica competencia cognitiva general ni transferencia a otros dominios."
   ]
  },
  "c": {
   "modelo": "Se automatizarían mensajes de orientación de bajo riesgo: turnos, señalización, indicaciones de trámites y horarios. Se excluye explícitamente todo lo clínico: diagnóstico, consentimiento informado, prescripción u otras decisiones médicas, que no pasan por la traducción automática.",
   "criterios": [
    "Incluye mensajes de orientación de bajo riesgo (turnos, señalización, trámites).",
    "Excluye explícitamente diagnóstico, consentimiento informado, prescripción u otras decisiones clínicas."
   ]
  },
  "d": {
   "modelo": "Un profesional o intérprete confirma los nombres, las dosis de medicación, las alergias y cualquier mensaje que influya en una decisión clínica. El nivel de control es proporcional al impacto: lo administrativo puede ir con revisión por muestreo; lo de alto impacto, con confirmación humana previa.",
   "criterios": [
    "Propone confirmación por un profesional o intérprete en nombres, dosis, alergias o decisiones clínicas.",
    "Vincula el nivel de control con el impacto del mensaje."
   ]
  }
 },
 "5": {
  "a": {
   "modelo": "El razonamiento simbólico básico representa hechos mediante símbolos (por ejemplo, documentación_completa = no, vencimiento = próximo) y aplica reglas explícitas del tipo si–entonces para derivar conclusiones a partir de esos hechos.",
   "criterios": [
    "Explica que se representan hechos con símbolos.",
    "Explica que se aplican reglas explícitas (si–entonces) para derivar conclusiones."
   ]
  },
  "b": {
   "modelo": "Una regla explícita es un criterio programado por una persona: si ocurre tal condición, entonces tal acción. Un patrón aprendido es una regularidad estimada a partir de datos o ejemplos, sin que nadie la escriba. La regla es auditable por diseño; el patrón depende de los datos con los que se entrenó.",
   "criterios": [
    "Define la regla como un criterio programado por una persona.",
    "Define el patrón aprendido como una regularidad estimada a partir de datos o ejemplos."
   ]
  },
  "c": {
   "modelo": "SI falta documentación ENTONCES pedir subsanación y dejar la solicitud en espera. SI el vencimiento es de menos de 5 días ENTONCES asignar prioridad alta. SI el tipo de trámite es de baja complejidad y la documentación está completa ENTONCES asignar prioridad normal y derivarla a un analista. En ningún caso una regla aprueba la solicitud automáticamente.",
   "criterios": [
    "Escribe tres reglas con forma SI condición ENTONCES acción, coherentes con documentación, vencimiento o tipo de trámite.",
    "Las reglas asignan prioridad o piden subsanación, pero no aprueban la solicitud automáticamente."
   ]
  },
  "d": {
   "modelo": "Se guarda un registro (log) por cada solicitud con los datos de entrada, la regla aplicada y su versión. Además se registra la decisión humana final y quién la tomó, de modo que se pueda reconstruir por qué se asignó esa prioridad y quién resolvió.",
   "criterios": [
    "Propone un registro (log) con los datos de entrada, la regla aplicada y su versión.",
    "Registra la decisión final y quién la tomó."
   ]
  }
 },
 "6": {
  "a": {
   "modelo": "La cognición distribuida es la idea de que el conocimiento y las decisiones no están solo en una cabeza: se reparten entre personas, artefactos, información y entorno (y a lo largo del tiempo). En el caso, sus componentes son los técnicos, los sensores, los manuales y la mesa de ayuda.",
   "criterios": [
    "Define la cognición distribuida como repartida entre personas, artefactos, información y entorno (y el tiempo).",
    "Identifica los componentes del caso: técnicos, sensores, manuales, mesa de ayuda."
   ]
  },
  "b": {
   "modelo": "La metáfora cerebro-máquina es un modelo útil para pensar y diseñar, pero cerebro y computadora no son idénticos: no son equivalentes ni literal ni funcionalmente. El cerebro tiene cuerpo, contexto y plasticidad que una computadora no reproduce.",
   "criterios": [
    "Explica que la metáfora es un modelo útil para pensar o diseñar.",
    "Aclara que cerebro y computadora no son equivalentes ni literal ni funcionalmente (cuerpo, contexto, plasticidad)."
   ]
  },
  "c": {
   "modelo": "El sensor detecta una anomalía y genera la alerta; la mesa de ayuda abre el ticket; el manual aporta el procedimiento indicado para esa avería. El técnico diagnostica, actúa y cierra el caso, dejando registrado lo hecho.",
   "criterios": [
    "Describe un circuito: el sensor genera la alerta, la mesa abre el ticket, el manual aporta el procedimiento.",
    "El técnico diagnostica, actúa y cierra el caso."
   ]
  },
  "d": {
   "modelo": "Se mantiene un repositorio de casos resueltos y validados, con una clasificación (tipo de avería, equipo, solución) y una búsqueda que permita encontrarlos. Se prevé una revisión y actualización periódica para retirar lo obsoleto y sumar lo nuevo.",
   "criterios": [
    "Propone un repositorio de casos resueltos y validados, con una clasificación y búsqueda.",
    "Prevé revisión o actualización periódica del repositorio."
   ]
  }
 },
 "7": {
  "a": {
   "modelo": "Percibir los datos es adquirir y representar señales: montos, fechas, proveedores. Reconocer patrones es detectar regularidades o anomalías en esas señales (por ejemplo, compras con montos atípicos o proveedores que siempre ganan). Se relacionan porque primero hay que percibir y representar los datos para poder encontrar patrones en ellos.",
   "criterios": [
    "Explica percibir datos como adquirir y representar señales (montos, fechas, proveedores).",
    "Explica reconocer patrones como detectar regularidades o anomalías en esas señales, y los relaciona en el caso."
   ]
  },
  "b": {
   "modelo": "El modelo de patrones aprendidos descubre anomalías a partir de datos históricos, sin que nadie las haya definido; las reglas simbólicas expresan la normativa de contratación de forma explícita. Son complementarios: combinados mejoran la cobertura (el modelo detecta lo no previsto) y la trazabilidad (las reglas permiten explicar el criterio).",
   "criterios": [
    "Distingue el modelo que descubre anomalías de las reglas que expresan la normativa.",
    "Explica que combinados mejoran la cobertura y la trazabilidad."
   ]
  },
  "c": {
   "modelo": "Primero se ingieren los datos de compras y se controla su calidad. Luego un modelo puntúa las anomalías y se aplican las reglas de contratación; recién después se genera una alerta priorizada. La alerta se deriva a un analista, que cierra el caso de forma documentada.",
   "criterios": [
    "Incluye ingesta y control de calidad de datos.",
    "Puntúa anomalías y aplica reglas antes de generar una alerta priorizada.",
    "Deriva a un analista que cierra el caso de forma documentada."
   ]
  },
  "d": {
   "modelo": "Trazabilidad: se explican las variables y las reglas que dispararon cada alerta. Revisión humana: el sistema nunca sanciona ni acusa automáticamente, y un analista debe revisar cada caso. Falsos positivos: se miden y se tratan, y se prevé un canal para rectificar cuando se señaló a alguien por error.",
   "criterios": [
    "Exige explicar las variables y reglas que dispararon la alerta.",
    "Prohíbe sancionar o acusar automáticamente: revisión humana obligatoria.",
    "Prevé el tratamiento de falsos positivos y la posibilidad de rectificación."
   ]
  }
 },
 "8": {
  "a": {
   "modelo": "La memoria aporta los casos registrados: qué pasó, con qué señales y cómo se resolvió. El aprendizaje por experiencia ajusta el modelo a partir de resultados confirmados. Están conectados porque el aprendizaje usa lo que la memoria conserva, pero no son equivalentes: tener el historial guardado no mejora nada hasta que el modelo cambia con él.",
   "criterios": [
    "Explica que la memoria aporta los casos registrados.",
    "Explica que el aprendizaje ajusta el modelo a partir de resultados confirmados, y que por eso no son lo mismo."
   ]
  },
  "b": {
   "modelo": "Un aporte de la neurociencia es la conectividad y el procesamiento distribuido y en paralelo de las redes neuronales, junto con la plasticidad. Es una inspiración para diseñar redes artificiales, no una copia literal del cerebro.",
   "criterios": [
    "Nombra un aporte pertinente (conectividad, procesamiento distribuido o en paralelo, plasticidad).",
    "Aclara que es inspiración y no una copia del cerebro."
   ]
  },
  "c": {
   "modelo": "Ciclo: se capturan los datos de los sensores y los diagnósticos de los técnicos, y se etiqueta la causa confirmada de cada falla. Con eso se entrena el modelo, se valida, se despliega como alerta predictiva y se retroalimenta con los nuevos fallos confirmados para volver a empezar.",
   "criterios": [
    "Describe un ciclo: capturar datos de sensores y diagnósticos, etiquetar la causa confirmada.",
    "Entrenar, validar, desplegar y retroalimentar las alertas."
   ]
  },
  "d": {
   "modelo": "Se separan los datos de entrenamiento y de prueba por períodos o por equipos, y se valida hacia el futuro (entrenar con el pasado, probar con lo posterior). Se reentrena cuando se detecta deriva de los datos o cuando el desempeño cae por debajo de un umbral previamente aprobado.",
   "criterios": [
    "Separa datos de entrenamiento y prueba por períodos o equipos, probando hacia el futuro.",
    "Define cuándo reentrenar (deriva o umbral de desempeño aprobado)."
   ]
  }
 },
 "9": {
  "a": {
   "modelo": "La percepción es recibir la entrada, sea voz o texto del cliente. El lenguaje es interpretar la consulta: entender qué quiere decir y qué pide. La memoria es conservar el contexto de la conversación y el conocimiento autorizado del banco. Son funciones distintas que el servicio combina.",
   "criterios": [
    "Asigna la percepción a recibir voz o texto.",
    "Asigna el lenguaje a interpretar la consulta.",
    "Asigna la memoria a conservar el contexto y el conocimiento autorizado."
   ]
  },
  "b": {
   "modelo": "Integrar u orquestar varias Narrow AI no demuestra por sí mismo una General AI: coordinar módulos especializados no garantiza abstracción ni transferencia flexible a dominios nuevos. El conjunto sigue funcionando solo dentro de las tareas para las que se diseñó cada módulo.",
   "criterios": [
    "Explica que integrar u orquestar módulos no garantiza abstracción ni transferencia flexible a dominios nuevos."
   ]
  },
  "c": {
   "modelo": "El recorrido es: llega la consulta por un canal (voz, chat o formulario), se transcribe si es voz, se identifica la intención, se recupera el contexto y se busca en la base de conocimiento. El proceso termina entregando la respuesta o transfiriendo a un agente humano junto con el historial de la conversación.",
   "criterios": [
    "Describe el recorrido: canal, transcripción, intención, contexto y búsqueda en la base.",
    "Termina en una respuesta o en la transferencia a un agente con el historial."
   ]
  },
  "d": {
   "modelo": "Se escala a una persona cuando la confianza en la intención es baja o la consulta es ambigua. También se escala por riesgo financiero: operaciones monetarias, sospecha de fraude o pedidos fuera del alcance del sistema, que no se resuelven de forma automática.",
   "criterios": [
    "Escala por baja confianza o ambigüedad.",
    "Escala por riesgo financiero: operaciones monetarias, sospecha de fraude o pedidos fuera de alcance."
   ]
  }
 },
 "10": {
  "a": {
   "modelo": "Detectar una grieta es localizarla en la imagen. Reconocer un patrón de daño es clasificar qué tipo de daño es. Comprender su causa es otra cosa: requiere contexto y un análisis adicional (materiales, cargas, historia del puente) que el modelo no aporta por sí solo.",
   "criterios": [
    "Detectar es localizar la grieta.",
    "Reconocer es clasificar el tipo de daño.",
    "Comprender la causa requiere contexto y análisis adicional que el modelo no aporta solo."
   ]
  },
  "b": {
   "modelo": "Una Narrow AI visual identifica los patrones para los que fue entrenada. Su alcance termina ahí: no determina por sí sola la causa de un daño ni la seguridad estructural del puente, porque eso excede lo que puede inferir de una imagen.",
   "criterios": [
    "Explica que identifica patrones para los que fue entrenada.",
    "Señala que no determina por sí sola la causa ni la seguridad estructural."
   ]
  },
  "c": {
   "modelo": "Se define un plan de vuelo, se capturan las imágenes con el dron y se controla su calidad. Luego el modelo detecta las grietas, se las geolocaliza en un mapa y se priorizan según gravedad. El proceso termina con una orden de visita para que un inspector revise el lugar.",
   "criterios": [
    "Incluye plan de vuelo, captura y control de calidad de imágenes.",
    "Incluye detección, geolocalización o mapa y priorización.",
    "Termina en una orden de visita de un inspector."
   ]
  },
  "d": {
   "modelo": "Se revisa una muestra de las detecciones (por ejemplo estratificada por tipo de daño) y todos los casos críticos. El caso nunca se cierra sin inspección profesional: ninguna evidencia generada solo por el modelo alcanza para cerrarlo automáticamente.",
   "criterios": [
    "Propone revisar una muestra (por ejemplo estratificada) y todos los casos críticos.",
    "Establece que el caso no se cierra sin inspección profesional."
   ]
  }
 },
 "11": {
  "a": {
   "modelo": "En el razonamiento simbólico los hechos describen el expediente (por ejemplo, tipo de trámite, monto, documentación presentada). Las reglas codifican la normativa y un motor de reglas deriva el estado del expediente o la acción a seguir, con una conclusión que se puede explicar.",
   "criterios": [
    "Los hechos describen el expediente.",
    "Las reglas codifican la normativa y un motor deriva el estado o la acción."
   ]
  },
  "b": {
   "modelo": "El reconocimiento de patrones sirve para extraer datos de documentos heterogéneos: OCR y detección de campos. No equivale a razonamiento jurídico: la conclusión sobre qué corresponde según la ley exige reglas y revisión experta, no solo patrones.",
   "criterios": [
    "Ubica el reconocimiento de patrones en la extracción de datos de documentos (OCR, campos).",
    "Aclara que la conclusión jurídica requiere reglas y revisión, no sólo patrones."
   ]
  },
  "c": {
   "modelo": "Primero se extraen los campos de los documentos con OCR y se validan. Luego un motor de reglas aplica la normativa. Las excepciones, es decir, los casos que no encajan en las reglas, van a una cola que resuelven personas con criterio experto.",
   "criterios": [
    "Incluye extracción (OCR) y validación de campos.",
    "Incluye un motor de reglas y una cola de excepciones resuelta por personas."
   ]
  },
  "d": {
   "modelo": "Las reglas se guardan en un repositorio versionado, con su vigencia, pruebas y aprobación antes de publicarse. Cada resultado registra qué regla y qué versión lo produjo, de modo que una auditoría pueda saber qué normativa estaba vigente y por qué se llegó a esa conclusión.",
   "criterios": [
    "Propone un repositorio versionado de reglas con vigencia, pruebas y aprobación.",
    "Registra qué regla y versión produjo cada resultado."
   ]
  }
 },
 "12": {
  "a": {
   "modelo": "Dos aportes de la neurociencia al diseño de IA son las redes de unidades conectadas (redes neuronales) y el aprendizaje adaptativo; también la memoria asociativa y la atención. Tienen un límite como analogía: son inspiración, no equivalencia, porque una red artificial no es un cerebro real.",
   "criterios": [
    "Nombra dos aportes pertinentes (redes conectadas, aprendizaje adaptativo, memoria asociativa, atención).",
    "Señala que la analogía tiene límites: no equivalen al cerebro real."
   ]
  },
  "b": {
   "modelo": "El procesamiento distribuido trabaja con señales en paralelo, como la detección visual, y se apoya en patrones aprendidos. El razonamiento simbólico impone reglas explícitas y auditables, como las de seguridad que deciden detener la maquinaria. El primero percibe y estima; el segundo fija límites que se pueden verificar.",
   "criterios": [
    "El procesamiento distribuido procesa señales en paralelo (por ejemplo, la detección visual).",
    "El razonamiento simbólico impone reglas explícitas y auditables (por ejemplo, las de seguridad)."
   ]
  },
  "c": {
   "modelo": "Se diseñan capas separadas: percepción (detección visual), memoria de casos, reglas y actuación. Las reglas de seguridad tienen prioridad sobre lo que estime la percepción, y el actuador lleva a la máquina a un estado seguro cuando una regla lo exige.",
   "criterios": [
    "Separa percepción, memoria de casos, reglas y actuación en capas.",
    "Las reglas de seguridad tienen prioridad sobre lo que estime la percepción, y el actuador lleva a un estado seguro."
   ]
  },
  "d": {
   "modelo": "La parada de seguridad debe ser determinista y a prueba de fallas: siempre debe reaccionar igual y no depender de un modelo probabilístico. Se prueba con mediciones de latencia (cuánto tarda en frenar), con falla de sensor y con la recuperación posterior al estado seguro.",
   "criterios": [
    "Establece que la parada de seguridad debe ser determinista y a prueba de fallas.",
    "Propone pruebas de latencia, falla de sensor y recuperación."
   ]
  }
 },
 "13": {
  "a": {
   "modelo": "Una General AI exige desempeño amplio en muchos dominios, abstracción (formar conceptos reutilizables) y transferencia a tareas nuevas. Una colección de sistemas Narrow AI, aunque se orqueste, no cumple esos criterios: cada sistema sigue limitado a su tarea y su dominio.",
   "criterios": [
    "La AGI exige desempeño amplio, abstracción y transferencia a tareas nuevas.",
    "Orquestar varios sistemas estrechos no cumple esos criterios."
   ]
  },
  "b": {
   "modelo": "La abstracción es formar conceptos reutilizables, y la transferencia es aplicarlos en dominios nuevos sin empezar de cero. La creatividad es producir soluciones nuevas y pertinentes en contextos nuevos. Siguen siendo desafíos teóricos centrales porque ningún sistema actual logra hacerlo de forma general y confiable, y no hay consenso sobre cómo conseguirlo.",
   "criterios": [
    "Explica que habría que formar conceptos reutilizables (abstracción) y aplicarlos en dominios nuevos (transferencia).",
    "Explica que habría que producir soluciones nuevas y pertinentes en contextos nuevos (creatividad), y por qué eso sigue sin resolverse."
   ]
  },
  "c": {
   "modelo": "Se avanza por etapas: primero pilotos en dominios acotados (por ejemplo, un trámite concreto) con permisos mínimos; se usan interfaces estables y supervisión humana; y solo se amplía a otros dominios cuando hay evidencia de que funciona, nunca por anticipado.",
   "criterios": [
    "Empieza con pilotos en dominios acotados y permisos mínimos.",
    "Usa interfaces estables y supervisión, y se expande sólo con evidencia."
   ]
  },
  "d": {
   "modelo": "Se prueba con casos inéditos y adversariales para detectar transferencia espuria (que parezca que generaliza sin hacerlo) y errores fuera del dominio. Se vigila la confianza indebida y se bloquean las acciones fuera del alcance autorizado, para evitar el exceso de autonomía.",
   "criterios": [
    "Propone pruebas con casos inéditos o adversariales.",
    "Detecta confianza indebida o errores fuera de dominio y bloquea acciones fuera de su alcance."
   ]
  }
 },
 "14": {
  "a": {
   "modelo": "Un único modelo funcional con cada función asignada: los sensores perciben el estado de la red, el historial de incidentes funciona como memoria, los modelos aprenden de esos incidentes y las reglas de seguridad limitan lo que puede hacerse (razonamiento simbólico). La decisión final queda en los operadores humanos.",
   "criterios": [
    "Asigna cada función: los sensores perciben, el historial recuerda, los modelos aprenden, las reglas limitan.",
    "Deja la decisión final en los operadores."
   ]
  },
  "b": {
   "modelo": "La cognición distribuida significa que la decisión emerge de la coordinación entre centros de control, sistemas de software, sensores, procedimientos y la experiencia de las personas, y no de un único componente. Ningún elemento por sí solo decide: el conocimiento está repartido en todo el sistema sociotécnico.",
   "criterios": [
    "Explica que la decisión emerge de la coordinación entre centros, sistemas, procedimientos y experiencia humana, no de un único componente."
   ]
  },
  "c": {
   "modelo": "Una arquitectura híbrida en capas, con operación regional y un motor de reglas con prioridad sobre los modelos aprendidos. Se separa recomendar de autorizar: el sistema recomienda y un operador autoriza. Se prevé un modo degradado, con control local, para cuando fallen las comunicaciones o los modelos.",
   "criterios": [
    "Propone capas (regionales) con un motor de reglas prioritario.",
    "Separa recomendar de autorizar y prevé un modo degradado o control local."
   ]
  },
  "d": {
   "modelo": "Se prueba con simulación, pruebas de ataque (red team) e inyección de fallas, incluyendo datos adversos y fallos simultáneos. Se define cómo se reconcilian las recomendaciones en conflicto (por ejemplo, prevalece la regla de seguridad o decide el operador) y cómo se vuelve al control manual.",
   "criterios": [
    "Propone simulación, pruebas de ataque (red team) o inyección de fallas.",
    "Define cómo se reconcilian recomendaciones en conflicto y cómo se vuelve al control manual."
   ]
  }
 },
 "15": {
  "a": {
   "modelo": "Para apoyar una afirmación de General AI se necesitaría evidencia conjunta de abstracciones reutilizables, transferencia eficiente y creatividad útil, y que se observe en varios dominios distintos, no solo en el diseño de puentes.",
   "criterios": [
    "Pide evidencia conjunta: abstracciones reutilizables, transferencia eficiente y creatividad útil.",
    "Exige que se vea en varios dominios, no sólo en el diseño de puentes."
   ]
  },
  "b": {
   "modelo": "Generar novedades válidas en un dominio no prueba inteligencia general porque esa novedad puede surgir de una búsqueda o de un modelo especializado en un solo dominio, sin ninguna competencia general: es una Narrow AI muy buena en una tarea.",
   "criterios": [
    "Explica que la novedad especializada puede surgir de búsqueda o de modelos de un solo dominio, sin competencia general."
   ]
  },
  "c": {
   "modelo": "Primero se definen los requisitos (cargas, normas, límites) y se generan alternativas de diseño. Se las simula bajo cargas y escenarios. Luego se hace un chequeo normativo, una revisión independiente y, por último, la aprobación y firma de un profesional responsable.",
   "criterios": [
    "Incluye requisitos, generación de alternativas y simulación.",
    "Incluye chequeo normativo, revisión independiente y firma de un profesional."
   ]
  },
  "d": {
   "modelo": "Se prueba con casos fuera de distribución: cargas extremas y materiales nuevos. Se rechaza un diseño si viola alguna restricción o si la incertidumbre es alta, aunque parezca plausible: que se vea razonable no alcanza para aprobarlo.",
   "criterios": [
    "Propone casos inéditos: cargas extremas, materiales nuevos.",
    "Rechaza el diseño si viola restricciones o si la incertidumbre es alta, aunque parezca plausible."
   ]
  }
 },
 "16": {
  "a": {
   "modelo": "La General AI igualaría las capacidades generales humanas; la superinteligencia las superaría ampliamente. Ambas son hipotéticas: no existen hoy y no deben afirmarse sin evidencia, por lo que se analizan como escenarios de riesgo y no como hechos.",
   "criterios": [
    "La AGI igualaría capacidades generales humanas; la superinteligencia las superaría ampliamente.",
    "Marca que ambas son hipotéticas y no deben afirmarse sin evidencia."
   ]
  },
  "b": {
   "modelo": "Desalineación de objetivos: si el objetivo está mal especificado, un sistema muy capaz puede escalar el daño cumpliéndolo al pie de la letra. Concentración de poder: quién accede y se beneficia del sistema. Pérdida de control: que nadie pueda corregirlo ni detenerlo. Son debates de riesgo, no predicciones.",
   "criterios": [
    "Explica la desalineación: un objetivo mal especificado puede escalar el daño.",
    "Incluye la concentración de poder y la pérdida de control (quién accede y quién controla)."
   ]
  },
  "c": {
   "modelo": "Gobernanza preventiva: el sistema se aísla en un entorno cerrado (sandbox), con permisos mínimos y autorización escalonada que requiere la aprobación de varias personas. Se limitan los recursos de cómputo, se registra todo, cada acción puede revertirse y existe un apagado independiente del propio sistema.",
   "criterios": [
    "Propone aislamiento (sandbox), permisos mínimos y aprobación múltiple.",
    "Incluye límites de recursos, registros, reversión y un apagado independiente."
   ]
  },
  "d": {
   "modelo": "Indicadores: saltos súbitos de capacidad y búsqueda de privilegios no concedidos; ocultamiento o resistencia a ser detenido, es decir, intentos de eludir los controles. Se definen de antemano los criterios de apagado: qué señales obligan a apagar y quién tiene la autoridad para hacerlo.",
   "criterios": [
    "Vigila saltos súbitos de capacidad y búsqueda de privilegios.",
    "Vigila ocultamiento o resistencia a ser detenido, y define cuándo apagar."
   ]
  }
 },
 "17": {
  "a": {
   "modelo": "Percepción: captar señales (las imágenes médicas). Memoria: almacenar (historias clínicas y guías). Aprendizaje: adaptarse con la experiencia y los casos. Lenguaje: comunicar (interpretar y redactar texto clínico). Razonamiento: derivar conclusiones a partir de los datos y las guías. El sistema las distribuye en módulos, y las decisiones se apoyan en los equipos multidisciplinares.",
   "criterios": [
    "Distingue las cinco funciones: captar señales, almacenar, adaptarse, comunicar y derivar conclusiones.",
    "Las ubica en el sistema del caso (imágenes, historias clínicas, guías, equipos)."
   ]
  },
  "b": {
   "modelo": "La cognición distribuida muestra que la decisión pertenece al sistema sociotécnico completo: profesionales, guías, datos y herramientas. Por eso no se le atribuye toda la decisión a un único algoritmo, y la responsabilidad no se delega en él.",
   "criterios": [
    "Explica que la decisión pertenece al sistema sociotécnico: profesionales, guías, datos y herramientas."
   ]
  },
  "c": {
   "modelo": "Cada módulo analiza su fuente (imágenes, historia, guías) y muestra su evidencia de forma visible; el sistema ofrece una recomendación. La decisión pasa por los profesionales, por ejemplo una junta clínica, y queda registrada. Nunca hay un diagnóstico ni un tratamiento plenamente autónomos.",
   "criterios": [
    "Diseña un flujo de apoyo: análisis por módulo, evidencia visible, recomendación.",
    "La decisión pasa por profesionales (por ejemplo, una junta clínica) y queda registrada."
   ]
  },
  "d": {
   "modelo": "Validación por subgrupos de pacientes para ver si el desempeño es equitativo. Explicación de las fuentes de cada recomendación. Privacidad: se minimizan los datos. Responsabilidad final: recae siempre en los profesionales, no en el sistema.",
   "criterios": [
    "Evalúa el desempeño por subgrupos de pacientes.",
    "Explica las fuentes de la recomendación y minimiza datos (privacidad).",
    "Asigna la responsabilidad final a profesionales."
   ]
  }
 },
 "18": {
  "a": {
   "modelo": "La neurociencia inspira principios de diseño (redes conectadas, aprendizaje adaptativo), pero eso no es equivalencia funcional. Se rechaza la afirmación de «copiar el cerebro»: cerebro y computadora no son equivalentes, y la metáfora es un modelo útil, no una identidad.",
   "criterios": [
    "Explica que la neurociencia inspira principios de diseño.",
    "Rechaza la afirmación de «copiar el cerebro» o de equivalencia cerebro-computadora."
   ]
  },
  "b": {
   "modelo": "Reconocer correlaciones es clasificar según regularidades en los datos; razonar con símbolos es aplicar reglas explícitas. Comprender el contexto no se deduce automáticamente de ninguna de las dos: una correlación no explica por qué ocurre algo, y las reglas solo valen para lo previsto.",
   "criterios": [
    "Reconocer correlaciones es clasificar; razonar con símbolos es aplicar reglas.",
    "Comprender el contexto no se deduce automáticamente de ninguna de las dos."
   ]
  },
  "c": {
   "modelo": "Se rediseña hacia usos acotados y no punitivos: análisis agregado o apoyo a la prevención, sin apuntar a personas. Se prohíben las intervenciones automáticas; toda decisión es humana y hay derecho a revisión y apelación.",
   "criterios": [
    "Limita el sistema a usos acotados (análisis agregado o apoyo) y no punitivos.",
    "Prohíbe intervenciones automáticas y habilita decisión humana y apelación."
   ]
  },
  "d": {
   "modelo": "Auditoría independiente de sesgo por grupos y pruebas de robustez. Explicaciones utilizables por quienes toman la decisión y por las personas afectadas. Antes de desplegar, una evaluación de necesidad y proporcionalidad: si el sistema es realmente necesario y si su impacto es proporcional al fin.",
   "criterios": [
    "Propone auditoría independiente de sesgo por grupos y pruebas de robustez.",
    "Pide explicaciones utilizables y una evaluación de necesidad y proporcionalidad."
   ]
  }
 }
};
