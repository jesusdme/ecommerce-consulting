/* navigation.js — Comportamiento del nav fijo con blur */

(function () {
  const nav = qs('#mainNav');
  if (!nav) return;

  const onScroll = debounce(() => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, 10);

  window.addEventListener('scroll', onScroll, { passive: true });

  // Menú hamburguesa (móvil)
  const toggle = qs('#navToggle');
  const links = qs('#navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    qsa('a', links).forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
