import React, { useState, useContext } from 'react';
import { login as apiLogin, fetchUserRole } from '../api/auth.api';
import { AuthContext } from '../contexts/AuthContextInstance';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // Usamos la función login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await apiLogin(email, password); // Llama a la API
      const userRole = await fetchUserRole(token); // Obtener el rol

      login(token, userRole); // Esto guarda el token y redirige automáticamente
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Iniciar sesión</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
