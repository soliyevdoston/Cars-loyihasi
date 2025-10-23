document.addEventListener("DOMContentLoaded", () => {
  const cursorImg = document.getElementById("cursor");
  if (!cursorImg) return;

  // mark that we use custom cursor
  document.body.classList.add("use-custom-cursor");

  // Ensure the image is visible (in case display was altered)
  cursorImg.style.display = "block";

  // Basic styles (inline to avoid depending on external CSS order)
  cursorImg.style.position = "fixed";
  cursorImg.style.pointerEvents = "none";
  // keep this in sync with your modal z-index (modals use 900)
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

  // Mouse move for desktop
  window.addEventListener("mousemove", updateCursor);
  // Also update on touchmove while keeping touchstart to hide on touch devices
  window.addEventListener("touchmove", updateCursor, { passive: true });

  // Hide on first touch (mobile) to avoid showing a useless cursor
  function handleFirstTouch() {
    cursorImg.style.display = "none";
    document.body.classList.remove("use-custom-cursor");
    window.removeEventListener("touchstart", handleFirstTouch);
  }

  window.addEventListener("touchstart", handleFirstTouch, { passive: true });
});
