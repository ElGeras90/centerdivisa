// database.js
const { Client } = require('pg');
const mssql = require('mssql');
const mysql = require('mysql');
const config = require('./configdb');
const { Pool } = require('pg');

const postgresConfig = config.postgres;
const sqlServerConfig = config.sqlServer;
const mysqlConfig = config.mysql;

// Conexión a PostgreSQL
const postgresClient = new Client({
  user: postgresConfig.user,
  host: postgresConfig.host,
  database: postgresConfig.database,
  password: postgresConfig.password,
  port: postgresConfig.port
});

// Conexión a SQL Server
const sqlServerPool = new mssql.ConnectionPool({
  user: sqlServerConfig.user,
  password: sqlServerConfig.password,
  server: sqlServerConfig.server,
  database: sqlServerConfig.database,
  options: {
    encrypt: true // Opciones específicas de SQL Server
  }
});

// Conexión a MySQL
const mysqlConnection = mysql.createConnection({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database
});

const postgresPool = new Pool({
    user: postgresConfig.user,
    host: postgresConfig.host,
    database: postgresConfig.database,
    password: postgresConfig.password,
    port: postgresConfig.port
  });

module.exports = {
  postgresClient,
  sqlServerPool,
  mysqlConnection,
  postgresPool
};
