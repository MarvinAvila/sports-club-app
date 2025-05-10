const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';


export async function getAlumnosByTutor(tutorId) {
  try {
    // Obtener el token de Supabase correctamente
    const token = localStorage.getItem('sb-access-token'); // Token de Supabase
    
    if (!token) {
      throw new Error('No se encontró token de autenticación');
    }

    const res = await fetch(`${BACKEND_URL}/api/tutor/${tutorId}/alumnos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Importante para cookies de sesión
    });
    
    if (!res.ok) {
      // Manejo especial para errores 401
      if (res.status === 401) {
        // Limpiar almacenamiento local y redirigir
        localStorage.removeItem('sb-access-token');
        localStorage.removeItem('sb-refresh-token');
        window.location.href = '/login';
        throw new Error('Sesión expirada. Por favor inicie sesión nuevamente');
      }
      
      // Leer el error una sola vez
      const errorData = await res.json();
      throw new Error(errorData.error || `Error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error('Error al obtener alumnos del tutor:', err);
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
    const res = await fetch(`${BACKEND_URL}/pagos/qr/${alumnoId}`);
    
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