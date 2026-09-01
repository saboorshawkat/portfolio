  (function particleSystem(){
    const canvas = document.getElementById('particles');
    if(!canvas) return;
    const pctx = canvas.getContext('2d');
    let pw, ph, particles = [];
    const MAX_PARTICLES = 70;
    // Same zoom-compensation as matrix-rain.js so particles cover the
    // whole viewport instead of just the zoomed fraction of it.
    function getZoom(){
      const z = parseFloat(getComputedStyle(document.body).zoom);
      return (!z || isNaN(z) || z <= 0) ? 1 : z;
    }
    function presize(){
      const zoom = getZoom();
      pw = canvas.width = window.innerWidth / zoom;
      ph = canvas.height = window.innerHeight / zoom;
    }
    presize();
    window.addEventListener('resize', presize);

    function spawn(x, y, burst){
      const n = burst ? 10 : 1;
      for(let i=0;i<n;i++){
        if(particles.length >= MAX_PARTICLES * 2) particles.shift();
        particles.push({
          x: x + (Math.random()-0.5)*20,
          y: y + (Math.random()-0.5)*20,
          vx: (Math.random()-0.5) * (burst ? 3 : 0.6),
          vy: (Math.random()-0.5) * (burst ? 3 : 0.6) - (burst?0:0.1),
          life: 1,
          size: 1 + Math.random()*2
        });
      }
    }
    // ambient drift particles
    for(let i=0;i<MAX_PARTICLES;i++){
      particles.push({ x: Math.random()*pw, y: Math.random()*ph, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, life:1, size:1+Math.random()*1.5, ambient:true });
    }

    let mouseX = -999, mouseY = -999;
    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; if(Math.random()<0.12) spawn(e.clientX, e.clientY, false); });
    window.addEventListener('click', (e) => spawn(e.clientX, e.clientY, true));

    const styleVars = getComputedStyle(document.documentElement);
    function getGreen(){ return getComputedStyle(document.documentElement).getPropertyValue('--green').trim() || '#FF3B4E'; }

    function tick(){
      pctx.clearRect(0,0,pw,ph);
      pctx.fillStyle = getGreen();
      for(let i=particles.length-1;i>=0;i--){
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if(!p.ambient){ p.life -= 0.012; }
        else{
          if(p.x<0) p.x=pw; if(p.x>pw) p.x=0;
          if(p.y<0) p.y=ph; if(p.y>ph) p.y=0;
          const dx = p.x-mouseX, dy = p.y-mouseY;
          const dist = Math.sqrt(dx*dx+dy*dy);
          if(dist < 90){ p.x += dx/dist*0.6; p.y += dy/dist*0.6; }
        }
        if(!p.ambient && p.life <= 0){ particles.splice(i,1); continue; }
        pctx.globalAlpha = p.ambient ? 0.35 : Math.max(p.life,0);
        pctx.beginPath();
        pctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        pctx.fill();
      }
      pctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    }
    tick();
  })();

  /* ---------- JWT DECODER ---------- */
