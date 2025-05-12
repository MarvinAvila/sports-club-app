import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiSettings,
  FiMoon,
  FiSun,
  FiLogOut,
  FiMail,
  FiHelpCircle,
  FiChevronDown,
} from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext"; // Importa el contexto del tema

const ProfileDropdown = ({ user, role = "Usuario" }) => {
  const { logout, user: authUser } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Usa el contexto del tema
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

const handleLogout = async () => {
  setIsLoggingOut(true);
  try {
    await logout();
    // Redirigir después de cerrar sesión
    navigate("/login");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    // Mostrar mensaje de error al usuario si lo deseas
  } finally {
    setIsLoggingOut(false);
  }
};

  useEffect(() => {
    // Cerrar dropdown al hacer clic fuera
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Datos reales del usuario desde auth o props
  const userData = {
    name: authUser?.name || user?.name || role,
    email:
      authUser?.email || user?.email || `${role.toLowerCase()}@escuela.com`,
    avatar: authUser?.avatar || user?.avatar,
  };

 return (
  <div className={`relative ${theme === "dark" ? "dark" : ""}`} ref={dropdownRef}>
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center space-x-2 focus:outline-none group"
      aria-label="Menú de perfil"
    >
      <div className="flex items-center">
        <div
          className={`h-9 w-9 rounded-full ${
            theme === "dark"
              ? "bg-gradient-to-br from-purple-600 to-blue-600"
              : "bg-gradient-to-br from-purple-500 to-blue-500"
          } flex items-center justify-center text-white font-medium shadow-md group-hover:from-purple-600 group-hover:to-blue-600 transition-all`}
        >
          {userData.name.charAt(0).toUpperCase()}
        </div>
        <FiChevronDown
          className={`ml-1 ${theme === "dark" ? "text-gray-300" : "text-gray-400"} transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
    </button>

    {isOpen && (
      <div
        className={`absolute right-0 mt-2 w-64 ${
          theme === "dark" ? "bg-gray-800 text-gray-300 border-gray-600" : "bg-white text-gray-700 border-gray-200"
        } rounded-lg shadow-xl z-50 border divide-y divide-gray-200 dark:divide-gray-600 overflow-hidden animate-fade-in`}
      >
        {/* Encabezado con información del usuario */}
        <div
          className={`p-4 ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20"
              : "bg-gradient-to-r from-purple-500/20 to-blue-500/20"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`h-12 w-12 rounded-full ${
                theme === "dark"
                  ? "bg-gradient-to-br from-purple-600 to-blue-600"
                  : "bg-gradient-to-br from-purple-500 to-blue-500"
              } flex items-center justify-center text-white font-bold text-xl shadow-lg`}
            >
              {userData.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-white" : "text-blue-600 font-bold"
                } truncate`}
              >
                {userData.name}
              </p>
              <p
                className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"} truncate`}
              >
                {userData.email}
              </p>
              <div className="mt-1">
                <span
                  className={`text-xs px-2 py-1 rounded-full inline-block ${
                    theme === "dark" ? "bg-gray-600 text-gray-200" : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {role}
                </span>
              </div>
            </div>
          </div>
        </div>

       {/* Menú principal - Solo ajuste para modo claro */}
<div className="py-2 space-y-1">
  <MenuItem
    icon={<FiUser className="w-4 h-4" />}
    text="Mi perfil"
    className={`
      ${theme === "dark" 
        ? "text-purple-300 hover:text-purple-200"  // Estilo oscuro (se mantiene)
        : "!text-gray-900 font-semibold"  // Fuerza texto negro en claro
      }
      hover:bg-gray-100 dark:hover:bg-gray-700  // Hover de fondo
    `}
  />
  <MenuItem
    icon={<FiSettings className="w-4 h-4" />}
    text="Configuración"
    className={`
      ${theme === "dark" 
        ? "text-blue-300 hover:text-blue-200"  // Estilo oscuro
        : "!text-gray-900 font-semibold"  // Fuerza texto negro
      }
      hover:bg-gray-100 dark:hover:bg-gray-700
    `}
  />
  <MenuItem
    icon={<FiHelpCircle className="w-4 h-4" />}
    text="Ayuda"
    className={`
      ${theme === "dark" 
        ? "text-green-300 hover:text-green-200"  // Estilo oscuro
        : "!text-gray-900 font-semibold"  // Fuerza texto negro
      }
      hover:bg-gray-100 dark:hover:bg-gray-700
    `}
  />
</div>

        {/* Preferencias con toggle */}
        <div className="py-2 space-y-1">
          <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Preferencias
          </div>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-4 py-2 text-sm ${
              theme === "dark" ? "text-gray-300" : "text-blue-500 font-bold"
            } ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded-md transition-colors`}
          >
            <div className="flex items-center">
              {theme === "dark" ? (
                <FiMoon className="w-4 h-4 mr-3 text-purple-400" />
              ) : (
                <FiSun className="w-4 h-4 mr-3 text-yellow-500" />
              )}
              <span>Tema</span>
            </div>
            <span
              className={`text-xs ${
                theme === "dark"
                  ? "bg-gray-600/50 text-gray-200"
                  : "bg-gray-200/50 text-gray-700"
              } px-2 py-1 rounded`}
            >
              {theme === "dark" ? "Oscuro" : "Claro"}
            </span>
          </button>
        </div>

        {/* Cerrar sesión */}
        <div className="py-2">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center px-4 py-2 text-sm ${
              theme === "dark" ? "text-red-400" : "text-red-500 font-bold"
            } ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded-md transition-colors disabled:opacity-50`}
          >
            <FiLogOut className="w-4 h-4 mr-3" />
            <span className={`${
              theme === "dark" ? "text-gray-200" : "text-gray-600"
            }`}>
              {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
            </span>
          </button>
        </div>
      </div>
    )}
  </div>
);

};

// Componente auxiliar actualizado para tema claro/oscuro
const MenuItem = ({ icon, text }) => {
  console.log(icon);
  return (
    <a
      href="#"
      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </a>
  );
};

export default ProfileDropdown;
