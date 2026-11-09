/* Parcial Zombie (parcial-zombie.html). Un pasillo, un zombie atrás y tres o cuatro puertas por pregunta.
   Es una plantilla: las materias son «mazos» que arma js/mazos-zombie.js (ahí está el formato). El juego
   mezcla las preguntas (o los casos) y cambia las opciones de puerta en cada partida.
   Todo se dibuja en un <canvas> 2D con perspectiva de un punto de fuga: no hay imágenes ni emojis.
   El reloj de cada pregunta es el zombie: «peligro» va de 0 (lejos) a 1 (te alcanzó).
   Brief del juego: docs/parcial-zombie-brief.md. */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   *  Valores para ajustar (todo lo que cambia cómo se siente el juego) *
   * ------------------------------------------------------------------ */
  var CFG = {
    vidas: 3,            // vidas al empezar (y máximo)
    rachaCura: 5,        // aciertos seguidos que devuelven una vida perdida
    tBase: 8,            // segundos fijos por pregunta…
    tPorLetra: 0.085,    // …más esto por cada letra de la consigna y sus opciones (30 s para ~260 letras)
    apuroFinal: 0.6,     // en la última puerta queda este porcentaje del tiempo (0.6 = 60 %)
    sLejos: 0.46,        // tamaño de la pared del fondo cuando aparece la pregunta
    sCerca: 0.70,        // …y cuando se acaba el tiempo
    velPasillo: 1.5,     // qué tan rápido corre el piso
    dCorre: 0.40,        // s: correr hasta la puerta elegida
    dRebote: 0.45,       // s: rebotar contra la puerta equivocada
    dMordida: 0.75,      // s: la mordida
    dRevela: 0.50,       // s: ir hasta la puerta correcta
    dCruza: 0.45,        // s: cruzar la puerta
    dCae: 1.0            // s: caer cuando no quedan vidas
  };

  var MAZOS = window.MAZOS_ZOMBIE || [];
  var LETRAS = ["A", "B", "C", "D"];
  var CLAVE_MAZO = "parcial-zombie-mazo";
  function claveMejor(mazo) { return "parcial-zombie-" + mazo.id + "-mejor"; }
  var CLAVE_MUDO = "parcial-zombie-mudo";

  function $(id) { return document.getElementById(id); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function suave(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function frena(t) { t = clamp(t, 0, 1); return 1 - (1 - t) * (1 - t); }
  function mezclar(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x;
    }
    return a;
  }
  var QUIETO = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------ Sonido ------------------------------ */
  var Sonido = (function () {
    var ctx = null, master = null, buf = null, mudo = false;
    try { mudo = localStorage.getItem(CLAVE_MUDO) === "1"; } catch (e) {}

    function iniciar() {
      if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try {
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = mudo ? 0 : 0.6;
        master.connect(ctx.destination);
        buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
        var d = buf.getChannelData(0);
        for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      } catch (e) { ctx = null; }
    }
    function tono(f0, f1, dur, tipo, vol, en) {
      if (!ctx) return;
      var t = ctx.currentTime + (en || 0), o = ctx.createOscillator(), g = ctx.createGain();
      o.type = tipo || "sine";
      o.frequency.setValueAtTime(f0, t);
      o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t + dur + 0.05);
    }
    function ruido(dur, vol, f, tipo, en, q) {
      if (!ctx) return;
      var t = ctx.currentTime + (en || 0), s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = buf; s.loop = true;
      fl.type = tipo || "lowpass"; fl.frequency.value = f; fl.Q.value = q || 0.8;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(fl); fl.connect(g); g.connect(master);
      s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
    }
    return {
      iniciar: iniciar,
      esMudo: function () { return mudo; },
      alternar: function () {
        mudo = !mudo;
        try { localStorage.setItem(CLAVE_MUDO, mudo ? "1" : "0"); } catch (e) {}
        if (master) master.gain.value = mudo ? 0 : 0.6;
        return mudo;
      },
      suspender: function () { if (ctx && ctx.state === "running") ctx.suspend(); },
      reanudar: function () { if (ctx && ctx.state === "suspended") ctx.resume(); },
      paso: function () { ruido(0.06, 0.09, 240, "lowpass"); tono(72, 48, 0.05, "sine", 0.07); },
      puerta: function () { ruido(0.24, 0.2, 1100, "bandpass", 0, 1.2); tono(150, 85, 0.12, "triangle", 0.2); tono(420, 240, 0.08, "square", 0.04, 0.02); },
      golpe: function () { tono(115, 42, 0.2, "sine", 0.55); ruido(0.11, 0.3, 420, "lowpass"); },
      mordida: function () {
        tono(170, 52, 0.5, "sawtooth", 0.26); tono(74, 38, 0.36, "square", 0.14);
        ruido(0.3, 0.32, 1900, "bandpass", 0.05, 2); ruido(0.09, 0.3, 3200, "highpass", 0.16);
      },
      acierto: function () { tono(660, 660, 0.07, "triangle", 0.11); tono(880, 880, 0.1, "triangle", 0.11, 0.07); },
      cura: function () { tono(523, 523, 0.11, "triangle", 0.14, 0.12); tono(659, 659, 0.11, "triangle", 0.14, 0.23); tono(784, 784, 0.2, "triangle", 0.14, 0.34); },
      latido: function (f) { tono(62, 40, 0.1, "sine", 0.32 * f); tono(56, 36, 0.1, "sine", 0.24 * f, 0.17); },
      gruñido: function (f) { tono(92, 58, 0.7, "sawtooth", 0.07 * f); tono(47, 40, 0.7, "square", 0.04 * f); ruido(0.6, 0.05 * f, 500, "bandpass", 0, 3); },
      gana: function () { [392, 523, 659, 784, 1047].forEach(function (f, i) { tono(f, f, 0.18, "triangle", 0.16, i * 0.11); }); },
      pierde: function () { tono(220, 82, 1.1, "sawtooth", 0.16); tono(165, 55, 1.2, "square", 0.07, 0.1); }
    };
  })();

  /* ------------------------------ Estado ------------------------------ */
  var E = {
    fase: "portada",   // portada | caso | pregunta | corre | rebote | mordida | revela | cruza | cae | fin
    pausa: false,
    mazo: MAZOS[0] || null,
    tandas: [], i: 0,  // tandas[i] = { p: pregunta, caso: caso o null, abre: true si es la primera de su caso, nCaso }
    vidas: CFG.vidas, racha: 0, corrida: 0, mejorRacha: 0, aciertos: 0,
    historial: [],     // { p, elegida (índice en p.ops, o null si se acabó el tiempo), bien }
    preg: null, caso: null, n: 3, puertas: [0, 1, 2], correcta: 0,
    t: 0, tMax: 30, ft: 0,
    elegida: -1, acerto: false,
    // presentación
    s: CFG.sLejos, s0: CFG.sLejos, pN: 0, pN0: 0, pEsc: 1, dist: 0, reloj: 0,
    zombi: 0, embiste: 0, rojo: 0, tiembla: 0, fundido: 0, negro: 0,
    abre: [0, 0, 0, 0], sacude: [0, 0, 0, 0], marca: ["", "", "", ""],
    tPaso: 0, tLatido: 0, tGruñido: 3
  };

  var dom = {
    app: $("app"), lienzo: $("lienzo"), escena: $("escena"), aviso: $("aviso"),
    cintillo: $("cintillo"), pregunta: $("pregunta"), avance: $("avance"),
    vidas: $("vidas"), racha: $("racha"),
    ops: Array.prototype.slice.call(document.querySelectorAll(".op")),
    portada: $("portada"), pausa: $("pausa"), fin: $("fin"), caso: $("caso"), opciones: $("opciones"), verCaso: $("btn-ver-caso")
  };
  var cx = dom.lienzo.getContext("2d");
  var W = 300, H = 200, DPR = 1;
  var rectPuertas = [null, null, null, null];   // dónde quedó cada puerta en pantalla (para tocarla)

  /* ----------------------------- Partida ------------------------------ */
  // Arma la corrida: los grupos sin caso mezclan sus preguntas; los casos se mezclan entre sí y conservan su orden interno.
  function armarTandas(mazo) {
    var bloques = [];
    mazo.grupos.forEach(function (g) {
      if (g.caso) bloques.push(g.preguntas.map(function (p, j) { return { p: p, caso: g.caso, abre: j === 0 }; }));
      else g.preguntas.forEach(function (p) { bloques.push([{ p: p, caso: null, abre: false }]); });
    });
    mezclar(bloques);
    var tandas = [], nCaso = 0;
    bloques.forEach(function (b) { if (b[0].caso) nCaso++; b.forEach(function (x) { x.nCaso = nCaso; tandas.push(x); }); });
    return tandas;
  }
  function totalPreguntas(mazo) { return mazo.grupos.reduce(function (s, g) { return s + g.preguntas.length; }, 0); }

  function nueva() {
    if (!E.mazo) return;
    E.tandas = armarTandas(E.mazo);
    E.i = 0; E.vidas = CFG.vidas; E.racha = 0; E.corrida = 0; E.mejorRacha = 0; E.aciertos = 0;
    E.historial = []; E.pausa = false; E.negro = 0; E.rojo = 0; E.zombi = 0; E.embiste = 0;
    dom.portada.hidden = true; dom.pausa.hidden = true; dom.fin.hidden = true; dom.caso.hidden = true;
    E.fundido = 1;
    cargar();
    pintarHud();
  }

  function cargar() {
    var n = E.tandas.length, tanda = E.tandas[E.i], k;
    E.preg = tanda.p; E.caso = tanda.caso;
    E.n = E.preg.ops.length;
    E.puertas = [];
    for (k = 0; k < E.n; k++) E.puertas.push(k);
    mezclar(E.puertas);                        // puertas[k] = qué opción quedó detrás de la puerta k
    E.correcta = E.puertas.indexOf(E.preg.ok);
    E.t = 0; E.ft = 0;
    var letras = E.preg.q.length + E.preg.ops.join("").length;
    E.tMax = (CFG.tBase + CFG.tPorLetra * letras) * lerp(1, CFG.apuroFinal, n > 1 ? E.i / (n - 1) : 0);
    E.elegida = -1; E.acerto = false;
    E.abre = [0, 0, 0, 0]; E.sacude = [0, 0, 0, 0]; E.marca = ["", "", "", ""];
    E.pN = 0; E.pEsc = 1; E.s = CFG.sLejos; E.embiste = 0;

    var partes = ["Puerta " + (E.i + 1) + " de " + n];
    if (E.caso) partes.push("caso " + tanda.nCaso);
    if (E.preg.rol) partes.push(E.preg.rol);
    if (E.preg.clase != null) partes.push("clase " + E.preg.clase);
    dom.cintillo.textContent = partes.join(" · ");
    dom.pregunta.textContent = E.preg.q;
    dom.opciones.style.setProperty("--n", String(E.n));
    dom.opciones.classList.toggle("cuatro", E.n > 3);
    dom.ops.forEach(function (b, j) {
      b.className = "op"; b.hidden = j >= E.n; b.disabled = j >= E.n;
      b.querySelector("span").textContent = j < E.n ? E.preg.ops[E.puertas[j]] : "";
    });
    dom.avance.textContent = (E.i + 1) + "/" + n;
    dom.verCaso.hidden = !E.caso;

    if (tanda.abre) { E.fase = "caso"; mostrarCaso(false); }   // el zombie espera mientras se lee el caso
    else E.fase = "pregunta";
  }

  // El caso: se muestra antes de su primera pregunta y se puede volver a leer (ahí el juego queda en pausa).
  function mostrarCaso(consulta) {
    if (!E.caso) return;
    $("caso-cintillo").textContent = (consulta ? "El zombie espera · " : "Caso nuevo · ") + (E.caso.ambito || "");
    $("caso-titulo").textContent = E.caso.titulo;
    var cuerpo = $("caso-hechos");
    cuerpo.textContent = "";
    (E.caso.hechos || []).forEach(function (h) { cuerpo.appendChild(el("p", "", h)); });
    $("btn-caso-seguir").textContent = consulta ? "Volver a las puertas" : "Seguir corriendo";
    if (consulta) { E.pausa = true; Sonido.suspender(); }
    dom.caso.hidden = false; dom.caso.scrollTop = 0;
    $("btn-caso-seguir").focus({ preventScroll: true });
  }
  function cerrarCaso() {
    dom.caso.hidden = true;
    if (E.fase === "caso") { E.fase = "pregunta"; E.fundido = Math.min(E.fundido, 0.6); }
    else if (E.pausa) { E.pausa = false; Sonido.reanudar(); antes = performance.now(); }
  }

  function elegir(k) {
    if (E.fase !== "pregunta" || E.pausa || k < 0 || k >= E.n) return;
    Sonido.iniciar();
    E.elegida = k; E.acerto = (k === E.correcta);
    E.historial.push({ p: E.preg, caso: E.caso, elegida: E.puertas[k], bien: E.acerto });
    dom.ops.forEach(function (b, j) { b.disabled = true; if (j === k) b.classList.add("elegida"); });
    if (E.acerto) anotarAcierto();
    E.pN0 = E.pN; E.s0 = E.s; E.ft = 0; E.fase = "corre";
  }

  function anotarAcierto() {
    E.aciertos++; E.corrida++;
    if (E.corrida > E.mejorRacha) E.mejorRacha = E.corrida;
    if (E.vidas < CFG.vidas) {
      E.racha++;
      if (E.racha >= CFG.rachaCura) {
        E.vidas++; E.racha = 0;
        avisar("+1 vida", "bien"); Sonido.cura();
        latir(E.vidas - 1);
      }
    } else { E.racha = 0; }
    dom.ops[E.elegida].classList.add("bien");
    E.marca[E.elegida] = "bien";
    pintarHud();
  }

  function seAcaboElTiempo() {
    E.historial.push({ p: E.preg, caso: E.caso, elegida: null, bien: false });
    dom.ops.forEach(function (b) { b.disabled = true; });
    E.elegida = -1; E.acerto = false;
    morder("¡Te alcanzó!");
  }

  function morder(texto) {
    E.vidas--; E.racha = 0; E.corrida = 0;
    E.rojo = 1; E.tiembla = 1; E.ft = 0; E.fase = "mordida";
    Sonido.mordida();
    if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) { try { navigator.vibrate([90, 40, 140]); } catch (e) {} }
    avisar(texto, "mal");
    // se muestra cuál era, sin frenar a explicar
    E.marca[E.correcta] = "bien";
    dom.ops.forEach(function (b, j) {
      if (j === E.correcta) b.classList.add("bien");
      else if (j === E.elegida) b.classList.add("mal");
      else b.classList.add("apagada");
    });
    pintarHud();
  }

  function siguiente() {
    E.i++;
    if (E.i >= E.tandas.length) { terminar(true); return; }
    cargar();
  }

  function terminar(gano) {
    E.fase = "fin";
    document.documentElement.style.setProperty("--peligro", "0");
    if (gano) Sonido.gana(); else Sonido.pierde();
    var mejor = leerMejor(E.mazo);
    var esta = { aciertos: E.aciertos, gano: gano };
    var supera = !mejor || (esta.gano && !mejor.gano) || (esta.gano === mejor.gano && esta.aciertos > mejor.aciertos);
    if (supera) { try { localStorage.setItem(claveMejor(E.mazo), JSON.stringify(esta)); } catch (e) {} }
    pintarFin(gano, supera, supera ? esta : mejor);
  }

  function leerMejor(mazo) {
    try { var m = JSON.parse(localStorage.getItem(claveMejor(mazo)) || "null"); return (m && typeof m.aciertos === "number") ? m : null; }
    catch (e) { return null; }
  }
  function textoMejor(m, mazo) {
    if (!m) return "";
    return m.aciertos + " de " + totalPreguntas(mazo) + (m.gano ? " · escapaste" : " · te alcanzó");
  }

  /* ------------------------------- HUD -------------------------------- */
  function pintarHud() {
    var cor = dom.vidas.querySelectorAll(".cora");
    for (var i = 0; i < cor.length; i++) cor[i].classList.toggle("perdida", i >= E.vidas);
    dom.vidas.setAttribute("aria-label", E.vidas + (E.vidas === 1 ? " vida" : " vidas"));
    var pips = dom.racha.querySelectorAll("i");
    for (var j = 0; j < pips.length; j++) pips[j].classList.toggle("on", j < E.racha);
    dom.racha.classList.toggle("oculta", E.vidas >= CFG.vidas);
    dom.racha.setAttribute("aria-label", "Racha: " + E.racha + " de " + CFG.rachaCura + " para recuperar una vida");
  }
  function latir(i) {
    var c = dom.vidas.querySelectorAll(".cora")[i];
    if (!c) return;
    c.classList.remove("late"); void c.getBoundingClientRect(); c.classList.add("late");
  }
  function avisar(texto, tipo) {
    var a = dom.aviso;
    a.textContent = texto; a.className = "aviso " + (tipo || "");
    void a.offsetWidth; a.classList.add("ver");
  }

  /* --------------------------- Pantalla final -------------------------- */
  function el(tag, clase, texto) {
    var e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto != null) e.textContent = texto;
    return e;
  }
  function pintarFin(gano, supera, mejor) {
    var n = E.tandas.length, vistas = E.historial.length;
    $("fin-cintillo").textContent = (gano ? "Salida de emergencia · " : "Fin de la corrida · ") + E.mazo.materia;
    var t = $("fin-titulo");
    t.textContent = "";
    if (gano) { var em = el("em", "", "¡Escapaste!"); em.style.color = "var(--luz)"; t.appendChild(em); }
    else { t.appendChild(document.createTextNode("Te ")); t.appendChild(el("em", "", "alcanzó")); }
    $("fin-bajada").textContent = gano
      ? "Pasaste las " + n + " puertas con " + E.vidas + (E.vidas === 1 ? " vida" : " vidas") + ". Abajo está el repaso de lo que contestaste."
      : "Llegaste hasta la puerta " + vistas + " de " + n + ". Mirá abajo en cuáles te mordió y volvé a intentarlo: el orden cambia.";
    $("fin-aciertos").textContent = E.aciertos;
    $("fin-puertas").textContent = vistas + "/" + n;
    $("fin-racha").textContent = E.mejorRacha;
    var fm = $("fin-mejor");
    fm.textContent = "";
    fm.appendChild(document.createTextNode(supera ? "Nueva mejor marca: " : "Tu mejor marca: "));
    fm.appendChild(el("b", "", textoMejor(mejor, E.mazo)));

    var ol = $("resumen");
    ol.textContent = "";
    E.historial.forEach(function (h, i) {
      var li = el("li", h.bien ? "bien" : "mal");
      var cab = el("p", "n");
      cab.appendChild(el("span", "", "Puerta " + (i + 1) + (h.p.rol ? " · " + h.p.rol : "") + (h.bien ? " · bien" : " · mordida")));
      if (h.p.clase != null) {
        var a = el("a", "", "clase " + h.p.clase);
        a.href = E.mazo.apunte + "#c" + h.p.clase;
        cab.appendChild(a);
      }
      li.appendChild(cab);
      if (h.caso) li.appendChild(el("p", "caso", "Caso: " + h.caso.titulo));
      li.appendChild(el("p", "q", h.p.q));
      if (h.bien) {
        var v = el("p", "r verde"); v.appendChild(el("small", "", "Elegiste, y era la correcta")); v.appendChild(el("span", "", h.p.ops[h.p.ok]));
        li.appendChild(v);
      } else {
        var r = el("p", "r rojo");
        if (h.elegida == null) { r.appendChild(el("small", "", "No llegaste a elegir")); r.appendChild(document.createTextNode("Se acabó el tiempo.")); }
        else { r.appendChild(el("small", "", "Elegiste")); r.appendChild(el("span", "", h.p.ops[h.elegida])); }
        li.appendChild(r);
        var c = el("p", "r verde"); c.appendChild(el("small", "", "La correcta era")); c.appendChild(el("span", "", h.p.ops[h.p.ok]));
        li.appendChild(c);
      }
      li.appendChild(el("p", "porque", h.p.porque));
      ol.appendChild(li);
    });
    dom.fin.hidden = false;
    dom.fin.scrollTop = 0;
    $("btn-otra").focus({ preventScroll: true });
  }

  /* ----------------------------- Geometría ----------------------------- */
  // El pasillo es un rectángulo «cercano» (más grande que la pantalla) que se achica hacia el punto de fuga.
  // k = 1 es el plano de la cámara; k = s es la pared del fondo, donde están las puertas.
  function geo() {
    return { vx: W / 2, vy: H * 0.40, izq: -W * 0.12, der: W * 1.12, arr: -H * 0.20, aba: H * 1.05 };
  }
  var DISPOSICION = {
    3: { centros: [0.18, 0.5, 0.82], ancho: 0.235 },
    4: { centros: [0.135, 0.378, 0.622, 0.865], ancho: 0.19 }
  };
  function pared(s) {
    var g = geo(), dis = DISPOSICION[E.n] || DISPOSICION[3];
    var x0 = g.vx + (g.izq - g.vx) * s, x1 = g.vx + (g.der - g.vx) * s;
    var y0 = g.vy + (g.arr - g.vy) * s, y1 = g.vy + (g.aba - g.vy) * s;
    var w = x1 - x0, h = y1 - y0, pw = w * dis.ancho, ph = h * 0.62;
    var centros = dis.centros, puertas = [];
    for (var k = 0; k < centros.length; k++) {
      var c = x0 + w * centros[k];
      puertas.push({ x: c - pw / 2, y: y1 - ph, w: pw, h: ph, cx: c });
    }
    return { x0: x0, x1: x1, y0: y0, y1: y1, w: w, h: h, puertas: puertas };
  }
  function xPuertaN(k, s) { return (pared(s).puertas[k].cx - W / 2) / W; }

  /* ------------------------------ Dibujo ------------------------------- */
  var COL = {
    techo: "#182220", muroAlto: "#3F5B53", muroBajo: "#2A4038", fondo: "#4A685F", fondoBajo: "#33493F",
    piso1: "#2B3634", piso2: "#35423F", junta: "#1A2321",
    casillero1: "#4E6F7A", casillero2: "#466571", casilleroSombra: "#2C434C",
    tuboOn: "#E6F7EA", tuboOff: "#3B4A46",
    madera: "#7C5433", maderaOsc: "#63411F", maderaLuz: "#93683F", marco: "#221A12", vidrio: "#A9C2B6", herraje: "#CDB878", zocalo: "#828B88",
    placa: "#E9E3CF", tinta: "#1B2422", luz: "#FFD766", sangre: "#C23B2E",
    buzo: "#E6E1CD", buzoSombra: "#BDB8A4", mochila: "#5661C9", mochilaOsc: "#3E48A0", jean: "#2E4069", zapa: "#F2EFE5", pelo: "#3A2A20", piel: "#D9A982",
    zPiel: "#8FA56D", zPielOsc: "#62774A", zRopa: "#4D4138", zRopaOsc: "#352C26", zUña: "#262B1F", zHerida: "#6E1F1C", zPelo: "#22271E"
  };

  function cuad(x1, y1, x2, y2, x3, y3, x4, y4, color) {
    cx.fillStyle = color; cx.beginPath();
    cx.moveTo(x1, y1); cx.lineTo(x2, y2); cx.lineTo(x3, y3); cx.lineTo(x4, y4); cx.closePath(); cx.fill();
  }
  function redondo(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    cx.beginPath();
    cx.moveTo(x + r, y); cx.lineTo(x + w - r, y); cx.quadraticCurveTo(x + w, y, x + w, y + r);
    cx.lineTo(x + w, y + h - r); cx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    cx.lineTo(x + r, y + h); cx.quadraticCurveTo(x, y + h, x, y + h - r);
    cx.lineTo(x, y + r); cx.quadraticCurveTo(x, y, x + r, y); cx.closePath();
  }
  function ruidoFijo(n) { var x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); }

  function dibujarPasillo(peligro) {
    var g = geo(), s = E.s;
    var dz = 0.22, zCerca = 0.8, zLejos = 1 / s;
    var frac = (E.dist / dz) % 1, base = Math.floor(E.dist / dz);
    function px(xn, k) { return g.vx + (xn - g.vx) * k; }
    function py(yn, k) { return g.vy + (yn - g.vy) * k; }

    cx.fillStyle = "#0A0E0E"; cx.fillRect(0, 0, W, H);

    for (var j = 0; j < 40; j++) {
      var zA = zCerca + (j - frac) * dz, zB = zA + dz;
      if (zA >= zLejos) break;
      if (zB <= zCerca) continue;
      var k1 = 1 / Math.max(zA, zCerca), k2 = 1 / Math.min(zB, zLejos);
      var idx = base + j, par = (idx % 2 + 2) % 2;
      var niebla = clamp((1 / k2 - 1) / (zLejos - 0.6), 0, 1);       // lejos = más oscuro

      // techo
      cuad(px(g.izq, k1), py(g.arr, k1), px(g.der, k1), py(g.arr, k1), px(g.der, k2), py(g.arr, k2), px(g.izq, k2), py(g.arr, k2), COL.techo);

      // piso en damero (6 columnas)
      for (var c = 0; c < 6; c++) {
        var xa = lerp(g.izq, g.der, c / 6), xb = lerp(g.izq, g.der, (c + 1) / 6);
        cuad(px(xa, k1), py(g.aba, k1), px(xb, k1), py(g.aba, k1), px(xb, k2), py(g.aba, k2), px(xa, k2), py(g.aba, k2), ((c + idx) % 2 + 2) % 2 ? COL.piso1 : COL.piso2);
      }

      // paredes laterales: arriba lisa, abajo casilleros (o una cartelera cada tanto)
      for (var lado = 0; lado < 2; lado++) {
        var xn = lado ? g.der : g.izq;
        var X1 = px(xn, k1), X2 = px(xn, k2);
        var t1 = py(g.arr, k1), b1 = py(g.aba, k1), t2 = py(g.arr, k2), b2 = py(g.aba, k2);
        cuad(X1, t1, X2, t2, X2, b2, X1, b1, COL.muroAlto);
        var a = 0.40, z = 0.95;   // los casilleros ocupan del 40 % al 95 % de la altura
        var c1a = lerp(t1, b1, a), c1b = lerp(t1, b1, z), c2a = lerp(t2, b2, a), c2b = lerp(t2, b2, z);
        var cartelera = ((idx + lado * 3) % 5 + 5) % 5 === 0;
        if (cartelera) {
          cuad(X1, lerp(t1, b1, 0.62), X2, lerp(t2, b2, 0.62), X2, b2, X1, b1, COL.muroBajo);
          var m = 0.14, Xa = lerp(X1, X2, m), Xb = lerp(X1, X2, 1 - m);
          var ta = lerp(t1, t2, m), ba = lerp(b1, b2, m), tb = lerp(t1, t2, 1 - m), bb = lerp(b1, b2, 1 - m);
          cuad(Xa, lerp(ta, ba, 0.26), Xb, lerp(tb, bb, 0.26), Xb, lerp(tb, bb, 0.56), Xa, lerp(ta, ba, 0.56), "#6B5536");
          var hojas = ["#E9E3CF", "#C7D8CF", "#E3C98E"];
          for (var hj = 0; hj < 3; hj++) {
            var u1 = 0.1 + hj * 0.3, u2 = u1 + 0.22, alto = 0.3 + ruidoFijo(idx * 3 + hj) * 0.04;
            var Xc = lerp(Xa, Xb, u1), Xd = lerp(Xa, Xb, u2);
            var tc = lerp(lerp(ta, ba, alto), lerp(tb, bb, alto), u1), td = lerp(lerp(ta, ba, alto), lerp(tb, bb, alto), u2);
            var bc = lerp(lerp(ta, ba, alto + 0.18), lerp(tb, bb, alto + 0.18), u1), bd = lerp(lerp(ta, ba, alto + 0.18), lerp(tb, bb, alto + 0.18), u2);
            cuad(Xc, tc, Xd, td, Xd, bd, Xc, bc, hojas[(idx + hj) % 3]);
          }
        } else {
          cuad(X1, c1a, X2, c2a, X2, c2b, X1, c1b, par ? COL.casillero1 : COL.casillero2);
          cuad(X1, c1b, X2, c2b, X2, b2, X1, b1, COL.casilleroSombra);
          // divisiones y rejillas del casillero
          cx.strokeStyle = COL.casilleroSombra; cx.lineWidth = Math.max(1, 2.2 * k1);
          cx.beginPath();
          cx.moveTo(X1, c1a); cx.lineTo(X1, c1b);
          var Xm = lerp(X1, X2, 0.5), ma = lerp(c1a, c2a, 0.5), mb = lerp(c1b, c2b, 0.5);
          cx.moveTo(Xm, ma); cx.lineTo(Xm, mb);
          cx.stroke();
          cx.lineWidth = Math.max(0.6, 1.1 * k1);
          cx.beginPath();
          for (var q = 0; q < 2; q++) {
            var ua = q ? 0.60 : 0.10, ub = ua + 0.30;
            for (var r = 0; r < 3; r++) {
              var v = 0.10 + r * 0.045;
              cx.moveTo(lerp(X1, X2, ua), lerp(lerp(c1a, c2a, ua), lerp(c1b, c2b, ua), v));
              cx.lineTo(lerp(X1, X2, ub), lerp(lerp(c1a, c2a, ub), lerp(c1b, c2b, ub), v));
            }
          }
          cx.stroke();
        }
        // zócalo y junta entre tramos
        cx.strokeStyle = COL.junta; cx.lineWidth = Math.max(0.7, 1.4 * k1);
        cx.beginPath(); cx.moveTo(X1, t1); cx.lineTo(X1, b1); cx.stroke();
      }

      // tubo fluorescente: se van apagando desde atrás (cerca de la cámara) a medida que el zombie se acerca
      if (par === 0) {
        var pos = (zA - zCerca) / Math.max(0.001, zLejos - zCerca);
        var apagado = pos < peligro * 0.95 - 0.08;
        var parpadeo = !QUIETO && (ruidoFijo(idx * 7.3 + Math.floor(E.reloj * 9)) < 0.05 + peligro * 0.12);
        var on = !apagado && !parpadeo;
        var ka = 1 / Math.max(zA + dz * 0.25, zCerca), kb = 1 / Math.min(zA + dz * 0.75, zLejos);
        if (kb < ka) {
          var ancho = (g.der - g.izq) * 0.07;
          if (on) { cx.shadowColor = "rgba(214,247,224,.75)"; cx.shadowBlur = 22 * ka; }
          cuad(px(g.vx - ancho, ka), py(g.arr, ka) + 1, px(g.vx + ancho, ka), py(g.arr, ka) + 1, px(g.vx + ancho, kb), py(g.arr, kb) + 1, px(g.vx - ancho, kb), py(g.arr, kb) + 1, on ? COL.tuboOn : COL.tuboOff);
          cx.shadowBlur = 0;
          if (on) {   // el charco de luz en el piso
            var anchoP = (g.der - g.izq) * 0.30;
            cuad(px(g.vx - anchoP, ka), py(g.aba, ka), px(g.vx + anchoP, ka), py(g.aba, ka), px(g.vx + anchoP, kb), py(g.aba, kb), px(g.vx - anchoP, kb), py(g.aba, kb), "rgba(214,247,224,.07)");
          }
        }
      }

      // niebla por tramo
      if (niebla > 0.02) {
        cuad(px(g.izq, k1), py(g.arr, k1), px(g.der, k1), py(g.arr, k1), px(g.der, k1), py(g.aba, k1), px(g.izq, k1), py(g.aba, k1), "rgba(8,13,13," + (0.05 * niebla) + ")");
      }
    }

    // oscuridad que viene de atrás: transparente en el centro, oscura en los bordes, más con el peligro
    var pr = pared(s);
    var rad = cx.createRadialGradient(g.vx, g.vy, Math.min(pr.w, pr.h) * 0.45, g.vx, g.vy, Math.max(W, H) * 0.85);
    rad.addColorStop(0, "rgba(5,8,8,0)");
    rad.addColorStop(1, "rgba(5,8,8," + (0.42 + 0.5 * peligro) + ")");
    cx.fillStyle = rad; cx.fillRect(0, 0, W, H);
    return pr;
  }

  function dibujarFondo(pr) {
    var ultima = E.fase !== "portada" && E.tandas.length > 0 && E.i === E.tandas.length - 1;
    // la pared del fondo
    cx.fillStyle = COL.fondo; cx.fillRect(pr.x0, pr.y0, pr.w, pr.h);
    cx.fillStyle = COL.fondoBajo; cx.fillRect(pr.x0, pr.y1 - pr.h * 0.10, pr.w, pr.h * 0.10);
    cx.strokeStyle = COL.junta; cx.lineWidth = Math.max(1, pr.w * 0.006);
    cx.strokeRect(pr.x0, pr.y0, pr.w, pr.h);

    // cartel de salida sobre la última tanda
    if (ultima) {
      var sw = pr.w * 0.26, sh = pr.h * 0.085, sx = pr.x0 + pr.w / 2 - sw / 2, sy = pr.y0 + pr.h * 0.07;
      cx.shadowColor = "rgba(92,203,132,.9)"; cx.shadowBlur = sh * 0.9;
      cx.fillStyle = "#1F7A3E"; redondo(sx, sy, sw, sh, sh * 0.15); cx.fill();
      cx.shadowBlur = 0;
      cx.fillStyle = "#E9FBEF"; cx.font = "700 " + Math.round(sh * 0.62) + "px Bahnschrift, 'Arial Narrow', sans-serif";
      cx.textAlign = "center"; cx.textBaseline = "middle"; cx.fillText("SALIDA", sx + sw / 2, sy + sh / 2 + 1);
    }

    for (var k = 0; k < pr.puertas.length; k++) {
      var d = pr.puertas[k], tem = E.sacude[k] ? Math.sin(E.reloj * 70) * d.w * 0.045 * E.sacude[k] : 0;
      dibujarPuerta(d.x + tem, d.y, d.w, d.h, E.abre[k], E.marca[k], k);
      rectPuertas[k] = { x: d.x - d.w * 0.2, y: d.y - d.h * 0.3, w: d.w * 1.4, h: d.h * 1.3 };
    }
  }

  function dibujarPuerta(x, y, w, h, abre, marca, k) {
    var m = w * 0.07;
    // luz que se filtra cuando es la correcta
    if (marca === "bien") { cx.shadowColor = "rgba(255,215,102,.95)"; cx.shadowBlur = w * 0.5; }
    cx.fillStyle = COL.marco; cx.fillRect(x - m, y - m, w + m * 2, h + m);
    cx.shadowBlur = 0;
    // el vano: lo que se ve cuando abre
    var vano = cx.createLinearGradient(x, y, x, y + h);
    vano.addColorStop(0, "#FFF4C9"); vano.addColorStop(1, "#E9B94A");
    cx.fillStyle = abre > 0 ? vano : "#120E09"; cx.fillRect(x, y, w, h);

    // la hoja, con bisagra a la izquierda
    var hw = w * (1 - abre * 0.86);
    if (hw > 1) {
      var gr = cx.createLinearGradient(x, y, x + hw, y);
      gr.addColorStop(0, COL.maderaOsc); gr.addColorStop(0.5, COL.madera); gr.addColorStop(1, COL.maderaLuz);
      cx.fillStyle = gr; cx.fillRect(x, y, hw, h);
      // ventanita con vidrio armado
      var vx = x + hw * 0.24, vy = y + h * 0.09, vw = hw * 0.52, vh = h * 0.24;
      cx.fillStyle = COL.marco; cx.fillRect(vx - hw * 0.03, vy - hw * 0.03, vw + hw * 0.06, vh + hw * 0.06);
      cx.fillStyle = marca === "bien" ? "#FFE9A8" : COL.vidrio; cx.fillRect(vx, vy, vw, vh);
      cx.strokeStyle = "rgba(27,36,34,.35)"; cx.lineWidth = Math.max(0.5, hw * 0.012);
      cx.beginPath();
      for (var i = 1; i < 4; i++) { cx.moveTo(vx + vw * i / 4, vy); cx.lineTo(vx + vw * i / 4, vy + vh); }
      for (var j = 1; j < 3; j++) { cx.moveTo(vx, vy + vh * j / 3); cx.lineTo(vx + vw, vy + vh * j / 3); }
      cx.stroke();
      // paneles hundidos
      cx.strokeStyle = COL.maderaOsc; cx.lineWidth = Math.max(1, hw * 0.03);
      cx.strokeRect(x + hw * 0.16, y + h * 0.42, hw * 0.68, h * 0.20);
      cx.strokeRect(x + hw * 0.16, y + h * 0.66, hw * 0.68, h * 0.20);
      // chapa de patadas y picaporte
      cx.fillStyle = COL.zocalo; cx.fillRect(x, y + h * 0.91, hw, h * 0.09);
      cx.fillStyle = COL.herraje;
      cx.beginPath(); cx.arc(x + hw * 0.86, y + h * 0.55, Math.max(1.5, hw * 0.055), 0, 6.3); cx.fill();
      cx.fillRect(x + hw * 0.70, y + h * 0.545, hw * 0.16, Math.max(1.5, h * 0.012));
      if (marca === "mal") { cx.fillStyle = "rgba(194,59,46,.55)"; cx.fillRect(x, y, hw, h); }
    }

    // chapa con la letra, arriba de la puerta
    var ps = Math.max(17, w * 0.52), pxx = x + w / 2 - ps / 2, pyy = y - m - ps * 1.18;
    if (marca === "bien") { cx.shadowColor = "rgba(255,215,102,.9)"; cx.shadowBlur = ps * 0.6; }
    cx.fillStyle = marca === "bien" ? COL.luz : marca === "mal" ? COL.sangre : COL.placa;
    redondo(pxx, pyy, ps, ps, ps * 0.14); cx.fill();
    cx.shadowBlur = 0;
    cx.strokeStyle = "rgba(0,0,0,.45)"; cx.lineWidth = 1.5; cx.stroke();
    cx.fillStyle = marca === "mal" ? "#fff" : COL.tinta;
    cx.font = "700 " + Math.round(ps * 0.7) + "px Bahnschrift, 'Franklin Gothic Medium', 'Arial Narrow', sans-serif";
    cx.textAlign = "center"; cx.textBaseline = "middle";
    cx.fillText(LETRAS[k], pxx + ps / 2, pyy + ps / 2 + ps * 0.04);
  }

  // El jugador, de espaldas: buzo claro, mochila azul, corre moviendo brazos y piernas.
  function dibujarJugador(xc, pieY, alto, fase, quieto) {
    var a = alto, sw = Math.sin(fase), cw = Math.cos(fase);
    var bote = quieto ? 0 : Math.abs(sw) * a * 0.025;
    var y = pieY - bote;
    cx.lineCap = "round"; cx.lineJoin = "round";

    cx.fillStyle = "rgba(0,0,0,.42)";
    cx.beginPath(); cx.ellipse(xc, pieY + a * 0.01, a * 0.2, a * 0.045, 0, 0, 6.3); cx.fill();

    // piernas
    for (var l = -1; l <= 1; l += 2) {
      var sube = quieto ? 0 : Math.max(0, l * sw) * a * 0.13;
      var cadX = xc + l * a * 0.075, cadY = y - a * 0.42;
      var pieX = xc + l * a * 0.085, pieYY = y - a * 0.03 - sube;
      cx.strokeStyle = COL.jean; cx.lineWidth = a * 0.115;
      cx.beginPath(); cx.moveTo(cadX, cadY); cx.quadraticCurveTo(cadX + l * a * 0.03, (cadY + pieYY) / 2, pieX, pieYY); cx.stroke();
      // zapatilla: si el pie está arriba se ve la suela
      cx.fillStyle = sube > a * 0.04 ? "#9A968B" : COL.zapa;
      cx.beginPath(); cx.ellipse(pieX, pieYY + a * 0.02, a * 0.062, a * (sube > a * 0.04 ? 0.05 : 0.036), 0, 0, 6.3); cx.fill();
    }

    // brazos (por detrás del torso)
    for (var b = -1; b <= 1; b += 2) {
      var osc = quieto ? 0 : -b * sw;
      var homX = xc + b * a * 0.165, homY = y - a * 0.72;
      var manX = xc + b * a * (0.24 + 0.02 * osc), manY = y - a * (0.47 + 0.10 * osc);
      cx.strokeStyle = COL.buzoSombra; cx.lineWidth = a * 0.085;
      cx.beginPath(); cx.moveTo(homX, homY); cx.quadraticCurveTo(homX + b * a * 0.09, (homY + manY) / 2, manX, manY); cx.stroke();
      cx.fillStyle = COL.piel; cx.beginPath(); cx.arc(manX, manY, a * 0.042, 0, 6.3); cx.fill();
    }

    // torso con capucha
    cx.fillStyle = COL.buzo; redondo(xc - a * 0.17, y - a * 0.79, a * 0.34, a * 0.42, a * 0.09); cx.fill();
    cx.fillStyle = COL.buzoSombra; redondo(xc - a * 0.17, y - a * 0.44, a * 0.34, a * 0.07, a * 0.03); cx.fill();
    // mochila
    cx.fillStyle = COL.mochilaOsc; redondo(xc - a * 0.135, y - a * 0.75, a * 0.27, a * 0.33, a * 0.07); cx.fill();
    cx.fillStyle = COL.mochila; redondo(xc - a * 0.12, y - a * 0.74, a * 0.24, a * 0.29, a * 0.06); cx.fill();
    cx.fillStyle = COL.mochilaOsc; redondo(xc - a * 0.085, y - a * 0.60, a * 0.17, a * 0.12, a * 0.03); cx.fill();
    cx.strokeStyle = "#C9CEF5"; cx.lineWidth = Math.max(1, a * 0.012);
    cx.beginPath(); cx.moveTo(xc - a * 0.06, y - a * 0.575); cx.lineTo(xc + a * 0.06, y - a * 0.575); cx.stroke();
    cx.strokeStyle = COL.mochilaOsc; cx.lineWidth = a * 0.022;
    cx.beginPath(); cx.arc(xc, y - a * 0.745, a * 0.035, Math.PI, 0); cx.stroke();

    // cabeza de espaldas: capucha baja, cuello, pelo y orejas
    cx.fillStyle = COL.buzoSombra; cx.beginPath(); cx.ellipse(xc, y - a * 0.775, a * 0.115, a * 0.05, 0, 0, 6.3); cx.fill();
    cx.fillStyle = COL.piel; cx.fillRect(xc - a * 0.035, y - a * 0.84, a * 0.07, a * 0.07);
    cx.beginPath(); cx.arc(xc - a * 0.092, y - a * 0.895 + cw * a * 0.002, a * 0.022, 0, 6.3); cx.arc(xc + a * 0.092, y - a * 0.895, a * 0.022, 0, 6.3); cx.fill();
    cx.fillStyle = COL.pelo; cx.beginPath(); cx.arc(xc, y - a * 0.905, a * 0.094, 0, 6.3); cx.fill();
    cx.beginPath(); cx.moveTo(xc - a * 0.09, y - a * 0.88); cx.quadraticCurveTo(xc, y - a * 0.80, xc + a * 0.09, y - a * 0.88); cx.fill();
  }

  // El zombie viene de atrás de la cámara: primero asoman las manos por abajo, después la cabeza.
  function dibujarZombie(prox, embiste) {
    var p = suave(prox);
    if (p <= 0.02 && embiste <= 0.01) return;
    var t = E.reloj, xc = W / 2;
    var R = Math.min(W * 0.13, H * 0.17);                 // radio de la cabeza
    var cab = clamp((p - 0.62) / 0.38, 0, 1) * 0.16 + embiste * 0.30;
    var cabY = H + R * 1.1 - (cab / 0.46) * R * 3.0;
    var incl = -0.13 + Math.sin(t * 1.7) * 0.04;
    cx.lineCap = "round"; cx.lineJoin = "round";

    // hombros y cabeza
    if (cab > 0.002) {
      cx.save();
      cx.translate(xc + Math.sin(t * 2.1) * W * 0.008, cabY);
      cx.rotate(incl);
      // hombros con la camisa rota
      cx.fillStyle = COL.zRopa;
      cx.beginPath(); cx.ellipse(0, R * 2.0, W * 0.36, R * 1.35, 0, 0, 6.3); cx.fill();
      cx.fillStyle = COL.zRopaOsc;
      cx.beginPath(); cx.moveTo(-R * 0.9, R * 0.95);
      for (var i = 0; i <= 8; i++) cx.lineTo(-R * 0.9 + i * R * 0.225, R * (i % 2 ? 1.32 : 1.02));
      cx.lineTo(R * 0.9, R * 2.2); cx.lineTo(-R * 0.9, R * 2.2); cx.closePath(); cx.fill();
      // cuello
      cx.fillStyle = COL.zPielOsc; cx.fillRect(-R * 0.36, R * 0.55, R * 0.72, R * 0.6);
      // orejas (una rota)
      cx.fillStyle = COL.zPielOsc;
      cx.beginPath(); cx.ellipse(-R * 0.98, R * 0.08, R * 0.16, R * 0.26, 0.2, 0, 6.3); cx.fill();
      cx.beginPath(); cx.moveTo(R * 0.9, -R * 0.12); cx.lineTo(R * 1.16, -R * 0.02); cx.lineTo(R * 1.0, R * 0.1); cx.lineTo(R * 1.14, R * 0.3); cx.lineTo(R * 0.9, R * 0.3); cx.closePath(); cx.fill();
      // cráneo
      var gc = cx.createRadialGradient(-R * 0.3, -R * 0.4, R * 0.1, 0, 0, R * 1.15);
      gc.addColorStop(0, COL.zPiel); gc.addColorStop(1, COL.zPielOsc);
      cx.fillStyle = gc;
      cx.beginPath(); cx.ellipse(0, 0, R * 0.98, R * 1.08, 0, 0, 6.3); cx.fill();
      // herida y venas
      cx.fillStyle = COL.zHerida;
      cx.beginPath(); cx.ellipse(R * 0.38, -R * 0.28, R * 0.24, R * 0.16, 0.5, 0, 6.3); cx.fill();
      cx.strokeStyle = "rgba(53,68,40,.8)"; cx.lineWidth = Math.max(1, R * 0.035);
      cx.beginPath(); cx.moveTo(-R * 0.55, R * 0.5); cx.lineTo(-R * 0.4, R * 0.15); cx.lineTo(-R * 0.58, -R * 0.1);
      cx.moveTo(-R * 0.4, R * 0.15); cx.lineTo(-R * 0.18, R * 0.02); cx.stroke();
      // mechones ralos
      cx.strokeStyle = COL.zPelo; cx.lineWidth = Math.max(1.5, R * 0.07);
      cx.beginPath();
      for (var m = 0; m < 9; m++) {
        var ang = -2.75 + m * 0.3, r1 = R * (0.86 + ruidoFijo(m) * 0.1), largo = R * (0.3 + ruidoFijo(m + 20) * 0.35);
        var mx = Math.cos(ang) * r1 * 0.95, my = Math.sin(ang) * r1;
        cx.moveTo(mx, my); cx.lineTo(mx + Math.cos(ang) * largo * 0.2 + R * 0.06, my + largo);
      }
      cx.stroke();
      cx.restore();
    }

    // brazos y manos hacia el jugador
    var sube = lerp(-0.16, 0.22, p) + embiste * 0.24;
    for (var l = -1; l <= 1; l += 2) {
      var manoX = xc + l * W * lerp(0.31, 0.15, p) - l * embiste * W * 0.05 + Math.sin(t * 2.3 + l) * W * 0.012;
      var manoY = H - H * sube + Math.sin(t * 3.1 + l * 2) * H * 0.012;
      var codoX = xc + l * W * 0.47, codoY = H + H * 0.16;
      var dx = manoX - codoX, dy = manoY - codoY, len = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / len, ny = dx / len;
      var anchoC = W * 0.075, anchoM = W * 0.04;
      // antebrazo
      cx.fillStyle = COL.zPielOsc;
      cx.beginPath();
      cx.moveTo(codoX + nx * anchoC, codoY + ny * anchoC); cx.lineTo(manoX + nx * anchoM, manoY + ny * anchoM);
      cx.lineTo(manoX - nx * anchoM, manoY - ny * anchoM); cx.lineTo(codoX - nx * anchoC, codoY - ny * anchoC);
      cx.closePath(); cx.fill();
      // manga rota (la mitad de abajo, con borde en zigzag)
      cx.fillStyle = COL.zRopa;
      cx.beginPath();
      cx.moveTo(codoX + nx * anchoC * 1.15, codoY + ny * anchoC * 1.15);
      for (var z = 0; z <= 6; z++) {
        var u = z / 6, f = 0.42 + (z % 2 ? 0.1 : 0), wz = lerp(anchoC, anchoM, f) * 1.15;
        cx.lineTo(codoX + dx * f + nx * wz * (1 - 2 * u), codoY + dy * f + ny * wz * (1 - 2 * u));
      }
      cx.lineTo(codoX - nx * anchoC * 1.15, codoY - ny * anchoC * 1.15);
      cx.closePath(); cx.fill();
      // mano: palma, cuatro dedos crispados y pulgar
      var ux = dx / len, uy = dy / len, palma = W * 0.052;
      cx.fillStyle = COL.zPiel;
      cx.beginPath(); cx.ellipse(manoX + ux * palma * 0.5, manoY + uy * palma * 0.5, palma, palma * 0.85, Math.atan2(uy, ux), 0, 6.3); cx.fill();
      for (var d = 0; d < 4; d++) {
        var ab = (d - 1.5) * 0.36 + Math.sin(t * 5 + d + l) * 0.07;
        var ca = Math.cos(ab), sa = Math.sin(ab);
        var fx = ux * ca - uy * sa, fy = ux * sa + uy * ca;
        var bx = manoX + ux * palma * 0.9 + nx * (d - 1.5) * palma * 0.45, by = manoY + uy * palma * 0.9 + ny * (d - 1.5) * palma * 0.45;
        var largoD = palma * (1.25 + (d === 1 || d === 2 ? 0.25 : 0));
        var mx2 = bx + fx * largoD * 0.6, my2 = by + fy * largoD * 0.6;
        // la falange de la punta se dobla hacia adentro
        var tx = mx2 + (fx * 0.6 - nx * l * 0.5) * largoD * 0.45, ty = my2 + (fy * 0.6 - ny * l * 0.5) * largoD * 0.45;
        cx.strokeStyle = COL.zPiel; cx.lineWidth = palma * 0.42;
        cx.beginPath(); cx.moveTo(bx, by); cx.lineTo(mx2, my2); cx.lineTo(tx, ty); cx.stroke();
        cx.fillStyle = COL.zUña; cx.beginPath(); cx.arc(tx, ty, palma * 0.13, 0, 6.3); cx.fill();
      }
      cx.strokeStyle = COL.zPiel; cx.lineWidth = palma * 0.46;
      cx.beginPath(); cx.moveTo(manoX - nx * l * palma * 0.6, manoY - ny * l * palma * 0.6);
      cx.lineTo(manoX - nx * l * palma * 1.3 + ux * palma * 0.7, manoY - ny * l * palma * 1.3 + uy * palma * 0.7); cx.stroke();
    }
  }

  function dibujar() {
    var peligro = E.fase === "portada" ? 0.25 : clamp(E.zombi, 0, 1);
    cx.setTransform(DPR, 0, 0, DPR, 0, 0);
    cx.save();
    if (E.tiembla > 0.01 && !QUIETO) cx.translate((Math.random() - 0.5) * 14 * E.tiembla, (Math.random() - 0.5) * 10 * E.tiembla);
    var pr = dibujarPasillo(peligro);
    dibujarFondo(pr);

    var alto = Math.min(H * 0.34, W * 0.42) * E.pEsc;
    var pieY = lerp(H * 0.93, pr.y1 + alto * 0.02, clamp((1 - E.pEsc) / 0.45, 0, 1) * 0.75);
    var quieto = E.fase === "mordida" || E.fase === "cae" || E.pausa;
    if (E.fase !== "fin" || E.negro < 1) dibujarJugador(W / 2 + E.pN * W, pieY, alto, E.dist * 9, quieto);
    dibujarZombie(E.fase === "portada" ? 0.34 + Math.sin(E.reloj * 0.8) * 0.06 : E.zombi, E.embiste);
    cx.restore();

    if (E.rojo > 0.01) { cx.fillStyle = "rgba(170,22,18," + (0.55 * E.rojo) + ")"; cx.fillRect(0, 0, W, H); }
    if (E.fundido > 0.01) { cx.fillStyle = "rgba(255,236,170," + clamp(E.fundido, 0, 1) + ")"; cx.fillRect(0, 0, W, H); }
    if (E.negro > 0.01) { cx.fillStyle = "rgba(20,3,3," + clamp(E.negro, 0, 1) + ")"; cx.fillRect(0, 0, W, H); }
  }

  /* ---------------------------- Actualización --------------------------- */
  var peligroCss = -1;
  function actualizar(dt) {
    E.reloj += dt;
    var corre = E.fase === "pregunta" || E.fase === "corre" || E.fase === "revela" || E.fase === "cruza" || E.fase === "portada" || E.fase === "caso";
    E.dist += dt * CFG.velPasillo * (corre ? (E.fase === "portada" || E.fase === "caso" ? 0.6 : 1) : 0.12);
    E.rojo = Math.max(0, E.rojo - dt * 1.6);
    E.tiembla = Math.max(0, E.tiembla - dt * 2.4);
    for (var k = 0; k < 4; k++) E.sacude[k] = Math.max(0, E.sacude[k] - dt * 2.4);

    var objetivoZ = 0, u;
    switch (E.fase) {
      case "pregunta":
        E.t += dt;
        E.fundido = Math.max(0, E.fundido - dt * 2.4);
        objetivoZ = E.t / E.tMax;
        E.s = lerp(CFG.sLejos, CFG.sCerca, clamp(objetivoZ, 0, 1));
        if (E.t >= E.tMax) seAcaboElTiempo();
        break;
      case "corre":
        E.ft += dt; u = E.ft / CFG.dCorre;
        objetivoZ = E.t / E.tMax;
        E.s = lerp(E.s0, E.s0 + 0.07, frena(u));
        E.pN = lerp(E.pN0, xPuertaN(E.elegida, E.s), frena(u));
        E.pEsc = lerp(1, 0.78, frena(u));
        if (u >= 1) {
          if (E.acerto) { Sonido.puerta(); Sonido.acierto(); E.s0 = E.s; E.ft = 0; E.fase = "cruza"; }
          else { Sonido.golpe(); E.marca[E.elegida] = "mal"; E.sacude[E.elegida] = 1; E.tiembla = 0.5; E.ft = 0; E.fase = "rebote"; }
        }
        break;
      case "rebote":
        E.ft += dt; u = E.ft / CFG.dRebote;
        objetivoZ = 1;
        E.pN = lerp(xPuertaN(E.elegida, E.s), 0, frena(u));
        E.pEsc = lerp(0.78, 1, frena(u));
        if (u >= 1) morder("¡D'oh!");
        break;
      case "mordida":
        E.ft += dt; u = E.ft / CFG.dMordida;
        objetivoZ = 1;
        E.embiste = Math.sin(clamp(u, 0, 1) * Math.PI);
        E.pN = lerp(E.pN, 0, clamp(dt * 8, 0, 1)); E.pEsc = lerp(E.pEsc, 1, clamp(dt * 8, 0, 1));
        if (u >= 1) {
          E.ft = 0;
          if (E.vidas <= 0) { E.fase = "cae"; }
          else { E.embiste = 0; E.pN0 = E.pN; E.s0 = E.s; E.fase = "revela"; }
        }
        break;
      case "revela":
        E.ft += dt; u = E.ft / CFG.dRevela;
        objetivoZ = 0.45;
        E.s = lerp(E.s0, Math.min(E.s0 + 0.07, 0.8), frena(u));
        E.pN = lerp(E.pN0, xPuertaN(E.correcta, E.s), frena(u));
        E.pEsc = lerp(1, 0.78, frena(u));
        if (u >= 1) { Sonido.puerta(); E.elegida = E.correcta; E.s0 = E.s; E.ft = 0; E.fase = "cruza"; }
        break;
      case "cruza":
        E.ft += dt; u = E.ft / CFG.dCruza;
        objetivoZ = 0;
        E.abre[E.elegida] = frena(u * 1.7);
        E.s = lerp(E.s0, E.s0 + 0.42, u * u);
        E.pN = xPuertaN(E.elegida, E.s);
        E.pEsc = lerp(0.78, 0.58, clamp(u, 0, 1));
        E.fundido = clamp(u * u * 1.15, 0, 1);
        if (u >= 1) { E.fundido = 1; siguiente(); }
        break;
      case "cae":
        E.ft += dt; u = E.ft / CFG.dCae;
        objetivoZ = 1;
        E.embiste = lerp(E.embiste, 1, clamp(dt * 5, 0, 1));
        E.negro = clamp(u, 0, 1);
        if (u >= 1) terminar(false);
        break;
      case "caso":
        E.fundido = Math.max(0, E.fundido - dt * 2.4);
        objetivoZ = 0.15;
        E.s = CFG.sLejos;
        break;
      case "portada":
        objetivoZ = 0.3;
        E.s = CFG.sLejos + Math.sin(E.reloj * 0.4) * 0.01;
        break;
      default:
        objetivoZ = E.zombi;
    }
    E.zombi = lerp(E.zombi, clamp(objetivoZ, 0, 1), clamp(dt * 6, 0, 1));

    // el borde rojo de las opciones acompaña al zombie (por si mirás las tarjetas y no el pasillo)
    var pc = E.fase === "pregunta" ? Math.round(clamp((E.zombi - 0.45) / 0.55, 0, 1) * 20) / 20 : 0;
    if (pc !== peligroCss) { peligroCss = pc; document.documentElement.style.setProperty("--peligro", String(pc)); }

    // sonidos de fondo
    if (E.fase !== "portada" && E.fase !== "fin" && E.fase !== "caso") {
      if (corre) { E.tPaso -= dt; if (E.tPaso <= 0) { Sonido.paso(); E.tPaso = 0.29; } }
      if (E.fase === "pregunta" && E.zombi > 0.5) {
        E.tLatido -= dt;
        if (E.tLatido <= 0) { Sonido.latido(clamp((E.zombi - 0.4) / 0.6, 0.2, 1)); E.tLatido = lerp(1.05, 0.5, clamp((E.zombi - 0.5) / 0.5, 0, 1)); }
      }
      E.tGruñido -= dt;
      if (E.tGruñido <= 0) { Sonido.gruñido(0.4 + E.zombi); E.tGruñido = lerp(5.5, 2.2, E.zombi) + Math.random() * 1.5; }
    }
  }

  /* ------------------------------- Bucle -------------------------------- */
  var antes = 0;
  function cuadro(ahora) {
    var dt = Math.min(0.05, (ahora - antes) / 1000 || 0);
    antes = ahora;
    if (!E.pausa && E.fase !== "fin") actualizar(dt);
    if (E.fase !== "fin") dibujar();
    requestAnimationFrame(cuadro);
  }

  function medir() {
    var r = dom.escena.getBoundingClientRect();
    W = Math.max(120, Math.round(r.width)); H = Math.max(120, Math.round(r.height));
    DPR = Math.min(2, window.devicePixelRatio || 1);
    dom.lienzo.width = Math.round(W * DPR); dom.lienzo.height = Math.round(H * DPR);
  }

  /* ------------------------------ Controles ----------------------------- */
  function pausar(si) {
    if (E.fase === "portada" || E.fase === "fin" || !dom.caso.hidden) return;
    E.pausa = si;
    dom.pausa.hidden = !si;
    if (si) { Sonido.suspender(); $("btn-seguir").focus({ preventScroll: true }); }
    else { Sonido.reanudar(); antes = performance.now(); }
  }

  dom.ops.forEach(function (b) {
    b.addEventListener("click", function () { elegir(parseInt(b.getAttribute("data-k"), 10)); });
  });
  dom.lienzo.addEventListener("pointerdown", function (ev) {
    if (E.fase !== "pregunta" || E.pausa) return;
    var r = dom.lienzo.getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top, mejor = -1, dist = 1e9;
    for (var k = 0; k < E.n; k++) {
      var p = rectPuertas[k];
      if (!p || x < p.x || x > p.x + p.w || y < p.y || y > p.y + p.h) continue;
      var d = Math.abs(x - (p.x + p.w / 2));
      if (d < dist) { dist = d; mejor = k; }
    }
    if (mejor >= 0) { ev.preventDefault(); elegir(mejor); }
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    var t = ev.key.toLowerCase();
    if (E.fase === "pregunta" && !E.pausa) {
      var k = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 }[t];
      if (k != null) { ev.preventDefault(); elegir(k); return; }
    }
    if (!dom.caso.hidden) { if (t === "escape" || t === "enter") { ev.preventDefault(); cerrarCaso(); } return; }
    if (t === "escape" || t === "p") { if (E.fase !== "portada" && E.fase !== "fin") { ev.preventDefault(); pausar(!E.pausa); } }
  });
  $("btn-correr").addEventListener("click", function () { Sonido.iniciar(); nueva(); });
  $("btn-otra").addEventListener("click", function () { Sonido.iniciar(); nueva(); });
  $("btn-reiniciar").addEventListener("click", function () { Sonido.reanudar(); nueva(); });
  $("btn-seguir").addEventListener("click", function () { pausar(false); });
  $("btn-caso-seguir").addEventListener("click", cerrarCaso);
  dom.verCaso.addEventListener("click", function () { if (E.fase === "pregunta" && !E.pausa) mostrarCaso(true); });
  $("btn-cambiar").addEventListener("click", function () { irAPortada(); });
  $("btn-salir").addEventListener("click", function () { irAPortada(); });
  $("btn-pausa").addEventListener("click", function () { pausar(!E.pausa); });
  var bs = $("btn-sonido");
  function pintarSonido() {
    var m = Sonido.esMudo();
    bs.classList.toggle("mudo", m);
    bs.setAttribute("aria-pressed", m ? "true" : "false");
    bs.setAttribute("aria-label", m ? "Activar el sonido" : "Silenciar el sonido");
  }
  bs.addEventListener("click", function () { Sonido.iniciar(); Sonido.alternar(); pintarSonido(); });
  document.addEventListener("visibilitychange", function () { if (document.hidden && !E.pausa && E.fase !== "caso") pausar(true); });
  window.addEventListener("resize", medir);
  if (window.ResizeObserver) new ResizeObserver(medir).observe(dom.escena);

  /* ------------------------------ Arranque ------------------------------ */
  /* ------------------------- Portada: elegir materia ------------------------- */
  function elegirMazo(mazo, recordar) {
    E.mazo = mazo;
    var n = totalPreguntas(mazo), casos = mazo.grupos.filter(function (g) { return g.caso; }).length;
    var puertas = mazo.grupos[0].preguntas[0].ops.length;
    Array.prototype.forEach.call($("mazos").children, function (b) {
      var on = b.getAttribute("data-id") === mazo.id;
      b.classList.toggle("on", on); b.setAttribute("aria-checked", on ? "true" : "false");
    });
    $("portada-bajada").textContent = "Corrés por el pasillo de la facultad con un zombie en la nuca. Cada tanda de " +
      (puertas === 4 ? "cuatro" : "tres") + " puertas es una pregunta: tocá la puerta correcta antes de que te alcance.";
    $("regla-n").textContent = n;
    $("regla-puertas").textContent = casos
      ? "puertas hasta la salida: " + casos + " casos en un orden distinto cada vez. Cada caso lo leés tranquilo antes de correr."
      : "puertas hasta la salida, en un orden distinto cada vez.";
    $("btn-repasar").href = mazo.apunte;
    $("link-marca").href = mazo.volver; $("link-marca").title = "Volver al apunte de " + mazo.materia;
    $("link-salir-pausa").href = mazo.volver; $("link-volver-fin").href = mazo.volver;
    dom.avance.textContent = "0/" + n;
    dom.cintillo.textContent = mazo.materia + " · " + mazo.detalle;
    if (recordar) {
      try { localStorage.setItem(CLAVE_MAZO, mazo.id); } catch (e) {}
      try { history.replaceState(null, "", "#mazo=" + mazo.id); } catch (e) {}
    }
  }
  function pintarMazos() {
    var caja = $("mazos");
    caja.textContent = "";
    MAZOS.forEach(function (mz) {
      var b = el("button", "mazo");
      b.type = "button"; b.setAttribute("role", "radio"); b.setAttribute("data-id", mz.id);
      b.appendChild(el("b", "", mz.materia));
      var casos = mz.grupos.filter(function (g) { return g.caso; }).length;
      b.appendChild(el("span", "", mz.detalle + " · " + totalPreguntas(mz) + " puertas" + (casos ? " · " + casos + " casos" : "")));
      var mejor = leerMejor(mz);
      b.appendChild(el("small", "", mejor ? "Tu mejor marca: " + textoMejor(mejor, mz) : "Todavía sin jugar"));
      b.addEventListener("click", function () { elegirMazo(mz, true); });
      caja.appendChild(b);
    });
  }
  function irAPortada() {
    E.fase = "portada"; E.pausa = false; E.negro = 0; E.rojo = 0; E.fundido = 0; E.embiste = 0; E.zombi = 0.3;
    E.n = 3; E.tandas = []; E.i = 0; E.marca = ["", "", "", ""]; E.abre = [0, 0, 0, 0]; E.pN = 0; E.pEsc = 1;
    E.vidas = CFG.vidas; E.racha = 0;
    Sonido.reanudar();
    dom.fin.hidden = true; dom.pausa.hidden = true; dom.caso.hidden = true; dom.portada.hidden = false;
    dom.pregunta.textContent = ""; dom.verCaso.hidden = true;
    dom.ops.forEach(function (b, j) { b.className = "op"; b.disabled = true; b.hidden = j >= 3; b.querySelector("span").textContent = ""; });
    pintarHud(); pintarMazos(); elegirMazo(E.mazo, false);
    antes = performance.now();
  }
  function mazoInicial() {
    var id = (location.hash.match(/mazo=([\w-]+)/) || [])[1];
    if (!id) { try { id = localStorage.getItem(CLAVE_MAZO); } catch (e) {} }
    for (var i = 0; i < MAZOS.length; i++) if (MAZOS[i].id === id) return MAZOS[i];
    return MAZOS[0];
  }

  pintarSonido();
  pintarHud();
  if (MAZOS.length) { E.mazo = mazoInicial(); pintarMazos(); elegirMazo(E.mazo, false); }
  else { $("btn-correr").disabled = true; $("portada-bajada").textContent = "No se pudieron cargar las preguntas."; }
  medir();
  requestAnimationFrame(function (t) { antes = t; requestAnimationFrame(cuadro); });

  // Para probar desde la consola: juego.estado, juego.elegir(0..2), juego.correcta(), juego.CFG
  window.juego = {
    estado: E, CFG: CFG, MAZOS: MAZOS, elegir: elegir, nueva: nueva, cerrarCaso: cerrarCaso,
    mazo: function (id) { MAZOS.forEach(function (m) { if (m.id === id) elegirMazo(m, false); }); },
    // avanza el juego «a mano» n segundos (sirve para probar sin esperar ni depender de la pestaña visible)
    paso: function (seg) { for (var t = 0; t < seg && E.fase !== "fin"; t += 1 / 60) actualizar(1 / 60); if (E.fase !== "fin") dibujar(); },
    correcta: function () { return E.correcta; }
  };
})();
