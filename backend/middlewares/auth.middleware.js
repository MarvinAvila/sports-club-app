import { supabaseAdmin } from '../config/supabaseClient.js';
import { getUserByAuthId } from '../models/UsuarioModel.js'; 

export const verifyToken = async (req, res, next) => {
  console.log('Headers recibidos:', req.headers); // Debug

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    console.log('Formato de autorización incorrecto:', authHeader);
    return res.status(401).json({ error: 'Formato de autorización inválido' });
  }
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token recibido:', token); // Debug
  
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error) throw new Error('Token inválido');
    
    // Obtener usuario completo desde tu tabla
    const usuario = await getUserByAuthId(user.id);
    if (!usuario) throw new Error('Usuario no encontrado en la base de datos');
    
    // Añadir información completa al request
    req.user = {
      id: usuario.id,         // ID de tu tabla usuarios
      auth_id: user.id,       // ID de Supabase Auth
      email: user.email,
      role: usuario.rol,
      nombre: usuario.nombre,
      telefono: usuario.telefono
    };
    next();
  } catch (error) {
    console.error('Error en verifyToken:', error);
    res.status(401).json({ error: error.message });
  }
};

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acceso no autorizado' });
    }
    next();
  };
};