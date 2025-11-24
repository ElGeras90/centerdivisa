const { mysqlConnection, postgresClient, sqlServerPool, postgresPool } = require('./../util/condb');

async function configalertas(data) {
  const client = await postgresPool.connect();
  try {
    const query = 'SELECT * FROM "public"."manage_config_alertas_pld"($1)';
    const result = await client.query(query, [data]);
    return result;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
configalertas
};


