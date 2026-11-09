/* Nivel 3 de Parcial Zombie · Introducción a la IA · clase 9. Formato y pautas: js/preguntas-zombie-ia.js */
(window.NIVELES_ZOMBIE_IA = window.NIVELES_ZOMBIE_IA || []).push({
  clase: 9,
  titulo: "Patrones, símbolos y experiencia",
  preguntas: [
    /* 9.1 · tres pilares conceptuales */
    { ref: "9.1", tema: "Los tres pilares de la IA", q: "¿Qué hace la máquina en el pilar del reconocimiento de patrones?",
      ops: ["Ve y clasifica regularidades.", "Razona con reglas explícitas.", "Mejora con cada nueva experiencia."],
      porque: "En el reconocimiento de patrones la máquina «ve» y clasifica regularidades en los datos. En el razonamiento simbólico razona con reglas explícitas, y en el aprendizaje por experiencia mejora con cada nueva experiencia." },

    /* 9.2 · reconocimiento de patrones */
    { ref: "9.2", tema: "Reconocimiento de patrones", q: "¿En qué se apoya técnicamente el reconocimiento de patrones?",
      ops: ["En redes neuronales en capas.", "En reglas lógicas si–entonces.", "En motores de inferencia."],
      porque: "Se apoya en el enfoque conexionista: redes neuronales artificiales organizadas en capas que procesan la información de forma jerárquica. Las reglas y los motores de inferencia son del enfoque simbólico." },
    { ref: "9.2", tema: "Reconocimiento de patrones", q: "¿Qué mostró el experimento de Google Brain de 2012 con gatos?",
      ops: ["Aprende patrones sin etiquetas previas.", "Comprende qué es un gato en realidad.", "Razona con reglas sobre los gatos."],
      porque: "Una red neuronal aprendió a identificar y agrupar gatos en videos de YouTube sin supervisión previa: puede aprender patrones de datos no estructurados, pero eso no es comprender." },
    { ref: "9.2", tema: "Reconocer y comprender", q: "Un sistema clasifica una grieta en la foto de un puente. ¿Qué nivel alcanzó?",
      ops: ["Reconocer el patrón.", "Comprender su causa.", "Deducir por reglas."],
      porque: "Reconoció un patrón. Detectar, reconocer el patrón y comprender la causa son tres niveles distintos: confundir reconocer con comprender es un error típico." },

    /* 9.3 · patrones en acción */
    { ref: "9.3", tema: "Patrones en acción", q: "¿Qué hace la visión artificial en la inspección de calidad?",
      ops: ["Compara imágenes y detecta anomalías.", "Revisa piezas a ojo, una por una.", "Aplica reglas si–entonces a cada pieza."],
      porque: "Compara patrones de imagen en milisegundos y detecta anomalías microscópicas. Antes, operarios revisaban a ojo cada pieza de la línea." },
    { ref: "9.3", tema: "Patrones en acción", q: "¿Qué hacen los modelos en el diagnóstico por imágenes médicas?",
      ops: ["Asisten marcando signos tempranos.", "Reemplazan al radiólogo.", "Aplican un checklist de normas."],
      porque: "Asisten marcando signos tempranos de enfermedad, pero el diagnóstico sigue siendo profesional. Aplicar un checklist de normas es del razonamiento simbólico." },
    { ref: "9.3", tema: "Patrones en acción", q: "¿Cómo detectan fraude bancario los algoritmos de patrones?",
      ops: ["Buscan consumos anómalos en tiempo real.", "Revisan reportes de movimientos a mano.", "Aplican una lista de requisitos."],
      porque: "Detectan consumos anómalos en tiempo real sobre millones de transacciones. Antes, los analistas revisaban reportes buscando conductas sospechosas." },

    /* 9.4 · razonamiento simbólico básico */
    { ref: "9.4", tema: "Razonamiento simbólico", q: "En un sistema experto, ¿qué componente aplica las reglas que se cumplen?",
      ops: ["El motor de inferencia.", "La traza del sistema.", "Los hechos conocidos del caso."],
      porque: "El motor de inferencia aplica las reglas que se cumplen a los hechos y llega a una conclusión. La traza registra qué regla produjo el resultado." },
    { ref: "9.4", tema: "Razonamiento simbólico", q: "En un sistema experto, ¿qué es la traza?",
      ops: ["La regla que produjo el resultado.", "El conjunto de hechos del caso.", "La conclusión del sistema."],
      porque: "La traza dice qué regla produjo el resultado, por eso el sistema es auditable. Los hechos son lo que se sabe del caso y la conclusión es lo que se deduce." },
    { ref: "9.4", tema: "Razonamiento simbólico", q: "¿Cuál es un límite del razonamiento simbólico?",
      ops: ["Es difícil de mantener al crecer.", "Oculta cómo llegó a su conclusión.", "Necesita enormes cantidades de datos."],
      porque: "Requiere conocimiento explícito, se vuelve difícil de mantener cuando crecen las reglas y no maneja bien la incertidumbre. Sus conclusiones sí se explican con la regla aplicada." },
    { ref: "9.4", tema: "Regla y patrón", q: "¿Qué distingue a una regla explícita de un patrón aprendido?",
      ops: ["La regla la programa alguien.", "La regla se estima con ejemplos.", "El patrón lo escribe un experto."],
      porque: "La regla es un criterio programado por alguien; el patrón es una regularidad que el sistema estimó a partir de ejemplos." },

    /* 9.5 · razonamiento simbólico en acción */
    { ref: "9.5", tema: "Reglas en acción", q: "¿Qué hace un motor de reglas en la elegibilidad crediticia?",
      ops: ["Aplica si–entonces para aprobar o rechazar.", "Aprende de millones de historiales.", "Compara imágenes de cada solicitud."],
      porque: "Aplica la lógica si–entonces a ingresos, historial y garantías. Antes, un analista revisaba la lista de requisitos." },
    { ref: "9.5", tema: "Reglas en acción", q: "¿Para qué sirve versionar las reglas que codifican normativa?",
      ops: ["Saber qué versión produjo cada resultado.", "Hacer que las reglas aprendan solas.", "Reducir la cantidad de reglas activas."],
      porque: "Hay que saber qué versión de la regla produjo cada resultado y desde cuándo rige. Sin eso el sistema deja de ser auditable." },

    /* 9.6 · aprendizaje por experiencia */
    { ref: "9.6", tema: "Aprendizaje por experiencia", q: "¿Cómo aprende una red neuronal con la experiencia?",
      ops: ["Ajustando sus pesos internos.", "Escribiendo nuevas reglas.", "Guardando cada caso recibido."],
      porque: "Aprender es ajustar iterativamente los pesos internos a partir de grandes volúmenes de datos. Guardar casos es memoria, y las reglas las escribe una persona." },
    { ref: "9.6", tema: "Aprendizaje por experiencia", q: "¿Qué fue el combustible del aprendizaje automático moderno?",
      ops: ["El big data.", "La lógica formal.", "Los sistemas expertos."],
      porque: "El big data aportó el combustible para entrenar modelos que aprenden patrones, predicen y mejoran con la experiencia. Fue un cambio de paradigma frente a las reglas fijas." },
    { ref: "9.6", tema: "Memoria y aprendizaje", q: "Un sistema solo guarda el historial de incidencias. ¿Qué hace?",
      ops: ["Memoria, no aprendizaje.", "Aprendizaje por experiencia.", "Razonamiento simbólico."],
      porque: "La memoria conserva y recupera; el aprendizaje modifica el modelo a partir de resultados confirmados." },

    /* 9.7 · aprendizaje por experiencia en acción */
    { ref: "9.7", tema: "Aprendizaje en acción", q: "¿Cómo mejoran los recomendadores de productos?",
      ops: ["Aprenden de millones de historiales.", "Siguen la intuición de un vendedor.", "Bloquean remitentes a mano."],
      porque: "Los recomendadores aprenden de millones de historiales de compra y mejoran con cada interacción. Antes un vendedor sugería productos según su intuición." },
    { ref: "9.7", tema: "Aprendizaje en acción", q: "¿De dónde aprende el mantenimiento predictivo?",
      ops: ["De datos históricos de sensores.", "De un calendario fijo de revisión.", "De las reglas del fabricante."],
      porque: "Aprende de datos históricos de sensores y anticipa fallas. Antes las inspecciones eran periódicas y fijas, siguiendo un calendario." },
    { ref: "9.7", tema: "Aprendizaje en acción", q: "¿Cómo se ajusta un filtro moderno de correo no deseado?",
      ops: ["Aprende de los correos marcados.", "Bloquea palabras clave a mano.", "Aplica reglas escritas una a una."],
      porque: "Aprende de los correos que los usuarios marcan como spam y gana precisión. Empezó como reglas escritas a mano y terminó como aprendizaje por experiencia." },

    /* 9.8 · los tres enfoques, lado a lado */
    { ref: "9.8", tema: "Los tres enfoques", q: "¿Qué se audita en el razonamiento simbólico?",
      ops: ["La regla exacta aplicada.", "El desempeño medido.", "Los datos de entrenamiento."],
      porque: "La regla exacta que se aplicó. En el reconocimiento de patrones se audita el desempeño medido (precisión, falsos positivos) y en el aprendizaje, con qué datos y versión se entrenó." },
    { ref: "9.8", tema: "Los tres enfoques", q: "¿Qué pasa con los tres enfoques en la práctica?",
      ops: ["Se combinan en un mismo sistema.", "Se usa uno solo por proyecto.", "Se reemplazan unos a otros."],
      porque: "Casi nunca van solos: un sistema de fraude reconoce un patrón anómalo, aplica reglas antes de alertar y aprende de los casos que los analistas confirman." },

    /* 9.9 · patrones en tiempo real */
    { ref: "9.9", tema: "Patrones en tiempo real", q: "¿Qué significa reconocer patrones en tiempo real?",
      ops: ["Detectar mientras los eventos se mueven.", "Detectar al día siguiente en un reporte.", "Detectar en un lote nocturno."],
      porque: "Es detectar regularidades, secuencias, anomalías o relaciones mientras los eventos todavía están en movimiento, no al día siguiente en un reporte." },
    { ref: "9.9", tema: "Patrones en tiempo real", q: "¿Cómo se arma una solución de patrones en tiempo real?",
      ops: ["Combinando varias piezas.", "Con una sola herramienta.", "Con un solo modelo."],
      porque: "No existe «la» herramienta: algo transporta los eventos, un motor los procesa en movimiento, reglas o modelos reconocen el patrón y un destino actúa." },

    /* 9.10 · mapa comparativo de las cuatro nubes */
    { ref: "9.10", tema: "Las cuatro nubes", q: "¿Qué motor de procesamiento usa AWS en su stack?",
      ops: ["Apache Flink.", "Dataflow con Apache Beam.", "Stream Analytics."],
      porque: "AWS usa Kinesis para ingestar, Managed Service for Apache Flink para procesar y SageMaker u OpenSearch para patrones. Dataflow es de Google y Stream Analytics, de Azure." },

    /* 9.11 · las cuatro nubes en detalle */
    { ref: "9.11", tema: "AWS", q: "¿Cómo cobra Flink en AWS?",
      ops: ["Por KPU por segundo.", "Por unidad de streaming.", "Por vCPU y memoria."],
      porque: "Flink cobra por KPU-segundo (1 KPU es 1 vCPU y 4 GB de RAM). La unidad de streaming es de Azure, y vCPU y memoria son la facturación de Dataflow en Google." },
    { ref: "9.11", tema: "Google Cloud", q: "¿Qué permite Apache Beam en Dataflow?",
      ops: ["Un mismo modelo para batch y streaming.", "Procesar solo eventos de IoT.", "Correr consultas solo en SQL."],
      porque: "Beam permite un mismo modelo para batch y streaming, con autoescalado y portabilidad. Dataflow ejecuta pipelines con ventanas, triggers y estado." },
    { ref: "9.11", tema: "Azure", q: "¿Qué ventaja tiene Azure Stream Analytics?",
      ops: ["Usa SQL con ventanas y lógica temporal.", "Usa pipelines visuales de Oracle.", "Usa procesamiento con Flink y KPU."],
      porque: "Tiene barrera de entrada baja para equipos que ya saben SQL, con integración IoT, ventanas y funciones geoespaciales. Los pipelines visuales son de Oracle." },
    { ref: "9.11", tema: "Oracle", q: "¿En qué es fuerte Oracle Stream Analytics?",
      ops: ["Correlación visual y temporal.", "Autoescalado con Apache Beam.", "SQL con integración IoT de Azure."],
      porque: "Es fuerte en correlación visual, patrones espaciales y temporales, y en empresas que ya usan Oracle Database y GoldenGate." },

    /* 9.12 · herramientas de la nube para cada pilar */
    { ref: "9.12", tema: "Herramientas por pilar", q: "¿Qué servicio de AWS ofrece modelos fundacionales para clasificar o razonar?",
      ops: ["Amazon Bedrock.", "Amazon Personalize.", "BigQuery ML."],
      porque: "Amazon Bedrock (2023). Personalize es de recomendaciones y BigQuery ML es de Google. En términos generales: AWS tiene el catálogo más amplio, GCP lidera en analítica, Azure en integración empresarial y Oracle en cargas críticas." },

    /* 9.13 · patrón de implementación en cinco pasos */
    { ref: "9.13", tema: "Implementar en cinco pasos", q: "¿Cuál es el primer paso para armar un proyecto de patrones en tiempo real?",
      ops: ["Definir el evento.", "Ingestar los datos.", "Evaluar el patrón."],
      porque: "Se define el evento: esquema, clave, marca de tiempo, calidad y retención. Después se ingesta, se extraen señales, se evalúa el patrón y se responde." },
    { ref: "9.13", tema: "Implementar en cinco pasos", q: "¿Qué paso aplica reglas, anomalías estadísticas o inferencia de ML?",
      ops: ["Evaluar el patrón.", "Extraer señales.", "Responder."],
      porque: "Evaluar el patrón es donde se cruzan los pilares: las reglas son razonamiento simbólico; las anomalías y la inferencia de ML, reconocimiento de patrones aprendidos." },
    { ref: "9.13", tema: "Implementar en cinco pasos", q: "¿Qué paso es la alerta, el bloqueo, el ticket o el dashboard?",
      ops: ["Responder.", "Ingestar.", "Extraer señales."],
      porque: "Responder es el último paso: alerta, bloqueo, ticket, dashboard o actualización de una base. Extraer señales arma ventanas, agregados y variables." },

    /* 9.14 · dónde aparece el valor en segundos */
    { ref: "9.14", tema: "Valor en segundos", q: "¿Qué señales mira la detección de fraude transaccional?",
      ops: ["Velocidad, ubicación y desvío histórico.", "Clics, abandono e intención.", "Jitter, errores y saturación."],
      porque: "Mira secuencias, velocidad, dispositivo, ubicación y desvío histórico. Clics e intención son de la experiencia digital; jitter y saturación, de la operación de red." },
    { ref: "9.14", tema: "Valor en segundos", q: "¿Qué mira el monitoreo de la operación de red en telecomunicaciones?",
      ops: ["Telemetría, jitter y saturación.", "Trayectoria y permanencia.", "Logins, IP y privilegios."],
      porque: "Mira telemetría, jitter, errores, saturación y anomalías por sitio. La trayectoria es de las geocercas y los logins, de la ciberseguridad." },

    /* 9.15 · costos sin comparaciones engañosas */
    { ref: "9.15", tema: "Costos en la nube", q: "¿Cuántas horas al mes se modela para comparar el costo de dos nubes?",
      ops: ["730, un mes entero encendido.", "160, la jornada laboral.", "24, un día de prueba."],
      porque: "Se modela el mismo escenario durante 730 horas al mes y se suman ingesta, motor, almacenamiento y observabilidad." },
    { ref: "9.15", tema: "Costos en la nube", q: "¿Qué margen conviene sumar por picos y reprocesamientos?",
      ops: ["Entre 20 y 30 por ciento.", "Entre 2 y 3 por ciento.", "Entre 60 y 70 por ciento."],
      porque: "Un 20 a 30 por ciento de margen por picos y reprocesamientos, para no quedarse corto en la estimación." },
    { ref: "9.15", tema: "Costos en la nube", q: "¿Qué costo suele quedar sin mirar al elegir una nube?",
      ops: ["El egreso de datos.", "La ingesta de eventos.", "El almacenamiento de datos."],
      porque: "El egreso (cruce de región, salida a internet y servicios de destino). Las otras tres variables son el volumen, el cómputo y la persistencia; se compara el costo total (TCO), no el precio unitario." },

    /* 9.16 · cuál elegir según el contexto */
    { ref: "9.16", tema: "Elegir una nube", q: "¿Qué nube encaja mejor con una empresa que usa Oracle Database y GoldenGate?",
      ops: ["Oracle Cloud.", "Google Cloud.", "Amazon Web Services."],
      porque: "Oracle encaja mejor con Oracle DB y GoldenGate. Azure, con empresas Microsoft e IoT; GCP, con datos y ML; AWS, con su propio ecosistema." },
    { ref: "9.16", tema: "Elegir una nube", q: "¿Qué herramienta conviene elegir según el criterio de selección?",
      ops: ["La que mejor encaja con el caso.", "La que tiene más funciones.", "La que tiene menor precio."],
      porque: "La que mejor encaja: menos movimiento de datos y competencias del equipo, con latencia, gobierno y costo total que se cumplen. La más poderosa no es la mejor." },

    /* 9.17 · cierre: de evento a decisión */
    { ref: "9.17", tema: "De evento a decisión", q: "¿Qué se recomienda construir antes de comprometerse con una nube?",
      ops: ["Una prueba de concepto con carga real.", "Una licitación entre proveedores.", "Un contrato anual de uso exclusivo."],
      porque: "Una prueba de concepto con una carga real, midiendo latencia, precisión, costo por millón de eventos y comportamiento ante una falla." },
    { ref: "9.17", tema: "De evento a decisión", q: "¿Qué debe definir el gobierno de un proyecto en tiempo real?",
      ops: ["Esquema, observabilidad y reproceso.", "Precio por GB y por hora.", "Cantidad de eventos por mes."],
      porque: "Esquema, observabilidad, posibilidad de reprocesar (replay), privacidad, sesgo y respuesta humana. El precio y el volumen son parte de la elección y del costo." }
  ]
});
