const taskInput = document.getElementById("taskInput")
const addTask = document.getElementById("addTask")
const taskList = document.getElementById("taskList")
const search = document.getElementById("search")
const toggleDark = document.getElementById("toggleDark")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTasks() {

  taskList.innerHTML = ""

  tasks.forEach((task, index) => {

    const li = document.createElement("li")

    li.className = "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded"

    const span = document.createElement("span")
    span.textContent = task.text
    span.className = task.completed ? "line-through text-gray-400" : ""

    span.addEventListener("click", () => {

      task.completed = !task.completed
      saveTasks()
      renderTasks()

    })

    const deleteBtn = document.createElement("button")

    deleteBtn.textContent = "X"
    deleteBtn.className = "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"

    deleteBtn.addEventListener("click", () => {

      tasks.splice(index, 1)
      saveTasks()
      renderTasks()

    })

    li.appendChild(span)
    li.appendChild(deleteBtn)

    taskList.appendChild(li)

  })
}

addTask.addEventListener("click", () => {

  const text = taskInput.value.trim()

  if (text === "") return

  tasks.push({
    text: text,
    completed: false
  })

  taskInput.value = ""

  saveTasks()
  renderTasks()

})

search.addEventListener("input", () => {

  const value = search.value.toLowerCase()

  const listItems = document.querySelectorAll("#taskList li")

  listItems.forEach(item => {

    const text = item.innerText.toLowerCase()

    if (text.includes(value)) {
      item.style.display = "flex"
    } else {
      item.style.display = "none"
    }

  })

})

toggleDark.addEventListener("click", () => {

  document.documentElement.classList.toggle("dark")

})

renderTasks()