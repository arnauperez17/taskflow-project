const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");
const toggleDarkModeButton = document.getElementById("toggleDark");

/**
 * Adds a new task to the list
 */
function addTask() {
  const text = taskInput.value.trim();

  if (!text) {
    alert("Task cannot be empty");
    return;
  }

  const taskItem = createTaskElement(text);
  taskList.appendChild(taskItem);

  taskInput.value = "";
}

/**
 * Creates a task list element
 * @param {string} text
 * @returns {HTMLElement}
 */
function createTaskElement(text) {
  const li = document.createElement("li");

  li.className =
    "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded";

  li.innerHTML = `
    <span class="text-gray-800 dark:text-white">${text}</span>
    <button class="delete bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
      X
    </button>
  `;

  return li;
}

/**
 * Deletes a task when clicking the delete button
 */
function deleteTask(event) {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
  }
}

/**
 * Filters tasks based on search input
 */
function filterTasks() {
  const value = searchInput.value.toLowerCase();
  const tasks = document.querySelectorAll("#taskList li");

  tasks.forEach((task) => {
    const text = task.innerText.toLowerCase();
    task.style.display = text.includes(value) ? "flex" : "none";
  });
}

/**
 * Toggles dark mode
 */
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
}

addTaskButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);
searchInput.addEventListener("input", filterTasks);
toggleDarkModeButton.addEventListener("click", toggleDarkMode);