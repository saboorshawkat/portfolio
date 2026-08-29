  (function typingGame(){
    const target = document.getElementById('typingTarget');
    const input = document.getElementById('typingInput');
    const wpmEl = document.getElementById('typingWpm');
    const accEl = document.getElementById('typingAcc');
    const resetBtn = document.getElementById('typingReset');
    if(!target || !input) return;

    const lines = [
      "the quick brown fox jumps over the lazy dog while pentesting the network",
      "nmap -sV -sC -oA scan 10.10.10.10 to enumerate open ports and services",
      "never trust user input validate everything sanitize output escape context",
      "curl -s https://target/api/v1/users | jq '.[] | select(.role==\"admin\")'"
    ];
    let text = '', startTime = null, done = false;

    function renderTarget(typed){
      let html = '';
      for(let i=0;i<text.length;i++){
        const ch = text[i];
        if(i < typed.length){
          html += `<span class="${typed[i]===ch ? 'correct' : 'wrong'}">${ch === ' ' ? '&nbsp;' : ch}</span>`;
        } else if(i === typed.length){
          html += `<span class="cursor-pos">${ch === ' ' ? '&nbsp;' : ch}</span>`;
        } else{
          html += ch === ' ' ? '&nbsp;' : ch;
        }
      }
      target.innerHTML = html;
    }

    function newRound(){
      text = lines[Math.floor(Math.random()*lines.length)];
      input.value = '';
      startTime = null;
      done = false;
      wpmEl.textContent = '0';
      accEl.textContent = '100%';
      renderTarget('');
    }

    input.addEventListener('input', () => {
      if(done) return;
      if(!startTime) startTime = Date.now();
      const typed = input.value;
      renderTarget(typed);
      let correct = 0;
      for(let i=0;i<typed.length;i++){ if(typed[i]===text[i]) correct++; }
      accEl.textContent = typed.length ? Math.round((correct/typed.length)*100) + '%' : '100%';
      const elapsedMin = (Date.now()-startTime) / 60000;
      const words = typed.trim().length / 5;
      wpmEl.textContent = elapsedMin > 0 ? Math.round(words/elapsedMin) : 0;
      if(typed === text){
        done = true;
        showToast('typing challenge done — ' + wpmEl.textContent + ' WPM at ' + accEl.textContent + ' accuracy');
      }
    });
    resetBtn.addEventListener('click', newRound);
    newRound();
  })();

  /* ---------- MEMORY MATCH GAME ---------- */
