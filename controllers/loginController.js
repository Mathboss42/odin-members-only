const passport = require("passport");

exports.loginGet = (req, res) => {
    res.render('login');
};

exports.loginPost = passport.authenticate("local", {
                        successRedirect: "/",
                        failureRedirect: "/login"
                    })
