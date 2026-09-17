-- Generado por tools/seed_python.py — no editar a mano, volver a correr el script.
-- 6 ejercicios de código.

insert into ejercicios_codigo (id, materia, tema, titulo, enunciado, datos_trabajo, tareas) values
  ('python-A1', 'python', 'numpy', 'Ventas semanales vectorizadas', 'Trabajás con las ventas de una semana. Resolvé todo con operaciones vectorizadas de NumPy (nada de loops for explícitos).', 'unidades_vendidas = np.array([12, 15, 11, 18, 20, 17, 22])
precios_unitarios = np.array([1500, 1500, 1550, 1550, 1600, 1600, 1650])', '["Crear ambos arreglos con NumPy.", "Calcular el ingreso de cada día mediante multiplicación vectorizada.", "Calcular ingreso total, promedio diario y día de mayor ingreso.", "Aplicar un aumento vectorizado de 8% a los precios y mostrar los nuevos precios."]'::jsonb),
  ('python-A2', 'python', 'pandas', 'Filtrado de productos desde CSV', 'Tenés un archivo productos.csv con columnas producto,categoria,precio,stock. Cargalo con Pandas y filtrá lo que interesa para reposición.', 'productos.csv:
producto,categoria,precio,stock
Teclado,Perifericos,25000,12
Mouse,Perifericos,18000,0
Monitor,Monitores,210000,5
Webcam,Perifericos,48000,8
Notebook,Computacion,950000,3', '["Cargar productos.csv con Pandas.", "Seleccionar producto, precio y stock.", "Filtrar productos con precio mayor a 40000 y stock mayor a 0.", "Exportar el resultado como productos_disponibles.csv sin guardar el índice."]'::jsonb),
  ('python-A3', 'python', 'matplotlib', 'Gráfico de líneas de visitas', 'Tenés las visitas diarias de una semana a un sitio web. Comunicá la evolución semanal con un gráfico de líneas claro.', 'dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
visitas = [120, 150, 135, 180, 210, 260, 230]', '["Crear un gráfico de líneas con marcadores.", "Agregar título, etiquetas de ejes y cuadrícula.", "Destacar la evolución semanal con color azul.", "Mostrar el gráfico."]'::jsonb),
  ('python-B1', 'python', 'pandas', 'DataFrame de estudiantes', 'Armá un DataFrame de estudiantes y calculá si cada uno aprueba según promedio y asistencia.', 'Legajo | Nombre | Parcial1 | Parcial2 | Asistencia
1001 | Ana | 8 | 7 | 90
1002 | Bruno | 6 | 5 | 75
1003 | Carla | 9 | 10 | 95
1004 | Diego | 4 | 6 | 80
1005 | Elena | 7 | 8 | 85', '["Crear el DataFrame con Pandas.", "Crear la columna Promedio (promedio de Parcial1 y Parcial2).", "Crear la columna Estado con \"Aprueba\" si Promedio >= 6 y Asistencia >= 75; en otro caso, \"Revisa\".", "Mostrar Nombre, Promedio y Estado."]'::jsonb),
  ('python-B2', 'python', 'pandas', 'Lectura y transformación de pedidos JSON', 'Un archivo pedidos.json trae el importe como texto. Convertilo, quedate con lo entregado y exportá.', 'pedidos.json:
[
  {"pedido": 501, "cliente": "Ana", "estado": "entregado", "importe": "12500.50"},
  {"pedido": 502, "cliente": "Bruno", "estado": "pendiente", "importe": "8300.00"},
  {"pedido": 503, "cliente": "Carla", "estado": "entregado", "importe": "15600.75"},
  {"pedido": 504, "cliente": "Diego", "estado": "cancelado", "importe": "7200.00"}
]', '["Cargar pedidos.json.", "Convertir importe de texto a número decimal.", "Filtrar pedidos entregados.", "Calcular el total entregado.", "Exportar los pedidos entregados a un CSV llamado entregados.csv."]'::jsonb),
  ('python-B3', 'python', 'matplotlib', 'Barras de ventas por categoría', 'Comparar ventas entre categorías es un trabajo para un gráfico de barras. Destacá la categoría ganadora.', 'categorias = ["Libros", "Tecnología", "Hogar", "Deportes", "Moda"]
ventas = [85, 140, 110, 95, 125]', '["Crear un gráfico de barras verticales.", "Agregar título y etiquetas de ejes.", "Mostrar el valor sobre cada barra.", "Utilizar un color diferente para la barra de mayor venta."]'::jsonb);

insert into ejercicios_codigo_clave (ejercicio_id, solucion) values
  ('python-A1', 'import numpy as np

unidades_vendidas = np.array([12, 15, 11, 18, 20, 17, 22])
precios_unitarios = np.array([1500, 1500, 1550, 1550, 1600, 1600, 1650])

ingresos_diarios = unidades_vendidas * precios_unitarios
print("Ingresos diarios:", ingresos_diarios)

ingreso_total = np.sum(ingresos_diarios)
promedio_diario = np.mean(ingresos_diarios)
dia_mayor_ingreso = np.argmax(ingresos_diarios)
dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

print(f"Ingreso total: ${ingreso_total:,.2f}")
print(f"Promedio diario: ${promedio_diario:,.2f}")
print(f"Día de mayor ingreso: {dias[dia_mayor_ingreso]}")

precios_con_aumento = precios_unitarios * 1.08
print("Precios con 8% de aumento:", precios_con_aumento)'),
  ('python-A2', 'import pandas as pd

df = pd.read_csv("productos.csv")
print(df)

df_seleccion = df[[''producto'', ''precio'', ''stock'']]

df_filtrado = df_seleccion[(df_seleccion[''precio''] > 40000) & (df_seleccion[''stock''] > 0)]
print(df_filtrado)

df_filtrado.to_csv("productos_disponibles.csv", index=False)'),
  ('python-A3', 'import matplotlib.pyplot as plt

dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
visitas = [120, 150, 135, 180, 210, 260, 230]

plt.figure(figsize=(8, 5))
plt.plot(dias, visitas, marker=''o'', color=''blue'', linestyle=''-'', linewidth=2, markersize=6, label=''Visitas'')

plt.title("Evolución Semanal de Visitas", fontsize=14, fontweight=''bold'')
plt.xlabel("Días de la semana")
plt.ylabel("Cantidad de visitas")
plt.grid(True, linestyle=''--'', alpha=0.6)
plt.legend()

plt.tight_layout()
plt.show()'),
  ('python-B1', 'import pandas as pd

datos = {
    "Legajo": [1001, 1002, 1003, 1004, 1005],
    "Nombre": ["Ana", "Bruno", "Carla", "Diego", "Elena"],
    "Parcial1": [8, 6, 9, 4, 7],
    "Parcial2": [7, 5, 10, 6, 8],
    "Asistencia": [90, 75, 95, 80, 85],
}
df = pd.DataFrame(datos)

df["Promedio"] = (df["Parcial1"] + df["Parcial2"]) / 2

df["Estado"] = "Revisa"
df.loc[(df["Promedio"] >= 6) & (df["Asistencia"] >= 75), "Estado"] = "Aprueba"

print(df[["Nombre", "Promedio", "Estado"]])'),
  ('python-B2', 'import pandas as pd
import json

with open("pedidos.json", "r", encoding="utf-8") as f:
    datos = json.load(f)

df = pd.DataFrame(datos)
df["importe"] = pd.to_numeric(df["importe"], errors="coerce")

entregados = df[df["estado"] == "entregado"]

total_entregado = entregados["importe"].sum()
print(f"Total entregado: ${total_entregado:,.2f}")

entregados.to_csv("entregados.csv", index=False)'),
  ('python-B3', 'import matplotlib.pyplot as plt

categorias = ["Libros", "Tecnología", "Hogar", "Deportes", "Moda"]
ventas = [85, 140, 110, 95, 125]

colores = ["#4C72B0"] * len(ventas)
colores[ventas.index(max(ventas))] = "#DD8452"

fig, ax = plt.subplots(figsize=(8, 5))
barras = ax.bar(categorias, ventas, color=colores)

ax.set_title("Ventas por categoría")
ax.set_xlabel("Categoría")
ax.set_ylabel("Unidades vendidas")

for barra in barras:
    altura = barra.get_height()
    ax.annotate(str(altura), xy=(barra.get_x() + barra.get_width()/2, altura),
                xytext=(0, 3), textcoords="offset points", ha="center")

plt.tight_layout()
plt.show()');
