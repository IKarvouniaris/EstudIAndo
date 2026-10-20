-- Generado por tools/seed_estadistica.py — no editar a mano, volver a correr el script.
-- 47 ejercicios, 162 respuestas numéricas.
-- Se puede volver a correr: actualiza los ejercicios existentes en lugar de duplicarlos.

insert into ejercicios_num (id, materia, tema, orden, titulo, enunciado, datos, partes) values
  ('estadistica-D1', 'estadistica', 'descriptiva', 1, 'Tiempos de fractura del acero', 'En un laboratorio se registraron los minutos que tardan muestras de acero en fracturarse bajo una prueba de resistencia. Los tiempos se agruparon en intervalos (datos de la muestra, usar varianza muestral con n-1).', 'Tiempo (min)  fi
------------  --
45-50         6 
50-55         14
55-60         22
60-65         18
65-70         10
70-75         5 ', '[{"id": "a", "etiqueta": "Media (min)", "ayuda": ""}, {"id": "b", "etiqueta": "Mediana (min)", "ayuda": ""}, {"id": "c", "etiqueta": "Moda (min)", "ayuda": ""}, {"id": "d", "etiqueta": "Desvío estándar (min)", "ayuda": ""}, {"id": "e", "etiqueta": "Tiempo máximo del 25 % de las muestras más rápidas: Q1 (min)", "ayuda": ""}, {"id": "f", "etiqueta": "Coeficiente de variación (%)", "ayuda": "Sin el símbolo %"}]'::jsonb),
  ('estadistica-D2', 'estadistica', 'descriptiva', 2, 'Porcentaje diario de piezas defectuosas', 'En un proceso productivo el porcentaje diario de piezas defectuosas es una variable aleatoria de la que se registraron 160 observaciones (días) agrupadas en el cuadro. Usar varianza muestral (n-1).', 'x (%)  días
-----  ----
0-2    4   
2-4    26  
4-6    50  
6-8    35  
8-10   25  
10-12  14  
12-14  6   ', '[{"id": "a", "etiqueta": "Media (%)", "ayuda": ""}, {"id": "b", "etiqueta": "Desvío estándar (%)", "ayuda": ""}, {"id": "c", "etiqueta": "Porcentaje de días con x > 2 (%)", "ayuda": ""}, {"id": "d", "etiqueta": "De los días con x > 4, porcentaje con x < 10 (%)", "ayuda": ""}, {"id": "e", "etiqueta": "Coeficiente de variación (%)", "ayuda": ""}]'::jsonb),
  ('estadistica-D3', 'estadistica', 'descriptiva', 3, 'Consumo diario de agua en una curtiembre', 'El consumo diario de agua (en miles de litros) de una curtiembre responde a la distribución de frecuencias del cuadro (100 días). Usar varianza muestral (n-1).', 'Consumo  días
-------  ----
20-30    1   
30-40    15  
40-50    39  
50-60    32  
60-70    11  
70-80    2   ', '[{"id": "a", "etiqueta": "Consumo medio (miles de litros)", "ayuda": ""}, {"id": "b", "etiqueta": "Mediana (miles de litros)", "ayuda": ""}, {"id": "c", "etiqueta": "Porcentaje de días con consumo menor a 50 (%)", "ayuda": ""}, {"id": "d", "etiqueta": "Coeficiente de variación (%)", "ayuda": ""}]'::jsonb),
  ('estadistica-D4', 'estadistica', 'descriptiva', 4, 'Rendimiento de girasol', 'Se relevaron 200 establecimientos agropecuarios y se registró el rendimiento de girasol (kg/ha) de la última campaña. Usar varianza muestral (n-1).', 'Rendimiento  establecimientos
-----------  ----------------
1400-1500    2               
1500-1600    7               
1600-1700    26              
1700-1800    64              
1800-1900    57              
1900-2000    33              
2000-2100    10              
2100-2200    1               ', '[{"id": "a", "etiqueta": "Rendimiento promedio (kg/ha)", "ayuda": ""}, {"id": "b", "etiqueta": "Desvío estándar (kg/ha)", "ayuda": ""}, {"id": "c", "etiqueta": "Porcentaje de establecimientos que superó 2000 kg/ha (%)", "ayuda": ""}, {"id": "d", "etiqueta": "Rendimiento garantizado para el 95,5 % de los establecimientos (kg/ha)", "ayuda": "Es el percentil que deja el 4,5 % por debajo"}, {"id": "e", "etiqueta": "Coeficiente de variación (%)", "ayuda": ""}]'::jsonb),
  ('estadistica-D5', 'estadistica', 'descriptiva', 5, 'Sueldos y valores extremos (outlier)', 'Los sueldos (en miles de pesos) de 10 empleados de una empresa son: 90, 92, 95, 97, 100, 102, 105, 108, 110 y 800 (el gerente). Se quiere elegir una medida de posición para describir el sueldo típico.', null, '[{"id": "a", "etiqueta": "Media (miles de $)", "ayuda": ""}, {"id": "b", "etiqueta": "Mediana (miles de $)", "ayuda": ""}, {"id": "c", "etiqueta": "Media sin contar al gerente (miles de $)", "ayuda": ""}]'::jsonb),
  ('estadistica-D6', 'estadistica', 'descriptiva', 6, 'Bebés que empiezan a caminar (datos sin agrupar)', 'La serie informa la cantidad de meses que tenían 25 bebés de una guardería cuando empezaron a andar solos: 12, 14, 9, 16, 15, 11, 14, 13, 15, 14, 12, 17, 14, 15, 14, 12, 10, 12, 16, 15, 14, 13, 14, 15, 14. Usar varianza muestral (n-1).', null, '[{"id": "a", "etiqueta": "Media (meses)", "ayuda": ""}, {"id": "b", "etiqueta": "Mediana (meses)", "ayuda": ""}, {"id": "c", "etiqueta": "Moda (meses)", "ayuda": ""}, {"id": "d", "etiqueta": "Desvío estándar (meses)", "ayuda": ""}]'::jsonb),
  ('estadistica-P1', 'estadistica', 'probabilidad', 7, 'Bolillas con y sin reposición', 'Una caja contiene 7 bolillas blancas y 3 rojas. Se extraen dos bolillas.', null, '[{"id": "a", "etiqueta": "CON reposición: probabilidad de que ambas sean blancas", "ayuda": ""}, {"id": "b", "etiqueta": "CON reposición: probabilidad de que ambas sean del mismo color", "ayuda": ""}, {"id": "c", "etiqueta": "SIN reposición: probabilidad de que al menos una sea roja", "ayuda": ""}, {"id": "d", "etiqueta": "SIN reposición: probabilidad de que ambas sean blancas", "ayuda": ""}]'::jsonb),
  ('estadistica-P2', 'estadistica', 'probabilidad', 8, 'Lectores de dos diarios', 'En una ciudad se publican dos diarios A y B. El 42 % de los habitantes lee A, el 25 % lee B y el 5 % lee ambos.', null, '[{"id": "a", "etiqueta": "Porcentaje de personas que lee algún diario (%)", "ayuda": ""}, {"id": "b", "etiqueta": "De los que leen diarios, porcentaje que lee B (%)", "ayuda": ""}, {"id": "c", "etiqueta": "Si se eligen 3 personas al azar, probabilidad de que las 3 lean diarios", "ayuda": ""}, {"id": "d", "etiqueta": "Porcentaje de personas que lee SÓLO A (%)", "ayuda": ""}]'::jsonb),
  ('estadistica-P3', 'estadistica', 'probabilidad', 9, 'Cuentas en dos bancos', 'En una localidad hay dos bancos A y B. El 22 % de los habitantes tiene cuenta en A, el 37 % en B y el 47 % no tiene cuenta en ninguno.', null, '[{"id": "a", "etiqueta": "Porcentaje que tiene cuenta en ambos bancos (%)", "ayuda": ""}, {"id": "b", "etiqueta": "De los que tienen cuenta en A, porcentaje que también tiene en B (%)", "ayuda": ""}, {"id": "c", "etiqueta": "De los que tienen alguna cuenta, porcentaje que tiene cuenta en B (%)", "ayuda": ""}]'::jsonb),
  ('estadistica-P4', 'estadistica', 'probabilidad', 10, 'Dos cajas: probabilidad total y Bayes', 'La caja C1 contiene 7 bolillas blancas y 3 rojas; la caja C2 tiene 8 blancas y 12 rojas. Se elige una caja al azar y se extrae una bolilla.', null, '[{"id": "a", "etiqueta": "Probabilidad de que la bolilla sea blanca", "ayuda": ""}, {"id": "b", "etiqueta": "Si la bolilla es blanca, probabilidad de haber elegido C1", "ayuda": ""}]'::jsonb),
  ('estadistica-P5', 'estadistica', 'probabilidad', 11, 'Dos cajas y una bolilla apartada', 'Una caja tiene 3 bolillas blancas y 7 rojas; otra tiene 12 blancas y 8 rojas. Se elige una caja al azar, se extrae una bolilla y, sin mirarla, se la deja aparte. Luego se extrae otra bolilla de la misma caja.', null, '[{"id": "a", "etiqueta": "Probabilidad de que esta última bolilla sea blanca", "ayuda": ""}, {"id": "b", "etiqueta": "Si es blanca, probabilidad de haber elegido la primera caja", "ayuda": ""}, {"id": "c", "etiqueta": "Si es blanca, probabilidad de haber elegido la primera caja Y haber dejado aparte una blanca", "ayuda": ""}]'::jsonb),
  ('estadistica-P6', 'estadistica', 'probabilidad', 12, 'Test para una enfermedad de caballos', 'Un análisis para detectar una enfermedad equina da positivo en el 95 % de los enfermos y negativo en el 99 % de los sanos. Se sabe que el 4 % de la población caballar padece la enfermedad. Se analiza un caballo al azar.', null, '[{"id": "a", "etiqueta": "Probabilidad de que el análisis dé positivo", "ayuda": ""}, {"id": "b", "etiqueta": "Si dio positivo, probabilidad de que esté realmente enfermo", "ayuda": ""}, {"id": "c", "etiqueta": "Si dio negativo, probabilidad de que esté realmente sano", "ayuda": ""}]'::jsonb),
  ('estadistica-P7', 'estadistica', 'probabilidad', 13, 'Tres urnas encadenadas (árbol)', 'La urna 1 tiene 3 bolillas rojas y 7 blancas; la urna 2 tiene 4 rojas y 6 blancas; la urna 3 tiene 2 rojas y 8 blancas. Se extrae una bolilla de la urna 1. Si es blanca, la segunda extracción se hace de la urna 2; si es roja, se hace de la urna 3.', null, '[{"id": "a", "etiqueta": "Probabilidad de que la SEGUNDA bolilla sea roja", "ayuda": ""}, {"id": "b", "etiqueta": "Sabiendo que las dos bolillas fueron del mismo color, probabilidad de que ambas sean blancas", "ayuda": ""}]'::jsonb),
  ('estadistica-P8', 'estadistica', 'probabilidad', 14, 'Probabilidades a partir de P(A), P(B) y P(A∩B)', 'Dados dos sucesos con P(A) = 1/2, P(B) = 1/3 y P(A∩B) = 1/4, calcular:', null, '[{"id": "a", "etiqueta": "P(A | B)", "ayuda": ""}, {"id": "b", "etiqueta": "P(B | A)", "ayuda": ""}, {"id": "c", "etiqueta": "P(A ∪ B)", "ayuda": ""}, {"id": "d", "etiqueta": "P(no A | no B)", "ayuda": ""}, {"id": "e", "etiqueta": "P(no B | no A)", "ayuda": ""}]'::jsonb),
  ('estadistica-P9', 'estadistica', 'probabilidad', 15, 'Clientes, cuenta corriente y antigüedad', 'De los clientes de una empresa, el 70 % no tiene cuenta corriente, el 60 % tiene menos de 3 años de antigüedad y de éstos, el 20 % tiene cuenta corriente.', null, '[{"id": "a", "etiqueta": "Porcentaje que tiene cuenta corriente o menos de 3 años (%)", "ayuda": ""}, {"id": "b", "etiqueta": "De los que tienen cuenta corriente, porcentaje con menos de 3 años (%)", "ayuda": ""}, {"id": "c", "etiqueta": "De los que tienen 3 años o más, porcentaje con cuenta corriente (%)", "ayuda": ""}]'::jsonb),
  ('estadistica-P10', 'estadistica', 'probabilidad', 16, 'Bolilla que pasa de una caja a otra', 'La caja C1 contiene 3 bolillas negras y 5 blancas; la caja C2 tiene 1 negra y 9 blancas. Se toma C1, se extrae una bolilla y, sin mirarla, se la introduce en C2. Luego se extrae una bolilla al azar de C2.', null, '[{"id": "a", "etiqueta": "Probabilidad de que la bolilla extraída de C2 sea negra", "ayuda": ""}, {"id": "b", "etiqueta": "Si es negra, probabilidad de que la bolilla pasada de C1 a C2 haya sido blanca", "ayuda": ""}]'::jsonb),
  ('estadistica-V1', 'estadistica', 'discreta', 17, 'Media y varianza de una variable discreta', 'Una variable aleatoria discreta X toma los valores 1, 2, 3 y 4 con probabilidades 0,2; 0,4; 0,3 y 0,1 respectivamente (por ejemplo, clientes que llegan a una estación de servicio en un lapso).', 'x  p(x)
-  ----
1  0.2 
2  0.4 
3  0.3 
4  0.1 ', '[{"id": "a", "etiqueta": "Esperanza E(X)", "ayuda": ""}, {"id": "b", "etiqueta": "Varianza V(X)", "ayuda": ""}, {"id": "c", "etiqueta": "Desvío estándar", "ayuda": ""}, {"id": "d", "etiqueta": "P(X ≥ 3)", "ayuda": ""}, {"id": "e", "etiqueta": "F(2) = P(X ≤ 2)", "ayuda": ""}]'::jsonb),
  ('estadistica-V2', 'estadistica', 'discreta', 18, 'Hallar la constante de una función de probabilidad', 'Una variable discreta r toma los valores 0, 1, 2 y 3 con probabilidades P(r) = a / 2^r.', null, '[{"id": "a", "etiqueta": "Constante a", "ayuda": ""}, {"id": "b", "etiqueta": "Media", "ayuda": ""}, {"id": "c", "etiqueta": "Desvío estándar", "ayuda": ""}, {"id": "d", "etiqueta": "P(r ≤ 1)", "ayuda": ""}]'::jsonb),
  ('estadistica-V3', 'estadistica', 'discreta', 19, 'Constante k y distribución acumulada', 'La probabilidad de que una variable X tome el valor x (x = 1, 2, 3, 4) es proporcional a x: P(X = x) = k·x.', null, '[{"id": "a", "etiqueta": "Constante k", "ayuda": ""}, {"id": "b", "etiqueta": "Esperanza E(X)", "ayuda": ""}, {"id": "c", "etiqueta": "Varianza V(X)", "ayuda": ""}, {"id": "d", "etiqueta": "P(X ≥ 3)", "ayuda": ""}]'::jsonb),
  ('estadistica-B1', 'estadistica', 'binomial', 20, 'Control de latas de gaseosa', 'Un proceso no debe producir más del 1 % de latas defectuosas. Se lo controla examinando una muestra de 10 latas y si alguna resulta fallada se detiene el proceso para revisarlo.', null, '[{"id": "a", "etiqueta": "Si el proceso trabaja realmente al 1 %, probabilidad de revisarlo innecesariamente", "ayuda": ""}, {"id": "b", "etiqueta": "Cantidad mínima de latas a probar (en vez de 10) para que la probabilidad de detectar un proceso que trabaja al 10 % sea 0,95", "ayuda": ""}, {"id": "c", "etiqueta": "Con ese nuevo tamaño de muestra, probabilidad de revisar innecesariamente (proceso al 1 %)", "ayuda": ""}]'::jsonb),
  ('estadistica-B2', 'estadistica', 'binomial', 21, 'Muestra de 15 piezas con 10 % de defectuosas', 'Un proceso tecnológico produce piezas con un 10 % de defectuosas. Se toma una muestra de 15 piezas.', null, '[{"id": "a", "etiqueta": "Probabilidad de encontrar 2 o menos defectuosas", "ayuda": ""}, {"id": "b", "etiqueta": "Probabilidad de encontrar exactamente 2 defectuosas", "ayuda": ""}, {"id": "c", "etiqueta": "Probabilidad de encontrar menos de 12 piezas buenas", "ayuda": ""}]'::jsonb),
  ('estadistica-B3', 'estadistica', 'binomial', 22, 'Inspección imperfecta', 'Un proceso trabaja con un 15 % de defectuosas y produce 10 unidades diarias. Al final del día se separan las defectuosas, pero la inspección es imperfecta: hay una probabilidad constante 0,1 de considerar buena a una unidad defectuosa.', null, '[{"id": "a", "etiqueta": "Probabilidad de separar 3 o más unidades defectuosas en un día", "ayuda": ""}, {"id": "b", "etiqueta": "Esa misma probabilidad si la inspección fuera perfecta", "ayuda": ""}, {"id": "c", "etiqueta": "Media del número de defectuosas separadas en un mes (22 días hábiles)", "ayuda": ""}, {"id": "d", "etiqueta": "Desvío estándar de las defectuosas separadas en un mes", "ayuda": ""}]'::jsonb),
  ('estadistica-B4', 'estadistica', 'binomial', 23, 'Piezas hasta encontrar la segunda defectuosa (Pascal)', 'En un control de calidad se examinan piezas hasta encontrar la segunda defectuosa. El proceso trabaja con un 20 % de defectuosas. ¿Cuál es la probabilidad de tener que revisar…', null, '[{"id": "a", "etiqueta": "…8 piezas o menos?", "ayuda": ""}, {"id": "b", "etiqueta": "…12 piezas o más?", "ayuda": ""}, {"id": "c", "etiqueta": "…exactamente 12 piezas?", "ayuda": ""}]'::jsonb),
  ('estadistica-B5', 'estadistica', 'binomial', 24, 'Pedido de 10 piezas buenas', 'Para fabricar un pedido de 10 piezas buenas se usa una máquina con 30 % de defectuosas. Se fabrican piezas hasta completar las 10 buenas. ¿Cuál es la probabilidad de que sea necesario fabricar más de 14 piezas?', null, '[{"id": "a", "etiqueta": "P(fabricar más de 14 piezas para conseguir 10 buenas)", "ayuda": ""}, {"id": "b", "etiqueta": "Cantidad promedio de piezas a fabricar (esperanza de Pascal r/p)", "ayuda": ""}, {"id": "c", "etiqueta": "P(fabricar exactamente 12 piezas)", "ayuda": ""}]'::jsonb),
  ('estadistica-B6', 'estadistica', 'binomial', 25, 'Envíos con retraso (probabilidad total + binomial)', 'Una empresa de mensajería reparte con tres tipos de vehículos: 40 % de los envíos con motos (5 % de retraso), 35 % con autos (3 % de retraso) y el resto con camiones (7 % de retraso).', null, '[{"id": "a", "etiqueta": "Probabilidad de que un envío cualquiera tenga retraso", "ayuda": ""}, {"id": "b", "etiqueta": "En una muestra de 100 envíos, probabilidad de que haya como máximo 6 retrasos", "ayuda": ""}, {"id": "c", "etiqueta": "En esos 100 envíos, cantidad esperada de retrasos", "ayuda": ""}]'::jsonb),
  ('estadistica-B7', 'estadistica', 'binomial', 26, 'Lectura de F y G (Binomial y Pascal)', 'Calcular con calculadora o GeoGebra. Notación de la cátedra: F = P(X ≤ x) y G = P(X ≥ x). Binomial b(r/n; p) cuenta éxitos en n pruebas; Pascal pa(n/r; p) cuenta pruebas hasta el r-ésimo éxito.', null, '[{"id": "a", "etiqueta": "G_b(3/10; 0,25) = P(X ≥ 3), con X ~ Binomial(n=10; p=0,25)", "ayuda": ""}, {"id": "b", "etiqueta": "F_b(4/12; 0,45) = P(X ≤ 4), con X ~ Binomial(n=12; p=0,45)", "ayuda": ""}, {"id": "c", "etiqueta": "F_pa(12/5; 0,42) = P(N ≤ 12), con N ~ Pascal(r=5; p=0,42)", "ayuda": ""}, {"id": "d", "etiqueta": "P_pa(7/5; 0,80) = P(N = 7), con N ~ Pascal(r=5; p=0,80)", "ayuda": ""}]'::jsonb),
  ('estadistica-H1', 'estadistica', 'hiper', 27, 'Cargamento de 40 elementos', 'Un cargamento contiene 40 elementos. Se seleccionan al azar y se prueban 5. Si dos o más están defectuosos, se devuelve el cargamento.', null, '[{"id": "a", "etiqueta": "Si el cargamento tiene 5 defectuosos, probabilidad de que sea aceptado", "ayuda": ""}, {"id": "b", "etiqueta": "Si el cargamento tiene 10 defectuosos, probabilidad de que NO sea aceptado", "ayuda": ""}, {"id": "c", "etiqueta": "Con 10 defectuosos, cantidad esperada de defectuosos en la muestra", "ayuda": ""}]'::jsonb),
  ('estadistica-H2', 'estadistica', 'hiper', 28, 'Tornillos: hipergeométrica y después binomial', 'Un lote contiene 50 tornillos, de los cuales 8 son defectuosos. Un inspector selecciona 5 tornillos al azar y el lote se acepta si en la muestra aparece como máximo 1 tornillo defectuoso.', null, '[{"id": "a", "etiqueta": "Probabilidad de aceptar el lote", "ayuda": ""}, {"id": "b", "etiqueta": "Si se revisan 20 lotes con el mismo criterio, probabilidad de que se acepten al menos 18", "ayuda": ""}]'::jsonb),
  ('estadistica-H3', 'estadistica', 'hiper', 29, 'Rechazo de cajas con una pieza defectuosa', 'El control de recepción toma una muestra de 2 unidades de cada caja de 10 y rechaza la caja si encuentra alguna defectuosa. El proveedor entregó 15 cajas con una pieza defectuosa en cada una.', null, '[{"id": "a", "etiqueta": "Probabilidad de que se rechace UNA caja", "ayuda": ""}, {"id": "b", "etiqueta": "Probabilidad de que le rechacen menos de 3 cajas (de las 15)", "ayuda": ""}]'::jsonb),
  ('estadistica-H4', 'estadistica', 'hiper', 30, 'Dos cajas sin identificar (hipergeométrica + Bayes)', 'Se compraron piezas de repuesto y se colocaron en dos cajas iguales de 65 unidades: una tiene 8 piezas de segunda calidad y la otra 5. Por una confusión las cajas no quedaron identificadas. Al tomar una muestra de 5 piezas de una de las cajas se encontró 1 pieza de segunda calidad.', null, '[{"id": "a", "etiqueta": "Probabilidad de observar exactamente 1 pieza de segunda en la muestra si la caja es la de 8", "ayuda": ""}, {"id": "b", "etiqueta": "Probabilidad de observar exactamente 1 pieza de segunda en la muestra si la caja es la de 5", "ayuda": ""}, {"id": "c", "etiqueta": "Probabilidad de que la muestra provenga de la caja con 5 piezas de segunda", "ayuda": ""}]'::jsonb),
  ('estadistica-H5', 'estadistica', 'hiper', 31, 'Dos inspectores: hipergeométrica vs. hiperPascal', 'Las cajas de 65 unidades contienen 5 piezas de segunda calidad. El inspector A toma una muestra de 5 unidades y rechaza la caja si encuentra alguna de segunda. El inspector B va sacando piezas hasta encontrar la SEGUNDA de segunda calidad y acepta la caja si necesita sacar más de 5 piezas (rechaza si necesita 5 o menos).', null, '[{"id": "a", "etiqueta": "Porcentaje de cajas rechazadas por A (%)", "ayuda": ""}, {"id": "b", "etiqueta": "Porcentaje de cajas rechazadas por B (%)", "ayuda": ""}, {"id": "c", "etiqueta": "Si una caja fue rechazada y cada inspector revisa la mitad de las cajas, probabilidad de que haya sido inspeccionada por B", "ayuda": ""}]'::jsonb),
  ('estadistica-H6', 'estadistica', 'hiper', 32, 'Urna con reposición nula: hasta la 2.ª roja', 'Una urna tiene 12 bolillas, 5 rojas y 7 blancas. Se extraen bolillas SIN reposición hasta obtener la segunda roja.', null, '[{"id": "a", "etiqueta": "Probabilidad de que la segunda roja aparezca justo en la 4.ª extracción", "ayuda": ""}, {"id": "b", "etiqueta": "Probabilidad de necesitar 5 extracciones o menos", "ayuda": ""}, {"id": "c", "etiqueta": "Menor cantidad de extracciones posible", "ayuda": ""}]'::jsonb),
  ('estadistica-K1', 'estadistica', 'continua', 33, 'Densidad cuadrática', 'Una variable aleatoria continua tiene función de densidad f(x) = a·x² + 0,5 para 0 ≤ x ≤ 1 (y 0 en el resto).', null, '[{"id": "a", "etiqueta": "Constante a", "ayuda": ""}, {"id": "b", "etiqueta": "P(X < 0,5)", "ayuda": ""}, {"id": "c", "etiqueta": "Si un valor elegido al azar fue mayor que 0,5, probabilidad de que sea mayor que 0,75", "ayuda": ""}]'::jsonb),
  ('estadistica-K2', 'estadistica', 'continua', 34, 'Densidad por tramos y luego una binomial', 'Una variable aleatoria continua tiene densidad f(x) = 1,2·x para 0 ≤ x ≤ 1 y f(x) = 3m − m·x para 1 ≤ x ≤ 3 (y 0 en el resto).', null, '[{"id": "a", "etiqueta": "Constante m", "ayuda": ""}, {"id": "b", "etiqueta": "Media de x", "ayuda": ""}, {"id": "c", "etiqueta": "Varianza de x", "ayuda": ""}, {"id": "d", "etiqueta": "P(X < 2,5 | X > 2)", "ayuda": ""}, {"id": "e", "etiqueta": "Si se eligen 15 valores al azar, probabilidad de que 4 o más sean mayores que 2", "ayuda": ""}]'::jsonb),
  ('estadistica-K3', 'estadistica', 'continua', 35, 'Proporción diaria de unidades defectuosas', 'La proporción diaria de unidades defectuosas de una fábrica es una variable aleatoria con función de distribución F(x) = 1 − (1 − x)^20, con dominio 0 ≤ x ≤ 1.', null, '[{"id": "a", "etiqueta": "Densidad en x = 0,05: f(0,05)", "ayuda": "Primero derivá F para obtener f"}, {"id": "b", "etiqueta": "Media", "ayuda": ""}, {"id": "c", "etiqueta": "Mediana", "ayuda": ""}, {"id": "d", "etiqueta": "P(X > 0,1)", "ayuda": ""}]'::jsonb),
  ('estadistica-W1', 'estadistica', 'vida', 36, 'Cable plástico: dos proveedores exponenciales', 'La longitud entre fallas consecutivas de un cable plástico tiene distribución exponencial. El proveedor A entrega el 70 % y su longitud media entre fallas es de 170 m; el proveedor B entrega el resto y su longitud media entre fallas es de 200 m. Se eligió un rollo al azar de 250 m de longitud.', null, '[{"id": "a", "etiqueta": "Probabilidad de que un rollo de 250 m elegido al azar no tenga fallas", "ayuda": ""}, {"id": "b", "etiqueta": "Sabiendo que no se encontraron fallas en el rollo, probabilidad de que sea del proveedor A", "ayuda": ""}]'::jsonb),
  ('estadistica-W2', 'estadistica', 'vida', 37, 'Baterías con vida Weibull', 'La vida útil de unas baterías es aleatoria, con distribución Weibull de parámetro de escala β = 60 horas y parámetro de forma ω = 3 (x en horas).', null, '[{"id": "a", "etiqueta": "Duración que debe especificarse para tener la seguridad de que será superada por el 95 % de las baterías (horas)", "ayuda": ""}, {"id": "b", "etiqueta": "De las que duran más de 50 horas, porcentaje que dura menos de 60 horas", "ayuda": ""}]'::jsonb),
  ('estadistica-W3', 'estadistica', 'vida', 38, 'Lámparas de dos proveedores (Weibull)', 'Dos proveedores, A y B, suministran lámparas cuya duración es Weibull con ω = 3; β se expresa en horas y vale 80 para el proveedor A y 95 para el B. A suministra el 70 % y B el resto, y están mezcladas en el depósito en esas proporciones.', null, '[{"id": "a", "etiqueta": "Si se elige una al azar, probabilidad de que dure más de 90 horas", "ayuda": ""}, {"id": "b", "etiqueta": "Se eligió una al azar y hace 88 horas que funciona: probabilidad de que sea del proveedor A", "ayuda": ""}, {"id": "c", "etiqueta": "La lámpara elegida duró exactamente 89,4 horas: probabilidad de que sea del proveedor A", "ayuda": "Es la parte difícil: acá no alcanza con G"}]'::jsonb),
  ('estadistica-W4', 'estadistica', 'vida', 39, 'Vida de los varones (Gumbel del mínimo)', 'La vida de los varones de un país sigue una distribución Gumbel del mínimo (θ = moda, β = escala). La media es de 70,1 años y se sabe que el 8 % supera los 80 años. Usá C = 0,5772 para la esperanza.', null, '[{"id": "a", "etiqueta": "Parámetro θ (años)", "ayuda": ""}, {"id": "b", "etiqueta": "Parámetro β (años)", "ayuda": ""}, {"id": "c", "etiqueta": "Porcentaje de los varones que supera los 65 años", "ayuda": ""}]'::jsonb),
  ('estadistica-N1', 'estadistica', 'normal', 40, 'Consumo mensual de combustible', 'En una planta industrial el consumo mensual de combustible es una variable aleatoria con distribución normal de media 20.000 litros y desvío estándar 2.500 litros.', null, '[{"id": "a", "etiqueta": "Porcentaje de los meses en que se consume menos de 24.000 litros", "ayuda": ""}, {"id": "b", "etiqueta": "Porcentaje de los meses en que se consume más de 18.000 litros", "ayuda": ""}, {"id": "c", "etiqueta": "Porcentaje de los meses en que se consume entre 18.000 y 24.000 litros", "ayuda": ""}, {"id": "d", "etiqueta": "Capacidad del tanque para satisfacer el consumo mensual con 95 % de confiabilidad (litros)", "ayuda": ""}, {"id": "e", "etiqueta": "Consumo superado en el 90 % de los meses (litros)", "ayuda": ""}, {"id": "f", "etiqueta": "De los meses en que se consume menos de 24.000 litros, porcentaje en que se consume menos que la media", "ayuda": ""}, {"id": "g", "etiqueta": "De los meses en que se consume menos de 24.000 litros, porcentaje en que se consume más de 18.000", "ayuda": ""}, {"id": "h", "etiqueta": "De los meses en que se consume más de 18.000 litros, porcentaje en que se consume menos de 24.000", "ayuda": ""}, {"id": "i", "etiqueta": "Con el tanque de d) lleno todos los meses, probabilidad de que en un año haya algún mes en que no alcance", "ayuda": ""}]'::jsonb),
  ('estadistica-N2', 'estadistica', 'normal', 41, 'Peso de los novillos (hallar μ y σ)', 'En un establecimiento agropecuario, el 10 % de los novillos que salen a la venta pesan más de 500 kg y el 7 % pesan menos de 410 kg. El peso es una variable normal.', null, '[{"id": "a", "etiqueta": "Peso superado por el 15 % de los novillos (kg)", "ayuda": ""}, {"id": "b", "etiqueta": "Probabilidad de que en una jaula de 25 novillos haya alguno con peso inferior a 400 kg", "ayuda": ""}]'::jsonb),
  ('estadistica-N3', 'estadistica', 'normal', 42, 'Saldos de cuentas de ahorro (log-normal)', 'Los saldos de las cuentas de ahorro de un banco tienen una media de U$s 120 y un desvío estándar de U$s 85 (distribución log-normal).', null, '[{"id": "a", "etiqueta": "Porcentaje de los saldos que es superior a U$s 140", "ayuda": ""}, {"id": "b", "etiqueta": "De los saldos superiores a la media, porcentaje que supera los U$s 140", "ayuda": ""}, {"id": "c", "etiqueta": "Saldo superado por el 90 % de las cuentas (U$s)", "ayuda": ""}, {"id": "d", "etiqueta": "Mediana de los saldos (U$s)", "ayuda": ""}]'::jsonb),
  ('estadistica-N4', 'estadistica', 'normal', 43, 'Ventas mensuales', 'Las ventas mensuales de un producto son una variable normal de media U$s 60.000 y desvío estándar U$s 5.000.', null, '[{"id": "a", "etiqueta": "Porcentaje de los meses en que las ventas exceden U$s 70.000", "ayuda": ""}, {"id": "b", "etiqueta": "Si la empresa necesita vender por lo menos U$s 49.000 por mes para cubrir sus gastos fijos, porcentaje de los meses en que no los cubre", "ayuda": ""}, {"id": "c", "etiqueta": "Venta superada con probabilidad 0,20 (U$s)", "ayuda": ""}]'::jsonb),
  ('estadistica-S1', 'estadistica', 'poisson', 44, 'Conmutador telefónico', 'Un conmutador telefónico recibe en promedio 600 llamadas por hora y puede hacer como máximo 20 conexiones en un minuto dado.', null, '[{"id": "a", "etiqueta": "Cantidad esperada de llamadas en un minuto (m = λ·t)", "ayuda": "Pasá λ a llamadas por minuto"}, {"id": "b", "etiqueta": "Probabilidad de que su capacidad sea superada en un minuto dado", "ayuda": ""}, {"id": "c", "etiqueta": "Probabilidad de que en un minuto lleguen exactamente 10 llamadas", "ayuda": ""}]'::jsonb),
  ('estadistica-S2', 'estadistica', 'poisson', 45, 'Rollos de tela que terminan en la 2.ª falla (Gamma)', 'El proceso de fabricación de una tela genera en promedio 1 falla cada 100 metros. La longitud de cada rollo queda determinada por la aparición de la segunda falla, de modo que todos los rollos tienen una falla.', null, '[{"id": "a", "etiqueta": "Porcentaje de los rollos con longitudes inferiores a 150 metros", "ayuda": ""}, {"id": "b", "etiqueta": "Longitud superada por el 90 % de los rollos (m)", "ayuda": ""}, {"id": "c", "etiqueta": "Longitud superada por el 10 % de los rollos (m)", "ayuda": ""}, {"id": "d", "etiqueta": "Longitud mediana (m)", "ayuda": ""}, {"id": "e", "etiqueta": "Longitud modal (m)", "ayuda": ""}]'::jsonb),
  ('estadistica-S3', 'estadistica', 'poisson', 46, 'Pedidos a un comercio mayorista', 'A un comercio mayorista llegan en promedio 7 pedidos por día.', null, '[{"id": "a", "etiqueta": "Probabilidad de que transcurran más de 2 días para los próximos 10 pedidos", "ayuda": ""}, {"id": "b", "etiqueta": "Tiempo medio hasta el décimo pedido (días)", "ayuda": ""}]'::jsonb),
  ('estadistica-S4', 'estadistica', 'poisson', 47, 'Fallas del cable: ¿equipo nuevo o viejo? (Poisson + Bayes)', 'Un fabricante de cable plástico bajó el promedio de fallas de 2 cada 1.000 m (equipo viejo) a 1 cada 1.000 m (equipo nuevo). Su competidor tenía el equipo viejo y, con probabilidad 0,6, ya instaló uno nuevo igual al del fabricante. Para cerciorarse, el fabricante compra 2.000 m de la competencia y encuentra 5 fallas.', null, '[{"id": "a", "etiqueta": "Probabilidad de encontrar exactamente 5 fallas en 2.000 m si el competidor tiene el equipo nuevo", "ayuda": ""}, {"id": "b", "etiqueta": "Con esa información, probabilidad de que el competidor haya instalado el equipo nuevo", "ayuda": ""}]'::jsonb)
on conflict (id) do update set tema = excluded.tema, orden = excluded.orden, titulo = excluded.titulo,
  enunciado = excluded.enunciado, datos = excluded.datos, partes = excluded.partes;

insert into ejercicios_num_clave (ejercicio_id, claves, resolucion) values
  ('estadistica-D1', '[{"id": "a", "valor": 59.3, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 58.9773, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 58.3333, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "d", "valor": 6.6597, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "e", "valor": 54.5536, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "f", "valor": 11.2305, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'Tabla auxiliar (marca de clase xi, F acumulada): n = 75, ancho A = 5.
Media = Σ xi·fi / n = 4447,5 / 75 = 59,30 min.
Mediana: n/2 = 37,5 cae en la clase 55-60 (F anterior = 20, f = 22): Me = 55 + (37,5 − 20)/22 · 5 = 58,98.
Moda: clase modal 55-60 (f = 22): Mo = 55 + (22−14)/((22−14)+(22−18)) · 5 = 58,33.
Varianza = Σ fi(xi − x̄)² / (n−1) = 3282 / 74 = 44,35; desvío = √ = 6,66 min.
Q1: n/4 = 18,75 cae en 50-55 (F ant. = 6, f = 14): Q1 = 50 + (18,75 − 6)/14 · 5 = 54,55.
CV = s / x̄ · 100 = 6,66 / 59,3 · 100 = 11,23 % → menor a 20 %: datos homogéneos, la media es representativa.'),
  ('estadistica-D2', '[{"id": "a", "valor": 6.4625, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 2.8081, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 97.5, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "d", "valor": 84.6154, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "e", "valor": 43.4521, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'n = 160. Media = Σ xi·fi / n = 6,46 %; desvío muestral = 2,81 %.
P(x > 2): en la ojiva, hasta 2 hay 4 días → 1 − 4/160 = 97,5 %.
Condicional: P(x<10 | x>4) = P(4 < x < 10) / P(x > 4). Hasta 4 hay 30 días, hasta 10 hay 140:
  (140 − 30) / (160 − 30) = 110 / 130 = 84,62 %  ← se restringe el espacio muestral a los días con x > 4.
CV = 2,81 / 6,46 · 100 = 43,45 % > 20 % → datos heterogéneos.'),
  ('estadistica-D3', '[{"id": "a", "valor": 49.3, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 48.7179, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 55.0, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "d", "valor": 19.8187, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'n = 100, A = 10. Media = Σ xi·fi / n = 4930 / 100 = 49,3 (49.300 litros).
Mediana: n/2 = 50 cae en 40-50 (F ant. = 16, f = 39): Me = 40 + (50 − 16)/39 · 10 = 48,718.
P(x < 50) = F(50)/n = (1 + 15 + 39)/100 = 55 %.
CV = 9,771 / 49,3 · 100 = 19,82 % → está en el rango 5-20 %: la media es representativa.'),
  ('estadistica-D4', '[{"id": "a", "valor": 1805.5, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 123.8809, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 5.5, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "d", "valor": 1600.0, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "e", "valor": 6.8613, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'n = 200. Media = 1805,5 kg/ha; desvío muestral = 123,88.
P(x > 2000) = 1 − F(2000)/n = 1 − 189/200 = 5,5 %  (hasta 2000 se acumulan 2+7+26+64+57+33 = 189).
''Garantizado para el 95,5 %'' = el valor que el 95,5 % supera = percentil 4,5 %: posición 0,045·200 = 9 → cae en 1600-1700
(F ant. = 9, f = 26): X = 1600 + (9 − 9)/26 · 100 = 1600 kg/ha.
CV = 123,88 / 1805,5 · 100 = 6,86 % → homogéneo.'),
  ('estadistica-D5', '[{"id": "a", "valor": 169.9, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 101.0, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 99.8889, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'Media = 1699 / 10 = 169,9: 9 de 10 cobran entre 90 y 110, así que la media NO es representativa.
Mediana (n par): promedio de los dos valores centrales (100 y 102) = 101.
Sin el gerente: 899 / 9 = 99,89.
Regla: con valores extremos usá la mediana (es robusta); la media se ''tira'' hacia el outlier.
Moda < mediana < media → asimetría positiva (cola a la derecha).'),
  ('estadistica-D6', '[{"id": "a", "valor": 13.6, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 14.0, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 14.0, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "d", "valor": 1.893, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'n = 25. Media = Σx / n = 340 / 25 = 13,60.
Mediana: se ordenan los datos; con n impar es el valor central (posición 13) = 14.
Moda: el valor más repetido (14 aparece 8 veces) = 14.
Varianza muestral = Σ(x − x̄)² / (n−1) = 3,583; desvío = 1,893 meses.
Con datos SIN agrupar no hace falta tabla ni interpolación: se trabaja directamente con los valores.'),
  ('estadistica-P1', '[{"id": "a", "valor": 0.49, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.58, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.533333, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "d", "valor": 0.466667, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Con reposición los sucesos son independientes: la caja queda igual.
a) P(BB) = 7/10 · 7/10 = 0,49.
b) P(BB) + P(RR) = 0,49 + 3/10 · 3/10 = 0,58.
Sin reposición la segunda extracción depende de la primera (queda una bolilla menos):
d) P(BB) = 7/10 · 6/9 = 7/15 = 0,4667.
c) ''Al menos una roja'' = 1 − P(ninguna roja) = 1 − P(BB) = 1 − 7/15 = 8/15 = 0,5333.
Truco: ''al menos uno'' casi siempre se resuelve por el complemento.'),
  ('estadistica-P2', '[{"id": "a", "valor": 62.0, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 40.322581, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.238328, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "d", "valor": 37.0, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'a) Suma de eventos compatibles: P(A∪B) = P(A) + P(B) − P(A∩B) = 0,42 + 0,25 − 0,05 = 0,62 → 62 %.
b) Condicional: P(B | A∪B) = P(B) / P(A∪B) = 0,25 / 0,62 = 40,32 %  (B está contenido en A∪B).
c) Independencia entre personas: 0,62³ = 0,2383.
d) Sólo A = P(A) − P(A∩B) = 0,42 − 0,05 = 37 %.'),
  ('estadistica-P3', '[{"id": "a", "valor": 6.0, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 27.272727, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 69.811321, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, '''No tiene cuenta'' = 47 % → tiene al menos una = 53 % = P(A∪B).
a) P(A∩B) = P(A) + P(B) − P(A∪B) = 22 + 37 − 53 = 6 %.
b) P(B | A) = P(A∩B) / P(A) = 6 / 22 = 27,27 %.
c) P(B | A∪B) = P(B) / P(A∪B) = 37 / 53 = 69,81 %.
Consejo: armá la tabla de doble entrada (A/no A × B/no B) y completala con los totales.'),
  ('estadistica-P4', '[{"id": "a", "valor": 0.55, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.636364, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'a) Probabilidad total: P(B) = P(C1)·P(B|C1) + P(C2)·P(B|C2) = 0,5·0,7 + 0,5·0,4 = 0,55.
b) Bayes (te dan el resultado y preguntan por el origen):
   P(C1 | B) = P(C1)·P(B|C1) / P(B) = 0,35 / 0,55 = 7/11 = 0,6364.
Patrón: ''elige al azar entre A y B y después...'' → total para el resultado, Bayes para ''si salió X, ¿de dónde vino?''.'),
  ('estadistica-P5', '[{"id": "a", "valor": 0.45, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.333333, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.074074, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Trampa clásica: la bolilla apartada sin mirar NO cambia la probabilidad de la siguiente (por simetría es como
si la segunda fuera la primera). Con la caja 1: P(2ª blanca) = 3/10 = 0,3; con la caja 2: 12/20 = 0,6.
a) P(blanca) = 0,5·0,3 + 0,5·0,6 = 0,45.
b) Bayes: P(C1 | blanca) = 0,5·0,3 / 0,45 = 1/3 = 0,3333.
c) Caso particular ''apartó blanca y sacó blanca'' en la caja 1: 3/10 · 2/9 = 1/15. Se divide por P(blanca):
   0,5 · (1/15) / 0,45 = 2/27 = 0,0741.'),
  ('estadistica-P6', '[{"id": "a", "valor": 0.0476, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.798319, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.9979, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Definí: E = enfermo (0,04), S = sano (0,96). P(+|E) = 0,95 y P(−|S) = 0,99 → P(+|S) = 0,01.
a) P(+) = 0,04·0,95 + 0,96·0,01 = 0,038 + 0,0096 = 0,0476.
b) Bayes: P(E|+) = 0,038 / 0,0476 = 0,7983. Aunque el test es ''muy bueno'', sólo ~80 % de los positivos están enfermos
   porque la enfermedad es rara.
c) P(S|−) = 0,96·0,99 / (1 − 0,0476) = 0,9504 / 0,9524 = 0,9979.'),
  ('estadistica-P7', '[{"id": "a", "valor": 0.34, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.875, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Armá el árbol: 1ª blanca (7/10) → urna 2; 1ª roja (3/10) → urna 3.
a) P(2ª roja) = 7/10 · 4/10 + 3/10 · 2/10 = 0,28 + 0,06 = 0,34.
b) Condicional: P(BB | mismo color) = P(BB) / P(BB ó RR).
   P(BB) = 7/10 · 6/10 = 0,42; P(RR) = 3/10 · 2/10 = 0,06 → 0,42 / 0,48 = 7/8 = 0,875.'),
  ('estadistica-P8', '[{"id": "a", "valor": 0.75, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.5, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.583333, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "d", "valor": 0.625, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "e", "valor": 0.833333, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Armá la tabla: P(A∩B) = 1/4; P(A∩B'') = 1/2 − 1/4 = 1/4; P(A''∩B) = 1/3 − 1/4 = 1/12;
P(A''∩B'') = 1 − 7/12 = 5/12.
a) P(A|B) = P(A∩B)/P(B) = (1/4)/(1/3) = 3/4.   b) P(B|A) = (1/4)/(1/2) = 1/2.
c) P(A∪B) = 1/2 + 1/3 − 1/4 = 7/12 = 0,5833.
d) P(A''|B'') = P(A''∩B'')/P(B'') = (5/12)/(2/3) = 5/8 = 0,625.   e) P(B''|A'') = (5/12)/(1/2) = 5/6 = 0,8333.
¿Independientes? P(A)·P(B) = 1/6 ≠ 1/4 → NO son independientes.'),
  ('estadistica-P9', '[{"id": "a", "valor": 78.0, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 40.0, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 45.0, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Datos: P(sin CC) = 0,70 → P(CC) = 0,30. P(<3) = 0,60. P(CC | <3) = 0,20 → P(CC ∩ <3) = 0,60 · 0,20 = 0,12.
a) P(CC ∪ <3) = 0,30 + 0,60 − 0,12 = 0,78 → 78 %.
b) P(<3 | CC) = 0,12 / 0,30 = 40 %.
c) P(CC | ≥3) = (0,30 − 0,12) / 0,40 = 45 %.
Ojo: el 20 % es condicional (CC dentro de los de menos de 3 años); no es la probabilidad de la intersección.'),
  ('estadistica-P10', '[{"id": "a", "valor": 0.125, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.454545, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Dos casos según lo que pasó a C2 (que ahora tiene 11 bolillas):
 · pasó negra (3/8): C2 queda con 2 negras → P(negra) = 2/11.
 · pasó blanca (5/8): C2 queda con 1 negra → P(negra) = 1/11.
a) P(negra) = 3/8 · 2/11 + 5/8 · 1/11 = 11/88 = 1/8 = 0,125.
b) Bayes: P(pasó blanca | negra) = (5/8 · 1/11) / (1/8) = 5/11 = 0,4545.'),
  ('estadistica-V1', '[{"id": "a", "valor": 2.3, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 0.81, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 0.9, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "d", "valor": 0.4, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "e", "valor": 0.6, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Validez: p(x) ≥ 0 y Σ p(x) = 0,2 + 0,4 + 0,3 + 0,1 = 1 ✓.
E(X) = Σ x·p(x) = 1·0,2 + 2·0,4 + 3·0,3 + 4·0,1 = 2,30.
V(X) = E(X²) − [E(X)]² = (1·0,2 + 4·0,4 + 9·0,3 + 16·0,1) − 2,3² = 6,1 − 5,29 = 0,81.
σ = √0,81 = 0,9.
P(X ≥ 3) = 0,3 + 0,1 = 0,4.   F(2) = P(X ≤ 2) = 0,2 + 0,4 = 0,6.'),
  ('estadistica-V2', '[{"id": "a", "valor": 0.533333, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.733333, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.928559, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "d", "valor": 0.8, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'a) La suma tiene que dar 1: a·(1 + 1/2 + 1/4 + 1/8) = a·15/8 = 1 → a = 8/15 = 0,5333.
b) Media = Σ r·P(r) = a·(0 + 1/2 + 2/4 + 3/8) = a·11/8 = 11/15 = 0,7333.
c) E(r²) = a·(0 + 1/2 + 4/4 + 9/8) = a·21/8 = 1,4; V = 1,4 − 0,7333² = 0,8622; σ = 0,9286.
d) P(r ≤ 1) = P(0) + P(1) = a·(1 + 0,5) = 0,8.'),
  ('estadistica-V3', '[{"id": "a", "valor": 0.1, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 3.0, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 1.0, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "d", "valor": 0.7, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'a) Σ k·x = k·(1+2+3+4) = 10k = 1 → k = 0,1.
b) E(X) = Σ x·(0,1·x) = 0,1·(1 + 4 + 9 + 16) = 3,0.
c) E(X²) = 0,1·(1 + 8 + 27 + 64) = 10 → V = 10 − 3² = 1,0.
d) P(X ≥ 3) = 0,3 + 0,4 = 0,7.'),
  ('estadistica-B1', '[{"id": "a", "valor": 0.095618, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 29.0, "tol_abs": 0.01, "tol_rel": 0.0, "alt_pct": false}, {"id": "c", "valor": 0.252828, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Binomial: X = defectuosas en la muestra, n = 10, p = 0,01. ''Revisar'' = encontrar al menos una: X ≥ 1.
a) P(X ≥ 1) = 1 − P(0) = 1 − 0,99¹⁰ = 0,0956.
b) Proceso al 10 %: P(revisar) = 1 − 0,9ⁿ ≥ 0,95 → 0,9ⁿ ≤ 0,05 → n ≥ ln 0,05 / ln 0,9 = 28,4 → n = 29.
c) Con n = 29 y p = 1 %: 1 − 0,99²⁹ = 0,2528.
Idea: ''al menos uno'' = 1 − P(cero). Cuando piden ''cuántas pruebas'', se despeja n.'),
  ('estadistica-B2', '[{"id": "a", "valor": 0.815939, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.266896, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.055556, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'X = defectuosas ~ Binomial(n = 15, p = 0,10).
a) P(X ≤ 2) = F_b(2/15; 0,10) = 0,8159.
b) P(X = 2) = C(15,2)·0,1²·0,9¹³ = 105 · 0,01 · 0,2542 = 0,2669.
c) ''Menos de 12 buenas'' = 11 buenas o menos = 4 o MÁS defectuosas: P(X ≥ 4) = 1 − P(X ≤ 3) = 0,0556.
Traducción: ''menos de 12 buenas'' ⇔ ''más de 3 defectuosas''. Siempre convertí a la variable que estás modelando.'),
  ('estadistica-B3', '[{"id": "a", "valor": 0.142447, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.179804, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 29.7, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "d", "valor": 5.06858, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'Una unidad se SEPARA sólo si es defectuosa (0,15) Y el inspector la detecta (0,90): p = 0,15·0,9 = 0,135.
a) X ~ Binomial(10; 0,135): P(X ≥ 3) = 0,1424.
b) Inspección perfecta (p = 0,15): P(X ≥ 3) = 0,1798.
c) En un mes son n = 22·10 = 220 ensayos: E = n·p = 220·0,135 = 29,7.
d) σ = √(n·p·(1−p)) = √(220·0,135·0,865) = 5,0686.'),
  ('estadistica-B4', '[{"id": "a", "valor": 0.496684, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.322123, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.047245, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'N = piezas hasta la 2ª defectuosa ~ Pascal(r = 2; p = 0,20). Dominio: N ≥ 2.
c) P(N = 12) = C(11,1)·0,2²·0,8¹⁰ = 11 · 0,04 · 0,1074 = 0,0472.
a) P(N ≤ 8) = F_pa(8/2; 0,2) = 0,4967.
b) P(N ≥ 12) = 1 − P(N ≤ 11) = 0,3221.
Relación con la binomial: N ≤ 8 ⇔ ''en 8 pruebas hay 2 o más defectuosas'' = P(Bin(8; 0,2) ≥ 2) = 0,4967 (mismo número).'),
  ('estadistica-B5', '[{"id": "a", "valor": 0.415799, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 14.285714, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 0.139825, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'N = piezas fabricadas hasta la 10ª buena ~ Pascal(r = 10; p = 0,70) (''éxito'' = pieza buena).
a) P(N > 14) = 1 − F_pa(14/10; 0,7) = 0,4158.
   Equivale a: en 14 piezas hay a lo sumo 9 buenas = P(Bin(14; 0,7) ≤ 9).
b) E(N) = r/p = 10/0,7 = 14,29.
c) P(N = 12) = C(11,9)·0,7¹⁰·0,3² = 55 · 0,02825 · 0,09 = 0,1398.'),
  ('estadistica-B6', '[{"id": "a", "valor": 0.048, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.795006, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 4.8, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'Problema en DOS pasos (muy típico de parcial):
1) Probabilidad total: p = 0,40·0,05 + 0,35·0,03 + 0,25·0,07 = 0,02 + 0,0105 + 0,0175 = 0,048.
2) Con ese p, contar retrasos en 100 envíos independientes → Binomial(n = 100; p = 0,048).
b) P(X ≤ 6) = F_b(6/100; 0,048) = 0,7950.
c) E(X) = n·p = 100·0,048 = 4,8.
Por qué binomial: son 100 ensayos independientes, cada uno con la misma probabilidad p de ''éxito'' (retraso).'),
  ('estadistica-B7', '[{"id": "a", "valor": 0.474407, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.304432, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.617481, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "d", "valor": 0.196608, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'a) P(X ≥ 3) = 1 − P(X ≤ 2) = 0,4744.   b) Suma de P(0..4) = 0,3044.
c) P(N ≤ 12) con r = 5: 0,6175.   d) C(6,4)·0,8⁵·0,2² = 15 · 0,32768 · 0,04 = 0,1966.
Memorizá las traducciones: F = ''hasta'', G = ''desde''. G(r) = 1 − F(r−1).'),
  ('estadistica-H1', '[{"id": "a", "valor": 0.891223, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.366944, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 1.25, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'Se extrae SIN reposición de una población finita (N = 40) con R defectuosos → Hipergeométrica, n = 5.
P(X = r) = C(R,r)·C(N−R, n−r) / C(N,n).
a) R = 5, se acepta con menos de 2 defectuosos: P(X ≤ 1) = P(0) + P(1) = 0,4934 + 0,3979 = 0,8912.
b) R = 10, no se acepta con X ≥ 2: 1 − P(X ≤ 1) = 1 − 0,6331 = 0,3669.
c) E(X) = n·R/N = 5·10/40 = 1,25.'),
  ('estadistica-H2', '[{"id": "a", "valor": 0.824118, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.290737, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Paso 1 (dentro de un lote, sin reposición, N = 50, R = 8, n = 5 → Hipergeométrica):
a) P(X ≤ 1) = [C(8,0)·C(42,5) + C(8,1)·C(42,4)] / C(50,5) = 0,8241.
Paso 2 (ahora los LOTES son los ensayos: 20 lotes independientes, cada uno se acepta con p = 0,8241 → Binomial):
b) Y = lotes aceptados ~ Binomial(n = 20; p = 0,8241): P(Y ≥ 18) = G_b(18/20; p) = 0,2907.
Patrón: la probabilidad calculada en el paso 1 se convierte en el ''p'' del paso 2.'),
  ('estadistica-H3', '[{"id": "a", "valor": 0.2, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.398023, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'a) Hipergeométrica (N = 10, R = 1, n = 2): se rechaza si X ≥ 1 → 1 − P(0) = 1 − C(9,2)/C(10,2) = 1 − 36/45 = 0,20.
b) 15 cajas independientes, cada una rechazada con p = 0,2 → Binomial(n = 15; p = 0,2).
   P(menos de 3) = P(Y ≤ 2) = 0,3980.'),
  ('estadistica-H4', '[{"id": "a", "valor": 0.382581, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.295183, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.435524, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Cada caja es una población finita → Hipergeométrica (N = 65, n = 5, r = 1).
a) Caja con R = 8: P(X = 1) = C(8,1)·C(57,4) / C(65,5) = 0,3826.
b) Caja con R = 5: P(X = 1) = C(5,1)·C(60,4) / C(65,5) = 0,2952.
c) Bayes con a priori 1/2 y 1/2 (las cajas son iguales):
   P(caja de 5 | X=1) = 0,5·0,2952 / (0,5·0,3826 + 0,5·0,2952) = 0,4355.'),
  ('estadistica-H5', '[{"id": "a", "valor": 33.879103, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 4.360846, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.114039, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'A: cuenta éxitos en n = 5 fijo → Hipergeométrica (N = 65, R = 5, n = 5). Rechaza si X ≥ 1:
   1 − C(60,5)/C(65,5) = 33,88 %.
B: cuenta cuántas extracciones hasta el 2º éxito → HiperPascal (N = 65, R = 5, r = 2). Rechaza si n ≤ 5:
   P(n=2)+P(n=3)+P(n=4)+P(n=5) = 4,36 %   (equivale a ''en 5 piezas hay 2 o más'': hipergeométrica X ≥ 2).
c) Bayes: 0,5·0,0436 / (0,5·0,3388 + 0,5·0,0436) = 0,114.
Diferencia clave: fijo el tamaño de la muestra → hipergeométrica; fijo la cantidad de éxitos → hiperPascal.'),
  ('estadistica-H6', '[{"id": "a", "valor": 0.212121, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.752525, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 2.0, "tol_abs": 0.01, "tol_rel": 0.0, "alt_pct": false}]'::jsonb, '''Extraer hasta obtener r éxitos, sin reposición'' → HiperPascal (N = 12, R = 5, r = 2). Dominio: 2 ≤ n ≤ N − R + r = 9.
a) P(n = 4): en las primeras 3 hay exactamente 1 roja y la 4.ª es roja:
   [C(5,1)·C(7,2)/C(12,3)] · (5−1)/(12−3) = (105/220)·(4/9) = 0,2121.
b) P(n ≤ 5) = P(2)+P(3)+P(4)+P(5) = 0,7525  (equivale a P(hipergeométrica con 5 extracciones ≥ 2 rojas)).
c) Como mínimo se necesitan r = 2 extracciones.'),
  ('estadistica-K1', '[{"id": "a", "valor": 1.5, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 0.3125, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.602273, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'a) El área total tiene que valer 1: ∫₀¹ (a·x² + 0,5) dx = a/3 + 0,5 = 1 → a = 1,5.
   (No se iguala f(x) a 1: se iguala la INTEGRAL, el área.)
b) F(x) = ∫₀ˣ (1,5·t² + 0,5) dt = x³/2 + x/2.  P(X < 0,5) = F(0,5) = 0,0625 + 0,25 = 0,3125.
c) Condicional con áreas: P(X > 0,75 | X > 0,5) = G(0,75) / G(0,5) = (1 − 0,5859) / (1 − 0,3125) = 0,6023.'),
  ('estadistica-K2', '[{"id": "a", "valor": 0.2, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 1.0667, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 0.3622, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "d", "valor": 0.75, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "e", "valor": 0.055556, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'a) Área total = ∫₀¹ 1,2x dx + ∫₁³ (3m − mx) dx = 0,6 + 2m = 1 → m = 0,2. El 2.º tramo queda f(x) = 0,6 − 0,2x.
b) E(X) = ∫₀¹ 1,2x² dx + ∫₁³ x(0,6 − 0,2x) dx = 0,4 + 0,6667 = 1,0667 (= 16/15).
c) E(X²) = ∫₀¹ 1,2x³ dx + ∫₁³ x²(0,6 − 0,2x) dx = 0,3 + 1,2 = 1,5 → V(X) = 1,5 − 1,0667² = 0,3622 (= 163/450).
d) P(2 < X < 2,5) = ∫ (0,6 − 0,2x) dx entre 2 y 2,5 = 0,075;  P(X > 2) = 0,1 → 0,075 / 0,1 = 0,75.
e) Cada valor es ''> 2'' con p = P(X > 2) = 0,1, independientes → Y ~ B(15; 0,1): P(Y ≥ 4) = G_b(4/15; 0,1) = 0,0556.'),
  ('estadistica-K3', '[{"id": "a", "valor": 7.547072, "tol_abs": 0.02, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 0.047619, "tol_abs": 0.0003, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 0.034064, "tol_abs": 0.0003, "tol_rel": 0.01, "alt_pct": false}, {"id": "d", "valor": 0.121577, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'a) f(x) = F''(x) = 20(1 − x)^19.  f(0,05) = 20·0,95^19 = 7,547.
b) E(X) = ∫₀¹ x·20(1 − x)^19 dx. Con u = 1 − x: 20·∫₀¹ (1 − u)·u^19 du = 20·(1/20 − 1/21) = 1/21 = 0,0476.
c) F(x_e) = 0,5 → (1 − x_e)^20 = 0,5 → x_e = 1 − 0,5^(1/20) = 0,0341.
d) P(X > 0,1) = G(0,1) = 1 − F(0,1) = 0,9^20 = 0,1216.'),
  ('estadistica-W1', '[{"id": "a", "valor": 0.246805, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.651743, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, '''Sin fallas en 250 m'' = la longitud hasta la primera falla supera 250 m = G(250) = e^(−250/μ).
Con A: e^(−250/170) = 0,2298;  con B: e^(−250/200) = 0,2865.
a) Probabilidad total: 0,7·0,2298 + 0,3·0,2865 = 0,2468.
b) Bayes: P(A | sin fallas) = 0,7·0,2298 / 0,2468 = 0,6517.'),
  ('estadistica-W2', '[{"id": "a", "valor": 22.293151, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 34.380436, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'G(x) = e^(−(x/β)^ω) es la probabilidad de durar más que x.
a) ''Superada por el 95 %'' → G(x) = 0,95 → (x/60)³ = −ln 0,95 = 0,0513 → x = 60·0,0513^(1/3) = 22,29 horas.
b) Condicional: P(X < 60 | X > 50) = [G(50) − G(60)] / G(50).
   G(50) = e^(−(50/60)³) = 0,5606;  G(60) = e^(−1) = 0,3679.
   (0,5606 − 0,3679) / 0,5606 = 34,38 %.'),
  ('estadistica-W3', '[{"id": "a", "valor": 0.296743, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.577162, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.690121, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'a) Probabilidad total con G(x) = e^(−(x/β)³): 0,7·e^(−(90/80)³) + 0,3·e^(−(90/95)³) = 0,7·0,2408 + 0,3·0,4273 = 0,2967.
b) ''Hace 88 horas que funciona'' = duración MAYOR que 88 → se pondera con G(88):
   0,7·0,2642 / (0,7·0,2642 + 0,3·0,4517) = 0,5772.
c) ''Duró exactamente 89,4 h'' es un valor puntual → se pondera con la DENSIDAD f(x) = ω·(1/β)^ω·x^(ω−1)·e^(−(x/β)^ω):
   f_A(89,4) = 0,01160;  f_B(89,4) = 0,01215.
   0,7·f_A / (0,7·f_A + 0,3·f_B) = 0,6901.'),
  ('estadistica-W4', '[{"id": "a", "valor": 73.900072, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 6.58363, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 77.200714, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Datos: μ = θ − 0,5772·β = 70,1  y  G(80) = e^(−e^((80−θ)/β)) = 0,08.
De G(80): e^((80−θ)/β) = −ln 0,08 = 2,5257 → (80 − θ)/β = ln(2,5257) = 0,9265.
De la media: θ = 70,1 + 0,5772·β. Reemplazando: 80 − 70,1 − 0,5772·β = 0,9265·β → β = 9,9 / (0,9265 + 0,5772) = 6,5836 años; θ = 73,90 años.
c) G(65) = e^(−e^((65−θ)/β)) = e^(−e^(-1,3518)) = 0,7720 → 77,2 %.'),
  ('estadistica-N1', '[{"id": "a", "valor": 94.520071, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 78.81446, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 73.334531, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "d", "valor": 24112.134067, "tol_abs": 0.005, "tol_rel": 0.002, "alt_pct": false}, {"id": "e", "valor": 16796.121086, "tol_abs": 0.005, "tol_rel": 0.002, "alt_pct": false}, {"id": "f", "valor": 52.898818, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "g", "valor": 77.5862, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "h", "valor": 93.047051, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "i", "valor": 0.45964, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'z(24.000) = (24.000 − 20.000)/2.500 = 1,6;  z(18.000) = −0,8.
a) F(1,6) = 0,9452 → 94,52 %.   b) 1 − F(−0,8) = F(0,8) = 0,7881 → 78,81 %.
c) F(1,6) − F(−0,8) = 0,7333 → 73,33 %.
d) Fractil de área 0,95: z = 1,645 → x = 20.000 + 1,645·2.500 = 24112,13 l.
e) El 90 % lo supera → área a la izquierda 0,10: z = −1,2816 → x = 20.000 − 1,2816·2.500 = 16796,12 l.
f) P(X<20.000)/P(X<24.000) = 0,5/0,9452 = 52,9 %.
g) 0,7333/0,9452 = 77,59 %.   h) 0,7333/0,7881 = 93,05 %.
i) Con ese tanque, en un mes no alcanza con p = 0,05 (12 ensayos independientes): P(al menos uno) = 1 − 0,95^12 = 0,4596.'),
  ('estadistica-N2', '[{"id": "a", "valor": 491.999313, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "b", "valor": 0.614005, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Hay que hallar μ y σ con los dos datos: ''más de 500'' deja 0,90 por debajo (z = 1,2816); ''menos de 410'' → z = -1,4758.
500 = μ + 1,2816·σ ;  410 = μ − 1,4758·σ  → σ = 90/2,7573 = 32,64 kg ;  μ = 458,17 kg.
a) Deja 0,85 por debajo: z = 1,0364 → x = 458,17 + 1,0364·32,64 = 492,0 kg.
b) Un novillo pesa menos de 400: z = (400 − 458,17)/32,64 = -1,78 → p = 0,0374.
   ''Alguno entre 25'' = al menos uno: 1 − (1 − 0,0374)^25 = 0,6140.'),
  ('estadistica-N3', '[{"id": "a", "valor": 28.754351, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 76.693404, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 43.249039, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "d", "valor": 97.922938, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'CV = 85/120 = 70,8 % (> 60 %): log-normal. Parámetros: D² = ln(1 + 0,7083²) = 0,4066 → D = 0,6377;  m = ln(120/√1,5017) = 4,5842.
a) z = (ln 140 − m)/D = (4,9416 − 4,5842)/0,6377 = 0,56 → 1 − F(z) = 28,75 %.
b) Condición X > 120: z = 0,319 → área derecha 0,3749.  0,2875/0,3749 = 76,69 %.
c) El 90 % lo supera → área izquierda 0,10 (z = -1,2816): ln x = m + z·D = 3,7670 → x = 43,25.
d) Mediana = e^m = 97,92 (la media, 120, queda por encima: cola larga a la derecha).'),
  ('estadistica-N4', '[{"id": "a", "valor": 2.275013, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 1.390345, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 64208.106168, "tol_abs": 0.005, "tol_rel": 0.002, "alt_pct": false}]'::jsonb, 'a) z = (70.000 − 60.000)/5.000 = 2 → 1 − F(2) = 2,28 %.
b) z = (49.000 − 60.000)/5.000 = −2,2 → F(−2,2) = 1,39 %.
c) ''Superada con prob. 0,20'' → área izquierda 0,80 (z = 0,8416) → x = 60.000 + 0,8416·5.000 = 64208,11.'),
  ('estadistica-S1', '[{"id": "a", "valor": 10.0, "tol_abs": 0.01, "tol_rel": 0.0, "alt_pct": false}, {"id": "b", "valor": 0.001588, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "c", "valor": 0.12511, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'Poisson: cuento llamadas en un tramo fijo. λ = 600/60 = 10 por minuto y t = 1 min → m = 10.
a) m = 10.
b) La capacidad se supera si llegan 21 o más: P(X ≥ 21) = 1 − F(20; m = 10) = 0,0016.
c) P(X = 10) = e^(−10)·10^10/10! = 0,1251.'),
  ('estadistica-S2', '[{"id": "a", "valor": 44.21746, "tol_abs": 0.06, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 53.181161, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "c", "valor": 388.972017, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "d", "valor": 167.834699, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}, {"id": "e", "valor": 100.0, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'Se fija la cantidad de fallas (r = 2) y la variable es la longitud hasta la 2.ª: Gamma con r = 2 y λ = 1/100 = 0,01 fallas/m.
a) Molina: ''rollo menor a 150 m'' = en 150 m hay al menos 2 fallas (m = 0,01·150 = 1,5): F_γ = G_po(2 / 1,5) = 1 − F_po(1 / 1,5) = 0,4422 → 44,22 %.
b) ''Superada por el 90 %'' → F_γ(x) = 0,10 → x = 53,18 m.
c) ''Superada por el 10 %'' → F_γ(x) = 0,90 → x = 388,97 m.
d) Mediana: F_γ(x) = 0,50 → x = 167,83 m.
e) Moda = (r − 1)/λ = 1/0,01 = 100 m.  (Moda 100 < mediana 167,8 < media r/λ = 200: asimetría positiva.)'),
  ('estadistica-S3', '[{"id": "a", "valor": 0.109399, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 1.428571, "tol_abs": 0.005, "tol_rel": 0.01, "alt_pct": false}]'::jsonb, 'Se fija la cantidad de pedidos (r = 10) y la variable es el tiempo hasta el 10.º: Gamma con λ = 7 por día.
a) P(X > 2) = G_γ(2/10; 7) = F_po(r − 1 / m = λ·x) = F_po(9 / m = 14) = 0,1094.
   (Tardar más de 2 días equivale a que en esos 2 días lleguen 9 pedidos o menos.)
b) E(X) = r/λ = 10/7 = 1,4286 días.'),
  ('estadistica-S4', '[{"id": "a", "valor": 0.036089, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}, {"id": "b", "valor": 0.257258, "tol_abs": 0.0006, "tol_rel": 0.01, "alt_pct": true}]'::jsonb, 'En 2.000 m, el equipo nuevo da m = 1·2 = 2 fallas esperadas y el viejo m = 2·2 = 4.
a) P(5 | nuevo) = e^(−2)·2^5/5! = 0,0361.   P(5 | viejo) = e^(−4)·4^5/5! = 0,1563.
b) Bayes: 0,6·0,0361 / (0,6·0,0361 + 0,4·0,1563) = 0,2573.')
on conflict (ejercicio_id) do update set claves = excluded.claves, resolucion = excluded.resolucion;
