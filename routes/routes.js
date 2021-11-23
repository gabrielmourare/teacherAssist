//jshint esversion: 6
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

//GET ROUTES
router.get('/register', controller.register);

router.get('/login', controller.login);

router.get('/home', controller.home);

router.get('/', controller.login);

router.get('/entries', controller.findAll);

router.get('/createEntry', controller.create_get);

router.get('/editEntry/:id', controller.renderEntry);

//POST ROUTES
router.post('/register', controller.registerUser);

router.post('/', controller.loginUser);

router.post('/login', controller.loginUser);

router.post('/entries', controller.findOne);

router.post('/createEntry', controller.create_post);

router.post('/deleteEntry/:id', controller.deleteEntry);

router.post('/editEntry/:id', controller.updateEntry);

module.exports = router;