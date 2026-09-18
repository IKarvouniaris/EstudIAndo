// Widget "Tu dominio por tema": barras de progreso montadas en un <div id="...">.
// Requiere Auth ya inicializado. Se usa en el apunte de cada materia con su
// propia función de carga (ExamenApi.dominioPropio / CodigoApi.dominioPropio).
window.DominioWidget = (function () {
  "use strict";

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function montar(idContenedor, cargarFn) {
    var cont = document.getElementById(idContenedor);
    if (!cont) return;

    function pintar(filas) {
      if (!filas || !filas.length) {
        cont.innerHTML = '<p class="dominio-vacio">Todavía no rendiste ningún examen puntuado — esto se llena con tu primer intento.</p>';
        return;
      }
      var h = "";
      filas.forEach(function (f) {
        var pct = Math.max(0, Math.min(100, f.dominio_pct || 0));
        h += '<div class="dominio-fila">' +
          '<div class="dominio-cab"><span>' + esc(f.tema) + '</span><b>' + pct + '%</b></div>' +
          '<div class="dominio-barra"><div class="dominio-relleno" style="width:' + pct + '%"></div></div>' +
          '<p class="dominio-nota">' + f.respondidas + ' respondidas en exámenes</p>' +
          '</div>';
      });
      cont.innerHTML = h;
    }

    function cargar() {
      cont.innerHTML = '<p class="dominio-vacio">Cargando…</p>';
      cargarFn().then(pintar).catch(function (err) {
        cont.innerHTML = '<p class="dominio-vacio error">Error cargando tu dominio: ' + esc(err.message) + '</p>';
      });
    }

    Auth.onCambioSesion(function (s) { if (s) cargar(); else cont.innerHTML = '<p class="dominio-vacio">Iniciá sesión arriba para ver tu dominio por tema.</p>'; });
    Auth.obtenerSesion().then(function (s) { if (s) cargar(); else cont.innerHTML = '<p class="dominio-vacio">Iniciá sesión arriba para ver tu dominio por tema.</p>'; });
  }

  return { montar: montar };
})();
