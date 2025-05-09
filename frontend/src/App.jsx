import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AlumnosPage from "./pages/AlumnosPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CalendarioPage from "./pages/CalendarioPage";
import HistorialPage from "./pages/HistorialPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import AlumnoQR from "./pages/AlumnoQR";


const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/alumnos" element={<AlumnosPage />} />
          <Route path="/admin/calendario" element={<CalendarioPage />} />
          <Route path="/admin/historial" element={<HistorialPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["tutor", "user"]} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/alumnoqr/:id" element={<AlumnoQR />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
