const express = require('express');

const login = (req, res) => {
    if (req.user) {
        res.redirect('/home');
    } else {
        res.render('../public/views/pages/login.ejs');
    }

};

module.exports = login;