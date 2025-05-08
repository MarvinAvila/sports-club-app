import { supabaseAdmin } from '../config/supabaseClient.js';

export const getTutorById = async (tutorId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores')
      .select('*')
      .eq('id', tutorId)
      .single();

    if (error) throw new Error('Error al obtener el tutor');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllTutores = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores')
      .select('*');

    if (error) throw new Error('Error al obtener los tutores');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTutor = async (tutorData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores')
      .insert([tutorData])
      .select();

    if (error) throw new Error('Error al crear el tutor');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTutor = async (tutorId, updateData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores')
      .update(updateData)
      .eq('id', tutorId)
      .select();

    if (error) throw new Error('Error al actualizar el tutor');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTutor = async (tutorId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores')
      .delete()
      .eq('id', tutorId);

    if (error) throw new Error('Error al eliminar el tutor');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};