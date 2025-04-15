import { supabaseAdmin } from '../config/supabaseClient.js';

export const verifyToken = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Formato de autorización inválido' });
  }
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error) throw new Error('Token inválido');
    
    req.userToken = token; // Almacena el token para usarlo en el controlador
    req.userEmail = user.email;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};