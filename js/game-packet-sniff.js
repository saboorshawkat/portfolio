  (function packetSniff(){
    const scoreEl = document.getElementById('sniffScore');
    const timeEl = document.getElementById('sniffTime');
    const laneEl = document.getElementById('sniffLane');
    const idleMsg = document.getElementById('sniffIdleMsg');
    const startBtn = document.getElementById('sniffStart');
    if(!scoreEl || !laneEl || !startBtn) return;

    const DURATION = 30;
    const SAFE_LABELS = ['GET /api/health', 'TLS handshake', 'DNS query: cdn.io', 'ACK 200 OK', 'heartbeat ping', 'ARP who-has', 'NTP sync'];
    const BAD_LABELS = ['SYN flood x400', "payload: <script>", 'SQLi attempt', "' OR 1=1 --", 'reverse shell conn', 'unauth admin login', 'exfil: /etc/passwd'];

    let score = 0;
    let timeLeft = DURATION;
    let running = false;
    let spawnTimer = null;
    let countdownTimer = null;

    function resetStats(){
      score = 0;
      timeLeft = DURATION;
      scoreEl.textContent = score;
      timeEl.textContent = timeLeft;
    }

    function spawnPacket(){
      if(!running) return;
      const malicious = Math.random() < 0.42;
      const label = malicious
        ? BAD_LABELS[Math.floor(Math.random() * BAD_LABELS.length)]
        : SAFE_LABELS[Math.floor(Math.random() * SAFE_LABELS.length)];

      const el = document.createElement('div');
      el.className = 'sniff-packet ' + (malicious ? 'malicious' : 'safe');
      el.textContent = label;
      const top = Math.random() * 82; // percent
      const duration = 3.4 + Math.random() * 2.4;
      el.style.top = top + '%';
      el.style.transform = 'translateX(-260px)';
      laneEl.appendChild(el);

      let resolved = false;
      function resolve(clicked){
        if(resolved) return;
        resolved = true;
        el.style.transition = 'none';
        if(clicked){
          el.classList.add('pop');
          if(malicious){ score += 10; } else { score = Math.max(0, score - 5); }
          scoreEl.textContent = score;
        }
        setTimeout(() => el.remove(), clicked ? 240 : 0);
      }

      el.addEventListener('click', () => resolve(true));

      // let it fly across the lane
      requestAnimationFrame(() => {
        el.style.transition = `transform ${duration}s linear`;
        el.style.transform = `translateX(${laneEl.clientWidth + 300}px)`;
      });
      el.addEventListener('transitionend', () => {
        if(resolved) return;
        // reached the far side unclicked
        if(malicious){ score = Math.max(0, score - 3); scoreEl.textContent = score; }
        resolve(false);
      });
    }

    function tick(){
      timeLeft--;
      timeEl.textContent = Math.max(0, timeLeft);
      if(timeLeft <= 0) stop(true);
    }

    function start(){
      if(running) return;
      running = true;
      resetStats();
      idleMsg.style.display = 'none';
      laneEl.querySelectorAll('.sniff-packet').forEach(p => p.remove());
      startBtn.textContent = 'stop';
      spawnTimer = setInterval(spawnPacket, 650);
      countdownTimer = setInterval(tick, 1000);
    }

    function stop(finished){
      running = false;
      clearInterval(spawnTimer);
      clearInterval(countdownTimer);
      startBtn.textContent = 'start';
      laneEl.querySelectorAll('.sniff-packet').forEach(p => p.remove());
      if(finished){
        idleMsg.textContent = `time's up — final score: ${score}`;
        if(typeof showToast === 'function') showToast('sniff session ended — score ' + score);
      } else {
        idleMsg.textContent = 'hit start to spin up traffic';
      }
      idleMsg.style.display = 'flex';
    }

    startBtn.addEventListener('click', () => { running ? stop(false) : start(); });
    resetStats();
  })();
