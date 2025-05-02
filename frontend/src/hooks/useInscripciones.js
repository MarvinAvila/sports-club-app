import { useState, useEffect } from 'react';
import { fetchInscripcionesByTutor } from '@/api/inscripciones.api';

export default function useInscripciones(tutorId) {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!tutorId) return;
      
      try {
        setLoading(true);
        const data = await fetchInscripcionesByTutor(tutorId);
        setInscripciones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tutorId]);

  return { inscripciones, loading, error, refetch: fetchInscripcionesByTutor };
}