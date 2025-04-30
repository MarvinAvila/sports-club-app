import React from "react";
import Sidebar from "../components/admin/Sidebar";
import StudentTable from "../components/admin/StudentTable";
import AdminCalendar from "../components/admin/AdminCalendar";
import FinancialReports from "../components/admin/FinancialReports";
import MessagingCenter from "../components/admin/MessagingCenter";
import DocumentUploader from "../components/admin/DocumentUploader";
import ChangeHistory from "../components/admin/ChangeHistory";
import StudentActions from "../components/admin/StudentActions";
import useStudents from "../hooks/useStudents";

const AdminPage = () => {
  const { students, loading, updateStatus } = useStudents();

  const handleSendReminders = async () => {
    // Implementa el envío de recordatorios
  };

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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
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
              <div className="text-sm text-gray-300">Welcome, Admin</div>
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-800">
          {/* Dashboard Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <p className="text-gray-300">Welcome to Admin Template</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              {
                title: "Total Alumnos",
                value: "1,542",
                change: "+18%",
                icon: "👥",
              },
              {
                title: "Inscritos",
                value: "1,204",
                change: "+5.5%",
                icon: "✅",
              },
              {
                title: "Pendientes",
                value: "358",
                change: "-2.3%",
                icon: "⏳",
              },
              {
                title: "Ingresos",
                value: "$70,000",
                change: "+80.4%",
                icon: "💰",
              },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-700 rounded-xl shadow p-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold mt-1 text-white">{stat.value}</p>
                    <p className={`text-xs mt-2 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className="text-3xl">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Student Table */}
            <div className="lg:col-span-2 bg-gray-700 rounded-xl shadow overflow-hidden">
              <div className="p-4 border-b border-gray-600 flex justify-between items-center">
                <h3 className="font-semibold text-white">Gestión de Alumnos</h3>
                <StudentActions students={students} />
              </div>

              <div className="p-4">
                <StudentTable
                  students={students}
                  onStatusChange={updateStatus}
                />
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-gray-700 rounded-xl shadow overflow-hidden">
              <div className="p-4 border-b border-gray-600">
                <h3 className="font-semibold text-white">Calendario</h3>
              </div>
              <div className="p-4">
                <AdminCalendar />
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Financial Reports */}
            <div className="bg-gray-700 rounded-xl shadow overflow-hidden">
              <div className="p-4 border-b border-gray-600">
                <h3 className="font-semibold text-white">Reportes Financieros</h3>
              </div>
              <div className="p-4">
                <FinancialReports />
              </div>
            </div>

            {/* Messaging Center */}
            <div className="bg-gray-700 rounded-xl shadow overflow-hidden">
              <div className="p-4 border-b border-gray-600">
                <h3 className="font-semibold text-white">Centro de Mensajes</h3>
              </div>
              <div className="p-4">
                <MessagingCenter />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-gray-700 rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b border-gray-600">
                  <h3 className="font-semibold text-white">Subir Documentos</h3>
                </div>
                <div className="p-4">
                  <DocumentUploader />
                </div>
              </div>

              <div className="bg-gray-700 rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b border-gray-600">
                  <h3 className="font-semibold text-white">Historial de Cambios</h3>
                </div>
                <div className="p-4">
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