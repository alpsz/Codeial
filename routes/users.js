const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const passport = require('passport');
router.get('/profile', userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {successRedirect:'/',failureRedirect:'/users/sign-in'},
));
module.exports = router;
