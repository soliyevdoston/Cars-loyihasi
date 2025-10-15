export function ui(data) {
  const elContainer = document.getElementById("container");
  elContainer.innerHTML = "";
  data.forEach((el) => {
    const clone = document
      .getElementById("cardTemplate")
      .cloneNode(true).content;
    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");
    const elInfoBtn = clone.querySelector(".js-info");
    const elEditBtn = clone.querySelector(".js-edit");
    const elDeleteBtn = clone.querySelector(".js-delete");

    elDeleteBtn.id = el.id;
    elEditBtn.id = el.id;
    elInfoBtn.id = el.id;
    elTitle.innerText = el.name;
    elDescription.innerText = el.description;

    elContainer.appendChild(clone);
  });
}
