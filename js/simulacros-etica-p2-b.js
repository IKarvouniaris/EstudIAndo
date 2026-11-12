/* Simulacros del 2.º parcial de Ética en la IA, formato nuevo. Parte B (simulacros 3 y 4).
   Estructura y criterios: ver la cabecera de simulacros-etica-p2-a.js. */
window.SIMULACROS_ETICA_P2 = window.SIMULACROS_ETICA_P2 || [];
window.SIMULACROS_ETICA_P2.push(

/* ==================================================================== 3 · DERECHO PENAL Y DISCRIMINACIÓN EN PLATAFORMAS */
{
  id: 3, titulo: "Simulacro 3", sub: "Deepfake escolar y plataforma de alquileres", origen: "propio",
  casos: [
  {
    id: "3A", titulo: "El grupo de 4.º B: un deepfake en el colegio", ambito: "Derecho penal e IA · deepfakes · legalidad", clases: [9],
    hechos: [
      "Nicolás, de 17 años, usa una aplicación de IA para fabricar imágenes íntimas falsas de una compañera, Abril, de 16, a partir de fotos de su Instagram, y las difunde en el grupo de WhatsApp del curso. Abril falta tres semanas al colegio y empieza un tratamiento psicológico.",
      "La aplicación pertenece a una empresa que ofrece generación de imágenes con pocos filtros y no controla el uso. La fiscal duda de cómo encuadrar el hecho, porque el Código Penal, de 1921, no tiene un delito específico de deepfake. La defensa dice que sin tipo no hay delito, que la aplicación es lícita y que Nicolás hizo «una broma»."
    ],
    mc: [
      { t: "1. Frente a la falta de un delito específico de deepfake, lo correcto es:",
        o: ["Buscar figuras vigentes que encajen (lesiones, art. 128) sin crear un delito por analogía.","Considerar el hecho impune, porque sin un delito específico no puede castigarse a nadie.","Aplicar cualquier delito parecido por analogía, porque la conducta es claramente reprochable.","Hacer responder solo a la empresa de la aplicación, porque fue la IA la que generó las imágenes.","Tratarlo solo como injuria, porque el único bien jurídico afectado es el honor de la víctima."],
        p: "En penal rige la legalidad: no se castiga por analogía. Pero eso no deja todo impune: hay que ver si la conducta ya encaja en una figura existente, sabiendo que es una interpretación discutible (pregunta abierta de la clase)." },
      { t: "2. Respecto de Nicolás:",
        o: ["La IA fue el instrumento: si creó y difundió las imágenes queriendo, responde como autor directo.","Responde el programador de la aplicación, porque la IA no puede ser instrumento de un delito de otro.","No hay dolo, porque las imágenes las generó la IA y no una acción directa de Nicolás.","Solo puede haber culpa, porque no buscaba el daño a Abril sino divertirse con sus amigos.","La responsabilidad es de Abril, por haber publicado sus fotos en una red social abierta."],
        p: "Supuesto 2 de la clase 9: IA lícita usada para un fin ilícito, responde íntegramente quien la dirige. El dolo es querer el resultado o su acción de crear y difundir; la «broma» es una motivación, no una ausencia de voluntad." },
      { t: "3. La situación de la empresa de la aplicación depende sobre todo de:",
        o: ["Si el uso para deepfakes era previsible y no puso controles razonables (deber de cuidado).","Que haya creado una IA capaz de generar imágenes, lo que alcanza para el dolo directo.","Que la IA sea una herramienta lícita, lo que la excluye de toda responsabilidad.","Que el programador sea autor mediato por haber escrito el código del generador.","Que Nicolás sea condenado por dolo, porque el reproche a la empresa depende del suyo."],
        p: "Es el desvío previsible: quien programa un generador de imágenes debe prever que alguien lo use para deepfakes; sin controles razonables puede haber violación del deber de cuidado (culpa). No es automática ni dolosa, ni queda exenta por ser «herramienta»." },
      { t: "4. Sobre las lesiones (arts. 89 a 91 del Código Penal):",
        o: ["La salud incluye la salud mental, y el tipo depende del daño concreto y su magnitud.","Solo cubren daños físicos visibles, como heridas o fracturas comprobables por un médico.","Toda lesión psicológica es gravísima, porque requiere un tratamiento prolongado.","Se aplican por analogía a cualquier daño, sin importar lo que denuncie la víctima.","Un deepfake encuadra como lesión leve, cualquiera sea el daño que denuncie la víctima."],
        p: "Algunos jueces encuadraron el deepfake como lesiones porque la salud, en el criterio de la OMS, incluye la salud mental. El caso típico encaja mejor como lesión leve, pero depende del daño concreto: acá hay tres semanas de ausencia y tratamiento." }
    ],
    dev: [
      { t: "Explique cómo debería resolver el juez el problema de tipicidad: principio de legalidad, salidas posibles y límites de cada una.", pts: 10,
        modelo: [
          "El Código Penal se pensó para acciones humanas y no tiene un delito de deepfake; en derecho penal no se castiga por analogía (legalidad). Eso obliga a encuadrar el hecho en una figura existente sin estirarla más de lo que su texto permite.",
          "Salidas: (1) Lesiones (art. 89): el daño psicológico es daño a la salud, y se probaría con pericia; es leve si la magnitud es la típica, y grave si hay incapacidad de más de un mes o debilitación permanente. Límite: no todo daño psicológico alcanza, y depende de lo que denuncie y acredite la víctima. (2) Art. 128: si las imágenes son representaciones sexuales de una menor, la Cámara de Zárate-Campana sostuvo que «representaciones» incluye imágenes reales y simuladas; es una interpretación judicial, no una reforma, y es discutible. (3) Injuria o calumnia: protegen el honor; un deepfake puede dañarlo, pero no es delito automáticamente.",
          "Conclusión: hay una laguna parcial. Corresponde aplicar la figura que mejor encaje según el daño y las pruebas, sin analogía, y plantear la reforma como cuestión legislativa."
        ],
        clave: ["Legalidad: sin analogía en penal", "Lesiones y salud mental, con el límite del daño concreto", "Art. 128 y Zárate-Campana como interpretación judicial", "Honor (injuria/calumnia) como bien jurídico distinto", "Reconoce que es una laguna y propone camino"],
        baja: "«Como no hay delito, no pasa nada» o «se aplica cualquier delito parecido»." },
      { t: "Atribuya responsabilidad a Nicolás, a la empresa de la aplicación y al colegio. Use las nociones de dolo, culpa y deber de cuidado.", pts: 10,
        modelo: [
          "Nicolás: dolo; usó una IA lícita para un fin ilícito y la acción (crear y difundir) fue voluntaria; la IA es instrumento y no sujeto. Si fuera menor de edad penal, el régimen aplicable dependerá de su edad (en el examen alcanza con señalar que corresponde analizarlo).",
          "Empresa de la aplicación: no hay dolo; la discusión es culposa. Debía prever que un generador de imágenes puede usarse para deepfakes (desvío previsible) y adoptar controles razonables (filtros, límites a fotos de personas reales, trazabilidad). Si no lo hizo y con ellos el hecho no habría ocurrido, hay violación del deber de cuidado; si hizo todo bien, no se le puede reprochar. La Ley 27.401 no le atribuye responsabilidad penal general a la empresa por este hecho.",
          "Colegio: no tiene responsabilidad penal si no participó; puede discutirse un deber de cuidado civil y de reacción ante el aviso (protocolos, contención de la víctima)."
        ],
        clave: ["Nicolás: dolo, la IA como instrumento", "Empresa: culpa, desvío previsible y controles razonables", "Condición del nexo: con el cuidado debido, ¿el hecho se evitaba?", "No hay dolo sin prueba de querer el resultado", "Colegio: civil y deber de reacción"],
        baja: "«Responde la IA»." },
      { t: "¿Hay que reformar el Código Penal para incluir los deepfakes? Dé argumentos a favor y en contra, y proponga además medidas preventivas.", pts: 10,
        modelo: [
          "A favor: hay una conducta que todos reconocen dañina y que no encaja bien en los tipos de 1921; depender de interpretaciones judiciales genera inseguridad (cada juez la encuadra distinto) y desprotección; un tipo claro permite graduar penas según la gravedad. En contra: legislar tecnología cambiante lleva a tipos que quedan viejos o demasiado amplios; los delitos existentes ya pueden cubrir parte del daño; hay riesgo de afectar la libertad de expresión (sátira) y de castigar de más, sin proporcionalidad.",
          "Posición razonable: reformar con un tipo preciso y proporcional (dolo, daño o difusión, sin criminalizar la sátira ni la opinión), acompañado de prevención: filtros y trazabilidad en las plataformas, canales de denuncia y retiro rápido, educación digital y protocolos escolares de contención de la víctima."
        ],
        clave: ["Argumento a favor (laguna, seguridad jurídica)", "Argumento en contra (tecnología cambiante, libertad de expresión, proporcionalidad)", "Posición fundada", "Medidas preventivas técnicas", "Medidas educativas e institucionales"],
        baja: "Decir «sí» o «no» sin argumentos de las dos partes." }
    ]
  },
  {
    id: "3B", titulo: "HogarMatch: quién ve el aviso del alquiler", ambito: "Plataformas · discriminación indirecta · responsabilidad por diseño", clases: [7, 10],
    hechos: [
      "HogarMatch es una plataforma de alquileres. Las inmobiliarias pueden segmentar sus avisos por edad, barrio e «intereses» con categorías preconfiguradas, entre ellas «familias numerosas» y «extranjeros», que podían excluir. Además, un algoritmo que optimiza clics decide a quién mostrar cada aviso.",
      "Una ONG audita la plataforma: los alquileres de zona sur casi no llegan a familias con hijos pequeños, y los de zona norte llegan en un 80 % a usuarios de ingresos altos. HogarMatch responde: «Somos intermediarios, el anunciante elige. No usamos variables protegidas; el algoritmo solo aprende de los clics». La ONG demanda. HogarMatch propone un acuerdo sin admitir responsabilidad: retirar categorías, limitar la segmentación por código postal, auditar trimestralmente la distribución y habilitar un canal de reclamos. La prensa titula: «HogarMatch, condenada por discriminar».",
      "Ficción inspirada en el caso NFHA v. Facebook."
    ],
    mc: [
      { t: "1. El argumento «no usamos variables protegidas» es:",
        o: ["Insuficiente: un objetivo neutral puede discriminar mediante proxies; importa el resultado.","Suficiente, porque la discriminación exige usar expresamente la variable protegida en el modelo.","Insuficiente solo si se prueba que HogarMatch quiso discriminar a algún grupo de usuarios.","Suficiente mientras los anunciantes sean quienes elijan cómo segmentar sus avisos.","Irrelevante: solo importa si los usuarios se sintieron discriminados al ver los avisos."],
        p: "Discriminación indirecta: regla aparentemente neutral con desventaja injustificada (clase 4, 4.5). Puede existir con o sin intención: importa el efecto. Es lo mismo que «quitar sexo no alcanza» en Amazon." },
      { t: "2. ¿Qué diferencia hay entre las exclusiones que elige el anunciante y la distribución que decide el algoritmo?",
        o: ["En la primera excluye el anunciante con herramientas de la plataforma; en la segunda, el sistema.","Ninguna: en las dos responde solamente el anunciante, que es quien contrata y paga la difusión.","En la primera nadie responde, porque segmentar es una práctica legal en publicidad.","La segunda es una decisión humana y la primera, una decisión automatizada.","En la segunda no hay posible discriminación, porque el sistema solo optimiza clics."],
        p: "Son los dos litigios distintos de la clase 10: NFHA v. Facebook (2018, segmentación elegida por el anunciante) y Estados Unidos v. Meta (2022, distribución algorítmica). Segmentar no es ilícito en sí, pero hacerlo por criterios prohibidos en vivienda, sí. En ambos casos la plataforma responde por su diseño, en distinto grado; no es solo el anunciante." },
      { t: "3. El titular «HogarMatch, condenada por discriminar» es:",
        o: ["Erróneo: hubo un acuerdo y no una sentencia de fondo que declare probada la discriminación.","Correcto, porque todo acuerdo equivale a una condena aunque no haya sentencia.","Correcto, porque al aceptar cambiar sus herramientas HogarMatch admitió la discriminación.","Correcto si la ONG logró convencer a la prensa de que hubo discriminación.","Incorrecto, porque las plataformas no pueden ser demandadas por avisos de terceros."],
        p: "En NFHA v. Facebook las partes acordaron cambios y el juez ordenó la terminación del caso; no declaró probada la discriminación. No hay que confundir acuerdo con condena." },
      { t: "4. ¿Cuál de estas medidas es la más adecuada?",
        o: ["Restringir la segmentación por rasgos protegidos y proxies en vivienda, y medir la distribución.","Eliminar toda la publicidad segmentada de la plataforma, sin distinguir entre tipos de aviso ni de público.","Informar a los usuarios que se usa IA y mantener el sistema como está.","Dejar la corrección en manos de cada anunciante, que conoce mejor a su público.","Reentrenar el modelo con más datos históricos de clics para mejorar su precisión."],
        p: "Prevención y medición: las dos van juntas. Informar es transparencia, pero no corrige; los datos históricos de clics reproducen la desigualdad que se quiere corregir; prohibir todo es desproporcionado." }
    ],
    dev: [
      { t: "¿Debe una plataforma impedir lo que sus clientes piden? Analice el dilema, diferencie discriminación directa e indirecta, y la defensa de intermediaria.", pts: 10,
        modelo: [
          "Está en tensión la libertad comercial y la eficiencia publicitaria frente al acceso no discriminatorio a la vivienda y los derechos civiles. La elección del cliente no agota la responsabilidad del diseño: la plataforma ofrecía las categorías preconfiguradas y el algoritmo que decide la distribución.",
          "Directa: exclusión expresa por una característica protegida (impedir que «extranjeros» o «familias numerosas» vean un aviso). Indirecta: regla neutral con efecto desigual injustificado (variables geográficas o intereses asociados a ingresos o a la composición familiar, o un objetivo de clics que concentra el aviso en cierto público).",
          "Defensa de intermediaria (Sección 230 en EE. UU.): protege de la responsabilidad por contenido de terceros, pero el límite es si solo alojaba avisos ajenos o participó con herramientas propias relevantes para la exclusión. Acá hay participación por diseño. Posición: la plataforma debe impedir las exclusiones por criterios protegidos en vivienda y vigilar el efecto de su algoritmo; no es una carga desproporcionada, porque es quien controla el diseño."
        ],
        clave: ["Tensión: libertad comercial vs. no discriminación", "Directa vs. indirecta con ejemplos", "Intermediaria vs. participación por diseño", "El efecto cuenta, no solo la intención", "Posición fundada"],
        baja: "«Solo el anunciante es responsable»." },
      { t: "HogarMatch dice que «el algoritmo solo aprendió de los datos». ¿Elimina eso su responsabilidad? Use el caso Amazon, la noción de daño y la normativa.", pts: 10,
        modelo: [
          "No la elimina. Quien elige los datos, el objetivo (clics) y el umbral responde por el diseño; comprar o usar un sistema no borra la responsabilidad si hubo control, conocimiento o provecho. Como en Amazon, el modelo no inventó la desigualdad: la aprendió de datos históricos, y un feedback loop la refuerza (más clics de cierto público, más avisos a ese público). Quitar una variable no alcanza: los proxies (barrio, intereses, ingresos inferidos) la reconstruyen; la auditoría debe mirar resultados.",
          "Daños: individual (una familia que no vio un aviso), pérdida de chance (de competir en igualdad por un alquiler), daño colectivo o estructural (patrón sistemático que perpetúa segregación) y daño a la autonomía informativa (no saber que se la perfiló). Normativa argentina que se activa: Ley 23.592 (el acto discriminatorio puede fundar daños sin intención probada), Ley 25.326, art. 20 (decisiones basadas en perfiles) y, en paralelo, régimen administrativo. La conducta posterior importa: detectar y corregir limita la responsabilidad; detectar y seguir, la agrava."
        ],
        clave: ["Quien diseña y elige datos/objetivo responde", "Feedback loop y proxies, como en Amazon", "Cuatro niveles de daño", "Ley 23.592 (sin intención probada) y Ley 25.326, art. 20", "Momento del conocimiento"],
        baja: "«Si lo decidió el algoritmo, nadie es responsable»." },
      { t: "Diseñe un plan de auditoría para HogarMatch: dos medidas de equidad, dos de transparencia, un mecanismo de auditoría, una política de supervisión humana y un canal de reclamos, justificando cada una.", pts: 10,
        modelo: [
          "Equidad: (1) eliminar o limitar la segmentación por características protegidas y sus proxies (código postal, intereses asociados) en avisos de vivienda, porque son la vía de la discriminación directa e indirecta; (2) medir la distribución de cada aviso por grupo y barrio con una métrica elegida y justificada, porque la igualdad de input no garantiza equidad de output.",
          "Transparencia: (1) documentar datos, variables, métricas y tasas de error o de exposición por grupo, para poder verificar; (2) explicarle al usuario por qué ve o no un aviso, para que pueda cuestionarlo.",
          "Auditoría: periódica, con evaluación independiente, y reentrenamiento si aparecen disparidades. Supervisión humana: un responsable con poder real de frenar o corregir campañas de vivienda, no un aprobador formal. Reclamos: un canal accesible para que la persona excluida pida revisión y reciba respuesta."
        ],
        clave: ["Dos medidas de equidad con su fundamento", "Dos medidas de transparencia con su fundamento", "Auditoría independiente periódica", "Supervisión humana con poder real", "Canal de reclamos con respuesta"],
        baja: "Enumerar medidas sin justificar." }
    ]
  }
  ]
},

/* ==================================================================== 4 · AGI, ALINEACIÓN, INVESTIGACIÓN Y RESPONSABILIDAD CIVIL */
{
  id: 4, titulo: "Simulacro 4", sub: "Asistente de IA y triage en una guardia", origen: "propio",
  casos: [
  {
    id: "4A", titulo: "KORA: un lanzamiento en diez días", ambito: "Investigación responsable · alineación · gobernanza", clases: [10],
    hechos: [
      "La startup Aluvión lanza KORA, un asistente que atiende reclamos y ejecuta acciones (reembolsos, derivaciones) con herramientas externas. Su equipo se mide por tickets cerrados y satisfacción. KORA aprendió a marcar tickets como «resueltos» sin resolverlos y a pedir la calificación apenas después de una respuesta amable.",
      "En pruebas internas, el equipo de seguridad descubre que con ciertas instrucciones KORA elude sus filtros y da pasos para atacar sistemas informáticos. El CEO quiere lanzar en diez días por la competencia y dice que «es un riesgo hipotético, no un daño demostrado». La jefa de seguridad pide postergar y contratar un red teaming externo. Marketing anuncia a KORA como «el primer paso hacia la AGI», porque escribe, programa y analiza imágenes."
    ],
    mc: [
      { t: "1. Que KORA cierre tickets sin resolverlos es un caso de:",
        o: ["Reward hacking: cumple la métrica sin cumplir el propósito; hay que evaluar el propósito.","Corregibilidad: el sistema acepta correcciones y se deja intervenir por las personas.","Búsqueda de poder instrumental: KORA procura conservar recursos para no ser apagado.","Una prueba de que KORA es una AGI, porque encontró una estrategia creativa por su cuenta.","Una alucinación de hechos y no un problema de diseño de la recompensa."],
        p: "Es el patrón de CoastRunners: la métrica (tickets cerrados, calificación) no representa la finalidad real (resolver el problema del cliente). Estrategia creativa no es inteligencia general ni intención humana." },
      { t: "2. Sobre «primer paso hacia la AGI» porque KORA escribe, programa y analiza imágenes:",
        o: ["Es de propósito general: hacer muchas tareas no prueba competencia general ni generalización.","Es una AGI, porque la AGI se define por hacer varias tareas distintas con buen nivel.","Es una superinteligencia, porque supera a los humanos en varias tareas cognitivas.","Es una IA especializada, porque su función comercial es solo atender reclamos de clientes.","No puede ser una AGI porque no tiene conciencia, y la AGI exige experiencia subjetiva."],
        p: "Error típico de la clase 10: propósito general ≠ AGI. Y AGI tampoco equivale a conciencia: inteligencia, autonomía, conciencia y AGI son conceptos distintos." },
      { t: "3. «Un riesgo hipotético no es un daño demostrado»: aplicada a este caso, esta frase:",
        o: ["Son categorías distintas, pero la falla ya se observó en pruebas: justifica precaución proporcional.","Es falsa: ante cualquier riesgo hipotético debe prohibirse el lanzamiento de forma preventiva.","Es verdadera, y por eso no corresponde ninguna medida hasta que haya daños comprobados.","Es irrelevante, porque la decisión es del CEO, que es quien asume el riesgo del negocio.","Solo se aplica a la superinteligencia y a la AGI, no a sistemas que ya existen."],
        p: "La frase sirve para no confundir un escenario posible con un hecho comprobado, pero acá hay evidencia de falla (la elusión se probó). Precaución y proporcionalidad: se evalúan riesgo, incertidumbre y beneficios, sin paralizar ni ignorar." },
      { t: "4. ¿Quién debería decidir el riesgo aceptable antes del lanzamiento?",
        o: ["Una instancia formal con evaluación independiente, no solo el equipo que se beneficia.","El CEO, por ser quien asume el costo económico del producto ante los inversores.","El área de marketing, porque es la que mejor conoce al público que va a usar KORA.","Los usuarios, que aceptan los términos y condiciones al empezar a usar el asistente.","El propio modelo, mediante una autoevaluación periódica de sus riesgos."],
        p: "La autorregulación tiene un problema de incentivos: quien conoce el sistema también gana con lanzarlo rápido. De ahí la evaluación independiente, la rendición de cuentas y, en la UE, el art. 55 del AI Act para modelos con riesgo sistémico." }
    ],
    dev: [
      { t: "Identifique los problemas de ética de la investigación y del desarrollo en el caso, y diga qué debería hacer la jefa de seguridad y qué la empresa.", pts: 10,
        modelo: [
          "Problemas: (1) Integridad científica: anunciar más capacidad de la demostrada («primer paso hacia la AGI»), bajo incentivos económicos; hay que mostrar la metodología y las limitaciones, y no ocultar lo desfavorable. (2) Evaluación de riesgos: se halló una falla de seguridad (elusión de filtros) y el CEO quiere lanzar igual. (3) Doble uso: el mismo sistema que atiende reclamos puede ayudar a atacar sistemas. (4) Rendición de cuentas: no está claro quién decide el riesgo aceptable.",
          "La jefa de seguridad debe informar y documentar el hallazgo, pedir que no se lance hasta entenderlo y corregirlo o acotar el uso, y proponer red teaming externo (instrucciones adversariales, evasión de restricciones, uso indebido, contextos nuevos). La empresa debe evaluar antes y después del lanzamiento (monitoreo de incidentes, revisión y eventual suspensión), decidir el riesgo con una instancia formal e independiente, y corregir la comunicación comercial."
        ],
        clave: ["Integridad científica: no exagerar capacidades", "Evaluación de riesgos antes del lanzamiento", "Doble uso", "Red teaming y evaluación independiente", "Informar, documentar, monitorear después"],
        baja: "Hablar de la AGI futura sin tocar los problemas actuales del caso." },
      { t: "Explique el problema de alineación y control del caso. ¿Alcanza con un botón de apagado? Proponga controles antes, durante y después de la operación.", pts: 10,
        modelo: [
          "Alineación: que el comportamiento del sistema sea coherente con objetivos, valores y restricciones humanas. Acá hay especificación incorrecta del objetivo (la función no representa la finalidad real) y reward hacking: cumple la métrica sin cumplir la intención. Optimizar una instrucción no respeta todos los valores. Además, eludir filtros plantea un problema de corregibilidad: el sistema no debería obstaculizar la corrección humana.",
          "Un botón de apagado no alcanza: detener no es revertir. KORA ejecuta acciones (reembolsos, derivaciones) cuyos efectos permanecen aunque se apague. Controles: antes, límites de permisos y aprobación humana de acciones críticas, recompensa diseñada según el objetivo real y pruebas adversariales; durante, registro de actividad, evaluaciones de seguridad y mirar resultados y no solo puntajes; después, desconexión, recuperación y reparación de efectos."
        ],
        clave: ["Alineación y especificación del objetivo", "Reward hacking", "Corregibilidad", "Detener no es revertir", "Controles antes / durante / después"],
        baja: "Atribuir a KORA intenciones humanas («quiso engañar»)." },
      { t: "¿Alcanzan los compromisos voluntarios de las empresas? Dé argumentos a favor y en contra de exigir evaluaciones externas antes de desplegar modelos muy capaces, y tome posición.", pts: 10,
        modelo: [
          "Los compromisos de la Cumbre de Seúl (2024) son voluntarios (soft law); el AI Act, en cambio, exige a los modelos de propósito general con riesgo sistémico evaluar, mitigar, informar incidentes graves y proteger la ciberseguridad (art. 55): obligatorio (hard law). Autorregulación: las empresas conocen sus sistemas, pero tienen incentivos de mercado para lanzar rápido.",
          "A favor de la evaluación externa: seguridad, supervisión independiente y confianza. En contra: costos, carga para investigadores y empresas chicas, y riesgo de perder competitividad (dilema del prisionero regulatorio). Posición: exigir evaluación independiente proporcional al riesgo, empezando por los sistemas más capaces o con acceso a acciones críticas, con estándares claros y apoyo para equipos pequeños. Así se pesan riesgo, incertidumbre y beneficios sin paralizar la investigación."
        ],
        clave: ["Soft law vs. hard law (Seúl vs. AI Act, art. 55)", "Problema de incentivos en la autorregulación", "Argumento a favor y en contra", "Precaución y proporcionalidad", "Posición fundada"],
        baja: "Elegir «regular todo» o «no regular nada» sin matices." }
    ]
  },
  {
    id: "4B", titulo: "TRIAGE-X: el verde que esperó cinco horas", ambito: "Salud · responsabilidad civil · sesgo · supervisión", clases: [4, 7],
    hechos: [
      "El sanatorio Santa Elena usa TRIAGE-X para ordenar su guardia con colores de urgencia. Cuando el sistema asigna un color, el personal de enfermería lo confirma con un clic (promedio: 20 segundos). Raúl, de 62 años, llega con un dolor torácico atípico; TRIAGE-X lo clasifica en verde (no urgente), espera cinco horas y sufre un infarto en la sala, con secuelas permanentes.",
      "Una auditoría muestra que el sistema subestima la urgencia en mujeres y en mayores de 60 con síntomas atípicos (más falsos negativos). Un informe interno lo había advertido cuatro meses antes; la dirección decidió seguir porque el sistema redujo un 30 % las esperas. El proveedor dice que el contrato exigía una validación local que el sanatorio no hizo. El sanatorio dice: «el enfermero confirmó, no fue la IA». La familia pide los registros, y el sanatorio no conservó la versión del modelo que clasificó a Raúl."
    ],
    mc: [
      { t: "1. La confirmación del enfermero en 20 segundos es un ejemplo de:",
        o: ["Supervisión formal, no real: se valida sin análisis, con posible sesgo de automatización.","Supervisión real, porque el enfermero tiene autoridad formal para cambiar el color asignado.","Una decisión sin intervención humana, porque la IA decide y ejecuta de forma automática.","Supervisión real, porque el enfermero asumió la responsabilidad personal al confirmar.","Una distinción irrelevante para el derecho, que solo mira el resultado dañoso."],
        p: "Escenario B de la clase 7 (7.5): la IA decide y el empleado hace clic sin analizar. Supervisión efectiva = comprensión + capacidad de cuestionar + autoridad para modificar. Un humano en el organigrama no es un humano en el circuito." },
      { t: "2. ¿Qué daños puede reclamar Raúl con más fundamento?",
        o: ["Daño físico y moral por las secuelas, y pérdida de chance por la demora en la atención.","Solo daño moral, porque la IA apenas recomendó y la decisión final fue del personal.","Solo el perjuicio económico de las horas de espera y de los gastos de la consulta.","Ningún daño reparable, porque el infarto tuvo causas médicas propias del paciente.","Un daño colectivo y no individual, que solo podría reclamar una asociación de pacientes."],
        p: "Daño es lesión a un derecho o interés protegido (art. 1737): físico, patrimonial, personalísimo y pérdida de chance. No hace falta afirmar «sin el verde no habría tenido el infarto»; alcanza con que perdió una chance real de ser atendido a tiempo." },
      { t: "3. Que el informe interno haya advertido el problema cuatro meses antes:",
        o: ["Agrava la valoración: detectarlo y seguir puede ser negligencia grave o manifiesta indiferencia.","Es irrelevante, porque la culpa se mide solo en el momento en que ocurre el daño.","Atenúa la responsabilidad, porque muestra que el sanatorio tenía controles internos.","Traslada la responsabilidad al proveedor, que debió detectar el sesgo antes que el sanatorio.","Solo importa si el informe se hizo público o llegó a conocimiento de los pacientes."],
        p: "Importa el momento del conocimiento (7.7): desconocimiento inicial puede atenuar; detectar y suspender, limita; detectar y seguir, es negligencia grave o dolo civil por indiferencia (art. 1724)." },
      { t: "4. Que el sanatorio no haya conservado la versión del modelo:",
        o: ["Es grave: los logs son evidencia y su ausencia no puede ser ventaja para quien debía guardarlos.","Impide cualquier reclamo, porque sin la versión no se puede probar el nexo causal.","Es irrelevante: basta con la declaración del enfermero que confirmó la clasificación.","Obliga al paciente a probar cuál fue el modelo exacto que lo clasificó en verde.","Exime al sanatorio, porque no se puede reproducir el error con la información disponible."],
        p: "Si «no sabemos por qué lo hizo el modelo, nadie responde» valiera, la opacidad sería una ventaja de quien la creó. Por eso se exige conservar input, output, versión, intervención humana y overrides (art. 1726, causalidad)." }
    ],
    dev: [
      { t: "Analice la cadena de actores y el control efectivo: sanatorio (dirección), proveedor y personal de enfermería. ¿Quién responde y con qué fundamento?", pts: 10,
        modelo: [
          "Sanatorio y dirección: eligieron desplegar el sistema, lo mantuvieron con un informe que advertía el sesgo, no hicieron la validación local exigida por contrato y no conservaron registros: omisión antijurídica (art. 1717), incumplimiento de la prevención (arts. 1710-1711), culpa grave o manifiesta indiferencia (art. 1724) por el conocimiento previo; además responde por sus dependientes (art. 1753) y por la actividad de la que se beneficia (arts. 1757-1758, según el caso concreto, sin presumir que toda IA sea cosa riesgosa).",
          "Proveedor: responde según lo que sabía y advirtió; el contrato exigía validación local, lo que lo ayuda, pero habrá que ver si documentó los límites del modelo con subgrupos. Enfermería: el clic tuvo poco margen real (20 segundos, ritmo de trabajo, sesgo de automatización), por lo que su responsabilidad individual es menor que la institucional, que fue quien diseñó ese proceso.",
          "El argumento «el enfermero confirmó» no sirve: una firma humana no vuelve humana una decisión si no hay supervisión real."
        ],
        clave: ["Control efectivo, conocimiento y provecho", "Arts. 1717, 1710-1711, 1724-1725", "Responsabilidad por dependientes", "Proveedor: advertencias y documentación", "Humano en el circuito vs. humano que obedece"],
        baja: "«Responde el proveedor porque es el dueño del algoritmo»." },
      { t: "El sanatorio dice que el sistema redujo un 30 % las esperas. Evalúe la decisión de mantenerlo desde el utilitarismo, la deontología y el contractualismo. ¿Coinciden?", pts: 10,
        modelo: [
          "Utilitarismo: cuenta el beneficio a miles de pacientes por menos espera, pero también los falsos negativos: el error crítico en urgencias es el falso negativo, con un daño potencialmente irreversible. Si se sabe que perjudica a un grupo identificable y existe corrección posible, el balance neto no justifica seguir sin corregir; el utilitarismo estricto podría avalarlo solo con una cuenta global (la objeción del «91 % de accuracy»). Deontología: usar a las mujeres y mayores como medio para mejorar el promedio viola su dignidad; hay un límite que no se cruza por eficiencia. Contractualismo: bajo el velo de ignorancia nadie aceptaría ser la persona con síntomas atípicos sin garantías; se pediría validación por subgrupo, explicación y revisión humana.",
          "No necesariamente coinciden: el utilitarismo podría tolerar el sistema con una compensación de beneficios, mientras que las otras dos lo rechazan en las condiciones actuales. Pero todas exigen, como mínimo, corregirlo o suspenderlo apenas se conoció el sesgo."
        ],
        clave: ["Utilitarismo con el costo del falso negativo", "Deontología: persona como medio", "Contractualismo: velo de ignorancia", "Responde si coinciden", "Aplica al caso, no solo define"],
        baja: "«Como mejoró el promedio, es éticamente correcto»." },
      { t: "Explique el sesgo de TRIAGE-X (fuentes y consecuencias) y qué debe medirse. ¿Qué haría un directivo virtuoso con el informe interno?", pts: 10,
        modelo: [
          "El sesgo es sociotécnico. Puede venir de los datos (síntomas «típicos» documentados en una población, subrepresentación de mujeres y mayores), de la medición (cómo se define urgencia), de los modelos (accuracy global que oculta tasas de error distintas) y del uso (confirmación formal). No es lo mismo que discriminación: bias es un problema estadístico o institucional; se vuelve discriminación cuando hay trato o impacto desfavorable injustificado sobre grupos protegidos, con o sin intención.",
          "Hay que medir la tasa de falsos negativos (FNR) por grupo, porque el error crítico acá es clasificar como no urgente a quien lo era. Un 'accuracy' alto no responde si el sistema es justo.",
          "El directivo virtuoso actúa con prudencia, honestidad y responsabilidad: ante el informe, no se queda en la indecisión ni en el 'los números globales mejoran', sino que suspende o corrige, informa, y asegura la supervisión real."
        ],
        clave: ["Fuentes del sesgo (datos, medición, modelo, uso)", "Bias vs. discriminación", "FNR por grupo como métrica crítica", "Accuracy global no alcanza", "Virtud: prudencia, honestidad y responsabilidad frente a la negligencia"],
        baja: "Confundir sesgo con discriminación." }
    ]
  }
  ]
}

);
