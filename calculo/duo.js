// Entrenador de decisiones (estilo Duolingo): lecciones por tema, 3 vidas, racha, XP y repaso de errores.
// Cada problema arranca con "¿a qué tipo de resultado tenés que llegar?" y sigue con las decisiones del camino.
(function (root) {
  'use strict';
  const BANK = root.DUO = root.DUO || [];
  const HEARTS = 3, XP_LESSON = 10, XP_PERFECT = 5, XP_REVIEW = 5, REVIEW_MAX = 8;

  // Tipos de respuesta: qué se entrega y cuándo. "confunde" = con qué se suele confundir (distractores).
  const TIPOS = {
    num: { label: 'Un solo número (también vale ±∞ o «no existe»)', cuando: 'calcular un límite, una derivada en un punto o una integral definida', confunde: ['funcion', 'valores', 'conjunto', 'simplificada'] },
    funcion: { label: 'Una función de x, sin ninguna constante arbitraria', cuando: 'derivar o hallar una función (f\'(x), una inversa)', confunde: ['num', 'primitiva', 'valores', 'recta'] },
    primitiva: { label: 'Una función de x más la constante de integración', cuando: 'resolver una integral indefinida', confunde: ['funcion', 'num', 'area'] },
    conjunto: { label: 'Un conjunto de números, escrito con intervalos', cuando: 'dominio, imagen, positividad, una inecuación o intervalos de crecimiento o concavidad', confunde: ['valores', 'num', 'puntos'] },
    valores: { label: 'Valores de x: una lista, o «ninguno» si no hay', cuando: 'resolver una ecuación o hallar ceros, raíces o puntos críticos', confunde: ['conjunto', 'factorizada', 'num', 'puntos'] },
    factorizada: { label: 'La expresión escrita como producto de factores', cuando: 'factorizar', confunde: ['valores', 'polinomio', 'simplificada'] },
    simplificada: { label: 'Una expresión equivalente más simple, con dominio', cuando: 'simplificar, racionalizar o reescribir una expresión', confunde: ['num', 'factorizada', 'valores'] },
    polinomio: { label: 'Un polinomio, escrito como suma de términos', cuando: 'desarrollar, dividir polinomios o armar un polinomio de Taylor', confunde: ['factorizada', 'valores', 'num'] },
    recta: { label: 'Ecuaciones de rectas (y = mx + b, x = a, y = b)', cuando: 'rectas tangentes o normales, asíntotas o el eje de simetría', confunde: ['num', 'puntos', 'funcion'] },
    puntos: { label: 'Puntos (x, y), con su clasificación si la piden', cuando: 'extremos, vértices, puntos de inflexión o intersecciones', confunde: ['valores', 'conjunto', 'num'] },
    formula: { label: 'Una fórmula con todos los parámetros calculados', cuando: 'hallar la fórmula de una función a partir de datos o de un gráfico', confunde: ['valores', 'grafico', 'num'] },
    parametros: { label: 'Los valores de los parámetros (a, b, k…) pedidos', cuando: 'hallar parámetros para que se cumpla una condición', confunde: ['conclusion', 'num', 'valores'] },
    conclusion: { label: 'Una conclusión justificada (sí/no y por qué)', cuando: 'decidir si algo pasa (continuidad, derivabilidad, paridad, tipo de discontinuidad, qué método usar) y justificarlo', confunde: ['num', 'valores', 'conjunto'] },
    area: { label: 'Un número positivo con el valor de un área', cuando: 'calcular un área', confunde: ['num', 'primitiva', 'funcion'] },
    convergencia: { label: 'Una conclusión: «converge a un valor» o «diverge»', cuando: 'resolver una integral impropia', confunde: ['num', 'primitiva', 'conjunto'] },
    contexto: { label: 'Un valor con unidades, dicho en el contexto', cuando: 'un problema con contexto (optimización, aproximación, crecimiento)', confunde: ['num', 'funcion', 'valores'] },
    solgen: { label: 'Una familia de funciones y(x), con constantes', cuando: 'resolver una ecuación diferencial sin condición inicial', confunde: ['solpart', 'primitiva', 'num'] },
    solpart: { label: 'Una función y(x) concreta, sin constantes libres', cuando: 'resolver una ecuación diferencial con condición inicial', confunde: ['solgen', 'primitiva', 'num'] },
    grafico: { label: 'Un gráfico con función base, asíntotas y puntos', cuando: 'graficar usando transformaciones', confunde: ['conjunto', 'formula', 'valores'] },
    caracteristicas: { label: 'Las características pedidas (amplitud, período…)', cuando: 'leer los parámetros de una función', confunde: ['num', 'conjunto', 'grafico'] }
  };

  root.DuoP = function (id, topic, enunciado, tipo, pasos) {
    if (!TIPOS[tipo]) throw new Error('Tipo desconocido ' + tipo + ' en ' + id);
    BANK.push({ id, lec: id.replace(/-\d+$/, ''), topic, enunciado, tipo, pasos });
  };

  let hooks = null, view = null;

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  const today = () => iso(new Date());
  function renderMath(el) {
    if (root.renderMathInElement) root.renderMathInElement(el, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
  }

  // ---------- estado guardado ----------
  function state() { const s = root.Store.get('duo'); return s && typeof s === 'object' ? s : {}; }
  function save(mut) { const s = state(); mut(s); root.Store.set('duo', s); }

  function stats() {
    const s = state(), days = s.days || {}, lessons = s.lessons || {}, mistakes = s.mistakes || {};
    const xpTotal = Object.values(days).reduce((a, b) => a + (+b || 0), 0);
    const xpToday = +days[today()] || 0;
    let streak = 0;
    const d = new Date();
    if (!(+days[iso(d)] > 0)) d.setDate(d.getDate() - 1);   // hoy todavía cuenta hasta que termine el día
    while (+days[iso(d)] > 0) { streak++; d.setDate(d.getDate() - 1); }
    const done = Object.keys(lessons).filter(k => lessons[k] && lessons[k].n > 0).length;
    const nMistakes = Object.keys(mistakes).filter(k => mistakes[k] && BANK.some(p => p.id === k)).length;
    return { xpTotal, xpToday, streak, done, lessons, mistakes, nMistakes };
  }

  // Lecciones en el orden del menú: una por tema.
  function lessonsInOrder() {
    const byLec = new Map();
    for (const p of BANK) { if (!byLec.has(p.lec)) byLec.set(p.lec, { lec: p.lec, topic: p.topic, problems: [] }); byLec.get(p.lec).problems.push(p); }
    const list = [...byLec.values()];
    for (const l of list) { const f = hooks && hooks.findTopicByTitle(l.topic); l.mi = f ? f.mi : 99; l.ti = f ? f.ti : 99; }
    return list.sort((a, b) => a.mi - b.mi || a.ti - b.ti);
  }

  // ---------- pasos de un problema ----------
  function buildSteps(p) {
    const t = TIPOS[p.tipo];
    const wrong = shuffle(t.confunde.slice()).slice(0, 3);
    const first = {
      prompt: '¿A qué tipo de resultado tenés que llegar?', isType: true,
      options: [{ text: t.label, ok: true, why: 'Es lo que se pide para ' + t.cuando + '.' }]
        .concat(wrong.map(k => ({ text: TIPOS[k].label, ok: false, why: 'Eso se entrega para ' + TIPOS[k].cuando + '. Acá corresponde: ' + t.label + '.' })))
    };
    const rest = p.pasos.map(s => ({ prompt: s[0], options: s.slice(1).map((o, i) => ({ text: o[0], ok: i === 0, why: o[1] })) }));
    return [first].concat(rest).map(st => Object.assign(st, { order: shuffle(st.options.map((_, i) => i)) }));
  }

  // ---------- camino ----------
  function headerHTML(st) {
    return '<div class="duo-stats">'
      + '<div class="duo-stat"><div class="v">🔥 ' + st.streak + '</div><div class="l">día' + (st.streak === 1 ? '' : 's') + ' de racha</div></div>'
      + '<div class="duo-stat"><div class="v">⚡ ' + st.xpToday + '</div><div class="l">XP hoy · ' + st.xpTotal + ' en total</div></div>'
      + '<div class="duo-stat"><div class="v">' + (st.xpToday > 0 ? '✅' : '🎯') + '</div><div class="l">' + (st.xpToday > 0 ? 'Meta diaria cumplida' : 'Meta diaria: 1 lección') + '</div></div>'
      + '<div class="duo-stat"><div class="v">⭐ ' + st.done + '/' + lessonsInOrder().length + '</div><div class="l">lecciones completas</div></div>'
      + '</div>';
  }

  function renderPath() {
    const main = document.getElementById('main');
    if (!main) return;
    const st = stats();
    const lessons = lessonsInOrder();
    const next = lessons.find(l => !(st.lessons[l.lec] && st.lessons[l.lec].n > 0));
    let h = '<div id="duo-path"><div class="topic-header"><div class="topic-eyebrow">Entrenador de decisiones</div><h2>¿A dónde tengo que llegar?</h2></div>';
    h += headerHTML(st);
    h += '<div class="card"><p style="margin:0;">Cada problema empieza con <strong>qué tipo de resultado te piden</strong> y sigue con <strong>qué hacés en cada paso</strong> (factorizar, racionalizar, comparar grados, derivar…). Tenés <strong>3 vidas</strong> por lección: con 3 errores la lección se corta y la repetís. Lo que fallás va al <strong>repaso</strong>.</p></div>';
    h += '<div class="card duo-review"><div><h3 style="margin:0 0 4px;">🔁 Repaso de errores</h3><p style="margin:0; color:var(--ink-soft);">'
      + (st.nMistakes ? st.nMistakes + ' problema' + (st.nMistakes > 1 ? 's' : '') + ' para repasar. Cuando sale bien, sale de la lista.' : 'Todavía no hay errores guardados. Los que falles en una lección aparecen acá.')
      + '</p></div><button class="btn" data-duo-review ' + (st.nMistakes ? '' : 'disabled') + '>Repasar</button></div>';
    let lastMi = null;
    for (const l of lessons) {
      if (l.mi !== lastMi) {
        if (lastMi !== null) h += '</div></section>';
        const title = hooks && hooks.moduleTitle ? hooks.moduleTitle(l.mi) : '';
        h += '<section class="duo-unit"><h3 class="duo-unit-title">' + esc(title) + '</h3><div class="duo-path">';
        lastMi = l.mi;
      }
      const rec = st.lessons[l.lec];
      const cls = rec && rec.n > 0 ? (rec.perfect ? 'perfect' : 'done') : (next && next.lec === l.lec ? 'next' : '');
      const icon = rec && rec.n > 0 ? (rec.perfect ? '⭐' : '✓') : '▶';
      const sub = rec && rec.n > 0 ? ('Completada ' + rec.n + (rec.n === 1 ? ' vez' : ' veces') + (rec.perfect ? ' · sin errores' : '')) : (next && next.lec === l.lec ? 'Seguí por acá' : l.problems.length + ' problemas');
      h += '<button class="duo-node ' + cls + '" data-duo-lec="' + esc(l.lec) + '"><span class="duo-circle">' + icon + '</span><span class="duo-node-txt"><span class="duo-node-t">' + esc(l.topic) + '</span><span class="duo-node-s">' + sub + '</span></span></button>';
    }
    if (lastMi !== null) h += '</div></section>';
    h += '</div>';
    main.innerHTML = h;
    main.querySelectorAll('[data-duo-lec]').forEach(b => b.addEventListener('click', () => start('lec', b.dataset.duoLec)));
    const rb = main.querySelector('[data-duo-review]');
    if (rb) rb.addEventListener('click', () => start('rep'));
    renderMath(main);
    root.scrollTo(0, 0);
  }

  // Tarjeta en la página de cada tema.
  function topicCardHTML(topicTitle) {
    const l = lessonsInOrder().find(x => x.topic === topicTitle);
    if (!l) return '';
    const rec = state().lessons && state().lessons[l.lec];
    const done = rec && rec.n > 0;
    return '<div class="card duo-topic-card"><div><h3 style="margin:0 0 4px;"><span class="ic">🦉</span> Entrenador de decisiones</h3><p style="margin:0; color:var(--ink-soft);">'
      + l.problems.length + ' problemas: a qué resultado llegar y qué hacer en cada paso. 3 vidas.' + (done ? ' Ya la completaste' + (rec.perfect ? ' sin errores ⭐' : '') + '.' : '')
      + '</p></div><button class="btn" data-duo-lec="' + esc(l.lec) + '">' + (done ? 'Repetir' : 'Empezar') + '</button></div>';
  }
  function bindTopicCard(container) {
    container.querySelectorAll('.duo-topic-card [data-duo-lec]').forEach(b => b.addEventListener('click', () => start('lec', b.dataset.duoLec)));
  }

  // ---------- lección ----------
  function start(kind, lec) {
    let problems, title;
    if (kind === 'rep') {
      const m = stats().mistakes;
      problems = shuffle(BANK.filter(p => m[p.id])).slice(0, REVIEW_MAX);
      title = 'Repaso de errores';
      if (!problems.length) return;
    } else {
      const l = lessonsInOrder().find(x => x.lec === lec);
      if (!l) return;
      problems = shuffle(l.problems.slice());
      title = l.topic;
    }
    const queue = problems.map(p => ({ p, steps: buildSteps(p) }));
    view = {
      kind, lec, title, queue, qi: 0, si: 0, hearts: HEARTS, sel: null, checked: false,
      total: queue.reduce((a, q) => a + q.steps.length, 0), doneSteps: 0,
      failed: new Set(), requeued: new Set(), clean: new Set(), curFailed: false, finished: false, el: null
    };
    openOverlay();
    paint();
  }

  function openOverlay() {
    closeOverlay();
    const el = document.createElement('div');
    el.className = 'duo';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Lección del entrenador');
    el.innerHTML = '<header class="duo-top"><button class="duo-x" aria-label="Salir de la lección">✕</button>'
      + '<div class="duo-bar"><div></div></div><div class="duo-hearts" aria-label="Vidas"></div></header>'
      + '<main class="duo-body"></main>';
    document.body.appendChild(el);
    document.body.classList.add('pr-open');
    view.el = el;
    let exitTimer = null;
    const xb = el.querySelector('.duo-x');
    xb.addEventListener('click', () => {
      if (view.finished || xb.classList.contains('confirm')) { clearTimeout(exitTimer); closeOverlay(); afterClose(); return; }
      xb.classList.add('confirm'); xb.textContent = '¿Salir? Se pierde esta lección';
      exitTimer = setTimeout(() => { xb.classList.remove('confirm'); xb.textContent = '✕'; }, 3000);
    });
    // El botón se vuelve a dibujar en cada paso (vive debajo de las opciones): se escucha el clic en el overlay.
    el.addEventListener('click', e => { if (e.target.closest('.duo-btn')) onButton(); });
    el.addEventListener('keydown', onKey);
    el.tabIndex = -1;
    el.focus();
  }

  function closeOverlay() {
    const old = document.querySelector('.duo');
    if (old) old.remove();
    document.body.classList.remove('pr-open');
  }
  function afterClose() {
    if (hooks && hooks.renderSidebar) hooks.renderSidebar();
    if (document.getElementById('duo-path')) renderPath();
    else if (hooks && hooks.refreshTopic) hooks.refreshTopic();
  }

  function onKey(e) {
    if (!view || view.finished) return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= 4 && !view.checked) {
      const b = view.el.querySelectorAll('.duo-opt')[n - 1];
      if (b) b.click();
    } else if (e.key === 'Enter') {
      const b = view.el.querySelector('.duo-btn');
      if (b && !b.disabled) { e.preventDefault(); b.click(); }
    }
  }

  function paintTop() {
    const v = view;
    v.el.querySelector('.duo-bar > div').style.width = Math.min(100, (v.doneSteps / v.total) * 100) + '%';
    v.el.querySelector('.duo-hearts').innerHTML = '❤️'.repeat(v.hearts) + '<span class="duo-lost">' + '🤍'.repeat(HEARTS - v.hearts) + '</span>';
  }

  function paint() {
    const v = view, q = v.queue[v.qi], st = q.steps[v.si];
    paintTop();
    v.sel = null; v.checked = false;
    const body = v.el.querySelector('.duo-body');
    const nProblems = v.queue.length;
    body.innerHTML = '<div class="duo-tag">' + esc(v.title) + ' · problema ' + (v.qi + 1) + ' de ' + nProblems
      + (q.again ? ' · <strong>otra vez</strong>' : '') + '</div>'
      + '<div class="duo-enun">' + q.p.enunciado + '</div>'
      + '<div class="duo-stepn">Paso ' + (v.si + 1) + ' de ' + q.steps.length + (st.isType ? ' · antes de hacer cuentas' : '') + '</div>'
      + '<h3 class="duo-q">' + st.prompt + '</h3>'
      + '<div class="duo-opts">' + st.order.map((oi, k) => '<button class="duo-opt" data-oi="' + oi + '"><span class="duo-k">' + (k + 1) + '</span><span>' + st.options[oi].text + '</span></button>').join('') + '</div>'
      + '<div class="duo-foot"><div class="duo-fb" role="status"></div><button class="btn duo-btn" disabled>Comprobar</button></div>';
    body.querySelectorAll('.duo-opt').forEach(b => b.addEventListener('click', () => {
      if (v.checked) return;
      body.querySelectorAll('.duo-opt').forEach(x => x.classList.toggle('sel', x === b));
      v.sel = +b.dataset.oi;
      v.el.querySelector('.duo-btn').disabled = false;
    }));
    const foot = v.el.querySelector('.duo-foot');
    foot.className = 'duo-foot';
    foot.querySelector('.duo-fb').innerHTML = '';
    const btn = foot.querySelector('.duo-btn');
    btn.textContent = 'Comprobar'; btn.disabled = true;
    renderMath(body);
    body.scrollTop = 0;
  }

  function onButton() {
    const v = view;
    if (!v) return;
    if (v.finished) return;
    if (!v.checked) return check();
    advance();
  }

  function check() {
    const v = view, q = v.queue[v.qi], st = q.steps[v.si];
    if (v.sel == null) return;
    v.checked = true;
    const chosen = st.options[v.sel], right = st.options.find(o => o.ok);
    const body = v.el.querySelector('.duo-body'), foot = v.el.querySelector('.duo-foot');
    body.querySelectorAll('.duo-opt').forEach(b => {
      const o = st.options[+b.dataset.oi];
      b.disabled = true;
      if (o.ok) b.classList.add('ok');
      else if (+b.dataset.oi === v.sel) b.classList.add('bad');
    });
    let fb;
    if (chosen.ok) {
      foot.classList.add('ok');
      fb = '<div class="duo-fb-t">¡Bien!</div><div>' + chosen.why + '</div>';
    } else {
      v.hearts--;
      v.curFailed = true;
      v.failed.add(q.p.id);
      foot.classList.add('bad');
      fb = '<div class="duo-fb-t">No era esa</div><div>' + chosen.why + '</div><div class="duo-fb-r"><strong>Correcta:</strong> ' + right.text + ' — ' + right.why + '</div>';
    }
    v.doneSteps++;
    paintTop();
    foot.querySelector('.duo-fb').innerHTML = fb;
    const btn = foot.querySelector('.duo-btn');
    btn.textContent = v.hearts <= 0 ? 'Ver resultado' : 'Continuar';
    btn.disabled = false;
    renderMath(foot);
    foot.scrollIntoView({ block: 'nearest' });
    btn.focus({ preventScroll: true });
  }

  function advance() {
    const v = view, q = v.queue[v.qi];
    if (v.hearts <= 0) return finish(false);
    if (v.si + 1 < q.steps.length) { v.si++; return paint(); }
    // Problema terminado.
    if (v.curFailed) {
      if (!v.requeued.has(q.p.id)) {
        // Como en Duolingo: lo que fallaste vuelve al final de la lección.
        v.requeued.add(q.p.id);
        const again = { p: q.p, steps: buildSteps(q.p), again: true };
        v.queue.push(again);
        v.total += again.steps.length;
      }
    } else v.clean.add(q.p.id);
    v.curFailed = false;
    v.si = 0;
    v.qi++;
    if (v.qi >= v.queue.length) return finish(true);
    paint();
  }

  function finish(ok) {
    const v = view;
    v.finished = true;
    const perfect = ok && v.failed.size === 0;
    const xp = ok ? (v.kind === 'rep' ? XP_REVIEW : XP_LESSON + (perfect ? XP_PERFECT : 0)) : 0;
    save(s => {
      s.mistakes = s.mistakes || {};
      v.failed.forEach(id => { s.mistakes[id] = true; });
      // Sale del repaso lo que se resolvió bien. En una lección, lo que fallaste queda aunque al repetirlo te salga;
      // en el repaso alcanza con resolverlo bien al repetirlo.
      v.clean.forEach(id => { if (!v.failed.has(id) || v.kind === 'rep') delete s.mistakes[id]; });
      if (ok) {
        s.days = s.days || {};
        const t = today();
        s.days[t] = (+s.days[t] || 0) + xp;
        if (v.kind === 'lec') {
          s.lessons = s.lessons || {};
          const prev = s.lessons[v.lec] || {};
          s.lessons[v.lec] = { n: (prev.n || 0) + 1, perfect: !!(prev.perfect || perfect), best: Math.max(prev.best || 0, v.hearts), last: t };
        }
      }
    });
    paintTop();
    const st = stats();
    const body = v.el.querySelector('.duo-body');
    let foot;
    const nextL = v.kind === 'lec' ? nextLesson(v.lec) : null;
    if (ok) {
      body.innerHTML = '<div class="duo-end"><div class="duo-big">' + (perfect ? '⭐' : '🎉') + '</div>'
        + '<h2>' + (v.kind === 'rep' ? '¡Repaso terminado!' : perfect ? '¡Lección perfecta!' : '¡Lección completa!') + '</h2>'
        + '<div class="duo-end-tiles"><div class="duo-stat"><div class="v">+' + xp + '</div><div class="l">XP</div></div>'
        + '<div class="duo-stat"><div class="v">' + '❤️'.repeat(Math.max(0, v.hearts)) + '</div><div class="l">vidas que quedaron</div></div>'
        + '<div class="duo-stat"><div class="v">🔥 ' + st.streak + '</div><div class="l">racha</div></div></div>'
        + (v.failed.size ? '<p class="duo-end-p">' + v.failed.size + ' problema' + (v.failed.size > 1 ? 's quedaron' : ' quedó') + ' en el repaso de errores.</p>' : '<p class="duo-end-p">Sin errores: este tema queda con estrella.</p>')
        + '</div>';
    } else {
      body.innerHTML = '<div class="duo-end"><div class="duo-big">💔</div><h2>Te quedaste sin vidas</h2>'
        + '<p class="duo-end-p">Lo que fallaste quedó guardado en el repaso de errores. Repasá la teoría del tema y volvé a intentarlo: las opciones cambian de lugar cada vez.</p></div>';
    }
    body.insertAdjacentHTML('beforeend', '<div class="duo-foot"><div class="duo-fb"></div><button class="btn duo-btn" hidden>Comprobar</button></div>');
    foot = body.querySelector('.duo-foot');
    foot.className = 'duo-foot end';
    foot.querySelector('.duo-fb').innerHTML = '<div class="duo-end-btns">'
      + (!ok ? '<button class="btn" data-a="retry">Reintentar</button>' : '')
      + (!ok && v.kind === 'lec' ? '<button class="btn ghost" data-a="theory">Ver la teoría del tema</button>' : '')
      + (ok && nextL ? '<button class="btn" data-a="next">Siguiente lección →</button>' : '')
      + '<button class="btn ghost" data-a="path">Volver al camino</button></div>';
    foot.querySelector('.duo-btn').hidden = true;
    foot.querySelectorAll('[data-a]').forEach(b => b.addEventListener('click', () => {
      const a = b.dataset.a;
      if (a === 'retry') return start(v.kind, v.lec);
      if (a === 'next') return start('lec', nextL);
      closeOverlay();
      if (a === 'theory') { const f = hooks.findTopicByTitle(v.title); if (f) hooks.loadTopic(f.mi, f.ti); hooks.renderSidebar(); return; }
      if (hooks.openPath) hooks.openPath(); else renderPath();
    }));
  }

  function nextLesson(lec) {
    const list = lessonsInOrder();
    const i = list.findIndex(l => l.lec === lec);
    return i >= 0 && i + 1 < list.length ? list[i + 1].lec : null;
  }

  function init(h) { hooks = h; }

  root.Duo = { init, renderPath, stats, topicCardHTML, bindTopicCard, start, TIPOS, _lessons: lessonsInOrder };
})(typeof window !== 'undefined' ? window : globalThis);
