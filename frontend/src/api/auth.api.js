const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Así accedes a la variable del .env.local

const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      // Asegúrate de incluir /api/auth
      method: "POST",
      mode: "cors",
      credentials: "include", // Importante para manejar cookies/tokens
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Respuesta del servidor:", response); // Para depuración

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Credenciales incorrectas");
    }

    const result  = await response.json();

    const { token, rol, id, auth_id, nombre, email: userEmail, telefono } = result.data;

    console.log("Datos recibidos:", result.data); // Para depuración

    // Asegúrate que esta estructura coincide con lo que devuelve el backend
    return result.data;

  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw new Error(error.message || "Error al conectar con el servidor");
  }
};

export const fetchUserRole = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/user-role`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener el rol del usuario");
    }

    const data = await response.json();
    return data.role;
  } catch (error) {
    throw new Error(error.message);
  }
};

// auth.api.js
export const registerUser = (formData, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', `${BASE_URL}/api/auth/register`);
    xhr.withCredentials = true; // Equivalente a credentials: "include"

    // Configurar el evento de progreso
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    });

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (error) {
          reject(new Error('Error al parsear la respuesta'));
        }
      } else {
        try {
          const errorData = JSON.parse(xhr.responseText);
          reject(new Error(errorData.error || 'Error en el registro'));
        } catch {
          reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Error de conexión'));
    };

    xhr.send(formData);
  });
};

// Añade al objeto exportado
export const authApi = {
  login,
  fetchUserRole,
  registerUser,
};