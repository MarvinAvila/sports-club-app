// AuthContext.jsx
import React, { useState } from 'react';
import { AuthContext } from './AuthContextInstance';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  // Estado unificado con todos los datos de autenticación
  const [authState, setAuthState] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : {
      token: null,
      role: null,
      user: null,
      isAuthenticated: false
    };
  });

  const navigate = useNavigate();

  const login = (token, role, userData) => {
    const newAuthState = {
      token,
      role,
      user: {
        id: userData.id,
        auth_id: userData.auth_id,
        name: userData.nombre || userData.name,
        email: userData.email,
        phone: userData.telefono || userData.phone
      },
      isAuthenticated: true,
    };
    
    // Solo una vez
    setAuthState(newAuthState);
    localStorage.setItem('auth', JSON.stringify(newAuthState));
    
    // Redirigir basado en el rol
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  const logout = () => {
    setAuthState({
      token: null,
      role: null,
      user: null,
      isAuthenticated: false
    });
    localStorage.removeItem('auth');
    navigate('/login');
  };

  // Función que define la ruta de redirección según el rol
  const getRedirectPath = (role) => {
    switch(role) {
      case 'admin':
        return '/admin'; // Página de administración
      case 'user':
      default:
        return '/dashboard'; // Página de usuario normal
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState, // Incluye token, role, user e isAuthenticated
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};