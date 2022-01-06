//jshint esversion: 6
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
});


const User = mongoose.model('User', schema);

module.exports = User;