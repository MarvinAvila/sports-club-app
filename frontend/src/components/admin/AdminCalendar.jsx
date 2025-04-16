import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdminCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <h3>Calendario de entrenamientos y partidos</h3>
      <Calendar onChange={onChange} value={value} />
      <p>Fecha seleccionada: {value.toDateString()}</p>
    </div>
  );
};

export default AdminCalendar;
