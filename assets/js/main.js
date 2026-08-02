/* main.js — Punto de entrada principal (se carga al final en cada página) */

(function () {
  // Año dinámico en el footer
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
