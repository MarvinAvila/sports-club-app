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
