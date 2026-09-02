// ---- Dock / mobile-menu active-section indicator ----
// Lights up the dock icon (and its mobile off-canvas-menu counterpart)
// whose section is currently in view. Purely cosmetic — safe to delete
// this file and its <script> tag with no effect on anything else.
(function dockScrollspy(){
  const items = Array.from(document.querySelectorAll('.dock-item[data-href^="#"], .mm-item[data-href^="#"]'));
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
      // a section can have both a dock-item AND an mm-item pointing at
      // it, so update every match, not just the first one found
      map
        .filter(m => m.el === entry.target)
        .forEach(hit => hit.item.classList.toggle('on-screen', entry.isIntersecting));
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  // observe each unique target element once, regardless of how many
  // nav items (dock + mobile menu) point at it
  const uniqueEls = Array.from(new Set(map.map(m => m.el)));
  uniqueEls.forEach(el => spyObserver.observe(el));
})();
