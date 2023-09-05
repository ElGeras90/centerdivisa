const pais = require('../controller/PaisController');

const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');

  router.post('/pais',verifyAuthToken, pais.paises);


 module.exports = router;



