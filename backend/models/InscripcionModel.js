import { supabaseAdmin } from '../config/supabaseClient.js';

export const getInscripcionById = async (inscripcionId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('inscripciones')
      .select(`
        *,
        alumnos:alumno_id(*),
        deportes:deporte_id(*)
      `)
      .eq('id', inscripcionId)
      .single();

    if (error) throw new Error('Error al obtener la inscripción');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllInscripciones = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('inscripciones')
      .select(`
        *,
        alumnos:alumno_id(nombre, apellido_paterno, apellido_materno),
        deportes:deporte_id(nombre)
      `);

    if (error) throw new Error('Error al obtener las inscripciones');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createInscripcion = async (inscripcionData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('inscripciones')
      .insert([{
        ...inscripcionData,
        estado: 'pendiente' // Estado por defecto
      }])
      .select();

    if (error) throw new Error('Error al crear la inscripción');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateInscripcion = async (inscripcionId, updateData) => {
  try {
    // Validar que el estado sea uno de los permitidos
    if (updateData.estado && !['pendiente', 'activa', 'vencida'].includes(updateData.estado)) {
      throw new Error('Estado de inscripción no válido');
    }

    const { data, error } = await supabaseAdmin
      .from('inscripciones')
      .update(updateData)
      .eq('id', inscripcionId)
      .select();

    if (error) throw new Error('Error al actualizar la inscripción');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteInscripcion = async (inscripcionId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('inscripciones')
      .delete()
      .eq('id', inscripcionId);

    if (error) throw new Error('Error al eliminar la inscripción');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getInscripcionesByTutor = async (tutorId) => {
  try {
    // Obtener alumnos del tutor
    const { data: tutorAlumnos, error: taError } = await supabaseAdmin
      .from('tutores_alumnos')
      .select('alumno_id')
      .eq('tutor_id', tutorId);
    
    if (taError) throw taError;
    
    const alumnoIds = tutorAlumnos.map(ta => ta.alumno_id);
    if (alumnoIds.length === 0) return [];
    
    // Obtener inscripciones con datos relacionados
    const { data: inscripciones, error: insError } = await supabaseAdmin
      .from('inscripciones')
      .select(`
        id,
        estado,
        temporada,
        fecha_inscripcion,
        comprobante_pago_url,
        alumnos:alumno_id(nombre, apellido_paterno, apellido_materno, foto_url),
        deportes:deporte_id(nombre, precio_inscripcion)
      `)
      .in('alumno_id', alumnoIds)
      .order('fecha_inscripcion', { ascending: false });
    
    if (insError) throw insError;
    
    return inscripciones || [];
  } catch (error) {
    throw new Error(`Error al obtener inscripciones: ${error.message}`);
  }
};

export const getInscripcionesByAlumno = async (alumnoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('inscripciones')
      .select(`
        *,
        deportes:deporte_id(*)
      `)
      .eq('alumno_id', alumnoId);
    
    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Error al obtener inscripciones del alumno: ${error.message}`);
  }
};

export const getInscripcionesByDeporte = async (deporteId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('inscripciones')
      .select(`
        *,
        alumnos:alumno_id(*)
      `)
      .eq('deporte_id', deporteId);
    
    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Error al obtener inscripciones del deporte: ${error.message}`);
  }
};