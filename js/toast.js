export function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");

  const toast = document.createElement("div");
  toast.className = `toast-enter relative bg-base-100 text-base-content shadow-lg rounded-lg p-4 pr-10 min-w-[300px] flex items-start`;

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

  const messageEl = document.createElement("div");
  messageEl.className = "flex-1";
  messageEl.textContent = message;
  toast.appendChild(messageEl);

  const closeBtn = document.createElement("button");
  closeBtn.className =
    "absolute top-2 right-2 text-base-content/60 hover:text-base-content";
  closeBtn.innerHTML = "✕";
  closeBtn.onclick = (e) => {
    e.stopPropagation();
    removeToast(toast);
  };
  toast.appendChild(closeBtn);

  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  toast.appendChild(progressBar);

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    progressBar.style.width = "100%";
    setTimeout(() => {
      progressBar.style.width = "0%";
    }, 100);
  });

  const timeoutId = setTimeout(() => {
    if (toast.parentNode) {
      removeToast(toast);
    }
  }, 3000);

  toast.dataset.timeoutId = timeoutId;

  return toast;
}

function removeToast(toast) {
  clearTimeout(Number(toast.dataset.timeoutId));

  toast.classList.add("toast-exit");
  toast.addEventListener("animationend", () => {
    toast.remove();
  });
}
