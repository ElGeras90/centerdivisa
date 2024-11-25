const rc = require('../controller/RegulatoriosController');
const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');


router.post('/mt',verifyAuthToken, rc.mt);

module.exports = router;
