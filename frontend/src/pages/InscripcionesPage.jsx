import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://szaudnovhzvtvlebhrzf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YXVkbm92aHp2dHZsZWJocnpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mzk2OTEyMiwiZXhwIjoyMDU5NTQ1MTIyfQ.lNSQM4PENHYSQK1qRaBOlyrPSnxMaCmOKgq051dt3-U'
);

const InscripcionesPage = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarInscripciones = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('inscripciones')
          .select('*')
          .order('fecha', { ascending: false });

        if (supabaseError) throw supabaseError;
        setInscripciones(data || []);
      } catch (err) {
        console.error('Error al cargar inscripciones:', err);
        setError('Error al conectar con la base de datos');
      } finally {
        setCargando(false);
      }
    };

    cargarInscripciones();

    const subscription = supabase
      .channel('inscripciones-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inscripciones' },
        () => {
          cargarInscripciones();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">Gestión de Inscripciones</h1>
          <div className="w-20 h-1 bg-emerald-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex justify-end gap-4 mb-4">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">
            Exportar Excel
          </button>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors">
            Enviar Recordatorios
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {error ? (
            <div className="p-8 text-center text-red-500">
              <p className="text-lg font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          ) : cargando ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-emerald-600 font-medium">
                Cargando inscripciones desde Supabase...
              </p>
            </div>
          ) : inscripciones.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-emerald-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">ID</th>
                      <th className="px-6 py-4 text-left">Alumno</th>
                      <th className="px-6 py-4 text-left">Curso</th>
                      <th className="px-6 py-4 text-left">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inscripciones.map((inscripcion) => (
                      <tr key={inscripcion.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">{inscripcion.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{inscripcion.alumno_id}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{inscripcion.curso_id}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(inscripcion.fecha).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-6 py-3 text-right text-sm text-gray-500 border-t">
                <span className="font-medium">Total inscripciones:</span> {inscripciones.length}
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-gray-500">
              No hay inscripciones para mostrar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InscripcionesPage;
