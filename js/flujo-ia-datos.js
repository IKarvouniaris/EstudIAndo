/* Armá el flujo (flujo-ia.html): los datos del juego. El motor está en js/flujo-ia.js.
   Se arma un flujo para automatizar un proceso enlazando cajas en un pizarrón con cuatro carriles
   (Entrada, Proceso, Decisión, Control). Las cajas salen de lo visto para el 2.º parcial de Intro a la IA
   (ia-conceptual.html, clases 7 a 12) y las situaciones, del simulacro escrito (tools/situaciones_ia_p2.json).

   cajas: [id, familia, título, subtítulo, ref del apunte] y, si es una TRAMPA, un sexto elemento con el porqué.
          Las trampas son errores típicos que el apunte marca; se mezclan sin marca con las demás cajas.
   situaciones[].modelo: la solución modelo. n = [caja, carril 0..3, fila 0..4], e = [[desde, hasta]].
   situaciones[].crit: lo que se revisa. Cada criterio tiene t (qué se pide), p (el porqué) y r (apartado del apunte) y
          UNA condición:
            todas:[ids]   están puestas todas esas cajas
            alguna:[ids]  está puesta al menos una
            antes:[[A],[B]]  hay un camino de cables desde alguna de A hasta alguna de B
            cadena:[[A],[B],[C]]  A llega a B y B llega a C
          Un id puede ser «@fam» (por ejemplo «@hum»): cualquier caja de esa familia.
   entradas: las cajas que son SOLO de entrada (por dónde empieza un flujo): tienen círculo de salida y no de entrada,
          y no reciben cables. Todas las demás tienen los dos círculos: entrada a la izquierda y salida a la derecha.
   frases / seccion: cómo se escribe cada caja en la respuesta del parcial y en qué parte va (ver más abajo).
   Nivel «Baja»: el pizarrón muestra «fantasmas» (cajas punteadas) en el lugar de las cajas de la solución modelo que todavía faltan.
   Además de los criterios de cada situación, el motor revisa siempre que todas las cajas estén enlazadas y que no
   haya trampas. node tools/medir_flujo_ia.js comprueba que cada solución modelo apruebe todo. */
window.FLUJO_IA = {
  carriles: ["Entrada", "Proceso", "Decisión", "Control"],

  entradas: ["canal", "sensor", "observar", "evento", "datosmin", "planvuelo", "requisitos"],

  /* Cómo se escribe cada caja en la respuesta del parcial. El panel «Mi respuesta» arma el texto con estas frases, en el orden de los cables.
     Son cláusulas impersonales («se …», «un modelo …») para que sigan a «Primero», «Luego», «Finalmente». */
  frases: {
    observar: "se observa el proceso actual: tareas, tiempos y excepciones",
    canal: "el pedido o la consulta entra por un canal (voz, chat o formulario)",
    sensor: "se captura la señal de forma controlada con una cámara o un sensor",
    digitalizar: "se digitaliza lo que está en papel o disperso",
    ocr: "un OCR extrae el texto de los documentos",
    preproc: "se preprocesa la entrada para que llegue siempre normalizada",
    calidad: "se controla la calidad de los datos: limpiar, completar o descartar",
    repo: "los datos se guardan en un repositorio único con trazabilidad",
    evento: "se define el evento: esquema y marca de tiempo",
    ingesta: "los datos se ingieren al sistema",
    base: "se consulta una base de conocimiento con información autorizada",
    datosmin: "se guardan solo los datos mínimos necesarios, protegidos y cifrados",
    memoria: "los casos se guardan estructurados, con síntomas, causa y solución",
    etiquetar: "se etiqueta la causa confirmada de cada fallo",
    planvuelo: "se planifica el vuelo: ruta y condiciones",
    captura: "se capturan las imágenes",
    requisitos: "se parte de los requisitos del diseño: cargas, normas y límites",
    agregado: "se analiza de forma agregada, sin apuntar a personas",
    estandarizar: "se estandariza el proceso: una sola forma de hacerlo",
    sinvalor: "se eliminan los pasos que no aportan valor antes de automatizar",
    validar: "se validan los datos con reglas explícitas",
    motor: "un motor de reglas si–entonces aplica el criterio o la normativa definidos",
    excepcion: "los casos previstos que no siguen la regla se tratan como excepciones aparte",
    umbral: "un umbral decide la salida: aprobar, rechazar o derivar a revisión",
    versionado: "las reglas están versionadas, con vigencia, pruebas y aprobación",
    cola: "las excepciones van a una cola que resuelven personas",
    impacto: "se clasifica el impacto (bajo, medio o alto) para ajustar el nivel de control",
    alerta: "se emite una alerta priorizada",
    riesgofin: "una regla de riesgo detecta operaciones monetarias, sospecha de fraude o pedidos fuera de alcance",
    reconciliar: "las recomendaciones en conflicto se reconcilian con criterios definidos de antemano",
    prioridad: "se asigna una prioridad según el vencimiento y el tipo de trámite",
    subsanar: "si falta documentación se pide subsanar: no se rechaza ni se aprueba",
    ticket: "la mesa de ayuda abre un ticket",
    normativo: "se verifica el cumplimiento normativo con reglas explícitas",
    voz: "un reconocimiento de voz convierte el audio en texto",
    intencion: "se identifica la intención de la consulta",
    vision: "un modelo de visión reconoce patrones en las imágenes (IA estrecha: una sola tarea)",
    clasif: "un clasificador asigna categoría y prioridad",
    anomalias: "un modelo detecta anomalías o conductas atípicas",
    prediccion: "un modelo predice demanda, riesgo o fallas",
    traduccion: "una traducción automática pasa el mensaje de idioma",
    respuesta: "se entrega la respuesta",
    recomendador: "el sistema propone una recomendación, pero no decide",
    aprendizaje: "el modelo aprende de los casos confirmados",
    historia: "un módulo analiza el texto clínico",
    similares: "se buscan en la memoria casos similares al problema nuevo",
    geolocalizar: "se geolocaliza cada hallazgo en el mapa",
    generar: "el sistema genera alternativas de diseño",
    revision: "una persona revisa los casos dudosos",
    muestreo: "se revisa una muestra del total y todos los casos críticos",
    aprobar: "una persona aprueba o anula antes de que se ejecute",
    escalar: "se escala a una persona con el contexto del caso",
    parada: "hay una parada segura que frena el sistema o pasa a control manual",
    junta: "una junta profesional toma la decisión",
    analista: "un analista cierra el caso de forma documentada",
    capacitar: "se capacita al equipo en datos y verificación",
    tecnico: "el técnico diagnostica, actúa y cierra el caso",
    curar: "se revisa y actualiza el repositorio cada tanto",
    ordenvisita: "se emite una orden de visita para un inspector",
    inspector: "un inspector profesional cierra el caso en el lugar",
    aprobmultiple: "la autorización requiere la aprobación de varias personas",
    precision: "se mide la precisión y el recall por tipo de caso",
    falsos: "se miden los falsos positivos y falsos negativos y lo que cuesta cada error",
    kpi: "se mide el tiempo de atención como KPI",
    correccion: "se mide la tasa de corrección: cuánto corrige la persona",
    grupos: "se evalúa el desempeño por grupos para ver la equidad",
    confianza: "se mide el nivel de confianza y se escala si es bajo",
    costo: "se estima el costo total (TCO) del caso completo",
    derivhum: "se mide cuánto se deriva a una persona",
    deriva: "se vigila la deriva para decidir cuándo reentrenar",
    capacidad: "se vigilan los saltos súbitos de capacidad",
    eludir: "se vigilan los intentos de eludir los controles",
    trazabilidad: "se garantiza la trazabilidad: quién hizo qué",
    registro: "cada decisión queda registrada para auditar y mejorar",
    explicacion: "se explican las variables y las reglas que llevaron a la decisión",
    alcance: "se acota el alcance: qué entra y qué queda afuera",
    limites: "se fijan límites de acción: recomendar no es autorizar",
    degradado: "hay un modo degradado, con control local, ante fallas",
    piloto: "se prueba primero en un piloto controlado",
    pruebas: "se prueba en un entorno controlado antes de producción",
    redteam: "se hacen pruebas adversas y de fallas simultáneas",
    continuidad: "hay un plan de continuidad y recuperación ante fallas",
    apelacion: "existe un canal de apelación para rectificar una decisión",
    auditoria: "se audita cada tanto los datos, los accesos y los sesgos",
    monitoreo: "se monitorea el sistema y se lo puede retirar",
    validacion: "se valida con datos separados por períodos, probando hacia el futuro",
    simulacion: "los diseños se simulan bajo cargas y escenarios",
    fueradist: "se prueba con casos inéditos y extremos (fuera de distribución)",
    sandbox: "el sistema se aísla en un entorno cerrado (sandbox)",
    limrec: "se limitan los recursos de cómputo y energía",
    reversion: "todo lo que se autoriza puede revertirse",
    apagado: "hay un apagado independiente del sistema",
    proporcionalidad: "se evalúa la necesidad y la proporcionalidad antes de desplegar"
  },

  /* Qué parte de la respuesta ocupa cada caja: «proceso» es «Aplicación al proceso» y «control» es «Diseño y control».
     Por defecto: captura, IA y reglas van en proceso; humano, métricas y gobierno, en control. Estas son las excepciones. */
  seccion: {
    datosmin: "control", versionado: "control", riesgofin: "control", reconciliar: "control",
    tecnico: "proceso", ordenvisita: "proceso"
  },

  familias: [
    { id: "cap", t: "Captura y datos", carril: 0 },
    { id: "ia",  t: "IA",              carril: 1 },
    { id: "reg", t: "Reglas",          carril: 2 },
    { id: "hum", t: "Humano",          carril: 3 },
    { id: "met", t: "Métricas",        carril: 3 },
    { id: "gob", t: "Gobierno",        carril: 3 }
  ],

  cajas: [
    /* Captura y datos */
    ["observar", "cap", "Observar el proceso", "tareas, tiempos, excepciones", "7.3"],
    ["canal", "cap", "Canal de entrada", "voz, chat o formulario", "7.9"],
    ["sensor", "cap", "Cámara o sensor", "captura la señal controlada", "7.1"],
    ["digitalizar", "cap", "Digitalizar", "papel y datos a digital", "7.3"],
    ["ocr", "cap", "OCR", "extrae el texto", "7.4"],
    ["preproc", "cap", "Preprocesar", "normaliza la entrada", "9.13"],
    ["calidad", "cap", "Control de calidad", "limpiar, completar, descartar", "7.5"],
    ["repo", "cap", "Repositorio único", "datos con trazabilidad", "7.4"],
    ["evento", "cap", "Definir el evento", "esquema y marca de tiempo", "9.13"],
    ["ingesta", "cap", "Ingestar datos", "llegan al sistema", "9.13"],
    ["base", "cap", "Base de conocimiento", "información autorizada", "7.1"],
    ["datosmin", "cap", "Datos mínimos", "solo los necesarios, cifrados", "7.12"],
    /* Reglas */
    ["estandarizar", "reg", "Estandarizar", "una sola forma de hacerlo", "10.9"],
    ["sinvalor", "reg", "Eliminar pasos sin valor", "no automatizar lo que sobra", "12.9"],
    ["validar", "reg", "Validar con reglas", "condiciones explícitas", "7.11"],
    ["motor", "reg", "Motor de reglas", "si–entonces auditable", "9.4"],
    ["excepcion", "reg", "Excepción aparte", "caso previsto fuera de la regla", "7.11"],
    ["umbral", "reg", "Umbral de decisión", "aprobar, rechazar o dudar", "10.5"],
    ["versionado", "reg", "Reglas versionadas", "qué versión produjo qué", "9.5"],
    ["cola", "reg", "Cola de excepciones", "las resuelve una persona", "7.10"],
    ["impacto", "reg", "Clasificar por impacto", "bajo, medio o alto", "12.13"],
    ["alerta", "reg", "Alerta priorizada", "lo más urgente primero", "9.14"],
    ["riesgofin", "reg", "Regla de riesgo", "dinero, fraude o fuera de alcance", "12.13"],
    ["reconciliar", "reg", "Reconciliar conflictos", "cuando dos propuestas chocan", "12.13"],
    /* IA */
    ["voz", "ia", "Reconocer voz", "audio a texto", "7.1"],
    ["intencion", "ia", "Identificar intención", "qué pide la persona", "10.8"],
    ["vision", "ia", "Modelo de visión", "reconoce patrones en imágenes", "9.2"],
    ["clasif", "ia", "Clasificador", "categoría y prioridad", "7.4"],
    ["anomalias", "ia", "Detectar anomalías", "conducta o consumo atípico", "9.3"],
    ["prediccion", "ia", "Predicción", "demanda, riesgo o fallas", "12.1"],
    ["traduccion", "ia", "Traducción automática", "texto o voz entre idiomas", "11.3"],
    ["respuesta", "ia", "Entregar respuesta", "redacta y contesta", "7.4"],
    ["recomendador", "ia", "Recomendar", "propone, no decide", "10.8"],
    ["aprendizaje", "ia", "Aprender de casos", "mejora con los confirmados", "9.6"],
    ["historia", "ia", "Analizar texto clínico", "lenguaje de las historias", "10.8"],
    /* Humano */
    ["revision", "hum", "Revisión humana", "una persona revisa", "7.5"],
    ["muestreo", "hum", "Muestreo de revisión", "una fracción del total", "7.12"],
    ["aprobar", "hum", "Aprobar o anular", "la persona autoriza", "7.5"],
    ["escalar", "hum", "Escalar a una persona", "con el contexto del caso", "7.12"],
    ["parada", "hum", "Parada segura", "frena o pasa a manual", "12.7"],
    ["junta", "hum", "Junta profesional", "especialistas deciden", "10.8"],
    ["analista", "hum", "Analista cierra el caso", "con registro documentado", "8.11"],
    ["capacitar", "hum", "Capacitar al equipo", "datos y verificación", "12.5"],
    /* Métricas */
    ["precision", "met", "Precisión y recall", "por tipo de caso", "11.3"],
    ["falsos", "met", "Falsos positivos", "y falsos negativos", "10.6"],
    ["kpi", "met", "Tiempo de atención", "KPI de la fila", "7.10"],
    ["correccion", "met", "Tasa de corrección", "cuánto corrige la persona", "8.11"],
    ["grupos", "met", "Desempeño por grupos", "equidad entre subgrupos", "8.11"],
    ["confianza", "met", "Nivel de confianza", "umbral de baja confianza", "7.12"],
    ["costo", "met", "Costo total (TCO)", "volumen, cómputo y egreso", "9.15"],
    ["derivhum", "met", "Derivación humana", "cuánto se escala", "12.8"],
    /* Gobierno */
    ["trazabilidad", "gob", "Trazabilidad", "quién hizo qué", "7.9"],
    ["registro", "gob", "Registro de decisiones", "para auditar y mejorar", "7.5"],
    ["explicacion", "gob", "Explicar la decisión", "variables y reglas", "8.14"],
    ["alcance", "gob", "Alcance acotado", "qué entra y qué no", "11.8"],
    ["limites", "gob", "Límites de acción", "recomendar no es autorizar", "8.14"],
    ["degradado", "gob", "Modo degradado", "control local ante fallas", "7.13"],
    ["piloto", "gob", "Piloto controlado", "beta con pocos casos", "7.13"],
    ["pruebas", "gob", "Pruebas controladas", "antes de producción", "7.5"],
    ["redteam", "gob", "Pruebas adversas", "ataques y fallas simultáneas", "12.7"],
    ["continuidad", "gob", "Plan de continuidad", "recuperación ante fallas", "7.13"],
    ["apelacion", "gob", "Canal de apelación", "rectificar una decisión", "7.1"],
    ["auditoria", "gob", "Auditoría", "datos, accesos y sesgos", "11.8"],
    ["monitoreo", "gob", "Monitoreo y retiro", "poder apagar el sistema", "12.7"],
    /* Cajas que piden las situaciones 1 a 18 completas */
    ["memoria", "cap", "Memoria de casos", "síntomas, causa y solución", "7.1"],
    ["etiquetar", "cap", "Etiquetar la causa", "fallo confirmado", "9.6"],
    ["planvuelo", "cap", "Plan de vuelo", "ruta y condiciones", "7.9"],
    ["captura", "cap", "Capturar imágenes", "dron sobre el puente", "7.1"],
    ["requisitos", "cap", "Requisitos del diseño", "cargas, normas y límites", "10.1"],
    ["agregado", "cap", "Análisis agregado", "sin apuntar a personas", "8.12"],
    ["prioridad", "reg", "Asignar prioridad", "según vencimiento y tipo", "7.11"],
    ["subsanar", "reg", "Pedir subsanación", "falta documentación", "7.11"],
    ["ticket", "reg", "Abrir ticket", "la mesa de ayuda registra", "8.4"],
    ["normativo", "reg", "Chequeo normativo", "reglas de construcción", "9.5"],
    ["similares", "ia", "Buscar casos similares", "memoria vectorial", "7.1"],
    ["geolocalizar", "ia", "Geolocalizar", "ubica en el mapa", "9.14"],
    ["generar", "ia", "Generar alternativas", "propone diseños", "11.5"],
    ["tecnico", "hum", "Técnico en campo", "diagnostica, actúa y cierra", "8.4"],
    ["curar", "hum", "Curar el repositorio", "validar y actualizar", "8.4"],
    ["ordenvisita", "hum", "Orden de visita", "va un inspector", "8.11"],
    ["inspector", "hum", "Inspector profesional", "cierra el caso en sitio", "10.8"],
    ["aprobmultiple", "hum", "Aprobación múltiple", "varias personas autorizan", "11.10"],
    ["deriva", "met", "Detectar deriva", "cuándo reentrenar", "8.9"],
    ["capacidad", "met", "Saltos de capacidad", "alarma de mejora súbita", "11.10"],
    ["eludir", "met", "Intentos de eludir", "controles y permisos", "11.10"],
    ["validacion", "gob", "Validación temporal", "probar hacia el futuro", "12.7"],
    ["simulacion", "gob", "Simular el diseño", "cargas y escenarios", "12.7"],
    ["fueradist", "gob", "Pruebas fuera de rango", "casos inéditos y extremos", "11.2"],
    ["sandbox", "gob", "Aislamiento (sandbox)", "entorno cerrado", "12.7"],
    ["limrec", "gob", "Límite de recursos", "cómputo y energía", "11.7"],
    ["reversion", "gob", "Reversión", "poder volver atrás", "12.7"],
    ["apagado", "gob", "Apagado independiente", "otro canal lo detiene", "12.7"],
    ["proporcionalidad", "gob", "Necesidad y proporción", "¿hace falta? ¿es medido?", "8.14"],
    /* Trampas: errores típicos que marca el apunte */
    ["sancionar", "reg", "Sancionar automáticamente", "sin pasar por una persona", "8.13",
      "Un hallazgo del modelo es una señal para revisar, no un veredicto: acusar o sancionar exige revisión humana."],
    ["decidirsolo", "ia", "Decidir sin revisión", "la IA resuelve sola", "8.11",
      "Las decisiones que afectan derechos, salud o dinero no se delegan en una salida automática que no se pueda explicar."],
    ["llmregla", "ia", "Modelo de lenguaje", "para una condición explícita", "7.11",
      "Si una regla explícita alcanza, usar IA es más caro, más lento y no aporta nada."],
    ["diagnostico", "ia", "Diagnóstico autónomo", "sin profesional", "10.8",
      "La IA apoya, no sustituye el juicio clínico: el diagnóstico es del profesional."],
    ["reentrenar", "gob", "Reentrenar sin revisar", "con cada corrección", "10.10",
      "Las correcciones alimentan la mejora, pero se revisan antes de reentrenar: también pueden traer errores."],
    ["todoslosdatos", "cap", "Usar todos los datos", "aunque no hagan falta", "7.5",
      "Hay que identificar los datos estrictamente necesarios y evitar recolectar lo que no se necesita."],
    ["copiar", "reg", "Copiar el proceso manual", "tal cual a una pantalla", "7.2",
      "Automatizar no es copiar el proceso manual: primero se revisa si cada paso es necesario."]
  ],

  /* Ejemplo que se mira antes de jugar: la situación 1 del simulacro, resuelta caja por caja. */
  demo: {
    id: 1, titulo: "Control visual de envases",
    rol: "Una empresa alimentaria no detecta de forma uniforme etiquetas torcidas y tapas ausentes con la inspección manual.",
    n: [
      ["sensor", 0, 1, "Primero se captura la señal de forma controlada: cámara, iluminación y posición en la línea."],
      ["preproc", 1, 0, "Se preprocesa la imagen antes de clasificar, para que el modelo vea siempre algo parecido."],
      ["vision", 1, 2, "Un modelo de visión reconoce patrones: etiqueta torcida, tapa ausente. Es IA estrecha: una sola tarea."],
      ["umbral", 2, 1, "Un umbral decide la salida: aprobar, rechazar o derivar a revisión."],
      ["revision", 3, 0, "Los dudosos van a una persona: el sistema no decide solo mientras no se probó."],
      ["precision", 3, 2, "Para decidir si puede intervenir en la línea se miden precisión y recall por tipo de defecto."],
      ["registro", 3, 4, "Cada decisión queda registrada para auditar. Listo: ahora te toca armar uno vos."]
    ],
    e: [["sensor", "preproc"], ["preproc", "vision"], ["vision", "umbral"], ["umbral", "revision"], ["umbral", "precision"], ["umbral", "registro"]]
  },

  situaciones: [
    /* ---------------------------------------------------------------- 1 · Baja */
    {
      id: 1, nivel: "Baja", titulo: "Control visual de envases",
      rol: "Una empresa alimentaria no detecta de forma uniforme etiquetas torcidas y tapas ausentes con la inspección manual.",
      mision: "Proponé un flujo desde la captura de imágenes hasta la clasificación de envases, y dos controles humanos o métricas para decidir si el sistema puede intervenir en la línea.",
      modelo: {
        n: [["sensor", 0, 1], ["preproc", 1, 0], ["vision", 1, 2], ["umbral", 2, 1], ["revision", 3, 0], ["precision", 3, 2], ["registro", 3, 4]],
        e: [["sensor", "preproc"], ["preproc", "vision"], ["vision", "umbral"], ["umbral", "revision"], ["umbral", "precision"], ["umbral", "registro"]]
      },
      crit: [
        { t: "Captura controlada de la imagen", todas: ["sensor"], r: "7.1",
          p: "La captura es controlada: cámara, iluminación y posición en la línea, para que la señal sea siempre comparable." },
        { t: "Preprocesa y después clasifica", cadena: [["sensor"], ["preproc"], ["vision", "clasif"]], r: "9.13",
          p: "La imagen se preprocesa antes de que un modelo o unas reglas clasifiquen el envase." },
        { t: "La salida tiene un umbral", antes: [["vision", "clasif"], ["umbral"]], r: "10.5",
          p: "Un umbral decide la salida: aprobar, rechazar o derivar a revisión." },
        { t: "Los casos dudosos pasan por una persona", antes: [["umbral"], ["revision", "muestreo"]], r: "7.5",
          p: "Antes de dejarlo actuar solo, los dudosos se revisan o se muestrean: es un control humano." },
        { t: "Mide el desempeño por tipo de defecto", alguna: ["precision", "falsos"], r: "11.3",
          p: "Precisión, recall y falsos rechazos por tipo de defecto dicen si el sistema puede intervenir en la línea." }
      ]
    },
    /* ---------------------------------------------------------------- 2 · Baja */
    {
      id: 2, nivel: "Baja", titulo: "Asistente de voz municipal",
      rol: "Un municipio quiere automatizar consultas sobre turnos, tasas y horarios con un asistente de voz.",
      mision: "Diseñá el proceso básico: recibir la consulta, identificar la intención y entregar la respuesta. Después, cómo derivarías a una persona las consultas ambiguas, nuevas o sensibles.",
      modelo: {
        n: [["canal", 0, 1], ["voz", 1, 0], ["intencion", 1, 2], ["base", 2, 0], ["respuesta", 2, 2], ["confianza", 2, 4], ["escalar", 3, 3], ["registro", 3, 1]],
        e: [["canal", "voz"], ["voz", "intencion"], ["intencion", "base"], ["base", "respuesta"], ["intencion", "confianza"], ["confianza", "escalar"], ["respuesta", "registro"]]
      },
      crit: [
        { t: "Recorre audio, voz e intención", cadena: [["canal"], ["voz"], ["intencion"]], r: "10.8",
          p: "El camino empieza con el audio, pasa por el reconocimiento de voz y llega a la identificación de la intención." },
        { t: "Consulta una base autorizada y responde", cadena: [["intencion"], ["base"], ["respuesta"]], r: "7.1",
          p: "Con la intención se busca en una base de información autorizada y se entrega la respuesta." },
        { t: "Registra la interacción", alguna: ["registro", "trazabilidad"], r: "7.9",
          p: "Cada interacción queda registrada para dar seguimiento y mejorar." },
        { t: "Mide la confianza y escala si es baja", antes: [["confianza"], ["escalar"]], r: "7.12",
          p: "La baja confianza, los intentos repetidos, la consulta fuera de catálogo o el dato sensible disparan el escalamiento." },
        { t: "Deriva a una persona con el contexto", antes: [["intencion", "base"], ["escalar"]], r: "7.12",
          p: "Quien recibe la derivación tiene que ver el contexto de la consulta, no empezar de cero." }
      ]
    },
    /* ---------------------------------------------------------------- 3 · Baja */
    {
      id: 3, nivel: "Baja", titulo: "Memoria de incidencias técnicas",
      rol: "Una compañía eléctrica quiere reutilizar el historial de fallos resueltos para asistir al personal de campo.",
      mision: "Proponé cómo usar las incidencias históricas para recomendar una solución probable, qué datos mínimos guardarías y cómo se verifica la recomendación antes de actuar.",
      modelo: {
        n: [["canal", 0, 1], ["datosmin", 0, 3], ["memoria", 1, 0], ["similares", 1, 2], ["recomendador", 2, 1], ["confianza", 2, 3], ["aprobar", 3, 1], ["registro", 3, 3]],
        e: [["canal", "similares"], ["datosmin", "memoria"], ["memoria", "similares"], ["similares", "recomendador"], ["recomendador", "confianza"], ["recomendador", "aprobar"], ["aprobar", "registro"]]
      },
      crit: [
        { t: "Estructura los casos históricos", todas: ["memoria"], r: "7.1",
          p: "Cada caso se guarda estructurado: síntomas, causa y solución." },
        { t: "Guarda solo los datos mínimos", todas: ["datosmin"], r: "7.12",
          p: "Equipo, fecha, síntomas, causa confirmada, acción y resultado: solo lo pertinente, no todo lo disponible." },
        { t: "Busca casos parecidos al problema nuevo", cadena: [["canal"], ["similares"], ["recomendador"]], r: "7.1",
          p: "Con el problema nuevo se recuperan casos similares y de ahí sale una solución probable." },
        { t: "La memoria alimenta la búsqueda", antes: [["memoria"], ["similares"]], r: "7.1",
          p: "Las memorias vectoriales recuperan contenido similar. El modelo no recuerda como una persona: calcula patrones." },
        { t: "Recomienda con un nivel de confianza", antes: [["recomendador"], ["confianza"]], r: "7.12",
          p: "La recomendación trae un nivel de confianza para saber cuánto fiarse de ella." },
        { t: "Un técnico valida antes de actuar", antes: [["recomendador"], ["aprobar", "revision"]], r: "7.5",
          p: "Quien está en el campo valida la recomendación antes de ejecutarla." }
      ]
    },
    /* ---------------------------------------------------------------- 4 · Baja */
    {
      id: 4, nivel: "Baja", titulo: "Traducción de atención sanitaria",
      rol: "Un hospital público orienta a pacientes extranjeros con traducción automática, sin sustituir decisiones clínicas.",
      mision: "Elegí qué mensajes administrativos automatizarías y cuáles dejarías afuera, y proponé una revisión humana para nombres, medicación y mensajes de alto impacto.",
      modelo: {
        n: [["canal", 0, 1], ["alcance", 1, 0], ["traduccion", 1, 2], ["impacto", 2, 1], ["respuesta", 2, 3], ["revision", 3, 2], ["registro", 3, 4]],
        e: [["canal", "alcance"], ["alcance", "traduccion"], ["traduccion", "impacto"], ["impacto", "respuesta"], ["impacto", "revision"], ["respuesta", "registro"]]
      },
      crit: [
        { t: "Define un alcance de bajo riesgo", todas: ["alcance"], r: "11.8",
          p: "Se automatiza la orientación (turnos, señalización, trámites) y se excluyen diagnóstico, consentimiento informado y prescripción." },
        { t: "Traduce el mensaje que llega", cadena: [["canal"], ["traduccion"]], r: "11.3",
          p: "Entra un mensaje, de voz o de texto, y la traducción automática lo pasa de idioma." },
        { t: "Clasifica el impacto del mensaje", antes: [["traduccion"], ["impacto"]], r: "12.13",
          p: "A mayor impacto, mayor control: el nivel de revisión se vincula con el impacto del mensaje." },
        { t: "Lo de alto impacto lo confirma una persona", antes: [["impacto"], ["revision", "junta", "aprobar"]], r: "7.14",
          p: "Nombres, dosis, alergias y decisiones clínicas los confirma un profesional o un intérprete." },
        { t: "Lo de bajo impacto se entrega directo", antes: [["impacto"], ["respuesta"]], r: "11.8",
          p: "Los mensajes de orientación de bajo riesgo se entregan sin demorarlos con una revisión." },
        { t: "Deja registro de lo que se tradujo", alguna: ["registro", "trazabilidad"], r: "7.9",
          p: "El registro permite auditar y corregir la traducción." }
      ]
    },
    /* ---------------------------------------------------------------- 5 · Baja */
    {
      id: 5, nivel: "Baja", titulo: "Reglas para priorizar solicitudes",
      rol: "Una aseguradora automatiza la clasificación inicial de solicitudes según documentación, vencimiento y tipo de trámite.",
      mision: "Armá una clasificación con reglas si–entonces que asignen prioridad sin aprobar nada de forma automática, y definí cómo se registran la regla aplicada, los datos de entrada y la decisión humana final.",
      modelo: {
        n: [["canal", 0, 1], ["validar", 1, 0], ["motor", 1, 2], ["prioridad", 2, 1], ["subsanar", 2, 3], ["versionado", 2, 4], ["analista", 3, 1], ["registro", 3, 3]],
        e: [["canal", "validar"], ["validar", "motor"], ["motor", "prioridad"], ["motor", "subsanar"], ["motor", "versionado"], ["prioridad", "analista"], ["analista", "registro"], ["versionado", "registro"]]
      },
      crit: [
        { t: "Aplica reglas si–entonces a la solicitud", antes: [["canal"], ["motor"]], r: "9.4",
          p: "La clasificación inicial usa reglas explícitas sobre documentación, vencimiento y tipo de trámite." },
        { t: "Asigna prioridad", antes: [["motor"], ["prioridad"]], r: "7.11",
          p: "Una regla del tipo «si vence pronto, entonces prioridad alta» ordena las solicitudes." },
        { t: "Pide subsanación si falta documentación", antes: [["motor"], ["subsanar"]], r: "7.11",
          p: "Cuando falta documentación, la regla pide subsanar; no rechaza ni aprueba." },
        { t: "No aprueba solo: decide una persona", antes: [["prioridad"], ["analista"]], r: "8.11",
          p: "Las reglas ordenan y la decisión final es de una persona." },
        { t: "Registra la regla aplicada y su versión", antes: [["versionado"], ["registro"]], r: "9.5",
          p: "El registro guarda los datos de entrada, la regla aplicada y qué versión de la regla estaba vigente." },
        { t: "Registra la decisión final y quién la tomó", antes: [["analista"], ["registro"]], r: "7.9",
          p: "La trazabilidad dice quién decidió y con qué información." }
      ]
    },
    /* ---------------------------------------------------------------- 6 · Baja */
    {
      id: 6, nivel: "Baja", titulo: "Equipo de mantenimiento distribuido",
      rol: "Una universidad pública resuelve averías con técnicos, sensores, manuales y una mesa de ayuda.",
      mision: "Diseñá un circuito de colaboración entre sensores, sistema de tickets y técnicos, con un mecanismo que mantenga una memoria organizacional de soluciones.",
      modelo: {
        n: [["sensor", 0, 1], ["ticket", 1, 0], ["base", 1, 2], ["tecnico", 2, 1], ["memoria", 2, 3], ["curar", 3, 3], ["registro", 3, 1]],
        e: [["sensor", "ticket"], ["ticket", "tecnico"], ["base", "tecnico"], ["tecnico", "memoria"], ["memoria", "curar"], ["tecnico", "registro"]]
      },
      crit: [
        { t: "El sensor alerta y la mesa abre el ticket", cadena: [["sensor"], ["ticket"]], r: "8.4",
          p: "Cognición distribuida material: los sensores y el sistema de tickets participan de la tarea, no solo las personas." },
        { t: "El manual aporta el procedimiento", antes: [["base"], ["tecnico"]], r: "8.4",
          p: "El conocimiento está repartido: el manual guarda el procedimiento y el técnico lo aplica." },
        { t: "El técnico recibe el ticket, actúa y cierra", antes: [["ticket"], ["tecnico"]], r: "8.4",
          p: "El técnico diagnostica, actúa y cierra el caso." },
        { t: "Lo resuelto va a una memoria de soluciones", antes: [["tecnico"], ["memoria"]], r: "8.4",
          p: "La distribución temporal: las decisiones de hoy dependen de lo aprendido y registrado antes." },
        { t: "Se revisa y actualiza el repositorio", antes: [["memoria"], ["curar"]], r: "8.4",
          p: "Sin una revisión periódica, el repositorio se desactualiza y deja de servir." }
      ]
    },
    /* ---------------------------------------------------------------- 7 · Media */
    {
      id: 7, nivel: "Media", titulo: "Fraude en compras públicas",
      rol: "Una agencia estatal debe detectar compras atípicas sin acusar automáticamente a proveedores ni funcionarios.",
      mision: "Diseñá un flujo híbrido que puntúe anomalías y aplique reglas antes de enviar alertas. Definí también la trazabilidad, la revisión humana y qué se hace con los falsos positivos.",
      modelo: {
        n: [["ingesta", 0, 1], ["calidad", 1, 0], ["anomalias", 1, 2], ["motor", 2, 1], ["alerta", 2, 3], ["analista", 3, 1], ["explicacion", 3, 3], ["apelacion", 3, 4]],
        e: [["ingesta", "calidad"], ["calidad", "anomalias"], ["anomalias", "motor"], ["motor", "alerta"], ["alerta", "analista"], ["alerta", "explicacion"], ["analista", "apelacion"]]
      },
      crit: [
        { t: "Ingesta con control de calidad", cadena: [["ingesta"], ["calidad"]], r: "7.5",
          p: "Antes de puntuar hay que ingerir los datos y controlar su calidad." },
        { t: "Puntúa anomalías y aplica reglas", cadena: [["calidad"], ["anomalias"], ["motor"]], r: "9.8",
          p: "Es un flujo híbrido: el modelo puntúa lo atípico y las reglas, por ejemplo los umbrales legales, se aplican antes de alertar." },
        { t: "Genera una alerta priorizada", antes: [["motor"], ["alerta"]], r: "9.14",
          p: "La alerta sale después de las reglas y pone lo más urgente primero." },
        { t: "Un analista cierra el caso", antes: [["alerta"], ["analista"]], r: "8.11",
          p: "Nadie es acusado por un modelo: un analista revisa y cierra el caso de forma documentada." },
        { t: "Explica qué disparó la alerta", alguna: ["explicacion", "trazabilidad"], r: "8.14",
          p: "La alerta muestra las variables y las reglas que la dispararon." },
        { t: "Prevé falsos positivos y rectificación", alguna: ["falsos", "apelacion"], r: "10.6",
          p: "Un falso positivo no puede quedar como culpa: tiene que poder rectificarse." }
      ]
    },
    /* ---------------------------------------------------------------- 8 · Media */
    {
      id: 8, nivel: "Media", titulo: "Aprendizaje en mantenimiento ferroviario",
      rol: "Una empresa ferroviaria registra vibración y temperatura con sensores, y los técnicos documentan causas y reparaciones.",
      mision: "Proponé un ciclo para aprender de los fallos confirmados y actualizar las alertas predictivas, con separación de datos, validación temporal y un criterio para reentrenar.",
      modelo: {
        n: [["sensor", 0, 1], ["tecnico", 0, 3], ["etiquetar", 1, 0], ["aprendizaje", 1, 2], ["validacion", 2, 1], ["prediccion", 2, 3], ["deriva", 3, 3]],
        e: [["sensor", "etiquetar"], ["tecnico", "etiquetar"], ["etiquetar", "aprendizaje"], ["aprendizaje", "validacion"], ["validacion", "prediccion"], ["prediccion", "tecnico"], ["prediccion", "deriva"], ["deriva", "aprendizaje"]]
      },
      crit: [
        { t: "Captura los datos de los sensores", antes: [["sensor"], ["etiquetar"]], r: "9.7",
          p: "El mantenimiento predictivo aprende de datos históricos de sensores." },
        { t: "Etiqueta la causa que confirmó el técnico", antes: [["tecnico"], ["etiquetar"]], r: "9.6",
          p: "Aprender exige resultados confirmados: no alcanza con guardar el historial." },
        { t: "Entrena con los casos confirmados", antes: [["etiquetar"], ["aprendizaje"]], r: "9.6",
          p: "El aprendizaje modifica el modelo a partir de resultados confirmados." },
        { t: "Valida hacia el futuro antes de desplegar", cadena: [["aprendizaje"], ["validacion"], ["prediccion"]], r: "12.7",
          p: "Se separan los datos por períodos o equipos y se prueba hacia adelante, no sobre lo ya visto." },
        { t: "Las alertas vuelven a alimentar el ciclo", antes: [["prediccion"], ["etiquetar"]], r: "9.6",
          p: "Cada alerta que un técnico confirma o descarta es una experiencia nueva para aprender." },
        { t: "Define cuándo reentrenar", antes: [["deriva"], ["aprendizaje"]], r: "8.9",
          p: "Se reentrena ante una deriva o cuando el desempeño cae bajo un umbral aprobado; adaptarse sin límites puede empeorar el modelo." }
      ]
    },
    /* ---------------------------------------------------------------- 9 · Media */
    {
      id: 9, nivel: "Media", titulo: "Atención bancaria multicanal",
      rol: "Un banco recibe voz, chat y formularios. El sistema debe resolver lo simple y escalar el resto.",
      mision: "Diseñá la orquestación entre voz, clasificación de intención, base de conocimiento y agente, con criterios de escalamiento por baja confianza, ambigüedad y riesgo financiero.",
      modelo: {
        n: [["canal", 0, 1], ["voz", 1, 0], ["intencion", 1, 2], ["base", 2, 0], ["respuesta", 3, 0], ["confianza", 2, 2], ["riesgofin", 2, 4], ["escalar", 3, 3]],
        e: [["canal", "voz"], ["voz", "intencion"], ["intencion", "base"], ["base", "respuesta"], ["intencion", "confianza"], ["intencion", "riesgofin"], ["confianza", "escalar"], ["riesgofin", "escalar"]]
      },
      crit: [
        { t: "Recorre canal, transcripción e intención", cadena: [["canal"], ["voz"], ["intencion"]], r: "7.1",
          p: "Percepción: recibir voz o texto. Lenguaje: interpretar la consulta." },
        { t: "Busca en la base y responde", cadena: [["intencion"], ["base"], ["respuesta"]], r: "7.1",
          p: "La base de conocimiento conserva el contexto y el conocimiento autorizado; el recorrido termina en una respuesta." },
        { t: "Escala por baja confianza", antes: [["confianza"], ["escalar"]], r: "7.12",
          p: "La baja confianza o la ambigüedad escalan a un agente." },
        { t: "Escala por riesgo financiero", antes: [["riesgofin"], ["escalar"]], r: "12.13",
          p: "Operaciones monetarias, sospecha de fraude o pedidos fuera de alcance escalan por riesgo financiero." },
        { t: "El agente recibe el contexto", antes: [["base", "intencion"], ["escalar"]], r: "7.12",
          p: "La transferencia conserva el historial: el agente no empieza de cero." }
      ]
    },
    /* ---------------------------------------------------------------- 10 · Media */
    {
      id: 10, nivel: "Media", titulo: "Diagnóstico visual de infraestructura",
      rol: "Una empresa vial usa drones para fotografiar puentes, localizar grietas y priorizar inspecciones presenciales.",
      mision: "Diseñá el proceso desde la captura hasta la orden de inspección, con geolocalización, un muestreo de revisión y la regla de que un caso no se cierra sin un inspector.",
      modelo: {
        n: [["planvuelo", 0, 1], ["captura", 1, 0], ["calidad", 1, 2], ["vision", 2, 0], ["geolocalizar", 2, 2], ["clasif", 2, 4], ["inspector", 3, 1], ["ordenvisita", 3, 3], ["muestreo", 3, 4]],
        e: [["planvuelo", "captura"], ["captura", "calidad"], ["calidad", "vision"], ["vision", "geolocalizar"], ["geolocalizar", "clasif"], ["clasif", "ordenvisita"], ["ordenvisita", "inspector"], ["vision", "muestreo"]]
      },
      crit: [
        { t: "Plan de vuelo, captura y control de calidad", cadena: [["planvuelo"], ["captura"], ["calidad"]], r: "7.9",
          p: "Se planifica el vuelo, se captura y se controla la calidad de las imágenes antes de analizarlas." },
        { t: "Detecta las grietas en las imágenes", antes: [["calidad"], ["vision"]], r: "9.2",
          p: "Un modelo de visión reconoce patrones: identifica la grieta, no comprende por qué apareció." },
        { t: "Geolocaliza y prioriza", cadena: [["vision"], ["geolocalizar"], ["clasif"]], r: "9.14",
          p: "Ubicar cada hallazgo en el mapa y ordenarlos por prioridad permite decidir a dónde ir primero." },
        { t: "Termina en una orden de visita", antes: [["clasif"], ["ordenvisita"]], r: "8.11",
          p: "El resultado es una orden para que un inspector vaya al lugar." },
        { t: "Un inspector cierra el caso", antes: [["ordenvisita"], ["inspector"]], r: "10.8",
          p: "El caso no se cierra sin una inspección profesional: la IA apoya, no sustituye al profesional." },
        { t: "Revisa una muestra de lo que detecta", antes: [["vision"], ["muestreo", "revision"]], r: "7.12",
          p: "Se revisa una muestra, por ejemplo estratificada, y todos los casos críticos." }
      ]
    },
    /* ---------------------------------------------------------------- 11 · Media */
    {
      id: 11, nivel: "Media", titulo: "Gestión de expedientes con reglas",
      rol: "Un organismo tributario automatiza expedientes con normativa explícita, documentos heterogéneos y excepciones que piden criterio experto.",
      mision: "Diseñá una arquitectura que extraiga campos, valide reglas y derive excepciones, con reglas versionadas y auditoría de qué normativa produjo cada resultado.",
      modelo: {
        n: [["canal", 0, 1], ["ocr", 1, 0], ["validar", 1, 2], ["versionado", 2, 0], ["motor", 2, 1], ["cola", 2, 3], ["registro", 3, 1], ["analista", 3, 3]],
        e: [["canal", "ocr"], ["ocr", "validar"], ["validar", "motor"], ["versionado", "motor"], ["motor", "cola"], ["cola", "analista"], ["motor", "registro"]]
      },
      crit: [
        { t: "Extrae los campos y los valida", cadena: [["canal"], ["ocr"], ["validar"]], r: "7.4",
          p: "El OCR extrae los campos de documentos heterogéneos y se validan antes de aplicar la normativa." },
        { t: "Aplica un motor de reglas", antes: [["validar"], ["motor"]], r: "9.4",
          p: "La normativa explícita se aplica con reglas si–entonces: son auditables y consistentes." },
        { t: "Las excepciones van a una cola que resuelven personas", cadena: [["motor"], ["cola"], ["analista"]], r: "7.10",
          p: "Lo que no encaja en la regla se separa y lo resuelve una persona con criterio experto." },
        { t: "Las reglas están versionadas", antes: [["versionado"], ["motor"]], r: "9.5",
          p: "Hay que saber qué versión de la regla rige y desde cuándo, con pruebas y aprobación." },
        { t: "Registra qué regla produjo cada resultado", antes: [["motor"], ["registro"]], r: "9.5",
          p: "Sin ese registro el sistema deja de ser auditable justo en lo que mejor sabe hacer." }
      ]
    },
    /* ---------------------------------------------------------------- 12 · Media */
    {
      id: 12, nivel: "Media", titulo: "Diseño inspirado en neurociencia",
      rol: "Una fábrica evalúa un sistema que combine detección visual, memoria de casos y reglas de seguridad para detener maquinaria.",
      mision: "Diseñá capas separadas para percepción, memoria de casos, reglas y actuación, con una parada de seguridad determinista y pruebas de latencia, falla de sensor y recuperación.",
      modelo: {
        n: [["sensor", 0, 1], ["vision", 1, 0], ["memoria", 1, 2], ["motor", 2, 1], ["pruebas", 2, 3], ["parada", 3, 1], ["degradado", 3, 3]],
        e: [["sensor", "vision"], ["vision", "motor"], ["memoria", "motor"], ["motor", "parada"], ["pruebas", "parada"], ["motor", "degradado"]]
      },
      crit: [
        { t: "Separa percepción, memoria, reglas y actuación", todas: ["vision", "memoria", "motor", "parada"], r: "8.8",
          p: "Cada capa cumple una función distinta, como en el cerebro: percepción, memoria diferenciada, control y acción." },
        { t: "La percepción llega a las reglas", antes: [["vision"], ["motor"]], r: "8.8",
          p: "Lo que percibe el sistema es una entrada para las reglas, no una orden." },
        { t: "La memoria de casos también llega a las reglas", antes: [["memoria"], ["motor"]], r: "8.10",
          p: "La memoria aporta contexto y antecedentes, y el control ejecutivo los pesa." },
        { t: "Las reglas gobiernan la actuación", antes: [["motor"], ["parada"]], r: "8.10",
          p: "Las reglas de seguridad tienen prioridad sobre lo que estime la percepción, y el actuador lleva a un estado seguro." },
        { t: "Prueba la parada de seguridad", alguna: ["pruebas", "redteam"], r: "12.7",
          p: "Se prueban la latencia, la falla de un sensor y la recuperación." },
        { t: "Prevé qué pasa si falla un sensor", alguna: ["degradado", "continuidad"], r: "7.13",
          p: "Un modo degradado o un plan de continuidad mantienen la seguridad cuando algo falla." }
      ]
    },
    /* ---------------------------------------------------------------- 13 · Alta */
    {
      id: 13, nivel: "Alta", titulo: "Agente transversal del Estado",
      rol: "Un gobierno propone un único agente para salud, impuestos, educación y justicia, que transfiera conocimiento entre dominios.",
      mision: "Proponé una estrategia por etapas que empiece con dominios acotados y permisos mínimos, y pruebas para detectar transferencia espuria, errores fuera de dominio y exceso de autonomía.",
      modelo: {
        n: [["alcance", 0, 1], ["limites", 1, 0], ["piloto", 1, 2], ["redteam", 1, 4], ["confianza", 2, 1], ["revision", 2, 3], ["monitoreo", 3, 1], ["parada", 3, 3]],
        e: [["alcance", "limites"], ["limites", "piloto"], ["redteam", "piloto"], ["piloto", "confianza"], ["confianza", "revision"], ["revision", "monitoreo"], ["confianza", "parada"]]
      },
      crit: [
        { t: "Empieza con un piloto en un dominio acotado", todas: ["alcance", "piloto"], r: "7.13",
          p: "Una IA general no existe todavía: se arranca con pilotos en dominios acotados y se amplía con evidencia." },
        { t: "Con permisos mínimos", todas: ["limites"], r: "8.14",
          p: "Límites de acción y permisos mínimos reducen el daño de un error y el exceso de autonomía." },
        { t: "Prueba con casos inéditos y adversariales", antes: [["redteam", "pruebas", "fueradist"], ["piloto"]], r: "12.7",
          p: "Los casos nuevos o adversariales muestran si hay transferencia espuria entre dominios." },
        { t: "Detecta confianza indebida o errores fuera de dominio", antes: [["piloto"], ["confianza"]], r: "7.12",
          p: "Medir la confianza permite ver cuándo el sistema opina con seguridad sobre algo que no conoce." },
        { t: "Una persona supervisa antes de ampliar", antes: [["confianza"], ["revision"]], r: "7.5",
          p: "La supervisión humana decide si el dominio se expande o no." },
        { t: "Bloquea lo que se sale de su alcance", antes: [["confianza"], ["parada"]], r: "12.7",
          p: "Una acción fuera de alcance se frena en lugar de ejecutarse." },
        { t: "Monitorea y solo se expande con evidencia", antes: [["revision"], ["monitoreo"]], r: "12.7",
          p: "El monitoreo da la evidencia con la que se decide el siguiente paso, o el retiro." }
      ]
    },
    /* ---------------------------------------------------------------- 14 · Alta */
    {
      id: 14, nivel: "Alta", titulo: "Control de red eléctrica autónoma",
      rol: "Una red eléctrica nacional aprende de incidentes, aplica reglas de seguridad y coordina operadores y sistemas regionales.",
      mision: "Proponé una arquitectura híbrida con límites de acción y modos degradados, y diseñá pruebas ante datos adversos, fallos simultáneos y recomendaciones que chocan.",
      modelo: {
        n: [["ingesta", 0, 1], ["redteam", 0, 3], ["prediccion", 1, 0], ["anomalias", 1, 2], ["reconciliar", 2, 1], ["motor", 2, 3], ["limites", 3, 0], ["aprobar", 3, 1], ["degradado", 3, 3], ["parada", 3, 4]],
        e: [["ingesta", "prediccion"], ["ingesta", "anomalias"], ["prediccion", "reconciliar"], ["anomalias", "reconciliar"], ["reconciliar", "motor"], ["redteam", "motor"], ["motor", "limites"], ["limites", "aprobar"], ["limites", "degradado"], ["degradado", "parada"]]
      },
      crit: [
        { t: "La IA aprende de las señales y propone", antes: [["ingesta"], ["prediccion", "anomalias"]], r: "9.6",
          p: "El modelo aprende de los incidentes y propone sobre las señales que entran." },
        { t: "Las reglas de seguridad van primero", antes: [["prediccion", "anomalias"], ["motor"]], r: "9.4",
          p: "Un motor de reglas con prioridad filtra lo que recomienda el modelo antes de que llegue a actuar." },
        { t: "Separa recomendar de autorizar", cadena: [["motor"], ["limites"], ["aprobar"]], r: "8.14",
          p: "El sistema recomienda dentro de límites de acción y una persona autoriza." },
        { t: "Tiene un modo degradado", todas: ["degradado"], r: "7.13",
          p: "Un modo degradado o control local mantiene la red si falla la capa central." },
        { t: "Reconcilia recomendaciones en conflicto", todas: ["reconciliar"], r: "12.13",
          p: "Hay que definir de antemano cómo se resuelven dos recomendaciones que chocan." },
        { t: "Prueba con ataques y fallas", alguna: ["redteam", "pruebas"], r: "12.7",
          p: "Simulaciones, pruebas de ataque o inyección de fallas antes de operar." },
        { t: "Se puede volver al control manual", alguna: ["parada"], r: "12.7",
          p: "Tiene que existir una parada segura o un paso a control manual." }
      ]
    },
    /* ---------------------------------------------------------------- 15 · Alta */
    {
      id: 15, nivel: "Alta", titulo: "IA creativa para ingeniería",
      rol: "Se evalúa un sistema que propone diseños de puentes novedosos y que, según quienes lo venden, tiene creatividad general.",
      mision: "Diseñá un proceso de generación, simulación, verificación normativa y aprobación profesional, con pruebas fuera de distribución y criterios para rechazar diseños plausibles pero inseguros.",
      modelo: {
        n: [["requisitos", 0, 1], ["generar", 1, 0], ["simulacion", 1, 2], ["fueradist", 1, 4], ["normativo", 2, 0], ["confianza", 2, 2], ["umbral", 2, 4], ["revision", 3, 1], ["aprobar", 3, 3]],
        e: [["requisitos", "generar"], ["generar", "simulacion"], ["fueradist", "simulacion"], ["simulacion", "normativo"], ["simulacion", "confianza"], ["normativo", "umbral"], ["confianza", "umbral"], ["umbral", "revision"], ["revision", "aprobar"]]
      },
      crit: [
        { t: "Parte de requisitos y genera alternativas", cadena: [["requisitos"], ["generar"]], r: "11.5",
          p: "Generar algo novedoso en un dominio es creatividad especializada, no inteligencia general." },
        { t: "Simula las alternativas", antes: [["generar"], ["simulacion"]], r: "12.7",
          p: "Cada diseño se simula antes de confiar en él." },
        { t: "Verifica la normativa", antes: [["simulacion"], ["normativo"]], r: "9.5",
          p: "El cumplimiento normativo se controla con reglas explícitas." },
        { t: "Prueba fuera de distribución", antes: [["fueradist"], ["umbral"]], r: "11.2",
          p: "Cargas extremas o materiales nuevos son datos fuera de distribución: ahí la IA estrecha falla." },
        { t: "Rechaza si la incertidumbre es alta, aunque parezca plausible", antes: [["confianza"], ["umbral"]], r: "7.12",
          p: "Un diseño plausible pero inseguro se rechaza por la incertidumbre, no por cómo se ve." },
        { t: "Revisión independiente antes de aprobar", antes: [["umbral"], ["revision"]], r: "7.5",
          p: "Una persona que no lo diseñó lo revisa." },
        { t: "Lo firma un profesional", antes: [["revision"], ["aprobar"]], r: "8.14",
          p: "La responsabilidad final es de una persona identificable, no del sistema." }
      ]
    },
    /* ---------------------------------------------------------------- 16 · Alta */
    {
      id: 16, nivel: "Alta", titulo: "Hipótesis de superinteligencia corporativa",
      rol: "El comité de riesgo de una multinacional estudia un sistema hipotético que superaría ampliamente a los expertos en varios dominios.",
      mision: "Proponé una gobernanza preventiva con autorización escalonada, aislamiento y reversibilidad, y los indicadores para vigilar la capacidad, los intentos de eludir controles y cuándo apagar.",
      modelo: {
        n: [["sandbox", 0, 1], ["limites", 1, 0], ["limrec", 1, 2], ["aprobmultiple", 2, 0], ["capacidad", 2, 2], ["eludir", 2, 4], ["apagado", 3, 1], ["reversion", 3, 3], ["registro", 3, 4]],
        e: [["sandbox", "limites"], ["limites", "limrec"], ["limrec", "aprobmultiple"], ["aprobmultiple", "capacidad"], ["capacidad", "apagado"], ["eludir", "apagado"], ["apagado", "reversion"], ["aprobmultiple", "registro"]]
      },
      crit: [
        { t: "Aísla el sistema", todas: ["sandbox"], r: "12.7",
          p: "Un entorno cerrado limita lo que el sistema puede tocar mientras se lo estudia." },
        { t: "Permisos mínimos y límites de recursos", todas: ["limites", "limrec"], r: "11.7",
          p: "Permisos mínimos, y un tope de cómputo y energía, limitan lo que puede hacer y cuánto puede crecer." },
        { t: "Autorización escalonada con aprobación múltiple", antes: [["limites"], ["aprobmultiple"]], r: "11.10",
          p: "Ninguna persona sola abre cada etapa: la autorización es escalonada y la dan varias." },
        { t: "Deja registros", alguna: ["registro", "trazabilidad"], r: "7.9",
          p: "Sin registros no se puede auditar qué hizo ni cuándo." },
        { t: "Se puede revertir", todas: ["reversion"], r: "12.7",
          p: "Todo lo que se autoriza tiene que poder deshacerse." },
        { t: "Vigila saltos súbitos de capacidad", todas: ["capacidad"], r: "11.10",
          p: "Un salto de capacidad no previsto es una señal temprana de alarma." },
        { t: "Vigila los intentos de eludir los controles", todas: ["eludir"], r: "11.10",
          p: "La búsqueda de privilegios o el ocultamiento son señales de que los controles están siendo esquivados." },
        { t: "Hay un apagado independiente", antes: [["capacidad", "eludir"], ["apagado"]], r: "12.7",
          p: "Hay que poder apagar el sistema por otro canal, sin depender de él, y definir de antemano cuándo hacerlo." }
      ]
    },
    /* ---------------------------------------------------------------- 17 · Alta */
    {
      id: 17, nivel: "Alta", titulo: "Ecosistema sanitario cognitivo",
      rol: "Hospitales integran imágenes, historias clínicas, lenguaje, guías médicas y la experiencia de equipos multidisciplinares.",
      mision: "Diseñá el flujo de apoyo clínico sin diagnósticos ni tratamientos plenamente autónomos. Definí la validación por subgrupos, la explicación de la evidencia, la privacidad y la responsabilidad final.",
      modelo: {
        n: [["datosmin", 0, 3], ["ingesta", 0, 1], ["vision", 1, 0], ["historia", 1, 2], ["recomendador", 2, 1], ["explicacion", 2, 3], ["grupos", 2, 4], ["junta", 3, 1], ["registro", 3, 3]],
        e: [["datosmin", "ingesta"], ["ingesta", "vision"], ["ingesta", "historia"], ["vision", "recomendador"], ["historia", "recomendador"], ["recomendador", "explicacion"], ["recomendador", "grupos"], ["recomendador", "junta"], ["junta", "registro"]]
      },
      crit: [
        { t: "Analiza por módulo: imágenes y texto", todas: ["vision", "historia"], r: "10.8",
          p: "Cada módulo hace una tarea estrecha: imágenes por un lado y lenguaje clínico por otro." },
        { t: "Los módulos alimentan una recomendación", antes: [["vision", "historia"], ["recomendador"]], r: "10.8",
          p: "El sistema recomienda, no diagnostica: prioriza hallazgos y apoya decisiones." },
        { t: "La evidencia es visible", alguna: ["explicacion"], r: "8.14",
          p: "Hay que mostrar de qué fuentes sale la recomendación y con qué límites." },
        { t: "Decide una junta profesional", antes: [["recomendador"], ["junta"]], r: "10.8",
          p: "La decisión pasa por profesionales, por ejemplo una junta clínica." },
        { t: "La decisión queda registrada", antes: [["junta"], ["registro", "trazabilidad"]], r: "7.9",
          p: "El registro de la decisión fija la responsabilidad final en los profesionales." },
        { t: "Valida el desempeño por subgrupos", todas: ["grupos"], r: "8.11",
          p: "Se evalúa el desempeño por subgrupos de pacientes para detectar diferencias entre grupos." },
        { t: "Minimiza los datos", todas: ["datosmin"], r: "7.12",
          p: "Solo los datos estrictamente necesarios, con acceso controlado y cifrado." }
      ]
    },
    /* ---------------------------------------------------------------- 18 · Alta */
    {
      id: 18, nivel: "Alta", titulo: "Arquitectura cerebro-máquina crítica",
      rol: "Una propuesta de seguridad pública afirma copiar el cerebro para predecir conductas y automatizar intervenciones preventivas.",
      mision: "Rediseñá el proyecto hacia usos acotados y no punitivos, con decisión humana y derecho a revisión, y las pruebas de sesgo, robustez, explicabilidad y proporcionalidad antes de desplegar.",
      modelo: {
        n: [["datosmin", 0, 1], ["proporcionalidad", 0, 3], ["redteam", 0, 4], ["alcance", 1, 0], ["agregado", 1, 2], ["grupos", 1, 4], ["recomendador", 2, 1], ["explicacion", 2, 3], ["auditoria", 2, 4], ["junta", 3, 1], ["apelacion", 3, 3]],
        e: [["datosmin", "alcance"], ["proporcionalidad", "alcance"], ["alcance", "agregado"], ["agregado", "recomendador"], ["recomendador", "explicacion"], ["recomendador", "junta"], ["junta", "apelacion"], ["grupos", "auditoria"], ["redteam", "auditoria"], ["auditoria", "junta"]]
      },
      crit: [
        { t: "Limita el uso: análisis agregado, no individual", todas: ["alcance", "agregado"], r: "8.12",
          p: "Un uso acotado y no punitivo tiene una finalidad explícita y datos pertinentes: se mira lo agregado, no a las personas." },
        { t: "Evalúa necesidad y proporcionalidad", todas: ["proporcionalidad"], r: "8.14",
          p: "Antes de desplegar hay que preguntarse si el sistema hace falta y si lo que hace es proporcionado." },
        { t: "Solo recomienda: nada de intervenciones automáticas", antes: [["recomendador"], ["junta"]], r: "8.11",
          p: "Una predicción es una señal para revisar, no un veredicto: no se delegan en una salida automática decisiones que afectan derechos." },
        { t: "Decide una persona y se puede apelar", antes: [["junta"], ["apelacion"]], r: "7.1",
          p: "Hace falta una ruta real de apelación y revisión de lo que se decidió." },
        { t: "Da explicaciones que se puedan usar", antes: [["recomendador"], ["explicacion"]], r: "8.14",
          p: "La interfaz comunica evidencia, límites e incertidumbre." },
        { t: "Auditoría independiente de sesgo por grupos", antes: [["grupos"], ["auditoria"]], r: "8.11",
          p: "Se miden las diferencias entre grupos y no se usan proxies que discriminen." },
        { t: "Pruebas de robustez antes de desplegar", antes: [["redteam", "pruebas"], ["auditoria"]], r: "12.7",
          p: "Se prueba ante datos adversos y fallos, no solo en condiciones favorables." }
      ]
    }
  ]
};
