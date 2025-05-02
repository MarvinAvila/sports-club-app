import express from 'express';
import { 
  getNotificacion,
  listNotificaciones,
  createNotificacion,
  updateNotificacion,
  deleteNotificacion
} from '../controllers/notificacion.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', checkRole(['admin']), listNotificaciones);
router.get('/:id', checkRole(['admin', 'tutor']), getNotificacion);
router.post('/', checkRole(['admin', 'tutor']), createNotificacion);
router.put('/:id', checkRole(['admin']), updateNotificacion);
router.delete('/:id', checkRole(['admin']), deleteNotificacion);

export default router;