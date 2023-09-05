const express = require('express');
const router = express.Router();
const { verifyAuthToken } = require('../util/token');

const accesocontroler = require('../controller/manageaccesorolController');

  router.post('/accrol',verifyAuthToken, accesocontroler.manage_acceso_rol);
  router.post('/cliente',verifyAuthToken, accesocontroler.manage_cliente);
  router.post('/divisa',verifyAuthToken, accesocontroler.manage_divisa);
  router.post('/empresa',verifyAuthToken, accesocontroler.manage_empresa);
  router.post('/grupo',verifyAuthToken, accesocontroler.manage_grupo_divisa);
  router.post('/identificacion',verifyAuthToken, accesocontroler.manage_identificacion);
  router.post('/menu',verifyAuthToken, accesocontroler.manage_menu);
  router.post('/nacionalidad',verifyAuthToken, accesocontroler.manage_nacionalidad);
  router.post('/ocupacion',verifyAuthToken, accesocontroler.manage_ocupacion);
  router.post('/rol',verifyAuthToken, accesocontroler.manage_rol);
  router.post('/sucursal',verifyAuthToken, accesocontroler.manage_sucursal);
  router.post('/user',verifyAuthToken, accesocontroler.manage_user);
  router.post('/regimen',verifyAuthToken,accesocontroler.manage_cat_reg);

  module.exports = router;
