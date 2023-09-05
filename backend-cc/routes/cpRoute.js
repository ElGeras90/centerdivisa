const cp = require('../controller/CpController');
const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');

  router.post('/cp',verifyAuthToken,cp.codigopostal);
  router.post('/cp/id',verifyAuthToken,cp.codigopostalid)
  module.exports = router;
