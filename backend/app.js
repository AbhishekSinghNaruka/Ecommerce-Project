// jshint esversion:9

const express = require('express');

const product = require("./routes/product.js");
const auth = require("./routes/auth.js");
const order = require("./routes/order.js");

const cookieParser = require('cookie-parser');
const AppError = require('./util/appError');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api",product);
app.use("/api",auth);
app.use("/api",order);


app.use((err,req,res,next) => {
  err.statusCode = err.statusCode || 500;
  if(process.env.NODE_ENV === "DEVELOPMENT"){
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack:err.stack
    });
  }
  if(process.env.NODE_ENV === "PRODUCTION"){
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new AppError(message, 400);
    }
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new AppError(message, 400);
    }

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new AppError(message, 400);
    }

    if (err.name === 'JsonWebTokenError') {
        const message = 'JSON Web Token is invalid. Try Again!!!';
        error = new AppError(message, 400);
    }

       // Handling Expired JWT error
    if (err.name === 'TokenExpiredError') {
        const message = 'JSON Web Token is expired. Try Again!!!';
        error = new AppError(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message:error.message || "Internal Server Error"
    });
  }

});

module.exports = app;
