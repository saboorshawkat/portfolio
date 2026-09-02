  // -- caesar cipher tool --
  // guarded + wrapped like the other tool-*.js files — this script loads
  // on every page, but #cipherInput etc. only exist on tools.html, so an
  // unguarded reference here would throw and silently kill anything else
  // in this same file (see terminal.js for the version of this bug that
  // was actually breaking the tab switcher)
  (function cipherTool(){
  const cipherInput = document.getElementById('cipherInput');
  const cipherShift = document.getElementById('cipherShift');
  const cipherShiftVal = document.getElementById('cipherShiftVal');
  const cipherOut = document.getElementById('cipherOut');
  if(!cipherInput || !cipherShift || !cipherShiftVal || !cipherOut) return;
  function caesar(str, shift){
    return str.replace(/[a-zA-Z]/g, ch => {
      const base = ch <= 'Z' ? 65 : 97;
      return String.fromCharCode((ch.charCodeAt(0) - base + shift + 26) % 26 + base);
    });
  }
  function updateCipher(){
    cipherShiftVal.textContent = cipherShift.value;
    cipherOut.textContent = cipherInput.value ? caesar(cipherInput.value, parseInt(cipherShift.value,10)) : '—';
  }
  cipherInput.addEventListener('input', updateCipher);
  cipherShift.addEventListener('input', updateCipher);
  })();
