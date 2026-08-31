  (function timeGreeting(){
    const el = document.getElementById('termOutput');
    if(!el) return;
    const hour = new Date().getHours();
    let greeting;
    if(hour < 5) greeting = 'still up? respect — most exploits get found this late.';
    else if(hour < 12) greeting = 'good morning — nice time to review yesterday\'s findings.';
    else if(hour < 17) greeting = 'good afternoon — mid-engagement hours, stay caffeinated.';
    else if(hour < 22) greeting = 'good evening — prime time for CTF practice.';
    else greeting = 'burning the midnight oil, huh.';
    const div = document.createElement('div');
    div.className = 'term-line term-muted';
    div.textContent = greeting;
    el.appendChild(div);
  })();
