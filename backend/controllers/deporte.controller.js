import { 
  getDeporteById, 
  getAllDeportes,
  createDeporte as createDeporteModel,
  updateDeporte as updateDeporteModel,
  deleteDeporte as deleteDeporteModel
} from '../models/DeporteModel.js';

const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({ 
      success: false, 
      error: error.message 
  });
};

export const getDeporte = async (req, res) => {
  try {
      const deporte = await getDeporteById(req.params.id);
      if (!deporte) {
          return handleError(res, new Error('Deporte no encontrado'), 404);
      }
      res.json({ success: true, data: deporte });
  } catch (error) {
      handleError(res, error);
  }
};

export const listDeportes = async (req, res) => {
  try {
      const deportes = await getAllDeportes();
      res.json({ success: true, data: deportes });
  } catch (error) {
      handleError(res, error);
  }
};

export const createDeporte = async (req, res) => {
  try {
      // Validación básica
      if (!req.body.nombre || !req.body.horario || !req.body.entrenador) {
          return handleError(res, new Error('Nombre, horario y entrenador son requeridos'), 400);
      }

      const newDeporte = await createDeporteModel(req.body);
      res.status(201).json({ success: true, data: newDeporte });
  } catch (error) {
      handleError(res, error);
  }
};

export const updateDeporte = async (req, res) => {
  try {
      const updatedDeporte = await updateDeporteModel(req.params.id, req.body);
      if (!updatedDeporte) {
          return handleError(res, new Error('Deporte no encontrado'), 404);
      }
      res.json({ success: true, data: updatedDeporte });
  } catch (error) {
      handleError(res, error);
  }
};

export const deleteDeporte = async (req, res) => {
  try {
      const result = await deleteDeporteModel(req.params.id);
      if (!result) {
          return handleError(res, new Error('Deporte no encontrado'), 404);
      }
      res.json({ success: true, message: 'Deporte eliminado correctamente' });
  } catch (error) {
      handleError(res, error);
  }
};