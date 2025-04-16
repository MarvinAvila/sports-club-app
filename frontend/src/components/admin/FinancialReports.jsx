import React from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar,
} from 'recharts';

const data = [
  { name: 'Enero', ingresos: 4000, pendientes: 2400 },
  { name: 'Febrero', ingresos: 3000, pendientes: 1398 },
  { name: 'Marzo', ingresos: 2000, pendientes: 9800 },
];

const FinancialReports = () => {
  return (
    <div>
      <h3>Reportes Financieros</h3>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="ingresos" fill="#82ca9d" />
        <Bar dataKey="pendientes" fill="#f87171" />
      </BarChart>
    </div>
  );
};

export default FinancialReports;
