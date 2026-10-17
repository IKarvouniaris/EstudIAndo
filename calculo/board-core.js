(function (root) {
  'use strict';
  const ROW_H = 80;
  const BOARD_W = 1400;
  const MARGIN_X = 64;
  const MAX_PIXELS = 1200000;

  function rowOf(y) { return Math.max(1, Math.floor(y / ROW_H) + 1); }

  function strokeBounds(stroke) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const pt of stroke.pts) {
      if (pt[0] < minX) minX = pt[0];
      if (pt[0] > maxX) maxX = pt[0];
      if (pt[1] < minY) minY = pt[1];
      if (pt[1] > maxY) maxY = pt[1];
    }
    return { minX, minY, maxX, maxY };
  }

  function strokeRow(stroke) {
    const b = strokeBounds(stroke);
    return rowOf((b.minY + b.maxY) / 2);
  }

  function perpDist(p, a, b) {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2));
    return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
  }

  function simplify(pts, tol) {
    tol = tol == null ? 1.2 : tol;
    if (pts.length <= 2) return pts.slice();
    const keep = new Uint8Array(pts.length);
    keep[0] = 1; keep[pts.length - 1] = 1;
    const stack = [[0, pts.length - 1]];
    while (stack.length) {
      const [s, e] = stack.pop();
      let maxD = 0, idx = -1;
      for (let i = s + 1; i < e; i++) {
        const d = perpDist(pts[i], pts[s], pts[e]);
        if (d > maxD) { maxD = d; idx = i; }
      }
      if (idx > 0 && maxD > tol) { keep[idx] = 1; stack.push([s, idx], [idx, e]); }
    }
    return pts.filter((_, i) => keep[i]);
  }

  function quantize(pts) {
    return pts.map(pt => [Math.round(pt[0]), Math.round(pt[1]), Math.round(pt[2] == null ? 50 : pt[2])]);
  }

  function hashString(s) {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  function rowHashes(strokes) {
    const byRow = {};
    for (const st of strokes) {
      const r = strokeRow(st);
      (byRow[r] = byRow[r] || []).push(st.pts);
    }
    const out = {};
    for (const r of Object.keys(byRow)) out[r] = hashString(JSON.stringify(byRow[r]));
    return out;
  }

  function lastWrittenRow(strokes) {
    let m = 0;
    // Hasta la tinta más baja: con letra grande un paso ocupa varios renglones y no hay que cortarlo.
    for (const st of strokes) m = Math.max(m, rowOf(strokeBounds(st).maxY));
    return m;
  }

  function validMarks(marks, checkedHashes, currentHashes) {
    const out = {};
    for (const r of Object.keys(marks || {})) {
      const was = checkedHashes && checkedHashes[r];
      const now = currentHashes && currentHashes[r];
      if (was !== undefined && was === now) out[r] = marks[r];
    }
    return out;
  }

  function approvedRows(marks, checkedHashes, currentHashes) {
    const v = validMarks(marks, checkedHashes, currentHashes);
    return Object.keys(v).filter(r => v[r] === 'ok').map(Number).sort((a, b) => a - b);
  }

  // Alto hasta el último renglón escrito; ancho hasta el trazo más a la derecha (mínimo 640
  // para que se lea el margen y no quede una tira angosta). Menos píxeles = corrección más barata.
  function cropSize(lastRow, strokes) {
    let w = BOARD_W;
    if (strokes && strokes.length) {
      let maxX = 0;
      for (const st of strokes) maxX = Math.max(maxX, strokeBounds(st).maxX);
      w = Math.min(BOARD_W, Math.max(640, Math.ceil(maxX) + 80));
    }
    return { w, h: Math.max(1, lastRow) * ROW_H };
  }

  function fitScale(w, h, maxPixels) {
    maxPixels = maxPixels || MAX_PIXELS;
    return Math.min(1, Math.sqrt(maxPixels / (w * h)));
  }

  function eraseHit(strokes, x, y, radius) {
    for (let i = strokes.length - 1; i >= 0; i--) {
      const pts = strokes[i].pts;
      if (pts.length === 1) {
        if (Math.hypot(pts[0][0] - x, pts[0][1] - y) <= radius) return i;
        continue;
      }
      for (let j = 1; j < pts.length; j++) {
        if (perpDist([x, y], pts[j - 1], pts[j]) <= radius) return i;
      }
    }
    return -1;
  }

  function emptyState(rows) {
    return { v: 1, rows: rows || 12, strokes: [], marks: {}, checkedHashes: {}, everError: false, usedHint: false, result: null, done: null };
  }

  function normalizeState(obj) {
    const base = emptyState();
    if (!obj || typeof obj !== 'object' || obj.v !== 1) return base;
    const strokes = Array.isArray(obj.strokes) ? obj.strokes.filter(s => s && Array.isArray(s.pts) && s.pts.length > 0) : [];
    return Object.assign(base, obj, { strokes, rows: Number.isInteger(obj.rows) && obj.rows > 0 ? obj.rows : base.rows });
  }

  function canCheck(state) { return lastWrittenRow(state.strokes) > 0; }

  const BoardCore = {
    ROW_H, BOARD_W, MARGIN_X, MAX_PIXELS,
    rowOf, strokeBounds, strokeRow, perpDist, simplify, quantize, hashString, rowHashes,
    lastWrittenRow, validMarks, approvedRows, cropSize, fitScale, eraseHit,
    emptyState, normalizeState, canCheck
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = BoardCore;
  else root.BoardCore = BoardCore;
})(typeof window !== 'undefined' ? window : globalThis);
