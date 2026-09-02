  (function jwtDecoder(){
    const input = document.getElementById('jwtInput');
    if(!input) return;
    function b64urlDecode(str){
      str = str.replace(/-/g,'+').replace(/_/g,'/');
      while(str.length % 4) str += '=';
      try{ return decodeURIComponent(atob(str).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2,'0')).join('')); }
      catch(e){ return null; }
    }
    function update(){
      const parts = input.value.trim().split('.');
      const hEl = document.getElementById('jwtHeader');
      const pEl = document.getElementById('jwtPayload');
      const sEl = document.getElementById('jwtSig');
      if(parts.length !== 3 || !parts[0]){
        hEl.textContent = '—'; pEl.textContent = '—'; sEl.textContent = '—';
        return;
      }
      const header = b64urlDecode(parts[0]);
      const payload = b64urlDecode(parts[1]);
      try{ hEl.textContent = JSON.stringify(JSON.parse(header), null, 2); }catch(e){ hEl.textContent = header || 'invalid'; }
      try{ pEl.textContent = JSON.stringify(JSON.parse(payload), null, 2); }catch(e){ pEl.textContent = payload || 'invalid'; }
      sEl.textContent = parts[2] || '—';
    }
    input.addEventListener('input', update);
  })();

  /* ---------- BASE64 TOOL ---------- */
