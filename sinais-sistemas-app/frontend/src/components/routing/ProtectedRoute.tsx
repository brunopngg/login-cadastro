// frontend/src/components/routing/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Mostra uma tela de carregamento enquanto verifica o token
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  // Renderiza o conteúdo da rota se estiver autenticado
  return <Outlet />;
};

export default ProtectedRoute;