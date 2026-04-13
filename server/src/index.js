require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// --- 1. CONFIGURACIÓN ---
app.use(cors()); // Vital para conectar con el puerto 5500
app.use(express.json()); // Vital para leer las tareas que envíes

// --- 2. RUTAS ---
// Al poner '/api/v1/tasks', el navegador ya encontrará lo que buscas
app.use('/api/v1/tasks', taskRoutes);

// --- 3. ERRORES ---
app.use(errorHandler);

// --- 4. LANZAMIENTO ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en: http://localhost:${PORT}/api/v1/tasks`);
});