//jshint esversion:9

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name:{
    type: 'string',
    required: [true, "Please enter your name"],
    maxlength: [50, "Name can not exceeded 50 characters"]
  },
  email:{
    type: 'string',
    required: [true, "Please enter your email address"],
    unique: true,
    validate:[validator.isEmail,'Please enter a valid email address']
  },
  password:{
    type: 'string',
    required: [true, "Please enter your password"],
    minlength: [6,"password must greater than 6 characters"],
    select:false,
  },
  avatar:{
    public_id:{
      type: 'string',
      required: true
    },
    url:{
      type: 'string',
      required:true
    }
  },
  role:{
    type: 'string',
    default: 'user'
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date
});

userSchema.pre('save',async function(next){
  if(!this.isModified('password'))
    next();
  this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.getJWTtoken = function(){
  return jwt.sign({id:this._id},process.env.JWT_ACCES_TOKEN,{
    expiresIn:process.env.JWT_EXPIRATION_TIME
  });
};

userSchema.methods.comparePassword =async function(enteredPassword){
  return bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.genrateResetPasswToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() +10 *60 *1000;
    return resetToken;
};

module.exports = mongoose.model("User",userSchema);
