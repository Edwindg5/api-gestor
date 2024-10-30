const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.getTasks); // Obtener todas las tareas con filtros y paginación
router.get('/tasks/:id', taskController.getTaskById); // Obtener una tarea específica
router.post('/tasks', taskController.createTask); // Crear una nueva tarea
router.put('/tasks/:id', taskController.updateTask); // Actualizar una tarea
router.put('/tasks/:id/complete', taskController.markTaskAsCompleted); // Marcar una tarea como completada
router.delete('/tasks/:id', taskController.deleteTask); // Eliminar una tarea
router.get('/tasks/search', taskController.searchTasks); // Buscar tareas por título o descripción

module.exports = router;
