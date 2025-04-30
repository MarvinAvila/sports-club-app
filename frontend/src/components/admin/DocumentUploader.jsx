import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const DocumentUploader = () => {
  const [file, setFile] = useState(null)

  return (
    <div className="bg-primary-800 rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-4 text-accent-400">Subir Documentos</h3>
      <div className="border-2 border-dashed border-primary-600 rounded-lg p-6 text-center">
        <input 
          type="file" 
          className="hidden" 
          id="file-upload"
          onChange={(e) => setFile(e.target.files[0])}
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
      <button 
        className="mt-4 bg-success hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors w-full"
        disabled={!file}
      >
        Subir Documento
      </button>
    </div>
  )
}
export default DocumentUploader;
