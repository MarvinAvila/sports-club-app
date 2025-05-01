import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Configuración CORS mejorada
const corsOptions = {
  origin: 'http://localhost:3000', // URL exacta de tu frontend
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Aplica CORS con las opciones
app.use(cors(corsOptions));

// Middleware para manejar preflight OPTIONS
app.options('*', cors(corsOptions));

// Middlewares adicionales
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});