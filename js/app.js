import { getAll } from "./request.js";

// getAll()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error.message);
//   })
//   .finally(() => {
//     console.log("Ish tugadi!");
//   });

// const elTimer = document.getElementById("timer");
// const elBtn = document.getElementById("f");
// setInterval(() => {
//   const date = new Date();
//   const time = ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;
//   elTimer.innerHTML = time;
// }, 1000);

// const worker = new Worker("./worker.js");
// console.log(worker);

// elBtn.addEventListener("click", () => {
//   worker.postMessage("test");
// });

// Internet yo'qligida chiqivchi biror narsa

const elOfflinePage = document.getElementById("offlinePage");

let backendData = null;
let worker = new Worker("./worker.js");
window.addEventListener("DOMContentLoaded", () => {
  if (window.navigator.onLine === false) {
    elOfflinePage.classList.remove("hidden");
  } else {
    elOfflinePage.classList.add("hidden");
  }

  getAll()
    .then((res) => {
      backendData = res;
      worker.postMessage({
        functionName: "fiterByType",
        params: [backendData.data, "color"],
      });
    })
    .catch((error) => {
      alert(error.message);
    });
});

worker.addEventListener("message", (evt) => {
  const result = evt.data;
  console.log(result);
});

window.addEventListener("online", () => {
  elOfflinePage.classList.add("hidden");
});
window.addEventListener("offline", () => {
  elOfflinePage.classList.remove("hidden");
});
