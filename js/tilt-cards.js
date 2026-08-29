  (function tiltCards(){
    const selector = '.proj-card, .contact-card, .ctf-item';
    document.querySelectorAll(selector).forEach(card => {
      card.classList.add('tilt-card');
      if(getComputedStyle(card).position === 'static'){ card.style.position = 'relative'; }
      const shine = document.createElement('div');
      shine.className = 'tilt-shine';
      card.appendChild(shine);
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rotY = (px - 0.5) * 10;
        const rotX = (0.5 - py) * 10;
        card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
        shine.style.setProperty('--mx', (px*100) + '%');
        shine.style.setProperty('--my', (py*100) + '%');
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  })();

  /* ---------- PARTICLE SYSTEM (mouse-reactive) ---------- */
