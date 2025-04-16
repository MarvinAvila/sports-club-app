import React from 'react';

const sampleLogs = [
  { user: 'admin1', action: 'Modificó datos de Juan', date: '2025-04-13 10:23' },
  { user: 'admin2', action: 'Dio de baja a Luis', date: '2025-04-10 14:55' },
];

const ChangeHistory = () => {
  return (
    <div>
      <h3>Historial de Cambios</h3>
      <ul>
        {sampleLogs.map((log, index) => (
          <li key={index}>
            <strong>{log.user}</strong> — {log.action} <em>({log.date})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChangeHistory;
