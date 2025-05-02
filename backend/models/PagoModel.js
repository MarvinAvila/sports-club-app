// models/PagoModel.js
import { supabaseAdmin } from '../config/supabaseClient.js';

export const getPagoById = async (pagoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('pagos')
      .select(`
        *,
        inscripciones:inscripcion_id(id, estado),
        usuarios:usuario_id(nombre, email)
      `)
      .eq('id', pagoId)
      .single();

    if (error) throw new Error('Error al obtener el pago');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllPagos = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('pagos')
      .select(`
        *,
        inscripciones:inscripcion_id(id, estado),
        usuarios:usuario_id(nombre)
      `)
      .order('fecha_pago', { ascending: false });

    if (error) throw new Error('Error al obtener los pagos');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createPago = async (pagoData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('pagos')
      .insert([pagoData])
      .select(); // Retorna el registro creado

    if (error) throw new Error('Error al crear el pago');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePago = async (pagoId, updateData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('pagos')
      .update(updateData)
      .eq('id', pagoId)
      .select(); // Retorna el registro actualizado

    if (error) throw new Error('Error al actualizar el pago');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePago = async (pagoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('pagos')
      .delete()
      .eq('id', pagoId);

    if (error) throw new Error('Error al eliminar el pago');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función adicional útil
export const getPagosByInscripcion = async (inscripcionId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('pagos')
      .select('*')
      .eq('inscripcion_id', inscripcionId)
      .order('fecha_pago', { ascending: false });

    if (error) throw new Error('Error al obtener pagos de la inscripción');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};