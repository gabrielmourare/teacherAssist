//jshint esversion: 6
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

//GET ROUTES
router.get('/', controller.index);

router.get('/entries', controller.findAll);

router.get('/createEntry', controller.create_get);

router.get('/editEntry/:id', controller.renderEntry);

//POST ROUTES
router.post('/entries', controller.findOne);

router.post('/createEntry', controller.create_post);

router.post('/deleteEntry/:id', controller.deleteEntry);

router.post('/editEntry/:id', controller.updateEntry);

module.exports = router;