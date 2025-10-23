import { getFormData } from "../get-form-data.js";

const elForm = document.getElementById("form");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

async function login(user) {
  try {
    const req = await fetch("https://json-api.uz/api/project/fn44/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      method: "POST",
    });
    const res = await req.json();
    return res;
  } catch {
    throw new Error("Kirishda xatolik bo‘ldi!");
  }
}

elForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const result = getFormData(elForm);

  try {
    const res = await login(result);

    if (res.access_token) {
      localStorage.setItem("token", res.access_token);
      window.location.href = "../../index2.html"; // ✅ o‘tadi
    } else {
      alert("Login yoki parol noto‘g‘ri!");
    }
  } catch (err) {
    alert(err.message || "Kirishda xatolik bo‘ldi!");
  }
});

// 👁️ Parolni ko‘rsatish
togglePassword.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});
