import { useState, useEffect } from 'react';
import { getAllStudents } from '../api/students.api';

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getAllStudents();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const filtered = students.filter(s => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  return { students: filtered, setFilter };
}
