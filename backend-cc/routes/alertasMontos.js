const express = require('express');
const router = express.Router();
const alertasMontosController = require('../controller/alertasMontosController');

// Consultar por tipo (Relevante/Fraccionada/Inusual/Interna)
router.post('/consultar', alertasMontosController.consultarPorTipo);

// Actualizar alerta
router.post('/actualizar', alertasMontosController.actualizar);

module.exports = router;
