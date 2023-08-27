'use strict';

const loginRoutes = require('./loginRoute');
const acceso_rol = require('./accesorolRoute')

module.exports = function(server) {
  // Rutas de login
  loginRoutes(server);
  acceso_rol(server);
  
  // Ruta de inicio
  server.get('/api', (req, res, next) => {
    res.status(200).send({ success: true, message: 'API ONLINE', date: new Date() });
    next();
  });
};