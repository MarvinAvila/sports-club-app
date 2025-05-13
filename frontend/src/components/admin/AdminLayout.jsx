import React from 'react';
import Sidebar from '@/components/admin/Sidebar'; // Asegúrate de que esta ruta es correcta

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary-900 text-gray-100">
      <div className="flex">
        {/* Usa tu Sidebar aquí */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
