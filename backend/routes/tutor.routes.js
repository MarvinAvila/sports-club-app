import express from 'express';
import { 
  getTutorEnrollments,
  getTutorAlumnos,
  addAlumnoToTutor
} from '../controllers/tutor.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyToken);

router.get('/enrollments', checkRole(['tutor', 'admin']), getTutorEnrollments);
router.get('/alumnos', checkRole(['tutor', 'admin']), getTutorAlumnos);
router.post('/alumnos', checkRole(['tutor', 'admin']), addAlumnoToTutor);
export default router;