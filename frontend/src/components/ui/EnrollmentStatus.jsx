import React from "react";
import { ROLES } from "@/constants/roles";
import { useAuth } from "@/hooks/useAuth";
import DocumentUploader from "@/components/DocumentUploader";
import { usePagos } from "@/contexts/PagosContext";
const EnrollmentStatus = ({ enrollment, onUploadSuccess }) => {
  const { user } = useAuth();
  const { pagos, fetchPagos } = usePagos();

  const getStatusColor = (status) => {
    switch (status) {
      case "activa":
        return "bg-green-500";
      case "pendiente":
        return "bg-yellow-500";
      case "vencida":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Cargar pagos cuando el componente se monta
  React.useEffect(() => {
    if (enrollment.id) {
      fetchPagos(enrollment.id);
    }
  }, [enrollment.id, fetchPagos]);

  return (
    <div className="space-y-4">
      {/* Mantén todos los elementos existentes de visualización */}
      <div className="flex justify-between items-center">
        <span className="text-gray-300">Estado:</span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            enrollment.estado
          )}`}
        >
          {enrollment.estado.toUpperCase()}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-300">Temporada:</span>
        <span className="text-white">{enrollment.temporada}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-300">Fecha de inscripción:</span>
        <span className="text-white">
          {new Date(enrollment.fecha_inscripcion).toLocaleDateString()}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-300">Monto:</span>
        <span className="text-white">
          ${enrollment.deportes.precio_inscripcion}
        </span>
      </div>

      {/* Sección de comprobantes (modificada ligeramente) */}
      {enrollment.estado === "pendiente" && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Subir Comprobante de Pago
          </h3>
          <DocumentUploader
            purpose="payment"
            enrollmentId={enrollment.id}
            onUploadSuccess={onUploadSuccess}
          />
        </div>
      )}

      {/* Nueva sección para mostrar historial de pagos */}
      {pagos[enrollment.id]?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">
            Historial de Pagos:
          </h3>
          <ul className="space-y-2">
            {pagos[enrollment.id].map((pago) => (
              <li key={pago.id} className="text-xs text-gray-400">
                {new Date(pago.fecha_pago).toLocaleDateString()} -
                <a
                  href={pago.comprobante_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline ml-2"
                >
                  Ver comprobante
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {enrollment.comprobante_pago_url && (
        <div className="mt-4">
          <a
            href={enrollment.comprobante_pago_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Ver comprobante subido
          </a>
        </div>
      )}
    </div>
  );
};

export default EnrollmentStatus;
