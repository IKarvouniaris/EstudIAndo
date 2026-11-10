/* Armá el flujo: la revisión de un flujo, sin nada de pantalla. La usan el juego (js/flujo-ia.js) y el medidor
   (tools/medir_flujo_ia.js, en Node). Los datos están en js/flujo-ia-datos.js.
   evaluar(ids, enlaces, situación) devuelve { criterios: [{t, p, r, ok, extra, general}], oks, total }.
   ids: las cajas puestas. enlaces: [[desde, hasta], …]. */
(function (root) {
  "use strict";
  var F = root.FLUJO_IA;
  var CAJA = {};
  F.cajas.forEach(function (c) { CAJA[c[0]] = { id: c[0], fam: c[1], t: c[2], s: c[3], ref: c[4], trampa: c[5] || null, entrada: (F.entradas || []).indexOf(c[0]) >= 0 }; });

  // «@hum» es cualquier caja de esa familia; el resto son ids. Devuelve solo las que están puestas.
  function expandir(lista, puestas) {
    var r = [];
    lista.forEach(function (x) {
      puestas.forEach(function (id) {
        var ok = x.charAt(0) === "@" ? (CAJA[id] && CAJA[id].fam === x.slice(1)) : id === x;
        if (ok && r.indexOf(id) < 0) r.push(id);
      });
    });
    return r;
  }

  // ¿hay un camino de cables (de uno o más tramos) desde alguna de «de» hasta alguna de «hasta»?
  function alcanza(ady, de, hasta) {
    for (var i = 0; i < de.length; i++) {
      var vistos = {}, cola = (ady[de[i]] || []).slice();
      while (cola.length) {
        var x = cola.shift();
        if (vistos[x]) continue;
        vistos[x] = 1;
        if (hasta.indexOf(x) >= 0) return true;
        (ady[x] || []).forEach(function (y) { cola.push(y); });
      }
    }
    return false;
  }

  function evaluar(ids, enlaces, sit) {
    var ady = {}, conEnlace = {};
    enlaces.forEach(function (e) { (ady[e[0]] = ady[e[0]] || []).push(e[1]); conEnlace[e[0]] = conEnlace[e[1]] = 1; });
    var crit = [];

    var sueltas = ids.filter(function (id) { return !conEnlace[id]; });
    crit.push({
      general: true, t: "Todas las cajas están enlazadas", r: "7.3",
      p: "Un flujo es una cadena: cada caja recibe algo o entrega algo. Una caja suelta no hace nada.",
      ok: ids.length >= 3 && sueltas.length === 0,
      extra: ids.length < 3 ? ["Todavía hay muy pocas cajas para formar un flujo."] : sueltas.map(function (id) { return "Suelta: " + CAJA[id].t; })
    });

    sit.crit.forEach(function (c) {
      var ok = true;
      if (c.todas) ok = ok && c.todas.every(function (id) { return ids.indexOf(id) >= 0; });
      if (c.alguna) ok = ok && expandir(c.alguna, ids).length > 0;
      if (c.antes) ok = ok && alcanza(ady, expandir(c.antes[0], ids), expandir(c.antes[1], ids));
      if (c.cadena) {
        for (var i = 0; i < c.cadena.length - 1; i++) {
          ok = ok && alcanza(ady, expandir(c.cadena[i], ids), expandir(c.cadena[i + 1], ids));
        }
      }
      crit.push({ t: c.t, p: c.p, r: c.r, ok: !!ok });
    });

    var trampas = ids.filter(function (id) { return CAJA[id] && CAJA[id].trampa; });
    crit.push({
      general: true, t: "No hay cajas que estorben", r: "7.2",
      p: "Algunas cajas son errores típicos: parecen útiles y no lo son.",
      ok: trampas.length === 0,
      extra: trampas.map(function (id) { return { t: CAJA[id].t, p: CAJA[id].trampa, r: CAJA[id].ref }; })
    });

    var oks = crit.filter(function (c) { return c.ok; }).length;
    return { criterios: crit, oks: oks, total: crit.length };
  }

  // Orden en que se cuenta el flujo: siguiendo los cables (una caja va después de las que le llegan) y, si hay
  // empate, de izquierda a derecha y de arriba abajo. Lo que queda en un ciclo va al final.
  function ordenar(nodos, enlaces) {
    var ady = {}, ent = {}, pos = {}, res = [], visto = {};
    nodos.forEach(function (n) { ady[n.id] = []; ent[n.id] = 0; pos[n.id] = n; });
    enlaces.forEach(function (e) { if (ady[e[0]] && ady[e[1]]) { ady[e[0]].push(e[1]); ent[e[1]]++; } });
    function cmp(a, b) { return pos[a].x - pos[b].x || pos[a].y - pos[b].y; }
    var cola = nodos.map(function (n) { return n.id; }).filter(function (i) { return ent[i] === 0; }).sort(cmp);
    while (cola.length) {
      var x = cola.shift();
      if (visto[x]) continue;
      visto[x] = 1; res.push(x);
      ady[x].forEach(function (y) { ent[y]--; if (ent[y] <= 0 && !visto[y]) cola.push(y); });
      cola.sort(cmp);
    }
    nodos.forEach(function (n) { if (!visto[n.id]) res.push(n.id); });
    return res;
  }

  // El texto de respuesta que sale del flujo: «Aplicación al proceso» (la secuencia) y «Diseño y control» (controles humanos,
  // métricas y gobierno). nodos: [{id, x, y}] (solo importa el orden relativo); enlaces: [[desde, hasta], …].
  function redactar(nodos, enlaces) {
    var conEnlace = {};
    enlaces.forEach(function (e) { conEnlace[e[0]] = conEnlace[e[1]] = 1; });
    var hayCables = enlaces.length > 0;
    var r = { proceso: [], control: { hum: [], met: [], otros: [] }, trampas: [], sueltas: [], sinCables: !hayCables };
    ordenar(nodos, enlaces).forEach(function (id) {
      var c = CAJA[id];
      if (!c) return;
      if (c.trampa) { r.trampas.push({ t: c.t, p: c.trampa, r: c.ref }); return; }
      if (hayCables && !conEnlace[id]) { r.sueltas.push(c.t); return; }
      var sec = (F.seccion || {})[id] || ((c.fam === "hum" || c.fam === "met" || c.fam === "gob") ? "control" : "proceso");
      var f = (F.frases || {})[id] || c.t.toLowerCase();
      if (sec === "proceso") r.proceso.push({ id: id, f: f });
      else r.control[c.fam === "hum" ? "hum" : (c.fam === "met" ? "met" : "otros")].push({ id: id, f: f });
    });
    return r;
  }

  // enlace al apartado del apunte: «7.5» va a ia-conceptual.html#c7
  function enlaceApunte(ref) { return "ia-conceptual.html#c" + String(ref).split(".")[0]; }

  root.FlujoIA = { CAJA: CAJA, evaluar: evaluar, redactar: redactar, ordenar: ordenar, expandir: expandir, enlaceApunte: enlaceApunte };
})(typeof window !== "undefined" ? window : this);
