//jshint esversion:6
// currently not needed as it is directly implemented in app.js

const ErrorHandler = require('../util/errorHandler');

module.exports = (err,req,res,next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    message:err.message,
    stack:err.stack
  });
};
