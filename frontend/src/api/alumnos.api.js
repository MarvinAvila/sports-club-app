const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export async function getAlumnoById(id) {
  try {
    const res = await fetch(`${BACKEND_URL}/alumnos/${id}`);

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.error || 'Error al obtener el alumno');
    }

    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error('Error al obtener el alumno:', err);
    throw err;
  }
}
