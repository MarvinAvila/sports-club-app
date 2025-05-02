import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import DocumentUploader from "@/components/DocumentUploader";
import EnrollmentStatus from "@/components/ui/EnrollmentStatus";
import MessagingCenter from "@/components/MessagingCenter";
import ProfileDropdown from "@/components/ProfileDropdown";
import { useEffect, useState } from "react";
import { ROLES } from "@/constants/roles";
import PaymentHistory from "@/components/ui/PaymentHistory";
import { usePagos } from '@/contexts/PagosContext';
import { fetchInscripcionesByTutor } from '@/api/inscripciones.api';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchPagos } = usePagos();

  if (!user) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-gray-100 w-full">
        <div className="ml-64 flex-1 flex items-center justify-center">
          <div className="text-xl font-semibold">
            No autenticado. Redirigiendo...
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    console.log("Datos completos del usuario:", user);
    console.log("User ID:", user?.id);

    if (!user || !user.id) {
      console.error("User ID no disponible. User object:", user);
      setLoading(false);
      return;
    }
    const fetchTutorData = async () => {
      console.log("Ejecutando fetchTutorData");
      if (!user?.id) return;

      try {
        setLoading(true);
        setError(null);
        console.log("Fetching inscripciones..."); // <-- Agrega esto
        const inscripciones = await fetchInscripcionesByTutor(user.id);
        console.log("Datos recibidos:", inscripciones); // <-- Agrega esto
        setEnrollments(inscripciones);
      } catch (err) {
        console.error("Error completo:", err); // <-- Mejora el logging
        setError(err.message); // <-- Usa err.message para más detalles
      } finally {
        console.log("Finalizando carga"); // <-- Agrega esto
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [user?.id]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-gray-100 w-full">
        <div className="ml-64 flex-1 flex items-center justify-center">
          <div className="text-xl font-semibold">Cargando datos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-gray-100 w-full">
        <div className="ml-64 flex-1 flex items-center justify-center">
          <div className="text-xl font-semibold text-red-400">{error}</div>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center space-x-4">
              <ProfileDropdown
                user={user}
                role="Tutor"
                onLogout={handleLogout}
              />
            </div>
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            {enrollments.length === 0 ? (
              <div className="bg-gray-700 rounded-xl shadow-lg p-6 mb-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  No tienes alumnos inscritos
                </h2>
                <p className="text-gray-300">
                  Contacta con administración para asociarte a alumnos
                </p>
              </div>
            ) : (
              <>
                {/* Mostrar estado de cada inscripción */}
                {enrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="bg-gray-700 rounded-xl shadow-lg p-6 mb-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-600">
                      {enrollment.alumnos.nombre} - {enrollment.deportes.nombre}
                    </h2>

                    <EnrollmentStatus enrollment={enrollment} />

                    {/* DocumentUploader actualizado */}
                    <div className="mt-4">
                      <DocumentUploader
                        purpose="payment"
                        enrollmentId={enrollment.id}
                        onUploadSuccess={() => {
                          // Actualizar el estado local o recargar datos
                          setEnrollments((prev) =>
                            prev.map((e) =>
                              e.id === enrollment.id
                                ? { ...e, estado: "pendiente" }
                                : e
                            )
                          );
                        }}
                      />
                    </div>

                    {/* Nuevo componente de historial de pagos */}
                    <PaymentHistory inscripcionId={enrollment.id} />
                  </div>
                ))}
              </>
            )}
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
