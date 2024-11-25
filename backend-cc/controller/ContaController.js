'use strict';

const rg = require('./../model/ContaModel');
const encriptarjsong = require('./../util/encriptarjson');
const conta = require('./../model/ContaModel')


function saldos(req, res) {
  let resquest = encriptarjsong.decrypt(req.body.resultado)
  conta.saldos(resquest)
    .then(info => {
      let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

      res.status(200).send({ resultado: data });
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}

function reporteventacompra(req, res) {
  let resquest = encriptarjsong.decrypt(req.body.resultado)
  //let resquest = req.body;
  conta.reportemovdias(resquest)
    .then(info => {
      let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows[0].reporte_cpd }));
      //let data = { success: true, info: info.rows }
      //console.log(info)
      res.status(200).send({ resultado: data });
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}
module.exports = {
  saldos,
  reporteventacompra
};