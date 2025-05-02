import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useTutorData = (tutorId) => {
  const [enrollments, setEnrollments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!tutorId) return;
      
      try {
        setLoading(true);
        
        // Obtener alumnos del tutor
        const { data: tutorAlumnos, error: taError } = await supabase
          .from('tutores_alumnos')
          .select('alumno_id')
          .eq('tutor_id', tutorId);
        
        if (taError) throw taError;
        
        const alumnoIds = tutorAlumnos.map(ta => ta.alumno_id);
        
        // Obtener inscripciones
        const { data: inscripciones, error: insError } = await supabase
          .from('inscripciones')
          .select(`
            id,
            estado,
            temporada,
            fecha_inscripcion,
            comprobante_pago_url,
            alumnos:alumno_id(nombre, foto_url),
            deportes:deporte_id(nombre, precio_inscripcion)
          `)
          .in('alumno_id', alumnoIds);
        
        if (insError) throw insError;
        
        // Obtener notificaciones
        const { data: notifs, error: notifError } = await supabase
          .from('notificaciones')
          .select('*')
          .eq('tutor_id', tutorId)
          .order('creada_en', { ascending: false });
        
        if (notifError) throw notifError;
        
        setEnrollments(inscripciones || []);
        setNotifications(notifs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [tutorId]);

  return { enrollments, notifications, loading, error };
};