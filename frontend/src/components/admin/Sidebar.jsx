// src/components/admin/Sidebar.jsx

import React from 'react';
import { FiUsers, FiCalendar, FiUpload, FiLogOut, FiFileText } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-full p-6 flex flex-col justify-between shadow-lg">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-white">Admin</h2>

        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
            <FiUsers />
            <span>Alumnos</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
            <FiCalendar />
            <span>Calendario</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
            <FiUpload />
            <span>Subir Documentos</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
            <FiFileText />
            <span>Historial</span>
          </a>
        </nav>
      </div>

      <button
        className="flex items-center space-x-2 text-red-400 hover:text-red-600"
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login';
        }}
      >
        <FiLogOut />
        <span>Salir</span>
      </button>
    </div>
  );
};

export default Sidebar;
