var express = require('express');
var router = express.Router();

const logoutController = require('../controllers/logoutController');

router.get('/', logoutController.logoutGet);

module.exports = router;
