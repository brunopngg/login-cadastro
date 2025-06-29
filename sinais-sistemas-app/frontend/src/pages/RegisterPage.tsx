// frontend/src/pages/RegisterPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import type { AuthResponse } from '../interfaces/user.interface';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = (data: AuthResponse) => {
    console.log('Registro bem-sucedido!', data);
    // Normalmente, após o registro, você redireciona para o login
    alert('Registro realizado com sucesso! Por favor, faça o login.');
    navigate('/login'); 
  };

  return (
    <div>
      <h1>Página de Registro</h1>
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
}
export default RegisterPage;