// backend/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // Adiciona um timeout para a conexão
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Erro inesperado no cliente idle do pool', err);
  process.exit(-1);
});

// Nova função para testar a conexão
const testConnection = async () => {
  let client;
  try {
    client = await pool.connect();
    console.log('Conectado ao PostgreSQL! 🐘');
    client.release();
  } catch (err) {
    console.error('Falha ao conectar ao PostgreSQL:', err.message);
    // Se a conexão falhar, pode ser útil fechar a aplicação para evitar mais erros.
    // process.exit(1); 
  }
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  testConnection, // Exporta a nova função
};