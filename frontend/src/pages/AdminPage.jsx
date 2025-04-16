import React from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import StudentFilters from '../components/admin/StudentFilters';
import StudentActions from '../components/admin/StudentActions';
import StudentTable from '../components/admin/StudentTable';

const AdminPage = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-white">Gestión de Alumnos</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow transition-all"
          onClick={() => {
            // Aquí va tu lógica de cerrar sesión
            console.log('Cerrar sesión');
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded-2xl shadow mb-4">
        <StudentFilters />
      </div>

      <div className="bg-gray-800 p-4 rounded-2xl shadow mb-4">
        <StudentActions />
      </div>

      <div className="bg-gray-800 p-4 rounded-2xl shadow">
        <StudentTable />
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
