import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary-900 text-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-primary-800 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-accent-400 mb-6">Admin</h2>
          <nav>
            <ul className="space-y-3">
              {['Alumnos', 'Calendario', 'Subir Documentos', 'Historial'].map((item) => (
                <li key={item}>
                  <a href="#" className="block py-2 px-3 rounded hover:bg-primary-700 hover:text-accent-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <button className="block py-2 px-3 rounded hover:bg-primary-700 text-danger-400 transition-colors w-full text-left">
                  Salir
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout;
