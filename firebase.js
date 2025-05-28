import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, updateProfile, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
import { getFirestore, doc, addDoc, serverTimestamp, collection, query, where, orderBy, onSnapshot, deleteDoc, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
    localStorage.setItem("uid", user ? user.uid : null);
});

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

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, provider);
        return res;
    } catch (err) {
        throw err;
    }
}

const signOutHandler = async () => {
    try {
        await signOut(auth);
        localStorage.setItem("loggedIn", false);
        return "logout successful";
    } catch (err) {
        throw err;
    }
}

const addTodo = async (todo) => {
    try {
        await addDoc(collection(db, "todos"), { ...todo, timestamp: serverTimestamp(), completed: false });
        return "Todo has been added.";
    } catch (err) {
        throw err;
    }
}

const id = localStorage.getItem("uid");
const getTodosQuery = query(collection(db, "todos"), where("uid", "==", id), orderBy("timestamp", "desc"));

const deleteTodo = async (docId) => {
    try {
        await deleteDoc(doc(db, "todos", docId));
        return "Todo deleted.";
    } catch (err) {
        throw err;
    }
}

const updateTodo = async (docId, todo) => {
    debugger;
    try {
        await updateDoc(doc(db, "todos", docId), todo);
        return "Todo Updated.";
    } catch (err) {
        throw err;
    }

}

const completedTodo = async (docId, completed) => {
    try {
        await updateDoc(doc(db, "todos", docId), {
            completed: !completed
        });

        return "Todo Updated.";
    } catch (err) {
        throw err;
    }
}

const findTodos = async (q) => {
    const snapshot = query(collection(db, "todos"), where("uid", "==", id));
    const querySnapshot = await getDocs(snapshot);
    const todos = [];
    querySnapshot.forEach((doc) => {
        const todo = doc.data();
        const { todo: title, desc } = todo;
        if (title.toLowerCase().includes(q) || desc.toLowerCase().includes(q)) {
            todos.push({ ...todo, docId: doc.id });
        }
    });
    return todos;
}

export { onAuthStateChanged, auth, registerUser, signInWithEmailPass, signOutHandler, addTodo, getTodosQuery, onSnapshot, deleteTodo, updateTodo, completedTodo, signInWithGoogle, findTodos, updateProfile, sendEmailVerification };