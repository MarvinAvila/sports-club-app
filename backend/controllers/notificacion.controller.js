import { 
  getNotificacionById,
  getAllNotificaciones,
  createNotificacion as createNotificacionModel,
  updateNotificacion as updateNotificacionModel,
  deleteNotificacion as deleteNotificacionModel,
  getNotificacionesByTutor as getNotificacionesByTutorModel,
  marcarComoLeida
} from '../models/NotificacionModel.js';

const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({ 
      success: false, 
      error: error.message 
  });
};

export const getNotificacion = async (req, res) => {
  try {
      const notificacion = await getNotificacionById(req.params.id);
      if (!notificacion) {
          return handleError(res, new Error('Notificación no encontrada'), 404);
      }
      res.json({ success: true, data: notificacion });
  } catch (error) {
      handleError(res, error);
  }
};

export const listNotificaciones = async (req, res) => {
  try {
      const notificaciones = await getAllNotificaciones();
      res.json({ success: true, data: notificaciones });
  } catch (error) {
      handleError(res, error);
  }
};

export const getNotificacionesByTutor = async (req, res) => {
  try {
      const notificaciones = await getNotificacionesByTutorModel(req.params.tutorId);
      res.json({ 
          success: true, 
          data: notificaciones || [] 
      });
  } catch (error) {
      handleError(res, error);
  }
};

export const createNotificacion = async (req, res) => {
  try {
      // Validación básica
      if (!req.body.tutor_id || !req.body.mensaje || !req.body.tipo) {
          return handleError(res, new Error('Tutor, mensaje y tipo son requeridos'), 400);
      }

      const newNotificacion = await createNotificacionModel(req.body);
      res.status(201).json({ success: true, data: newNotificacion });
  } catch (error) {
      handleError(res, error);
  }
};

export const updateNotificacion = async (req, res) => {
  try {
      const updatedNotificacion = await updateNotificacionModel(req.params.id, req.body);
      if (!updatedNotificacion) {
          return handleError(res, new Error('Notificación no encontrada'), 404);
      }
      res.json({ success: true, data: updatedNotificacion });
  } catch (error) {
      handleError(res, error);
  }
};

export const markAsRead = async (req, res) => {
  try {
      const notificacion = await marcarComoLeida(req.params.id);
      if (!notificacion) {
          return handleError(res, new Error('Notificación no encontrada'), 404);
      }
      res.json({ success: true, data: notificacion });
  } catch (error) {
      handleError(res, error);
  }
};

export const deleteNotificacion = async (req, res) => {
  try {
      const result = await deleteNotificacionModel(req.params.id);
      if (!result) {
          return handleError(res, new Error('Notificación no encontrada'), 404);
      }
      res.json({ success: true, message: 'Notificación eliminada correctamente' });
  } catch (error) {
      handleError(res, error);
  }
};