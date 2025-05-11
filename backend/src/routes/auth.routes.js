import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getUserRole,
  loginUser,
  registerTutorWithAlumno,
  logoutUser,
} from "../controllers/auth.controller.js";
// En auth.routes.js
import { uploadDocuments } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Rutas públicas
router.post("/login", loginUser);

// Rutas protegidas
router.get("/user-role", verifyToken, getUserRole);
router.post("/logout", verifyToken, logoutUser);

router.post("/register", uploadDocuments, registerTutorWithAlumno);

export default router;
