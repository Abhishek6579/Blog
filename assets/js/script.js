// Simple scroll-trigger animation using getBoundingClientRect + rAF.
// Works on older browsers and is easy to debug.

(function() {
  const items = Array.from(document.querySelectorAll('.timeline-item'));
  if (!items.length) return;

  let ticking = false;

  function isVisible(el, offset = 0.85) {
    const rect = el.getBoundingClientRect();
    // visible when top is within offset * viewport height
    return rect.top <= window.innerHeight * offset && rect.bottom >= 0;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        items.forEach((el, i) => {
          if (!el.classList.contains('animate') && isVisible(el)) {
            // small stagger for nicer effect
            setTimeout(() => el.classList.add('animate'), i * 80);
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }

  // initial check (in case some elements are already visible)
  window.addEventListener('load', onScroll, {passive: true});
  window.addEventListener('resize', onScroll, {passive: true});
  window.addEventListener('scroll', onScroll, {passive: true});

  // also run once now
  onScroll();
})();
