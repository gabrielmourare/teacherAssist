//jshint esversion: 6
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const findAllEntries = require('../controllers/get/entries');
const renderRegister = require('../controllers/get/register');
const renderLogin = require('../controllers/get/login');
const renderHome = require('../controllers/get/home');
const renderCreateEntry  = require('../controllers/get/createEntry');
const renderEditEntry = require('../controllers/get/editEntry');

//GET ROUTES
router.get('/register', renderRegister);

router.get('/login', renderLogin);

router.get('/home', renderHome);

router.get('/', renderLogin);

router.get('/entries', findAllEntries);

router.get('/createEntry', renderCreateEntry);

router.get('/editEntry/:id', renderEditEntry);

//POST ROUTES
router.post('/register', controller.registerUser);

router.post('/', controller.loginUser);

router.post('/login', controller.loginUser);

router.post('/entries', controller.findOne);

router.post('/createEntry', controller.create_post);

router.post('/deleteEntry/:id', controller.deleteEntry);

router.post('/editEntry/:id', controller.updateEntry);

module.exports = router;