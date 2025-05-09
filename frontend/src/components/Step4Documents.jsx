import React from "react";

const Step4Documents = ({ files, errors, handleFileUpload }) => {
  const handleChange = (e) => {
    const { name, files } = e.target;
    handleFileUpload(name, files[0]);
  };

  const documentTypes = [
    { label: "CURP", name: "curpFile", accept: "application/pdf,image/*" },
    { label: "Acta de Nacimiento", name: "actaNacimientoFile", accept: "application/pdf,image/*" },
    { label: "Credencial Escolar", name: "credencialEscolarFile", accept: "application/pdf,image/*" },
    { label: "INE del Tutor", name: "ineTutorFile", accept: "application/pdf,image/*" },
    { 
      label: "Foto del Jugador (máx 50KB)", 
      name: "fotoJugadorFile", 
      accept: "image/*",
      description: "Foto tamaño pasaporte, fondo blanco"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
        <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200 mb-4">
          Documentos Requeridos
        </h3>
        <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
          Por favor sube los siguientes documentos en formato PDF o imagen. Asegúrate de que sean legibles.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentTypes.map(({ label, name, accept, description }) => (
            <div key={name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
                <span className="text-red-500">*</span>
              </label>
              
              <div className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg ${
                errors[name] 
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20" 
                  : files[name] 
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                    : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50"
              } transition-colors duration-200`}>
                <div className="text-center">
                  <input
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={handleChange}
                    className="hidden"
                    id={`file-upload-${name}`}
                  />
                  <label
                    htmlFor={`file-upload-${name}`}
                    className="cursor-pointer flex flex-col items-center"
                  >
                    {files[name] ? (
                      <>
                        <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {files[name].name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Haz clic para cambiar
                        </span>
                      </>
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Seleccionar archivo
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>
              
              {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              )}
              
              {errors[name] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors[name]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step4Documents;