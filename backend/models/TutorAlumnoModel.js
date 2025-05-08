// models/tutores_alumnos/TutorAlumnoModel.js
import { supabaseAdmin } from '../config/supabaseClient.js';

export const createTutorAlumno = async (tutorAlumnoData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .insert([tutorAlumnoData])
      .select();

    if (error) throw new Error('Error al crear relación tutor-alumno');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTutorAlumno = async (tutorId, alumnoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .delete()
      .eq('tutor_id', tutorId)
      .eq('alumno_id', alumnoId);

    if (error) throw new Error('Error al eliminar relación tutor-alumno');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAlumnosByTutor = async (tutorId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .select(`
        parentesco,
        alumnos:alumno_id(*)
      `)
      .eq('tutor_id', tutorId);

    if (error) throw new Error('Error al obtener alumnos del tutor');
    
    // Formatear la respuesta para incluir el parentesco
    return data.map(item => ({
      ...item.alumnos,
      parentesco: item.parentesco
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTutoresByAlumno = async (alumnoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .select(`
        parentesco,
        tutores:tutor_id(*)
      `)
      .eq('alumno_id', alumnoId);

    if (error) throw new Error('Error al obtener tutores del alumno');
    
    return data.map(item => ({
      ...item.tutores,
      parentesco: item.parentesco
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};