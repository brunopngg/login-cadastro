// backend/controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Por favor, insira todos os campos.' });
  }

  try {
    let user = await User.findByEmail(email);
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe com este email.' });
    }

    // Validação adicional (ex: complexidade da senha) pode ser adicionada aqui

    const newUser = await User.create(username, email, password);

    // Gerar token JWT
    const payload = {
      user: {
        id: newUser.user_id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // Expira em 1 hora (3600 segundos)
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          token,
          user: {
            id: newUser.user_id,
            username: newUser.username,
            email: newUser.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor ao registrar.');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Por favor, insira todos os campos.' });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas (email).' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas (senha).' });
    }

    const payload = {
      user: {
        id: user.user_id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // Expira em 1 hora
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.user_id,
            username: user.username,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor ao fazer login.');
  }
};

// Opcional: Rota para buscar dados do usuário logado (protegida)
exports.getLoggedInUser = async (req, res) => {
    try {
      // req.user é adicionado pelo middleware de autenticação (que criaremos depois)
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  };