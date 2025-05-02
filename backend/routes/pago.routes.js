import express from 'express';
import { 
  getPago,
  listPagos,
  createPago,
  updatePago,
  deletePago
} from '../controllers/pago.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', checkRole(['admin']), listPagos);
router.get('/:id', checkRole(['admin', 'tutor']), getPago);
router.post('/', checkRole(['admin', 'tutor']), createPago);
router.put('/:id', checkRole(['admin']), updatePago);
router.delete('/:id', checkRole(['admin']), deletePago);

export default router;