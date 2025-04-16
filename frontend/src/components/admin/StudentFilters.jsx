import React from 'react';

const StudentFilters = ({ onFilterChange }) => {
  return (
    <div className="filters">
      <label>Estado: </label>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">Todos</option>
        <option value="inscrito">Inscritos</option>
        <option value="no_inscrito">No Inscritos</option>
        <option value="baja">Dados de Baja</option>
      </select>
    </div>
  );
};

export default StudentFilters;
