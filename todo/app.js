import { addTodo, completedTodo, deleteTodo, findTodos, getTodosQuery, onSnapshot, signOutHandler, updateTodo } from "../firebase.js";
import { showToast } from "../toast.js";

const logoutBtn = document.getElementById("logout-btn");
const navToggleBtn = document.getElementById("nav-toggle-btn");
const signupBtn = document.getElementById("signup-btn");
const todoForm = document.getElementById("add-todo-form");
const todos = document.getElementById("todos");
const uid = localStorage.getItem("uid");
const loader = document.getElementById("loader");
const addTodoModal = document.getElementById("addTodoModal");
const editTodoModal = document.getElementById("editTodoModal");

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


const addTodoHandler = async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const desc = document.getElementById("description").value;
    if (uid == "null") {
        showToast("Please login first.", "warning");
        return;
    }
    try {
        todoForm.reset();
        closeAddTodoModal();
        const msg = await addTodo({ todo: title, desc, uid });
        showToast(msg);
    } catch (err) {
        showToast(err.message, "error");
    }
}

const renderTodo = (todo) => {
    todos.previousElementSibling.style.display = "block";

    todos.innerHTML += `<div class="max-w-2xl mx-auto my-4">
  <div class="flex items-start justify-between bg-${todo.completed ? "blue-50" : "white"} border border-${todo.completed ? "blue" : "gray"}-200 rounded-lg shadow-sm p-4 hover:shadow-md transition">
    <div class="flex items-start gap-4 w-full">
      <input type="checkbox" ${todo.completed ? "checked" : ""} class="mt-1 accent-blue-600 w-5 h-5" onchange="todoCompletedHandler('${todo.docId}' , ${todo.completed})"/>
      <div class="flex flex-col w-full">
        <div class="flex justify-between items-start">
          <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">${todo.todo}</h3>
          <span class="text-sm ml-2 px-2 py-0.5 rounded bg-${todo.completed ? "blue" : "yellow"}-100 text-${todo.completed ? "blue" : "yellow"}-800 font-medium">
            ${todo.completed ? "" : "Not"} Completed
          </span>
        </div>
        <p class="text-sm text-gray-600 mt-1 line-clamp-2">
         ${todo.desc}
        </p>
        <div class="flex justify-between items-center mt-2 text-sm gap-2 text-gray-500">
          <div>Created at: <span class="text-black text-xs">${todo.timestamp ? todo.timestamp?.toDate().toDateString() : "Loading..."}</span></div>
          <div class="space-x-2">
            <button class="text-blue-500 hover:text-blue-600 cursor-pointer" title="Edit">
              <i class="fas fa-edit edit-btn" data-todo="${todo.todo}" data-desc="${todo.desc}" data-docId="${todo.docId}" onclick="openModal()"></i>
            </button>
            <button class="text-red-500 hover:text-red-600 cursor-pointer" onclick="deleteTodoHandler('${todo.docId}')" title="Delete">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

const allTodos = () => {
    loader.classList.remove("hidden");
    onSnapshot(getTodosQuery, (snapshot) => {
        if (!snapshot.docs.length) {
            todos.previousElementSibling.style.display = "none";
            todos.innerHTML = ` 
          <div class="flex flex-col items-center mt-10">
                <div>
                   <p class="text-gray-500 text-sm text-center">No Todos are present.</p>
                 </div>
             <div style="margin-top: 14px;"><svg width="172.8" height="347.20000000000005" viewBox="0 0 261 434" fill="none"
                class="" xmlns="http://www.w3.org/2000/svg"
                style="filter: drop-shadow(rgba(36, 54, 255, 0.784) 0px 0px 51.2px);">
                <circle cx="130.837" cy="34.2327" r="26.7209" stroke="#1447E6" stroke-width="14"></circle>
                <rect y="51.7676" width="261" height="381.721" rx="45" fill="#1447E6" fill-opacity="0.6"></rect>
                <rect x="26.9767" y="80.0928" width="207.047" height="325.07" rx="35" fill="white" fill-opacity="0.9">
                </rect>
                <rect x="64.7442" y="176.535" width="132.186" height="132.186" rx="66.093" fill="#1447E6">
                </rect>
                <rect x="95.0707" y="268.856" width="87.6744" height="13.4884" rx="6.74419"
                    transform="rotate(-45 95.0707 268.856)" fill="#f0f0f0"></rect>
                <rect x="104.608" y="206.861" width="87.6744" height="13.4884" rx="6.74419"
                    transform="rotate(45 104.608 206.861)" fill="#f0f0f0"></rect>
                <rect x="77.5581" y="36.9307" width="106.558" height="56.6512" rx="18" fill="#1447E6"></rect>
                </svg>
              </div>
           </div>`;
            return;
        }
        todos.innerHTML = "";
        snapshot.forEach((doc) => {
            const todo = doc.data();
            renderTodo({ ...todo, docId: doc.id });
        });
    });
}

const deleteTodoHandler = async (docId) => {
    try {
        const msg = await deleteTodo(docId);
        showToast(msg);
    } catch (err) {
        showToast(err.message, "error");
    }
}

const todoCompletedHandler = async (docId, completed) => {
    try {
        const msg = await completedTodo(docId, completed);
        showToast(msg);
    } catch (err) {
        showToast(err.message, "error");
    }
}

const openAddTodoModal = () => {
    addTodoModal.classList.remove("hidden");
}
const closeAddTodoModal = () => {
    addTodoModal.classList.add("hidden");
}

const openModal = () => {
    const titleInp = document.getElementById("edit-title");
    const descInp = document.getElementById("edit-description");
    const btn = event.target;
    const { todo, desc, docid } = btn.dataset;
    titleInp.value = todo;
    descInp.value = desc;
    editTodoModal.dataset.docId = docid;
    editTodoModal.classList.remove("hidden");
}

const closeModal = () => {
    editTodoModal.classList.add("hidden");
}

const editTodoHandler = async () => {
    event.preventDefault();
    const todo = document.getElementById("edit-title").value.trim();
    const desc = document.getElementById("edit-description").value.trim();
    const { docId } = editTodoModal.dataset;
    if (!todo) {
        showToast("Empty todo.", "error");
        return;
    }
    try {
        closeModal();
        const msg = await updateTodo(docId, { todo, desc });
        showToast(msg);
    } catch (err) {
        showToast(err.message, "error");
    }
}

let id = undefined;
const searchTaskInput = document.getElementById("search-task-inp");

const findTodosBySearching = async () => {
    let q = searchTaskInput.value.trim();
    const filteredTodos = await findTodos(q);
    todos.innerHTML = "";

    if (!filteredTodos.length) {
        todos.previousElementSibling.style.display = "none";
        todos.innerHTML = ` 
          <div class="flex flex-col items-center mt-10">
                <div>
                   <p class="text-gray-500 text-sm text-center">No Todos are present.</p>
                 </div>
             <div style="margin-top: 14px;"><svg width="172.8" height="347.20000000000005" viewBox="0 0 261 434" fill="none"
                class="" xmlns="http://www.w3.org/2000/svg"
                style="filter: drop-shadow(rgba(36, 54, 255, 0.784) 0px 0px 51.2px);">
                <circle cx="130.837" cy="34.2327" r="26.7209" stroke="#1447E6" stroke-width="14"></circle>
                <rect y="51.7676" width="261" height="381.721" rx="45" fill="#1447E6" fill-opacity="0.6"></rect>
                <rect x="26.9767" y="80.0928" width="207.047" height="325.07" rx="35" fill="white" fill-opacity="0.9">
                </rect>
                <rect x="64.7442" y="176.535" width="132.186" height="132.186" rx="66.093" fill="#1447E6">
                </rect>
                <rect x="95.0707" y="268.856" width="87.6744" height="13.4884" rx="6.74419"
                    transform="rotate(-45 95.0707 268.856)" fill="#f0f0f0"></rect>
                <rect x="104.608" y="206.861" width="87.6744" height="13.4884" rx="6.74419"
                    transform="rotate(45 104.608 206.861)" fill="#f0f0f0"></rect>
                <rect x="77.5581" y="36.9307" width="106.558" height="56.6512" rx="18" fill="#1447E6"></rect>
                </svg>
              </div>
           </div>`;
        return;
    }
    todos.previousElementSibling.style.display = "block";

    filteredTodos.forEach(todo => renderTodo(todo));

}

searchTaskInput.addEventListener("input", () => {
    clearTimeout(id);
    id = setTimeout(findTodosBySearching, 1000);
})


checkUserLoggedIn();
allTodos();

window.openModal = openModal;
window.closeModal = closeModal;
window.deleteTodoHandler = deleteTodoHandler;
window.editTodoHandler = editTodoHandler;
window.todoCompletedHandler = todoCompletedHandler;
window.openAddTodoModal = openAddTodoModal;
window.closeAddTodoModal = closeAddTodoModal;

navToggleBtn.addEventListener("click", toggleNavIcons);
logoutBtn.addEventListener("click", logoutHandler);
todoForm.addEventListener("submit", addTodoHandler);
editTodoModal.addEventListener("submit", editTodoHandler);