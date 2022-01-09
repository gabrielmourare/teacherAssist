//jshint esversion:6
const Entry = require('../../database/models/entryModel');
const User = require('../../database/models/userModel');

const createEntry = (req, res) => {
    var id = req.user._id;
    var date = new Date(req.body.date);
    var teacher = req.body.teacher;
    var content = req.body.content;
    var entryDate = new Date().toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"

    });


    Entry.create({
            date: date,
            teacher: teacher,
            content: content,
            entryDate: entryDate,
            user: id
        })

        .then((entry) => {
            if (!entry) {
                res.status(400).send({
                    message: "Couldn't create new entry. Check your data"
                });
            } else {
                User.findByIdAndUpdate(
                        id, {
                            $push: {
                                entries: entry
                            }
                        })
                    .then((user) => {
                        console.log(user);
                        res.render('../public/views/pages/success.ejs', {
                            title: 'Success!',
                            message: 'Entry successfully created!',
                            previousPage: 'entries'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });


            }
        })

        .catch(err => {
            res.status(500).render('../public/views/pages/success.ejs', {
                title: "Something went wrong.",
                message: err.message
            });
        });
};

module.exports = createEntry;