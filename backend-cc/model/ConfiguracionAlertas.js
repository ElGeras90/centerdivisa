const { mysqlConnection, postgresClient, sqlServerPool, postgresPool } = require('./../util/condb');

async function configalertas(data) {
  const client = await postgresPool.connect();
  try {
    console.log("Datos recibidos en el modelo:", data);
    const query = 'SELECT * FROM "public"."manage_config_alertas_pld"($1)';
    const result = await client.query(query, [data]);
    console.log("Resultado de la consulta:", result.rows[0].manage_config_alertas_pld);
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


