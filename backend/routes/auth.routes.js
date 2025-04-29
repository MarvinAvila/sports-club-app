import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getUserRole } from '../controllers/auth.controller.js';
import { loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/user-role', verifyToken, getUserRole);

export default router;