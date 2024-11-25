const rc = require('../controller/ContaController');
const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');


router.post('/saldos', verifyAuthToken, rc.saldos);
router.post('/cvd', rc.reporteventacompra);

module.exports = router;
