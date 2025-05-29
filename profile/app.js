import { signOutHandler, onAuthStateChanged, auth, changeUsername, sendEmailVerification, updatePhotoURL } from "../firebase.js";
import { redirect } from "../redirect.js";
import { showToast } from "../toast.js";

const logoutBtn = document.getElementById("logout-btn");
const navToggleBtn = document.getElementById("nav-toggle-btn");
const signupBtn = document.getElementById("signup-btn");

const loader = document.getElementById("loader");
const heroSec = document.getElementById("hero-section");
const imageUploadInput = document.getElementById("image-upload");

const editNameModel = document.getElementById("editNameModal");
const editNameModalBtn = document.getElementById("editNameModal-btn");
const editNameForm = document.getElementById("edit-name-form");

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

const userNameEl = document.getElementById("user-name");
const userEmailEl = document.getElementById("user-email");
const userImageEl = document.getElementById("image");

const verifyStatus = document.getElementById("verification-status");
const verifyIcon = document.getElementById("verification-icon");
const verifyBtn = document.getElementById("verification-btn");
let currentUser = undefined;

onAuthStateChanged(auth, (user) => {
    currentUser = user;
    userNameEl.textContent = user.displayName ?? "Guest";
    userEmailEl.textContent = user.email;
    userImageEl.src = user.photoURL ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPRh3FMc3PtkN2OmE93bMurFRmwxjxNJoeIg&s";
    loader.classList.add("hidden");
    heroSec.classList.remove("hidden");

    if (user.emailVerified) {
        verifyStatus.classList.remove("bg-red-100", "text-red-700", "dark:text-red-400");
        verifyStatus.classList.add("bg-green-100", "text-green-700", "dark:text-green-400");
        verifyIcon.classList.remove("fa-exclamation-circle");
        verifyIcon.classList.add("fa-check-circle");
        verifyStatus.innerHTML = `<i class="fas fa-check-circle mr-1"></i> Verified`;
        verifyBtn.classList.add("hidden");
    } else {
        verifyStatus.innerHTML = `<i class="fas fa-exclamation-circle mr-1"></i> Not Verified`;
        verifyBtn.classList.remove("hidden");
    }
});

const updateUsername = async () => {
    event.preventDefault();
    const newName = document.getElementById("new-name").value;
    try {
        const msg = await changeUsername(newName);
        showToast(msg);
        userNameEl.textContent = newName;
        closeModal();
    } catch (err) {
        showToast(err.message, "error");
    }
}

const emailVerifyHandler = async () => {
    try {
        await sendEmailVerification(currentUser);
        showToast("Verification email sent.");
    } catch (err) {
        showToast(err.message, "error");
    }
}
const openModal = () => {
    editNameModel.classList.remove("hidden");
}

const closeModal = () => {
    editNameModel.classList.add("hidden");
}

const uploadImageOnCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "UserImages");
    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/moiz34/upload", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        return data.secure_url;
    } catch (err) {
        throw err;
    }
}

window.closeModal = closeModal;
verifyBtn.onclick = emailVerifyHandler;
checkUserLoggedIn();
editNameModalBtn.addEventListener("click", openModal);
navToggleBtn.addEventListener("click", toggleNavIcons);
logoutBtn.addEventListener("click", logoutHandler);
editNameForm.addEventListener("submit", updateUsername);

imageUploadInput.addEventListener('change', async (event) => {
    try {
        showToast("Uploading...", "warning");
        const url = await uploadImageOnCloudinary(event.target.files[0]);
        await updatePhotoURL(url);
        showToast("Image uploaded.");
        userImageEl.src = url;
    } catch (err) {
        showToast(err.message, "error");
    }
});
redirect();
