  (function networkTools(){
    const resultEl = document.getElementById('netResult');
    const ipBtn = document.getElementById('ipLookupBtn');
    const pingBtn = document.getElementById('pingSimBtn');
    const traceBtn = document.getElementById('tracerouteSimBtn');
    if(!resultEl) return;

    ipBtn.addEventListener('click', async () => {
      resultEl.innerHTML = '<div class="kv-row"><span class="kv-key">looking up...</span></div>';
      try{
        const res = await fetch('https://ipapi.co/json/');
        if(!res.ok) throw new Error('bad response');
        const data = await res.json();
        resultEl.innerHTML = `
          <div class="kv-row"><span class="kv-key">ip</span><span class="kv-val">${data.ip || '—'}</span></div>
          <div class="kv-row"><span class="kv-key">city</span><span class="kv-val">${data.city || '—'}</span></div>
          <div class="kv-row"><span class="kv-key">region</span><span class="kv-val">${data.region || '—'}</span></div>
          <div class="kv-row"><span class="kv-key">country</span><span class="kv-val">${data.country_name || '—'}</span></div>
          <div class="kv-row"><span class="kv-key">isp</span><span class="kv-val">${data.org || '—'}</span></div>
          <div class="kv-row"><span class="kv-key">timezone</span><span class="kv-val">${data.timezone || '—'}</span></div>
        `;
      }catch(e){
        resultEl.innerHTML = `
          <div class="kv-row"><span class="kv-key">status</span><span class="kv-val">offline / lookup blocked</span></div>
          <div class="kv-row"><span class="kv-key">note</span><span class="kv-val">no live network from this sandbox — try this page from a normal browser tab</span></div>
        `;
      }
    });

    function randHop(){
      const oct = () => Math.floor(Math.random()*254)+1;
      return `${oct()}.${oct()}.${oct()}.${oct()}`;
    }
    pingBtn.addEventListener('click', () => {
      resultEl.innerHTML = '<div class="hex-grid" id="pingOut"></div>';
      const el = document.getElementById('pingOut');
      const target = randHop();
      let lines = [`PING ${target}: 56 data bytes`];
      el.textContent = lines.join('\n');
      let i = 0;
      const iv = setInterval(() => {
        i++;
        const t = (10 + Math.random()*40).toFixed(2);
        lines.push(`64 bytes from ${target}: icmp_seq=${i} ttl=57 time=${t} ms`);
        el.textContent = lines.join('\n');
        if(i >= 5){
          clearInterval(iv);
          lines.push('', `--- ${target} ping statistics ---`, '5 packets transmitted, 5 received, 0% packet loss (simulated)');
          el.textContent = lines.join('\n');
        }
      }, 350);
    });

    traceBtn.addEventListener('click', () => {
      resultEl.innerHTML = '<div class="hex-grid" id="traceOut"></div>';
      const el = document.getElementById('traceOut');
      let lines = ['traceroute to target (simulated), 12 hops max'];
      el.textContent = lines.join('\n');
      let i = 0;
      const iv = setInterval(() => {
        i++;
        const t = (5 + i*8 + Math.random()*15).toFixed(2);
        lines.push(`${i}  ${randHop()}  ${t} ms`);
        el.textContent = lines.join('\n');
        if(i >= 8){ clearInterval(iv); lines.push('', 'trace complete (simulated — not a real route)'); el.textContent = lines.join('\n'); }
      }, 300);
    });
  })();

  /* ---------- SKILLS RADAR CHART ---------- */
