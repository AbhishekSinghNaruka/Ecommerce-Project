//jshint esversion:6
const mongoose = require('mongoose');

function connectDB(){
  mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(con => console.log(`database connected ${con.connection.host}`));
}

module.exports = connectDB;
