const {postgresPool} = require('./../util/condb');


async function consultapais() {
    const client = await postgresPool.connect();
  
    try {
      const result = await client.query('SELECT * FROM cat_paises');
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function consultaestado() {
    const client = await postgresPool.connect();
  
    try {
      const result = await client.query('SELECT * FROM cat_estados_paises');
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  
  async function ConsultaOcupaciones() {
    const client = await postgresPool.connect();
  
    try {
      const result = await client.query('SELECT * FROM cat_ocupaciones');
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function nacionalidad() {
    const client = await postgresPool.connect();
  
    try {
      const result = await client.query('SELECT * FROM cat_nacionalidad');
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  module.exports = {
    consultapais,
    consultaestado,
    ConsultaOcupaciones,
    nacionalidad

  };