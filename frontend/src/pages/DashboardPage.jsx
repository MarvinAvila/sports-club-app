import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import DocumentUploader from "@/components/DocumentUploader";
import EnrollmentStatus from "@/components/ui/EnrollmentStatus";
import MessagingCenter from "@/components/MessagingCenter";
import TutorLayout from "@/components/ui/TutorLayout";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Datos de ejemplo
  const studentData = {
    name: "Juan Pérez",
    grade: "5° Primaria",
    enrollmentStatus: "Pendiente",
    paymentStatus: "Por pagar",
    dueDate: "15 de Mayo, 2024",
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100 w-full">
      {/* Sidebar Fixed para Tutor */}
      <div className="w-64 bg-gray-800 p-6 flex-shrink-0 border-r border-gray-700 fixed h-full">
        <h2 className="text-xl font-bold text-blue-400 mb-8">
          Panel del Tutor
        </h2>
        <nav>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="flex items-center py-2 px-3 rounded hover:bg-gray-700 hover:text-blue-400 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Inicio
              </a>
            </li>
            <li>
            </li>
          </ul>
        </nav>
      </div>

      {/* Contenido principal con margen para el sidebar */}
      <div className="ml-64 flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-gray-800 shadow-sm z-10 px-6 py-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-white">
              Bienvenido,{" "}
              <span className="text-blue-400">{user?.name || "Tutor"}</span>
            </h1>
            // Reemplaza la sección del avatar con:
            <div className="flex items-center space-x-4">
            <ProfileDropdown user={user} role="Tutor" />
            </div>
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            {/* Estado de reinscripción */}
            <div className="bg-gray-700 rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-600">
                Estado de Reinscripción
              </h2>
              <EnrollmentStatus student={studentData} />
            </div>

            {/* Sección de documentos y mensajes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Subir comprobante */}
              <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-600">
                  <h3 className="font-semibold text-white text-xl mb-2">
                    Subir Comprobante de Pago
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Formatos aceptados: PDF, JPG, PNG
                  </p>
                </div>
                <div className="p-6">
                  <DocumentUploader
                    purpose="payment"
                    onUploadSuccess={() =>
                      alert("Comprobante subido exitosamente")
                    }
                  />
                </div>
              </div>

              {/* Instrucciones */}
              <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-600">
                  <h3 className="font-semibold text-white text-xl">
                    Instrucciones
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Sube el comprobante de pago en formato PDF o imagen
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      El proceso de validación puede tardar hasta 48 horas
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Recibirás una notificación por correo cuando sea aprobado
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Para dudas, contacta a administración: admin@escuela.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Centro de mensajes */}
            <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-600">
                <h3 className="font-semibold text-white text-xl">
                  Centro de Mensajes
                </h3>
                <p className="text-gray-400 text-sm">
                  Envía tus consultas al administrador
                </p>
              </div>
              <div className="p-6">
                <MessagingCenter />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
