//jshint esversion:6
const passport = require('passport');

const loginUser = (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true
    })(req, res, next);


};
module.exports = loginUser;