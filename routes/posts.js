var express = require('express');
var router = express.Router();

const postsController = require('../controllers/postsController');

/* GET home page. */
router.get('/', postsController.postsGetAll);

router.get('/post/:id', postsController.postsGetPost);

router.get('/post/:id/delete', postsController.postDeleteGet);

router.post('/post/:id/delete', postsController.postDeletePost);

router.get('/new', postsController.postCreateGet);

router.post('/new', postsController.postCreatePost);


module.exports = router;
