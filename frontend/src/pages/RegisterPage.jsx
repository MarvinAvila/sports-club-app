import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../api/auth.api';
import '../styles/Login.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (err) {
      setError('Error al registrar. Intenta nuevamente.');
      err.response && setError(err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <AuthForm
        title="Registro de cliente"
        onSubmit={handleSubmit}
        buttonText="Registrarse"
        linkText="¿Ya tienes cuenta? Inicia sesión"
        linkPath="/login"
      >
        <input
          name="name"
          type="text"
          placeholder="Nombre completo"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
      </AuthForm>
    </div>
  );
}