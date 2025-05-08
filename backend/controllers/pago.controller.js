import { 
  getPagoById,
  getAllPagos,
  createPago as createPagoModel,
  updatePago as updatePagoModel,
  deletePago as deletePagoModel,
  getPagosByInscripcion as getPagosByInscripcionModel
} from '../models/PagoModel.js';

const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({ 
      success: false, 
      error: error.message 
  });
};

export const getPago = async (req, res) => {
  try {
      const pago = await getPagoById(req.params.id);
      if (!pago) {
          return handleError(res, new Error('Pago no encontrado'), 404);
      }
      res.json({ success: true, data: pago });
  } catch (error) {
      handleError(res, error);
  }
};

export const listPagos = async (req, res) => {
  try {
      const pagos = await getAllPagos();
      res.json({ success: true, data: pagos });
  } catch (error) {
      handleError(res, error);
  }
};

export const getPagosByInscripcion = async (req, res) => {
  try {
      const pagos = await getPagosByInscripcionModel(req.params.inscripcionId);
      res.json({ 
          success: true, 
          data: pagos || [] 
      });
  } catch (error) {
      handleError(res, error);
  }
};

export const createPago = async (req, res) => {
  try {
      // Validación básica
      if (!req.body.inscripcion_id || !req.body.monto || !req.body.metodo_pago || !req.body.fecha_pago) {
          return handleError(res, new Error('Inscripción, monto, método de pago y fecha son requeridos'), 400);
      }

      const newPago = await createPagoModel(req.body);
      res.status(201).json({ success: true, data: newPago });
  } catch (error) {
      handleError(res, error);
  }
};

export const updatePago = async (req, res) => {
  try {
      const updatedPago = await updatePagoModel(req.params.id, req.body);
      if (!updatedPago) {
          return handleError(res, new Error('Pago no encontrado'), 404);
      }
      res.json({ success: true, data: updatedPago });
  } catch (error) {
      handleError(res, error);
  }
};

export const deletePago = async (req, res) => {
  try {
      const result = await deletePagoModel(req.params.id);
      if (!result) {
          return handleError(res, new Error('Pago no encontrado'), 404);
      }
      res.json({ success: true, message: 'Pago eliminado correctamente' });
  } catch (error) {
      handleError(res, error);
  }
};