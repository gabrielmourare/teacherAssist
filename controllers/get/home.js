//jshint esversion: 6
const express = require('express');

const home = (req, res) => {
    res.render('../public/views/pages/index.ejs');
};

module.exports = home;

