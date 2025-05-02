import { supabase } from '@/lib/supabaseClient';

export const fetchStudents = async () => {
  const { data, error } = await supabase
    .from('alumnos')
    .select('*')
    .order('nombre', { ascending: true });
  
  if (error) throw error;
  return data;
};

export const fetchEnrollments = async () => {
  const { data, error } = await supabase
    .from('inscripciones')
    .select(`
      id,
      estado,
      temporada,
      fecha_inscripcion,
      alumnos:alumno_id(nombre),
      deportes:deporte_id(nombre)
    `);
  
  if (error) throw error;
  return data;
};

export const fetchSports = async () => {
  const { data, error } = await supabase
    .from('deportes')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const fetchPayments = async () => {
  const { data, error } = await supabase
    .from('pagos')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const updateEnrollmentStatus = async (id, newStatus) => {
  const { data, error } = await supabase
    .from('inscripciones')
    .update({ estado: newStatus })
    .eq('id', id);
  
  if (error) throw error;
  return data;
};