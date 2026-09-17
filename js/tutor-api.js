// Cliente para el tutor con IA (botón flotante del apunte). Requiere Auth.cliente inicializado.
window.TutorApi = (function () {
  "use strict";

  function preguntar(pregunta, contexto, historial, materia) {
    return Auth.cliente.functions
      .invoke("preguntar-apunte", { body: { pregunta: pregunta, contexto: contexto, historial: historial || [], materia: materia || "etica" } })
      .then(function (r) {
        if (r.error) throw r.error;
        return r.data.respuesta;
      });
  }

  return { preguntar: preguntar };
})();
