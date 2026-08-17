console.log("register.js is running")

const registerForm = document.getElementById("register-form");
const usernameInput =  document.getElementById("register-username");
const emailInput = document.getElementById("register-email");
const passwordInput = document.getElementById("register-password");
const repwInput = document.getElementById("register-repw");
const phoneNumberInput = document.getElementById("register-phone");
const addressInput = document.getElementById("register-address");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rePassword = repwInput.value;
    const phone = phoneNumberInput.value.trim();
    const address = addressInput.value.trim();

    if (
        username === "" ||
        email === "" ||
        password === "" ||
        rePassword === "" ||
        phone === "" ||
        address === ""
    ) {
        alert("Please fill in all information.");
        return;
    }

    if (!validUsername(username)) {
        alert(
            "Username must contain 3-20 characters " +
            "and only letters, numbers, and underscore."
        );
        return;
    }

    if (!validEmail(email)) {
        alert("Please enter a valid email.");
        return;
    }

    if (!validPassword(password)) {
        alert(
            "Password must contain at least 8 characters, " +
            "one uppercase letter, one lowercase letter, " +
            "and one number."
        );
        return;
    }

    if (password !== rePassword) {
        alert("Passwords do not match.");
        return;
    }

    if (!validPhoneNumber(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    const savedAccount = localStorage.getItem("account");


    if (savedAccount !== null) {

        const account = JSON.parse(savedAccount);

        if (username === account.username) {

            alert("Username already exists.");

            return;
        }

        if (email === account.email) {

            alert("Email already exists.");

            return;
        }
    }

    const account = {
        username: username,
        email: email,
        password: password,
        phone: phone,
        address: address
    };

    localStorage.setItem(
        "account",
        JSON.stringify(account)
    );

    alert("Register successfully!");

    window.location.href = "../pages/sign-in.html";
})