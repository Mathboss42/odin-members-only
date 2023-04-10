var express = require('express');
var router = express.Router();

const postsController = require('../controllers/postsController');

/* GET home page. */
router.get('/', postsController.postsGetAll);

router.get('/post/:id', postsController.postsGetPost);

module.exports = router;
