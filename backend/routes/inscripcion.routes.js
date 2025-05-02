import express from 'express';
import { 
  getInscripcion,
  listInscripciones,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
  getInscripcionesByTutor
} from '../controllers/inscripcion.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', checkRole(['admin']), listInscripciones);
router.get('/tutor/:tutorId', checkRole(['tutor', 'admin']), getInscripcionesByTutor);
router.get('/:id', checkRole(['admin', 'tutor']), getInscripcion);
router.post('/', checkRole(['admin', 'tutor']), createInscripcion);
router.put('/:id', checkRole(['admin']), updateInscripcion);
router.delete('/:id', checkRole(['admin']), deleteInscripcion);

export default router;