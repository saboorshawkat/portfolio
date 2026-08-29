  // ================= FLAG HUNT + ACHIEVEMENTS =================
  const FLAGS = ['FLAG{h1dden_1n_html}','FLAG{c0nsole_spy}','FLAG{invisible_ink}','FLAG{konami_master}'];
  const foundFlags = new Set();
  const flagCountEl = document.getElementById('flagCount');
  const tbFlagsBtn = document.getElementById('tbFlags');
  console.log('%cFLAG{c0nsole_spy}', 'color:#ff3b4e;font-family:monospace;font-size:14px;');
  console.log('%cthree more flags are hidden around this site. type "flags" in the terminal for a hint.', 'color:#7e9691;font-family:monospace;');
  function markFlagFound(flag, silent){
    if(FLAGS.includes(flag) && !foundFlags.has(flag)){
      foundFlags.add(flag);
      flagCountEl.textContent = foundFlags.size;
      if(foundFlags.size === FLAGS.length){
        tbFlagsBtn.classList.add('complete');
        setTimeout(openUnlockOverlay, 500);
      }
      if(!silent) showToast('flag captured: ' + flag + ' (' + foundFlags.size + '/' + FLAGS.length + ')');
    }
  }
  tbFlagsBtn.addEventListener('click', () => {
    showToast(foundFlags.size + '/4 flags found — hunt through the html, the console, and the page itself');
  });

  // -- unlock overlay: shown once all 4 flags are redeemed --
  const unlockOverlay = document.getElementById('unlockOverlay');
  function openUnlockOverlay(){
    unlockOverlay.classList.add('open');
    document.body.classList.add('glitching');
    setTimeout(() => document.body.classList.remove('glitching'), 900);
  }
  function closeUnlockOverlay(){ unlockOverlay.classList.remove('open'); }
  document.getElementById('unlockCloseBtn').addEventListener('click', closeUnlockOverlay);
  unlockOverlay.addEventListener('click', (e) => { if(e.target === unlockOverlay) closeUnlockOverlay(); });
  document.getElementById('unlockContactBtn').addEventListener('click', () => {
    closeUnlockOverlay();
    document.querySelector('#contact')?.scrollIntoView({ behavior:'smooth', block:'start' });
    setTimeout(() => {
      document.querySelectorAll('.contact-card').forEach(card => {
        card.style.borderColor = 'var(--green)';
        card.style.boxShadow = '0 0 24px -6px var(--green-glow)';
        setTimeout(() => { card.style.borderColor = ''; card.style.boxShadow = ''; }, 1800);
      });
    }, 600);
  });
