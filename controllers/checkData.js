function checkData(req, res, next) {
    if (!req.body.date || !req.body.teacher || !req.body.content) {
        res.render('../public/views/pages/success.ejs', {
            title: "Missing Data!",
            message: "Please, complete all the fields.",
            previousPage: "createEntry"
        });
    } else {
        next();
    }
}

module.exports = checkData;