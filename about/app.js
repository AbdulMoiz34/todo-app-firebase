import { signOutHandler } from "../firebase.js";
import { showToast } from "../toast.js";

const logoutBtn = document.getElementById("logout-btn");
const navToggleBtn = document.getElementById("nav-toggle-btn");
const signupBtn = document.getElementById("signup-btn");

const toggleNavIcons = () => {
    const navIcons = document.getElementById("nav-menu");
    navIcons.classList.toggle("hidden");
}

const checkUserLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("loggedIn") == "true";
    if (isLoggedIn) {
        logoutBtn.style.display = "block";
        signupBtn.style.display = "none";
    } else {
        logoutBtn.style.display = "none";
        signupBtn.style.display = "block";
    }
}

const logoutHandler = async () => {
    try {
        const msg = await signOutHandler();
        showToast(msg);
        checkUserLoggedIn();
    } catch (err) {
        showToast(err.message, "error");
    }
}

checkUserLoggedIn();
navToggleBtn.addEventListener("click", toggleNavIcons);
logoutBtn.addEventListener("click", logoutHandler);