import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextInstance'; 

// Hook para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
