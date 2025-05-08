import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { AuthContext } from "../contexts/AuthContextInstance";
import DocumentUploader from "./DocumentUploader";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    // Datos personales
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombre: "",
    curp: "",
    fechaNacimiento: "",
    tipoSangre: "",
    email: "",
    lugarNacimiento: "",
    nivelEstudios: "",
    municipioResidencia: "",
    codigoPostal: "",
    numeroCamiseta: "",
    alergias: "",
    cirugias: "",
    afecciones: "",
    nombrePadres: "",
    telefonosContacto: "",
    password: "",
  });

  const [files, setFiles] = useState({
    curpFile: null,
    actaNacimientoFile: null,
    credencialEscolarFile: null,
    ineTutorFile: null,
    fotoJugadorFile: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileUpload = (fileType, file) => {
    setFiles((prev) => ({ ...prev, [fileType]: file }));
    if (errors[fileType]) setErrors((prev) => ({ ...prev, [fileType]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "apellidoPaterno",
      "apellidoMaterno",
      "nombre",
      "curp",
      "fechaNacimiento",
      "tipoSangre",
      "email",
      "lugarNacimiento",
      "nivelEstudios",
      "municipioResidencia",
      "codigoPostal",
      "numeroCamiseta",
      "nombrePadres",
      "telefonosContacto",
      "password",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = "Este campo es requerido";
    });

    const requiredFiles = [
      "curpFile",
      "actaNacimientoFile",
      "credencialEscolarFile",
      "ineTutorFile",
      "fotoJugadorFile",
    ];

    requiredFiles.forEach((file) => {
      if (!files[file]) newErrors[file] = "Este documento es requerido";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Crear FormData para enviar archivos
      const formDataToSend = new FormData();

      // Agregar campos del formulario
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Agregar archivos
      Object.entries(files).forEach(([key, file]) => {
        if (file) formDataToSend.append(key, file);
      });

      // Registrar usuario
      const userData = await authApi.registerUser(formDataToSend);

      // Iniciar sesión automáticamente
      const authData = await authApi.login(formData.email, formData.password);

      // Guardar en contexto y redirigir
      login(authData.token, authData.role, {
        id: authData.id,
        auth_id: authData.auth_id,
        nombre: `${formData.nombre} ${formData.apellidoPaterno}`,
        email: authData.email,
        telefono: formData.telefonosContacto,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Error en el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sección de Datos Personales */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Datos Personales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Apellido Paterno */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Apellido Paterno *
            </label>
            <input
              name="apellidoPaterno"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.apellidoPaterno}
              onChange={handleChange}
            />
            {errors.apellidoPaterno && (
              <p className="text-red-500 text-xs mt-1">
                {errors.apellidoPaterno}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Apellido Materno *
            </label>
            <input
              name="apellidoMaterno"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.apellidoMaterno}
              onChange={handleChange}
            />
            {errors.apellidoMaterno && (
              <p className="text-red-500 text-xs mt-1">
                {errors.apellidoPaterno}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre(s) *
            </label>
            <input
              name="Nombre"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">
                {errors.nombre}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Clave CURP *
            </label>
            <input
              name="CURP"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.curp}
              onChange={handleChange}
            />
            {errors.curp && (
              <p className="text-red-500 text-xs mt-1">
                {errors.curp}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Fecha de Nacimiento *
            </label>
            <input
              name="FechaNacimiento"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
            {errors.fechaNacimiento && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fechaNacimiento}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo de Sangre *
            </label>
            <input
              name="TipoSangre"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.tipoSangre}
              onChange={handleChange}
            />
            {errors.tipoSangre && (
              <p className="text-red-500 text-xs mt-1">
                {errors.tipoSangre}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Correo Electronico *
            </label>
            <input
              name="CorreoElectronico"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Lugar de Nacimiento *
            </label>
            <input
              name="LugarNacimiento"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.lugarNacimiento}
              onChange={handleChange}
            />
            {errors.lugarNacimiento && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lugarNacimiento}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Nivel de Estudios *
            </label>
            <input
              name="NivelEstudios"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.nivelEstudios}
              onChange={handleChange}
            />
            {errors.nivelEstudios && (
              <p className="text-red-500 text-xs mt-1">
                {errors.nivelEstudios}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Muncipio de Residencia *
            </label>
            <input
              name="MunicipioResidencia"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.municipioResidencia}
              onChange={handleChange}
            />
            {errors.municipioResidencia && (
              <p className="text-red-500 text-xs mt-1">
                {errors.municipioResidencia}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Codigo Postal*
            </label>
            <input
              name="codigoPostal"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.codigoPostal}
              onChange={handleChange}
            />
            {errors.codigoPostal && (
              <p className="text-red-500 text-xs mt-1">
                {errors.codigoPostal}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Número de camiseta *
            </label>
            <input
              name="NumeroCamiseta"
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))]"
              value={formData.numeroCamiseta}
              onChange={handleChange}
            />
            {errors.numeroCamiseta && (
              <p className="text-red-500 text-xs mt-1">
                {errors.numeroCamiseta}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Sección de Información Médica */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Información Médica
        </h2>

        {/* Alergias */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Alergias (si aplica)
          </label>
          <textarea
            name="alergias"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))] min-h-[80px]"
            value={formData.alergias}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Cirugias Previas (si aplica)
          </label>
          <textarea
            name="cirugias"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))] min-h-[80px]"
            value={formData.cirugias}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Affecciones Médicas (si aplica)
          </label>
          <textarea
            name="afecciones"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))] min-h-[80px]"
            value={formData.afecciones}
            onChange={handleChange}
          />
        </div>

        {/* Documentacion De el tutor */}
      </section>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Nombre de los padres o tutores
        </label>
        <textarea
          name="NomebrePadres"
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))] min-h-[80px]"
          value={formData.nombrePadres}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Teléfonos de contacto
        </label>
        <textarea
          name="telefonosContacto"
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-[rgb(var(--card))] min-h-[80px]"
          value={formData.telefonosContacto}
          onChange={handleChange}
        />
      </div>

      {/* Sección de Documentos */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-4">
          Documentación Requerida
        </h2>

        <h2 className="text-xl font-semibold mb-4 ">
          CURP, Acta de nacimiento, Credencial o constancia escolar, INE del tutor
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DocumentUploader
            title="Documentacion "
            description="Sube tu documento en formato PDF"
            acceptedFormats=".pdf"
            onFileUpload={(file) => handleFileUpload("curpFile", file)}
            error={errors.curpFile}
          />
        </div>
      </section>

      {/* Sección de Documentos */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Foto del jugador en formato JPEG (no mayor a 50 KB).
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DocumentUploader
            title="Foto del jugador en formato JPEG "
            description="(no mayor a 50 KB)"
            acceptedFormats=".pdf"
            onFileUpload={(file) => handleFileUpload("curpFile", file)}
            error={errors.curpFile}
          />

          {/* Resto de DocumentUploaders... */}
        </div>
      </section>

      <button
        type="submit"
        className="btn btn-primary w-full mt-6"
        disabled={isLoading}
      >
        {isLoading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default RegisterForm;
