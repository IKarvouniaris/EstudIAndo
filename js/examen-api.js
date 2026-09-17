// Cliente para el modo examen server-side (Fase 3). Requiere Auth.cliente ya inicializado.
window.ExamenApi = (function () {
  "use strict";

  function iniciarIntento(materia) {
    return Auth.cliente.rpc("iniciar_intento", { p_materia: materia }).then(function (r) {
      if (r.error) throw r.error;
      return r.data; // {intento_id, inicio_at, preguntas:[...]}
    });
  }

  function responderExamen(intentoId, preguntaId, opcion) {
    return Auth.cliente.rpc("responder_examen", { p_intento_id: intentoId, p_pregunta_id: preguntaId, p_opcion: opcion }).then(function (r) {
      if (r.error) throw r.error;
    });
  }

  function finalizarIntento(intentoId) {
    return Auth.cliente.rpc("finalizar_intento", { p_intento_id: intentoId }).then(function (r) {
      if (r.error) throw r.error;
      return r.data; // {puntaje, total, duracion_seg, detalle:[...]}
    });
  }

  function cooldownRestante(materia) {
    return Auth.cliente.rpc("cooldown_restante", { p_materia: materia }).then(function (r) {
      if (r.error) throw r.error;
      return r.data; // segundos
    });
  }

  function leaderboard() {
    return Auth.cliente.rpc("leaderboard_etica").then(function (r) {
      if (r.error) throw r.error;
      return r.data;
    });
  }

  function guardarDesarrollo(intentoId, casoId, texto) {
    return Auth.cliente.rpc("guardar_desarrollo", { p_intento_id: intentoId, p_caso_id: casoId, p_texto: texto }).then(function (r) {
      if (r.error) throw r.error;
    });
  }

  function historialPropio(materia) {
    // RLS ya restringe esto a las filas del usuario logueado, no hace falta filtrar por usuario acá.
    return Auth.cliente
      .from("intentos")
      .select("inicio_at, fin_at, puntaje, total, puntaje_final_pct")
      .eq("materia", materia).eq("modo", "examen").not("fin_at", "is", null)
      .order("fin_at", { ascending: true })
      .then(function (r) {
        if (r.error) throw r.error;
        return r.data;
      });
  }

  function corregirDesarrollo(intentoId) {
    return Auth.cliente.functions.invoke("corregir-desarrollo", { body: { intento_id: intentoId } }).then(function (r) {
      if (r.error) throw r.error;
      return r.data; // {criterios, devolucion, puntaje_desarrollo_pct, puntaje_final_pct}
    });
  }

  return {
    iniciarIntento: iniciarIntento,
    responderExamen: responderExamen,
    finalizarIntento: finalizarIntento,
    cooldownRestante: cooldownRestante,
    leaderboard: leaderboard,
    guardarDesarrollo: guardarDesarrollo,
    corregirDesarrollo: corregirDesarrollo,
    historialPropio: historialPropio,
  };
})();
