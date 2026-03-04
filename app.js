const form = document.querySelector(".task-creator");
const input = document.querySelector(".task-creator input[type='text']");
const prioritySelect = document.querySelector(".task-creator select[name='priority']");
const categorySelect = document.querySelector(".task-creator select[name='category']");
const taskList = document.querySelector(".task-list");
const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "Todas";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter !== "Todas") {
    filteredTasks = tasks.filter(task => task.category === currentFilter);
  }

  filteredTasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const title = document.createElement("span");
    title.textContent = task.text;

    const category = document.createElement("small");
    category.textContent = task.category;
    category.style.marginLeft = "10px";
    category.style.opacity = "0.6";

    const badge = document.createElement("span");
    badge.textContent = task.priority;
    badge.classList.add("priority", task.priority);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.border = "none";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.color = "red";
    deleteBtn.style.fontSize = "16px";

    deleteBtn.addEventListener("click", () => {
      const realIndex = tasks.findIndex(t => 
        t.text === task.text &&
        t.priority === task.priority &&
        t.category === task.category
      );

      tasks.splice(realIndex, 1);
      saveTasks();
      renderTasks();
    });

    taskDiv.appendChild(title);
    taskDiv.appendChild(category);
    taskDiv.appendChild(badge);
    taskDiv.appendChild(deleteBtn);

    taskList.appendChild(taskDiv);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask = {
    text: input.value.trim(),
    priority: prioritySelect.value,
    category: categorySelect.value
  };

  if (newTask.text === "") return;

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  form.reset();
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentFilter = button.textContent;
    renderTasks();
  });
});

renderTasks();