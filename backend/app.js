import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import alumnoRoutes from './routes/alumno.routes.js';
import tutorRoutes from './routes/tutor.routes.js';
import deporteRoutes from './routes/deporte.routes.js';
import inscripcionRoutes from './routes/inscripcion.routes.js';
import pagoRoutes from './routes/pago.routes.js';
import notificacionRoutes from './routes/notificacion.routes.js';


dotenv.config();
const app = express();

// Configuración CORS mejorada
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Manejo de preflight
app.use(express.json());

// Rutas base
app.use('/api/auth', authRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/tutor', tutorRoutes);
app.use('/api/deportes', deporteRoutes);
app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/notificaciones', notificacionRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: err.message 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});