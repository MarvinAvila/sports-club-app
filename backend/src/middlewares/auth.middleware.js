import { supabaseAdmin } from '../config/supabaseClient.js';
import { getUserByAuthId } from '../models/UsuarioModel.js'; 

export const verifyToken = async (req, res, next) => {
  console.log('Headers recibidos:', req.headers);

  // 1. Verificar cabecera de autorización
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    console.log('Formato de autorización incorrecto:', authHeader);
    return res.status(401).json({ error: 'Formato de autorización inválido' });
  }

  // 2. Extraer token
  const token = authHeader.split(' ')[1];
  console.log('Token recibido:', token);
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    // 3. Verificar token con Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    
    if (error) {
      console.error('Error al verificar token con Supabase:', error);
      throw new Error('Token inválido o expirado');
    }

    // 4. Obtener usuario completo desde tu tabla
    const usuario = await getUserByAuthId(user.id);
    if (!usuario) {
      throw new Error('Usuario no encontrado en la base de datos');
    }
    
    // 5. Añadir información al request
    req.user = {
      id: usuario.id,
      auth_id: user.id,
      email: user.email,
      role: usuario.rol,
      nombre: usuario.nombre,
      telefono: usuario.telefono
    };

    console.log('Autenticación exitosa para usuario:', req.user.email);
    next();
  } catch (error) {
    console.error('Error en verifyToken:', error.message);
    
    // Respuesta más detallada para el cliente
    res.status(401).json({ 
      error: error.message,
      details: 'Por favor inicie sesión nuevamente',
      code: 'TOKEN_INVALID'
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