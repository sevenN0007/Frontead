document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  const errorContainer = document.getElementById("error-container");
  const loader = document.getElementById("form-loader");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errors = [];

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email))  {
      errors.push("Email має бути валідною адресою");
    }

    if (password.length < 8) {
      errors.push("Пароль має містити щонайменше 8 символів.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Пароль має містити хоча б одну велику літеру.");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Пароль має містити хоча б один спецсимвол.");
    }
    if (/[а-яА-ЯёЁїЇіІєЄґҐ]/.test(password)) {
      errors.push("Пароль не повинен містити кирилицю.");
    }

    errorContainer.innerHTML= "";

    if (errors.length > 0){
      const errorBox = document.createElement("div");
      errorBox.classList.add("error-box");
      errorBox.innerHTML = errors.map(e => `• ${e}`).join("<br>");
      errorContainer.appendChild(errorBox);
      return;
    }

    // 🔒 Блокуємо форму
    form.classList.add("disabled");
    loader.style.display = "flex";

    const data = {email, password};

    fetch("/form-api", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response =>{
      if (!response.ok) throw new Error("Помилка запиту");
      return response.json();
    })
    .then(result =>{
      alert("Форма успішно відправлена!");
      console.log("Відповідь сервера:", result);
    })
    .catch(error =>{
      alert("Сталася помилка при надсиланні форми.");
      console.error(error);
    })
    .finally(()=>{
      loader.style.display = "none";
      form.classList.remove("disabled");
    });
  });
});