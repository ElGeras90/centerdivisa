const { mysqlConnection, postgresClient, sqlServerPool, postgresPool } = require('./../util/condb');

async function saldos(cp) {
  const client = await postgresPool.connect();
  try {
    const query = 'SELECT * FROM "public"."rep_contabilidad"($1)';
    const result = await client.query(query, [cp]);
    return result;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function reportemovdias(datos) {
  const cliente = await postgresPool.connect();
  try {
    const query = 'select * from reporte_cpd($1)';
    const result = await cliente.query(query, [datos]);
    return result;
  } catch (error) {
    throw error;
  } finally {
    cliente.release();
  }


}
module.exports = {
  saldos, reportemovdias
};


