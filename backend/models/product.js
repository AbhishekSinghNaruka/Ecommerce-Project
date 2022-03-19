//jshint esversion:6

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter product name"],
    maxlength: [100, "Name of the product cannot exceed 100 characters"]
  },
  price: {
    type: Number,
    trim: true,
    required: [true, "Please enter product price"],
    maxlength: [5, "Price cannot exceed 5 digits"],
    default: 0.0
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please enter product description"],
    maxlength: [1000, "Description cannot exceed 1000 characters"]
  },
  rating: {
    type: Number,
    default: 0
  },
  images: [{
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      //required: true
    }
  }],
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: {
      values: [
        "Electronics",
        "Food",
        "Laptops",
        "Accessories",
        "Headphones",
        "Books",
        "Clothing",
        "Cameras",
        "Beauty",
        "Sports"
      ],
      messages:"Please select correct product category"
    }
  },
  seller: {
    type:String,
    required: [true, "Please enter seller product seller"]
  },
  stock:{
    type:Number,
    required: [true, "Please enter stock of the product"],
    maxlength:[5,"Product stock cannot exceed 5 digits"],
    default:0
  },
  numOfReview:{
    type:Number,
    default:0
  },
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required: true
  },
  reviews:[
    {
      user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      name:{
        type:String,
        required:true
      },
      rating:{
        type:Number,
        required:true
      },
      comments: {
        type:String,
        required:true
      }
    }
  ]
});

module.exports = mongoose.model('Product', productSchema);
