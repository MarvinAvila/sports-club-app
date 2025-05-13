import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import DocumentUploader from "@/components/DocumentUploader";
import MessagingCenter from "@/components/MessagingCenter";
import ProfileDropdown from "@/components/ProfileDropdown";
import AlumnoQR from "@/pages/AlumnoQR"; // Asegúrate de tener este componente
import { useEffect, useState } from "react";
import {
  getAlumnosByTutor,
  generarQRPago,
} from "@/api/alumnos.api";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [loadingQR, setLoadingQR] = useState(false);

  useEffect(() => {
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    const fetchTutorData = async () => {
      try {
        setLoading(true);
        const response = await getAlumnosByTutor(user.id);
        setAlumnos(response.data || response);
      } catch (err) {
        if (err.message.includes("Sesión expirada")) {
          logout();
          navigate("/login");
        } else {
          setError(err.message || "Error al cargar los alumnos");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [user?.id]);

  const handleGenerarQR = async (alumnoId) => {
    try {
      setLoadingQR(true);
      const response = await generarQRPago(alumnoId);
      setQrData({
        alumnoId,
        qrCode: response.qrCode,
        paymentUrl: response.paymentUrl,
        nombre: response.alumno.nombre,
        apellido: response.alumno.apellido,
      });
    } catch (error) {
      setError(error.message || "Error al generar el código QR");
    } finally {
      setLoadingQR(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

  const renderAlumnoCard = (alumno) => (
    <div key={alumno.id} className="bg-gray-700 rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-4 pb-2 border-b border-gray-600">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {alumno.nombre} {alumno.apellido_paterno}
          </h2>
          {alumno.parentesco && (
            <p className="text-gray-400">Parentesco: {alumno.parentesco}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {alumno.foto_url && (
            <img
              src={alumno.foto_url}
              alt={`Foto de ${alumno.nombre}`}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <button
            onClick={() => handleGenerarQR(alumno.id)}
            disabled={loadingQR}
            className="ml-4 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm disabled:opacity-50"
          >
            {loadingQR && qrData?.alumnoId === alumno.id
              ? "Generando..."
              : "Generar QR de Pago"}
          </button>
        </div>
      </div>

      {qrData?.alumnoId === alumno.id && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <AlumnoQR
            alumnoId={qrData.alumnoId}
            nombre={qrData.nombre}
            apellido={qrData.apellido}
            qrCode={qrData.qrCode}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-gray-400 font-medium">Información Personal</h3>
          <ul className="mt-2 space-y-1">
            <li className="text-white">
              Edad: {alumno.edad || "No especificada"}
            </li>
            <li className="text-white">
              Género: {alumno.genero || "No especificado"}
            </li>
            <li className="text-white">
              CURP: {alumno.curp || "No registrada"}
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-400 font-medium">Información Médica</h3>
          <ul className="mt-2 space-y-1">
            <li className="text-white">
              Tipo de sangre: {alumno.tipo_sangre || "No especificado"}
            </li>
            <li className="text-white">
              Alergias: {alumno.alergias || "Ninguna conocida"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100 w-full">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex-shrink-0 border-r border-gray-700 fixed h-full">
        <h2 className="text-xl font-bold text-blue-400 mb-8">Panel del Tutor</h2>
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

      {/* Contenido principal */}
      <div className="ml-64 flex-1 flex flex-col min-w-0">
        <header className="bg-gray-800 shadow-sm z-10 px-6 py-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-white">
              Bienvenido, <span className="text-blue-400">{user?.name || "Tutor"}</span>
            </h1>
            <div className="flex items-center space-x-4">
              <ProfileDropdown user={user} role="Tutor" onLogout={handleLogout} />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            {alumnos.length === 0 ? (
              <div className="text-center text-gray-400">
                No se encontraron alumnos asociados a tu cuenta.
              </div>
            ) : (
              alumnos.map(renderAlumnoCard)
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
