import express from 'express';
import { 
  getTutor,
  listTutores,
  createTutor,
  updateTutor,
  deleteTutor,
  getTutorAlumnos,
  getAlumnoTutores,
  addAlumnoToTutor,
  removeAlumnoFromTutor,
  getTutorInscripciones
} from '../controllers/tutor.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyToken);

// Rutas básicas de tutores
router.get('/', checkRole(['admin']), listTutores);
router.get('/:id', checkRole(['admin', 'tutor']), getTutor);
router.post('/', checkRole(['admin']), createTutor);
router.put('/:id', checkRole(['admin']), updateTutor);
router.delete('/:id', checkRole(['admin']), deleteTutor);

// Rutas para relaciones tutor-alumno
router.get('/:tutorId/alumnos', checkRole(['tutor', 'admin']), getTutorAlumnos);
router.get('/alumno/:alumnoId/tutores', checkRole(['admin', 'tutor']), getAlumnoTutores);
router.post('/:tutorId/alumnos/:alumnoId', checkRole(['tutor', 'admin']), addAlumnoToTutor);
router.delete('/:tutorId/alumnos/:alumnoId', checkRole(['tutor', 'admin']), removeAlumnoFromTutor);

// Rutas para inscripciones de tutor
router.get('/:tutorId/inscripciones', checkRole(['tutor', 'admin']), getTutorInscripciones);

export default router;