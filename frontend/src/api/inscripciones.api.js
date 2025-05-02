
import { apiRequest } from '@/utils/api';

export const fetchInscripcionesByTutor = async (tutorId) => {
    try {
      const response = await apiRequest('GET', `/api/inscripciones/tutor/${tutorId}`);
      if (!response.success) {
        throw new Error(response.error || 'Error al obtener inscripciones');
      }
      return response.data;
    } catch (error) {
      console.error('Error en fetchInscripcionesByTutor:', {
        tutorId,
        error: error.message
      });
      throw error;
    }
  };
  
export const createInscripcion = async (inscripcionData) => {
  try {
    const response = await apiRequest('POST', '/api/inscripciones', inscripcionData);
    return response.data;
  } catch (error) {
    console.error('Error creating inscripción:', error);
    throw error;
  }
};