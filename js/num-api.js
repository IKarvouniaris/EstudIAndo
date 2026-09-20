// Cliente para los exámenes de resultado numérico (Estadística General y futuras materias de cálculo).
// La corrección vive en Postgres (fase6_estadistica.sql): el cliente nunca recibe las respuestas
// correctas hasta que el intento se finalizó. Requiere Auth.cliente ya inicializado.
window.NumApi = (function () {
  "use strict";

  function rpc(nombre, args) {
    return Auth.cliente.rpc(nombre, args).then(function (r) {
      if (r.error) throw r.error;
      return r.data;
    });
  }

  function cargarEjercicios(materia) {
    return Auth.cliente
      .from("ejercicios_num")
      .select("id,tema,orden,titulo,enunciado,datos,partes")
      .eq("materia", materia)
      .order("orden")
      .then(function (r) {
        if (r.error) throw r.error;
        return r.data;
      });
  }

  // "1.805,5" → 1805.5 · "0,25" → 0.25 · "45 %" → 45 · vacío/ilegible → null
  function leerNumero(texto) {
    var t = String(texto == null ? "" : texto).trim().replace(/\s+/g, "").replace(/%$/, "");
    if (!t) return null;
    if (t.indexOf(",") !== -1 && t.indexOf(".") !== -1) t = t.replace(/\./g, "").replace(",", ".");
    else t = t.replace(",", ".");
    if (!/^-?(\d+\.?\d*|\.\d+)(e-?\d+)?$/i.test(t)) return null;
    var n = Number(t);
    return isFinite(n) ? n : null;
  }

  function iniciarIntento(materia, cantidad) {
    return rpc("iniciar_intento_num", { p_materia: materia, p_cantidad: cantidad || 5 });
  }
  function guardarRespuesta(intentoId, ejercicioId, parte, valor) {
    return rpc("guardar_respuesta_num", { p_intento_id: intentoId, p_ejercicio_id: ejercicioId, p_parte: parte, p_valor: valor });
  }
  function finalizarIntento(intentoId) {
    return rpc("finalizar_intento_num", { p_intento_id: intentoId });
  }
  function verificar(ejercicioId, parte, valor) {
    return rpc("verificar_num", { p_ejercicio_id: ejercicioId, p_parte: parte, p_valor: valor });
  }
  function revelarResolucion(ejercicioId) {
    return rpc("revelar_resolucion_num", { p_ejercicio_id: ejercicioId });
  }
  function cooldownRestante(materia) {
    return rpc("cooldown_restante", { p_materia: materia });
  }
  function leaderboard() {
    return rpc("leaderboard_estadistica");
  }
  function dominioPropio() {
    return rpc("dominio_estadistica");
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
    leerNumero: leerNumero,
    iniciarIntento: iniciarIntento,
    guardarRespuesta: guardarRespuesta,
    finalizarIntento: finalizarIntento,
    verificar: verificar,
    revelarResolucion: revelarResolucion,
    cooldownRestante: cooldownRestante,
    leaderboard: leaderboard,
    dominioPropio: dominioPropio,
    historialPropio: historialPropio,
  };
})();
