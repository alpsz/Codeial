const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Router loaded");
module.exports = router;

router.get('/',homeController.home);