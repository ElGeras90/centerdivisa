const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');

const accesocontroler = require('../controller/tcambiocontroller');

  router.post('/sucursal',verifyAuthToken, accesocontroler.tipocambio);
  router.post('/formulario',verifyAuthToken, accesocontroler.formulario);
  router.post('/infodivisa',verifyAuthToken, accesocontroler.dicsucusu);
  router.post('/infod',verifyAuthToken, accesocontroler.divsuc);
  router.post('/saldoactual',verifyAuthToken, accesocontroler.saldosdia);
  router.post('/operacion',verifyAuthToken, accesocontroler.operaciones);

  module.exports = router;
   