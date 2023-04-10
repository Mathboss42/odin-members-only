const { body, validationResult } = require("express-validator");

const Post = require('../models/Post');

exports.postCreateGet = (req, res) => {
    if (req.user) {
        res.render('new', { title: undefined, text: undefined});
    } else {
        res.redirect('/');
    }
};

exports.postCreatePost = [
    body('title', 'Title must not be empty.')
        .trim()
        .isLength({ min: 2 })
        .escape(),
    body('text', 'Text Contents must not be empty.')
        .trim()
        .isLength({ min: 2 })
        .escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.render('new', {
                title: req.body.title,
                text: req.body.text,
            });
            return;
        }
        
        const post = new Post({
            title: req.body.title,
            text: req.body.text,
            timeStamp: Date.now(),
            author: req.body.user._id
        });

        post.save().then(() => {
            res.redirect(post.url);
        }).catch((err) => {
            return next(err);
        });
    }
]
