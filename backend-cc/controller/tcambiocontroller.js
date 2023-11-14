'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js'); // Importa la biblioteca CryptoJS

const pais = require('./../model/tcambio');

function tipocambio(req, res) {

    pais.divisasucursal(req.body)
      .then(info => {
        res.status(200).send({ success: true, info:info.rows });
      })
      .catch(error => {
        res.status(501).send({ success: false, message: error });
  
      });
  }

  
function formulario(req, res) {

    pais.formulario(req.body)
      .then(info => {
        res.status(200).send({ success: true, info:info.rows });
      })
      .catch(error => {
        res.status(501).send({ success: false, message: error });
  
      });
  }

    
function divsuc(req, res) {

  pais.divsuc(req.body)
    .then(info => {
      res.status(200).send({ success: true, info:info.rows });
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}

  
function dicsucusu(req, res) {

  pais.dicsucusu(req.body)
    .then(info => {
      res.status(200).send({ success: true, info:info.rows });
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}

function saldosdia(req, res) {

  pais.saldosdia(req.body)
    .then(info => {
      res.status(200).send({ success: true, info:info.rows });
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}
function operaciones(req, res) {

  pais.operaciones(req.body)
    .then(info => {
      res.status(200).send({ success: true, info:info.rows });
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}

  module.exports = {

   tipocambio,formulario,divsuc,dicsucusu,saldosdia,operaciones

  };