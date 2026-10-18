(function (root) {
  'use strict';
  const fmt = n => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100));

  function plotSVG(g) {
    const W = 360, H = 260, P = 26;
    const x0 = g.x[0], x1 = g.x[1], y0 = g.y[0], y1 = g.y[1];
    const sx = x => P + (x - x0) / (x1 - x0) * (W - 2 * P);
    const sy = y => H - P - (y - y0) / (y1 - y0) * (H - 2 * P);
    const f = new Function('x', 'return (' + g.f + ');');
    const vas = (g.asintotas && g.asintotas.v) || [];
    const has = (g.asintotas && g.asintotas.h) || [];
    const N = 480, step = (x1 - x0) / N;
    let d = '', pen = false;
    for (let i = 0; i <= N; i++) {
      const x = x0 + i * step;
      let y;
      try { y = f(x); } catch (e) { y = NaN; }
      const nearVA = vas.some(v => Math.abs(x - v) < step * 1.5);
      if (!isFinite(y) || nearVA || y < y0 || y > y1) { pen = false; continue; }
      d += (pen ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(y).toFixed(1);
      pen = true;
    }
    const line = (cls, ax, ay, bx, by) => '<line class="' + cls + '" x1="' + ax.toFixed(1) + '" y1="' + ay.toFixed(1) + '" x2="' + bx.toFixed(1) + '" y2="' + by.toFixed(1) + '"/>';
    const parts = [];
    for (let gx = Math.ceil(x0); gx <= Math.floor(x1); gx++) parts.push(line('g-grid', sx(gx), sy(y0), sx(gx), sy(y1)));
    for (let gy = Math.ceil(y0); gy <= Math.floor(y1); gy++) parts.push(line('g-grid', sx(x0), sy(gy), sx(x1), sy(gy)));
    if (y0 <= 0 && y1 >= 0) parts.push(line('g-axis', sx(x0), sy(0), sx(x1), sy(0)));
    if (x0 <= 0 && x1 >= 0) parts.push(line('g-axis', sx(0), sy(y0), sx(0), sy(y1)));
    const every = (x1 - x0) > 12 ? 2 : 1;
    if (y0 <= 0 && y1 >= 0) {
      for (let gx = Math.ceil(x0); gx <= Math.floor(x1); gx++) {
        if (gx !== 0 && gx % every === 0) parts.push('<text class="g-tick" x="' + sx(gx).toFixed(1) + '" y="' + (sy(0) + 13).toFixed(1) + '" text-anchor="middle">' + gx + '</text>');
      }
    }
    if (x0 <= 0 && x1 >= 0) {
      const everyY = (y1 - y0) > 12 ? 2 : 1;
      for (let gy = Math.ceil(y0); gy <= Math.floor(y1); gy++) {
        if (gy !== 0 && gy % everyY === 0) parts.push('<text class="g-tick" x="' + (sx(0) - 5).toFixed(1) + '" y="' + (sy(gy) + 4).toFixed(1) + '" text-anchor="end">' + gy + '</text>');
      }
    }
    vas.forEach(v => parts.push(line('g-asym', sx(v), sy(y0), sx(v), sy(y1))));
    has.forEach(h => parts.push(line('g-asym', sx(x0), sy(h), sx(x1), sy(h))));
    parts.push('<path class="g-curve" d="' + d + '"/>');
    (g.puntos || []).forEach(p => {
      parts.push('<circle class="g-pt" cx="' + sx(p[0]).toFixed(1) + '" cy="' + sy(p[1]).toFixed(1) + '" r="4"/>');
      parts.push('<text class="g-lbl" x="' + (sx(p[0]) + 6).toFixed(1) + '" y="' + (sy(p[1]) - 7).toFixed(1) + '">(' + fmt(p[0]) + ', ' + fmt(p[1]) + ')</text>');
    });
    return '<svg class="ex-graph" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Gráfico del enunciado">' + parts.join('') + '</svg>';
  }

  const Graph = { plotSVG };
  if (typeof module !== 'undefined' && module.exports) module.exports = Graph;
  else root.Graph = Graph;
})(typeof window !== 'undefined' ? window : globalThis);
