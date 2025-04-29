import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextInstance';
import { Navigate  } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext); // Obtener el token del contexto

  if (!token) {
    return <Navigate  to="/login" />; // Si no está autenticado, redirige al login
  }

  return children; // Si está autenticado, renderiza los hijos
};

export default ProtectedRoute;
