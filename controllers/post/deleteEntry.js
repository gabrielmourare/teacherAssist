//jshint esversion:6
const Entry = require('../../database/models/entryModel');

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
                res.render('../public/views/pages/success.ejs', {
                    title: 'Sucess!',
                    message: 'Entry successfully deleted!'
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