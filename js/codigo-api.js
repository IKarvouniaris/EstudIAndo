// Cliente para el examen de código (Python y futuras materias con el mismo modelo).
// Requiere Auth.cliente ya inicializado.
window.CodigoApi = (function () {
  "use strict";

  function cargarEjercicios(materia) {
    return Auth.cliente
      .from("ejercicios_codigo")
      .select("id,tema,titulo,enunciado,datos_trabajo,tareas")
      .eq("materia", materia)
      .order("id")
      .then(function (r) {
        if (r.error) throw r.error;
        return r.data;
      });
  }

  function iniciarIntento(materia, cantidad) {
    return Auth.cliente.rpc("iniciar_intento_codigo", { p_materia: materia, p_cantidad: cantidad || 3 }).then(function (r) {
      if (r.error) throw r.error;
      return r.data; // {intento_id, inicio_at, ejercicios:[...]}
    });
  }

  function guardarCodigo(intentoId, ejercicioId, codigo) {
    return Auth.cliente.rpc("guardar_codigo", { p_intento_id: intentoId, p_ejercicio_id: ejercicioId, p_codigo: codigo }).then(function (r) {
      if (r.error) throw r.error;
    });
  }

  function finalizarIntento(intentoId) {
    return Auth.cliente.rpc("finalizar_intento_codigo", { p_intento_id: intentoId }).then(function (r) {
      if (r.error) throw r.error;
      return r.data;
    });
  }

  function corregirCodigo(intentoId) {
    return Auth.cliente.functions.invoke("corregir-codigo", { body: { intento_id: intentoId } }).then(function (r) {
      if (r.error) throw r.error;
      return r.data; // {resultados:[...], puntaje_final_pct}
    });
  }

  function revelarSolucion(ejercicioId) {
    return Auth.cliente.rpc("revelar_solucion_codigo", { p_ejercicio_id: ejercicioId }).then(function (r) {
      if (r.error) throw r.error;
      return r.data;
    });
  }

  function cooldownRestante(materia) {
    return Auth.cliente.rpc("cooldown_restante", { p_materia: materia }).then(function (r) {
      if (r.error) throw r.error;
      return r.data;
    });
  }

  function leaderboard() {
    return Auth.cliente.rpc("leaderboard_python").then(function (r) {
      if (r.error) throw r.error;
      return r.data;
    });
  }

  function historialPropio(materia) {
    return Auth.cliente
      .from("intentos")
      .select("inicio_at, fin_at, puntaje_final_pct")
      .eq("materia", materia).eq("modo", "examen").not("fin_at", "is", null)
      .order("fin_at", { ascending: true })
      .then(function (r) {
        if (r.error) throw r.error;
        return r.data;
      });
  }

  return {
    cargarEjercicios: cargarEjercicios,
    iniciarIntento: iniciarIntento,
    guardarCodigo: guardarCodigo,
    finalizarIntento: finalizarIntento,
    corregirCodigo: corregirCodigo,
    revelarSolucion: revelarSolucion,
    cooldownRestante: cooldownRestante,
    leaderboard: leaderboard,
    historialPropio: historialPropio,
  };
})();
