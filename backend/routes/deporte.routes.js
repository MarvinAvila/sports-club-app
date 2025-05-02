import express from 'express';
import { 
  createDeporte,
  getDeporte,
  updateDeporte,
  deleteDeporte,
  listDeportes
} from '../controllers/deporte.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', checkRole(['admin', 'tutor', 'user']), listDeportes);
router.get('/:id', checkRole(['admin', 'tutor', 'user']), getDeporte);
router.post('/', checkRole(['admin']), createDeporte);
router.put('/:id', checkRole(['admin']), updateDeporte);
router.delete('/:id', checkRole(['admin']), deleteDeporte);

export default router;