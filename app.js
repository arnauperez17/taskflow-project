
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const search = document.getElementById("search");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const toggleDark = document.getElementById("toggleDark");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    let bgClass = "";
    let borderColor = "";
    if (task.priority === "alta") {
      borderColor = "5px solid red";
      bgClass = "bg-red-100 dark:bg-red-800";
    } else if (task.priority === "media") {
      borderColor = "5px solid orange";
      bgClass = "bg-orange-100 dark:bg-orange-800";
    } else {
      borderColor = "5px solid green";
      bgClass = "bg-green-100 dark:bg-green-800";
    }

    li.style.borderLeft = borderColor;
    li.className = `flex justify-between items-center p-2 rounded ${bgClass} transition-colors duration-300 cursor-default`;

    const left = document.createElement("div");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = task.completed ? "line-through text-gray-400 cursor-pointer" : "dark:text-white cursor-pointer";

    span.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const info = document.createElement("small");
    info.textContent = ` (${task.category} - ${task.priority})`;
    info.className = "ml-2 text-gray-500 dark:text-gray-300";

    left.appendChild(span);
    left.appendChild(info);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(left);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  taskCount.textContent = `Tareas pendientes: ${tasks.filter(t => !t.completed).length}`;
}

function addNewTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    text,
    completed: false,
    category: category.value,
    priority: priority.value
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
}

addTask.addEventListener("click", addNewTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addNewTask();
});

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  Array.from(taskList.children).forEach(item => {
    const text = item.querySelector("span").textContent.toLowerCase();
    item.style.display = text.includes(value) ? "flex" : "none";
  });
});

toggleDark.addEventListener("click", () => {
  const html = document.documentElement;
  html.classList.toggle("dark");
  toggleDark.textContent = html.classList.contains("dark") ? "☀️" : "🌙";
  localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  toggleDark.textContent = "☀️";
} else {
  toggleDark.textContent = "🌙";
}


renderTasks();