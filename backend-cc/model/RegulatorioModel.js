const { mysqlConnection, postgresClient, sqlServerPool, postgresPool } = require('./../util/condb');

async function mt(dat) {
  const client = await postgresPool.connect();
  try {
    console.log(dat)
    const query = 'SELECT * FROM "public"."rep_reg_monto_totales"($1)';
    const values = [dat];
    const result = await client.query(query, values);
    return result;
  } catch (error) {
    console.log(error)
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  mt,
};






