  const AudioSys = (function(){
    let ctx = null, analyser = null, ambientNodes = null, ambientOn = false, typingOn = false;
    function ensureCtx(){
      if(!ctx){
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.connect(ctx.destination);
      }
      if(ctx.state === 'suspended') ctx.resume();
      return ctx;
    }
    function click(){
      if(!typingOn) return;
      ensureCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'square';
      o.frequency.value = 700 + Math.random()*300;
      g.gain.value = 0.03;
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      o.connect(g); g.connect(analyser);
      o.start(); o.stop(ctx.currentTime + 0.04);
    }
    function toggleTyping(){
      typingOn = !typingOn;
      if(typingOn) ensureCtx();
      return typingOn;
    }
    function toggleAmbient(){
      ensureCtx();
      ambientOn = !ambientOn;
      if(ambientOn){
        const o1 = ctx.createOscillator(), o2 = ctx.createOscillator();
        const g = ctx.createGain();
        o1.type = 'sine'; o1.frequency.value = 55;
        o2.type = 'sine'; o2.frequency.value = 55 * 1.5;
        g.gain.value = 0.0001;
        g.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 1.2);
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.08;
        lfoGain.gain.value = 6;
        lfo.connect(lfoGain); lfoGain.connect(o2.frequency);
        o1.connect(g); o2.connect(g); g.connect(analyser);
        o1.start(); o2.start(); lfo.start();
        ambientNodes = { o1, o2, lfo, g };
      } else if(ambientNodes){
        ambientNodes.g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          try{ ambientNodes.o1.stop(); ambientNodes.o2.stop(); ambientNodes.lfo.stop(); }catch(e){}
        }, 900);
        ambientNodes = null;
      }
      return ambientOn;
    }
        function getAnalyser(){ ensureCtx(); return analyser; }
    // like getAnalyser, but never creates/resumes the AudioContext — the
    // idle visualizer loop uses this so it can't trip Safari's autoplay
    // lock before the user has actually clicked a toggle
    function peekAnalyser(){ return ctx ? analyser : null; }
    return { click, toggleTyping, toggleAmbient, getAnalyser, peekAnalyser, ensureCtx };
  })();

  (function wireAudioButtons(){
    const typingBtn = document.getElementById('typingSoundToggle');
    const ambientBtn = document.getElementById('audioAmbientToggle');
    if(typingBtn){
      typingBtn.addEventListener('click', () => {
        const on = AudioSys.toggleTyping();
        typingBtn.textContent = 'typing sounds: ' + (on ? 'on' : 'off');
        typingBtn.classList.toggle('active', on);
      });
      document.addEventListener('keydown', (e) => {
        if(document.activeElement && ['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) AudioSys.click();
      });
    }
    if(ambientBtn){
      ambientBtn.addEventListener('click', () => {
        const on = AudioSys.toggleAmbient();
        ambientBtn.classList.toggle('active', on);
        showToast('ambient audio ' + (on ? 'on' : 'off'));
      });
    }
  })();

  /* ---------- AUDIO VISUALIZER ---------- */
  (function audioVisualizer(){
    const canvas = document.getElementById('audioViz');
    if(!canvas) return;
    const actx = canvas.getContext('2d');
    function resize(){ canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; }
    resize();
    window.addEventListener('resize', resize);
    function draw(){
      requestAnimationFrame(draw);
      actx.clearRect(0,0,canvas.width,canvas.height);
      const a = AudioSys.peekAnalyser();
      let data;
      if(a){
        data = new Uint8Array(a.frequencyBinCount);
        a.getByteFrequencyData(data);
      } else {
        data = new Uint8Array(32); // nothing on yet — draw a flat idle row
      }
      const barW = canvas.width / data.length;
      const green = getComputedStyle(document.documentElement).getPropertyValue('--green').trim() || '#FF3B4E';
      actx.fillStyle = green;
      for(let i=0;i<data.length;i++){
        const h = (data[i]/255) * canvas.height;
        actx.fillRect(i*barW, canvas.height-h, barW-1, h);
      }
    }
    draw();
  })();

  /* ---------- HACKER-TYPER MODE ---------- */
