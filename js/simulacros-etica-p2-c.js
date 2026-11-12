/* Simulacros del 2.º parcial de Ética en la IA, formato nuevo. Parte C (simulacros 5 y 6).
   Estructura y criterios: ver la cabecera de simulacros-etica-p2-a.js. */
window.SIMULACROS_ETICA_P2 = window.SIMULACROS_ETICA_P2 || [];
window.SIMULACROS_ETICA_P2.push(

/* ==================================================================== 5 · VOZ, AUTORÍA Y TEORÍAS (con virtud y sesgos) */
{
  id: 5, titulo: "Simulacro 5", sub: "Voz de doblaje y diagnóstico por imagen", origen: "propio",
  casos: [
  {
    id: "5A", titulo: "La voz que no firmó otro contrato", ambito: "Propiedad intelectual · voz · autoría", clases: [8, 9],
    hechos: [
      "El estudio de doblaje Tonada grabó seis horas de la voz de Hernán Paz, actor reconocido en dibujos animados, con un contrato que autoriza usar esas grabaciones únicamente en la serie «Tierra Roja». Después, Tonada usó las grabaciones para entrenar un modelo de voz y lo empleó en otra serie y en un comercial de gaseosa, con una voz idéntica a la de Hernán, sin pagarle, sin avisarle y sin aclarar que era sintética. Hernán pierde dos trabajos.",
      "El estudio dice: «Las grabaciones son nuestras, las pagamos». La agencia del comercial dice que es una voz sintética que solo «se le parece». Además, Tonada quiere registrar como obra suya la adaptación de un guion generada íntegramente por su IA, sin intervención creativa de ninguna persona."
    ],
    mc: [
      { t: "1. Respecto del pago de las grabaciones:",
        o: ["No transfiere el derecho a entrenar un modelo ni a clonar la voz en otros proyectos.","Transfiere todos los derechos sobre la voz, aunque el contrato diga lo contrario.","El contrato original cubre cualquier uso futuro, porque la tecnología era desconocida.","La voz solo merece protección si también se reproduce la imagen del actor.","El consentimiento es irrelevante cuando la voz es sintética y no una grabación."],
        p: "Pagar un servicio no transfiere titularidad (clase 8). El alcance lo marca lo que se autorizó, y la voz identificable es parte de la identidad de la persona; reproducirla requiere consentimiento." },
      { t: "2. La defensa de la agencia («solo se le parece»):",
        o: ["Obliga a ver si se entrenó con su voz, si es reconocible y si se engaña sobre su origen.","Es suficiente, porque una voz sintética no es una persona y no puede lesionar derechos.","Es suficiente si el comercial no menciona el nombre del actor ni lo identifica.","Es irrelevante: la semejanza vocal constituye un delito sin necesidad de más prueba.","Se acepta si el estudio afirma que la voz fue solo inspirada en la de Hernán."],
        p: "No es solo una cuestión de sonido: importan el origen (entrenamiento con sus grabaciones), el reconocimiento por el público y la falsa apariencia de participación. Tampoco la semejanza es delito automáticamente: hay que encontrar tipo, conducta y dolo." },
      { t: "3. Sobre el registro del guion generado íntegramente por IA (Thaler v. Perlmutter, 2025):",
        o: ["Exige autoría humana (criterio de EE. UU.), sin que toda obra asistida por IA quede desprotegida.","Resolvió que ninguna obra hecha con IA puede registrarse, aunque tenga aportes humanos.","La Ley 11.723 argentina reconoce a la IA como autora cuando no hay persona identificable.","Un prompt breve basta para acreditar la autoría de la obra generada por el sistema.","El estudio es autor porque pagó la suscripción a la herramienta que generó el guion."],
        p: "Thaler confirmó la denegación porque la solicitud atribuía la autoría exclusivamente a una máquina. Error típico: «en EE. UU. no se puede registrar nada hecho con IA». Y pagar no es ser autor." },
      { t: "4. Desde el contractualismo, ¿qué sistema aceptarían desarrolladores y creadores bajo el velo de ignorancia?",
        o: ["Consentimiento informado, compensación y transparencia sobre el origen sintético.","Uno donde el estudio decide libremente porque es quien paga las grabaciones.","Uno donde el actor pierde toda facultad sobre su voz al entregar las grabaciones.","Uno basado en la mayor cantidad posible de espectadores satisfechos con el resultado.","Uno sin reglas específicas, para no frenar la innovación en el sector."],
        p: "El contractualismo busca reglas que puedan justificarse ante todos los afectados, sin saber qué lugar uno ocupará (clase 8, 8.12). Quien podría ser el actor exigiría consentimiento, pago y transparencia." }
    ],
    dev: [
      { t: "Distinga los derechos patrimoniales y morales de Hernán y explique en qué se vulneran. ¿Qué reclamos civiles y penales podría intentar?", pts: 10,
        modelo: [
          "Patrimoniales: permiten controlar la explotación económica de lo que le pertenece y son transmisibles por contrato; acá el contrato solo cedió el uso en «Tierra Roja», así que entrenar el modelo y usar la voz en otra serie y en un comercial es explotar sin pagar ni autorizar. Morales: protegen la relación personal con su obra e identidad; son inalienables e irrenunciables; se lesiona el reconocimiento y la integridad al hacerlo decir o recomendar lo que no dijo. La voz identificable puede además ser un dato personal (clase 6).",
          "Civil: incumplimiento contractual, daño patrimonial (dos trabajos perdidos), pérdida de chance, daño moral y reparación plena (cese del uso, retiro del comercial, eliminación o bloqueo del modelo). Responden el estudio (entrenó y explotó), la agencia (usó, publicó y presentó la voz sin aclarar) y, según control y conocimiento, el proveedor del modelo.",
          "Penal: hay que encontrar una conducta humana que encaje en un tipo vigente, con dolo; el art. 72 a) apunta a reproducir obras sin autorización, y la clonación de voz no tiene tipo específico: forzarlo sería analogía. Usar IA no es delito automático."
        ],
        clave: ["Patrimoniales vs. morales con su característica", "El contrato limitó el uso a una serie", "Reclamos civiles concretos (daños, cese, reparación plena)", "Distintos actores con distinto control", "Penal: tipo vigente, dolo, sin analogía"],
        baja: "Mezclar la voz (identidad) con la obra (derecho de autor) sin distinguir." },
      { t: "Analice el pedido del estudio de registrar el guion generado por la IA. Use los escenarios de autoría (A, B, C) y el criterio de la Oficina de Derechos de Autor de EE. UU.", pts: 10,
        modelo: [
          "Sin autor humano identificable hay serias dudas de que acceda a la tutela del derecho de autor (clase 8, 8.8). Es el escenario C: publicación de lo que la IA genera, sin aporte creativo humano sobre la expresión. Según la Oficina de EE. UU. (2025), sin autoría humana no hay protección y el prompt solo no alcanza; Thaler v. Perlmutter confirmó la denegación cuando la autoría se atribuía a una máquina. Si una persona del estudio hubiera seleccionado, ordenado y reescrito creativamente (escenario B), lo protegible serían esos aportes y no el texto generado tal cual.",
          "El criterio es cualitativo —aportaciones expresivas originales—, no el tiempo ni el porcentaje; pagar la herramienta tampoco da autoría. Es un criterio comparado, no vinculante en Argentina, donde la Ley 11.723 no regula integralmente el contenido generado autónomamente por IA; en materia penal rige además la legalidad."
        ],
        clave: ["Escenarios A/B/C", "Criterio cualitativo (aportes expresivos)", "El prompt solo no alcanza", "Thaler: sin autoría humana no hay copyright", "Criterio comparado, no ley argentina"],
        baja: "«Es del estudio porque pagó» o «nada hecho con IA se puede proteger»." },
      { t: "El estudio dice que usar una voz sintética abarata la producción y beneficia al público. Evalúe el argumento y proponga una salida que concilie innovación y derechos.", pts: 10,
        modelo: [
          "Utilitarismo: hay que sumar todos los efectos, no solo el ahorro: acceso a producciones más baratas, pero también pérdida de ingresos de los actores, desconfianza del público ante voces sin origen claro y desincentivo a crear. Deontología: usar la voz de Hernán sin consentimiento lo trata como un medio. Contractualismo: nadie aceptaría perder control sobre su voz sin compensación.",
          "Salida: contratos con alcance explícito para entrenar o clonar la voz, licencia y compensación específicas, aviso de que la voz es sintética, posibilidad de exclusión (opt-out), trazabilidad de qué materiales entraron al modelo y controles para que no reproduzca voces de personas reales sin autorización. Así se mantiene el acceso y la innovación, sin desprotección."
        ],
        clave: ["Utilitarismo completo (no solo el ahorro)", "Deontología o contractualismo aplicados", "Salida concreta: licencia, compensación, transparencia", "Trazabilidad y opt-out", "Equilibra innovación y derechos"],
        baja: "Rechazar la tecnología o aceptarla sin condiciones." }
    ]
  },
  {
    id: "5B", titulo: "DermaScan: el informe que Lucrecia escribió", ambito: "Salud · sesgo · teorías éticas (virtud)", clases: [4, 10],
    hechos: [
      "Un hospital oncológico va a lanzar DermaScan, un sistema que detecta melanoma a partir de fotos de la piel. Se entrenó con un 80 % de imágenes de piel clara. Su precisión global es del 92 %, pero la sensibilidad es del 94 % en piel clara y del 71 % en piel oscura.",
      "Seis semanas antes del lanzamiento, la ingeniera Lucrecia descubre la brecha. Su jefe le dice que el sistema «cumple el umbral regulatorio global» y que postergar cuesta dos millones. Ella considera callar, frenar el lanzamiento escribiendo al comité de ética, o filtrar el informe a la prensa. Documenta la brecha y se lo envía al comité. El comité decide lanzar con una advertencia en el manual. Poco después, un paciente de piel oscura es dado de alta por un falso negativo."
    ],
    mc: [
      { t: "1. La precisión global del 92 % significa:",
        o: ["Que puede esconder diferencias entre subgrupos: hay que medir los falsos negativos por grupo.","Que el sistema es equitativo, porque supera el umbral global fijado por el regulador.","Que la brecha refleja diferencias biológicas y por eso no constituye un problema ético.","Que el único problema posible es de privacidad de las imágenes de los pacientes.","Que solo importan los falsos positivos, porque son los que causan sobrediagnóstico."],
        p: "Un 93 % de accuracy puede esconder tasas muy distintas por subgrupo. En medicina el falso negativo (enfermo diagnosticado sano) es el error de mayor costo: sin tratamiento a tiempo puede ser irreversible." },
      { t: "2. Desde la ética de la virtud, la conducta de Lucrecia de documentar y notificar al comité:",
        o: ["Es valentía como justo medio entre la cobardía (callar) y la temeridad (filtrar sin canal).","Se explica porque debe acatar la regla institucional del umbral global de precisión.","Es la maximización del bienestar total, sumando las consecuencias para todos los pacientes.","Es incorrecta, porque la honestidad exige filtrar el informe a la prensa de inmediato.","Es un acto ajeno a la prudencia: aplica una regla fija sin considerar el contexto."],
        p: "Virtud = disposición estable a actuar bien, entre un vicio por defecto y uno por exceso (cobardía / valentía / temeridad). Se pregunta qué haría un profesional íntegro. No es deontología (la regla) ni utilitarismo (las consecuencias)." },
      { t: "3. ¿Qué objeción plantea la deontología al lanzamiento tal como está?",
        o: ["Usa a los pacientes de piel oscura como medios para cumplir un cronograma comercial.","Es correcto, si el beneficio total supera a los costos para el resto de los pacientes.","Es correcto, porque el sistema cumple con el umbral regulatorio global y su precisión.","Es incorrecto solo si se prueba que hubo intención de discriminar a los pacientes.","Es correcto, porque la mayoría de los pacientes se beneficia con la detección temprana."],
        p: "La deontología pone límites que no se cruzan: tratar a las personas como fines y nunca solo como medios. El «91 % de accuracy global» es la objeción clásica al utilitarismo; la deontología protege a la minoría." },
      { t: "4. Lanzar el sistema con una advertencia en el manual:",
        o: ["Informa, pero no corrige el sesgo ni reemplaza validar por subgrupo y monitorear.","Resuelve el problema ético, porque informa a los médicos sobre el riesgo conocido.","Es irrelevante, porque en la práctica casi nadie lee los manuales de uso.","Convierte al médico en único responsable de los errores que cometa el sistema.","Elimina la responsabilidad del hospital, que cumplió con su deber de informar."],
        p: "La transparencia es necesaria, no suficiente. Informar un riesgo evitable no lo corrige, y el hospital sigue siendo parte de la cadena de responsabilidad (organización que implementa)." }
    ],
    dev: [
      { t: "Aplique las cuatro teorías éticas (utilitarismo, deontología, contractualismo y virtud) al dilema de Lucrecia y a la decisión del comité. ¿Coinciden?", pts: 10,
        modelo: [
          "Utilitarismo: comparar beneficios (detección temprana para la mayoría) y daños (falsos negativos concentrados en piel oscura, con costo vital); lanzar solo con una advertencia puede dar un saldo negativo si los daños son graves y evitables con una demora corta. Deontología: instrumentaliza a un grupo de pacientes; no se cruza ese límite por una fecha. Contractualismo: bajo el velo de ignorancia nadie aceptaría ser el paciente de piel oscura sin validación por subgrupo ni garantía; se acordarían reglas de datos representativos y auditoría. Virtud: lo que haría un profesional íntegro es documentar, informar por los canales y exigir corrección: honestidad, responsabilidad, valentía sin temeridad.",
          "No coinciden en el fundamento (consecuencias, deberes, reglas aceptables, carácter), pero convergen en que lanzar sin corregir ni validar es difícil de justificar. La diferencia práctica: el utilitarismo podría aceptar un lanzamiento acotado si el balance neto lo favorece (por ejemplo, restringido al uso con piel clara y con supervisión), mientras que las otras dos lo rechazarían como está."
        ],
        clave: ["Aplica cada teoría con su pregunta propia", "Utilitarismo con los costos del falso negativo", "Deontología: persona como medio", "Contractualismo: velo de ignorancia", "Virtud: valentía, honestidad, justo medio; ¿coinciden?"],
        baja: "Definir las teorías sin aplicarlas." },
      { t: "Explique las fuentes del sesgo de DermaScan (sistémico, computacional, humano), con ejemplos del caso, y distinga bias de discriminación.", pts: 10,
        modelo: [
          "Sistémico: el sesgo viene de estructuras previas; la dermatología documenta más casos en piel clara y las bases de imágenes reflejan esa historia. Computacional o estadístico: muestra no representativa (80 % de piel clara), con errores sistemáticos mayores en el grupo subrepresentado; también la medición (qué se considera 'caso confirmado') y el umbral (quién elige y si se evaluó por grupo). Humano y cognitivo: sesgo de automatización (el médico confía en el 'sano' del sistema), la decisión del comité de lanzar bajo presión de costos y la confianza en el umbral global.",
          "Bias es un problema estadístico, cognitivo, institucional o computacional; puede existir sin discriminación jurídicamente relevante. Discriminación es un trato o impacto desfavorable injustificado sobre personas o grupos protegidos, con o sin intención: importa el efecto. Acá el bias técnico produce un impacto desfavorable en un grupo y, si se conoce y se lo mantiene sin justificación, adquiere relevancia de discriminación."
        ],
        clave: ["Sesgo sistémico con ejemplo", "Sesgo computacional (muestra, medición, umbral)", "Sesgo humano (automatización, presión)", "Definición de bias", "Definición de discriminación y la diferencia"],
        baja: "Usar bias y discriminación como sinónimos." },
      { t: "¿Qué debería exigir el hospital para permitir el uso de DermaScan? Proponga medidas y diga quién responde por cada una.", pts: 10,
        modelo: [
          "Exigencias: (1) validación en la población de uso y evaluación desagregada por subgrupo (sensibilidad y falsos negativos), como en Ewert v. Canada; (2) datos de entrenamiento representativos, con documentación de su composición; (3) umbrales por grupo o alertas cuando la confianza es baja; (4) el sistema como apoyo y no decisión: el dermatólogo revisa con comprensión real y puede apartarse; (5) documentación, explicación, canal de reclamos y registro de decisiones; (6) monitoreo posterior, auditoría externa y plan de corrección o suspensión.",
          "Responsables: el desarrollador (diseñar, probar y documentar), el hospital como organización (implementar con controles y supervisión), los operadores (usar dentro de los límites) y las autoridades y el comité de ética (justificar y controlar la decisión). Cada uno responde según su rol, su conocimiento y su control; la advertencia en el manual no reemplaza ninguna de estas medidas."
        ],
        clave: ["Validación por subgrupo y datos representativos", "Supervisión humana efectiva", "Documentación y reclamos", "Monitoreo y auditoría", "Responsabilidad según el rol (desarrollador, organización, operadores, autoridades)"],
        baja: "Proponer solo la advertencia o solo «más datos»." }
    ]
  }
  ]
},

/* ==================================================================== 6 · INTEGRADOR: JUSTICIA CON IA Y MANIPULACIÓN ELECTORAL */
{
  id: 6, titulo: "Simulacro 6", sub: "Integrador: IA en el juzgado y campaña electoral", origen: "propio",
  casos: [
  {
    id: "6A", titulo: "JUSTIA: el borrador que el juez firmó", ambito: "IA y justicia · sesgo histórico · alucinaciones", clases: [1, 8, 9],
    hechos: [
      "Un juzgado civil usa JUSTIA, una IA entrenada con quince años de sentencias de la provincia, que redacta borradores de sentencias y sugiere montos de indemnización. Los jueces aceptan el borrador casi sin cambios en el 90 % de los casos. Un abogado detecta que, en accidentes con víctimas amas de casa, el sistema sugiere montos sensiblemente menores, porque las sentencias antiguas valoraban poco el trabajo doméstico. Además, un borrador citó dos fallos que no existen y lo advirtió la parte contraria.",
      "El Poder Judicial responde que el sistema ahorra un 40 % del tiempo y que, al final, siempre firma el juez. Quien suscribe el borrador dice que confió en que el sistema 'estaba validado'."
    ],
    mc: [
      { t: "1. JUSTIA es, en los hechos:",
        o: ["Una IA decisoria de hecho: cuenta el uso real, no el nombre, y se acepta casi sin cambios.","Una IA de apoyo, porque el juez firma la sentencia y conserva formalmente la decisión final.","Una IA de apoyo, porque así la declara el Poder Judicial al presentar el sistema al público.","Una IA decisoria solo si decide sin ningún juez que intervenga en el proceso.","Una IA neutral, porque ahorra tiempo sin cambiar el contenido de las sentencias."],
        p: "Que se llame «apoyo» no lo vuelve de apoyo: si el juez casi siempre acepta, funciona como decisoria. La firma no garantiza una decisión realmente humana (supervisión formal vs. real)." },
      { t: "2. Los montos menores en víctimas amas de casa muestran:",
        o: ["Que entrenar con jurisprudencia vieja reproduce valoraciones históricas y frena cambios.","Neutralidad, porque refleja la realidad judicial tal como es y no hay que corregirla.","Un error de redondeo en el cálculo de montos que se corrige con un ajuste técnico del sistema.","Un sesgo cognitivo del abogado que lo detectó y no del sistema.","Un problema que se resuelve quitando la variable «género» del entrenamiento."],
        p: "Es la 'copia de la copia' y la analogía con Bazterrica (clase 8, 8.11): una IA entrenada con 1978 nunca habría propuesto el cambio, y cada fallo igual refuerza la postura. Quitar una variable no alcanza, por los proxies y por la propia historia de los datos." },
      { t: "3. Las citas de fallos inexistentes son:",
        o: ["Una alucinación: verificar es deber de quien usa y firma; confiar ciegamente es sesgo de autoridad.","Responsabilidad exclusiva del proveedor del sistema, que debió impedir que generara citas falsas.","Irrelevantes, porque la IA no tiene intención y por lo tanto no puede causar daños.","Un problema solo si la parte contraria no logra detectarlo antes de la sentencia.","Subsanadas con un aviso de que el borrador puede contener errores o fallos."],
        p: "Caso Walters: el sistema no promete exactitud, el deber de verificar es del usuario, y los disclaimers no alcanzan. En justicia el costo es una decisión que afecta derechos; el control es del juez." },
      { t: "4. Respecto del AI Act (UE) y la justicia:",
        o: ["La justicia es un uso de alto riesgo con requisitos exigentes, sin prohibirse todo uso.","Prohíbe toda IA en la justicia, porque afecta derechos fundamentales de las personas.","No regula la justicia, que queda fuera por ser un servicio público y no comercial.","Clasifica la justicia como riesgo mínimo, porque los jueces firman las decisiones.","Exige solamente transparencia, sin requisitos de supervisión humana ni de datos."],
        p: "Error típico: «el AI Act prohíbe la IA en la justicia». Prohíbe algunos usos (por ejemplo, ciertas evaluaciones de riesgo delictivo basadas solo en perfiles) y somete otros a requisitos de alto riesgo." }
    ],
    dev: [
      { t: "Distinga IA de apoyo e IA decisoria y supervisión formal y real. ¿Qué debería exigirse al tribunal que usa JUSTIA?", pts: 10,
        modelo: [
          "IA de apoyo: organiza información y sugiere alternativas que se pueden revisar, corregir y descartar. IA decisoria: condiciona o automatiza resultados y puede sustituir parte del juicio humano. La diferencia no es el nombre sino el uso real: con 90 % de aceptación casi sin cambios, JUSTIA funciona como decisoria. La supervisión es real si hay comprensión, capacidad de cuestionar y autoridad para modificar; es formal si solo se firma (escenario B). El sesgo de automatización lo agrava.",
          "Exigencias: usarlo como auxiliar y no determinante (Loomis); que el juez funde con razones propias; capacitación y tiempo para revisar; verificación obligatoria de citas; registro de cuándo y por qué se aparta; validación y auditoría periódica con métricas por tipo de víctima; explicación y posibilidad de impugnar para las partes; responsabilidad repartida entre desarrollador, organización, operadores y autoridades."
        ],
        clave: ["Define apoyo vs. decisoria", "Cuenta el uso real, no el nombre", "Supervisión formal vs. real, sesgo de automatización", "Exigencias concretas al tribunal", "Responsabilidad humana y repartida"],
        baja: "«El juez firmó, entonces la decisión es humana»." },
      { t: "Explique por qué una IA entrenada con jurisprudencia vieja puede frenar cambios de criterio. Use un ejemplo de la clase y proponga cómo mitigarlo.", pts: 10,
        modelo: [
          "La IA devuelve el resultado más coherente con los datos con los que se entrenó. Los cambios de paradigma ocurren cuando alguien hace algo contra esos datos. Ejemplo: tenencia para consumo personal; con la jurisprudencia de 1978 (Colavini) una IA no habría propuesto Bazterrica (1986), y cada nuevo fallo «como siempre» refuerza la postura. Acá, la valoración del trabajo doméstico: si el sistema suele sugerir montos bajos y los jueces los aceptan, ese criterio se retroalimenta (feedback loop) y se hace cada vez más difícil de cambiar. Es un sesgo sistémico: viene de estructuras previas y se reproduce con alta precisión.",
          "Mitigación: revisar los datos de entrenamiento y descartar o ponderar criterios superados; auditar resultados por categoría de víctima; actualizar el modelo con sentencias recientes y criterios vigentes; que el juez tenga la carga de justificar si adopta o no la sugerencia; y mantener una intervención humana capaz de cuestionar los datos."
        ],
        clave: ["Entrenamiento con datos históricos", "Ejemplo Bazterrica / copia de la copia", "Feedback loop con la aceptación del juez", "Sesgo sistémico", "Medidas de mitigación"],
        baja: "Proponer solo «quitar la variable»." },
      { t: "Adopte una posición: mantener JUSTIA sin cambios, prohibirla o permitirla sujeta a condiciones. Dé un argumento a favor y uno en contra de usar IA en la redacción de sentencias, y cinco condiciones.", pts: 10,
        modelo: [
          "A favor: procesa documentación rápido, detecta inconsistencias, descarga tareas repetitivas y puede dar más uniformidad; el beneficio debe demostrarse con evaluaciones empíricas, no presumirse. En contra: sesgos de entrenamiento, errores difíciles de explicar, dependencia excesiva de la recomendación y obstáculos para cuestionarla; un sistema preciso puede ser injusto para personas concretas.",
          "Posición: permitirla sujeta a condiciones, como auxiliar y no determinante. Condiciones: (1) evaluar la calidad y representatividad de los datos y documentar variables y límites; (2) medir tasas de error entre grupos y validar en la población de uso; (3) revisión humana efectiva e impugnación; (4) verificación obligatoria de fuentes y citas; (5) auditoría periódica. Se basan en los principios de justicia y no discriminación, transparencia y explicabilidad, responsabilidad, protección de datos y supervisión humana efectiva."
        ],
        clave: ["Argumento a favor y en contra", "Posición clara", "Cinco condiciones", "Conexión con principios (UNESCO, NIST)", "Beneficio a demostrar con evidencia"],
        baja: "Elegir una posición sin condiciones ni evidencia." }
    ]
  },
  {
    id: "6B", titulo: "Resonancia: el audio de las 48 horas", ambito: "Derecho penal e IA · manipulación electoral · legalidad", clases: [9],
    hechos: [
      "En la campaña a intendente, el equipo del candidato Rojas contrata a la consultora Resonancia, que crea 400 cuentas falsas y genera con IA un audio con la voz clonada de la rival, Paula Ibarra, «confesando» un acuerdo corrupto. Lo difunde segmentado a votantes indecisos de barrios con baja confianza institucional, 48 horas antes de la elección. Ibarra pierde por tres puntos.",
      "Resonancia dice que era sátira y que «la IA mostró lo que ella podría decir». Rojas dice que no sabía. En un chat interno, el director de Resonancia había escrito: «esto va a mover dos puntos». No hay un tipo penal vigente de manipulación electoral con IA; hay un proyecto."
    ],
    mc: [
      { t: "1. Respecto del tipo penal proyectado de manipulación electoral:",
        o: ["No puede aplicarse al hecho: se buscan personas, dolo y tipos vigentes, sin analogía.","Se aplica, porque describe con exactitud la conducta de Resonancia en la campaña.","Como falta una ley específica, no puede haber ningún delito en toda la conducta.","Responde la IA como instrumento, porque fue la que generó el audio falso.","Responde solamente quien subió el audio a las redes, no quienes lo encargaron."],
        p: "Un proyecto no es ley y en penal rige la legalidad: no se crea un delito por analogía. Eso no deja todo impune: puede haber figuras vigentes aplicables a la conducta (por ejemplo, calumnia, falsedades, delitos informáticos), según la prueba." },
      { t: "2. El chat «esto va a mover dos puntos» sirve para:",
        o: ["Probar el elemento subjetivo: sugiere dolo directo de influir en el voto.","Nada: lo único que importa es que el audio sea falso y haya circulado.","Probar que el candidato Rojas conocía y dirigía cada paso de la campaña.","Demostrar culpa y no dolo, porque no hay una decisión deliberada de difundir.","Fundar una sanción administrativa, pero no tiene valor para un proceso penal."],
        p: "En el tipo proyectado, el dolo directo con el objetivo de influir en el voto es central; no alcanza con difundir algo falso. El chat prueba lo que sabía y quería Resonancia, no lo que sabía Rojas." },
      { t: "3. La defensa de que «era sátira»:",
        o: ["Exige analizar contexto, presentación y finalidad; un audio realista sin aclarar no es sátira.","Basta para excluir toda responsabilidad, porque la sátira está permitida por la ley.","Se acepta si el audio se generó con IA, porque nadie podría creerlo auténtico.","Solo se acepta si Ibarra no pierde la elección, porque no habría perjuicio.","Es irrelevante, porque la libertad de expresión es un derecho absoluto y sin límites."],
        p: "La calumnia atribuye falsamente un delito; la sátira se percibe como tal. La automatización del engaño dirige mentiras a quienes son más propensos a creerlas. La libertad de expresión no es absoluta ni protege hacer pasar lo falso por real." },
      { t: "4. ¿Qué bien jurídico protege el tipo proyectado?",
        o: ["La libertad del sufragio y la confianza pública en la información política.","Principalmente el honor de la candidata, que fue quien sufrió el audio falso.","La propiedad de los datos personales y de los modelos que posee la consultora.","La libertad de expresión de la consultora y de quienes la contrataron en la campaña.","La seguridad informática de los sistemas de la Justicia Electoral y de los padrones."],
        p: "La cátedra lo vinculó a la libertad del sufragio, la confianza en la información política y la «veracidad estructural»: que los algoritmos no fabriquen una realidad paralela." }
    ],
    dev: [
      { t: "Atribuya responsabilidad a la consultora, a su director y al candidato Rojas. Use dolo, culpa y la autoría mediata tecnológica.", pts: 10,
        modelo: [
          "La IA no es sujeto penal; la imputación recae en quien creó el riesgo, lo controló o lo mantuvo operativo. Es el supuesto de IA lícita usada para un fin delictivo (supuesto 2): la clonación de voz es el instrumento, y responde quien la dirige. El director de Resonancia: dolo directo, con la prueba del chat; tiene el dominio de la voluntad (diseño de la campaña), de la acción (decidir difundir) y del resultado. La consultora, como organización, según la participación de sus integrantes; la responsabilidad penal de empresas es limitada (Ley 27.401). Quien ejecutó materialmente (técnicos) responde según su conocimiento.",
          "Autoría mediata: quien conduce el hecho usando un sistema como instrumento es autor mediato cuando conserva el dominio decisivo. Rojas: depende de lo que sabía y de si dirigió o aceptó la campaña; «no sabía» exige probar que no tuvo conocimiento ni control; si contrató y se benefició sin controles, puede haber culpa, pero la culpa en estos delitos puede no estar tipificada. Hace falta prueba concreta de su rol."
        ],
        clave: ["La IA no es sujeto; responde la persona detrás", "Supuesto 2 (IA lícita para fin delictivo)", "Director: dolo directo, chat como prueba", "Autoría mediata tecnológica y dominio del hecho", "Rojas: depende de conocimiento y control"],
        baja: "«Responde la IA» o atribuir dolo al candidato sin prueba." },
      { t: "Explique el problema del Código Penal de 1921 ante estas conductas y analice los elementos del tipo proyectado. ¿Conviene crearlo?", pts: 10,
        modelo: [
          "El Código Penal se pensó para acciones humanas y no tiene delitos para estas tecnologías; sin tipo no hay pena y no se puede acudir a la analogía. Quedan lagunas.",
          "Tipo proyectado (prisión de 3 a 6 años): durante un proceso electoral, para determinar, manipular, engañar o coaccionar el voto o desalentar la participación, crear o manipular contenido (incluso simulado) sin consentimiento informado o violando la protección de datos, o diseñar, difundir o usar contenidos, algoritmos, segmentación, cuentas falsas o medios automatizados con información falsa o engañosa. Elemento subjetivo: dolo directo con el objetivo de influir en el voto; objetivo: conductas directas e instrumentales; ámbito temporal: solo durante el proceso electoral; bien jurídico: libertad del sufragio.",
          "A favor: cierra una laguna y sanciona a quien usa la IA, no al sistema. En contra: riesgo de criminalizar la opinión política o la sátira, y dificultad de probar dolo. Equilibrio: exigir dolo directo, acotar a periodos electorales y definir claramente la falsedad. Conviene crearlo si se respeta la proporcionalidad."
        ],
        clave: ["Legalidad penal y lagunas del Código de 1921", "Elementos del tipo proyectado", "Dolo directo, ámbito temporal, bien jurídico", "Argumento a favor y en contra", "Posición fundada"],
        baja: "Decir que es una norma vigente." },
      { t: "Evalúe éticamente el uso de IA para segmentar y personalizar mensajes políticos con las tres teorías clásicas y proponga medidas preventivas para plataformas y partidos.", pts: 10,
        modelo: [
          "Utilitarismo: el posible beneficio de comunicar más barato y personalizado no compensa el daño colectivo de debilitar la confianza en el proceso electoral y de condicionar el resultado con mentiras; hay que contar las consecuencias futuras para la democracia. Deontología: manipular a los votantes con información falsa los instrumentaliza y viola su autonomía; es incorrecto aunque sea eficaz. Contractualismo: bajo el velo de ignorancia nadie aceptaría reglas que permitan ser engañado en una elección; se acordarían reglas de veracidad, transparencia y límites a la segmentación.",
          "Medidas: etiquetar el contenido sintético y la publicidad política, trazabilidad de quién paga y segmenta, límites a la microsegmentación, detección y baja de cuentas falsas, retiro rápido de contenido manipulado durante el período electoral, auditorías independientes de los algoritmos de distribución, y códigos de conducta de los partidos. La libertad de expresión se preserva distinguiendo la opinión y la sátira de la falsedad presentada como real."
        ],
        clave: ["Tres teorías aplicadas con su criterio", "Autonomía del votante", "Consecuencias sobre la confianza democrática", "Medidas para plataformas y partidos", "Equilibrio con la libertad de expresión"],
        baja: "Rechazar toda segmentación política sin distinguir usos." }
    ]
  }
  ]
}

);
