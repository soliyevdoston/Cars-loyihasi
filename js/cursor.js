const cursorImg = document.getElementById("cursor");
if (cursorImg) {
  document.body.classList.add("use-custom-cursor");

  // Asosiy stillarni o'rnatish
  cursorImg.style.position = "fixed";
  cursorImg.style.pointerEvents = "none";
  cursorImg.style.zIndex = "9999";

  // Sichqoncha harakatini kuzatish
  function updateCursor(e) {
    requestAnimationFrame(() => {
      cursorImg.style.left = e.clientX + "px";
      cursorImg.style.top = e.clientY + "px";
    });
  }

  // Sichqoncha harakatini kuzatish
  window.addEventListener("mousemove", updateCursor);

  // Touch qurilmalarda yashirish
  window.addEventListener("touchstart", () => {
    cursorImg.style.display = "none";
    document.body.classList.remove("use-custom-cursor");
  });
}
