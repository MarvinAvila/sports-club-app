import { useAuth } from '@/hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import '@/styles/user-dashboard.css'; // Asegúrate de importar los estilos

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="user-dashboard">
      <header className="user-header">
        <h1>Bienvenido, {user?.name || 'Usuario'}</h1>
        <div className="header-actions">
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </header>
      {/* ... resto del contenido ... */}
    </div>
  );
}