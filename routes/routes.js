//jshint esversion: 6

//GENERAL DEPENDENCIES
const express = require('express');
const router = express.Router();
const passport = require('passport');

//GET DEPENDENCIES
const findAllEntries = require('../controllers/get/entries');
const renderRegister = require('../controllers/get/register');
const renderLogin = require('../controllers/get/login');
const renderHome = require('../controllers/get/home');
const renderCreateEntry = require('../controllers/get/createEntry');
const renderEditEntry = require('../controllers/get/editEntry');

//POST DEPENDENCIES
const searchEntry = require('../controllers/post/searchEntry');
const createEntry = require('../controllers/post/createEntry');
const deleteEntry = require('../controllers/post/deleteEntry');
const updateEntry = require('../controllers/post/updateEntry');

//REGISTER AND LOGIN AND LOGOUT DEPENDENCIES
const register = require('../controllers/post/register');
const login = require('../controllers/post/login');
const logout = require('../controllers/post/logout');
const checkUserLoggedIn = require('../controllers/checkUserLoggedIn');
const checkData = require('../controllers/checkData');
const checkPassword = require('../controllers/checkPasswordRegister');

//GET ROUTES
router.get('/register', renderRegister);

router.get('/login', renderLogin);

router.get('/home', checkUserLoggedIn, renderHome);

router.get('/', renderLogin);

router.get('/entries', checkUserLoggedIn, findAllEntries);

router.get('/createEntry', checkUserLoggedIn, renderCreateEntry);

router.get('/editEntry/:id', checkUserLoggedIn, renderEditEntry);

//POST ROUTES
router.post('/register', checkPassword, register);

router.post('/',passport.authenticate('local'), login);

router.post('/login', passport.authenticate('local'), login);

router.post('/entries', checkUserLoggedIn, searchEntry);

router.post('/createEntry', checkUserLoggedIn, checkData, createEntry);

router.post('/deleteEntry/:id', checkUserLoggedIn, deleteEntry);

router.post('/editEntry/:id', checkUserLoggedIn, checkData, updateEntry);

router.post('/logout', logout);

module.exports = router;