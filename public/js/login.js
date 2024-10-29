window.onload = function () {
  let fetchedData;

  // Función para encriptar la contraseña usando el cifrado César
  function cifradoCesar(texto, desplazamiento) {
    return texto.replace(/[a-zA-Z0-9]/g, function (c) {
      const base = c >= "0" && c <= "9" ? 48 : c <= "Z" ? 65 : 97;
      const rango = c >= "0" && c <= "9" ? 10 : 26;
      return String.fromCharCode(
        ((c.charCodeAt(0) - base + desplazamiento) % rango) + base
      );
    });
  }

  // Configura la URL base dependiendo del entorno
  const BASE_URL = window.location.origin; // Esto usará la URL de producción o localhost automáticamente

  // Función para enviar los datos de login al servidor
  async function fetchData(username) {
    try {
      const response = await fetch(`${BASE_URL}/getpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor");
      }

      fetchedData = await response.json();
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con la autenticación. Intenta nuevamente.");
    }
  }

  // Obtiene el formulario y agrega el evento `submit`
  let loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      let username = document.getElementById("username").value;
      let contraseña = document.getElementById("password").value;
      const contraseñaEncriptada = cifradoCesar(contraseña, 3);

      // Llama a `fetchData` para obtener la contraseña encriptada desde el servidor
      await fetchData(username);

      // Valida los datos obtenidos del servidor
      if (fetchedData && contraseñaEncriptada === fetchedData.password) {
        console.log("Inicio de sesión exitoso");
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "../index.html"; // Redirige a la página principal
      } else {
        document.getElementById("error-message").innerText = "Usuario o contraseña incorrectos.";
      }
    });
  }
};
