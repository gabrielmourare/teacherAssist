//jshint esversion: 6

const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Load User Model

const User = require('../database/models/userModel');


module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
        }, (email, password, done) => {
            //Match User
            User.findOne({
                    email: email
                })
                .then(user => {
                    if (!user) {
                        return done(null, false, {
                            path: "/home",
                            message: 'That email is not registered'
                        });
                    }

                    //Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: 'Password invalid.'
                            });
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};