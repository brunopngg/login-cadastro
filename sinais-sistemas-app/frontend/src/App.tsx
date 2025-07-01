import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import './App.css';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Agora, a rota principal ("/") está protegida. 
            Se o utilizador estiver autenticado, verá a HomePage.
            Caso contrário, será redirecionado para a página de login.
          */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Se um utilizador já autenticado tentar aceder ao /login, redireciona-o para a home */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} 
          />  

        </Routes>
      </div>
    </Router>
  );
};

export default App;