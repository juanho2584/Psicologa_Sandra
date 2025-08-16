// Inicializar EmailJS con tu PUBLIC_KEY
(function () {
  emailjs.init("TU_PUBLIC_KEY"); // 🔹 Reemplaza con tu PUBLIC_KEY de EmailJS
})();

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

// Validación individual
function validateField(input, errorElement, regex, errorMsg) {
  if (!regex.test(input.value.trim())) {
    errorElement.textContent = errorMsg;
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  } else {
    errorElement.textContent = "";
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  }
}

// Validaciones en tiempo real
nameInput.addEventListener("input", () =>
  validateField(
    nameInput,
    nameError,
    /^.{3,}$/,
    "El nombre debe tener al menos 3 caracteres"
  )
);

emailInput.addEventListener("input", () =>
  validateField(
    emailInput,
    emailError,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Ingrese un email válido"
  )
);

messageInput.addEventListener("input", () =>
  validateField(
    messageInput,
    messageError,
    /^.{10,}$/,
    "El mensaje debe tener al menos 10 caracteres"
  )
);

// Validación y envío final
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const validName = validateField(
    nameInput,
    nameError,
    /^.{3,}$/,
    "El nombre debe tener al menos 3 caracteres"
  );
  const validEmail = validateField(
    emailInput,
    emailError,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Ingrese un email válido"
  );
  const validMessage = validateField(
    messageInput,
    messageError,
    /^.{10,}$/,
    "El mensaje debe tener al menos 10 caracteres"
  );

  if (validName && validEmail && validMessage) {
    emailjs
      .send("TU_SERVICE_ID", "TU_TEMPLATE_ID", {
        from_name: nameInput.value,
        from_email: emailInput.value,
        message: messageInput.value,
      })
      .then(() => {
        alert("✅ Mensaje enviado correctamente");
        form.reset();
        nameInput.classList.remove("is-valid");
        emailInput.classList.remove("is-valid");
        messageInput.classList.remove("is-valid");
      })
      .catch((error) => {
        alert("❌ Error al enviar: " + JSON.stringify(error));
      });
  }
});
