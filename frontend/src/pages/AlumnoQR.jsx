import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const AlumnoQR = ({ alumnoId, nombre, apellido, qrCode }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-lg font-semibold text-blue-400 mb-2">Código QR para Pagos</h2>
      <p className="text-sm text-gray-300 mb-4">
        Escanea este código para realizar pagos asociados a {nombre} {apellido}
      </p>

      {/* Mostrar el QR como imagen */}
      <div className="p-3 bg-white rounded-lg shadow-md">
        <img 
          src={qrCode} 
          alt={`QR para pagos de ${nombre} ${apellido}`}
          className="w-40 h-40"
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-300">
          {nombre} {apellido}
        </p>
        <p className="text-xs text-gray-500 mt-1">ID: {alumnoId}</p>
      </div>
    </div>
  );
};

export default AlumnoQR;