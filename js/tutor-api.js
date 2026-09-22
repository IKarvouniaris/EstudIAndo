// Cliente para el tutor con IA (botón flotante del apunte). Requiere Auth.cliente inicializado.
window.TutorApi = (function () {
  "use strict";

  function preguntar(pregunta, contexto, historial, materia) {
    return Auth.cliente.functions
      .invoke("preguntar-apunte", { body: { pregunta: pregunta, contexto: contexto, historial: historial || [], materia: materia || "etica" } })
      .then(function (r) {
        if (r.error) {
          // El SDK sólo da un mensaje genérico ("Edge Function returned a non-2xx status code");
          // el motivo real (límite diario, error de Gemini, etc.) viene en el cuerpo de la respuesta.
          var ctx = r.error.context;
          if (ctx && typeof ctx.json === "function") {
            return ctx.json().then(function (b) { throw new Error(b && b.error ? b.error : r.error.message); }, function () { throw r.error; });
          }
          throw r.error;
        }
        return r.data.respuesta;
      });
  }

  return { preguntar: preguntar };
})();
