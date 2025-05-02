// src/contexts/PagosContext.jsx
import { createContext, useContext, useState } from 'react';
import { getPagosByInscripcion } from '@/api/pagos.api';

const PagosContext = createContext();

export const PagosProvider = ({ children }) => {
  const [pagos, setPagos] = useState([]);

  const fetchPagos = async (inscripcionId) => {
    try {
      const data = await getPagosByInscripcion(inscripcionId);
      setPagos(data);
    } catch (error) {
      console.error('Error fetching pagos:', error);
    }
  };

  return (
    <PagosContext.Provider value={{ pagos, fetchPagos }}>
      {children}
    </PagosContext.Provider>
  );
};

export const usePagos = () => useContext(PagosContext);