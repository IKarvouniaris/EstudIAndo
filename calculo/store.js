(function (root) {
  'use strict';
  const LOCAL_KEYS = { progreso: 'calc1-progress-v2', plan: 'calc1-roadmap-v2' };
  // Documentos que se guardan campo por campo: cada cambio sube solo lo que cambió, así dos dispositivos
  // (o dos pestañas) no se pisan entre sí. La profundidad dice hasta qué nivel se separan los campos:
  // en el progreso cada entrada es un campo; en el plan, cada casilla de done; en el entrenador, cada lección, día y error.
  const MERGE_DEPTH = { progreso: 1, plan: 2, duo: 2 };
  const MAX_BYTES = 250 * 1024;
  const localKey = key => LOCAL_KEYS[key] || ('calc1-' + key.replace(':', '-'));
  const pendingKey = key => 'calc1-pending-' + key;
  const migratedKey = key => 'calc1-merged-v1-' + key;
  const docId = key => key.replace(':', '-');
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const clone = v => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));
  const isObj = v => !!v && typeof v === 'object' && !Array.isArray(v);
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const empty = o => !o || !Object.keys(o).length;

  // Un parche tiene solo las hojas que cambiaron; null en una hoja quiere decir "borrada".
  function diff(oldV, newV, depth) {
    const out = {};
    const o = isObj(oldV) ? oldV : {}, n = isObj(newV) ? newV : {};
    for (const k of new Set(Object.keys(o).concat(Object.keys(n)))) {
      const a = o[k], b = n[k];
      if (b === undefined || b === null) { if (a !== undefined && a !== null) out[k] = null; continue; }
      if (depth > 1 && isObj(b) && (a === undefined || a === null || isObj(a))) {
        const sub = diff(a, b, depth - 1);
        if (!empty(sub)) out[k] = sub;
      } else if (!same(a, b)) out[k] = clone(b);
    }
    return out;
  }

  function applyPatch(base, patch, depth) {
    const out = isObj(base) ? clone(base) : {};
    for (const k of Object.keys(patch || {})) {
      const p = patch[k];
      if (p === null) delete out[k];
      else if (depth > 1 && isObj(p)) out[k] = applyPatch(out[k], p, depth - 1);
      else out[k] = clone(p);
    }
    return out;
  }

  // Junta un parche nuevo sobre uno pendiente (gana el nuevo).
  function mergePatch(into, patch, depth) {
    for (const k of Object.keys(patch)) {
      const p = patch[k];
      if (depth > 1 && isObj(p) && isObj(into[k])) mergePatch(into[k], p, depth - 1);
      else into[k] = clone(p);
    }
    return into;
  }

  // Saca del pendiente lo que ya subió (salvo que haya vuelto a cambiar mientras tanto).
  function settle(pending, sent, depth) {
    for (const k of Object.keys(sent)) {
      if (!(k in pending)) continue;
      if (depth > 1 && isObj(sent[k]) && isObj(pending[k])) {
        settle(pending[k], sent[k], depth - 1);
        if (empty(pending[k])) delete pending[k];
      } else if (same(pending[k], sent[k])) delete pending[k];
    }
  }

  function stripNulls(v, depth) {
    const out = {};
    if (!isObj(v)) return out;
    for (const k of Object.keys(v)) {
      const x = v[k];
      if (x === null || x === undefined) continue;
      out[k] = depth > 1 && isObj(x) ? stripNulls(x, depth - 1) : x;
    }
    return out;
  }

  // Lo que hay en este dispositivo y no en la cuenta (solo agregados, nunca borra nada de la cuenta).
  function missing(server, local, depth) {
    const out = {};
    if (!isObj(local)) return out;
    const s = isObj(server) ? server : {};
    for (const k of Object.keys(local)) {
      const l = local[k];
      if (l === null || l === undefined) continue;
      if (s[k] === undefined || s[k] === null) out[k] = clone(l);
      else if (depth > 1 && isObj(l) && isObj(s[k])) {
        const sub = missing(s[k], l, depth - 1);
        if (!empty(sub)) out[k] = sub;
      }
    }
    return out;
  }

  function countLeaves(p, depth) {
    let n = 0;
    for (const k of Object.keys(p || {})) n += (depth > 1 && isObj(p[k])) ? countLeaves(p[k], depth - 1) : 1;
    return n;
  }

  function createStore(opts) {
    opts = opts || {};
    let local = opts.local || null;
    if (!local) { try { local = typeof localStorage !== 'undefined' ? localStorage : null; } catch (e) { local = null; } }
    const debounceMs = opts.debounceMs == null ? 800 : opts.debounceMs;
    const retryDelayMs = opts.retryDelayMs == null ? 1000 : opts.retryDelayMs;
    const cache = new Map();
    // Para cada objeto entregado a la página, una copia de cómo estaba: así cada guardado sube solo lo que
    // cambió ese objeto, aunque la página lo mute en el lugar o tenga una copia vieja.
    const baseOf = new WeakMap();
    const pending = new Map();  // parches que todavía no llegaron a la cuenta (también en el dispositivo)
    const timers = new Map();
    const writing = new Map();
    const dirty = new Set();
    const subs = new Map();
    const retries = new Map();
    let db = null, uid = null, lastError = null;

    function readRaw(k) { try { const s = local && local.getItem(k); return s ? JSON.parse(s) : undefined; } catch (e) { return undefined; } }
    function writeRaw(k, v) { try { if (local) { if (v === undefined) local.removeItem(k); else local.setItem(k, JSON.stringify(v)); } } catch (e) { /* almacenamiento bloqueado o lleno */ } }
    const readLocal = key => readRaw(localKey(key));
    const writeLocal = (key, value) => writeRaw(localKey(key), value);
    const path = key => 'data/users/' + uid + '/' + docId(key);
    function notify() { if (typeof api.onStatus === 'function') { try { api.onStatus(api.status()); } catch (e) { /* la UI no rompe el guardado */ } } }
    function report(key, code) { lastError = code || 'unknown'; notify(); if (typeof api.onError === 'function') api.onError(key, lastError); }

    function getPending(key) {
      if (!pending.has(key)) { const p = readRaw(pendingKey(key)); pending.set(key, isObj(p) ? p : {}); }
      return pending.get(key);
    }
    function savePending(key) { const p = getPending(key); writeRaw(pendingKey(key), empty(p) ? undefined : p); }

    function schedule(key) {
      if (timers.has(key)) clearTimeout(timers.get(key));
      timers.set(key, setTimeout(() => { timers.delete(key); writeNow(key); }, debounceMs));
    }

    // Reintento con espera creciente para lo que no pudo subir (sin conexión, límite de uso, etc.).
    function retryLater(key) {
      const n = (retries.get(key) || 0) + 1;
      retries.set(key, n);
      if (n > 6) return;
      setTimeout(() => { if (db && !empty(getPending(key))) schedule(key); }, Math.min(60000, 5000 * n));
    }

    async function pushPatch(key) {
      const depth = MERGE_DEPTH[key];
      const sent = clone(getPending(key));
      if (empty(sent)) return;
      const ref = db.doc(path(key));
      const attempt = async () => {
        try { await ref.update({ v: sent }); }
        catch (e) {
          if (!e || e.code !== 'invalid_argument') throw e;
          // update exige que el documento exista: la primera vez se crea entero.
          const snap = await ref.get();
          if (snap.exists) throw e;
          await ref.set({ v: stripNulls(applyPatch({}, sent, depth), depth) });
        }
      };
      try {
        try { await attempt(); }
        catch (e) {
          if (!e || e.code !== 'unavailable') throw e;
          await sleep(retryDelayMs + Math.random() * retryDelayMs);
          await attempt();
        }
        settle(getPending(key), sent, depth);
        savePending(key);
        retries.delete(key);
        lastError = null;
        notify();
      } catch (e) {
        report(key, e && e.code);
        if (!e || (e.code !== 'invalid_argument' && e.code !== 'quota_exceeded' && e.code !== 'revoked')) retryLater(key);
      }
    }

    async function pushWhole(key) {
      const body = { v: cache.get(key) };
      if (JSON.stringify(body).length > MAX_BYTES) { report(key, 'too_large'); return; }
      try { await db.doc(path(key)).set(body); }
      catch (e) {
        if (e && e.code === 'unavailable') {
          await sleep(retryDelayMs + Math.random() * retryDelayMs);
          try { await db.doc(path(key)).set(body); } catch (e2) { report(key, e2 && e2.code); }
        } else report(key, e && e.code);
      }
    }

    async function writeNow(key) {
      if (!db) return;
      if (writing.has(key)) { dirty.add(key); return writing.get(key); }
      dirty.delete(key);
      const p = MERGE_DEPTH[key] ? pushPatch(key) : pushWhole(key);
      writing.set(key, p);
      try { await p; } finally { writing.delete(key); }
      if (dirty.has(key)) return writeNow(key);
    }

    // Lo que dice la cuenta + lo que este dispositivo todavía no subió. Devuelve true si cambió algo.
    function adoptServer(key, serverV) {
      const depth = MERGE_DEPTH[key];
      const server = stripNulls(serverV, depth);
      const value = stripNulls(applyPatch(server, getPending(key), depth), depth);
      const changed = !same(value, cache.get(key));
      if (!changed) return false;
      cache.set(key, value);
      baseOf.set(value, clone(value));
      writeLocal(key, value);
      return true;
    }

    // Una sola vez por dispositivo: lo que quedó guardado acá y nunca llegó a la cuenta, se agrega.
    function migrate(key, serverV) {
      if (readRaw(migratedKey(key))) return;
      const depth = MERGE_DEPTH[key];
      const add = missing(stripNulls(serverV, depth), stripNulls(readLocal(key), depth), depth);
      if (!empty(add)) { mergePatch(getPending(key), add, depth); savePending(key); }
      writeRaw(migratedKey(key), true);
    }

    function subscribe(key) {
      if (subs.has(key) || !db) return;
      try {
        const unsub = db.doc(path(key)).onSnapshot(snap => {
          const body = snap.exists ? snap.data() : undefined;
          if (adoptServer(key, body && body.v) && typeof api.onRemote === 'function') api.onRemote(key);
        }, () => { subs.delete(key); });
        subs.set(key, unsub);
      } catch (e) { /* sin suscripción: queda el refresco al volver a la pestaña */ }
    }

    const api = {
      mode: 'local',
      ready: false,
      onError: null,
      onRemote: null,
      onStatus: null,
      get(key) {
        if (!cache.has(key)) {
          const v = readLocal(key);
          if (v !== undefined) { cache.set(key, v); if (isObj(v)) baseOf.set(v, clone(v)); }
        }
        return cache.get(key);
      },
      set(key, value) {
        const depth = MERGE_DEPTH[key];
        if (depth) {
          // Un objeto que el almacén no entregó: solo cuenta lo que agrega, nunca borra.
          const patch = diff(baseOf.has(value) ? baseOf.get(value) : {}, value, depth);
          baseOf.set(value, clone(value));
          if (empty(patch)) return;
          mergePatch(getPending(key), patch, depth);
          savePending(key);
          const cur = cache.get(key);
          if (cur !== value && isObj(cur)) {
            const merged = stripNulls(applyPatch(cur, patch, depth), depth);
            cache.set(key, merged);
            baseOf.set(merged, clone(merged));
            writeLocal(key, merged);
          } else {
            cache.set(key, value);
            writeLocal(key, value);
          }
        } else {
          cache.set(key, value);
          writeLocal(key, value);
        }
        if (db) schedule(key);
        notify();
      },
      async fetch(key) {
        if (db) {
          try {
            const snap = await db.doc(path(key)).get();
            const body = snap.exists ? snap.data() : undefined;
            if (MERGE_DEPTH[key]) {
              migrate(key, body && body.v);
              if (adoptServer(key, body && body.v) && typeof api.onRemote === 'function') api.onRemote(key);
              if (!empty(getPending(key))) schedule(key);
              return api.get(key);
            }
            if (body && Object.prototype.hasOwnProperty.call(body, 'v')) {
              cache.set(key, body.v);
              writeLocal(key, body.v);
              return body.v;
            }
            const lv = readLocal(key);
            if (lv !== undefined) { cache.set(key, lv); schedule(key); }
            return lv;
          } catch (e) { /* sin cuenta disponible: queda lo local */ }
        }
        return api.get(key);
      },
      // Al volver a la pestaña: subir lo pendiente y, si no hay suscripción en vivo, releer la cuenta.
      async refresh(key) {
        if (!db) return api.get(key);
        if (MERGE_DEPTH[key]) {
          if (!empty(getPending(key))) schedule(key);
          if (subs.has(key)) return api.get(key);
          await api.fetch(key);
          subscribe(key);
          return api.get(key);
        }
        if (timers.has(key) || writing.has(key) || dirty.has(key)) return api.get(key);
        return api.fetch(key);
      },
      async init(claude) {
        try {
          if (!claude || typeof claude.use !== 'function') return api.mode;
          const [dbNs, userNs] = await Promise.all([claude.use('db'), claude.use('user')]);
          if (!dbNs || !userNs) return api.mode;
          const id = await userNs.id();
          if (!id) return api.mode;
          db = dbNs; uid = id; api.mode = 'db';
          for (const k of Object.keys(MERGE_DEPTH)) await api.fetch(k);
          for (const k of Object.keys(MERGE_DEPTH)) subscribe(k);
        } catch (e) {
          db = null; uid = null; api.mode = 'local';
        } finally {
          api.ready = true;
          notify();
        }
        return api.mode;
      },
      // Estado para mostrar: dónde se guarda y cuántos cambios faltan subir.
      status() {
        let n = 0;
        for (const k of Object.keys(MERGE_DEPTH)) n += countLeaves(getPending(k), MERGE_DEPTH[k]);
        return { mode: api.mode, ready: api.ready, pending: n, error: lastError };
      },
      async flush() {
        for (const [key, t] of timers) { clearTimeout(t); timers.delete(key); dirty.add(key); }
        const keys = [...dirty];
        await Promise.all(keys.map(k => writeNow(k)));
        await Promise.all([...writing.values()]);
      }
    };
    return api;
  }

  const StoreUtil = { diff, applyPatch, mergePatch, settle, stripNulls, missing };
  if (typeof module !== 'undefined' && module.exports) module.exports = { createStore, StoreUtil };
  else { root.createStore = createStore; root.Store = createStore(); }
})(typeof window !== 'undefined' ? window : globalThis);
