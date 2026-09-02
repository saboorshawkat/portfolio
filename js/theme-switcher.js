  (function themeSwitcher(){
    const wrap = document.getElementById('themeSwitch');
    const toggle = document.getElementById('themeToggle');
    const dots = document.querySelectorAll('.theme-dot');
    if(!wrap || !toggle) return;

    function setExpanded(open){
      wrap.classList.toggle('expanded', open);
      toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setExpanded(!wrap.classList.contains('expanded'));
    });
    document.addEventListener('click', (e) => {
      if(!wrap.contains(e.target)) setExpanded(false);
    });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') setExpanded(false); });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const t = dot.dataset.t;
        if(t === 'green'){ document.documentElement.removeAttribute('data-theme'); }
        else{ document.documentElement.setAttribute('data-theme', t); }
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        showToast('theme set: ' + t);
        // the swatch on the collapsed toggle button reads var(--green)
        // directly in CSS, so it re-colors on its own — no JS needed there
        setExpanded(false);
      });
    });
  })();

  /* ---------- CRT TOGGLE ---------- */
