 const API_URL = "http://localhost:3000/api/tasks";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");

async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    li.dataset.id = task.id;

    // Agregar botón eliminar
    const del = document.createElement("button");
    del.textContent = "❌";
    del.onclick = async () => {
      await fetch(`${API_URL}/${task.id}`, { method: "DELETE" });
      loadTasks();
    };

    li.appendChild(del);
    taskList.appendChild(li);
  });
}

taskForm.onsubmit = async (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  taskInput.value = "";
  loadTasks();
};

loadTasks();

