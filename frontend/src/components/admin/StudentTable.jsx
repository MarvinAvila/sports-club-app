import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { exportToExcel } from '../../utils/export';

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://szaudnovhzvtvlebhrzf.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YXVkbm92aHp2dHZsZWJocnpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mzk2OTEyMiwiZXhwIjoyMDU5NTQ1MTIyfQ.lNSQM4PENHYSQK1qRaBOlyrPSnxMaCmOKgq051dt3-U';
const supabase = createClient(supabaseUrl, supabaseKey);

const StudentTable = ({ onEdit, onDelete }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar alumnos desde Supabase
  const fetchAlumnos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('alumnos')
        .select('*')
        .order('nombre', { ascending: true });

      if (error) throw error;
      setAlumnos(data || []);
    } catch (err) {
      console.error('Error al cargar alumnos:', err);
      setError('Error al conectar con la base de datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();

    // Suscripción a cambios en tiempo real
    const subscription = supabase
      .channel('alumnos-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'alumnos' },
        () => fetchAlumnos()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Filtrar alumnos basado en la búsqueda
  const filteredAlumnos = alumnos.filter(alumno => {
    const fullName = `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // Exportar a Excel
  const handleExport = () => {
    const dataToExport = filteredAlumnos.length > 0 ? filteredAlumnos : alumnos;
    
    const formattedData = dataToExport.map(alumno => ({
      'Nombre Completo': `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno || ''}`.trim(),
      'CURP': alumno.curp || 'N/A',
      'Teléfono': alumno.telefonos_contacto || 'N/A',
      'Fecha Nacimiento': alumno.fecha_nacimiento || 'N/A',
      'Género': alumno.genero || 'N/A',
      'Tipo Sangre': alumno.tipo_sangre || 'N/A'
    }));

    exportToExcel(formattedData, 'alumnos_exportados');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
        <button 
          onClick={fetchAlumnos}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar alumno..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Exportar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">CURP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nacimiento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAlumnos.length > 0 ? (
              filteredAlumnos.map((alumno) => (
                <tr key={alumno.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {alumno.nombre} {alumno.apellido_paterno} {alumno.apellido_materno || ''}
                        </div>
                        <div className="text-sm text-gray-500">{alumno.genero || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alumno.curp || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alumno.telefonos_contacto || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alumno.fecha_nacimiento ? new Date(alumno.fecha_nacimiento).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onEdit(alumno)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(alumno.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  {searchTerm ? 'No se encontraron resultados' : 'No hay alumnos registrados'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <div>
          Mostrando <span className="font-medium">{filteredAlumnos.length}</span> de{' '}
          <span className="font-medium">{alumnos.length}</span> alumnos
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentTable;