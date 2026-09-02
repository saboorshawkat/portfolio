  // Dock nav + magnify
  const dock = document.getElementById('dock');
  const dockItems = document.querySelectorAll('.dock-item');
  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      const href = item.getAttribute('data-href');
      if(!href) return;
      if(href.startsWith('#')) document.querySelector(href)?.scrollIntoView({behavior:'smooth', block:'start'});
      else if(href.startsWith('mailto')) window.location.href = href;
      else if(href.startsWith('http')) window.open(href, '_blank');
      else window.location.href = href; // relative link to another page (e.g. tools.html#tools)
    });
  });
  dock.addEventListener('mousemove', (e) => {
    dockItems.forEach(item => {
      const ir = item.getBoundingClientRect();
      const center = ir.left + ir.width/2;
      const dist = Math.abs(e.clientX - center);
      const scale = Math.max(1, 1.3 - dist/130);
      item.style.transform = `scale(${scale}) translateY(${(scale-1)*-7}px)`;
    });
  });
  dock.addEventListener('mouseleave', () => dockItems.forEach(i => i.style.transform='scale(1)'));
