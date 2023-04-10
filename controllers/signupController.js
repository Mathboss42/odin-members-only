const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");

const User = require('../models/User');

exports.signupGet = (req, res) => {
    res.render('signup', {
        firstName: undefined,
        lastName: undefined,
        username: undefined,
        status: undefined
    });
};

exports.signupPost = [
    body("firstname", "First Name must not be empty.")
        .trim()
        .isLength({ min: 2 })
        .escape(),
    body("lastname", "Last Name must not be empty.")
        .trim()
        .isLength({ min: 2 })
        .escape(),
    body("username", "Username must not be empty.")
        .trim()
        .isLength({ min: 2 })
        .escape(),
    body("password", "Password must not be empty.")
        .trim()
        .isLength({ min: 8, max: 16 })
        .escape(),
    body("status", "Membership Status must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log('rerender', req.body.status)
            res.render('signup', {
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                username: req.body.username,
                status: req.body.status
            });
            return;
        }

        try {
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if (err) {
                    return next(err);
                }
                const user = new User({
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    userName: req.body.username,
                    password: hashedPassword,
                    status: req.body.status
                });
                const result = await user.save();
                res.redirect("/");
            });
        } catch(err) {
            return next(err);
        };
    }
];