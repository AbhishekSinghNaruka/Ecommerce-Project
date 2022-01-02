// jshint esversion:9

const User = require('../models/user');
const AppError = require('../util/appError');
const sendToken = require('../util/jwtToken');
const sendEmail = require('../util/sendEmail');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

function registerUser(req,res,next){
  const {name,email,password} = req.body;
  User.create({
    name,
    email,
    password
  },(err,user) => {
    if(err)
    return  next(err);
    sendToken(user,200,res);
  });
}

async function loginUser(req,res,next){
  const {email , password} = req.body;
  if(!email || !password)
    return next(new AppError("Please enter your email & password"),400);

  const user = await User.findOne({email}).select('+password');

  if(!user)
    return next(new AppError("Invalid email or password"),401);

  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched)
      return next(new AppError("Invalid email or password"),401);

  sendToken(user,200,res);
}

function logoutUser(req,res,next){
  res.cookie('token',null,{expires:new Date(Date.now()), httpOnly:true });
  res.status(200).json({
    success:true,
    message:'Logged out'
  });
}

async function forgotPassword(req,res,next){
    const user = await User.findOne({email:req.body.email});
    if(!user)
      return next(new AppError("User not found with this email"),401);

    const resetToken = user.genrateResetPasswToken();

    user.save({validateBeforeSave:false});

    const resetURL = `${req.protocol}://${req.get('host')}/api/password/reset/${resetToken}`;

    const message =`Your password reset token is as follows: ${resetURL}`;

    try{
       sendEmail({
        email:user.email,
        subject:"Ecommerce website Password recovery",
        message
      });

      res.status(200).json({
        success:true,
        message:`Email sent to ${user.email}`
      });
    }
    catch(error){
      user.resetPasswordExpire=undefined;
      user.resetPasswordToken=undefined;
      user.save({validateBeforeSave:false});
      return next(new AppError(error.message,500));
    }
}

function resetPassword(req,res,next){
  const resetToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  User.findOne({resetPasswordToken:resetToken,resetPasswordExpire:{$gt:Date.now()}},(err,user) => {
    if(err)
      return next(new AppError(err.message,500));
    if(!user)
      return next(new AppError("Password reset token is either invalid or has been expired"));

    if(req.body.password!==req.body.confirmPassword)
      return next(new AppError("Password does not match"));

    user.password=req.body.password;
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;
    user.save( (err,user) => {
      if(err)
        return next(new AppError(err.message,404));

      sendToken(user,200,res);
    });

  });
}

function getUser(req,res,next){
  User.findById(req.user.id,(err,user) => {
    if(err)
      return next(err);
    if(!user)
      return next(new AppError("User not found",400));

    res.status(200).json({
      success: true,
      user
    });
  });
}

async function changePassword(req,res,next){
  const user=await User.findById(req.user.id).select('+password');

  const isMatched = await user.comparePassword(req.body.oldPassword);
  if(!isMatched)
    return next(new AppError("Old Password does not matched. PLease enter correct Password"),401);

  if(req.body.newPassword!==req.body.confirmPassword)
    return next(new AppError("Password does not match"));

  user.password=req.body.newPassword;
  user.save();
  sendToken(user,200,res);
}

function updateProfile(req,res,next){
  const updatedData = {name:req.body.name,email:req.body.email};
  User.findByIdAndUpdate(req.user.id,updatedData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  },(err,user) => {
    if(err)
      return next(err);
    res.status(200).json({
      sucess:true,
      user
    });
  });
}

function getAllUsers(req,res,next){
  User.find({},(err,users) => {
    if(err)
      return next(err);

    res.status(200).json({
      success:true,
      users
    });
  });
}

function getSpecificUserDetails(req,res,next){
  User.findById(req.params.id,(err,user) => {
    if(err)
      return next(err);
    if(!user)
      return next(new AppError(`User with id: ${req.params.id} does not exist`));

    res.status(200).json({
      success:true,
      user
    });
  });
}

function updateUserByAdmin(req,res,next){
  const updatedData = {name:req.body.name,email:req.body.email,role:req.body.role};
  User.findByIdAndUpdate(req.params.id,updatedData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  },(err,user) => {
    if(err)
      return next(err);
    res.status(200).json({
      sucess:true,
      user
    });
  });
}

function deleteUser(req,res,next){
  User.findById(req.params.id,(err,user) => {
    if(err)
      return next(err);
    if(!user)
      return next(new AppError(`User with id: ${req.params.id} does not exist`));
    user.remove();
    res.status(200).json({
      success:true
    });
  });
}


module.exports = {registerUser,loginUser,logoutUser,forgotPassword,
  resetPassword,getUser,changePassword,updateProfile,getAllUsers,
  getSpecificUserDetails,updateUserByAdmin,deleteUser};
