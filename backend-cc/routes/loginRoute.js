const loginController = require('../controller/LoginController');

module.exports = function(server) {
  server.post('/api/login', loginController.login);
};

