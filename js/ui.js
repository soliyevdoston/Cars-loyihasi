export function ui(data) {
  const elContainer = document.getElementById("container");
  elContainer.innerHTML = "";
  data.forEach((el) => {
    const clone = document
      .getElementById("cardTemplate")
      .cloneNode(true).content;

    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");

    let infoList = clone.querySelector(".card-info");
    if (!infoList) {
      infoList = document.createElement("div");
      infoList.className = "mt-2 space-y-1 card-info";
    }
    const elInfoBtn = clone.querySelector(".js-info");
    const elEditBtn = clone.querySelector(".js-edit");
    const elDeleteBtn = clone.querySelector(".js-delete");

    elDeleteBtn.id = el.id;
    elEditBtn.id = el.id;
    elInfoBtn.href = `/pages/details.html?id=${el.id}`;

    elTitle.innerHTML = el.name ?? "Ma'lumot mavjud emas";
    elDescription.innerHTML = el.description ?? "Ma'lumot mavjud emas";

    const infoHTML = `
      <div class="mt-2 space-y-1 card-info">
        <div class="text-sm text-muted">📆: <span class="font-medium">${
          el.year ?? "Ma'lumot mavjud emas!"
        }</span></div>
        <div class="text-sm text-muted">🖌️: <span class="font-medium">${
          el.colorName ?? "Ma'lumot mavjud emas!"
        }</span></div>
        <div class="text-sm text-muted"> 🚀(max): <span class="font-medium">${
          el.maxSpeed ?? "Ma'lumot mavjud emas!"
        }</span></div>
        <div class="text-sm text-muted">🐎 (hp): <span class="font-medium">${
          el.horsepower ?? "Ma'lumot mavjud emas!"
        }</span></div>
        <div class="text-sm text-muted">🛣️: <span class="font-medium">${
          el.category ?? "Ma'lumot mavjud emas!"
        }</span></div>
      </div>
    `;

    if (elDescription) {
      elDescription.insertAdjacentHTML("afterend", infoHTML);
    } else if (clone.querySelector(".card-body")) {
      clone
        .querySelector(".card-body")
        .insertAdjacentHTML("beforeend", infoHTML);
    }

    elContainer.appendChild(clone);
  });
}

export function pagination(total, limit, skip) {
  const elPagination = document.getElementById("pagination");
  elPagination.innerHTML = "";
  const remained = total % limit;
  const pageCount = (total - remained) / limit;
  let activePage = skip / limit + 1;

  for (let i = 1; i <= pageCount + (remained > 0 ? 1 : 0); i++) {
    const button = document.createElement("button");
    button.classList.add(
      "join-item",
      "btn",
      "js-page",
      activePage === i ? "btn-active" : null
    );

    button.innerText = i;
    button.dataset.skip = limit * i - limit;

    elPagination.appendChild(button);
  }
}
