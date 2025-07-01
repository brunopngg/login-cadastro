// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db'); // Importa o objeto db inteiro

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor PERN para Sinais e Sistemas está rodando! 🐧');
});

// Definir Rotas da API
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
  await db.testConnection(); // <<< LINHA ADICIONADA: Testa a conexão ao iniciar
});