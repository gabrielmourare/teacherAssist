function checkPassword(req, res, next) {
    if (req.body.password !== req.body.password2) {
        res.render("../public/views/pages/success.ejs", {
            title: "Failure",
            message: "Passwords must match!",
            previousPage: "register"
        });
    } else {
        next();
    }
}

module.exports = checkPassword;