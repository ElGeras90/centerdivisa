const {postgresPool} = require('./../util/condb');


async function consultapais() {
    const client = await postgresPool.connect();
  
    try {
      const result = await client.query('SELECT * FROM cat_pais');
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  module.exports = {
    consultapais,


  };