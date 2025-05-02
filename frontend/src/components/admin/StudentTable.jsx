import React from 'react';

const StudentTable = ({ enrollments = [], onStatusChange }) => {
  // Usa un valor por defecto (array vacío) para enrollments
  
  if (!enrollments || enrollments.length === 0) {
    return <div className="p-4 text-gray-300">No hay inscripciones para mostrar</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-600">
        <thead className="bg-gray-600">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Alumno</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Deporte</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Temporada</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-600">
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {enrollment.alumnos?.nombre || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {enrollment.deportes?.nombre || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {enrollment.temporada}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  enrollment.estado === 'activa' ? 'bg-green-100 text-green-800' :
                  enrollment.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {enrollment.estado}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <select
                  value={enrollment.estado}
                  onChange={(e) => onStatusChange(enrollment.id, e.target.value)}
                  className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="activa">Activa</option>
                  <option value="vencida">Vencida</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;