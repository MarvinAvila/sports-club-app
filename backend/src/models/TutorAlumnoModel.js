// models/tutores_alumnos/TutorAlumnoModel.js
import { supabaseAdmin } from '../config/supabaseClient.js';

export const addAlumnoToTutor = async (tutorId, alumnoId, relationshipData = {}) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .insert([{
        tutor_id: tutorId,
        alumno_id: alumnoId,
        ...relationshipData  // Datos adicionales como parentesco, etc.
      }])
      .select();

    if (error) throw new Error('Error al asignar alumno al tutor');
    return data[0];  // Devuelve el registro creado
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTutorAlumno = async (tutorAlumnoData) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .insert([tutorAlumnoData])
      .select();

    if (error) throw new Error('Error al crear relación tutor-alumno');
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTutorAlumno = async (tutorId, alumnoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .delete()
      .eq('tutor_id', tutorId)
      .eq('alumno_id', alumnoId);

    if (error) throw new Error('Error al eliminar relación tutor-alumno');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAlumnosByTutor = async (tutorId) => {
  try {
    console.log('Obteniendo alumnos para el tutor:', tutorId);
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .select(`
        parentesco,
        alumnos:alumno_id (
          id,
          nombre,
          apellido_paterno,
          apellido_materno,
          fecha_nacimiento,
          genero,
          foto_url,
          alergias,
          observaciones_medicas,
          curp,
          tipo_sangre,
          lugar_nacimiento,
          nivel_estudios,
          municipio_residencia,
          codigo_postal,
          numero_camiseta,
          cirugias_previas,
          afecciones_medicas,
          nombre_padres,
          telefonos_contacto,
          documento_curp_url,
          acta_nacimiento_url,
          credencial_escolar_url,
          ine_tutor_url
        )
      `)
      .eq('tutor_id', tutorId);

    if (error) throw new Error('Error al obtener alumnos del tutor: ' + error.message);
    
    // Formatear la respuesta para aplanar la estructura
    return data.map(item => ({
      ...item.alumnos,  // Todos los campos del alumno
      parentesco: item.parentesco  // Campo adicional de la relación
    }));
  } catch (error) {
    console.error('Error en getAlumnosByTutor:', error);
    throw new Error('No se pudieron obtener los alumnos: ' + error.message);
  }
};

export const getTutoresByAlumno = async (alumnoId) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tutores_alumnos')
      .select(`
        parentesco,
        tutores:tutor_id(*)
      `)
      .eq('alumno_id', alumnoId);

    if (error) throw new Error('Error al obtener tutores del alumno');
    
    return data.map(item => ({
      ...item.tutores,
      parentesco: item.parentesco
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};