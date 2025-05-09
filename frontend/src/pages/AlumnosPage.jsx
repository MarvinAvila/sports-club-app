
import React, { useState } from "react";

const AlumnosPage = () => {
  const [qr, setQr] = useState(null);
  const alumnoId = "ID_DEL_ALUMNO"; // ← Reemplaza con el ID real

  const generarQR = async () => {
    try {
      const res = await fetch(`http://localhost:3000/pagos/qr/${alumnoId}`);
      const data = await res.json();
      if (data.success) {
        setQr(data.qrCode);
      } else {
        console.error("No se pudo generar el QR");
      }
    } catch (err) {
      console.error("Error al generar el QR:", err);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Gestión de Alumnos</h1>
      <p>Aquí puedes ver y administrar los alumnos.</p>

      <button
        onClick={generarQR}
        className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Generar QR para pago
      </button>

      {qr && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">QR de pago</h2>
          <img
            src={qr}
            alt="QR para pago"
            className="w-48 h-48 border border-white p-2"
          />
        </div>
      )}
    </div>
  );
};

export default AlumnosPage;
