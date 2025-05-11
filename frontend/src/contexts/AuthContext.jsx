// AuthContext.jsx
import React, { useState } from "react";
import { AuthContext } from "./AuthContextInstance";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { authApi } from "../api/auth.api"; // Asegúrate de que la ruta sea correcta

export const AuthProvider = ({ children }) => {
  // Estado unificado con todos los datos de autenticación
  const [authState, setAuthState] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : {
          token: null,
          role: null,
          user: null,
          isAuthenticated: false,
        };
  });

  const navigate = useNavigate();

  const login = (token, userData) => {
    console.log("Datos de usuario AuthContext:", userData); // Para depuración

    const newAuthState = {
      token,
      role: userData.rol, // Extrae el rol de userData
      user: {
        id: userData.id,
        auth_id: userData.auth_id,
        name: userData.nombre || userData.name,
        email: userData.email,
        phone: userData.telefono || userData.phone,
      },
      isAuthenticated: true,
    };

    // Solo una vez
    setAuthState(newAuthState);
    localStorage.setItem("auth", JSON.stringify(newAuthState));
  };

const logout = async () => {
  try {
    // 1. Cerrar sesión usando la API
    await authApi.logout();

    // 2. Limpiar estado local
    setAuthState({
      token: null,
      role: null,
      user: null,
      isAuthenticated: false,
    });

    // 3. Limpiar almacenamiento
    localStorage.removeItem("auth");
    localStorage.removeItem('sb-access-token');
    localStorage.removeItem('sb-refresh-token');
    sessionStorage.clear();

    // 4. Redirigir
    navigate("/login");
  } catch (error) {
    console.error("Error en logout:", error);
    // Opcional: Mostrar mensaje de error al usuario
    throw error; // Re-lanzar el error para que pueda ser manejado por el componente
  }
};

  // Función que define la ruta de redirección según el rol
  const getRedirectPath = (role) => {
    switch (role) {
      case "admin":
        return "/admin"; // Página de administración
      case "user":
      default:
        return "/dashboard"; // Página de usuario normal
    }
  };

  const register = async (userData) => {
    try {
      // 1. Registrar al usuario
      const registeredUser = await authApi.registerUser(userData);

      // 2. Iniciar sesión automáticamente
      const authData = await authApi.login(userData.email, userData.password);

      // 3. Actualizar estado
      const newAuthState = {
        token: authData.token,
        role: authData.role,
        user: {
          id: authData.id,
          auth_id: authData.auth_id,
          name: authData.nombre || userData.nombre,
          email: authData.email,
          phone: authData.telefono || userData.telefono,
        },
        isAuthenticated: true,
      };

      setAuthState(newAuthState);
      localStorage.setItem("auth", JSON.stringify(newAuthState));

      // 4. Redirigir
      navigate(getRedirectPath(authData.role));

      return registeredUser;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState, // Incluye token, role, user e isAuthenticated
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
