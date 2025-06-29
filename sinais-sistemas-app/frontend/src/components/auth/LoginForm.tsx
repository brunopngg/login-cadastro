// frontend/src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import AuthService from '../../services/authService';
import type { LoginData } from '../../services/authService';
import type { AuthResponse } from '../../interfaces/user.interface';

interface LoginFormProps {
  onLoginSuccess: (data: AuthResponse) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const credentials: LoginData = { email, password_hash: password };
      const data = await AuthService.login(credentials);
      onLoginSuccess(data);
    } catch (err) {
      // Tratamento de erro seguro e limpo
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  // O JSX do formulário continua o mesmo...
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="login-email">Email:</label>
        <input
          type="email"
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="login-password">Senha:</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};

export default LoginForm;