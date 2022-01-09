//jshint esversion:9
const Product = require('../models/product');
const AppError = require('../util/appError');
const APIFeatures = require("../util/apiFeatures");


async function getProducts(req,res,next){
  const resPerPage=4;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(),req.query)
                      .search()
                      .filter()
                      .pagination(resPerPage);
  let products=await apiFeatures.query;
  let filteredProductsCount=products.length;
  apiFeatures.pagination(resPerPage);

  products=await apiFeatures.query;

  res.json({
    success:"true",
    filteredProductsCount,
    resPerPage,
    productCount,
    products
  });
}

  function findProductByID(req,res,next){
    Product.findById(req.params.id,(err,product) => {
    if(err)
      return next(new AppError(err.message,404));

      if(!product)
        return next(new AppError("Product not found",404));

      res.json({
        success:"true",
        product
      });
  });
}

 function updateProduct(req,res,next){
    Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runvalidators:true,
    useFindAndModify:false
  },(err,product) => {
    if(err)
      return next(new AppError(err.message,404));
    else{
      if(!product)
        return next(new AppError("Product not found",404));

      res.json({success:"true",product});
    }
  });
}

function createProduct(req,res,next){
  req.body.user = req.user.id;
  const newProduct = new Product(req.body);
  newProduct.save( (err,result) => {
    if(err)
      return  next(new AppError(err.message,404));
    res.status(201).json({success:"true",result});
  });
}

function deleteProduct(req,res,next){
  Product.findByIdAndDelete(req.params.id,(err,result) => {
    if(err)
        return  next(new AppError(err.message,404));
    if(!result)
        return next(new AppError("Product not found",404));

    res.json({success:"true",deleteProduct:result});

    });
}

function createProductReview(req,res,next){
  const {rating, comment, productId} = req.body;
  const review={
    user: req.user.id,
    name:req.user.name,
    rating:Number(rating),
    comments:comment
  };

  Product.findById(productId,(err,product) => {
    if(err)
      return next(err);
      let isReviewed = product.reviews.find( r => r.user.toString() === req.user._id.toString());
      if(isReviewed)
      {
        product.reviews.forEach( rev => {
          if(rev.user.toString() === req.user.id.toString()){
            rev.comments=comment;
            rev.rating=rating;
          }
        });
      }
      else{

        product.reviews.push(review);
        product.numOfReview = product.reviews.length;
      }
      let productAvgrating=0;
      product.reviews.forEach(rev => {productAvgrating+=rev.rating;});
      productAvgrating/=product.reviews.length;
      product.rating=productAvgrating;
      product.save({validateBeforeSave: false},(err,prod) => {
        if(err)
          return next(err);
        res.status(200).json({
          success:true,
          prod
        });
      });
  });
}

function getProductReviews(req,res,next){
  Product.findById(req.query.id,(err,product) => {
    if(err)
      return next(err);
    if(!product)
      return next(new AppError(`produt with product id ${req.query.id} does not exist`));
    res.status(200).json({
      success:true,
      reviews:product.reviews
    });
  });
}

function deleteReview(req,res,next){
  Product.findById(req.query.productId,(err, product) => {
    if(err)
      return next(err);
    if(!product)
      return next(new AppError(`produt with product id ${req.query.productId} does not exist`));

    const reviews=product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
    let rating=0;
    reviews.forEach(rev => {rating+=rev.rating;});
    rating/=reviews.length;

    product.numOfReview=Number(reviews.length);
    product.rating=rating;
    product.reviews=reviews;
    product.save({validateBeforeSave: false},(err,product) => {
      if(err)
        return next(err);
      res.status(200).json({
        success: true
      });
    });
  });
}

module.exports={getProducts,createProduct,findProductByID,updateProduct,
  deleteProduct,createProductReview,getProductReviews,deleteReview};
