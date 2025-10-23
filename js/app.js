import { checkAuth } from "./check-auth.js";
import { deleteElementLocal, editElementLocal } from "./crud.js";
import { getFormData } from "./get-form-data.js";
import { changeLocaleData, localData } from "./local-data.js";
import { deleteElement, editElement, getAll } from "./request.js";
import { pagination, ui } from "./ui.js";
import { showToast } from "./toast.js";

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

// Channel for syn
const channel1 = new BroadcastChannel("channel_1");
channel1.onmessage = (evt) => {
  if (evt.data.action === "redirect") {
    window.location.href = evt.data.address;
  }
  if (evt.data.action === "DELETE") {
    deleteElementLocal(evt.data.address);
  }
  if (evt.data.action === "EDIT") {
    editElementLocal(evt.data.address);
  }
};

const limit = 12;
let skip = 0;

// Internet yo'qligida chiqivchi biror narsa
const elEditModal = document.getElementById("editModal");
const elEditedForm = document.getElementById("editForm");
const elContainer = document.getElementById("container");
const elOfflinePage = document.getElementById("offlinePage");
const elFilterTypeSelect = document.getElementById("filterTypeSelect");
const elFilterValueSelect = document.getElementById("filterValueSelect");
const elSearchInput = document.getElementById("searchInput");
const elPagination = document.getElementById("pagination");
const elCursor = document.getElementById("cursor");
const elAddButton = document.getElementById("addButton");
const elAddCarModal = document.getElementById("addCarModal");
const elAddCarForm = document.getElementById("addCarForm");

let backendData = null;
let worker = new Worker("./worker.js");
let filterKey = null;
let filterValue = null;
let editedElementId = null;

function warning() {
  const toast = showToast("Iltimos, ro'yxatdan o'ting!", "error");

  setTimeout(() => {
    window.location.href = "../pages/login.html";
    channel1.postMessage({
      action: "redirect",
      address: "../pages/login.html",
    });
  }, 1500);
}

// online offline
window.addEventListener("online", () => {
  elOfflinePage.classList.add("hidden");
});

window.addEventListener("offline", () => {
  elOfflinePage.classList.remove("hidden");
});

// web worker

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
    if (response.result && response.result.length > 0) {
      response.result.forEach((el) => {
        const option = document.createElement("option");
        option.value = el;
        option.textContent = el;
        elFilterValueSelect.appendChild(option);
      });
    }
  } else if (response.target === "search") {
    const elContainer = document.getElementById("container");
    elContainer.innerHTML = "";
    if (response.result && response.result.length > 0) {
      ui(response.result);
    } else {
      document.getElementById("noDataModal").showModal();
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (window.navigator.onLine === false) {
    elOfflinePage.classList.remove("hidden");
  } else {
    elOfflinePage.classList.add("hidden");
  }
  getAll()
    .then((res) => {
      backendData = res;
    })
    .catch((error) => {
      alert(error.message);
    });
  getAll(`?limit=${limit}&skip=${skip}`)
    .then((res) => {
      pagination(res.total, res.limit, res.skip);
      changeLocaleData(res.data);
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
        if (res.data && res.data.length > 0) {
          ui(res.data);
        } else {
          showToast("Ma'lumot topilmadi", "info");
        }
      })
      .catch((error) => {
        showToast("Ma'lumot topilmadi", "info");
      });
  }
});

elSearchInput.addEventListener("input", (evt) => {
  const key = evt.target.value.trim();
  if (key) {
    worker.postMessage({
      functionName: "search",
      params: [backendData.data, key],
    });
  } else {
    if (backendData && backendData.data) {
      ui(backendData.data);
    }
  }
});

// crud

elContainer.addEventListener("click", (evt) => {
  const target = evt.target;

  // Edit

  if (target.classList.contains("js-edit")) {
    if (checkAuth()) {
      editedElementId = target.id;
      elEditModal.showModal();
      const foundElement = localData.find((el) => el.id == target.id);
      elEditedForm.name.value = foundElement.name;
      elEditedForm.description.value = foundElement.description;
    } else {
      warning();
    }
  }

  // Get

  if (target.classList.contains("js-info")) {
  }

  // Delete

  if (target.classList.contains("js-delete")) {
    if (checkAuth()) {
      const toast = showToast("O'chirishni tasdiqlang", "info");

      const deleteTimeout = setTimeout(() => {
        deleteElement(target.id)
          .then((id) => {
            deleteElementLocal(id);
            channel1.postMessage({ action: "DELETE", address: id });
            showToast("Muvaffaqiyatli o'chirildi", "success");
          })
          .catch((error) => {
            showToast(error.message || "O'chirishda xatolik", "error");
          });
      }, 3000);

      toast.dataset.deleteTimeoutId = deleteTimeout;
    } else {
      warning();
    }
  }
});

elEditedForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const result = getFormData(elEditedForm);
  if (editedElementId) {
    result.id = editedElementId;
    editElement(result)
      .then((res) => {
        editElementLocal(res);
        channel1.postMessage({ action: "EDIT", address: res });
        showToast("Muvaffaqiyatli tahrirlandi", "success");
      })
      .catch((error) => {
        showToast(error.message || "Tahrirlashda xatolik", "error");
      })
      .finally(() => {
        editedElementId = null;
        elEditModal.close();
      });
  }
});

elPagination.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("js-page")) {
    skip = evt.target.dataset.skip;
    getAll(`?limit=${limit}&skip=${skip}`)
      .then((res) => {
        ui(res.data);
        pagination(res.total, res.limit, res.skip);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

elAddButton.addEventListener("click", () => {
  if (checkAuth()) {
    elAddCarModal.showModal();
  } else {
    warning();
  }
});

elAddCarForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const formData = getFormData(elAddCarForm);

  const payload = { ...formData };
  ["year", "doorCount", "seatCount", "horsepower", "id"].forEach((k) => {
    if (payload[k] !== undefined && payload[k] !== "") {
      const n = Number(payload[k]);
      if (!Number.isNaN(n)) payload[k] = n;
    }
  });

  try {
    const response = await fetch("https://auth-rg69.onrender.com/api/v1/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Qo'shishda xatolik yuz berdi");
    }

    const result = await response.json();

    const newData = [...backendData.data, result];
    changeLocaleData(newData);
    backendData.data = newData;

    ui(newData);

    showToast("Mashina muvaffaqiyatli qo'shildi", "success");

    elAddCarForm.reset();
    elAddCarModal.close();
  } catch (error) {
    showToast(error.message || "Qo'shishda xatolik", "error");
  }
});

const loader = document.getElementById("loader");

async function loadCars() {
  loader.style.display = "flex";

  try {
    const req = await fetch("https://json-api.uz/api/project/fn44/cars");
    const data = await req.json();
    renderCars(data);
  } catch (err) {
    console.error("Ma'lumotni olishda xatolik:", err);
  } finally {
    loader.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", loadCars);

const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});
