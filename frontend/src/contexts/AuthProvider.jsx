import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { fetchUserRole } from '@/api/auth.api'; // Añade esta importación

export function AuthProvider({ children, initialSession }) {
  const [user, setUser] = useState(initialSession?.user || null);
  const [role, setRole] = useState('user'); 

  useEffect(() => {
    const fetchRole = async (user) => {
      if (user) {
        const userRole = await fetchUserRole(); // Usa tu hook o API
        setRole(userRole);
      }
    };
  
    fetchRole(initialSession?.user);
  },[initialSession?.user]);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
    const userRole = await fetchUserRole(); // Actualiza el rol después de login
    setRole(userRole);
  };

  const logout = async () => {
    await supabase.auth.signOut(); 
    setUser(null);
    setRole('user'); // Restablece a rol por defecto
    localStorage.clear(); // Limpia almacenamiento local si usas persistencia
  };

  // Elimina la variable 'value' y usa el objeto directamente
  return (
    <AuthContext.Provider value={{ 
      user,
      role,
      login,
      logout,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
 
}

export default AuthProvider; 