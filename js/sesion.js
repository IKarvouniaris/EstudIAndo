// Componente de sesión compartido: se monta en cualquier <div id="chip-sesion"></div>.
// Depende de window.Auth (js/auth.js) ya inicializado.
window.Sesion = (function () {
  "use strict";

  var AVATARES = ["🦊", "🐼", "🐸", "🐙", "🦉", "🐨", "🐯", "🦁", "🐧", "🐢", "🦄", "🐺"];
  var estilosInyectados = false;

  function inyectarEstilos() {
    if (estilosInyectados) return;
    estilosInyectados = true;
    var css = [
      "#chip-sesion{font-family:var(--body); font-size:.85rem}",
      "#chip-sesion .ses-fila{display:flex; align-items:center; gap:.5rem; flex-wrap:wrap}",
      "#chip-sesion button{font:inherit; font-family:var(--display); font-size:.8rem; cursor:pointer; padding:.4rem .75rem; background:var(--papel-2); color:var(--tinta-2); border:1px solid var(--linea); border-radius:2px}",
      "#chip-sesion button:hover{color:var(--tinta); border-color:var(--tinta-3)}",
      "#chip-sesion button.ses-principal{background:var(--tinta); color:var(--papel); border-color:var(--tinta)}",
      "#chip-sesion button.ses-principal:hover{filter:brightness(1.15)}",
      "#chip-sesion input[type=email], #chip-sesion input[type=text]{font:inherit; font-family:var(--body); font-size:.82rem; padding:.4rem .55rem; border:1px solid var(--linea); border-radius:2px; background:var(--papel-2); color:var(--tinta); width:11rem}",
      "#chip-sesion .ses-panel{margin-top:.5rem; padding:.7rem; border:1px solid var(--linea); border-radius:4px; background:var(--papel-2); max-width:22rem}",
      "#chip-sesion .ses-avatares{display:flex; gap:.3rem; flex-wrap:wrap; margin:.5rem 0}",
      "#chip-sesion .ses-avatares button{padding:.3rem .5rem; font-size:1.1rem; line-height:1}",
      "#chip-sesion .ses-avatares button.sel{border-color:var(--tinta); background:var(--papel)}",
      "#chip-sesion .ses-msg{font-family:var(--mono); font-size:.68rem; color:var(--tinta-3); margin-top:.4rem}",
      "#chip-sesion .ses-msg.err{color:#B23A3A}",
      "#chip-sesion .ses-avatar-actual{font-size:1.05rem}",
      "#chip-sesion .ses-nombre{font-weight:600; color:var(--tinta)}",
    ].join("\n");
    var el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
  }

  function montar(idContenedor) {
    inyectarEstilos();
    var cont = document.getElementById(idContenedor || "chip-sesion");
    if (!cont) return;
    cont.innerHTML = '<div class="ses-fila">cargando sesión…</div>';

    function render(sesion, perfil) {
      cont.innerHTML = "";
      if (!sesion) return renderAnonimo(cont);
      if (!perfil) return renderOnboarding(cont, sesion);
      return renderLogueado(cont, perfil);
    }

    function refrescar(sesion) {
      if (!sesion) { render(null, null); return; }
      Auth.cliente.from("perfiles").select("nombre,avatar").eq("id", sesion.user.id).maybeSingle()
        .then(function (r) { render(sesion, r.data || null); });
    }

    Auth.onCambioSesion(refrescar);
    Auth.obtenerSesion().then(refrescar);
  }

  function renderAnonimo(cont) {
    var fila = document.createElement("div");
    fila.className = "ses-fila";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ses-principal";
    btn.textContent = "Ingresar";
    fila.appendChild(btn);
    cont.appendChild(fila);

    var panel = null;
    btn.addEventListener("click", function () {
      if (panel) { panel.remove(); panel = null; return; }
      panel = document.createElement("div");
      panel.className = "ses-panel";
      panel.innerHTML =
        '<div class="ses-fila">' +
        '<button type="button" data-accion="google">Entrar con Google</button>' +
        "</div>" +
        '<div class="ses-fila" style="margin-top:.5rem">' +
        '<input type="email" placeholder="tu@email.com" data-campo="email">' +
        '<button type="button" data-accion="magic">Mandame un link</button>' +
        "</div>" +
        '<div class="ses-msg" data-rol="msg"></div>';
      cont.appendChild(panel);

      var msg = panel.querySelector('[data-rol="msg"]');
      panel.querySelector('[data-accion="google"]').addEventListener("click", function () {
        Auth.entrarConGoogle().then(function (r) {
          if (r.error) { msg.textContent = "Error: " + r.error.message; msg.classList.add("err"); }
        });
      });
      panel.querySelector('[data-accion="magic"]').addEventListener("click", function () {
        var email = panel.querySelector('[data-campo="email"]').value.trim();
        if (!email) { msg.textContent = "Escribí tu email primero."; msg.classList.add("err"); return; }
        msg.classList.remove("err");
        msg.textContent = "Enviando…";
        Auth.enviarMagicLink(email).then(function (r) {
          if (r.error) { msg.textContent = "Error: " + r.error.message; msg.classList.add("err"); }
          else { msg.textContent = "Listo, revisá tu email (y spam): " + email; }
        });
      });
    });
  }

  function renderOnboarding(cont, sesion) {
    var panel = document.createElement("div");
    panel.className = "ses-panel";
    var opcionesAvatar = AVATARES.map(function (a, i) {
      return '<button type="button" data-avatar="' + a + '"' + (i === 0 ? ' class="sel"' : "") + ">" + a + "</button>";
    }).join("");
    panel.innerHTML =
      '<div class="ses-fila">Elegí tu nombre y avatar para el grupo (' + sesion.user.email + ")</div>" +
      '<div class="ses-fila" style="margin-top:.5rem">' +
      '<input type="text" placeholder="Tu nombre" data-campo="nombre" maxlength="24">' +
      "</div>" +
      '<div class="ses-avatares">' + opcionesAvatar + "</div>" +
      '<button type="button" class="ses-principal" data-accion="guardar">Guardar</button>' +
      '<div class="ses-msg" data-rol="msg"></div>';
    cont.appendChild(panel);

    var avatarSel = AVATARES[0];
    var botonesAvatar = panel.querySelectorAll("[data-avatar]");
    botonesAvatar.forEach(function (b) {
      b.addEventListener("click", function () {
        avatarSel = b.getAttribute("data-avatar");
        botonesAvatar.forEach(function (x) { x.classList.remove("sel"); });
        b.classList.add("sel");
      });
    });

    var msg = panel.querySelector('[data-rol="msg"]');
    panel.querySelector('[data-accion="guardar"]').addEventListener("click", function () {
      var nombre = panel.querySelector('[data-campo="nombre"]').value.trim();
      if (nombre.length < 2 || nombre.length > 24) {
        msg.textContent = "El nombre tiene que tener entre 2 y 24 caracteres.";
        msg.classList.add("err");
        return;
      }
      msg.classList.remove("err");
      msg.textContent = "Guardando…";
      Auth.cliente.from("perfiles").insert({ id: sesion.user.id, nombre: nombre, avatar: avatarSel }).then(function (r) {
        if (r.error) {
          msg.textContent = r.error.message.indexOf("duplicate") !== -1
            ? "Ese nombre ya lo usa otra persona del grupo, probá otro."
            : "Error: " + r.error.message;
          msg.classList.add("err");
          return;
        }
        renderLogueado(cont, { nombre: nombre, avatar: avatarSel });
      });
    });
  }

  function renderLogueado(cont, perfil) {
    cont.innerHTML = "";
    var fila = document.createElement("div");
    fila.className = "ses-fila";
    var span = document.createElement("span");
    span.innerHTML = '<span class="ses-avatar-actual">' + (perfil.avatar || "👤") + '</span> <span class="ses-nombre">' + perfil.nombre + "</span>";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Salir";
    btn.addEventListener("click", function () { Auth.salir(); });
    fila.appendChild(span);
    fila.appendChild(btn);
    cont.appendChild(fila);
  }

  return { montar: montar };
})();
