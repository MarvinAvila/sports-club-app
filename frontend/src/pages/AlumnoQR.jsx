import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { getAlumnoById } from '../api/alumnos.api';

const AlumnoQR = () => {
  const { id } = useParams();
  const [alumno, setAlumno] = useState(null);
  const paymentUrl = `http://localhost:3000/pago/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAlumnoById(id);
        setAlumno(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [id]);

  if (!alumno) return <p>Cargando alumno...</p>;

  return (
    <div>
      <h2>QR para {alumno.nombre} {alumno.apellido_paterno}</h2>
      <QRCode value={paymentUrl} />
    </div>
  );
};

export default AlumnoQR;
