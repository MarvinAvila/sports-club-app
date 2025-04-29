// models/pagos/PagoModel.js
import { supabaseAdmin } from '../config/supabaseClient.js';

export const getPagoById = async (pagoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('pagos')
      .select('*')
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
      .select('*');

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
      .insert([pagoData]);

    if (error) throw new Error('Error al crear el pago');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
