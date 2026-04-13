let tasks = [
    { id: "1", titulo: "Tarea de prueba", prioridad: "Alta", completada: false }
];

const obtenerTodas = () => tasks;
const crearTarea = (data) => {
    const nueva = { id: Date.now().toString(), ...data, completada: false };
    tasks.push(nueva);
    return nueva;
};
const eliminarTarea = (id) => {
    tasks = tasks.filter(t => t.id !== id);
};

module.exports = { obtenerTodas, crearTarea, eliminarTarea };