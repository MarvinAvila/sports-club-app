import express from 'express';
import { 
  getInscripcion,
  listInscripciones,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
  getInscripcionesByTutor,
  getInscripcionesByAlumno,
  getInscripcionesByDeporte
} from '../controllers/inscripcion.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyToken);

// Rutas generales
router.get('/', checkRole(['admin']), listInscripciones);
router.get('/:id', checkRole(['admin', 'tutor']), getInscripcion);
router.post('/', checkRole(['admin', 'tutor']), createInscripcion);
router.put('/:id', checkRole(['admin']), updateInscripcion);
router.delete('/:id', checkRole(['admin']), deleteInscripcion);

// Rutas específicas
router.get('/tutor/:tutorId', checkRole(['tutor', 'admin']), getInscripcionesByTutor);
router.get('/alumno/:alumnoId', checkRole(['admin', 'tutor']), getInscripcionesByAlumno);
router.get('/deporte/:deporteId', checkRole(['admin']), getInscripcionesByDeporte);

export default router;