export function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast-enter relative bg-base-100 text-base-content shadow-lg rounded-lg p-4 pr-10 min-w-[300px] flex items-start`;

  // Add border color and background based on type
  switch (type) {
    case "error":
      toast.classList.add(
        "border-l-4",
        "border-error",
        "bg-error/10",
        "text-error-content"
      );
      break;
    case "success":
      toast.classList.add(
        "border-l-4",
        "border-success",
        "bg-success/10",
        "text-success-content"
      );
      break;
    case "info":
      toast.classList.add(
        "border-l-4",
        "border-info",
        "bg-info/10",
        "text-info-content"
      );
      break;
  }

  // Add message
  const messageEl = document.createElement("div");
  messageEl.className = "flex-1";
  messageEl.textContent = message;
  toast.appendChild(messageEl);

  // Add close button
  const closeBtn = document.createElement("button");
  closeBtn.className =
    "absolute top-2 right-2 text-base-content/60 hover:text-base-content";
  closeBtn.innerHTML = "✕";
  closeBtn.onclick = (e) => {
    e.stopPropagation();
    removeToast(toast);
  };
  toast.appendChild(closeBtn);

  // Add progress bar
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  toast.appendChild(progressBar);

  // Add to container
  toastContainer.appendChild(toast);

  // Start progress bar animation
  requestAnimationFrame(() => {
    progressBar.style.width = "100%";
    setTimeout(() => {
      progressBar.style.width = "0%";
    }, 100);
  });

  // Auto dismiss after 3s if not closed manually
  const timeoutId = setTimeout(() => {
    if (toast.parentNode) {
      removeToast(toast);
    }
  }, 3000);

  // Store timeout ID
  toast.dataset.timeoutId = timeoutId;

  return toast;
}

function removeToast(toast) {
  // Clear the timeout
  clearTimeout(Number(toast.dataset.timeoutId));

  // Add exit animation
  toast.classList.add("toast-exit");
  toast.addEventListener("animationend", () => {
    toast.remove();
  });
}
