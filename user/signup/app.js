import { registerUser } from "../../firebase.js";
import { showToast } from "../../toast.js";

const registerForm = document.getElementById("register-form");
const signUpBtn = document.getElementById("signup-btn");

const signUpWithEmailPass = async () => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        signUpBtn.disabled = true;
        await registerUser(email, password);
        showToast("Signup Successful.");
    } catch (err) {
        showToast(err.message , "error");
    }
}

registerForm.addEventListener("submit", signUpWithEmailPass);