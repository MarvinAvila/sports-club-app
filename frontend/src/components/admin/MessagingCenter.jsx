import React, { useState } from 'react';

const MessagingCenter = () => {
  const [message, setMessage] = useState('')
  
  return (
    <div className="bg-primary-800 rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-4 text-accent-400">Centro de Mensajes</h3>
      <textarea
        className="w-full bg-primary-700 border border-primary-600 rounded p-3 text-gray-100 mb-3"
        placeholder="Escribe tu mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
      />
      <button className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-2 px-4 rounded transition-colors">
        Enviar Mensaje
      </button>
    </div>
  )
}

export default MessagingCenter;
