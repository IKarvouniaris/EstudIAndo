/* Marca de estudIAndo: una «I» que es un lápiz coronado por una dona, y una «A» con un punto por materia.
   Uso: <i data-marca></i> en cualquier página (el tamaño sale de --marca-tam). Trae también un huevo de pascua:
   tocar la marca tres veces seguidas hace llover donas. Los colores salen de los tokens del sitio, así que
   sigue al modo claro/oscuro. Archivos de imagen: img/logo.svg, img/logo-claro.svg y favicon.svg. */
(function () {
  "use strict";

  var MARCA = '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><g transform="translate(-2.8 0)"><rect x="12" y="19" width="8" height="30" fill="var(--tinta,#15181A)"/><polygon points="12,49 20,49 16,57" fill="var(--tinta,#15181A)"/><path d="M8.7,13.5 a7.3,7.3 0 1,0 14.6,0 a7.3,7.3 0 1,0 -14.6,0 Z M13.5,13.5 a2.5,2.5 0 1,1 5,0 a2.5,2.5 0 1,1 -5,0 Z" fill="var(--dona-masa,#B9782C)" fill-rule="evenodd"/><path d="M9.6,13.5 a6.4,6.4 0 1,0 12.8,0 a6.4,6.4 0 1,0 -12.8,0 Z M13.5,13.5 a2.5,2.5 0 1,1 5,0 a2.5,2.5 0 1,1 -5,0 Z" fill="var(--dona-glaseado,#D8578A)" fill-rule="evenodd"/><rect x="16.39" y="8.82" width="2.30" height="0.90" rx="0.45" fill="var(--u1,#2E3A94)" transform="rotate(-35 17.54 9.27)"/><rect x="19.31" y="12.42" width="2.30" height="0.90" rx="0.45" fill="var(--u2,#9A5A12)" transform="rotate(27 20.46 12.87)"/><rect x="17.62" y="16.60" width="2.30" height="0.90" rx="0.45" fill="var(--u3,#1B6A5B)" transform="rotate(87 18.77 17.05)"/><rect x="12.60" y="16.95" width="2.30" height="0.90" rx="0.45" fill="var(--u4,#6D3470)" transform="rotate(155 13.75 17.40)"/><rect x="10.52" y="11.81" width="2.30" height="0.90" rx="0.45" fill="var(--u5,#5B3FC4)" transform="rotate(231 11.67 12.26)"/><polygon points="38,12 46,12 60,58 52.5,58 42,23.5 31.5,58 24,58" fill="var(--tinta,#15181A)"/><circle cx="35.8" cy="50" r="1.5" fill="var(--u1,#2E3A94)"/><circle cx="38.9" cy="50" r="1.5" fill="var(--u2,#9A5A12)"/><circle cx="42" cy="50" r="1.5" fill="var(--u3,#1B6A5B)"/><circle cx="45.1" cy="50" r="1.5" fill="var(--u4,#6D3470)"/><circle cx="48.2" cy="50" r="1.5" fill="var(--u5,#5B3FC4)"/></g></svg>';
  var DONA = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M0.7,8 a7.3,7.3 0 1,0 14.6,0 a7.3,7.3 0 1,0 -14.6,0 Z M5.5,8 a2.5,2.5 0 1,1 5,0 a2.5,2.5 0 1,1 -5,0 Z" fill="#D9A05B" fill-rule="evenodd"/><path d="M1.6,8 a6.4,6.4 0 1,0 12.8,0 a6.4,6.4 0 1,0 -12.8,0 Z M5.5,8 a2.5,2.5 0 1,1 5,0 a2.5,2.5 0 1,1 -5,0 Z" fill="#EE8FB5" fill-rule="evenodd"/><rect x="8.49" y="3.35" width="2.10" height="0.85" rx="0.42" fill="#909EF0" transform="rotate(-35 9.54 3.77)"/><rect x="11.41" y="6.95" width="2.10" height="0.85" rx="0.42" fill="#E2A95B" transform="rotate(27 12.46 7.37)"/><rect x="9.72" y="11.12" width="2.10" height="0.85" rx="0.42" fill="#4FC7AC" transform="rotate(87 10.77 11.55)"/><rect x="4.70" y="11.47" width="2.10" height="0.85" rx="0.42" fill="#D39AD6" transform="rotate(155 5.75 11.90)"/><rect x="2.62" y="6.33" width="2.10" height="0.85" rx="0.42" fill="#A98BFF" transform="rotate(231 3.67 6.76)"/></svg>';

  var CSS =
    ':root{--dona-masa:#B9782C; --dona-glaseado:#D8578A}' +
    ':root[data-tema="oscuro"]{--dona-masa:#D9A05B; --dona-glaseado:#EE8FB5}' +
    '[data-marca]{display:inline-block; width:var(--marca-tam,2rem); height:var(--marca-tam,2rem); font-style:normal; vertical-align:middle; flex:0 0 auto; cursor:pointer; -webkit-tap-highlight-color:transparent}' +
    '[data-marca] svg{display:block; width:100%; height:100%; overflow:visible}' +
    '.lluvia-donas{position:fixed; inset:0; overflow:hidden; pointer-events:none; z-index:9999}' +
    '.lluvia-donas i{position:absolute; top:-60px; display:block; animation:cae-dona linear forwards}' +
    '.lluvia-donas svg{display:block; width:100%; height:100%}' +
    '@keyframes cae-dona{from{transform:translateY(0) rotate(0deg)} to{transform:translateY(calc(100vh + 120px)) rotate(540deg)}}' +
    '.mmm-dona{position:fixed; left:50%; bottom:1.4rem; transform:translateX(-50%); z-index:9999; padding:.5rem .9rem; background:var(--tinta,#15181A); color:var(--papel,#EDEEE9); font:600 .9rem/1.2 var(--display,sans-serif); border-radius:2px}';

  function estilos() {
    if (document.getElementById("marca-estilos")) return;
    var s = document.createElement("style");
    s.id = "marca-estilos"; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Dona(s) cayendo de arriba. Con «reducir movimiento» no hay lluvia: sólo un cartelito.
  function lluvia() {
    estilos();
    var quieta = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieta) {
      var t = document.createElement("div");
      t.className = "mmm-dona"; t.textContent = "Mmm… donas";
      document.body.appendChild(t);
      setTimeout(function () { t.remove(); }, 2200);
      return;
    }
    var cont = document.createElement("div");
    cont.className = "lluvia-donas"; cont.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 34; i++) {
      var e = document.createElement("i");
      var tam = 22 + Math.random() * 30;
      e.style.cssText = "left:" + (Math.random() * 96).toFixed(1) + "%; width:" + tam.toFixed(0) + "px; height:" + tam.toFixed(0) + "px; " +
        "animation-duration:" + (2.6 + Math.random() * 2).toFixed(2) + "s; animation-delay:" + (Math.random() * 1.4).toFixed(2) + "s";
      e.innerHTML = DONA;
      cont.appendChild(e);
    }
    document.body.appendChild(cont);
    setTimeout(function () { cont.remove(); }, 6500);
  }

  // Tres toques seguidos (menos de 1,2 s entre el primero y el tercero).
  function conTripleToque(el) {
    var toques = [];
    el.addEventListener("click", function () {
      var ahora = Date.now();
      toques.push(ahora);
      toques = toques.filter(function (t) { return ahora - t < 1200; });
      if (toques.length >= 3) { toques = []; lluvia(); }
    });
  }

  function montar() {
    estilos();
    var els = document.querySelectorAll("[data-marca]");
    for (var i = 0; i < els.length; i++) {
      if (els[i].getAttribute("data-marca-lista")) continue;
      els[i].innerHTML = MARCA;
      els[i].setAttribute("data-marca-lista", "1");
      conTripleToque(els[i]);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", montar);
  else montar();

  window.Marca = { lluvia: lluvia, montar: montar };
})();
