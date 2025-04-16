import React from 'react';
import { exportToExcel } from '../../utils/export';

const StudentActions = ({ students }) => {
  return (
    <div className="actions">
      <button onClick={() => exportToExcel(students)}>Exportar Excel</button>
      <button onClick={() => alert("Recordatorios enviados")}>Enviar Recordatorios</button>
    </div>
  );
};

export default StudentActions;
