import React from "react";

const Step1PersonalInfo = ({ formData, errors, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { label: "Apellido Paterno", name: "apellidoPaterno", type: "text" },
        { label: "Apellido Materno", name: "apellidoMaterno", type: "text" },
        { label: "Nombre", name: "nombre", type: "text" },
        { label: "Clave CURP", name: "curp", type: "text" },
        { label: "Fecha de Nacimiento", name: "fechaNacimiento", type: "date" },
        { label: "Tipo de Sangre", name: "tipoSangre", type: "text" },
        { label: "Lugar de Nacimiento", name: "lugarNacimiento", type: "text" },
        { label: "Nivel de Estudios", name: "nivelEstudios", type: "text" },
        { label: "Municipio de Residencia", name: "municipioResidencia", type: "text" },
        { label: "Código Postal", name: "codigoPostal", type: "text" },
        { label: "Número de Camiseta", name: "numeroCamiseta", type: "number" },
      ].map(({ label, name, type }) => (
        <div key={name} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            <span className="text-red-500">*</span>
          </label>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={`block w-full px-4 py-2 rounded-lg border ${
              errors[name] 
                ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm`}
          />
          {errors[name] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[name]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Step1PersonalInfo;