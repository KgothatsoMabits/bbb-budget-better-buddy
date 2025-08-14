const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller')


/* GET users listing. */
router.get('/:email', controller.getUserByEmail);
router.post('/login',controller.authenticateUser);
router.post('/register',controller.createUser);



module.exports = router;
