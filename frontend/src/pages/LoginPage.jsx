import React, { useState, useContext  } from 'react';
import { authApi } from '../api/auth.api.js'; 
import { AuthContext } from '../contexts/AuthContextInstance';
import { useNavigate } from 'react-router-dom';


import "../styles/Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Usar el login del contexto
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { token, role } = await authApi.login(email, password); // Llama a la API
      login(token, role); // Actualiza el contexto con el token y el rol

      // Redirige según el rol del usuario
      if (role === 'admin') {
        navigate('/admin');  // Redirige al AdminPage
      } else if (role === 'tutor') {
        navigate('/dashboard'); 
      }else {
        navigate('/dashboard');  // Redirige al home o a una página por defecto
      }


    } catch (err) {
      setError('Credenciales incorrectas. Intenta de nuevo.');
      err.response && setError(err.response.data.error); // Manejo de errores
    }
  };

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
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="forgot-password">
              <a href="#forgot">Forgot password?</a>
            </div>
            
            <button type="submit" className="login-button">
              LOGIN
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