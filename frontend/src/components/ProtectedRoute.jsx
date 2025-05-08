import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextInstance';
import { Navigate, Outlet  } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { token, role } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
