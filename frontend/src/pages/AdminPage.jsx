import React from "react";
import Sidebar from "../components/admin/Sidebar";
import StudentTable from "../components/admin/StudentTable";
import AdminCalendar from "../components/admin/AdminCalendar";
import FinancialReports from "../components/admin/FinancialReports";
import MessagingCenter from "../components/MessagingCenter";
import DocumentUploader from "../components/DocumentUploader";
import ChangeHistory from "../components/admin/ChangeHistory";
import StudentActions from "../components/admin/StudentActions";
import useStudents from "../hooks/useStudents";
import ProfileDropdown from "../components/ProfileDropdown";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
// Agrega useEffect aquí

const AdminPage = () => {
  const { students, enrollments, loading, updateStatus } = useStudents();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSendReminders = async () => {
    // Implementa el envío de recordatorios
  };

  // Calcular estadísticas basadas en datos reales
  const stats = [
    {
      title: "Total Alumnos",
      value: students.length.toString(),
      change: "+0%", // Puedes calcular esto comparando con datos históricos
      icon: "👥",
      color: "bg-blue-600",
    },
    {
      title: "Inscritos",
      value: enrollments.filter((e) => e.estado === "activa").length.toString(),
      change: "+0%",
      icon: "✅",
      color: "bg-green-600",
    },
    {
      title: "Pendientes",
      value: enrollments
        .filter((e) => e.estado === "pendiente")
        .length.toString(),
      change: "+0%",
      icon: "⏳",
      color: "bg-yellow-600",
    },
    {
      title: "Ingresos",
      value: "$0", // Puedes calcular esto sumando los pagos
      change: "+0%",
      icon: "💰",
      color: "bg-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl font-semibold">Cargando datos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header (sin cambios) */}

        <main className="flex-1 overflow-y-auto p-6 bg-gray-800">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-gray-300">
              Bienvenido, {user?.name || "Administrador"}
            </p>
          </div>
          <header className="bg-gray-800 shadow-sm z-10 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-white">NALIKA</h1>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-8 pr-4 py-2 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white placeholder-gray-400"
                  />
                  <svg
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ProfileDropdown user={user} role="Admin" />
              </div>
            </div>
          </header>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} rounded-xl shadow-lg p-6 text-white`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium opacity-80">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <p
                  className={`text-sm mt-4 font-medium ${
                    stat.change.startsWith("+")
                      ? "text-green-200"
                      : "text-red-200"
                  }`}
                >
                  {stat.change} vs último mes
                </p>
              </div>
            ))}
          </div>
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Student Table */}
            <div className="lg:col-span-2 bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-600 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  Gestión de Inscripciones
                </h3>
                <StudentActions enrollments={enrollments} />
              </div>
              <div className="p-1">
                <StudentTable
                  enrollments={enrollments}
                  onStatusChange={updateStatus}
                />
              </div>
            </div>
            {/* Calendar - Con mejor espaciado */}
            <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-600">
                <h3 className="text-xl font-semibold text-white">Calendario</h3>
              </div>
              <div className="p-4">
                <AdminCalendar />
              </div>
            </div>
          </div>
          {/* Second Row - Espaciado consistente */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Financial Reports */}
            <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-600">
                <h3 className="text-xl font-semibold text-white">
                  Reportes Financieros
                </h3>
              </div>
              <div className="p-6">
                <FinancialReports />
              </div>
            </div>

            {/* Messaging Center */}
            <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-600">
                <h3 className="text-xl font-semibold text-white">
                  Centro de Mensajes
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Envía mensajes a usuarios
                </p>
              </div>
              <div className="p-6">
                <MessagingCenter />
              </div>
            </div>

            {/* Quick Actions - Espaciado mejorado */}
            <div className="space-y-8">
              <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-600">
                  <h3 className="text-xl font-semibold text-white">
                    Subir Documentos
                  </h3>
                </div>
                <div className="p-6">
                  <DocumentUploader
                    purpose="payment" // o "document" según el caso
                    onUploadSuccess={() => {
                      // Lógica a ejecutar después de subir
                    }}
                  />
                </div>
              </div>

              <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-600">
                  <h3 className="text-xl font-semibold text-white">
                    Historial de Cambios
                  </h3>
                </div>
                <div className="p-6">
                  <ChangeHistory />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
