const API_URL = "https://todo-app-u1qa.onrender.com/api";

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");

const loginSection = document.getElementById("loginSection");
const taskSection = document.getElementById("taskSection");

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const logoutBtn = document.getElementById("logoutBtn");

// 👉 Manejar inicio de sesión
loginForm.onsubmit = async (e) => {
  e.preventDefault();

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
    }),
  });

  console.log("login response", res); // <- Agregado
  const data = await res.json();
  console.log("response data", data); // <- Agregado

  if (res.ok) {
    localStorage.setItem("token", data.token);
    loginSection.style.display = "none";
    taskSection.style.display = "block";
    logoutBtn.style.display = "block"; // <--- Esto activa el botón
    loadTasks();
  } else {
    loginError.textContent = data.message || "Error al iniciar sesión";
  }
};


// 👉 Cargar tareas del usuario autenticado
async function loadTasks() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) return;

  const tasks = await res.json();
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = async () => {
      await fetch(`${API_URL}/tasks/${task._id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      loadTasks();
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// 👉 Agregar nueva tarea
taskForm.onsubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ title: taskInput.value }),
  });

  taskInput.value = "";
  loadTasks();
};

// 👉 Si el usuario ya estaba logueado
if (localStorage.getItem("token")) {
  loginSection.style.display = "none";
  taskSection.style.display = "block";
  logoutBtn.style.display = "block";
  loadTasks();
}

logoutBtn.onclick = () => {
  localStorage.removeItem("token");
  taskSection.style.display = "none";
  logoutBtn.style.display = "none";
  loginSection.style.display = "block";
};