const cartIcon = document.getElementById("cart");
console.log(window.location.href)
cartIcon.addEventListener("click", function(event) {
    event.preventDefault();
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        window.location.href = "/assets/pages/sign-in.html"
        return;
    }
    window.location.href = "/assets/pages/cart.html";
});