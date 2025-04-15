import PropTypes from 'prop-types';
import { useContext } from 'react';
import '@/styles/SportCard.css';
import { AuthContext } from '@/contexts/AuthContext';

export default function SportCard({ sport, onEnroll }) {
  const { user } = useContext(AuthContext);

  // Verifica si el usuario ya está inscrito en este deporte
  const isEnrolled = user?.enrolledSports?.includes(sport.id);

  return (
    <div className={`sport-card ${isEnrolled ? 'enrolled' : ''}`}>
      <div className="sport-image">
        <img 
          src={`/sports/${sport.name.toLowerCase()}.jpg`} 
          alt={sport.name}
          onError={(e) => {
            e.target.src = '/sports/default.jpg'; // Imagen de respaldo
          }}
        />
      </div>
      
      <div className="sport-info">
        <h3>{sport.name}</h3>
        <p className="schedule">
          <span>📅</span> {sport.schedule}
        </p>
        <p className="coach">
          <span>👤</span> {sport.coach}
        </p>
        <p className="available-slots">
          {sport.availableSlots > 0 
            ? `🏆 ${sport.availableSlots} cupos disponibles`
            : '❌ Cupos agotados'}
        </p>
      </div>

      <div className="sport-actions">
        {isEnrolled ? (
          <button className="enrolled-button" disabled>
            ✅ Inscrito
          </button>
        ) : (
          <button 
            className="enroll-button" 
            onClick={() => onEnroll(sport.id)}
            disabled={sport.availableSlots === 0}
          >
            {sport.availableSlots > 0 ? 'Inscribirse' : 'Sin cupos'}
          </button>
        )}
      </div>
    </div>
  );
}

SportCard.propTypes = {
  sport: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    schedule: PropTypes.string.isRequired,
    coach: PropTypes.string.isRequired,
    availableSlots: PropTypes.number.isRequired,
  }).isRequired,
  onEnroll: PropTypes.func.isRequired,
};