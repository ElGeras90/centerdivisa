const {mysqlConnection,postgresClient,sqlServerPool,postgresPool} = require('./../util/condb');

async function consultarUsuarios() {
    console.log('Obteniendo conexión de la pool...');
    const client = await postgresPool.connect();
  
    try {
      console.log('Ejecutando consulta...');
      const result = await client.query('SELECT * FROM usuarios');
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
      console.log('Conexión liberada y consulta cerrada.');
    }
  }

  async function consultarUsuarios1(login, password) {
    console.log('Obteniendo conexión de la pool...');
    const client = await postgresPool.connect();
  
    try {
      console.log('Ejecutando consulta...');
      const query = 'SELECT * FROM "public"."login_user"($1)';
      const values = [[login, password]];
      const result = await client.query(query, values);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
      console.log('Conexión liberada y consulta cerrada.');
    }
  }

  async function consultadatos_cliente(usuario, inversion) {
    console.log('Obteniendo conexión de la pool...');
    const client = await postgresPool.connect();
  
    try {
      console.log('Ejecutando consulta...');
      const query = 'SELECT * FROM "public"."rqr"($1)';
      const values = [[usuario, inversion]];
      const result = await client.query(query, values);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
      console.log('Conexión liberada y consulta cerrada.');
    }
  }
  
  module.exports = {
    consultarUsuarios,
    consultarUsuarios1,
    consultadatos_cliente
  };
  
  
  
  
  
  
  