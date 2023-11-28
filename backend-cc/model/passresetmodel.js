

const {postgresPool} = require('./../util/condb');


async function resetpass(usuario,correo) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'select * from usuarios where usuario = $1 and (correo = $2 or telefono =$2)';
      const result = await client.query(query, [usuario,correo]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  module.exports = {
    resetpass,

  }; 