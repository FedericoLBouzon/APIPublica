window.onload = function () {
  let fetchedData;

  function cifradoCesar(texto, desplazamiento) {
    return texto.replace(/[a-zA-Z0-9]/g, function (c) {
      const base = c >= "0" && c <= "9" ? 48 : c <= "Z" ? 65 : 97;
      const rango = c >= "0" && c <= "9" ? 10 : 26;
      return String.fromCharCode(
        ((c.charCodeAt(0) - base + desplazamiento) % rango) + base
      );
    });
  }

  async function fetchData(username) {
    try {
      const response = await fetch("http://localhost:3000/getpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      fetchedData = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  let loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      let username = document.getElementById("username").value;
      let contraseña = document.getElementById("password").value;
      const contraseñaEncriptada = cifradoCesar(contraseña, 3);
      await fetchData(username);

      if (
        username === "admin" &&
        contraseñaEncriptada === fetchedData.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
      } else {
        document.getElementById("error-message").innerText =
          "Los datos ingresados no son correctos";
      }
    });
  }
};
