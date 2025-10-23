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

// Forma yuborilganda
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
      alert("Parollar mos emas!");
      return;
    }

    try {
      // Foydalanuvchi ma'lumotlarini serverga yuborish
      const response = await fetch(
        "https://json-api.uz/api/project/fn44/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Ro'yxatdan o'tish muvaffaqiyatli bo'lsa
        alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");

        // Foydalanuvchi ma'lumotlarini localStorage ga saqlash
        localStorage.setItem("username", username);
        localStorage.setItem("token", data.token);

        // Login sahifasiga yo'naltirish
        window.location.href = "login.html";
      } else {
        // Xatolik bo'lsa
        alert(data.message || "Ro'yxatdan o'tishda xatolik yuz berdi!");
      }
    } catch (error) {
      alert("Server bilan bog'lanishda xatolik yuz berdi!");
    }
  });
