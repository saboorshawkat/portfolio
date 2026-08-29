  // Matrix rain
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  const chars = 'アイウエオカキクケコサシスセソ01001101アルゴリズム';
  const fontSize = 15;
  let columns, drops;
  function initDrops(){
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
