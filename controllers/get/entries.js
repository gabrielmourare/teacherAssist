//jshint esversion: 6

const Entry = require('../../database/models/entryModel');


const findAll = (req, res) => {
    Entry.find({})
        .then((entries) => {
            if (!entries) {
                res.status(404).send({
                    message: "Something went wrong."
                });
            } else {
                res.render('../public/views/pages/allEntries.ejs', {
                    lessonsList: entries
                });
            }
        })

        .catch(err => {
            res.status(500).send({
                message: "Something went wrong"
            });
        });
};


module.exports = findAll;