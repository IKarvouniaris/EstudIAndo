# Guiones para TikTok — Ética con Capu (piloto IAgram)

21 guiones de video, uno por cada post del piloto de Ética en IAgram
(`iagram.html`, rama `iagram-feed`). Cada uno trae el guion completo del
video y los prompts de imagen para generar las referencias visuales con
IA, que después se animan en Seedance.

**Empezá por [00-personaje-capu.md](00-personaje-capu.md)** — la ficha
del personaje (Capu, el mono capuchino bibliotecario-detective) y el
escenario base. Todos los prompts de imagen de los 21 guiones reutilizan
ese bloque de descripción para que Capu se vea igual en todos los videos.

## Flujo de trabajo sugerido

1. Generá 1-2 imágenes de referencia pura de Capu (solo el bloque de
   personaje, fondo neutro) para fijar cara y vestuario.
2. Por cada guion: generá las 3 imágenes de escena (investigación →
   explicación → cierre) con un generador de imágenes (Midjourney, SDXL,
   Flux, etc.), usando las referencias de Capu como guía de
   consistencia.
3. Cargá esas 3 imágenes en Seedance en el orden del guion para animar
   cada escena y armar el video completo.
4. Grabá o generá el audio con las líneas de diálogo de Capu (marcadas
   como `CAPU:` en cada guion) y montá todo junto.

## Los 21 guiones

### Clase 1 — Ética, teorías éticas y límites de la IA
- [c1-concepto.md](c1-concepto.md) — "¿Qué persona querés ser?" (ética de la virtud)
- [c1-trampa.md](c1-trampa.md) — "No es lo mismo" (virtud vs. deontología)
- [c1-caso.md](c1-caso.md) — "La alucinación que se volvió demanda" (Walters c/ OpenAI)

### Clase 2 — Principios éticos y conceptos técnicos
- [c2-concepto.md](c2-concepto.md) — "Elegir un número es elegir un error" (threshold)
- [c2-trampa.md](c2-trampa.md) — "No es un ajuste técnico"
- [c2-caso.md](c2-caso.md) — "Pedir el código, no solo el resultado" (BOSCO)

### Clase 3 — Regulación: del principio a la obligación
- [c3-concepto.md](c3-concepto.md) — "Dos roles, dos responsabilidades" (provider/deployer)
- [c3-trampa.md](c3-trampa.md) — "Ojo con esta lectura" (riesgo mínimo)
- [c3-caso.md](c3-caso.md) — "El Uber que no frenó"

### Clase 4 — Transparencia, explicabilidad, justicia y sesgos
- [c4-concepto.md](c4-concepto.md) — "La pregunta que sí sirve: ¿qué lo habría cambiado?" (contrafactual)
- [c4-trampa.md](c4-trampa.md) — "Esto no es una explicación"
- [c4-caso.md](c4-caso.md) — "Opaco, estadístico, y aun así válido" (Loomis/COMPAS)

### Clase 5 — Impacto social de la IA
- [c5-concepto.md](c5-concepto.md) — "Tener acceso no es tener oportunidad" (AI divide)
- [c5-trampa.md](c5-trampa.md) — "Delegar no es lo mismo que mejorar" (deskilling/upskilling)
- [c5-caso.md](c5-caso.md) — "Gestión algorítmica como subordinación" (Uber v. Aslam)

### Clase 6 — Protección de datos personales y derecho al olvido
- [c6-concepto.md](c6-concepto.md) — "Una ley de 2000 que ya hablaba de scoring" (art. 20)
- [c6-trampa.md](c6-trampa.md) — "No aplica a cualquier decisión automatizada"
- [c6-caso.md](c6-caso.md) — "Cuando lo verdadero deja de ser relevante" (Costeja)

### Clase 7 — Responsabilidad civil y penal en decisiones automatizadas
- [c7-concepto.md](c7-concepto.md) — "No hace falta probar que 'lo habría conseguido'" (pérdida de chance)
- [c7-trampa.md](c7-trampa.md) — "Cuidado con la certeza que no existe"
- [c7-caso.md](c7-caso.md) — "El sesgo que aprendió del propio historial" (Amazon)

## Notas

- El guion y los diálogos de Capu están en español; los prompts de
  imagen también, para que sean fáciles de leer y ajustar. Si el
  generador de imágenes que usás rinde mejor en inglés, traducí el
  prompt manteniendo el bloque de personaje de `00-personaje-capu.md`
  como base.
- Cada guion enlaza al post original en IAgram (`etica.html#cN`) para
  volver a chequear el contenido fuente si hace falta ajustar algo del
  guion.
- Pilotos de IA Conceptual, Python y Estadística: cuando esas materias
  tengan posts reales en IAgram, se puede repetir esta misma estructura
  (una carpeta o prefijo nuevo por materia, mismo personaje Capu o uno
  nuevo si se prefiere variar).
