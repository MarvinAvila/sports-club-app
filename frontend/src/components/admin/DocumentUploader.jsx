import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const DocumentUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const { error } = await supabase.storage
      .from('comprobantes') // Asegúrate que el bucket existe
      .upload(`comprobantes/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      setMessage('Error al subir el archivo.');
    } else {
      setMessage('Archivo subido correctamente.');
    }
    setUploading(false);
  };

  return (
    <div>
      <h3>Subir comprobante de pago</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Subiendo...' : 'Subir'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DocumentUploader;
