import { 
    getDeporteById, 
    getAllDeportes,
    createDeporte as createDeporteModel,
    updateDeporte as updateDeporteModel,
    deleteDeporte as deleteDeporteModel
  } from '../models/DeporteModel.js';
  
  export const getDeporte = async (req, res) => {
    try {
      const deporte = await getDeporteById(req.params.id);
      res.json({ success: true, data: deporte });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const listDeportes = async (req, res) => {
    try {
      const deportes = await getAllDeportes();
      res.json({ success: true, data: deportes });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const createDeporte = async (req, res) => {
    try {
      const newDeporte = await createDeporteModel(req.body);
      res.status(201).json({ success: true, data: newDeporte });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const updateDeporte = async (req, res) => {
    try {
      const updatedDeporte = await updateDeporteModel(req.params.id, req.body);
      res.json({ success: true, data: updatedDeporte });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const deleteDeporte = async (req, res) => {
    try {
      await deleteDeporteModel(req.params.id);
      res.json({ success: true, message: 'Deporte eliminado' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };