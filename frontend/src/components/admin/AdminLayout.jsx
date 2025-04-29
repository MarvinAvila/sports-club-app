import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#1e1e2f] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#29293d] p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6">Panel Admin</h2>
        <nav>
          <ul className="space-y-4">
            <li className="hover:text-red-400 cursor-pointer">Alumnos</li>
            <li className="hover:text-red-400 cursor-pointer">Calendario</li>
            <li className="hover:text-red-400 cursor-pointer">Reportes</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
