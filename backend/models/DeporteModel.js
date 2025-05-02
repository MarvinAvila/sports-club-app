// models/DeporteModel.js
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

export const createDeporte = async (deporteData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('deportes')
      .insert([deporteData])
      .select();  // Retorna el registro creado

    if (error) throw new Error('Error al crear el deporte');
    return data[0];  // Devuelve el primer elemento del array
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateDeporte = async (deporteId, updateData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('deportes')
      .update(updateData)
      .eq('id', deporteId)
      .select();  // Retorna el registro actualizado

    if (error) throw new Error('Error al actualizar el deporte');
    return data[0];  // Devuelve el primer elemento del array
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteDeporte = async (deporteId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('deportes')
      .delete()
      .eq('id', deporteId);

    if (error) throw new Error('Error al eliminar el deporte');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};