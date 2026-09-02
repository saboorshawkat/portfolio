  // ================= COMMAND PALETTE =================
  const cmdkOverlay = document.getElementById('cmdkOverlay');
  const cmdkInput = document.getElementById('cmdkInput');
  const cmdkResults = document.getElementById('cmdkResults');
  const cmdkCommands = [
    { label: 'Go to About', key: 'g a', action: () => scrollToSection('#about') },
    { label: 'Go to Methodology', key: 'g m', action: () => scrollToSection('#methodology') },
    { label: 'Go to Experience', key: 'g w', action: () => scrollToSection('#work') },
    { label: 'Go to Subnet Calculator', key: 'g n', action: () => scrollToSection('#subnet-calc') },
    { label: 'Go to Education', key: '', action: () => scrollToSection('#education') },
    { label: 'Go to Skills', key: 'g s', action: () => scrollToSection('#skills') },
    { label: 'Go to Tools', key: 'g t', action: () => scrollToSection('#tools') },
    { label: 'Go to Projects', key: 'g p', action: () => scrollToSection('#projects') },
    { label: 'Go to CTF Log', key: 'g f', action: () => scrollToSection('#ctfs') },
    { label: 'Go to Contact', key: 'g c', action: () => scrollToSection('#contact') },
    { label: 'Go to Recon Panel', key: '', action: () => scrollToSection('#recon') },
    { label: 'Go to AI Assistant', key: '', action: () => scrollToSection('#ai-assistant') },
    { label: 'Go to Games', key: '', action: () => scrollToSection('#games') },
    { label: 'Toggle matrix intensity', key: '', action: () => runCommand('matrix') },
    { label: 'Copy email address', key: '', action: () => document.querySelector('.copy-btn')?.click() },
    { label: 'Show flag progress', key: '', action: () => tbFlagsBtn.click() },
  ];
  let cmdkActiveIndex = 0;
  function scrollToSection(sel){
    document.querySelector(sel)?.scrollIntoView({ behavior:'smooth', block:'start' });
  }
  function renderCmdk(query){
    const q = query.trim().toLowerCase();
    const matches = cmdkCommands.filter(c => c.label.toLowerCase().includes(q));
    cmdkResults.innerHTML = '';
    if(matches.length === 0){
      cmdkResults.innerHTML = '<div class="cmdk-empty">no matching commands</div>';
      return;
    }
    cmdkActiveIndex = 0;
    matches.forEach((cmd, i) => {
      const item = document.createElement('div');
      item.className = 'cmdk-item' + (i === 0 ? ' active' : '');
      item.innerHTML = `<span>${cmd.label}</span><span class="cmdk-key">${cmd.key}</span>`;
      item.addEventListener('click', () => { cmd.action(); closeCmdk(); });
      item.addEventListener('mouseenter', () => setCmdkActive(i));
      cmdkResults.appendChild(item);
    });
    cmdkResults._matches = matches;
  }
  function setCmdkActive(i){
    const items = cmdkResults.querySelectorAll('.cmdk-item');
    items.forEach(el => el.classList.remove('active'));
    if(items[i]){ items[i].classList.add('active'); cmdkActiveIndex = i; }
  }
  function openCmdk(){
    cmdkOverlay.classList.add('open');
    cmdkInput.value = '';
    renderCmdk('');
    setTimeout(() => cmdkInput.focus(), 30);
  }
  function closeCmdk(){
    cmdkOverlay.classList.remove('open');
  }
  document.getElementById('tbCmdk').addEventListener('click', openCmdk);
  cmdkOverlay.addEventListener('click', (e) => { if(e.target === cmdkOverlay) closeCmdk(); });
  cmdkInput.addEventListener('input', () => renderCmdk(cmdkInput.value));
  cmdkInput.addEventListener('keydown', (e) => {
    const items = cmdkResults.querySelectorAll('.cmdk-item');
    if(e.key === 'ArrowDown'){ e.preventDefault(); setCmdkActive(Math.min(cmdkActiveIndex+1, items.length-1)); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); setCmdkActive(Math.max(cmdkActiveIndex-1, 0)); }
    else if(e.key === 'Enter'){
      const matches = cmdkResults._matches;
      if(matches && matches[cmdkActiveIndex]){ matches[cmdkActiveIndex].action(); closeCmdk(); }
    } else if(e.key === 'Escape'){ closeCmdk(); }
  });

  // global keyboard shortcuts: Ctrl/Cmd+K opens palette, "g" then letter navigates
  let gPrefixActive = false;
  let gPrefixTimer = null;
  window.addEventListener('keydown', (e) => {
    const tag = (e.target.tagName || '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea';

    if((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'){
      e.preventDefault();
      if(cmdkOverlay.classList.contains('open')) closeCmdk(); else openCmdk();
      return;
    }
    if(cmdkOverlay.classList.contains('open')) return;
    if(typing) return;

    if(gPrefixActive){
      const map = { a:'#about', m:'#methodology', w:'#work', n:'#subnet-calc', s:'#skills', t:'#tools', p:'#projects', f:'#ctfs', c:'#contact' };
      if(map[e.key]) scrollToSection(map[e.key]);
      gPrefixActive = false;
      clearTimeout(gPrefixTimer);
      return;
    }
    if(e.key === 'g'){
      gPrefixActive = true;
      gPrefixTimer = setTimeout(() => { gPrefixActive = false; }, 900);
    }
  });
