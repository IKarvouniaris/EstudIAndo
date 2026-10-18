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
      ["Sustituir $h=0$ ya", "Daría $\\tfrac00$."],
      ["Racionalizar", "No hay raíces."]],
    ["¿Resultado?",
      ["$2x$", "$" + L + "_{h\\to0}(2x+h)$."],
      ["$2x+h$", "Falta tomar el límite."],
      ["$2$", "Queda $x$."]]
  ]);
  P("u3-de-2", T.def, "Calcular $f'(2)$ por definición si $f(x)=3x^2$", "num", [
    ["¿Qué tipo de respuesta esperás al final?",
      ["Un número (la pendiente en $x=2$)", "$f'(2)$ es la derivada evaluada."],
      ["Una función", "Eso sería $f'(x)$."],
      ["Una recta", "Eso es la tangente."]],
    ["$f(2+h)-f(2)=12h+3h^2$. ¿Y ahora?",
      ["Dividir por $h$ y tomar el límite: $12$", "$12+3h\\to12$."],
      ["Responder $12h+3h^2$", "Falta dividir y tomar el límite."],
      ["Responder $12+3h$", "Falta el límite."]]
  ]);
  P("u3-de-3", T.def, "Calcular $f'(x)$ por definición si $f(x)=\\dfrac1x$", "funcion", [
    ["$\\dfrac{\\frac{1}{x+h}-\\frac1x}{h}$. ¿Primer paso?",
      ["Restar las fracciones de arriba con denominador común", "Queda $\\dfrac{-h}{x(x+h)}$ arriba."],
      ["Cancelar las $x$", "No son factores."],
      ["Racionalizar", "No hay raíces."]],
    ["Queda $\\dfrac{-1}{x(x+h)}$. ¿Límite?",
      ["$-\\dfrac{1}{x^2}$", "Con $h\\to0$."],
      ["$\\dfrac{1}{x^2}$", "Signo."],
      ["$-\\dfrac1x$", "Abajo queda $x\\cdot x$."]]
  ]);
  P("u3-de-4", T.def, "Calcular $f'(x)$ por definición si $f(x)=\\sqrt{x}$", "funcion", [
    ["Da $\\tfrac00$ con raíz. ¿Qué hacés?",
      ["Multiplicar por el conjugado $\\sqrt{x+h}+\\sqrt x$", "Aparece $h$ arriba para cancelar."],
      ["Factor común $h$", "No hay $h$ a la vista arriba."],
      ["$\\sqrt{x+h}=\\sqrt x+\\sqrt h$", "Falso."]],
    ["¿Resultado?",
      ["$\\dfrac{1}{2\\sqrt x}$", "$\\dfrac{1}{\\sqrt x+\\sqrt x}$."],
      ["$\\dfrac{1}{\\sqrt x}$", "Quedan dos raíces abajo."],
      ["$2\\sqrt x$", "Está abajo."]]
  ]);
  P("u3-de-5", T.def, "¿Qué representa $" + L + "_{h\\to0}\\dfrac{f(a+h)-f(a)}{h}$?", "conclusion", [
    ["¿Qué mide?",
      ["La pendiente de la recta tangente en $x=a$", "La razón de cambio instantánea."],
      ["El área bajo la curva", "Eso es la integral."],
      ["El valor de $f(a)$", "No."]],
    ["Si da $0$, ¿qué pasa en $a$?",
      ["La tangente es horizontal", "Pendiente $0$."],
      ["$f(a)=0$", "No necesariamente."],
      ["$f$ no existe en $a$", "No."]]
  ]);

  P("u3-ta-1", T.tan, "Recta tangente a $f(x)=x^2$ en $x=3$", "recta", [
    ["¿Qué dos cosas necesitás?",
      ["El punto $(3,f(3))$ y la pendiente $f'(3)$", "Las dos."],
      ["Solo $f'(3)$", "Falta el punto."],
      ["Solo $f(3)$", "Falta la pendiente."]],
    ["Punto $(3,9)$, pendiente $6$. ¿Tangente?",
      ["$y=6x-9$", "$y=9+6(x-3)$."],
      ["$y=6x+9$", "No pasa por $(3,9)$."],
      ["$y=9x-6$", "Pendiente y punto cruzados."]]
  ]);
  P("u3-ta-2", T.tan, "Recta normal a $f(x)=x^2$ en $x=1$", "recta", [
    ["¿Pendiente de la normal?",
      ["$-\\dfrac{1}{f'(1)}=-\\tfrac12$", "Perpendicular a la tangente."],
      ["$f'(1)=2$", "Esa es la tangente."],
      ["$-2$", "Falta invertir."]],
    ["¿Normal?",
      ["$y=-\\tfrac12x+\\tfrac32$", "$y=1-\\tfrac12(x-1)$."],
      ["$y=-\\tfrac12x+1$", "No pasa por $(1,1)$."],
      ["$y=2x-1$", "Es la tangente."]]
  ]);
  P("u3-ta-3", T.tan, "¿En qué punto la tangente a $f(x)=x^2-4x$ es horizontal?", "puntos", [
    ["¿Qué planteás?",
      ["$f'(x)=0$", "Horizontal = pendiente $0$."],
      ["$f(x)=0$", "Eso da ceros."],
      ["$f''(x)=0$", "Eso es inflexión."]],
    ["$2x-4=0$. ¿Punto?",
      ["$(2,-4)$", "$f(2)=4-8$."],
      ["$x=2$", "Falta la $y$."],
      ["$(2,0)$", "$f(2)=-4$."]]
  ]);
  P("u3-ta-4", T.tan, "Tangente a $f(x)=e^x$ en $x=0$", "recta", [
    ["¿Punto y pendiente?",
      ["$(0,1)$ y $m=1$", "$e^0=1$ y $(e^x)'=e^x$."],
      ["$(0,0)$ y $m=1$", "$e^0=1$."],
      ["$(0,1)$ y $m=0$", "$f'(0)=1$."]],
    ["¿Tangente?",
      ["$y=x+1$", "$y=1+1(x-0)$."],
      ["$y=x$", "No pasa por $(0,1)$."],
      ["$y=1$", "Esa sería con pendiente $0$."]]
  ]);
  P("u3-ta-5", T.tan, "Si $f'(2)=0$ y $f(2)=5$, ¿cuál es la normal en $x=2$?", "recta", [
    ["¿Se puede usar $-\\dfrac{1}{f'(2)}$?",
      ["No: daría división por $0$", "Si la tangente es horizontal, la normal es vertical."],
      ["Sí, da $0$", "$\\tfrac10$ no existe."],
      ["Sí, da $-\\infty$", "No es un número."]],
    ["¿Normal?",
      ["$x=2$", "Recta vertical por el punto."],
      ["$y=5$", "Esa es la tangente."],
      ["$y=-5$", "No."]]
  ]);

  P("u3-cd-1", T.cvd, "¿$f(x)=|x|$ es derivable en $x=0$?", "conclusion", [
    ["¿Qué chequeás primero?",
      ["Continuidad: sí es continua", "Si no fuera continua, terminaba ahí."],
      ["Que $f(0)=0$", "No alcanza."],
      ["La segunda derivada", "No corresponde."]],
    ["Derivadas laterales $-1$ y $1$. ¿Conclusión?",
      ["Continua pero no derivable (punto anguloso)", "No coinciden."],
      ["Derivable con $f'(0)=0$", "No se promedian."],
      ["No es continua", "Sí lo es."]]
  ]);
  P("u3-cd-2", T.cvd, "Una función no es continua en $x=a$. ¿Es derivable ahí?", "conclusion", [
    ["¿Qué relación hay?",
      ["Derivable implica continua", "Entonces, si no es continua, no es derivable."],
      ["Continua implica derivable", "Al revés: no vale."],
      ["No hay relación", "Sí hay."]],
    ["¿Conclusión?",
      ["No es derivable", "Sin continuidad no hay derivada."],
      ["Puede ser derivable", "No."],
      ["Hay que calcular los laterales", "No hace falta."]]
  ]);
  P("u3-cd-3", T.cvd, "¿Es derivable en $x=1$: $f(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge1\\end{cases}$?", "conclusion", [
    ["¿Es continua en $1$?",
      ["Sí: los dos tramos dan $1$", "Empalman."],
      ["No", "Revisá: $1^2=1$ y $2-1=1$."],
      ["No importa", "Sí importa: es el primer chequeo."]],
    ["Derivadas laterales: $2x\\to2$ y $2$. ¿Conclusión?",
      ["Derivable, $f'(1)=2$", "Coinciden."],
      ["No derivable", "Coinciden."],
      ["Derivable, $f'(1)=1$", "Es $2$."]]
  ]);
  P("u3-cd-4", T.cvd, "¿Es derivable $f(x)=\\sqrt[3]{x}$ en $x=0$?", "conclusion", [
    ["¿Qué pasa con $f'(x)=\\dfrac{1}{3\\sqrt[3]{x^2}}$ en $0$?",
      ["Tiende a infinito: tangente vertical", "No hay pendiente finita."],
      ["Vale $0$", "No."],
      ["Vale $\\tfrac13$", "No."]],
    ["¿Conclusión?",
      ["Continua pero no derivable en $0$", "La tangente es vertical."],
      ["Derivable", "No tiene derivada finita."],
      ["No continua", "Es continua."]]
  ]);
  P("u3-cd-5", T.cvd, "Hallar $m$ para que $f(x)=\\begin{cases}x^2 & x<1\\\\ mx+n & x\\ge1\\end{cases}$ sea derivable en $1$ (con $n$ que la haga continua)", "parametros", [
    ["¿Qué condición da $m$?",
      ["Igualar derivadas laterales: $2=m$", "$(x^2)'=2x$ en $1$."],
      ["Igualar valores", "Eso da $n$."],
      ["$m=1$", "No."]],
    ["Con $m=2$, continuidad: $1=2+n$. ¿$n$?",
      ["$n=-1$", "Queda $2x-1$."],
      ["$n=1$", "Signo."],
      ["$n=3$", "No."]]
  ]);

  P("u3-rd-1", T.reg, "Derivar: $f(x)=3x^4-5x^2+7$", "funcion", [
    ["¿Qué reglas?",
      ["Potencias, término a término", "Suma de potencias."],
      ["Producto", "No hay producto de funciones."],
      ["Cadena", "No hay composición."]],
    ["¿Resultado?",
      ["$12x^3-10x$", "La constante da $0$."],
      ["$12x^3-10x+7$", "La derivada de $7$ es $0$."],
      ["$12x^4-10x^2$", "Hay que bajar el exponente."]]
  ]);
  P("u3-rd-2", T.reg, "Derivar: $f(x)=x^3\\ln x$", "funcion", [
    ["¿Qué regla?",
      ["Producto", "Dos funciones multiplicadas."],
      ["Cociente", "No hay cociente."],
      ["Multiplicar las derivadas", "$(uv)'\\ne u'v'$."]],
    ["¿Resultado?",
      ["$3x^2\\ln x+x^2$", "$3x^2\\ln x+x^3\\cdot\\tfrac1x$."],
      ["$3x^2\\cdot\\tfrac1x$", "Eso es $u'v'$."],
      ["$3x^2\\ln x$", "Falta $uv'$."]]
  ]);
  P("u3-rd-3", T.reg, "Derivar: $f(x)=\\dfrac{x}{x+2}$", "funcion", [
    ["¿Regla?",
      ["Cociente: $\\dfrac{u'v-uv'}{v^2}$", "Hay variable abajo."],
      ["Potencias directo", "No se puede con $x$ abajo así."],
      ["Derivar arriba y abajo por separado", "Eso es L'Hôpital, no una derivada."]],
    ["¿Resultado?",
      ["$\\dfrac{2}{(x+2)^2}$", "$\\dfrac{(x+2)-x}{(x+2)^2}$."],
      ["$\\dfrac{-2}{(x+2)^2}$", "El orden es $u'v-uv'$."],
      ["$1$", "No."]]
  ]);
  P("u3-rd-4", T.reg, "Derivar: $f(x)=\\dfrac{6}{x^2}$", "funcion", [
    ["¿Conviene la regla del cociente?",
      ["No: reescribir $6x^{-2}$ y usar potencias", "Mucho más corto."],
      ["Sí, siempre que hay fracción", "Con constante arriba hay un atajo."],
      ["Derivar arriba y abajo", "No."]],
    ["¿Resultado?",
      ["$-\\dfrac{12}{x^3}$", "$-12x^{-3}$."],
      ["$\\dfrac{12}{x}$", "No."],
      ["$-\\dfrac{12}{x}$", "El exponente baja a $-3$."]]
  ]);
  P("u3-rd-5", T.reg, "Derivar: $f(x)=e^x\\sin x$", "funcion", [
    ["¿Regla?",
      ["Producto", "Dos funciones multiplicadas."],
      ["Cadena", "No hay composición."],
      ["Solo derivar el seno", "$e^x$ también es una función de $x$."]],
    ["¿Resultado?",
      ["$e^x(\\sin x+\\cos x)$", "$e^x\\sin x+e^x\\cos x$."],
      ["$e^x\\cos x$", "Falta un término."],
      ["$e^x(\\sin x-\\cos x)$", "$(\\sin x)'=\\cos x$, positivo."]]
  ]);

  P("u3-ca-1", T.cad, "Derivar: $f(x)=(4x+1)^5$", "funcion", [
    ["¿Qué está afuera y qué adentro?",
      ["Afuera $u^5$, adentro $4x+1$", "Primero se calcula $4x+1$."],
      ["Afuera $4x+1$", "Al revés."],
      ["No es composición", "Sí lo es."]],
    ["¿Resultado?",
      ["$20(4x+1)^4$", "$5(4x+1)^4\\cdot4$."],
      ["$5(4x+1)^4$", "Falta la derivada de adentro."],
      ["$20x^4$", "No se reparte la potencia."]]
  ]);
  P("u3-ca-2", T.cad, "Derivar: $f(x)=\\sqrt{x^2+3}$", "funcion", [
    ["¿Cómo empezás?",
      ["Pensarlo como $(x^2+3)^{1/2}$ con cadena", "Raíz de algo que no es $x$."],
      ["$\\dfrac{1}{2\\sqrt x}$", "Adentro no hay solo $x$."],
      ["Separar $\\sqrt{x^2}+\\sqrt3$", "Falso."]],
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
      ["Queda igual y se multiplica por la derivada del exponente", "$(e^u)'=e^u\\cdot u'$."],
      ["Se baja el exponente", "Eso es para potencias."],
      ["Queda $e^{3x^2-1}$", "Se deriva el exponente aparte."]],
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
      ["De $f$ otra vez", "$f''$ es la derivada de $f'$."],
      ["De $f(0)$", "No."]],
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
      ["$6x$", "Falta evaluar."]]
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
      ["Cada derivada baja un grado: la cuarta es constante", "$24$."],
      ["Nunca llega a $0$", "Sí llega."],
      ["La quinta es $x^{-1}$", "No."]],
    ["¿Quinta derivada?",
      ["$0$", "Derivada de una constante."],
      ["$24$", "Esa es la cuarta."],
      ["$120x$", "No."]]
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
      ["Porque no hay constante", "No es eso."],
      ["Sí sirve: $x\\cdot x^{x-1}$", "Ese resultado es incorrecto."]],
    ["¿Qué hacés?",
      ["Aplicar $\\ln$ a los dos lados y derivar", "Derivación logarítmica."],
      ["Usar $(a^x)'=a^x\\ln a$", "La base no es constante."],
      ["Integrar", "No."]]
  ]);
  P("u3-dl-2", T.log, "Derivar: $f(x)=x^{2x}$", "funcion", [
    ["Tomando $\\ln$: $\\ln f=2x\\ln x$. ¿Derivás?",
      ["$\\dfrac{f'}{f}=2\\ln x+2$", "Producto a la derecha."],
      ["$\\dfrac{f'}{f}=\\dfrac2x$", "Falta un término."],
      ["$f'=2\\ln x+2$", "Falta $f$ a la izquierda."]],
    ["¿Resultado?",
      ["$x^{2x}(2\\ln x+2)$", "Multiplicando por $f$."],
      ["$2\\ln x+2$", "Falta multiplicar por $x^{2x}$."],
      ["$2x\\cdot x^{2x-1}$", "Regla de potencias, no corresponde."]]
  ]);
  P("u3-dl-3", T.log, "¿Hace falta derivación logarítmica para $f(x)=3^x$?", "conclusion", [
    ["¿Dónde está la $x$?",
      ["Solo en el exponente", "La base es constante."],
      ["En base y exponente", "No."],
      ["Solo en la base", "No."]],
    ["¿Conclusión?",
      ["No: $(3^x)'=3^x\\ln3$", "Regla directa."],
      ["Sí", "No hace falta."],
      ["$(3^x)'=x\\cdot3^{x-1}$", "Eso es para $x^n$."]]
  ]);
  P("u3-dl-4", T.log, "Derivar: $f(x)=(x+1)^x$", "funcion", [
    ["$\\ln f=x\\ln(x+1)$. ¿Derivada de la derecha?",
      ["$\\ln(x+1)+\\dfrac{x}{x+1}$", "Producto + cadena."],
      ["$\\dfrac{1}{x+1}$", "Falta el producto."],
      ["$\\ln(x+1)$", "Falta el segundo término."]],
    ["¿Resultado?",
      ["$(x+1)^x\\left(\\ln(x+1)+\\dfrac{x}{x+1}\\right)$", "Por $f$."],
      ["$\\ln(x+1)+\\dfrac{x}{x+1}$", "Falta multiplicar por $f$."],
      ["$x(x+1)^{x-1}$", "No."]]
  ]);
  P("u3-dl-5", T.log, "En derivación logarítmica, ¿por qué se multiplica por $f(x)$ al final?", "conclusion", [
    ["¿Qué aparece al derivar $\\ln f(x)$?",
      ["$\\dfrac{f'(x)}{f(x)}$", "Regla de la cadena."],
      ["$f'(x)$", "Falta dividir."],
      ["$\\ln f'(x)$", "No."]],
    ["¿Entonces?",
      ["Para despejar $f'$, que quedó dividida por $f$", "Por eso se multiplica."],
      ["Para simplificar", "Es para despejar."],
      ["No hace falta", "Sin eso la respuesta queda incompleta."]]
  ]);
})(typeof window !== "undefined" ? window : globalThis);
