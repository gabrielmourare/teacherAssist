const passport = require('passport');

function logout(req, res) {
    req.logout();
    res.redirect('/');
}

module.exports = logout;