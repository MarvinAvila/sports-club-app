import { getInscripcionesByTutor } from '../models/InscripcionModel.js';
import { getAlumnosByTutor, addAlumnoToTutor as addAlumnoToTutorModel } from '../models/TutorAlumnoModel.js';

export const getTutorEnrollments = async (req, res) => {
  try {
    const inscripciones = await getInscripcionesByTutor(req.user.id);
    res.json({ success: true, data: inscripciones });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getTutorAlumnos = async (req, res) => {
  try {
    const alumnos = await getAlumnosByTutor(req.user.id);
    res.json({ success: true, data: alumnos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addAlumnoToTutor = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.id !== req.body.tutor_id) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    
    const result = await addAlumnoToTutorModel(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};