'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js'); // Importa la biblioteca CryptoJS
const encriptarjsong = require('./../util/encriptarjson');

const pais = require('./../model/tcambio');

function tipocambio(req, res) {
  let resquest = encriptarjsong.decrypt(req.body.resultado)
    pais.divisasucursal(resquest)
      .then(info => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows }));

            res.status(200).send({resultado:data});
      })
      .catch(error => {
        res.status(501).send({ success: false, message: error });
  
      });
  }

  
function formulario(req, res) {
  let resquest = encriptarjsong.decrypt(req.body.resultado)
    pais.formulario(resquest)
      .then(info => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows }));

            res.status(200).send({resultado:data});
      })
      .catch(error => {
        res.status(501).send({ success: false, message: error });
  
      });
  }

    
function divsuc(req, res) {
  let resquest = encriptarjsong.decrypt(req.body.resultado)
  pais.divsuc(resquest)
  
    .then(info => {
      let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows }));

            res.status(200).send({resultado:data});
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}

  
function dicsucusu(req, res) {
  let resquest = encriptarjsong.decrypt(req.body.resultado)
  pais.dicsucusu(resquest)
    .then(info => {
      let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows }));

            res.status(200).send({resultado:data});
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}

function saldosdia(req, res) {
  let resquest = encriptarjsong.decrypt(req.body.resultado)
  console.log(resquest)
  pais.saldosdia(resquest)
    .then(info => {
      let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows }));

            res.status(200).send({resultado:data});
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}
function operaciones(req, res) {
  let resquest = encriptarjsong.decrypt(req.body.resultado)
  pais.operaciones(resquest)
    .then(info => {
      let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows }));

            res.status(200).send({resultado:data});
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}


function tipo(req, res) {
  let resquest = encriptarjsong.decrypt(req.body.resultado)
  pais.tipo(resquest)
    .then(info => {
      let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows }));

            res.status(200).send({resultado:data});
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}
  module.exports = {

   tipocambio,formulario,divsuc,dicsucusu,saldosdia,operaciones,tipo

  };