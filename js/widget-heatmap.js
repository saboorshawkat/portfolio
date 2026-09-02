  (function activityHeatmap(){
    const grid = document.getElementById('heatmapGrid');
    if(!grid) return;
    const days = 26 * 7;
    let html = '';
    for(let i=0;i<days;i++){
      const lvl = Math.random() < 0.35 ? 0 : Math.min(4, Math.floor(Math.random()*5));
      const opacity = [0, 0.25, 0.45, 0.7, 1][lvl];
      html += `<div class="heat-cell" style="background:${lvl===0 ? 'var(--surface-2)' : 'var(--green)'}; opacity:${lvl===0?1:opacity};" title="${lvl} contributions"></div>`;
    }
    grid.innerHTML = html;
    document.querySelectorAll('.heatmap-legend .heat-cell').forEach((el,i) => {
      const opacity = [0,0.25,0.45,0.7,1][i];
      el.style.background = i===0 ? 'var(--surface-2)' : 'var(--green)';
      el.style.opacity = i===0 ? 1 : opacity;
    });
  })();

  /* ---------- SYSTEM MONITOR (simulated) ---------- */
