import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdminCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="text-gray-900"> {/* Contenedor principal */}
      <Calendar 
        onChange={onChange} 
        value={value}
        className="bg-gray-700 border-gray-600 rounded-lg p-2"
        tileClassName={({ date, view }) => 
          view === 'month' && date.toDateString() === new Date().toDateString() 
            ? 'bg-purple-600 text-white rounded-full' 
            : null
        }
      />
      <p className="mt-2 text-gray-300 text-center">
        Fecha seleccionada: <span className="font-semibold">{value.toDateString()}</span>
      </p>
    </div>
  );
};

export default AdminCalendar;