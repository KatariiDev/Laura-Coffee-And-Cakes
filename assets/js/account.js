// SIGN-IN

const accountContainer = document.getElementById("account-container");
const accountLink = document.getElementById("account-link");
const accountIcon = document.getElementById("account-icon");
const accountCard = document.getElementById("account-card");
const accountName = document.getElementById("account-name");
const accountEmail = document.getElementById("account-email");
const accountMenu = document.getElementById("account-menu")
const logoutBtn = document.getElementById("logout-btn");
const cartIconBtn = document.getElementById("cart");

console.log("accountContainer:", accountContainer);
console.log("accountCard:", accountCard);
console.log("accountMenu:", accountMenu);

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    accountLink.style.display = "none";
    accountCard.style.display = "flex";
    accountName.textContent = currentUser.username;
    accountEmail.textContent = currentUser.email;
    cartIconBtn.style.display = "none";
}
else {
    accountLink.style.display = "block";
    accountCard.style.display = "none";
    accountMenu.style.display = "none";
    cartIconBtn.style.display = "block"
}

accountContainer.addEventListener("click", function (event) {
    event.stopPropagation();
    accountMenu.classList.toggle("show");
});

// SIGN-OUT

logoutBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    
    accountLink.style.display = "block";
    accountCard.style.display = "none";
    accountMenu.style.display = "none";

    window.location.reload();
});

// Information
const menuInfo = document.getElementById("menu-info");

menuInfo.addEventListener("click", function(event) {
    alert("Coming soon...");
})