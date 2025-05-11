import {
  getPagoById,
  getAllPagos,
  createPago as createPagoModel,
  updatePago as updatePagoModel,
  deletePago as deletePagoModel,
  getPagosByInscripcion as getPagosByInscripcionModel,
} from "../models/PagoModel.js";
import { getAlumnoById } from "../models/AlumnoModel.js";

import QRCode from "qrcode";

const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({
    success: false,
    error: error.message,
  });
};

export const getPago = async (req, res) => {
  try {
    const pago = await getPagoById(req.params.id);
    if (!pago) {
      return handleError(res, new Error("Pago no encontrado"), 404);
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
      data: pagos || [],
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const createPago = async (req, res) => {
  try {
    // Validación básica
    if (
      !req.body.inscripcion_id ||
      !req.body.monto ||
      !req.body.metodo_pago ||
      !req.body.fecha_pago
    ) {
      return handleError(
        res,
        new Error("Inscripción, monto, método de pago y fecha son requeridos"),
        400
      );
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
      return handleError(res, new Error("Pago no encontrado"), 404);
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
      return handleError(res, new Error("Pago no encontrado"), 404);
    }
    res.json({ success: true, message: "Pago eliminado correctamente" });
  } catch (error) {
    handleError(res, error);
  }
};

export const generarQRPago = async (req, res) => {
  try {
    console.log('Solicitud de QR recibida para:', req.params.alumnoId);
    
    const { alumnoId } = req.params;

    // 1. Validar formato del UUID
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(alumnoId)) {
      return res.status(400).json({ 
        success: false,
        error: "ID de alumno inválido" 
      });
    }

    // 2. Verificar alumno en base de datos
    const alumno = await getAlumnoById(alumnoId);
    if (!alumno) {
      return res.status(404).json({ 
        success: false,
        error: "Alumno no encontrado" 
      });
    }

    // 3. Generar URL segura
    const paymentUrl = new URL(
      `/pagar/${alumnoId}`,
      process.env.FRONTEND_URL || 'http://localhost:3000'
    ).toString();

    // 4. Generar QR como Data URL (PNG base64)
    const qrDataUrl = await QRCode.toDataURL(paymentUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      scale: 8,
      color: {
        dark: '#1E40AF', // azul
        light: '#FFFFFF' // blanco
      }
    });

    // 5. Responder con los datos
    res.json({
      success: true,
      qrCode: qrDataUrl,
      paymentUrl,
      alumno: {
        id: alumno.id,
        nombre: alumno.nombre,
        apellido: alumno.apellido_paterno
      }
    });

  } catch (error) {
    console.error('Error en generarQRPago:', error);
    res.status(500).json({
      success: false,
      error: 'Error al generar el código QR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
