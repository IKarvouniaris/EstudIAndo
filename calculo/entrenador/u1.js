// Entrenador de decisiones — Unidad I.
(function (root) {
  const P = root.DuoP;
  const T = {
    dom: "Dominio e imagen: las 3 restricciones",
    cer: "Ceros, positividad y negatividad (y multiplicidad)",
    lin: "Función lineal",
    cua: "Función cuadrática (3 formas)",
    rac: "Función racional y homográfica",
    tra: "Funciones por tramos (valor absoluto, escalón)",
    exp: "Función exponencial",
    log: "Función logarítmica",
    tri: "Funciones trigonométricas",
    ecu: "Resolver ecuaciones trigonométricas básicas",
    cla: "Clasificación, transformaciones, inversa e intersección",
    gtr: "Graficar usando transformaciones (método general)",
    gfo: "Hallar la fórmula a partir del gráfico"
  };
  P("u1-do-1", T.dom, "Hallar el dominio de $f(x)=\\dfrac{x+2}{x^2-4x}$", "conjunto", [
    ["¿Qué restricción hay?",
      ["Denominador distinto de $0$", "Es un cociente sin raíces ni logaritmos."],
      ["Numerador distinto de $0$", "Que el numerador sea $0$ no rompe nada: da $f=0$."],
      ["Lo de adentro $\\ge0$", "No hay raíz."]],
    ["$x^2-4x=x(x-4)$. ¿Dominio?",
      ["$\\mathbb{R}-\\{0,4\\}$", "Se excluyen los dos valores que anulan el denominador."],
      ["$\\mathbb{R}-\\{4\\}$", "$x=0$ también anula el denominador."],
      ["$\\mathbb{R}-\\{-2\\}$", "$-2$ anula el numerador: no se excluye."]]
  ]);
  P("u1-do-2", T.dom, "Hallar el dominio de $f(x)=\\sqrt{6-2x}$", "conjunto", [
    ["¿Qué planteás?",
      ["$6-2x\\ge0$", "Raíz par: adentro mayor o igual a $0$."],
      ["$6-2x>0$", "$\\sqrt0=0$ existe: va $\\ge$."],
      ["$6-2x\\ne0$", "Eso es para denominadores."]],
    ["¿Dominio?",
      ["$(-\\infty,3]$", "$-2x\\ge-6 \\Rightarrow x\\le3$ (se invierte al dividir por $-2$)."],
      ["$[3,+\\infty)$", "Olvidaste invertir la desigualdad."],
      ["$(-\\infty,3)$", "En $x=3$ la raíz vale $0$: se incluye."]]
  ]);
  P("u1-do-3", T.dom, "Hallar el dominio de $f(x)=\\ln(x-1)+\\dfrac{1}{x-3}$", "conjunto", [
    ["¿Qué restricciones hay?",
      ["$x-1>0$ y $x-3\\ne0$, las dos a la vez", "Logaritmo y denominador: se cumplen juntas."],
      ["Solo $x-1>0$", "Te olvidaste del denominador."],
      ["$x-1\\ge0$ y $x\\ne3$", "El argumento del logaritmo es estrictamente positivo."]],
    ["¿Dominio?",
      ["$(1,3)\\cup(3,+\\infty)$", "Desde $1$ (abierto) sacando el $3$."],
      ["$[1,3)\\cup(3,+\\infty)$", "$\\ln0$ no existe."],
      ["$(1,+\\infty)$", "Falta excluir $x=3$."]]
  ]);
  P("u1-do-4", T.dom, "La altura de un objeto es $h(t)=\\sqrt{20-5t}$ ($t$ en segundos). Hallar el dominio teniendo en cuenta el contexto.", "conjunto", [
    ["¿Qué condiciones van?",
      ["$20-5t\\ge0$ y además $t\\ge0$ por el contexto", "El tiempo no es negativo."],
      ["Solo $20-5t\\ge0$", "Falta la restricción del contexto."],
      ["Solo $t\\ge0$", "Falta la de la raíz."]],
    ["¿Dominio?",
      ["$[0,4]$", "$t\\le4$ y $t\\ge0$."],
      ["$(-\\infty,4]$", "Tiempos negativos no tienen sentido acá."],
      ["$[4,+\\infty)$", "Para $t>4$ la raíz es de un negativo."]]
  ]);
  P("u1-do-5", T.dom, "Hallar la imagen de $f(x)=x^2-6x+5$", "conjunto", [
    ["¿Qué te da la imagen de una parábola?",
      ["El vértice y hacia dónde abre", "Si abre hacia arriba, la imagen es $[k,+\\infty)$."],
      ["Las raíces", "Las raíces son ceros, no el borde de la imagen."],
      ["El dominio", "El dominio de una cuadrática es siempre $\\mathbb{R}$."]],
    ["Vértice en $x=3$, $f(3)=-4$, $a>0$. ¿Imagen?",
      ["$[-4,+\\infty)$", "El mínimo es $-4$ y se alcanza."],
      ["$(-4,+\\infty)$", "El vértice pertenece a la gráfica: va cerrado."],
      ["$(-\\infty,-4]$", "Abre hacia arriba: va desde el mínimo para arriba."]]
  ]);

  P("u1-ce-1", T.cer, "Hallar los ceros de $f(x)=x^2-2x-8$", "valores", [
    ["¿Qué planteás?",
      ["$f(x)=0$ y factorizás o usás la resolvente", "Ceros = valores de $x$ donde $f$ vale $0$."],
      ["$f(0)$", "Eso es la ordenada al origen."],
      ["El vértice", "El vértice es el mínimo, no los ceros."]],
    ["¿Ceros?",
      ["$x=4$ y $x=-2$", "$(x-4)(x+2)=0$."],
      ["$x=-4$ y $x=2$", "Signos al revés."],
      ["$(x-4)(x+2)$", "Te piden valores, no la factorización."]]
  ]);
  P("u1-ce-2", T.cer, "Hallar $C^+$ y $C^-$ de $f(x)=(x-2)(x+1)$", "conjunto", [
    ["¿Cómo encarás?",
      ["Ceros ($-1$ y $2$) y tabla de signos", "Los ceros dividen la recta en intervalos de signo constante."],
      ["Evaluar en $x=0$ y listo", "Un solo punto no alcanza: hay tres intervalos."],
      ["Comparar grados", "Eso es para límites al infinito."]],
    ["Abre hacia arriba. ¿Resultado?",
      ["$C^+=(-\\infty,-1)\\cup(2,+\\infty)$, $C^-=(-1,2)$", "Negativa entre las raíces."],
      ["$C^+=(-1,2)$, $C^-$ el resto", "Al revés: eso sería si abriera hacia abajo."],
      ["$C^+=[2,+\\infty)$", "Los ceros no van en $C^+$, y falta el intervalo izquierdo."]]
  ]);
  P("u1-ce-3", T.cer, "Hallar los ceros de $f(x)=\\dfrac{x^2-1}{x-1}$", "valores", [
    ["¿Qué cuidás?",
      ["Que un cero tiene que estar en el dominio", "$x=1$ anula arriba y abajo: no es cero, es un hueco."],
      ["Solo que el numerador valga $0$", "Falta chequear que esté en el dominio."],
      ["Que el denominador valga $0$", "Eso da asíntotas o huecos, no ceros."]],
    ["¿Ceros?",
      ["Solo $x=-1$", "$x=1$ queda afuera del dominio."],
      ["$x=1$ y $x=-1$", "En $x=1$ la función no existe."],
      ["Ninguno", "$x=-1$ anula el numerador y está en el dominio."]]
  ]);
  P("u1-ce-4", T.cer, "¿En qué ceros de $f(x)=(x-3)^2(x+1)$ la gráfica cruza el eje $x$?", "valores", [
    ["¿Qué mirás?",
      ["La multiplicidad: impar cruza, par rebota", "El exponente de cada factor."],
      ["El signo del coeficiente principal", "Eso dice el comportamiento en los extremos, no en cada cero."],
      ["Si el cero es positivo o negativo", "No tiene que ver."]],
    ["¿Respuesta?",
      ["Cruza en $x=-1$; en $x=3$ toca y rebota", "$(x+1)$ es simple; $(x-3)^2$ es doble."],
      ["Cruza en los dos", "En $x=3$ el signo no cambia."],
      ["Cruza solo en $x=3$", "Es al revés."]]
  ]);
  P("u1-ce-5", T.cer, "Hallar $C^+$ de $f(x)=\\dfrac{x-2}{x+3}$", "conjunto", [
    ["¿Qué valores van en la tabla de signos?",
      ["$x=2$ (cero) y $x=-3$ (asíntota)", "En los dos puede cambiar el signo."],
      ["Solo $x=2$", "En la asíntota también cambia el signo."],
      ["Solo $x=-3$", "Falta el cero."]],
    ["¿$C^+$?",
      ["$(-\\infty,-3)\\cup(2,+\\infty)$", "Probando $x=-4$: $\\tfrac{-6}{-1}>0$; $x=0$: $<0$; $x=3$: $>0$."],
      ["$(2,+\\infty)$", "A la izquierda de $-3$ también es positiva."],
      ["$(-3,2)$", "Ahí es negativa."]]
  ]);

  P("u1-li-1", T.lin, "Hallar la recta que pasa por $(1,3)$ y $(3,7)$", "recta", [
    ["¿Primer paso?",
      ["Calcular la pendiente $m=\\dfrac{7-3}{3-1}$", "Con dos puntos, primero la pendiente."],
      ["Promediar los puntos", "No da ninguna información de la recta."],
      ["Usar $b=3$", "$3$ es la $y$ de un punto, no la ordenada al origen."]],
    ["$m=2$. ¿Ecuación?",
      ["$y=2x+1$", "$y-3=2(x-1)$; verifica $(3,7)$."],
      ["$y=2x+3$", "No pasa por $(1,3)$."],
      ["$y=\\tfrac12x+3$", "La pendiente es $2$."]]
  ]);
  P("u1-li-2", T.lin, "Recta perpendicular a $y=3x-1$ que pasa por $(3,2)$", "recta", [
    ["¿Qué pendiente tiene?",
      ["$m=-\\tfrac13$", "Inversa y de signo opuesto."],
      ["$m=3$", "Esa es la paralela."],
      ["$m=-3$", "Falta invertir."]],
    ["¿Ecuación?",
      ["$y=-\\tfrac13x+3$", "$y-2=-\\tfrac13(x-3)$."],
      ["$y=-\\tfrac13x+2$", "No pasa por $(3,2)$."],
      ["$y=-\\tfrac13x+1$", "Revisá: $-\\tfrac13\\cdot(-3)=+1$ y se suma al $2$."]]
  ]);
  P("u1-li-3", T.lin, "¿Dónde corta al eje $x$ la recta $y=-2x+8$?", "valores", [
    ["¿Qué planteás?",
      ["$y=0$", "Corte con el eje $x$ = la $y$ vale $0$."],
      ["$x=0$", "Eso da el corte con el eje $y$."],
      ["La pendiente", "No dice dónde corta."]],
    ["¿Resultado?",
      ["$x=4$", "$-2x+8=0$."],
      ["$x=8$", "Falta dividir por $2$."],
      ["$x=-4$", "Signo: $-2x=-8 \\Rightarrow x=4$."]]
  ]);
  P("u1-li-4", T.lin, "¿Son paralelas $y=2x+1$ y $4x-2y=6$?", "conclusion", [
    ["¿Qué hacés con la segunda?",
      ["Despejar $y$: $y=2x-3$", "Para ver la pendiente hay que despejar $y$."],
      ["Comparar $4$ con $2$", "El $4$ no es la pendiente hasta despejar."],
      ["Igualar las dos ecuaciones", "Eso busca intersección, no paralelismo."]],
    ["¿Conclusión?",
      ["Sí: las dos tienen pendiente $2$ (y distinta ordenada)", "Misma pendiente = paralelas."],
      ["No: $4\\ne2$", "La pendiente de la segunda es $2$."],
      ["Son perpendiculares", "Perpendiculares tendrían producto de pendientes $-1$."]]
  ]);
  P("u1-li-5", T.lin, "Un taxi cobra 500 pesos de bajada y 200 pesos por km. Escribir el costo $C(k)$ y decir cuánto cuesta un viaje de 8 km.", "contexto", [
    ["¿Qué es la pendiente acá?",
      ["$200$: lo que aumenta por cada km", "La tasa de cambio constante."],
      ["$500$", "Ese es el valor fijo: la ordenada al origen."],
      ["$700$", "No hay un dato así."]],
    ["¿Resultado?",
      ["$C(k)=200k+500$; 8 km cuestan 2100 pesos", "$200\\cdot8+500$."],
      ["$C(k)=500k+200$; 4200 pesos", "Están invertidos."],
      ["$C(k)=200k$; 1600 pesos", "Falta la bajada."]]
  ]);

  P("u1-cu-1", T.cua, "Hallar el vértice de $f(x)=x^2-4x+1$", "puntos", [
    ["¿Cómo encontrás la $x$ del vértice?",
      ["$h=-\\dfrac{b}{2a}$", "Fórmula del vértice."],
      ["Resolviendo $f(x)=0$", "Eso da raíces."],
      ["$h=b$", "Falta dividir por $-2a$."]],
    ["$h=2$. ¿Vértice?",
      ["$(2,-3)$", "$f(2)=4-8+1=-3$."],
      ["$(2,1)$", "Hay que evaluar $f(2)$."],
      ["$(-2,13)$", "$h=-\\dfrac{-4}{2}=2$, positivo."]]
  ]);
  P("u1-cu-2", T.cua, "Escribir $f(x)=2x^2-8x+6$ en forma factorizada", "factorizada", [
    ["¿Qué necesitás?",
      ["Las raíces, y escribir $a(x-x_1)(x-x_2)$", "La forma factorizada muestra las raíces."],
      ["El vértice", "Eso es para la forma canónica."],
      ["Completar cuadrados", "Lleva a la canónica, no a la factorizada."]],
    ["Raíces $1$ y $3$. ¿Forma factorizada?",
      ["$2(x-1)(x-3)$", "No olvides $a=2$."],
      ["$(x-1)(x-3)$", "Falta el $2$."],
      ["$2(x+1)(x+3)$", "Los factores son $(x-\\text{raíz})$."]]
  ]);
  P("u1-cu-3", T.cua, "Una parábola tiene vértice $(1,4)$ y pasa por $(0,2)$. Hallar su fórmula.", "formula", [
    ["¿Qué forma conviene?",
      ["Canónica: $y=a(x-1)^2+4$", "El vértice se pone directo."],
      ["Factorizada", "No conocés las raíces."],
      ["Polinómica con tres incógnitas", "Funciona, pero es más largo."]],
    ["¿Cuánto vale $a$?",
      ["$a=-2$: $2=a+4$", "Reemplazando $(0,2)$."],
      ["$a=2$", "$2=a(0-1)^2+4 \\Rightarrow a=-2$."],
      ["$a=6$", "Se resta $4$, no se suma."]]
  ]);
  P("u1-cu-4", T.cua, "Para $f(x)=-x^2+2x+3$, ¿tiene máximo o mínimo y cuánto vale?", "puntos", [
    ["¿Máximo o mínimo?",
      ["Máximo, porque $a<0$", "Abre hacia abajo."],
      ["Mínimo, porque $c>0$", "Lo decide $a$, no $c$."],
      ["Mínimo, porque $a<0$", "$a<0$ abre hacia abajo: máximo."]],
    ["¿Dónde y cuánto?",
      ["En $(1,4)$", "$h=-\\tfrac{2}{-2}=1$, $f(1)=-1+2+3=4$."],
      ["En $(-1,0)$", "$h=1$, no $-1$."],
      ["En $(1,2)$", "$f(1)=4$."]]
  ]);
  P("u1-cu-5", T.cua, "Escribir $f(x)=x^2+6x+5$ en forma canónica", "simplificada", [
    ["¿Cómo?",
      ["Con el vértice: $h=-3$, $k=f(-3)$", "La canónica es $a(x-h)^2+k$."],
      ["Con las raíces", "Eso da la factorizada."],
      ["Sacando factor común $x$", "No lleva a la canónica."]],
    ["$f(-3)=-4$. ¿Canónica?",
      ["$(x+3)^2-4$", "$x-(-3)=x+3$."],
      ["$(x-3)^2-4$", "$h=-3$: queda $(x+3)$."],
      ["$(x+3)^2+5$", "$k=f(-3)=-4$."]]
  ]);

  P("u1-ra-1", T.rac, "Hallar las asíntotas de $f(x)=\\dfrac{3x-1}{x+2}$", "recta", [
    ["¿Vertical?",
      ["$x=-2$, porque anula el denominador y no el numerador", "En $-2$ el numerador vale $-7\\ne0$."],
      ["$x=\\tfrac13$", "Ese valor anula el numerador: es un cero."],
      ["No tiene", "Hay un valor que anula el denominador."]],
    ["¿Horizontal?",
      ["$y=3$", "Grados iguales: cociente de coeficientes principales."],
      ["$y=0$", "Eso es cuando el grado de abajo es mayor."],
      ["$y=-\\tfrac12$", "Es $\\tfrac31$, no $\\tfrac{-1}{2}$."]]
  ]);
  P("u1-ra-2", T.rac, "¿$x=3$ es asíntota de $f(x)=\\dfrac{x^2-9}{x-3}$?", "conclusion", [
    ["¿Qué hacés primero?",
      ["Factorizar y ver si se cancela $(x-3)$", "Si se cancela, hay un hueco."],
      ["Decir que sí porque anula el denominador", "Hay que mirar si también anula el numerador."],
      ["Comparar grados", "Eso es para la horizontal."]],
    ["¿Conclusión?",
      ["No: es un hueco en $(3,6)$", "Queda $f=x+3$ con $x\\ne3$."],
      ["Sí, es asíntota vertical", "Se cancela: no explota."],
      ["Es asíntota horizontal", "Una recta $x=\\dots$ es vertical."]]
  ]);
  P("u1-ra-3", T.rac, "Escribir $f(x)=\\dfrac{2x+5}{x+1}$ en forma $k+\\dfrac{c}{x-h}$", "simplificada", [
    ["¿Cómo?",
      ["Dividiendo $2x+5$ por $x+1$", "Cociente $=k$ y resto $=c$."],
      ["Separando $\\tfrac{2x}{x}+\\tfrac{5}{1}$", "No se separa así un denominador con dos términos."],
      ["Factorizando arriba", "$2x+5$ no tiene factor común con $x+1$."]],
    ["¿Resultado?",
      ["$2+\\dfrac{3}{x+1}$", "$2x+5=2(x+1)+3$."],
      ["$2+\\dfrac{5}{x+1}$", "El resto es $3$."],
      ["$5+\\dfrac{2}{x+1}$", "El cociente es $2$."]]
  ]);
  P("u1-ra-4", T.rac, "Hallar la imagen de $f(x)=\\dfrac{4}{x-1}+2$", "conjunto", [
    ["¿Qué valor nunca toma?",
      ["$y=2$, la asíntota horizontal", "$\\tfrac{4}{x-1}$ nunca vale $0$."],
      ["$y=1$", "$1$ es la asíntota vertical (de $x$)."],
      ["$y=4$", "No corresponde."]],
    ["¿Imagen?",
      ["$\\mathbb{R}-\\{2\\}$", "Toma todo valor salvo la asíntota horizontal."],
      ["$\\mathbb{R}-\\{1\\}$", "Ese es el dominio."],
      ["$(2,+\\infty)$", "Del otro lado de la asíntota también toma valores."]]
  ]);
  P("u1-ra-5", T.rac, "Hallar el dominio de $f(x)=\\dfrac{x}{x^2+1}$", "conjunto", [
    ["¿Se anula el denominador?",
      ["No: $x^2+1\\ge1$ siempre", "Una suma de un cuadrado y algo positivo."],
      ["Sí, en $x=\\pm1$", "$x^2+1=0$ no tiene solución real."],
      ["Sí, en $x=0$", "$0^2+1=1$."]],
    ["¿Dominio?",
      ["$\\mathbb{R}$", "No hay restricciones."],
      ["$\\mathbb{R}-\\{0\\}$", "$x=0$ anula el numerador, no el denominador."],
      ["$\\mathbb{R}-\\{-1,1\\}$", "Esos valores no anulan $x^2+1$."]]
  ]);

  P("u1-tr-1", T.tra, "Si $f(x)=\\begin{cases}x^2 & x<2\\\\ 3x & x\\ge2\\end{cases}$, calcular $f(2)$", "num", [
    ["¿Qué fórmula usás?",
      ["$3x$, porque el $2$ cumple $x\\ge2$", "El tramo con $\\ge$ incluye el borde."],
      ["$x^2$", "$2<2$ es falso."],
      ["Las dos y promediar", "Se usa una sola: la del tramo que corresponde."]],
    ["¿Resultado?",
      ["$6$", "$3\\cdot2$."],
      ["$4$", "Es la fórmula del otro tramo."],
      ["$5$", "No se promedia."]]
  ]);
  P("u1-tr-2", T.tra, "Resolver: $|x-3|=5$", "valores", [
    ["¿Cómo encarás?",
      ["Dos casos: $x-3=5$ o $x-3=-5$", "Por la definición del valor absoluto."],
      ["Sacar las barras: $x-3=5$", "Perdés el caso negativo."],
      ["Elevar al cuadrado sin más", "Funciona pero es más largo."]],
    ["¿Soluciones?",
      ["$x=8$ y $x=-2$", "Los dos casos."],
      ["Solo $x=8$", "Falta el caso negativo."],
      ["$x=\\pm5$", "Falta sumar $3$."]]
  ]);
  P("u1-tr-3", T.tra, "Resolver: $|2x-1|<3$", "conjunto", [
    ["¿Cómo se reescribe?",
      ["$-3<2x-1<3$", "$|u|<a \\iff -a<u<a$."],
      ["$2x-1<3$", "Falta el lado negativo."],
      ["$2x-1>3$ o $2x-1<-3$", "Eso es para $|u|>a$."]],
    ["¿Solución?",
      ["$(-1,2)$", "$-2<2x<4$."],
      ["$(-\\infty,2)$", "Falta el límite izquierdo."],
      ["$[-1,2]$", "La desigualdad es estricta."]]
  ]);
  P("u1-tr-4", T.tra, "Escribir $|x+2|$ por tramos", "funcion", [
    ["¿Dónde cambia de fórmula?",
      ["En $x=-2$, donde lo de adentro vale $0$", "Ahí cambia el signo de $x+2$."],
      ["En $x=0$", "Eso sería para $|x|$."],
      ["En $x=2$", "$x+2=0$ en $x=-2$."]],
    ["¿Cómo queda?",
      ["$x+2$ si $x\\ge-2$; $\\ -(x+2)$ si $x<-2$", "Cuando lo de adentro es negativo, se le cambia el signo."],
      ["$x+2$ si $x\\ge-2$; $\\ x-2$ si $x<-2$", "Es $-(x+2)=-x-2$."],
      ["$x+2$ siempre", "Daría negativos para $x<-2$."]]
  ]);
  P("u1-tr-5", T.tra, "¿Hay salto en $x=1$ para $f(x)=\\begin{cases}2x+1 & x<1\\\\ x+3 & x\\ge1\\end{cases}$?", "conclusion", [
    ["¿Qué comparás?",
      ["El valor al que se acerca cada tramo en $x=1$", "Si coinciden, empalman."],
      ["$f(0)$ y $f(2)$", "Lo que importa es justo en el punto de unión."],
      ["Las pendientes", "Eso es para derivabilidad."]],
    ["Izquierda: $3$; derecha: $4$. ¿Conclusión?",
      ["Sí, hay salto: no coinciden", "Discontinuidad de salto."],
      ["No, porque $f(1)$ existe", "Existir no alcanza: tienen que empalmar."],
      ["No se puede saber", "Ya tenés los dos valores."]]
  ]);

  P("u1-ex-1", T.exp, "Para $f(x)=3^x-2$, hallar asíntota e imagen", "caracteristicas", [
    ["¿Asíntota?",
      ["$y=-2$", "$3^x\\to0$ y queda $-2$."],
      ["$y=0$", "El $-2$ la corre."],
      ["$x=-2$", "Las exponenciales tienen asíntota horizontal."]],
    ["¿Imagen?",
      ["$(-2,+\\infty)$", "Siempre por encima de la asíntota."],
      ["$[-2,+\\infty)$", "La asíntota no se alcanza."],
      ["$\\mathbb{R}$", "Una exponencial no toma todos los valores."]]
  ]);
  P("u1-ex-2", T.exp, "Resolver: $2^{x+1}=32$", "valores", [
    ["¿Cómo?",
      ["Escribir $32=2^5$ e igualar exponentes", "Misma base: exponentes iguales."],
      ["Dividir por $2$: $x+1=16$", "No se divide el exponente."],
      ["Sacar raíz cuadrada", "No sirve: la incógnita está en el exponente."]],
    ["¿Solución?",
      ["$x=4$", "$x+1=5$."],
      ["$x=5$", "Falta restar $1$."],
      ["$x=15$", "$32$ no es $2^{16}$."]]
  ]);
  P("u1-ex-3", T.exp, "Resolver: $5^x=7$", "valores", [
    ["No se puede igualar bases. ¿Qué hacés?",
      ["Aplicar logaritmo: $x=\\log_5 7=\\dfrac{\\ln7}{\\ln5}$", "El logaritmo baja el exponente."],
      ["$x=\\tfrac75$", "Un exponente no se despeja dividiendo."],
      ["No tiene solución", "$7>0$: sí tiene."]],
    ["¿Aproximadamente?",
      ["$x\\approx1{,}21$", "$\\ln7/\\ln5\\approx1{,}946/1{,}609$."],
      ["$x\\approx0{,}83$", "Es $\\ln5/\\ln7$: está invertido."],
      ["$x\\approx1{,}4$", "No corresponde."]]
  ]);
  P("u1-ex-4", T.exp, "¿$f(x)=\\left(\\tfrac12\\right)^x$ crece o decrece?", "conclusion", [
    ["¿Qué mirás?",
      ["La base: si está entre $0$ y $1$, decrece", "Base menor que $1$."],
      ["El exponente", "El exponente es la variable."],
      ["Si hay signo menos adelante", "Acá no hay."]],
    ["¿Conclusión?",
      ["Decrece en todo $\\mathbb{R}$", "Cada paso multiplica por $\\tfrac12$."],
      ["Crece", "Con base menor que $1$, decrece."],
      ["Es constante", "Solo si la base fuera $1$."]]
  ]);
  P("u1-ex-5", T.exp, "Una población es $P(t)=500\\cdot2^{t/3}$ ($t$ en años). ¿Cuándo llega a $4000$?", "contexto", [
    ["¿Primer paso?",
      ["Aislar la potencia: $2^{t/3}=8$", "Dividís por $500$."],
      ["Restar $500$", "El $500$ multiplica."],
      ["Logaritmo de todo sin aislar", "Funciona, pero es más fácil aislar primero."]],
    ["¿Cuándo?",
      ["$t=9$ años", "$2^{t/3}=2^3 \\Rightarrow t/3=3$."],
      ["$t=3$ años", "$t/3=3 \\Rightarrow t=9$."],
      ["$t=8$ años", "$8$ es el valor de la potencia, no $t$."]]
  ]);

  P("u1-lo-1", T.log, "Hallar el dominio de $f(x)=\\log_2(x+5)$", "conjunto", [
    ["¿Condición?",
      ["$x+5>0$", "Argumento estrictamente positivo."],
      ["$x+5\\ge0$", "$\\log0$ no existe."],
      ["$x>0$", "El argumento es $x+5$, no $x$."]],
    ["¿Dominio?",
      ["$(-5,+\\infty)$", "$x>-5$."],
      ["$[-5,+\\infty)$", "Sin el $-5$."],
      ["$(5,+\\infty)$", "Signo."]]
  ]);
  P("u1-lo-2", T.log, "Resolver: $\\log_3(x)=4$", "valores", [
    ["¿Cómo?",
      ["Pasar a exponencial: $x=3^4$", "$\\log_a x=y \\iff a^y=x$."],
      ["$x=\\tfrac43$", "No se divide."],
      ["$x=4^3$", "La base es $3$."]],
    ["¿Solución?",
      ["$x=81$", "Y está en el dominio."],
      ["$x=64$", "Eso es $4^3$."],
      ["$x=12$", "No se multiplica."]]
  ]);
  P("u1-lo-3", T.log, "Resolver: $\\log(x)+\\log(x-3)=1$ (base 10)", "valores", [
    ["¿Qué hacés antes de resolver?",
      ["Calcular el dominio: $x>3$", "Para descartar soluciones al final."],
      ["Nada, se resuelve directo", "Después no sabrías qué descartar."],
      ["Sacar factor común $\\log$", "$\\log$ no es un número que multiplica."]],
    ["$\\log(x(x-3))=1 \\Rightarrow x^2-3x-10=0$: $x=5$ o $x=-2$. ¿Respuesta?",
      ["$x=5$", "$-2$ no cumple $x>3$."],
      ["$x=5$ y $x=-2$", "$\\log(-2)$ no existe."],
      ["$x=-2$", "Está fuera del dominio."]]
  ]);
  P("u1-lo-4", T.log, "Escribir como un solo logaritmo: $2\\ln x-\\ln(x+1)$", "simplificada", [
    ["¿Qué propiedades usás?",
      ["$n\\ln a=\\ln a^n$ y la resta da un cociente", "$\\ln x^2-\\ln(x+1)$."],
      ["La resta da $\\ln(x-(x+1))$", "Una resta de logaritmos es el logaritmo de un cociente."],
      ["$2\\ln x=\\ln 2x$", "El $2$ va como exponente."]],
    ["¿Resultado?",
      ["$\\ln\\dfrac{x^2}{x+1}$", "Con $x>0$."],
      ["$\\ln(x^2-x-1)$", "No es el logaritmo de una resta."],
      ["$\\dfrac{\\ln x^2}{\\ln(x+1)}$", "Es el logaritmo del cociente, no el cociente de logaritmos."]]
  ]);
  P("u1-lo-5", T.log, "Para $f(x)=\\ln(x-2)+1$, ¿asíntota y punto de referencia?", "caracteristicas", [
    ["¿Asíntota?",
      ["$x=2$, vertical", "$\\ln$ tiene asíntota en $x=0$ y se corre $2$ a la derecha."],
      ["$y=1$", "El logaritmo no tiene asíntota horizontal."],
      ["$x=-2$", "$x-2$ corre a la derecha."]],
    ["El punto $(1,0)$ de $\\ln x$ va a…",
      ["$(3,1)$", "$x+2$ y $y+1$."],
      ["$(-1,1)$", "La traslación es a la derecha."],
      ["$(3,0)$", "Falta subir $1$."]]
  ]);

  P("u1-tg-1", T.tri, "Para $f(x)=4\\sin(2x)-1$, hallar amplitud, período e imagen", "caracteristicas", [
    ["¿Amplitud y período?",
      ["$A=4$, $P=\\dfrac{2\\pi}{2}=\\pi$", "$P=\\tfrac{2\\pi}{B}$."],
      ["$A=4$, $P=2\\pi$", "El $2$ adentro cambia el período."],
      ["$A=-1$, $P=\\pi$", "$-1$ es la línea media."]],
    ["¿Imagen?",
      ["$[-5,3]$", "$[k-A,k+A]=[-1-4,-1+4]$."],
      ["$[-4,4]$", "Falta correr por $k=-1$."],
      ["$[-1,4]$", "No corresponde."]]
  ]);
  P("u1-tg-2", T.tri, "Para $f(x)=\\cos\\big(\\pi x-\\tfrac{\\pi}{2}\\big)$, hallar período y desplazamiento horizontal", "caracteristicas", [
    ["¿Qué hacés con el argumento?",
      ["Factor común $\\pi$: $\\pi\\big(x-\\tfrac12\\big)$", "Recién ahí se lee $h$."],
      ["Leer $h=\\tfrac{\\pi}{2}$ directo", "El error más común: falta sacar factor común."],
      ["Nada", "Sin factor común, $h$ sale mal."]],
    ["¿Resultado?",
      ["$P=2$, $h=\\tfrac12$", "$P=\\tfrac{2\\pi}{\\pi}$."],
      ["$P=2\\pi$, $h=\\tfrac{\\pi}{2}$", "No corresponde."],
      ["$P=2$, $h=\\tfrac{\\pi}{2}$", "$h$ sale después de sacar factor común."]]
  ]);
  P("u1-tg-3", T.tri, "Para $f(x)=-2\\cos(x)+3$, hallar amplitud e imagen", "caracteristicas", [
    ["¿Amplitud?",
      ["$2$ (siempre positiva)", "$|A|$; el signo indica reflexión."],
      ["$-2$", "La amplitud es una distancia."],
      ["$3$", "Es la línea media."]],
    ["¿Imagen?",
      ["$[1,5]$", "$[3-2,3+2]$."],
      ["$[-2,3]$", "No corresponde."],
      ["$[-5,-1]$", "La línea media es $+3$."]]
  ]);
  P("u1-tg-4", T.tri, "Hallar el dominio de $f(x)=\\tan x$", "conjunto", [
    ["¿Qué restricción hay?",
      ["$\\cos x\\ne0$, porque $\\tan x=\\tfrac{\\sin x}{\\cos x}$", "Es un cociente."],
      ["Ninguna", "Hay valores donde no existe."],
      ["$\\sin x\\ne0$", "Eso da ceros, no huecos del dominio."]],
    ["¿Dominio?",
      ["$\\mathbb{R}-\\{\\tfrac{\\pi}{2}+k\\pi\\}$", "Donde el coseno vale $0$."],
      ["$\\mathbb{R}-\\{k\\pi\\}$", "Ahí se anula el seno."],
      ["$(-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2})$", "Eso es un solo período."]]
  ]);
  P("u1-tg-5", T.tri, "Simplificar: $\\dfrac{1-\\cos^2x}{\\sin x}$", "simplificada", [
    ["¿Qué identidad usás?",
      ["$1-\\cos^2x=\\sin^2x$", "De $\\sin^2+\\cos^2=1$."],
      ["$1-\\cos^2x=\\cos x$", "No es una identidad."],
      ["Ninguna, se cancela $\\cos$", "No hay coseno abajo."]],
    ["¿Resultado?",
      ["$\\sin x$ (con $\\sin x\\ne0$)", "$\\tfrac{\\sin^2x}{\\sin x}$."],
      ["$\\sin^2x$", "Falta dividir."],
      ["$1$", "No corresponde."]]
  ]);

  P("u1-ec-1", T.ecu, "Resolver en $[0,2\\pi)$: $2\\sin\\theta-1=0$", "valores", [
    ["¿Primer paso?",
      ["Aislar: $\\sin\\theta=\\tfrac12$", "Antes de cualquier inversa."],
      ["Aplicar $\\sin^{-1}$ a todo", "Primero hay que aislar el seno."],
      ["$\\sin\\theta=2$", "Despeje mal hecho."]],
    ["¿Soluciones?",
      ["$\\tfrac{\\pi}{6}$ y $\\tfrac{5\\pi}{6}$", "Seno positivo: cuadrantes I y II."],
      ["Solo $\\tfrac{\\pi}{6}$", "Falta la del II cuadrante."],
      ["$\\tfrac{\\pi}{6}$ y $\\tfrac{11\\pi}{6}$", "En el IV el seno es negativo."]]
  ]);
  P("u1-ec-2", T.ecu, "Resolver en $[0,2\\pi)$: $2\\cos\\theta+\\sqrt3=0$", "valores", [
    ["¿Aislás?",
      ["$\\cos\\theta=-\\tfrac{\\sqrt3}{2}$", "Está en $[-1,1]$: se puede seguir."],
      ["$\\cos\\theta=-\\sqrt3$", "Falta dividir por $2$."],
      ["$\\cos\\theta=\\tfrac{\\sqrt3}{2}$", "Signo."]],
    ["Referencia $\\tfrac{\\pi}{6}$, coseno negativo. ¿Soluciones?",
      ["$\\tfrac{5\\pi}{6}$ y $\\tfrac{7\\pi}{6}$", "Cuadrantes II y III."],
      ["$\\tfrac{\\pi}{6}$ y $\\tfrac{11\\pi}{6}$", "Ahí el coseno es positivo."],
      ["$\\tfrac{5\\pi}{6}$ solamente", "Falta la del III."]]
  ]);
  P("u1-ec-3", T.ecu, "Resolver en $[0,2\\pi)$: $\\sin\\theta=3$", "valores", [
    ["¿Qué notás?",
      ["$3$ está fuera de $[-1,1]$", "El seno nunca vale $3$."],
      ["Hay que usar radianes", "El problema no es la unidad."],
      ["$\\theta=\\sin^{-1}3$", "No existe."]],
    ["¿Respuesta?",
      ["No tiene solución", "Si el despeje está bien, la respuesta es \"ninguna\"."],
      ["$\\theta=\\tfrac{\\pi}{2}$", "$\\sin\\tfrac{\\pi}{2}=1$."],
      ["$\\theta=3$", "$\\theta$ es un ángulo, no el valor del seno."]]
  ]);
  P("u1-ec-4", T.ecu, "Resolver en $[0,2\\pi)$: $\\sin(2\\theta)=1$", "valores", [
    ["¿Cómo encarás el $2\\theta$?",
      ["Llamar $u=2\\theta$, que recorre $[0,4\\pi)$", "Hay el doble de vueltas."],
      ["Resolver $\\sin\\theta=\\tfrac12$", "$\\sin(2\\theta)\\ne2\\sin\\theta$."],
      ["Ignorar el $2$", "Perdés soluciones."]],
    ["$u=\\tfrac{\\pi}{2}$ o $u=\\tfrac{5\\pi}{2}$. ¿$\\theta$?",
      ["$\\tfrac{\\pi}{4}$ y $\\tfrac{5\\pi}{4}$", "Dividir por $2$."],
      ["Solo $\\tfrac{\\pi}{4}$", "Falta la de la segunda vuelta."],
      ["$\\tfrac{\\pi}{2}$ y $\\tfrac{5\\pi}{2}$", "Esos son valores de $u$."]]
  ]);
  P("u1-ec-5", T.ecu, "Resolver en $[0,2\\pi)$: $\\tan\\theta=1$", "valores", [
    ["¿Período de la tangente?",
      ["$\\pi$: las soluciones son $\\alpha$ y $\\alpha+\\pi$", "Se repite cada $\\pi$."],
      ["$2\\pi$: una sola solución", "En $[0,2\\pi)$ hay dos."],
      ["Igual que el seno: $\\alpha$ y $\\pi-\\alpha$", "Esa regla es del seno."]],
    ["¿Soluciones?",
      ["$\\tfrac{\\pi}{4}$ y $\\tfrac{5\\pi}{4}$", "$\\tan\\tfrac{\\pi}{4}=1$."],
      ["$\\tfrac{\\pi}{4}$ y $\\tfrac{3\\pi}{4}$", "$\\tan\\tfrac{3\\pi}{4}=-1$."],
      ["Solo $\\tfrac{\\pi}{4}$", "Falta $+\\pi$."]]
  ]);

  P("u1-cl-1", T.cla, "¿$f(x)=x^4-3x^2$ es par, impar o ninguna?", "conclusion", [
    ["¿Qué calculás?",
      ["$f(-x)$ y comparás con $f(x)$ y $-f(x)$", "Esa es la definición."],
      ["$f(0)$", "No alcanza."],
      ["$f(1)$ y $f(2)$", "Hay que comparar $x$ con $-x$."]],
    ["$f(-x)=x^4-3x^2$. ¿Conclusión?",
      ["Par: $f(-x)=f(x)$", "Simétrica respecto del eje $y$."],
      ["Impar", "Sería $f(-x)=-f(x)$."],
      ["Ninguna", "Coincide con $f(x)$."]]
  ]);
  P("u1-cl-2", T.cla, "Hallar la inversa de $f(x)=3x-6$", "funcion", [
    ["¿Método?",
      ["$y=3x-6$, intercambiar $x$ e $y$ y despejar", "El paso clave es intercambiar."],
      ["$\\dfrac{1}{3x-6}$", "La inversa no es el recíproco."],
      ["$-3x+6$", "Esa es la opuesta."]],
    ["¿Inversa?",
      ["$f^{-1}(x)=\\dfrac{x+6}{3}$", "$x=3y-6$."],
      ["$f^{-1}(x)=\\dfrac{x-6}{3}$", "Se suma $6$."],
      ["$f^{-1}(x)=3x+6$", "Hay que dividir por $3$."]]
  ]);
  P("u1-cl-3", T.cla, "Hallar los puntos de intersección de $y=x^2$ e $y=2x+3$", "puntos", [
    ["¿Qué planteás?",
      ["$x^2=2x+3$", "Igualar las dos."],
      ["Derivar las dos", "No se buscan pendientes."],
      ["Sumarlas", "No da la intersección."]],
    ["$x=3$ o $x=-1$. ¿Puntos?",
      ["$(3,9)$ y $(-1,1)$", "Con la $y$ de cada uno."],
      ["$x=3$ y $x=-1$", "Te piden puntos: falta la $y$."],
      ["$(3,0)$ y $(-1,0)$", "La $y$ no es $0$."]]
  ]);
  P("u1-cl-4", T.cla, "¿Qué hace $f(x+4)-1$ sobre la gráfica de $f$?", "conclusion", [
    ["¿Qué hace el $+4$ de adentro?",
      ["Corre $4$ a la izquierda", "Lo de adentro actúa al revés."],
      ["Corre $4$ a la derecha", "Eso sería $x-4$."],
      ["Sube $4$", "Lo de adentro es horizontal."]],
    ["¿Y el $-1$?",
      ["Baja $1$", "Lo de afuera es vertical y al derecho."],
      ["Corre $1$ a la izquierda", "Lo de afuera es vertical."],
      ["Refleja", "Solo traslada."]]
  ]);
  P("u1-cl-5", T.cla, "¿$f(x)=x^2$ tiene inversa en $\\mathbb{R}$?", "conclusion", [
    ["¿Qué hace falta?",
      ["Que sea inyectiva", "Que cada $y$ venga de un solo $x$."],
      ["Que sea continua", "No es la condición."],
      ["Que pase por el origen", "No es la condición."]],
    ["¿Conclusión?",
      ["No en $\\mathbb{R}$ ($f(2)=f(-2)$); sí restringiendo a $[0,+\\infty)$", "Ahí la inversa es $\\sqrt x$."],
      ["Sí: $\\sqrt x$", "Solo si restringís el dominio."],
      ["Sí: $\\tfrac{1}{x^2}$", "Eso no es una inversa."]]
  ]);

  P("u1-gt-1", T.gtr, "Graficar $y=\\sqrt{x-2}+1$ usando transformaciones", "grafico", [
    ["¿Función base?",
      ["$\\sqrt x$", "Es una raíz."],
      ["$x^2$", "No hay cuadrado."],
      ["$\\tfrac1x$", "No hay cociente."]],
    ["¿Transformaciones?",
      ["$2$ a la derecha y $1$ arriba: arranca en $(2,1)$", "$(0,0)\\to(2,1)$."],
      ["$2$ a la izquierda y $1$ arriba", "$x-2$ corre a la derecha."],
      ["$2$ arriba y $1$ a la derecha", "Están cruzadas."]]
  ]);
  P("u1-gt-2", T.gtr, "Graficar $y=-x^2+4$ usando transformaciones", "grafico", [
    ["¿Qué hace el signo menos?",
      ["Refleja respecto del eje $x$", "Afecta a la $y$."],
      ["Refleja respecto del eje $y$", "Eso sería $(-x)^2$, que no cambia nada."],
      ["Corre a la izquierda", "No es una traslación."]],
    ["¿Vértice e imagen?",
      ["Vértice $(0,4)$, imagen $(-\\infty,4]$", "Abre hacia abajo desde $4$."],
      ["Vértice $(0,-4)$", "El $+4$ sube."],
      ["Imagen $[4,+\\infty)$", "Abre hacia abajo."]]
  ]);
  P("u1-gt-3", T.gtr, "Graficar $y=2^{x+1}-3$ usando transformaciones", "grafico", [
    ["¿Asíntota?",
      ["$y=-3$", "La asíntota $y=0$ baja $3$."],
      ["$x=-1$", "Las exponenciales tienen asíntota horizontal."],
      ["$y=0$", "El $-3$ la mueve."]],
    ["$(0,1)$ de $2^x$ va a…",
      ["$(-1,-2)$", "$1$ a la izquierda y $3$ abajo."],
      ["$(1,-2)$", "$x+1$ corre a la izquierda."],
      ["$(-1,4)$", "El $-3$ baja."]]
  ]);
  P("u1-gt-4", T.gtr, "Graficar $y=|x+1|-2$ usando transformaciones", "grafico", [
    ["¿Vértice?",
      ["$(-1,-2)$", "El vértice de $|x|$ se mueve $1$ a la izquierda y $2$ abajo."],
      ["$(1,-2)$", "$x+1$ es a la izquierda."],
      ["$(-1,2)$", "$-2$ baja."]],
    ["¿Imagen?",
      ["$[-2,+\\infty)$", "Desde el vértice para arriba."],
      ["$\\mathbb{R}$", "El valor absoluto tiene un mínimo."],
      ["$[2,+\\infty)$", "El vértice está en $y=-2$."]]
  ]);
  P("u1-gt-5", T.gtr, "Graficar $y=\\dfrac{1}{x-3}+2$ usando transformaciones", "grafico", [
    ["¿Función base?",
      ["$\\tfrac1x$", "Homográfica básica."],
      ["$x-3$", "Es lineal: no tiene asíntotas."],
      ["$\\sqrt x$", "No hay raíz."]],
    ["¿Asíntotas?",
      ["$x=3$ e $y=2$", "Las de $\\tfrac1x$ trasladadas."],
      ["$x=-3$ e $y=2$", "$x-3$ va a la derecha."],
      ["$x=3$ e $y=0$", "El $+2$ sube la horizontal."]]
  ]);

  P("u1-gf-1", T.gfo, "Una exponencial $y=A\\cdot2^x+k$ tiene asíntota $y=1$ y pasa por $(0,4)$. Hallar la fórmula.", "formula", [
    ["¿Qué te da la asíntota?",
      ["$k=1$", "La asíntota horizontal es $y=k$."],
      ["$A=1$", "$A$ sale de un punto."],
      ["Nada", "Es un dato gratis."]],
    ["Con $(0,4)$: ¿$A$?",
      ["$A=3$: $4=A+1$", "$2^0=1$."],
      ["$A=4$", "Falta restar $k$."],
      ["$A=2$", "No corresponde."]]
  ]);
  P("u1-gf-2", T.gfo, "Una parábola corta al eje $x$ en $-1$ y $3$ y pasa por $(1,-8)$. Hallar la fórmula.", "formula", [
    ["¿Qué forma conviene?",
      ["Factorizada: $y=a(x+1)(x-3)$", "Las raíces se ven en el gráfico."],
      ["Canónica", "No conocés el vértice."],
      ["Polinómica con tres incógnitas", "Funciona pero es más largo."]],
    ["Con $(1,-8)$: ¿$a$?",
      ["$a=2$: $-8=a(2)(-2)$", "$-4a=-8$."],
      ["$a=-2$", "Signo."],
      ["$a=-8$", "Falta dividir por $-4$."]]
  ]);
  P("u1-gf-3", T.gfo, "Una homográfica tiene asíntotas $x=-1$, $y=2$ y pasa por $(0,5)$. Hallar la fórmula.", "formula", [
    ["¿Forma?",
      ["$y=2+\\dfrac{c}{x+1}$", "Las asíntotas dan $h=-1$ y $k=2$."],
      ["$y=2+\\dfrac{c}{x-1}$", "$h=-1$ da $x+1$."],
      ["$y=a(x+1)^2+2$", "Es una parábola."]],
    ["¿$c$?",
      ["$c=3$: $5=2+c$", "En $x=0$, $x+1=1$."],
      ["$c=5$", "Falta restar $2$."],
      ["$c=-3$", "Signo."]]
  ]);
  P("u1-gf-4", T.gfo, "Una sinusoide tiene máximo $5$ y mínimo $-1$. Hallar la línea media $k$ y la amplitud $A$.", "caracteristicas", [
    ["¿Línea media?",
      ["$k=\\dfrac{5+(-1)}{2}=2$", "El promedio del máximo y el mínimo."],
      ["$k=5$", "Ese es el máximo."],
      ["$k=3$", "No corresponde."]],
    ["¿Amplitud?",
      ["$A=\\dfrac{5-(-1)}{2}=3$", "La mitad de la distancia total."],
      ["$A=6$", "Esa es la distancia total."],
      ["$A=2$", "Es $k$."]]
  ]);
  P("u1-gf-5", T.gfo, "Una logarítmica $y=\\log_b(x-h)$ tiene asíntota $x=2$ y pasa por $(5,1)$. Hallar la fórmula.", "formula", [
    ["¿Qué te da la asíntota?",
      ["$h=2$", "La asíntota vertical es $x=h$."],
      ["$b=2$", "La base sale de un punto."],
      ["$y=2$", "Es vertical."]],
    ["Con $(5,1)$: ¿$b$?",
      ["$b=3$: $\\log_b3=1$", "$5-2=3$."],
      ["$b=5$", "Falta restar $h$."],
      ["$b=1$", "La base no puede ser $1$."]]
  ]);
})(typeof window !== "undefined" ? window : globalThis);
