const xl3 = require('../controller/matrizcontroller');

const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');

// productos ,paisorigen,montomes,instrumento,frecuenciames,tipousuario,ocupacion,estados,paises

router.post('/productos',verifyAuthToken, xl3.productos);
router.post('/paisorigen',verifyAuthToken, xl3.paisorigen);
router.post('/montomes',verifyAuthToken, xl3.montomes);
router.post('/instrumento', verifyAuthToken,xl3.instrumento);
router.post('/frecuenciames',verifyAuthToken, xl3.frecuenciames);
router.post('/tipousuario',verifyAuthToken, xl3.tipousuario);
router.post('/ocupacion', xl3.ocupacion);
router.post('/estados',verifyAuthToken, xl3.estados);
router.post('/paises',verifyAuthToken, xl3.paises);

 module.exports = router;

