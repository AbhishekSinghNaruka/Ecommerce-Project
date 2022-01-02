//jshint esversion:9

const AppError = require('../util/appError');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function isAuthenticated(req,res,next){
  const { token } = req.cookies;

  if(!token)
    return next(new AppError("Login first to access the resources",401));

  const decoded = jwt.verify(token,process.env.JWT_ACCES_TOKEN);
  User.findById(decoded.id,(err,user) => {
    req.user=user;
    next();
  });

}

function authorizeRoles(...roles) {
  return (req,res,next) => {
    if(!roles.includes(req.user.role))
      return next(new AppError(`${req.user.role} cannot access this resources`,403));
      next();
  };

}

module.exports ={ isAuthenticated,authorizeRoles};
