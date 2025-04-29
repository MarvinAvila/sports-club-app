// AuthContext.jsx
import React, { useState } from 'react';
import { AuthContext } from './AuthContextInstance';
import { useNavigate } from 'react-router-dom'; // Necesario para redirección

// Componente que proporciona el contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const navigate = useNavigate(); // Para redirigir después del login

  // Función para iniciar sesión
  const login = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
    localStorage.setItem('token', newToken); // Guardar en localStorage
    localStorage.setItem('role', newRole);   // Guardar en localStorage
    navigate(getRedirectPath(newRole)); // Redirige según el rol
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirige a login después de cerrar sesión
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
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

