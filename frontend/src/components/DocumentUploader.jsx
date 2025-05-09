import React, { useState } from 'react';

const DocumentUploader = ({ 
  title, 
  description, 
  acceptedFormats, 
  onFileUpload, 
  error,
  required 
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Para imágenes, crear preview
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    setFile(selectedFile);
    onFileUpload(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFileUpload(null);
  };

  return (
    <div className={`p-4 rounded-lg border ${
      error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
    }`}>
      <h3 className="font-medium mb-2">
        {title} {required && <span className="text-red-500">*</span>}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      
      {preview && (
        <div className="mb-3 flex justify-center">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-32 rounded-md border border-gray-200"
          />
        </div>
      )}
      
      <div className="border-2 border-dashed rounded-md p-4 text-center">
        <input
          type="file"
          id={`file-upload-${title}`}
          className="hidden"
          onChange={handleFileChange}
          accept={acceptedFormats}
        />
        <label 
          htmlFor={`file-upload-${title}`} 
          className="cursor-pointer block"
        >
          <div className="flex flex-col items-center">
            <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <p className="text-sm">
              {file ? file.name : 'Haz clic para seleccionar archivo'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Formatos: {acceptedFormats}
            </p>
          </div>
        </label>
      </div>
      
      {file && (
        <div className="mt-3 flex justify-between items-center">
          <div>
            <span className="text-sm block">{file.name}</span>
            <span className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </span>
          </div>
          <button 
            onClick={removeFile}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Eliminar
          </button>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};

export default DocumentUploader;