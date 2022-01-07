//jshint esversion: 6

const User = require('../../database/models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const saltRounds = 10;

const registerUser = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
            email: email
        })

        .then((foundUser) => {
            if (!foundUser) {
                bcrypt.hash(password, saltRounds, function (error, hash) {
                    if (!error) {

                        User.create({
                                email: email,
                                password: hash
                            })

                            .then((user) => {
                                if (!user) {
                                    res.status(500).send({
                                        message: "Couldn't create user."
                                    });
                                } else {
                                    res.render('../public/views/pages/success.ejs', {
                                        title: "Success!",
                                        message: "User successfully created!",
                                        previousPage: "login"
                                    });
                                }
                            })

                            .catch(err => {
                                res.send(err.message);
                            });
                    }
                });

            } else {
                res.render('../public/views/pages/success.ejs', {
                    title: "FAILURE",
                    message: "User already exists.",
                    previousPage: "register"
                });
            }
        })


        .catch(err => {
            res.send(err);
        });
};



module.exports = registerUser;