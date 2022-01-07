const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
    name: String,
    dateOfBirth: Date,
    email: String,
    

});

const Teacher = mongoose.model('Teacher', schema);

module.exports = Teacher