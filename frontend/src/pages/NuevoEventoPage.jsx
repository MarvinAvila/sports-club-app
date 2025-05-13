import React from "react";
// Verifica mayúsculas/minúsculas y extensión


const NuevoEventoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-purple-800">Crear Nuevo Evento</h1>
      <form className="bg-white rounded-lg shadow-md p-6 space-y-4 max-w-lg mx-auto">
        <div>
          <label className="block mb-1 font-medium">Nombre del evento</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Ej. Torneo de Voleibol"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Fecha</label>
          <input type="date" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Hora</label>
          <input type="time" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Descripción</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Detalles del evento..."
          ></textarea>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
          Guardar Evento
        </button>
      </form>
    </div>
  );
};

export default NuevoEventoPage;
