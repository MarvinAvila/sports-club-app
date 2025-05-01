const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Así accedes a la variable del .env.local


const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, { // Asegúrate de incluir /api/auth
      method: 'POST',
      mode: 'cors',
      credentials: 'include', // Importante para manejar cookies/tokens
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Respuesta del servidor:', response); // Para depuración

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Credenciales incorrectas');
    }

    const data = await response.json();
    console.log('Datos recibidos:', data); // Para depuración
    
    return {
      token: data.token || data.session?.access_token,
      role: data.role || data.rol,
      user: {
        name: data.nombre || data.user?.name,
        email: data.email || data.user?.email,
        phone: data.telefono || data.user?.phone
      }
    };
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw new Error(error.message || 'Error al conectar con el servidor');
  }
};

export const fetchUserRole = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/role`, { // <-- Aquí también
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('No se pudo obtener el rol del usuario');
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data.role;

  } catch (error) {
    throw new Error(error.message);
  }
};


export const authApi = {
  login,
  fetchUserRole, // Exporta la función para obtener el rol del usuario
};