//jshint esversion:6
require('dotenv').config({path:'backend/.env'});
const connectDB = require('../database');
const data = require('../data/products');
const Product = require('../models/product');
connectDB();

const seedProducts = async() => {
  try{
    await Product.deleteMany();
    console.log("all product deleted");
    await Product.insertMany(data);
    console.log("All product inserted");
    process.exit();
  }
  catch(err){
    console.log(err);
    process.exit();
  }
}

seedProducts();
