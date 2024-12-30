// Welcome message for logged-in user
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  const welcomeBanner = document.getElementById("welcome-banner");
  if (welcomeBanner) {
    welcomeBanner.textContent = `🎉 Welcome back, ${currentUser.name}! Please complete your payment below.`;
  }
} else {
  alert("You must be logged in to complete the payment.");
  window.location.href = "login.html"; // Redirect to login if not logged in
}

// Payment form validation
const paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const cardNumber = document.getElementById("cardNumber").value;
  const expiryDate = document.getElementById("expiryDate").value;
  const cvv = document.getElementById("cvv").value;

  let isValid = true;

  // Kart Numarası Doğrulama
  if (!/^\d{16}$/.test(cardNumber)) {
    document.getElementById("cardError").textContent = "Kart numarası 16 haneli olmalıdır.";
    isValid = false;
  } else {
    document.getElementById("cardError").textContent = "";
  }

  // CVV Doğrulama
  if (!/^\d{3}$/.test(cvv)) {
    document.getElementById("cvvError").textContent = "CVV 3 haneli olmalıdır.";
    isValid = false;
  } else {
    document.getElementById("cvvError").textContent = "";
  }

  // Son Kullanma Tarihi Doğrulama
  const today = new Date();
  const [year, month] = expiryDate.split("-");
  const expiry = new Date(year, month - 1);

  if (expiry <= today) {
    document.getElementById("expiryError").textContent = "Son kullanma tarihi geçerli olmalıdır.";
    isValid = false;
  } else {
    document.getElementById("expiryError").textContent = "";
  }

  if (isValid) {
    alert("Ödeme başarıyla tamamlandı!");
    paymentForm.reset();
  }
});