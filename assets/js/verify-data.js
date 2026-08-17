console.log("verify.js is running")

function validUsername (username) {
    const usernameRegex = /^[A-Za-z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function validPassword (password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

function validEmail (email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}

function validPhoneNumber (phoneNumber) {
    const phoneNumberRegex = /^0[0-9]{9}$/;
    return phoneNumberRegex.test(phoneNumber);
}