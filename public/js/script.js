window.onload = function () {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    alert("Debe iniciar sesión primero");
    window.location.href = "login.html";
  }
  let cerrarSesionBtn = document.getElementById("logout-btn");
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "login.html";
    });
  }
};
