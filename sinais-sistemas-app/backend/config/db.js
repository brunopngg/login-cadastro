// backend/config/db.js
const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' }); // Ajuste o caminho se necessário para encontrar o .env

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('Conectado ao PostgreSQL! 🐘');
});

pool.on('error', (err) => {
  console.error('Erro inesperado no cliente idle do pool', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // Exporte o pool se precisar de transações mais complexas
};