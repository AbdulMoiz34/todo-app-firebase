import { signOutHandler } from "./firebase.js";
import { showToast } from "./toast.js";

const logoutBtn = document.getElementById("logout-btn");
const navToggleBtn = document.getElementById("nav-toggle-btn");

const toggleNavIcons = () => {
    const navIcons = document.getElementById("nav-menu");
    navIcons.classList.toggle("hidden");
}

const checkUserLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("loggedIn") == "true";
    const signupBtn = document.getElementById("signup-btn");
    const profileBtn = document.getElementById("profile-btn");
    if (isLoggedIn) {
        logoutBtn.style.display = "block";
        signupBtn.style.display = "none";
        profileBtn.style.display = "block";
    } else {
        logoutBtn.style.display = "none";
        signupBtn.style.display = "block";
        profileBtn.style.display = "none";
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