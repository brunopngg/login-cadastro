// frontend/src/services/authService.ts

// Importe o apiClient e AxiosError
import apiClient from './api';
import { AxiosError } from 'axios';

// Suas interfaces e tipos de dados permanecem os mesmos
import type { AuthResponse } from '../interfaces/user.interface';

export interface RegisterData {
  username: string;
  email: string;
  password_hash: string;
}

export interface LoginData {
  email: string;
  password_hash: string;
}

// Função auxiliar para extrair a mensagem de erro
const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Erro vindo da resposta da API (ex: email já existe, senha incorreta)
    // Acessamos 'error.response.data.msg' que é onde colocamos nossa mensagem no backend
    return error.response?.data?.msg || 'Ocorreu um erro na comunicação com o servidor.';
  }
  if (error instanceof Error) {
    // Erro genérico de JavaScript (ex: problema de rede)
    return error.message;
  }
  // Caso o erro não seja de um tipo conhecido
  return 'Ocorreu um erro desconhecido.';
};

const AuthService = {
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', userData);
      return response.data;
    } catch (error) {
      // Lança um novo erro com a mensagem tratada
      throw new Error(getErrorMessage(error));
    }
  },

  login: async (credentials: LoginData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      // Lança um novo erro com a mensagem tratada
      throw new Error(getErrorMessage(error));
    }
  },
};

export default AuthService;