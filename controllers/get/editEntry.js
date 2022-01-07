//jshint esversion: 6
const Entry = require('../../database/models/entryModel');

const renderEntry = (req, res) => {
    var id = req.params.id;

    Entry.findById({
            _id: id
        })
        .then((entry) => {
            if (!entry) {
                res.status(404).send({
                    title: "Failure!",
                    message: "Couldn't save updates. Please try again."
                });
            } else {

                res.render('../public/views/pages/editEntry.ejs', {
                    id: entry._id,
                    date: entry.date.toISOString().substring(0, 10),
                    teacher: entry.teacher,
                    content: entry.content
                });
            }

        })

        .catch(err => {
            res.status(500).send({
                message: "Something went wrong."
            });
        });
};

module.exports = renderEntry;