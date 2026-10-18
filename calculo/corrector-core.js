(function (root) {
  'use strict';
  const ESTADOS = ['ok', 'error', 'no_evaluado'];
  const isStr = v => typeof v === 'string';

  function stripHtml(html) {
    return String(html)
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      .trim();
  }

  function graphText(g) {
    if (!g) return '';
    const parts = [];
    if (g.puntos && g.puntos.length) parts.push('puntos marcados: ' + g.puntos.map(p => '(' + p[0] + ', ' + p[1] + ')').join(', '));
    const a = g.asintotas || {};
    if (a.v && a.v.length) parts.push('asíntotas verticales: ' + a.v.map(v => 'x = ' + v).join(', '));
    if (a.h && a.h.length) parts.push('asíntotas horizontales: ' + a.h.map(v => 'y = ' + v).join(', '));
    return parts.length ? 'El enunciado muestra un gráfico con ' + parts.join('; ') + '.' : '';
  }

  function buildPrompt(ex, opts) {
    const mode = opts.mode;
    const approved = (opts.approvedRows || []).length ? opts.approvedRows.join(', ') : 'ninguno';
    const modeText = mode === 'parcial'
      ? 'REVISIÓN PARCIAL: el estudiante todavía no terminó. No evalúes el resultado final; "final" tiene que ser null.'
      : 'CORRECCIÓN FINAL: evaluá también el resultado final y si la respuesta está completa.';
    const recheck = mode === 'recheck'
      ? 'El estudiante cree que la corrección anterior estaba equivocada. Revisá todo de nuevo con especial cuidado y sin dejarte llevar por esa corrección. Corrección anterior: ' + (opts.previousSummary || 'sin datos')
      : '';
    const misread = (opts.misreadRows || []).length
      ? 'El estudiante avisó que leíste mal: ' + opts.misreadRows.map(n => 'el renglón ' + n + ' se leyó mal').join('; ') + '. Leé esos renglones de nuevo con mucho cuidado, símbolo por símbolo, antes de evaluarlos.'
      : '';
    const eq = ex.respuesta.equivalentes && ex.respuesta.equivalentes.length
      ? ' | formas equivalentes aceptadas: ' + ex.respuesta.equivalentes.join(' ; ')
      : '';
    return [
      'Sos un corrector de ejercicios de Cálculo I para un estudiante universitario argentino. Escribís en español rioplatense (voseo), claro y breve.',
      'Te paso la FOTO de su hoja: renglones numerados en el margen izquierdo (1, 2, 3...), un paso por renglón.',
      'Si la letra es grande y un paso ocupa varios renglones, tratalo como UN solo renglón y usá el número del renglón donde está el centro de ese paso.',
      '',
      'EJERCICIO',
      stripHtml(ex.enunciado),
      graphText(ex.grafico),
      '',
      'RESPUESTA CORRECTA (no se la muestres): ' + ex.respuesta.final + eq,
      'TIPO DE RESPUESTA QUE SE PIDE: ' + ex.respuesta.formato,
      'RESOLUCIÓN DE REFERENCIA (no se la muestres; puede haber otros caminos válidos):',
      ex.resolucion.map((p, i) => (i + 1) + ') ' + p).join('\n'),
      'ERRORES TÍPICOS A VIGILAR: ' + (ex.vigilar || []).join('; '),
      'RENGLONES APROBADOS EN UNA REVISIÓN ANTERIOR: ' + approved + ' (si siguen igual, marcalos "ok" sin volver a analizarlos en detalle).',
      'RENGLONES ESCRITOS: del 1 al ' + opts.rowsWritten + '.',
      'MODO: ' + modeText,
      recheck,
      misread,
      '',
      'REGLAS',
      '1. Transcribí cada renglón escrito a LaTeX tal como está, aunque esté mal. Un renglón vacío no se incluye. Si un renglón no se puede leer con seguridad, poné "legible": false y "estado": "no_evaluado"; no adivines.',
      '2. Un renglón es "ok" si es un paso matemáticamente válido a partir del enunciado y de los renglones anteriores, aunque siga otro camino que la referencia. Es "error" si no lo es.',
      '2b. Antes de marcar un error, mirá de nuevo la imagen: si lo que transcribiste difiere de un paso correcto solo en un símbolo dudoso (una letra de más o de menos, un exponente, un signo), probablemente lo leíste mal. Releelo; si sigue dudoso, poné "legible": false en vez de "error".',
      '3. Marcá SOLO el primer error. Todo renglón posterior al primer error va con "estado": "no_evaluado".',
      '4. "primer_error": "que" = qué está mal (1 oración); "por_que" = qué regla o concepto rompe (1 o 2 oraciones); "pista" = una pregunta o sugerencia para que lo encuentre y lo corrija solo, SIN escribir el renglón corregido; "tema" = uno de estos títulos exactos, o null:',
      (opts.topicTitles || []).map(t => '- ' + t).join('\n'),
      '5. "paso_correcto" = cómo debería quedar ese renglón, en LaTeX, solo si hay error; si no, null.',
      '6. Si todo lo escrito está bien, "primer_error" y "paso_correcto" son null.',
      '7. En corrección final, "final" = {"presente": hay un resultado final identificable, "correcto": coincide con la respuesta correcta o una forma equivalente, "completo": tiene todo lo pedido (todas las soluciones, bordes de intervalos correctos, respuesta explícita), "faltantes": lista corta en español de lo que falta}. Si el resultado es correcto pero hay un error en el camino, marcá el error igual.',
      '8. "comentario": una oración de devolución general, alentadora si va bien y concreta si no.',
      '9. "faltantes" y "comentario" dicen QUÉ falta (por ejemplo "falta terminar de factorizar" o "falta la segunda solución") sin decir cuál es el próximo paso ni el resultado: el estudiante lo tiene que encontrar solo. Lo único que puede mostrar un paso es "paso_correcto", y solo cuando hay un error.',
      '',
      'Respondé SOLO con un objeto JSON con esta forma exacta:',
      '{"renglones":[{"n":1,"latex":"...","legible":true,"estado":"ok"}],"primer_error":null,"paso_correcto":null,"final":null,"comentario":"..."}'
    ].join('\n');
  }

  function validateResult(raw, opts) {
    if (!raw || typeof raw !== 'object' || !Array.isArray(raw.renglones)) return { ok: false, reason: 'sin renglones' };
    const topics = new Set(opts.topicTitles || []);
    const seen = new Set();
    const renglones = [];
    for (const r of raw.renglones) {
      if (!r || typeof r !== 'object') continue;
      const n = Number(r.n);
      if (!Number.isInteger(n) || n < 1 || n > opts.rowsWritten || seen.has(n)) continue;
      seen.add(n);
      const legible = r.legible !== false;
      let estado = ESTADOS.includes(r.estado) ? r.estado : 'no_evaluado';
      if (!legible) estado = 'no_evaluado';
      renglones.push({ n, latex: isStr(r.latex) ? r.latex : '', legible, estado });
    }
    renglones.sort((a, b) => a.n - b.n);
    if (!renglones.length) return { ok: false, reason: 'sin renglones válidos' };

    const pe = raw.primer_error && typeof raw.primer_error === 'object' ? raw.primer_error : null;
    const peRow = pe ? renglones.find(r => r.n === Number(pe.renglon)) : null;
    const firstMarked = renglones.find(r => r.estado === 'error');
    let errRow = null;
    if (peRow && firstMarked) errRow = Math.min(peRow.n, firstMarked.n);
    else if (peRow) errRow = peRow.n;
    else if (firstMarked) errRow = firstMarked.n;

    let primer_error = null;
    let paso_correcto = null;
    if (errRow !== null) {
      // Con letra grande Claude puede numerar el error en un renglón que no transcribió: si hay un solo
      // renglón con error, la explicación es de ese renglón.
      const floating = pe && !peRow && renglones.filter(r => r.estado === 'error').length === 1;
      const explained = pe && ((peRow && peRow.n === errRow) || floating) && isStr(pe.que) && pe.que.trim();
      primer_error = explained
        ? { renglon: errRow, que: pe.que, por_que: isStr(pe.por_que) ? pe.por_que : '', pista: isStr(pe.pista) ? pe.pista : '', tema: isStr(pe.tema) && topics.has(pe.tema) ? pe.tema : null }
        : { renglon: errRow, que: 'Hay un error en este renglón.', por_que: '', pista: 'Revisalo paso por paso comparándolo con el renglón anterior.', tema: null };
      if (explained && isStr(raw.paso_correcto) && raw.paso_correcto.trim()) paso_correcto = raw.paso_correcto;
      for (const r of renglones) {
        if (r.n === errRow) r.estado = 'error';
        else if (r.n > errRow) r.estado = 'no_evaluado';
      }
    }

    let final = null;
    if (opts.mode !== 'parcial') {
      const f = raw.final && typeof raw.final === 'object' ? raw.final : {};
      final = {
        presente: f.presente === true,
        correcto: f.correcto === true,
        completo: f.completo === true,
        faltantes: Array.isArray(f.faltantes) ? f.faltantes.filter(isStr) : []
      };
    }
    return { ok: true, result: { renglones, primer_error, paso_correcto, final, comentario: isStr(raw.comentario) ? raw.comentario : '' } };
  }

  function marksFromResult(result) {
    const marks = {};
    for (const r of result.renglones) {
      if (r.estado === 'ok') marks[r.n] = 'ok';
      else if (r.estado === 'error') marks[r.n] = 'error';
    }
    return marks;
  }

  function outcome(meta, result) {
    if (!result || !result.final || result.primer_error) return null;
    if (!result.final.correcto || !result.final.completo) return null;
    return (meta.everError || meta.usedHint) ? 'partial' : 'clean';
  }

  const HIDE = { hideAI: true };
  const ERROR_COPY = {
    not_granted: Object.assign({ msg: 'No le diste permiso a la página para usar Claude. Para habilitarlo, abrí el menú de la página en claude.ai, entrá a Permisos y permití Claude. Mientras tanto podés seguir escribiendo.' }, HIDE),
    sampling_disabled: Object.assign({ msg: 'Claude no está disponible para tu cuenta en este momento.' }, HIDE),
    not_declared: Object.assign({ msg: 'Esta versión de la página no tiene habilitada la corrección.' }, HIDE),
    capability_disabled: Object.assign({ msg: 'La corrección no está disponible en esta vista.' }, HIDE),
    capability_removed: Object.assign({ msg: 'La corrección no está disponible en esta vista.' }, HIDE),
    images_unavailable: Object.assign({ msg: 'Esta vista no puede mandar imágenes a Claude.' }, HIDE),
    rate_limited: { msg: 'Llegaste al límite de correcciones de hoy. Probá mañana.', hideAI: false },
    session_expired: { msg: 'Tu sesión venció. Volvé a ingresar y recargá la página.', hideAI: false },
    image_rejected: { msg: 'La hoja es demasiado grande para mandarla. Revisá antes, con menos renglones escritos.', hideAI: false },
    cancelled: { msg: '', hideAI: false }
  };
  const GENERIC = { msg: 'No pude corregir esta vez. Probá de nuevo con el botón.', hideAI: false };
  function errorCopy(code) {
    const c = ERROR_COPY[code] || GENERIC;
    if (!c.msg || !code) return c;
    return Object.assign({}, c, { msg: c.msg + ' (código: ' + code + ')' });
  }

  // La respuesta de Claude como objeto, aunque venga entre cercas de código o con texto alrededor.
  function parseReply(text) {
    if (!isStr(text)) return null;
    const t = text.replace(/```(?:json)?/gi, '');
    const a = t.indexOf('{'), b = t.lastIndexOf('}');
    if (a < 0 || b <= a) return null;
    try { const v = JSON.parse(t.slice(a, b + 1)); return v && typeof v === 'object' ? v : null; } catch (e) { return null; }
  }

  function summarize(result) {
    if (!result) return 'sin datos';
    const pe = result.primer_error;
    const err = pe ? 'marcó error en el renglón ' + pe.renglon + ': ' + (pe.que || '') : 'no marcó errores';
    const fin = result.final ? (result.final.correcto ? 'resultado final correcto' : 'resultado final incorrecto') : '';
    return [err, fin].filter(Boolean).join('; ');
  }

  const CorrectorCore = { stripHtml, buildPrompt, validateResult, marksFromResult, outcome, errorCopy, parseReply, summarize };
  if (typeof module !== 'undefined' && module.exports) module.exports = CorrectorCore;
  else root.CorrectorCore = CorrectorCore;
})(typeof window !== 'undefined' ? window : globalThis);
