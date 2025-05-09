import React from 'react';
import { exportToExcel } from '../../utils/export';

const StudentActions = ({ students, onSendReminders }) => {
  // Función de depuración para verificar si los datos llegan correctamente
  const handleExportClick = () => {
    console.log("Botón de Exportar Excel presionado");
    console.log("Datos de estudiantes:", students);

    // Si no hay estudiantes, generar archivo con encabezados vacíos
    const dataToExport = (!students || students.length === 0) 
      ? [{ Alumno: "", Deporte: "", Temporada: "", Estado: "" }]
      : students;

    exportToExcel(dataToExport);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleExportClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Exportar Excel
      </button>
      <button
        onClick={() => { console.log("Botón de Enviar Recordatorios presionado"); }}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Enviar Recordatorios
      </button>
    </div>
  );
};

export default StudentActions;