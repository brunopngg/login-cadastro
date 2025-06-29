// frontend/src/interfaces/user.interface.ts
export interface User {
  user_id: number; // ou string se estiver usando UUID
  username: string;
  email: string;
  created_at: string; // ou Date, dependendo de como você lida com datas
}

export interface AuthResponse {
  token: string;
  user: User;
}