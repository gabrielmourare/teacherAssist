//jshint esversion: 6
const Entry = require('../../database/models/entryModel');

const updateEntry = (req, res) => {
    var id = req.params.id;
    var date = new Date(req.body.date);
    var teacher = req.body.teacher;
    var content = req.body.content;
    var updateDate = new Date().toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"

    }).toString();

    Entry.findByIdAndUpdate({
            _id: id
        }, {
            date: date,
            teacher: teacher,
            content: content,
            updateDate: updateDate
        })

        .then((entry) => {
            if (!entry) {
                res.status(404).send({
                    message: "Entry not found!"
                });
            } else {
                res.render('../public/views/pages/success.ejs', {
                    title: 'Success!',
                    message: 'Entry successfully updated!',
                    previousPage: 'editEntry/' + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


module.exports = updateEntry;