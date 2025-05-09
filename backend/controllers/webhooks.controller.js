import { supabaseAdmin } from "../config/supabaseClient.js";
import { v4 as uuidv4 } from 'uuid';

// Mapeo de campos a tipos de documento y campos en tabla alumnos
const DOCUMENT_MAPPING = {
  curpFile: {
    tipo: 'CURP',
    campoAlumno: 'documento_curp_url',
    carpeta: 'curp'
  },
  actaNacimientoFile: {
    tipo: 'ACTA_NACIMIENTO',
    campoAlumno: 'acta_nacimiento_url',
    carpeta: 'acta_nacimiento'
  },
  credencialEscolarFile: {
    tipo: 'CREDENCIAL_ESCOLAR',
    campoAlumno: 'credencial_escolar_url',
    carpeta: 'credencial'
  },
  ineTutorFile: {
    tipo: 'INE_TUTOR',
    campoAlumno: 'ine_tutor_url',
    carpeta: 'ine_tutor'
  },
  fotoJugadorFile: {
    tipo: 'FOTO',
    campoAlumno: 'foto_url',
    carpeta: 'foto'
  }
};

export const handleEmailConfirmed = async (req, res) => {
  console.log('🔔 Webhook de confirmación recibido');
  try {
    const { event_type, user } = req.body;
    
    if (event_type === 'signup' && user.email_confirmed_at) {
      // 1. Obtener pre-registro
      const { data: preRegistration, error: preRegError } = await supabaseAdmin
        .from('pre_registros')
        .select('*')
        .eq('auth_id', user.id)
        .single();

      if (preRegError || !preRegistration) {
        throw new Error('Pre-registro no encontrado');
      }

      // 2. Crear tutor y alumno
      const tutor = await createTutor(preRegistration.tutor_data);
      const alumno = await createAlumno(preRegistration.alumno_data);
      await addAlumnoToTutor(tutor.id, alumno.id, { 
        parentesco: preRegistration.tutor_data.parentesco 
      });

      // 3. Procesar documentos
      if (preRegistration.documentos_data) {
        const documentUpdates = {};
        
        for (const [fieldName, fileData] of Object.entries(preRegistration.documentos_data)) {
          const config = DOCUMENT_MAPPING[fieldName];
          if (!config || !fileData) continue;

          try {
            // Generar ruta de almacenamiento
            const fileExt = fileData.originalname.split('.').pop() || 'bin';
            const fileName = `${uuidv4()}.${fileExt}`;
            const storagePath = `alumnos/${alumno.id}/${config.carpeta}/${fileName}`;

            // Convertir y subir archivo
            const fileBuffer = Buffer.from(fileData.buffer, 'base64');
            const { error: uploadError } = await supabaseAdmin.storage
              .from('documentos')
              .upload(storagePath, fileBuffer, {
                contentType: fileData.mimetype,
                upsert: false
              });

            if (uploadError) {
              console.error(`Error subiendo ${config.tipo}:`, uploadError);
              continue;
            }

            // Registrar en documentos_alumno
            const { error: insertError } = await supabaseAdmin
              .from('documentos_alumno')
              .insert({
                alumno_id: alumno.id,
                tipo_documento: config.tipo,
                url: storagePath
              });

            if (insertError) {
              throw new Error(`Error registrando ${config.tipo}: ${insertError.message}`);
            }

            // Preparar actualización para tabla alumnos
            documentUpdates[config.campoAlumno] = storagePath;

          } catch (error) {
            console.error(`Error procesando ${config.tipo}:`, error);
            continue;
          }
        }

        // Actualizar campos de documentos en tabla alumnos
        if (Object.keys(documentUpdates).length > 0) {
          const { error: updateError } = await supabaseAdmin
            .from('alumnos')
            .update(documentUpdates)
            .eq('id', alumno.id);

          if (updateError) {
            console.error('Error actualizando alumno:', updateError);
          }
        }
      }

      // 4. Limpiar pre-registro
      await supabaseAdmin
        .from('pre_registros')
        .delete()
        .eq('id', preRegistration.id);

      return res.status(200).json({ 
        success: true,
        alumnoId: alumno.id,
        tutorId: tutor.id
      });
    }

    res.status(200).json({ success: true, message: 'Evento no manejado' });
  } catch (error) {
    console.error('Error en webhook:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};