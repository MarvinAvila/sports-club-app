import { supabaseAdmin } from '../config/supabaseClient.js';
import { getUserByAuthId } from '../models/UsuarioModel.js'; 

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verifica tanto con Supabase como con tu sistema
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) throw new Error('Token inválido');

    const usuario = await getUserByAuthId(user.id);
    if (!usuario) throw new Error('Usuario no encontrado');
    
    req.user = {
      id: usuario.id,
      auth_id: user.id,
      email: user.email,
      role: usuario.rol,
      nombre: usuario.nombre,
      telefono: usuario.telefono
    };

    next();
  } catch (error) {
    console.error('Error en verifyToken:', error);
    res.status(401).json({ 
      error: error.message,
      code: 'AUTH_ERROR'
    });
  }
};

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
      console.warn(`Intento de acceso no autorizado. Rol: ${req.user?.role}, Requerido: ${allowedRoles}`);
      return res.status(403).json({ 
        error: 'Acceso no autorizado',
        requiredRoles: allowedRoles,
        currentRole: req.user?.role
      });
    }
    next();
  };
};