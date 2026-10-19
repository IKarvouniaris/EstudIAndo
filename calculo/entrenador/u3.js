// Entrenador de decisiones — Unidad III.
(function (root) {
  const P = root.DuoP;
  const T = {
    def: "Definición de derivada (por límite)",
    tan: "Interpretación geométrica: recta tangente y normal",
    cvd: "Continuidad vs derivabilidad",
    reg: "Reglas de derivación (tabla y álgebra de derivadas)",
    cad: "Regla de la cadena",
    suc: "Derivadas sucesivas",
    log: "Derivada logarítmica (para potencias con variable en base y exponente)"
  };
  const L = "\\displaystyle\\lim";
  P("u3-de-1", T.def, "Calcular $f'(x)$ por definición si $f(x)=x^2$", "funcion", [
    ["¿Qué planteás?",
      ["$" + L + "_{h\\to0}\\dfrac{(x+h)^2-x^2}{h}$", "La definición con $x$ genérico."],
      ["$" + L + "_{h\\to0}\\dfrac{x^2+h-x^2}{h}$", "Hay que reemplazar $x$ por $x+h$ en toda la fórmula."],
      ["$2x$ por regla de potencias", "Te piden por definición."]],
    ["El numerador es $2xh+h^2$. ¿Qué hacés?",
      ["Factor común $h$ y cancelar con el denominador", "Queda $2x+h$."],
      ["Sustituir $h=0$ ya, antes de simplificar", "Daría $\\tfrac00$."],
      ["Racionalizar el numerador con un conjugado", "No hay raíces."]],
    ["¿Resultado?",
      ["$2x$", "$" + L + "_{h\\to0}(2x+h)$."],
      ["$2x+h$", "Falta tomar el límite."],
      ["$2$", "Queda $x$."]]
  ]);
  P("u3-de-2", T.def, "Calcular $f'(2)$ por definición si $f(x)=3x^2$", "num", [
    ["¿Qué tipo de respuesta esperás al final?",
      ["Un número (la pendiente en $x=2$)", "$f'(2)$ es la derivada evaluada."],
      ["Una función: la derivada en general", "Eso sería $f'(x)$."],
      ["Una recta: la tangente en $x=2$", "Eso es la tangente."]],
    ["$f(2+h)-f(2)=12h+3h^2$. ¿Y ahora?",
      ["Dividir por $h$ y tomar el límite: $12$", "$12+3h\\to12$."],
      ["Responder $12h+3h^2$ sin dividir por $h$", "Falta dividir y tomar el límite."],
      ["Responder $12+3h$ sin tomar el límite", "Falta el límite."]]
  ]);
  P("u3-de-3", T.def, "Calcular $f'(x)$ por definición si $f(x)=\\dfrac1x$", "funcion", [
    ["$\\dfrac{\\frac{1}{x+h}-\\frac1x}{h}$. ¿Primer paso?",
      ["Restar las fracciones con denominador común", "Queda $\\dfrac{-h}{x(x+h)}$ arriba."],
      ["Cancelar las $x$ de las dos fracciones de arriba", "No son factores."],
      ["Racionalizar la expresión de arriba y abajo", "No hay raíces."]],
    ["Queda $\\dfrac{-1}{x(x+h)}$. ¿Límite?",
      ["$-\\dfrac{1}{x^2}$", "Con $h\\to0$."],
      ["$\\dfrac{1}{x^2}$", "Signo."],
      ["$-\\dfrac1x$", "Abajo queda $x\\cdot x$."]]
  ]);
  P("u3-de-4", T.def, "Calcular $f'(x)$ por definición si $f(x)=\\sqrt{x}$", "funcion", [
    ["Da $\\tfrac00$ con raíz. ¿Qué hacés?",
      ["Multiplicar por el conjugado $\\sqrt{x+h}+\\sqrt x$", "Aparece $h$ arriba para cancelar."],
      ["Sacar factor común $h$ del numerador", "No hay $h$ a la vista arriba."],
      ["Separar $\\sqrt{x+h}=\\sqrt x+\\sqrt h$ y restar", "Falso."]],
    ["¿Resultado?",
      ["$\\dfrac{1}{2\\sqrt x}$", "$\\dfrac{1}{\\sqrt x+\\sqrt x}$."],
      ["$\\dfrac{1}{\\sqrt x}$", "Quedan dos raíces abajo."],
      ["$2\\sqrt x$", "Está abajo."]]
  ]);
  P("u3-de-5", T.def, "¿Qué representa $" + L + "_{h\\to0}\\dfrac{f(a+h)-f(a)}{h}$?", "conclusion", [
    ["¿Qué mide?",
      ["La pendiente de la recta tangente en $x=a$", "La razón de cambio instantánea."],
      ["El área bajo la curva a partir de $x=a$", "Eso es la integral."],
      ["El valor de $f$ en el punto $x=a$", "No: ese valor se calcula sin límite."]],
    ["Si da $0$, ¿qué pasa en $a$?",
      ["La tangente es horizontal", "Pendiente $0$."],
      ["Que $f(a)=0$, la función se anula", "No necesariamente."],
      ["Que $f$ no existe en el punto $a$", "No."]]
  ]);

  P("u3-ta-1", T.tan, "Recta tangente a $f(x)=x^2$ en $x=3$", "recta", [
    ["¿Qué dos cosas necesitás?",
      ["El punto $(3,f(3))$ y la pendiente $f'(3)$", "Las dos."],
      ["Solo la pendiente $f'(3)$, sin el punto", "Falta el punto."],
      ["Solo el punto $(3,f(3))$, sin la pendiente", "Falta la pendiente."]],
    ["Punto $(3,9)$, pendiente $6$. ¿Tangente?",
      ["$y=6x-9$", "$y=9+6(x-3)$."],
      ["$y=6x+9$", "No pasa por $(3,9)$."],
      ["$y=9x-6$", "Pendiente y punto cruzados."]]
  ]);
  P("u3-ta-2", T.tan, "Recta normal a $f(x)=x^2$ en $x=1$", "recta", [
    ["¿Pendiente de la normal?",
      ["$-\\dfrac{1}{f'(1)}=-\\tfrac12$, la inversa opuesta", "Perpendicular a la tangente."],
      ["$f'(1)=2$, la pendiente de la tangente", "Esa es la tangente."],
      ["$-2$, solo cambiando el signo de $f'(1)$", "Falta invertir."]],
    ["¿Normal?",
      ["$y=-\\tfrac12x+\\tfrac32$", "$y=1-\\tfrac12(x-1)$."],
      ["$y=-\\tfrac12x+1$", "No pasa por $(1,1)$."],
      ["$y=-\\tfrac12x+3$", "No pasa por $(1,1)$: con $x=1$ da $\\tfrac52$."]]
  ]);
  P("u3-ta-3", T.tan, "¿En qué punto la tangente a $f(x)=x^2-4x$ es horizontal?", "puntos", [
    ["¿Qué planteás?",
      ["$f'(x)=0$", "Horizontal = pendiente $0$."],
      ["$f(x)=0$", "Eso da ceros."],
      ["$f''(x)=0$", "Eso es inflexión."]],
    ["$2x-4=0$. ¿Punto?",
      ["$(2,-4)$", "$f(2)=4-8$."],
      ["$(2,4)$", "$f(2)=4-8=-4$, no $4$."],
      ["$(2,0)$", "$f(2)=-4$."]]
  ]);
  P("u3-ta-4", T.tan, "Tangente a $f(x)=e^x$ en $x=0$", "recta", [
    ["¿Punto y pendiente?",
      ["$(0,1)$ y $m=1$", "$e^0=1$ y $(e^x)'=e^x$."],
      ["$(0,0)$ y $m=1$", "$e^0=1$."],
      ["$(0,1)$ y $m=0$", "$f'(0)=1$."]],
    ["¿Tangente?",
      ["$y=x+1$", "$y=1+1(x-0)$."],
      ["$y=x-1$", "No pasa por $(0,1)$."],
      ["$y=1+e^x$", "Eso no es una recta: es otra curva."]]
  ]);
  P("u3-ta-5", T.tan, "Si $f'(2)=0$ y $f(2)=5$, ¿cuál es la normal en $x=2$?", "recta", [
    ["¿Se puede usar $-\\dfrac{1}{f'(2)}$?",
      ["No: daría división por $0$", "Si la tangente es horizontal, la normal es vertical."],
      ["Sí, y da $0$ como pendiente", "$\\tfrac10$ no existe."],
      ["Sí, y da $-\\infty$ como pendiente", "No es un número."]],
    ["¿Normal?",
      ["$x=2$", "Recta vertical por el punto."],
      ["$y=5$", "Esa es la tangente."],
      ["$y=-5$", "No."]]
  ]);

  P("u3-cd-1", T.cvd, "¿$f(x)=|x|$ es derivable en $x=0$?", "conclusion", [
    ["¿Qué chequeás primero?",
      ["Continuidad: sí es continua", "Si no fuera continua, terminaba ahí."],
      ["Que $f(0)$ valga $0$ y alcanza", "No alcanza."],
      ["La segunda derivada en el origen", "No corresponde."]],
    ["Derivadas laterales $-1$ y $1$. ¿Conclusión?",
      ["Continua pero no derivable (punto anguloso)", "No coinciden."],
      ["Derivable con $f'(0)=0$, el promedio de $\\pm1$", "No se promedian."],
      ["No es continua, porque tiene un pico en $0$", "Sí es continua: un pico no rompe la continuidad."]]
  ]);
  P("u3-cd-2", T.cvd, "Una función no es continua en $x=a$. ¿Es derivable ahí?", "conclusion", [
    ["¿Qué relación hay?",
      ["Derivable implica continua", "Entonces, si no es continua, no es derivable."],
      ["Continua implica derivable", "Al revés: no vale."],
      ["No hay relación", "Sí hay."]],
    ["¿Conclusión?",
      ["No es derivable en ese punto", "Sin continuidad no hay derivada."],
      ["Puede ser derivable igual", "No."],
      ["Hay que mirar los laterales", "No hace falta: sin continuidad no hay derivada."]]
  ]);
  P("u3-cd-3", T.cvd, "¿Es derivable en $x=1$: $f(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge1\\end{cases}$?", "conclusion", [
    ["¿Es continua en $1$?",
      ["Sí: los dos tramos dan $1$", "Empalman."],
      ["No: los tramos dan $1$ y $2$", "Revisá: $1^2=1$ y $2\\cdot1-1=1$."],
      ["No importa: se mira la derivada", "Sí importa: es el primer chequeo."]],
    ["Derivadas laterales: $2x\\to2$ y $2$. ¿Conclusión?",
      ["Derivable, $f'(1)=2$", "Coinciden."],
      ["No derivable", "Coinciden."],
      ["Derivable, $f'(1)=1$", "Es $2$."]]
  ]);
  P("u3-cd-4", T.cvd, "¿Es derivable $f(x)=\\sqrt[3]{x}$ en $x=0$?", "conclusion", [
    ["¿Qué pasa con $f'(x)=\\dfrac{1}{3\\sqrt[3]{x^2}}$ en $0$?",
      ["Tiende a infinito: tangente vertical", "No hay pendiente finita."],
      ["Vale $0$, porque $x=0$ anula la raíz", "En $x=0$ el denominador se anula: no da $0$."],
      ["Vale $\\tfrac13$, por el $3$ de adelante", "El denominador tiende a $0$: no queda el $\\tfrac13$ solo."]],
    ["¿Conclusión?",
      ["Continua pero no derivable en $0$", "La tangente es vertical."],
      ["Derivable en $0$, con pendiente $0$", "No tiene derivada finita."],
      ["No continua: tiene un salto en $0$", "Es continua."]]
  ]);
  P("u3-cd-5", T.cvd, "Hallar $m$ para que $f(x)=\\begin{cases}x^2 & x<1\\\\ mx+n & x\\ge1\\end{cases}$ sea derivable en $1$ (con $n$ que la haga continua)", "parametros", [
    ["¿Qué condición da $m$?",
      ["Igualar derivadas laterales: $2=m$", "$(x^2)'=2x$ en $1$."],
      ["Igualar los valores laterales en $1$", "Eso da $n$."],
      ["$m=1$, igualando $x^2$ con $mx$ en $1$", "La derivada de $x^2$ en $1$ es $2$, no $1$."]],
    ["Con $m=2$, continuidad: $1=2+n$. ¿$n$?",
      ["$n=-1$", "Queda $2x-1$."],
      ["$n=1$", "Signo."],
      ["$n=3$", "No."]]
  ]);

  P("u3-rd-1", T.reg, "Derivar: $f(x)=3x^4-5x^2+7$", "funcion", [
    ["¿Qué reglas?",
      ["Potencias, término a término", "Suma de potencias."],
      ["Producto entre los términos", "No hay producto de funciones."],
      ["Cadena, por las potencias", "No hay composición."]],
    ["¿Resultado?",
      ["$12x^3-10x$", "La constante da $0$."],
      ["$12x^3-10x+7$", "La derivada de $7$ es $0$."],
      ["$12x^4-10x^2$", "Hay que bajar el exponente."]]
  ]);
  P("u3-rd-2", T.reg, "Derivar: $f(x)=x^3\\ln x$", "funcion", [
    ["¿Qué regla?",
      ["Producto: $(uv)'=u'v+uv'$", "Dos funciones multiplicadas."],
      ["Cociente, derivando arriba y abajo", "No hay cociente."],
      ["Multiplicar las derivadas", "$(uv)'\\ne u'v'$."]],
    ["¿Resultado?",
      ["$3x^2\\ln x+x^2$", "$3x^2\\ln x+x^3\\cdot\\tfrac1x$."],
      ["$3x^2\\cdot\\tfrac1x$", "Eso es $u'v'$."],
      ["$3x^2\\ln x+x^3$", "Falta $uv'$: $x^3\\cdot\\tfrac1x=x^2$, no $x^3$."]]
  ]);
  P("u3-rd-3", T.reg, "Derivar: $f(x)=\\dfrac{x}{x+2}$", "funcion", [
    ["¿Regla?",
      ["Cociente: $\\dfrac{u'v-uv'}{v^2}$", "Hay variable abajo."],
      ["Potencias directo", "No se puede con $x$ abajo así."],
      ["Derivar arriba y abajo por separado", "Eso es L'Hôpital, no una derivada."]],
    ["¿Resultado?",
      ["$\\dfrac{2}{(x+2)^2}$", "$\\dfrac{(x+2)-x}{(x+2)^2}$."],
      ["$\\dfrac{-2}{(x+2)^2}$", "El orden es $u'v-uv'$."],
      ["$\\dfrac{1}{(x+2)^2}$", "$u'v-uv'=(x+2)-x=2$: el numerador es $2$, no $1$."]]
  ]);
  P("u3-rd-4", T.reg, "Derivar: $f(x)=\\dfrac{6}{x^2}$", "funcion", [
    ["¿Conviene la regla del cociente?",
      ["No: reescribir $6x^{-2}$ y usar potencias", "Mucho más corto."],
      ["Sí, siempre que hay una fracción", "Con constante arriba hay un atajo."],
      ["Derivar arriba y abajo por separado", "No."]],
    ["¿Resultado?",
      ["$-\\dfrac{12}{x^3}$", "$-12x^{-3}$."],
      ["$\\dfrac{12}{x^3}$", "Falta el signo: el exponente baja con signo menos."],
      ["$-\\dfrac{12}{x^2}$", "El exponente baja a $-3$: $-2-1=-3$, no $-2$."]]
  ]);
  P("u3-rd-5", T.reg, "Derivar: $f(x)=e^x\\sin x$", "funcion", [
    ["¿Regla?",
      ["Producto: $(uv)'=u'v+uv'$", "Dos funciones multiplicadas."],
      ["Cadena, de afuera hacia adentro", "No hay composición."],
      ["Solo derivar el seno", "$e^x$ también es una función de $x$."]],
    ["¿Resultado?",
      ["$e^x(\\sin x+\\cos x)$", "$e^x\\sin x+e^x\\cos x$."],
      ["$e^x\\cos x+\\sin x$", "Falta derivar $e^x$: queda $e^x\\sin x$ más $e^x\\cos x$."],
      ["$e^x(\\sin x-\\cos x)$", "$(\\sin x)'=\\cos x$, positivo."]]
  ]);

  P("u3-ca-1", T.cad, "Derivar: $f(x)=(4x+1)^5$", "funcion", [
    ["¿Qué está afuera y qué adentro?",
      ["Afuera $u^5$, adentro $4x+1$", "Primero se calcula $4x+1$."],
      ["Afuera $4x+1$, adentro $u^5$", "Al revés."],
      ["No es composición, es un producto", "Sí lo es."]],
    ["¿Resultado?",
      ["$20(4x+1)^4$", "$5(4x+1)^4\\cdot4$."],
      ["$5(4x+1)^4$", "Falta la derivada de adentro."],
      ["$20(4x+1)^5$", "El exponente baja a $4$: $5-1$, no $5$."]]
  ]);
  P("u3-ca-2", T.cad, "Derivar: $f(x)=\\sqrt{x^2+3}$", "funcion", [
    ["¿Cómo empezás?",
      ["Pensarlo como $(x^2+3)^{1/2}$ con cadena", "Raíz de algo que no es $x$."],
      ["Derivar como $\\dfrac{1}{2\\sqrt x}$ sin más", "Adentro no hay solo $x$."],
      ["Separar en $\\sqrt{x^2}+\\sqrt3$ y derivar", "Falso."]],
    ["¿Resultado?",
      ["$\\dfrac{x}{\\sqrt{x^2+3}}$", "$\\dfrac{2x}{2\\sqrt{x^2+3}}$."],
      ["$\\dfrac{1}{2\\sqrt{x^2+3}}$", "Falta $2x$."],
      ["$\\dfrac{2x}{\\sqrt{x^2+3}}$", "El $2$ se cancela."]]
  ]);
  P("u3-ca-3", T.cad, "Derivar: $f(x)=\\cos(3x^2)$", "funcion", [
    ["¿Derivada de afuera?",
      ["$-\\sin(3x^2)$", "Sin tocar lo de adentro."],
      ["$\\sin(3x^2)$", "$(\\cos u)'=-\\sin u$."],
      ["$-\\sin(6x)$", "No se deriva adentro del seno."]],
    ["¿Resultado?",
      ["$-6x\\sin(3x^2)$", "Por la derivada de adentro, $6x$."],
      ["$-\\sin(3x^2)$", "Falta $6x$."],
      ["$6x\\cos(3x^2)$", "Afuera se deriva el coseno."]]
  ]);
  P("u3-ca-4", T.cad, "Derivar: $f(x)=e^{x^3-x}$", "funcion", [
    ["¿Qué pasa con la exponencial?",
      ["Queda igual, por la derivada del exponente", "$(e^u)'=e^u\\cdot u'$."],
      ["Se baja el exponente como en una potencia", "Eso es para potencias."],
      ["Queda $e^{3x^2-1}$, derivando solo el exponente", "Se deriva el exponente aparte."]],
    ["¿Resultado?",
      ["$(3x^2-1)e^{x^3-x}$", "$u'=3x^2-1$."],
      ["$e^{x^3-x}$", "Falta $u'$."],
      ["$(x^3-x)e^{x^3-x-1}$", "No."]]
  ]);
  P("u3-ca-5", T.cad, "Derivar: $f(x)=\\ln(\\sin x)$", "funcion", [
    ["¿Regla?",
      ["$(\\ln u)'=\\dfrac{u'}{u}$", "Cadena con logaritmo."],
      ["$\\dfrac{1}{\\sin x}$ y listo", "Falta $u'$."],
      ["$\\ln(\\cos x)$", "No."]],
    ["¿Resultado?",
      ["$\\dfrac{\\cos x}{\\sin x}$", "$=\\cot x$."],
      ["$\\dfrac{1}{\\cos x}$", "No."],
      ["$\\cos x\\ln x$", "No."]]
  ]);

  P("u3-su-1", T.suc, "Calcular $f''(x)$ si $f(x)=x^4-2x^3$", "funcion", [
    ["¿De qué partís para $f''$?",
      ["De $f'(x)=4x^3-6x^2$", "Se deriva la primera derivada."],
      ["De $f$, derivando otra vez", "$f''$ es la derivada de $f'$."],
      ["De $f(0)$ en el origen", "No."]],
    ["¿Resultado?",
      ["$12x^2-12x$", "Derivando $f'$."],
      ["$12x^3-6x^2$", "No."],
      ["$4x^3-6x^2$", "Eso es $f'$."]]
  ]);
  P("u3-su-2", T.suc, "Calcular $f''(1)$ si $f(x)=x^3+x$", "num", [
    ["¿Qué tipo de respuesta?",
      ["Un número", "Está evaluada en $1$."],
      ["Una función", "Sería $f''(x)$."],
      ["Un conjunto", "No."]],
    ["$f''(x)=6x$. ¿$f''(1)$?",
      ["$6$", "$6\\cdot1$."],
      ["$4$", "Es $f'(1)$."],
      ["$0$", "$f''(1)=6\\cdot1=6$, no $0$."]]
  ]);
  P("u3-su-3", T.suc, "Hallar $f'''(x)$ si $f(x)=\\sin x$", "funcion", [
    ["¿Qué patrón tienen las derivadas del seno?",
      ["$\\sin\\to\\cos\\to-\\sin\\to-\\cos\\to\\sin$", "Cíclico cada 4."],
      ["Siempre $\\cos$", "No."],
      ["Siempre $\\sin$", "No."]],
    ["¿$f'''$?",
      ["$-\\cos x$", "Tercera del ciclo."],
      ["$\\cos x$", "Esa es $f'$."],
      ["$-\\sin x$", "Esa es $f''$."]]
  ]);
  P("u3-su-4", T.suc, "¿Cuánto vale la quinta derivada de $f(x)=x^4$?", "funcion", [
    ["¿Qué pasa con un polinomio de grado 4?",
      ["Cada derivada baja un grado, hasta una constante", "$24$."],
      ["Nunca llega a $0$: siempre queda algo de $x$", "Sí llega."],
      ["Sigue bajando de grado hasta $x^{-1}$", "No."]],
    ["¿Quinta derivada?",
      ["$0$, porque la cuarta es constante", "Derivada de una constante."],
      ["$24$, que es la cuarta derivada", "Esa es la cuarta."],
      ["$120x$, siguiendo la regla de potencias", "No."]]
  ]);
  P("u3-su-5", T.suc, "Calcular $f''(x)$ si $f(x)=e^{2x}$", "funcion", [
    ["¿$f'$?",
      ["$2e^{2x}$", "Cadena."],
      ["$e^{2x}$", "Falta el $2$."],
      ["$2xe^{2x}$", "No."]],
    ["¿$f''$?",
      ["$4e^{2x}$", "Otra vez por $2$."],
      ["$2e^{2x}$", "Falta derivar de nuevo."],
      ["$4xe^{2x}$", "No."]]
  ]);

  P("u3-dl-1", T.log, "¿Qué técnica usás para derivar $f(x)=x^x$?", "conclusion", [
    ["¿Por qué no sirve la regla de potencias?",
      ["Porque el exponente también tiene $x$", "Variable en base y exponente."],
      ["Porque no hay ninguna constante en la base", "No es eso."],
      ["Sí sirve: da $x\\cdot x^{x-1}$ como siempre", "Ese resultado es incorrecto."]],
    ["¿Qué hacés?",
      ["Aplicar $\\ln$ a los dos lados y derivar", "Derivación logarítmica."],
      ["Usar $(a^x)'=a^x\\ln a$ con $a=x$", "La base no es constante."],
      ["Integrar los dos lados de la igualdad", "Integrar no sirve para derivar."]]
  ]);
  P("u3-dl-2", T.log, "Derivar: $f(x)=x^{2x}$", "funcion", [
    ["Tomando $\\ln$: $\\ln f=2x\\ln x$. ¿Derivás?",
      ["$\\dfrac{f'}{f}=2\\ln x+2$", "Producto a la derecha."],
      ["$\\dfrac{f'}{f}=\\dfrac2x$", "Falta un término."],
      ["$f'=2\\ln x+2$", "Falta $f$ a la izquierda."]],
    ["¿Resultado?",
      ["$x^{2x}(2\\ln x+2)$", "Multiplicando por $f$."],
      ["$x(2\\ln x+2)$", "Falta multiplicar por $x^{2x}$, no por $x$."],
      ["$x^{2x}\\cdot2\\ln x$", "Falta el segundo término: el $+2$ que sale de derivar $2x$."]]
  ]);
  P("u3-dl-3", T.log, "¿Hace falta derivación logarítmica para $f(x)=3^x$?", "conclusion", [
    ["¿Dónde está la $x$?",
      ["Solo en el exponente", "La base es constante."],
      ["En base y exponente", "No."],
      ["Solo en la base", "No."]],
    ["¿Conclusión?",
      ["No: $(3^x)'=3^x\\ln3$ es una regla directa", "Regla directa."],
      ["Sí, porque hay una $x$ en el exponente", "No hace falta: la base es constante y hay una regla directa."],
      ["No: $(3^x)'=x\\cdot3^{x-1}$ por potencias", "Eso es para $x^n$."]]
  ]);
  P("u3-dl-4", T.log, "Derivar: $f(x)=(x+1)^x$", "funcion", [
    ["$\\ln f=x\\ln(x+1)$. ¿Derivada de la derecha?",
      ["$\\ln(x+1)+\\dfrac{x}{x+1}$", "Producto + cadena."],
      ["$\\ln(x+1)\\cdot\\dfrac{x}{x+1}$", "Se deriva con la regla del producto: los términos se suman, no se multiplican."],
      ["$\\ln(x+1)+\\dfrac{1}{x+1}$", "Falta el $x$ del producto: es $x\\cdot\\tfrac{1}{x+1}$."]],
    ["¿Resultado?",
      ["$(x+1)^x\\left(\\ln(x+1)+\\dfrac{x}{x+1}\\right)$", "Por $f$."],
      ["$(x+1)^x\\left(\\ln(x+1)+\\dfrac{1}{x+1}\\right)$", "El segundo término es $x\\cdot\\tfrac{1}{x+1}$, no solo $\\tfrac{1}{x+1}$."],
      ["$(x+1)^x\\left(\\ln(x+1)+x\\right)$", "Falta dividir por $x+1$ en el segundo término."]]
  ]);
  P("u3-dl-5", T.log, "En derivación logarítmica, ¿por qué se multiplica por $f(x)$ al final?", "conclusion", [
    ["¿Qué aparece al derivar $\\ln f(x)$?",
      ["$\\dfrac{f'(x)}{f(x)}$", "Regla de la cadena."],
      ["$f'(x)\\cdot f(x)$", "Falta dividir: aparece $\\tfrac{f'}{f}$, no el producto."],
      ["$\\dfrac{f(x)}{f'(x)}$", "Está al revés: $f'$ queda arriba."]],
    ["¿Entonces?",
      ["Para despejar $f'$, que quedó dividida por $f$", "Por eso se multiplica."],
      ["Para simplificar la expresión del resultado", "Es para despejar."],
      ["No hace falta: $f'$ ya quedó despejada", "Sin eso la respuesta queda incompleta."]]
  ]);
})(typeof window !== "undefined" ? window : globalThis);
