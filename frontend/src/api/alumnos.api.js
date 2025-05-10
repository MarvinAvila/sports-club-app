const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export async function getAlumnosByTutor(tutorId) {
  try {
    const res = await fetch(`${BACKEND_URL}/alumnos/tutor/${tutorId}`);
    
    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.error || 'Error al obtener alumnos del tutor');
    }

    const { data } = await res.json();
    return data;
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