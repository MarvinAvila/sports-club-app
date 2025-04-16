import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { fetchUserRole } from '@/api/auth.api'; // Añade esta importación

export function AuthProvider({ children, initialSession }) {
  const [user, setUser] = useState(initialSession?.user || null);
  const [role, setRole] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async (user) => {
      if (user) {
        const userRole = await fetchUserRole(); // Usa tu hook o API
        setRole(userRole);
      }
      setLoading(false);
    };
  
    fetchRole(initialSession?.user);
  },[initialSession?.user]);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
    const userRole = await fetchUserRole(); // Actualiza el rol después de login
    console.log("[DEBUG] Usuario con rol:", userRole); 
    setRole(userRole);
  };

  const logout = async () => {
    await supabase.auth.signOut(); 
    setUser(null);
    setRole(null); // Restablece a rol por defecto
    localStorage.clear(); // Limpia almacenamiento local si usas persistencia
  };

  // Elimina la variable 'value' y usa el objeto directamente
  return (
    <AuthContext.Provider value={{ 
      user,
      role,
      login,
      logout,
      isAuthenticated: !!user,
      loading, // <-- también lo expones aquí
    }}>
      {children}
    </AuthContext.Provider>
  );
 
}

export default AuthProvider; 