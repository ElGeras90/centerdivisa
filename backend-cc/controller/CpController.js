'use strict';
const jwt = require('jsonwebtoken');
const token = require('./../util/token');

const cp = require('./../model/cpmodel');
const encriptarjsong = require('./../util/encriptarjson');

function codigopostal(req, res) {

  let resquest = encriptarjsong.decrypt(req.body.resultado)
    cp.consultacp(resquest.cp)
      .then(info => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows[0].search_by_cp }));

        res.status(200).send({resultado:data});
      })
      .catch(error => {
        let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
        res.status(501).send(data);
  
      });
  }
  function codigopostalid(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


        cp.consultacpid(resquest.cp)
          .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info:info.rows[0].search_by_cp_id }));

            res.status(200).send({resultado:data});
          })
          .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);
      
          });
      }
  module.exports = {

    codigopostal,
    codigopostalid

  };