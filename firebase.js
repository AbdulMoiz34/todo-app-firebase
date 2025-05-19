import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyDcw1fHVVkNCxlLO7XAxrEyoUlp68oLJbo",
    authDomain: "todos-34.firebaseapp.com",
    projectId: "todos-34",
    storageBucket: "todos-34.firebasestorage.app",
    messagingSenderId: "883807992025",
    appId: "1:883807992025:web:0c3e2a4f1d40ab15dd66c8",
    measurementId: "G-0MNTKJXVHS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (err) {
        throw err;
    }
}

const signInWithEmailPass = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (err) {
        throw err;
    }
}

export { registerUser, signInWithEmailPass };