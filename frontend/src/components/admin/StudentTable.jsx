import React, { useState } from 'react';

const statusOptions = ['Inscrito', 'Pendiente', 'No inscrito'];

const StudentTable = ({ students }) => {
  return (
    <div className="bg-primary-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-primary-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-accent-400">Gestión de Alumnos</h3>
        <div className="flex space-x-2">
          <button className="bg-primary-700 hover:bg-primary-600 text-accent-400 font-medium py-1 px-3 rounded text-sm transition-colors">
            Exportar Excel
          </button>
          <button className="bg-warning hover:bg-amber-500 text-white font-medium py-1 px-3 rounded text-sm transition-colors">
            Enviar Recordatorios
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-primary-700">
            <tr>
              {['NOMBRE', 'CORREO', 'ESTADO', 'PAGO', 'ACCIONES'].map((header) => (
                <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-700">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                  {student.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  {student.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    student.status === 'Inscrito' ? 'bg-success text-white' :
                    student.status === 'Pendiente' ? 'bg-warning text-white' :
                    'bg-danger text-white'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    student.hasPaid ? 'bg-success text-white' : 'bg-danger text-white'
                  }`}>
                    {student.hasPaid ? 'Sí' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  <button className="text-accent-400 hover:text-accent-300 mr-2">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentTable;