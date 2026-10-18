(function (root) {
  'use strict';
  const C = root.BoardCore, K = root.CorrectorCore;
  const NIVEL = { directo: 'Directo', guia: 'Tipo guía', parcial: 'Tipo parcial' };
  let hooks = null;
  let aiPromise = null;
  let aiBlocked = false;
  let view = null;
  let opening = false;

  const bank = () => root.EXERCISES || [];
  const byId = id => bank().find(e => e.id === id) || null;
  const progKey = id => 'lapiz::' + id;
  // Tildado a mano: lo resolviste (en la pizarra o en papel) sin pasar por la corrección de Claude.
  const manKey = id => 'lapizHecho::' + id;

  function renderMath(el) {
    if (root.renderMathInElement) {
      root.renderMathInElement(el, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
        throwOnError: false
      });
    }
  }

  function node(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function init(h) { hooks = h; }

  function counts(progress) {
    let clean = 0, partial = 0, manual = 0;
    for (const e of bank()) {
      const p = progress[progKey(e.id)];
      if (p) { if (p.clean) clean++; else partial++; }
      else if (progress[manKey(e.id)]) manual++;
    }
    return { total: bank().length, clean, partial, manual };
  }

  function sectionHTML(topicTitle) {
    const list = bank().filter(e => e.topic === topicTitle);
    if (!list.length) return '';
    const progress = hooks ? hooks.getProgress() : {};
    let solved = 0;
    const items = list.map(e => {
      const p = progress[progKey(e.id)];
      const manual = !p && !!progress[manKey(e.id)];
      const sheet = root.Store.get('pz:' + e.id);
      const started = !p && sheet && sheet.strokes && sheet.strokes.length > 0;
      if (p || manual) solved++;
      const st = p ? (p.clean ? 'done' : 'partial') : (manual ? 'manual' : (started ? 'started' : ''));
      const badge = p ? (p.clean ? '✓ Resuelto' : '✓ Resuelto con ayuda') : (manual ? '✓ Hecho' : (started ? 'Empezado' : ''));
      const label = p ? 'Ver mi resolución' : (started ? 'Seguir' : 'Resolver con lápiz');
      const tip = p ? 'Resuelto con la corrección de la IA' : (manual ? 'Destildar' : 'Marcar como hecho');
      return '<li class="lz-item ' + st + '" data-item="' + e.id + '">'
        + '<label class="lz-check" title="' + tip + '"><input type="checkbox" data-hecho="' + e.id + '"'
        + (p || manual ? ' checked' : '') + (p ? ' data-locked="1"' : '') + ' aria-label="' + tip + '"></label>'
        + '<span class="lz-level">' + NIVEL[e.nivel] + (badge ? '<span class="lz-badge">' + badge + '</span>' : '') + '</span>'
        + '<span class="lz-text">' + e.enunciado + '</span>'
        + '<button class="btn lz-open' + (p ? ' ghost' : '') + '" data-ex="' + e.id + '">' + label + '</button></li>';
    }).join('');
    return '<div class="card lz-card" data-topic="' + topicTitle.replace(/"/g, '&quot;') + '"><h3><span class="ic">✍️</span> Practicar con lápiz'
      + '<span class="lz-sum">' + solved + ' de ' + list.length + ' hechos</span></h3>'
      + '<p class="lz-hint">Un paso por renglón. Cuando termines un paso, tocá "Revisar hasta acá". Si lo resolviste en papel, tildá la casilla.</p>'
      + '<ul class="lz-list">' + items + '</ul></div>';
  }

  // Vuelve a pintar la sección del tema que está abierto (estado de cada ejercicio).
  function refreshSections() {
    document.querySelectorAll('.lz-card[data-topic]').forEach(card => {
      const html = sectionHTML(card.dataset.topic);
      if (!html) return;
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      const fresh = tmp.firstElementChild;
      card.replaceWith(fresh);
      bindSection(fresh);
      renderMath(fresh);
    });
  }

  function bindSection(container) {
    container.querySelectorAll('.lz-open').forEach(b => b.addEventListener('click', () => open(b.dataset.ex)));
    container.querySelectorAll('input[data-hecho]').forEach(cb => cb.addEventListener('change', () => {
      // Lo que ya aprobó la corrección queda tildado.
      if (cb.dataset.locked) { cb.checked = true; return; }
      setManual(cb.dataset.hecho, cb.checked);
    }));
  }

  function setManual(id, on) {
    const progress = hooks.getProgress();
    if (on) progress[manKey(id)] = true; else delete progress[manKey(id)];
    hooks.saveProgress();
    hooks.renderSidebar();
    refreshSections();
  }

  function getSample() {
    if (aiBlocked) return Promise.resolve(null);
    if (!aiPromise) {
      aiPromise = (async () => {
        const cl = root.claude;
        if (!cl || typeof cl.use !== 'function') return null;
        const s = await cl.use('sample');
        if (!s) return null;
        const lim = await s.limits().catch(() => null);
        return lim && lim.images ? s : null;
      })().catch(() => null);
    }
    return aiPromise;
  }

  function _resetAI() { aiPromise = null; aiBlocked = false; }

  const fullState = v => Object.assign(v.board.getState(), {
    everError: v.meta.everError, usedHint: v.meta.usedHint, result: v.meta.result, done: v.meta.done
  });

  function saveNow(v) {
    clearTimeout(v.saveTimer);
    root.Store.set('pz:' + v.ex.id, fullState(v));
  }

  function onBoardChange() {
    const v = view;
    if (!v) return;
    markStale(v);
    clearTimeout(v.saveTimer);
    v.saveTimer = setTimeout(() => saveNow(v), 600);
  }

  async function open(exId) {
    const ex = byId(exId);
    if (!ex || opening) return;
    opening = true;
    try { await openInner(ex); } finally { opening = false; }
  }

  async function openInner(ex) {
    close();
    const el = node('div', 'pr');
    el.id = 'practice';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Práctica con lápiz');
    el.innerHTML = ''
      + '<header class="pr-head">'
      + '<button class="btn ghost pr-back">← Volver al tema</button>'
      + '<div class="pr-title"></div>'
      + '<button class="btn ghost pr-toggle">Ocultar enunciado</button>'
      + '</header>'
      + '<div class="pr-statement"><div class="pr-enun"></div><div class="pr-graph"></div></div>'
      + '<div class="pr-body">'
      + '<div class="pr-tools" role="toolbar" aria-label="Herramientas">'
      + '<button data-tool="pen" class="on">Lápiz</button>'
      + '<button data-color="k" class="on" aria-label="Negro"><span class="sw k"></span></button>'
      + '<button data-color="b" aria-label="Azul"><span class="sw b"></span></button>'
      + '<button data-tool="eraser">Goma</button>'
      + '<button data-act="undo" aria-label="Deshacer">↶</button>'
      + '<button data-act="redo" aria-label="Rehacer">↷</button>'
      + '<button data-act="rows" aria-label="Agregar 5 renglones">+5</button>'
      + '<button data-act="clear">Borrar</button>'
      + '</div>'
      + '<div class="pr-board"></div>'
      + '<aside class="pr-panel" hidden></aside>'
      + '</div>'
      + '<footer class="pr-foot">'
      + '<span class="pr-status" role="status"></span>'
      + '<button class="btn ghost pr-cancel" hidden>Cancelar</button>'
      + '<button class="btn ghost pr-check" hidden>Revisar hasta acá</button>'
      + '<button class="btn pr-final" hidden>Terminé: corregir todo</button>'
      + '<button class="btn ghost pr-mark" hidden>Marcar como hecho</button>'
      + '<button class="btn ghost pr-redo" hidden>Resolver de nuevo</button>'
      + '<button class="btn pr-next" hidden>Siguiente ejercicio →</button>'
      + '</footer>';
    document.body.appendChild(el);
    document.body.classList.add('pr-open');
    el.querySelector('.pr-title').textContent = ex.topic + ' · ' + NIVEL[ex.nivel];
    el.querySelector('.pr-enun').innerHTML = ex.enunciado;
    if (ex.grafico && root.Graph) el.querySelector('.pr-graph').innerHTML = root.Graph.plotSVG(ex.grafico);

    const saved = C.normalizeState(await root.Store.fetch('pz:' + ex.id));
    // La hoja dice que está resuelto pero el progreso no lo tiene (se perdió): se recupera.
    if (saved.done && !hooks.getProgress()[progKey(ex.id)]) recordProgress(ex.id, saved.done);
    const board = root.Board.create(el.querySelector('.pr-board'), { rows: saved.rows, onChange: onBoardChange });
    board.setState(saved);
    view = {
      ex, el, board, sample: null, busy: false, ctl: null, saveTimer: null, errorFromLast: false, misreadRows: [],
      meta: { everError: saved.everError, usedHint: saved.usedHint, result: saved.result, done: saved.done }
    };
    wire(view);
    if (saved.result) { renderPanel(saved.result); markStale(view); }
    updateFooter(view);
    renderMath(el.querySelector('.pr-statement'));
    setupAI(view);
  }

  function close() {
    const v = view;
    if (!v) return;
    if (v.ctl) v.ctl.abort();
    saveNow(v);
    v.board.destroy();
    v.el.remove();
    refreshSections();
    document.body.classList.remove('pr-open');
    view = null;
  }

  function wire(v) {
    const el = v.el;
    el.querySelector('.pr-back').addEventListener('click', close);
    const toggle = el.querySelector('.pr-toggle');
    toggle.addEventListener('click', () => {
      const hidden = el.classList.toggle('pr-hide-enun');
      toggle.textContent = hidden ? 'Mostrar enunciado' : 'Ocultar enunciado';
    });
    el.querySelectorAll('[data-tool]').forEach(b => b.addEventListener('click', () => {
      v.board.setTool(b.dataset.tool);
      el.querySelectorAll('[data-tool]').forEach(x => x.classList.toggle('on', x === b));
    }));
    el.querySelectorAll('[data-color]').forEach(b => b.addEventListener('click', () => {
      v.board.setColor(b.dataset.color);
      v.board.setTool('pen');
      el.querySelectorAll('[data-color]').forEach(x => x.classList.toggle('on', x === b));
      el.querySelectorAll('[data-tool]').forEach(x => x.classList.toggle('on', x.dataset.tool === 'pen'));
    }));
    el.querySelector('[data-act="undo"]').addEventListener('click', () => v.board.undo());
    el.querySelector('[data-act="redo"]').addEventListener('click', () => v.board.redo());
    el.querySelector('[data-act="rows"]').addEventListener('click', () => v.board.addRows(5));
    const clearBtn = el.querySelector('[data-act="clear"]');
    let clearTimer = null;
    clearBtn.addEventListener('click', () => {
      if (clearBtn.classList.contains('confirm')) {
        clearTimeout(clearTimer);
        clearBtn.classList.remove('confirm');
        clearBtn.textContent = 'Borrar';
        v.board.clear();
        return;
      }
      clearBtn.classList.add('confirm');
      clearBtn.textContent = '¿Seguro? Tocá de nuevo';
      clearTimer = setTimeout(() => { clearBtn.classList.remove('confirm'); clearBtn.textContent = 'Borrar'; }, 3000);
    });
    el.querySelector('.pr-check').addEventListener('click', () => runCheck('parcial'));
    el.querySelector('.pr-final').addEventListener('click', () => runCheck('final'));
    el.querySelector('.pr-cancel').addEventListener('click', () => { if (v.ctl) v.ctl.abort(); });
    el.querySelector('.pr-next').addEventListener('click', () => { const n = nextId(v.ex.id); if (n) open(n); });
    el.querySelector('.pr-mark').addEventListener('click', () => {
      setManual(v.ex.id, !hooks.getProgress()[manKey(v.ex.id)]);
      updateFooter(v);
    });
    el.querySelector('.pr-redo').addEventListener('click', () => {
      v.board.clear();
      v.board.setMarks({}, {});
      v.meta = { everError: false, usedHint: false, result: null, done: null };
      v.lastSig = null;
      const panel = el.querySelector('.pr-panel');
      panel.textContent = '';
      panel.hidden = true;
      el.querySelector('.pr-status').textContent = 'Hoja nueva. Lo que ya lograste sigue contando en tu progreso.';
      saveNow(v);
      updateFooter(v);
    });
  }

  // El ejercicio siguiente en el orden del banco (mismo tema primero, después el tema que sigue).
  function nextId(id) {
    const list = bank();
    const i = list.findIndex(e => e.id === id);
    return i >= 0 && i + 1 < list.length ? list[i + 1].id : null;
  }

  const isSolved = v => {
    const r = v.meta.result;
    return !!(r && r.final && r.final.correcto && r.final.completo && !r.primer_error);
  };

  // Resuelto: en lugar de corregir otra vez, ofrecer seguir o empezar de nuevo.
  function updateFooter(v) {
    const solved = isSolved(v);
    const q = sel => v.el.querySelector(sel);
    q('.pr-check').hidden = !v.sample || solved;
    q('.pr-final').hidden = !v.sample || solved;
    q('.pr-redo').hidden = !solved;
    q('.pr-next').hidden = !solved || !nextId(v.ex.id);
    const progress = hooks.getProgress();
    const marked = !!progress[manKey(v.ex.id)];
    const mark = q('.pr-mark');
    mark.hidden = solved || !!progress[progKey(v.ex.id)];
    mark.textContent = marked ? '✓ Hecho' : 'Marcar como hecho';
    mark.classList.toggle('on', marked);
  }

  async function setupAI(v) {
    const st = v.el.querySelector('.pr-status');
    if (!root.claude || typeof root.claude.use !== 'function') {
      st.textContent = 'Para que la IA corrija tu hoja, ingresá con tu cuenta (arriba del menú). Podés escribir igual: se guarda.';
      return;
    }
    st.textContent = 'Conectando…';
    const s = await getSample();
    if (view !== v) return;
    if (!s) {
      st.textContent = 'Para que la IA corrija tu hoja, ingresá con tu cuenta (arriba del menú). Podés escribir igual: se guarda en este dispositivo.';
      return;
    }
    st.textContent = '';
    v.sample = s;
    updateFooter(v);
    v.el.querySelectorAll('.pr-recheck').forEach(b => { b.hidden = false; });
  }

  function setBusy(v, busy) {
    v.busy = busy;
    v.el.querySelectorAll('.pr-check, .pr-final, .pr-recheck').forEach(b => { b.disabled = busy; });
    v.el.querySelector('.pr-cancel').hidden = !busy;
  }

  async function runCheck(mode) {
    const v = view;
    if (!v || v.busy || !v.sample) return;
    const st = v.el.querySelector('.pr-status');
    const state = v.board.getState();
    if (!C.canCheck(state)) { st.textContent = 'Escribí al menos un renglón antes de revisar.'; return; }
    const sig = mode + '|' + JSON.stringify(C.rowHashes(state.strokes));
    if (mode !== 'recheck' && sig === v.lastSig) {
      st.textContent = 'No cambió nada desde la última revisión: escribí el próximo paso y volvé a tocar el botón.';
      return;
    }
    setBusy(v, true);
    st.textContent = mode === 'parcial' ? 'Pensando… (unos segundos)' : 'Pensando… (puede tardar hasta un minuto)';
    const hashes = C.rowHashes(state.strokes);
    const rowsWritten = C.lastWrittenRow(state.strokes);
    const topicTitles = hooks.topicTitles();
    const prompt = K.buildPrompt(v.ex, {
      mode,
      approvedRows: mode === 'recheck' ? [] : C.approvedRows(state.marks, state.checkedHashes, hashes),
      misreadRows: v.misreadRows,
      rowsWritten,
      topicTitles,
      previousSummary: K.summarize(v.meta.result)
    });
    v.ctl = new AbortController();
    try {
      const blob = await v.board.toBlob();
      if (v.ctl.signal.aborted) throw { code: 'cancelled' };
      st.textContent = 'La IA está leyendo tu hoja…';
      const options = {
        images: [blob], modelTier: mode === 'recheck' ? 'complex' : 'default', signal: v.ctl.signal,
        onText: ({ text }) => { if (view === v) st.textContent = 'La IA está escribiendo la corrección… (' + text.length + ' caracteres)'; }
      };
      // Sin la respuesta guardada: si no, repetiría la misma lectura equivocada.
      if (mode === 'recheck' || v.misreadRows.length) options.cache = false;
      let reply, text, checked;
      for (let attempt = 0; attempt < 2; attempt++) {
        // Una respuesta cortada o ilegible se pide una vez más, sin la copia guardada (si no, vuelve igual).
        if (attempt === 1) {
          options.cache = false;
          st.textContent = 'La respuesta llegó incompleta. Pidiendo la corrección de nuevo…';
        }
        reply = await v.sample(prompt, options);
        if (view !== v) return;
        text = reply && reply.text;
        const raw = K.parseReply(text);
        checked = raw ? K.validateResult(raw, { mode: mode === 'parcial' ? 'parcial' : 'final', rowsWritten, topicTitles }) : { ok: false, reason: 'la respuesta no trae JSON' };
        if (checked.ok) break;
      }
      if (!checked.ok) {
        const code = reply && reply.truncated ? 'respuesta_cortada' : 'respuesta_ilegible';
        st.textContent = K.errorCopy(code).msg;
        showFailure(v, 'No pude leer la respuesta de la IA, ni siquiera en el segundo intento.');
        showDetail(v, code, checked.reason, text);
        return;
      }
      const result = checked.result;
      v.board.setMarks(K.marksFromResult(result), hashes);
      const hadError = v.meta.everError;
      if (result.primer_error) v.meta.everError = true;
      v.errorFromLast = !hadError && !!result.primer_error;
      v.meta.result = result;
      if (mode !== 'parcial') {
        const out = K.outcome(v.meta, result);
        if (out) { v.meta.done = out; recordProgress(v.ex.id, out); }
      }
      saveNow(v);
      renderPanel(result);
      v.lastSig = sig;
      v.misreadRows = [];
      updateFooter(v);
      st.textContent = isSolved(v) && nextId(v.ex.id) ? 'Listo. Tocá «Siguiente ejercicio» para seguir.' : '';
    } catch (e) {
      if (view !== v) return;
      const copy = K.errorCopy(e && e.code);
      st.textContent = copy.msg;
      if (!e || e.code !== 'cancelled') showFailure(v, copy.msg);
      if (e && e.code && e.code !== 'cancelled') showDetail(v, e.code, e.message, e.text);
      if (copy.hideAI) {
        aiBlocked = true;
        v.sample = null;
        v.el.querySelectorAll('.pr-check, .pr-final, .pr-recheck').forEach(b => { b.hidden = true; });
      }
    } finally {
      if (view === v) setBusy(v, false);
    }
  }

  // La corrección nueva no llegó: el panel no puede seguir mostrando la anterior como si fuera la de ahora.
  function showFailure(v, msg) {
    const panel = v.el.querySelector('.pr-panel');
    panel.hidden = false;
    panel.textContent = '';
    panel.classList.remove('pr-stale-on');
    v.panelProblem = false;
    const box = node('div', 'pr-error');
    box.appendChild(node('h4', null, 'Esta corrección no llegó'));
    box.appendChild(node('p', null, msg));
    box.appendChild(node('p', 'pr-howto', 'Las marcas que siguen en la hoja son de la revisión anterior. Tocá el botón otra vez para que corrija lo que escribiste ahora.'));
    panel.appendChild(box);
  }

  // Si la última corrección marcó un problema y después cambiaste la hoja, avisar que esa corrección es vieja.
  function markStale(v) {
    const panel = v.el.querySelector('.pr-panel');
    const banner = panel.querySelector('.pr-stale');
    if (!banner) return;
    const s = v.board.getState();
    const now = C.rowHashes(s.strokes), was = s.checkedHashes || {};
    const keys = new Set(Object.keys(now).concat(Object.keys(was)));
    let changed = false;
    keys.forEach(k => { if (now[k] !== was[k]) changed = true; });
    const stale = !!v.panelProblem && changed;
    banner.hidden = !stale;
    panel.classList.toggle('pr-stale-on', stale);
  }

  // Datos para diagnosticar una corrección fallida; el estudiante puede mandar una captura.
  function showDetail(v, code, message, text) {
    const panel = v.el.querySelector('.pr-panel');
    panel.hidden = false;
    panel.querySelectorAll('.pr-detail').forEach(d => d.remove());
    const d = node('details', 'pr-detail');
    d.appendChild(node('summary', null, 'Detalle del error'));
    const info = ['código: ' + code, message ? 'mensaje: ' + message : '', text ? 'respuesta: ' + String(text).slice(0, 600) : '']
      .filter(Boolean).join(' | ');
    d.appendChild(node('pre', null, info));
    panel.appendChild(d);
  }

  function recordProgress(id, out) {
    const progress = hooks.getProgress();
    const prev = progress[progKey(id)];
    const clean = out === 'clean' || !!(prev && prev.clean);
    progress[progKey(id)] = { clean };
    hooks.saveProgress();
    hooks.renderSidebar();
    refreshSections();
  }

  function misread(n) {
    const v = view;
    if (!v) return;
    const s = v.board.getState();
    const marks = {};
    for (const r of Object.keys(s.marks)) if (Number(r) < n) marks[r] = s.marks[r];
    v.board.setMarks(marks, s.checkedHashes);
    const res = v.meta.result;
    if (res) {
      const dropErr = res.primer_error && res.primer_error.renglon >= n;
      if (dropErr && v.errorFromLast) { v.meta.everError = false; v.errorFromLast = false; }
      v.meta.result = Object.assign({}, res, {
        renglones: res.renglones.filter(r => r.n < n),
        primer_error: dropErr ? null : res.primer_error,
        paso_correcto: dropErr ? null : res.paso_correcto,
        final: null
      });
      renderPanel(v.meta.result);
    }
    if (!v.misreadRows.includes(n)) v.misreadRows.push(n);
    v.el.querySelector('.pr-status').textContent = 'Listo, descarté esa lectura. Tocá «Revisar hasta acá» y lo leo de nuevo con más cuidado (si podés, reescribí el renglón ' + n + ' más claro).';
    v.lastSig = null;
    updateFooter(v);
    saveNow(v);
  }

  function goTopic(title) {
    const f = hooks.findTopicByTitle(title);
    close();
    if (f) hooks.loadTopic(f.mi, f.ti);
  }

  function renderPanel(result) {
    const v = view;
    const panel = v.el.querySelector('.pr-panel');
    panel.hidden = false;
    panel.textContent = '';
    panel.classList.remove('pr-stale-on');
    v.panelProblem = !!(result.primer_error || (result.final && !(result.final.correcto && result.final.completo)));
    const stale = node('p', 'pr-stale', 'Cambiaste la hoja después de esta corrección: lo de abajo es de antes. Tocá «Revisar hasta acá» o «Terminé: corregir todo» para que la vuelva a mirar.');
    stale.hidden = true;
    panel.appendChild(stale);
    panel.appendChild(node('h4', null, 'Leí esto'));
    const ul = node('ul', 'pr-read');
    for (const r of result.renglones) {
      const li = node('li', 'st-' + r.estado);
      li.appendChild(node('span', 'pr-n', String(r.n)));
      li.appendChild(node('span', 'pr-ic', r.estado === 'ok' ? '✓' : r.estado === 'error' ? '✗' : (r.legible ? '·' : '?')));
      li.appendChild(node('span', 'pr-tx', r.legible ? '$' + r.latex.replace(/\$/g, '') + '$' : 'No lo pude leer: reescribilo más claro.'));
      if (r.legible) {
        const b = node('button', 'pr-misread', 'Me leyó mal');
        b.addEventListener('click', () => misread(r.n));
        li.appendChild(b);
      }
      ul.appendChild(li);
    }
    panel.appendChild(ul);

    const pe = result.primer_error;
    if (pe) {
      const box = node('div', 'pr-error');
      box.appendChild(node('h4', null, 'Renglón ' + pe.renglon + ': revisalo'));
      box.appendChild(node('p', null, pe.que));
      if (pe.por_que) box.appendChild(node('p', 'pr-why', pe.por_que));
      if (pe.pista) box.appendChild(node('p', 'pr-hint', 'Pista: ' + pe.pista));
      box.appendChild(node('p', 'pr-howto', '¿Leí bien lo que escribiste (mirá «Leí esto»)? Si no, tocá «Me leyó mal». Si leí bien, borrá ese renglón con la goma, reescribilo y tocá «Revisar hasta acá».'));
      const mr = node('button', 'btn ghost pr-misread-error', 'Me leyó mal el renglón ' + pe.renglon);
      mr.addEventListener('click', () => misread(pe.renglon));
      box.appendChild(mr);
      if (pe.tema) {
        const t = node('button', 'btn ghost pr-topic', 'Repasar: ' + pe.tema);
        t.addEventListener('click', () => goTopic(pe.tema));
        box.appendChild(t);
      }
      if (result.paso_correcto) {
        const show = node('button', 'btn ghost pr-show', 'Ver cómo sigue');
        const sol = node('div', 'pr-solution', '$$' + result.paso_correcto.replace(/\$/g, '') + '$$');
        sol.hidden = true;
        show.addEventListener('click', () => {
          sol.hidden = false;
          show.hidden = true;
          v.meta.usedHint = true;
          saveNow(v);
          renderMath(sol);
        });
        box.appendChild(show);
        box.appendChild(sol);
      }
      panel.appendChild(box);
    } else if (!result.final) {
      panel.appendChild(node('p', 'pr-allok', 'Todo lo escrito hasta acá está bien. Seguí con el próximo paso.'));
    }

    if (result.final) {
      const f = result.final;
      const box = node('div', 'pr-final-box');
      if (f.correcto && f.completo && !pe) {
        box.appendChild(node('p', 'pr-solved', v.meta.done === 'clean'
          ? '¡Resuelto sin errores!'
          : '¡Resuelto! Queda en amarillo porque hubo errores o pediste ayuda: repetilo otro día para pasarlo a verde.'));
      } else if (!f.presente) {
        box.appendChild(node('p', null, 'No encontré un resultado final escrito. Escribilo en un renglón y recuadralo.'));
      } else if (!f.correcto) {
        box.appendChild(node('p', null, 'El resultado final no coincide con el correcto.'));
      } else if (!f.completo) {
        box.appendChild(node('p', null, 'El resultado está bien, pero le falta algo:'));
      }
      if (f.faltantes.length) {
        const fl = node('ul');
        f.faltantes.forEach(x => fl.appendChild(node('li', null, x)));
        box.appendChild(fl);
      }
      panel.appendChild(box);
    }
    if (result.comentario) panel.appendChild(node('p', 'pr-comment', result.comentario));
    if (pe || (result.final && !(result.final.correcto && result.final.completo))) {
      const rb = node('button', 'btn ghost pr-recheck', '¿Seguro? Revisalo de nuevo');
      rb.addEventListener('click', () => runCheck('recheck'));
      rb.hidden = !v.sample;
      panel.appendChild(rb);
    }
    renderMath(panel);
  }

  root.Practice = { init, sectionHTML, bindSection, open, close, counts, refresh: refreshSections, _resetAI };
})(typeof window !== 'undefined' ? window : globalThis);
