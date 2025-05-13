import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://szaudnovhzvtvlebhrzf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YXVkbm92aHp2dHZsZWJocnpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mzk2OTEyMiwiZXhwIjoyMDU5NTQ1MTIyfQ.lNSQM4PENHYSQK1qRaBOlyrPSnxMaCmOKgq051dt3-U'
);

const AlumnosPage = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarAlumnos = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('alumnos')
          .select('*')
          .order('nombre', { ascending: true });

        if (supabaseError) throw supabaseError;
        setAlumnos(data || []);
      } catch (err) {
        console.error('Error al cargar alumnos:', err);
        setError('Error al conectar con la base de datos');
      } finally {
        setCargando(false);
      }
    };

    cargarAlumnos();

    const subscription = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'alumnos' },
        () => {
          cargarAlumnos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const alumnosFiltrados = alumnos.filter(alumno =>
    `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno || ''}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">Alumnos Registrados</h1>
          <div className="w-20 h-1 bg-indigo-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar alumnos..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {error ? (
            <div className="p-8 text-center text-red-500">
              <p className="text-lg font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          ) : cargando ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              <p className="mt-4 text-indigo-600 font-medium">
                Cargando registros desde Supabase...
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">ID</th>
                      <th className="px-6 py-4 text-left">Nombre</th>
                      <th className="px-6 py-4 text-left">CURP</th>
                      <th className="px-6 py-4 text-left">Teléfono</th>
                      <th className="px-6 py-4 text-left">Nacimiento</th>
                      <th className="px-6 py-4 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {alumnosFiltrados.length > 0 ? (
                      alumnosFiltrados.map((alumno) => (
                        <tr key={alumno.id}>
                          <td className="px-6 py-4 text-sm text-gray-900">{alumno.id}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {`${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno || ''}`}
                          </td>
                          <td className="px-6 py-4 text-sm text-indigo-600">{alumno.curp || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{alumno.telefonos_contacto || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {alumno.fecha_nacimiento ? new Date(alumno.fecha_nacimiento).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button className="text-blue-500 hover:underline mr-2">Editar</button>
                            <button className="text-red-500 hover:underline">Eliminar</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          {busqueda ? 'No se encontraron resultados' : 'No hay alumnos registrados aún'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-between items-center text-sm text-gray-500 border-t">
                <div>
                  {busqueda && (
                    <span>
                      Mostrando {alumnosFiltrados.length} de {alumnos.length} registros
                    </span>
                  )}
                </div>
                <div>
                  <span className="font-medium">Total registros:</span> {alumnos.length}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumnosPage;