var express = require('express');
var router = express.Router();

const newController = require('../controllers/newController');

router.get('/', newController.newGet);

router.post('/', newController.newPost);

module.exports = router;
