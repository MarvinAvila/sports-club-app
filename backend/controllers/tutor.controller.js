import {
  getTutorById,
  getAllTutores,
  createTutor as createTutorModel,
  updateTutor as updateTutorModel,
  deleteTutor as deleteTutorModel,
} from "../models/TutorModel.js";
import {
  getAlumnosByTutor,
  getTutoresByAlumno,
  addAlumnoToTutor as addAlumnoToTutorModel,
  deleteTutorAlumno,
} from "../models/TutorAlumnoModel.js";
import { getInscripcionesByTutor } from "../models/InscripcionModel.js";

const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({
    success: false,
    error: error.message,
  });
};

export const getTutor = async (req, res) => {
  try {
    const tutor = await getTutorById(req.params.id);
    if (!tutor) {
      return handleError(res, new Error("Tutor no encontrado"), 404);
    }
    res.json({ success: true, data: tutor });
  } catch (error) {
    handleError(res, error);
  }
};

export const listTutores = async (req, res) => {
  try {
    const tutores = await getAllTutores();
    res.json({ success: true, data: tutores });
  } catch (error) {
    handleError(res, error);
  }
};

export const createTutor = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.nombre || !req.body.apellido_paterno || !req.body.email) {
      return handleError(
        res,
        new Error("Nombre, apellido paterno y email son requeridos"),
        400
      );
    }

    const newTutor = await createTutorModel(req.body);
    res.status(201).json({ success: true, data: newTutor });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateTutor = async (req, res) => {
  try {
    const updatedTutor = await updateTutorModel(req.params.id, req.body);
    if (!updatedTutor) {
      return handleError(res, new Error("Tutor no encontrado"), 404);
    }
    res.json({ success: true, data: updatedTutor });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteTutor = async (req, res) => {
  try {
    const result = await deleteTutorModel(req.params.id);
    if (!result) {
      return handleError(res, new Error("Tutor no encontrado"), 404);
    }
    res.json({ success: true, message: "Tutor eliminado correctamente" });
  } catch (error) {
    handleError(res, error);
  }
};

export const getTutorAlumnos = async (req, res) => {
  try {
    const alumnos = await getAlumnosByTutor(req.params.tutorId);
    res.json({
      success: true,
      data: alumnos || [],
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getAlumnoTutores = async (req, res) => {
  try {
    const tutores = await getTutoresByAlumno(req.params.alumnoId);
    res.json({
      success: true,
      data: tutores || [],
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const addAlumnoToTutor = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.tutor_id || !req.body.alumno_id || !req.body.parentesco) {
      return handleError(
        res,
        new Error("Tutor, alumno y parentesco son requeridos"),
        400
      );
    }

    // Verificación de permisos (solo admin o el propio tutor)
    if (req.user.rol !== "admin" && req.user.id !== req.body.tutor_id) {
      return handleError(res, new Error("No autorizado"), 403);
    }

    const result = await addAlumnoToTutorModel(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    handleError(res, error);
  }
};

export const removeAlumnoFromTutor = async (req, res) => {
  try {
    const { tutorId, alumnoId } = req.params;

    // Verificación de permisos (solo admin o el propio tutor)
    if (req.user.rol !== "admin" && req.user.id !== tutorId) {
      return handleError(res, new Error("No autorizado"), 403);
    }

    const result = await deleteTutorAlumno(tutorId, alumnoId);
    if (!result) {
      return handleError(res, new Error("Relación no encontrada"), 404);
    }
    res.json({ success: true, message: "Relación eliminada correctamente" });
  } catch (error) {
    handleError(res, error);
  }
};

export const getTutorInscripciones = async (req, res) => {
  try {
    const inscripciones = await getInscripcionesByTutor(req.params.tutorId);
    res.json({
      success: true,
      data: inscripciones || [],
    });
  } catch (error) {
    handleError(res, error);
  }
};
