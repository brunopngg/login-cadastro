// frontend/src/components/routing/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
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
  return <>{children}</>;
};

export default ProtectedRoute;