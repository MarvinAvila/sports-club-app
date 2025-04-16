import React, { useState } from 'react';

const MessagingCenter = () => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Aquí deberías conectar a Supabase o API backend
    alert(`Mensaje enviado a ${recipient}: "${message}"`);
  };

  return (
    <div>
      <h3>Centro de Mensajes</h3>
      <input
        type="text"
        placeholder="Nombre del destinatario"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <textarea
        placeholder="Escribe tu mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};

export default MessagingCenter;
