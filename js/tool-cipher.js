  // -- caesar cipher tool --
  const cipherInput = document.getElementById('cipherInput');
  const cipherShift = document.getElementById('cipherShift');
  const cipherShiftVal = document.getElementById('cipherShiftVal');
  const cipherOut = document.getElementById('cipherOut');
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
