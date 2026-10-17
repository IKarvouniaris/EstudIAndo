(function (root) {
  const T = {
    sep: "Variables separables",
    lin: "Ecuaciones lineales de primer orden (factor integrante)",
    seg: "Segundo orden a coeficientes constantes (homogéneas)"
  };
  const list = [
    // Variables separables
    { id: "u7-se-1", topic: T.sep, nivel: "directo",
      enunciado: "Resolver $\\dfrac{dy}{dx}=3y$ con la condición inicial $y(0)=2$",
      respuesta: { final: "y=2e^{3x}", equivalentes: [], formato: "función y(x) sin constantes (solución particular)" },
      resolucion: ["\\dfrac{dy}{y}=3\\,dx", "\\ln|y|=3x+C", "y=Ke^{3x}", "y(0)=K=2 \\Rightarrow y=2e^{3x}"],
      vigilar: ["una sola constante", "usar la condición inicial para hallarla"],
      checks: [{ kind: "ode", eq: "diff(y,x)-3*y", sol: "2*exp(3*x)", ics: [["0", "2"]] }], verificado: "sympy" },
    { id: "u7-se-2", topic: T.sep, nivel: "guia",
      enunciado: "Resolver $\\dfrac{dy}{dx}=\\dfrac{x^2}{y}$ con $y(0)=2$",
      respuesta: { final: "y=\\sqrt{\\tfrac23x^3+4}", equivalentes: ["y^2=\\tfrac23x^3+4,\\ y>0"], formato: "función y(x) (solución particular)" },
      resolucion: ["y\\,dy=x^2\\,dx", "\\dfrac{y^2}{2}=\\dfrac{x^3}{3}+C", "y(0)=2:\\ 2=0+C \\Rightarrow C=2", "y^2=\\tfrac23x^3+4 \\Rightarrow y=\\sqrt{\\tfrac23x^3+4} \\text{ (raíz positiva porque } y(0)=2>0)"],
      vigilar: ["elegir el signo de la raíz con la condición inicial", "calcular C antes de despejar y"],
      checks: [{ kind: "ode", eq: "diff(y,x)-x**2/y", sol: "sqrt(Rational(2,3)*x**3+4)", ics: [["0", "2"]] }], verificado: "sympy" },
    { id: "u7-se-3", topic: T.sep, nivel: "parcial",
      enunciado: "Una población crece según $\\dfrac{dP}{dt}=0{,}02P$ ($t$ en años) y hoy tiene $P(0)=1000$ individuos. Hallar $P(t)$ y en cuánto tiempo se duplica.",
      respuesta: { final: "P(t)=1000e^{0{,}02t};\\ \\text{se duplica en } t=50\\ln2\\approx34{,}7 \\text{ años}", equivalentes: ["t=\\dfrac{\\ln2}{0{,}02}"], formato: "función y tiempo con unidades" },
      resolucion: ["\\dfrac{dP}{P}=0{,}02\\,dt \\Rightarrow \\ln P=0{,}02t+C", "P=Ke^{0{,}02t},\\ P(0)=1000 \\Rightarrow K=1000", "2000=1000e^{0{,}02t} \\Rightarrow e^{0{,}02t}=2", "t=\\dfrac{\\ln2}{0{,}02}=50\\ln2\\approx34{,}7 \\text{ años}"],
      vigilar: ["despejar t aplicando ln", "responder en contexto, con unidades"],
      checks: [{ kind: "ode", eq: "diff(y,x)-Rational(1,50)*y", sol: "1000*exp(x/50)", ics: [["0", "1000"]] }, { kind: "solve", eq: "1000*exp(x/50)-2000", var: "x", answer: ["50*log(2)"], real: true }], verificado: "sympy" },

    // Lineales de primer orden
    { id: "u7-li-1", topic: T.lin, nivel: "directo",
      enunciado: "Resolver $\\dfrac{dy}{dx}-2y=4$ (solución general)",
      respuesta: { final: "y=-2+Ce^{2x}", equivalentes: ["y=Ce^{2x}-2"], formato: "función y(x) con una constante" },
      resolucion: ["P(x)=-2 \\Rightarrow \\mu=e^{-2x}", "\\left(e^{-2x}y\\right)'=4e^{-2x}", "e^{-2x}y=-2e^{-2x}+C", "y=-2+Ce^{2x}"],
      vigilar: ["P(x) es -2, con su signo", "dividir TODO por μ al final, incluida la C"],
      checks: [{ kind: "ode", eq: "diff(y,x)-2*y-4", sol: "-2+C*exp(2*x)" }], verificado: "sympy" },
    { id: "u7-li-2", topic: T.lin, nivel: "guia",
      enunciado: "Resolver $\\dfrac{dy}{dx}+\\dfrac{1}{x}\\,y=3x$ para $x>0$ (solución general)",
      respuesta: { final: "y=x^2+\\dfrac{C}{x}", equivalentes: [], formato: "función y(x) con una constante" },
      resolucion: ["\\mu=e^{\\int\\frac1x dx}=e^{\\ln x}=x", "(xy)'=3x^2", "xy=x^3+C", "y=x^2+\\dfrac{C}{x}"],
      vigilar: ["e^{\\ln x}=x", "la C también se divide por x"],
      checks: [{ kind: "ode", eq: "diff(y,x)+y/x-3*x", sol: "x**2+C/x" }], verificado: "sympy" },
    { id: "u7-li-3", topic: T.lin, nivel: "parcial",
      enunciado: "Resolver $x\\dfrac{dy}{dx}+2y=4x^2$ para $x>0$, con $y(1)=3$",
      respuesta: { final: "y=x^2+\\dfrac{2}{x^2}", equivalentes: [], formato: "función y(x) (solución particular)" },
      resolucion: ["\\text{forma estándar: } y'+\\dfrac2x\\,y=4x", "\\mu=e^{2\\ln x}=x^2", "(x^2y)'=4x^3 \\Rightarrow x^2y=x^4+C", "y=x^2+\\dfrac{C}{x^2};\\ y(1)=1+C=3 \\Rightarrow C=2"],
      vigilar: ["primero dividir por x (el coeficiente de y' tiene que ser 1)", "e^{2\\ln x}=x^2", "usar la condición inicial"],
      checks: [{ kind: "ode", eq: "x*diff(y,x)+2*y-4*x**2", sol: "x**2+2/x**2", ics: [["1", "3"]] }], verificado: "sympy" },

    // Segundo orden
    { id: "u7-so-1", topic: T.seg, nivel: "directo",
      enunciado: "Hallar la solución general de $y''-3y'-4y=0$",
      respuesta: { final: "y=C_1e^{4x}+C_2e^{-x}", equivalentes: [], formato: "función y(x) con dos constantes" },
      resolucion: ["r^2-3r-4=0", "(r-4)(r+1)=0 \\Rightarrow r=4,\\ r=-1", "\\text{reales distintas: } y=C_1e^{4x}+C_2e^{-x}"],
      vigilar: ["dos constantes", "el signo de cada raíz va al exponente"],
      checks: [{ kind: "ode", eq: "diff(y,x,2)-3*diff(y,x)-4*y", sol: "C1*exp(4*x)+C2*exp(-x)" }], verificado: "sympy" },
    { id: "u7-so-2", topic: T.seg, nivel: "guia",
      enunciado: "Hallar la solución general de $y''+9y=0$",
      respuesta: { final: "y=C_1\\cos(3x)+C_2\\sin(3x)", equivalentes: [], formato: "función y(x) con dos constantes" },
      resolucion: ["r^2+9=0 \\Rightarrow r=\\pm3i", "\\alpha=0,\\ \\beta=3", "y=e^{0x}\\big(C_1\\cos3x+C_2\\sin3x\\big)=C_1\\cos3x+C_2\\sin3x"],
      vigilar: ["falta el término en r: la ecuación es r^2+9=0", "raíces complejas: senos y cosenos, no exponenciales con i"],
      checks: [{ kind: "ode", eq: "diff(y,x,2)+9*y", sol: "C1*cos(3*x)+C2*sin(3*x)" }], verificado: "sympy" },
    { id: "u7-so-3", topic: T.seg, nivel: "parcial",
      enunciado: "Resolver $y''-6y'+9y=0$ con $y(0)=1$ e $y'(0)=5$",
      respuesta: { final: "y=(1+2x)e^{3x}", equivalentes: [], formato: "función y(x) (solución particular)" },
      resolucion: ["r^2-6r+9=(r-3)^2=0 \\Rightarrow r=3 \\text{ doble}", "y=(C_1+C_2x)e^{3x}", "y(0)=C_1=1", "y'=C_2e^{3x}+3(C_1+C_2x)e^{3x} \\Rightarrow y'(0)=C_2+3=5 \\Rightarrow C_2=2", "y=(1+2x)e^{3x}"],
      vigilar: ["raíz doble: aparece el factor x", "derivar con regla del producto antes de usar y'(0)", "dos condiciones para dos constantes"],
      checks: [{ kind: "ode", eq: "diff(y,x,2)-6*diff(y,x)+9*y", sol: "(1+2*x)*exp(3*x)", ics: [["0", "1"]], dics: [["0", "5"]] }], verificado: "sympy" }
  ];
  const bank = root.EXERCISES || (root.EXERCISES = []);
  bank.push.apply(bank, list);
})(typeof window !== "undefined" ? window : globalThis);
