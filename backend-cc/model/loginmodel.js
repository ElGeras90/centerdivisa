const {mysqlConnection,postgresClient,sqlServerPool,postgresPool} = require('./../util/condb');

  async function login(dat) {
    const client = await postgresPool.connect();
    console.log(dat)
    try {
      const query = 'SELECT * FROM "public"."login_usuario"($1)';
      const values = [dat];
      const result = await client.query(query, values);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  
  module.exports = {
    login,
  };
  
  
  
  
  
  
  