const pais = require('../controller/PaisController');

module.exports = function(server) {
  server.post('/api/pais', pais.paises);
 
};

