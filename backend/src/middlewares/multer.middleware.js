import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'application/pdf': 'PDF'
  };
  
  if (!allowedTypes[file.mimetype]) {
    const allowedFormats = Object.values(allowedTypes).join(', ');
    return cb(new Error(`Solo se permiten archivos: ${allowedFormats}`), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5 // Máximo 5 archivos
  }
});

export const uploadDocuments = upload.fields([
  { name: 'curpFile', maxCount: 1 },
  { name: 'actaNacimientoFile', maxCount: 1 },
  { name: 'credencialEscolarFile', maxCount: 1 },
  { name: 'ineTutorFile', maxCount: 1 },
  { name: 'fotoJugadorFile', maxCount: 1 }
]);

// Middleware para manejar errores específicos de Multer
export const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        error: 'Tamaño de archivo excedido',
        message: 'El tamaño máximo por archivo es 5MB'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(413).json({
        error: 'Demasiados archivos',
        message: 'Solo se permiten 5 archivos como máximo'
      });
    }
  }
  next(err);
};