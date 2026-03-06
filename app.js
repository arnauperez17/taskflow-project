const taskInput = document.getElementById("taskInput")
const addTask = document.getElementById("addTask")
const taskList = document.getElementById("taskList")
const search = document.getElementById("search")
const toggleDark = document.getElementById("toggleDark")

addTask.addEventListener("click", () => {

  const text = taskInput.value.trim()

  if (text === "") return

  const li = document.createElement("li")

  li.className = "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded"

  li.innerHTML = `
    <span class="text-gray-800 dark:text-white">${text}</span>
    <button class="delete bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
      X
    </button>
  `

  taskList.appendChild(li)

  taskInput.value = ""
})

taskList.addEventListener("click", (e) => {

  if (e.target.classList.contains("delete")) {

    e.target.parentElement.remove()

  }

})

search.addEventListener("input", () => {

  const value = search.value.toLowerCase()

  const tasks = document.querySelectorAll("#taskList li")

  tasks.forEach(task => {

    const text = task.innerText.toLowerCase()

    if (text.includes(value)) {

      task.style.display = "flex"

    } else {

      task.style.display = "none"

    }

  })

})

toggleDark.addEventListener("click", () => {

  document.documentElement.classList.toggle("dark")

})