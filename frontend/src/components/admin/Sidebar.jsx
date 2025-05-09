// src/components/admin/Sidebar.jsx

import React from 'react';
import { Link } from "react-router-dom";


import { FiUsers, FiCalendar, FiUpload, FiLogOut, FiFileText } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-full p-6 flex flex-col justify-between shadow-lg">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-white">Admin</h2>

        <nav className="space-y-4">
           <Link to="/admin/alumnos" className="flex items-center space-x-2 hover:text-blue-400 text-white">
            <FiUsers />
            <span>Alumnos</span>
          </Link>

          <Link to="/admin/calendario" className="flex items-center space-x-2 hover:text-blue-400 text-white">
            <span>📅</span>
            <span>Calendario</span>
          </Link>
           {/* 
          <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
            <FiUpload />
            <span>Subir Documentos</span>
          </a>
          */}
          <Link to="/admin/historial" className="flex items-center space-x-2 hover:text-blue-400 text-white">
            <span>📜</span>
            <span>Historial</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
