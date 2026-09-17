// Carga casos/preguntas públicos desde Supabase y expone las funciones de corrección
// server-side. Requiere que js/auth.js ya haya corrido (usa Auth.cliente).
window.SimulacroApi = (function () {
  "use strict";

  var MATERIA = "etica";
  var cacheModelo = {};

  function cargarCasos() {
    return Auth.cliente
      .from("casos")
      .select("id,bloque,u,nivel,ambito,titulo,escenario,conceptos,desarrollo_consigna,desarrollo_rubrica,preguntas(id,sub,texto,opciones)")
      .eq("materia", MATERIA)
      .order("id")
      .then(function (r) {
        if (r.error) throw r.error;
        return r.data.map(function (c) {
          c.preguntas.sort(function (a, b) { return a.sub < b.sub ? -1 : 1; });
          return {
            n: c.id,
            bloque: c.bloque,
            u: c.u,
            nivel: c.nivel,
            ambito: c.ambito,
            titulo: c.titulo,
            escenario: c.escenario,
            conceptos: c.conceptos,
            desarrollo: { consigna: c.desarrollo_consigna, rubrica: c.desarrollo_rubrica },
            preguntas: c.preguntas.map(function (p) {
              return { sub: p.sub, texto: p.texto, opciones: p.opciones, id: p.id };
            }),
          };
        });
      });
  }

  function responderPractica(preguntaId, opcion) {
    return Auth.cliente.rpc("responder_practica", { p_pregunta_id: preguntaId, p_opcion: opcion }).then(function (r) {
      if (r.error) throw r.error;
      return r.data; // {correcta, ok, explicacion, porque}
    });
  }

  function obtenerModelo(casoId) {
    if (cacheModelo[casoId]) return Promise.resolve(cacheModelo[casoId]);
    return Auth.cliente.rpc("modelo_desarrollo", { p_caso_id: casoId }).then(function (r) {
      if (r.error) throw r.error;
      cacheModelo[casoId] = r.data;
      return r.data;
    });
  }

  return { cargarCasos: cargarCasos, responderPractica: responderPractica, obtenerModelo: obtenerModelo };
})();
