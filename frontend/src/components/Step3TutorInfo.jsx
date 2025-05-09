import React from "react";

const Step3TutorInfo = ({ formData, errors, handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-medium text-purple-800 dark:text-purple-200 mb-4">
          Información del Tutor
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Nombre del Tutor", name: "nombreTutor", type: "text" },
            { label: "Apellido Paterno del Tutor", name: "apellidoPaternoTutor", type: "text" },
            { label: "Apellido Materno del Tutor", name: "apellidoMaternoTutor", type: "text" },
            { label: "Email del Tutor", name: "emailTutor", type: "email" },
            { label: "Teléfonos de Contacto", name: "telefonosContacto", type: "tel" },
            { label: "Parentesco", name: "parentesco", type: "text" },
            { label: "Contraseña", name: "password", type: "password" },
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
      </div>
    </div>
  );
};

export default Step3TutorInfo;