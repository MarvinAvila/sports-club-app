import React from 'react';

const StudentTable = ({ students = [] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Estado</th>
          <th>Pago</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.status}</td>
            <td>{s.hasPaid ? 'Sí' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
