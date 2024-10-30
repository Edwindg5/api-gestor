const db = require('../config/db');

// Obtener todas las tareas con paginación y filtro por estado
exports.getTasks = (req, res) => {
    const { page = 1, limit = 10, completed } = req.query;
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM tasks';
    const params = [];

    if (completed !== undefined) {
        query += ' WHERE completed = ?';
        params.push(completed === 'true');
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    db.query(query, params, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener tareas' });
        }
        res.json(results);
    });
};

// Obtener una tarea específica
exports.getTaskById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM tasks WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la tarea' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una nueva tarea
exports.createTask = (req, res) => {
    const { title, description } = req.body;

    db.query(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description],
        (error, results) => {
            if (error) {
                return res.status(400).json({ error: 'Error al crear la tarea' });
            }
            res.status(201).json({ id: results.insertId, title, description, completed: false });
        }
    );
};

// Actualizar una tarea
exports.updateTask = (req, res) => {
    const { title, description, completed } = req.body;
    db.query(
        'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
        [title, description, completed, req.params.id],
        (error) => {
            if (error) {
                return res.status(400).json({ error: 'Error al actualizar la tarea' });
            }
            res.json({ id: req.params.id, title, description, completed });
        }
    );
};

// Marcar una tarea como completada
exports.markTaskAsCompleted = (req, res) => {
    const { id } = req.params;
    db.query(
        'UPDATE tasks SET completed = true WHERE id = ?',
        [id],
        (error) => {
            if (error) {
                return res.status(500).json({ error: 'Error al marcar la tarea como completada' });
            }
            res.json({ message: 'Tarea marcada como completada' });
        }
    );
};

// Eliminar una tarea
exports.deleteTask = (req, res) => {
    db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (error) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la tarea' });
        }
        res.json({ message: 'Tarea eliminada' });
    });
};

// Buscar tareas por título o descripción
exports.searchTasks = (req, res) => {
    const { query } = req.query;
    db.query(
        'SELECT * FROM tasks WHERE title LIKE ? OR description LIKE ?',
        [`%${query}%`, `%${query}%`],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al buscar tareas' });
            }
            res.json(results);
        }
    );
};
