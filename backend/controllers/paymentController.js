const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AppError = require('../util/appError');

async function processPayment(req,res,next){
  try{
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'inr',
      metadata:{integration_check:'accept_a_payment'}
    });
    res.status(200).json({
      success:true,
      client_secret:paymentIntent.client_secret
    })
  }
  catch(err){
    return next(new AppError(err.message,400));
  }
}

function sendStripAPI(req, res, next){
  res.status(200).json({
    stripeApiKey:process.env.STRIPE_API_KEY
  })
}

module.exports = {processPayment,sendStripAPI};
