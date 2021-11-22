//jshint esversion: 6

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    date: {
        type: Date
    },
    teacher: String,
    content: String,
    entryDate: String,
    updateDate: String
});

schema.index({teacher:"text", date: "text"});

const Entry = mongoose.model('Entry', schema);

module.exports = Entry;