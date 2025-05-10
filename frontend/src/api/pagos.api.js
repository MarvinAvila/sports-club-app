// pagos.api.js
import { apiRequest } from '@/utils/api'; // Ruta clara y consistente

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export const createPago = async (pagoData) => {
  try {
    const response = await apiRequest('POST', '/api/pagos', pagoData);
    return response.data;
  } catch (error) {
    console.error('Error creating pago:', error);
    throw error;
  }
};

export async function generarQRPago(alumnoId) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/pagos/qr/${alumnoId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.error || 'Error al generar QR');
    }

    return await res.json();
  } catch (err) {
    console.error('Error al generar QR:', err);
    throw err;
  }
}

export const getPagosByInscripcion = async (inscripcionId) => {
  try {
    const response = await apiRequest('GET', `/api/pagos/inscripcion/${inscripcionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pagos:', error);
    throw error;
  }
};