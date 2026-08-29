  (function crtToggle(){
    const btn = document.getElementById('crtToggle');
    if(!btn) return;
    btn.addEventListener('click', () => {
      document.body.classList.toggle('crt-on');
      btn.classList.toggle('active');
      showToast('CRT mode ' + (document.body.classList.contains('crt-on') ? 'on' : 'off'));
    });
  })();

  /* ---------- HOLOGRAPHIC GLITCH ON HERO NAME ---------- */
