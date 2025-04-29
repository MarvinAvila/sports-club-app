import React from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import StudentFilters from '../components/admin/StudentFilters';
import StudentActions from '../components/admin/StudentActions';
import StudentTable from '../components/admin/StudentTable';


const AdminPage = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Panel de Administración</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-lg transition"
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/login'; 
            console.log('Cerrar sesión');
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Sección de métricas estilo tarjetas (puedes simular los números por ahora) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow text-white">
          <p className="text-sm uppercase text-gray-400">Total Alumnos</p>
          <h2 className="text-3xl font-bold mt-2">1542</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow text-white">
          <p className="text-sm uppercase text-gray-400">Inscripciones</p>
          <h2 className="text-3xl font-bold mt-2">358</h2>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow text-white">
          <p className="text-sm uppercase text-gray-400">Activos</p>
          <h2 className="text-3xl font-bold mt-2">1204</h2>
        </div>
      </div>

      <div className="bg-gray-800 p-5 rounded-2xl shadow mb-6">
        <StudentFilters />
      </div>

      <div className="bg-gray-800 p-5 rounded-2xl shadow mb-6">
        <StudentActions />
      </div>

      <div className="bg-gray-800 p-5 rounded-2xl shadow">
        <StudentTable />
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
