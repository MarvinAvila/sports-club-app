// models/NotificacionModel.js
import { supabaseAdmin } from '../config/supabaseClient.js';

export const getNotificacionById = async (notificacionId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .select(`
        *,
        usuarios:usuario_id(nombre, email)
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
        usuarios:usuario_id(nombre)
      `)
      .order('fecha_creacion', { ascending: false });

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
      .insert([notificacionData])
      .select(); // Retorna el registro creado

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
      .select(); // Retorna el registro actualizado

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

// Funciones adicionales útiles
export const getNotificacionesByUsuario = async (usuarioId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .select('*')
      .eq('usuario_id', usuarioId)
      .order('fecha_creacion', { ascending: false });

    if (error) throw new Error('Error al obtener notificaciones del usuario');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const marcarComoLeida = async (notificacionId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notificaciones')
      .update({ leida: true, fecha_lectura: new Date() })
      .eq('id', notificacionId)
      .select();

    if (error) throw new Error('Error al marcar como leída');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};