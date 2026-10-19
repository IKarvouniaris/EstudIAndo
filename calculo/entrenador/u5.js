// Entrenador de decisiones — Unidades V, VI y VII.
(function (root) {
  const P = root.DuoP;
  const T = {
    inm: "Integrales inmediatas",
    sus: "Método de sustitución",
    par: "Integración por partes (ILATE)",
    fra: "Descomposición en fracciones simples",
    bar: "Regla de Barrow y propiedades",
    are: "Áreas entre curvas",
    imp: "Integrales impropias",
    sep: "Variables separables",
    lin: "Ecuaciones lineales de primer orden (factor integrante)",
    seg: "Segundo orden a coeficientes constantes (homogéneas)"
  };
  const I = "\\displaystyle\\int ";
  // Unidad V
  P("u5-in-1", T.inm, "Calcular $" + I + "(3x^2+2x)\\,dx$", "primitiva", [
    ["¿Método?",
      ["Inmediata, con la tabla de potencias", "Es de tabla."],
      ["Sustitución con $u=3x^2+2x$, $du=(6x+2)dx$", "No hace falta."],
      ["Partes, con $u=3x^2$ y $dv=2x\\,dx$ como producto", "No hay producto."]],
    ["¿Resultado?",
      ["$x^3+x^2+C$", "Sube el exponente y se divide."],
      ["$x^3+x^2$", "Falta $+C$."],
      ["$6x+2+C$", "Eso es derivar."]]
  ]);
  P("u5-in-2", T.inm, "Calcular $" + I + "\\dfrac{2}{x}\\,dx$", "primitiva", [
    ["¿Regla de potencias con $n=-1$?",
      ["No: $\\dfrac1x$ es el caso especial, da $\\ln|x|$", "Con $n=-1$ habría que dividir por $0$."],
      ["Sí: da $\\dfrac{x^0}{0}$, sin problema alguno", "No se puede dividir por $0$."],
      ["Sí: da $-\\dfrac{2}{x^2}$, al integrar", "Eso es derivar."]],
    ["¿Resultado?",
      ["$2\\ln|x|+C$", "Con valor absoluto."],
      ["$\\ln|2x|+C$", "El $2$ multiplica."],
      ["$2\\ln x+C$", "Falta el valor absoluto: es $\\ln|x|$."]]
  ]);
  P("u5-in-3", T.inm, "Calcular $" + I + "(e^x-\\sin x)\\,dx$", "primitiva", [
    ["¿Primitiva de $\\sin x$?",
      ["$-\\cos x$", "Porque $(-\\cos x)'=\\sin x$."],
      ["$\\cos x$", "Su derivada es $-\\sin x$."],
      ["$-\\sin x$", "No."]],
    ["¿Resultado?",
      ["$e^x+\\cos x+C$", "$-(-\\cos x)=+\\cos x$."],
      ["$e^x-\\cos x+C$", "Signo."],
      ["$e^x+C$", "Falta un término."]]
  ]);
  P("u5-in-4", T.inm, "Calcular $" + I + "\\sqrt{x}\\,dx$", "primitiva", [
    ["¿Primer paso?",
      ["Escribir $\\sqrt x$ como $x^{1/2}$", "Para usar potencias."],
      ["Derivar: $\\dfrac{1}{2\\sqrt x}$", "Eso es la derivada, no la primitiva."],
      ["Sustitución con $u=\\sqrt x$", "No hace falta."]],
    ["¿Resultado?",
      ["$\\tfrac23x^{3/2}+C$", "$\\dfrac{x^{3/2}}{3/2}$."],
      ["$\\tfrac32x^{3/2}+C$", "Dividir por $\\tfrac32$ es multiplicar por $\\tfrac23$."],
      ["$x^{3/2}+C$", "Falta dividir."]]
  ]);
  P("u5-in-5", T.inm, "Calcular $" + I + "\\dfrac{x^2+1}{x}\\,dx$", "primitiva", [
    ["¿Qué hacés con el cociente?",
      ["Dividir término a término: $x+\\dfrac1x$", "La integral de un cociente no es el cociente de integrales."],
      ["Integrar arriba y abajo por separado", "No se puede."],
      ["Fracciones simples, aunque no haga falta", "Primero separar alcanza."]],
    ["¿Resultado?",
      ["$\\dfrac{x^2}{2}+\\ln|x|+C$", "Dos inmediatas."],
      ["$\\dfrac{x^3/3+x}{x^2/2}$", "No se integra así."],
      ["$\\dfrac{x^2}{2}+C$", "Falta $\\ln|x|$."]]
  ]);

  P("u5-su-1", T.sus, "Calcular $" + I + "2x(x^2+1)^4\\,dx$", "primitiva", [
    ["¿Qué ves?",
      ["Lo de adentro $x^2+1$ y su derivada $2x$", "Señal de sustitución."],
      ["Un producto de funciones de distinto tipo", "Eso pediría partes."],
      ["Una inmediata, que sale por potencias", "No directamente."]],
    ["$u=x^2+1$. ¿Resultado?",
      ["$\\dfrac{(x^2+1)^5}{5}+C$", "$\\displaystyle\\int u^4du$."],
      ["$\\dfrac{(2x)^5}{5}+C$", "Se vuelve a $x$ con $u=x^2+1$, no con $2x$."],
      ["$(x^2+1)^5+C$", "Falta dividir por $5$."]]
  ]);
  P("u5-su-2", T.sus, "Calcular $" + I + "\\cos(3x)\\,dx$", "primitiva", [
    ["¿Qué sustituís?",
      ["$u=3x$, $du=3\\,dx$", "Lo de adentro."],
      ["$u=\\cos x$", "No."],
      ["Nada, es $\\sin(3x)$", "Falta compensar el $3$."]],
    ["¿Resultado?",
      ["$\\tfrac13\\sin(3x)+C$", "$dx=\\tfrac{du}{3}$."],
      ["$3\\sin(3x)+C$", "Al revés."],
      ["$\\sin(3x)+C$", "Derivando da $3\\cos(3x)$."]]
  ]);
  P("u5-su-3", T.sus, "Calcular $" + I + "\\dfrac{\\ln x}{x}\\,dx$", "primitiva", [
    ["¿Qué sustituís?",
      ["$u=\\ln x$, $du=\\tfrac1x dx$", "La derivada de $\\ln x$ está ahí."],
      ["$u=x$, $du=dx$, sin cambio", "No cambia nada."],
      ["Partes con $u=\\ln x$", "Sustitución es más directo."]],
    ["¿Resultado?",
      ["$\\dfrac{(\\ln x)^2}{2}+C$", "$\\displaystyle\\int u\\,du$."],
      ["$\\ln(\\ln x)+C$", "Eso saldría de $\\int\\tfrac{1}{x\\ln x}\\,dx$."],
      ["$\\dfrac{\\ln x^2}{2}+C$", "Es $(\\ln x)^2$, no $\\ln(x^2)$."]]
  ]);
  P("u5-su-4", T.sus, "Calcular $" + I + "\\dfrac{x}{x^2+4}\\,dx$", "primitiva", [
    ["¿Qué sustituís?",
      ["$u=x^2+4$, $du=2x\\,dx$", "Arriba está casi la derivada de abajo."],
      ["Fracciones simples", "$x^2+4$ no se factoriza en $\\mathbb{R}$."],
      ["$u=x$, $du=dx$, y seguir", "No."]],
    ["¿Resultado?",
      ["$\\tfrac12\\ln(x^2+4)+C$", "$x\\,dx=\\tfrac{du}{2}$."],
      ["$\\ln(x^2+4)+C$", "Falta $\\tfrac12$."],
      ["$\\dfrac{x^2}{2(x^2+4)}$", "No."]]
  ]);
  P("u5-su-5", T.sus, "Calcular $" + I + "e^{5x}\\,dx$", "primitiva", [
    ["¿Qué hacés con el $5$?",
      ["$u=5x$: aparece $\\tfrac15$", "$dx=\\tfrac{du}{5}$."],
      ["Nada: $e^{5x}+C$", "Derivando da $5e^{5x}$."],
      ["Multiplicar por $5$", "Al revés."]],
    ["¿Resultado?",
      ["$\\tfrac15e^{5x}+C$", "Verificá derivando."],
      ["$5e^{5x}+C$", "Al revés."],
      ["$\\dfrac{e^{5x+1}}{5x+1}$", "No es una potencia."]]
  ]);

  P("u5-pa-1", T.par, "Calcular $" + I + "x\\,e^{2x}\\,dx$", "primitiva", [
    ["¿Método?",
      ["Partes: producto de algebraica por exponencial", "No hay derivada de adentro multiplicando."],
      ["Sustitución $u=2x$, para simplificar el exponente", "Sigue quedando una $x$ suelta."],
      ["Inmediata, con la tabla de exponenciales", "No hay una fórmula directa para $x\\,e^{2x}$."]],
    ["Con ILATE, ¿$u$?",
      ["$u=x$, $dv=e^{2x}dx$", "Algebraica antes que exponencial."],
      ["$u=e^{2x}$, $dv=x\\,dx$", "Al revés: la integral se complica."],
      ["$u=2x$, $dv=e^{2x}dx$", "Hay que dejar $x$ solo como $u$: ILATE prioriza la algebraica."]],
    ["¿Resultado?",
      ["$\\tfrac12xe^{2x}-\\tfrac14e^{2x}+C$", "$v=\\tfrac12e^{2x}$."],
      ["$xe^{2x}-\\tfrac12e^{2x}+C$", "El primer término también lleva $\\tfrac12$."],
      ["$\\tfrac12xe^{2x}-e^{2x}+C$", "El segundo término es $-\\tfrac14e^{2x}$: la integral de $v\\,du$ lleva otro $\\tfrac12$."]]
  ]);
  P("u5-pa-2", T.par, "Calcular $" + I + "x\\sin x\\,dx$", "primitiva", [
    ["¿$u$ y $dv$?",
      ["$u=x$, $dv=\\sin x\\,dx$", "ILATE: algebraica antes que trigonométrica."],
      ["$u=\\sin x$, $dv=x\\,dx$", "Al revés."],
      ["Sustitución con $u=\\sin x$", "No hay derivada de adentro."]],
    ["¿Resultado?",
      ["$-x\\cos x+\\sin x+C$", "$v=-\\cos x$."],
      ["$x\\cos x+\\sin x+C$", "Signo de $v$."],
      ["$-x\\cos x+C$", "Falta el segundo término."]]
  ]);
  P("u5-pa-3", T.par, "Calcular $" + I + "x^2\\ln x\\,dx$", "primitiva", [
    ["¿$u$?",
      ["$u=\\ln x$, $dv=x^2\\,dx$", "Logarítmica antes que algebraica."],
      ["$u=x^2$, $dv=\\ln x\\,dx$", "Habría que integrar $\\ln x$."],
      ["Sustitución $u=\\ln x$", "No aparece $\\tfrac1x$."]],
    ["¿Resultado?",
      ["$\\dfrac{x^3}{3}\\ln x-\\dfrac{x^3}{9}+C$", "$\\displaystyle\\int \\tfrac{x^2}{3}dx=\\tfrac{x^3}{9}$."],
      ["$\\dfrac{x^3}{3}\\ln x-x^3+C$", "El segundo término es $-\\tfrac{x^3}{9}$, no $-x^3$."],
      ["$\\dfrac{x^3}{3}\\ln x-\\dfrac{x^2}{9}+C$", "La integral de $\\tfrac{x^2}{3}$ es $\\tfrac{x^3}{9}$, no $\\tfrac{x^2}{9}$."]]
  ]);
  P("u5-pa-4", T.par, "Calcular $" + I + "x^2e^x\\,dx$", "primitiva", [
    ["Aplicás partes una vez y queda $\\displaystyle\\int 2xe^x\\,dx$. ¿Y ahora?",
      ["Partes otra vez, con $u=2x$", "Sigue siendo un producto."],
      ["Terminaste: ya no queda integral", "Queda una integral."],
      ["Sustitución con $u=e^x$", "No."]],
    ["¿Resultado?",
      ["$e^x(x^2-2x+2)+C$", "Verificá derivando."],
      ["$x^2e^x-2xe^x+C$", "Falta $+2e^x$."],
      ["$x^2e^x-2e^x+C$", "Falta el término $-2xe^x$."]]
  ]);
  P("u5-pa-5", T.par, "Elegiste $u$ y la nueva integral quedó más difícil. ¿Qué hacés?", "conclusion", [
    ["¿Qué indica?",
      ["Probablemente elegiste mal $u$ y $dv$", "La integral nueva tiene que ser más simple."],
      ["Que hay que seguir así hasta el final", "Se complica cada vez más."],
      ["Que la función no tiene primitiva", "No es la conclusión."]],
    ["¿Qué probás?",
      ["Intercambiar $u$ y $dv$ (revisá ILATE)", "ILATE ayuda a elegir."],
      ["Derivar la integral original", "Derivar una integral no la resuelve."],
      ["Pasar a fracciones simples", "No corresponde."]]
  ]);

  P("u5-fr-1", T.fra, "Calcular $" + I + "\\dfrac{1}{x(x+1)}\\,dx$", "primitiva", [
    ["¿Método?",
      ["Fracciones simples: $\\dfrac{A}{x}+\\dfrac{B}{x+1}$", "Racional con denominador factorizado."],
      ["Sustitución con $u=x(x+1)$ para integrar", "No aparece la derivada de abajo arriba."],
      ["Partes con $u=\\tfrac1x$ y $dv=\\tfrac{dx}{x+1}$", "No hay un producto que convenga integrar por partes."]],
    ["$A=1$, $B=-1$. ¿Resultado?",
      ["$\\ln|x|-\\ln|x+1|+C$", "Cada una da un logaritmo."],
      ["$\\ln|x(x+1)|+C$", "Signo del segundo."],
      ["$\\dfrac{1}{x}-\\dfrac{1}{x+1}+C$", "Falta integrar: esos son los sumandos, no sus primitivas."]]
  ]);
  P("u5-fr-2", T.fra, "Para $\\dfrac{x^2}{x^2-1}$, ¿qué hacés antes de fracciones simples?", "conclusion", [
    ["¿Qué ves?",
      ["Grados iguales: hay que dividir primero", "Debe ser propia."],
      ["Se puede descomponer directo, sin dividir", "No con grados iguales."],
      ["Nada: ya es una fracción propia", "Los grados son iguales: no es propia, hay que dividir."]],
    ["¿Qué queda?",
      ["$1+\\dfrac{1}{x^2-1}$", "Y recién ahí se descompone."],
      ["$x^2-1+\\dfrac{1}{x^2-1}$", "El cociente de dividir es $1$, no $x^2-1$."],
      ["$1-\\dfrac{1}{x^2-1}$", "El signo es $+$: $x^2=(x^2-1)+1$."]]
  ]);
  P("u5-fr-3", T.fra, "Descomponer $\\dfrac{5}{(x-2)(x+3)}$: ¿cómo hallás $A$ rápido?", "parametros", [
    ["$5=A(x+3)+B(x-2)$. ¿Qué $x$ usás?",
      ["$x=2$, que anula el término con $B$", "Despeja $A$ directo."],
      ["$x=0$, que es el valor más cómodo", "Quedan las dos mezcladas."],
      ["$x=5$, que es el número de arriba", "No anula nada."]],
    ["¿$A$?",
      ["$A=1$", "$5=5A$."],
      ["$A=5$", "No."],
      ["$A=-1$", "No."]]
  ]);
  P("u5-fr-4", T.fra, "¿Cómo se plantea $\\dfrac{3x}{(x-1)^2}$?", "simplificada", [
    ["El factor $(x-1)$ está repetido. ¿Planteo?",
      ["$\\dfrac{A}{x-1}+\\dfrac{B}{(x-1)^2}$", "Un término por cada potencia."],
      ["$\\dfrac{A}{x-1}+\\dfrac{B}{x-1}$", "Sería lo mismo dos veces."],
      ["$\\dfrac{A}{(x-1)^2}+B$", "Falta el término simple $\\tfrac{B}{x-1}$."]],
    ["¿Qué da $\\displaystyle\\int \\dfrac{B}{(x-1)^2}dx$?",
      ["$-\\dfrac{B}{x-1}+C$", "Potencias, no logaritmo."],
      ["$B\\ln|x-1|^2$", "No."],
      ["$B\\ln|x-1|$", "Eso es para la potencia $1$."]]
  ]);
  P("u5-fr-5", T.fra, "Calcular $" + I + "\\dfrac{2x+1}{x^2+x}\\,dx$", "primitiva", [
    ["¿Qué notás?",
      ["Arriba está la derivada de abajo: sustitución", "$u=x^2+x$."],
      ["Hay que descomponer en fracciones simples sí o sí", "Funciona, pero hay un atajo."],
      ["Partes con $u=2x+1$ y $dv=\\tfrac{dx}{x^2+x}$", "No hay un producto que convenga integrar por partes."]],
    ["¿Resultado?",
      ["$\\ln|x^2+x|+C$", "$\\displaystyle\\int \\tfrac{du}{u}$."],
      ["$\\dfrac{1}{x^2+x}+C$", "Eso no es una primitiva: falta el logaritmo."],
      ["$\\ln|2x+1|+C$", "Ese $\\ln$ sería solo de arriba: con $u=x^2+x$ queda $\\ln|x^2+x|$."]]
  ]);

  // Unidad VI
  P("u6-ba-1", T.bar, "Calcular $" + I + "_1^3 2x\\,dx$", "num", [
    ["¿Cómo se calcula?",
      ["Primitiva $x^2$ y $F(3)-F(1)$", "Regla de Barrow."],
      ["Primitiva $x^2$ y $F(1)-F(3)$", "Es superior menos inferior."],
      ["Primitiva $x^2+C$ y $F(3)-F(1)$", "En la integral definida el $+C$ no va: se cancela al restar."]],
    ["¿Resultado?",
      ["$8$, porque $9-1=8$", "$9-1$."],
      ["$10$, porque $9+1=10$", "Es una resta."],
      ["$x^2$, la primitiva", "La definida es un número."]]
  ]);
  P("u6-ba-2", T.bar, "Calcular $" + I + "_0^{\\pi}\\sin x\\,dx$", "num", [
    ["¿Primitiva?",
      ["$-\\cos x$", "Porque $(-\\cos x)'=\\sin x$."],
      ["$\\cos x$", "Signo."],
      ["$\\sin x$", "No."]],
    ["¿Resultado?",
      ["$2$, porque $-\\cos\\pi+\\cos0=2$", "$-\\cos\\pi+\\cos0=1+1$."],
      ["$0$, porque $\\sin0=0$ y $\\sin\\pi=0$", "Eso es evaluar el integrando; hay que evaluar la primitiva $-\\cos x$."],
      ["$-2$, por el signo del coseno", "Signo."]]
  ]);
  P("u6-ba-3", T.bar, "Si $" + I + "_0^2f=5$ y $" + I + "_2^5f=3$, ¿cuánto es $" + I + "_0^5f$?", "num", [
    ["¿Qué propiedad?",
      ["Aditividad: se suman los tramos", "$\\displaystyle\\int _a^b=\\displaystyle\\int _a^c+\\displaystyle\\int _c^b$."],
      ["Se multiplican los valores de cada tramo", "No: las integrales de tramos consecutivos se suman, no se multiplican."],
      ["Se restan, porque van de $0$ a $5$", "No se restan: se suman, porque los dos tramos son consecutivos."]],
    ["¿Resultado?",
      ["$8$, que es $5+3$", "$5+3$."],
      ["$15$, que es $5\\cdot3$", "No."],
      ["$2$, que es $5-3$", "No."]]
  ]);
  P("u6-ba-4", T.bar, "Calcular $" + I + "_0^1 e^x\\,dx$", "num", [
    ["¿Qué tipo de resultado?",
      ["Un número", "Integral definida."],
      ["$e^x+C$", "Esa es la indefinida."],
      ["Un intervalo", "No."]],
    ["¿Resultado?",
      ["$e-1$, por $e^1-e^0$", "$e^1-e^0$."],
      ["$e$, por $e^1$ solamente", "Falta restar $e^0=1$."],
      ["$1$, por $e^0$ solamente", "Falta $e^1$: es $e^1-e^0$."]]
  ]);
  P("u6-ba-5", T.bar, "Calcular $" + I + "_0^2 x(x^2+1)\\,dx$", "num", [
    ["¿Cómo encarás?",
      ["Distribuir: $x^3+x$, e integrar", "Más rápido que sustituir."],
      ["Partes con $u=x$ y $dv=(x^2+1)dx$", "Innecesario."],
      ["Multiplicar las integrales", "No se puede."]],
    ["¿Resultado?",
      ["$6$, porque $4+2=6$", "$\\left[\\tfrac{x^4}{4}+\\tfrac{x^2}{2}\\right]_0^2=4+2$."],
      ["$10$, porque $8+2=10$", "Con $\\tfrac{x^4}{4}$ en $2$ da $4$, no $8$."],
      ["$4$, solo con $\\tfrac{x^4}{4}$", "Falta $\\tfrac{x^2}{2}$."]]
  ]);

  P("u6-ar-1", T.are, "Área entre $y=x^2$ e $y=4$", "area", [
    ["¿Primer paso?",
      ["Intersecciones: $x^2=4$, o sea $x=\\pm2$", "Son los límites."],
      ["Integrar de $0$ a $4$, los valores de $y$", "Los límites son de $x$."],
      ["Derivar para hallar los puntos críticos", "No se busca ningún máximo ni mínimo."]],
    ["¿Integral?",
      ["$" + I + "_{-2}^2(4-x^2)dx=\\tfrac{32}{3}$", "Arriba menos abajo."],
      ["$" + I + "_{-2}^2(x^2-4)dx$", "Daría negativo."],
      ["$" + I + "_0^2(4-x^2)dx$", "Falta la mitad."]]
  ]);
  P("u6-ar-2", T.are, "El área te dio $-\\tfrac92$. ¿Qué pasó?", "conclusion", [
    ["¿Es posible un área negativa?",
      ["No: restaste al revés (abajo menos arriba)", "Un área siempre es positiva."],
      ["Sí: el área puede dar negativa según el orden", "Una integral puede serlo; un área no."],
      ["Sí, si la curva está por debajo del eje $x$", "Igual se toma arriba menos abajo."]],
    ["¿Qué hacés?",
      ["Corregir el planteo: arriba menos abajo", "Da $\\tfrac92$."],
      ["Cambiar el signo del resultado y listo", "Mejor corregir el planteo."],
      ["Dejarlo así: $-\\tfrac92$ es válido", "No: un área nunca es negativa."]]
  ]);
  P("u6-ar-3", T.are, "Área entre $f(x)=x^3$ y el eje $x$ en $[-1,1]$", "area", [
    ["¿Qué pasa en $[-1,1]$?",
      ["La curva cruza el eje en $0$: hay que partir", "Un tramo abajo y otro arriba."],
      ["Se integra directo, de $-1$ a $1$, y listo", "Daría $0$."],
      ["Es todo positivo, así que no hay problema", "$x^3$ es negativa para $x<0$."]],
    ["¿Área?",
      ["$\\tfrac12$, por $\\tfrac14+\\tfrac14$", "$\\tfrac14+\\tfrac14$."],
      ["$0$, de integrar directo", "Eso es la integral, no el área."],
      ["$\\tfrac14$, de un solo tramo", "Falta un tramo."]]
  ]);
  P("u6-ar-4", T.are, "Área entre $y=x$ e $y=x^2$", "area", [
    ["¿Cuál está arriba en $(0,1)$?",
      ["$y=x$, que vale más en $(0,1)$", "En $x=\\tfrac12$: $\\tfrac12>\\tfrac14$."],
      ["$y=x^2$, que vale más en $(0,1)$", "Es menor ahí."],
      ["Son iguales en todo $(0,1)$", "Solo en $0$ y $1$."]],
    ["¿Área?",
      ["$\\tfrac16$", "$\\tfrac12-\\tfrac13$."],
      ["$-\\tfrac16$", "Al revés."],
      ["$\\tfrac56$", "Es una resta."]]
  ]);
  P("u6-ar-5", T.are, "¿Cómo sabés qué curva está arriba?", "conclusion", [
    ["¿Método?",
      ["Evaluar las dos en un punto de prueba", "La de mayor valor está arriba."],
      ["La de mayor grado, porque crece más", "No siempre."],
      ["La que tiene más términos en la fórmula", "No."]],
    ["Si se cruzan dentro del intervalo…",
      ["Partir la integral en cada cruce", "Cambia cuál está arriba."],
      ["No importa: se integra de todos modos", "Sí importa."],
      ["Tomar el valor absoluto del total", "Puede cancelar partes."]]
  ]);

  P("u6-im-1", T.imp, "Calcular $" + I + "_1^{\\infty}\\dfrac{1}{x^2}\\,dx$", "convergencia", [
    ["¿Cómo se plantea?",
      ["$\\displaystyle\\lim_{t\\to\\infty}" + I + "_1^t x^{-2}dx$", "Nunca se sustituye $\\infty$."],
      ["Sustituir $\\infty$ en la primitiva", "Hay que plantear el límite."],
      ["Diverge siempre", "No."]],
    ["$1-\\tfrac1t$. ¿Conclusión?",
      ["Converge a $1$", "$\\tfrac1t\\to0$."],
      ["Diverge", "El límite es finito."],
      ["Converge a $0$", "No."]]
  ]);
  P("u6-im-2", T.imp, "Calcular $" + I + "_1^{\\infty}\\dfrac{1}{x}\\,dx$", "convergencia", [
    ["¿Primitiva?",
      ["$\\ln|x|$", "Caso especial."],
      ["$-\\dfrac1x$", "Es la de $\\tfrac{1}{x^2}$."],
      ["$\\dfrac{x^0}{0}$", "No."]],
    ["$\\ln t\\to\\infty$. ¿Conclusión?",
      ["Diverge: el límite es $\\infty$", "No es un número finito."],
      ["Converge a $0$ porque $\\tfrac1x\\to0$", "Que $\\tfrac1x\\to0$ no alcanza: la integral crece como $\\ln t$."],
      ["Converge a $1$, por el límite inferior", "No."]]
  ]);
  P("u6-im-3", T.imp, "Calcular $" + I + "_0^{\\infty}e^{-x}\\,dx$", "convergencia", [
    ["¿Primitiva?",
      ["$-e^{-x}$, por la cadena", "Cadena."],
      ["$e^{-x}$, sin el signo menos", "Signo."],
      ["$e^{-x+1}$, como si fuera potencia", "Se integró como si fuera una potencia de $x$."]],
    ["¿Resultado?",
      ["Converge a $1$", "$-e^{-t}+1\\to1$."],
      ["Diverge", "No."],
      ["Converge a $-1$", "Signo."]]
  ]);
  P("u6-im-4", T.imp, "¿Por qué $" + I + "_0^1\\dfrac{1}{\\sqrt x}\\,dx$ es impropia?", "conclusion", [
    ["¿Dónde está el problema?",
      ["En $x=0$ la función tiende a infinito", "Asíntota vertical en un extremo."],
      ["En $x=1$, donde la función cambia", "Ahí vale $1$."],
      ["No es impropia: el intervalo es finito", "Sí lo es."]],
    ["¿Resultado?",
      ["Converge a $2$", "$\\lim_{t\\to0^+}(2-2\\sqrt t)$."],
      ["Diverge", "No."],
      ["Converge a $1$", "No."]]
  ]);
  P("u6-im-5", T.imp, "Te dio $\\displaystyle\\lim_{t\\to\\infty}\\ln t$. ¿Cómo lo escribís?", "conclusion", [
    ["¿Qué vale?",
      ["$+\\infty$, porque crece sin cota", "El logaritmo crece sin límite."],
      ["$0$, porque $\\ln t\\to0$ cuando $t$ crece", "$\\ln t$ crece sin límite."],
      ["$1$, porque $\\ln e=1$", "$\\ln e=1$ es un valor puntual: acá $t\\to\\infty$."]],
    ["¿Respuesta?",
      ["\"La integral diverge\"", "Es una respuesta completa."],
      ["\"No se puede resolver\"", "Se resolvió: diverge."],
      ["$\\infty$ sin comentario", "Hay que concluir si converge o diverge."]]
  ]);

  // Unidad VII
  P("u7-se-1", T.sep, "Resolver $\\dfrac{dy}{dx}=2y$", "solgen", [
    ["¿Es separable?",
      ["Sí: queda $\\dfrac{dy}{y}=2\\,dx$ y se integra", "Todo lo de $y$ de un lado."],
      ["No: no se pueden separar las variables", "Se separa."],
      ["Hay que usar factor integrante en este caso", "Se puede, pero separar es más directo."]],
    ["¿Solución general?",
      ["$y=Ke^{2x}$", "$\\ln|y|=2x+C$."],
      ["$y=e^{2x}$", "Falta la constante."],
      ["$y=2x+C$", "No."]]
  ]);
  P("u7-se-2", T.sep, "Resolver $\\dfrac{dy}{dx}=xy$ con $y(0)=5$", "solpart", [
    ["¿Qué tipo de respuesta?",
      ["Una función sin constantes, por la condición", "La condición fija la constante."],
      ["Una función con una constante libre", "Te dieron el dato para hallarla."],
      ["Un número, el valor de $y$ en $x=0$", "Es una función."]],
    ["$y=Ke^{x^2/2}$. ¿$K$?",
      ["$K=5$", "$y(0)=K$."],
      ["$K=0$", "No."],
      ["$K=e^5$", "No."]]
  ]);
  P("u7-se-3", T.sep, "Separar: $\\dfrac{dy}{dx}=\\dfrac{x^2}{y^3}$", "solgen", [
    ["¿Cómo queda?",
      ["$y^3dy=x^2dx$", "Multiplicando cruzado."],
      ["$\\dfrac{dy}{y^3}=x^2dx$", "La $y^3$ está abajo: pasa multiplicando."],
      ["$y^3dx=x^2dy$", "Eso no separa: las variables siguen mezcladas."]],
    ["¿Integrando?",
      ["$\\dfrac{y^4}{4}=\\dfrac{x^3}{3}+C$", "Una sola constante."],
      ["$\\dfrac{y^4}{4}+C=\\dfrac{x^3}{3}+C$", "Basta una."],
      ["$y^4=x^3$", "Faltan coeficientes y $C$."]]
  ]);
  P("u7-se-4", T.sep, "¿Cuántas constantes lleva la solución general de una ecuación de primer orden?", "conclusion", [
    ["¿Cuántas?",
      ["Una, juntando las de los dos lados", "Se juntan las de los dos lados."],
      ["Dos, una de cada lado de la igualdad", "Se combinan en una."],
      ["Ninguna, porque se cancelan entre sí", "La general lleva una."]],
    ["Si te dan $y(0)$…",
      ["Se usa para hallar la constante", "Solución particular."],
      ["Se ignora, no afecta a la solución", "No."],
      ["Se suma al resultado final de la integral", "No."]]
  ]);
  P("u7-se-5", T.sep, "Una magnitud decae según $\\dfrac{dQ}{dt}=-0{,}1Q$ con $Q(0)=50$. Hallar $Q(t)$.", "solpart", [
    ["¿Qué forma tiene?",
      ["$Q=Ke^{-0{,}1t}$", "Separando e integrando."],
      ["$Q=50-0{,}1t$", "No es lineal."],
      ["$Q=Ke^{0{,}1t}$", "Signo."]],
    ["¿Resultado?",
      ["$Q(t)=50e^{-0{,}1t}$", "$K=Q(0)$."],
      ["$Q(t)=e^{-0{,}1t}$", "Falta $K$."],
      ["$Q(t)=50e^{0{,}1t}$", "Decae."]]
  ]);

  P("u7-li-1", T.lin, "Resolver $y'+3y=6$", "solgen", [
    ["¿Factor integrante?",
      ["$\\mu=e^{3x}$", "$e^{\\int3dx}$."],
      ["$\\mu=e^3$", "Falta la $x$."],
      ["$\\mu=3x$", "Es exponencial."]],
    ["¿Solución?",
      ["$y=2+Ce^{-3x}$", "$e^{3x}y=2e^{3x}+C$."],
      ["$y=2+Ce^{-x}$", "El exponente sale del factor integrante: es $-3x$, no $-x$."],
      ["$y=2+Ce^{3x}$", "Al dividir por $e^{3x}$ queda $e^{-3x}$."]]
  ]);
  P("u7-li-2", T.lin, "Para $2y'+4y=8$, ¿cuál es el primer paso?", "conclusion", [
    ["¿Qué hacés?",
      ["Dividir por $2$: $y'+2y=4$", "El coeficiente de $y'$ tiene que ser $1$."],
      ["Factor integrante $e^{4x}$", "Antes hay que normalizar."],
      ["Separar variables", "Se puede acá, pero la consigna pide factor integrante."]],
    ["¿Factor integrante?",
      ["$e^{2x}$", "Con $P=2$."],
      ["$e^{4x}$", "Sin normalizar."],
      ["$e^{x}$", "No."]]
  ]);
  P("u7-li-3", T.lin, "Resolver $y'+\\dfrac{2}{x}y=x$ ($x>0$)", "solgen", [
    ["¿$\\mu$?",
      ["$x^2$, porque $e^{2\\ln x}=x^2$", "$e^{2\\ln x}$."],
      ["$e^{2/x}$, integrando $\\tfrac2x$ mal", "Hay que integrar $\\tfrac2x$."],
      ["$2x$, la derivada de $x^2$", "No: $\\mu=e^{\\int\\frac2x dx}=x^2$."]],
    ["$(x^2y)'=x^3$. ¿Solución?",
      ["$y=\\dfrac{x^2}{4}+\\dfrac{C}{x^2}$", "Dividiendo por $x^2$."],
      ["$y=\\dfrac{x^4}{4}+C$", "Falta dividir por $x^2$."],
      ["$y=\\dfrac{x^2}{4}+C$", "La constante va dividida por $x^2$: queda $\\tfrac{C}{x^2}$."]]
  ]);
  P("u7-li-4", T.lin, "¿Cuándo usás factor integrante y no separación?", "conclusion", [
    ["¿Qué forma tiene la ecuación?",
      ["$y'+P(x)y=Q(x)$ y no se puede separar", "Lineal en $y$."],
      ["$y'=g(x)h(y)$, o sea, ya separable", "Esa se separa."],
      ["Con $y^2$ o potencias de $y$ en la ecuación", "No es lineal."]],
    ["Después de multiplicar por $\\mu$, el lado izquierdo es…",
      ["$(\\mu y)'$, por construcción", "Por construcción."],
      ["$\\mu'y$, la derivada de $\\mu$", "Falta el término $\\mu y'$."],
      ["$\\mu y'$, sin el otro término", "Falta un término."]]
  ]);
  P("u7-li-5", T.lin, "Resolver $y'-y=0$ con $y(0)=4$", "solpart", [
    ["¿Solución general?",
      ["$y=Ce^x$", "$\\mu=e^{-x}$ o separando."],
      ["$y=Ce^{-x}$", "Signo."],
      ["$y=x+C$", "No."]],
    ["¿Particular?",
      ["$y=4e^x$", "$C=4$."],
      ["$y=e^{4x}$", "No."],
      ["$y=4$", "No."]]
  ]);

  P("u7-so-1", T.seg, "Resolver $y''-5y'+6y=0$", "solgen", [
    ["¿Qué planteás?",
      ["La ecuación característica $r^2-5r+6=0$", "Cambiando $y''\\to r^2$, $y'\\to r$, $y\\to1$."],
      ["Separar variables, pasando $y$ a un lado", "Es de segundo orden."],
      ["Factor integrante, como en primer orden", "Es para primer orden."]],
    ["$r=2,3$. ¿Solución?",
      ["$y=C_1e^{2x}+C_2e^{3x}$", "Raíces reales distintas."],
      ["$y=(C_1+C_2x)e^{2x}$", "Eso es para raíz doble."],
      ["$y=e^{2x}+e^{3x}$", "Faltan las constantes."]]
  ]);
  P("u7-so-2", T.seg, "Resolver $y''+4y=0$", "solgen", [
    ["¿Raíces de $r^2+4=0$?",
      ["$r=\\pm2i$", "Complejas."],
      ["$r=\\pm2$", "$r^2=-4$."],
      ["$r=-4$", "No."]],
    ["¿Solución?",
      ["$y=C_1\\cos2x+C_2\\sin2x$", "$\\alpha=0$, $\\beta=2$."],
      ["$y=C_1e^{2x}+C_2e^{-2x}$", "Eso es con raíces reales."],
      ["$y=e^{2ix}$", "Se escribe con senos y cosenos."]]
  ]);
  P("u7-so-3", T.seg, "Resolver $y''-4y'+4y=0$", "solgen", [
    ["¿Discriminante?",
      ["$0$: hay una raíz doble, $r=2$", "$(r-2)^2$."],
      ["Positivo: dos raíces distintas", "$16-16=0$."],
      ["Negativo: raíces complejas", "El discriminante vale $16-16=0$."]],
    ["¿Solución?",
      ["$y=(C_1+C_2x)e^{2x}$", "Con el $x$ extra."],
      ["$y=C_1e^{2x}+C_2e^{2x}$", "Es una sola constante."],
      ["$y=C_1e^{2x}$", "Falta la segunda solución."]]
  ]);
  P("u7-so-4", T.seg, "Resolver $y''+2y'+5y=0$", "solgen", [
    ["¿Raíces?",
      ["$r=-1\\pm2i$", "$\\dfrac{-2\\pm\\sqrt{-16}}{2}$."],
      ["$r=1\\pm2i$", "Signo."],
      ["$r=-1\\pm4i$", "$\\sqrt{-16}=4i$, dividido por $2$."]],
    ["¿Solución?",
      ["$y=e^{-x}(C_1\\cos2x+C_2\\sin2x)$", "$\\alpha=-1$, $\\beta=2$."],
      ["$y=C_1\\cos2x+C_2\\sin2x$", "Falta $e^{-x}$."],
      ["$y=e^{2x}(C_1\\cos x+C_2\\sin x)$", "Cruzados."]]
  ]);
  P("u7-so-5", T.seg, "¿Cuántas condiciones iniciales hacen falta en segundo orden?", "conclusion", [
    ["¿Cuántas constantes tiene la general?",
      ["Dos, una por cada integración", "$C_1$ y $C_2$."],
      ["Una sola, como en primer orden", "Es de segundo orden."],
      ["Ninguna, la general no las lleva", "La solución general siempre lleva constantes."]],
    ["¿Qué condiciones se dan normalmente?",
      ["$y(0)$ e $y'(0)$, una por constante", "Una para cada constante."],
      ["Solo $y(0)$, con una alcanza", "Falta una."],
      ["$y''(0)$ y $y'''(0)$, derivadas altas", "Las condiciones se dan sobre $y$ y $y'$."]]
  ]);
})(typeof window !== "undefined" ? window : globalThis);
