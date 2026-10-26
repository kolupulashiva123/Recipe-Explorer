/**
 * Recipe Explorer - Centralized Error Handling Middleware
 */

// 404 Not Found Middleware
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found on this server.`
  });
};

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  
  console.error(`[Error] ${req.method} ${req.originalUrl} - ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
