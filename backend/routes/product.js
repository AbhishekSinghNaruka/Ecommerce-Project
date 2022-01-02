//jshint esversion:6
const express = require('express');
const router = express.Router();
const product = require('../controllers/productController.js');
const {isAuthenticated,authorizeRoles} = require('../middlewares/auth.js');


router.get("/products",product.getProducts);
router.get("/product/:id",product.findProductByID);


router.post("/admin/new",isAuthenticated,authorizeRoles('admin'),product.createProduct);
router.put("/admin/:id",isAuthenticated,authorizeRoles('admin'),product.updateProduct);
router.delete("/admin/:id",isAuthenticated,authorizeRoles('admin'),product.deleteProduct);


router.put("/review",isAuthenticated,product.createProductReview);
router.get("/reviews",isAuthenticated,product.getProductReviews);
router.delete("/reviews",isAuthenticated,product.deleteReview);

module.exports = router;
