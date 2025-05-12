const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Así accedes a la variable del .env.local
import { supabase } from "@/lib/supabaseClient";

const login = async (email, password) => {
  try {
    // 1. Limpiar sesiones previas
    await supabase.auth.signOut();
    localStorage.removeItem("sb-access-token");
    localStorage.removeItem("sb-refresh-token");

    // 2. Autenticar con Supabase
    const { data: supabaseData, error: supabaseError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (supabaseError) {
      throw new Error(supabaseError.message || "Credenciales incorrectas");
    }

    // 3. Verificar con tu backend si es necesario
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseData.session.access_token}`,
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      await supabase.auth.signOut();
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en autenticación");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

export const fetchUserRole = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/user-role`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
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
export const registerTutorWithAlumno = async (formData, files, onProgress) => {
  const formDataToSend = new FormData();

  // Agregar campos del formulario
  Object.keys(formData).forEach(key => {
    formDataToSend.append(key, formData[key]);
  });

  // Agregar archivos
  Object.keys(files).forEach(key => {
    if (files[key]) {
      formDataToSend.append(key, files[key]);
    }
  });

  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      body: formDataToSend,
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || 'Error en el registro');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en registerTutorWithAlumno:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // 1. Obtener el token actual de Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
      throw new Error("No hay sesión activa");
    }

    // 2. Cerrar sesión en el backend
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en logout backend:", errorData);
      throw new Error(errorData.error || "Error al cerrar sesión");
    }

    // 3. Cerrar sesión en Supabase
    const { error: supabaseError } = await supabase.auth.signOut();
    if (supabaseError) throw supabaseError;

    return await response.json();
  } catch (error) {
    console.error("Error en logout:", error);
    throw error;
  }
};

// Actualiza tu objeto exportado
export const authApi = {
  login,
  logout, // <-- Añade la nueva función aquí
  fetchUserRole,
  registerTutorWithAlumno,
};
