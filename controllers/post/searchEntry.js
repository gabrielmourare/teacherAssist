// jshint esversion: 6
const Entry = require('../../database/models/entryModel');

const searchEntry = (req, res) => {
    var searchField = req.body.searchByTeacher;

    Entry.find({
            $text: {
                $search: searchField
            }
        })

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
                message: err.message
            });
        });

};

module.exports = searchEntry;