  // -- password strength tool --
  (function passwordTool(){
  const passInput = document.getElementById('passInput');
  const passMeterFill = document.getElementById('passMeterFill');
  const passVerdict = document.getElementById('passVerdict');
  const passToggle = document.getElementById('passToggle');
  if(!passInput || !passMeterFill || !passVerdict || !passToggle) return;
  passToggle.addEventListener('click', () => {
    const showing = passInput.type === 'text';
    passInput.type = showing ? 'password' : 'text';
    passToggle.classList.toggle('showing', !showing);
  });
  passInput.addEventListener('input', () => {
    const v = passInput.value;
    const checks = {
      len: v.length >= 8,
      case: /[a-z]/.test(v) && /[A-Z]/.test(v),
      num: /[0-9]/.test(v),
      sym: /[^a-zA-Z0-9]/.test(v),
    };
    Object.entries(checks).forEach(([key, met]) => {
      document.querySelector(`.pass-check[data-check="${key}"]`).classList.toggle('met', met);
    });
    const score = Object.values(checks).filter(Boolean).length + (v.length >= 12 ? 1 : 0);
    const pct = v ? (score/5)*100 : 0;
    passMeterFill.style.width = pct + '%';
    const colors = ['#ff7a45','#ff7a45','#e8b75b','#e8b75b','#ff3b4e','#ff3b4e'];
    passMeterFill.style.background = colors[score];
    const labels = ['enter a password to test its strength','very weak — trivially cracked','weak — add length and variety','okay — could still be stronger','strong — good mix of length and character types','very strong — solid password'];
    passVerdict.textContent = v ? labels[score] : labels[0];
  });
  })();
