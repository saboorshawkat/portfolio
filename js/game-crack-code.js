  (function crackCode(){
    const guessesEl = document.getElementById('crackGuesses');
    const inputEl = document.getElementById('crackInput');
    const submitBtn = document.getElementById('crackSubmit');
    const attemptsEl = document.getElementById('crackAttempts');
    const resetBtn = document.getElementById('crackReset');
    if(!guessesEl || !inputEl || !submitBtn) return;

    const MAX_ATTEMPTS = 8;
    let secret = [];
    let attempts = 0;
    let over = false;

    function newSecret(){
      const digits = [0,1,2,3,4,5,6,7,8,9];
      for(let i = digits.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [digits[i], digits[j]] = [digits[j], digits[i]];
      }
      return digits.slice(0, 4);
    }

    function resetGame(){
      secret = newSecret();
      attempts = 0;
      over = false;
      attemptsEl.textContent = '0';
      guessesEl.innerHTML = '';
      inputEl.value = '';
      inputEl.disabled = false;
      submitBtn.disabled = false;
    }

    // standard Mastermind-style scoring: hit = right digit, right spot.
    // close = right digit, wrong spot (each secret digit only counted once).
    function scoreGuess(guess){
      let hit = 0;
      const secretLeft = [];
      const guessLeft = [];
      for(let i = 0; i < 4; i++){
        if(guess[i] === secret[i]) hit++;
        else { secretLeft.push(secret[i]); guessLeft.push(guess[i]); }
      }
      let close = 0;
      guessLeft.forEach(d => {
        const idx = secretLeft.indexOf(d);
        if(idx !== -1){ close++; secretLeft.splice(idx, 1); }
      });
      return { hit, close };
    }

    function renderGuess(guess, result){
      const row = document.createElement('div');
      row.className = 'crack-guess-row';

      const codeWrap = document.createElement('div');
      codeWrap.className = 'crack-guess-code';
      guess.forEach(d => {
        const dEl = document.createElement('span');
        dEl.className = 'crack-digit';
        dEl.textContent = d;
        codeWrap.appendChild(dEl);
      });

      const fb = document.createElement('div');
      fb.className = 'crack-guess-feedback';
      const pegs = [];
      for(let i = 0; i < result.hit; i++) pegs.push('hit');
      for(let i = 0; i < result.close; i++) pegs.push('close');
      while(pegs.length < 4) pegs.push('miss');
      pegs.forEach(p => {
        const peg = document.createElement('span');
        peg.className = 'crack-peg' + (p !== 'miss' ? ' ' + p : '');
        fb.appendChild(peg);
      });

      row.appendChild(codeWrap);
      row.appendChild(fb);
      guessesEl.prepend(row);
    }

    function endGame(win){
      over = true;
      inputEl.disabled = true;
      submitBtn.disabled = true;
      const banner = document.createElement('div');
      banner.className = 'crack-result ' + (win ? 'win' : 'lose');
      banner.textContent = win
        ? `cracked it in ${attempts} attempt${attempts === 1 ? '' : 's'}.`
        : `out of attempts — the code was ${secret.join('')}.`;
      guessesEl.prepend(banner);
      if(typeof showToast === 'function'){
        showToast(win ? 'code cracked' : 'out of attempts');
      }
    }

    function submitGuess(){
      if(over) return;
      const raw = inputEl.value.trim();
      if(!/^\d{4}$/.test(raw)){
        if(typeof showToast === 'function') showToast('enter exactly 4 digits');
        inputEl.focus();
        return;
      }
      const guess = raw.split('').map(Number);
      attempts++;
      attemptsEl.textContent = attempts;
      const result = scoreGuess(guess);
      renderGuess(guess, result);
      inputEl.value = '';
      inputEl.focus();
      if(result.hit === 4) endGame(true);
      else if(attempts >= MAX_ATTEMPTS) endGame(false);
    }

    submitBtn.addEventListener('click', submitGuess);
    inputEl.addEventListener('keydown', e => { if(e.key === 'Enter') submitGuess(); });
    inputEl.addEventListener('input', () => {
      inputEl.value = inputEl.value.replace(/\D/g, '').slice(0, 4);
    });
    resetBtn?.addEventListener('click', resetGame);

    resetGame();
  })();
