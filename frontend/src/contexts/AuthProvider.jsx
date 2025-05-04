import React from "react";
import { AuthProvider } from "./AuthContext"; // Importa el contexto
import { BrowserRouter as Router } from "react-router-dom";
import App from "../App";

const AuthWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AuthWrapper;
