// frontend/src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Simulação de login (substitua pela chamada real à API)
      const fakeUser = {
        user_id: 1,
        username: 'Usuário Teste',
        email,
        created_at: new Date().toISOString()
      };
      const fakeToken = 'fake-jwt-token';

      login(fakeToken, fakeUser);
      alert('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default LoginPage;
