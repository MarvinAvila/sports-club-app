const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
import { supabase } from '../lib/supabaseClient';

export async function getAlumnosByTutor(tutorId) {
  try {
    // 1. Obtener la sesión actual de Supabase
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('Error al obtener sesión:', sessionError);
      throw new Error('No autenticado - Por favor inicie sesión');
    }

    // 2. Usar el token de acceso de la sesión
    const res = await fetch(`${BACKEND_URL}/api/tutor/${tutorId}/alumnos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    });

    // 3. Manejar respuesta no exitosa
    if (!res.ok) {
      if (res.status === 401) {
        // Cerrar sesión y redirigir si no autorizado
        await supabase.auth.signOut();
        window.location.href = '/login';
        throw new Error('Sesión expirada - Por favor inicie sesión nuevamente');
      }
      
      const errorData = await res.json();
      throw new Error(errorData.error || `Error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error('Error en getAlumnosByTutor:', err);
    throw err;
  }
}

// Nueva función para obtener datos básicos del alumno (opcional)
export async function getAlumnoBasicInfo(alumnoId) {
  try {
    const res = await fetch(`${BACKEND_URL}/alumnos/${alumnoId}/basic`);
    if (!res.ok) throw new Error('Error al obtener alumno');
    return await res.json();
  } catch (err) {
    console.error('Error al obtener alumno:', err);
    throw err;
  }
}

export async function getAlumnoById(id) {
  try {
    const res = await fetch(`${BACKEND_URL}/alumnos/${id}`);
    if (!res.ok) throw new Error('Error al obtener alumno');
    return await res.json();
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}

export async function generarQRPago(alumnoId) {
  try {
    // 1. Obtener sesión
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      throw new Error('Sesión no válida');
    }

    // 2. Validar ID de alumno
    if (!alumnoId || typeof alumnoId !== 'string') {
      throw new Error('ID de alumno inválido');
    }

    // 3. Realizar petición
    const response = await fetch(`${BACKEND_URL}/api/pagos/qr/${alumnoId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    });

    // 4. Manejar respuesta
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Error en generarQRPago:', error);
    throw new Error(error.message || 'Error al generar el código QR');
  }
}