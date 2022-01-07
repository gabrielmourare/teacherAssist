//jshint esversion: 6

const {
    text
} = require('express');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    teacher: String,
    content: String,
    entryDate: String,
    updateDate: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

schema.index({
    teacher: "text",
    date: "text",
});

const Entry = mongoose.model('Entry', schema);

module.exports = Entry;