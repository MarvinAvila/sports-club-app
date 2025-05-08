import { useAuth } from './useAuth';
import { authApi } from '../api/auth.api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.login(email, password);
      console.log('Respuesta completa UseLogin:', response); // Para depuración


      // Usa response.rol (del backend) en lugar de response.role
      await login(
        response.token,
        {
          id: response.user.id, // Accede a través de response.user
          auth_id: response.user.auth_id,
          nombre: response.user.nombre,
          email: response.user.email,
          telefono: response.user.telefono,
          rol: response.user.rol // Asegúrate de incluir el rol
        }
      );

    // Redirige basado en el rol
    const userRole = response.user.rol;
    console.log('Redirigiendo con rol:', userRole);
    
    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }

    return response;
    } catch (error) {
      console.error('Error en handleLogin:', error);
      setError(error.message || 'Error al iniciar sesión');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
};