const cp = require('../controller/CpController');

module.exports = function(server) {
  server.post('/api/cp',cp.codigopostal);
  server.post('/api/cp/id',cp.codigopostalid)
};
