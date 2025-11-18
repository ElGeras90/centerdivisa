'use strict';
const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');
const perfil = require('../controller/PerfilTransaccionalController');

router.post('/proposito', verifyAuthToken, perfil.proposito);
router.post('/frecuencia', verifyAuthToken, perfil.frecuencia);
router.post('/tipooperaciones', verifyAuthToken, perfil.tipoOperaciones);
router.post('/actuanombre', verifyAuthToken, perfil.actuaNombre);
router.post('/mediopago', verifyAuthToken, perfil.medioPago);
router.post('/origenrecursos', verifyAuthToken, perfil.origenRecursos);
router.post('/destinorecursos', verifyAuthToken, perfil.destinoRecursos);
router.post('/relaciontercero', verifyAuthToken, perfil.relacionTercero);

module.exports = router;
