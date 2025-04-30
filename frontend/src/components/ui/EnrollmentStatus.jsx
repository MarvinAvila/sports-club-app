export default function EnrollmentStatus({ student }) {
    const statusColor = {
      'Completa': 'bg-green-600',
      'Pendiente': 'bg-yellow-600',
      'Rechazada': 'bg-red-600',
      'Por pagar': 'bg-orange-600'
    };
  
    return (
      <div className="bg-gray-700 rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b border-gray-600">
          <h3 className="font-semibold text-white">Información del Alumno</h3>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Nombre del Alumno</p>
            <p className="text-lg font-medium text-white">{student.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Grado</p>
            <p className="text-lg font-medium text-white">{student.grade}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Estado de Reinscripción</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor[student.enrollmentStatus] || 'bg-gray-600'} text-white`}>
              {student.enrollmentStatus}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-400">Estado de Pago</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor[student.paymentStatus] || 'bg-gray-600'} text-white`}>
              {student.paymentStatus}
            </span>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-400">Fecha Límite</p>
            <p className="text-lg font-medium text-white">{student.dueDate}</p>
          </div>
        </div>
      </div>
    );
  }