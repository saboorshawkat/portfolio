  (function hackerTyper(){
    const toggle = document.getElementById('hackerTyperToggle');
    const overlay = document.getElementById('hackerTyperOverlay');
    const content = document.getElementById('htContent');
    if(!toggle || !overlay) return;
    const snippets = [
      "def exploit(target):\n    payload = craft_payload(target.os, target.arch)\n    sock = socket.socket(AF_INET, SOCK_STREAM)\n    sock.connect((target.ip, target.port))\n    sock.send(payload)\n    return sock.recv(4096)\n",
      "for host in subnet.hosts():\n    if is_alive(host):\n        ports = scan_common_ports(host)\n        log.info(f'{host} -> {ports}')\n",
      "class TokenBucket:\n    def __init__(self, rate, capacity):\n        self.rate = rate\n        self.tokens = capacity\n        self.capacity = capacity\n",
      "iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set\niptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 60 --hitcount 4 -j DROP\n",
      "SELECT username, last_login FROM users WHERE failed_attempts > 5 ORDER BY last_login DESC;\n",
      "ssh-keygen -t ed25519 -C 'deploy@prod'\nchmod 600 ~/.ssh/id_ed25519\nscp -i ~/.ssh/id_ed25519 build.tar.gz deploy@prod:/srv/releases/\n"
    ];
    let buffer = '';
    let active = false;
    function openOverlay(){
      active = true;
      overlay.classList.add('active');
      buffer = '';
      content.textContent = '';
    }
    function closeOverlay(){
      active = false;
      overlay.classList.remove('active');
    }
    toggle.addEventListener('click', () => { active ? closeOverlay() : openOverlay(); });
    document.addEventListener('keydown', (e) => {
      if(!active) return;
      if(e.key === 'Escape'){ closeOverlay(); return; }
      if(e.key.length === 1 || e.key === 'Enter'){
        const snip = snippets[Math.floor(Math.random()*snippets.length)];
        const take = snip.slice(0, 2 + Math.floor(Math.random()*4));
        buffer += take;
        if(buffer.length > 6000) buffer = buffer.slice(-4000);
        content.textContent = buffer;
        window.scrollTo(0,0);
      }
      e.preventDefault();
    });
  })();

  /* ---------- AI ASSISTANT (scripted) ---------- */
