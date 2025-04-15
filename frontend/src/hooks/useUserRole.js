import { useState, useEffect } from 'react';
import { fetchUserRole } from '../api/auth.api';

export const useUserRole = () => {
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      const userRole = await fetchUserRole();
      setRole(userRole);
      setLoading(false);
    };

    getRole();
  }, []);

  return { role, loading };
};