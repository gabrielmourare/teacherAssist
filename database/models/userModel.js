//jshint esversion: 6
const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    dateOfBirth: Date,
    bio: String,
    subjects: [],
    entries: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entry'
    }

});


const User = mongoose.model('User', schema);

module.exports = User;