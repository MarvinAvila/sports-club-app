import { useEffect, useState } from 'react';
import { getPagosByInscripcion } from '@/api/pagos.api';

export default function PaymentHistory({ inscripcionId }) {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        setLoading(true);
        const data = await getPagosByInscripcion(inscripcionId);
        setPagos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPagos();
  }, [inscripcionId]);

  if (loading) return <div>Cargando historial de pagos...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-2">Historial de Pagos</h3>
      {pagos.length === 0 ? (
        <p>No hay pagos registrados</p>
      ) : (
        <ul className="space-y-2">
          {pagos.map((pago) => (
            <li key={pago.id} className="bg-gray-600 p-3 rounded-lg">
              <div className="flex justify-between">
                <span>Monto: ${pago.monto}</span>
                <span className="text-sm text-gray-400">
                  {new Date(pago.fecha_pago).toLocaleDateString()}
                </span>
              </div>
              <div className="text-sm text-gray-300">Estado: {pago.estado}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}