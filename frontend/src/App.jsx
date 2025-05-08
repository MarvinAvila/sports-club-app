import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["tutor", "user"]} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
