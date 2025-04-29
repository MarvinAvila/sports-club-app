import { useState, useEffect } from 'react';
import { fetchUserRole } from '../api/auth.api';

export const useUserRole = () => {
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[useUserRole] montado');
    const getRole = async () => {
      const userRole = await fetchUserRole();
      console.log('[useUserRole] rol obtenido:', userRole);
      setRole(userRole);
      setLoading(false);
    };

    getRole();
  }, []);

  return { role, loading };
};
