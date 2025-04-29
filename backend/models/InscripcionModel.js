// models/inscripciones/InscripcionModel.js
import { supabaseAdmin } from '../config/supabaseClient.js';

export const getInscripcionById = async (inscripcionId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('inscripciones')
      .select('*')
      .eq('id', inscripcionId)
      .single();

    if (error) throw new Error('Error al obtener la inscripción');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllInscripciones = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('inscripciones')
      .select('*');

    if (error) throw new Error('Error al obtener las inscripciones');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createInscripcion = async (inscripcionData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('inscripciones')
      .insert([inscripcionData]);

    if (error) throw new Error('Error al crear la inscripción');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
