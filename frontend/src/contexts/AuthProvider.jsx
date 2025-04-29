import React from 'react';
import { AuthProvider } from './AuthContext';  // Importa el contexto
import App from '../App';

const AuthWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AuthWrapper;
