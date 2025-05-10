// Crea un nuevo archivo: middlewares/multer.middleware.js
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.memoryStorage(); 

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Tipo de archivo no permitido'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

export const uploadDocuments = upload.fields([
  { name: 'curpFile', maxCount: 1 },
  { name: 'actaNacimientoFile', maxCount: 1 },
  { name: 'credencialEscolarFile', maxCount: 1 },
  { name: 'ineTutorFile', maxCount: 1 },
  { name: 'fotoJugadorFile', maxCount: 1 }
]);