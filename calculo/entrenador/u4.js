// Entrenador de decisiones — Unidad IV.
(function (root) {
  const P = root.DuoP;
  const T = {
    lho: "L'Hôpital (indeterminaciones 0/0 y ∞/∞, aplicación completa)",
    ext: "Extremos absolutos y relativos, puntos críticos",
    cre: "Crecimiento y decrecimiento (signo de f')",
    con: "Concavidad y puntos de inflexión (signo de f'')",
    est: "Estudio completo de una función",
    opt: "Problemas de optimización",
    apr: "Aproximación lineal, diferenciales y polinomio de Taylor"
  };
  const L = "\\displaystyle\\lim";
  P("u4-lh-1", T.lho, "Calcular $" + L + "_{x\\to0}\\dfrac{\\tan x}{x}$", "num", [
    ["¿Qué chequeás antes de derivar?",
      ["Que dé $\\tfrac00$ o $\\tfrac\\infty\\infty$", "Da $\\tfrac00$: se puede."],
      ["Nada", "Siempre hay que chequear."],
      ["Que el denominador sea $x$", "No es la condición."]],
    ["Derivando: $\\dfrac{1/\\cos^2x}{1}$. ¿Límite?",
      ["$1$", "$\\tfrac{1}{\\cos^20}$."],
      ["$0$", "No."],
      ["$\\infty$", "No."]]
  ]);
  P("u4-lh-2", T.lho, "Calcular $" + L + "_{x\\to\\infty}\\dfrac{x^2}{e^x}$", "num", [
    ["¿Indeterminación?",
      ["$\\tfrac\\infty\\infty$: arriba y abajo van a $\\infty$", "Se puede aplicar."],
      ["$\\tfrac00$, porque algo tiende a $0$", "Ni arriba ni abajo tienden a $0$."],
      ["Ninguna, el límite sale directo", "Hay una: $\\tfrac\\infty\\infty$."]],
    ["Primera vez: $\\dfrac{2x}{e^x}$. ¿Y ahora?",
      ["Sigue $\\tfrac\\infty\\infty$: aplicar otra vez", "Queda $\\tfrac{2}{e^x}\\to0$."],
      ["Responder $2x$, sin el denominador", "Falta el denominador."],
      ["Responder $\\infty$, porque $2x$ crece", "Abajo crece más rápido."]]
  ]);
  P("u4-lh-3", T.lho, "Calcular $" + L + "_{x\\to0^+}x\\ln x$", "num", [
    ["Es $0\\cdot(-\\infty)$. ¿Qué hacés?",
      ["Reescribir como $\\dfrac{\\ln x}{1/x}$", "Así es $\\tfrac{\\infty}{\\infty}$."],
      ["Aplicar L'Hôpital directo", "Hace falta un cociente primero."],
      ["Responder $0$, porque $x\\to0$", "$0\\cdot\\infty$ es indeterminado."]],
    ["Derivando: $\\dfrac{1/x}{-1/x^2}=-x$. ¿Límite?",
      ["$0$, porque $-x\\to0$ cuando $x\\to0$", "$-x\\to0$."],
      ["$-\\infty$, porque $\\ln x\\to-\\infty$ en $0^+$", "Eso es $\\ln x$; el cociente derivado vale $-x$, que tiende a $0$."],
      ["$1$, porque $\\tfrac{1/x}{1/x}=1$ siempre", "$\\tfrac{1/x}{-1/x^2}=-x$, no $\\tfrac{1/x}{1/x}$."]]
  ]);
  P("u4-lh-4", T.lho, "Calcular $" + L + "_{x\\to0}\\dfrac{1-\\cos x}{x^2}$", "num", [
    ["Primera: $\\dfrac{\\sin x}{2x}$. ¿Qué hacés?",
      ["Sigue $\\tfrac00$: otra vez (o el notable)", "Queda $\\tfrac{\\cos x}{2}$."],
      ["Sustituir $x=0$ y dar el resultado", "Da $\\tfrac00$."],
      ["Responder $0$, porque $\\sin0=0$", "No."]],
    ["¿Resultado?",
      ["$\\tfrac12$, porque $\\tfrac{\\cos0}{2}=\\tfrac12$", "$\\tfrac{\\cos0}{2}$."],
      ["$1$, por $\\cos0$ sin dividir", "Falta el $2$."],
      ["$2$, el cociente al revés", "Al revés."]]
  ]);
  P("u4-lh-5", T.lho, "Calcular $" + L + "_{x\\to\\infty}\\dfrac{\\ln x}{\\sqrt x}$", "num", [
    ["Derivando: $\\dfrac{1/x}{1/(2\\sqrt x)}$. ¿Qué hacés?",
      ["Simplificar a $\\dfrac{2}{\\sqrt x}$ antes de seguir", "Simplificar antes de derivar otra vez ahorra trabajo."],
      ["Derivar otra vez sin simplificar", "Se complica de más."],
      ["Responder $\\infty$, porque $\\ln x$ crece", "No: $\\sqrt x$ crece más rápido que $\\ln x$."]],
    ["¿Límite?",
      ["$0$", "$\\tfrac{2}{\\sqrt x}\\to0$."],
      ["$2$", "No."],
      ["$\\infty$", "No."]]
  ]);

  P("u4-ex-1", T.ext, "Hallar y clasificar los puntos críticos de $f(x)=x^3-3x$", "puntos", [
    ["¿Qué planteás?",
      ["$f'(x)=0$", "Críticos: donde $f'=0$ o no existe."],
      ["$f(x)=0$", "Eso da ceros."],
      ["$f''(x)=0$", "Eso da candidatos a inflexión."]],
    ["$x=\\pm1$; $f''=6x$. ¿Clasificación?",
      ["Máx. en $(-1,2)$; mín. en $(1,-2)$", "$f''(-1)<0$, $f''(1)>0$."],
      ["Mín. en $(-1,2)$; máx. en $(1,-2)$", "Al revés."],
      ["Los dos son máximos", "No."]]
  ]);
  P("u4-ex-2", T.ext, "Extremos absolutos de $f(x)=x^2-2x$ en $[0,3]$", "puntos", [
    ["¿Qué valores comparás?",
      ["Los críticos del intervalo y los bordes $0$ y $3$", "Un extremo absoluto puede estar en un borde."],
      ["Solo el crítico, que es el único candidato", "Faltan los bordes."],
      ["Solo los bordes $0$ y $3$, sin el crítico", "Falta el crítico."]],
    ["$f(0)=0$, $f(1)=-1$, $f(3)=3$. ¿Resultado?",
      ["Máx. abs. $3$ en $x=3$; mín. abs. $-1$ en $x=1$", "Comparando los tres."],
      ["Máx. abs. $0$ en $x=0$; mín. abs. $-1$ en $x=1$", "$3>0$."],
      ["Máx. abs. $3$ en $x=3$; mín. abs. $0$ en $x=0$", "$-1<0$."]]
  ]);
  P("u4-ex-3", T.ext, "¿$x=0$ es extremo de $f(x)=x^3$?", "conclusion", [
    ["$f'(0)=0$. ¿Alcanza?",
      ["No: hay que ver si $f'$ cambia de signo", "$f'(0)=0$ es solo un candidato."],
      ["Sí, es un mínimo porque $f'(0)=0$", "No alcanza."],
      ["Sí, es un máximo porque $f'(0)=0$", "No alcanza."]],
    ["$f'=3x^2\\ge0$ a los dos lados. ¿Conclusión?",
      ["No es extremo: es inflexión de tangente horizontal", "No cambia el signo."],
      ["Es mínimo, porque la función crece a los dos lados", "Si crece a los dos lados, no hay mínimo: es una inflexión."],
      ["Es máximo, porque $f'(0)=0$ en ese punto", "Un máximo exige que $f'$ pase de $+$ a $-$: acá no cambia el signo."]]
  ]);
  P("u4-ex-4", T.ext, "Puntos críticos de $f(x)=|x-1|$", "valores", [
    ["¿Dónde puede haber críticos?",
      ["Donde $f'=0$ o donde $f'$ no existe", "En el pico la derivada no existe."],
      ["Solo donde $f'=0$, que son los únicos", "Te perdés los picos."],
      ["Donde la función vale $0$, o sea $f=0$", "Coincide acá, pero no es el criterio."]],
    ["¿Crítico?",
      ["$x=1$, donde hay un mínimo", "La derivada no existe ahí."],
      ["No tiene, porque $f'$ nunca se anula", "Tiene uno: en $x=1$ la derivada no existe."],
      ["$x=0$, donde $f$ vale $1$", "En $x=0$ la derivada vale $-1$: no es crítico."]]
  ]);
  P("u4-ex-5", T.ext, "Clasificar el crítico $x=2$ de $f(x)=-x^2+4x$", "puntos", [
    ["¿Qué criterio usás?",
      ["Segunda derivada: $f''=-2<0$", "Rápido para una parábola."],
      ["Evaluar $f(2)$ y ver cuánto vale", "Eso da la altura, no el tipo."],
      ["Ver si $f(2)>0$ para decidir", "No clasifica."]],
    ["¿Resultado?",
      ["Máximo en $(2,4)$", "$f''<0$."],
      ["Mínimo en $(2,4)$", "$f''<0$ es máximo."],
      ["Inflexión", "No."]]
  ]);

  P("u4-cr-1", T.cre, "Intervalos de crecimiento de $f(x)=x^2-6x$", "conjunto", [
    ["¿Qué estudiás?",
      ["El signo de $f'(x)=2x-6$", "$f'>0$ crece, $f'<0$ decrece."],
      ["El signo de $f(x)=x^2-6x$", "Eso es positividad."],
      ["El signo de $f''(x)=2$", "Eso es concavidad."]],
    ["¿Resultado?",
      ["Decrece en $(-\\infty,3)$, crece en $(3,+\\infty)$", "Crítico en $3$."],
      ["Crece en $(-\\infty,3)$ y decrece en $(3,+\\infty)$", "Al revés."],
      ["Crece en $(0,6)$ y decrece en el resto", "Esos son los ceros."]]
  ]);
  P("u4-cr-2", T.cre, "Intervalos de crecimiento de $f(x)=x^3-12x$", "conjunto", [
    ["$f'(x)=3(x-2)(x+2)$. ¿Cómo seguís?",
      ["Tabla de signos con $-2$ y $2$", "Un valor de prueba por intervalo."],
      ["Evaluar $f$ en los críticos", "Eso da alturas."],
      ["Mirar solo $x=0$", "Hay tres intervalos."]],
    ["¿Resultado?",
      ["Crece en $(-\\infty,-2)\\cup(2,+\\infty)$; decrece en $(-2,2)$", "$+,-,+$."],
      ["Crece en $(-2,2)$; decrece en el resto", "Ahí $f'<0$."],
      ["Crece en todo $\\mathbb{R}$, porque es un cubo", "$f'=3x^2-12$ cambia de signo en $\\pm2$."]]
  ]);
  P("u4-cr-3", T.cre, "¿$f(x)=e^x$ crece o decrece?", "conclusion", [
    ["¿Signo de $f'=e^x$?",
      ["Siempre positivo", "La exponencial nunca es negativa ni $0$."],
      ["Cambia en $0$", "No."],
      ["Siempre negativo", "No."]],
    ["¿Conclusión?",
      ["Crece en todo $\\mathbb{R}$", "Sin extremos."],
      ["Decrece", "No."],
      ["Tiene un mínimo en $0$", "No tiene críticos."]]
  ]);
  P("u4-cr-4", T.cre, "Intervalos de crecimiento de $f(x)=\\dfrac{1}{x}$", "conjunto", [
    ["$f'=-\\dfrac{1}{x^2}$. ¿Signo?",
      ["Siempre negativo (donde existe)", "$x^2>0$."],
      ["Positivo, porque $x^2$ es positivo", "Hay un menos."],
      ["Cambia de signo al pasar por $0$", "En $0$ no existe."]],
    ["¿Resultado?",
      ["Decrece en $(-\\infty,0)$ y en $(0,+\\infty)$", "Por separado: $0$ no está en el dominio."],
      ["Decrece en $\\mathbb{R}$, sin excepciones", "$0$ no está en el dominio."],
      ["Crece en $(-\\infty,0)$ y en $(0,+\\infty)$", "$f'<0$: la función decrece, no crece."]]
  ]);
  P("u4-cr-5", T.cre, "Si $f'$ pasa de $+$ a $-$ en $x=a$, ¿qué hay en $a$?", "conclusion", [
    ["¿Qué hace la función?",
      ["Sube y después baja", "$+$ crece, $-$ decrece."],
      ["Baja y después sube", "Al revés."],
      ["Siempre sube", "No."]],
    ["¿Conclusión?",
      ["Un máximo relativo", "Criterio de la primera derivada."],
      ["Un mínimo relativo", "Sería de $-$ a $+$."],
      ["Un punto de inflexión", "Eso es con $f''$."]]
  ]);

  P("u4-co-1", T.con, "Intervalos de concavidad de $f(x)=x^3-3x^2$", "conjunto", [
    ["¿Qué estudiás?",
      ["El signo de $f''(x)=6x-6$", "$f''>0$: cóncava hacia arriba."],
      ["El signo de $f'(x)=3x^2-6x$", "Eso es crecimiento."],
      ["El signo de $f(x)=x^3-3x^2$", "Eso es positividad."]],
    ["¿Resultado?",
      ["Hacia abajo en $(-\\infty,1)$, hacia arriba en $(1,+\\infty)$", "Cambia en $1$."],
      ["Hacia arriba en $(-\\infty,1)$, hacia abajo en $(1,+\\infty)$", "Al revés."],
      ["Hacia arriba en todo $\\mathbb{R}$, porque es un cubo", "$f''=6x-6$ cambia de signo en $x=1$."]]
  ]);
  P("u4-co-2", T.con, "Punto de inflexión de $f(x)=x^3+3x^2$", "puntos", [
    ["¿Dónde buscás?",
      ["$f''(x)=6x+6=0$", "Y confirmar el cambio de signo."],
      ["$f'(x)=3x^2+6x=0$", "Eso es para extremos."],
      ["$f(x)=x^3+3x^2=0$", "Ceros."]],
    ["$x=-1$, cambia de signo. ¿Punto?",
      ["$(-1,2)$", "$f(-1)=-1+3$."],
      ["$x=-1$", "Falta la $y$."],
      ["$(-1,0)$", "$f(-1)=2$."]]
  ]);
  P("u4-co-3", T.con, "¿$f(x)=x^4$ tiene inflexión en $x=0$?", "conclusion", [
    ["$f''=12x^2$ vale $0$ en $0$. ¿Alcanza?",
      ["No: hay que ver si cambia de signo", "Solo es candidato."],
      ["Sí, porque $f''(0)=0$ en ese punto", "No alcanza."],
      ["Sí, es un mínimo porque $f''$ vale $0$", "Mezcla dos cosas."]],
    ["$f''\\ge0$ a los dos lados. ¿Conclusión?",
      ["No hay inflexión", "Siempre cóncava hacia arriba."],
      ["Hay inflexión", "No cambia la concavidad."],
      ["Es un máximo", "No."]]
  ]);
  P("u4-co-4", T.con, "Concavidad de $f(x)=\\ln x$", "conjunto", [
    ["$f''=-\\dfrac{1}{x^2}$. ¿Signo?",
      ["Siempre negativo en el dominio", "$x^2>0$."],
      ["Positivo, porque $x^2$ es positivo", "Hay un menos."],
      ["Cambia de signo al pasar por $1$", "No: $f''<0$ en todo el dominio."]],
    ["¿Resultado?",
      ["Cóncava hacia abajo en $(0,+\\infty)$", "En todo su dominio."],
      ["Cóncava hacia abajo en todo $\\mathbb{R}$", "El dominio es $(0,+\\infty)$."],
      ["Cóncava hacia arriba en $(0,+\\infty)$", "$f''<0$: es cóncava hacia abajo."]]
  ]);
  P("u4-co-5", T.con, "Si $f'(a)=0$ y $f''(a)>0$, ¿qué hay en $a$?", "conclusion", [
    ["¿Qué te dice $f''(a)>0$?",
      ["Cóncava hacia arriba (forma de $\\cup$)", "Abre hacia arriba."],
      ["Cóncava hacia abajo (forma de $\\cap$)", "Al revés."],
      ["Que la función crece en $a$", "Eso lo dice $f'$."]],
    ["¿Conclusión?",
      ["Mínimo relativo", "Tangente horizontal en forma de $\\cup$."],
      ["Máximo relativo", "Sería con $f''<0$."],
      ["Inflexión", "No."]]
  ]);

  P("u4-es-1", T.est, "Estudio de $f(x)=x^3-3x^2$: ¿por dónde empezás?", "conclusion", [
    ["¿Primer paso?",
      ["Hallar el dominio", "Todo lo demás tiene que estar adentro del dominio."],
      ["Derivar la función", "Antes, el dominio."],
      ["Graficar con tabla", "El gráfico va al final."]],
    ["¿Después de las asíntotas?",
      ["$f'$ (crecimiento y extremos), y después $f''$", "En ese orden."],
      ["Directo al gráfico, con lo que ya tenés", "Faltan las derivadas."],
      ["$f''$ primero, porque es más precisa", "Conviene $f'$ primero."]]
  ]);
  P("u4-es-2", T.est, "Para $f(x)=\\dfrac{x}{x-1}$, ¿qué asíntotas tiene?", "recta", [
    ["¿Vertical?",
      ["$x=1$, porque anula el denominador", "Anula el denominador y no el numerador."],
      ["$x=0$, porque anula el numerador", "Ese es un cero."],
      ["No tiene, porque el cociente es simple", "Tiene."]],
    ["¿Horizontal?",
      ["$y=1$, por los grados iguales", "Grados iguales."],
      ["$y=0$, por el grado de abajo", "No."],
      ["No tiene, porque hay una asíntota vertical", "Puede haber vertical y horizontal a la vez."]]
  ]);
  P("u4-es-3", T.est, "En un estudio te dio un mínimo relativo en $(1,5)$ y un máximo en $(3,2)$, sin asíntotas entre ellos. ¿Tiene sentido?", "conclusion", [
    ["¿Qué chequeás?",
      ["Que la función sea continua entre ambos puntos", "Si es continua, ir de un mínimo a un máximo más bajo es imposible."],
      ["Nada: los resultados ya están hechos", "Siempre hay que chequear coherencia."],
      ["Solo el dominio, que es lo único que importa", "No alcanza."]],
    ["¿Conclusión?",
      ["No: entre ambos, el máximo no puede quedar bajo el mínimo", "Hay un error de cálculo."],
      ["Sí: puede pasar si hay un cambio de signo entre los dos", "Revisá: después de un mínimo la función sube."],
      ["Depende del dominio de la función en ese tramo", "Sin asíntotas en el medio, es incoherente."]]
  ]);
  P("u4-es-4", T.est, "Para $f(x)=x^4-2x^2$, ¿qué simetría tiene?", "conclusion", [
    ["¿Qué calculás?",
      ["$f(-x)$ y compararlo con $f(x)$", "Para ver si es par o impar."],
      ["$f(0)$ y mirar si da cero o no", "No alcanza."],
      ["$f'(x)$ y estudiar su signo", "Eso es crecimiento, no simetría."]],
    ["$f(-x)=f(x)$. ¿Conclusión?",
      ["Es par: simétrica respecto del eje $y$", "Sirve para chequear los extremos."],
      ["Es impar: simétrica respecto del origen", "$f(-x)=f(x)$ es par, no impar."],
      ["Ninguna: no tiene simetría alguna", "Sí tiene: $f(-x)=f(x)$."]]
  ]);
  P("u4-es-5", T.est, "En un estudio te quedó un punto crítico en $x=2$ y el dominio es $\\mathbb{R}-\\{2\\}$. ¿Qué hacés?", "conclusion", [
    ["¿Es un extremo?",
      ["No: $x=2$ no está en el dominio", "Un extremo tiene que pertenecer al dominio."],
      ["Sí: es un punto crítico", "La función no existe ahí."],
      ["Sí, si $f'$ cambia de signo", "Igual no está en el dominio."]],
    ["¿Qué es $x=2$ en la tabla?",
      ["Un borde de intervalo (posible asíntota)", "Va en la tabla, no como extremo."],
      ["Nada: se descarta de la tabla de signos", "Puede cambiar el signo ahí."],
      ["Un mínimo, aunque no esté en el dominio", "Un extremo exige estar en el dominio."]]
  ]);

  P("u4-op-1", T.opt, "De todos los rectángulos de perímetro $40$, ¿cuál tiene área máxima?", "contexto", [
    ["¿Qué se optimiza y cuál es la restricción?",
      ["Área $A=xy$, con $2x+2y=40$", "Objetivo y condición."],
      ["Perímetro, con área fija", "Al revés."],
      ["Área, sin restricción", "Hace falta para dejar una variable."]],
    ["$A(x)=x(20-x)$. ¿Y ahora?",
      ["Derivar e igualar a $0$: $x=10$", "Cuadrado de lado $10$."],
      ["Igualar $A=0$ y despejar: $x=20$", "Eso da los bordes."],
      ["Responder con $A(x)=x(20-x)$", "Falta optimizar."]],
    ["¿Respuesta?",
      ["Un cuadrado de $10\\times10$, área $100$", "En contexto."],
      ["$x=10$ solamente, sin más datos", "Respondé con las dimensiones y el área."],
      ["Área $100$, sin decir las dimensiones", "Falta decir las dimensiones."]]
  ]);
  P("u4-op-2", T.opt, "Se cerca un terreno rectangular de $200\\text{ m}^2$ junto a una pared (que no se cerca). Minimizar el alambre.", "contexto", [
    ["Con $x$ los lados perpendiculares a la pared, ¿qué se minimiza?",
      ["$L=2x+y$, con $xy=200$", "Un solo lado paralelo."],
      ["$L=2x+2y$, con $xy=200$", "La pared no se cerca."],
      ["$A=xy$, con $L$ fijo", "Eso es el área, que está fija."]],
    ["$L(x)=2x+\\dfrac{200}{x}$. ¿Crítico?",
      ["$x=10$: $2-\\dfrac{200}{x^2}=0$", "$x^2=100$."],
      ["$x=100$: $2-\\dfrac{200}{x}=0$", "Se derivó mal: $\\left(\\tfrac{200}{x}\\right)'=-\\tfrac{200}{x^2}$."],
      ["$x=\\sqrt{200}$: $x^2=200$", "Se despeja $x^2=\\tfrac{200}{2}=100$, no $200$."]],
    ["¿Respuesta?",
      ["$10\\text{ m}$ por $20\\text{ m}$, con $40\\text{ m}$ de alambre", "En contexto."],
      ["$x=10$ y listo, sin las dimensiones", "Falta el contexto."],
      ["$10\\text{ m}$ por $10\\text{ m}$, con $30\\text{ m}$ de alambre", "$y=200/10=20$."]]
  ]);
  P("u4-op-3", T.opt, "Un número positivo más su recíproco: ¿cuál es la suma mínima?", "contexto", [
    ["¿Función objetivo?",
      ["$S(x)=x+\\dfrac1x$, $x>0$", "Una sola variable."],
      ["$P(x)=x\\cdot\\dfrac1x$, $x>0$", "Eso da $1$ siempre."],
      ["$D(x)=x-\\dfrac1x$, $x>0$", "Es una suma."]],
    ["$S'=1-\\dfrac{1}{x^2}=0$. ¿Resultado?",
      ["$x=1$, suma mínima $2$", "$x=-1$ queda afuera por ser negativo."],
      ["$x=\\pm1$, suma mínima $2$", "$x>0$: el $-1$ queda afuera."],
      ["$x=0$, suma mínima $0$", "No está en el dominio."]]
  ]);
  P("u4-op-4", T.opt, "Después de derivar te dio $x=-3$ como medida de un lado. ¿Qué hacés?", "conclusion", [
    ["¿Es válido?",
      ["No: una longitud no puede ser negativa", "El dominio sale del contexto."],
      ["Sí: es una solución de la ecuación", "No en este contexto."],
      ["Sí, tomando el valor absoluto $|{-3}|=3$", "Cambiar el signo no es válido."]],
    ["¿Entonces?",
      ["Descartarlo y revisar otros críticos y bordes", "Puede haber otro crítico o un borde."],
      ["Responder $3$, tomando el valor absoluto de $-3$", "No."],
      ["Decir que el problema no tiene solución y listo", "Primero revisá."]]
  ]);
  P("u4-op-5", T.opt, "¿Cómo confirmás que un crítico de optimización es máximo?", "conclusion", [
    ["¿Qué criterio?",
      ["$f''<0$ en el crítico, o $f'$ de $+$ a $-$", "Cualquiera de los dos."],
      ["Que $f'=0$ en ese punto, y nada más", "Eso solo dice que es crítico."],
      ["Que $f>0$ en el crítico, para ser máximo", "Que $f$ sea positiva no clasifica el crítico."]],
    ["En un intervalo cerrado, ¿alcanza?",
      ["También hay que comparar con los bordes", "El máximo absoluto puede estar en un borde."],
      ["Sí, con el crítico alcanza siempre", "En un intervalo cerrado, faltan los bordes."],
      ["Hay que integrar para confirmar el máximo", "Integrar no sirve para clasificar el crítico."]]
  ]);

  P("u4-ap-1", T.apr, "Aproximar $\\sqrt{16{,}2}$ con aproximación lineal", "contexto", [
    ["¿Qué punto $a$ elegís?",
      ["$a=16$: cerca y con raíz exacta", "$f(16)=4$."],
      ["$a=16{,}2$: justo el que querés aproximar", "No se puede usar: ese valor es justamente lo que no conocés."],
      ["$a=0$: el punto más simple de calcular", "Muy lejos de $16{,}2$: el error sería enorme."]],
    ["$f'(16)=\\tfrac18$. ¿Aproximación?",
      ["$4+\\tfrac18(0{,}2)=4{,}025$", "$f(a)+f'(a)(x-a)$."],
      ["$4+\\tfrac18(2)=4{,}25$", "El incremento es $0{,}2$, no $2$."],
      ["$4+\\tfrac18\\cdot1=4{,}125$", "Falta multiplicar por $0{,}2$."]]
  ]);
  P("u4-ap-2", T.apr, "El radio de un círculo es $5$ cm con error $\\pm0{,}1$. Estimar el error del área.", "contexto", [
    ["¿Qué usás?",
      ["Diferencial: $dA=2\\pi r\\,dr$", "Error propagado."],
      ["Calcular $A(5{,}1)$ y listo", "Funciona pero no es lo pedido."],
      ["Diferencial: $dA=\\pi r^2\\,dr$", "$A'=2\\pi r$."]],
    ["¿Resultado?",
      ["$dA=\\pi\\text{ cm}^2\\approx3{,}14\\text{ cm}^2$", "$2\\pi\\cdot5\\cdot0{,}1$."],
      ["$dA=10\\pi\\text{ cm}^2\\approx31{,}4\\text{ cm}^2$", "Falta multiplicar por $0{,}1$."],
      ["$dA=0{,}1\\text{ cm}^2$", "$0{,}1$ es el error del radio, no el del área."]]
  ]);
  P("u4-ap-3", T.apr, "Polinomio de Maclaurin de grado 2 de $f(x)=e^x$", "polinomio", [
    ["¿Qué necesitás?",
      ["$f(0)$, $f'(0)$ y $f''(0)$", "Maclaurin = centrado en $0$."],
      ["$f(1)$, $f'(1)$ y $f''(1)$", "Es en $0$."],
      ["Solo $f'(0)$, por la tangente", "Faltan los otros."]],
    ["Todas valen $1$. ¿Polinomio?",
      ["$1+x+\\dfrac{x^2}{2}$", "El de grado 2 va dividido por $2!$."],
      ["$1+x+x^2$", "Falta dividir por $2!$."],
      ["$x+\\dfrac{x^2}{2}$", "Falta $f(0)=1$ como término constante."]]
  ]);
  P("u4-ap-4", T.apr, "¿Cuándo es confiable la aproximación lineal?", "conclusion", [
    ["¿Dónde?",
      ["Cerca del punto $a$ elegido", "Lejos, el error crece."],
      ["En todo el dominio de la función", "No."],
      ["Lejos del punto $a$ elegido", "Al revés."]],
    ["Para mejorar la precisión cerca de $a$…",
      ["Usar Taylor de mayor grado", "Más términos, menos error."],
      ["Usar una recta con otra pendiente", "No."],
      ["Alejarse de $a$", "Empeora."]]
  ]);
  P("u4-ap-5", T.apr, "Aproximar $(2{,}01)^3$ con diferenciales", "contexto", [
    ["¿Base y $dx$?",
      ["$a=2$, $dx=0{,}01$", "$f(2)=8$."],
      ["$a=2{,}01$, $dx=2$", "Al revés."],
      ["$a=0$, $dx=2{,}01$", "Muy lejos."]],
    ["$f'(2)=12$. ¿Aproximación?",
      ["$8+12\\cdot0{,}01=8{,}12$", "Valor real $\\approx8{,}1206$."],
      ["$8+0{,}01=8{,}01$", "Falta multiplicar por $f'(2)=12$."],
      ["$12+0{,}01=12{,}01$", "Falta $f(2)$."]]
  ]);
})(typeof window !== "undefined" ? window : globalThis);
