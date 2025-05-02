import { 
    getPagoById,
    getAllPagos,
    createPago as createPagoModel,
    updatePago as updatePagoModel,
    deletePago as deletePagoModel
  } from '../models/PagoModel.js';
  
  export const getPago = async (req, res) => {
    try {
      const pago = await getPagoById(req.params.id);
      res.json({ success: true, data: pago });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const listPagos = async (req, res) => {
    try {
      const pagos = await getAllPagos();
      res.json({ success: true, data: pagos });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const createPago = async (req, res) => {
    try {
      const newPago = await createPagoModel(req.body);
      res.status(201).json({ success: true, data: newPago });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const updatePago = async (req, res) => {
    try {
      const updatedPago = await updatePagoModel(req.params.id, req.body);
      res.json({ success: true, data: updatedPago });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const deletePago = async (req, res) => {
    try {
      await deletePagoModel(req.params.id);
      res.json({ success: true, message: 'Pago eliminado' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };