import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { createPago } from '@/api/pagos.api';

const DocumentUploader = ({ purpose, enrollmentId, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor selecciona un archivo');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      // 1. Subir archivo (mantén tu código existente)
      const fileExt = file.name.split('.').pop();
      const fileName = `${purpose}_${Date.now()}.${fileExt}`;
      const filePath = `${purpose}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Obtener URL (mantén tu código existente)
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // 3. Cambia esta parte para crear pago en lugar de actualizar inscripción
      await createPago({
        inscripcion_id: enrollmentId,
        comprobante_url: publicUrl,
        estado: 'pendiente',
        fecha_pago: new Date().toISOString(),
        monto: 0 // Puedes obtener este valor del contexto si es necesario
      });

      setSuccess('Comprobante subido exitosamente');
      setFile(null);
      onUploadSuccess?.(); // Notificar al componente padre
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-primary-800 rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-4 text-accent-400">Subir Documentos</h3>
      <div className="border-2 border-dashed border-primary-600 rounded-lg p-6 text-center">
        <input 
          type="file" 
          className="hidden" 
          id="file-upload"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <label 
          htmlFor="file-upload" 
          className="cursor-pointer block"
        >
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <p className="text-sm text-gray-300 mb-1">
              {file ? file.name : 'Arrastra tu archivo aquí o haz clic para seleccionar'}
            </p>
            <p className="text-xs text-gray-500">Formatos soportados: .pdf, .jpg, .png</p>
          </div>
        </label>
      </div>
      
      {file && (
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm text-gray-300 truncate">
            {file.name}
          </span>
          <button 
            onClick={() => setFile(null)}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Eliminar
          </button>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-red-400 text-sm">{error}</div>
      )}
      
      {success && (
        <div className="mt-2 text-green-400 text-sm">{success}</div>
      )}

      <button 
        className="mt-4 bg-success hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors w-full"
        disabled={!file || uploading}
        onClick={handleUpload}
      >
        {uploading ? 'Subiendo...' : 'Subir Documento'}
      </button>
    </div>
  );
};

export default DocumentUploader;