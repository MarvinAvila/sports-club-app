// models/usuarios/UsuarioModel.js
import { supabaseAdmin } from '../config/supabaseClient.js';

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
    const { data, error } = await supabaseAdmin
      .from('usuarios')
      .insert([userData]);

    if (error) throw new Error('Error al crear el usuario');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
