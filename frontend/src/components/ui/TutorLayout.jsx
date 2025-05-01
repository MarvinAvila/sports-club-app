// components/layouts/TutorLayout.jsx
import React from 'react';

const TutorLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100 w-full">
      {/* Sidebar específico para tutor */}
      <div className="w-64 bg-gray-800 p-6 flex-shrink-0 border-r border-gray-700 fixed h-full">
        {/* Contenido del sidebar del tutor */}
        {children.props.sidebarContent}
      </div>

      {/* Contenido principal con margen para el sidebar */}
      <div className="ml-64 flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
};

export default TutorLayout;