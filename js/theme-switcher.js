  (function themeSwitcher(){
    const dots = document.querySelectorAll('.theme-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const t = dot.dataset.t;
        if(t === 'green'){ document.documentElement.removeAttribute('data-theme'); }
        else{ document.documentElement.setAttribute('data-theme', t); }
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        showToast('theme set: ' + t);
      });
    });
  })();

  /* ---------- CRT TOGGLE ---------- */
