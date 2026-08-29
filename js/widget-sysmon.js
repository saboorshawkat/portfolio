  (function systemMonitor(){
    const cpuVal = document.getElementById('sysCpuVal'), cpuBar = document.getElementById('sysCpuBar'), cpuSpark = document.getElementById('sysCpuSpark');
    if(!cpuVal) return;
    const ramVal = document.getElementById('sysRamVal'), ramBar = document.getElementById('sysRamBar'), ramSpark = document.getElementById('sysRamSpark');
    const netVal = document.getElementById('sysNetVal'), netBar = document.getElementById('sysNetBar'), netSpark = document.getElementById('sysNetSpark');

    function makeSpark(container){
      const bars = [];
      for(let i=0;i<24;i++){
        const d = document.createElement('div');
        d.style.height = '10%';
        container.appendChild(d);
        bars.push(d);
      }
      return bars;
    }
    const cpuBars = makeSpark(cpuSpark), ramBars = makeSpark(ramSpark), netBars = makeSpark(netSpark);

    let cpu = 30, ram = 45, net = 20;
    function walk(v, min, max, jitter){
      v += (Math.random()-0.5) * jitter;
      return Math.max(min, Math.min(max, v));
    }
    function pushSpark(bars, val){
      bars.shift().remove();
      const d = document.createElement('div');
      d.style.height = Math.max(4, val) + '%';
      bars.push(d);
    }
    function render(){
      cpu = walk(cpu, 5, 95, 14);
      ram = walk(ram, 20, 90, 8);
      net = walk(net, 2, 100, 20);
      cpuVal.textContent = Math.round(cpu) + '%';
      ramVal.textContent = Math.round(ram) + '%';
      netVal.textContent = Math.round(net*4.2) + ' KB/s';
      cpuBar.style.width = cpu + '%';
      ramBar.style.width = ram + '%';
      netBar.style.width = net + '%';
      [ [cpuSpark, cpu], [ramSpark, ram], [netSpark, net] ].forEach(([container, val]) => {
        const kids = container.children;
        for(let i=0;i<kids.length-1;i++){ kids[i].style.height = kids[i+1].style.height; }
        kids[kids.length-1].style.height = Math.max(4, val) + '%';
      });
    }
    render();
    setInterval(render, 1200);
  })();

  /* ---------- WEBAUDIO: typing clicks + ambient drone + visualizer ---------- */
