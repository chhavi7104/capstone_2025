/**
 * Handles requests to routes that don't exist.
 * Must be registered AFTER all real routes.
 */
const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

/**
 * Centralized error handler. Every controller forwards errors here via next(error)
 * instead of building its own error response, so the JSON shape stays consistent.
 * Must be registered LAST, after all routes and middleware.
 */
const errorHandler = (err, req, res, next) => {
  // If a status code was already set (e.g. via res.status(404) before next(err)),
  // keep it. Otherwise default to 500.
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    // Stack traces are only useful (and safe) to expose in development.
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
