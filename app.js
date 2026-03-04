const form = document.querySelector(".task-creator");
const input = document.querySelector(".task-creator input");
const select = document.querySelector(".task-creator select");
const taskList = document.querySelector(".task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const title = document.createElement("span");
    title.textContent = task.text;

    const badge = document.createElement("span");
    badge.textContent = task.priority;
    badge.classList.add("priority", task.priority);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.border = "none";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.color = "red";

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskDiv.appendChild(title);
    taskDiv.appendChild(badge);
    taskDiv.appendChild(deleteBtn);

    taskList.appendChild(taskDiv);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask = {
    text: input.value.trim(),
    priority: select.value
  };

  if (newTask.text === "") return;

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  input.value = "";
});

renderTasks();