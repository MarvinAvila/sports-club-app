import { supabaseAdmin } from '../config/supabaseClient.js';
import { getUserByAuthId } from '../models/UsuarioModel.js'; 

export const getUserRole = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // 'Bearer <token>'
    if (!token) throw new Error('Token no proporcionado');

    // Obtiene el usuario de Supabase usando el token
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error) throw new Error('Token inválido');

    // Debug: Verifica IDs y emails
    console.log("Supabase User ID:", user.id);
    console.log("Supabase Email:", user.email);

    // Ahora usamos el modelo para obtener los datos del usuario en la base de datos
    const usuario = await getUserByAuthId(user.id);  // Usamos el modelo

    if (!usuario) throw new Error('Usuario no encontrado en tabla local');

    // Devuelve el rol del usuario y otra información para el frontend
    res.json({
      role: usuario.rol || 'user',  // Role por defecto es 'user' si no se encuentra en la base de datos
      email: usuario.email,         // Email para verificar que coincida con el de Supabase
      nombre: usuario.nombre,       // El nombre del usuario, si está en la base de datos
      debug: {                      // Información adicional para diagnóstico
        supabaseId: user.id,
        dbAuthId: usuario.auth_id,
        emailMatch: user.email === usuario.email
      }
    });

  } catch (error) {
    console.error('Error completo:', {
      message: error.message,
      supabaseUser: user // Asegúrate de que esto no falle
    });
    res.status(401).json({ error: error.message });
  }
};

// auth.controller.js

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Llamamos a Supabase para hacer login
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error en login:', error);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = data.user;

    // Buscamos al usuario en nuestra tabla local
    const usuario = await getUserByAuthId(user.id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado en base de datos' });
    }

    // Opcionalmente puedes generar un nuevo token aquí si quieres (pero supabase ya da uno)
    // En este ejemplo te regresamos el token de sesión de Supabase
    res.json({
      token: data.session.access_token, // Este es el token que debes usar para las llamadas protegidas
      role: usuario.rol || 'user',       // Rol del usuario
      nombre: usuario.nombre,    // <- Añadir
      email: usuario.email,      // <- Añadir
      telefono: usuario.telefono 
    });

  } catch (error) {
    console.error('Error en loginUser:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
