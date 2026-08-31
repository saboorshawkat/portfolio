  // ---- Copy to clipboard ----
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(val).then(() => {
        showToast('copied to clipboard: ' + val);
      }).catch(() => showToast('could not copy — select manually'));
    });
  });
