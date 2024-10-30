// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register); // Ruta para registrar un nuevo usuario
router.post('/login', authController.login); // Ruta para iniciar sesión

module.exports = router;
