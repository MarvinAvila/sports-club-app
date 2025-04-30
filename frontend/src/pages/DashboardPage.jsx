import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import DocumentUploader from '@/components/admin/DocumentUploader';
import EnrollmentStatus from '@/components/ui/EnrollmentStatus';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Datos de ejemplo - deberías reemplazarlos con datos reales de tu API
  const studentData = {
    name: "Juan Pérez",
    grade: "5° Primaria",
    enrollmentStatus: "Pendiente",
    paymentStatus: "Por pagar",
    dueDate: "15 de Mayo, 2024"
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar simplificado */}
      <div className="w-64 bg-gray-800 p-6">
        <h2 className="text-xl font-bold text-accent-400 mb-8">Panel del Tutor</h2>
        <nav>
          <ul className="space-y-3">
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700 hover:text-accent-400 transition-colors">
                Inicio
              </a>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="block py-2 px-3 rounded hover:bg-gray-700 text-red-400 transition-colors w-full text-left"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-white">
                Bienvenido, {user?.name || 'Tutor'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">Rol: Tutor</div>
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                {user?.name?.charAt(0) || 'T'}
              </div>
            </div>
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-800">
          {/* Sección de estado de reinscripción */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Estado de Reinscripción</h2>
            <EnrollmentStatus student={studentData} />
          </div>

          {/* Sección de documentos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-700 rounded-xl shadow overflow-hidden">
              <div className="p-4 border-b border-gray-600">
                <h3 className="font-semibold text-white">Subir Comprobante de Pago</h3>
              </div>
              <div className="p-4">
                <DocumentUploader 
                  purpose="payment" 
                  onUploadSuccess={() => alert('Comprobante subido exitosamente')}
                />
              </div>
            </div>

            {/* Sección de información adicional */}
            <div className="bg-gray-700 rounded-xl shadow overflow-hidden">
              <div className="p-4 border-b border-gray-600">
                <h3 className="font-semibold text-white">Instrucciones</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2 text-gray-300">
                  <li>• Sube el comprobante de pago en formato PDF o imagen</li>
                  <li>• El proceso de validación puede tardar hasta 48 horas</li>
                  <li>• Recibirás una notificación por correo cuando sea aprobado</li>
                  <li>• Para dudas, contacta a administración: admin@escuela.com</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}