// Puente de calculo.html con el backend del sitio.
// La página nació como página de claude.ai y pide sus servicios con window.claude.use("db" | "user" | "sample").
// Acá esas mismas llamadas se atienden con Supabase: la tabla calculo_docs (un JSON por usuario y clave,
// con RLS) y la Edge Function corregir-lapiz (Gemini). Sin sesión iniciada, use() devuelve null y la página
// guarda sólo en este navegador. Requiere js/auth.js cargado antes.
(function (root) {
  'use strict';
  const C = root.Auth && root.Auth.cliente;
  const TABLA = 'calculo_docs';
  let sesionP = null;
  const sesion = () => sesionP || (sesionP = root.Auth.obtenerSesion().catch(() => null));

  // Los códigos son los que entiende calculo/store.js: "unavailable" se reintenta, el resto se reporta.
  function falla(error) {
    const m = String((error && error.message) || error || '');
    let code = 'unavailable';
    if (/calculo_docs_tamano|violates check constraint/i.test(m)) code = 'too_large';
    else if (/JWT|jwt expired|not authenticated|no autenticado/i.test(m)) code = 'revoked';
    const e = new Error(m || 'error de base de datos');
    e.code = code;
    return e;
  }

  // Rutas de la página: "data/users/<id>/<clave>".
  function clave(path) {
    const p = String(path).split('/');
    if (p.length !== 4 || p[0] !== 'data' || p[1] !== 'users' || !p[3]) throw new TypeError('ruta no soportada: ' + path);
    return p[3];
  }

  function crearDb(uid) {
    function doc(path) {
      const id = clave(path);
      const foto = fila => ({ id, exists: !!fila, data: () => (fila ? fila.cuerpo : undefined), metadata: { fromCache: false, hasPendingWrites: false } });
      async function get() {
        const { data, error } = await C.from(TABLA).select('cuerpo').eq('usuario', uid).eq('doc', id).maybeSingle();
        if (error) throw falla(error);
        return foto(data);
      }
      return {
        id, path, get,
        async set(body) {
          const { error } = await C.from(TABLA).upsert({ usuario: uid, doc: id, cuerpo: body, actualizado_at: new Date().toISOString() });
          if (error) throw falla(error);
        },
        // Escritura parcial: se fusiona en el servidor (supabase/fase7_calculo.sql, calculo_merge).
        async update(patch) {
          const { error } = await C.rpc('calculo_merge', { p_doc: id, p_patch: patch });
          if (error) throw falla(error);
        },
        async delete() {
          const { error } = await C.from(TABLA).delete().eq('usuario', uid).eq('doc', id);
          if (error) throw falla(error);
        },
        // Cambios en vivo desde otro dispositivo u otra pestaña (Supabase Realtime).
        onSnapshot(next, onError) {
          let vivo = true;
          get().then(s => { if (vivo) next(s); }).catch(e => { if (vivo && onError) onError(e); });
          const canal = C.channel('calculo-' + id + '-' + Math.random().toString(36).slice(2))
            .on('postgres_changes', { event: '*', schema: 'public', table: TABLA, filter: 'usuario=eq.' + uid }, payload => {
              if (!vivo) return;
              const nueva = payload.new && payload.new.doc ? payload.new : null;
              if (nueva && nueva.doc === id) next(foto(nueva));
              else if (payload.eventType === 'DELETE' && payload.old && payload.old.doc === id) next(foto(null));
            })
            .subscribe();
          return () => { vivo = false; C.removeChannel(canal); };
        }
      };
    }
    return { doc };
  }

  async function aBase64(blob) {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let s = '';
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s);
  }

  // Corrección de la hoja con lápiz: la misma firma que usa calculo/practice.js.
  function crearCorrector() {
    const corregir = async function (prompt, opts) {
      opts = opts || {};
      const img = opts.images && opts.images[0];
      if (opts.signal && opts.signal.aborted) throw { code: 'cancelled' };
      const body = { prompt: String(prompt), imagen: img ? await aBase64(img) : '', mime: img ? (img.type || 'image/png') : '' };
      if (opts.signal && opts.signal.aborted) throw { code: 'cancelled' };
      const { data, error } = await C.functions.invoke('corregir-lapiz', { body });
      if (opts.signal && opts.signal.aborted) throw { code: 'cancelled' };
      if (error) {
        // El motivo real viaja en el cuerpo de la respuesta (mismo desenvolvido que js/tutor-api.js).
        let info = null;
        try { if (error.context && typeof error.context.json === 'function') info = await error.context.json(); } catch (e) { /* sin cuerpo */ }
        const st = error.context && error.context.status;
        const code = (info && info.code) || (st === 401 ? 'session_expired' : st === 429 ? 'rate_limited' : st === 413 ? 'image_rejected' : 'unavailable');
        throw { code, message: (info && info.error) || error.message };
      }
      return { text: (data && data.text) || '', truncated: false };
    };
    corregir.limits = async () => ({ images: { maxCount: 1, mediaTypes: ['image/png'] } });
    return corregir;
  }

  root.claude = {
    async use(name) {
      const s = await sesion();
      if (!s || !s.user) return null;
      if (name === 'db') return crearDb(s.user.id);
      if (name === 'user') return { id: async () => s.user.id };
      if (name === 'sample') return crearCorrector();
      return null;
    }
  };

  // Al ingresar o salir, se recarga para que la página lea el progreso de la cuenta que corresponde.
  sesion().then(s0 => {
    const inicial = s0 && s0.user ? s0.user.id : null;
    root.Auth.onCambioSesion(s => {
      const ahora = s && s.user ? s.user.id : null;
      if (ahora !== inicial) root.location.reload();
    });
  });
})(window);
