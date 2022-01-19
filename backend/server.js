// jshint esversion:6
require('dotenv').config({path:'backend/.env'});
const app = require("./app.js");
const connectDB = require("./database.js");
const cloudinary = require('cloudinary')


process.on('uncaughtException',err => {
  console.log(`Error: ${err.stack}`);
  console.log("shutting down server");
  process.exit(1);
});

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const appServer=app.listen(process.env.PORT,function(){
  console.log(`server started on port: ${process.env.PORT}`);
});



process.on('unhandledRejection',err => {
  console.log(`Error: ${err.stack}`);
  console.log("shutting down server");
  appServer.close( () => process.exit(1));
});
