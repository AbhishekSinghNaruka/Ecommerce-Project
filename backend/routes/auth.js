//jshint esversion:6

const express = require('express');
const router = express.Router();
const user = require('../controllers/userController.js');
const {isAuthenticated,authorizeRoles} = require('../middlewares/auth.js');

router.post('/register',user.registerUser);
router.post('/login',user.loginUser);
router.get('/logout',user.logoutUser);

router.post('/password/forgot',user.forgotPassword);
router.put('/password/reset/:token',user.resetPassword);
router.put('/password/updatePassword',isAuthenticated,user.changePassword);

router.get('/profile',isAuthenticated,user.getUser);
router.put('/profile/updateProfile',isAuthenticated,user.updateProfile);

router.get('/admin/users',isAuthenticated,authorizeRoles('admin'),user.getAllUsers);
router.get('/admin/users/:id',isAuthenticated,authorizeRoles('admin'),user.getSpecificUserDetails);
router.put('/admin/users/:id',isAuthenticated,authorizeRoles('admin'),user.updateUserByAdmin);
router.delete('/admin/users/:id',isAuthenticated,authorizeRoles('admin'),user.deleteUser);
module.exports = router;
