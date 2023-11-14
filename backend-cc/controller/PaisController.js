'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js'); // Importa la biblioteca CryptoJS

const pais = require('./../model/paismodel');

function paises(req, res) {

    pais.consultapais()
      .then(info => {
        res.status(200).send({ success: true, info:info.rows });
      })
      .catch(error => {
        res.status(501).send({ success: false, message: error });
  
      });
  }
  function estados(req, res) {

    pais.consultaestado()
      .then(info => {
        res.status(200).send({ success: true, info:info.rows });
      })
      .catch(error => {
        res.status(501).send({ success: false, message: error });
  
      });
  }
  function ocupaciones(req, res) {

    pais.ConsultaOcupaciones()
      .then(info => {
        res.status(200).send({ success: true, info:info.rows });
      })
      .catch(error => {
        res.status(501).send({ success: false, message: error });
  
      });
  }
  function nacionalidad(req, res) {

    pais.nacionalidad()
      .then(info => {
        res.status(200).send({ success: true, info:info.rows });
      })
      .catch(error => {
        res.status(501).send({ success: false, message: error });
  
      });
  }
 
  module.exports = {

    paises,
    nacionalidad,
    estados,
    ocupaciones

  };