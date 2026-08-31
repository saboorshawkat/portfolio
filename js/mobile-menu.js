  // Mobile off-canvas menu — takes over from the dock below 760px
  (function(){
    const fab = document.getElementById('menuFab');
    const overlay = document.getElementById('mmOverlay');
    const panel = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('mmClose');
    if(!fab || !overlay || !panel) return;

    const items = panel.querySelectorAll('.mm-item');

    function openMenu(){
      fab.classList.add('open'); fab.setAttribute('aria-expanded', 'true');
      overlay.classList.add('show');
      panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu(){
      fab.classList.remove('open'); fab.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('show');
      panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    function toggleMenu(){ panel.classList.contains('open') ? closeMenu() : openMenu(); }

    fab.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    closeBtn?.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeMenu(); });

    items.forEach(item => {
      item.addEventListener('click', () => {
        const href = item.getAttribute('data-href');
        closeMenu();
        if(!href) return;
        if(href.startsWith('#')){
          // let the sheet finish sliding away before scrolling, so the
          // motion doesn't fight the scroll-into-view animation
          setTimeout(() => document.querySelector(href)?.scrollIntoView({behavior:'smooth', block:'start'}), 220);
        } else if(href.startsWith('mailto')){
          window.location.href = href;
        } else if(href.startsWith('http')){
          window.open(href, '_blank');
        } else {
          window.location.href = href; // relative link to another page
        }
      });
    });

    // if the viewport grows past the breakpoint while open, close it —
    // the dock takes back over and the sheet shouldn't linger
    window.addEventListener('resize', () => { if(window.innerWidth > 760) closeMenu(); });
  })();
