const paracetamol = require('../controller/resetpass');

const express = require('express');
const router = express.Router();


router.post('/reset-password-request', paracetamol.resetpass);

 module.exports = router;

