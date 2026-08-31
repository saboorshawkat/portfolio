  // Matrix rain
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  // body uses CSS `zoom` for scaling, which also shrinks fixed-position
  // canvases visually. Compensate so the canvas still covers the full
  // real viewport instead of just the zoomed fraction of it.
  function getZoom(){
    const z = parseFloat(getComputedStyle(document.body).zoom);
    return (!z || isNaN(z) || z <= 0) ? 1 : z;
  }
  function resize(){
    const zoom = getZoom();
    canvas.width = window.innerWidth / zoom;
    canvas.height = window.innerHeight / zoom;
  }
  resize(); window.addEventListener('resize', resize);
  const chars = 'アイウエオカキクケコサシスセソ546003アルゴリズム';
  // smaller glyphs on narrow screens = denser, crisper-looking rain
  // instead of a few big fat characters stretched across a phone screen
  let fontSize = 15;
  function computeFontSize(){
    const w = window.innerWidth;
    if(w <= 480) return 8;
    if(w <= 768) return 10;
    if(w <= 1024) return 12;
    return 15;
  }
  let columns, drops;
  function initDrops(){
    fontSize = computeFontSize();
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }
  initDrops(); window.addEventListener('resize', initDrops);
  function drawMatrix(){
    ctx.fillStyle = 'rgba(10,7,8,0.08)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#FF3B4E';
    ctx.font = fontSize + 'px monospace';
    for(let i=0;i<drops.length;i++){
      const text = chars[Math.floor(Math.random()*chars.length)];
      ctx.fillText(text, i*fontSize, drops[i]*fontSize);
      if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 55);
