// models/tutores_alumnos/TutorAlumnoModel.js
import { supabaseAdmin } from '../config/supabaseClient.js';
export const getTutorAlumnoById = async (tutorAlumnoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .select('*')
      .eq('id', tutorAlumnoId)
      .single();

    if (error) throw new Error('Error al obtener tutor-alumno');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllTutoresAlumnos = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .select('*');

    if (error) throw new Error('Error al obtener tutores-alumnos');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTutorAlumno = async (tutorAlumnoData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .insert([tutorAlumnoData]);

    if (error) throw new Error('Error al crear tutor-alumno');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addAlumnoToTutor = async (tutorId, alumnoId, relationshipData = {}) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .insert([{
        tutor_id: tutorId,
        alumno_id: alumnoId,
        ...relationshipData  // Datos adicionales como parentesco, etc.
      }])
      .select();

    if (error) throw new Error('Error al asignar alumno al tutor');
    return data[0];  // Devuelve el registro creado
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAlumnosByTutor = async (tutorId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .select(`
        id,
        alumno_id,
        alumnos:alumno_id (*)  // Esto trae todos los datos del alumno
      `)
      .eq('tutor_id', tutorId);

    if (error) throw new Error('Error al obtener alumnos del tutor');
    
    // Formateamos la respuesta para devolver objetos alumno más limpios
    return data.map(relacion => ({
      relacion_id: relacion.id,
      ...relacion.alumnos
    }));
    
  } catch (error) {
    throw new Error(error.message);
  }
};