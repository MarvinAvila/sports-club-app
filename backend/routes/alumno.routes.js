import express from 'express';
import { 
  createAlumno,
  getAlumno,
  updateAlumno,
  deleteAlumno,
  listAlumnos
} from '../controllers/alumno.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', checkRole(['admin']), listAlumnos);
router.get('/:id', checkRole(['admin', 'tutor']), getAlumno);
router.post('/', checkRole(['admin']), createAlumno);
router.put('/:id', checkRole(['admin']), updateAlumno);
router.delete('/:id', checkRole(['admin']), deleteAlumno);

export default router;