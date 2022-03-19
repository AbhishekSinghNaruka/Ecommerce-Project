// jshint esversion:9

const Order = require('../models/order');
const Product = require('../models/product');
const AppError = require('../util/appError');

function newOrder (req,res,next){
  Order.create({
    shippingInfo:req.body.shippingInfo,
    orderItems:req.body.orderItems,
    itemsPriceTotal:req.body.itemsPriceTotal,
    shippingPrice:req.body.shippingPrice,
    taxPrice:req.body.taxPrice,
    totalPrice:req.body.totalPrice,
    paymnetInfo:req.body.paymnetInfo,
    paidAt:Date.now(),
    user:req.user.id
  }, (err,order) => {
    if(err)
      return next(err);
    res.status(200).json({
      succcess:true,
      order
    });
  });
}
// change to without async
async function getSingleOrder(req,res,next){
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
       return next(new AppError('No Order found with this ID', 404));
   }

   res.status(200).json({
       success: true,
       order
   });
}

function myOrders(req,res,next){
  Order.find({user:req.user.id},(err,orders) => {
    if(err)
      return next(err);

    res.status(200).json({
      success:true,
      orders
    });
  });
}

function allOrdersAdmin(req,res,next){
  Order.find({},(err,orders) => {
    if(err)
      return next(err);

    let totalAmount=0;
    orders.forEach((item) => {totalAmount+=item.totalPrice;});

    res.status(200).json({
      success:true,
      totalAmount,
      orders
    });
  });
}

function updateOrderAdmin(req,res,next){
  Order.findById(req.params.id,(err,order) => {
    if(err)
      return next(err);

    if(!order)
      return next(new AppError(`order with id: ${req.params.id} cannot be found`,400));

    if(order.shippingStatus === "Delivered")
      return next(new AppError("Already delivered the product",400));

    order.orderItems.forEach((item) => {
      updateStock(item.product,item.quantity);
    });

    order.shippingStatus = req.body.status;
    if(req.body.status=="Delivered")
      order.deliverAt = Date.now();
    order.save((err,order) =>  {
      if(err)
        next(err);
      res.status(200).json({
        success:true,
        order
      });
    });
  });
}

function updateStock(id,quantity){
  console.log(id);
  Product.findById(id,(err,product) => {
    product.stock=product.stock-quantity;
    product.save();
  });
}

function removeOrder(req,res,next){
  Order.findById(req.params.id,(err,order) => {
    if(err)
      return next(err);
    if(!order)
      return next(new AppError(`Order with id: ${req.params.id} does not exist`));

    order.remove((err) => {
      if(err)
        return next(err);
      res.status(200).json({
        success:true
      });
    });
  });
}

module.exports = {newOrder,getSingleOrder,myOrders,allOrdersAdmin,updateOrderAdmin,removeOrder};
