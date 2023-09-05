const loginController = require('../controller/LoginController');
const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');


router.post('/login', loginController.login);

module.exports = router;
