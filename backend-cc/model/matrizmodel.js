

const {postgresPool} = require('./../util/condb');

    async function productos(data) {
      const client = await postgresPool.connect();
      try {
        const result = await client.query('select * from manage_producto($1)',[data]);
        return result;
      } catch (error) {
        throw error;
      } finally {
        client.release();
      }
    }


    async function paisorigen(data) {
      const client = await postgresPool.connect();
      try {
        const result = await client.query('select * from manage_pais_origen($1)',[data]);
        return result;
      } catch (error) {
        throw error;
      } finally {
        client.release();
      }
    }
    async function montomes(data) {
        const client = await postgresPool.connect();
        try {
          const result = await client.query('select * from manage_montos_mes($1)',[data]);
          return result;
        } catch (error) {
          throw error;
        } finally {
          client.release();
        }
      }
      async function instrumento(data) {
        const client = await postgresPool.connect();
        try {
          const result = await client.query('select * from manage_instrumentos($1)',[data]);
          return result;
        } catch (error) {
          throw error;
        } finally {
          client.release();
        }
      }
      async function frecuenciames(data) {
        const client = await postgresPool.connect();
        try {
          const result = await client.query('select * from manage_frecuencia_mes($1)',[data]);
          return result;
        } catch (error) {
          throw error;
        } finally {
          client.release();
        }
      }
      async function tipousuario(data) {
        const client = await postgresPool.connect();
        try {
          const result = await client.query('select * from manage_cat_tuser($1)',[data]);
          return result;
        } catch (error) {
          throw error;
        } finally {
          client.release();
        }
      }
      async function paises(data) {
        const client = await postgresPool.connect();
        try {
          const result = await client.query('select * from manage_cat_paises($1)',[data]);
          return result;
        } catch (error) {
          throw error;
        } finally {
          client.release();
        }
      }
      async function estados(data) {
        const client = await postgresPool.connect();
        try {
          const result = await client.query('select * from manage_cat_estados($1)',[data]);
          return result;
        } catch (error) {
          throw error;
        } finally {
          client.release();
        }
      }
      async function ocupacion(data) {
        const client = await postgresPool.connect();
        try {
          const result = await client.query('select * from manage_cat_ocupaciones($1)',[data]);
          return result;
        } catch (error) {
          throw error;
        } finally {
          client.release();
        }
      }
  module.exports = {

    productos ,paisorigen,montomes,instrumento,frecuenciames,tipousuario,ocupacion,estados,paises
  }; 