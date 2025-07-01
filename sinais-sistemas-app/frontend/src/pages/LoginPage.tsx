// frontend/src/pages/LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';
import type { AuthResponse } from '../interfaces/user.interface';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = (data: AuthResponse) => {
    login(data.token, data.user);
    navigate('/'); // Redireciona para a HomePage
  };

  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;