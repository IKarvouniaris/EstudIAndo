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
      ["Calculando los dos laterales por separado", "Cada lado usa su fórmula."],
      ["Evaluando $f(2)$", "El límite no depende del valor en el punto."],
      ["Usando solo la fórmula de $x\\ge2$", "Faltaría el lado izquierdo."]],
    ["Izquierda: $3$. Derecha: $3$. ¿Conclusión?",
      ["Existe y vale $3$", "Los laterales coinciden."],
      ["No existe porque es por tramos", "Ser por tramos no impide que exista."],
      ["Vale $6$", "No se suman los laterales."]]
  ]);
  P("u2-co-2", T.con, "Calcular $" + L + "_{x\\to0}\\dfrac{|x|}{x}$", "num", [
    ["¿Qué hacés con el valor absoluto?",
      ["Separar en $x\\to0^+$ y $x\\to0^-$", "$|x|$ cambia de fórmula en $0$."],
      ["Simplificar a $1$", "Solo vale para $x>0$."],
      ["Sustituir $x=0$", "Da $\\tfrac00$."]],
    ["Derecha: $1$. Izquierda: $-1$. ¿Conclusión?",
      ["El límite no existe", "Los laterales son distintos."],
      ["Vale $0$, el promedio", "Los laterales no se promedian."],
      ["Vale $1$", "Ese es solo el lateral derecho."]]
  ]);
  P("u2-co-3", T.con, "Si $f(3)=7$ pero $" + L + "_{x\\to3}f(x)=5$, ¿cuál es el límite?", "num", [
    ["¿Qué importa para el límite?",
      ["Lo que pasa cerca de $3$, no en $3$", "El límite describe el acercamiento."],
      ["El valor $f(3)$", "Puede ser distinto del límite."],
      ["El promedio de los dos", "No se promedia."]],
    ["¿Respuesta?",
      ["$5$", "Es el dato del límite."],
      ["$7$", "Ese es el valor de la función."],
      ["No existe", "Existe: es $5$. Lo que falla es la continuidad."]]
  ]);
  P("u2-co-4", T.con, "Calcular $" + L + "_{x\\to1^+}\\dfrac{2}{x-1}$", "num", [
    ["Sustituyendo da $\\tfrac{2}{0}$. ¿Qué indica?",
      ["Un límite infinito: falta ver el signo", "Número sobre algo que tiende a $0$."],
      ["Indeterminación", "Indeterminación es $\\tfrac00$."],
      ["Que vale $0$", "Un número dividido por algo chico es grande."]],
    ["Para $x$ un poco mayor que $1$, $x-1>0$. ¿Resultado?",
      ["$+\\infty$", "$\\tfrac{2}{0^+}$."],
      ["$-\\infty$", "El denominador es positivo."],
      ["$2$", "No corresponde."]]
  ]);
  P("u2-co-5", T.con, "Un límite te dio $x+3$ como resultado final. ¿Está terminado?", "conclusion", [
    ["¿Qué tipo de respuesta lleva un límite?",
      ["Un número, $\\pm\\infty$ o \"no existe\"", "Nunca algo con $x$."],
      ["Una función de $x$", "Eso es una derivada o una simplificación."],
      ["Un intervalo", "Eso es un dominio o un conjunto."]],
    ["¿Qué falta?",
      ["Sustituir el valor al que tiende $x$", "Simplificar es el paso previo."],
      ["Nada", "Si quedó una $x$, no terminaste."],
      ["Derivar", "No corresponde."]]
  ]);

  P("u2-su-1", T.sus, "Calcular $" + L + "_{x\\to3}(x^2-2x+1)$", "num", [
    ["¿Método?",
      ["Sustitución directa", "Polinomio: continuo en todo $\\mathbb{R}$."],
      ["Factorizar", "Solo si la sustitución da indeterminación."],
      ["L'Hôpital", "No hay cociente indeterminado."]],
    ["¿Resultado?",
      ["$4$", "$9-6+1$."],
      ["$16$", "No corresponde."],
      ["$(x-1)^2$", "Falta sustituir."]]
  ]);
  P("u2-su-2", T.sus, "Calcular $" + L + "_{x\\to2}\\dfrac{x+4}{x-1}$", "num", [
    ["¿El denominador se anula en $2$?",
      ["No: vale $1$, se sustituye directo", "No hay indeterminación."],
      ["Sí", "$2-1=1$."],
      ["Hay que factorizar igual", "No hace falta."]],
    ["¿Resultado?",
      ["$6$", "$\\tfrac{6}{1}$."],
      ["$\\tfrac{4}{-1}$", "Se sustituye $x=2$."],
      ["No existe", "Existe."]]
  ]);
  P("u2-su-3", T.sus, "Calcular $" + L + "_{x\\to0}(e^x+\\cos x)$", "num", [
    ["¿Método?",
      ["Sustitución: las dos son continuas", "Exponencial y coseno son continuas."],
      ["L'Hôpital", "No es un cociente indeterminado."],
      ["Límites notables", "No hace falta."]],
    ["¿Resultado?",
      ["$2$", "$1+1$."],
      ["$1$", "$\\cos0=1$, no $0$."],
      ["$0$", "$e^0=1$."]]
  ]);
  P("u2-su-4", T.sus, "Calcular $" + L + "_{x\\to4}\\sqrt{2x+1}$", "num", [
    ["¿Se puede sustituir?",
      ["Sí: $2\\cdot4+1=9>0$, la raíz es continua ahí", "Está dentro del dominio."],
      ["No: hay una raíz", "Las raíces son continuas en su dominio."],
      ["Hay que racionalizar", "No hay indeterminación."]],
    ["¿Resultado?",
      ["$3$", "$\\sqrt9$."],
      ["$9$", "Falta la raíz."],
      ["$\\sqrt8+1$", "La raíz abarca todo $2x+1$."]]
  ]);
  P("u2-su-5", T.sus, "Calcular $" + L + "_{x\\to-1}\\dfrac{3}{x+1}$", "num", [
    ["Sustituyendo da $\\tfrac{3}{0}$. ¿Qué tipo de resultado?",
      ["Infinito: hay que mirar cada lado", "No es $\\tfrac00$."],
      ["Indeterminación, a factorizar", "El numerador no se anula."],
      ["$0$", "No."]],
    ["Por derecha $+\\infty$, por izquierda $-\\infty$. ¿Conclusión?",
      ["El límite no existe (hay asíntota vertical $x=-1$)", "Los laterales son distintos."],
      ["$+\\infty$", "Solo por derecha."],
      ["$0$", "No."]]
  ]);

  P("u2-cc-1", T.cc, "Calcular $" + L + "_{x\\to5}\\dfrac{x^2-25}{x-5}$", "num", [
    ["Sustituyendo da $\\tfrac00$. ¿Qué hacés?",
      ["Factorizar para cancelar $(x-5)$", "$\\tfrac00$ indica un factor común."],
      ["Responder $0$", "Arriba y abajo se anulan: es indeterminado."],
      ["Responder que no existe", "Hay que seguir trabajando."]],
    ["¿Qué factorización?",
      ["Diferencia de cuadrados: $(x-5)(x+5)$", "$x^2-5^2$."],
      ["Factor común $x$", "El $25$ no tiene $x$."],
      ["Resolvente del denominador", "El denominador ya es lineal."]],
    ["Cancelaste. ¿Y ahora?",
      ["Sustituir en $x+5$: da $10$", "El límite es un número."],
      ["Responder $x+5$", "Falta sustituir."],
      ["Volver a factorizar", "Ya no hay indeterminación."]]
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
      ["$x^2$", "El último término es $x$."],
      ["Ninguno", "Los tres términos tienen $x$."]],
    ["¿Y después?",
      ["Sustituir $x=0$ en $x^2-3x+1$: da $1$", "Un número."],
      ["Buscar las raíces de $x^2-3x+1$", "Eso sería otra pregunta (ceros), no el límite."],
      ["Responder $x^2-3x+1$", "Falta sustituir."]]
  ]);
  P("u2-cc-4", T.cc, "Calcular $" + L + "_{x\\to1}\\dfrac{x^3-1}{x-1}$", "num", [
    ["¿Cómo factorizás $x^3-1$?",
      ["Ruffini con $1$: $(x-1)(x^2+x+1)$", "$1$ es raíz."],
      ["$(x-1)^3$", "$(x-1)^3$ tiene más términos."],
      ["Diferencia de cuadrados", "Es una diferencia de cubos."]],
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
      ["$1$", "Ese es el atajo equivocado."],
      ["$\\tfrac32$", "No corresponde."]]
  ]);

  P("u2-ra-1", T.rai, "Calcular $" + L + "_{x\\to0}\\dfrac{\\sqrt{x+4}-2}{x}$", "num", [
    ["Da $\\tfrac00$ con una raíz. ¿Qué hacés?",
      ["Multiplicar por el conjugado $\\sqrt{x+4}+2$", "Así aparece una $x$ arriba para cancelar."],
      ["Factorizar $x$", "No hay $x$ común a la vista."],
      ["Elevar al cuadrado", "Cambia la expresión."]],
    ["¿Qué queda y cuánto da?",
      ["$\\dfrac{1}{\\sqrt{x+4}+2}\\to\\tfrac14$", "$(x+4)-4=x$ se cancela."],
      ["$\\sqrt{x+4}+2\\to4$", "El conjugado queda abajo."],
      ["$\\tfrac12$", "$\\sqrt4+2=4$."]]
  ]);
  P("u2-ra-2", T.rai, "Calcular $" + L + "_{x\\to0}\\dfrac{\\sin(5x)}{x}$", "num", [
    ["¿Qué reconocés?",
      ["El notable $\\dfrac{\\sin u}{u}\\to1$, ajustando a $u=5x$", "$5\\cdot\\dfrac{\\sin5x}{5x}$."],
      ["Que vale $1$", "Solo si arriba y abajo tienen lo mismo."],
      ["Que vale $0$", "$\\sin0=0$ pero abajo también."]],
    ["¿Resultado?",
      ["$5$", "$5\\cdot1$."],
      ["$1$", "Falta el ajuste."],
      ["$\\tfrac15$", "Al revés."]]
  ]);
  P("u2-ra-3", T.rai, "Calcular $" + L + "_{x\\to9}\\dfrac{x-9}{\\sqrt{x}-3}$", "num", [
    ["¿Qué hacés?",
      ["Conjugado $\\sqrt x+3$, o ver $x-9=(\\sqrt x-3)(\\sqrt x+3)$", "Así se cancela."],
      ["Responder $\\tfrac00$", "Hay que seguir."],
      ["Comparar grados", "No es al infinito."]],
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
      ["$\\tfrac13$", "$\\tfrac13\\cdot\\dfrac{e^x-1}{x}$."],
      ["$3$", "El $3$ está abajo."],
      ["$1$", "Falta el $\\tfrac13$."]]
  ]);
  P("u2-ra-5", T.rai, "Calcular $" + L + "_{x\\to\\infty}\\big(\\sqrt{x^2+4x}-x\\big)$", "num", [
    ["Es $\\infty-\\infty$. ¿Qué hacés?",
      ["Multiplicar y dividir por el conjugado $\\sqrt{x^2+4x}+x$", "Pasa a un cociente."],
      ["Responder $0$", "$\\infty-\\infty$ es indeterminado."],
      ["Responder $\\infty$", "También es indeterminado."]],
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
      ["Grado de arriba mayor: da infinito, falta el signo", "Hay que mirar el signo."],
      ["Da $0$", "Arriba es mayor."],
      ["Da $1$", "Grados distintos."]],
    ["Con $x\\to-\\infty$: ¿signo?",
      ["$-\\infty$", "$x^3<0$ y $x^2+1>0$."],
      ["$+\\infty$", "$x^3$ es negativo para $x$ negativo."],
      ["No existe", "Va a $-\\infty$."]]
  ]);
  P("u2-in-4", T.inf, "Calcular $" + L + "_{x\\to\\infty}e^{-x}$", "num", [
    ["¿Cómo pensás $e^{-x}$?",
      ["$\\dfrac{1}{e^x}$: abajo crece sin límite", "Reescribirlo ayuda."],
      ["Como $-e^x$", "$e^{-x}\\ne-e^x$."],
      ["Comparar grados", "No es un cociente de polinomios."]],
    ["¿Resultado?",
      ["$0$", "$\\tfrac{1}{\\infty}$."],
      ["$-\\infty$", "Siempre es positiva."],
      ["$1$", "No."]]
  ]);
  P("u2-in-5", T.inf, "Calcular $" + L + "_{x\\to\\infty}\\dfrac{3x-2}{\\sqrt{x^2+1}}$", "num", [
    ["¿Qué potencia domina abajo?",
      ["$\\sqrt{x^2}=x$: grado efectivo $1$", "Se compara como si fuera $x$."],
      ["$x^2$: grado $2$", "La raíz baja el grado."],
      ["Ninguna", "Hay una que domina."]],
    ["¿Resultado?",
      ["$3$", "$\\tfrac{3x}{x}$."],
      ["$0$", "Mismo grado."],
      ["$\\infty$", "Mismo grado."]]
  ]);

  P("u2-lh-1", T.lho, "Calcular $" + L + "_{x\\to0}\\dfrac{\\sin x}{x}$ con L'Hôpital", "num", [
    ["¿Se puede aplicar?",
      ["Sí: da $\\tfrac00$", "Condición para usarla."],
      ["No, porque hay seno", "Aplica a cualquier función."],
      ["Siempre se puede", "Solo con $\\tfrac00$ o $\\tfrac\\infty\\infty$."]],
    ["¿Cómo se deriva?",
      ["Numerador y denominador por separado: $\\dfrac{\\cos x}{1}$", "No es la regla del cociente."],
      ["Con la regla del cociente", "L'Hôpital deriva cada uno por separado."],
      ["Solo el numerador", "Los dos."]],
    ["¿Resultado?",
      ["$1$", "$\\cos0$."],
      ["$0$", "$\\cos0=1$."],
      ["No existe", "Existe."]]
  ]);
  P("u2-lh-2", T.lho, "¿Se puede usar L'Hôpital en $" + L + "_{x\\to1}\\dfrac{x+1}{x-2}$?", "conclusion", [
    ["¿Qué da al sustituir?",
      ["$\\tfrac{2}{-1}=-2$", "No es indeterminado."],
      ["$\\tfrac00$", "Arriba da $2$."],
      ["$\\tfrac\\infty\\infty$", "No."]],
    ["¿Conclusión?",
      ["No hace falta ni corresponde: el límite es $-2$", "Si no es indeterminado, L'Hôpital da cualquier cosa."],
      ["Sí: daría $\\tfrac11=1$", "Aplicarla sin indeterminación da un resultado falso."],
      ["No existe", "Existe: $-2$."]]
  ]);
  P("u2-lh-3", T.lho, "Calcular $" + L + "_{x\\to\\infty}\\dfrac{x}{e^x}$", "num", [
    ["¿Qué indeterminación hay?",
      ["$\\tfrac\\infty\\infty$", "Se puede aplicar L'Hôpital."],
      ["$\\tfrac00$", "No."],
      ["Ninguna", "Hay."]],
    ["Derivando: $\\dfrac{1}{e^x}$. ¿Límite?",
      ["$0$", "La exponencial crece mucho más rápido."],
      ["$1$", "No."],
      ["$\\infty$", "No."]]
  ]);
  P("u2-lh-4", T.lho, "Calcular $" + L + "_{x\\to2}\\dfrac{x^2-4}{x-2}$ con L'Hôpital", "num", [
    ["Derivás arriba y abajo. ¿Qué queda?",
      ["$\\dfrac{2x}{1}$", "Cada uno por separado."],
      ["$\\dfrac{2x(x-2)-(x^2-4)}{(x-2)^2}$", "Eso es la regla del cociente."],
      ["$\\dfrac{2x}{2}$", "La derivada de $x-2$ es $1$."]],
    ["¿Resultado?",
      ["$4$", "$2\\cdot2$; coincide con factorizar."],
      ["$2$", "No."],
      ["$0$", "No."]]
  ]);
  P("u2-lh-5", T.lho, "Calcular $" + L + "_{x\\to0}\\dfrac{e^x-1-x}{x^2}$", "num", [
    ["Primera derivada: $\\dfrac{e^x-1}{2x}$. ¿Qué chequeás?",
      ["Que sigue siendo $\\tfrac00$: se aplica otra vez", "Cada vez hay que volver a chequear."],
      ["Nada, se sustituye", "Daría $\\tfrac00$."],
      ["Que ya da $\\tfrac12$", "Todavía es indeterminado."]],
    ["Segunda: $\\dfrac{e^x}{2}$. ¿Resultado?",
      ["$\\tfrac12$", "$\\tfrac{e^0}{2}$."],
      ["$1$", "Falta el $2$."],
      ["$0$", "No."]]
  ]);

  P("u2-cn-1", T.cnt, "Clasificar la discontinuidad de $f(x)=\\dfrac{x^2-4}{x-2}$ en $x=2$", "conclusion", [
    ["¿Qué calculás?",
      ["El límite en $2$ (factorizando)", "Si existe y es finito, es evitable."],
      ["Solo $f(2)$", "No alcanza para clasificar."],
      ["La derivada", "No corresponde."]],
    ["El límite es $4$ y $f(2)$ no existe. ¿Tipo?",
      ["Evitable", "El límite existe."],
      ["Salto finito", "Los laterales coinciden."],
      ["Salto infinito", "No hay asíntota."]]
  ]);
  P("u2-cn-2", T.cnt, "Clasificar la discontinuidad de $f(x)=\\dfrac{1}{x-3}$ en $x=3$", "conclusion", [
    ["¿Qué pasa con los laterales?",
      ["Son infinitos", "Número sobre algo que tiende a $0$."],
      ["Coinciden en un número", "No."],
      ["Son finitos y distintos", "No."]],
    ["¿Tipo?",
      ["Salto infinito (asíntota vertical)", "Al menos un lateral infinito."],
      ["Evitable", "No hay límite finito."],
      ["Salto finito", "Los laterales no son finitos."]]
  ]);
  P("u2-cn-3", T.cnt, "Clasificar en $x=1$: $f(x)=\\begin{cases}x+2 & x<1\\\\ 2x & x\\ge1\\end{cases}$", "conclusion", [
    ["¿Laterales?",
      ["Izquierda $3$, derecha $2$", "Cada tramo en $1$."],
      ["Los dos $3$", "El derecho usa $2x$."],
      ["Los dos $2$", "El izquierdo usa $x+2$."]],
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
      ["Sí, es continua", "Límite $=f(2)=5$."],
      ["No", "Los polinomios no tienen discontinuidades."],
      ["Depende", "No."]]
  ]);
  P("u2-cn-5", T.cnt, "¿Qué 3 condiciones hacen continua a $f$ en $x=a$?", "conclusion", [
    ["¿Cuáles son?",
      ["Existe $f(a)$, existe el límite y son iguales", "Las tres a la vez."],
      ["Solo que exista $f(a)$", "Falta el límite."],
      ["Solo que exista el límite", "Falta que coincida con $f(a)$."]],
    ["Si el límite existe pero $f(a)$ es distinto, ¿qué es?",
      ["Discontinuidad evitable", "Se arregla redefiniendo $f(a)$."],
      ["Salto", "Habría laterales distintos."],
      ["Continua", "Falla la tercera condición."]]
  ]);

  P("u2-as-1", T.asi, "Hallar las asíntotas verticales de $f(x)=\\dfrac{x+1}{x^2-4}$", "recta", [
    ["¿Candidatos?",
      ["$x=2$ y $x=-2$", "Anulan el denominador."],
      ["$x=-1$", "Anula el numerador."],
      ["$x=4$", "No."]],
    ["El numerador no se anula en $\\pm2$. ¿Conclusión?",
      ["Asíntotas $x=2$ y $x=-2$", "El límite es infinito en los dos."],
      ["Huecos", "No se cancela nada."],
      ["Solo $x=2$", "También $-2$."]]
  ]);
  P("u2-as-2", T.asi, "Hallar la asíntota horizontal de $f(x)=\\dfrac{5x^2+1}{x^2-3}$", "recta", [
    ["¿Qué calculás?",
      ["$" + L + "_{x\\to\\pm\\infty}f(x)$", "La horizontal sale de límites al infinito."],
      ["Ceros del denominador", "Eso da verticales."],
      ["$f(0)$", "No."]],
    ["¿Resultado?",
      ["$y=5$", "Grados iguales: $\\tfrac51$."],
      ["$y=0$", "No."],
      ["$y=-\\tfrac13$", "No."]]
  ]);
  P("u2-as-3", T.asi, "¿Tiene asíntota oblicua $f(x)=\\dfrac{x^2+1}{x}$?", "recta", [
    ["¿Qué te dice la diferencia de grados?",
      ["Arriba tiene un grado más: hay oblicua", "Grado $2$ sobre grado $1$."],
      ["Hay horizontal", "Daría infinito."],
      ["No tiene ninguna", "Tiene oblicua."]],
    ["$f(x)=x+\\dfrac1x$. ¿Oblicua?",
      ["$y=x$", "El resto $\\tfrac1x\\to0$."],
      ["$y=x+1$", "No hay $+1$."],
      ["$y=1$", "No."]]
  ]);
  P("u2-as-4", T.asi, "Hallar las asíntotas horizontales de $f(x)=e^x+2$", "recta", [
    ["¿Qué límites calculás?",
      ["En $+\\infty$ y en $-\\infty$ por separado", "Puede haber de un solo lado."],
      ["Solo en $+\\infty$", "Te perdés el otro lado."],
      ["En $x=0$", "No."]],
    ["En $-\\infty$ da $2$, en $+\\infty$ da $\\infty$. ¿Resultado?",
      ["$y=2$, solo hacia $-\\infty$", "De un solo lado."],
      ["No tiene", "Hacia la izquierda tiene."],
      ["$y=2$ de los dos lados", "Hacia la derecha crece."]]
  ]);
  P("u2-as-5", T.asi, "¿$x=1$ es asíntota vertical de $f(x)=\\dfrac{x^2-1}{x-1}$?", "conclusion", [
    ["¿Qué hacés?",
      ["Calcular el límite en $1$", "Si da finito, es un hueco."],
      ["Decir que sí", "Hay que confirmar con el límite."],
      ["Comparar grados", "Eso es para la horizontal."]],
    ["El límite da $2$. ¿Conclusión?",
      ["No: es un hueco en $(1,2)$", "Límite finito."],
      ["Sí", "Una asíntota exige límite infinito."],
      ["Es horizontal $y=2$", "No."]]
  ]);

  P("u2-pa-1", T.par, "Hallar $k$ para que $f(x)=\\begin{cases}x^2+k & x<1\\\\ 4x & x\\ge1\\end{cases}$ sea continua", "parametros", [
    ["¿Qué planteás?",
      ["Igualar los laterales en $x=1$", "Así empalman."],
      ["Derivar", "Eso sería derivabilidad."],
      ["$f(0)=0$", "No corresponde."]],
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
      ["Izquierda $a-1$", "Se reemplaza $x=2$."],
      ["Derecha $2$", "$2^2=4$."]],
    ["¿$a$?",
      ["$a=\\tfrac52$", "$2a-1=4$."],
      ["$a=2$", "No."],
      ["$a=\\tfrac32$", "No."]]
  ]);
  P("u2-pa-4", T.par, "$f(x)=\\dfrac{3x-6}{x-a}$ tiene discontinuidad evitable en $x=a$. Hallar $a$", "parametros", [
    ["¿Qué tiene que pasar para que sea evitable?",
      ["Que $a$ anule también el numerador", "Así se cancela el factor."],
      ["Que $a=0$", "No."],
      ["Que el numerador no se anule", "Eso daría asíntota."]],
    ["¿$a$?",
      ["$a=2$", "$3\\cdot2-6=0$."],
      ["$a=3$", "$9-6\\ne0$."],
      ["$a=6$", "$18-6\\ne0$."]]
  ]);
  P("u2-pa-5", T.par, "Hallar $a$ y $b$ para que $f$ sea continua: $f(x)=\\begin{cases}x+a & x<0\\\\ 2 & x=0\\\\ bx^2+2 & x>0\\end{cases}$", "parametros", [
    ["¿Qué condiciones salen en $x=0$?",
      ["Izquierda: $a=2$. Derecha: $2=2$ para cualquier $b$", "Los dos laterales tienen que dar $f(0)=2$."],
      ["$a=b$", "No."],
      ["$a=0$", "El lateral izquierdo es $a$."]],
    ["¿Conclusión?",
      ["$a=2$ y $b$ cualquier real", "$b$ no afecta el valor en $0$."],
      ["$a=2$, $b=0$", "Cualquier $b$ sirve."],
      ["No tiene solución", "Sí tiene."]]
  ]);
})(typeof window !== "undefined" ? window : globalThis);
