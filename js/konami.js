  // ---- Konami code easter egg ----
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','s''a'];
  let konamiPos = 0;
  window.addEventListener('keydown', (e) => {
    const key = e.key;
    if(key === konami[konamiPos]){
      konamiPos++;
      if(konamiPos === konami.length){
        konamiPos = 0;
        document.body.classList.add('glitching');
        markFlagFound('FLAG{konami_master}');
        showToast('root access granted — cheat mode unlocked');
        setTimeout(() => document.body.classList.remove('glitching'), 900);
      }
    } else {
      konamiPos = (key === konami[0]) ? 1 : 0;
    }
  });

  (function konamiExpansion(){
    let originalHandler = null;
    // hook into existing konami completion by listening for the flag toast pattern
    const origMarkFlagFound = window.markFlagFound;
    // We can't reliably wrap markFlagFound if it's not global, so instead re-listen for the sequence independently.
    const konamiExtra = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let pos = 0;
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      if(key === konamiExtra[pos]){
        pos++;
        if(pos === konamiExtra.length){
          pos = 0;
          triggerKonamiFX();
        }
      } else {
        pos = (key === konamiExtra[0]) ? 1 : 0;
      }
    });
    function triggerKonamiFX(){
      document.body.classList.add('crt-on');
      const dots = document.querySelectorAll('.theme-dot');
      const order = ['cyan','purple','amber','green'];
      let i = 0;
      const iv = setInterval(() => {
        const t = order[i % order.length];
        if(t === 'green') document.documentElement.removeAttribute('data-theme');
        else document.documentElement.setAttribute('data-theme', t);
        i++;
        if(i > 8){ clearInterval(iv); document.documentElement.removeAttribute('data-theme'); document.body.classList.remove('crt-on'); }
      }, 180);
      // confetti-ish particle burst in the center
      const cx = window.innerWidth/2, cy = window.innerHeight/2;
      for(let b=0;b<6;b++){
        setTimeout(() => window.dispatchEvent(new MouseEvent('click', { clientX: cx + (Math.random()-0.5)*300, clientY: cy + (Math.random()-0.5)*200 })), b*80);
      }
    }
  })();

  /* ---------- TIME-BASED GREETING ---------- */
