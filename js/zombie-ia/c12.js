/* Nivel 6 de Parcial Zombie · Introducción a la IA · clase 12. Formato y pautas: js/preguntas-zombie-ia.js */
(window.NIVELES_ZOMBIE_IA = window.NIVELES_ZOMBIE_IA || []).push({
  clase: 12,
  titulo: "Escenarios, impacto y gobernanza",
  preguntas: [
    /* 12.1 · IA no significa automatizar todo */
    { ref: "12.1", tema: "Escalera de la IA", q: "¿Qué escalón de la IA convierte papel o audio en datos?",
      ops: ["Digitalizar.", "Automatizar.", "Predecir."],
      porque: "Digitalizar. Los cinco escalones son digitalizar, automatizar (reglas estables), predecir (demanda o riesgo), recomendar (acciones con evidencia) y decidir (dentro de límites y con responsabilidad)." },
    { ref: "12.1", tema: "Escalera de la IA", q: "¿Qué escalón de la IA aplica reglas estables?",
      ops: ["Automatizar.", "Digitalizar.", "Recomendar."],
      porque: "Automatizar. Muchos problemas se resuelven en los primeros escalones y cada uno pide más madurez: datos, procesos, competencias y gobernanza." },
    { ref: "12.1", tema: "Escalera de la IA", q: "¿Qué escalón de la IA exige más control humano?",
      ops: ["Decidir.", "Predecir.", "Digitalizar."],
      porque: "Decidir: cuanto más arriba en la escalera, más impacto tiene un error y más control humano hace falta." },

    /* 12.2 · tres dimensiones del impacto */
    { ref: "12.2", tema: "Dimensiones del impacto", q: "¿Qué dimensión del impacto incluye productividad, costos, innovación y empleo?",
      ops: ["La económica.", "La social.", "La ética."],
      porque: "La económica: productividad, costos, innovación, empleo, competencia y concentración de capacidades." },
    { ref: "12.2", tema: "Dimensiones del impacto", q: "¿Qué incluye la dimensión ética del impacto?",
      ops: ["Justicia, privacidad y explicabilidad.", "Acceso, inclusión y confianza.", "Productividad, costos y empleo."],
      porque: "Justicia, privacidad, explicabilidad, seguridad, responsabilidad y sostenibilidad. Acceso, inclusión y confianza son la dimensión social." },

    /* 12.3 · impacto social */
    { ref: "12.3", tema: "Impacto social", q: "¿Cuál es un riesgo social que hay que gestionar?",
      ops: ["Exclusión por falta de conectividad.", "Atención disponible más horas.", "Priorización de casos urgentes."],
      porque: "La exclusión de quienes no tienen conectividad, junto con datos poco representativos, vigilancia y decisiones opacas. Las otras dos son beneficios posibles." },
    { ref: "12.3", tema: "Impacto social", q: "¿Cómo prioriza el triaje de una clínica?",
      ops: ["Por gravedad y no por llegada.", "Por orden estricto de llegada.", "Por la edad del paciente."],
      porque: "Usa una grilla para dar lugar en la fila según la gravedad, no según el orden de llegada: es un ejemplo de priorizar urgencias." },
    { ref: "12.3", tema: "Impacto social", q: "¿Qué lleva a mantener la atención presencial junto con la digital?",
      ops: ["La resistencia cultural al cambio.", "La falta de conectividad.", "El costo de los servidores."],
      porque: "Muchas personas mayores quieren hacer el trámite como siempre, en una oficina: por eso se mantiene la atención presencial y un canal de apelación." },

    /* 12.4 · impacto económico */
    { ref: "12.4", tema: "Impacto económico", q: "¿Qué contrapartida tiene la productividad?",
      ops: ["Automatizar errores a escala.", "Dependencia de proveedores.", "Concentración de datos y talento."],
      porque: "Menos tiempo por tarea, pero se pueden automatizar errores a escala. La innovación trae dependencia de proveedores y la competencia, concentración de datos y talento." },
    { ref: "12.4", tema: "Impacto económico", q: "Si baja el empleo, ¿qué efecto indirecto se discutió?",
      ops: ["Menos consumo en el mercado.", "Más ventas en supermercados.", "Más demanda de productos caros."],
      porque: "Menos empleo, menos consumo: con menos dinero, el supermercado que vendía 100 pasa a vender 80. Otras contrapartidas son la fuga de talento y la dependencia de proveedores." },

    /* 12.5 · trabajo */
    { ref: "12.5", tema: "Trabajo y puestos", q: "Un analista deja de copiar datos. ¿Qué pasa con su puesto?",
      ops: ["Revisa excepciones y mejora reglas.", "Pierde su puesto sin reemplazo.", "Pasa a programar nuevos modelos."],
      porque: "No desaparece el puesto: cambian sus tareas. Pasa a revisar excepciones, explicar decisiones y mejorar las reglas." },
    { ref: "12.5", tema: "Trabajo y puestos", q: "¿Qué paso separa tareas repetitivas, cognitivas, sociales y de responsabilidad?",
      ops: ["Descomponer.", "Asignar.", "Capacitar."],
      porque: "Descomponer. Después se asigna (qué hace la IA y qué una persona), se capacita en datos y verificación, y se mide calidad, carga y aprendizaje." },

    /* 12.6 · ética: cinco preguntas antes de desplegar */
    { ref: "12.6", tema: "Ética antes de desplegar", q: "¿Qué pregunta plantea el principio de propósito?",
      ops: ["¿El problema merece IA o alcanza una regla?", "¿Quién corrige, compensa y aprende del error?", "¿Podemos comunicar los factores relevantes?"],
      porque: "Propósito: si el problema merece IA o alcanza con una regla. Responsabilidad es quién corrige y compensa, y explicabilidad, si se pueden comunicar los factores de la decisión." },
    { ref: "12.6", tema: "Ética antes de desplegar", q: "¿Qué pregunta plantea el principio de justicia?",
      ops: ["¿El error afecta distinto a distintos grupos?", "¿La persona sabe que interactúa con una IA?", "¿El problema merece IA o alcanza una regla?"],
      porque: "Justicia: si el error afecta de forma desigual a distintos grupos. Saber que se interactúa con una IA es autonomía." },
    { ref: "12.6", tema: "Ética antes de desplegar", q: "¿Qué pregunta plantea el principio de autonomía?",
      ops: ["¿La persona sabe que interactúa con una IA?", "¿El error afecta distinto a distintos grupos?", "¿Podemos comunicar los factores relevantes?"],
      porque: "Autonomía: si una persona no sabe que habla con una IA, decide distinto, y lo peor ocurre en momentos de crisis." },
    { ref: "12.6", tema: "Ética antes de desplegar", q: "¿Qué pregunta plantea el principio de explicabilidad?",
      ops: ["¿Podemos comunicar los factores relevantes?", "¿Quién corrige, compensa y aprende del error?", "¿El error afecta distinto a distintos grupos?"],
      porque: "Explicabilidad: si podemos comunicar los factores relevantes de la decisión. Quién corrige y compensa es responsabilidad." },

    /* 12.7 · gobernanza: controles durante todo el ciclo de vida */
    { ref: "12.7", tema: "Gobernanza", q: "¿Qué define la etapa de caso de uso del ciclo de gobernanza?",
      ops: ["Objetivo, afectados, riesgo y alternativa.", "Origen, permiso, calidad y conservación.", "Pruebas, límites, sesgos y seguridad."],
      porque: "El caso de uso define objetivo, afectados, riesgo y alternativa. Los datos, su origen y permiso; el modelo, las pruebas, límites y sesgos. Después vienen despliegue y operación." },
    { ref: "12.7", tema: "Gobernanza", q: "¿Cómo se define la gobernanza?",
      ops: ["Un proceso controlado en cada fase.", "Un conjunto de filtros del modelo.", "Una auditoría anual de cuentas."],
      porque: "Es un proceso controlado al 100 % en todas sus fases: si hay un tramo del que se dice «creo que lo estoy controlando», ahí está el problema." },
    { ref: "12.7", tema: "Gobernanza", q: "¿Por qué los filtros de los grandes modelos no alcanzan contra el uso malicioso?",
      ops: ["Hay herramientas sin esos filtros.", "Los filtros se desactivan solos.", "Los filtros son muy costosos."],
      porque: "Quien quiere hacer daño usa otras herramientas sin filtros: la gobernanza debe mirar también los usos maliciosos y a los actores externos." },

    /* 12.8 · organizaciones públicas y privadas */
    { ref: "12.8", tema: "Públicas y privadas", q: "¿Qué antepone lo público a la eficiencia?",
      ops: ["El valor público.", "La productividad.", "La reputación."],
      porque: "El valor público: derechos, acceso, transparencia y calidad. La velocidad no sustituye la legalidad ni la equidad." },
    { ref: "12.8", tema: "Públicas y privadas", q: "¿Qué indicadores miden equidad y acceso en lo público?",
      ops: ["Errores por zona y derivación humana.", "Nivel de servicio e inventario.", "Costo por pedido y fallas evitadas."],
      porque: "Errores por zona y derivación humana. En lo privado, la precisión por segmento cumple un papel parecido; nivel de servicio e inventario son indicadores de una distribuidora." },
    { ref: "12.8", tema: "Públicas y privadas", q: "En rigor, ¿qué es el mantenimiento predictivo?",
      ops: ["Aprendizaje automático predictivo.", "IA generativa para crear contenido.", "Razonamiento simbólico con reglas."],
      porque: "Aprende patrones de fallas pasadas para anticipar las próximas. No genera contenido nuevo, así que no es IA generativa." },

    /* 12.9 · del proceso manual a la automatización con IA */
    { ref: "12.9", tema: "Proceso manual a IA", q: "¿Cuál es el primer paso de la ruta de ocho pasos?",
      ops: ["Observar el proceso y sus excepciones.", "Digitalizar y asegurar los datos.", "Pilotar con humano en el circuito."],
      porque: "Observar el proceso y sus excepciones: cómo funciona hoy, de verdad. Después se eliminan pasos sin valor, se estandariza, se digitaliza y se automatiza." },
    { ref: "12.9", tema: "Proceso manual a IA", q: "¿Qué se hace con los pasos sin valor de un proceso?",
      ops: ["Eliminarlos antes de automatizar.", "Automatizarlos con reglas.", "Asignarlos a una persona."],
      porque: "Se eliminan: no hay que automatizar lo que sobra. La IA se aplica a la ambigüedad, después de automatizar las reglas estables." },
    { ref: "12.9", tema: "Proceso manual a IA", q: "Si una regla simple resuelve el problema, ¿qué conclusión corresponde?",
      ops: ["Alcanza con la regla, sin IA.", "Conviene usar IA igual.", "Hay que pilotar la IA primero."],
      porque: "No hace falta IA. Los últimos pasos son pilotar con humano en el circuito y escalar, monitorear y poder retirar el sistema." },

    /* 12.10 · dos casos prácticos */
    { ref: "12.10", tema: "Casos prácticos", q: "En los expedientes públicos asistidos, ¿cuándo es obligatoria la revisión humana?",
      ops: ["En decisiones sensibles o dudosas.", "En decisiones rutinarias de bajo impacto.", "En cada expediente ya digitalizado."],
      porque: "En decisiones sensibles, con baja confianza o con datos incompletos. El éxito es menos tiempo sin aumentar los rechazos erróneos ni cerrar los canales presenciales." },
    { ref: "12.10", tema: "Casos prácticos", q: "¿Qué riesgo típico tiene optimizar solo el costo en una distribuidora?",
      ops: ["Deteriorar la puntualidad y lo laboral.", "Aumentar el stock sin control.", "Perder el pronóstico de demanda."],
      porque: "Deteriorar la puntualidad o las condiciones laborales. El control clave son objetivos múltiples, límites operativos, revisión de excepciones y métricas de servicio." },

    /* 12.11 · escenarios futuros de 2 a 50 años */
    { ref: "12.11", tema: "Escenarios futuros", q: "¿Cómo se rotulan los escenarios de 2 a 5 años?",
      ops: ["Probables.", "Plausibles.", "Especulativos."],
      porque: "Probables. Los de 10 años son plausibles y los de 20 a 50, especulativos: cuanto más lejos, menos certeza." },
    { ref: "12.11", tema: "Escenarios futuros", q: "¿Qué se espera a 2 años?",
      ops: ["Copilotos bajo control.", "Procesos adaptativos.", "Organizaciones híbridas."],
      porque: "Copilotos bajo control: asistentes para redactar, resumir, buscar y programar. A 3 años, equipos aumentados; a 5, procesos adaptativos; a 10, organizaciones híbridas." },
    { ref: "12.11", tema: "Escenarios futuros", q: "¿Qué se espera a 20 años?",
      ops: ["Instituciones rediseñadas.", "Organizaciones híbridas.", "Copilotos bajo control."],
      porque: "Instituciones rediseñadas: servicios más preventivos que reactivos y debate sobre propiedad de los datos, renta e impuestos. Los horizontes no son profecías: sirven para decidir hoy." },

    /* 12.12 · a 50 años: tres futuros posibles */
    { ref: "12.12", tema: "Tres futuros posibles", q: "¿Qué futuro tiene a la IA como infraestructura auditada que se vuelve bienestar?",
      ops: ["El inclusivo.", "El concentrado.", "El fragmentado."],
      porque: "El inclusivo: la productividad se convierte en bienestar y oportunidades." },
    { ref: "12.12", tema: "Tres futuros posibles", q: "¿Qué futuro deja a pocos actores controlando modelos, datos y cómputo?",
      ops: ["El concentrado.", "El inclusivo.", "El fragmentado."],
      porque: "El concentrado: crecen la dependencia y la asimetría de poder." },
    { ref: "12.12", tema: "Tres futuros posibles", q: "¿Qué futuro tiene ecosistemas incompatibles y soberanía tecnológica?",
      ops: ["El fragmentado.", "El inclusivo.", "El concentrado."],
      porque: "El fragmentado: hay fuertes diferencias entre regiones. La variable decisiva serán las instituciones, los incentivos y los valores, no solo la capacidad técnica." },
    { ref: "12.12", tema: "La IA como commodity", q: "¿Dónde estará la diferencia cuando la IA sea un commodity?",
      ops: ["En las aplicaciones que se construyan.", "En el costo del modelo base.", "En la marca del proveedor."],
      porque: "En las aplicaciones que se construyan arriba de esa infraestructura. Cuando algo se masifica, su costo baja hasta ser irrisorio." },

    /* 12.13 · matriz para decidir: automatizar, asistir o mantener humano */
    { ref: "12.13", tema: "Matriz de decisión", q: "Con impacto bajo e incertidumbre baja, ¿qué corresponde?",
      ops: ["Automatizar con reglas.", "Asistir con aprobación.", "Humano en el circuito."],
      porque: "Automatizar con reglas. Preguntarle el clima a una IA es de bajo impacto: si se equivoca, no pasa nada." },
    { ref: "12.13", tema: "Matriz de decisión", q: "Con impacto alto e incertidumbre alta, ¿quién decide?",
      ops: ["Una persona.", "La IA sola.", "La IA con muestreo."],
      porque: "Decide un humano: la IA puede ordenar evidencias, pero aprobar una licencia social requiere autoridad y derecho a apelar. Preguntar a un asistente clínico qué pastilla tomar es de alto impacto." },
    { ref: "12.13", tema: "Matriz de decisión", q: "Con impacto medio e incertidumbre alta, ¿qué corresponde?",
      ops: ["Humano en el circuito.", "La IA recomienda.", "Humano decide."],
      porque: "Humano en el circuito. Con impacto bajo e incertidumbre alta, la IA recomienda; con impacto alto, el humano decide." },

    /* 12.14 · el caso al revés: cuando la IA contrata personas */
    { ref: "12.14", tema: "RentAHuman", q: "¿Qué permite la plataforma RentAHuman?",
      ops: ["Que agentes de IA contraten personas.", "Que personas contraten agentes de IA.", "Que empresas vendan modelos propios."],
      porque: "Que agentes de IA encuentren, contraten y paguen a personas para tareas que requieren presencia física. Invierte la relación habitual: la persona trabaja para la IA." },
    { ref: "12.14", tema: "RentAHuman", q: "¿Cómo se libera el pago en RentAHuman?",
      ops: ["Desde un depósito en garantía.", "Antes de empezar la tarea.", "Cuando la IA lo decida."],
      porque: "La IA publica la tarea, se elige a alguien cercano, la persona envía evidencia y se libera el pago desde un depósito en garantía." },

    /* 12.15 · conclusiones: tecnología con propósito y control */
    { ref: "12.15", tema: "Conclusiones", q: "¿Por dónde empieza un buen proyecto de IA?",
      ops: ["Por un problema claro.", "Por la herramienta más nueva.", "Por el modelo más grande."],
      porque: "Por un problema claro, un proceso comprendido y datos gobernados, no por la herramienta." },
    { ref: "12.15", tema: "Conclusiones", q: "¿Qué forma parte de la calidad de un sistema de IA?",
      ops: ["Acceso, revisión y reparación.", "Un diseño visual cuidado.", "Un tiempo de respuesta menor."],
      porque: "Acceso, comprensión, revisión y reparación no son extras: son parte de la calidad del sistema. Se diseña para las personas." },
    { ref: "12.15", tema: "Conclusiones", q: "¿Para qué sirven los horizontes de 2 a 50 años?",
      ops: ["Para decidir hoy competencias y regulación.", "Para predecir el futuro con exactitud.", "Para fijar el presupuesto anual."],
      porque: "Ayudan a decidir hoy competencias, infraestructura, regulación, resiliencia y distribución del valor. Pensar en escenarios no es profetizar." }
  ]
});
