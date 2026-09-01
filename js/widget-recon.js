  (function passiveRecon(){
    const grid = document.getElementById('reconGrid');
    if(!grid) return;

    function card(label, val){
      return `<div class="recon-card"><div class="recon-label">${label}</div><div class="recon-val">${val}</div></div>`;
    }

    let referrer = 'direct / none';
    if(document.referrer){
      try { referrer = new URL(document.referrer).hostname || document.referrer; }
      catch(e){ referrer = document.referrer; }
    }

    const facts = [
      ['platform', navigator.platform || 'unknown'],
      ['language', navigator.language || 'unknown'],
      ['timezone', (Intl.DateTimeFormat().resolvedOptions().timeZone) || 'unknown'],
      ['screen', `${screen.width}\u00d7${screen.height}`],
      ['viewport', `${window.innerWidth}\u00d7${window.innerHeight}`],
      ['cpu cores', navigator.hardwareConcurrency || 'n/a'],
      ['device memory', navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'n/a'],
      ['connection', (navigator.connection && navigator.connection.effectiveType) || 'n/a'],
      ['cookies', navigator.cookieEnabled ? 'enabled' : 'disabled'],
      ['color scheme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'],
      ['referrer', referrer],
      ['local time', new Date().toLocaleTimeString()],
    ];

    grid.innerHTML = facts.map(([label, val]) => card(label, val)).join('');
  })();
