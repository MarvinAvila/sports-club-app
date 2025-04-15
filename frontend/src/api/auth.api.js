import { supabase } from '@/lib/supabaseClient'; 

// Simulación de API de autenticación
export const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }

      const isAdmin = email.includes('admin@');
      resolve({
        user: {
          email,
          role: isAdmin ? 'admin' : 'user',
          name: isAdmin ? 'Administrator' : 'Regular User'
        },
        token: 'fake-jwt-token'
      });
    }, 1000);
  });
};

export const registerUser = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }

      resolve({
        user: {
          ...userData,
          role: 'user' // Todos los registros son usuarios normales
        },
        token: 'fake-jwt-token'
      });
    }, 1000);
  });
};

export const fetchUserRole = async () => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user-role`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener el rol');
    }

    const { role } = await response.json();
    return role || 'user'; // Valor por defecto
  } catch (error) {
    console.error('Error fetching user role:', error.message);
    return 'user'; // Rol por defecto en caso de error
  }
};