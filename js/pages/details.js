const getEl = (id) => document.getElementById(id);

async function getByID(id) {
  document.title = "Yuklanmoqda...";
  try {
    const req = await fetch(`https://json-api.uz/api/project/fn44/cars/${id}`);
    const res = await req.json();
    return res;
  } catch {
    throw new Error("Ma'lumotni olishda xatolik bo'ldi!");
  }
}

function ui(data) {
  document.title = data.name;
  getEl("name").innerText = data.name;
  getEl("description").innerText = data.description;
  getEl("trim").innerText = data.trim;
  getEl("generation").innerText = data.generation;
  getEl("year").innerText = data.year;
  getEl("category").innerText = data.category;
  getEl("colorName").innerText = data.colorName;
  getEl("colorBox").style.background = data.color;
  getEl("doorCount").innerText = data.doorCount;
  getEl("seatCount").innerText = data.seatCount;
  getEl("maxSpeed").innerText = data.maxSpeed;
  getEl("acceleration").innerText = data.acceleration;
  getEl("engine").innerText = data.engine;
  getEl("horsepower").innerText = data.horsepower;
  getEl("fuelType").innerText = data.fuelType;
  getEl("fuelCity").innerText = data.fuelConsumption.city;
  getEl("fuelHighway").innerText = data.fuelConsumption.highway;
  getEl("fuelCombined").innerText = data.fuelConsumption.combined;
  getEl("country").innerText = data.country;
}

window.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  getByID(id)
    .then((res) => ui(res))
    .catch(() => {
      document.body.innerHTML =
        "<h2 class='text-center text-white mt-20'>Ma'lumot topilmadi 😔</h2>";
    });
});
