import React from 'react';
import '../../styles/admin.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Panel Admin</h2>
        <nav>
          <ul>
            <li>Alumnos</li>
            <li>Calendario</li>
            <li>Reportes</li>
          </ul>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
};

export default AdminLayout;
