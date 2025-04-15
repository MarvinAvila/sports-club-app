import { useState } from 'react';

export default function EnrollmentForm({ sports }) {
  const [formData, setFormData] = useState({
    sport: '',
    medicalInfo: '',
    emergencyContact: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la llamada a tu API para registrar la inscripción
    // Esto automáticamente notificaría al admin
  };

  return (
    <form onSubmit={handleSubmit} className="enrollment-form">
      <h2>Formulario de Reinscripción</h2>
      
      <div className="form-group">
        <label>Deporte:</label>
        <select 
          value={formData.sport}
          onChange={(e) => setFormData({...formData, sport: e.target.value})}
          required
        >
          <option value="">Selecciona un deporte</option>
          {sports.map(sport => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Información médica relevante:</label>
        <textarea 
          value={formData.medicalInfo}
          onChange={(e) => setFormData({...formData, medicalInfo: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Contacto de emergencia:</label>
        <input 
          type="text" 
          value={formData.emergencyContact}
          onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Enviar solicitud
      </button>
    </form>
  );
}