(function (root) {
  'use strict';
  const C = root.BoardCore;
  const COLORS = { k: '#1d2330', b: '#1f5fbf' };
  const ERASE_RADIUS = 14;

  function create(host, opts) {
    opts = opts || {};
    const wrap = document.createElement('div');
    wrap.className = 'bd-wrap';
    const canvas = document.createElement('canvas');
    canvas.className = 'bd-canvas';
    canvas.style.touchAction = 'none';
    wrap.appendChild(canvas);
    host.appendChild(wrap);
    const ctx = canvas.getContext('2d');

    let state = C.emptyState(opts.rows || 12);
    let tool = 'pen', color = 'k';
    let current = null;
    let penActive = false;
    let touch = null;
    let scale = 1, dpr = 1;
    const undoStack = [], redoStack = [];

    const width = p => 2.2 + 4.2 * (p / 100);
    const pressure = e => (e.pointerType === 'pen' && e.pressure > 0 ? e.pressure * 100 : 50);

    function changed() { if (typeof opts.onChange === 'function') opts.onChange(getState()); }

    function resize() {
      const cssW = wrap.clientWidth || 800;
      scale = cssW / C.BOARD_W;
      dpr = root.devicePixelRatio || 1;
      const cssH = state.rows * C.ROW_H * scale;
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      redraw();
    }

    function drawSheet(g, rows) {
      g.fillStyle = '#ffffff';
      g.fillRect(0, 0, C.BOARD_W, rows * C.ROW_H);
      g.strokeStyle = '#c9d3e3';
      g.lineWidth = 1.5;
      for (let r = 1; r <= rows; r++) {
        g.beginPath(); g.moveTo(0, r * C.ROW_H); g.lineTo(C.BOARD_W, r * C.ROW_H); g.stroke();
      }
      g.strokeStyle = '#e8b4b4';
      g.beginPath(); g.moveTo(C.MARGIN_X, 0); g.lineTo(C.MARGIN_X, rows * C.ROW_H); g.stroke();
      g.fillStyle = '#7a8496';
      g.font = '600 26px system-ui, sans-serif';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      for (let r = 1; r <= rows; r++) g.fillText(String(r), C.MARGIN_X / 2, (r - 0.5) * C.ROW_H);
    }

    function drawMarks(g) {
      const valid = C.validMarks(state.marks, state.checkedHashes, C.rowHashes(state.strokes));
      for (const key of Object.keys(valid)) {
        const y0 = (Number(key) - 1) * C.ROW_H;
        if (valid[key] === 'error') {
          g.fillStyle = 'rgba(214, 69, 65, 0.16)';
          g.fillRect(C.MARGIN_X, y0, C.BOARD_W - C.MARGIN_X, C.ROW_H);
        } else if (valid[key] === 'ok') {
          g.strokeStyle = '#1c8a5a'; g.lineWidth = 6; g.lineCap = 'round'; g.lineJoin = 'round';
          g.beginPath();
          g.moveTo(C.BOARD_W - 70, y0 + C.ROW_H * 0.55);
          g.lineTo(C.BOARD_W - 52, y0 + C.ROW_H * 0.72);
          g.lineTo(C.BOARD_W - 22, y0 + C.ROW_H * 0.3);
          g.stroke();
        }
      }
    }

    function drawStroke(g, st) {
      const pts = st.pts;
      g.strokeStyle = COLORS[st.c] || COLORS.k;
      g.fillStyle = g.strokeStyle;
      g.lineCap = 'round'; g.lineJoin = 'round';
      if (pts.length === 1) {
        g.beginPath(); g.arc(pts[0][0], pts[0][1], width(pts[0][2]) / 2, 0, Math.PI * 2); g.fill();
        return;
      }
      for (let i = 1; i < pts.length; i++) {
        g.lineWidth = width((pts[i - 1][2] + pts[i][2]) / 2);
        g.beginPath(); g.moveTo(pts[i - 1][0], pts[i - 1][1]); g.lineTo(pts[i][0], pts[i][1]); g.stroke();
      }
    }

    function redraw() {
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
      drawSheet(ctx, state.rows);
      drawMarks(ctx);
      for (const st of state.strokes) drawStroke(ctx, st);
      if (current && !current.erasing) drawStroke(ctx, current);
    }

    function toLogical(e) {
      const rect = canvas.getBoundingClientRect();
      return [(e.clientX - rect.left) / scale, (e.clientY - rect.top) / scale];
    }
    const isEraser = e => tool === 'eraser' || (e.pointerType === 'pen' && ((e.buttons & 32) === 32 || e.button === 5));

    function push(action) { undoStack.push(action); redoStack.length = 0; }

    function eraseAt(x, y) {
      const i = C.eraseHit(state.strokes, x, y, ERASE_RADIUS);
      if (i < 0) return;
      const [st] = state.strokes.splice(i, 1);
      push({ type: 'erase', stroke: st, index: i });
      redraw(); changed();
    }

    function apply(a, reverse) {
      if (a.type === 'add') {
        if (reverse) { const i = state.strokes.lastIndexOf(a.stroke); if (i >= 0) state.strokes.splice(i, 1); }
        else state.strokes.push(a.stroke);
      } else if (a.type === 'erase') {
        if (reverse) state.strokes.splice(Math.min(a.index, state.strokes.length), 0, a.stroke);
        else { const i = state.strokes.indexOf(a.stroke); if (i >= 0) state.strokes.splice(i, 1); }
      } else if (a.type === 'clear') {
        state.strokes = reverse ? a.strokes.slice() : [];
      }
    }

    function onDown(e) {
      if (e.pointerType === 'touch') {
        if (!penActive) touch = { id: e.pointerId, y: e.clientY };
        return;
      }
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* puntero sintético o ya liberado */ }
      penActive = true;
      touch = null;
      const [x, y] = toLogical(e);
      if (isEraser(e)) { current = { erasing: true, id: e.pointerId }; eraseAt(x, y); return; }
      current = { c: color, pts: [[x, y, pressure(e)]], id: e.pointerId };
      redraw();
    }

    function onMove(e) {
      if (e.pointerType === 'touch') {
        if (touch && touch.id === e.pointerId && !penActive) {
          wrap.scrollTop -= (e.clientY - touch.y);
          touch.y = e.clientY;
        }
        return;
      }
      if (!current || current.id !== e.pointerId) return;
      e.preventDefault();
      const list = (e.getCoalescedEvents && e.getCoalescedEvents().length) ? e.getCoalescedEvents() : [e];
      for (const ev of list) {
        const [x, y] = toLogical(ev);
        if (current.erasing) eraseAt(x, y);
        else current.pts.push([x, y, pressure(ev)]);
      }
      if (!current.erasing) redraw();
    }

    function onUp(e) {
      if (e.pointerType === 'touch') {
        if (touch && touch.id === e.pointerId) touch = null;
        return;
      }
      if (!current || current.id !== e.pointerId) return;
      if (!current.erasing && current.pts.length) {
        const st = { c: current.c, pts: C.quantize(C.simplify(current.pts)) };
        state.strokes.push(st);
        push({ type: 'add', stroke: st });
      }
      const wasErasing = current.erasing;
      current = null;
      penActive = false;
      redraw();
      if (!wasErasing) changed();
    }

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('contextmenu', e => e.preventDefault());

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => resize()) : null;
    if (ro) ro.observe(wrap);

    function getState() { return JSON.parse(JSON.stringify(state)); }

    function setState(s) {
      state = C.normalizeState(JSON.parse(JSON.stringify(s)));
      undoStack.length = 0; redoStack.length = 0;
      resize();
    }

    function toBlob() {
      const last = C.lastWrittenRow(state.strokes);
      const size = C.cropSize(last, state.strokes);
      const s = C.fitScale(size.w, size.h);
      const off = document.createElement('canvas');
      off.width = Math.round(size.w * s);
      off.height = Math.round(size.h * s);
      const g = off.getContext('2d');
      g.setTransform(s, 0, 0, s, 0, 0);
      drawSheet(g, Math.max(1, last));
      for (const st of state.strokes) drawStroke(g, st);
      return new Promise((resolve, reject) => off.toBlob(b => (b ? resolve(b) : reject(new Error('toBlob falló'))), 'image/png'));
    }

    resize();

    return {
      getState,
      setState,
      setTool(t) { tool = t === 'eraser' ? 'eraser' : 'pen'; },
      setColor(c) { color = c === 'b' ? 'b' : 'k'; },
      undo() { const a = undoStack.pop(); if (!a) return; apply(a, true); redoStack.push(a); redraw(); changed(); },
      redo() { const a = redoStack.pop(); if (!a) return; apply(a, false); undoStack.push(a); redraw(); changed(); },
      clear() { if (!state.strokes.length) return; push({ type: 'clear', strokes: state.strokes.slice() }); state.strokes = []; redraw(); changed(); },
      addRows(n) { state.rows += n; resize(); changed(); },
      setMarks(marks, checkedHashes) { state.marks = Object.assign({}, marks); state.checkedHashes = Object.assign({}, checkedHashes); redraw(); changed(); },
      toBlob,
      destroy() { if (ro) ro.disconnect(); wrap.remove(); }
    };
  }

  root.Board = { create };
})(typeof window !== 'undefined' ? window : globalThis);
