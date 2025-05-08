import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="card p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Registro de Jugador</h1>
          <RegisterForm />
          <div className="mt-4 text-center">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;