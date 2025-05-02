// hooks/useLogin.js
import { useAuth } from './useAuth';
import { authApi } from '../api/auth.api';

export const useLogin = () => {
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      login(response.token, response.role, {
        id: response.id,
        auth_id: response.auth_id, // Nuevo campo
        nombre: response.nombre,
        email: response.email,
        telefono: response.telefono
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  return { handleLogin };
};