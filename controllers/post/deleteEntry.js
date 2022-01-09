//jshint esversion:6
const Entry = require('../../database/models/entryModel');
const User = require('../../database/models/userModel');

const deleteEntry = (req, res) => {


    Entry.findByIdAndDelete({
            _id: req.params.id
        })
        .then((entry) => {
            if (!entry) {
                res.status(404).send({
                    message: "Couldn't find entry. Already deleted or it doesn't exist."
                });
            } else {
                User.remove({
                    entries: entry
                });
                console.log(entry)
                res.render('../public/views/pages/success.ejs', {
                    title: 'Sucess!',
                    message: 'Entry successfully deleted!',
                    previousPage: 'entries'
                });
            }
        })

        .catch(err => {
            res.status(500).send({
                message: "Couldn't delete entry. Maybe you don't have permission."
            });
        });
};

module.exports = deleteEntry;