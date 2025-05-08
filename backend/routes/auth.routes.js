import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getUserRole, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

// Rutas públicas
router.post('/login', loginUser);

// Rutas protegidas
router.get('/user-role', verifyToken, getUserRole);

export default router;