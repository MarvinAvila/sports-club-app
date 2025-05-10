import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const AlumnoQR = ({ alumnoId, nombre, apellido }) => {
  // Genera la URL completa para el QR
  const qrValue = `${window.location.origin}/alumnos/${alumnoId}/pagos`;

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-lg font-semibold text-blue-400 mb-2">Código QR para Pagos</h2>
      <p className="text-sm text-gray-300 mb-4">
        Escanea este código para realizar pagos asociados a {nombre} {apellido}
      </p>

      <div className="p-3 bg-white rounded-lg shadow-md">
        <QRCodeSVG 
          value={qrValue}
          size={160}
          level="H"
          fgColor="#1e40af"
          bgColor="#ffffff"
          includeMargin={true}
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-300">
          {nombre} {apellido}
        </p>
        <p className="text-xs text-gray-500 mt-1">ID: {alumnoId}</p>
        <button 
          onClick={() => navigator.clipboard.writeText(qrValue)}
          className="mt-2 px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-xs"
        >
          Copiar enlace
        </button>
      </div>
    </div>
  );
};

export default AlumnoQR;