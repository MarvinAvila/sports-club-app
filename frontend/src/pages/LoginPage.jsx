import React, { useState, useContext, useEffect } from 'react';
import { authApi } from '../api/auth.api.js'; 
import { AuthContext } from '../contexts/AuthContextInstance';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useContext(AuthContext); // Añade isAuthenticated
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar carga
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const { token, role, user } = await authApi.login(email, password);
      
      if (!token) {
        throw new Error('No se recibió token de autenticación');
      }
  
      // Pasar los datos estructurados correctamente
      login(token, {
        role,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      });
  
    } catch (err) {
      console.error('Error en login:', err);
      setIsLoading(false);
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  // // Efecto para redirigir cuando la autenticación cambia
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const role = localStorage.getItem('userRole'); // O como almacenes el rol
  //     if (role === 'admin') {
  //       navigate('/admin');
  //     } else {
  //       navigate('/dashboard');
  //     }
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">LOGIN</h2>
          <p className="login-subtitle">Please enter your login and password!</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            
            <div className="forgot-password">
              <a href="#forgot">Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'LOGIN'}
            </button>
            
            <div className="signup-text">
              Don't have an account? <a href="/register">Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;