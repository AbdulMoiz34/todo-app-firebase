import { signInWithEmailPass, signInWithGoogle } from "../../firebase.js";
import { redirect } from "../../redirect.js";
import { showToast } from "../../toast.js";

const loginForm = document.getElementById("login-form");
const googleSignInBtn = document.getElementById("google-signIn-btn");

const loginHandler = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginBtn = document.getElementById("login-btn");
    try {
        loginBtn.disabled = true;
        await signInWithEmailPass(email, password);
        showToast("login successful");
        localStorage.setItem("loggedIn", true);
        setTimeout(() => location = "/", 500);
    } catch (err) {
        console.log(err);
        showToast(err.message, "error");
    } finally {
        loginBtn.disabled = false;
    }
}

loginForm.addEventListener("submit", loginHandler);

googleSignInBtn.addEventListener("click", async () => {
    googleSignInBtn.disabled = true;
    try {
        await signInWithGoogle();
        localStorage.setItem("loggedIn", true);
        setTimeout(() => location = "/", 500);
    } catch (err) {
        showToast(err.message, "error");
    }
});
redirect();