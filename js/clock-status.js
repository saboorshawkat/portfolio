  // Clock
  function tick(){
    const d = new Date();
    document.getElementById('clock').textContent = d.toTimeString().slice(0,8);
  }
  tick(); setInterval(tick, 1000);

  // Status typing
  const statusEl = document.getElementById('typeStatus');
  const statuses = ['scanning...', 'access: granted', 'uptime: stable', 'mode: red-team'];
  let sI = 0, cI = 0, del = false;
  function loopStatus(){
    const s = statuses[sI];
    if(!del){ cI++; statusEl.textContent = s.slice(0,cI); if(cI===s.length){ del=true; setTimeout(loopStatus,1500); return; } }
    else{ cI--; statusEl.textContent = s.slice(0,cI); if(cI===0){ del=false; sI=(sI+1)%statuses.length; } }
    setTimeout(loopStatus, del?30:55);
  }
  loopStatus();
