import { supabaseAdmin } from "../config/supabaseClient.js";
import { getUserByAuthId, getUserByEmail } from "../models/UsuarioModel.js";

import { createAlumno } from "../models/AlumnoModel.js";
import { createTutor } from "../models/TutorModel.js";
import { addAlumnoToTutor } from "../models/TutorAlumnoModel.js";

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
    // 1. Extraer datos del request
    const {
      // Datos del alumno
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      curp,
      fechaNacimiento,
      tipoSangre,
      email,
      lugarNacimiento,
      nivelEstudios,
      municipioResidencia,
      codigoPostal,
      numeroCamiseta,
      alergias,
      cirugias,
      afecciones,
      // Datos del tutor
      nombreTutor,
      apellidoPaternoTutor,
      apellidoMaternoTutor,
      emailTutor,
      telefonosContacto,
      parentesco,
      password,
    } = req.body;

    // 1. Validación básica
    if (!password || password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    // 2. Verificar si el usuario ya existe en auth.users
    const { data: existingAuthUser, error: authCheckError } =
      await supabaseAdmin.auth.admin.listUsers({
        email: emailTutor,
      });

    if (authCheckError) throw new Error("Error al verificar usuario");

    let authUser = existingAuthUser.users[0];
    let accessToken = null;

    // 3. Si no existe, crearlo
    if (!authUser) {
      const { data: newAuthData, error: authError } =
        await supabaseAdmin.auth.signUp({
          email: emailTutor,
          password: password,
          options: {
            data: {
              full_name: `${nombreTutor} ${apellidoPaternoTutor}`,
              phone: telefonosContacto,
            },
            emailRedirectTo: `${process.env.FRONTEND_URL}/dashboard`,
          },
        });

      if (authError) throw new Error(authError.message);
      authUser = newAuthData.user;
    } else {
      // Si ya existe, obtener token
      const { data: session, error: sessionError } =
        await supabaseAdmin.auth.signInWithPassword({
          email: emailTutor,
          password: password,
        });

      if (sessionError) throw new Error(sessionError.message);
      accessToken = session.session.access_token;
    }

    // 4. Verificar si ya está registrado en tu sistema
    const { data: existingTutor, error: tutorError } = await supabaseAdmin
      .from("tutores")
      .select("*")
      .eq("email", emailTutor)
      .maybeSingle();

    if (tutorError) throw new Error(tutorError.message);
    if (existingTutor) throw new Error("El tutor ya está registrado");

    // 5. Insertar en tus tablas
    const tutor = await createTutor({
      auth_id: authUser.id,
      nombre: nombreTutor,
      apellido_paterno: apellidoPaternoTutor,
      apellido_materno: apellidoMaternoTutor,
      email: emailTutor,
      telefono: telefonosContacto,
      parentesco: parentesco,
    });

    const alumno = await createAlumno({
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      curp,
      fecha_nacimiento: new Date(fechaNacimiento).toISOString(),
      tipo_sangre: tipoSangre,
      lugar_nacimiento: lugarNacimiento,
      nivel_estudios: nivelEstudios,
      municipio_residencia: municipioResidencia,
      codigo_postal: codigoPostal,
      numero_camiseta: parseInt(numeroCamiseta) || null,
      alergias: alergias || null,
      cirugias_previas: cirugias || null,
      afecciones_medicas: afecciones || null,
      email: email || null,
    });

    await addAlumnoToTutor(tutor.id, alumno.id, { parentesco });

    // 5. Procesar documentos si existen
    if (req.files) {
      for (const [fieldName, files] of Object.entries(req.files)) {
        const config = DOCUMENT_MAPPING[fieldName];
        if (!config || !files?.length) continue;

        const file = files[0];
        const fileExt = file.originalname.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const storagePath = `alumnos/${alumno.id}/${config.carpeta}/${fileName}`;

        await supabaseAdmin.storage
          .from("documentos")
          .upload(storagePath, file.buffer, {
            contentType: file.mimetype,
          });

        await supabaseAdmin.from("documentos_alumno").insert({
          alumno_id: alumno.id,
          tipo_documento: config.tipo,
          url: storagePath,
        });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        tutorId: tutor.id,
        alumnoId: alumno.id,
        message: "Registro completado exitosamente",
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
