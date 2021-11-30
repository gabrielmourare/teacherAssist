//jshint esversion: 6
const Entry = require('../database/models/entryModel');
const User = require('../database/models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const index = (req, res) => {
    res.render('../public/views/pages/index.ejs');
};

const findOne = (req, res) => {
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


const create_post = (req, res) => {
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
            entryDate: entryDate
        })

        .then((entry) => {
            if (!entry) {
                res.status(400).send({
                    message: "Couldn't create new entry. Check your data"
                });
            } else {
                res.render('../public/views/pages/success.ejs', {
                    title: 'Success!',
                    message: 'Entry successfully created!'
                });
            }
        })

        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

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
                    message: 'Entry successfully updated!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};







const registerUser = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    bcrypt.hash(password, saltRounds, function (error, hash) {
        if (!error) {
            User.create({
                    email: email,
                    password: hash
                })

                .then((user) => {
                    if (!user) {
                        res.status(500).send({
                            message: "Couldn't create user"
                        });
                    } else {
                        res.render('../public/views/pages/success.ejs', {
                            message: "User successfully created!"
                        });
                    }
                })

                .catch(err => {
                    res.send(err.message);
                });
        }
    });
};


const loginUser = (req, res) => {
    var email = req.body.email;
    User.findOne({
            email: email
        })

        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result === true) {
                        res.render('../public/views/pages/index.ejs');
                    } else {
                        res.render('../public/views/pages/success.ejs', {
                            title: "Failure",
                            message: "Sorry, wrong password or username. Try again"
                        });
                    }
                });
            }
        })

        .catch(err => {
            res.status(404).send(err.message);
        });
};
module.exports = {
    loginUser,
    create_post,
    findOne,
    index,
    updateEntry,
    registerUser,
    deleteEntry
};