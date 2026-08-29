// ---- Dock active-section indicator ----
// Lights up the dock icon whose section is currently in view. Purely
// cosmetic — safe to delete this file and its <script> tag with no effect
// on anything else.
(function dockScrollspy(){
  const items = Array.from(document.querySelectorAll('.dock-item[data-href^="#"]'));
  if(!items.length) return;
  const map = items
    .map(item => {
      const sel = item.getAttribute('data-href');
      const el = sel && sel.length > 1 ? document.querySelector(sel) : null;
      return el ? { item, el } : null;
    })
    .filter(Boolean);
  if(!map.length) return;

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const hit = map.find(m => m.el === entry.target);
      if(!hit) return;
      hit.item.classList.toggle('on-screen', entry.isIntersecting);
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  map.forEach(m => spyObserver.observe(m.el));
})();
