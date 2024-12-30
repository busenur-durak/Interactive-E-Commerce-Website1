// Key for localStorage
const USERS_KEY = "users";

// Sign Up Form
const signupForm = document.getElementById("signup");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    if (users.some(user => user.email === email)) {
      alert("This email is already registered.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "login.html";
  });
}

// Login Form
const loginForm = document.getElementById("login");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      alert(`Welcome, ${user.name}!`);
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      alert("Invalid email or password.");
    }
  });
}

// Personalized Welcome Message
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  const welcomeBanner = document.getElementById("welcome-banner");
  if (welcomeBanner) {
    welcomeBanner.textContent = `🎉 Welcome back, ${currentUser.name}! Enjoy your shopping.`;
  }
}
