//jshint esversion: 6

//App dependencies
require('dotenv').config();
const express = require('express');
const dbConnect = require('./database/config');
const app = express();
const PORT = process.env.PORT;
const router = require('./routes/routes');
const path = require('path');

//App Config

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use('/', router);

//Server connection
app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});