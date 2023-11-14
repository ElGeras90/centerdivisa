const {postgresPool} = require('./../util/condb');



  async function consultapermisos(id) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'select a.sucursalid,a.nombre_sucursal,a.fecharegistro, (SELECT EXISTS (SELECT * FROM encargadosucursal   WHERE  encargado ='+id+'  and sucursalid=a.sucursalid  ))as datos,(SELECT idenc FROM encargadosucursal   WHERE  encargado ='+id+' and sucursalid=a.sucursalid  )as idencargado  FROM sucursales as a';
      const result = await client.query(query);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async function encargados_sp(d) {
    const client = await postgresPool.connect();
    try {
        const query = 'SELECT * FROM "public"."manage_encargados"($1)';
        const result = await client.query(query, [d]);
        return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function consultadivisa(id) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'select * from divisas_dia($1)';
      const result = await client.query(query,[id]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  module.exports = {
    consultapermisos,encargados_sp,consultadivisa
  };
  