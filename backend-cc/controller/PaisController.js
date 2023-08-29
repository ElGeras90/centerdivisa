'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js'); // Importa la biblioteca CryptoJS

const pais = require('./../model/paismodel');

function paises(req, res) {
/** 
    const authResult = token.middlewareDeAutenticacion(req, res);
  
    // Si el middleware devuelve una respuesta, detén el proceso
    if (authResult) {
      return;
    }
  */
    pais.consultapais(req.body)
      .then(info => {
        res.status(200).send({ success: true, info:info.rows });
      })
      .catch(error => {
        res.status(501).send({ success: false, message: error });
  
      });
  }
 
  module.exports = {

    paises

  };