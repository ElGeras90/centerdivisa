

const {postgresPool} = require('./../util/condb');


async function divisabancomexico() {
    const client = await postgresPool.connect();
  
    try {
      const result = await client.query('select * from tipo_cambio where fecha = (SELECT MAX(fecha) FROM tipo_cambio)');
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function divisasucursal(sucursal) {
    const client = await postgresPool.connect();
    try {
      const result = await client.query('select * from divisas_sucursal($1)',[sucursal]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function formulario(monto) {
    const client = await postgresPool.connect();
    try {
      const result = await client.query('select * from valida_formulario($1)',[monto]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async function divsuc(monto) {
    const client = await postgresPool.connect();
    try {
      const result = await client.query('select * from manage_saldo_dvisas($1)',[monto]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
//Consulta todos los datos los saldos de las divisas por tipo de usuario
  async function dicsucusu(monto) {
    const client = await postgresPool.connect();
    try {
      const result = await client.query('select * from divisas_suc_usuario($1)',[monto]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  //checa cuanto hay en caja en dolares
  async function saldosdia(monto) {
    const client = await postgresPool.connect();
    try {
      const result = await client.query('select * from saldosdia($1)',[monto]);
      return result;
    } catch (error) {
      console.log(error)
      throw error;
    } finally {
      client.release();
    }
  }

    //Crea el movimiento que se esta realizando en compra y venta de divisas para registra movimiento y alterar boveda con lo que entro y salio
    async function operaciones(monto) {
      const client = await postgresPool.connect();
      try {
        const result = await client.query('select * from manage_operaciones($1)',[monto]);
        return result;
      } catch (error) {
        throw error;
      } finally {
        client.release();
      }
    }

    async function tipo(data) {
      const client = await postgresPool.connect();
      try {
        const result = await client.query('select * from manage_tipo($1)',[data]);
        return result;
      } catch (error) {
        throw error;
      } finally {
        client.release();
      }
    }

  module.exports = {
    divisabancomexico,
    divisasucursal,
    formulario,
    divsuc,
    dicsucusu,
    saldosdia,
    operaciones,tipo
  }; 