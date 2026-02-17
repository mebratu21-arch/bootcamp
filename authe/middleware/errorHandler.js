/**
 * Global error handler middleware
 * Handles all errors in a consistent format
 */
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  // Environment-specific error details
  const isDevelopment = process.env.NODE_ENV === "development";

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(isDevelopment && { stack: err.stack }), // Only show stack trace in development
  });
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};
