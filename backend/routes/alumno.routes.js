import express from 'express';
import { 
  createAlumno,
  getAlumno,
  updateAlumno,
  deleteAlumno,
  listAlumnos,
  getAlumnoDocumentos,
  addDocumentoToAlumno,
  getAlumnosByTutor
} from '../controllers/alumno.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyToken);

// Rutas básicas de alumnos
router.get('/', checkRole(['admin']), listAlumnos);
router.get('/:id', checkRole(['admin', 'tutor']), getAlumno);
router.post('/', checkRole(['admin']), createAlumno);
router.put('/:id', checkRole(['admin']), updateAlumno);
router.delete('/:id', checkRole(['admin']), deleteAlumno);

// Rutas para documentos de alumnos
router.get('/:alumnoId/documentos', checkRole(['admin', 'tutor']), getAlumnoDocumentos);
router.post('/:alumnoId/documentos', checkRole(['admin', 'tutor']), addDocumentoToAlumno);
// routes/alumno.routes.js
router.get('/tutor/:tutorId', checkRole(['admin', 'tutor']), getAlumnosByTutor);

export default router;