const {postgresPool} = require('./../util/condb');



  async function manage_acceso_rol(manage_acceso_rol) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_acceso_rol"($1)';
      const result = await client.query(query, [manage_acceso_rol]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function manage_cliente(manage_cliente) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_cliente"($1)';
      const result = await client.query(query, [manage_cliente]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function manage_divisa(manage_divisa) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_divisa"($1)';
      const result = await client.query(query, [manage_divisa]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function manage_empresa(manage_empresa) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_empresa"($1)';
      const result = await client.query(query, [manage_empresa]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }


  async function manage_grupo_divisa(manage_grupo_divisa) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_grupo_divisa"($1)';
      const result = await client.query(query, [manage_grupo_divisa]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function manage_identificacion(manage_identificacion) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_identificacion"($1)';
      const result = await client.query(query, [manage_identificacion]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async function manage_menu(manage_menu) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_menu"($1)';
      const result = await client.query(query, [manage_menu]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async function manage_nacionalidad(manage_nacionalidad) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_nacionalidad"($1)';
      const result = await client.query(query, [manage_nacionalidad]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async function manage_ocupacion(manage_ocupacion) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_ocupacion"($1)';
      const result = await client.query(query, [manage_ocupacion]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async function manage_rol(manage_rol) {
    const client = await postgresPool.connect();
    
    try {
      const query = 'SELECT * FROM "public"."manage_rol"($1)';
      const result = await client.query(query, [manage_rol]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async function manage_sucursal(manage_sucursal) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_sucursal"($1)';
      const result = await client.query(query, [manage_sucursal]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async function manage_user(manage_user) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_user"($1)';
      const result = await client.query(query, [manage_user]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function manage_cat_reg(manage_cat_reg) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_cat_reg"($1)';
      const result = await client.query(query, [manage_cat_reg]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function manage_cliente_empresa(manage_cliente_empresa) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."manage_cliente_empresa"($1)';
      const result = await client.query(query, [manage_cliente_empresa]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function dll(info) {
    const client = await postgresPool.connect();
  
    try {
      const query = 'SELECT * FROM "public"."valida_saldo_dia"($1)';
      const result = await client.query(query, [info]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  module.exports = {
    manage_acceso_rol,
    manage_cliente,
    manage_divisa,
    manage_empresa,
    manage_identificacion,
    manage_grupo_divisa,
    manage_menu,
    manage_nacionalidad,
    manage_ocupacion,
    manage_rol,
    manage_sucursal,
    manage_user,
    manage_cat_reg,
    manage_cliente_empresa,
    dll

  };
  
  
  
  
  
  
  