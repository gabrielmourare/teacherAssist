//jshint esversion:6

const mongoose = require('mongoose');
const dotenv = require('dotenv').config({
    path: 'CONFIG.ENV'
});

const connectDB = async () => {

    try {
        const con = await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected: " + con.connection.host);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const mongoURI = process.env.MONGOURI;

module.exports = {
    connectDB,
    mongoURI
};