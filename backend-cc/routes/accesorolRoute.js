const accesocontroler = require('../controller/manageaccesorolController');

module.exports = function(server) {
  server.post('/api/accrol', accesocontroler.manage_acceso_rol);
  server.post('/api/cliente', accesocontroler.manage_cliente);
  server.post('/api/divisa', accesocontroler.manage_divisa);
  server.post('/api/empresa', accesocontroler.manage_empresa);
  server.post('/api/grupo', accesocontroler.manage_grupo_divisa);
  server.post('/api/identificacion', accesocontroler.manage_identificacion);
  server.post('/api/menu', accesocontroler.manage_menu);
  server.post('/api/nacionalidad', accesocontroler.manage_nacionalidad);
  server.post('/api/ocupacion', accesocontroler.manage_ocupacion);
  server.post('/api/rol', accesocontroler.manage_rol);
  server.post('/api/sucursal', accesocontroler.manage_sucursal);
  server.post('/api/user', accesocontroler.manage_user);
  server.post('/api/regimen',accesocontroler.manage_cat_reg);
};

