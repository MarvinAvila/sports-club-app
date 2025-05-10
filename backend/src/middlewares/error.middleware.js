export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';
    
    console.error(`[${new Date().toISOString()}] Error:`, {
      path: req.path,
      method: req.method,
      status: statusCode,
      message: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  
    res.status(statusCode).json({
      success: false,
      error: message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
      success: false,
      error: 'Endpoint no encontrado'
    });
  };