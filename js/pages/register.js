// Parolni ko‘rsatish / yashirish funksiyasi
function togglePassword(id, element) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    element.textContent = "🙈";
  } else {
    input.type = "password";
    element.textContent = "👁️";
  }
}

// Forma yuborilganda (keyinchalik API yoki localStorage bilan bog‘lash mumkin)
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (password !== confirm) {
    alert("Parollar mos emas!");
    return;
  }

  alert(`${username} muvaffaqiyatli ro'yxatdan o'tdi!`);
});
