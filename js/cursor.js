document.addEventListener("DOMContentLoaded", () => {
  const cursorImg = document.getElementById("cursor");
  if (!cursorImg) return;

  document.body.classList.add("use-custom-cursor");

  cursorImg.style.display = "block";

  cursorImg.style.position = "fixed";
  cursorImg.style.pointerEvents = "none";

  cursorImg.style.zIndex = "999";

  function getEventCoords(e) {
    if (e.touches && e.touches.length) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function updateCursor(e) {
    const { x, y } = getEventCoords(e);
    if (typeof x !== "number" || typeof y !== "number") return;
    requestAnimationFrame(() => {
      cursorImg.style.left = x + "px";
      cursorImg.style.top = y + "px";
    });
  }

  window.addEventListener("mousemove", updateCursor);

  window.addEventListener("touchmove", updateCursor, { passive: true });

  function handleFirstTouch() {
    cursorImg.style.display = "none";
    document.body.classList.remove("use-custom-cursor");
    window.removeEventListener("touchstart", handleFirstTouch);
  }

  window.addEventListener("touchstart", handleFirstTouch, { passive: true });
});
