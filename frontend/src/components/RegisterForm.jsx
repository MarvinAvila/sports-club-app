import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { AuthContext } from "../contexts/AuthContextInstance";
import { validateCURP, parseCURP } from "../utils/curpValidator";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2MedicalInfo from "./Step2MedicalInfo";
import Step3TutorInfo from "./Step3TutorInfo";
import Step4Documents from "./Step4Documents";
import Modal from "../components/ui/Modal";

const RegisterForm = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
    nombreTutor: "",
    apellidoPaternoTutor: "",
    apellidoMaternoTutor: "",
    emailTutor: "",
    telefonosContacto: "",
    parentesco: "",
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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "curp") {
      const upperValue = value.toUpperCase();
      setFormData((prev) => ({ ...prev, [name]: upperValue }));
      if (upperValue.length === 18) {
        const validation = validateCURP(upperValue);
        if (!validation.isValid) {
          setErrors((prev) => ({ ...prev, curp: validation.error }));
        } else {
          try {
            const curpData = parseCURP(upperValue);
            setFormData((prev) => ({
              ...prev,
              fechaNacimiento: curpData.fechaNacimiento
                .toISOString()
                .split("T")[0],
            }));
            setErrors((prev) => ({ ...prev, curp: "" }));
          } catch (error) {
            setErrors((prev) => ({ ...prev, curp: error.message }));
          }
        }
      } else {
        setErrors((prev) => ({ ...prev, curp: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileUpload = (fileType, file) => {
    setFiles((prev) => ({ ...prev, [fileType]: file }));
    if (errors[fileType]) setErrors((prev) => ({ ...prev, [fileType]: "" }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      const requiredFields = [
        "apellidoPaterno",
        "nombre",
        "curp",
        "fechaNacimiento",
        "tipoSangre",
        "lugarNacimiento",
        "municipioResidencia",
        "codigoPostal",
      ];
      
      requiredFields.forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = "Este campo es requerido";
        }
      });

      if (formData.curp) {
        const validation = validateCURP(formData.curp);
        if (!validation.isValid) {
          newErrors.curp = validation.error;
        } else if (formData.fechaNacimiento) {
          const curpDate = parseCURP(formData.curp).fechaNacimiento;
          const formDate = new Date(formData.fechaNacimiento);
          if (
            curpDate.toISOString().split("T")[0] !==
            formDate.toISOString().split("T")[0]
          ) {
            newErrors.curp = "La fecha no coincide con la CURP";
            newErrors.fechaNacimiento = "No coincide con la CURP";
          }
        }
      }

      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Email no válido";
      }
    }

    if (step === 3) {
      const requiredFields = [
        "nombreTutor",
        "apellidoPaternoTutor",
        "emailTutor",
        "password",
        "telefonosContacto",
        "parentesco",
      ];
      
      requiredFields.forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = "Este campo es requerido";
        }
      });

      if (formData.password && formData.password.length < 8) {
        newErrors.password = "La contraseña debe tener al menos 8 caracteres";
      }
    }

    if (step === 4) {
      const requiredFiles = [
        "curpFile",
        "actaNacimientoFile",
        "ineTutorFile",
        "fotoJugadorFile",
      ];
      
      requiredFiles.forEach((fileType) => {
        if (!files[fileType]) {
          newErrors[fileType] = "Este documento es requerido";
        }
      });

      if (files.fotoJugadorFile && files.fotoJugadorFile.size > 5 * 1024 * 1024) {
        newErrors.fotoJugadorFile = "La foto no debe exceder 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar el paso actual antes de enviar
    if (!validateStep(4)) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Llamar a la API de registro
      const response = await authApi.registerTutorWithAlumno(
        formData,
        files,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      // Mostrar modal de éxito
      setShowSuccessModal(true);

      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      console.error("Error en el registro:", error);
      setErrorMessage(error.message || "Ocurrió un error en el registro");
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-xl rounded-2xl p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
            Registro de Nuevo Jugador
          </h1>

          {/* Indicador de pasos */}
          <div className="flex justify-between items-center mb-10 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2 -z-10"></div>
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-4
                  ${
                    step === stepNumber
                      ? "border-blue-500 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200"
                      : step > stepNumber
                      ? "border-green-500 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200"
                      : "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <span className="font-bold text-lg">{stepNumber}</span>
                </div>
                <span
                  className={`text-xs mt-2 text-center w-24 font-medium ${
                    step === stepNumber
                      ? "text-blue-600 dark:text-blue-300"
                      : step > stepNumber
                      ? "text-green-600 dark:text-green-300"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {stepNumber === 1 && "Datos Personales"}
                  {stepNumber === 2 && "Información Médica"}
                  {stepNumber === 3 && "Datos del Tutor"}
                  {stepNumber === 4 && "Documentos"}
                </span>
              </div>
            ))}
          </div>

          {errors.submit && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-md border border-red-200 dark:border-red-800 mb-6 text-sm">
              {errors.submit}
            </div>
          )}

          {/* Barra de progreso de carga */}
          {isLoading && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <Step1PersonalInfo
                formData={formData}
                errors={errors}
                handleChange={handleChange}
              />
            )}
            {step === 2 && (
              <Step2MedicalInfo
                formData={formData}
                errors={errors}
                handleChange={handleChange}
              />
            )}
            {step === 3 && (
              <Step3TutorInfo
                formData={formData}
                errors={errors}
                handleChange={handleChange}
              />
            )}
            {step === 4 && (
              <Step4Documents
                files={files}
                errors={errors}
                handleFileUpload={handleFileUpload}
              />
            )}

            <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Anterior
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => validateStep(step) && nextStep()}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 ml-auto"
                >
                  Siguiente
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 ml-auto disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registrando...
                    </>
                  ) : (
                    <>
                      Finalizar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Modal de éxito */}
      <Modal isOpen={showSuccessModal} onClose={handleModalClose}>
        <div className="text-center p-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">
            ¡Registro exitoso!
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            <p>Serás redirigido automáticamente al login...</p>
          </div>
        </div>
      </Modal>

      {/* Modal de error */}
      <Modal isOpen={showErrorModal} onClose={handleModalClose}>
        <div className="text-center p-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">
            Error en el registro
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            <p>{errorMessage}</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              onClick={handleModalClose}
            >
              Entendido
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RegisterForm;