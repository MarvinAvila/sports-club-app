import { supabaseAdmin } from '../config/supabaseClient.js';
import { getUserByAuthId } from '../models/UsuarioModel.js'; 

// export const getUserRole = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1]; // 'Bearer <token>'
//     if (!token) throw new Error('Token no proporcionado');

//     // Obtiene el usuario de Supabase usando el token
//     const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
//     if (error) throw new Error('Token inválido');

//     // Debug: Verifica IDs y emails
//     console.log("Supabase User ID:", user.id);
//     console.log("Supabase Email:", user.email);

//     // Ahora usamos el modelo para obtener los datos del usuario en la base de datos
//     const usuario = await getUserByAuthId(user.id);  // Usamos el modelo

//     if (!usuario) throw new Error('Usuario no encontrado en tabla local');

//     // Devuelve el rol del usuario y otra información para el frontend
//     res.json({
//       role: usuario.rol || 'user',  // Role por defecto es 'user' si no se encuentra en la base de datos
//       email: usuario.email,         // Email para verificar que coincida con el de Supabase
//       nombre: usuario.nombre,       // El nombre del usuario, si está en la base de datos
//       debug: {                      // Información adicional para diagnóstico
//         supabaseId: user.id,
//         dbAuthId: usuario.auth_id,
//         emailMatch: user.email === usuario.email
//       }
//     });

//   } catch (error) {
//     console.error('Error completo:', {
//       message: error.message,
//       supabaseUser: user // Asegúrate de que esto no falle
//     });
//     res.status(401).json({ error: error.message });
//   }
// };

// auth.controller.js

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password });
    if (error) throw new Error('Credenciales inválidas');

    const usuario = await getUserByAuthId(data.user.id);
    if (!usuario) throw new Error('Usuario no encontrado en base de datos');

    res.json({
      token: data.session.access_token,
      role: usuario.rol,
      id: usuario.id, // Asegúrate que este es el ID correcto
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      auth_id: data.user.id // Agrega esto para referencia
    });

    console.log("Usuario autenticado:", {
      token: data.session.access_token,
      role: usuario.rol,
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      auth_id: data.user.id // ID de Supabase Auth
    });

    console.log("Debug info:", {token : data.session.access_token, user: data.user});


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserRole = async (req, res) => {
  try {
    res.json({ 
      role: req.user.role,
      user: {
        id: req.user.id,
        nombre: req.user.nombre,
        email: req.user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
