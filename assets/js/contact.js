/* contact.js — Formulario de contacto (solo se usa en contacto.html) */

(function () {
  const form = qs('#contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // La lógica de envío (backend, email, API, etc.) se implementará más adelante.
  });
})();
