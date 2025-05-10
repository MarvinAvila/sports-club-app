import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const AlumnoQR = ({ alumnoId, nombre, apellido }) => {
  // Genera la URL completa para el QR
  const qrValue = `${window.location.origin}/alumnoqr/${alumnoId}`;

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Generar Código QR</h2>

      <div className="p-3 bg-white rounded-lg shadow-md">
        <QRCodeSVG 
          value={qrValue}
          size={160}
          level="H" // Máxima corrección de errores
          fgColor="#1e40af" // Color azul oscuro
          bgColor="#ffffff"
          includeMargin={true}
        />
      </div>

      <p className="mt-2 text-sm text-gray-300">
        {nombre} {apellido}
      </p>
      <p className="text-xs text-gray-500 mt-1">ID: {alumnoId}</p>
    </div>
  );
};

export default AlumnoQR;
