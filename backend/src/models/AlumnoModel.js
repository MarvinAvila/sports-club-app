// models/alumnos/AlumnoModel.js
import { supabaseAdmin } from '../config/supabaseClient.js';

export const getAlumnoById = async (alumnoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('alumnos')
      .select('*')
      .eq('id', alumnoId)
      .single();

    if (error) throw new Error('Error al obtener el alumno');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllAlumnos = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('alumnos')
      .select('*');

    if (error) throw new Error('Error al obtener los alumnos');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createAlumno = async (alumnoData) => {
  console.log("Datos del alumno a crear:", alumnoData); // Para depuración
  try {
    const { data, error } = await supabaseAdmin
      .from('alumnos')
      .insert([alumnoData]);

    if (error) throw new Error('Error al crear el alumno');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateAlumno = async (alumnoId, updateData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('alumnos')
      .update(updateData)
      .eq('id', alumnoId)
      .select();  // Esto devuelve el registro actualizado

    if (error) throw new Error('Error al actualizar el alumno');
    return data[0];  // Devuelve el primer elemento del array
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteAlumno = async (alumnoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('alumnos')
      .delete()
      .eq('id', alumnoId);

    if (error) throw new Error('Error al eliminar el alumno');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Nuevos métodos para documentos del alumno
export const getDocumentosAlumno = async (alumnoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('documentos_alumno')
      .select('*')
      .eq('alumno_id', alumnoId);

    if (error) throw new Error('Error al obtener documentos del alumno');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addDocumentoAlumno = async (documentoData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('documentos_alumno')
      .insert([documentoData])
      .select();

    if (error) throw new Error('Error al agregar documento');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAlumnosByTutor = async (tutorId) => {
  // Esta consulta depende de tu estructura de base de datos
  // Ejemplo para Supabase:
  const { data, error } = await supabase
    .from('alumnos')
    .select('*')
    .eq('tutor_id', tutorId);
  
  if (error) throw error;
  return data;
};