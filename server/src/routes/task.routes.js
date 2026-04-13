const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Aquí solo ponemos '/' porque el resto ya está en el index.js
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;