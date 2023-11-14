const encargado = require('../controller/encargadosController');

const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');

  router.post('/encargado',verifyAuthToken, encargado.manage_encargados);
  router.post('/permiso',verifyAuthToken, encargado.manage_encargado);
  router.post('/divisa',verifyAuthToken, encargado.consultadivisa);


 module.exports = router;



