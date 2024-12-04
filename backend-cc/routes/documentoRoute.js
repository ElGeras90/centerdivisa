const rr = require('../controller/CreaDocument');
const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');


router.post('/cortecajadoc', rr.cortecaja);
router.post('/cortecaja', rr.cortecajavista);
router.post('/vistalista', rr.cortemovimiento);
router.post('/vistalistadoc', rr.cortemov);

module.exports = router;
