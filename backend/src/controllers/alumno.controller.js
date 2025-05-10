import { 
  getAlumnoById, 
  getAllAlumnos,
  createAlumno as createAlumnoModel,
  updateAlumno as updateAlumnoModel,
  deleteAlumno as deleteAlumnoModel,
  getAlumnosByTutor as getAlumnosByTutorModel,
  getDocumentosAlumno,
  addDocumentoAlumno
} from '../models/AlumnoModel.js';

const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({ 
      success: false, 
      error: error.message 
  });
};

export const getAlumno = async (req, res) => {
  try {
      const alumno = await getAlumnoById(req.params.id);
      if (!alumno) {
          return handleError(res, new Error('Alumno no encontrado'), 404);
      }
      res.json({ success: true, data: alumno });
  } catch (error) {
      handleError(res, error);
  }
};

export const listAlumnos = async (req, res) => {
  try {
      const alumnos = await getAllAlumnos();
      res.json({ success: true, data: alumnos });
  } catch (error) {
      handleError(res, error);
  }
};

export const createAlumno = async (req, res) => {
  try {
      // Validación básica
      if (!req.body.nombre || !req.body.apellido_paterno) {
          return handleError(res, new Error('Nombre y apellido paterno son requeridos'), 400);
      }

      const newAlumno = await createAlumnoModel(req.body);
      res.status(201).json({ success: true, data: newAlumno });
  } catch (error) {
      handleError(res, error);
  }
};

export const updateAlumno = async (req, res) => {
  try {
      const updatedAlumno = await updateAlumnoModel(req.params.id, req.body);
      if (!updatedAlumno) {
          return handleError(res, new Error('Alumno no encontrado'), 404);
      }
      res.json({ success: true, data: updatedAlumno });
  } catch (error) {
      handleError(res, error);
  }
};

export const deleteAlumno = async (req, res) => {
  try {
      const result = await deleteAlumnoModel(req.params.id);
      if (!result) {
          return handleError(res, new Error('Alumno no encontrado'), 404);
      }
      res.json({ success: true, message: 'Alumno eliminado correctamente' });
  } catch (error) {
      handleError(res, error);
  }
};

// Nuevos métodos para documentos
export const getAlumnoDocumentos = async (req, res) => {
  try {
      const documentos = await getDocumentosAlumno(req.params.alumnoId);
      res.json({ success: true, data: documentos });
  } catch (error) {
      handleError(res, error);
  }
};

export const addDocumentoToAlumno = async (req, res) => {
  try {
      if (!req.body.tipo_documento || !req.body.url) {
          return handleError(res, new Error('Tipo de documento y URL son requeridos'), 400);
      }

      const documento = await addDocumentoAlumno({
          alumno_id: req.params.alumnoId,
          ...req.body
      });
      res.status(201).json({ success: true, data: documento });
  } catch (error) {
      handleError(res, error);
  }
};

// controllers/alumno.controller.js
export const getAlumnosByTutor = async (req, res) => {
  try {
    const alumnos = await getAlumnosByTutorModel(req.params.tutorId);
    res.json({ success: true, data: alumnos });
  } catch (error) {
    handleError(res, error);
  }
};