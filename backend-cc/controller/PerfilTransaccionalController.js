'use strict';
const encriptarjsong = require('./../util/encriptarjson');
const cat = require('./../model/PerfilTransaccionalModel');

function proposito(req, res) {
  console.log(req.body.resultado)
  let request = encriptarjsong.decrypt(req.body.resultado);


  cat.manageProposito(request)
    .then(info => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));
      res.status(200).send({ resultado: respuesta });
    })
    .catch(error => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
      console.log(error)
      res.status(501).send({ resultado: respuesta });
    });
}

function frecuencia(req, res) {
  let request = encriptarjsong.decrypt(req.body.resultado);


  cat.manageFrecuencia(request)
    .then(info => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));
      res.status(200).send({ resultado: respuesta });
    })
    .catch(error => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
      res.status(501).send({ resultado: respuesta });
    });
}

function tipoOperaciones(req, res) {
  let request = encriptarjsong.decrypt(req.body.resultado);


  cat.manageTipoOperaciones(request)
    .then(info => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));
      res.status(200).send({ resultado: respuesta });
    })
    .catch(error => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
      res.status(501).send({ resultado: respuesta });
    });
}

function actuaNombre(req, res) {
  let request = encriptarjsong.decrypt(req.body.resultado);


  cat.manageActuaNombre(request)
    .then(info => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));
      res.status(200).send({ resultado: respuesta });
    })
    .catch(error => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
      res.status(501).send({ resultado: respuesta });
    });
}

function medioPago(req, res) {
  let request = encriptarjsong.decrypt(req.body.resultado);


  cat.manageMedioPago(request)
    .then(info => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));
      res.status(200).send({ resultado: respuesta });
    })
    .catch(error => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
      res.status(501).send({ resultado: respuesta });
    });
}

function origenRecursos(req, res) {
  let request = encriptarjsong.decrypt(req.body.resultado);


  cat.manageOrigenRecursos(request)
    .then(info => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));
      res.status(200).send({ resultado: respuesta });
    })
    .catch(error => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
      res.status(501).send({ resultado: respuesta });
    });
}

function destinoRecursos(req, res) {
  let request = encriptarjsong.decrypt(req.body.resultado);


  cat.manageDestinoRecursos(request)
    .then(info => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));
      res.status(200).send({ resultado: respuesta });
    })
    .catch(error => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
      res.status(501).send({ resultado: respuesta });
    });
}

function relacionTercero(req, res) {
  let request = encriptarjsong.decrypt(req.body.resultado);


  cat.manageRelacionTercero(request)
    .then(info => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));
      res.status(200).send({ resultado: respuesta });
    })
    .catch(error => {
      let respuesta = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
      res.status(501).send({ resultado: respuesta });
    });
}


module.exports = {
  proposito,
  frecuencia,
  tipoOperaciones,
  actuaNombre,
  medioPago,
  origenRecursos,
  destinoRecursos,
  relacionTercero
};
