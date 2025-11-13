function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  return emailPattern.test(email);
}
function isValidPassword(password) {
    const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
}
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const error = document.getElementById("loginError");

    error.textContent = "";

    if (!isValidEmail(email)) {
      error.textContent = "Please enter a valid email (e.g. user@gmail.com)";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      error.textContent = "Invalid email or password.";
      return;
    }

    localStorage.setItem("currentUser", email);
    error.style.color = "#00ffbf";
    error.textContent = "Login successful! Redirecting...";
    setTimeout(() => (window.location.href = "dashboard.html"), 1500);
  });
}
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const error = document.getElementById("regError");

    error.textContent = "";

    if (!name || !email || !password) {
      error.textContent = "All fields are required.";
      return;
    }

    if (!isValidEmail(email)) {
      error.textContent =
        "Please enter a valid email (e.g. example@gmail.com)";
      return;
    }

    if (!isValidPassword(password)) {
      error.textContent =
        "Password must be 8+ chars, include upper, lower, number, and special character.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some((u) => u.email === email);

    if (exists) {
      error.textContent = "User already exists!";
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    error.style.color = "#00ffbf";
    error.textContent = "Registration successful! Redirecting...";
    setTimeout(() => (window.location.href = "index.html"), 1500);
  });
}
