const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("login-username");
const passwordInput = document.getElementById("login-password");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Không load lại trang

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username == "" || password == "") {
        alert("Please fill in all information.");
        return;
    }

    const isUsername = validUsername(username);
    const isEmail = validEmail(username);
    const isPassword = validPassword(password);

    if (!isUsername && !isEmail) {
        alert("Please enter a valid username or email!");
        return;
    }

    if (!isPassword) {
        alert(
            "Password must contain at least 8 characters, " +
            "one uppercase letter, one lowercase letter, " +
            "and one number."
        )
        return;
    }

    const savedAccount = localStorage.getItem("account");
    if (savedAccount == null) {
        alert("Account does not exist!");
        return;
    }

    const account = JSON.parse(savedAccount);
    const isUsernameCorrect = username === account.username;
    const isEmailCorrect = username === account.email;
    const isPasswordCorrect = password === account.password;

    if (
        (isUsernameCorrect || isEmailCorrect)
        && isPasswordCorrect
    ) {

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        localStorage.setItem(
            "currentUser",
            JSON.stringify(account)
        );

        alert("Sign in successfully!");

        window.location.href = "../../index.html";

    } else {

        alert(
            "Incorrect username/email or password."
        );
    }
})