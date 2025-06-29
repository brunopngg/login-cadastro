// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Importar a configuração do banco de dados para inicializar a conexão
require('./config/db'); // Adicione esta linha para testar/confirmar a conexão

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor PERN para Sinais e Sistemas está rodando! 🐧');
});

// Definir Rotas da API
app.use('/api/auth', require('./routes/auth')); // Adicione esta linha

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});