import { supabaseAdmin } from "../config/supabaseClient.js";

import bcrypt from "bcryptjs";
import {
  createUser,
  getUserByAuthId,
  getUserByEmail,
} from "../models/UsuarioModel.js";
import { createTutor } from "../models/TutorModel.js";
import { createAlumno } from "../models/AlumnoModel.js";
import { createTutorAlumno } from "../models/TutorAlumnoModel.js";
import { handleDocumentosRegistro } from "../models/DocumentosAlumnoModel.js";

// Añade este helper al inicio del archivo
const waitForAuthUser = async (userId, timeoutMs = 5000) => {
  const startTime = Date.now();
  const interval = 500; // Reintentar cada 500ms

  while (Date.now() - startTime < timeoutMs) {
    try {
      // Usamos la API admin para buscar el usuario
      const {
        data: { user },
        error,
      } = await supabaseAdmin.auth.admin.getUserById(userId);

      if (!error && user) {
        console.log("Usuario encontrado en auth.users:", user.id);
        return user;
      }
    } catch (e) {
      console.warn("Error al buscar usuario:", e.message);
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  return null;
};

export const loginUser = async (req, res) => {
  console.log("Login request received:", req.body);
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);
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

    console.log("Usuario encontrado:", usuario); // Para depuración

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

export const registerTutorWithAlumno = async (req, res) => {
  try {
    const { body: formData, files } = req;

    // Validación básica
    if (!formData.emailTutor || !formData.password) {
      return res.status(400).json({
        error: "Datos incompletos",
        message: "Email y contraseña son requeridos",
      });
    }

    // PASO 1: Crear usuario en TU tabla (no en auth.users)
    const usuarioData = {
      email: formData.emailTutor,
      rol: "tutor",
      nombre: formData.nombreTutor,
      telefono: formData.telefonosContacto,
      contraseña_hash: formData.password
    };

    const usuario = await createUser(usuarioData);

    // PASO 2: Registrar en Supabase Auth (opcional, solo si necesitas autenticación)
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.signUp({
        email: formData.emailTutor,
        password: formData.password,
        options: {
          data: {
            user_metadata: {
              db_user_id: usuario.id, // Guarda referencia a tu usuario
            },
          },
        },
      });

    if (authError) {
      // Eliminar el usuario creado si falla auth
      await deleteUser(usuario.id);
      throw new Error(authError.message);
    }

    await updateUser(usuario.id, { auth_id: authData.user?.id || null });

    // PASO 3: Registro en tabla tutores
    const tutorData = {
      id: usuario.id,
      nombre: formData.nombreTutor,
      apellido_paterno: formData.apellidoPaternoTutor,
      apellido_materno: formData.apellidoMaternoTutor || null,
      email: formData.emailTutor,
      telefono: formData.telefonosContacto,
      parentesco: formData.parentesco || "Padre/Madre",
      ine_url: null, // Se actualizará después con el documento
    };

    const tutor = await createTutor(tutorData);

    // PASO 4: Registro en tabla alumnos
    const alumnoData = {
      nombre: formData.nombre,
      apellido_paterno: formData.apellidoPaterno,
      apellido_materno: formData.apellidoMaterno || null,
      fecha_nacimiento: formData.fechaNacimiento || null,
      genero: formData.genero || null,
      curp: formData.curp || null,
      tipo_sangre: formData.tipoSangre || null,
      lugar_nacimiento: formData.lugarNacimiento || null,
      nivel_estudios: formData.nivelEstudios || null,
      municipio_residencia: formData.municipioResidencia || null,
      codigo_postal: formData.codigoPostal || null,
      numero_camiseta: formData.numeroCamiseta || null,
      alergias: formData.alergias || null,
      afecciones_medicas: formData.afecciones || null,
      cirugias_previas: formData.cirugias || null,
      nombre_padres: formData.nombreTutor || null,
      telefonos_contacto: formData.telefonosContacto || null,
    };

    const alumno = await createAlumno(alumnoData);

    // PASO 5: Relación tutor-alumno
    await createTutorAlumno({
      tutor_id: tutor.id,
      alumno_id: alumno.id,
      parentesco: formData.parentesco || "Padre/Madre",
    });

    // PASO 6: Manejo de documentos (opcional si hay archivos)
    if (files) {
      const documentos = [
        { tipo: "CURP", file: files.curpFile?.[0] },
        { tipo: "ACTA_NACIMIENTO", file: files.actaNacimientoFile?.[0] },
        { tipo: "CREDENCIAL_ESCOLAR", file: files.credencialEscolarFile?.[0] },
        { tipo: "INE_TUTOR", file: files.ineTutorFile?.[0] },
        { tipo: "FOTO", file: files.fotoJugadorFile?.[0] },
      ];

      for (const doc of documentos) {
        if (doc.file) {
          // Subir a Supabase Storage
          const filePath = `documentos/${alumno.id}/${
            doc.tipo
          }_${Date.now()}.${doc.file.originalname.split(".").pop()}`;

          const { error: uploadError } = await supabaseAdmin.storage
            .from("documentos")
            .upload(filePath, doc.file.buffer, {
              contentType: doc.file.mimetype,
              upsert: false,
            });

          if (uploadError) {
            console.error(`Error subiendo ${doc.tipo}:`, uploadError);
            continue; // Continuar con el siguiente documento si hay error
          }

          // Obtener URL pública
          const {
            data: { publicUrl },
          } = supabaseAdmin.storage.from("documentos").getPublicUrl(filePath);

          // Registrar documento en la base de datos
          await handleDocumentosRegistro({
            alumno_id: alumno.id,
            tipo_documento: doc.tipo,
            url: publicUrl,
          });

          // Actualizar URL de INE en tutor si corresponde
          if (doc.tipo === "INE_TUTOR") {
            await updateTutor(tutor.id, { ine_url: publicUrl });
          }
        }
      }
    }

    // Respuesta exitosa
    return res.status(201).json({
      success: true,
      data: {
        tutor: {
          id: tutor.id,
          email: tutor.email,
          nombre: `${tutor.nombre} ${tutor.apellido_paterno}`,
        },
        alumno: {
          id: alumno.id,
          nombre: `${alumno.nombre} ${alumno.apellido_paterno}`,
        },
      },
    });
  } catch (error) {
    console.error("Error en registro completo:", error);

    // Intentar limpiar registros creados en caso de error
    try {
      if (authData?.user?.id) {
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      }
    } catch (cleanupError) {
      console.error("Error en limpieza:", cleanupError);
    }

    return res.status(500).json({
      error: "Error en el registro",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Ocurrió un error al completar el registro",
    });
  }
};

// auth.controller.js
export const logoutUser = async (req, res) => {
  try {
    // Verificar el token primero
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    // Aquí puedes agregar lógica adicional como registrar el logout
    res.clearCookie("session"); // Si usas cookies
    res.json({ success: true });
    console.log("Usuario desconectado");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
