import React from "react";
import { useAuth } from "../contexts/useAuth";

const PerfilUsuario = () => {
  const { user } = useAuth();
  const userId = user?.id; // <- Aquí se usa correctamente

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>ID: {userId}</p>
    </div>
  );
};

export default PerfilUsuario;
