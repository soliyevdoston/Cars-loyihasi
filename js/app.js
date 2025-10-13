// import { getAll } from "./request.js";

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

const elTimer = document.getElementById("timer");
const elBtn = document.getElementById("f");
setInterval(() => {
  const date = new Date();
  const time = ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;
  elTimer.innerHTML = time;
}, 1000);

elBtn.addEventListener("click", () => {
  for (let i = 0; i <= 1000000000; i++) {
    console.log(i);
  }
});
