//jshint esversion: 6
const express = require('express');
const router = express.Router();
const Entry = require('../database/models/entryModel');

//GET ROUTES
router.get('/', (req, res) => {
    res.render('../public/views/pages/index.ejs');
});

router.get('/entries', (req, res) => {
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
});

router.get('/createEntry', (req, res) => {
    res.render('../public/views/pages/createEntry.ejs');
});

router.get('/editEntry/:id', (req, res) => {
    var id = req.params.id;

    Entry.findById({
            _id: id
        })
        .then((entry) => {
            if (!entry) {
                res.status(404).send({
                    message: "Couldn't save updates. Please try again."
                });
            } else {

                res.render('../public/views/pages/editEntry.ejs', {
                    id: entry._id,
                    date: entry.date,
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
});

//POST ROUTES

router.post('/createEntry', (req, res) => {
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
                    message: 'Entry successfully created!'
                });
            }
        })

        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
});

router.post('/deleteEntry/:id', (req, res) => {

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
                    message: 'Entry successfully deleted!'
                });
            }
        })

        .catch(err => {
            res.status(500).send({
                message: "Couldn't delete entry. Maybe you don't have permission."
            });
        });
});

router.post('/editEntry/:id', (req, res) => {
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
                    message: 'Entry successfully updated!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
});

router.post('/entries', (req, res) => {
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

});

module.exports = router;