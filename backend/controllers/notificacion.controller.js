import { 
    getNotificacionById,
    getAllNotificaciones,
    createNotificacion as createNotificacionModel,
    updateNotificacion as updateNotificacionModel,
    deleteNotificacion as deleteNotificacionModel
  } from '../models/NotificacionModel.js';
  
  export const getNotificacion = async (req, res) => {
    try {
      const notificacion = await getNotificacionById(req.params.id);
      res.json({ success: true, data: notificacion });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const listNotificaciones = async (req, res) => {
    try {
      const notificaciones = await getAllNotificaciones();
      res.json({ success: true, data: notificaciones });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const createNotificacion = async (req, res) => {
    try {
      const newNotificacion = await createNotificacionModel(req.body);
      res.status(201).json({ success: true, data: newNotificacion });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const updateNotificacion = async (req, res) => {
    try {
      const updatedNotificacion = await updateNotificacionModel(req.params.id, req.body);
      res.json({ success: true, data: updatedNotificacion });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const deleteNotificacion = async (req, res) => {
    try {
      await deleteNotificacionModel(req.params.id);
      res.json({ success: true, message: 'Notificación eliminada' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };