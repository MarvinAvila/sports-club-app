import { supabaseAdmin } from '../config/supabaseClient.js';

export const getDocumentoById = async (documentoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('documentos_alumno')
      .select('*')
      .eq('id', documentoId)
      .single();

    if (error) throw new Error('Error al obtener el documento');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDocumentosByAlumno = async (alumnoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('documentos_alumno')
      .select('*')
      .eq('alumno_id', alumnoId);

    if (error) throw new Error('Error al obtener documentos del alumno');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createDocumentoAlumno = async (documentoData) => {
  try {
    // Validar el tipo de documento
    const tiposPermitidos = ['CURP', 'ACTA_NACIMIENTO', 'CREDENCIAL_ESCOLAR', 'INE_TUTOR', 'FOTO'];
    if (!tiposPermitidos.includes(documentoData.tipo_documento)) {
      throw new Error('Tipo de documento no válido');
    }

    const { data, error } = await supabaseAdmin
      .from('documentos_alumno')
      .insert([documentoData])
      .select();

    if (error) throw new Error('Error al crear el documento');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateDocumentoAlumno = async (documentoId, updateData) => {
  try {
    // Si se actualiza el tipo_documento, validarlo
    if (updateData.tipo_documento) {
      const tiposPermitidos = ['CURP', 'ACTA_NACIMIENTO', 'CREDENCIAL_ESCOLAR', 'INE_TUTOR', 'FOTO'];
      if (!tiposPermitidos.includes(updateData.tipo_documento)) {
        throw new Error('Tipo de documento no válido');
      }
    }

    const { data, error } = await supabaseAdmin
      .from('documentos_alumno')
      .update(updateData)
      .eq('id', documentoId)
      .select();

    if (error) throw new Error('Error al actualizar el documento');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteDocumentoAlumno = async (documentoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('documentos_alumno')
      .delete()
      .eq('id', documentoId);

    if (error) throw new Error('Error al eliminar el documento');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDocumentoByTipo = async (alumnoId, tipoDocumento) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('documentos_alumno')
      .select('*')
      .eq('alumno_id', alumnoId)
      .eq('tipo_documento', tipoDocumento)
      .maybeSingle(); // Devuelve null si no hay resultados

    if (error) throw new Error('Error al obtener el documento por tipo');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función específica para el manejo de documentos en el registro
export const handleDocumentosRegistro = async (alumnoId, files) => {
  const documentos = [
    { tipo: 'CURP', file: files.curpFile?.[0] },
    { tipo: 'ACTA_NACIMIENTO', file: files.actaNacimientoFile?.[0] },
    { tipo: 'CREDENCIAL_ESCOLAR', file: files.credencialEscolarFile?.[0] },
    { tipo: 'INE_TUTOR', file: files.ineTutorFile?.[0] },
    { tipo: 'FOTO', file: files.fotoJugadorFile?.[0] }
  ];

  const resultados = [];

  for (const doc of documentos) {
    if (doc.file) {
      try {
        // Subir a Supabase Storage
        const filePath = `documentos/${alumnoId}/${doc.tipo}_${Date.now()}.${doc.file.originalname.split('.').pop()}`;
        
        const { error: uploadError } = await supabaseAdmin.storage
          .from('documentos')
          .upload(filePath, doc.file.buffer, {
            contentType: doc.file.mimetype,
            upsert: false
          });

        if (uploadError) {
          console.error(`Error subiendo ${doc.tipo}:`, uploadError);
          resultados.push({ tipo: doc.tipo, success: false, error: uploadError.message });
          continue;
        }

        // Obtener URL pública
        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('documentos')
          .getPublicUrl(filePath);

        // Registrar documento en la base de datos
        const { data: documentoDB, error: dbError } = await supabaseAdmin
          .from('documentos_alumno')
          .insert([{
            alumno_id: alumnoId,
            tipo_documento: doc.tipo,
            url: publicUrl
          }])
          .select()
          .single();

        if (dbError) {
          console.error(`Error registrando ${doc.tipo} en DB:`, dbError);
          resultados.push({ tipo: doc.tipo, success: false, error: dbError.message });
          continue;
        }

        resultados.push({ tipo: doc.tipo, success: true, data: documentoDB });

      } catch (error) {
        console.error(`Error procesando ${doc.tipo}:`, error);
        resultados.push({ tipo: doc.tipo, success: false, error: error.message });
      }
    }
  }

  return resultados;
};