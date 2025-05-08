import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin"; // Importa el hook
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, isLoading, error } = useLogin(); // Usa el hook
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
      // La redirección ahora ocurre dentro de handleLogin
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="theme-agnostic">
      <div className="login-background">
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-title">LOGIN</h2>
            <p className="login-subtitle">
              Please enter your login and password!
            </p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={onSubmit} className="login-form">
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

              <div className="form-group relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="forgot-password">
                <a href="#forgot">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "LOGIN"}
              </button>

              <div className="signup-text">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
