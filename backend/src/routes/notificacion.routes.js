import express from 'express';
import { 
  getNotificacion,
  listNotificaciones,
  createNotificacion,
  updateNotificacion,
  deleteNotificacion,
  getNotificacionesByTutor,
  markAsRead
} from '../controllers/notificacion.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyToken);

// Rutas generales
router.get('/', checkRole(['admin']), listNotificaciones);
router.get('/:id', checkRole(['admin', 'tutor']), getNotificacion);
router.post('/', checkRole(['admin', 'tutor']), createNotificacion);
router.put('/:id', checkRole(['admin']), updateNotificacion);
router.delete('/:id', checkRole(['admin']), deleteNotificacion);

// Rutas específicas
router.get('/tutor/:tutorId', checkRole(['tutor', 'admin']), getNotificacionesByTutor);
router.put('/:id/mark-as-read', checkRole(['tutor', 'admin']), markAsRead);

export default router;