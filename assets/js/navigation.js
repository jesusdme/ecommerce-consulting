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

  window.addEventListener('scroll', onScroll);
})();
