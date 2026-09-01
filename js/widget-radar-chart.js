  (function skillsRadar(){
    const wrap = document.getElementById('skillsRadarWrap');
    if(!wrap) return;
    const labels = ['networking','linux','python','web-sec','AD/priv-esc','recon'];
    const values = [0.75, 0.85, 0.7, 0.65, 0.55, 0.8]; // 0-1
    const size = 280, cx = size/2, cy = size/2, r = size/2 - 40;
    const n = labels.length;
    function pointAt(i, scale){
      const angle = (Math.PI*2 * i / n) - Math.PI/2;
      return [cx + Math.cos(angle) * r * scale, cy + Math.sin(angle) * r * scale];
    }
    let gridPolys = '';
    for(let ring=1; ring<=4; ring++){
      const s = ring/4;
      const pts = labels.map((_,i) => pointAt(i, s).join(',')).join(' ');
      gridPolys += `<polygon points="${pts}" fill="none" stroke="var(--border)" stroke-width="1"/>`;
    }
    let axes = labels.map((_,i) => { const [x,y] = pointAt(i,1); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--border-soft)" stroke-width="1"/>`; }).join('');
    let dataPts = values.map((v,i) => pointAt(i, v).join(',')).join(' ');
    let labelEls = labels.map((l,i) => {
      const [x,y] = pointAt(i, 1.18);
      return `<text x="${x}" y="${y}" fill="var(--text-faint)" font-size="10" font-family="var(--mono)" text-anchor="middle" dominant-baseline="middle">${l}</text>`;
    }).join('');
    wrap.innerHTML = `
      <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
        ${gridPolys}
        ${axes}
        <polygon points="${dataPts}" fill="var(--green)" fill-opacity="0.18" stroke="var(--green)" stroke-width="2"/>
        ${labelEls}
      </svg>
    `;
  })();

  /* ---------- ACTIVITY HEATMAP (mock, GitHub-style) ---------- */
