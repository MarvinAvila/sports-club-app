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