const { body, validationResult } = require("express-validator");

const User = require('../models/User');

exports.joinGet = (req, res) => {
    if (res.locals.currentUser && res.locals.currentUser.status === 'user') {
        res.render('join');
    } else {
        res.redirect('/');
    }
};

exports.joinPost = [
    body('password', 'Password must not be empty.')
        .trim()
        .isLength({ min: 2 })
        .escape()
        .custom((value, { req }) => value === process.env.SUPER_SECRET_PASSWORD),

    async (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.render('join');
            return;
        }
        
        const user = await User.findById(req.user._id);
        user.status = 'member';
        user.save().then(() => {
            res.redirect('/');
        }).catch((err) => {
            next(err);
        })
    }
];
