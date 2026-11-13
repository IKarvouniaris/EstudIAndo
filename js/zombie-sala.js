/* Parcial Zombie en sala (hasta 4 jugadores en vivo). Se apoya en Supabase Realtime (broadcast + presence) y en la API
   window.ParcialZombie que expone js/parcial-zombie.js. No usa tablas ni guarda nada en la base: la sala existe mientras
   haya gente conectada al canal «zombie-sala-CÓDIGO».

   Cómo funciona:
   - Se entra con Google (o como invitado, solo con un nombre, para probar). El anfitrión crea la sala y elige materia, nivel
     por el que se empieza, regla y tiempo; los demás entran con el código o el enlace.
   - El anfitrión manda «ini» con una semilla: todos arman las mismas preguntas en el mismo orden y con las mismas puertas.
     Cada uno arranca cuando termina su cuenta regresiva.
   - Cada jugador avisa su progreso («est») y todos ven el de los demás arriba de la pantalla.
   - Un solo jugador, el «juez» (el de menor id entre los conectados, así si se va el anfitrión otro lo reemplaza),
     decide cuándo termina la partida y la anuncia («fin»). Reglas:
       carrera        gana el primero que pasa todas las puertas con vidas
       supervivencia  pierde el primero que se queda sin vidas
       ultimo         se sigue hasta que quede uno solo en pie (o alguien escape); los que caen miran cómo van los demás
   Todo corre en el navegador: alcanza para estudiar entre amigos, pero un jugador técnico podría hacer trampa. */
(function () {
  "use strict";

  var PZ = window.ParcialZombie;
  var btnSala = document.getElementById("btn-sala");
  var capa = document.getElementById("sala");
  if (!PZ || !capa || !btnSala) return;
  if (!window.Auth || !window.Auth.cliente) { btnSala.hidden = true; return; }   // sin Supabase no hay sala

  var Auth = window.Auth, cuerpo = document.getElementById("sala-cuerpo");
  var hudSala = document.getElementById("sala-hud"), finSala = document.getElementById("fin-sala");
  var MAX = 4, LETRAS = "ABCDEFGHJKMNPQRSTUVWXYZ";
  var TIEMPOS = [[1, "Normal"], [1.5, "×1,5"], [2, "×2"], [3, "×3"], [4, "×4 · sin apuro"]];
  var REGLAS = [["carrera", "Carrera: gana el primero en escapar"], ["supervivencia", "Supervivencia: pierde el primero que cae"],
    ["ultimo", "Último en pie: se juega hasta que quede uno"]];

  var yo = null;                 // { uid, nombre, tipo }
  var canal = null, codigo = "", jugadores = [], esperaSala = null;
  var cfg = { mazoId: "", desde: 0, regla: "carrera", tiempoX: 2 };
  var partida = null;            // { lista, cfg, est: {uid: estado}, llegadas: [], caidas: [], fin: null }

  function el(tag, clase, texto) { var e = document.createElement(tag); if (clase) e.className = clase; if (texto != null) e.textContent = texto; return e; }
  function limpiar(n) { while (n.firstChild) n.removeChild(n.firstChild); }
  function guardarLocal(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function leerLocal(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function mazoPorId(id) { var r = null; PZ.mazos().forEach(function (m) { if (m.id === id) r = m; }); return r; }
  function codigoNuevo() { var c = ""; for (var i = 0; i < 4; i++) c += LETRAS.charAt(Math.floor(Math.random() * LETRAS.length)); return c; }
  function nombreDe(uid) {
    if (partida) for (var i = 0; i < partida.lista.length; i++) if (partida.lista[i].uid === uid) return partida.lista[i].nombre;
    for (var j = 0; j < jugadores.length; j++) if (jugadores[j].uid === uid) return jugadores[j].nombre;
    return "Alguien";
  }

  /* ------------------------------ Identidad ------------------------------ */
  function cargarIdentidad() {
    return Auth.obtenerSesion().then(function (s) {
      if (s && s.user) {
        var m = s.user.user_metadata || {};
        var nombre = String(m.full_name || m.name || s.user.email || "Jugador").split(" ")[0].slice(0, 14);
        yo = { uid: s.user.id, nombre: nombre, tipo: "google" };
      } else {
        var g = leerLocal("zombie-invitado");
        try { g = g ? JSON.parse(g) : null; } catch (e) { g = null; }
        yo = g && g.uid ? g : null;
      }
      return yo;
    }).catch(function () { return null; });
  }

  /* ------------------------------- Pantallas ------------------------------ */
  function abrir() { capa.hidden = false; document.getElementById("portada").hidden = true; pintar(); }
  function cerrarPanel() { capa.hidden = true; document.getElementById("portada").hidden = false; }

  function pintar() {
    limpiar(cuerpo);
    if (!yo) return pintarIdentidad();
    if (partida && partida.cuenta != null) return pintarCuenta();
    if (!canal) return pintarEntrada();
    pintarLobby();
  }

  function pintarIdentidad() {
    cuerpo.appendChild(el("p", "cintillo", "Jugar con amigos · hasta 4"));
    var h = el("h1"); h.appendChild(document.createTextNode("Entrá a la ")); h.appendChild(el("em", "", "sala")); cuerpo.appendChild(h);
    cuerpo.appendChild(el("p", "", "Todos reciben las mismas preguntas y arrancan al mismo tiempo. Entrá con tu cuenta de Google para que se vea tu nombre."));
    var b = el("div", "botones");
    var g = el("button", "btn principal", "Entrar con Google"); g.type = "button";
    g.addEventListener("click", function () {
      guardarLocal("zombie-sala-vuelta", codigoDeHash() || "1");
      Auth.entrarConGoogle();
    });
    b.appendChild(g); cuerpo.appendChild(b);
    cuerpo.appendChild(el("h2", "", "O probá sin cuenta"));
    var f = el("div", "botones");
    var inp = el("input", "campo"); inp.type = "text"; inp.maxLength = 14; inp.placeholder = "Tu nombre"; inp.setAttribute("aria-label", "Tu nombre");
    var bi = el("button", "btn", "Entrar de invitado"); bi.type = "button";
    function entrarInv() {
      var n = inp.value.trim();
      if (!n) { inp.focus(); return; }
      yo = { uid: "i" + Math.random().toString(36).slice(2, 10), nombre: n, tipo: "invitado" };
      guardarLocal("zombie-invitado", JSON.stringify(yo));
      var cd = codigoDeHash();
      if (cd) unirse(cd, false); else pintar();      // con un enlace de sala, entra directo
    }
    bi.addEventListener("click", entrarInv);
    inp.addEventListener("keydown", function (ev) { if (ev.key === "Enter") entrarInv(); });
    f.appendChild(inp); f.appendChild(bi); cuerpo.appendChild(f);
    volverBtn();
  }

  function volverBtn() {
    var b = el("div", "botones"); var v = el("button", "btn", "Volver"); v.type = "button";
    v.addEventListener("click", function () { salirDeSala(); cerrarPanel(); }); b.appendChild(v); cuerpo.appendChild(b);
  }

  function pintarEntrada() {
    cuerpo.appendChild(el("p", "cintillo", "Hola, " + yo.nombre));
    var h = el("h1"); h.appendChild(document.createTextNode("Sala de ")); h.appendChild(el("em", "", "estudio")); cuerpo.appendChild(h);
    var b = el("div", "botones");
    var c = el("button", "btn principal", "Crear una sala"); c.type = "button";
    c.addEventListener("click", function () { unirse(codigoNuevo(), true); });
    b.appendChild(c); cuerpo.appendChild(b);
    cuerpo.appendChild(el("h2", "", "O entrá con el código"));
    var f = el("div", "botones");
    var inp = el("input", "campo codigo"); inp.type = "text"; inp.maxLength = 4; inp.placeholder = "ABCD"; inp.setAttribute("aria-label", "Código de la sala");
    var bi = el("button", "btn", "Entrar"); bi.type = "button";
    function ir() { var cd = inp.value.trim().toUpperCase(); if (cd.length !== 4) { inp.focus(); return; } unirse(cd, false); }
    bi.addEventListener("click", ir);
    inp.addEventListener("keydown", function (ev) { if (ev.key === "Enter") ir(); });
    f.appendChild(inp); f.appendChild(bi); cuerpo.appendChild(f);
    cuerpo.appendChild(el("p", "nota-sala", yo.tipo === "google" ? "Entraste con Google." : "Estás de invitado: tu nombre no queda guardado."));
    volverBtn();
  }

  function soyAnfitrion() { for (var i = 0; i < jugadores.length; i++) if (jugadores[i].uid === yo.uid) return !!jugadores[i].anf; return false; }

  function pintarLobby() {
    cuerpo.appendChild(el("p", "cintillo", "Sala · compartí el código"));
    cuerpo.appendChild(el("div", "codigo-sala", codigo));
    var enlace = location.origin + location.pathname + "#sala=" + codigo;
    var copiar = el("button", "btn", "Copiar enlace"); copiar.type = "button";
    copiar.addEventListener("click", function () {
      var fin = function () { copiar.textContent = "¡Copiado!"; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(enlace).then(fin, function () { window.prompt("Copiá el enlace:", enlace); });
      else window.prompt("Copiá el enlace:", enlace);
    });
    var bc = el("div", "botones"); bc.appendChild(copiar); cuerpo.appendChild(bc);

    cuerpo.appendChild(el("h2", "", "Jugadores (" + jugadores.length + "/" + MAX + ")"));
    var ul = el("ul", "jugadores");
    jugadores.forEach(function (j) {
      var li = el("li", j.uid === yo.uid ? "yo" : "");
      li.appendChild(el("b", "", j.nombre + (j.uid === yo.uid ? " (vos)" : "")));
      if (j.anf) li.appendChild(el("small", "", "anfitrión"));
      ul.appendChild(li);
    });
    cuerpo.appendChild(ul);

    if (soyAnfitrion()) pintarControles();
    else {
      cuerpo.appendChild(el("h2", "", "Lo que eligió el anfitrión"));
      cuerpo.appendChild(el("p", "nota-sala", resumenCfg(cfg)));
      cuerpo.appendChild(el("p", "nota-sala", "Esperá a que arranque la partida."));
    }
    var b = el("div", "botones"); var s = el("button", "btn", "Salir de la sala"); s.type = "button";
    s.addEventListener("click", function () { salirDeSala(); pintar(); }); b.appendChild(s); cuerpo.appendChild(b);
  }

  function resumenCfg(c) {
    var mz = mazoPorId(c.mazoId); if (!mz) return "…";
    var niv = PZ.nivelesDe(mz), t = TIEMPOS.filter(function (x) { return x[0] === c.tiempoX; })[0];
    var r = REGLAS.filter(function (x) { return x[0] === c.regla; })[0];
    return mz.materia + " · desde el nivel " + (c.desde + 1) + (niv.length > 1 ? " de " + niv.length : "") + " · " + (r ? r[1] : "") + " · tiempo " + (t ? t[1] : "×" + c.tiempoX);
  }

  function campoSelect(rotulo, opciones, valor, alCambiar) {
    var l = el("label", "campo-l"); l.appendChild(el("span", "", rotulo));
    var s = el("select", "campo");
    opciones.forEach(function (o) { var op = el("option", "", o[1]); op.value = String(o[0]); if (String(o[0]) === String(valor)) op.selected = true; s.appendChild(op); });
    s.addEventListener("change", function () { alCambiar(s.value); });
    l.appendChild(s); return l;
  }

  function pintarControles() {
    cuerpo.appendChild(el("h2", "", "Armá la partida"));
    var mazos = PZ.mazos();
    if (!cfg.mazoId || !mazoPorId(cfg.mazoId)) cfg.mazoId = mazos[0].id;
    var mz = mazoPorId(cfg.mazoId), niv = PZ.nivelesDe(mz);
    if (cfg.desde >= niv.length) cfg.desde = 0;
    var caja = el("div", "controles");
    caja.appendChild(campoSelect("Materia", mazos.map(function (m) { return [m.id, m.materia + " · " + m.detalle]; }), cfg.mazoId, function (v) { cfg.desde = 0; cfg.mazoId = v; cambioCfg(); }));
    if (niv.length > 1) caja.appendChild(campoSelect("Empezar en", niv.map(function (n, i) { return [i, "Nivel " + (i + 1) + " · " + n.titulo]; }), cfg.desde, function (v) { cfg.desde = parseInt(v, 10); cambioCfg(); }));
    caja.appendChild(campoSelect("Regla", REGLAS, cfg.regla, function (v) { cfg.regla = v; cambioCfg(); }));
    caja.appendChild(campoSelect("Tiempo por pregunta", TIEMPOS, cfg.tiempoX, function (v) { cfg.tiempoX = parseFloat(v); cambioCfg(); }));
    cuerpo.appendChild(caja);
    cuerpo.appendChild(el("p", "nota-sala", PZ.totalPreguntas(mz, cfg.desde) + " puertas. Con «Normal» el tiempo es el de siempre; los demás lo multiplican."));
    var b = el("div", "botones");
    var ini = el("button", "btn principal", jugadores.length < 2 ? "Esperá a que entre alguien" : "Empezar para todos"); ini.type = "button";
    ini.disabled = jugadores.length < 2;
    ini.addEventListener("click", empezar);
    b.appendChild(ini); cuerpo.appendChild(b);
  }
  function cambioCfg() { enviar({ k: "cfg", cfg: cfg }); pintar(); }

  function pintarCuenta() {
    cuerpo.appendChild(el("p", "cintillo", resumenCfg(partida.cfg)));
    cuerpo.appendChild(el("div", "cuenta", partida.cuenta > 0 ? String(partida.cuenta) : "¡Corré!"));
    cuerpo.appendChild(el("p", "nota-sala", "Jugadores: " + partida.lista.map(function (j) { return j.nombre; }).join(", ")));
  }

  /* --------------------------------- Canal ---------------------------------- */
  function enviar(msg) {
    if (!canal) return;
    msg.de = yo.uid;
    canal.send({ type: "broadcast", event: "m", payload: msg });
  }

  function unirse(cd, anfitrion) {
    codigo = cd;
    location.hash = "sala=" + cd;
    jugadores = []; partida = null;
    canal = Auth.cliente.channel("zombie-sala-" + cd, { config: { broadcast: { self: true }, presence: { key: yo.uid } } });
    canal.on("presence", { event: "sync" }, sincronizar);
    canal.on("broadcast", { event: "m" }, function (m) { recibir(m.payload || {}); });
    canal.subscribe(function (estado) {
      if (estado === "SUBSCRIBED") {
        canal.track({ uid: yo.uid, nombre: yo.nombre, anf: !!anfitrion, t: Date.now() });
        if (!anfitrion) esperaSala = setTimeout(function () {
          var hay = jugadores.some(function (j) { return j.anf; });
          if (!hay) { var c = codigo; salirDeSala(); pintar(); cuerpo.insertBefore(el("p", "error-sala", "No hay ninguna sala con el código " + c + "."), cuerpo.firstChild); }
        }, 3500);
      } else if (estado === "CHANNEL_ERROR" || estado === "TIMED_OUT") {
        salirDeSala(); pintar(); cuerpo.insertBefore(el("p", "error-sala", "No se pudo conectar con la sala. Probá de nuevo."), cuerpo.firstChild);
      }
    });
    pintar();
  }

  function sincronizar() {
    var estado = canal.presenceState(), lista = [];
    Object.keys(estado).forEach(function (k) { if (estado[k] && estado[k][0]) lista.push(estado[k][0]); });
    lista.sort(function (a, b) { return (a.t || 0) - (b.t || 0); });
    // si la sala está llena, el que llegó último se va
    var pos = -1; lista.forEach(function (j, i) { if (j.uid === yo.uid) pos = i; });
    if (pos >= MAX && !partida) { var c = codigo; salirDeSala(); pintar(); cuerpo.insertBefore(el("p", "error-sala", "La sala " + c + " ya tiene " + MAX + " jugadores."), cuerpo.firstChild); return; }
    jugadores = lista.slice(0, Math.max(MAX, 0));
    if (soyAnfitrion() && !partida) enviar({ k: "cfg", cfg: cfg });     // el que entra tarde se entera de lo elegido
    if (partida && partida.cuenta == null) juzgar();                     // alguien se fue en plena partida
    if (!partida) pintar();
    else pintarHud();
  }

  function recibir(m) {
    if (m.k === "cfg") { if (!soyAnfitrion()) { cfg = m.cfg; if (!partida) pintar(); } return; }
    if (m.k === "ini") return arrancar(m);
    if (m.k === "est") return alEstadoDe(m);
    if (m.k === "fin") return alFinal(m);
  }

  function salirDeSala() {
    clearTimeout(esperaSala);
    if (canal) { try { Auth.cliente.removeChannel(canal); } catch (e) {} }
    canal = null; jugadores = []; partida = null; codigo = "";
    PZ.alEstado = null;
    hudSala.hidden = true; finSala.hidden = true;
    if (location.hash.indexOf("sala=") >= 0) history.replaceState(null, "", location.pathname + location.search);
  }

  /* -------------------------------- Partida ---------------------------------- */
  function empezar() {
    var lista = jugadores.slice(0, MAX).map(function (j) { return { uid: j.uid, nombre: j.nombre }; });
    enviar({ k: "ini", cfg: cfg, lista: lista, semilla: Math.floor(Math.random() * 2147483647) });
  }

  function arrancar(m) {
    cfg = m.cfg;
    partida = { lista: m.lista, cfg: m.cfg, est: {}, llegadas: [], caidas: [], fin: null, cuenta: 3 };
    m.lista.forEach(function (j) { partida.est[j.uid] = { i: 0, n: 0, vidas: 3, aciertos: 0, fin: null }; });
    if (!m.lista.some(function (j) { return j.uid === yo.uid; })) { partida = null; return; }
    capa.hidden = false; document.getElementById("portada").hidden = true; document.getElementById("fin").hidden = true;
    finSala.hidden = true;
    pintar();
    var t = setInterval(function () {
      if (!partida || partida.cuenta == null) { clearInterval(t); return; }
      partida.cuenta--;
      if (partida.cuenta > 0) { pintar(); return; }
      pintar();
      clearInterval(t);
      setTimeout(function () {
        if (!partida) return;
        partida.cuenta = null;
        capa.hidden = true;
        PZ.alEstado = function (e) { enviar({ k: "est", i: e.i, n: e.n, vidas: e.vidas, aciertos: e.aciertos, fin: e.fin }); };
        PZ.empezarSala({ mazoId: m.cfg.mazoId, desde: m.cfg.desde, semilla: m.semilla, tiempoX: m.cfg.tiempoX });
        hudSala.hidden = false; pintarHud();
      }, 700);
    }, 1000);
  }

  function alEstadoDe(m) {
    if (!partida || !partida.est[m.de]) return;
    var e = partida.est[m.de];
    e.i = m.i; e.n = m.n; e.vidas = m.vidas; e.aciertos = m.aciertos;
    if (m.fin && !e.fin) {
      e.fin = m.fin;
      if (m.fin === "gano") partida.llegadas.push(m.de); else partida.caidas.push(m.de);
    }
    pintarHud(); pintarFinSala();
    if (partida.cuenta == null) juzgar();
  }

  function soyJuez() {
    var vivos = jugadores.map(function (j) { return j.uid; }).sort();
    return vivos.length ? vivos[0] === yo.uid : false;
  }

  // Solo el juez decide cuándo termina; los demás esperan su «fin».
  function juzgar() {
    if (!partida || partida.fin || !soyJuez()) return;
    var lista = partida.lista, motivo = null, quien = null;
    var conectados = {}; jugadores.forEach(function (j) { conectados[j.uid] = true; });
    var activos = lista.filter(function (j) { return conectados[j.uid] && !partida.est[j.uid].fin; });
    if (partida.cfg.regla === "carrera") {
      if (partida.llegadas.length) { motivo = "gano"; quien = partida.llegadas[0]; }
    } else if (partida.cfg.regla === "ultimo") {
      if (partida.llegadas.length) { motivo = "gano"; quien = partida.llegadas[0]; }
      else if (activos.length === 1 && lista.length > 1) { motivo = "gano"; quien = activos[0].uid; }
    } else if (partida.caidas.length) { motivo = "cayo"; quien = partida.caidas[0]; }
    if (!motivo && !activos.length) { motivo = "todos"; quien = null; }
    if (!motivo) return;
    partida.fin = { motivo: motivo, quien: quien };
    enviar({ k: "fin", motivo: motivo, quien: quien, tabla: tabla() });
  }

  // Posiciones: primero los que escaparon (por orden de llegada), después los que siguen (por aciertos y avance)
  // y al final los que cayeron (el que cayó antes, más abajo).
  function tabla() {
    var lista = partida.lista.map(function (j) {
      var e = partida.est[j.uid];
      return { uid: j.uid, nombre: j.nombre, aciertos: e.aciertos, i: e.i, n: e.n, vidas: e.vidas, fin: e.fin };
    });
    function clave(r) {
      var iG = partida.llegadas.indexOf(r.uid), iC = partida.caidas.indexOf(r.uid);
      if (r.fin === "gano") return [0, iG, 0, 0];
      if (r.fin === "cayo") return [2, -iC, -r.aciertos, -r.i];
      return [1, 0, -r.aciertos, -r.i];
    }
    lista.sort(function (a, b) { var x = clave(a), y = clave(b); for (var k = 0; k < 4; k++) if (x[k] !== y[k]) return x[k] - y[k]; return 0; });
    return lista;
  }

  function alFinal(m) {
    if (!partida) return;
    partida.fin = { motivo: m.motivo, quien: m.quien, tabla: m.tabla };
    var titulo, bajada, nom = m.quien ? (m.quien === yo.uid ? "Vos" : nombreDe(m.quien)) : "";
    if (m.motivo === "gano") { titulo = m.quien === yo.uid ? "¡Ganaste!" : "Ganó " + nom; 
      var enPie = partida.est[m.quien] && partida.est[m.quien].fin !== "gano";      // ganó por quedar último en pie
      bajada = m.quien === yo.uid ? (enPie ? "Quedaste último en pie." : "Fuiste el primero en escapar.")
        : nom + (enPie ? " quedó último en pie." : " fue el primero en escapar.") + " Mirá abajo cómo quedó la sala."; }
    else if (m.motivo === "cayo") { titulo = m.quien === yo.uid ? "Perdiste" : nom + " perdió"; bajada = (m.quien === yo.uid ? "Fuiste el primero en quedarte sin vidas." : nom + " fue el primero en quedarse sin vidas.") + " Mirá abajo cómo quedó la sala."; }
    else { titulo = "Terminó la partida"; bajada = "Mirá abajo cómo quedó la sala."; }
    partida.fin.titulo = titulo;
    PZ.cortar(titulo, bajada);       // si todavía estabas jugando, se corta acá
    pintarFinSala();
  }

  /* ---------------------------- Cartel en juego y resultado ----------------------------- */
  function pintarHud() {
    if (!partida || hudSala.hidden) return;
    limpiar(hudSala);
    partida.lista.forEach(function (j) {
      if (j.uid === yo.uid) return;
      var e = partida.est[j.uid], c = el("span", "jug" + (e.fin === "cayo" ? " cayo" : "") + (e.fin === "gano" ? " gano" : ""));
      c.appendChild(el("b", "", j.nombre));
      c.appendChild(el("small", "", e.fin === "gano" ? "escapó" : (e.fin === "cayo" ? "cayó" : "♥".repeat(Math.max(0, e.vidas)) + " " + e.i + "/" + (e.n || "?"))));
      hudSala.appendChild(c);
    });
  }

  function pintarFinSala() {
    if (!partida || partida.cuenta != null) return;
    var enFin = document.body.classList.contains("en-sala") && !document.getElementById("fin").hidden;
    if (!enFin) return;
    finSala.hidden = false; limpiar(finSala);
    var terminada = partida.fin && partida.fin.tabla;
    finSala.appendChild(el("h2", "", terminada ? "Cómo quedó la sala" : "La partida sigue: así van los demás"));
    if (terminada && partida.fin.titulo) finSala.appendChild(el("p", "nota-sala", partida.fin.titulo + "."));
    var filas = terminada ? partida.fin.tabla : tabla();
    // Podio: al terminar, los tres primeros en escalones (2.º, 1.º, 3.º). La lista completa queda abajo.
    if (terminada && filas.length >= 2) {
      var podio = el("div", "podio");
      [1, 0, 2].forEach(function (pos) {
        var r = filas[pos]; if (!r) return;
        var c = el("div", "escalon p" + (pos + 1) + (r.uid === yo.uid ? " yo" : ""));
        c.appendChild(el("span", "quien", r.nombre + (r.uid === yo.uid ? " (vos)" : "")));
        c.appendChild(el("small", "", r.aciertos + (r.aciertos === 1 ? " acierto" : " aciertos")));
        c.appendChild(el("b", "", (pos + 1) + ".º"));
        podio.appendChild(c);
      });
      finSala.appendChild(podio);
    }
    var ol = el("ol", "posiciones");
    filas.forEach(function (r, i) {
      var li = el("li", r.uid === yo.uid ? "yo" : "");
      li.appendChild(el("b", "", (i + 1) + ".º " + r.nombre + (r.uid === yo.uid ? " (vos)" : "")));
      li.appendChild(el("span", "", r.aciertos + " aciertos · " + (r.fin === "gano" ? "escapó" : (r.fin === "cayo" ? "se quedó sin vidas" : "♥".repeat(Math.max(0, r.vidas)) + " · puerta " + r.i + "/" + (r.n || "?")))));
      ol.appendChild(li);
    });
    finSala.appendChild(ol);
    var b = el("div", "botones");
    var v = el("button", "btn principal", "Volver a la sala"); v.type = "button";
    v.addEventListener("click", function () {
      partida = null; PZ.alEstado = null; PZ.salirSala();
      hudSala.hidden = true; finSala.hidden = true;
      capa.hidden = false; document.getElementById("portada").hidden = true; pintar();
    });
    b.appendChild(v);
    var s = el("button", "btn", "Salir"); s.type = "button";
    s.addEventListener("click", function () { salirDeSala(); PZ.salirSala(); });
    b.appendChild(s);
    finSala.appendChild(b);
  }

  /* --------------------------------- Arranque ----------------------------------- */
  function codigoDeHash() { var m = location.hash.match(/sala=([A-Za-z]{4})/); return m ? m[1].toUpperCase() : ""; }

  btnSala.addEventListener("click", function () { cargarIdentidad().then(abrir); });

  // Si venís de un enlace con #sala=CODIGO o de volver del login con Google, se abre la sala sola.
  cargarIdentidad().then(function () {
    var cd = codigoDeHash(), vuelta = leerLocal("zombie-sala-vuelta");
    if (vuelta) { try { sessionStorage.removeItem("zombie-sala-vuelta"); } catch (e) {} if (vuelta.length === 4) cd = cd || vuelta.toUpperCase(); }
    if (!cd && !vuelta) return;
    abrir();
    if (yo && cd) unirse(cd, false);
  });
})();
