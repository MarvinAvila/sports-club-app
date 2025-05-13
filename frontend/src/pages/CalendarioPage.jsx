import React from "react";
import { useNavigate } from "react-router-dom";

const CalendarioPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-indigo-800">Calendario</h1>
      <p className="mb-6">Aquí puedes ver y gestionar el calendario de actividades del club.</p>

      {/* Imagen representativa */}
      <div className="flex justify-center mb-6">
        <img
          src="/calendar-icon.png" // Asegúrate de tener esta imagen en la carpeta /public
          alt="Calendario"
          className="w-32 h-32"
        />
      </div>

      {/* Sección de actividades programadas */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700">Próximas Actividades</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Partido amistoso - 10 de mayo</li>
          <li>Torneo interclubes - 18 de mayo</li>
          <li>Capacitación de entrenadores - 25 de mayo</li>
        </ul>
      </div>

      {/* Botón de acción */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/nuevo-evento")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
        >
          Crear nuevo evento
        </button>
      </div>
    </div>
  );
};

export default CalendarioPage;
