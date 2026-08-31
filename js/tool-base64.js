  (function base64Tool(){
    const input = document.getElementById('b64Input');
    const out = document.getElementById('b64Out');
    const encBtn = document.getElementById('b64EncodeBtn');
    const decBtn = document.getElementById('b64DecodeBtn');
    if(!input || !out) return;
    encBtn.addEventListener('click', () => {
      try{ out.textContent = btoa(unescape(encodeURIComponent(input.value))); }
      catch(e){ out.textContent = 'encode error'; }
    });
    decBtn.addEventListener('click', () => {
      try{ out.textContent = decodeURIComponent(escape(atob(input.value.trim()))); }
      catch(e){ out.textContent = 'invalid base64'; }
    });
  })();

  /* ---------- HEX VIEWER ---------- */
