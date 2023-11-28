'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js'); // Importa la biblioteca CryptoJS

const pais = require('./../model/paismodel');
const encriptarjsong = require('./../util/encriptarjson');

function paises(req, res) {

    pais.consultapais()
      .then(info => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows }));

            res.status(200).send({resultado:data});
      })
      .catch(error => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;
  
      });
  }
  function estados(req, res) {

    pais.consultaestado()
      .then(info => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows }));

            res.status(200).send({resultado:data});
      })
      .catch(error => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;
  
      });
  }
  function ocupaciones(req, res) {

    pais.ConsultaOcupaciones()
      .then(info => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows }));

            res.status(200).send({resultado:data});
      })
      .catch(error => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;
  
      });
  }
  function nacionalidad(req, res) {

    pais.nacionalidad()
      .then(info => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows }));

            res.status(200).send({resultado:data});
      })
      .catch(error => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;
  
      });
  }
 
  module.exports = {

    paises,
    nacionalidad,
    estados,
    ocupaciones

  };