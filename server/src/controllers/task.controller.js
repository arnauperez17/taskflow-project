const taskService = require('../services/task.service');

const getTasks = (req, res) => {
    console.log("📢 Alguien está pidiendo las tareas...");
    const tasks = taskService.obtenerTodas();
    res.status(200).json(tasks);
};

const createTask = (req, res) => {
    const { titulo, prioridad } = req.body;
    
    if (!titulo) {
        return res.status(400).json({ error: "El título es obligatorio" });
    }

    const nuevaTarea = taskService.crearTarea({ titulo, prioridad });
    res.status(201).json(nuevaTarea);
};

const deleteTask = (req, res) => {
    try {
        const { id } = req.params;
        taskService.eliminarTarea(id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: "No se encontró la tarea" });
    }
};

module.exports = { getTasks, createTask, deleteTask };