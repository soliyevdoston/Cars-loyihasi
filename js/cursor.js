const cursorImg = document.getElementById('cursor');
if (cursorImg) {
  document.body.classList.add('use-custom-cursor');

  // Move immediately on mousemove
  window.addEventListener('mousemove', (e) => {
    cursorImg.style.left = e.clientX + 'px';
    cursorImg.style.top = e.clientY + 'px';
  });

  // Support touch devices: hide custom cursor
  window.addEventListener('touchstart', () => {
    cursorImg.style.display = 'none';
    document.body.classList.remove('use-custom-cursor');
  });
}
