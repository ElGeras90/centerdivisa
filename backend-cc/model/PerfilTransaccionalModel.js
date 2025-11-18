'use strict';
const { postgresPool } = require('./../util/condb');

// ===========================================================
// 🔹 PROPOSITO DE RELACIÓN
// ===========================================================
async function manageProposito(data) {
  const client = await postgresPool.connect();
  try {
    const query = 'SELECT * FROM manage_proposito_relacion($1)';
    const values = [data];
    return await client.query(query, values);
  } catch (error) {
    throw error

  } finally {
    client.release();
  }
}

// ===========================================================
// 🔹 FRECUENCIA DE OPERACIONES
// ===========================================================
async function manageFrecuencia(data) {
  const client = await postgresPool.connect();
  try {
    const query = 'SELECT * FROM manage_frecuencia_operaciones($1)';
    const values = [data];
    return await client.query(query, values);
  } catch (error) {
    throw error
  } finally {
    client.release();
  }
}

// ===========================================================
// 🔹 TIPO DE OPERACIONES
// ===========================================================
async function manageTipoOperaciones(data) {
  const client = await postgresPool.connect();
  try {
    const query = 'SELECT * FROM manage_tipo_operaciones($1)';
    const values = [data];
    return await client.query(query, values);
  } catch (error) {
    throw error
  } finally {
    client.release();
  }
}

// ===========================================================
// 🔹 ACTÚA EN NOMBRE
// ===========================================================
async function manageActuaNombre(data) {
  const client = await postgresPool.connect();
  try {
    const query = 'SELECT * FROM manage_actua_en_nombre($1)';
    const values = [data];
    return await client.query(query, values);
  } catch (error) {
    throw error
  } finally {
    client.release();
  }
}

// ===========================================================
// 🔹 MEDIO DE PAGO
// ===========================================================
async function manageMedioPago(data) {
  const client = await postgresPool.connect();
  try {
    const query = 'SELECT * FROM manage_medio_pago($1)';
    const values = [data];
    return await client.query(query, values);
  } catch (error) {
    throw error
  } finally {
    client.release();
  }
}

// ===========================================================
// 🔹 ORIGEN DE RECURSOS
// ===========================================================
async function manageOrigenRecursos(data) {
  const client = await postgresPool.connect();
  try {
    const query = 'SELECT * FROM manage_origen_recursos($1)';
    const values = [data];
    return await client.query(query, values);
  } catch (error) {
    throw error
  } finally {
    client.release();
  }
}

// ===========================================================
// 🔹 DESTINO DE RECURSOS
// ===========================================================
async function manageDestinoRecursos(data) {
  const client = await postgresPool.connect();
  try {
    const query = 'SELECT * FROM manage_destino_recursos($1)';
    const values = [data];
    return await client.query(query, values);
  } catch (error) {
    throw error
  } finally {
    client.release();
  }
}

// ===========================================================
// 🔹 RELACIÓN CON TERCERO
// ===========================================================
async function manageRelacionTercero(data) {
  const client = await postgresPool.connect();
  try {
    const query = 'SELECT * FROM manage_relacion_tercero($1)';
    const values = [data];
    return await client.query(query, values);
  } catch (error) {
    throw error
  } finally {
    client.release();
  }
}


// ===========================================================
// 📤 EXPORTAR FUNCIONES
// ===========================================================
module.exports = {
  manageProposito,
  manageFrecuencia,
  manageTipoOperaciones,
  manageActuaNombre,
  manageMedioPago,
  manageOrigenRecursos,
  manageDestinoRecursos,
  manageRelacionTercero,
};
