import { checkAuth } from "./check-auth.js";
import { changeLocaleData } from "./local-data.js";
import { getAll } from "./request.js";
import { ui } from "./ui.js";

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

const elContainer = document.getElementById("container");
const elOfflinePage = document.getElementById("offlinePage");
const elFilterTypeSelect = document.getElementById("filterTypeSelect");
const elFilterValueSelect = document.getElementById("filterValueSelect");
const elSearchInput = document.getElementById("searchInput");

let backendData = null;
let worker = new Worker("./worker.js");
let filterKey = null;
let filterValue = null;

window.addEventListener("DOMContentLoaded", () => {
  if (window.navigator.onLine === false) {
    elOfflinePage.classList.remove("hidden");
  } else {
    elOfflinePage.classList.add("hidden");
  }

  getAll()
    .then((res) => {
      backendData = res;
      changeLocaleData(backendData.data);
    })
    .catch((error) => {
      alert(error.message);
    });
});

elFilterTypeSelect.addEventListener("change", (evt) => {
  const value = evt.target[evt.target.selectedIndex].value;
  filterKey = value;
  worker.postMessage({
    functionName: "fiterByType",
    params: [backendData.data, value],
  });
});

elFilterValueSelect.addEventListener("change", (evt) => {
  const value = evt.target[evt.target.selectedIndex].value;
  filterValue = value;
  const elContainer = document.getElementById("container");
  elContainer.innerHTML = null;

  if (filterValue && filterKey) {
    getAll(`?${filterKey}=${filterValue}`)
      .then((res) => {
        ui(res.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

elSearchInput.addEventListener("input", (evt) => {
  const key = evt.target.value;
  worker.postMessage({
    functionName: "search",
    params: [backendData.data, key],
  });
});

worker.addEventListener("message", (evt) => {
  // Select
  const response = evt.data;
  if (response.target === "fiterByType") {
    elFilterValueSelect.classList.remove("hidden");
    elFilterValueSelect.innerHTML = "";
    const option = document.createElement("option");
    option.selected = true;
    option.disabled = true;
    option.textContent = "All";
    elFilterValueSelect.appendChild(option);
    result.forEach((el) => {
      const option = document.createElement("option");
      option.value = el;
      option.textContent = el;
      elFilterValueSelect.appendChild(option);
    });
  } else if (response.target === "search") {
    const elContainer = document.getElementById("container");

    elContainer.innerHTML = "";
    if (response.result.length > 0) {
      ui(response.result);
    } else {
      alert("No data");
    }
  }
});

window.addEventListener("online", () => {
  elOfflinePage.classList.add("hidden");
});
window.addEventListener("offline", () => {
  elOfflinePage.classList.remove("hidden");
});

// crud

elContainer.addEventListener("click", (evt) => {
  const target = evt.target;
  // Edit
  if (target.classList.contains("js-edit")) {
    if (checkAuth()) {
    } else {
      alert("Ro'yhatdan o'tishingiz kerak");
    }
  }

  // Get

  if (target.classList.contains("js-info")) {
  }

  // Delete
  if (target.classList.contains("js-delete")) {
    if (checkAuth() && confirm("Rostdan o'chirmoqchimisiz")) {
    } else {
      alert("Ro'yhatdan o'tishingiz kerak");
    }
  }
});
