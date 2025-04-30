import React from 'react';
import { exportToExcel } from '../../utils/export';

const StudentActions = ({ students, onSendReminders }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => exportToExcel(students)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Exportar Excel
      </button>
      <button
        onClick={onSendReminders}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Enviar Recordatorios
      </button>
    </div>
  );
};

export default StudentActions;