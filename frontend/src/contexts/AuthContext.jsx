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

  const login = (newToken, userData) => {
    const newAuthState = {
      token: newToken,
      role: userData.role,
      user: userData.user,
      isAuthenticated: true
    };
    
    // Guardar en estado y localStorage
    setAuthState(newAuthState);
    localStorage.setItem('auth', JSON.stringify(newAuthState));
    
    // Redirigir inmediatamente basado en el rol
    const redirectPath = userData.role === 'admin' ? '/admin' : '/dashboard';
    navigate(redirectPath);
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