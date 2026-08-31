  // ================= GUESTBOOK (session-only) =================
  const gbEntries = [];
  const gbList = document.getElementById('gbList');
  document.getElementById('gbSubmit').addEventListener('click', () => {
    const name = document.getElementById('gbName').value.trim() || 'anon';
    const msg = document.getElementById('gbMsg').value.trim();
    if(!msg) return;
    gbEntries.unshift({ name, msg, time: new Date().toTimeString().slice(0,5) });
    document.getElementById('gbName').value = '';
    document.getElementById('gbMsg').value = '';
    renderGuestbook();
  });
  function renderGuestbook(){
    gbList.innerHTML = gbEntries.map(e => `
      <div class="proj-card" style="padding:12px 16px;">
        <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-faint);margin-bottom:4px;">
          <span style="color:var(--green);">${e.name}</span><span>${e.time}</span>
        </div>
        <div style="font-size:13px;color:var(--text-dim);">${e.msg}</div>
      </div>`).join('');
  }
