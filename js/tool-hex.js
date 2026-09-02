  (function hexViewer(){
    const input = document.getElementById('hexInput');
    const out = document.getElementById('hexOut');
    if(!input || !out) return;
    function update(){
      const str = input.value;
      if(!str){ out.textContent = '—'; return; }
      const bytes = Array.from(new TextEncoder().encode(str));
      let lines = [];
      for(let i=0;i<bytes.length;i+=8){
        const chunk = bytes.slice(i,i+8);
        const hex = chunk.map(b => b.toString(16).padStart(2,'0')).join(' ').padEnd(23,' ');
        const ascii = chunk.map(b => (b>=32 && b<127) ? String.fromCharCode(b) : '.').join('');
        lines.push(i.toString(16).padStart(4,'0') + '  ' + hex + '  ' + ascii);
      }
      out.textContent = lines.join('\n');
    }
    input.addEventListener('input', update);
  })();

  /* ---------- NETWORK TOOLS (IP lookup + simulated ping/traceroute) ---------- */
