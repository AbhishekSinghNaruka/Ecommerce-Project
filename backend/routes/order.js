// jshint esversion:6

const express = require('express');
const router = express.Router();

const {isAuthenticated,authorizeRoles} = require('../middlewares/auth.js');
const order = require('../controllers/orderController.js');

router.post('/order/new',isAuthenticated,order.newOrder);
router.get('/order/:id',isAuthenticated,order.getSingleOrder);
router.get('/orders/myOrders',isAuthenticated,order.myOrders);
router.get('/admin/allOrders',isAuthenticated,authorizeRoles('admin'),order.allOrdersAdmin);
router.put('/admin/order/:id',isAuthenticated,authorizeRoles('admin'),order.updateOrderAdmin);
router.delete('/admin/order/:id',isAuthenticated,authorizeRoles('admin'),order.removeOrder);

module.exports=router;
