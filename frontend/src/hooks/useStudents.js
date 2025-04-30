import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('alumnos')
        .select('*, inscripciones(*, deportes(*))');

      if (error) throw error;

      const formattedStudents = data.map(alumno => ({
        id: alumno.id,
        name: alumno.nombre,
        email: '', // Puedes obtener esto de otra tabla si es necesario
        status: alumno.inscripciones[0]?.estado || 'No inscrito',
        hasPaid: alumno.inscripciones[0]?.pagos?.length > 0
      }));

      setStudents(formattedStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (studentId, newStatus) => {
    try {
      // Aquí debes implementar la actualización en Supabase
      // Esto es un ejemplo, ajusta según tu esquema
      const { error } = await supabase
        .from('inscripciones')
        .update({ estado: newStatus.toLowerCase() })
        .eq('alumno_id', studentId);

      if (error) throw error;

      // Actualizar el estado local
      setStudents(students.map(student => 
        student.id === studentId ? { ...student, status: newStatus } : student
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, updateStatus, fetchStudents };
};

export default useStudents;