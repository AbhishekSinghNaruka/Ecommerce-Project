
const express = require('express');
const router = express.Router();

const {isAuthenticated,authorizeRoles} = require('../middlewares/auth.js');
const payment = require('../controllers/paymentController.js');

router.post('/payment/process',isAuthenticated,payment.processPayment);
router.get('/stripeApi',isAuthenticated,payment.sendStripAPI);

module.exports=router;
