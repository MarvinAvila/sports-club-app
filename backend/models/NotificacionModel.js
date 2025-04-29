// models/notificaciones/NotificacionModel.js
import { supabaseAdmin } from '../config/supabaseClient.js';

export const getNotificacionById = async (notificacionId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .select('*')
      .eq('id', notificacionId)
      .single();

    if (error) throw new Error('Error al obtener la notificación');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllNotificaciones = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .select('*');

    if (error) throw new Error('Error al obtener las notificaciones');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createNotificacion = async (notificacionData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .insert([notificacionData]);

    if (error) throw new Error('Error al crear la notificación');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
