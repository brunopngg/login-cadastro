// backend/models/userModel.js
const db = require('../config/db'); // Nosso pool de conexão do PostgreSQL
const bcrypt = require('bcryptjs');

const User = {};

User.create = async (username, email, password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const queryText = 'INSERT INTO users(username, email, password_hash) VALUES($1, $2, $3) RETURNING user_id, username, email, created_at';
  const values = [username, email, passwordHash];

  try {
    const { rows } = await db.query(queryText, values);
    return rows[0];
  } catch (err) {
    console.error('Erro ao criar usuário:', err.stack);
    throw err; // Propaga o erro para o controller tratar
  }
};

User.findByEmail = async (email) => {
  const queryText = 'SELECT * FROM users WHERE email = $1';
  try {
    const { rows } = await db.query(queryText, [email]);
    return rows[0];
  } catch (err) {
    console.error('Erro ao buscar usuário por email:', err.stack);
    throw err;
  }
};

User.findById = async (id) => {
    const queryText = 'SELECT user_id, username, email, created_at FROM users WHERE user_id = $1';
    try {
      const { rows } = await db.query(queryText, [id]);
      return rows[0];
    } catch (err) {
      console.error('Erro ao buscar usuário por ID:', err.stack);
      throw err;
    }
  };

module.exports = User;