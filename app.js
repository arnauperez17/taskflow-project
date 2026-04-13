/**
 * TaskFlow - Frontend Logic (Fase D: Transparencia de red)
 * Conectado al servidor Node.js + Express
 */

const API_URL = 'http://localhost:5000/api/v1/tasks';

// Referencias al DOM
const body = document.getElementById('body');
const card = document.getElementById('card');
const title = document.getElementById('title');
const themeBtn = document.getElementById('theme-toggle');
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

let isDarkMode = false;

// 1. MODO OSCURO (UI pura)
themeBtn.onclick = () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        body.style.backgroundColor = "#1a1a1a";
        card.style.backgroundColor = "#2d2d2d";
        title.style.color = "#ffffff";
        themeBtn.textContent = "☀️";
        themeBtn.style.background = "#444";
        themeBtn.style.color = "white";
    } else {
        body.style.backgroundColor = "#f0f2f5";
        card.style.backgroundColor = "white";
        title.style.color = "#333";
        themeBtn.textContent = "🌙";
        themeBtn.style.background = "#eee";
        themeBtn.style.color = "black";
    }
};

// 2. OBTENER TAREAS AL CARGAR (GET)
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener las tareas');
        const tasks = await response.json();
        
        taskList.innerHTML = ''; // Limpiar lista
        tasks.forEach(task => renderTask(task));
        updateCount(tasks.length);
    } catch (error) {
        console.error('Estado de error:', error.message);
    }
}

// 3. AÑADIR TAREA (POST)
addBtn.onclick = async () => {
    const text = taskInput.value.trim();
    if (!text) return;

    const category = document.getElementById('category-select').value;
    const priority = document.getElementById('priority-select').value;

    // Objeto que enviamos al Backend (Contrato de red)
    const taskData = {
        titulo: text,
        prioridad: priority,
        categoria: category
    };

    try {
        // Estado de carga
        addBtn.disabled = true;
        addBtn.textContent = "...";

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al crear la tarea');
        }

        const newTask = await response.json();
        renderTask(newTask);
        taskInput.value = "";
        
        // Actualizar contador visual
        const currentCount = parseInt(taskCount.innerText);
        updateCount(currentCount + 1);

    } catch (error) {
        alert("❌ Error de red: " + error.message);
    } finally {
        addBtn.disabled = false;
        addBtn.textContent = "+";
    }
};

// 4. ELIMINAR TAREA (DELETE)
async function deleteTask(id, element) {
    if (!confirm("¿Eliminar esta tarea?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('No se pudo eliminar');

        element.remove();
        const currentCount = parseInt(taskCount.innerText);
        updateCount(currentCount - 1);

    } catch (error) {
        alert("❌ No se pudo borrar: " + error.message);
    }
}

// 5. RENDERIZADO (UI)
function renderTask(task) {
    let bgColor, borderColor, textColor;
    
    // Asignación de colores según prioridad (Lógica visual)
    if (task.prioridad === "Alta") {
        bgColor = "#ffebee"; borderColor = "#f44336"; textColor = "#b71c1c";
    } else if (task.prioridad === "Media") {
        bgColor = "#fffde7"; borderColor = "#fdd835"; textColor = "#827717";
    } else {
        bgColor = "#e8f5e9"; borderColor = "#4caf50"; textColor = "#1b5e20";
    }

    const item = document.createElement('div');
    item.style.display = "flex";
    item.style.justifyContent = "space-between";
    item.style.alignItems = "center";
    item.style.padding = "12px";
    item.style.marginTop = "10px";
    item.style.borderRadius = "8px";
    item.style.backgroundColor = bgColor;
    item.style.borderLeft = `6px solid ${borderColor}`;
    item.style.color = textColor;

    item.innerHTML = `
        <span><strong>${task.titulo}</strong></span>
        <button style="background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; padding: 5px 10px;">X</button>
    `;

    // Evento para el botón X
    item.querySelector('button').onclick = () => deleteTask(task.id, item);

    taskList.appendChild(item);
}

function updateCount(num) {
    taskCount.innerText = num;
}

// Inicializar la App cargando datos del servidor
loadTasks();