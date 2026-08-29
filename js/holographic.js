  (function holoGlitch(){
    const els = [document.getElementById('holoName'), document.getElementById('holoAccent')].filter(Boolean);
    if(!els.length) return;
    function burst(){
      const el = els[Math.floor(Math.random()*els.length)];
      el.classList.add('glitching');
      setTimeout(() => el.classList.remove('glitching'), 220 + Math.random()*180);
    }
    setInterval(burst, 3200 + Math.random()*2600);
    els.forEach(el => el.addEventListener('mouseenter', burst));
  })();

  /* ---------- 3D TILT CARDS ---------- */
