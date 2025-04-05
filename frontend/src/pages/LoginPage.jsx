import React, { useState } from 'react';
import "../styles/Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de login aquí
    console.log('Login attempt with:', email, password);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">LOGIN</h2>
          <p className="login-subtitle">Please enter your login and password!</p>
          
          <form onSubmit={handleSubmit} className="login-form">
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