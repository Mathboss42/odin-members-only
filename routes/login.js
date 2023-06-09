var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController');

router.get('/', loginController.loginGet);

router.post('/', loginController.loginPost);

module.exports = router;
