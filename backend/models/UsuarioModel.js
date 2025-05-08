import { supabaseAdmin } from '../config/supabaseClient.js';

export const getUserById = async (userId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw new Error('Error al obtener el usuario');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByAuthId = async (authId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('usuarios')
      .select('*')
      .eq('auth_id', authId)
      .single();

    if (error) throw new Error('Error al obtener el usuario');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw new Error('Error al obtener el usuario');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('usuarios')
      .select('*');

    if (error) throw new Error('Error al obtener los usuarios');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (userData) => {
  try {
    // Validar que el rol sea 'admin' (único permitido según el esquema)
    if (userData.rol && userData.rol !== 'admin') {
      throw new Error('Rol no válido. Solo se permite "admin"');
    }

    const { data, error } = await supabaseAdmin
      .from('usuarios')
      .insert([userData])
      .select();

    if (error) throw new Error('Error al crear el usuario');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (userId, updateData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('usuarios')
      .update(updateData)
      .eq('id', userId)
      .select();

    if (error) throw new Error('Error al actualizar el usuario');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('usuarios')
      .delete()
      .eq('id', userId);

    if (error) throw new Error('Error al eliminar el usuario');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};