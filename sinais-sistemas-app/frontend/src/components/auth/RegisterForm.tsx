// frontend/src/components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import AuthService from '../../services/authService';
import type { RegisterData } from '../../services/authService';
import type { AuthResponse } from '../../interfaces/user.interface';

interface RegisterFormProps {
  onRegisterSuccess: (data: AuthResponse) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const registerData: RegisterData = { username, email, password: password };
      const data = await AuthService.register(registerData);
      onRegisterSuccess(data);
    } catch (err) {
      // Agora 'err' é um objeto Error padrão, e podemos acessar 'err.message' com segurança.
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
      console.error("Erro no registro:", err);
    } finally {
      setLoading(false);
    }
  };

  // O JSX do formulário continua o mesmo...
  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="reg-username">Usuário:</label>
        <input
          type="text"
          id="reg-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="reg-email">Email:</label>
        <input
          type="email"
          id="reg-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="reg-password">Senha:</label>
        <input
          type="password"
          id="reg-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  );
};

export default RegisterForm;