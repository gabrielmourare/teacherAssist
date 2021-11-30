//jshint esversion: 6

const express = require('express');

const register = (req, res) => {
    res.render('../public/views/pages/register.ejs');
};

module.exports = register;