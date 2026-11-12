/* Armá el flujo (flujo-ia.html): el motor del pizarrón. Los datos están en js/flujo-ia-datos.js y la revisión de un
   flujo en js/flujo-ia-eval.js (la misma que usa tools/medir_flujo_ia.js).
   Se juega con puntero (mouse o dedo): tocar una caja de la bandeja la suma en su carril; se mueve arrastrándola; los
   cables se tiran desde el punto de salida (el círculo de la derecha) hasta otra caja, o tocando el punto y después la
   caja de destino. Tocar una caja o un cable los selecciona para quitarlos. */
(function () {
  "use strict";
  var F = window.FLUJO_IA, M = window.FlujoIA, CAJA = M.CAJA;
  var NS = "http://www.w3.org/2000/svg";
  var K_EST = "flujo-ia-estrellas", K_DEMO = "flujo-ia-demo-visto";

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function sv(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function leer(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } }
  function guardar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var FAM = {};
  F.familias.forEach(function (f) { FAM[f.id] = f; });

  /* ------------------------------ Estado ------------------------------ */
  var S = { sit: null, nodos: [], enlaces: [], sel: null, armado: null, pistas: 0, modelo: false, fam: "cap" };
  var GUARDADO = {};        // lo que se armó en cada situación mientras la página está abierta
  var G = { W: 600, H: 400, laneW: 150, nodeW: 120, nodeH: 50, top: 30, fila: 56, paso: 62 };
  var POS = {};             // posición en píxeles de cada caja del tablero que se está dibujando
  var demoPaso = 0, pendiente = null;
  var VISTAS = {};          // frases que ya estaban en «Mi respuesta» (para resaltar la que se suma)
  var tabJ = $("tab-juego"), tabD = $("tab-demo");

  function mostrar(id) {
    ["sc-portada", "sc-demo", "sc-juego"].forEach(function (s) { $(s).hidden = s !== id; });
  }

  /* ---------------------------- Geometría ----------------------------- */
  function geom(cont) {
    var r = cont.getBoundingClientRect();
    G.W = Math.max(280, r.width); G.H = Math.max(280, r.height);
    G.laneW = G.W / 4;
    G.nodeW = clamp(Math.round(G.laneW - 12), 80, 134);
    G.nodeH = G.nodeW < 110 ? 54 : 52;
    G.top = 30;
    G.paso = G.nodeH + 12;
    G.fila = Math.min(G.paso, (G.H - G.top - G.nodeH - 6) / 4);     // las cinco filas de las soluciones entran siempre
    cont.classList.toggle("angosto", G.nodeW < 112);
  }
  function celda(c, f) { return { x: c * G.laneW + (G.laneW - G.nodeW) / 2, y: G.top + f * G.fila }; }

  function nodosPx(modo) {
    if (modo === "juego") {
      return S.nodos.map(function (n) {
        return { id: n.id, x: clamp(n.fx * G.W, 0, G.W - G.nodeW), y: clamp(n.fy * G.H, 20, G.H - G.nodeH - 2) };
      });
    }
    var lista = modo === "modelo" ? S.sit.modelo.n : F.demo.n.slice(0, demoPaso);
    return lista.map(function (x) { var c = celda(x[1], x[2]); return { id: x[0], x: c.x, y: c.y }; });
  }
  function enlacesDe(modo) {
    if (modo === "juego") return S.enlaces.map(function (e) { return [e.a, e.b]; });
    if (modo === "modelo") return S.sit.modelo.e;
    var vis = {};
    F.demo.n.slice(0, demoPaso).forEach(function (x) { vis[x[0]] = 1; });
    return F.demo.e.filter(function (e) { return vis[e[0]] && vis[e[1]]; });
  }

  /* ------------------------------ Dibujo ------------------------------ */
  function curva(a, b) {
    if (Math.abs(a.x - b.x) < G.nodeW * 0.9) {            // una caja arriba de la otra: el cable sale por abajo (o arriba) y entra por el borde de enfrente
      var abajo = b.y >= a.y, xm1 = a.x + G.nodeW / 2, ya = abajo ? a.y + G.nodeH : a.y, xm2 = b.x + G.nodeW / 2, yb = abajo ? b.y : b.y + G.nodeH, dy = Math.max(24, Math.abs(yb - ya) * 0.45) * (abajo ? 1 : -1);
      return "M" + xm1 + " " + ya + " C" + xm1 + " " + (ya + dy) + " " + xm2 + " " + (yb - dy) + " " + xm2 + " " + yb;
    }
    var x1 = a.x + G.nodeW, y1 = a.y + G.nodeH / 2, x2 = b.x, y2 = b.y + G.nodeH / 2;
    var dx = x2 > x1 ? clamp((x2 - x1) * 0.5, 14, 70) : 70;      // casi recto si la otra caja está al lado; con rulo si está para atrás
    return "M" + x1 + " " + y1 + " C" + (x1 + dx) + " " + y1 + " " + (x2 - dx) + " " + y2 + " " + x2 + " " + y2;
  }
  function trazar(cont, enlaces, interactivo) {
    var svg = cont.querySelector(".cables");
    Array.prototype.slice.call(svg.querySelectorAll(".cable, .hit")).forEach(function (p) { p.remove(); });
    enlaces.forEach(function (e, i) {
      var a = POS[e[0]], b = POS[e[1]];
      if (!a || !b) return;
      var d = curva(a, b), sel = interactivo && S.sel && S.sel.tipo === "enlace" && S.sel.id === i;
      svg.appendChild(sv("path", { "class": "cable" + (sel ? " sel" : ""), d: d, "marker-end": "url(#flecha)" }));
      if (interactivo) svg.appendChild(sv("path", { "class": "hit", d: d, "data-i": i }));
    });
  }

  function crearNodo(n, modo, nuevo) {
    var c = CAJA[n.id], d = el("div", "nodo f-" + c.fam);
    d.setAttribute("data-id", n.id);
    d.style.left = n.x + "px"; d.style.top = n.y + "px"; d.style.width = G.nodeW + "px"; d.style.height = G.nodeH + "px";
    var t = el("div", "txt"); t.appendChild(el("b", "", c.t)); t.appendChild(el("small", "", c.s)); d.appendChild(t);
    if (!c.entrada) d.appendChild(el("i", "din"));         // círculo de entrada (izquierda): las cajas que no son solo de entrada
    d.appendChild(el("i", "dot"));                          // círculo de salida (derecha)
    if (modo !== "juego") d.classList.add("fijo");
    if (modo === "juego" && S.sel && S.sel.tipo === "nodo" && S.sel.id === n.id) d.classList.add("sel");
    if (modo === "juego" && S.armado === n.id) d.classList.add("armado");
    if (nuevo) d.classList.add("nuevo");
    return d;
  }

  function dibujar(cont, modo) {
    geom(cont);
    var aviso = cont.querySelector(".aviso");              // el aviso sobrevive al redibujado (si no, «ya están enlazados» desaparecía al instante)
    cont.textContent = "";
    F.carriles.forEach(function (t, i) {
      var c = el("div", "carril"); c.style.left = (i * 25) + "%"; c.appendChild(el("span", "", t)); cont.appendChild(c);
    });
    var svg = sv("svg", { "class": "cables" });
    var defs = sv("defs", {}), mk = sv("marker", { id: "flecha", viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "7", markerHeight: "7", orient: "auto" });
    mk.appendChild(sv("path", { d: "M0 0L8 4L0 8z", fill: "#8A939A" }));
    defs.appendChild(mk); svg.appendChild(defs); cont.appendChild(svg);

    if (modo === "juego" && esFacil()) {                   // nivel fácil: las cajas punteadas marcan lo que todavía falta
      faltantes().forEach(function (x) {
        var c = celda(x[1], x[2]), c2 = CAJA[x[0]], g = el("div", "hueco f-" + c2.fam);
        g.style.left = c.x + "px"; g.style.top = c.y + "px"; g.style.width = G.nodeW + "px"; g.style.height = G.nodeH + "px";
        g.appendChild(el("b", "", "?")); g.appendChild(el("small", "", famTitulo(c2.fam)));
        cont.appendChild(g);
      });
    }
    var lista = nodosPx(modo);
    POS = {};
    lista.forEach(function (n) { POS[n.id] = { x: n.x, y: n.y }; });
    lista.forEach(function (n, i) { cont.appendChild(crearNodo(n, modo, modo === "demo" && i === lista.length - 1)); });
    trazar(cont, enlacesDe(modo), modo === "juego");

    if (aviso) cont.appendChild(aviso);
    if (modo === "juego" && !lista.length) cont.appendChild(el("div", "vacio", esFacil()
      ? "Las cajas punteadas son las que faltan. Tocá una caja de abajo: si es la que va en ese lugar, se acomoda sola."
      : "El pizarrón está vacío. Tocá una caja de abajo para sumarla y arrancá por la entrada."));
    if (modo === "modelo") {
      var cinta = el("div", "cinta");
      cinta.appendChild(el("span", "", "Solución modelo: una de varias posibles"));
      var b = el("button", "btn chico", "Volver a mi flujo"); b.setAttribute("data-a", "volver"); cinta.appendChild(b);
      cont.appendChild(cinta);
    }
  }

  function redibujar() {
    dibujar(tabJ, S.modelo ? "modelo" : "juego");
    $("j-info").textContent = S.nodos.length + (S.nodos.length === 1 ? " caja" : " cajas") + " · " + S.enlaces.length + (S.enlaces.length === 1 ? " cable" : " cables") +
      (esFacil() && !S.modelo ? " · faltan " + faltantes().length : "");
    pintarResp();
    $("bandeja").style.opacity = S.modelo ? ".45" : ""; $("bandeja").style.pointerEvents = S.modelo ? "none" : "";
    pintarSelbar();
  }
  function avisar(texto) {
    var a = tabJ.querySelector(".aviso");
    if (a) a.remove();
    a = el("div", "aviso", texto); tabJ.appendChild(a);
    clearTimeout(avisar.t); avisar.t = setTimeout(function () { a.remove(); }, 4500);
  }

  /* ----------------------------- Edición ------------------------------ */
  function puesta(id) { return S.nodos.some(function (n) { return n.id === id; }); }
  function colocar(id, x, y) {
    if (puesta(id)) return;
    x = clamp(x, 0, G.W - G.nodeW); y = clamp(y, 20, G.H - G.nodeH - 2);
    S.nodos.push({ id: id, fx: x / G.W, fy: y / G.H });
    S.sel = { tipo: "nodo", id: id }; S.armado = null;
    redibujar(); pintarBandeja();
  }
  // tocar una caja de la bandeja: va a su carril, en la primera fila libre
  function autoColocar(id) {
    if (esFacil()) {                                        // si la caja es una de las que faltan, se acomoda sola en su fantasma
      var f = faltantes().filter(function (x) { return x[0] === id; })[0];
      if (f) { var cc = celda(f[1], f[2]); colocar(id, cc.x, cc.y); return; }
    }
    var lane = FAM[CAJA[id].fam].carril, filas = Math.max(3, Math.floor((G.H - G.top - G.nodeH) / G.paso) + 1), y = null, x = celda(lane, 0).x;
    for (var k = 0; k < filas && y === null; k++) {
      var f = (k + lane % 2) % filas, yy = G.top + f * G.paso;       // los carriles contiguos arrancan en filas distintas: así los cables se ven
      var libre = !S.nodos.some(function (n) { return Math.abs(n.fx * G.W - x) < G.nodeW * 0.85 && Math.abs(n.fy * G.H - yy) < G.nodeH * 0.85; });
      if (libre) y = yy;
    }
    if (y === null) { y = G.top + (S.nodos.length % filas) * G.paso; x += (S.nodos.length % 3) * 12 - 12; }
    colocar(id, x, y);
  }
  function crearEnlace(a, b) {
    if (a === b) return;
    if (CAJA[b].entrada) { avisar("«" + CAJA[b].t + "» es solo de entrada: no recibe cables."); S.armado = null; return; }
    if (S.enlaces.some(function (e) { return e.a === a && e.b === b; })) { avisar("Esos dos ya están enlazados."); return; }
    S.enlaces.push({ a: a, b: b });
    S.sel = null; S.armado = null;
  }
  function quitarNodo(id) {
    S.nodos = S.nodos.filter(function (n) { return n.id !== id; });
    S.enlaces = S.enlaces.filter(function (e) { return e.a !== id && e.b !== id; });
    S.sel = null; S.armado = null; redibujar(); pintarBandeja();
  }
  function quitarCablesDe(id) {
    S.enlaces = S.enlaces.filter(function (e) { return e.a !== id && e.b !== id; });
    S.sel = null; redibujar();
  }
  function seleccionar(tipo, id) { S.sel = tipo ? { tipo: tipo, id: id } : null; if (!tipo) S.armado = null; redibujar(); }

  function pintarSelbar() {
    var b = $("selbar");
    b.textContent = "";
    if (S.modelo || (!S.sel && !S.armado)) { b.hidden = true; return; }
    b.hidden = false;
    function boton(txt, f) { var x = el("button", "", txt); x.type = "button"; x.addEventListener("click", f); b.appendChild(x); }
    if (S.armado) {
      b.appendChild(el("span", "", "Salida de "));
      b.appendChild(el("b", "", CAJA[S.armado].t));
      b.appendChild(el("span", "", ": tocá la caja de destino"));
      boton("Cancelar", function () { S.armado = null; redibujar(); });
    } else if (S.sel.tipo === "nodo") {
      var id = S.sel.id;
      b.appendChild(el("b", "", CAJA[id].t));
      boton("Quitar caja", function () { quitarNodo(id); });
      boton("Quitar sus cables", function () { quitarCablesDe(id); });
      boton("Listo", function () { seleccionar(null); });
    } else {
      var e = S.enlaces[S.sel.id];
      if (!e) { b.hidden = true; return; }
      b.appendChild(el("span", "", "Cable "));
      b.appendChild(el("b", "", CAJA[e.a].t + " → " + CAJA[e.b].t));
      boton("Quitar cable", function () { S.enlaces.splice(S.sel.id, 1); seleccionar(null); });
      boton("Listo", function () { seleccionar(null); });
    }
  }

  /* ------------------------ Punteros: mover y enlazar ------------------------ */
  var drag = null, lnk = null, cd = null, suprimirClick = false;
  function aTablero(ev) { var r = tabJ.getBoundingClientRect(); return { x: ev.clientX - r.left, y: ev.clientY - r.top }; }

  tabJ.addEventListener("pointerdown", function (ev) {
    if (S.modelo || ev.button > 0) return;
    var t = ev.target, nodoEl = t.closest(".nodo"), p = aTablero(ev);
    if (nodoEl && t.closest(".dot")) {                      // empieza un cable desde el punto de salida
      ev.preventDefault();
      lnk = { de: nodoEl.getAttribute("data-id"), sx: ev.clientX, sy: ev.clientY, moved: false };
      return;
    }
    if (nodoEl) {
      ev.preventDefault();
      var id = nodoEl.getAttribute("data-id");
      if (S.armado && S.armado !== id) { crearEnlace(S.armado, id); redibujar(); return; }
      drag = { id: id, dx: p.x - POS[id].x, dy: p.y - POS[id].y, sx: ev.clientX, sy: ev.clientY, moved: false, el: nodoEl };
      return;
    }
    var hit = t.closest(".hit");
    if (hit) { seleccionar("enlace", +hit.getAttribute("data-i")); return; }
    if (S.sel || S.armado) seleccionar(null);
  });

  window.addEventListener("pointermove", function (ev) {
    if (drag) {
      if (!drag.moved && Math.abs(ev.clientX - drag.sx) + Math.abs(ev.clientY - drag.sy) > 6) drag.moved = true;
      if (drag.moved) {
        var p = aTablero(ev), x = clamp(p.x - drag.dx, 0, G.W - G.nodeW), y = clamp(p.y - drag.dy, 20, G.H - G.nodeH - 2);
        POS[drag.id] = { x: x, y: y };
        drag.el.style.left = x + "px"; drag.el.style.top = y + "px";
        trazar(tabJ, enlacesDe("juego"), true);
      }
    } else if (lnk) {
      if (!lnk.moved && Math.abs(ev.clientX - lnk.sx) + Math.abs(ev.clientY - lnk.sy) > 6) lnk.moved = true;
      if (lnk.moved) {
        tabJ.classList.add("enlazando");
        var svg = tabJ.querySelector(".cables"), tmp = svg.querySelector(".tmp"), a = POS[lnk.de], q = aTablero(ev);
        if (!tmp) { tmp = sv("path", { "class": "cable tmp" }); svg.appendChild(tmp); }
        var x1 = a.x + G.nodeW, y1 = a.y + G.nodeH / 2, dx = Math.max(36, Math.abs(q.x - x1) * 0.5);
        tmp.setAttribute("d", "M" + x1 + " " + y1 + " C" + (x1 + dx) + " " + y1 + " " + (q.x - dx) + " " + q.y + " " + q.x + " " + q.y);
      }
    } else if (cd) {
      if (!cd.g && Math.abs(ev.clientX - cd.x) + Math.abs(ev.clientY - cd.y) > 8) {
        cd.g = cd.src.cloneNode(true); cd.g.classList.add("fantasma"); document.body.appendChild(cd.g);
      }
      if (cd.g) { cd.g.style.left = (ev.clientX - 40) + "px"; cd.g.style.top = (ev.clientY - 16) + "px"; }
    }
  });

  window.addEventListener("pointerup", function (ev) {
    if (drag) {
      var d = drag; drag = null;
      if (!d.moved) seleccionar("nodo", d.id);
      else { var n = S.nodos.filter(function (x) { return x.id === d.id; })[0]; if (n) { n.fx = POS[d.id].x / G.W; n.fy = POS[d.id].y / G.H; } S.sel = { tipo: "nodo", id: d.id }; redibujar(); }
    } else if (lnk) {
      var l = lnk; lnk = null;
      tabJ.classList.remove("enlazando");
      var tmp = tabJ.querySelector(".tmp"); if (tmp) tmp.remove();
      var b = document.elementFromPoint(ev.clientX, ev.clientY), destino = b && b.closest ? b.closest(".nodo") : null;
      if (l.moved && destino && destino.getAttribute("data-id") !== l.de && tabJ.contains(destino)) { crearEnlace(l.de, destino.getAttribute("data-id")); redibujar(); }
      else if (!l.moved) { S.armado = S.armado === l.de ? null : l.de; S.sel = null; redibujar(); }
      else redibujar();
    } else if (cd) {
      var c = cd; cd = null;
      if (c.g) {
        c.g.remove(); suprimirClick = true; setTimeout(function () { suprimirClick = false; }, 0);
        var r = tabJ.getBoundingClientRect();
        if (ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom) {
          var px = ev.clientX - r.left - G.nodeW / 2, py = ev.clientY - r.top - G.nodeH / 2;
          if (esFacil()) {
            var fan = faltantes().filter(function (x) { return x[0] === c.id; })[0];
            if (fan) { var cf = celda(fan[1], fan[2]); if (Math.abs(cf.x - px) < G.nodeW * 0.9 && Math.abs(cf.y - py) < G.nodeH * 1.2) { px = cf.x; py = cf.y; } }
          }
          colocar(c.id, px, py);
        }
      }
    }
  });
  window.addEventListener("pointercancel", function () { if (drag || lnk || cd) { if (cd && cd.g) cd.g.remove(); drag = lnk = cd = null; redibujar(); } });

  tabJ.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-a='volver']");
    if (b) { S.modelo = false; redibujar(); }
  });
  document.addEventListener("keydown", function (ev) {
    if (!$("sc-juego").hidden && S.sel && S.sel.tipo === "nodo" && (ev.key === "Delete" || ev.key === "Backspace")) { ev.preventDefault(); quitarNodo(S.sel.id); }
  });

  /* ------------------------------ Bandeja ------------------------------ */
  function pintarBandeja() {
    var tabs = $("tabs"), chips = $("chips");
    tabs.textContent = ""; chips.textContent = "";
    F.familias.forEach(function (f) {
      var total = 0, usadas = 0;
      F.cajas.forEach(function (c) { if (c[1] === f.id) { total++; if (puesta(c[0])) usadas++; } });
      var b = el("button", "tab f-" + f.id + (S.fam === f.id ? " on" : ""));
      b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", S.fam === f.id ? "true" : "false");
      b.appendChild(el("u")); b.appendChild(document.createTextNode(f.t + " ")); b.appendChild(el("em", "", usadas + "/" + total));
      b.addEventListener("click", function () { S.fam = f.id; pintarBandeja(); });
      tabs.appendChild(b);
    });
    // en orden alfabético: así las trampas no quedan siempre al final
    F.cajas.filter(function (c) { return c[1] === S.fam; }).sort(function (a, b) { return a[2].localeCompare(b[2], "es"); }).forEach(function (c) {
      var b = el("button", "chip f-" + c[1] + (puesta(c[0]) ? " puesta" : ""));
      b.type = "button"; b.setAttribute("data-id", c[0]);
      b.appendChild(document.createTextNode(c[2])); b.appendChild(el("small", "", c[3]));
      chips.appendChild(b);
    });
  }
  $("chips").addEventListener("click", function (ev) {
    var c = ev.target.closest(".chip");
    if (!c || suprimirClick || S.modelo) return;
    var id = c.getAttribute("data-id");
    if (puesta(id)) seleccionar("nodo", id); else autoColocar(id);
  });
  $("chips").addEventListener("pointerdown", function (ev) {
    var c = ev.target.closest(".chip");
    if (!c || ev.pointerType !== "mouse" || S.modelo || puesta(c.getAttribute("data-id"))) return;
    cd = { id: c.getAttribute("data-id"), x: ev.clientX, y: ev.clientY, g: null, src: c };
  });

  /* ----------------------- Fantasmas y «Mi respuesta» ----------------------- */
  function esFacil() { return !!S.sit && S.sit.nivel === "Baja"; }
  function faltantes() { return S.sit.modelo.n.filter(function (x) { return !puesta(x[0]); }); }
  function famTitulo(f) { return FAM[f].t; }

  function oracion(c, i, n) {                                // «Primero, …», «Luego, …», «Finalmente, …»
    if (n === 1) return c.charAt(0).toUpperCase() + c.slice(1) + ".";
    var con = i === 0 ? "Primero" : (i === n - 1 && n >= 3 ? "Finalmente" : ["Luego", "Después", "A continuación"][(i - 1) % 3]);
    return con + ", " + c + ".";
  }
  function pintarResp() {
    var cont = $("resp-texto");
    if (!S.sit) return;
    var nodos, enlaces;
    if (S.modelo) {
      nodos = S.sit.modelo.n.map(function (x) { return { id: x[0], x: x[1], y: x[2] }; });
      enlaces = S.sit.modelo.e;
    } else {
      nodos = S.nodos.map(function (n) { return { id: n.id, x: n.fx, y: n.fy }; });
      enlaces = S.enlaces.map(function (e) { return [e.a, e.b]; });
    }
    var r = M.redactar(nodos, enlaces), nuevas = {};
    cont.textContent = "";
    if (S.modelo) cont.appendChild(el("p", "nota", "Esta es la respuesta que sale de la solución modelo."));
    if (!nodos.length) { cont.appendChild(el("p", "vacio-r", "Todavía no hay nada. A medida que sumes cajas, acá va apareciendo lo que escribirías en el parcial: primero la aplicación al proceso y después el diseño y control.")); return; }

    cont.appendChild(el("h3", "", "Aplicación al proceso"));
    if (!r.proceso.length) cont.appendChild(el("p", "vacio-r", "Todavía no hay pasos del proceso: captura, IA o reglas."));
    else {
      var p = el("p", "");
      r.proceso.forEach(function (x, i) {
        var s = el("span", VISTAS[x.id] || S.modelo ? "" : "nueva", oracion(x.f, i, r.proceso.length) + " ");
        p.appendChild(s); nuevas[x.id] = 1;
      });
      cont.appendChild(p);
    }
    cont.appendChild(el("h3", "", "Diseño y control"));
    var grupos = [["Controles humanos", r.control.hum], ["Métricas", r.control.met], ["Reglas y gobierno", r.control.otros]], hay = false;
    grupos.forEach(function (g) {
      if (!g[1].length) return;
      hay = true;
      var q = el("p", ""); q.appendChild(el("span", "grupo-c", g[0] + ": "));
      g[1].forEach(function (x, i) {
        var f = x.f.charAt(0).toUpperCase() + x.f.slice(1);
        q.appendChild(el("span", VISTAS[x.id] || S.modelo ? "" : "nueva", (i ? "; " + x.f : x.f) + (i === g[1].length - 1 ? "." : "")));
        nuevas[x.id] = 1;
      });
      cont.appendChild(q);
    });
    if (!hay) cont.appendChild(el("p", "vacio-r", "Todavía no hay controles: una persona que revise, métricas o trazabilidad."));
    r.trampas.forEach(function (x) {
      var o = el("p", "ojo"); o.appendChild(el("b", "", "Ojo con «" + x.t + "»: ")); o.appendChild(document.createTextNode(x.p)); cont.appendChild(o);
    });
    if (r.sueltas.length) cont.appendChild(el("p", "nota", "Todavía sin enlazar (no entran en el texto): " + r.sueltas.join(", ") + "."));
    if (r.sinCables) cont.appendChild(el("p", "nota", "Enlazá las cajas con cables para fijar el orden: por ahora van de izquierda a derecha."));
    cont.appendChild(el("p", "nota", "Es un borrador armado con tus cajas. En el parcial lo escribís con tus palabras y justificando cada paso."));
    if (!S.modelo) VISTAS = nuevas;
  }

  /* ------------------------------ Revisión ------------------------------ */
  function estrellasHTML(n) {
    var s = el("span", "estrellas");
    for (var i = 0; i < 3; i++) { var x = el("span", "", "★"); if (i >= n) { x = el("i", "", "★"); } s.appendChild(x); }
    return s;
  }
  function estrellasDe(r) {
    var pct = r.oks / r.total;
    if (pct === 1) return S.pistas > 1 ? 2 : 3;
    return pct >= 0.8 ? 2 : (pct >= 0.6 ? 1 : 0);
  }
  function evaluarAhora() { return M.evaluar(S.nodos.map(function (n) { return n.id; }), S.enlaces.map(function (e) { return [e.a, e.b]; }), S.sit); }

  function revisar() {
    var r = evaluarAhora(), est = estrellasDe(r), mejor = leer(K_EST) || {};
    if ((mejor[S.sit.id] || 0) < est) { mejor[S.sit.id] = est; guardar(K_EST, mejor); }
    var cen = $("rev-centro");
    cen.textContent = "";
    cen.appendChild(el("p", "cintillo", "Situación " + S.sit.id + " · " + S.sit.titulo));
    cen.appendChild(el("h2", "", r.oks === r.total ? "¡Flujo completo!" : "Revisión del flujo"));
    var pun = el("div", "puntaje");
    pun.appendChild(estrellasHTML(est));
    pun.appendChild(el("span", "", r.oks + " de " + r.total + " criterios" + (S.pistas ? " · " + S.pistas + (S.pistas === 1 ? " pista" : " pistas") : "")));
    cen.appendChild(pun);
    r.criterios.forEach(function (c) {
      var wrap = c.ok ? el("div", "crit") : el("details", "crit");
      var cab = c.ok ? el("div", "cab") : el("summary");
      cab.appendChild(el("span", "marca " + (c.ok ? "ok" : "no"), c.ok ? "✓" : "✗"));
      cab.appendChild(el("span", "", c.t));
      wrap.appendChild(cab);
      var det = el("div", "det");
      det.appendChild(document.createTextNode(c.ok || !c.general ? c.p + " " : "Tocá para ver por qué. "));
      var a = el("a", "", "apunte " + c.r); a.href = M.enlaceApunte(c.r); det.appendChild(a);
      if (c.ok || !c.general) wrap.appendChild(det);
      else { det.firstChild.textContent = c.p + " "; wrap.appendChild(det); }
      (c.extra || []).forEach(function (x) {
        if (typeof x === "string") wrap.appendChild(el("div", "det", x));
        else { var t = el("div", "trampa"); t.appendChild(el("b", "", x.t + ": ")); t.appendChild(document.createTextNode(x.p + " ")); var l = el("a", "", "apunte " + x.r); l.href = M.enlaceApunte(x.r); t.appendChild(l); wrap.appendChild(t); }
      });
      cen.appendChild(wrap);
    });
    var bot = el("div", "botones");
    function boton(txt, cls, f) { var b = el("button", "btn chico " + (cls || ""), txt); b.type = "button"; b.addEventListener("click", f); bot.appendChild(b); }
    boton("Seguir armando", r.oks === r.total ? "" : "principal", function () { $("revision").hidden = true; });
    boton("Ver la solución modelo", "", function () { $("revision").hidden = true; S.modelo = true; S.sel = null; S.armado = null; redibujar(); });
    var i = F.situaciones.indexOf(S.sit);
    boton(i < F.situaciones.length - 1 ? "Siguiente situación" : "Volver a las situaciones", r.oks === r.total ? "principal" : "", function () {
      $("revision").hidden = true; salir(); if (i < F.situaciones.length - 1) abrirSituacion(F.situaciones[i + 1]);
    });
    boton("Empezar de nuevo", "", function () { S.nodos = []; S.enlaces = []; S.sel = null; S.armado = null; S.pistas = 0; $("revision").hidden = true; redibujar(); pintarBandeja(); });
    cen.appendChild(bot);
    $("revision").hidden = false; $("revision").scrollTop = 0;
  }

  function pista() {
    if (S.modelo) return;
    if (!S.nodos.length) { avisar("Pista: empezá por la entrada. ¿Cómo llega a la empresa lo que hay que procesar?"); S.pistas++; return; }
    var falla = evaluarAhora().criterios.filter(function (c) { return !c.ok; });
    if (!falla.length) { avisar("Lo que se revisa está en orden: apretá «Revisar flujo»."); return; }
    var c = falla.filter(function (x) { return !x.general; })[0] || falla[0];
    S.pistas++;
    avisar("Pista: " + c.t + (c.general ? "." : ". Revisá el apunte " + c.r + "."));
  }

  /* ------------------------------ Pantallas ------------------------------ */
  function estrellasGuardadas(id) { var e = leer(K_EST) || {}; return e[id] || 0; }

  var NOMBRE_NIVEL = { Baja: "Nivel bajo", Media: "Nivel medio", Alta: "Nivel alto" };
  var AYUDA_NIVEL = { Baja: "con cajas fantasma que marcan lo que falta", Media: "pizarrón vacío", Alta: "pizarrón vacío" };
  function pintarPortada() {
    var cont = $("sits"), grilla = null, previo = null;
    cont.textContent = "";
    F.situaciones.forEach(function (s) {
      if (s.nivel !== previo) {                                      // un encabezado por nivel de dificultad
        previo = s.nivel;
        var cuantas = F.situaciones.filter(function (x) { return x.nivel === s.nivel; });
        var est = cuantas.reduce(function (a, x) { return a + estrellasGuardadas(x.id); }, 0);
        var cab = el("div", "grupo-nivel");
        cab.appendChild(el("b", "", NOMBRE_NIVEL[s.nivel] + " · " + cuantas.length + " situaciones"));
        cab.appendChild(el("span", "", AYUDA_NIVEL[s.nivel] + " · " + est + " de " + cuantas.length * 3 + " estrellas"));
        cont.appendChild(cab);
        grilla = el("div", "sits"); cont.appendChild(grilla);
      }
      var b = el("button", "sit " + s.nivel.toLowerCase());
      b.type = "button";
      var fila = el("div", "fila");
      fila.appendChild(el("span", "nivel", "Nivel " + s.nivel + " · situación " + s.id));
      fila.appendChild(estrellasHTML(estrellasGuardadas(s.id)));
      b.appendChild(fila); b.appendChild(el("b", "", s.titulo)); b.appendChild(el("span", "rol", s.rol));
      b.addEventListener("click", function () { if (leer(K_DEMO)) abrirSituacion(s); else abrirDemo(s); });
      grilla.appendChild(b);
    });
  }

  function abrirSituacion(sit) {
    S = { sit: sit, nodos: [], enlaces: [], sel: null, armado: null, pistas: 0, modelo: false, fam: "cap" };
    VISTAS = {};
    var g = GUARDADO[sit.id];
    if (g) { S.nodos = g.nodos; S.enlaces = g.enlaces; S.pistas = g.pistas; }
    $("j-nivel").textContent = "Nivel " + sit.nivel + " · situación " + sit.id;
    $("j-tit").textContent = sit.titulo; $("j-rol").textContent = sit.rol; $("j-texto").textContent = sit.mision;
    $("mision").hidden = false; $("j-mision").setAttribute("aria-expanded", "true");
    $("revision").hidden = true;
    mostrar("sc-juego");
    $("resp").classList.remove("abierta"); $("j-resp").setAttribute("aria-expanded", "false");
    pintarBandeja(); redibujar();
    S.nodos.forEach(function (n) { VISTAS[n.id] = 1; }); pintarResp();
  }
  function salir() {
    if (S.sit) GUARDADO[S.sit.id] = { nodos: S.nodos, enlaces: S.enlaces, pistas: S.pistas };
    pintarPortada(); mostrar("sc-portada");
  }

  function abrirDemo(sigue) {
    pendiente = sigue || null; demoPaso = 0;
    $("demo-tit").textContent = F.demo.titulo; $("demo-rol").textContent = F.demo.rol;
    mostrar("sc-demo"); pintarDemo();
  }
  function pintarDemo() {
    dibujar(tabD, "demo");
    var n = F.demo.n.length;
    $("demo-cuenta").textContent = demoPaso + " de " + n;
    $("demo-texto").textContent = demoPaso ? F.demo.n[demoPaso - 1][3] : "Apretá «Siguiente»: cada caja se suma al pizarrón con su porqué. Mirá cómo se enlazan.";
    $("demo-ant").disabled = demoPaso === 0; $("demo-ant").style.opacity = demoPaso === 0 ? ".4" : "";
    $("demo-sig").hidden = demoPaso === n; $("demo-ir").hidden = demoPaso < n;
  }
  $("demo-sig").addEventListener("click", function () { if (demoPaso < F.demo.n.length) { demoPaso++; pintarDemo(); } });
  $("demo-ant").addEventListener("click", function () { if (demoPaso > 0) { demoPaso--; pintarDemo(); } });
  $("demo-ir").addEventListener("click", function () { guardar(K_DEMO, 1); if (pendiente) abrirSituacion(pendiente); else salir(); });
  $("demo-atras").addEventListener("click", function () { pintarPortada(); mostrar("sc-portada"); });
  $("btn-ejemplo").addEventListener("click", function () { abrirDemo(null); });

  $("j-atras").addEventListener("click", salir);
  $("j-mision").addEventListener("click", function () { var h = !$("mision").hidden; $("mision").hidden = h; $("j-mision").setAttribute("aria-expanded", h ? "false" : "true"); });
  $("j-resp").addEventListener("click", function () { var a = !$("resp").classList.contains("abierta"); $("resp").classList.toggle("abierta", a); $("j-resp").setAttribute("aria-expanded", a ? "true" : "false"); });
  $("resp-cerrar").addEventListener("click", function () { $("resp").classList.remove("abierta"); $("j-resp").setAttribute("aria-expanded", "false"); });
  $("j-pista").addEventListener("click", pista);
  $("j-revisar").addEventListener("click", function () { if (S.modelo) { S.modelo = false; redibujar(); return; } revisar(); });

  // el pizarrón se vuelve a dibujar cuando cambia de tamaño (girar el celular, abrir o cerrar la misión)
  if (window.ResizeObserver) {
    new ResizeObserver(function () {
      if (drag || lnk) return;
      if (!$("sc-juego").hidden && S.sit) redibujar();
      else if (!$("sc-demo").hidden) dibujar(tabD, "demo");
    }).observe($("app"));
  }

  pintarPortada();

  // Para probar desde la consola
  window.flujo = {
    estado: function () { return S; }, abrir: function (id) { abrirSituacion(F.situaciones.filter(function (s) { return s.id === id; })[0]); },
    colocar: function (id, lane, row) { var c = celda(lane, row); colocar(id, c.x, c.y); },
    enlazar: function (a, b) { crearEnlace(a, b); redibujar(); },
    evaluar: evaluarAhora, revisar: revisar, demo: function () { guardar(K_DEMO, null); abrirDemo(null); }
  };
})();
