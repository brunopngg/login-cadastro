// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // <-- Importe o middleware

// ... rotas de register e login ...
router.post('/register', authController.register);
router.post('/login', authController.login);

// @route   GET api/auth/user
// @desc    Obter dados do usuário logado
// @access  Private (agora está protegida pelo middleware)
router.get('/user', authMiddleware, authController.getLoggedInUser); // <-- Adicione esta rota

module.exports = router;