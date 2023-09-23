// Helper function to handle asynchronous routes
const asyncHandler = fn => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  // Central error handler
  const centralErrorHandler = (err, req, res, next) => {
    console.error("Unhandled error:", err);
    
    res.status(err.status || 500).send({ 
      error: {
        message: err.message || "Internal Server Error"
      }
    });
  };
  
  module.exports = { asyncHandler, centralErrorHandler };