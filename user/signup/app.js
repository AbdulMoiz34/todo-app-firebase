import { changeUsername, registerUser } from "../../firebase.js";
import { redirect } from "../../redirect.js";
import { showToast } from "../../toast.js";

const registerForm = document.getElementById("register-form");
const signUpBtn = document.getElementById("signup-btn");

const signUpWithEmailPass = async () => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("fullName").value;
    try {
        signUpBtn.disabled = true;
        await registerUser(email, password);
        await changeUsername(username);
        showToast("Signup Successful.");
        localStorage.setItem("loggedIn", true);
        setTimeout(() => location = "/", 500);
    } catch (err) {
        showToast(err.message, "error");
    }
}

registerForm.addEventListener("submit", signUpWithEmailPass);
redirect();