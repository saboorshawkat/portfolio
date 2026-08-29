  (function aiAssistant(){
    const input = document.getElementById('aiInput');
    const log = document.getElementById('aiChatLog');
    if(!input || !log) return;

    const fakeFS = {
      '~': ['about.md', 'projects/', 'ctfs/', 'contact.txt', 'secrets/'],
      '~/projects': ['ctf-writeups/', 'recon-automation/', 'kali-field-notes/'],
      '~/ctfs': ['htb-starting-point.md', 'thm-offensive-path.md', 'university-ctf-2024.md'],
      '~/secrets': ['dont-look.txt']
    };
    let cwd = '~';

    function addMsg(text, who){
      const div = document.createElement('div');
      div.className = 'ai-msg ' + who;
      div.textContent = text;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
    }

    function respond(raw){
      const msg = raw.trim();
      const lower = msg.toLowerCase();

      if(lower === 'ls'){
        const listing = fakeFS[cwd] || [];
        return listing.length ? listing.join('   ') : '(empty)';
      }
      if(lower.startsWith('cd ')){
        const target = msg.slice(3).trim().replace(/\/$/, '');
        const full = target.startsWith('~') ? target : (cwd + '/' + target);
        if(fakeFS[full]){ cwd = full; return 'moved to ' + cwd; }
        if(full === '~/secrets/dont-look' || target === 'secrets/dont-look.txt'){ return 'nice try — nothing here but a strongly worded comment.'; }
        return 'no such directory: ' + target;
      }
      if(lower === 'pwd'){ return cwd; }
      if(lower.includes('skill')) return "core stack: nmap, python, bash, networking, linux. offensive-security side: active directory, OWASP top 10, priv-esc, web exploitation. tooling: burp suite, metasploit, kali, wireshark.";
      if(lower.includes('project')) return "three public projects right now: a CTF write-ups archive, a recon-automation toolkit, and a set of Kali field notes. scroll up to the projects section for links.";
      if(lower.includes('ctf') || lower.includes('flag')) return "there are hidden flags scattered around this page — html comments, dev console, and a Konami code easter egg among them. happy hunting.";
      if(lower.includes('contact') || lower.includes('email') || lower.includes('reach')) return "check the contact section below — there are copyable cards for the main ways to reach out.";
      if(lower.includes('hello') || lower.includes('hi') || lower === 'help') return "hey. ask about skills / projects / ctfs / contact, or use ls and cd like a real shell.";
      if(lower.includes('are you real') || lower.includes('are you ai')) return "I'm a small pattern-matcher, not a real model — a handful of if/else statements pretending to be an assistant.";
      return "not sure about that one — try asking about skills, projects, ctfs, or contact. or type ls.";
    }

    input.addEventListener('keydown', (e) => {
      if(e.key !== 'Enter' || !input.value.trim()) return;
      const val = input.value;
      addMsg(val, 'user');
      input.value = '';
      const reply = respond(val);
      setTimeout(() => addMsg(reply, 'bot'), 200 + Math.random()*300);
    });
  })();

  /* ---------- TYPING SPEED GAME ---------- */
