/* Flashcards de Probabilidad y Estadística. Las usan estadistica.html (sección Flashcards) y poris.html. */
window.MAZOS = window.MAZOS || {};
window.MAZOS["estadistica"] = [
    {c:"1", p:"¿Cuándo uso la mediana en lugar de la media?", r:"Cuando hay valores extremos (outliers) o la distribución es asimétrica: la media se tira hacia el extremo, la mediana no."},
    {c:"1", p:"Fórmula de la mediana en datos agrupados.", r:"Me = L(i−1) + [(n/2 − F(i−1)) / f(i)] · A\n\nL(i−1): límite inferior de la clase mediana · F(i−1): acumulada anterior · f(i): frecuencia de la clase · A: amplitud."},
    {c:"1", p:"Fórmula de la moda en datos agrupados.", r:"Mo = L(i−1) + [d1/(d1+d2)] · A\n\nd1 = f(i) − f(i−1) · d2 = f(i) − f(i+1). La clase modal es la de mayor frecuencia."},
    {c:"1", p:"¿Cómo se calcula Q1 con datos agrupados?", r:"Se busca la clase donde la acumulada llega a n/4 y se aplica: Q1 = L + [(n/4 − F(i−1)) / f(i)] · A. Q3 usa 3n/4."},
    {c:"1", p:"¿Varianza muestral: dividir por n o por n−1?", r:"Si los datos son una muestra: n − 1. Si son toda la población: n (σ²). En el parcial se usa n − 1."},
    {c:"1", p:"¿Cómo interpreto el coeficiente de variación?", r:"CV = s/x̄ · 100. Hasta 20 %: datos homogéneos, la media es representativa (menos de 5 %: muy representativa). Más de 20 %: heterogéneos, la media representa mal."},
    {c:"1", p:"¿Qué es una asimetría positiva?", r:"La cola se estira hacia la derecha: moda < mediana < media."},
    {c:"1", p:"En una tabla de intervalos me piden 'de los días con x > 4, el % con x < 10'. ¿Cómo lo resuelvo?", r:"Es una condicional: (F(10) − F(4)) / (n − F(4)). El denominador restringe el universo a la condición."},
    {c:"1", p:"¿Cuál es la diferencia entre marca de clase y límite de clase?", r:"La marca de clase es el punto medio del intervalo y se usa en media y desvío. Los límites se usan en mediana, moda y percentiles (interpolación)."},

    {c:"2", p:"¿Cuál es la regla de la suma para eventos compatibles?", r:"P(A∪B) = P(A) + P(B) − P(A∩B). Para excluyentes, P(A∩B) = 0 y se suman directo."},
    {c:"2", p:"¿Cómo se calcula 'al menos uno'?", r:"Por el complemento: 1 − P(ninguno). Casi siempre es más corto que sumar todos los casos."},
    {c:"2", p:"¿Qué significa que A y B sean independientes y cómo lo compruebo?", r:"Que la ocurrencia de uno no cambia la probabilidad del otro. Se comprueba con P(A∩B) = P(A)·P(B) (o P(A|B) = P(A))."},
    {c:"2", p:"¿Cómo cambia el cálculo con y sin reposición?", r:"Con reposición las extracciones son independientes (7/10·7/10). Sin reposición cada extracción depende de la anterior (7/10·6/9)."},
    {c:"2", p:"¿Cuándo uso probabilidad total y cuándo Bayes?", r:"Total: conozco los orígenes y pregunto por un resultado. Bayes: conozco el resultado y pregunto por el origen. El denominador de Bayes es la probabilidad total."},
    {c:"2", p:"Fórmula de Bayes.", r:"P(Ai|B) = P(Ai)·P(B|Ai) / Σ P(Aj)·P(B|Aj)"},
    {c:"2", p:"Un test con 95 % de sensibilidad da positivo. ¿Por qué no es 95 % la probabilidad de estar enfermo?", r:"Porque depende de la prevalencia: si la enfermedad es rara, la mayoría de los positivos son falsos positivos de la gran población sana. Hay que aplicar Bayes."},
    {c:"2", p:"Un 20 % 'de éstos' tiene cuenta corriente. ¿Es P(A∩B)?", r:"No: es una condicional P(B|A). La intersección es P(A)·P(B|A)."},
    {c:"2", p:"¿Cómo se calcula el porcentaje que 'sólo' tiene A?", r:"P(A) − P(A∩B). Y 'ni A ni B' es 1 − P(A∪B)."},

    {c:"3", p:"¿Cuándo una tabla es una distribución de probabilidad válida?", r:"Cuando todas las p(x) son ≥ 0 y suman exactamente 1."},
    {c:"3", p:"Fórmulas de E(X) y V(X) para una variable discreta.", r:"E(X) = Σ x·p(x)\nV(X) = E(X²) − [E(X)]², con E(X²) = Σ x²·p(x)\nσ = √V"},
    {c:"3", p:"¿Cuándo uso binomial?", r:"n ensayos independientes, probabilidad de éxito p constante, cuento éxitos. p(r) = C(n,r)·p^r·(1−p)^(n−r); E = np; V = np(1−p)."},
    {c:"3", p:"¿Cuándo uso Pascal?", r:"Repito ensayos hasta el r-ésimo éxito y cuento los ensayos. p(n) = C(n−1,r−1)·p^r·(1−p)^(n−r), n ≥ r; E = r/p."},
    {c:"3", p:"¿Cuándo uso hipergeométrico?", r:"Población finita N con R éxitos, extracción SIN reposición de n elementos, cuento éxitos. p(r) = C(R,r)·C(N−R,n−r) / C(N,n)."},
    {c:"3", p:"¿Cuándo uso hiperPascal?", r:"Como el hipergeométrico pero fijo la cantidad de éxitos r y cuento cuántas extracciones hacen falta. Dominio: r ≤ n ≤ N−R+r."},
    {c:"3", p:"Traducí: 'a lo sumo k', 'menos de k', 'al menos k', 'más de k'.", r:"a lo sumo k → X ≤ k = F(k)\nmenos de k → X ≤ k−1 = F(k−1)\nal menos k → X ≥ k = 1 − F(k−1)\nmás de k → X ≥ k+1 = 1 − F(k)"},
    {c:"3", p:"¿Cómo se relacionan Pascal y binomial?", r:"P(N ≤ n) = P(Bin(n,p) ≥ r): necesitar n ensayos o menos para r éxitos equivale a tener r o más éxitos en n ensayos."},
    {c:"3", p:"Calculás la probabilidad de aceptar un lote y luego 'al menos 18 de 20 lotes'. ¿Qué modelo uso en el 2.º paso?", r:"Binomial con n = 20 y p = la probabilidad de aceptar un lote calculada en el 1.er paso (hipergeométrica)."},
    {c:"3", p:"Un proceso tiene 10 % de defectuosas. ¿Binomial o hipergeométrico?", r:"Binomial (Bernoulli): no hay un lote finito con cantidades conocidas, y p es constante."},
    {c:"3", p:"¿Cuántas pruebas necesito para detectar con probabilidad 0,95 un proceso al 10 %?", r:"1 − 0,9^n ≥ 0,95 → n ≥ ln(0,05)/ln(0,9) = 28,4 → n = 29."}
  ];
