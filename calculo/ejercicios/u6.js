(function (root) {
  const T = {
    bar: "Regla de Barrow y propiedades",
    are: "Áreas entre curvas",
    imp: "Integrales impropias"
  };
  const list = [
    // Barrow
    { id: "u6-ba-1", topic: T.bar, nivel: "directo",
      enunciado: "Calcular: $\\displaystyle\\int_0^2(3x^2-2x)\\,dx$",
      respuesta: { final: "4", equivalentes: [], formato: "número" },
      resolucion: ["F(x)=x^3-x^2", "F(2)=8-4=4,\\ F(0)=0", "4-0=4"],
      vigilar: ["sin +C en la definida", "F(b)-F(a), en ese orden"],
      checks: [{ kind: "defint", integrand: "3*x**2-2*x", var: "x", a: "0", b: "2", answer: "4" }], verificado: "sympy" },
    { id: "u6-ba-2", topic: T.bar, nivel: "guia",
      enunciado: "Calcular: $\\displaystyle\\int_1^4\\dfrac{1}{\\sqrt{x}}\\,dx$",
      respuesta: { final: "2", equivalentes: [], formato: "número" },
      resolucion: ["\\dfrac{1}{\\sqrt x}=x^{-1/2}", "F(x)=\\dfrac{x^{1/2}}{1/2}=2\\sqrt x", "F(4)-F(1)=4-2=2"],
      vigilar: ["reescribir como potencia", "-1/2+1=1/2"],
      checks: [{ kind: "defint", integrand: "1/sqrt(x)", var: "x", a: "1", b: "4", answer: "2" }], verificado: "sympy" },
    { id: "u6-ba-3", topic: T.bar, nivel: "parcial",
      enunciado: "Calcular: $\\displaystyle\\int_0^1x(x^2+1)^3\\,dx$",
      respuesta: { final: "\\tfrac{15}{8}", equivalentes: ["1{,}875"], formato: "número" },
      resolucion: ["u=x^2+1,\\ du=2x\\,dx", "x=0\\to u=1;\\ x=1\\to u=2", "\\tfrac12\\int_1^2u^3\\,du=\\tfrac12\\left[\\dfrac{u^4}{4}\\right]_1^2", "\\tfrac12\\cdot\\dfrac{16-1}{4}=\\dfrac{15}{8}"],
      vigilar: ["al sustituir, cambiar también los límites (o volver a x antes de evaluar)", "no mezclar límites de x con la variable u"],
      checks: [{ kind: "defint", integrand: "x*(x**2+1)**3", var: "x", a: "0", b: "1", answer: "Rational(15,8)" }], verificado: "sympy" },

    // Áreas
    { id: "u6-ar-1", topic: T.are, nivel: "directo",
      enunciado: "Calcular el área encerrada entre $y=x$ e $y=x^2$",
      respuesta: { final: "\\tfrac16", equivalentes: [], formato: "número positivo (área)" },
      resolucion: ["x=x^2 \\Rightarrow x=0,\\ x=1", "\\text{en } x=\\tfrac12:\\ \\tfrac12>\\tfrac14 \\Rightarrow y=x \\text{ arriba}", "\\int_0^1(x-x^2)\\,dx=\\tfrac12-\\tfrac13=\\tfrac16"],
      vigilar: ["arriba menos abajo", "las intersecciones son los límites"],
      checks: [{ kind: "defint", integrand: "x-x**2", var: "x", a: "0", b: "1", answer: "Rational(1,6)" }], verificado: "sympy" },
    { id: "u6-ar-2", topic: T.are, nivel: "guia",
      enunciado: "Calcular el área entre $f(x)=4-x^2$ y el eje $x$",
      respuesta: { final: "\\tfrac{32}{3}", equivalentes: [], formato: "número positivo (área)" },
      resolucion: ["4-x^2=0 \\Rightarrow x=\\pm2", "\\int_{-2}^{2}(4-x^2)\\,dx=\\left[4x-\\dfrac{x^3}{3}\\right]_{-2}^{2}", "\\left(8-\\tfrac83\\right)-\\left(-8+\\tfrac83\\right)=\\tfrac{32}{3}"],
      vigilar: ["los límites son los ceros de f", "cuidado con los signos al evaluar en -2"],
      checks: [{ kind: "defint", integrand: "4-x**2", var: "x", a: "-2", b: "2", answer: "Rational(32,3)" }], verificado: "sympy" },
    { id: "u6-ar-3", topic: T.are, nivel: "parcial",
      enunciado: "Calcular el área encerrada entre $f(x)=x^3-x$ y el eje $x$",
      respuesta: { final: "\\tfrac12", equivalentes: [], formato: "número positivo (área)" },
      resolucion: ["x^3-x=x(x-1)(x+1)=0 \\Rightarrow x=-1,0,1", "\\text{en } (-1,0):\\ f>0;\\ \\text{en } (0,1):\\ f<0", "\\int_{-1}^0(x^3-x)\\,dx=\\tfrac14", "\\int_0^1(0-(x^3-x))\\,dx=\\tfrac14", "\\text{Área}=\\tfrac14+\\tfrac14=\\tfrac12"],
      vigilar: ["la curva cruza el eje: hay que partir la integral", "\\int_{-1}^{1}(x^3-x)dx=0 NO es el área", "en cada tramo, arriba menos abajo"],
      checks: [{ kind: "defint", integrand: "Abs(x**3-x)", var: "x", a: "-1", b: "1", answer: "Rational(1,2)" }, { kind: "defint", integrand: "x**3-x", var: "x", a: "-1", b: "1", answer: "0" }], verificado: "sympy" },

    // Impropias
    { id: "u6-im-1", topic: T.imp, nivel: "directo",
      enunciado: "Calcular $\\displaystyle\\int_1^{\\infty}\\dfrac{1}{x^3}\\,dx$ o decidir si diverge",
      respuesta: { final: "\\text{Converge a } \\tfrac12", equivalentes: [], formato: "número (converge) o «diverge»" },
      resolucion: ["\\lim_{t\\to\\infty}\\int_1^t x^{-3}\\,dx", "\\left[-\\dfrac{1}{2x^2}\\right]_1^t=-\\dfrac{1}{2t^2}+\\dfrac12", "\\lim_{t\\to\\infty}\\left(\\dfrac12-\\dfrac{1}{2t^2}\\right)=\\dfrac12"],
      vigilar: ["plantear el límite, no reemplazar ∞", "decir si converge o diverge"],
      checks: [{ kind: "defint", integrand: "1/x**3", var: "x", a: "1", b: "oo", answer: "Rational(1,2)" }], verificado: "sympy" },
    { id: "u6-im-2", topic: T.imp, nivel: "guia",
      enunciado: "Calcular $\\displaystyle\\int_0^{\\infty}e^{-2x}\\,dx$ o decidir si diverge",
      respuesta: { final: "\\text{Converge a } \\tfrac12", equivalentes: [], formato: "número (converge) o «diverge»" },
      resolucion: ["\\lim_{t\\to\\infty}\\int_0^t e^{-2x}\\,dx", "\\left[-\\tfrac12e^{-2x}\\right]_0^t=-\\tfrac12e^{-2t}+\\tfrac12", "e^{-2t}\\to0 \\Rightarrow \\text{converge a } \\tfrac12"],
      vigilar: ["\\int e^{-2x}dx=-\\tfrac12e^{-2x}", "e^{-2t} tiende a 0, no a infinito"],
      checks: [{ kind: "defint", integrand: "exp(-2*x)", var: "x", a: "0", b: "oo", answer: "Rational(1,2)" }], verificado: "sympy" },
    { id: "u6-im-3", topic: T.imp, nivel: "parcial",
      enunciado: "Determinar si $\\displaystyle\\int_0^1\\dfrac{1}{\\sqrt[3]{x}}\\,dx$ converge y, si converge, calcular su valor",
      respuesta: { final: "\\text{Converge a } \\tfrac32", equivalentes: ["1{,}5"], formato: "número (converge) o «diverge»" },
      resolucion: ["\\text{asíntota vertical en } x=0:\\ \\lim_{t\\to0^+}\\int_t^1x^{-1/3}\\,dx", "\\left[\\tfrac32x^{2/3}\\right]_t^1=\\tfrac32-\\tfrac32t^{2/3}", "\\lim_{t\\to0^+}=\\tfrac32"],
      vigilar: ["el problema está en el límite inferior: t→0⁺", "-1/3+1=2/3; dividir por 2/3 es multiplicar por 3/2"],
      checks: [{ kind: "defint", integrand: "x**Rational(-1,3)", var: "x", a: "0", b: "1", answer: "Rational(3,2)" }], verificado: "sympy" }
  ];
  const bank = root.EXERCISES || (root.EXERCISES = []);
  bank.push.apply(bank, list);
})(typeof window !== "undefined" ? window : globalThis);
