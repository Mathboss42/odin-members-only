const passport = require("passport");

const { body, validationResult } = require("express-validator");

exports.loginGet = (req, res) => {
    res.render('login');
};

exports.loginPost = [
    body('username', 'Username must not be empty.')
        .trim()
        .isLength({ min: 2 })
        .escape(),
    body('password', 'Password must not be empty.')
        .trim()
        .isLength({ min: 2 })
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.render('login');
            return;
        }
        next();
    },
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    })
]
