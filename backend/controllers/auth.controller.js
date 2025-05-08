import { supabaseAdmin } from "../config/supabaseClient.js";
import { getUserByAuthId, getUserByEmail } from "../models/UsuarioModel.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email y contraseña son requeridos",
      });
    }

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message || "Credenciales inválidas");
    }

    const usuario =
      (await getUserByAuthId(data.user.id)) ||
      (await getUserByEmail(data.user.email));

    if (!usuario) {
      throw new Error("Usuario no encontrado en la base de datos");
    }

    res.json({
      success: true,
      data: {
        token: data.session.access_token,
        user: {
          id: usuario.id,
          auth_id: data.user.id,
          nombre: usuario.nombre,
          email: usuario.email,
          telefono: usuario.telefono,
          rol: usuario.rol,
        },
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

export const getUserRole = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "No autenticado",
      });
    }

    res.json({
      success: true,
      data: {
        role: req.user.rol,
        user: {
          id: req.user.id,
          nombre: req.user.nombre,
          email: req.user.email,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
