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
  const { theme, toggleTheme } = useTheme(); // Usa el contexto del tema
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none group"
        aria-label="Menú de perfil"
      >
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium shadow-md group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
            {userData.name.charAt(0).toUpperCase()}
          </div>
          <FiChevronDown
            className={`ml-1 text-gray-400 dark:text-gray-300 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600 overflow-hidden animate-fade-in">
          {/* Encabezado con información del usuario */}
          <div className="p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 dark:from-purple-600/20 dark:to-blue-600/20">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {userData.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                  {userData.email}
                </p>
                <div className="mt-1">
                  <span className="text-xs px-2 py-1 bg-gray-200/50 dark:bg-gray-600/50 text-gray-700 dark:text-gray-200 rounded-full inline-block">
                    {role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menú principal */}
          <div className="py-2 space-y-1">
            <MenuItem icon={<FiUser className="w-4 h-4" />} text="Mi perfil" />
            <MenuItem
              icon={<FiSettings className="w-4 h-4" />}
              text="Configuración"
            />
            <MenuItem
              icon={<FiHelpCircle className="w-4 h-4" />}
              text="Ayuda"
            />
          </div>

          {/* Preferencias con toggle */}
          <div className="py-2 space-y-1">
            <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Preferencias
            </div>
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center">
                {theme === "dark" ? (
                  <FiMoon className="w-4 h-4 mr-3 text-purple-400" />
                ) : (
                  <FiSun className="w-4 h-4 mr-3 text-yellow-500" />
                )}
                <span>Tema</span>
              </div>
              <span className="text-xs bg-gray-200/50 dark:bg-gray-600/50 px-2 py-1 rounded">
                {theme === "dark" ? "Oscuro" : "Claro"}
              </span>
            </button>
          </div>

          {/* Cerrar sesión */}
          <div className="py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <FiLogOut className="w-4 h-4 mr-3" />
              <span>Cerrar sesión</span>
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
