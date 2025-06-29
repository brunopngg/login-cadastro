// frontend/src/hooks/useAuth.ts

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Importamos o contexto que acabamos de exportar

// A definição do hook agora vive aqui, em seu próprio arquivo.
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};