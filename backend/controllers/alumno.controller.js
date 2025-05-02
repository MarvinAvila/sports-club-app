import { 
    getAlumnoById, 
    getAllAlumnos,
    createAlumno as createAlumnoModel,
    updateAlumno as updateAlumnoModel,
    deleteAlumno as deleteAlumnoModel
  } from '../models/AlumnoModel.js';
  
  export const getAlumno = async (req, res) => {
    try {
      const alumno = await getAlumnoById(req.params.id);
      res.json({ success: true, data: alumno });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const listAlumnos = async (req, res) => {
    try {
      const alumnos = await getAllAlumnos();
      res.json({ success: true, data: alumnos });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const createAlumno = async (req, res) => {
    try {
      const newAlumno = await createAlumnoModel(req.body);
      res.status(201).json({ success: true, data: newAlumno });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const updateAlumno = async (req, res) => {
    try {
      const updatedAlumno = await updateAlumnoModel(req.params.id, req.body);
      res.json({ success: true, data: updatedAlumno });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const deleteAlumno = async (req, res) => {
    try {
      await deleteAlumnoModel(req.params.id);
      res.json({ success: true, message: 'Alumno eliminado' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };