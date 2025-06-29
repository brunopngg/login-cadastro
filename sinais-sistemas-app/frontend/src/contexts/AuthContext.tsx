// frontend/src/contexts/AuthContext.tsx

import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../interfaces/user.interface';
import apiClient from '../services/api';
import { AuthContext } from './AuthContextObject';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await apiClient.get<User>('/auth/user');
          if (response.data) {
            setUser(response.data);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Falha ao validar token. Removendo token.', error);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    loadUserFromToken();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
  };


  