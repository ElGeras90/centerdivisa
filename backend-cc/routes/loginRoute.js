const loginController = require('../controller/LoginController');

module.exports = function(server) {
  server.post('/api/login', loginController.login);
  server.get('/api/cate', loginController.categorias);
  server.get('/api/x', loginController.loginx);
  server.get('/api/datos',loginController.infocliente)
};

