const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');

const configuracion = require('../controller/ConfiguracionAlertaController');

  router.post('/config-alertas',verifyAuthToken, configuracion.confi);


  module.exports = router;
   