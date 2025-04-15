import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '@/styles/admin.css'; // Importa los estilos específicos de admin

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Panel de Administrador</h1>
        <div className="header-actions">
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </header>
      <h1>Bienvenido, {user?.name || 'Admin'}</h1>
    </div>
  );
}