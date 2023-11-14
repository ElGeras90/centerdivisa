const pais = require('../controller/PaisController');

const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');

  router.post('/pais',verifyAuthToken, pais.paises);
  router.post('/estado',verifyAuthToken, pais.estados);
  router.post('/ocupacion',verifyAuthToken, pais.ocupaciones);
  router.post('/nacionalidad',verifyAuthToken, pais.nacionalidad);



 module.exports = router;



