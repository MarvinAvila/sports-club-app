import { supabaseAdmin } from '../config/supabaseClient.js';

export const getUserRole = async (req, res) => {
  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(req.userToken);
    if (error) throw new Error('Token inválido');

    // Debug: Verifica IDs y emails
    console.log("Supabase User ID:", user.id);
    console.log("Supabase Email:", user.email);

    const { data: usuario, error: dbError } = await supabaseAdmin
      .from('usuarios')
      .select('rol, auth_id, email')
      .eq('auth_id', user.id)
      .single();

    console.log("Usuario desde DB:", usuario); // ← ¡Mira esto en tus logs!

    if (dbError) throw new Error('Error en consulta');
    if (!usuario) throw new Error('Usuario no encontrado en tabla local');

    res.json({ 
      role: usuario.rol || 'user',
      debug: { // Info adicional para diagnóstico
        supabaseId: user.id,
        dbAuthId: usuario.auth_id,
        emailMatch: user.email === usuario.email
      }
    });

  } catch (error) {
    console.error('Error completo:', {
      message: error.message,
      supabaseUser: user // ← Asegúrate de que esto no falle
    });
    res.status(401).json({ error: error.message });
  }
};