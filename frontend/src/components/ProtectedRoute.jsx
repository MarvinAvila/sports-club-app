import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, role } = useContext(AuthContext);
  
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  if (role === null) {
    // ⏳ Mientras se carga el rol, no mostrar nada o un loader
    return <div>Cargando...</div>; // O spinner
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};