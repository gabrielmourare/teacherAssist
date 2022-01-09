const express = require('express');

const login = (req, res) => {
    res.render('../public/views/pages/login.ejs');
};

module.exports = login;