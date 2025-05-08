import { 
  getInscripcionById,
  getAllInscripciones,
  createInscripcion as createInscripcionModel,
  getInscripcionesByTutor as getInscripcionesByTutorModel,
  getInscripcionesByAlumno,
  getInscripcionesByDeporte,
  updateInscripcion as updateInscripcionModel,
  deleteInscripcion as deleteInscripcionModel
} from '../models/InscripcionModel.js';

const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({ 
      success: false, 
      error: error.message 
  });
};

export const getInscripcion = async (req, res) => {
  try {
      const inscripcion = await getInscripcionById(req.params.id);
      if (!inscripcion) {
          return handleError(res, new Error('Inscripción no encontrada'), 404);
      }
      res.json({ success: true, data: inscripcion });
  } catch (error) {
      handleError(res, error);
  }
};

export const listInscripciones = async (req, res) => {
  try {
      const inscripciones = await getAllInscripciones();
      res.json({ success: true, data: inscripciones });
  } catch (error) {
      handleError(res, error);
  }
};

export const getInscripcionesByTutor = async (req, res) => {
  try {
      const inscripciones = await getInscripcionesByTutorModel(req.params.tutorId);
      res.json({ 
          success: true, 
          data: inscripciones || [] 
      });
  } catch (error) {
      handleError(res, error);
  }
};

export const getInscripcionesByAlumno = async (req, res) => {
  try {
      const inscripciones = await getInscripcionesByAlumno(req.params.alumnoId);
      res.json({ 
          success: true, 
          data: inscripciones || [] 
      });
  } catch (error) {
      handleError(res, error);
  }
};

export const getInscripcionesByDeporte = async (req, res) => {
  try {
      const inscripciones = await getInscripcionesByDeporte(req.params.deporteId);
      res.json({ 
          success: true, 
          data: inscripciones || [] 
      });
  } catch (error) {
      handleError(res, error);
  }
};

export const createInscripcion = async (req, res) => {
  try {
      // Validación básica
      if (!req.body.alumno_id || !req.body.deporte_id || !req.body.temporada) {
          return handleError(res, new Error('Alumno, deporte y temporada son requeridos'), 400);
      }

      const newInscripcion = await createInscripcionModel(req.body);
      res.status(201).json({ success: true, data: newInscripcion });
  } catch (error) {
      handleError(res, error);
  }
};

export const updateInscripcion = async (req, res) => {
  try {
      const updatedInscripcion = await updateInscripcionModel(req.params.id, req.body);
      if (!updatedInscripcion) {
          return handleError(res, new Error('Inscripción no encontrada'), 404);
      }
      res.json({ success: true, data: updatedInscripcion });
  } catch (error) {
      handleError(res, error);
  }
};

export const deleteInscripcion = async (req, res) => {
  try {
      const result = await deleteInscripcionModel(req.params.id);
      if (!result) {
          return handleError(res, new Error('Inscripción no encontrada'), 404);
      }
      res.json({ success: true, message: 'Inscripción eliminada correctamente' });
  } catch (error) {
      handleError(res, error);
  }
};