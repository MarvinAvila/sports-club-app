// models/deportes/DeporteModel.js
import { supabaseAdmin } from '../config/supabaseClient.js';

export const getDeporteById = async (deporteId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('deportes')
      .select('*')
      .eq('id', deporteId)
      .single();

    if (error) throw new Error('Error al obtener el deporte');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllDeportes = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('deportes')
      .select('*');

    if (error) throw new Error('Error al obtener los deportes');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
