  (function memoryGame(){
    const grid = document.getElementById('memoryGrid');
    const movesEl = document.getElementById('memMoves');
    const resetBtn = document.getElementById('memReset');
    if(!grid) return;
    const icons = ['🔒','🛡️','🔑','💾','🖧','🐛','⚡','👾'];
    let cards = [], flipped = [], matched = new Set(), moves = 0, locked = false;

    function shuffle(arr){
      for(let i=arr.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
      return arr;
    }

    function build(){
      cards = shuffle([...icons, ...icons]);
      flipped = []; matched = new Set(); moves = 0; locked = false;
      movesEl.textContent = '0';
      grid.innerHTML = '';
      cards.forEach((icon, idx) => {
        const cell = document.createElement('div');
        cell.className = 'mem-cell';
        cell.dataset.idx = idx;
        cell.dataset.icon = icon;
        cell.addEventListener('click', () => flip(cell));
        grid.appendChild(cell);
      });
    }

    function flip(cell){
      if(locked) return;
      const idx = cell.dataset.idx;
      if(cell.classList.contains('flipped') || cell.classList.contains('matched')) return;
      cell.classList.add('flipped');
      cell.textContent = cell.dataset.icon;
      flipped.push(cell);
      if(flipped.length === 2){
        moves++;
        movesEl.textContent = moves;
        locked = true;
        const [a,b] = flipped;
        if(a.dataset.icon === b.dataset.icon){
          a.classList.add('matched'); b.classList.add('matched');
          matched.add(a.dataset.idx); matched.add(b.dataset.idx);
          flipped = []; locked = false;
          if(matched.size === cards.length){
            showToast('memory match solved in ' + moves + ' moves');
          }
        } else{
          setTimeout(() => {
            a.classList.remove('flipped'); a.textContent = '';
            b.classList.remove('flipped'); b.textContent = '';
            flipped = []; locked = false;
          }, 700);
        }
      }
    }
    resetBtn.addEventListener('click', build);
    build();
  })();

  /* ---------- EXPANDED KONAMI PAYOFF ---------- */
