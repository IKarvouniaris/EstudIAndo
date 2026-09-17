// Requiere que config.js y el CDN de supabase-js se hayan cargado antes que este script.
window.Auth = (function () {
  "use strict";

  var cfg = window.ESTUDIANDO_CONFIG;
  var cliente = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);

  function entrarConGoogle() {
    return cliente.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href },
    });
  }

  function enviarMagicLink(email) {
    return cliente.auth.signInWithOtp({
      email: email,
      options: { emailRedirectTo: window.location.href },
    });
  }

  function salir() {
    return cliente.auth.signOut();
  }

  function obtenerSesion() {
    return cliente.auth.getSession().then(function (r) { return r.data.session; });
  }

  function onCambioSesion(callback) {
    cliente.auth.onAuthStateChange(function (_evento, sesion) { callback(sesion); });
  }

  return {
    cliente: cliente,
    entrarConGoogle: entrarConGoogle,
    enviarMagicLink: enviarMagicLink,
    salir: salir,
    obtenerSesion: obtenerSesion,
    onCambioSesion: onCambioSesion,
  };
})();
