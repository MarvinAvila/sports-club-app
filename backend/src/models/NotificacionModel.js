import { supabaseAdmin } from '../config/supabaseClient.js';

export const getNotificacionById = async (notificacionId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .select(`
        *,
        tutores:tutor_id(nombre, apellido_paterno, apellido_materno, email)
      `)
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
      .select(`
        *,
        tutores:tutor_id(nombre, apellido_paterno)
      `)
      .order('creada_en', { ascending: false });

    if (error) throw new Error('Error al obtener las notificaciones');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createNotificacion = async (notificacionData) => {
  try {
    // Validar tipo de notificación
    if (!['pago', 'recordatorio', 'general'].includes(notificacionData.tipo)) {
      throw new Error('Tipo de notificación no válido');
    }

    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .insert([{
        ...notificacionData,
        leida: false,
        creada_en: new Date()
      }])
      .select();

    if (error) throw new Error('Error al crear la notificación');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateNotificacion = async (notificacionId, updateData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .update(updateData)
      .eq('id', notificacionId)
      .select();

    if (error) throw new Error('Error al actualizar la notificación');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteNotificacion = async (notificacionId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .delete()
      .eq('id', notificacionId);

    if (error) throw new Error('Error al eliminar la notificación');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getNotificacionesByTutor = async (tutorId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .select('*')
      .eq('tutor_id', tutorId)
      .order('creada_en', { ascending: false });

    if (error) throw new Error('Error al obtener notificaciones del tutor');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const marcarComoLeida = async (notificacionId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .update({ 
        leida: true, 
        fecha_lectura: new Date() 
      })
      .eq('id', notificacionId)
      .select();

    if (error) throw new Error('Error al marcar como leída');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};