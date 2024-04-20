document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = loginForm.elements["username"].value;
    const password = loginForm.elements["password"].value;

    if (username === "user" && password === "password") {
      alert("Login successful!");
      window.location.href = "home.html";
    } else {
      errorMessage.textContent =
        "Invalid username or password. Please try again.";
    }
  });
});
