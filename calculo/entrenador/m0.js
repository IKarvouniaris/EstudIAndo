// Entrenador de decisiones — Módulo 0. Cada paso: [pregunta, [correcta, por qué], [incorrecta, por qué], ...].
(function (root) {
  const P = root.DuoP;
  const T = {
    fc: "Factor común",
    dc: "Diferencia de cuadrados",
    cb: "Cuadrado de binomio y trinomio cuadrado perfecto",
    tc: "Trinomio cuadrático (con a=1 y con a≠1)",
    ra: "Racionalización",
    sf: "Simplificación de fracciones algebraicas",
    po: "Potencias y raíces (exponentes negativos y fraccionarios)",
    in: "Inecuaciones y tabla de signos",
    ru: "División de polinomios y Ruffini (cúbicas)"
  };
  P("m0-fc-1", T.fc, "Factorizar: $12x^4-18x^2$", "factorizada", [
    ["¿Qué mirás primero?",
      ["Si todos los términos comparten un factor (número y potencia de $x$)", "Factor común siempre va primero: acá $6$ y $x^2$ están en los dos términos."],
      ["Buscar las raíces con la resolvente", "No es un trinomio cuadrático: primero se saca lo que es común."],
      ["Desarrollar como cuadrado de binomio", "No hay ningún binomio al cuadrado: te piden lo contrario, un producto."]],
    ["Sacaste $6x^2(2x^2-3)$. ¿Terminaste?",
      ["Sí: $2x^2-3$ no tiene factor común ni es diferencia de cuadrados con enteros", "$3$ no es un cuadrado perfecto: con coeficientes enteros no se factoriza más."],
      ["No: falta sacar $x^2$ otra vez", "Ya sacaste la menor potencia; adentro no queda $x^2$ en todos los términos."],
      ["No: hay que distribuir y dejarlo como suma", "Distribuir sirve para verificar, pero la respuesta es el producto."]]
  ]);
  P("m0-fc-2", T.fc, "Factorizar: $x(x-3)+5(x-3)$", "factorizada", [
    ["¿Qué tienen en común los dos términos?",
      ["El paréntesis $(x-3)$", "Un paréntesis entero puede ser el factor común: pensalo como si fuera una sola letra."],
      ["La $x$", "La $x$ suelta solo está en el primer término."],
      ["Nada: hay que distribuir todo primero", "Funciona, pero es un rodeo: el factor común ya está a la vista."]],
    ["¿Qué queda al sacar $(x-3)$?",
      ["$(x-3)(x+5)$", "De cada término sale $(x-3)$ y quedan $x$ y $+5$, que se suman."],
      ["$(x-3)\\cdot5x$", "Lo que queda de cada término se suma, no se multiplica."],
      ["$(x-3)^2+5$", "Al distribuir no da la expresión original."]]
  ]);
  P("m0-fc-3", T.fc, "Factorizar: $ax+2a+3x+6$", "factorizada", [
    ["Son 4 términos sin un factor común a todos. ¿Qué probás?",
      ["Agrupar de a dos y sacar factor común en cada grupo", "4 términos sin factor común total: es la señal del factoreo por agrupación."],
      ["La resolvente", "No es un trinomio cuadrático en una sola variable."],
      ["Diferencia de cuadrados", "No es una resta de dos cuadrados."]],
    ["Agrupaste: $a(x+2)+3(x+2)$. ¿Y ahora?",
      ["Sacar $(x+2)$: queda $(x+2)(a+3)$", "El paréntesis repetido es el nuevo factor común."],
      ["Ya está factorizado", "Todavía es una suma de dos términos: falta el último paso."],
      ["Distribuir para volver a empezar", "Volverías a la expresión original."]]
  ]);
  P("m0-fc-4", T.fc, "Factorizar completamente: $5x^3-20x$", "factorizada", [
    ["¿Cuál es el primer movimiento?",
      ["Factor común $5x$", "Siempre primero lo común: $5x(x^2-4)$."],
      ["Diferencia de cuadrados directo", "$5x^3$ y $20x$ no son cuadrados perfectos."],
      ["Ruffini", "Funcionaría, pero es mucho más largo: hay un factor común a la vista."]],
    ["Quedó $5x(x^2-4)$. ¿Terminaste?",
      ["No: $x^2-4$ es diferencia de cuadrados", "$x^2-4=(x-2)(x+2)$. Completo: $5x(x-2)(x+2)$."],
      ["Sí", "Adentro quedó una diferencia de cuadrados sin factorizar: \"completamente\" pide seguir."],
      ["No: $x^2-4=(x-2)^2$", "$(x-2)^2=x^2-4x+4$, no da $x^2-4$."]]
  ]);
  P("m0-fc-5", T.fc, "Factorizar: $-6x^2+9x$", "factorizada", [
    ["¿Qué factor común sacás?",
      ["$-3x$ (o $3x$: los dos sirven)", "$3$ divide a $6$ y a $9$, y la $x$ está en los dos. Sacar el signo menos deja el primer término positivo."],
      ["Solo $x$", "Válido pero incompleto: el $3$ también es común."],
      ["$-6x$", "$6$ no divide a $9$: no es factor común."]],
    ["Sacaste $-3x$. ¿Qué queda adentro?",
      ["$(2x-3)$", "$-6x^2\\div(-3x)=2x$ y $9x\\div(-3x)=-3$."],
      ["$(2x+3)$", "Al dividir $9x$ por un negativo da $-3$, no $+3$."],
      ["$(-2x+3)$", "Eso queda si sacás $+3x$, no $-3x$."]]
  ]);

  P("m0-dc-1", T.dc, "Factorizar: $x^2-49$", "factorizada", [
    ["¿Qué caso de factoreo es?",
      ["Diferencia de cuadrados: $x^2$ menos $7^2$", "Una resta de dos cuadrados perfectos: $a^2-b^2=(a-b)(a+b)$."],
      ["Trinomio cuadrático", "Tiene dos términos, no tres."],
      ["Factor común", "$x^2$ y $49$ no comparten ningún factor."]],
    ["¿Cómo queda?",
      ["$(x-7)(x+7)$", "Con $a=x$ y $b=7$."],
      ["$(x-7)^2$", "$(x-7)^2=x^2-14x+49$: aparece un término del medio."],
      ["$(x-49)(x+1)$", "Al distribuir no da $x^2-49$."]]
  ]);
  P("m0-dc-2", T.dc, "Factorizar en los reales: $x^2+25$", "factorizada", [
    ["¿Sirve diferencia de cuadrados?",
      ["No: es una SUMA de cuadrados", "La identidad necesita una resta. $a^2+b^2$ no se factoriza en los reales."],
      ["Sí: $(x-5)(x+5)$", "Eso da $x^2-25$, no $x^2+25$."],
      ["Sí: $(x+5)^2$", "$(x+5)^2=x^2+10x+25$."]],
    ["¿Cuál es la respuesta?",
      ["No se factoriza en los reales (no tiene raíces reales)", "\"No se puede\" es una respuesta válida si la justificás: $x^2+25=0$ no tiene solución real."],
      ["$(x+5i)(x-5i)$, y listo", "Eso es en los complejos; la consigna pide los reales."],
      ["$x^2+25$ = $x(x+25)$", "Al distribuir da $x^2+25x$."]]
  ]);
  P("m0-dc-3", T.dc, "Factorizar completamente: $16x^4-1$", "factorizada", [
    ["Primer movimiento",
      ["Diferencia de cuadrados con $a=4x^2$, $b=1$", "$16x^4=(4x^2)^2$: queda $(4x^2-1)(4x^2+1)$."],
      ["Factor común", "No hay ningún factor común a los dos términos."],
      ["Ruffini con $x=1$", "$16-1\\ne0$: $1$ no es raíz."]],
    ["Tenés $(4x^2-1)(4x^2+1)$. ¿Y ahora?",
      ["Aplicar de nuevo: $4x^2-1=(2x-1)(2x+1)$; $4x^2+1$ queda", "Revisá paréntesis por paréntesis: el de la resta se vuelve a factorizar, la suma no."],
      ["Factorizar $4x^2+1$ como $(2x+1)^2$", "$(2x+1)^2=4x^2+4x+1$."],
      ["Ya terminó", "$4x^2-1$ sigue siendo una diferencia de cuadrados."]]
  ]);
  P("m0-dc-4", T.dc, "Factorizar: $3x^2-75$", "factorizada", [
    ["¿Qué hacés primero?",
      ["Sacar factor común $3$", "$3(x^2-25)$: lo de adentro queda limpio para la identidad."],
      ["Diferencia de cuadrados con $\\sqrt3\\,x$", "Se puede, pero quedan raíces: conviene sacar el $3$ primero."],
      ["Resolvente", "Funciona, pero es más largo: hay factor común."]],
    ["¿Resultado?",
      ["$3(x-5)(x+5)$", "$x^2-25=(x-5)(x+5)$."],
      ["$3(x-5)^2$", "Eso da $3x^2-30x+75$."],
      ["$(3x-5)(x+15)$", "Al distribuir no da la expresión original."]]
  ]);
  P("m0-dc-5", T.dc, "Simplificar: $\\dfrac{x^2-9}{x+3}$", "simplificada", [
    ["¿Qué hacés con el numerador?",
      ["Factorizarlo: $(x-3)(x+3)$", "Para cancelar, primero hay que tener productos."],
      ["Cancelar $x^2$ con $x$", "Son términos de una suma: solo se cancelan factores."],
      ["Dividir $9$ por $3$", "El $9$ no multiplica a todo el numerador."]],
    ["¿Cómo queda?",
      ["$x-3$, con $x\\ne-3$", "Se cancela $(x+3)$, pero $x=-3$ sigue fuera del dominio."],
      ["$x-3$ para todo $x$", "La expresión original no existe en $x=-3$: esa restricción no desaparece."],
      ["$x+3$", "El factor que se cancela es $(x+3)$; queda $(x-3)$."]]
  ]);

  P("m0-cb-1", T.cb, "Desarrollar: $(x-6)^2$", "polinomio", [
    ["¿Qué fórmula usás?",
      ["$(a-b)^2=a^2-2ab+b^2$", "El cuadrado de un binomio tiene 3 términos."],
      ["$a^2-b^2$", "Eso es $(a-b)(a+b)$, otra identidad."],
      ["$a^2+b^2$", "Falta el término del medio: el error más común."]],
    ["¿Resultado?",
      ["$x^2-12x+36$", "$2ab=2\\cdot x\\cdot6=12x$, con signo menos."],
      ["$x^2+36$", "Falta $-12x$."],
      ["$x^2-6x+36$", "El término del medio es $2ab$: falta el $2$."]]
  ]);
  P("m0-cb-2", T.cb, "Factorizar: $x^2+8x+16$", "factorizada", [
    ["¿Qué chequeás?",
      ["Si los extremos son cuadrados ($x^2$ y $4^2$) y el medio es $2\\cdot x\\cdot4$", "Así se reconoce un trinomio cuadrado perfecto."],
      ["Si hay factor común", "$x^2$, $8x$ y $16$ no tienen factor común."],
      ["Si es diferencia de cuadrados", "Tiene tres términos y son sumas."]],
    ["¿Resultado?",
      ["$(x+4)^2$", "El medio es positivo: binomio con suma."],
      ["$(x-4)^2$", "Daría $-8x$ en el medio."],
      ["$(x+4)(x-4)$", "Eso es $x^2-16$."]]
  ]);
  P("m0-cb-3", T.cb, "Resolver: $(x+1)^2=9$", "valores", [
    ["¿Conviene desarrollar el cuadrado?",
      ["No: sacar raíz a ambos lados, con $\\pm$", "$x+1=\\pm3$ es más corto y no perdés ninguna solución."],
      ["Sí, siempre hay que desarrollar", "Funciona, pero es más largo y da más lugar a errores de signo."],
      ["Sacar raíz sin el $\\pm$", "Perdés la solución negativa."]],
    ["¿Soluciones?",
      ["$x=2$ y $x=-4$", "$x+1=3$ o $x+1=-3$."],
      ["Solo $x=2$", "Falta la que sale de $x+1=-3$."],
      ["$x=\\pm3$", "Falta restar $1$."]]
  ]);
  P("m0-cb-4", T.cb, "Resolver: $-2(x-3)^2+8=0$", "valores", [
    ["¿Primer paso?",
      ["Aislar el cuadrado: $(x-3)^2=4$", "$-2(x-3)^2=-8$ y dividís por $-2$."],
      ["Meter el $-2$ adentro del cuadrado", "$-2(x-3)^2\\ne\\big(-2(x-3)\\big)^2$: el coeficiente de afuera no se eleva."],
      ["Sacar raíz de toda la expresión", "$\\sqrt{a+b}\\ne\\sqrt a+\\sqrt b$."]],
    ["¿Soluciones?",
      ["$x-3=\\pm2 \\Rightarrow x=1,\\ x=5$", "Dos soluciones, por el $\\pm$."],
      ["Solo $x=5$", "Falta $x-3=-2$."],
      ["No tiene: $(x-3)^2=-4$", "Error de signo: $-8\\div(-2)=+4$."]]
  ]);
  P("m0-cb-5", T.cb, "Si $9x^2-12x+4$ es un trinomio cuadrado perfecto, factorizarlo", "factorizada", [
    ["¿Lo es?",
      ["Sí: $(3x)^2$, $2^2$ y $2\\cdot3x\\cdot2=12x$", "Extremos cuadrados y medio igual a $2ab$."],
      ["No, porque el coeficiente principal no es $1$", "No hace falta que sea $1$: hace falta que sea un cuadrado."],
      ["No, porque el término del medio es negativo", "El signo solo decide si es $(a-b)^2$ o $(a+b)^2$."]],
    ["¿Resultado?",
      ["$(3x-2)^2$", "El medio negativo indica resta."],
      ["$(3x+2)^2$", "Daría $+12x$."],
      ["$(9x-4)^2$", "Se toman las raíces de los extremos: $3x$ y $2$."]]
  ]);

  P("m0-tc-1", T.tc, "Factorizar: $x^2+x-12$", "factorizada", [
    ["¿Qué método usás?",
      ["Dos números con producto $-12$ y suma $1$", "Con $a=1$ alcanza con el tanteo."],
      ["Trinomio cuadrado perfecto", "$-12$ no es un cuadrado."],
      ["Factor común", "No hay factor común a los tres términos."]],
    ["¿Resultado?",
      ["$(x+4)(x-3)$", "$4\\cdot(-3)=-12$ y $4-3=1$."],
      ["$(x-4)(x+3)$", "La suma daría $-1$."],
      ["$(x+6)(x-2)$", "La suma daría $4$."]]
  ]);
  P("m0-tc-2", T.tc, "Factorizar: $2x^2-7x+3$", "factorizada", [
    ["¿Qué método usás?",
      ["Resolvente (porque $a\\ne1$) y escribir $a(x-x_1)(x-x_2)$", "Con $a\\ne1$ el tanteo simple no alcanza."],
      ["Dos números con producto $3$ y suma $-7$", "Ese atajo es solo para $a=1$."],
      ["Factor común $2$", "$7$ y $3$ no son múltiplos de $2$."]],
    ["$\\Delta=25$: raíces $3$ y $\\tfrac12$. ¿Factorización?",
      ["$2(x-3)\\left(x-\\tfrac12\\right)=(x-3)(2x-1)$", "El coeficiente principal queda adelante."],
      ["$(x-3)\\left(x-\\tfrac12\\right)$", "Falta $a=2$: al distribuir da $x^2-\\tfrac72x+\\tfrac32$."],
      ["$2(x+3)\\left(x+\\tfrac12\\right)$", "Los factores son $(x-\\text{raíz})$."]]
  ]);
  P("m0-tc-3", T.tc, "Resolver: $x^2-6x+5=0$", "valores", [
    ["¿Cómo encarás?",
      ["Factorizar (o resolvente) y usar que un producto es $0$ si algún factor es $0$", "$(x-1)(x-5)=0$."],
      ["Despejar $x^2$ y sacar raíz", "Hay término en $x$: no se puede aislar $x^2$ solo."],
      ["Dividir todo por $x$", "Podés perder soluciones y queda $x$ en el denominador."]],
    ["¿Respuesta?",
      ["$x=1$ y $x=5$", "Te piden los valores, no la factorización."],
      ["$x=-1$ y $x=-5$", "De $(x-1)=0$ sale $x=1$: el signo se invierte."],
      ["$(x-1)(x-5)$", "Eso es la factorización; la pregunta pide valores de $x$."]]
  ]);
  P("m0-tc-4", T.tc, "Factorizar en los reales: $x^2+2x+7$", "factorizada", [
    ["¿Qué hacés?",
      ["Calcular el discriminante", "Te dice si hay raíces reales antes de buscarlas."],
      ["Probar enteros hasta que salga", "Si no hay raíces reales, nunca va a salir."],
      ["Tratarlo como cuadrado perfecto", "$7$ no es un cuadrado."]],
    ["$\\Delta=4-28=-24$. ¿Conclusión?",
      ["No se factoriza en $\\mathbb{R}$: no tiene raíces reales", "Es una respuesta válida y completa si mostrás el discriminante."],
      ["Sacar la $i$ y seguir", "Borrar la $i$ no es una operación matemática."],
      ["$(x+1)^2+6$ es la factorización", "Esa es la forma canónica: es una suma, no un producto."]]
  ]);
  P("m0-tc-5", T.tc, "Hallar las raíces de $3x^2+x-2$", "valores", [
    ["Planteo de la resolvente",
      ["$x=\\dfrac{-1\\pm\\sqrt{1+24}}{6}$", "$\\Delta=1-4\\cdot3\\cdot(-2)=25$ y se divide por $2a=6$."],
      ["$x=\\dfrac{-1\\pm\\sqrt{1-24}}{6}$", "$-4\\cdot3\\cdot(-2)=+24$."],
      ["$x=\\dfrac{-1\\pm\\sqrt{25}}{2}$", "Se divide por $2a$, no por $2$."]],
    ["¿Raíces?",
      ["$x=\\tfrac23$ y $x=-1$", "$\\dfrac{-1+5}{6}=\\tfrac23$ y $\\dfrac{-1-5}{6}=-1$."],
      ["$x=4$ y $x=-6$", "Falta dividir por $6$."],
      ["Solo $x=\\tfrac23$", "Con $\\Delta>0$ hay dos raíces."]]
  ]);

  P("m0-ra-1", T.ra, "Racionalizar: $\\dfrac{10}{\\sqrt5}$", "simplificada", [
    ["¿Por qué multiplicás arriba y abajo?",
      ["Por $\\sqrt5$", "Una raíz sola se elimina multiplicándola por sí misma."],
      ["Por el conjugado", "No hay binomio: el conjugado no hace falta."],
      ["Elevar al cuadrado numerador y denominador", "Cambia el valor de la fracción."]],
    ["¿Resultado?",
      ["$\\dfrac{10\\sqrt5}{5}=2\\sqrt5$", "Y se simplifica al final."],
      ["$\\dfrac{10\\sqrt5}{25}$", "$\\sqrt5\\cdot\\sqrt5=5$, no $25$."],
      ["$10\\sqrt5$", "Falta el denominador $5$."]]
  ]);
  P("m0-ra-2", T.ra, "Racionalizar: $\\dfrac{2}{\\sqrt3+1}$", "simplificada", [
    ["¿Por qué multiplicás?",
      ["Por el conjugado $\\sqrt3-1$", "Genera diferencia de cuadrados y la raíz desaparece."],
      ["Por $\\sqrt3$", "Abajo quedaría $3+\\sqrt3$: la raíz sigue."],
      ["Por $\\sqrt3+1$", "Abajo quedaría $4+2\\sqrt3$: empeora."]],
    ["¿Resultado?",
      ["$\\dfrac{2(\\sqrt3-1)}{3-1}=\\sqrt3-1$", "$(\\sqrt3)^2-1^2=2$."],
      ["$\\dfrac{2(\\sqrt3-1)}{4}$", "El denominador es $3-1=2$."],
      ["$2(\\sqrt3+1)$", "Se multiplica por el conjugado, que tiene el signo cambiado."]]
  ]);
  P("m0-ra-3", T.ra, "Calcular $\\displaystyle\\lim_{x\\to1}\\dfrac{\\sqrt{x}-1}{x-1}$", "num", [
    ["Al sustituir da $\\tfrac00$. ¿Qué hacés?",
      ["Multiplicar arriba y abajo por el conjugado $\\sqrt x+1$", "Así aparece el factor $(x-1)$ para cancelar."],
      ["Decir que $\\tfrac00=1$", "$\\tfrac00$ es una indeterminación, no un valor."],
      ["Decir que no existe", "La indeterminación pide seguir trabajando, no rendirse."]],
    ["¿Qué queda y cuánto da?",
      ["$\\dfrac{1}{\\sqrt x+1}\\to\\dfrac12$", "$(\\sqrt x)^2-1=x-1$ se cancela con el denominador."],
      ["$\\sqrt x+1\\to2$", "El conjugado queda en el denominador, no arriba."],
      ["$\\dfrac{1}{\\sqrt x-1}$", "Ese factor es el que se usó para la diferencia de cuadrados."]]
  ]);
  P("m0-ra-4", T.ra, "Simplificar para $x\\ge0,\\ x\\ne4$: $\\dfrac{x-4}{\\sqrt x-2}$", "simplificada", [
    ["¿Qué ves?",
      ["$x-4=(\\sqrt x-2)(\\sqrt x+2)$: es diferencia de cuadrados", "También sale multiplicando por el conjugado."],
      ["Que se cancelan las $x$", "La $x$ de abajo está dentro de una raíz y en una resta."],
      ["Que hay que elevar al cuadrado", "Eso cambia la expresión."]],
    ["¿Resultado?",
      ["$\\sqrt x+2$", "Se cancela $(\\sqrt x-2)$."],
      ["$\\sqrt x-2$", "Ese es el factor que se cancela."],
      ["$x+2$", "Queda la raíz: $\\sqrt x+2$."]]
  ]);
  P("m0-ra-5", T.ra, "Racionalizar: $\\dfrac{6}{\\sqrt[3]{2}}$", "simplificada", [
    ["¿Por qué multiplicás?",
      ["Por $\\sqrt[3]{2^2}=\\sqrt[3]4$, para completar un cubo", "$\\sqrt[3]2\\cdot\\sqrt[3]4=\\sqrt[3]8=2$."],
      ["Por $\\sqrt[3]2$", "$\\sqrt[3]2\\cdot\\sqrt[3]2=\\sqrt[3]4$: la raíz sigue."],
      ["Por $\\sqrt2$", "Raíz cuadrada y cúbica no se cancelan entre sí."]],
    ["¿Resultado?",
      ["$\\dfrac{6\\sqrt[3]4}{2}=3\\sqrt[3]4$", "Y se simplifica el $6$ con el $2$."],
      ["$6\\sqrt[3]4$", "Falta dividir por $2$."],
      ["$\\dfrac{6\\sqrt[3]4}{4}$", "El denominador es $\\sqrt[3]8=2$."]]
  ]);

  P("m0-sf-1", T.sf, "Simplificar: $\\dfrac{x^2-3x}{x^2-9}$", "simplificada", [
    ["¿Primer paso?",
      ["Factorizar numerador y denominador", "Solo se cancelan factores."],
      ["Cancelar los $x^2$", "Son términos de restas, no factores."],
      ["Cancelar el $3$ con el $9$", "Tampoco son factores de todo."]],
    ["$\\dfrac{x(x-3)}{(x-3)(x+3)}$. ¿Resultado?",
      ["$\\dfrac{x}{x+3}$, con $x\\ne\\pm3$", "Se cancela $(x-3)$ pero las restricciones del original quedan."],
      ["$\\dfrac{x}{x+3}$, con $x\\ne-3$", "$x=3$ también estaba excluido."],
      ["$\\dfrac13$", "Eso sería cancelar términos sueltos."]]
  ]);
  P("m0-sf-2", T.sf, "Simplificar: $\\dfrac{2x+4}{x^2+4x+4}$", "simplificada", [
    ["¿Cómo factorizás?",
      ["Factor común arriba y cuadrado perfecto abajo", "$2(x+2)$ sobre $(x+2)^2$."],
      ["Cancelar el $4$ con el $4$", "No son factores de todo."],
      ["Resolvente arriba", "Arriba es lineal: alcanza con factor común."]],
    ["¿Resultado?",
      ["$\\dfrac{2}{x+2}$, con $x\\ne-2$", "Se cancela un $(x+2)$."],
      ["$\\dfrac{2}{x+4}$", "Abajo queda $(x+2)$."],
      ["$2(x+2)$", "El cuadrado está en el denominador."]]
  ]);
  P("m0-sf-3", T.sf, "¿Es correcto escribir $\\dfrac{x+5}{x}=5$?", "conclusion", [
    ["¿Qué decís?",
      ["No: la $x$ no es factor de todo el numerador", "Solo se cancela lo que multiplica a toda la expresión."],
      ["Sí, se cancelan las $x$", "La $x$ de arriba está sumando con el $5$."],
      ["Sí, siempre que $x\\ne0$", "La restricción no arregla la cancelación inválida. Probá $x=1$: da $6$, no $5$."]],
    ["¿Cómo se puede reescribir de forma válida?",
      ["$1+\\dfrac5x$", "Separando la fracción término a término."],
      ["$x+5$", "No se puede eliminar el denominador."],
      ["$\\dfrac5x$", "Falta el $1$ que sale de $\\tfrac xx$."]]
  ]);
  P("m0-sf-4", T.sf, "Simplificar: $\\dfrac{x^3-x}{x^2+x}$", "simplificada", [
    ["¿Primer paso?",
      ["Factorizar: $x(x-1)(x+1)$ arriba y $x(x+1)$ abajo", "Factor común y diferencia de cuadrados."],
      ["Dividir término a término", "Con un denominador de dos términos no se puede separar así."],
      ["Cancelar una $x$ sin factorizar", "Hay que factorizar primero para saber qué se cancela."]],
    ["¿Resultado?",
      ["$x-1$, con $x\\ne0$ y $x\\ne-1$", "Se cancelan $x$ y $(x+1)$."],
      ["$x-1$ sin restricciones", "El original no existe en $0$ ni en $-1$."],
      ["$x^2-1$", "También se cancela el $(x+1)$."]]
  ]);
  P("m0-sf-5", T.sf, "Restar y simplificar: $\\dfrac{3}{x-1}-\\dfrac{3}{x+1}$", "simplificada", [
    ["¿Cómo restás?",
      ["Con denominador común $(x-1)(x+1)$", "Como con fracciones numéricas."],
      ["Restando numeradores y denominadores", "$\\tfrac ab-\\tfrac cd\\ne\\tfrac{a-c}{b-d}$."],
      ["Con denominador común $x$", "$x$ no es múltiplo de los dos denominadores."]],
    ["¿Resultado?",
      ["$\\dfrac{6}{(x-1)(x+1)}$", "$3(x+1)-3(x-1)=6$."],
      ["$\\dfrac{0}{2}$", "No se restan denominadores."],
      ["$\\dfrac{6x}{x^2-1}$", "Las $x$ del numerador se cancelan: queda $6$."]]
  ]);

  P("m0-po-1", T.po, "Escribir como $c\\,x^n$: $\\dfrac{4}{x^3}$", "simplificada", [
    ["¿Cómo pasás $x^3$ al numerador?",
      ["Cambiando el signo del exponente: $4x^{-3}$", "$\\tfrac{1}{x^n}=x^{-n}$."],
      ["$4x^3$", "Al subir, el exponente cambia de signo."],
      ["$-4x^3$", "Cambia el signo del exponente, no del coeficiente."]],
    ["¿Para qué sirve escribirlo así?",
      ["Para derivar o integrar con la regla de potencias", "Una sola regla en vez de casos especiales."],
      ["Para que dé un número", "Sigue siendo una función de $x$."],
      ["Para evitar el dominio", "El dominio no cambia: $x\\ne0$."]]
  ]);
  P("m0-po-2", T.po, "Simplificar a una sola potencia: $\\dfrac{x^5\\cdot x^{-2}}{x^{1/2}}$", "simplificada", [
    ["Arriba, $x^5\\cdot x^{-2}$",
      ["Se suman los exponentes: $x^3$", "Producto de igual base."],
      ["Se multiplican: $x^{-10}$", "Se multiplican en una potencia de potencia, no en un producto."],
      ["Se restan: $x^7$", "Se restan en un cociente."]],
    ["¿Y al dividir por $x^{1/2}$?",
      ["$x^{3-\\frac12}=x^{5/2}$", "Cociente: se restan."],
      ["$x^{3/2}$", "$3-\\tfrac12=\\tfrac52$."],
      ["$x^{6}$", "Se resta, no se divide."]]
  ]);
  P("m0-po-3", T.po, "Calcular sin calculadora: $8^{2/3}$", "num", [
    ["¿Cómo se lee $8^{2/3}$?",
      ["Raíz cúbica de $8$, y después al cuadrado", "$a^{m/n}=(\\sqrt[n]a)^m$."],
      ["$8\\cdot\\tfrac23$", "Un exponente no multiplica a la base."],
      ["$\\dfrac{8^2}{3}$", "El $3$ es el índice de la raíz."]],
    ["¿Resultado?",
      ["$4$", "$\\sqrt[3]8=2$ y $2^2=4$."],
      ["$\\tfrac{16}{3}$", "Es $8\\cdot\\tfrac23$: no corresponde."],
      ["$\\tfrac{64}{3}$", "Es $8^2/3$: no corresponde."]]
  ]);
  P("m0-po-4", T.po, "Calcular: $-3^2+(-3)^2$", "num", [
    ["¿Cuánto vale $-3^2$?",
      ["$-9$: el cuadrado afecta solo al $3$", "Sin paréntesis, el signo queda afuera."],
      ["$9$", "Eso es $(-3)^2$."],
      ["$-6$", "$3^2=9$, no $6$."]],
    ["¿Resultado total?",
      ["$0$", "$-9+9$."],
      ["$18$", "$-3^2$ es negativo."],
      ["$-18$", "$(-3)^2$ es positivo."]]
  ]);
  P("m0-po-5", T.po, "Escribir $\\sqrt{x}\\cdot\\sqrt[3]{x}$ como una sola potencia de $x$", "simplificada", [
    ["¿Primer paso?",
      ["Pasar a exponentes: $x^{1/2}\\cdot x^{1/3}$", "Raíz $n$-ésima = exponente $\\tfrac1n$."],
      ["Multiplicar los índices: $\\sqrt[6]x$", "Eso es para una raíz de una raíz."],
      ["Sumar los índices: $\\sqrt[5]x$", "Los índices no se suman."]],
    ["¿Resultado?",
      ["$x^{5/6}$", "$\\tfrac12+\\tfrac13=\\tfrac56$."],
      ["$x^{1/6}$", "Se suman los exponentes, no se multiplican."],
      ["$x^{2/5}$", "$\\tfrac12+\\tfrac13$ no es $\\tfrac25$: hace falta denominador común."]]
  ]);

  P("m0-in-1", T.in, "Resolver: $x^2-5x+4<0$", "conjunto", [
    ["¿Cómo encarás?",
      ["Raíces del polinomio ($1$ y $4$) y tabla de signos", "Las raíces son los bordes donde puede cambiar el signo."],
      ["Despejar $x^2$", "Hay término en $x$: no se aísla."],
      ["Resolver $x^2-5x+4=0$ y dar esas raíces", "Las raíces son los bordes, no la respuesta: te piden un conjunto."]],
    ["La parábola abre hacia arriba. ¿Dónde es negativa?",
      ["Entre las raíces: $(1,4)$", "Bordes abiertos porque es $<$ estricto."],
      ["$(-\\infty,1)\\cup(4,+\\infty)$", "Ahí es positiva."],
      ["$[1,4]$", "En $1$ y $4$ vale $0$, que no es $<0$."]]
  ]);
  P("m0-in-2", T.in, "Resolver: $\\dfrac{x-3}{x+2}\\ge0$", "conjunto", [
    ["¿Cómo encarás?",
      ["Tabla de signos con críticos $3$ y $-2$", "Los ceros de arriba y de abajo."],
      ["Multiplicar por $(x+2)$ a los dos lados", "No sabés su signo: puede invertir la desigualdad."],
      ["Solo pedir $x-3\\ge0$", "Perdés los $x$ donde arriba y abajo son negativos."]],
    ["¿Solución?",
      ["$(-\\infty,-2)\\cup[3,+\\infty)$", "$3$ incluido (da $0$); $-2$ nunca (anula el denominador)."],
      ["$(-\\infty,-2]\\cup[3,+\\infty)$", "En $-2$ la expresión no existe."],
      ["$[3,+\\infty)$", "Para $x<-2$ también es positiva."]]
  ]);
  P("m0-in-3", T.in, "Resolver: $-3x+6>0$", "conjunto", [
    ["¿Qué cuidado tenés al despejar?",
      ["Al dividir por $-3$ se invierte la desigualdad", "$-3x>-6 \\Rightarrow x<2$."],
      ["Ninguno, se despeja como una ecuación", "Dividir por un negativo da vuelta el sentido."],
      ["Hacer tabla de signos", "Funciona, pero para una lineal es un rodeo."]],
    ["¿Solución?",
      ["$(-\\infty,2)$", "$x<2$."],
      ["$(2,+\\infty)$", "Olvidaste invertir."],
      ["$(-\\infty,-2)$", "$-6\\div(-3)=2$."]]
  ]);
  P("m0-in-4", T.in, "Resolver: $(x-1)^2(x+3)>0$", "conjunto", [
    ["¿Qué pasa con $(x-1)^2$?",
      ["Nunca es negativo; vale $0$ en $x=1$", "No cambia el signo, pero anula todo en $x=1$."],
      ["Cambia de signo en $x=1$", "Un factor al cuadrado no cambia de signo."],
      ["Se puede tachar y listo", "Si lo tachás perdés que en $x=1$ el producto vale $0$."]],
    ["¿Solución?",
      ["$(-3,1)\\cup(1,+\\infty)$", "Positivo cuando $x+3>0$, sacando $x=1$."],
      ["$(-3,+\\infty)$", "En $x=1$ vale $0$, que no es $>0$."],
      ["$(-\\infty,-3)$", "Ahí es negativo."]]
  ]);
  P("m0-in-5", T.in, "Hallar el dominio de $f(x)=\\sqrt{x^2-16}$", "conjunto", [
    ["¿Qué planteás?",
      ["$x^2-16\\ge0$", "Raíz par: lo de adentro mayor o igual a $0$."],
      ["$x^2-16>0$", "La raíz de $0$ existe: va $\\ge$."],
      ["$x-4\\ge0$", "Perdés los $x\\le-4$."]],
    ["¿Dominio?",
      ["$(-\\infty,-4]\\cup[4,+\\infty)$", "Fuera de las raíces (la parábola abre hacia arriba)."],
      ["$[4,+\\infty)$", "Para $x\\le-4$ también vale."],
      ["$[-4,4]$", "Ahí $x^2-16$ es negativo."]]
  ]);

  P("m0-ru-1", T.ru, "Factorizar: $x^3-6x^2+11x-6$", "factorizada", [
    ["¿Cómo arrancás?",
      ["Probar divisores de $6$: $P(1)=0$", "Una raíz da un factor $(x-r)$ para bajar el grado."],
      ["Resolvente", "Es para grado 2."],
      ["Factor común $x$", "El $-6$ no tiene $x$."]],
    ["Ruffini con $1$ da $x^2-5x+6$. ¿Y ahora?",
      ["Factorizarlo: $(x-1)(x-2)(x-3)$", "$x^2-5x+6=(x-2)(x-3)$."],
      ["Ya terminó: $(x-1)(x^2-5x+6)$", "Lo de grado 2 todavía se factoriza."],
      ["$(x-1)(x+2)(x+3)$", "Producto $6$ y suma $-5$: $-2$ y $-3$."]]
  ]);
  P("m0-ru-2", T.ru, "Factorizar: $x^3+2x^2-x-2$", "factorizada", [
    ["¿Hay un atajo?",
      ["Agrupar de a pares: $x^2(x+2)-(x+2)$", "Cuatro términos que se agrupan evitan Ruffini."],
      ["Resolvente", "Es de grado 3."],
      ["Diferencia de cuadrados", "No es una resta de dos cuadrados."]],
    ["¿Resultado completo?",
      ["$(x+2)(x-1)(x+1)$", "$x^2-1$ también se factoriza."],
      ["$(x+2)(x^2-1)$", "Falta factorizar $x^2-1$."],
      ["$(x-2)(x-1)(x+1)$", "El factor es $(x+2)$."]]
  ]);
  P("m0-ru-3", T.ru, "Factorizar con coeficientes enteros: $x^3-4x+3$", "factorizada", [
    ["Antes de Ruffini, ¿qué cuidás?",
      ["Completar con $0$ el coeficiente de $x^2$: $1,\\ 0,\\ -4,\\ 3$", "Si falta una potencia, va un $0$."],
      ["Usar $1,\\ -4,\\ 3$", "Te corrés de lugar y da mal."],
      ["Probar $x=0$", "$P(0)=3\\ne0$."]],
    ["Ruffini con $1$ da $x^2+x-3$. ¿Se sigue factorizando con enteros?",
      ["No: $\\Delta=13$, raíces irracionales. Queda $(x-1)(x^2+x-3)$", "Con enteros no hay más."],
      ["Sí: $(x+3)(x-1)$", "Eso da $x^2+2x-3$."],
      ["Sí: $(x-3)(x+1)$", "Eso da $x^2-2x-3$."]]
  ]);
  P("m0-ru-4", T.ru, "Hallar todas las raíces de $x^3-7x-6$", "valores", [
    ["¿Qué raíz probás?",
      ["$P(-1)=-1+7-6=0$", "Divisores de $-6$: $-1$ funciona."],
      ["$P(1)=0$", "$1-7-6=-12$."],
      ["Resolvente directo", "Es de grado 3."]],
    ["Ruffini con $-1$ da $x^2-x-6$. ¿Raíces?",
      ["$x=-1,\\ x=3,\\ x=-2$", "$x^2-x-6=(x-3)(x+2)$."],
      ["Solo $x=-1$", "El cociente aporta dos raíces más."],
      ["$x=1,\\ x=-3,\\ x=2$", "Signos cambiados."]]
  ]);
  P("m0-ru-5", T.ru, "Dividir $x^3-8$ por $x-2$", "polinomio", [
    ["¿Cómo planteás Ruffini?",
      ["Con $2$ y coeficientes $1,\\ 0,\\ 0,\\ -8$", "Dos potencias faltantes, dos ceros."],
      ["Con $2$ y coeficientes $1,\\ -8$", "Faltan los ceros de $x^2$ y $x$."],
      ["Con $-2$", "Para dividir por $(x-2)$ se usa $2$."]],
    ["¿Resultado?",
      ["Cociente $x^2+2x+4$, resto $0$", "$x^3-8=(x-2)(x^2+2x+4)$."],
      ["Cociente $x^2+4$", "Falta el $2x$."],
      ["Cociente $x^2-2x+4$", "En Ruffini se multiplica por $2$ y se suma: da $+2$."]]
  ]);
})(typeof window !== "undefined" ? window : globalThis);
