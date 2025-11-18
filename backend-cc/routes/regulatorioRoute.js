const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');
const {
   generarMontos,
  generarDolares,
  generarReporte24h,
  generarReporteInusuales,
  generarReporteRelevantes
} =  require('../controller/RegulatoriosController');

router.post('/montos', generarMontos);
router.post('/dolares', generarDolares);
router.post('/reporte24h', generarReporte24h);
router.post('/inusuales', generarReporteInusuales);
router.post('/relevantes', generarReporteRelevantes);
module.exports = router;
