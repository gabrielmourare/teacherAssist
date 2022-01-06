//jshint esversion: 6

//App dependencies
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const dbConnect = require('./database/config');
const app = express();
const PORT = process.env.PORT;
const router = require('./routes/routes');
const path = require('path');
const MongoStore = require('connect-mongo');
const connectDB = require('./database/config').connectDB;
const passport = require('passport');
const flash = require('connect-flash');

//Passport Config
require('./config/passport')(passport);

connectDB();
//Session Config - this is part of connect-mongo(a middleware to store sessions, there are many).
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//App Config

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
    extended: true
}));

app.use('/', router);

//Server connection
app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});