var express = require('express');
var router = express.Router();

const joinController = require('../controllers/joinController');

router.get('/', joinController.joinGet);

router.post('/', joinController.joinPost);

module.exports = router;
