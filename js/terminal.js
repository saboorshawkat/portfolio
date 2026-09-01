// ---- Interactive terminal ----
  // Only index.html has the hero boot-terminal (#termOutput/#termInput).
  // This whole block used to run unguarded, so on every other page
  // termInput was null and the very next line threw — which silently
  // killed the rest of this script, including the tool-tab switching
  // logic further down. That's why only the default "hash" tab worked
  // on tools.html: the click listeners for the other tabs never attached.
  const termOutput = document.getElementById('termOutput');
  const termInput = document.getElementById('termInput');
  if(termOutput && termInput){
  const termCommands = {
    help: `available commands:
  about      — who is saboor
  skills     — core skill set
  projects   — list of shipped work
  contact    — get in touch
  whoami     — current session identity
  ctf        — recent capture-the-flag log
  sudo       — try it and see
  clear      — clear this terminal
  matrix     — toggle background intensity
  flags      — check flag-hunt progress
  submit X   — redeem a flag, e.g. submit FLAG{...}`,
    about: 'CS undergraduate focused on red teaming & penetration testing. Founder of School of Sec.',
    skills: 'nmap · python · bash · burp-suite · metasploit · kali-linux · active-directory · owasp-top-10',
    projects: 'school-of-sec, ctf-writeups, recon-automation, kali-field-notes — scroll to the projects section for details.',
    contact: 'reach me at hello@schoolofsec.com or via the dock below.',
    whoami: 'guest@schoolofsec — read-only session, be nice.',
    ctf: 'HTB Starting Point ✓  |  THM Offensive Path ✓  |  University CTF — top 10',
  };
  function printLine(text, cls){
    const line = document.createElement('div');
    line.className = 'term-line' + (cls ? ' ' + cls : '');
    line.textContent = text;
    termOutput.appendChild(line);
    termOutput.scrollTop = termOutput.scrollHeight;
  }
  function runCommand(raw){
    const cmd = raw.trim().toLowerCase();
    printLine(raw, 'term-cmd');
    if(cmd === '') return;
    if(cmd === 'clear'){ termOutput.innerHTML=''; return; }
    if(cmd === 'sudo' || cmd.startsWith('sudo ')){
      printLine('Permission denied: guest is not in the sudoers file. This incident will be reported. (not really)', 'term-accent');
      return;
    }
    if(cmd === 'matrix'){
      const canvas = document.getElementById('matrix');
      canvas.style.opacity = canvas.style.opacity === '0.4' ? '0.14' : '0.4';
      printLine('matrix background intensity toggled.', 'term-accent');
      return;
    }
    if(cmd === 'flags'){
      printLine(`${foundFlags.size}/4 flags found. Flags are hidden in: the page source, the browser console, somewhere invisible on the page, and one unlocks itself. Use "submit FLAG{...}" to redeem one.`, 'term-accent');
      return;
    }
    if(cmd.startsWith('submit ')){
      const candidate = raw.trim().slice(7).trim();
      if(FLAGS.includes(candidate)){
        if(foundFlags.has(candidate)) printLine('already redeemed that one.', 'term-muted');
        else { markFlagFound(candidate); printLine(`correct — ${foundFlags.size}/4 flags redeemed.`, 'term-accent'); }
      } else {
        printLine('not a valid flag.', 'term-muted');
      }
      return;
    }
    if(termCommands[cmd]){ printLine(termCommands[cmd]); return; }
    printLine(`command not found: ${cmd} — type 'help' for a list of commands.`, 'term-muted');
  }
  termInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && termInput.value.trim() !== ''){
      runCommand(termInput.value);
      termInput.value = '';
    }
  });
  } // end if(termOutput && termInput)

  // ================= TOOLS =================
  // -- tab switching -- (runs on every page regardless of the hero terminal above)
  document.querySelectorAll('.tool-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tool-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tool-' + tab.getAttribute('data-tool')).classList.add('active');
    });
  });
