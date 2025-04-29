const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Así accedes a la variable del .env.local

const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Credenciales incorrectas');
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return {
      token: data.token,
      role: data.role,
    };
  } catch (error) {
    throw new Error(error.message);
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