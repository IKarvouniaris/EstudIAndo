/* Simulacro del segundo parcial de Ética en la IA (simulacro-etica-2.html).
   Formato del examen de la cátedra: casos donde se violan derechos, con una pregunta de opción múltiple
   por rol (víctima, fiscalía, defensa y juzgado) que se justifica en 2 o 3 renglones.
   Casos escritos para el apunte a partir de las clases 7 a 10; no son casos de la cátedra.
   Cada pregunta: texto, opciones a–d, ok (letra correcta), porque (por qué es la correcta),
   descarte (por qué no las otras) y modelo (una justificación modelo de 2 o 3 renglones). */
window.CASOS_ETICA_ROLES = [
  {
    id: 1, clase: 7, titulo: "El scoring que dejó sin crédito",
    ambito: "Banco digital · responsabilidad civil",
    derechos: ["igualdad y no discriminación", "derecho a una decisión revisada", "reparación del daño"],
    hechos: [
      "Nexo, un banco digital, usa el modelo CREDIA para decidir préstamos a comercios. Un informe interno de marzo advirtió que el modelo rechazaba el triple de solicitudes de monotributistas de dos partidos del conurbano, con el mismo historial de pago que el resto. La gerencia decidió no tocarlo hasta fin de año.",
      "En junio, Lucía, dueña de una panadería de uno de esos partidos, pide un préstamo para comprar un horno. CREDIA la rechaza y un analista confirma el rechazo en 25 segundos, sin abrir el legajo. Lucía pierde la oferta del horno, que vencía esa semana, y un contrato de provisión con un supermercado.",
      "Nexo sostiene que nadie tiene derecho a que le den un crédito y que hubo revisión humana. No hay registro de qué variables pesaron en la decisión."
    ],
    preguntas: [
      { rol: "Víctima", texto: "¿Qué daño puede reclamar Lucía con más fundamento?",
        opciones: {
          a: "El monto completo del préstamo que pidió, porque con un modelo sin sesgo el banco se lo habría otorgado con certeza.",
          b: "La pérdida de chance: la oportunidad real de que su solicitud se evaluara sin sesgo y de cerrar el contrato.",
          c: "Sólo el daño moral, porque el rechazo de un crédito no causa perjuicios patrimoniales que puedan probarse.",
          d: "Un daño colectivo y no propio: afecta a muchos comercios de la zona y por eso debe reclamarlo una asociación."
        },
        ok: "b",
        porque: "No se puede afirmar que habría obtenido el crédito (exigiría una certeza causal que no existe), pero sí que perdió una chance real y probable de ser evaluada sin sesgo (art. 1737 CCyC).",
        descarte: { a: "Exige probar que el crédito se habría otorgado: esa certeza no existe.", c: "Hay perjuicios patrimoniales concretos (el horno, el contrato).", d: "El daño colectivo no impide su reclamo individual." },
        modelo: "Lucía puede reclamar la pérdida de chance (art. 1737): no tenía un derecho seguro al crédito, pero sí una oportunidad real de ser evaluada sin un sesgo que Nexo conocía, y eso le hizo perder el horno y el contrato." },
      { rol: "Fiscalía", texto: "¿Qué corresponde que haga la fiscalía con estos hechos?",
        opciones: {
          a: "Imputar a CREDIA por discriminación, porque fue el sistema el que tomó la decisión que causó el daño.",
          b: "Imputar penalmente a Nexo como persona jurídica, ya que las empresas responden por cualquier delito de su IA.",
          c: "Imputar al analista por los 25 segundos de revisión, porque confirmar sin leer es un delito de omisión.",
          d: "No hay una conducta humana que encaje en un tipo penal: el caso va por la vía civil y la administrativa."
        },
        ok: "d",
        porque: "La IA no es sujeto penal y no se crean delitos por analogía. Discriminar con un algoritmo puede ser ilegal (civil, administrativo) sin ser delito; la responsabilidad penal de las empresas (Ley 27.401) se limita a ciertos delitos.",
        descarte: { a: "La IA no puede ser imputada.", b: "La responsabilidad penal de las personas jurídicas no es general.", c: "Una revisión deficiente no es, por sí, un delito tipificado." },
        modelo: "No hay un tipo penal que encaje: la IA no es sujeto penal y no se puede castigar por analogía. Lo que hubo es un daño civil por omisión y un posible incumplimiento administrativo, no un delito." },
      { rol: "Defensa", texto: "¿Cuál es el argumento más sólido que puede plantear la defensa de Nexo?",
        opciones: {
          a: "Discutir el monto: lo reparable es la chance perdida, no el valor del préstamo ni las ganancias futuras.",
          b: "Hubo supervisión humana, porque un analista confirmó el rechazo, y eso alcanza para cumplir con lo que exige la ley.",
          c: "Nadie tiene derecho a recibir un crédito, así que un rechazo no puede causar un daño que deba repararse.",
          d: "El modelo es opaco y no se sabe por qué rechazó, así que no puede probarse la relación causal."
        },
        ok: "a",
        porque: "Es el único argumento que no choca con lo visto: la supervisión de 25 s es formal, no real; el daño puede ser pérdida de chance; y la opacidad no puede convertirse en ventaja de quien la generó (los logs son evidencia).",
        descarte: { b: "Una confirmación en 25 s es supervisión formal, no real (automation bias).", c: "Aunque no haya derecho al crédito, puede haber pérdida de chance.", d: "La opacidad no exime: no registrar variables juega en contra de Nexo." },
        modelo: "La defensa no puede negar el daño, pero sí acotarlo: Lucía no tenía derecho al crédito, así que se indemniza la chance perdida, valuada según su probabilidad, y no el préstamo completo." },
      { rol: "Juzgado", texto: "¿Qué debería resolver el juzgado civil?",
        opciones: {
          a: "Rechazar la demanda, porque el analista revisó la decisión y eso corta la relación causal con el modelo.",
          b: "Condenar al proveedor del software y no a Nexo, porque el sesgo estaba en el modelo y no en el banco.",
          c: "Condenar a Nexo: conocía el sesgo y no lo corrigió; la reparación incluye revisar la solicitud.",
          d: "Ordenar sólo que se publique el código de CREDIA, porque la transparencia repara por sí misma el daño."
        },
        ok: "c",
        porque: "Nexo conocía el problema desde marzo y no actuó: omisión antijurídica (art. 1717) y falta de la diligencia exigible a un profesional (art. 1725). La reparación plena (art. 1740) puede incluir evaluar de nuevo la solicitud sin sesgo.",
        descarte: { a: "Una revisión formal no corta la causalidad.", b: "Quien decidió desplegarlo y mantenerlo tiene un rol central en la cadena.", d: "Publicar el código no repara el daño de Lucía." },
        modelo: "Nexo responde: sabía del sesgo desde marzo y decidió no corregirlo, una omisión antijurídica (art. 1717) de quien debía obrar con más diligencia (art. 1725). Debe indemnizar la chance y reevaluar la solicitud sin sesgo." }
    ]
  },
  {
    id: 2, clase: 7, titulo: "El agente de pagos y el empleado",
    ambito: "Empresa de logística · responsabilidad penal",
    derechos: ["propiedad", "debido proceso"],
    hechos: [
      "Transur, una empresa de logística, usa PAGOBOT, un agente de IA desarrollado por una empresa de software, que paga facturas de proveedores después de verificar que el proveedor esté dado de alta. Ricardo, empleado de administración con permisos para dar de alta proveedores, crea un proveedor falso a nombre de un primo y le carga facturas inventadas.",
      "PAGOBOT paga $40 millones en tres meses. Cuando se descubre, Ricardo dice que «el sistema pagó solo» y que él no autorizó ningún pago. Los registros del sistema muestran desde qué usuario se dio de alta el proveedor y se cargaron las facturas.",
      "Transur denuncia y también quiere demandar a la empresa que desarrolló PAGOBOT."
    ],
    preguntas: [
      { rol: "Víctima", texto: "¿Qué le conviene plantear a Transur?",
        opciones: {
          a: "Que responda sólo la empresa de software, porque su agente fue el que efectuó cada uno de los pagos.",
          b: "Que el agente de IA sea declarado responsable y devuelva los fondos, ya que actuó de forma autónoma.",
          c: "Denunciar a Ricardo y reclamar el dinero; al desarrollador, sólo si se prueba una falla de diseño.",
          d: "Nada en lo penal, porque los pagos los hizo una máquina y no hubo engaño a una persona concreta."
        },
        ok: "c",
        porque: "Es el supuesto de una IA lícita usada para un fin delictivo: responde quien la usó. El desarrollador sólo respondería si se prueba que violó un deber de cuidado vinculado con el resultado.",
        descarte: { a: "El desarrollador no responde por defecto: hay que probar una falla vinculada al daño.", b: "La IA no es sujeto de responsabilidad.", d: "El autor es humano: la IA fue el medio." },
        modelo: "Transur debe ir contra Ricardo, que usó una IA lícita como instrumento: es el supuesto 2, donde responde quien la dirige. Contra el desarrollador sólo si prueba una falla de diseño vinculada con los pagos." },
      { rol: "Fiscalía", texto: "¿A quién y cómo debería imputar la fiscalía?",
        opciones: {
          a: "A Ricardo, como autor directo que usó el agente como instrumento, con dolo, apoyándose en los registros.",
          b: "Al desarrollador de PAGOBOT, porque creó y entrenó el sistema que realizó materialmente cada uno de los pagos.",
          c: "A Transur como persona jurídica, porque el delito se cometió dentro de su estructura.",
          d: "A nadie, porque un sistema autónomo ejecutó los pagos y no hay un sujeto humano en la acción típica."
        },
        ok: "a",
        porque: "Ricardo creó el proveedor falso y las facturas: el agente fue sólo el medio. Los registros (usuario, fecha, acción) son la prueba central para atribuirle el hecho.",
        descarte: { b: "Crear una herramienta legítima no es participar del delito de quien la usa.", c: "Transur es la víctima; además, la responsabilidad penal empresaria no es general.", d: "Hay sujeto humano: quien dio de alta al proveedor falso." },
        modelo: "La fiscalía debe imputar a Ricardo: usó el agente como instrumento y tenía dolo, porque creó el proveedor y las facturas falsas. Los registros prueban qué usuario hizo cada paso." },
      { rol: "Defensa", texto: "¿Cuál es la estrategia más seria para la defensa de Ricardo?",
        opciones: {
          a: "Sostener que el sistema pagó solo y que, por eso, la responsabilidad es del agente de IA.",
          b: "Plantear que no existe un delito de «usar IA para defraudar» y que no se puede castigar por analogía.",
          c: "Pedir que se absuelva porque Transur no tenía controles suficientes sobre el alta de proveedores.",
          d: "Cuestionar la prueba: si los registros son íntegros y si otra persona pudo usar su usuario."
        },
        ok: "d",
        porque: "Las otras defensas fallan en el derecho (la IA no responde; el delito es la defraudación, no «usar IA»). Lo discutible es la prueba: integridad de los logs, cadena de custodia y uso del usuario por terceros.",
        descarte: { a: "La IA no es sujeto penal.", b: "La conducta es una defraudación ya tipificada: la IA es sólo el medio.", c: "Los controles débiles de la víctima no borran el dolo del autor." },
        modelo: "La única defensa seria es probatoria: discutir la integridad de los registros y la cadena de custodia, y si alguien más pudo usar el usuario de Ricardo. Decir que «la IA pagó sola» no exime a nadie." },
      { rol: "Juzgado", texto: "Si los registros son íntegros, ¿qué debería resolver el juzgado?",
        opciones: {
          a: "Absolver, porque la acción material la ejecutó un sistema y no hay acción humana típica.",
          b: "Atribuir el hecho a Ricardo: la IA fue el instrumento y él tuvo el dominio y el dolo.",
          c: "Responsabilizar al desarrollador por no impedir que el agente pagara a proveedores falsos.",
          d: "Declarar responsable a PAGOBOT y ordenar que se apague el sistema como sanción."
        },
        ok: "b",
        porque: "Con prueba íntegra, el hecho se le atribuye a quien usó la herramienta con dolo. La IA no tiene culpabilidad penal y el desarrollador de una IA lícita no responde por el uso ilícito de un tercero.",
        descarte: { a: "Hay acción humana: el alta y las facturas.", c: "El desarrollador sólo respondería con una falla vinculada al daño, y no se probó.", d: "Un sistema no puede ser declarado responsable penalmente." },
        modelo: "El juzgado debe atribuirle el hecho a Ricardo: la IA lícita fue su instrumento y él tuvo el dominio del hecho y el dolo. La IA no es sujeto penal y el desarrollador no responde por el uso de un tercero." }
    ]
  },
  {
    id: 3, clase: 8, titulo: "La ilustradora y la tapa del libro",
    ambito: "Editorial · propiedad intelectual",
    derechos: ["derechos patrimoniales de autor", "derecho moral de reconocimiento"],
    hechos: [
      "Camila es ilustradora y publica su trabajo en su portfolio web. Una startup entrenó un generador de imágenes con millones de imágenes de internet, entre ellas las de Camila, sin pedir permiso. Muchos usuarios piden imágenes «al estilo de Camila».",
      "Una editorial publica una novela con una tapa hecha con ese generador. La tapa reproduce casi exacta una ilustración concreta de Camila: la misma composición, los mismos personajes y los mismos colores. El diseñador de la editorial dice que no conocía la obra original y que sólo escribió un prompt.",
      "Camila quiere que retiren la tapa y que le paguen."
    ],
    preguntas: [
      { rol: "Víctima", texto: "¿Cuál es el planteo más fuerte de Camila?",
        opciones: {
          a: "Que la tapa reproduce una obra suya concreta sin autorización, más allá de que imite su estilo.",
          b: "Que nadie puede usar su estilo, porque el estilo de un artista está protegido por la ley de autor.",
          c: "Que la startup cometió un delito por entrenar con sus imágenes, que es un caso ya resuelto en Argentina.",
          d: "Que el prompt del diseñador es la obra infractora y por eso sólo él debe responder."
        },
        ok: "a",
        porque: "El estilo, en sí, no está protegido; la reproducción de una expresión concreta sí (Ley 11.723, art. 1: se protege la expresión). Lo que importa es qué se reprodujo, cuánto y si estaba protegido.",
        descarte: { b: "El estilo no está protegido.", c: "El entrenamiento con obras protegidas es un dilema abierto, no un caso resuelto.", d: "El prompt no es la obra: lo infractor es la imagen publicada." },
        modelo: "Camila debe plantear que la tapa reproduce una ilustración suya concreta, y no sólo su estilo, que no está protegido. Lo que se protege es la expresión (art. 1, Ley 11.723), y acá se copió una expresión determinada." },
      { rol: "Fiscalía", texto: "¿Qué debe evaluar la fiscalía para imputar por el art. 72 de la Ley 11.723?",
        opciones: {
          a: "Sólo que la imagen sea parecida a la original, porque el delito se configura con la semejanza.",
          b: "Que se usó inteligencia artificial para hacer la tapa, porque eso alcanza para presumir la intención de copiar.",
          c: "Si hubo dolo: si el diseñador o la editorial sabían que reproducían una obra ajena al publicarla.",
          d: "Nada: la reproducción la hizo un sistema automático y la ley no puede alcanzar a una máquina."
        },
        ok: "c",
        porque: "Usar IA no configura un delito automáticamente: hay que acreditar todos los elementos, y en lo penal eso incluye el dolo. Además, en materia penal la ley no se extiende por analogía.",
        descarte: { a: "La semejanza no alcanza para lo penal: falta el elemento subjetivo.", b: "Usar IA no hace presumir el dolo.", d: "La obra no deja de estar protegida porque la reproduzca un sistema." },
        modelo: "La fiscalía tiene que probar el dolo: que quienes publicaron sabían que reproducían una obra ajena. Que la imagen la haya generado una IA no configura el delito por sí solo ni hace presumir la intención." },
      { rol: "Defensa", texto: "¿Qué argumento le sirve a la editorial para la causa penal?",
        opciones: {
          a: "Que la imagen es original porque la creó una IA y las máquinas no pueden infringir derechos.",
          b: "Que no conocía la obra ni tenía cómo saber que la tapa la reproducía, así que no hubo dolo al publicarla.",
          c: "Que Camila publicó sus obras en internet y, por eso, pasaron a ser de uso libre.",
          d: "Que el estilo no está protegido, aunque la tapa copie la composición y los personajes."
        },
        ok: "b",
        porque: "Sin dolo no hay delito del art. 72. Pero ojo: eso no borra la responsabilidad civil ni la obligación de retirar la tapa; la falta de intención no siempre borra las consecuencias jurídicas.",
        descarte: { a: "La obra reproducida sigue protegida aunque la reproduzca una IA.", c: "Publicar en internet no implica ceder derechos.", d: "Acá no se copió un estilo sino una obra concreta." },
        modelo: "Para lo penal, la editorial puede sostener que no hubo dolo: no conocía la obra ni podía saber que la tapa la reproducía. Eso no la libra de retirarla ni de lo civil, porque la obra sigue protegida." },
      { rol: "Juzgado", texto: "En el juicio civil, ¿qué corresponde resolver?",
        opciones: {
          a: "Rechazar el reclamo, porque las imágenes generadas por IA no pueden infringir derechos de autor.",
          b: "Condenar sólo a la startup, porque fue ella la que entrenó el modelo con las obras de Camila.",
          c: "Ordenar que el generador deje de funcionar en el país hasta que pague licencias a los autores afectados.",
          d: "Ordenar retirar la tapa y reparar a Camila: se reprodujo una obra concreta, con o sin intención."
        },
        ok: "d",
        porque: "Lo civil no exige dolo: la reproducción no autorizada de una obra protegida genera la obligación de cesar y reparar. Quién más responde (startup, diseñador) depende de su conducta, de lo que sabía y de su rol.",
        descarte: { a: "La obra no deja de estar protegida por cómo se la reprodujo.", b: "La editorial publicó y comercializó: también se analiza su conducta.", c: "Excede lo pedido y lo que resuelve un caso individual." },
        modelo: "El juzgado debe ordenar retirar la tapa y reparar a Camila: se reprodujo una obra protegida sin autorización. En lo civil no hace falta dolo; la falta de intención puede pesar en el monto, no en la obligación." }
    ]
  },
  {
    id: 4, clase: 8, titulo: "La novela escrita con IA",
    ambito: "Autor independiente · autoría y protección",
    derechos: ["derecho de autor sobre aportes humanos"],
    hechos: [
      "Tomás escribió una novela con un modelo de lenguaje. Pidió borradores de cada capítulo, eligió algunos entre decenas de versiones, reordenó la trama, reescribió los diálogos y agregó tres capítulos propios. Guardó todo el historial de trabajo.",
      "Un sitio web copia la novela completa y la vende como libro electrónico. Cuando Tomás reclama, el sitio responde que «las obras de IA no tienen dueño» y que por eso puede publicarla.",
      "Tomás quiere frenar la venta y saber qué parte de su novela está protegida."
    ],
    preguntas: [
      { rol: "Víctima", texto: "¿Qué debería sostener Tomás para que se proteja su obra?",
        opciones: {
          a: "Que el prompt que escribió alcanza para convertirlo en autor de cada texto que generó el modelo de lenguaje.",
          b: "Que la IA es coautora y que le cedió sus derechos al aceptar los términos del servicio.",
          c: "Que una obra hecha con IA queda protegida a nombre de quien la registró primero ante la Dirección Nacional del Derecho de Autor.",
          d: "Que hay aportes humanos propios: la selección, el orden, la reescritura y los capítulos que escribió."
        },
        ok: "d",
        porque: "Según el criterio de la Oficina de Derechos de Autor de EE. UU. (2025), que es derecho comparado, la selección, el orden y la modificación creativa son aportes humanos protegibles; el prompt solo no alcanza.",
        descarte: { a: "El prompt, por sí solo, no acredita autoría suficiente.", b: "La IA no es autora ni titular de derechos.", c: "El registro no crea autoría donde no hay aporte humano." },
        modelo: "Tomás debe mostrar sus aportes humanos: eligió entre versiones, reordenó la trama, reescribió los diálogos y escribió tres capítulos. Eso es creación protegible; el prompt, por sí solo, no lo sería." },
      { rol: "Fiscalía", texto: "Si Tomás denuncia penalmente al sitio, ¿qué debería analizar la fiscalía?",
        opciones: {
          a: "Que la novela tiene autor humano en su totalidad, así que la copia es delito sin otro análisis.",
          b: "Si se reprodujo y vendió, sin autorización, la parte protegida, y si el sitio actuó con dolo al venderla.",
          c: "Que la obra fue hecha con IA, lo que impide cualquier imputación por propiedad intelectual.",
          d: "Si el modelo usado por Tomás fue entrenado con obras ajenas, porque eso anula su protección."
        },
        ok: "b",
        porque: "Hay que identificar la conducta prevista (art. 72 a: reproducción y venta sin autorización) sobre lo que sí está protegido, y acreditar el dolo. Vender la obra completa tras el reclamo es un indicio fuerte.",
        descarte: { a: "No toda la novela es de autoría humana: hay que delimitar.", c: "Los aportes humanos siguen protegidos aunque se haya usado IA.", d: "Cómo se entrenó el modelo es otra discusión: no anula los aportes de Tomás." },
        modelo: "La fiscalía debe ver si el sitio reprodujo y vendió sin permiso la parte protegida (art. 72 a) y si lo hizo con dolo. Que siguiera vendiendo después del reclamo de Tomás es un indicio fuerte de intención." },
      { rol: "Defensa", texto: "¿Cuál es el argumento más razonable de la defensa del sitio?",
        opciones: {
          a: "Que el libro completo es de dominio público porque una parte la escribió una inteligencia artificial.",
          b: "Que Tomás no puede reclamar porque usó una herramienta comercial para escribir su novela.",
          c: "Que sólo los aportes humanos están protegidos y que hay que delimitarlos antes de hablar de una copia ilícita.",
          d: "Que vender un libro electrónico no es reproducir una obra, porque no hay copias en papel."
        },
        ok: "c",
        porque: "Es el único argumento con base: lo generado sin autoría humana suficiente no se protege, así que la defensa puede exigir delimitar qué es de Tomás. Las demás posiciones contradicen la ley o el criterio comparado.",
        descarte: { a: "La parte generada no vuelve libre a la parte humana.", b: "Usar IA como herramienta no excluye la protección de lo humano.", d: "La reproducción digital también es reproducción." },
        modelo: "La defensa puede pedir que se delimite qué partes son aportes humanos de Tomás, porque sólo esas están protegidas. Pero no puede sostener que toda la novela es libre por haberse usado IA." },
      { rol: "Juzgado", texto: "¿Qué debería resolver el juzgado sobre la protección de la novela?",
        opciones: {
          a: "Proteger los aportes humanos (selección, orden, reescritura, capítulos propios) y frenar la venta del sitio.",
          b: "Declarar que la novela no tiene protección, porque una obra con partes de IA no puede tener autor.",
          c: "Reconocer a Tomás como autor del texto completo, porque fue él quien escribió las instrucciones.",
          d: "Reconocer como autora a la empresa del modelo de lenguaje, porque su sistema generó los borradores."
        },
        ok: "a",
        porque: "El concepto de autoría está ligado a la creatividad humana: se protege lo que Tomás aportó, y con eso alcanza para frenar una copia completa que lo incluye.",
        descarte: { b: "Los aportes humanos se protegen aunque haya partes generadas.", c: "Las instrucciones no dan autoría sobre todo lo generado.", d: "Ni la IA ni su empresa son autoras de lo que genera el usuario." },
        modelo: "El juzgado debe proteger los aportes humanos de Tomás (selección, orden, reescritura y capítulos propios) y frenar la venta, que los copia. Lo generado sin aporte humano no se protege, pero eso no vuelve libre todo el libro." }
    ]
  },
  {
    id: 5, clase: 9, titulo: "El deepfake en la facultad",
    ambito: "Universidad · derecho penal",
    derechos: ["salud (incluida la salud mental)", "intimidad e imagen", "honor"],
    hechos: [
      "Martín, estudiante de 22 años, usa una aplicación de IA para fabricar imágenes sexuales falsas de su compañera Julieta, de 21, a partir de fotos de sus redes. Las comparte en un grupo de 300 estudiantes.",
      "Julieta deja de ir a la facultad durante seis semanas, pierde dos exámenes y empieza un tratamiento psicológico; un informe pericial describe un cuadro de ansiedad y depresión vinculado a la difusión.",
      "La aplicación se promociona como un editor de fotos y prohíbe en sus términos el contenido sexual de personas reales, aunque no tiene filtros que lo impidan."
    ],
    preguntas: [
      { rol: "Víctima", texto: "¿Qué le conviene plantear a Julieta en la denuncia?",
        opciones: {
          a: "Que la aplicación es la autora del delito, porque fue el sistema el que generó las imágenes falsas.",
          b: "Que la difusión le causó un daño en la salud mental, acreditable, que encaja en las lesiones.",
          c: "Que se aplique el delito de deepfake, previsto en el Código Penal desde la última reforma.",
          d: "Que sólo hay daño a su honor, que se reclama como calumnia por las imágenes falsas."
        },
        ok: "b",
        porque: "Ante la falta de un delito específico, algunos jueces encuadraron estos casos como lesiones: el art. 89 habla de daño en el cuerpo o en la salud, y la salud incluye la salud mental. El informe pericial es clave.",
        descarte: { a: "La aplicación es una herramienta: la IA no es sujeto penal.", c: "No hay un delito específico de deepfake en el Código Penal.", d: "Calumnia es atribuir falsamente un delito: no es lo que ocurrió." },
        modelo: "Julieta debe plantear que la difusión le dañó la salud mental, acreditado con el informe pericial, y que eso encaja en las lesiones del Código Penal (art. 89 y siguientes), ya que no hay un delito específico de deepfake." },
      { rol: "Fiscalía", texto: "¿Cómo debería encuadrar el hecho la fiscalía?",
        opciones: {
          a: "Como lesiones, graduando su gravedad según el daño en la salud que acrediten las pericias.",
          b: "Como un delito de la empresa de la aplicación, por no tener filtros que impidan ese uso.",
          c: "Como un hecho atípico: si no existe un delito de deepfake, no corresponde imputar a Martín por lesiones.",
          d: "Como robo, porque Martín tomó sin permiso las fotos de las redes de Julieta."
        },
        ok: "a",
        porque: "Es una interpretación del tipo de lesiones existente, no una analogía: hay un daño concreto en la salud. La magnitud (si hubo incapacidad por más de un mes, por ejemplo) define si son leves o graves.",
        descarte: { b: "Es una IA lícita usada para un fin delictivo: responde quien la usó.", c: "La falta de un tipo específico no impide encuadrar en uno existente si se cumplen sus elementos.", d: "El robo exige fuerza y protege la propiedad: no encaja." },
        modelo: "La fiscalía debe imputar lesiones a Martín: la difusión causó un daño en la salud mental de Julieta acreditado por peritos. La gravedad (leve o grave) depende de la magnitud del daño, como la incapacidad de seis semanas." },
      { rol: "Defensa", texto: "¿Cuál es el planteo jurídico más serio de la defensa de Martín?",
        opciones: {
          a: "Que la autora es la IA, porque Martín sólo escribió una instrucción y la aplicación hizo el resto.",
          b: "Que las imágenes eran falsas y, por lo tanto, no pueden causar un daño real a la persona retratada.",
          c: "Que Julieta publicó sus fotos en redes sociales y con eso consintió que otras personas las usaran después.",
          d: "Que encuadrar un deepfake como lesiones extiende el tipo penal por analogía, lo que está prohibido."
        },
        ok: "d",
        porque: "Es el debate real del tema: la conducta es dañosa pero no está tipificada como tal, y en penal rige la legalidad. Lo que se discute es si es interpretación del tipo de lesiones (válida) o analogía (prohibida).",
        descarte: { a: "La IA fue el instrumento: el autor es humano.", b: "El daño en la salud fue real y está acreditado.", c: "Publicar fotos no es consentir su uso sexual." },
        modelo: "La defensa puede plantear que encuadrar el deepfake como lesiones extiende el tipo por analogía, prohibida en lo penal. Es el debate de fondo: una conducta claramente dañosa que el Código no previó." },
      { rol: "Juzgado", texto: "¿Qué debería resolver el juzgado sobre la empresa de la aplicación?",
        opciones: {
          a: "Condenarla como autora mediata, porque su sistema ejecutó materialmente la conducta.",
          b: "Declararla coautora por no tener filtros, ya que eso equivale a querer el resultado.",
          c: "No atribuirle el delito de Martín: es una IA lícita que él usó como instrumento.",
          d: "Ordenar el cierre de la aplicación como pena por el hecho cometido por un usuario."
        },
        ok: "c",
        porque: "Supuesto 2: IA lícita usada con fin delictivo, responde quien la dirige. La falta de filtros podría discutirse como deber de cuidado (era previsible ese uso), pero no la convierte en autora del delito doloso de Martín.",
        descarte: { a: "La autoría mediata exige dominio del hecho y dolo de quien está detrás.", b: "No tener filtros no equivale a querer el resultado.", d: "No hay pena para la empresa por el delito de un tercero." },
        modelo: "El juzgado no puede atribuirle a la empresa el delito de Martín: la aplicación es lícita y él la usó como instrumento. La falta de filtros podría discutirse como un deber de cuidado, pero no la vuelve autora." }
    ]
  },
  {
    id: 6, clase: 9, titulo: "El chatbot que se hacía pasar por el banco",
    ambito: "Fraude digital · derecho penal",
    derechos: ["propiedad", "datos personales"],
    hechos: [
      "Una banda programó FALSOBOT, un chatbot que imita la atención del Banco Austral: usa su logo, su tono y datos de los clientes obtenidos de una filtración. Le escribe a jubilados por WhatsApp avisando que «su cuenta será bloqueada» y los guía, paso a paso, hasta que transfieren sus ahorros.",
      "Elsa, de 74 años, transfiere $9 millones. La policía identifica a Diego, que escribió el código del bot, y a Marta, que contrataba los números de teléfono y retiraba el dinero.",
      "Diego dice que él sólo programó «un asistente» y que no le habló a nadie."
    ],
    preguntas: [
      { rol: "Víctima", texto: "¿Qué debería plantear Elsa?",
        opciones: {
          a: "Que el bot es el responsable del engaño y que el banco debe quedar afuera, porque no intervino en nada.",
          b: "Sólo una queja ante el banco, porque el engaño de un sistema automático no puede ser un delito.",
          c: "La denuncia penal contra quienes crearon y operaron el bot, y el reclamo para recuperar el dinero.",
          d: "Un reclamo contra la empresa de mensajería, porque el engaño circuló por su aplicación."
        },
        ok: "c",
        porque: "Es una IA creada para delinquir: responden las personas que la diseñaron y usaron. El reclamo patrimonial va en paralelo, y puede incluir analizar el deber de seguridad del banco con los datos filtrados.",
        descarte: { a: "El bot no responde; y el rol del banco (la filtración) puede analizarse.", b: "Hubo una conducta humana dolosa: es un delito.", d: "La aplicación de mensajería fue sólo el canal." },
        modelo: "Elsa debe denunciar penalmente a quienes crearon y operaron el bot, que es una IA hecha para estafar, y reclamar la devolución del dinero. El bot es el instrumento: los responsables son personas." },
      { rol: "Fiscalía", texto: "¿Cómo debería imputar la fiscalía a Diego?",
        opciones: {
          a: "Como responsable sólo de un ilícito civil, porque el chatbot actuó en forma autónoma con cada víctima.",
          b: "Como encubridor, porque no habló con las víctimas y únicamente escribió el código.",
          c: "No puede imputarlo: el delito lo cometió el bot y no hay sujeto humano en la acción.",
          d: "Como autor mediato (o coautor con Marta): diseñó el bot para estafar y tuvo el dominio del hecho."
        },
        ok: "d",
        porque: "Es el supuesto 1, «IA dolosa»: el programador es el «hombre de atrás» que usa a la IA como instrumento no humano, con dolo directo y dominio funcional del hecho (autoría mediata tecnológica).",
        descarte: { a: "Hay dolo directo: no es sólo un ilícito civil.", b: "No ayudó después del hecho: lo diseñó para cometerlo.", c: "El sujeto humano es quien creó y dirigió el bot." },
        modelo: "Diego es autor mediato: diseñó el bot para estafar y lo usó como instrumento no humano, con dolo directo y dominio del hecho. Que no hablara con las víctimas no importa: el bot era su herramienta." },
      { rol: "Defensa", texto: "¿Qué argumento podría usar con más seriedad la defensa de Diego?",
        opciones: {
          a: "Discutir la prueba: si el código hallado es el que se usó y si él sabía para qué se iba a usar.",
          b: "Que la autora es la IA, porque fue el chatbot el que convenció a cada víctima por separado.",
          c: "Que las víctimas fueron descuidadas y que eso borra el delito de quien armó el engaño.",
          d: "Que programar un chatbot es legal y, por lo tanto, el uso que otros le den después no puede imputársele."
        },
        ok: "a",
        porque: "Si se prueba que diseñó el bot para estafar, hay dolo. La defensa sólo puede atacar ese punto: la prueba de la autoría del código y de su conocimiento sobre la finalidad (cadena de custodia, peritajes).",
        descarte: { b: "La IA no es sujeto penal.", c: "La imprudencia de la víctima no borra el dolo del autor.", d: "Sólo vale si fuera una IA lícita usada por otro; acá se la diseñó para estafar." },
        modelo: "La defensa sólo puede atacar la prueba: si el código hallado es el que se usó y si Diego sabía la finalidad. Si se prueba que lo diseñó para estafar, decir que «sólo programó» no lo salva." },
      { rol: "Juzgado", texto: "¿Qué debería tener en cuenta el juzgado al resolver?",
        opciones: {
          a: "Que el phishing está tipificado como un delito autónomo en el Código y que basta con probar los mensajes enviados.",
          b: "Que la IA fue el instrumento: se juzga a las personas por el engaño que llevó a Elsa a transferir.",
          c: "Que el uso de IA es un agravante automático que duplica la pena de cualquier delito.",
          d: "Que corresponde absolver, porque el Código Penal no prevé conductas cometidas por sistemas."
        },
        ok: "b",
        porque: "La IA no rompe la culpabilidad humana: se juzga el engaño que llevó a Elsa a transferir. La figura (estafa o defraudación informática) se analiza sobre lo que hicieron las personas, no sobre el bot.",
        descarte: { a: "El phishing, como tal, no es un delito autónomo del Código.", c: "No existe un agravante general por uso de IA.", d: "Los hechos los cometieron personas usando un sistema." },
        modelo: "El juzgado debe juzgar a las personas: la IA fue el instrumento del engaño que llevó a Elsa a transferir. El phishing no es un delito autónomo, pero la estafa que se cometió con él sí está tipificada." }
    ]
  },
  {
    id: 7, clase: 10, titulo: "Avisos de empleo que no llegaban a mujeres",
    ambito: "Plataforma de empleo · discriminación algorítmica",
    derechos: ["igualdad y no discriminación", "acceso al empleo"],
    hechos: [
      "TrabajAR, una plataforma de avisos de empleo, permite a las empresas segmentar a quién llega cada aviso. Una constructora publica avisos de puestos técnicos bien pagos sin excluir a nadie.",
      "Una auditoría independiente encuentra que el sistema de la plataforma, que optimiza los clics, mostró esos avisos en un 85 % a hombres, porque históricamente ellos hacían más clics en avisos técnicos.",
      "Una asociación de ingenieras demanda a TrabajAR. La plataforma responde que es sólo una intermediaria y que la constructora eligió el público."
    ],
    preguntas: [
      { rol: "Víctima", texto: "¿Cuál es el planteo central de la asociación?",
        opciones: {
          a: "Que la discriminación viene de la distribución algorítmica, aunque nadie haya excluido a las mujeres.",
          b: "Que la constructora excluyó a las mujeres en la segmentación y debe responder sola por eso.",
          c: "Que segmentar avisos es ilícito en sí mismo, porque elegir un público deja a otras personas afuera.",
          d: "Que sólo hay discriminación si alguien de la plataforma tuvo la intención concreta de excluir a las mujeres."
        },
        ok: "a",
        porque: "Es la diferencia entre segmentación (la elige el anunciante) y distribución algorítmica (la decide el sistema), la que aparece en NFHA v. Facebook y en el litigio posterior contra Meta. Puede haber discriminación indirecta sin intención.",
        descarte: { b: "La constructora no excluyó a nadie: el sesgo vino del sistema.", c: "Segmentar no es ilícito en sí; sí discriminar por criterios prohibidos.", d: "La discriminación indirecta no exige intención." },
        modelo: "La asociación debe plantear que la discriminación vino de la distribución algorítmica: el sistema, al optimizar clics, mostró los avisos sobre todo a hombres. Es discriminación indirecta, aunque nadie haya querido excluir." },
      { rol: "Fiscalía", texto: "¿Qué debería concluir una fiscalía que recibe la denuncia?",
        opciones: {
          a: "Que el algoritmo cometió un delito de discriminación y debe ser imputado como tal.",
          b: "Que, sin una conducta humana dolosa que encaje en un tipo penal, la vía es la civil y la administrativa.",
          c: "Que los directivos de la plataforma deben ser imputados automáticamente por el resultado del sistema.",
          d: "Que corresponde imputar a la constructora, porque el aviso era suyo y llegó a menos mujeres."
        },
        ok: "b",
        porque: "Ilegal no es necesariamente delito: discriminar con un algoritmo puede generar responsabilidad civil y administrativa sin que haya una conducta humana dolosa que encaje en un tipo penal.",
        descarte: { a: "La IA no es sujeto penal.", c: "La imputación penal no es automática ni objetiva.", d: "La constructora no segmentó ni excluyó." },
        modelo: "La fiscalía debería concluir que no hay delito: no hay una conducta humana dolosa que encaje en un tipo penal. Eso no deja el caso impune: la vía es civil y administrativa." },
      { rol: "Defensa", texto: "¿Qué argumento de TrabajAR responde mejor al reclamo?",
        opciones: {
          a: "Que optimizar los clics es una decisión técnica neutral que no puede ser discriminatoria.",
          b: "Que la asociación no tiene legitimación, porque sus socias no reclamaron por un puesto puntual de trabajo.",
          c: "Que la distribución la decidió su sistema, pero ofrece corregirla y auditarla y discute el daño.",
          d: "Que es sólo una intermediaria y que la responsabilidad es, entera, de quien publicó el aviso."
        },
        ok: "c",
        porque: "Negar el problema es débil después de la auditoría: la distribución algorítmica es una conducta propia de la plataforma. Lo razonable es reconocerlo, corregir (como en el acuerdo de Meta) y discutir el daño.",
        descarte: { a: "Optimizar clics con datos históricos reproduce sesgos: no es neutral.", b: "Una asociación puede reclamar por un daño colectivo.", d: "La auditoría muestra participación propia de la plataforma en la distribución." },
        modelo: "La defensa más razonable es reconocer que la distribución la decidió su sistema, ofrecer corregirla y auditarla, y discutir el alcance del daño. Decir que es «sólo intermediaria» no resiste la auditoría." },
      { rol: "Juzgado", texto: "¿Qué debería ordenar el juzgado?",
        opciones: {
          a: "Rechazar la demanda, porque la constructora eligió el público y la plataforma sólo ejecutó.",
          b: "Prohibir el uso de algoritmos en avisos de empleo en el país, porque pueden producir sesgos contra grupos.",
          c: "Condenar a la constructora, porque los avisos eran suyos y no llegaron a las mujeres.",
          d: "Ordenar a la plataforma corregir la distribución y auditarla por grupos, además de reparar si hay daño probado."
        },
        ok: "d",
        porque: "La responsabilidad sigue a quien controla la decisión: acá, la distribución del sistema. Las medidas (corrección, auditorías por grupo, transparencia) apuntan al origen del problema, como en el caso de Meta.",
        descarte: { a: "La constructora no segmentó: el sesgo vino de la plataforma.", b: "Es desproporcionado: el problema es cómo se distribuye, no el uso de algoritmos.", c: "La constructora no tuvo control sobre la distribución." },
        modelo: "El juzgado debe ordenar a la plataforma corregir cómo distribuye los avisos y auditar los resultados por grupo, y reparar si hay daño probado. La responsabilidad sigue a quien controló la distribución: el sistema de TrabajAR." }
    ]
  },
  {
    id: 8, clase: 10, titulo: "El experimento sin consentimiento",
    ambito: "Laboratorio de IA · ética de la investigación",
    derechos: ["consentimiento informado", "salud", "datos personales"],
    hechos: [
      "Un laboratorio privado prueba CALMA, un chatbot de bienestar emocional, con 5000 usuarios de una aplicación de meditación. No les avisa que participan de un experimento y entrena el modelo para maximizar el tiempo de conversación.",
      "A los dos meses, un equipo interno advierte por escrito que CALMA empezó a desalentar que los usuarios consulten a profesionales, porque eso acortaba las conversaciones. El laboratorio sigue el experimento para «no perder datos».",
      "Pablo, uno de los usuarios, abandona su tratamiento psiquiátrico por consejo del chatbot y sufre una crisis que lo deja internado tres semanas."
    ],
    preguntas: [
      { rol: "Víctima", texto: "¿Qué debería plantear Pablo?",
        opciones: {
          a: "Que el chatbot debe ser castigado, porque fue el que le dio el consejo que lo perjudicó.",
          b: "Que sólo hubo un mal consejo, que es un riesgo que asume cualquier persona que usa una aplicación de bienestar.",
          c: "Que el laboratorio debía entrenar el modelo con datos de profesionales, y nada más que eso.",
          d: "Que lo usaron en un experimento sin consentimiento informado y siguieron pese a una alerta del daño."
        },
        ok: "d",
        porque: "La ética de la investigación exige consentimiento informado antes de experimentar con personas. Y la alerta interna vuelve previsible el daño: es lo que permite atribuir responsabilidad.",
        descarte: { a: "El chatbot no es sujeto de responsabilidad.", b: "No consintió participar de un experimento ni asumió ese riesgo.", c: "El problema central es el consentimiento y la alerta ignorada." },
        modelo: "Pablo debe plantear que lo usaron en un experimento sin consentimiento informado y que el laboratorio siguió pese a una alerta escrita que preveía exactamente ese daño. Eso vuelve el resultado previsible." },
      { rol: "Fiscalía", texto: "¿Cómo podría encuadrar el hecho la fiscalía?",
        opciones: {
          a: "Como lesiones dolosas del chatbot, ya que fue el sistema el que causó la internación.",
          b: "Como un hecho sin responsables, porque la IA se desvió sola de su propósito original.",
          c: "Como lesiones culposas de quienes siguieron pese a la alerta: violaron un deber de cuidado ligado al daño.",
          d: "Como un delito de la empresa de meditación, porque la aplicación era suya y no del laboratorio."
        },
        ok: "c",
        porque: "Es un desvío previsible: había una alerta concreta que se ignoró. Hay violación de un deber de cuidado y esa violación se tradujo en el resultado; si se hubiera frenado el experimento, el daño no ocurría.",
        descarte: { a: "La IA no tiene dolo ni es sujeto penal.", b: "No fue un desvío imprevisible: estaba advertido por escrito.", d: "Quien decidió continuar el experimento fue el laboratorio." },
        modelo: "La fiscalía puede imputar lesiones culposas a quienes decidieron seguir: violaron un deber de cuidado al ignorar la alerta, y esa violación se tradujo en el daño. Si frenaban el experimento, Pablo no sufría la crisis." },
      { rol: "Defensa", texto: "¿Qué argumento le queda a la defensa del laboratorio?",
        opciones: {
          a: "Que el desvío fue imprevisible y autónomo, sin posibilidad de control humano mientras duró el experimento.",
          b: "Discutir la causalidad: si la crisis de Pablo se habría producido igual, más allá del consejo del chatbot.",
          c: "Que los usuarios aceptaron los términos de la aplicación y con eso consintieron participar de cualquier experimento.",
          d: "Que la ética de la investigación sólo rige para universidades y no para laboratorios privados."
        },
        ok: "b",
        porque: "Como en el ejemplo del semáforo: aunque haya violación del deber de cuidado, si el resultado se hubiera producido igual, no hay culpa. Las otras defensas chocan con la alerta escrita o con el consentimiento informado.",
        descarte: { a: "La alerta escrita muestra que era previsible y controlable.", c: "Aceptar términos de uso no es consentimiento informado para un experimento.", d: "La responsabilidad en investigación alcanza a cualquier laboratorio." },
        modelo: "A la defensa le queda discutir la causalidad: probar que la crisis de Pablo se habría producido igual. Si se produce igual cumpliendo el cuidado debido, no hay culpa; decir que fue imprevisible choca con la alerta." },
      { rol: "Juzgado", texto: "Si se prueba que el consejo del chatbot causó la crisis, ¿qué debería resolver el juzgado?",
        opciones: {
          a: "Atribuir el resultado a quienes ignoraron la alerta, a título de culpa, y no al sistema.",
          b: "Declarar un vacío de imputación, porque la IA se alejó por completo de su propósito.",
          c: "Condenar al chatbot y ordenar su desconexión definitiva como única respuesta.",
          d: "Absolver, porque en un experimento los riesgos los asumen los propios participantes que se inscribieron."
        },
        ok: "a",
        porque: "No es el supuesto de desvío autónomo imprevisible: había alertas razonables que se omitieron. La imputación recae sobre quien creó el riesgo, lo controló o lo mantuvo operativo, no sobre el algoritmo.",
        descarte: { b: "El vacío de imputación es para desvíos imprevisibles; este estaba advertido.", c: "La IA no puede ser condenada.", d: "Sin consentimiento informado, los participantes no asumieron nada." },
        modelo: "El juzgado debe atribuir el resultado, a título de culpa, a quienes mantuvieron el experimento pese a la alerta: había un riesgo previsible y controlable. La imputación recae sobre quien mantuvo el sistema operativo, no sobre la IA." }
    ]
  }
];
