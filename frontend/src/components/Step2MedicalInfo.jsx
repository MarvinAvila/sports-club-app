import React from "react";

const Step2MedicalInfo = ({ formData, errors, handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-4">
          Información Médica Importante
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Alergias", name: "alergias", type: "text", placeholder: "Ej: Penicilina, nueces..." },
            { label: "Cirugías", name: "cirugias", type: "text", placeholder: "Ej: Apendicectomía..." },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
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

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Afecciones médicas
        </label>
        <input
          type="text"
          name="afecciones"
          value={formData.afecciones}
          onChange={handleChange}
          placeholder="Ej: Asma, diabetes, hipertensión..."
          className={`block w-full px-4 py-2 rounded-lg border ${
            errors.afecciones 
              ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
              : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm`}
        />
        {errors.afecciones && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.afecciones}</p>
        )}
      </div>
    </div>
  );
};

export default Step2MedicalInfo;