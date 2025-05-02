import { 
    getInscripcionById,
    getAllInscripciones,
    createInscripcion as createInscripcionModel,
    getInscripcionesByTutor as getInscripcionesByTutorModel,
    updateInscripcion as updateInscripcionModel,
    deleteInscripcion as deleteInscripcionModel
  } from '../models/InscripcionModel.js';
  
  export const getInscripcion = async (req, res) => {
    try {
      const inscripcion = await getInscripcionById(req.params.id);
      res.json({ success: true, data: inscripcion });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  export const getInscripcionesByTutor = async (req, res) => {
    try {
      console.log('Obteniendo inscripciones para tutor:', req.params.tutorId);
      const inscripciones = await getInscripcionesByTutorModel(req.params.tutorId);
      
      if (!inscripciones || inscripciones.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'No se encontraron inscripciones'
        });
      }
  
      res.json({
        success: true,
        data: inscripciones
      });
    } catch (error) {
      console.error('Error en getInscripcionesByTutor:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
  
  export const listInscripciones = async (req, res) => {
    try {
      const inscripciones = await getAllInscripciones();
      res.json({ success: true, data: inscripciones });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const createInscripcion = async (req, res) => {
    try {
      const newInscripcion = await createInscripcionModel(req.body);
      res.status(201).json({ success: true, data: newInscripcion });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const updateInscripcion = async (req, res) => {
    try {
      const updatedInscripcion = await updateInscripcionModel(req.params.id, req.body);
      res.json({ success: true, data: updatedInscripcion });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const deleteInscripcion = async (req, res) => {
    try {
      await deleteInscripcionModel(req.params.id);
      res.json({ success: true, message: 'Inscripción eliminada' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const getInscripcionesTutor = async (req, res) => {
    try {
      const inscripciones = await getInscripcionesByTutor(req.user.id);
      res.json({ success: true, data: inscripciones });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };