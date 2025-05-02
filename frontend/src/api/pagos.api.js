// pagos.api.js
import { apiRequest } from '@/utils/api'; // Ruta clara y consistente

export const createPago = async (pagoData) => {
  try {
    const response = await apiRequest('POST', '/api/pagos', pagoData);
    return response.data;
  } catch (error) {
    console.error('Error creating pago:', error);
    throw error;
  }
};

export const getPagosByInscripcion = async (inscripcionId) => {
  try {
    const response = await apiRequest('GET', `/api/pagos/inscripcion/${inscripcionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pagos:', error);
    throw error;
  }
};