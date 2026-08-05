/* animations.js — Revelado al hacer scroll, contadores, línea de proceso y parallax */

(function () {
  const reduced = prefersReducedMotion();

  /* Revelado de elementos .fade-in al hacer scroll */
  const targets = qsa('.fade-in');
  if (targets.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((el) => revealObserver.observe(el));
  }

  /* Contadores animados (sección de cifras) */
  const counters = qsa('[data-count-to]');
  if (counters.length) {
    if (reduced) {
      counters.forEach((el) => {
        el.textContent = el.getAttribute('data-count-to') + (el.getAttribute('data-suffix') || '');
      });
    } else {
      const countObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count-to'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 1400;
            const start = performance.now();
            function tick(now) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(target * eased) + suffix;
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            countObserver.unobserve(el);
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => countObserver.observe(el));
    }
  }

  /* Línea de progreso de la sección "Proceso" */
  const processFill = qs('#processFill');
  if (processFill) {
    const processSection = processFill.closest('.process');
    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            processFill.style.width = '100%';
            processObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (processSection) processObserver.observe(processSection);
  }

  /* Parallax suave de los "orbes" de fondo (mouse + scroll) */
  const orbs = qsa('.orb');
  if (orbs.length && !reduced) {
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function updateOrbs() {
      curX += (mouseX - curX) * 0.05;
      curY += (mouseY - curY) * 0.05;
      const scrollY = window.scrollY;
      orbs.forEach((orb, i) => {
        const depth = i + 1;
        const px = curX * depth * 10;
        const py = curY * depth * 10 + scrollY * (0.08 * depth);
        orb.style.setProperty('--px', px.toFixed(1));
        orb.style.setProperty('--py', py.toFixed(1));
      });
      requestAnimationFrame(updateOrbs);
    }
    requestAnimationFrame(updateOrbs);
  }
})();
