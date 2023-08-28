const {mysqlConnection,postgresClient,sqlServerPool,postgresPool} = require('./../util/condb');

async function consultacp(cp) {
    const client = await postgresPool.connect();
    try {
        const query = 'SELECT * FROM "public"."search_by_cp"($1)';
        const result = await client.query(query, [cp]);
        return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function consultacpid(cp) {
    const client = await postgresPool.connect();
    try {
        const query = 'SELECT * FROM "public"."search_by_cp_id"($1)';
        const result = await client.query(query, [cp]);
        return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  module.exports = {
    consultacp,
    consultacpid
  };
  
  
  