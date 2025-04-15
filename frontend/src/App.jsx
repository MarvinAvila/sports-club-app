import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { supabase } from '@/lib/supabaseClient';
import { useEffect } from 'react';
// Componente para redirigir usuarios autenticados
function RedirectIfAuthenticated({ children }) {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} /> : children;
}

function App({ initialSession }) {
  useEffect(() => {
    // Sincroniza sesión con tu AuthContext
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Aquí deberías actualizar tu AuthContext
      console.log('Cambio en autenticación:', event, session);
    });

    return () => subscription.unsubscribe();
  }, []);
  console.log("[Debug] App renderizado");
  return (
    <AuthProvider initialSession={initialSession}>
      <Router>
        <Routes>
          <Route path="/login" element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          } />
          <Route path="/register" element={
            <RedirectIfAuthenticated>
              <RegisterPage />
            </RedirectIfAuthenticated>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;