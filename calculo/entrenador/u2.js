// Entrenador de decisiones — Unidad II.
(function (root) {
  const P = root.DuoP;
  const T = {
    con: "Concepto de límite y límites laterales",
    sus: "Cálculo de límites: sustitución y leyes de límites",
    cc: "Indeterminación 0/0",
    rai: "0/0 con raíces y límites notables",
    inf: "Indeterminación ∞/∞ y límites al infinito",
    lho: "Regla de L'Hôpital (introducción)",
    cnt: "Continuidad y tipos de discontinuidad",
    asi: "Asíntotas con límites (vertical, horizontal, oblicua)",
    par: "Continuidad con parámetros (hallar a, b, k)"
  };
  const L = "\\displaystyle\\lim";
  P("u2-co-1", T.con, "¿Existe $" + L + "_{x\\to2}f(x)$ si $f(x)=\\begin{cases}x+1 & x<2\\\\ 5-x & x\\ge2\\end{cases}$?", "num", [
    ["¿Cómo encarás un límite en el punto de unión?",
      ["Calculando cada lateral por separado", "Cada lado usa su fórmula."],
      ["Evaluando $f(2)$ y usando ese valor", "El límite no depende del valor en el punto."],
      ["Usando solo la fórmula del tramo $x\\ge2$", "Faltaría el lado izquierdo."]],
    ["Izquierda: $3$. Derecha: $3$. ¿Conclusión?",
      ["Existe y vale $3$", "Los laterales coinciden."],
      ["No existe porque es por tramos", "Ser por tramos no impide que exista."],
      ["Vale $6$", "No se suman los laterales."]]
  ]);
  P("u2-co-2", T.con, "Calcular $" + L + "_{x\\to0}\\dfrac{|x|}{x}$", "num", [
    ["¿Qué hacés con el valor absoluto?",
      ["Separar en $x\\to0^+$ y $x\\to0^-$", "$|x|$ cambia de fórmula en $0$."],
      ["Simplificar $|x|/x$ a $1$", "Solo vale para $x>0$."],
      ["Sustituir $x=0$ directamente", "Da $\\tfrac00$."]],
    ["Derecha: $1$. Izquierda: $-1$. ¿Conclusión?",
      ["El límite no existe", "Los laterales son distintos."],
      ["Vale $0$, el promedio", "Los laterales no se promedian."],
      ["Vale $1$, el lateral derecho", "Ese es solo el lateral derecho."]]
  ]);
  P("u2-co-3", T.con, "Si $f(3)=7$ pero $" + L + "_{x\\to3}f(x)=5$, ¿cuál es el límite?", "num", [
    ["¿Qué importa para el límite?",
      ["Lo que pasa cerca de $3$, no en $3$", "El límite describe el acercamiento."],
      ["El valor de la función en $x=3$", "Puede ser distinto del límite."],
      ["El promedio de $f(3)$ y el límite", "No se promedia."]],
    ["¿Respuesta?",
      ["$5$, el dato del límite", "Es el dato del límite."],
      ["$7$, el valor de $f(3)$", "Ese es el valor de la función."],
      ["No existe, porque $f(3)\\ne5$", "Existe: es $5$. Lo que falla es la continuidad."]]
  ]);
  P("u2-co-4", T.con, "Calcular $" + L + "_{x\\to1^+}\\dfrac{2}{x-1}$", "num", [
    ["Sustituyendo da $\\tfrac{2}{0}$. ¿Qué indica?",
      ["Un límite infinito: falta ver el signo", "Número sobre algo que tiende a $0$."],
      ["Una indeterminación: hay que factorizar", "Indeterminación es $\\tfrac00$."],
      ["Que el límite vale $0$ por ser un cociente", "Un número dividido por algo chico es grande."]],
    ["Para $x$ un poco mayor que $1$, $x-1>0$. ¿Resultado?",
      ["$+\\infty$", "$\\tfrac{2}{0^+}$."],
      ["$-\\infty$", "El denominador es positivo."],
      ["$2$", "No corresponde."]]
  ]);
  P("u2-co-5", T.con, "Un límite te dio $x+3$ como resultado final. ¿Está terminado?", "conclusion", [
    ["¿Qué tipo de respuesta lleva un límite?",
      ["Un número, $\\pm\\infty$ o \"no existe\"", "Nunca algo con $x$."],
      ["Una función de $x$, ya simplificada", "Eso es una derivada o una simplificación."],
      ["Un intervalo de números en la recta", "Eso es un dominio o un conjunto."]],
    ["¿Qué falta?",
      ["Sustituir el valor al que tiende $x$", "Simplificar es el paso previo."],
      ["Nada: $x+3$ ya es el resultado final", "Si quedó una $x$, no terminaste."],
      ["Derivar $x+3$ para ver si tiende a algo", "No corresponde."]]
  ]);

  P("u2-su-1", T.sus, "Calcular $" + L + "_{x\\to3}(x^2-2x+1)$", "num", [
    ["¿Método?",
      ["Sustitución directa", "Polinomio: continuo en todo $\\mathbb{R}$."],
      ["Factorizar el polinomio", "Solo si la sustitución da indeterminación."],
      ["L'Hôpital, derivando", "No hay cociente indeterminado."]],
    ["¿Resultado?",
      ["$4$", "$9-6+1$."],
      ["$7$", "Falta restar bien: $9-6+1=4$."],
      ["$0$", "$x=3$ no anula el polinomio: $9-6+1=4$."]]
  ]);
  P("u2-su-2", T.sus, "Calcular $" + L + "_{x\\to2}\\dfrac{x+4}{x-1}$", "num", [
    ["¿El denominador se anula en $2$?",
      ["No: vale $1$, se sustituye directo", "No hay indeterminación."],
      ["Sí: da $0$ y hay que factorizar", "$2-1=1$."],
      ["Hay que factorizar igual, por las dudas", "No hace falta."]],
    ["¿Resultado?",
      ["$\\tfrac{2+4}{2-1}=6$", "$\\tfrac{6}{1}$."],
      ["$\\tfrac{2+4}{1-2}=-6$", "Se sustituye $x=2$ en el denominador: $2-1=1$, no $1-2$."],
      ["$\\tfrac{2+4}{2-2}=\\infty$", "El denominador vale $2-1=1$, no $0$."]]
  ]);
  P("u2-su-3", T.sus, "Calcular $" + L + "_{x\\to0}(e^x+\\cos x)$", "num", [
    ["¿Método?",
      ["Sustitución: las dos son continuas", "Exponencial y coseno son continuas."],
      ["L'Hôpital, porque da una indeterminación", "No es un cociente indeterminado."],
      ["Límites notables, por el seno y la exponencial", "No hace falta."]],
    ["¿Resultado?",
      ["$2$", "$1+1$."],
      ["$1$", "$\\cos0=1$, no $0$."],
      ["$0$", "$e^0=1$."]]
  ]);
  P("u2-su-4", T.sus, "Calcular $" + L + "_{x\\to4}\\sqrt{2x+1}$", "num", [
    ["¿Se puede sustituir?",
      ["Sí: $2\\cdot4+1=9>0$, la raíz es continua ahí", "Está dentro del dominio."],
      ["No: hay una raíz y no se puede sustituir", "Las raíces son continuas en su dominio."],
      ["Hay que racionalizar antes de sustituir", "No hay indeterminación."]],
    ["¿Resultado?",
      ["$3$, porque $\\sqrt9=3$", "$\\sqrt9$."],
      ["$9$, sin la raíz", "Falta la raíz."],
      ["$\\sqrt8+1$, raíz parcial", "La raíz abarca todo $2x+1$."]]
  ]);
  P("u2-su-5", T.sus, "Calcular $" + L + "_{x\\to-1}\\dfrac{3}{x+1}$", "num", [
    ["Sustituyendo da $\\tfrac{3}{0}$. ¿Qué tipo de resultado?",
      ["Infinito: hay que mirar cada lado", "No es $\\tfrac00$."],
      ["Indeterminación, a factorizar", "El numerador no se anula."],
      ["Cero, porque el numerador es pequeño", "No: un número sobre algo que tiende a $0$ crece sin límite."]],
    ["Por derecha $+\\infty$, por izquierda $-\\infty$. ¿Conclusión?",
      ["El límite no existe: hay asíntota en $x=-1$", "Los laterales son distintos."],
      ["Vale $+\\infty$, porque es lo que da por derecha", "Solo por derecha: por izquierda da $-\\infty$."],
      ["Vale $0$, porque se compensan los dos lados", "No se compensan: los laterales son $+\\infty$ y $-\\infty$."]]
  ]);

  P("u2-cc-1", T.cc, "Calcular $" + L + "_{x\\to5}\\dfrac{x^2-25}{x-5}$", "num", [
    ["Sustituyendo da $\\tfrac00$. ¿Qué hacés?",
      ["Factorizar para cancelar $(x-5)$", "$\\tfrac00$ indica un factor común."],
      ["Responder $0$, porque arriba da $0$", "Arriba y abajo se anulan: es indeterminado."],
      ["Responder que no existe por dividir por $0$", "Hay que seguir trabajando."]],
    ["¿Qué factorización?",
      ["Diferencia de cuadrados: $(x-5)(x+5)$", "$x^2-5^2$."],
      ["Factor común $x$ del numerador entero", "El $25$ no tiene $x$."],
      ["Resolvente aplicada al denominador $x-5$", "El denominador ya es lineal."]],
    ["Cancelaste. ¿Y ahora?",
      ["Sustituir en $x+5$: da $10$", "El límite es un número."],
      ["Responder $x+5$ como límite", "Falta sustituir."],
      ["Volver a factorizar $x+5$", "Ya no hay indeterminación."]]
  ]);
  P("u2-cc-2", T.cc, "Calcular $" + L + "_{x\\to-2}\\dfrac{x^2+5x+6}{x+2}$", "num", [
    ["¿Primer paso?",
      ["Sustituir y ver que da $\\tfrac00$", "Siempre se prueba primero."],
      ["L'Hôpital sin chequear", "Antes hay que confirmar la indeterminación."],
      ["Factorizar el denominador", "Ya está factorizado."]],
    ["¿Factorización del numerador?",
      ["$(x+2)(x+3)$", "Producto $6$, suma $5$."],
      ["$(x-2)(x-3)$", "Signos."],
      ["$(x+1)(x+6)$", "Suma $7$."]],
    ["¿Límite?",
      ["$1$", "$x+3$ en $x=-2$."],
      ["$5$", "No corresponde."],
      ["$0$", "No corresponde."]]
  ]);
  P("u2-cc-3", T.cc, "Calcular $" + L + "_{x\\to0}\\dfrac{x^3-3x^2+x}{x}$", "num", [
    ["Da $\\tfrac00$. ¿Qué factor común ves arriba?",
      ["$x$: queda $x(x^2-3x+1)$", "Se cancela con el denominador."],
      ["$x^2$: queda $x^2(x-3+1)$", "El último término es $x$, no tiene $x^2$."],
      ["Ninguno: no hay factor común", "Los tres términos tienen $x$."]],
    ["¿Y después?",
      ["Sustituir $x=0$ en $x^2-3x+1$: da $1$", "Un número."],
      ["Buscar las raíces de $x^2-3x+1$", "Eso sería otra pregunta (ceros), no el límite."],
      ["Responder $x^2-3x+1$", "Falta sustituir."]]
  ]);
  P("u2-cc-4", T.cc, "Calcular $" + L + "_{x\\to1}\\dfrac{x^3-1}{x-1}$", "num", [
    ["¿Cómo factorizás $x^3-1$?",
      ["Ruffini con $1$: $(x-1)(x^2+x+1)$", "$1$ es raíz."],
      ["Como cubo de binomio: $(x-1)^3$", "$(x-1)^3$ tiene más términos."],
      ["Diferencia de cuadrados con $x^3$ y $1$", "Es una diferencia de cubos."]],
    ["¿Límite?",
      ["$3$", "$1+1+1$."],
      ["$0$", "No corresponde."],
      ["$1$", "No corresponde."]]
  ]);
  P("u2-cc-5", T.cc, "Calcular $" + L + "_{x\\to3}\\dfrac{x^2-9}{x^2-x-6}$", "num", [
    ["¿Qué hacés?",
      ["Factorizar arriba y abajo", "Los dos se anulan en $3$: $(x-3)$ es factor de ambos."],
      ["Comparar coeficientes principales: $1$", "Esa regla es para $x\\to\\infty$."],
      ["Responder $\\tfrac00$", "No es una respuesta."]],
    ["$\\dfrac{(x-3)(x+3)}{(x-3)(x+2)}$. ¿Límite?",
      ["$\\tfrac65$", "$\\tfrac{3+3}{3+2}$."],
      ["$\\tfrac56$", "Arriba va $x+3=6$: es $\\tfrac{3+3}{3+2}$."],
      ["$\\tfrac32$", "No corresponde."]]
  ]);

  P("u2-ra-1", T.rai, "Calcular $" + L + "_{x\\to0}\\dfrac{\\sqrt{x+4}-2}{x}$", "num", [
    ["Da $\\tfrac00$ con una raíz. ¿Qué hacés?",
      ["Multiplicar por el conjugado $\\sqrt{x+4}+2$", "Así aparece una $x$ arriba para cancelar."],
      ["Factorizar $x$ arriba, aunque haya una raíz", "No hay $x$ común a la vista."],
      ["Elevar al cuadrado para sacar la raíz", "Cambia la expresión."]],
    ["¿Qué queda y cuánto da?",
      ["$\\dfrac{1}{\\sqrt{x+4}+2}\\to\\tfrac14$", "$(x+4)-4=x$ se cancela."],
      ["$\\sqrt{x+4}+2\\to4$", "El conjugado queda abajo."],
      ["$\\dfrac{1}{\\sqrt{x+4}+2}\\to\\tfrac12$", "El denominador tiende a $\\sqrt4+2=4$, no a $2$."]]
  ]);
  P("u2-ra-2", T.rai, "Calcular $" + L + "_{x\\to0}\\dfrac{\\sin(5x)}{x}$", "num", [
    ["¿Qué reconocés?",
      ["El notable $\\dfrac{\\sin u}{u}\\to1$, con $u=5x$", "$5\\cdot\\dfrac{\\sin5x}{5x}$."],
      ["Que vale $1$, porque $\\tfrac{\\sin x}{x}\\to1$, sin más", "Solo si arriba y abajo tienen lo mismo."],
      ["Que vale $0$, porque $\\sin0=0$ arriba", "$\\sin0=0$ pero abajo también: es $\\tfrac00$."]],
    ["¿Resultado?",
      ["$5$, porque es $5\\cdot1$", "$5\\cdot1$."],
      ["$1$, sin el ajuste", "Falta el ajuste."],
      ["$\\tfrac15$, al revés", "Al revés."]]
  ]);
  P("u2-ra-3", T.rai, "Calcular $" + L + "_{x\\to9}\\dfrac{x-9}{\\sqrt{x}-3}$", "num", [
    ["¿Qué hacés?",
      ["Usar el conjugado $\\sqrt x+3$ para cancelar", "Así se cancela."],
      ["Responder $\\tfrac00$ como resultado final", "Hay que seguir."],
      ["Comparar grados, como en un límite al infinito", "No es al infinito."]],
    ["¿Límite?",
      ["$6$", "$\\sqrt9+3$."],
      ["$3$", "Es $\\sqrt x+3$."],
      ["$0$", "No."]]
  ]);
  P("u2-ra-4", T.rai, "Calcular $" + L + "_{x\\to0}\\dfrac{e^{x}-1}{3x}$", "num", [
    ["¿Qué notable usás?",
      ["$\\dfrac{e^u-1}{u}\\to1$", "Con $u=x$."],
      ["$\\dfrac{\\sin u}{u}\\to1$", "Acá no hay seno."],
      ["$\\left(1+\\tfrac1x\\right)^x\\to e$", "Ese es para $x\\to\\infty$."]],
    ["¿Resultado?",
      ["$\\tfrac13$, porque $\\tfrac{e^x-1}{x}\\to1$", "$\\tfrac13\\cdot\\dfrac{e^x-1}{x}$."],
      ["$3$, porque el $3$ está abajo", "El $3$ está abajo."],
      ["$1$, porque $\\tfrac{e^x-1}{x}\\to1$", "Falta el $\\tfrac13$."]]
  ]);
  P("u2-ra-5", T.rai, "Calcular $" + L + "_{x\\to\\infty}\\big(\\sqrt{x^2+4x}-x\\big)$", "num", [
    ["Es $\\infty-\\infty$. ¿Qué hacés?",
      ["Multiplicar y dividir por $\\sqrt{x^2+4x}+x$", "Pasa a un cociente."],
      ["Responder $0$, porque $\\sqrt{x^2}=x$ y se cancelan", "$\\infty-\\infty$ es indeterminado."],
      ["Responder $\\infty$, porque la raíz es mayor que $x$", "También es indeterminado."]],
    ["Queda $\\dfrac{4x}{\\sqrt{x^2+4x}+x}$. ¿Límite?",
      ["$2$", "Dividiendo por $x$: $\\tfrac{4}{1+1}$."],
      ["$4$", "Abajo hay dos términos que crecen como $x$."],
      ["$\\infty$", "Grados comparables."]]
  ]);

  P("u2-in-1", T.inf, "Calcular $" + L + "_{x\\to\\infty}\\dfrac{4x^2-1}{2x^2+x}$", "num", [
    ["¿Método?",
      ["Comparar grados", "Al infinito, decide quién crece más rápido."],
      ["Factorizar y cancelar", "No hay un $\\tfrac00$."],
      ["Sustituir infinito", "No se sustituye infinito."]],
    ["Grados iguales. ¿Resultado?",
      ["$2$", "$\\tfrac42$."],
      ["$\\infty$", "Grados iguales dan un número."],
      ["$0$", "Eso es si abajo es mayor."]]
  ]);
  P("u2-in-2", T.inf, "Calcular $" + L + "_{x\\to\\infty}\\dfrac{x+3}{x^2-5}$", "num", [
    ["¿Qué ves?",
      ["Grado de abajo mayor", "El denominador crece más rápido."],
      ["Grados iguales", "$1$ y $2$."],
      ["Grado de arriba mayor", "Al revés."]],
    ["¿Resultado?",
      ["$0$", "El denominador gana."],
      ["$1$", "No."],
      ["$\\infty$", "No."]]
  ]);
  P("u2-in-3", T.inf, "Calcular $" + L + "_{x\\to-\\infty}\\dfrac{x^3}{x^2+1}$", "num", [
    ["¿Qué ves?",
      ["Grado de arriba mayor: da infinito, falta ver el signo", "Hay que mirar el signo."],
      ["Da $0$, porque el denominador parece mayor", "Arriba es mayor: el numerador tiene grado $3$ y el denominador grado $2$."],
      ["Da $1$, porque los coeficientes principales son $1$ y $1$", "Los grados son distintos: el cociente de coeficientes solo vale con grados iguales."]],
    ["Con $x\\to-\\infty$: ¿signo?",
      ["$-\\infty$, porque $x^3<0$ y $x^2+1>0$", "$x^3<0$ y $x^2+1>0$."],
      ["$+\\infty$, por el signo del denominador", "$x^3$ es negativo para $x$ negativo."],
      ["No existe, porque cambia de signo", "Va a $-\\infty$: no hay cambio de signo cuando $x\\to-\\infty$."]]
  ]);
  P("u2-in-4", T.inf, "Calcular $" + L + "_{x\\to\\infty}e^{-x}$", "num", [
    ["¿Cómo pensás $e^{-x}$?",
      ["$\\dfrac{1}{e^x}$: abajo crece sin límite", "Reescribirlo ayuda."],
      ["Como $-e^x$, pasando el signo adelante", "$e^{-x}\\ne-e^x$."],
      ["Comparar grados como en un cociente", "No es un cociente de polinomios."]],
    ["¿Resultado?",
      ["$0$, porque queda $\\tfrac{1}{\\infty}$", "$\\tfrac{1}{\\infty}$."],
      ["$-\\infty$, por el signo menos", "Siempre es positiva."],
      ["$1$, porque $e^0=1$", "No."]]
  ]);
  P("u2-in-5", T.inf, "Calcular $" + L + "_{x\\to\\infty}\\dfrac{3x-2}{\\sqrt{x^2+1}}$", "num", [
    ["¿Qué potencia domina abajo?",
      ["$\\sqrt{x^2}=x$: abajo el grado efectivo es $1$", "Se compara como si fuera $x$."],
      ["$x^2$: la raíz no cambia el grado", "La raíz baja el grado."],
      ["Ninguna: todas pesan lo mismo abajo", "Hay una que domina."]],
    ["¿Resultado?",
      ["$3$", "$\\tfrac{3x}{x}$."],
      ["$0$", "Mismo grado."],
      ["$\\infty$", "Mismo grado."]]
  ]);

  P("u2-lh-1", T.lho, "Calcular $" + L + "_{x\\to0}\\dfrac{\\sin x}{x}$ con L'Hôpital", "num", [
    ["¿Se puede aplicar?",
      ["Sí: al sustituir da $\\tfrac00$", "Condición para usarla."],
      ["No, porque hay seno en juego", "Aplica a cualquier función."],
      ["Siempre se puede aplicar", "Solo con $\\tfrac00$ o $\\tfrac\\infty\\infty$."]],
    ["¿Cómo se deriva?",
      ["Numerador y denominador por separado: $\\dfrac{\\cos x}{1}$", "No es la regla del cociente."],
      ["Con la regla del cociente, como siempre", "L'Hôpital deriva cada uno por separado."],
      ["Solo el numerador, y el $x$ queda igual", "Los dos."]],
    ["¿Resultado?",
      ["$1$, porque $\\cos0=1$", "$\\cos0$."],
      ["$0$, porque $\\sin0=0$", "$\\cos0=1$."],
      ["No existe, porque da $\\tfrac00$", "Existe."]]
  ]);
  P("u2-lh-2", T.lho, "¿Se puede usar L'Hôpital en $" + L + "_{x\\to1}\\dfrac{x+1}{x-2}$?", "conclusion", [
    ["¿Qué da al sustituir?",
      ["$\\tfrac{2}{-1}=-2$, un valor finito", "No es indeterminado."],
      ["$\\tfrac00$, una indeterminación", "Arriba da $2$."],
      ["$\\tfrac\\infty\\infty$, otra indeterminación", "Ni arriba ni abajo valen $\\infty$ en $x=1$."]],
    ["¿Conclusión?",
      ["No corresponde: el límite es $-2$ por sustitución", "Si no es indeterminado, L'Hôpital da cualquier cosa."],
      ["Sí: derivando arriba y abajo daría $\\tfrac11=1$", "Aplicarla sin indeterminación da un resultado falso."],
      ["No existe, porque el denominador se anula en $2$", "Existe y vale $-2$: el denominador se anula en $x=2$, no en $x=1$."]]
  ]);
  P("u2-lh-3", T.lho, "Calcular $" + L + "_{x\\to\\infty}\\dfrac{x}{e^x}$", "num", [
    ["¿Qué indeterminación hay?",
      ["$\\tfrac\\infty\\infty$: arriba y abajo van a $\\infty$", "Se puede aplicar L'Hôpital."],
      ["$\\tfrac00$, porque algo tiende a $0$", "Ni arriba ni abajo tienden a $0$."],
      ["Ninguna, el límite sale directo", "Hay una: $\\tfrac\\infty\\infty$."]],
    ["Derivando: $\\dfrac{1}{e^x}$. ¿Límite?",
      ["$0$", "La exponencial crece mucho más rápido."],
      ["$1$", "No."],
      ["$\\infty$", "No."]]
  ]);
  P("u2-lh-4", T.lho, "Calcular $" + L + "_{x\\to2}\\dfrac{x^2-4}{x-2}$ con L'Hôpital", "num", [
    ["Derivás arriba y abajo. ¿Qué queda?",
      ["$\\dfrac{2x}{1}$, cada uno por separado", "Cada uno por separado."],
      ["$\\dfrac{2x}{x-2}$, solo el numerador", "Hay que derivar también el denominador: $(x-2)'=1$."],
      ["$\\dfrac{2x}{2}$, con la derivada del denominador mal", "La derivada de $x-2$ es $1$, no $2$."]],
    ["¿Resultado?",
      ["$4$", "$2\\cdot2$; coincide con factorizar."],
      ["$2$", "No."],
      ["$0$", "No."]]
  ]);
  P("u2-lh-5", T.lho, "Calcular $" + L + "_{x\\to0}\\dfrac{e^x-1-x}{x^2}$", "num", [
    ["Primera derivada: $\\dfrac{e^x-1}{2x}$. ¿Qué chequeás?",
      ["Que sigue dando $\\tfrac00$: se aplica de nuevo", "Cada vez hay que volver a chequear."],
      ["Nada: se sustituye $x=0$ y listo", "Daría $\\tfrac00$."],
      ["Que ya da $\\tfrac12$ y se puede cerrar", "Todavía es indeterminado."]],
    ["Segunda: $\\dfrac{e^x}{2}$. ¿Resultado?",
      ["$\\tfrac12$, por $\\tfrac{e^0}{2}$", "$\\tfrac{e^0}{2}$."],
      ["$1$, por $e^0$ sin dividir", "Falta el $2$."],
      ["$0$, por $e^0-1=0$", "$\\tfrac{e^0}{2}$ no se anula: $e^0=1$."]]
  ]);

  P("u2-cn-1", T.cnt, "Clasificar la discontinuidad de $f(x)=\\dfrac{x^2-4}{x-2}$ en $x=2$", "conclusion", [
    ["¿Qué calculás?",
      ["El límite en $2$ (factorizando)", "Si existe y es finito, es evitable."],
      ["Solo el valor $f(2)$ de la función", "No alcanza para clasificar."],
      ["La derivada de la función en $2$", "No corresponde."]],
    ["El límite es $4$ y $f(2)$ no existe. ¿Tipo?",
      ["Evitable, porque el límite existe", "El límite existe."],
      ["Salto finito, porque $f(2)$ no existe", "Los laterales coinciden."],
      ["Salto infinito, por el $x-2$ de abajo", "No hay asíntota."]]
  ]);
  P("u2-cn-2", T.cnt, "Clasificar la discontinuidad de $f(x)=\\dfrac{1}{x-3}$ en $x=3$", "conclusion", [
    ["¿Qué pasa con los laterales?",
      ["Son infinitos, uno de cada signo", "Número sobre algo que tiende a $0$."],
      ["Coinciden en un número finito", "No."],
      ["Son finitos y distintos entre sí", "No."]],
    ["¿Tipo?",
      ["Salto infinito (asíntota vertical)", "Al menos un lateral infinito."],
      ["Evitable, porque se puede redefinir $f(3)$", "No hay límite finito."],
      ["Salto finito, porque hay dos laterales", "Los laterales no son finitos."]]
  ]);
  P("u2-cn-3", T.cnt, "Clasificar en $x=1$: $f(x)=\\begin{cases}x+2 & x<1\\\\ 2x & x\\ge1\\end{cases}$", "conclusion", [
    ["¿Laterales?",
      ["Izquierda $3$, derecha $2$", "Cada tramo en $1$."],
      ["Los dos $3$, usando $x+2$ en ambos", "El derecho usa $2x$."],
      ["Los dos $2$, usando $2x$ en ambos", "El izquierdo usa $x+2$."]],
    ["¿Tipo?",
      ["Salto finito", "Finitos y distintos."],
      ["Evitable", "El límite no existe."],
      ["Es continua", "No empalman."]]
  ]);
  P("u2-cn-4", T.cnt, "¿Es continua $f(x)=x^3-2x+1$ en $x=2$?", "conclusion", [
    ["¿Qué sabés de los polinomios?",
      ["Son continuos en todo $\\mathbb{R}$", "No hace falta calcular nada más."],
      ["Hay que calcular los laterales", "Para un polinomio, no hace falta."],
      ["Dependen del punto", "No para polinomios."]],
    ["¿Conclusión?",
      ["Sí, es continua en todo $\\mathbb{R}$", "Límite $=f(2)=5$."],
      ["No, por el término lineal $-2x$", "Los polinomios no tienen discontinuidades."],
      ["Depende del valor de $x$ que elijas", "No: es un polinomio, continuo en todo punto."]]
  ]);
  P("u2-cn-5", T.cnt, "¿Qué 3 condiciones hacen continua a $f$ en $x=a$?", "conclusion", [
    ["¿Cuáles son?",
      ["Existe $f(a)$, existe el límite y son iguales", "Las tres a la vez."],
      ["Solo que exista $f(a)$, con eso alcanza", "Falta el límite."],
      ["Solo que exista el límite en el punto", "Falta que coincida con $f(a)$."]],
    ["Si el límite existe pero $f(a)$ es distinto, ¿qué es?",
      ["Discontinuidad evitable", "Se arregla redefiniendo $f(a)$."],
      ["Discontinuidad de salto", "Habría laterales distintos."],
      ["Continua en ese punto", "Falla la tercera condición."]]
  ]);

  P("u2-as-1", T.asi, "Hallar las asíntotas verticales de $f(x)=\\dfrac{x+1}{x^2-4}$", "recta", [
    ["¿Candidatos?",
      ["$x=2$ y $x=-2$", "Anulan el denominador."],
      ["$x=-1$ y $x=2$", "$x=-1$ anula el numerador, no el denominador."],
      ["$x=4$ y $x=-4$", "$x^2-4=0$ da $x=\\pm2$, no $\\pm4$."]],
    ["El numerador no se anula en $\\pm2$. ¿Conclusión?",
      ["Asíntotas $x=2$ y $x=-2$", "El límite es infinito en los dos."],
      ["Huecos en $x=2$ y $x=-2$", "No se cancela nada."],
      ["Solo la asíntota en $x=2$", "También $-2$."]]
  ]);
  P("u2-as-2", T.asi, "Hallar la asíntota horizontal de $f(x)=\\dfrac{5x^2+1}{x^2-3}$", "recta", [
    ["¿Qué calculás?",
      ["$" + L + "_{x\\to\\pm\\infty}f(x)$", "La horizontal sale de límites al infinito."],
      ["Ceros del denominador", "Eso da verticales."],
      ["$f(0)$", "No."]],
    ["¿Resultado?",
      ["$y=5$", "Grados iguales: $\\tfrac51$."],
      ["$y=0$", "No."],
      ["$y=-3$", "Es el cociente de coeficientes principales, $\\tfrac51$: el $-3$ es el término de abajo."]]
  ]);
  P("u2-as-3", T.asi, "¿Tiene asíntota oblicua $f(x)=\\dfrac{x^2+1}{x}$?", "recta", [
    ["¿Qué te dice la diferencia de grados?",
      ["Arriba tiene un grado más: hay oblicua", "Grado $2$ sobre grado $1$."],
      ["Hay horizontal, porque arriba es mayor", "Daría infinito."],
      ["No tiene ninguna, ni horizontal ni oblicua", "Tiene oblicua."]],
    ["$f(x)=x+\\dfrac1x$. ¿Oblicua?",
      ["$y=x$", "El resto $\\tfrac1x\\to0$."],
      ["$y=x+1$", "No hay $+1$."],
      ["$y=1$", "No."]]
  ]);
  P("u2-as-4", T.asi, "Hallar las asíntotas horizontales de $f(x)=e^x+2$", "recta", [
    ["¿Qué límites calculás?",
      ["En $+\\infty$ y en $-\\infty$, por separado", "Puede haber de un solo lado."],
      ["Solo en $+\\infty$, el lado que importa", "Te perdés el otro lado."],
      ["En $x=0$, donde la función cambia", "Eso da un valor de la función, no una asíntota horizontal."]],
    ["En $-\\infty$ da $2$, en $+\\infty$ da $\\infty$. ¿Resultado?",
      ["$y=2$, solo hacia $-\\infty$", "De un solo lado."],
      ["No tiene", "Hacia la izquierda tiene."],
      ["$y=2$ de los dos lados", "Hacia la derecha crece."]]
  ]);
  P("u2-as-5", T.asi, "¿$x=1$ es asíntota vertical de $f(x)=\\dfrac{x^2-1}{x-1}$?", "conclusion", [
    ["¿Qué hacés?",
      ["Calcular el límite en $x=1$ y decidir", "Si da finito, es un hueco."],
      ["Decir que sí, porque anula abajo", "Hay que confirmar con el límite."],
      ["Comparar grados de arriba y abajo", "Eso es para la horizontal."]],
    ["El límite da $2$. ¿Conclusión?",
      ["No: es solo un hueco en $(1,2)$", "Límite finito."],
      ["Sí: el denominador se anula en $1$", "Una asíntota exige límite infinito: acá el límite es $2$."],
      ["Es horizontal: $y=2$, por el límite", "Horizontal se mira en $\\pm\\infty$; acá $x$ tiende a $1$."]]
  ]);

  P("u2-pa-1", T.par, "Hallar $k$ para que $f(x)=\\begin{cases}x^2+k & x<1\\\\ 4x & x\\ge1\\end{cases}$ sea continua", "parametros", [
    ["¿Qué planteás?",
      ["Igualar los laterales en $x=1$", "Así empalman."],
      ["Derivar los dos tramos e igualar", "Eso sería derivabilidad."],
      ["Imponer que $f(0)=0$ en el origen", "El origen no es el punto de unión: se evalúa en $x=1$."]],
    ["$1+k=4$. ¿$k$?",
      ["$k=3$", "Con $k=3$ los dos dan $4$."],
      ["$k=4$", "Falta restar $1$."],
      ["$k=5$", "Es $4-1$."]]
  ]);
  P("u2-pa-2", T.par, "$f(x)=\\dfrac{x^2-16}{x-4}$ si $x\\ne4$ y $f(4)=b$. Hallar $b$ para que sea continua", "parametros", [
    ["¿Qué tiene que valer $b$?",
      ["El límite en $4$", "Para que $f(4)$ coincida con el límite."],
      ["$0$", "No."],
      ["El cociente de coeficientes principales", "Esa regla es para $x\\to\\infty$."]],
    ["¿$b$?",
      ["$8$", "$" + L + "_{x\\to4}(x+4)=8$."],
      ["$1$", "Ese sería el atajo equivocado."],
      ["$4$", "No."]]
  ]);
  P("u2-pa-3", T.par, "Hallar $a$ para que $f(x)=\\begin{cases}ax-1 & x<2\\\\ x^2 & x\\ge2\\end{cases}$ sea continua", "parametros", [
    ["¿Laterales en $2$?",
      ["Izquierda $2a-1$, derecha $4$", "Cada tramo en $x=2$."],
      ["Izquierda $a-1$, derecha $4$", "Se reemplaza $x=2$: queda $2a-1$."],
      ["Izquierda $2a-1$, derecha $2$", "$2^2=4$."]],
    ["¿$a$?",
      ["$a=\\tfrac52$", "$2a-1=4$."],
      ["$a=2$", "No."],
      ["$a=\\tfrac32$", "No."]]
  ]);
  P("u2-pa-4", T.par, "$f(x)=\\dfrac{3x-6}{x-a}$ tiene discontinuidad evitable en $x=a$. Hallar $a$", "parametros", [
    ["¿Qué tiene que pasar para que sea evitable?",
      ["Que $a$ anule también el numerador", "Así se cancela el factor."],
      ["Que $a=0$ para simplificar la fracción", "No hay motivo para que sea $0$: $a$ es el valor que anula el denominador."],
      ["Que el numerador no se anule", "Eso daría asíntota."]],
    ["¿$a$?",
      ["$a=2$", "$3\\cdot2-6=0$."],
      ["$a=3$", "$9-6\\ne0$."],
      ["$a=6$", "$18-6\\ne0$."]]
  ]);
  P("u2-pa-5", T.par, "Hallar $a$ y $b$ para que $f$ sea continua: $f(x)=\\begin{cases}x+a & x<0\\\\ 2 & x=0\\\\ bx^2+2 & x>0\\end{cases}$", "parametros", [
    ["¿Qué condiciones salen en $x=0$?",
      ["Izquierda: $a=2$; derecha: cualquier $b$ sirve", "Los dos laterales tienen que dar $f(0)=2$."],
      ["Izquierda: $a=0$. Derecha: $b=2$ para empalmar", "El lateral izquierdo es $a$ y tiene que valer $2$."],
      ["Izquierda: $a=2$. Derecha: $b=0$ para empalmar", "La derecha da $2$ con cualquier $b$: no fija nada."]],
    ["¿Conclusión?",
      ["$a=2$ y $b$ cualquier real", "$b$ no afecta el valor en $0$."],
      ["$a=2$ y $b=0$ solamente", "Cualquier $b$ sirve."],
      ["No tiene solución en los reales", "Sí tiene."]]
  ]);
})(typeof window !== "undefined" ? window : globalThis);
