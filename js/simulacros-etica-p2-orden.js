/* Orden de las opciones de los simulacros del 2.º parcial de Ética (simulacro-etica-2-desarrollo.html).
   En los datos la opción correcta va primera; acá se la mueve a un lugar fijo por pregunta (siempre el mismo para la misma clave),
   así la letra correcta no cae siempre en el mismo lugar y lo guardado en el navegador sigue valiendo.
   Lo usan la página y tools/medir_simulacros_etica_p2.js. */
(function(raiz){
  "use strict";
  function hash(s){
    var h = 1779033703 ^ s.length;
    for(var i = 0; i < s.length; i++){ h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return h >>> 0;
  }
  function azar(semilla){
    var a = semilla >>> 0;
    return function(){
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  // Devuelve perm: perm[posición] = índice original de la opción (0 = la correcta).
  function ordenOpciones(clave, n){
    var r = azar(hash("etica-p2:" + clave)), perm = [], i, j, t;
    for(i = 0; i < n; i++) perm.push(i);
    for(i = n - 1; i > 0; i--){ j = Math.floor(r() * (i + 1)); t = perm[i]; perm[i] = perm[j]; perm[j] = t; }
    return perm;
  }
  raiz.ordenOpcionesEticaP2 = ordenOpciones;
  if(typeof module !== "undefined") module.exports = ordenOpciones;
})(typeof window !== "undefined" ? window : globalThis);
