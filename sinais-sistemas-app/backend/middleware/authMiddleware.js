// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Pega o token do header
  const token = req.header('Authorization');

  // Verifica se não há token
  if (!token) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada.' });
  }

  // O token vem no formato "Bearer <token>". Precisamos extrair apenas o token.
  const tokenString = token.split(' ')[1];
  if (!tokenString) {
    return res.status(401).json({ msg: 'Formato de token inválido.' });
  }

  // Verifica o token
  try {
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    // Adiciona o payload do usuário (que contém o ID) ao objeto da requisição
    req.user = decoded.user;
    next(); // Passa para a próxima função/controller
  } catch (err) {
    res.status(401).json({ msg: 'Token não é válido.' });
  }
};