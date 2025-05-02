import { useState, useEffect } from 'react';
import { fetchStudents, fetchEnrollments, updateEnrollmentStatus as apiUpdateStatus } from '@/api/students.api';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [studentsData, enrollmentsData] = await Promise.all([
          fetchStudents(),
          fetchEnrollments()
        ]);
        setStudents(studentsData);
        setEnrollments(enrollmentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateStatus = async (enrollmentId, newStatus) => {
    try {
      await apiUpdateStatus(enrollmentId, newStatus);
      setEnrollments(prev => prev.map(e => 
        e.id === enrollmentId ? { ...e, estado: newStatus } : e
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  return { students, enrollments, loading, error, updateStatus };
};
export default useStudents;