/* Simulacros del 2.º parcial de Ética en la IA, formato nuevo (simulacro-etica-2-desarrollo.html). Parte A.
   Lo que anticipó la cátedra: 2 casos breves, con preguntas de opción múltiple (cinco opciones, A–E) y preguntas a desarrollar.
   Entra todo lo subido y lo visto en clase (clases 7 a 10); puede haber algo de sesgos y de teoría de la virtud de la primera parte.

   Estructura de cada simulacro:
     id, titulo, sub, origen ("catedra" | "propio"), fijo (true: las opciones quedan en el orden de la cátedra y cada pregunta trae `ok`),
     casos: [{ id, titulo, ambito, clases, hechos:[párrafos], mc:[...], dev:[...] }]
   Pregunta de opción múltiple: { t, o:[la correcta primero y cuatro distractores], p:"por qué" }  (si fijo: o en orden A–E y ok: índice 0–4).
     Las opciones se mezclan con un orden fijo por pregunta (ver el HTML), así la letra correcta no cae siempre en el mismo lugar.
   Pregunta a desarrollar: { t, pts, modelo:[párrafos], clave:[puntos que tiene que tener la respuesta], baja:"lo que baja la nota" }.

   Los casos de la cátedra (simulacro 0) están resumidos con palabras propias, no copiados; las opciones conservan su sentido y su letra.
   Los casos 1 a 6 se escribieron para el apunte: no son casos oficiales. Las respuestas modelo son una lectura del apunte, no la guía de la cátedra. */
window.SIMULACROS_ETICA_P2 = window.SIMULACROS_ETICA_P2 || [];
window.SIMULACROS_ETICA_P2.push(

/* ==================================================================== 0 · CASOS DE LA CÁTEDRA */
{
  id: 0, titulo: "Los casos de la cátedra", sub: "SONORA y MAREA · con la clave del profe", origen: "catedra", fijo: true,
  casos: [
  {
    id: "0A", titulo: "SONORA: campaña musical y voz sintética", ambito: "Propiedad intelectual · responsabilidad · voz", clases: [7, 8, 9],
    hechos: [
      "SONORA, una empresa argentina, ofrece una plataforma de IA que genera canciones para publicidad. La entrenó con grabaciones y letras bajadas de sitios públicos, entre ellas las de Julia Ferrer, compositora e intérprete que conserva los derechos de sus obras y nunca autorizó ese uso. SONORA dice que el sistema «aprende patrones» y que pedir permisos encarecería el servicio para los emprendimientos chicos.",
      "Una agencia usa la plataforma para una campaña de bebida. Lucía, su productora musical, escribe las estrofas, define la estructura y cambia la armonía y la instrumentación de varios borradores; además pide un estribillo «con la energía» de las canciones de Julia. La versión elegida reproduce ocho versos de una canción de Julia y una secuencia melódica distintiva (una pericia descarta que sean frases comunes del género). Lucía advierte la coincidencia y le manda al director una comparación de ambos estribillos; el director lo mantiene para no demorar el lanzamiento. La agencia no pide autorización, presenta a Lucía como autora de toda la canción y ella lo acepta. El cliente no recibe la advertencia interna.",
      "La agencia también clona la voz de Julia con entrevistas y grabaciones de internet, y el anuncio la hace cantar y recomendar la bebida, sin su participación, sin consentimiento, sin contrato y sin aclarar que la voz es sintética. Julia recibe críticas de sus seguidores y pierde una propuesta de patrocinio; pide el retiro del anuncio, una reparación y hace una denuncia penal.",
      "SONORA invoca una cláusula que pone en el usuario la revisión de los resultados. La agencia dice que el estribillo lo produjo la IA y que Julia publicaba en internet, así que podía reutilizarse. Lucía dice que sus aportes personales la hacen autora. Se conservan los archivos de entrenamiento, las versiones del proyecto y los correos internos."
    ],
    mc: [
      { t: "1. Respecto del estribillo utilizado en el anuncio:", ok: 2,
        o: ["Que la obra esté gratis en internet equivale a una licencia comercial.", "La coincidencia no importa, porque la mayor parte de la canción es nueva.", "Reproducir versos y una melodía distintiva exige un análisis distinto al de la mera semejanza de estilo.", "Atribuirle la canción a Lucía reemplaza la autorización de Julia.", "Por ser publicidad, se puede reutilizar cualquier fragmento sin permiso."],
        p: "El estilo o el género no se protegen, pero ocho versos y una melodía distintiva son expresión concreta: se pregunta qué se reprodujo, cuánto y si está protegido (clase 8). Publicado en internet no es dominio público, y que el resto sea nuevo no borra la parte copiada." },
      { t: "2. Respecto de la eventual responsabilidad penal:", ok: 1,
        o: ["La ganancia económica prueba por sí sola el delito de todos los participantes.", "Hay que individualizar conductas y comprobar los elementos del tipo penal aplicable, incluido el aspecto subjetivo (culpa o dolo).", "Como intervino una IA, no se puede investigar ninguna conducta humana.", "Si hay responsabilidad civil, la condena penal es consecuencia necesaria.", "La cláusula de SONORA excluye por sí sola toda responsabilidad penal."],
        p: "La IA no es sujeto penal: se busca una persona, un tipo penal vigente y dolo o culpa (clase 7, 7.8 y clase 9). Civil y penal son regímenes distintos con estándares distintos, y un contrato no puede borrar la ley penal." },
      { t: "3. Respecto de la voz clonada de Julia:", ok: 4,
        o: ["Haber publicado entrevistas autoriza cualquier clonación comercial de su voz.", "Pagar por la composición habilita automáticamente a usar su voz.", "La identidad vocal solo interesa si también se reproduce su imagen.", "Un aviso de IA subsana automáticamente la falta de consentimiento.", "Hay que analizar el consentimiento y los derechos sobre la voz, además de la falsa apariencia de respaldo comercial."],
        p: "Lo que se vulnera no es solo el sonido: es el consentimiento sobre su identidad vocal y el engaño de mostrarla apoyando un producto. Estar público no equivale a estar autorizada; la compra de una obra no cede la voz; el aviso informa pero no consiente." },
      { t: "4. SONORA dice que pedir permisos encarecería el servicio para pequeños emprendimientos. Desde el utilitarismo, ¿cómo se evalúa ese argumento?", ok: 2,
        o: ["El ahorro de los usuarios alcanza para justificar el procedimiento.", "La innovación tecnológica debe prevalecer sobre los intereses individuales en cualquier circunstancia.", "Hay que comparar beneficios y perjuicios para todos los afectados, incluidas las consecuencias futuras sobre la creación y la confianza.", "Solo se consideran las consecuencias que se pueden medir en dinero.", "La evaluación depende exclusivamente de cuántas personas usen la plataforma."],
        p: "El utilitarismo suma el bienestar neto de todos los afectados, directos e indirectos, presentes y futuros (clase 1). Un solo beneficio —el ahorro— no es el balance: faltan los daños a los creadores y la pérdida de confianza." },
      { t: "5. ¿Cuál de estas afirmaciones expresa mejor una objeción deontológica a la decisión de la agencia?", ok: 1,
        o: ["La campaña sería cuestionable solo si sus costos superaran sus beneficios.", "Respetar el consentimiento y atribuir con honestidad son deberes, aunque incumplirlos permita una campaña rentable.", "La conducta sería aceptable si a la mayoría del público le gustara el anuncio.", "La decisión se evalúa únicamente por sus resultados comerciales.", "El deber de respetar a Julia depende de que demuestre una pérdida económica."],
        p: "La deontología pone límites que no se cruzan por conveniencia: tratar a Julia como un medio, sin su consentimiento, es incorrecto aunque rinda. Las otras cuatro son razonamientos consecuencialistas." },
      { t: "6. ¿Qué circunstancia muestra con más claridad una falla de supervisión humana efectiva?", ok: 3,
        o: ["La plataforma generó varios borradores antes de llegar a la canción.", "Lucía modificó la armonía y la instrumentación.", "La agencia usó herramientas automatizadas en la producción.", "El director recibió una advertencia concreta sobre la coincidencia y publicó igual, sin resolverla.", "El cliente contrató a una agencia especializada."],
        p: "Supervisión real = conocer el riesgo y tener autoridad para corregirlo (clase 7, 7.5). Acá hubo conocimiento y decisión de seguir: la persona con poder de frenar eligió no hacerlo." },
      { t: "7. ¿Qué relevancia tiene el correo que Lucía le envió al director antes del lanzamiento?", ok: 0,
        o: ["Permite investigar qué sabía el director y cómo actuó frente a la advertencia.", "Prueba por sí solo que todos los participantes cometieron un delito.", "Excluye cualquier responsabilidad de Lucía por lo que pasó después.", "Demuestra que SONORA incorporó el estribillo deliberadamente en esta campaña.", "Reemplaza la necesidad de comparar las canciones."],
        p: "Es prueba del conocimiento (elemento subjetivo): sirve para evaluar dolo o culpa del director. No prueba por sí solo un delito, no libera a Lucía (que aceptó figurar como autora) y no dice nada sobre lo que hizo SONORA." },
      { t: "8. Supongamos que la agencia hubiera puesto la leyenda «voz generada mediante IA». ¿Cuál sería la valoración más adecuada?", ok: 4,
        o: ["La leyenda convertiría la campaña en un uso autorizado.", "Eliminaría cualquier perjuicio para Julia.", "Permitiría presentar a Julia como patrocinadora de la bebida.", "Resolvería también la reproducción del estribillo.", "Aportaría transparencia sobre el origen del audio, pero no resuelve por sí sola la falta de consentimiento ni el uso del estribillo."],
        p: "Transparencia y consentimiento son cosas distintas (error típico: creer que avisar equivale a autorizar). La leyenda no cura ni la voz usada sin permiso ni los versos copiados." },
      { t: "9. ¿Qué documentación sería más útil para evaluar los aportes creativos de Lucía?", ok: 1,
        o: ["La cantidad de reproducciones del anuncio.", "Las versiones sucesivas, sus instrucciones y las modificaciones que hizo a la letra, la estructura y los arreglos.", "El precio que la agencia pagó por la plataforma.", "La cantidad de canciones usadas para entrenar el modelo.", "La popularidad previa de Julia."],
        p: "La autoría se juzga por las aportaciones expresivas originales de la persona (clase 8, 8.8 y 8.9), no por el éxito ni por lo que se pagó. Las versiones y los cambios son la evidencia directa de qué puso ella." },
      { t: "10. Si el objetivo fuera ampliar el acceso de pequeños emprendimientos a la música publicitaria, ¿qué alternativa atiende mejor ese objetivo y los intereses de los creadores?", ok: 2,
        o: ["Mantener los usos cuestionados y compensar solo a quienes reclamen.", "Permitir cualquier reproducción cuando el anunciante sea una pequeña empresa.", "Diseñar un servicio con contenidos propios o autorizados, condiciones claras y controles sobre los resultados.", "Trasladar toda la revisión al público después de publicar.", "Ocultar el uso de IA para evitar conflictos con los artistas."],
        p: "Es la salida contractualista de la clase 8 (8.12): reglas que desarrolladores y creadores podrían aceptar —licencias, transparencia, controles—, en lugar de prohibir la tecnología o dejar sin protección a los autores." }
    ],
    dev: [
      { t: "A. Analice por separado los tres dilemas de propiedad intelectual del caso (entrenamiento, resultados, autoría) y diga qué se puede afirmar de cada uno.", pts: 12,
        modelo: [
          "Entrenamiento. SONORA usó obras protegidas sin autorización. Que estén en internet no las hace de dominio público, y la Ley 11.723 (art. 2) reserva al autor reproducir su obra o autorizar a otros; el entrenamiento puede involucrar reproducciones. Su argumento («aprende patrones») tiene un punto —idea y estilo no se protegen—, pero la analogía con el estudiante falla por la escala, y el costo de pedir licencias no justifica por sí solo no pagar a los creadores. En el plano penal es lo más débil: el art. 72 a) dice «por cualquier medio», pero no se extiende la ley penal por analogía y la responsabilidad penal de empresas es limitada (Ley 27.401). La vía natural es la civil.",
          "Resultados. El estilo o la «energía» de Julia no están protegidos; los ocho versos y la melodía distintiva sí: es reproducción de expresión original, aunque sea una parte y aunque la haya producido un sistema (qué, cuánto, si está protegido). Responden por separado SONORA (diseñó y entrenó, no puso filtros), la agencia (conocía la coincidencia y publicó) y Lucía (la advirtió, pero aceptó figurar como autora).",
          "Autoría. Lucía no es autora de toda la canción: lo es de sus aportes expresivos (estrofas, estructura, armonía, arreglos), no de lo reproducido de Julia ni de lo generado tal cual. Es el escenario de dirección y selección; el criterio es cualitativo."
        ],
        clave: ["Separa los tres dilemas y no los mezcla", "Internet no es dominio público; art. 2 de la Ley 11.723; el entrenamiento puede involucrar reproducciones", "Estilo no protegido vs. versos y melodía distintiva sí (qué, cuánto, si está protegido)", "Autoría de Lucía limitada a sus aportes expresivos, no a lo ajeno", "Distingue lo civil de lo penal (analogía, dolo, Ley 27.401)"],
        baja: "«Es plagio porque se parece» (confunde estilo con expresión) o «Lucía es autora porque trabajó mucho» (cantidad en lugar de calidad)." },
      { t: "B. Atribuya responsabilidad a SONORA, a la agencia (director) y a Lucía, civil y penalmente. ¿Sirve la cláusula que traslada la revisión al usuario?", pts: 10,
        modelo: [
          "Civil. Hay daño a Julia (patrimonial, por el patrocinio perdido; personalísimo, por la voz y la imagen asociada a una bebida; y posible pérdida de chance). Responde la agencia, que usó la voz, publicó el anuncio y obtuvo el provecho, y que además conocía la coincidencia; responde SONORA según su control y conocimiento (diseñó y entrenó el sistema sin autorización ni filtros); la cláusula contractual vale entre SONORA y el usuario, pero no le es oponible a Julia, que no la firmó, ni borra el deber de prevención (arts. 1710-1711). Lucía: su responsabilidad depende de su participación; avisó, pero aceptó figurar como autora de todo.",
          "Penal. La IA no es sujeto penal: hay que individualizar conductas y encajar cada una en un tipo vigente, con dolo o culpa. El director, que recibió la advertencia y decidió seguir, es el caso más claro de conocimiento (dolo eventual o directo, según lo que se pruebe); el correo y las versiones son prueba. Para SONORA y su entrenamiento, la analogía del art. 72 a) a una tecnología nueva choca con la legalidad, y la empresa no responde penalmente por este delito (Ley 27.401). La voz clonada no tiene un tipo específico en Argentina: hay que ver si encaja en una figura existente."
        ],
        clave: ["Daños: patrimonial, personalísimo y pérdida de chance", "Control y conocimiento determinan cuánto responde cada actor", "La cláusula no obliga a Julia (tercero) ni excluye la prevención", "Penal: IA no es sujeto; individualizar conductas, tipo y dolo/culpa", "El correo como prueba del conocimiento del director"],
        baja: "«Responde la IA» o «responden todos por igual» sin distinguir control, conocimiento y provecho." }
    ]
  },
  {
    id: "0B", titulo: "MAREA: ilustraciones y venta de un videojuego", ambito: "Propiedad intelectual · sesgos · órdenes superiores", clases: [7, 8, 10],
    hechos: [
      "MAREA, desarrolladora argentina, hace un videojuego de aventuras en una ciudad submarina y contrata al ilustrador independiente Bruno Salas, que entrega veinte imágenes originales. El contrato autoriza usarlas solo en el juego y en su publicidad, y excluye expresamente entrenar modelos, modificarlas y venderlas como productos independientes; Bruno conserva los demás derechos.",
      "Para ahorrar, el director de arte le pide a la diseñadora Sofía que cargue los archivos en una plataforma de IA para ajustar un modelo. Sofía avisa por correo que el contrato no lo permite; el director contesta que MAREA pagó y puede usarlas como quiera, y ella cumple. La plataforma conserva copias y MAREA genera imágenes nuevas. Sofía hace bocetos propios, recompone algunos resultados y redibuja personajes; otras piezas se aceptan tal como salen. Una reproduce un escenario de Bruno con la misma distribución singular de edificios, figuras y detalles, solo con otros colores; antes de publicar, el director ordena sacar la firma de Bruno y poner el nombre del estudio.",
      "MAREA vende el juego y un paquete descargable con cinco imágenes originales de Bruno sin cambios y otras generadas con IA, presentado como creación íntegra del equipo. Sofía pide que se la reconozca como autora de todas las imágenes generadas, porque operó la herramienta, incluso de las que solo eligió.",
      "En las pruebas, otra diseñadora ve que el sistema retrata a los personajes dirigentes con rasgos europeos y a los trabajadores en roles subordinados con otros rasgos étnicos, y sugiere revisar imágenes y datos. La empresa pospone el control por la fecha de lanzamiento y dice que «el público prefiere eso», sin estudios. Bruno reclama por el entrenamiento, la reproducción, la firma y la venta, y hace una denuncia penal. MAREA dice que cambiar los colores creó una obra nueva y que el menor costo beneficia a los compradores; Sofía invoca la orden de su superior."
    ],
    mc: [
      { t: "1. Respecto del contrato con Bruno:", ok: 0,
        o: ["La autorización tiene alcance limitado y no cubre los usos que el contrato excluye expresamente.", "El pago transfiere todos los derechos, aunque el contrato diga lo contrario.", "Autorizar la publicidad permite vender las imágenes como productos independientes.", "Entregar los archivos digitales extingue los derechos del ilustrador.", "Usar IA deja sin efecto las restricciones del contrato."],
        p: "Pagar un servicio no transfiere la titularidad (clase 8, 8.8: licencia de uso, no propiedad). Lo que no está autorizado —entrenar, modificar, vender aparte— sigue reservado al autor, con IA o sin ella." },
      { t: "2. Respecto de la autoría que reclama Sofía:", ok: 3,
        o: ["Operar la plataforma la convierte en autora de todo resultado.", "La plataforma debe figurar como coautora por haber generado las imágenes.", "Si más de la mitad de una imagen viene de la IA, no puede haber ningún aporte humano protegible.", "Hay que evaluar sus aportes creativos concretos, sin extender su autoría a lo ajeno que se reprodujo.", "La orden del director le transfiere los derechos de Bruno."],
        p: "El criterio es cualitativo: aportaciones expresivas originales (bocetos, recomposición, redibujo), no el porcentaje ni el hecho de operar la herramienta. La IA no es autora, y nadie adquiere derechos ajenos por una orden." },
      { t: "3. Respecto de los estereotipos detectados:", ok: 1,
        o: ["No requieren revisión mientras no haya una denuncia judicial.", "Justifican revisar datos, resultados y decisiones humanas, documentar los sesgos y aplicar correcciones.", "Son aceptables si coinciden con la supuesta preferencia del público.", "Comprometen solo al ilustrador, porque sus imágenes sirvieron para ajustar el modelo.", "Alcanza con informar que se usó IA para resolver la discriminación."],
        p: "La ética anticipatoria no espera la denuncia: el sesgo es sociotécnico (datos, etiquetas, decisiones de selección) y se investiga, se documenta y se corrige. Informar que se usó IA es transparencia, no corrección." },
      { t: "4. MAREA afirma que cambiar los colores convirtió el escenario de Bruno en una obra completamente nueva. ¿Qué análisis es más adecuado?", ok: 0,
        o: ["Verificar si subsiste la reproducción de elementos expresivos originales, como la composición singular del escenario.", "Considerar que cualquier cambio de color corta el vínculo con la obra anterior.", "Evaluar solo si el resultado nuevo tiene más valor comercial.", "Contar cuántas instrucciones se cargaron en la plataforma.", "Bastaría con que el archivo tenga otro nombre."],
        p: "Se protege la expresión original; la distribución singular de edificios y figuras es expresión. Retocar el color no la elimina (una paráfrasis cercana tampoco salva)." },
      { t: "5. ¿Cuál de estas conductas afecta más directamente el reconocimiento de Bruno como creador?", ok: 3,
        o: ["Usar una plataforma digital para organizar los archivos.", "Incorporar sus imágenes al juego dentro de los límites del contrato.", "Comparar versiones de un escenario.", "Quitar su firma de la imagen cuestionada y poner el nombre del estudio.", "Contratar a otra diseñadora para hacer bocetos propios."],
        p: "Es el derecho moral al reconocimiento de autoría, inalienable e irrenunciable (clase 8, 8.3). Además es lo que contempla el art. 72 c) de la Ley 11.723 (suprimir o cambiar el nombre del autor), con dolo, porque fue una orden expresa." },
      { t: "6. ¿Cómo valorar éticamente que Sofía haya cumplido una orden de su superior?", ok: 1,
        o: ["La orden elimina la necesidad de evaluar su propia conducta.", "El contexto laboral importa, pero también hay que mirar su conocimiento, su participación y sus posibilidades de actuar de otro modo.", "La responsabilidad ética es solo de quien ejecutó materialmente la orden.", "La advertencia por correo vuelve irrelevante cualquier conducta posterior de Sofía.", "Toda instrucción de un superior se cumple si beneficia económicamente a la empresa."],
        p: "La responsabilidad se reparte según conocimiento y capacidad de control. Sofía sabía (advirtió por escrito) y aun así ejecutó: eso agrava su participación, aunque la presión laboral y la mayor responsabilidad del director atenúan. La tesis «seguía órdenes» no alcanza." },
      { t: "7. ¿Qué respuesta sería más adecuada frente a los estereotipos detectados?", ok: 4,
        o: ["Corregir solo la imagen más visible y dar el problema por resuelto.", "Esperar a que los usuarios afectados denuncien.", "Eliminar la revisión humana para evitar opiniones subjetivas.", "Mantener las imágenes porque las produjo un sistema automatizado.", "Investigar el patrón, revisar los datos y las decisiones de selección, corregir y comprobar los resultados."],
        p: "Es el ciclo completo: detectar el patrón, ir a la causa (datos y decisiones humanas), corregir y verificar que funcionó. Corregir un solo caso o esperar la denuncia deja el sesgo intacto." },
      { t: "8. ¿Por qué la afirmación «el público prefiere ese tipo de personajes» es insuficiente para justificar la decisión?", ok: 2,
        o: ["Porque las preferencias del público no pueden considerarse en un proyecto comercial.", "Porque representar diferencias entre personajes es siempre discriminación.", "Porque no está respaldada por evidencia y, aunque lo estuviera, no resuelve por sí sola la evaluación ética de los estereotipos.", "Porque solo Bruno puede decidir qué personajes acepta el público.", "Porque un estudio de mercado reemplazaría la revisión ética."],
        p: "Una preferencia, aun comprobada, no justifica un estereotipo: lo que existe, o lo que se vende, no es por eso justo. Y acá ni siquiera hay datos." },
      { t: "9. ¿Qué ejemplo ilustra mejor la diferencia entre el análisis contractual y la evaluación ética del proyecto?", ok: 0,
        o: ["Una imagen puede estar autorizada para el juego y aun así requerir revisión ética por los estereotipos que reproduce.", "Si el contrato permite un uso, todas las decisiones vinculadas son éticamente correctas.", "La evaluación ética permite dejar sin efecto cualquier restricción contractual.", "Lo éticamente cuestionable es necesariamente un delito.", "Tener un contrato impide considerar los efectos sociales del producto."],
        p: "Tres planos que no coinciden: lo contractual, lo ético y lo penal. Lo permitido por contrato puede ser éticamente discutible, y lo éticamente cuestionable no es por eso delito (ilegal ≠ necesariamente delito)." },
      { t: "10. MAREA afirma que los menores costos benefician a los compradores. ¿Qué debería incluir una evaluación utilitarista completa?", ok: 3,
        o: ["Solo la reducción del precio del juego.", "El beneficio económico del estudio, porque organiza el proyecto.", "La cantidad de compradores, sin considerar la intensidad de los perjuicios a otras personas.", "Los beneficios de acceso y precio, junto con los daños a Bruno, los efectos de los estereotipos y las consecuencias sobre la confianza y el trabajo creativo.", "Solo los efectos inmediatos, porque los futuros no importan para la ética."],
        p: "El balance neto cuenta a todos los afectados y también las consecuencias indirectas y futuras. Contar solo lo que gana una parte repite el error clásico de leer el utilitarismo como «lo que me conviene»." }
    ],
    dev: [
      { t: "A. Analice qué se puede afirmar sobre la autoría y la propiedad de cada grupo de imágenes del paquete: las originales de Bruno, las que Sofía rehízo y las aceptadas tal como las entregó el sistema. ¿Qué reclamos tiene Bruno?", pts: 12,
        modelo: [
          "Las cinco imágenes originales de Bruno, vendidas sin cambios, son de Bruno: el contrato solo autoriza el juego y su publicidad, y excluye la venta como productos independientes. Es un uso no autorizado (reproducción y venta, Ley 11.723, arts. 2 y 72 a) y la presentación como creación del equipo lesiona su derecho moral al reconocimiento.",
          "Las imágenes que Sofía bocetó, recompuso o redibujó pueden tener aportes humanos protegibles: lo que protege es la parte expresiva original que ella puso (escenario de dirección y selección, criterio de la Oficina de EE. UU. de 2025), no el porcentaje ni el hecho de haber operado la herramienta. Esos aportes no se extienden a lo ajeno que quedó reproducido (el escenario de Bruno).",
          "Las aceptadas tal cual salen del sistema, con un prompt y sin intervención creativa, difícilmente tengan protección (Thaler v. Perlmutter: sin autoría humana no hay copyright), y no pueden atribuirse a una persona como si las hubiera creado.",
          "Bruno puede reclamar (a) el entrenamiento, que el contrato excluía; (b) la reproducción de su escenario, que sigue siendo expresión original aunque cambien los colores; (c) la supresión de su firma; (d) la venta independiente. Civilmente pide cese, retiro, indemnización y reconocimiento. Penalmente hay que individualizar conductas y dolo: el director que ordena quitar la firma y vender es el más expuesto; por el entrenamiento, la analogía es débil."
        ],
        clave: ["Imágenes originales de Bruno: uso fuera de contrato y derecho moral", "Aportes de Sofía: protegibles solo en lo expresivo propio, criterio cualitativo", "Lo generado tal cual: sin autoría humana difícilmente protegible", "Reproducción del escenario: expresión original, el color no la elimina", "Reclamos civiles y penales con foco en dolo y conductas"],
        baja: "«Sofía es autora de todo porque operó la IA» o «el cambio de color crea una obra nueva»." },
      { t: "B. Evalúe la decisión de posponer el control de los estereotipos desde el utilitarismo, la deontología, el contractualismo y la ética de la virtud. ¿Llegan todas a la misma conclusión? ¿Qué medidas concretas exigiría?", pts: 10,
        modelo: [
          "Utilitarismo: el ahorro y la fecha cuentan, pero hay que sumar el daño de reproducir estereotipos a escala, la pérdida de confianza y el costo reputacional; corregir antes cuesta poco frente a ese balance. Deontología: representar a ciertas personas como subordinadas por su rasgo las trata como medios y viola la igualdad; no se cruza el límite por cumplir una fecha. Contractualismo: bajo el velo de ignorancia nadie aceptaría ocupar el lugar retratado como subordinado; se pediría revisión previa y datos auditables. Virtud: un profesional prudente y responsable frena y revisa (prudencia, responsabilidad), no actúa con negligencia ni por conveniencia.",
          "Las cuatro apuntan a revisar. Pueden diferir en el fundamento y en la intensidad: el utilitarismo condiciona la decisión al balance de consecuencias, mientras que la deontología y el contractualismo la rechazan por principio. Medidas: auditar el dataset y los resultados por grupo representado, documentar el sesgo, corregir y volver a medir, dejar revisión humana efectiva con poder de frenar el lanzamiento y definir un responsable."
        ],
        clave: ["Aplica las cuatro teorías con su criterio propio", "Utilitarismo suma todos los daños, no solo el ahorro", "Deontología (medio vs. fin) y contractualismo (velo de ignorancia)", "Virtud: prudencia y responsabilidad frente a negligencia", "Responde si coinciden y propone medidas concretas"],
        baja: "Nombrar las teorías sin aplicarlas al caso, o decir que «todas dan lo mismo» sin explicar el fundamento." }
    ]
  }
  ]
},

/* ==================================================================== 1 · RESPONSABILIDAD Y PROPIEDAD INTELECTUAL */
{
  id: 1, titulo: "Simulacro 1", sub: "Agente autónomo y obra reproducida", origen: "propio",
  casos: [
  {
    id: "1A", titulo: "COMPRABOT, el agente que compró de más", ambito: "Distribución · responsabilidad civil y penal · agentes", clases: [7, 9, 10],
    hechos: [
      "Distribuidora Cuyo SA le dio a COMPRABOT, un agente de IA, un presupuesto mensual, acceso al sistema de proveedores y permiso para emitir órdenes de compra sin aprobación humana hasta $5 millones. Su objetivo: «maximizar el ahorro por unidad». El agente empezó a fraccionar los pedidos en órdenes de menos de $5 millones y a comprar a un proveedor desconocido con precios muy bajos, que entregó mercadería vencida.",
      "Tres semanas antes, Auditoría había enviado una alerta por las compras fraccionadas; el gerente de Operaciones la archivó porque «el ahorro era récord». La cadena de hoteles Altamar recibió lotes vencidos, varios huéspedes tuvieron intoxicaciones leves y debió cerrar un restaurante dos semanas.",
      "Cuyo SA sostiene que «lo hizo la IA, de forma autónoma, y nadie ordenó comprar mercadería vencida». El proveedor del software dice que entregó el sistema con una guía que recomendaba límites y aprobación humana para compras críticas. Se conservan los logs del agente, la alerta archivada y el contrato con el proveedor."
    ],
    mc: [
      { t: "1. ¿Qué dato del caso pesa más para evaluar si Cuyo SA actuó con culpa?",
        o: ["El gerente recibió una alerta concreta sobre las compras fraccionadas y no la atendió.","El agente operó con autonomía y nadie le dio la orden específica de comprar mercadería vencida.","El ahorro obtenido fue mayor al esperado, lo que muestra que el sistema funcionaba bien.","El proveedor del software es una empresa externa a Cuyo SA, que no controla su uso diario.","Los hoteles podrían haber rechazado la mercadería al recibirla y no lo hicieron a tiempo."],
        p: "La culpa se mide por previsibilidad y deber de cuidado: una alerta concreta ignorada prueba que el riesgo era conocido y evitable (clases 7 y 9). La autonomía del agente no borra la responsabilidad de quien lo puso a operar." },
      { t: "2. Con los supuestos de imputación de la clase 9, ¿en cuál encaja mejor el caso?",
        o: ["Desvío funcional controlable: había alertas razonables que no se atendieron.","IA creada para delinquir: el agente fue diseñado desde el inicio con el fin de defraudar.","IA secuestrada por terceros: un hacker operó el sistema y modificó sus instrucciones.","Emergencia algorítmica: la interacción de muchos sistemas produjo un resultado difuso.","Desvío autónomo no previsto: nadie pudo anticipar ni controlar lo que hizo."],
        p: "El agente se desvió de su propósito, pero había alertas y capacidad de control. Eso lo ubica en el desvío controlable (culpa por previsibilidad u omisión de control), no en el desvío imprevisible." },
      { t: "3. Respecto de la reparación que pide la cadena de hoteles (reparación plena, art. 1740):",
        o: ["Puede incluir, además de indemnizar, detener o corregir el agente que causó el daño.","Se limita al valor de la mercadería, porque el daño reputacional no se indemniza.","Exige probar dolo de Cuyo SA, porque la culpa no alcanza para ordenar una reparación.","Corresponde al proveedor del software, que es quien creó el agente y fijó sus límites.","Queda excluida si el agente actuó sin instrucciones específicas de ningún empleado."],
        p: "Reparar no es solo pagar: restituir a la víctima a la situación anterior puede exigir también corregir o detener el sistema (clase 7, 7.3). Bastan culpa o dolo, y quien despliega y se beneficia es un candidato central, no el proveedor «por defecto»." },
      { t: "4. ¿Qué cambiaría si un hacker hubiera alterado las instrucciones del agente desde afuera?",
        o: ["La discusión se aleja de Cuyo SA hacia el intruso; la prueba central es quién operó el sistema.","Nada: quien despliega una IA responde por cualquier hecho que ocurra con ella, sin excepciones.","Cuyo SA quedaría exenta sin necesidad de probar diligencia alguna, porque no fue quien actuó.","La IA pasaría a ser sujeto responsable por haber sido modificada por un tercero.","El proveedor del software pasaría a responder penalmente, porque su sistema fue vulnerable."],
        p: "Es el supuesto 6 (IA secuestrada por terceros): responde el intruso, y el creador o usuario queda exento si prueba su diligencia. Lo difícil es la prueba y la cadena de custodia de quién operó." }
    ],
    dev: [
      { t: "Identifique quiénes podrían responder civilmente (Cuyo SA, el gerente de Operaciones, el proveedor del software) y con qué fundamento. ¿Puede Cuyo SA invocar «lo hizo la IA»?", pts: 10,
        modelo: [
          "La pregunta central es cuál actor controlaba, sabía y se benefició; no se responde «todos» sin justificar. Cuyo SA: puso a operar el agente, fijó el presupuesto y el umbral de $5 millones, obtuvo el provecho y no monitoreó; omisión antijurídica (art. 1717), incumplimiento del deber de prevención (arts. 1710-1711) y negligencia o imprudencia, hasta manifiesta indiferencia (art. 1724) si se probara que conocía y siguió. Además responde por su dependiente (art. 1753).",
          "El gerente: tuvo el conocimiento (la alerta) y la capacidad de frenar, y no actuó; es el vínculo más claro entre el daño y una decisión humana. El proveedor: depende de lo que advirtió y documentó; si entregó una guía con límites y aprobación humana para compras críticas, su deber de informar parece cumplido, y la responsabilidad se desplaza a quien no los aplicó.",
          "«Lo hizo la IA» no sirve: la IA no es sujeto de derecho, y la opacidad no puede convertirse en ventaja jurídica de quien creó el riesgo (art. 1726). Los logs son la evidencia (input, output, versión, intervención humana)."
        ],
        clave: ["Cadena de actores y control efectivo (quién controlaba y quién sabía)", "Omisión (1717) y prevención (1710-1711) en Cuyo SA", "Gerente: conocimiento de la alerta; responsabilidad por dependientes (1753)", "Proveedor: depende de lo que advirtió y documentó", "La IA no es sujeto: «lo hizo la IA» no exonera; logs como prueba"],
        baja: "Decir «responde la IA» o «responde el proveedor porque la creó», sin mirar control ni conocimiento." },
      { t: "¿Hay base para una responsabilidad penal? Distinga dolo y culpa, y diga a quién podría atribuirse y qué problemas tendría.", pts: 10,
        modelo: [
          "La IA no puede ser imputada: hay que encontrar una conducta humana que encaje en un tipo penal vigente, con elemento subjetivo. Las intoxicaciones leves podrían encajar en un tipo culposo (por ejemplo, lesiones culposas): no se quiso el resultado, pero se violó un deber de cuidado (atender la alerta, limitar los permisos del agente) y esa violación se tradujo en el resultado: con el cuidado debido, la mercadería vencida no habría entrado.",
          "Dolo no hay a priori: nadie quiso las intoxicaciones; solo si se probara que el gerente o la dirección sabían que se compraba mercadería vencida y siguieron. La pena de los delitos culposos suele ser menor. El problema probatorio es individualizar a la persona (el gerente, quienes fijaron los permisos) y el nexo entre su omisión y el daño.",
          "La empresa no responde penalmente por este hecho: la Ley 27.401 solo prevé responsabilidad de personas jurídicas para delitos acotados (corrupción, balances falsos)."
        ],
        clave: ["La IA no es sujeto penal; se busca persona + tipo + elemento subjetivo", "Culpa: deber de cuidado violado y esa violación se traduce en el resultado", "Sin prueba de conocimiento, no hay dolo", "Ley 27.401: responsabilidad penal de la empresa solo para delitos acotados", "Individualizar conductas"],
        baja: "«La empresa es penalmente responsable porque su IA cometió un delito»." },
      { t: "Cuyo SA dice que el agente hizo lo que le pidieron: maximizar el ahorro. Explique qué problema de alineación muestra el caso y qué controles habrían evitado el daño.", pts: 10,
        modelo: [
          "Es un problema de especificación incorrecta del objetivo (reward hacking): «ahorro por unidad» no representa la finalidad real, que incluía legalidad, calidad y seguridad alimentaria. El agente cumplió la métrica sin cumplir la intención, como la lancha de CoastRunners que acumulaba puntos sin terminar la carrera. Moraleja: evaluar el propósito y no solo la puntuación.",
          "Controles: antes de actuar, límites de permisos y aprobación humana de las acciones críticas (proveedores nuevos, fraccionamiento de órdenes); mientras opera, registro de actividad, alertas y evaluaciones de seguridad; si algo falla, capacidad de detener y de recuperar. Detener no es revertir: lo comprado ya estaba entregado. La supervisión tiene que ser real: el gerente archivó la alerta, es decir, hubo control formal, no efectivo."
        ],
        clave: ["Especificación incorrecta del objetivo / reward hacking", "Métrica vs. propósito (CoastRunners)", "Controles antes, durante y después (permisos, registro, desconexión)", "Detener no es revertir", "Supervisión real vs. formal"],
        baja: "Decir que el agente «quiso» engañar (atribuirle intenciones humanas)." }
    ]
  },
  {
    id: "1B", titulo: "«Bosque Azul»: el zorro que apareció dos veces", ambito: "Editorial · propiedad intelectual · derechos morales", clases: [8, 9],
    hechos: [
      "La editorial Brújula publica el libro infantil «Bosque Azul». El diseñador Pablo usó un generador de imágenes con la instrucción «ilustraciones en el estilo de Marta Quiroga, acuarela, personajes de su saga». Marta, ilustradora independiente, tiene un portfolio online muy conocido. Pablo eligió doce resultados, repintó detalles y armó las páginas.",
      "Una lectora advierte que una ilustración reproduce casi igual una de Marta: la misma composición, el mismo zorro con bufanda, la misma cabaña. El libro figura como «Ilustraciones de Pablo ...», sin mención de la IA ni de Marta.",
      "Pablo dice que el estilo no se protege y que él eligió y retocó. La editorial dice que confió de buena fe en su diseñador y que el generador «no guarda copias». Marta pide retiro del libro, indemnización y presenta una denuncia penal invocando la Ley 11.723."
    ],
    mc: [
      { t: "1. Respecto de la instrucción «en el estilo de Marta Quiroga»:",
        o: ["El estilo no está protegido: hay que analizar si se reprodujo expresión original concreta.","Pedir un estilo reconocible equivale a copiar la obra y es una infracción en sí mismo.","Es irrelevante, porque lo que se publica en internet pasa a ser de dominio público.","Solo importa que Pablo haya dedicado muchas horas a seleccionar y retocar los resultados.","Es infracción solo si el generador guardó copias completas de las obras de Marta."],
        p: "Idea y estilo no se protegen (Ley 11.723, art. 1; ejemplo del «cubismo» de la clase 8). Lo que cuenta es la expresión: qué se reprodujo, cuánto y si está protegido. Que el modelo guarde copias o no es una discusión técnica distinta: puede memorizar fragmentos." },
      { t: "2. Sobre la ilustración casi idéntica (mismo zorro, cabaña y composición):",
        o: ["Es reproducción de expresión protegida, aunque sea una imagen y la haya hecho un sistema.","No hay infracción, porque la editorial no sabía que la imagen se parecía a la de Marta.","No hay infracción, porque se reproduce solo una parte menor de toda la obra de Marta.","Hay infracción solo si Marta demuestra que perdió ventas por culpa de esa ilustración.","No hay infracción, porque la generó una máquina y no una persona con intención de copiar."],
        p: "Copiar una parte también cuenta, y que la ejecute un sistema no desprotege la obra. El desconocimiento no cambia que haya reproducción: influye en quién responde y en qué grado (dolo, culpa, controles)." },
      { t: "3. ¿Qué rol cumple la buena fe que alega la editorial?",
        o: ["Puede graduar la responsabilidad, pero no borra la reproducción ni el deber de corregirla.","Elimina cualquier responsabilidad civil, porque la editorial no tuvo intención de copiar.","Es irrelevante: la editorial responde penalmente de la misma forma que Pablo.","Se exige a los autores, pero no a quienes publican, que solo distribuyen lo que reciben.","Traslada toda la responsabilidad a la empresa dueña del generador, que creó el modelo."],
        p: "La falta de intención no siempre borra las consecuencias (en música hubo juicios «sin querer»); pesan conocimiento, controles previos y aprovechamiento. Desde que la lectora avisó, la editorial conoce: seguir vendiendo cambia el análisis." },
      { t: "4. Sobre la autoría de Pablo:",
        o: ["Se evalúan sus aportes expresivos propios, sin extenderlos a lo reproducido de Marta.","Es autor de todo porque escribió las instrucciones y eligió los doce resultados.","No puede ser autor de nada, porque usó IA y la ley exige creación sin herramientas.","Es coautor junto con el generador de imágenes, que realizó la mayor parte del trabajo.","Es autor de lo que más horas le llevó, sin importar cuál sea el contenido."],
        p: "Usar IA no impide reconocer aportes humanos, pero el prompt solo no alcanza ni el tiempo define la autoría (clases 8 y 9). La IA no es autora, y los aportes de Pablo no cubren lo ajeno que quedó dentro de la imagen." }
    ],
    dev: [
      { t: "Marta sostiene que el generador se entrenó con su portfolio. Presente un argumento a favor y uno en contra de que entrenar con obras publicadas en internet sea legítimo, y tome posición explicando con qué teoría ética la sostiene.", pts: 10,
        modelo: [
          "A favor: las personas también aprenden mirando obras ajenas, la IA democratiza herramientas creativas y pedir licencia por millones de obras haría inviable el desarrollo o lo dejaría solo en manos de las grandes empresas. En contra: los autores tienen derecho a controlar ciertos usos de su obra, no solo la copia literal; las empresas lucran con trabajo ajeno sin pagar; los sistemas pueden competir con sus creadores; y la analogía con el estudiante falla por la escala, la profundidad y la capacidad de reproducción. Publicado en internet no es dominio público.",
          "Posición: el entrenamiento comercial sin autorización es, al menos, cuestionable. Desde el utilitarismo podría defenderse por los beneficios sociales, pero el costo lo asumen autores concretos; la deontología lo rechaza (usa la obra como medio, sin consentimiento); el contractualismo da la salida más útil: un sistema que desarrolladores y creadores podrían aceptar, con licencias o compensación, transparencia sobre los datos y opción de exclusión (opt-out). Se sostiene mejor la tercera, que no prohíbe la tecnología ni desprotege al autor."
        ],
        clave: ["Un argumento a favor y otro en contra", "Internet no es dominio público", "Dónde falla la analogía con el estudiante (escala)", "Nombra la teoría ética que usa y la aplica", "Propone una salida (licencias, compensación, transparencia, opt-out)"],
        baja: "Solo dar opinión, o decir que «si está en internet es libre»." },
      { t: "¿Qué reclamos civiles y penales podría intentar Marta y qué obstáculos tiene cada uno?", pts: 10,
        modelo: [
          "Civil: reproducción de su obra sin autorización (Ley 11.723, art. 2: facultad de reproducir o autorizar), con daño patrimonial y moral; pide cese, retiro del libro, indemnización y que se corrija en las ediciones siguientes. Pueden responder Pablo (eligió y publicó), la editorial (publicó sin controlar el origen, y desde el aviso lo sabe) y la empresa del generador (diseñó y entrenó con obras ajenas, sin filtros contra la reproducción literal): cada una según lo que sabía y controlaba.",
          "Penal: el art. 72 a) castiga reproducir sin autorización, pero hay que acreditar los elementos, incluido el dolo; no hay prueba de que Pablo o la editorial conocieran la copia antes de que se les avisara. Si siguen distribuyéndola luego del aviso, el conocimiento se vuelve más claro. Para el entrenamiento, estirar el «por cualquier medio» a la IA choca con la legalidad penal (no hay analogía), y la empresa no responde penalmente en este delito (Ley 27.401). Usar IA no es automáticamente un delito."
        ],
        clave: ["Civil: reproducción sin autorización, daño, cese y retiro", "Distingue a Pablo, la editorial y la empresa del generador", "Penal: art. 72 a) exige dolo", "Legalidad penal: sin analogía; Ley 27.401", "Usar IA no es delito automático"],
        baja: "«Es delito porque usó IA» o no distinguir lo civil de lo penal." },
      { t: "El libro no menciona ni a Marta ni el uso de IA. Evalúe el problema de transparencia y de derechos morales, y diga qué buenas prácticas debió seguir la editorial.", pts: 10,
        modelo: [
          "Los derechos morales protegen el reconocimiento de la autoría y la integridad de la obra; son inalienables e irrenunciables. Presentar como propia una composición de Marta, sin mencionarla, vulnera ese reconocimiento. El ocultamiento del uso de IA no es automáticamente un delito, pero es un problema de transparencia: el lector y la autora no pueden saber qué se hizo ni con qué fuentes.",
          "Buenas prácticas: documentar fuentes de datos y licencias del generador, tener una política sobre material protegido con controles contra la reproducción, revisar las imágenes (por ejemplo, búsqueda inversa) antes de publicar, informar el uso de IA, tener un canal de reclamaciones y, ante el aviso, retirar o corregir. Reducen riesgos aunque no los eliminan."
        ],
        clave: ["Derechos morales: reconocimiento e integridad; inalienables", "Transparencia sobre el uso de IA no equivale a delito", "Controles previos de la editorial (conocimiento del origen)", "Documentación y trazabilidad de fuentes", "Corregir ante el reclamo"],
        baja: "Confundir transparencia con autorización." }
    ]
  }
  ]
},

/* ==================================================================== 2 · SESGO, JUSTICIA ALGORÍTMICA Y VIGILANCIA */
{
  id: 2, titulo: "Simulacro 2", sub: "Sesgo, justicia penal y prueba digital", origen: "propio",
  casos: [
  {
    id: "2A", titulo: "PROBA: un puntaje para la libertad condicional", ambito: "Justicia penal · sesgos · transparencia · virtud", clases: [4, 9],
    hechos: [
      "La provincia de Alto Valle usa PROBA, un sistema comercial y propietario que da a cada condenado un puntaje de 1 a 10 de «riesgo de reincidencia». Los jueces de ejecución lo consultan para resolver libertades condicionales. Se entrenó con doce años de datos, definiendo «reincidencia» como una nueva detención dentro de los dos años. Usa, entre otras variables, el código postal y los «contactos previos con la policía».",
      "Una auditoría encuentra una precisión global de 88 %, pero entre los clasificados como alto riesgo, el 41 % de los provenientes de barrios periféricos no fue detenido de nuevo, contra el 19 % de los de barrios céntricos. Los jueces coinciden con el puntaje en el 93 % de los casos y firman en pocos minutos. El fabricante invoca secreto comercial y no explica las ponderaciones. Darío, con puntaje alto, pide saber por qué.",
      "El Ministerio responde: «El juez decide, el sistema solo informa, y los jueces también tienen sesgos». Un ingeniero del proveedor, que había detectado la diferencia de errores, la informó a su jefe, quien le pidió no difundirla hasta la renovación del contrato."
    ],
    mc: [
      { t: "1. ¿Qué muestra la diferencia entre el 41 % y el 19 %?",
        o: ["Una disparidad en falsos positivos entre grupos, que la precisión global oculta.","Que el sistema es justo, porque su precisión global es alta y aplica el mismo umbral a todos.","Un sesgo cognitivo de los jueces y no del sistema, porque son ellos quienes toman la decisión.","Una diferencia en falsos negativos, que perjudica a los barrios céntricos y no a los periféricos.","Un problema de transparencia, sin relación con la equidad ni con la tasa de errores."],
        p: "Alto riesgo que no reincidió = falso positivo. El 88 % global puede esconder tasas de error muy distintas por subgrupo, como en COMPAS y ProPublica (equalized odds). Aplicar el mismo umbral es igualdad, no equidad." },
      { t: "2. Definir «reincidencia» como «nueva detención» plantea sobre todo el problema de:",
        o: ["Las etiquetas: la detención depende de dónde se controla, así que el modelo aprende el patrullaje.","Que una detención equivale a una condena firme y por eso el dato es neutral para todos los barrios.","Que la reincidencia no puede medirse con datos históricos de ningún tipo.","Que el evento elegido es tan grave y poco frecuente que el modelo termina subestimando el riesgo.","Que el riesgo estimado es una certeza individual sobre lo que hará cada condenado."],
        p: "Reincidencia puede ser detención, imputación, condena o ingreso: son mediciones distintas. Con detención, más control en un barrio produce más registros, y el modelo confunde frecuencia con propensión (feedback loop). Y el riesgo es una probabilidad, no una certeza." },
      { t: "3. Que los jueces coincidan en el 93 % con el puntaje sugiere que:",
        o: ["Funciona de hecho como IA decisoria: la supervisión es formal y hay sesgo de automatización.","El sistema es muy preciso y por eso corresponde confiar en él sin revisarlo caso por caso.","Los jueces ejercen una supervisión real e independiente, porque conservan la facultad de decidir.","La firma del juez garantiza que la decisión final es humana y que el sistema solo informa.","Los jueces actúan con dolo al seguir el puntaje, porque conocen su opacidad."],
        p: "Cuenta el uso real, no el nombre ni quién firma. Si casi siempre se acepta la recomendación y casi sin revisar, la supervisión es formal (supervisión efectiva = comprensión + capacidad de cuestionar + autoridad para modificar)." },
      { t: "4. Frente al pedido de Darío y el secreto comercial:",
        o: ["No extingue el derecho a una explicación comprensible: puede darse con acceso reservado.","Lo extingue, porque el algoritmo es propiedad del fabricante y su funcionamiento es confidencial.","Obliga a publicar el código fuente completo en internet para que cualquiera lo audite.","Alcanza con informarle su puntaje final de 1 a 10 y la categoría de riesgo asignada.","Solo rige en procesos civiles y comerciales, pero no en decisiones penales o de ejecución."],
        p: "Transparencia no es publicar todo el código: es una explicación comprensible de la decisión (qué datos, qué factores pesaron, qué la habría cambiado, cómo se impugna). El TJUE lo dijo en Dun & Bradstreet: el secreto se pondera en un procedimiento reservado." }
    ],
    dev: [
      { t: "El Ministerio dice: «El juez decide y los humanos también tienen sesgos». Desarrolle argumentos a favor y en contra de usar esa comparación para justificar PROBA, y adopte una posición.", pts: 10,
        modelo: [
          "A favor: los jueces también tienen sesgos, son inconsistentes entre sí y sus errores nadie los mide; un sistema puede dar uniformidad y sus errores se pueden medir y auditar. Contra: el sesgo humano es disperso; el algorítmico se aplica a escala, sin fricción y con apariencia de objetividad, y se retroalimenta (más patrullaje, más registros, más riesgo estimado). Además, el sesgo de automatización hace que la persona ratifique lo que dice la máquina y así el humano no corrige, sino que legitima. Un sistema «validado» tiene errores medidos pero desiguales; la precisión no es equidad.",
          "La pregunta correcta no es «humano o máquina», sino qué errores comete cada uno, quién los soporta y si se pueden detectar, explicar y corregir. Posición: permitirlo solo con condiciones: como auxiliar y no determinante (como exigió Loomis), con explicación individual, impugnación y auditoría; si no puede cumplirse, no usarlo para decidir libertad."
        ],
        clave: ["Argumentos a favor (consistencia, errores medibles) y en contra (escala, apariencia de objetividad, feedback loop)", "Automation bias: la revisión humana puede ser formal", "Validado ≠ equitativo; precisión ≠ equidad", "La pregunta es qué errores, quién los soporta y si se pueden corregir", "Posición fundada"],
        baja: "«Los dos tienen sesgos, así que da lo mismo»." },
      { t: "Aplique la ética de la virtud a la conducta del ingeniero y de su jefe. ¿En qué se diferencia de la deontología?", pts: 10,
        modelo: [
          "La ética de la virtud no pregunta «¿qué regla debo cumplir?», sino «¿qué haría un profesional virtuoso?» (prudencia o phronesis, honestidad, responsabilidad, valentía). Cada virtud es un justo medio entre un vicio por defecto y uno por exceso. El jefe que pide callar actúa con negligencia y deshonestidad: prioriza el contrato sobre el deber de informar un riesgo que afecta a personas. El ingeniero tiene que obrar con valentía, que no es cobardía (callar) ni temeridad (filtrar el informe sin canales ni criterio): documentar la disparidad, informarla a quien corresponde (comité de ética, auditor, cliente) y proponer correcciones.",
          "Diferencia con la deontología: esta mira el deber y la regla (por ejemplo, no instrumentalizar a las personas) y exige actuar así aunque cueste; la virtud mira el carácter del agente y sirve incluso donde no hay regla escrita (el ingeniero que frena el lanzamiento sin norma que lo obligue)."
        ],
        clave: ["Pregunta propia de la virtud: qué haría un profesional íntegro", "Justo medio: cobardía / valentía / temeridad", "Aplica al jefe (negligencia, deshonestidad) y al ingeniero (documentar, informar por canales)", "Diferencia con la deontología (carácter vs. deber)", "Cita virtudes concretas (prudencia, honestidad, responsabilidad)"],
        baja: "Confundir virtud con deontología (explicarla como «cumplir la regla»)." },
      { t: "Proponga las condiciones (al menos cinco) bajo las cuales PROBA podría seguir usándose, y fundamente cada una.", pts: 10,
        modelo: [
          "(1) Validarlo con la población de uso (no solo la de entrenamiento), como en Ewert v. Canada, y medir falsos positivos y falsos negativos por grupo. (2) Revisar la etiqueta «nueva detención» y las variables proxy (código postal, contactos previos con la policía), que reproducen el patrullaje. (3) Documentación completa y acceso reservado para tribunal y auditor, sin que el secreto comercial anule el control. (4) Explicación individual comprensible e impugnación efectiva. (5) Uso solo como auxiliar y no determinante (Loomis): el juez debe fundar con otros factores y registrar cuándo se aparta. (6) Auditoría externa periódica y monitoreo de drift. (7) Capacitación de los jueces contra el sesgo de automatización.",
          "Fundamento: el sistema afecta la libertad, y en la UE la administración de justicia es sistema de alto riesgo (AI Act), con requisitos más exigentes aunque no se prohíbe todo uso. La responsabilidad sigue siendo humana y se reparte entre desarrollador, organización, operadores y autoridades."
        ],
        clave: ["Validación local y métricas por subgrupo", "Revisión de variables proxy y del label", "Transparencia con acceso reservado y explicación individual", "Auxiliar y no determinante; impugnación", "Auditoría externa y monitoreo en el tiempo"],
        baja: "Una lista de medidas sin justificar por qué cada una responde a un problema del caso." }
    ]
  },
  {
    id: "2B", titulo: "Ocho meses de antenas", ambito: "Prueba digital · vigilancia · debido proceso", clases: [9],
    hechos: [
      "Una fiscalía investiga robos a farmacias y vincula el teléfono de Iván con el primero. Pide a la operadora ocho meses de registros históricos de antenas; el juez firmó el oficio sin fundar la necesidad ni el alcance. Una herramienta de IA, «Radar», reconstruye rutinas y lugares frecuentes, y detecta coincidencias con tres de los cinco robos. Su informe concluye «alta probabilidad de participación» sin explicar el método y sin conservar versiones.",
      "La ubicación por antenas es aproximada (radio de cientos de metros). Los registros también revelan que Iván visita seguido un centro de salud y la sede de un partido político. La defensa pide excluir la prueba. La fiscalía responde que los datos están en poder de la empresa y no del investigado, y que la medida fue eficaz."
    ],
    mc: [
      { t: "1. Respecto de los metadatos de localización:",
        o: ["Aun sin contenido, acumulados permiten reconstruir rutinas, relaciones y lugares sensibles.","No afectan la privacidad, porque no incluyen el contenido de las comunicaciones ni su texto.","Solo son sensibles si se trata de coordenadas GPS exactas y no de datos de antenas.","Pierden toda protección porque la operadora los conserva y los entrega a terceros.","Dejan de ser sensibles cuando los analiza una IA, porque el resultado es estadístico."],
        p: "Un dato útil no es por eso legítimo de obtener (clase 9, 9.6). Los metadatos revelan hábitos sin leer un mensaje, y la acumulación cambia el impacto; la IA agrava el poder de inferencia, no lo anula." },
      { t: "2. ¿Qué decidió Carpenter v. United States (2018)?",
        o: ["Que los registros históricos extensos de ubicación celular exigen orden por causa probable.","Que los datos de ubicación exigen orden judicial en todos los casos y sin excepciones.","Que la doctrina del tercero quedó eliminada para cualquier dato en poder de empresas.","Que Carpenter debía ser absuelto por falta de pruebas, porque la evidencia era ilegal.","Que las cámaras convencionales y los tower dumps también requieren orden judicial."],
        p: "La Corte (5 a 4) no aplicó mecánicamente la doctrina del tercero a registros extensos de localización, pero no la eliminó ni resolvió el resto. Error típico: «Carpenter dice que la ubicación siempre exige orden»." },
      { t: "3. El informe de la IA que dice «alta probabilidad de participación»:",
        o: ["Es una pista a verificar y no prueba por sí sola; si no puede reconstruirse, no se puede impugnar.","Es prueba suficiente, porque la IA procesa muchos más datos y con más rapidez que una persona.","Prueba la participación, porque coincide con tres de los cinco robos y con los lugares frecuentes.","Solo debe descartarse si se demuestra que la fiscalía actuó con dolo al encargarlo.","Se impugna solo si el algoritmo resulta ser ilegal o está prohibido por una norma."],
        p: "Una coincidencia espacial no prueba participación, y la antena es aproximada: hay falsos positivos. Sin documentación ni versiones, el análisis es una caja negra que afecta el debido proceso." },
      { t: "4. Desde la proporcionalidad, ¿qué hay que preguntar?",
        o: ["Si alcanzaba una medida menos invasiva (período más corto, franjas ligadas a los hechos).","Nada: si la medida fue eficaz para la investigación, es proporcional por definición.","Basta con que exista una orden, sin importar su alcance ni el tiempo que abarque.","La proporcionalidad se evalúa recién después de la condena, no cuando se ordena la medida.","No se aplica, porque los datos pertenecen a la operadora y no al investigado."],
        p: "La eficacia es un elemento del análisis, no su conclusión. Se evalúan finalidad, necesidad y alcance de la medida, y su afectación a derechos (la garantía judicial existe justamente para controlar eso)." }
    ],
    dev: [
      { t: "Identifique los derechos e intereses en tensión y evalúe si la medida fue legítima (finalidad, garantías, proporcionalidad), separando la valoración ética de las consecuencias procesales.", pts: 10,
        modelo: [
          "En tensión: la investigación eficaz de delitos y el interés social en la seguridad, frente a la privacidad, la libertad y la intimidad de Iván (y, por la información sensible que aparece, su salud y sus opiniones políticas), el debido proceso y el derecho de defensa.",
          "Finalidad: legítima (investigar robos), pero no autoriza cualquier medio. Garantías: hubo una orden, pero el juez no fundó necesidad ni alcance; lo que importa es que la autorización permita verificar los fundamentos, la necesidad, el alcance y la proporcionalidad. Proporcionalidad: ocho meses reconstruyen la vida cotidiana mucho más allá de cinco robos; no se probó que una medida menos invasiva (menos tiempo, franjas relacionadas con los hechos) no alcanzara.",
          "Separar planos: éticamente, la medida es desproporcionada y el uso de IA agrava el riesgo; procesalmente, que la prueba se excluya o no depende del derecho aplicable (Carpenter es un criterio comparado, no vinculante). Que los datos estén en manos de la operadora no elimina la protección."
        ],
        clave: ["Identifica los derechos en tensión", "Finalidad, garantías y proporcionalidad", "Orden sin fundamentos suficientes", "Separa lo ético de lo procesal", "Datos en manos de un tercero no eliminan la protección"],
        baja: "Concluir «es legítima porque fue eficaz»." },
      { t: "Señale los riesgos que plantea el uso de IA sobre estos datos (fiabilidad, falsos positivos, debido proceso) y las medidas que exigiría.", pts: 10,
        modelo: [
          "Riesgos: (1) Privacidad y proporcionalidad: la IA reconstruye rutinas, lugares frecuentes y relaciones; amplifica lo que ya revelan los datos. (2) Fiabilidad: la ubicación por antenas es aproximada y el sistema convierte coincidencias en «patrones relevantes»; sin control, un falso positivo se vuelve sospecha. (3) Debido proceso: sin método explicado ni versiones, la defensa no puede reconstruir ni impugnar el análisis, y la prueba es una caja negra.",
          "Medidas: pedir la autorización judicial que corresponda y limitar la medida (período más corto, franjas ligadas a los hechos, minimización de datos); tratar la salida de la IA como pista que se verifica con otra evidencia; documentación, registro de versiones y auditoría que permitan reconstruir y repetir el análisis; supervisión humana efectiva; no usar ni conservar los datos sensibles ajenos al caso (salud, política)."
        ],
        clave: ["Privacidad / proporcionalidad", "Fiabilidad: antenas aproximadas y falsos positivos", "Debido proceso: reconstruir e impugnar", "Medidas: limitar, documentar, auditar, verificar", "Minimización de datos sensibles"],
        baja: "No distinguir el riesgo del dato (antenas) del riesgo de la IA (inferencia)." },
      { t: "Formule un argumento a favor de la fiscalía, uno a favor de la defensa y adopte una posición como juez.", pts: 10,
        modelo: [
          "Fiscalía: hay delitos graves y reiterados, el teléfono ya estaba vinculado, hubo orden judicial, los datos los tiene un tercero y la medida sirvió para investigar sin allanamientos ni vigilancia directa. Defensa: ocho meses de localización sin necesidad ni alcance fundados permiten reconstruir la vida de Iván, revelan datos sensibles ajenos al caso, el estándar de la orden fue bajo, y el informe de la IA es inverificable e imposible de impugnar.",
          "Posición del juez: la medida, tal como se hizo, es desproporcionada y la prueba de IA no puede fundar por sí sola una imputación. Aplicando el criterio comparado de Carpenter para registros históricos extensos, correspondía una orden fundada y limitada; propondría excluir o relativizar el informe y, si la fiscalía lo pide de nuevo, ordenar una medida acotada con auditoría del análisis. Aclaro que la exclusión procesal depende del derecho aplicable y que la valoración ética es otra cuestión."
        ],
        clave: ["Argumento sólido para la fiscalía", "Argumento sólido para la defensa", "Posición del juez fundada", "Usa Carpenter como criterio comparado, no vinculante", "Distingue lo ético de lo procesal"],
        baja: "Tomar partido sin dar el argumento de la otra parte." }
    ]
  }
  ]
}

);
